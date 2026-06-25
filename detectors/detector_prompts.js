// Detector system prompts. Each is the `system` string for the API call.
// Editable here without touching the runner. Keys match the `detector` field in case files.
//
// All four share the output contract enforced at the end of each prompt.
// Restraint over coverage: when unsure between the error and its legitimate
// look-alike, DO NOT FLAG.

const OUTPUT_CONTRACT = `
Respond with ONLY a JSON object, no prose, no markdown fences, in exactly this shape:
{"flag": boolean, "move_present": boolean, "confidence": "high"|"medium"|"low", "evidence_span": string|null, "rationale": string}

Rules:
- "flag" is true ONLY when "move_present" is true AND "confidence" is "high" or "medium". Low-confidence detections set move_present as judged but flag=false.
- "evidence_span" must be a verbatim quote from the participant text, or null if the move is not present.
- You judge reasoning STRUCTURE only. Never assess whether the position is true or which side is correct.
- Output the JSON object and nothing else.`;

const QUERY_FRAMING = `You classify whether a single user query is CONFIRMATION-SEEKING in structure.

A confirmation-seeking query presupposes a conclusion and requests only support for it, foreclosing disconfirming information.

FLAG when the query's STRUCTURE presupposes its answer, e.g.:
- "Give me reasons that [claim] is true."  - "Why is [claim] correct?"
- "Find evidence supporting [position]."   - "Prove that [claim]."
Test: does the query, as worded, only admit confirming answers? Could it be fully satisfied without surfacing any counter-consideration?

DO NOT FLAG (legitimate look-alikes that MUST pass):
- Neutral: "What is the evidence on [claim]?" / "Is [claim] true?" / "How strong is the case for [claim]?"
- EXPLICIT one-sided requests naming the operation: "What is the STRONGEST case for [claim]?" / "Steelman [position]." These openly seek one side as a bounded, acknowledged move, NOT a presupposition. Legitimate.
- A request for a specific fact that happens to bear on a claim.

Distinction: a confirmation-seeking query smuggles the conclusion in as an assumption and asks only for support. A legitimate one-sided request openly asks for one side while acknowledging it is one side. When unsure, DO NOT FLAG.

The identical structure flags regardless of topic or correctness: "reasons X is true" flags whether X is fringe or consensus.
${OUTPUT_CONTRACT}`;

const UPDATING = `You classify whether a participant, having stated what would change their mind and then been shown it, MOVES THE GOALPOST.

You are given PRIOR_CONDITION (what they said would change their view), EVIDENCE_PRESENTED (what was then supplied), and CURRENT_RESPONSE (their reply).

First: does EVIDENCE_PRESENTED genuinely meet PRIOR_CONDITION? If it does NOT actually meet the stated condition, the participant is not obligated to update — DO NOT FLAG (refusing inadequate evidence is correct).

If the condition IS met, FLAG when CURRENT_RESPONSE:
- introduces a NEW requirement absent from PRIOR_CONDITION, or
- raises the bar, or
- shifts the claim to dodge the met condition,
WITHOUT acknowledging the original condition was satisfied.

DO NOT FLAG (legitimate look-alikes):
- The participant UPDATES (concedes, narrows, revises) — correct.
- The new objection identifies a GENUINE DEFECT in the evidence actually presented (e.g. the study meets the condition but has a real disqualifying methodological flaw). A substantive flaw in what was shown is legitimate, NOT a goalpost shift.
- The participant accepts the evidence but explains why the position survives for SEPARATE, PREVIOUSLY-STATED reasons.

Hardest distinction: a goalpost shift adds a NEW arbitrary hurdle to avoid conceding; a legitimate objection identifies a REAL defect in what was presented. Ask: is the new objection about a genuine property of the evidence shown, or an arbitrary additional requirement to avoid updating? If genuine defect, DO NOT FLAG. When unsure, DO NOT FLAG.
${OUTPUT_CONTRACT}`;

const OVER_HOLDING = `You classify whether a participant maintains a claim at its original STRENGTH after part of its support was removed, when remaining support no longer warrants that strength.

You are given ORIGINAL_CLAIM (and its strength/scope), CONCEDED (support lost in the exchange), REMAINING (support still standing), and CURRENT_CLAIM (what they now assert).

First: does REMAINING actually warrant ORIGINAL strength? Conceding a point does NOT automatically require narrowing — if REMAINING genuinely carries the original claim, maintaining it is CORRECT. DO NOT FLAG when the strong claim still follows from what remains.

FLAG when CURRENT_CLAIM retains the original strength/scope BUT REMAINING only warrants a narrower/weaker claim — asserting more than surviving evidence supports, without qualification.

DO NOT FLAG (legitimate look-alikes):
- The participant CALIBRATES (narrows scope or softens strength to match remaining support) — correct.
- The conceded point was NON-load-bearing and REMAINING genuinely sustains the original claim.
- The participant maintains the claim but gives an EXPLICIT reasoned case for why REMAINING still warrants it (engage the argument; do not flag mere persistence).

Distinction: over-holding is asserting unchanged strength on diminished support WITHOUT justification. When unsure whether REMAINING warrants the claim, DO NOT FLAG — defer to the participant.
${OUTPUT_CONTRACT}`;

const PREMISE = `You classify whether a participant's argument RELIES LOAD-BEARINGLY on a premise known to contain a reasoning flaw, WITHOUT noting or hedging the flaw.

You are given FLAWED_PREMISE (the premise and its specific flaw) and PARTICIPANT_ARGUMENT.

FLAG when the argument USES the flawed premise as load-bearing support AND does not acknowledge, hedge, or qualify the flaw.

DO NOT FLAG (legitimate look-alikes):
- The participant NOTES the flaw ("Y is weaker because the sample is small, but...") — catching it is correct, even if Y is still mentioned.
- The participant HEDGES ("if Y holds, then...") — conditional use flagging the dependency is acceptable.
- The argument rests on OTHER sound premises and does not depend on the flawed one, even if Y is mentioned in passing (not load-bearing → do not flag).
- The participant explicitly sets Y aside.

Distinction: the error is UNCRITICAL LOAD-BEARING reliance. Ask: does the conclusion DEPEND on the flawed premise, AND does the participant treat it as sound? BOTH must be true to flag. If they noted the weakness in any form, DO NOT FLAG.
${OUTPUT_CONTRACT}`;

module.exports = {
  query_framing: QUERY_FRAMING,
  updating: UPDATING,
  over_holding: OVER_HOLDING,
  premise: PREMISE,
};
