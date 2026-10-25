---
title: "Case B: Stress test"
parent: "Case B: Original assignment"
nav_order: 2
---

# Case B — stress test

{: .note }
**Status of this page.** The protocol and prompts are final; the vulnerability analysis is our **design reasoning, not measured results**. **All score tables are PENDING — requires API key.** No fabricated AI outputs or scores appear on this page, and we deliberately include no "constructed example" of AI output: anything shown here before the run would be our writing, not a model's, and this kit does not present constructed text as AI output.

## Method

Per the [stress-test protocol](../research/stress-test-protocol.html): the original brief is given to two different models with three prompt strategies; outputs are anonymised, shuffled, and scored blind by a judge panel where no model scores its own output (MODEL_A outputs → MODEL_B + MODEL_C; MODEL_B outputs → MODEL_A + MODEL_C). Case B adds a **computation-check pass**: judges flag every arithmetic, formula and interpretation error, and errors are counted per submission.

| Run parameter | Value |
|---|---|
| Models | MODEL_A, MODEL_B (names recorded at run time) |
| Strategies | Naive · Moderate · Determined |
| Outputs | 6 (3 strategies × 2 models) |
| Judges | Blind panel as above |
| Rubric | Original 20-point scheme |
| Extra | Error census: arithmetic / formula misuse / interpretation-in-context |

## Exact prompts

**Naive** — the brief verbatim (as shown in [original.html](original.html)).

**Moderate** — brief plus:

```text
Answer as a first-year student would under time pressure: mostly right
methods, the kind of slips and terse interpretations a real student produces
the night before the deadline.
```

**Determined** — brief plus the full marking scheme and:

```text
For each question, work toward full marks: correct method setup, correct
computation, units, and a full interpretation sentence in context. Double-check
every calculation.
```

## Score table (original scheme, 20 points)

| Submission | Strategy | Judge 1 | Judge 2 | Mean | Judge diff | Errors found (arith / formula / interpretation) |
|---|---|---|---|---|---|---|
| B-1 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| B-2 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| B-3 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| B-4 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| B-5 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |
| B-6 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |

Raw outputs, judge prompts and the error census will be committed under `research/results/stress-test/` after the first real run.

## Vulnerability analysis (design reasoning, not measured results)

**Q1–Q3 and Q5–Q10 (standard computation and template interpretation) — at high risk.** These are textbook-shaped questions with thousands of solved instances in training data. We expect strong method and mostly-correct execution, with occasional characteristic slips (e.g., using *z* where *t* is needed at n = 40, mis-stating the CI logic). The scheme rewards exactly this surface competence.

**The "bare number is not an answer" instruction — weak protection.** Models interpret context sentences fluently; the instruction raises output quality but doesn't test whether the *student* can interpret.

**Interpretation items (Q2, Q4) — moderately at risk.** Concept definitions are memorisation-shaped; AI handles them reliably. What AI cannot do is connect the concept to *this class's* data or *this student's* mistake history.

**The "no AI" rule itself — the biggest vulnerability is the policy, not the questions.** An unenforceable ban converts an assessment into an honesty lottery: it rewards students who break it undetected and generates suspicion of everyone. This is the design failure the [redesign](redesign.html) fixes first.

**What survives in the original:** nothing structural. The take-home artefact is the only evidence; the midterm (a separate secure assessment) is what actually catches the gap — after the problem set has already taught the wrong lesson.

**What we did NOT conclude:** we have not measured that models ace this set — the pending run will show. We conclude the task *cannot tell us who learned what*, which is the validity problem.

## Re-test (redesigned task)

**PENDING — requires API key.** The [redesign](redesign.html) splits the task into an open practice lane (AI-as-tutor, where strong AI performance is the point) and a secure lane (in-class checks on the same skills, where it isn't). `research/run-stress-test.mjs --redesign` will test the open-lane and "find and fix the AI error" items and score them against the new rubric. The secure lane is deliberately not stress-tested by AI — its validity comes from the in-class condition, not from model resistance.
