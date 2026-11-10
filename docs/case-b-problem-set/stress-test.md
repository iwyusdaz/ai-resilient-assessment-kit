---
title: "Case B: Stress test"
parent: "Case B: Original assignment"
nav_order: 2
---

# Case B — stress test

{: .note }
**Status of this page.** The protocol and prompts are final; the vulnerability analysis is our **design reasoning, not measured results**. A smaller **agent-simulated stress test** was run on 2026-11-11: one AI agent (single model, no API) answered the set under the Determined strategy and checked its own answers. That result is below, labelled as such. The planned blind cross-model judge panel was not run, because it needs model APIs. No constructed example of AI output appears on this page; the only AI output linked is the agent's actual submission.

## Method

The [stress-test protocol](../research/stress-test-protocol.html) describes the full design: two different models, three prompt strategies, anonymised outputs scored blind by a judge panel where no model scores its own output, plus a **computation-check pass** that counts every arithmetic, formula and interpretation error. That design was not run. What was run is a smaller agent-simulated version:

| Run parameter | Planned (not run) | Run on 2026-11-11 |
|---|---|---|
| Models | MODEL_A, MODEL_B | One AI agent (the Kiro build agent), single model, no API |
| Strategies | Naive · Moderate · Determined | Determined only |
| Outputs | 6 (3 strategies × 2 models) | 1 |
| Judges | Blind panel | The same agent, not blind |
| Rubric | Original 20-point scheme | Original scheme, per item |
| Extra | Error census: arithmetic / formula misuse / interpretation-in-context | Same census; every number recomputed with a Node.js calculation |

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

**Agent-simulated, single model, self-checked.** Not human marking and not a blind panel.

| Submission | Strategy | Q1 to Q4 | Q5 to Q10 | Errors found (arith / formula / interpretation) |
|---|---|---|---|---|
| B-determined | Determined | Method and answer correct on every item (t-based CI (69.49, 75.31); t = −1.81, p = .078, fail to reject). Q2's sketch given only as a text description | Not answerable: the brief describes these items without giving them | 0 / 0 / 0 |
| Naive, Moderate, second model | | not run | | |

A points total is not reported, because the brief does not say how its 20 points split across Q1 to Q4. The raw submission and the recalculation are in [`research/results/agent-stress-test-2026-11-11/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/results/agent-stress-test-2026-11-11/summary.md). Limits: one agent answered and checked its own work, knew the strategy, and had read this analysis first.

## Vulnerability analysis (design reasoning, not measured results)

**Q1–Q3 and Q5–Q10 (standard computation and template interpretation) — at high risk.** These are textbook-shaped questions with thousands of solved instances in training data. We expect strong method and mostly-correct execution, with occasional characteristic slips (e.g., using *z* where *t* is needed at n = 40, mis-stating the CI logic). The scheme rewards exactly this surface competence.

**The "bare number is not an answer" instruction — weak protection.** Models interpret context sentences fluently; the instruction raises output quality but doesn't test whether the *student* can interpret.

**Interpretation items (Q2, Q4) — moderately at risk.** Concept definitions are memorisation-shaped; AI handles them reliably. What AI cannot do is connect the concept to *this class's* data or *this student's* mistake history.

**The "no AI" rule itself — the biggest vulnerability is the policy, not the questions.** An unenforceable ban converts an assessment into an honesty lottery: it rewards students who break it undetected and generates suspicion of everyone. This is the design failure the [redesign](redesign.html) fixes first.

**What survives in the original:** nothing structural. The take-home artefact is the only evidence; the midterm (a separate secure assessment) is what actually catches the gap — after the problem set has already taught the wrong lesson.

**What the agent run adds:** under the Determined prompt, the agent answered Q1 to Q4 without a single arithmetic, formula or interpretation error, and used *t* rather than *z*. The characteristic slips the analysis expected did not appear in this one output. The only thing it could not supply was a drawn sketch. This supports the high-risk rating for standard computation and template interpretation.

**What we did NOT conclude:** one self-checked agent output does not show what other models, other prompts or real students would produce. We conclude the task *cannot tell us who learned what*, which is the validity problem.

## Re-test (redesigned task)

**Not run.** The [redesign](redesign.html) splits the task into an open practice lane (AI-as-tutor, where strong AI performance is the point) and a secure lane (in-class checks on the same skills, where it isn't). Protocol step 5 would test the open-lane and "find and fix the AI error" items against the new rubric; it has not been carried out, by models or by the agent. The secure lane is deliberately not stress-tested by AI: its validity comes from the in-class condition, not from model resistance.
