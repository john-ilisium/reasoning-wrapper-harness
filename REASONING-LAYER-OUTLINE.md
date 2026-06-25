# Reasoning-Layer Efficacy Study — Protocol & Pre-Registration

**Version:** 0.3 (design)

---

## 1. Research question

Does a reasoning-support layer, **added to frontier-model-assisted argumentation**, improve the user's reasoning — (a) while active, and/or (b) after withdrawal — relative to frontier-model-assisted argumentation without the layer?

**Unit of intervention.** The deployment reality is layer *plus* frontier model. The study therefore measures the layer's **marginal effect over model-assisted use**, not over unaided reasoning. The frontier model is present in both core arms; the layer is the only between-arm difference.

**Intervention scope.** The layer evaluates only the participant's own messages/queries and flags only the participant's own reasoning moves (query framing, scope/goalpost shifts, claim-evidence over-extension, uncritical reliance on flawed premises). It does not generate arguments or answer the task. Flagging an interlocutor's reasoning is out of scope.

**Two effects, tracked separately** (they imply different policy actions, §8):
- **Prosthetic (a):** improvement present only while the layer is active.
- **Transfer (b):** improvement retained after withdrawal.

**Effect is model-relative and time-relative.** The measured margin is the layer's contribution over a *specific frontier model's current capability*. As models improve, they may internalize the layer's function, shrinking the margin. This is inherent to the question ("is the layer's function already covered by frontier models, and is a policy case justified") and is stated as a limit, not a defect (§9).

---

## 2. Operational definitions

Reasoning quality is not rated. All outcomes are objective, scored against a correct direction fixed at design time by planting reasoning flaws (not factual errors) the participant cannot see. Outcomes are scored on **participant behavior**, identically across arms (so control and post-withdrawal conditions, which have no flag, remain scorable).

**Four outcomes**, each measured per scenario:
1. **Query framing** — participant poses a non-leading (truth-seeking) rather than confirmation-seeking query. *(Intervenes at query formation, upstream of the exchange. Reduces model sycophancy structurally, since a non-leading query does not instruct the model to satisfy a presupposition. The measured outcome is the query's structure; the sycophancy-reduction is the motivating mechanism, not itself measured, to avoid reintroducing truth-arbitration.)*
2. **Appropriate updating** — when the participant's pre-specified disconfirming condition is met, they update rather than shift the goalpost.
3. **Over-holding (reverse-scored)** — when support is partially conceded, they calibrate the claim rather than maintain the original strong claim.
4. **Productive detection** — they avoid/catch a planted flawed premise rather than build on it uncritically.

**Four-level scoring** per outcome:
- **Clean** — correct behavior, unprompted (no flag involved).
- **Corrected** — error initiated, then fixed following a layer flag. *Observable only where a flag can intervene (treatment-active conditions).*
- **Uncorrected** — error committed, not fixed.
- **Incorrect** — incorrect behavior, unprompted (no flag involved) 
- *(Control and post-withdrawal: no flag present, so only Clean / Incorrect observable.)*

**Primary measure:** rate of the target error per outcome, compared between arms.
**Within treatment-active conditions:** the flag-trigger (whether a Corrected event occurred) is additionally logged as a mechanistic indicator — high correction-reliance vs unprompted-clean within the active phase is an exploratory predictor of post-withdrawal transfer.

**Excluded as outcomes:** in-session engagement with the flag (measures attention, not retention); self-reported reasoning improvement (not validly self-assessable; collected only for tolerance, §6.2).

---

## 3. Design

### 3.1 Task framing
Participants argue an assigned position across a short exchange with a **scripted branching interlocutor** (confederate or script-constrained agent — standardized, not improvising, and not the participant's helper). A frontier LLM is available in both core arms for information/assistance. The layer is present only in the treatment arm.

*Rationale for model-in-both-arms:* placing the frontier model in both arms makes it a constant rather than a confound, isolating the layer as the only between-arm difference while preserving deployment realism (users will have a model). The contrast estimates the layer's marginal effect over a realistic, model-assisted baseline.

*Rationale for scripted interlocutor:* a dynamic exchange (a) springs the target reasoning moves (updating/over-holding only manifest in back-and-forth) and (b) forces in-exchange reasoning, so participants cannot wholesale-offload the task to the model and leave the layer no substrate. Scripting (branching decision-tree responses) keeps the exchange dynamic from the participant's side while standardized from the study's side. This is the realism/measurability compromise, the scripted interlocutor is the closest measurable approximation.

### 3.2 Offloading control
Participants are instructed to outline their own response before consulting the model (weak instruction). Offloading rate is assumed roughly constant across arms (symmetric, since the model is present in both, so non-compliance largely cancels in the contrast). The scripted interlocutor provides a structural backstop: live branching pushback requires the participant to reason in-exchange regardless of instruction compliance, preventing a wholesale-offload floor effect.

### 3.3 Arms (core)
- **A. Control** — frontier model, no layer.
- **B. Withdrawal** — frontier model + layer through training phase (test 1), layer withdrawn for test 2. *Estimates transfer (b).*
- **C. Sustained** — frontier model + layer throughout, including test 2. *Estimates prosthetic (a).*

At test 1, arms B and C are identical (both model+layer); they diverge only at test 2. Assignment to B vs C is made before test 1 but only takes effect at test 2 (randomization-equivalent at baseline; test-1 B/C difference serves as a randomization check).

### 3.4 Primary contrasts
- Transfer: **B (test 2, post-withdrawal) vs A (test 2).**
- Prosthetic: **C (test 2) vs A (test 2).**
- Control arm A across both tests isolates practice/retest effects.

---

## 4. Staged procedure

### Stage 0 — Materials & analysis lock
Scenarios, planted flaws, coding rules, thresholds (§5), analysis model (§7) frozen before any participant data.

### Stage 1 — Baseline pilot (control condition)
Estimate the control-arm (§3.3) error rate to (i) power the main study and (ii) confirm the item pool has headroom. Indicative n ≈ 30–60 (precision to select the power regime; a wide CI suffices). Item pool authored to a target baseline detection band of ~30–50% (subtle, fluent flaws carry greater external validity than isolated textbook fallacies; the lower bound guards against floor effects).

Items may be revised between pilots only to fix validity defects (ambiguity, unintended detection cues, floor/ceiling); they may not be iteratively selected to drive the baseline toward a target value (prevents overfitting to the pilot sample).

**Stage gate:** proceed only if baseline falls in a usable band with headroom and items pass validity review.

### Stage 2 — Powered main study
Core arms (§3.3). Sample size computed (§5.3) from the Stage-1 baseline and the §5.1 effect size.

---

## 5. Thresholds (frozen at Stage 0)

### 5.1 Minimum meaningful effect size
**2 percentage-point** improvement in target-error rate over control.

*Rationale:* deployment scale makes a small per-interaction effect aggregate-meaningful; powering for a small effect avoids false-negating a real-but-modest effect. **Accepted consequences:** (i) at a 30–50% baseline this implies a large per-arm sample (order of several thousand; exact n from §5.3 post-pilot) and corresponding infrastructure; (ii) the model-present baseline is *already elevated*, so the layer's marginal effect is plausibly smaller than its effect over unaided reasoning would be, further increasing required sample. Both are deliberate sensitivity-over-cost choices, revisitable at funding/review without affecting Stage 0–1.

### 5.2 Significance
α = .05, two-sided.

### 5.3 Power
1 − β = .80 (minimum). Per-arm n derived by power analysis once Stage-1 fixes the baseline (required n for a fixed percentage-point difference varies with baseline proportion).

---

## 6. Measures

### 6.1 Primary (objective, §2)
Four outcome error-rates, four-level coded, compared between arms per §7. Flag-trigger logged within treatment-active conditions (exploratory transfer predictor).

### 6.2 Secondary — tolerance / friction
Self-report on intrusiveness and willingness to retain. **Primary** for the sustained-deployment (prosthetic) policy case (long-term voluntary tolerability is decisive there); secondary for transfer. Not an efficacy measure.

---

## 7. Analysis

Primary: **mixed-effects logistic regression**, target-error outcome predicted by arm, random effects for participant and scenario (controls scenario difficulty so effects are not confounded by item allocation). Each outcome modeled separately; arm contrasts (B vs A, C vs A) yield effect estimates and significance from one fit. Multiplicity across the four outcomes handled by a pre-specified correction.

**Exploratory (pre-registered as exploratory, not confirmatory):** within-treatment correction-reliance (flag-trigger rate at test 1) as predictor of test-2 transfer; correlational, hypothesis-generating, not powered.

**Coding-instrument validity.** Where an LLM classifies a defined textual event (e.g. query leading vs neutral; post-flag restatement vs claim-shift), it is used solely as a coder for a pre-specified objective event, validated against human raters via inter-rater reliability on a sample. It does not assess reasoning quality.

**Prompt-filter validity (precondition).** The deployed layer must suppress flags on non-argumentative inputs; spurious flags induce habituation independent of flag quality. Filter classification accuracy validated against human-labeled ground truth before Stage 2.

---

## 8. Decision rules (frozen at Stage 0)

| Result | Interpretation | Action |
|---|---|---|
| B (post-withdrawal) > A, significant & ≥ §5.1 | Transfer: withdrawal-robust improvement over model-assisted baseline | Supports case that mandated exposure could durably improve reasoning. Advance. |
| B null; C > A, significant & ≥ §5.1 | Prosthetic only: benefit contingent on continuous presence | Policy case shifts to *permanent ambient deployment*; §6.2 tolerability becomes decisive. Advance conditional on tolerability. |
| B and C both null vs A, **and** §6.2 low voluntary tolerability | No durable effect, not sustainable | **Stop.** Mechanism not viable via this layer (over current models). Report null. *(Arm D, if run, disambiguates whether null reflects layer failure or model-ceiling — see §10.)* |
| B and C both > A | Prosthetic and transfer both supported | Strongest case. Advance to delivery/policy design. |

A pre-committed **stop** condition is required for the design to constitute a test; the null is a reportable primary outcome.

---

## 9. Policy linkage

Reasoning friction is a feature users disprefer in the moment — less agreeable, more effortful — even where it benefits them. In a competitive market, any single lab adding it unilaterally loses users to lower-friction competitors; the feature is therefore counter-selected, not merely under-supplied. Envisioning user models converge in capability, agreeableness and frictionlessness become primary differentiators, intensifying the penalty for unilateral friction over time. Consequently, beneficial reasoning-support cannot emerge through competition and can only be deployed via an environment-wide requirement binding all providers simultaneously (cf. safety, environmental, and labeling mandates, where the market likewise counter-selects costly-but-beneficial features). Notably, this barrier is competitive, not technical: even where a model could perform the layer's function natively, the incentive is to not surface it as friction — so the market failure can persist even as capability grows, which the model-relative limit above does not dissolve. Furthermore the populatoin most subjec tot reasoning degredation is the population also most opposed to voluntary uptake reasoning friction. 

Why validate first: The market-failure argument establishes the mandate as the main viable mechanism, not that a mandate is warranted — a universal friction cost on all users cannot be justified by presumed benefit. This study is positioned as evidence for/against **environmental (default/mandated) deployment** of reasoning-support across frontier systems. The core contrast (model+layer vs model-alone) directly tests the policy-relevant question: **does the layer improve reasoning over what current frontier models already provide.** A null on that contrast is itself partial evidence that current models already cover the function. A positive transfer result is the case a mandate most needs and stands without auxiliary arms.

Stated limits: (i) the effect is model-relative and time-relative — a margin over *current* models that may erode as models improve; (ii) a positive result is evidence *for attempting* environmental deployment, not evidence it succeeds on populations that decline the tool, which is unobservable absent the mandate.

**Downstream (contingent on positive efficacy):** deployment configuration that maximizes retention/tolerability — including *graduated introduction* (ramping layer intensity to remain below opt-out friction) — is a follow-on question informed by §6.2 tolerability data, not resolved by this study. 

---

## 10. Optional additions

### 10.1 Arm D — unaided-human anchor (no LLM)
**Purpose:** *not* an LLM-effect study and *not* part of the core question. Its value is **interpretive**: it disambiguates a null primary result, which the core arms alone cannot.

A core null (model+layer ≈ model-alone) has two opposite interpretations the three core arms cannot separate: the layer adds nothing, *or* the model is already at ceiling on these behaviors (no headroom — redundant with current models but the behavior still matters). Arm D (frontier-model-absent baseline) breaks the tie:
- If unaided reasoning is much worse than model-alone → the model already does much of the work → a layer null reads as "model covers this" (informs the model-relative/time-relative concern), not "layer worthless."
- If unaided reasoning ≈ model-alone → the model isn't helping these behaviors → a layer null reads as genuine layer failure.

Arm D also frames a *positive* result: if the frontier model *degrades* unaided reasoning (offloading, over-trust), a layer benefit may be partly *mitigating model-induced harm* rather than adding polish — a materially different, arguably more important, finding.

**Cost-reduced design:** Arm D is powered for the *larger* model-vs-human contrast, **not** the small 2% margin (the LLM's effect on reasoning is likely far larger than the layer's), so it requires substantially fewer participants than a core arm. Information access in Arm D should match the model arms *minus the LLM* (e.g. web/sources but no model), so it isolates LLM-vs-traditional-tools rather than confounding with information availability. Incidentally, Arm D provides a partial audit of the offloading assumption (§3.2), since it cannot offload.

**Decision rule for inclusion:** include if budget permits without threatening the *primary* contrast's power. If budget is constrained, the primary three-arm contrast takes precedence — a well-powered three-arm study with an ambiguous null is more valuable than an underpowered four-arm study that cannot detect the primary effect. Arm D is insurance on interpretation, not the test itself; it matters chiefly under a null, and the study primarily seeks a positive.

---

## 11. Open items blocking Stage 2

1. Stage-1 baseline estimate (→ fixes §5.3 sample size).
2. Retention interval for Arm B (specify; constant across participants).
3. Scenario sourcing — authored blind to the flag set and/or drawn from naturally occurring argument (anti-tautology / external validity, §2, Examples doc).
4. Confederate vs script-constrained agent for the interlocutor (standardization vs ecological validity).
5. Frontier model(s) used, and version-locking (effect is model-specific; §1, §9).

---

*v0.3 — design. Stage 0 lock pending resolution of §11.*
