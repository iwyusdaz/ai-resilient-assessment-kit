---
title: Stress-test protocol
nav_order: 13
parent: Research
has_toc: false
---

# Stress-test protocol

How this kit tests an assignment against generative AI **before** redesigning it, and how the results will be produced and reported. Results tables live in each case's `stress-test.html` page and stay empty and marked **PENDING** until the API pipelines are run with real keys. This protocol is also the method of record for the pending pipeline `research/run-stress-test.mjs`.

## Ethics and scope

- Only briefs written for this kit are used. The three originals are fictional but realistic. **No real student work, and no real course briefs, are used anywhere.**
- Outputs and scores are method evidence about *the assignments*, not about any student, instructor or institution.

## Step 1 — Originals

Each case starts with a realistic first- or second-year brief and its original rubric:

- [Case A — argumentative essay](../docs/case-a-essay/original.html)
- [Case B — take-home problem set](../docs/case-b-problem-set/original.html)
- [Case C — lab-style research report](../docs/case-c-research-report/original.html)

## Step 2 — Generate outputs

Each original brief is given to **two different AI models** (MODEL_A and MODEL_B — different model families, recorded by name and version from the configuration at run time) using **three prompt strategies**:

| Strategy | Prompt |
|---|---|
| **Naive** | The assignment brief alone, pasted verbatim. |
| **Moderate** | Brief + "write as a first-year student would, in your own voice, with believable time pressure". |
| **Determined** | Brief + full original rubric + "revise toward the top band of every criterion; use your best effort". |

That is 3 cases × 3 strategies × 2 models = **18 outputs** per full run.

Prompts are exactly reproducible: the pipeline composes them from the case files on disk and stores the exact prompt text alongside every output.

## Step 3 — Blind scoring by a judge panel

- Outputs are stored **anonymised and shuffled** ("Submission 1", "Submission 2", …). Judges never see which model or strategy produced a submission, and no model ever judges its own output:
  - MODEL_A outputs → scored by **MODEL_B + MODEL_C**
  - MODEL_B outputs → scored by **MODEL_A + MODEL_C**
- Each judge scores every submission **against the original rubric** (criterion by criterion) and lists observed weaknesses (e.g. unverifiable citations, calculation errors, no link to course-specific content).
- Reported per submission: each judge's criterion scores, the two-judge total, the absolute difference between judges, and per-criterion exact agreement. Agreement is a simple concordance statistic, not inter-rater reliability in the psychometric sense.

## Step 4 — Vulnerability analysis

For each case, the pattern of scores and weaknesses is analysed: which rubric criteria AI satisfies easily, which it struggles with, and why. The analysis in each case's `stress-test.html` page is **our reasoning about why the assignment is vulnerable, based on the design of the task and published evidence — it is labelled "analysis, not measured results" until the pipeline has run.**

## Step 5 — Redesign and re-test

Each case is redesigned (see each case's `redesign.html`), and the stress test is re-run **on the redesigned task** (`research/run-stress-test.mjs --redesign`): same strategies adapted to the new brief, scored against the **new** rubric. Redesigns deliberately leave some parts in the open lane where AI use is allowed — AI completing those parts is expected and acceptable, because the secure parts provide the valid evidence of individual achievement. The re-test asks: *what can AI still do, and is what remains graded valid?*

## Reproducing the results

```bash
cp .env.example .env     # fill in MODEL_A/B/C (OpenAI-compatible endpoints)
npm run eval:pending     # runs stress test + review panel + simulated participants
npm run eval:stress-test-redesign   # re-test on the redesigned tasks
```

- Without a configured `.env`, every pipeline exits with a clear message and makes **no network calls**.
- `--dry-run` exercises the full code path with stub responses into `dry-run/`, labelled "DRY RUN – NOT REAL RESULTS", never used as results.
- Raw outputs (prompts, full responses, judge scores, model names, timestamps) are saved under `research/results/stress-test/` and committed after a real run.

## Known limitations

- Results apply to the exact models, prompts and date of the run; AI capabilities change quickly. The method is reusable; the numbers are not portable.
- Two judges cannot establish reliable scoring on their own; a human colleague scoring the same outputs is the planned upgrade (see [evaluation/METHODS](../evaluation/METHODS.html)).
- Scoring is against our rubrics only; other rubrics might produce different vulnerability patterns.
