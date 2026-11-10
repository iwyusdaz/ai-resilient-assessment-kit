---
title: Stress-test protocol
nav_order: 2
parent: Research
has_toc: false
---

# Stress-test protocol

How this kit tests an assignment against generative AI **before** redesigning it, and how the results are produced and reported. Results tables live in each case's `stress-test.html` page.

{: .note }
**What has actually been run.** The full design below (two models, three strategies, blind cross-judging) has **not** been run, because it needs model APIs. On 2026-11-11 a smaller **agent-simulated** version was run instead: one AI agent (single model, no API) wrote one Determined-strategy submission per case, looked up every reference by web search, recomputed every statistic, and scored its own output against the original rubric. It was not blind and has no second judge, so no agreement figure exists. Results and raw outputs: [`research/results/agent-stress-test-2026-11-11/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/results/agent-stress-test-2026-11-11/summary.md). The re-test on the redesigned tasks (step 5) has not been run.

## Ethics and scope

- Only briefs written for this kit are used. The three originals are fictional but realistic. **No real student work, and no real course briefs, are used anywhere.**
- Outputs and scores are method evidence about *the assignments*, not about any student, instructor or institution.

## Step 1 — Originals

Each case starts with a realistic first- or second-year brief and its original rubric:

- [Case A — argumentative essay](../case-a-essay/original.html)
- [Case B — take-home problem set](../case-b-problem-set/original.html)
- [Case C — lab-style research report](../case-c-research-report/original.html)

## Step 2 — Generate outputs

Each original brief is given to **two different AI models** (MODEL_A and MODEL_B — different model families, recorded by name and version from the configuration at run time) using **three prompt strategies**:

| Strategy | Prompt |
|---|---|
| **Naive** | The assignment brief alone, pasted verbatim. |
| **Moderate** | Brief + "write as a first-year student would, in your own voice, with believable time pressure". |
| **Determined** | Brief + full original rubric + "revise toward the top band of every criterion; use your best effort". |

That is 3 cases × 3 strategies × 2 models = **18 outputs** per full run.

Prompts are exactly reproducible: each case's stress-test page gives the exact prompt text, and every saved output records the prompt it answered.

## Step 3 — Blind scoring by a judge panel

- Outputs are stored **anonymised and shuffled** ("Submission 1", "Submission 2", …). Judges never see which model or strategy produced a submission, and no model ever judges its own output:
  - MODEL_A outputs → scored by **MODEL_B + MODEL_C**
  - MODEL_B outputs → scored by **MODEL_A + MODEL_C**
- Each judge scores every submission **against the original rubric** (criterion by criterion) and lists observed weaknesses (e.g. unverifiable citations, calculation errors, no link to course-specific content).
- Reported per submission: each judge's criterion scores, the two-judge total, the absolute difference between judges, and per-criterion exact agreement. Agreement is a simple concordance statistic, not inter-rater reliability in the psychometric sense.

## Step 4 — Vulnerability analysis

For each case, the pattern of scores and weaknesses is analysed: which rubric criteria AI satisfies easily, which it struggles with, and why. The analysis in each case's `stress-test.html` page is **our reasoning about why the assignment is vulnerable, based on the design of the task and published evidence. It stays labelled "analysis, not measured results"; each case page states where the agent-simulated run supports or contradicts it.**

## Step 5 — Redesign and re-test

Each case is redesigned (see each case's `redesign.html`), and the stress test is re-run **on the redesigned task** (not yet done): same strategies adapted to the new brief, scored against the **new** rubric. Redesigns deliberately leave some parts in the open lane where AI use is allowed. AI completing those parts is expected and acceptable, because the secure parts provide the valid evidence of individual achievement. The re-test asks: *what can AI still do, and is what remains graded valid?*

## Reproducing the results

- **Agent-simulated version (what was run):** give each case's exact Determined prompt (on its stress-test page) to an AI tool, save the raw output, look up every reference, recompute every statistic, and score against the original rubric. Record the tool, the date and who scored. The 2026-11-11 run is the worked example.
- **Full design (not run):** generate with two different models under all three strategies, anonymise and shuffle the outputs, and have each output scored by two models other than the one that produced it. This needs access to at least three models.
- Raw outputs, checks and scores are committed under `research/results/`, one dated folder per run.

## Known limitations

- Results apply to the exact models, prompts and date of the run; AI capabilities change quickly. The method is reusable; the numbers are not portable.
- The agent-simulated run has one self-scoring judge, which is weaker than the planned two blind judges; even two judges cannot establish reliable scoring on their own. A human colleague scoring the same outputs is the planned upgrade (see [evaluation/METHODS](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/evaluation/METHODS.md)).
- Scoring is against our rubrics only; other rubrics might produce different vulnerability patterns.
