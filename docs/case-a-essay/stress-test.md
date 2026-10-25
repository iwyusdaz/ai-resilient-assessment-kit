---
title: "Case A: Stress test"
parent: "Case A: Original assignment"
nav_order: 2
---

# Case A — stress test

{: .note }
**Status of this page.** The protocol, prompts and vulnerability analysis are complete. **All score tables are PENDING — requires API key.** The vulnerability analysis below is our **design reasoning, not measured results**: it states what we expect AI to satisfy easily and why, based on the task's design and the published evidence cited in the [literature notes](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/literature-notes.md). When the pipeline runs, measured scores will replace the PENDING tables and any analysis that the results contradict will be revised.

## Method

Per the [stress-test protocol](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/stress-test-protocol.md): the original brief above was (will be) given to two different AI models with three prompt strategies, outputs anonymised and shuffled, then scored blind by a two-judge panel in which no model judges its own output.

| Run parameter | Value |
|---|---|
| Models | MODEL_A and MODEL_B (names recorded by the pipeline at run time) |
| Strategies | Naive · Moderate · Determined (prompts below) |
| Outputs | 3 strategies × 2 models = 6 |
| Judges | MODEL_B + MODEL_C score MODEL_A outputs; MODEL_A + MODEL_C score MODEL_B outputs |
| Rubric | The original 20-point rubric above |
| Blind | Judges see "Submission 1…6" only — never model, strategy, or prompt |

## Exact prompts used

**Strategy 1 — Naive** (verbatim):

```text
SOC 101 — Essay 2 (25% of course grade)

Task: Write an argumentative essay of 1,500 words on the following question:
Does social media use harm adolescent mental health?
Take a clear position and defend it. Your essay must:
- State a thesis in the introduction and sustain it throughout.
- Use at least five scholarly sources (peer-reviewed journal articles or academic books), cited in APA 7 style.
- Engage with at least one counter-argument.
- Conclude with implications, not a summary.
```

**Strategy 2 — Moderate** = Strategy 1, plus:

```text
Write as a first-year university student would: competent but uneven, in
your own voice, under time pressure.
```

**Strategy 3 — Determined** = Strategy 1, plus the full original rubric and:

```text
Revise your essay toward the top band of every rubric criterion. Treat the
rubric as the scoring contract. Use your best effort.
```

## Score table (original rubric, 20 points)

| Submission | Strategy | Judge 1 total | Judge 2 total | Mean | Judge difference | Key weaknesses reported |
|---|---|---|---|---|---|---|
| A-1 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| A-2 | Naive | **PENDING: requires API key** | **PENDING** | — | — | — |
| A-3 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| A-4 | Moderate | **PENDING: requires API key** | **PENDING** | — | — | — |
| A-5 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |
| A-6 | Determined | **PENDING: requires API key** | **PENDING** | — | — | — |

Criterion-level scores and the exact judge prompts and raw outputs will be committed to `research/results/stress-test/` after the first real run. We deliberately do not include illustrative "sample AI output" text on this page: anything we could show here would be constructed, not generated, and this kit does not present constructed text as AI output.

## Vulnerability analysis (design reasoning, not measured results)

This is the analysis that drove the [redesign](redesign.html). It is our judgment of how the task holds up against capable AI models, with the reasoning stated so it can be contested.

**Criterion 1 (Thesis & argument) — at high risk.** A fluent, well-structured argument on a heavily-discussed public topic is exactly what current models produce best. The prompt constrains nothing that a generic model hasn't seen hundreds of times: the topic has no class-specific content, no local context, and no personal anchor. We expect high scores here regardless of strategy.

**Criterion 2 (Use of evidence) — at highest risk, and subtly so.** Models generate plausible APA-formatted references, including confident fabrications. A rubric that awards points for "5 sources, APA format" mostly rewards *the formatting of citation*, not *the existence and reading of sources* — unless the grader checks each reference (which TAs processing 90 essays each typically cannot). This is the criterion most likely to pass a marker while containing fabricated scholarship. The redesign attacks this directly with a **verified-source gate**.

**Criterion 3 (Analysis & depth) — moderately at risk.** Generic models engage counter-arguments well in the abstract ("some argue…, however…"). What they cannot supply from the prompt alone: *why this argument matters to this class's discussions, or to a specific community the student knows*. The original brief asks for none of that, so the criterion collapses into more fluent generic analysis. The redesign adds a required **defence of one argument choice** tied to the student's own materials.

**Criterion 4 (Writing & organization) — not diagnostic at all.** Fluency is the one thing modern models do flawlessly. A criterion that grades fluency is a criterion AI satisfies for free; it no longer discriminates between students who did and did not learn anything.

**What survives:** in the original design, essentially nothing is secure. The take-home artefact is the only evidence, and every rubric criterion rewards the artefact itself.

**What we did NOT conclude:** we have not measured that AI *will* score in the top band — that's what the pending run is for. We conclude that the task *yields no evidence that distinguishes* AI-completed from student-completed work, which is a validity problem regardless of the measured scores.

## Re-test (redesigned task)

**PENDING — requires API key.** The [redesign](redesign.html) will be stress-tested with the same three strategies against the **new** rubric (`research/run-stress-test.mjs --redesign`). Parts of the redesign are deliberately open (AI Collaboration on the annotated-source commentary), so AI can still complete those parts well — that is by design. The re-test question is whether the *secure* parts (the verification gate, the defence) still discriminate. The table will appear here after the run.
