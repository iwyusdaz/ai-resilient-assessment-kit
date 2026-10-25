---
title: "Case C: Stress test"
parent: "Case C: Original assignment"
nav_order: 2
---

# Case C — stress test

{: .note }
**Status of this page.** Protocol and prompts are final; the vulnerability analysis is our **design reasoning, not measured results**. **All score tables are PENDING — requires API key.** No fabricated AI outputs or scores appear here, and no "constructed example" of AI output is included: anything shown pre-run would be our writing presented as a model's, which this kit refuses to do.

## Method

Per the [stress-test protocol](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/stress-test-protocol.md), with a Case C addition: the brief is accompanied by a **data summary** (the provided dataset's codebook and descriptive statistics) as the prompt context, because that is how a student would use AI realistically — pasting the summary, not the full 150-row file.

| Run parameter | Value |
|---|---|
| Models | MODEL_A, MODEL_B (names recorded at run time) |
| Context | Brief + dataset codebook + descriptives summary |
| Strategies | Naive · Moderate · Determined |
| Outputs | 6 (3 strategies × 2 models) |
| Judges | Blind panel; no model judges its own output (A→B+C, B→A+C) |
| Rubric | Original 30-point scheme |
| Extra | Statistical-accuracy census: test choice, reported statistics, figure description vs. codebook |

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

| Submission | Strategy | Judge 1 | Judge 2 | Mean | Judge diff | Statistical errors found |
|---|---|---|---|---|---|---|
| C-1 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| C-2 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| C-3 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| C-4 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| C-5 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |
| C-6 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |

Raw outputs, judge prompts and the statistical-accuracy census will be committed under `research/results/stress-test/` after the first real run.

## Vulnerability analysis (design reasoning, not measured results)

**Method, Results, References — at the highest risk, jointly.** Given the summary, a model writes a complete APA report: correct test for a 2×2 pre/post design (mixed ANOVA or ANCOVA), plausible APA statistics computed from the descriptives, a described figure, and a reference list with plausible-but-uncheckable entries. The original rubric awards 12 of 30 points to exactly this (Method 5 + Results 7). Graders who cannot re-run every analysis — which is everyone at 120 students — are marking the prose of statistics, not the statistics.

**Introduction — high risk.** The literature on mindfulness and performance anxiety is enormous; a fluent, well-formed intro citing real (and some fabricated) papers is a model strength.

**Discussion — moderately at risk.** Generic interpretation ("the intervention was effective; however, the sample was limited…") is fluent. What models cannot supply: the *specific* mess of this data collection (who dropped out, what the class actually did, which measuring choice caused trouble) and a genuine next decision grounded in it.

**The provided-data design itself is the root vulnerability.** The dataset is instructor-owned and course-generic: nothing in it belongs to the student, so nothing anchors the report to the student's own work. Any secure claim ("the analyses are your own") is unenforceable against a model that does statistics competently.

**What survives in the original:** nothing structural. Even the "statistics must be your own" line adds only friction — the descriptives summary is enough to generate a top-band-shaped report.

**What we did NOT conclude:** we have not measured the scores. We conclude the task yields no valid evidence of the student's analytic capability, which makes the redesign question structural, not cosmetic.

## Re-test (redesigned task)

**PENDING — requires API key.** The [redesign](redesign.html) makes part of the data the class's own and grades the notebook and Q&A, which AI cannot produce. The AI-completable remainder (the prose of the report, with disclosure) is left open by design. `research/run-stress-test.mjs --redesign` will run the three strategies against the redesigned brief + new rubric and report what AI can still do — the expected answer is "the write-up," which the assessment no longer treats as the evidence.
