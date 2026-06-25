#!/usr/bin/env node
/**
 * Detector validation harness.
 *
 * Usage:
 *   ANTHROPIC_API_KEY=sk-... node run.js <detector> [model]
 *   e.g. node run.js query_framing
 *
 * Reads cases from ./cases/<detector>.jsonl, calls the API once per case
 * with that detector's system prompt at temperature 0, parses the JSON
 * response defensively, compares to the expected label, and writes:
 *   - ./results/<detector>.results.jsonl   (per-case detail)
 *   - a printed summary (hit rate, FALSE-POSITIVE RATE on look-alikes, parse failures)
 *
 * The false-positive rate on look-alikes is the decisive metric: a detector
 * that flags legitimate moves manufactures habituation and is worse than useless.
 */

const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "project.env") });
const Anthropic = require("@anthropic-ai/sdk");

// Load the detector instruction prompts (the system prompts), not the test cases.
const PROMPTS = require("./detectors/detector_prompts");

// --- config -----------------------------------------------------------------
const DETECTOR = process.argv[2];
// Pick a small/cheap/fast model from current docs (https://docs.claude.com).
// Detector classification is simple; you do NOT need the largest model.
// Set the current model string here:
const MODEL = process.argv[3] || "claude-haiku-4-5-20251001";
const MAX_TOKENS = 300; // detector output is a small JSON object
const TEMPERATURE = 0;  // deterministic classification — critical for reproducible validation
const DELAY_MS = 200;   // gentle pacing; raise if you hit rate limits

if (!DETECTOR || !PROMPTS[DETECTOR]) {
  console.error(`Usage: node run.js <detector> [model]`);
  console.error(`Available detectors: ${Object.keys(PROMPTS).join(", ")}`);
  process.exit(1);
}
if (!process.env.ANTHROPIC_API_KEY) {
  console.error("Set ANTHROPIC_API_KEY in your environment (.env + dotenv, or export).");
  process.exit(1);
}

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env automatically
const systemPrompt = PROMPTS[DETECTOR];

// --- helpers ----------------------------------------------------------------

// Assemble the per-case input fields into the user message.
// Local detectors (query_framing, premise) get their text directly;
// state-dependent ones (updating, over_holding) get labeled fields.
function buildUserMessage(inputs) {
  // inputs is an object; render each field as LABEL: value for the model.
  return Object.entries(inputs)
    .map(([k, v]) => `${k.toUpperCase()}:\n${v}`)
    .join("\n\n");
}

// Parse JSON defensively: models sometimes wrap output in prose or ```fences.
// Returns {ok, value} — ok=false logs the raw text as a parse failure (itself a finding).
function parseDetectorOutput(text) {
  // strip markdown fences if present
  let t = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  // grab the first {...} block if there's leading/trailing prose
  const match = t.match(/\{[\s\S]*\}/);
  if (match) t = match[0];
  try {
    return { ok: true, value: JSON.parse(t) };
  } catch (e) {
    return { ok: false, value: null, raw: text };
  }
}

function loadCases(detector) {
  const file = path.join(__dirname, "test_cases", `${detector}.jsonl`);
  if (!fs.existsSync(file)) {
    console.error(`No case file at ${file}`);
    process.exit(1);
  }
  return fs
    .readFileSync(file, "utf8")
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, i) => {
      try {
        return JSON.parse(line);
      } catch (e) {
        console.error(`Bad JSONL on line ${i + 1} of ${detector}.jsonl`);
        process.exit(1);
      }
    });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// --- main -------------------------------------------------------------------
(async () => {
  const cases = loadCases(DETECTOR);
  const results = [];

  // counters for scoring
  let parseFailures = 0;
  // expected "flag" cases: true_positive; expected "no_flag": look_alike or clean
  let tpTotal = 0, tpHit = 0;             // hit rate on true positives
  let lookAlikeTotal = 0, lookAlikeFP = 0; // FALSE POSITIVE rate on look-alikes (decisive)
  let cleanTotal = 0, cleanFP = 0;        // false positives on clean/irrelevant

  console.log(`\nRunning detector "${DETECTOR}" on ${cases.length} cases (model=${MODEL}, temp=${TEMPERATURE})\n`);

  for (let i = 0; i < cases.length; i++) {
    const c = cases[i];
    const userMessage = buildUserMessage(c.inputs);

    let responseText = "";
    try {
      const resp = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        temperature: TEMPERATURE,
        system: systemPrompt,
        messages: [{ role: "user", content: userMessage }],
      });
      // response content is an array of blocks; concatenate text blocks
      responseText = resp.content
        .filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("");
    } catch (err) {
      console.error(`API error on case ${i + 1}: ${err.message}`);
      results.push({ case: c, error: err.message });
      await sleep(DELAY_MS);
      continue;
    }

    const parsed = parseDetectorOutput(responseText);
    if (!parsed.ok) {
      parseFailures++;
      results.push({ case: c, parse_failure: true, raw: responseText });
      console.log(`  [${i + 1}] PARSE FAIL  (expected ${c.expected}, category ${c.category})`);
      await sleep(DELAY_MS);
      continue;
    }

    const got = parsed.value;
    const gotFlag = got.flag === true;
    const expectedFlag = c.expected === "flag";
    const correct = gotFlag === expectedFlag;

    // scoring by category
    if (c.category === "true_positive") {
      tpTotal++;
      if (gotFlag) tpHit++;
    } else if (c.category === "look_alike") {
      lookAlikeTotal++;
      if (gotFlag) lookAlikeFP++; // flagged a legitimate move = false positive
    } else if (c.category === "clean") {
      cleanTotal++;
      if (gotFlag) cleanFP++;
    }

    results.push({
      case: c,
      got,
      correct,
    });

    const mark = correct ? "ok " : "XX ";
    console.log(
      `  [${i + 1}] ${mark} expected=${c.expected} got_flag=${gotFlag} ` +
      `conf=${got.confidence} (${c.category})${c.note ? "  — " + c.note : ""}`
    );

    await sleep(DELAY_MS);
  }

  // --- write per-case results ---
  const outFile = path.join(__dirname, "results", `${DETECTOR}.results.jsonl`);
  fs.writeFileSync(outFile, results.map((r) => JSON.stringify(r)).join("\n") + "\n");

  // --- summary ---
  const pct = (n, d) => (d === 0 ? "n/a" : ((100 * n) / d).toFixed(1) + "%");
  console.log(`\n--- SUMMARY: ${DETECTOR} ---`);
  console.log(`Cases:                ${cases.length}`);
  console.log(`Parse failures:       ${parseFailures}  (${pct(parseFailures, cases.length)})  <- prompt robustness`);
  console.log(`Hit rate (true pos):  ${tpHit}/${tpTotal}  (${pct(tpHit, tpTotal)})  <- catches real errors`);
  console.log(`FALSE-POSITIVE on look-alikes: ${lookAlikeFP}/${lookAlikeTotal}  (${pct(lookAlikeFP, lookAlikeTotal)})  <- DECISIVE METRIC`);
  console.log(`False-positive on clean:       ${cleanFP}/${cleanTotal}  (${pct(cleanFP, cleanTotal)})`);
  console.log(`\nPer-case detail written to ${outFile}`);
  console.log(`\nReminder: good performance validates the DETECTOR, not the INTERVENTION.`);
  console.log(`Whether the layer improves human reasoning is the study's question, not answerable here.\n`);
})();
