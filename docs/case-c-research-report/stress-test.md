---
title: "Case C: Stress test"
parent: "Case C: Original assignment"
nav_order: 2
---

# Case C — stress test

{: .note }
**Status of this page.** Protocol and prompts are final; the vulnerability analysis is our **design reasoning, not measured results**. A smaller **agent-simulated stress test** was run on 2026-11-11: one AI agent (single model, no API) wrote one Determined-strategy report from the dataset summary and scored it against the original rubric itself. That result is below, labelled as such. The planned blind cross-model judge panel was not run, because it needs model APIs. No constructed example of AI output appears here; the only AI output linked is the agent's actual submission.

## Method

The [stress-test protocol](../research/stress-test-protocol.html) describes the full design, with a Case C addition: the brief is accompanied by a **data summary** (the provided dataset's codebook and descriptive statistics) as the prompt context, because that is how a student would use AI realistically: pasting the summary, not the full 150-row file. The full design was not run. What was run is a smaller agent-simulated version:

| Run parameter | Planned (not run) | Run on 2026-11-11 |
|---|---|---|
| Models | MODEL_A, MODEL_B | One AI agent (the Kiro build agent), single model, no API |
| Context | Brief + dataset codebook + descriptives summary | Brief + the summary shown below (no raw dataset exists) |
| Strategies | Naive · Moderate · Determined | Determined only |
| Outputs | 6 (3 strategies × 2 models) | 1 |
| Judges | Blind panel; no model judges its own output | The same agent, not blind |
| Rubric | Original 30-point scheme | Original 30-point scheme |
| Extra | Statistical-accuracy census: test choice, reported statistics, figure description vs. codebook | Same census; every statistic recomputed with a Node.js calculation; every reference looked up by web search |

## Exact prompts

**Naive** — the brief verbatim plus:

```text
[Dataset summary attached: n=150; condition = mindfulness/control;
pre_anxiety, post_anxiety (0–50 scale); age, gender, year of study.
Descriptives: pre M=31.2 (SD 7.9); post mindfulness M=24.1 (SD 8.2),
post control M=29.8 (SD 7.4).]
```

**Moderate** — brief + summary plus:

```text
Write as a competent second-year psychology student: correct structure,
occasionally uneven prose, the kind of interpretation a student gives when
the statistics ran clean but the meaning is still sinking in.
```

**Determined** — brief + summary + full 30-point rubric plus:

```text
Revise toward the top band of every rubric criterion. Report the correct
APA-style statistics for the design, include a figure description, and make
the discussion specific to these numbers.
```

## Score table (original scheme, 30 points)

**Agent-simulated, single model, self-scored.** Not human marking and not a blind panel.

| Submission | Strategy | Intro (6) | Method (5) | Results (7) | Discussion (7) | Writing & APA (5) | Total | Statistical errors found |
|---|---|---|---|---|---|---|---|---|
| C-determined | Determined | 6 | 4 | 4 | 5 | 4 | **23/30** | Arithmetic 0. Test choice weaker than the design calls for (t-test on post scores, not ANCOVA; the report says so). Equal groups of 75 assumed (disclosed). One unsupported inference ("from a shared baseline level"). Figure described, not drawn. |
| Naive, Moderate, second model | | | | | | | not run | |

Other weaknesses: 1,157 of the required 2,000 words. All 8 references exist (web check). The raw submission, the recalculation and the scoring notes are in [`research/results/agent-stress-test-2026-11-11/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/results/agent-stress-test-2026-11-11/summary.md). Limits: one agent wrote and scored its own output, knew the strategy, and had read this analysis first.

## Vulnerability analysis (design reasoning, not measured results)

**Method, Results, References — at the highest risk, jointly.** Given the summary, a model writes a complete APA report: correct test for a 2×2 pre/post design (mixed ANOVA or ANCOVA), plausible APA statistics computed from the descriptives, a described figure, and a reference list with plausible-but-uncheckable entries. The original rubric awards 12 of 30 points to exactly this (Method 5 + Results 7). Graders who cannot re-run every analysis — which is everyone at 120 students — are marking the prose of statistics, not the statistics.

**Introduction — high risk.** The literature on mindfulness and performance anxiety is enormous; a fluent, well-formed intro citing real (and some fabricated) papers is a model strength.

**Discussion — moderately at risk.** Generic interpretation ("the intervention was effective; however, the sample was limited…") is fluent. What models cannot supply: the *specific* mess of this data collection (who dropped out, what the class actually did, which measuring choice caused trouble) and a genuine next decision grounded in it.

**The provided-data design itself is the root vulnerability.** The dataset is instructor-owned and course-generic: nothing in it belongs to the student, so nothing anchors the report to the student's own work. Any secure claim ("the analyses are your own") is unenforceable against a model that does statistics competently.

**What survives in the original:** nothing structural. Even the "statistics must be your own" line adds only friction — the descriptives summary is enough to generate a top-band-shaped report.

**What the agent run adds:** from the summary alone, the agent produced a structured APA report that it scored 23/30, with full marks on the introduction. Two expectations in the analysis did not hold in this one output: the agent did not invent mixed-ANOVA or ANCOVA statistics (it computed only what the summary allows and named the better test as a limitation), and none of its references were fabricated. The Results and Discussion marks were lost on test choice, an undrawn figure and one unsupported inference, which a marker can only catch by checking the statistics against the data.

**What we did NOT conclude:** one self-scored agent output does not show what other models, other prompts or real students would produce. We conclude the task yields no valid evidence of the student's analytic capability, which makes the redesign question structural, not cosmetic.

## Re-test (redesigned task)

**Not run.** The [redesign](redesign.html) makes part of the data the class's own and grades the notebook and Q&A, which AI cannot produce. The AI-completable remainder (the prose of the report, with disclosure) is left open by design. Protocol step 5 would run the strategies against the redesigned brief and new rubric; it has not been carried out, by models or by the agent. The expected answer remains "the write-up", which the assessment no longer treats as the evidence.
