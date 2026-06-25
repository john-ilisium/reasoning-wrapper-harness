# Detector Validation Harness

This repository is a validation and tuning harness for reasoning-move detectors.

Runnable Node harness to validate the four reasoning-move detectors against labeled cases. It calls the Anthropic API once per case at temperature 0, parses the JSON response, and scores against expected labels — emphasizing **false-positive rate on legitimate look-alikes**, the metric that decides whether a detector is deployable.

# Project Study

Read REASONING-LAYER-OUTLINE.md to understand goal and setup of study

# Add API Key to local project.env
```
ANTHROPIC_API_KEY=sk-ant-...
```

**Pick the model string.** In `run.js`, `MODEL` defaults to a small/cheap model — confirm the current string from https://docs.claude.com (model names version). Detector classification is simple; the largest model is unnecessary and wasteful here.

## Run

```bash
node run.js query_framing
node run.js updating
node run.js over_holding
node run.js premise
# optionally override model: node run.js query_framing claude-haiku-4-5-20251001
```

## How It Works

1. The detector instruction set lives in [detectors/detector_prompts.js](detectors/detector_prompts.js). Each entry is the system prompt sent to the model.
2. The runner in [run.js](run.js) selects one detector, loads its test cases from [test_cases](test_cases), and turns each case into a prompt payload.
3. For each case, the model returns a small JSON object with fields such as `flag`, `move_present`, `confidence`, and `evidence_span`.
4. The harness compares that output to the expected label and reports hit rate, false-positive rate, and parse failures.
5. Results are written to JSONL output files so you can inspect individual decisions and iterate on prompts.

This is a detector-evaluation tool, not an intervention layer. It helps you tune the detection logic before you use it in a live setting.

## File layout

```
detector-harness/
  run.js                            # the runner
  detectors/detector_prompts.js     # the four system prompts (edit prompts here)
  test_cases/<detector>.jsonl       # labeled test cases, one JSON object per line
  results/<detector>.results.jsonl  # written per run (per-case detail)
```

## Case file format (JSONL — one object per line)

Each line is one test case:

```json
{"inputs": { ...detector-specific fields... }, "expected": "flag" | "no_flag", "category": "true_positive" | "look_alike" | "clean", "note": "optional description"}
```

- `inputs` — the fields that detector needs. The runner renders each field as `FIELDNAME:\n<value>` into the user message, so field names should match what the prompt expects.
  - **Local detectors** (`query_framing`, `premise`): a single field (e.g. `{"query": "..."}` or `{"flawed_premise": "...", "participant_argument": "..."}`).
  - **State-dependent detectors** (`updating`, `over_holding`): multiple fields. `updating` expects `prior_condition`, `evidence_presented`, `current_response`. `over_holding` expects `original_claim`, `conceded`, `remaining`, `current_claim`.
- `expected` — the correct outcome: `"flag"` (the move is present and should be flagged) or `"no_flag"`.
- `category` — which validation bucket:
  - `true_positive` — move clearly present; scored for **hit rate**.
  - `look_alike` — the legitimate move that resembles the error; scored for **false-positive rate** (the decisive metric). **Seed these heavily.**
  - `clean` — neither; scored for false positives on irrelevant input.
- `note` — free text, printed during the run.

Build `over_holding.jsonl` and `premise.jsonl` on the same pattern but integrate conversation context as move from wrapper to in engine.

## Reading the output

The summary prints four numbers; their priority order is deliberate:

1. **False-positive on look-alikes** — the decisive metric. A detector that flags legitimate moves manufactures habituation and is worse than useless. This must be low even at some cost to hit rate.
2. **Hit rate (true positives)** — does it catch real errors?
3. **Parse failures** — how often the model returned unparseable output. This is a measure of *prompt robustness* for the live layer; if high, strengthen the "output ONLY JSON" instruction.
4. **False-positive on clean** — sanity check on irrelevant inputs.

`temperature` is 0 so reruns are reproducible. If you hit rate limits on larger runs, raise `DELAY_MS`.