---
title: "Case A: Stress test"
parent: "Case A: Original assignment"
nav_order: 2
---

# Case A — stress test

{: .note }
**Status of this page.** The protocol, prompts and vulnerability analysis are complete. A smaller **agent-simulated stress test** was run on 2026-11-11: one AI agent (single model, no API) wrote one Determined-strategy submission and scored it against the original rubric itself. That result is below, labelled as such. The planned blind cross-model judge panel was not run, because it needs model APIs. The vulnerability analysis is our **design reasoning, not measured results**, based on the task's design and the published evidence in the [literature notes](../research/literature-notes.html); where the agent run disagrees with it, that is stated.

## Method

The [stress-test protocol](../research/stress-test-protocol.html) describes the full design: two different AI models, three prompt strategies, anonymised outputs scored blind by a two-judge panel in which no model judges its own output. That design was not run. What was run is a smaller agent-simulated version:

| Run parameter | Planned (not run) | Run on 2026-11-11 |
|---|---|---|
| Models | MODEL_A and MODEL_B, different families | One AI agent (the Kiro build agent), single model, no API |
| Strategies | Naive · Moderate · Determined | Determined only |
| Outputs | 3 strategies × 2 models = 6 | 1 |
| Judges | Two other models per output, blind | The same agent, not blind |
| Extra checks | | Every reference looked up by web search |
| Rubric | The original 20-point rubric above | The original 20-point rubric above |

## Exact prompts used

**Strategy 1 — Naive** (verbatim):

```text
SOC 101 — Essay 2 (25% of course grade)

Task: Write an argumentative essay of 1,500 words on the following question:
Does social media use harm adolescent mental health?
Take a clear position and defend it. Your essay must:
- State a thesis in the introduction and sustain it throughout.
- Use at least five scholarly sources (peer-reviewed journal
  articles or academic books), cited in APA 7 style.
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

**Agent-simulated, single model, self-scored.** Not human scoring and not a blind panel.

| Submission | Strategy | Thesis & argument | Use of evidence | Analysis & depth | Writing & organization | Total | Key weaknesses found |
|---|---|---|---|---|---|---|---|
| A-determined | Determined | 5 | 4 | 5 | 4 | **18/20** | 1,270 of the required 1,500 words; two source details misstated (a sample size, and a subgroup finding reported for all students). All 8 references exist (web check), but the agent had not read them. |
| Naive, Moderate, second model | | | | | | not run | |

The raw submission, the reference check and the scoring notes are in [`research/results/agent-stress-test-2026-11-11/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/results/agent-stress-test-2026-11-11/summary.md). Limits: one agent wrote and scored its own output, knew the strategy, and had read this analysis first; one output cannot show variation.

## Vulnerability analysis (design reasoning, not measured results)

This is the analysis that drove the [redesign](redesign.html). It is our judgment of how the task holds up against capable AI models, with the reasoning stated so it can be contested.

**Criterion 1 (Thesis & argument) — at high risk.** A fluent, well-structured argument on a heavily-discussed public topic is exactly what current models produce best. The prompt constrains nothing that a generic model hasn't seen hundreds of times: the topic has no class-specific content, no local context, and no personal anchor. We expect high scores here regardless of strategy.

**Criterion 2 (Use of evidence) — at highest risk, and subtly so.** Models generate plausible APA-formatted references, including confident fabrications. A rubric that awards points for "5 sources, APA format" mostly rewards *the formatting of citation*, not *the existence and reading of sources* — unless the grader checks each reference (which TAs processing 90 essays each typically cannot). This is the criterion most likely to pass a marker while containing fabricated scholarship. The redesign attacks this directly with a **verified-source gate**.

**Criterion 3 (Analysis & depth) — moderately at risk.** Generic models engage counter-arguments well in the abstract ("some argue…, however…"). What they cannot supply from the prompt alone: *why this argument matters to this class's discussions, or to a specific community the student knows*. The original brief asks for none of that, so the criterion collapses into more fluent generic analysis. The redesign adds a required **defence of one argument choice** tied to the student's own materials.

**Criterion 4 (Writing & organization) — not diagnostic at all.** Fluency is the one thing modern models do flawlessly. A criterion that grades fluency is a criterion AI satisfies for free; it no longer discriminates between students who did and did not learn anything.

**What survives:** in the original design, essentially nothing is secure. The take-home artefact is the only evidence, and every rubric criterion rewards the artefact itself.

**What the agent run adds:** a single Determined prompt produced an essay the same agent scored 18/20, with full marks on thesis and analysis, which supports the risk ratings for criteria 1, 3 and 4. It did **not** support the expectation of fabricated citations: all eight references were real. The weakness was that they were unread, so two details were wrong in ways only opening the source would show. That is the gap the redesign's verification gate (a page-anchored quotation and one detail the citation alone could not supply) targets; a check that only asks whether each reference exists would have passed this essay.

**What we did NOT conclude:** one self-scored agent output does not show what other models, other prompts or real students would produce. We conclude that the task *yields no evidence that distinguishes* AI-completed from student-completed work, which is a validity problem regardless of the measured scores.

## Re-test (redesigned task)

**Not run.** Protocol step 5 (the same strategies against the redesigned brief and the **new** rubric) has not been carried out, by models or by the agent. Parts of the redesign are deliberately open (AI Collaboration on the draft and its AI-use log), so AI can still complete those parts well; that is by design. The re-test question remains whether the *secure* parts (the verification gate, the defence) still discriminate.
