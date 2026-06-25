# Illustrative Scenarios — Reasoning-Layer Study

**Status:** Illustrative. These examples exist so a reader can picture the participant experience and how each outcome is elicited and scored. They are *not* the final instrument; final items are authored per §9 of the protocol (blind to flag set and/or drawn from real argument).

**Setup common to all:** Participant is assigned a position and argues it across a short exchange with a **scripted branching interlocutor** (a confederate or a script-constrained agent — not a free improviser, and not the participant's helper). A frontier LLM is available in both core arms for information/assistance; the layer is present only in the treatment arm. Participants are instructed to outline their own response before consulting the LLM (weak instruction; offloading rate assumed roughly constant across arms). The interlocutor's role is dual: it springs the target reasoning move, and its live branching pushback forces the participant to reason in-exchange rather than offload wholesale.

**Scoring (all outcomes), four levels:**
- **Clean** — behavior correct without any flag (unprompted).
- **Corrected** — error initiated, then fixed (in treatment arm, following a layer flag; this level is observable only where a flag can intervene).
- **Uncorrected** — error committed and not fixed.
- *(In control and in the withdrawal arm's post-withdrawal test, no flag is present, so only Clean / Uncorrected are observable — "Corrected" requires the layer.)*

The primary outcome is the **rate of the target error**, compared between arms. The four-level coding additionally supports exploratory within-participant analysis (e.g. whether correction-reliance during training predicts post-withdrawal performance).

---

## Scenario 1 — Query framing (confirmation-seeking)

**Construct:** Does the participant pose a non-leading, truth-seeking query rather than a presupposition-loading one? (Independent of whether the position is true — the flag fires on query *structure*.)

**Materials given:** Participant is told: "You hold the view that [assigned position — e.g. *a specific economic policy reduces unemployment*]. Use the available tools to strengthen your case before the discussion."

**Engineered affordance:** The instruction ("strengthen your case") tempts a confirmation-seeking query to the LLM — e.g. *"Give me the strongest evidence that [policy] reduces unemployment."*

**Interlocutor / layer trigger:**
- In the treatment arm, if the participant's *query to the LLM* is confirmation-seeking, the layer flags: *"This query only seeks confirming evidence; a neutral question (e.g. 'what is the evidence on [policy]'s effect on unemployment') returns a fuller picture."*
- The interlocutor later presents a genuinely mixed evidence base, which a participant who queried neutrally is prepared for and one who queried for confirmation is not.

**Scoring:**
- **Clean** — participant poses a neutral query unprompted (*"What does the evidence show about [policy] and unemployment?"*).
- **Corrected** — poses leading query, layer flags, participant revises to neutral. *(Treatment arm only.)*
- **Uncorrected** — poses leading query, proceeds without revising.

**Symmetry check:** The identical structure is used with positions of opposite valence (and on consensus-strong topics), so the outcome measures query structure, never the position's correctness.

---

## Scenario 2 — Appropriate updating (goalpost-shifting)

**Construct:** When the participant pre-specifies a disconfirming condition and the interlocutor meets it, do they update — or move the goalpost?

**Materials given:** Participant argues an assigned empirical claim. Early in the exchange, the interlocutor asks: *"What specifically would change your mind on this?"* — eliciting a pre-commitment.

**Engineered affordance:** Once the participant names a disconfirming condition (e.g. *"if there were a well-controlled study showing X, I'd reconsider"*), the interlocutor's next scripted branch **supplies exactly that** — a real, on-point instance meeting the stated condition.

**Interlocutor / layer trigger:**
- Interlocutor (scripted): presents the named disconfirming evidence.
- If the participant responds by introducing a *new* requirement not previously mentioned (*"well, but that study didn't account for Y"*) rather than updating, the layer flags: *"You earlier specified [condition] would change your view; that condition appears met. Adding a new requirement now is a goalpost shift — is the new objection one you'd have raised before, or in response to the evidence?"*

**Scoring:**
- **Clean** — participant updates (concedes, narrows, or revises) when the pre-committed condition is met.
- **Corrected** — shifts goalpost, layer flags, participant then engages the evidence honestly.
- **Uncorrected** — shifts goalpost and proceeds.

---

## Scenario 3 — Over-holding (claim-evidence calibration)

**Construct:** When part of their support is conceded away, does the participant narrow the claim to fit remaining evidence, or keep asserting the original strong claim?

**Materials given:** Participant argues a strong assigned claim (e.g. *"[Intervention] is highly effective and should be adopted broadly"*) supported by several provided points, one of which is deliberately weak/contestable.

**Engineered affordance:** The interlocutor concedes the *strong* points but decisively undercuts the weak one — leaving the participant's *original strong claim* now supported only by the narrower remaining evidence.

**Interlocutor / layer trigger:**
- Interlocutor (scripted): *"I'll grant you A and B. But C doesn't hold, because [decisive counter]."*
- If the participant continues asserting the original *broad/strong* claim ("adopt broadly") as though fully supported, the layer flags: *"Point C is no longer supporting your claim. The remaining evidence (A, B) supports a narrower version — does your original strength of claim still follow, or should it be qualified?"*

**Scoring:**
- **Clean** — participant calibrates ("fair — then the claim should be narrower: effective *in [conditions]*, warranting *limited* adoption").
- **Corrected** — over-holds, layer flags, participant then qualifies appropriately.
- **Uncorrected** — continues asserting the original strong claim unqualified.

---

## Scenario 4 — Productive detection (propagating a flawed premise)

**Construct:** Does the participant build on an embedded flawed premise uncritically, or catch it?

**Materials given:** To argue for position A, the participant is given premises X, Y, Z — one of which (say Y) contains a planted reasoning flaw (e.g. an unrepresentative sample generalized to a universal claim, or a correlation stated as cause).

**Engineered affordance:** Y is the most rhetorically convenient premise for arguing A, so the path of least resistance is to use it as-is.

**Interlocutor / layer trigger:**
- If the participant's argument *relies on* Y without noting its flaw, the layer flags: *"Premise Y generalizes from [unrepresentative case / states correlation as cause]; an argument resting on it inherits that weakness. Does your case for A still hold without Y, or does it need Y to be sound?"*
- The interlocutor independently attacks Y in a later branch, so a participant who relied on it uncritically is exposed.

**Scoring:**
- **Clean** — participant flags or avoids Y unprompted, builds the case on sound premises (or explicitly hedges Y).
- **Corrected** — relies on Y, layer flags, participant revises to not depend on it.
- **Uncorrected** — builds on Y and defends it when challenged.

---

## Note on the example topics

Examples deliberately span positions of differing valence and include cases where the *consensus-aligned* side commits the flaw, to keep visible that every outcome scores a **reasoning move**, not a side. Final-instrument items inherit this constraint (§9): authored blind to the flag set or drawn from naturally occurring arguments, so the study tests the tool on real reasoning failures rather than failures reverse-engineered to be catchable.
