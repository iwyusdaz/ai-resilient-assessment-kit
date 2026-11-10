# Agent-simulated stress test: results summary (original tasks)

**Run date:** 2026-11-11 · **Performed by:** one AI agent (the Kiro build agent working in this repository's workspace), single model, no API, no human scorer.

**Method label:** *agent-simulated stress test (single model, self-scored).* This is not human scoring, not a blind judge panel, and not real student work. It replaces the planned blind cross-model design in [docs/research/stress-test-protocol.md](../../../docs/research/stress-test-protocol.md), which could not be reproduced without model APIs.

## What was run

| Step | What the agent did |
|---|---|
| 1. Generate | Wrote one submission per case under the **Determined** strategy only (brief + original rubric + "revise toward the top band"), using the exact prompts on each case's stress-test page. Case C used the dataset summary from its page; there is no raw dataset. Outputs: [A-determined.md](A-determined.md), [B-determined.md](B-determined.md), [C-determined.md](C-determined.md). |
| 2. Check references | Looked up every reference (8 in A, 8 in C) with a web search on 2026-11-11 and recorded whether the work exists and which details the search results confirmed. |
| 3. Check computations | Recomputed every number in B and C with a Node.js calculation (t distribution via the regularized incomplete beta function). |
| 4. Score | Scored each submission against the **original** rubric, criterion by criterion, and listed weaknesses. |

**Not run in this round:** the Naive and Moderate strategies, a second model, blind anonymised judging, judge agreement statistics, and the re-test on the redesigned tasks (protocol step 5).

## Scores (original rubrics, agent self-scored)

| Submission | Case | Criterion scores | Total | Length vs. brief |
|---|---|---|---|---|
| A-determined | SOC 101 essay (20 pts) | Thesis & argument 5 · Use of evidence 4 · Analysis & depth 5 · Writing & organization 4 | **18/20** | 1,270 of 1,500 words |
| B-determined | STAT 201 problem set (20 pts) | Q1 to Q4: method and answer correct on every item; Q2's sketch given as a text description only. Q5 to Q10 not answerable (the brief only describes them) | **No total** (Q1 to Q4 point split not given in the brief) | n/a |
| C-determined | PSY 250 report (30 pts) | Introduction 6/6 · Method 4/5 · Results 4/7 · Discussion 5/7 · Writing & APA 4/5 | **23/30** | 1,157 of 2,000 words |

## Reference check (web search, 2026-11-11)

- **A:** 8 of 8 references exist (title, authors, journal and year match search results). Volume, issue or pages were confirmed for 4 (Braghieri et al., Orben et al. 2022, Valkenburg et al., Twenge et al. issue); DOIs were confirmed for 6 (all except Kelly et al. and Valkenburg et al.).
- **C:** 8 of 8 references exist. Volume and pages were confirmed for 7 (all except Hoge et al., whose pages were not shown in the search results); DOIs were not individually checked.
- **Fabricated references found: 0.** The agent wrote the references from its own knowledge and did not open the full texts.
- **Detail-level problems a reader would only catch by opening the sources (A):** the essay says Orben and Przybylski (2019) covered "more than 350,000 adolescents", while the Oxford Internet Institute summary describes about 300,000 adolescents and parents; and it reports Braghieri et al.'s rise in mental-health service use for students in general, while the paper reports it for students predicted to be most susceptible.

## Computation check (Node.js recalculation)

| Submission | Values checked | Errors |
|---|---|---|
| B | SE 1.439; t\*(39) 2.023; CI (69.49, 75.31); t = −1.81, p = .078; n = 160 margin 1.42 | Arithmetic 0 · formula 0 · interpretation 0 |
| C | t(148) = 4.47, p < .001; d = 0.73; 95% CI [3.18, 8.22]; Welch t(146.5) = 4.47; SEs 0.95 and 0.85 | Arithmetic 0. One unstated-in-data assumption (equal groups of 75, disclosed in the report). One unsupported inference: the Discussion says anxiety fell "from a shared baseline level", but baseline means by condition are not in the summary. |

## Weaknesses found (by criterion)

- **A, use of evidence (4/5):** the two detail-level problems above. **A, writing (4/5):** 230 words under the required length.
- **B:** the "sketch" in Q2 is a text description; a text-only tool cannot draw one. Nothing in Q1 to Q4 ties to this class's data or to a student's own mistakes.
- **C, Method (4/5):** group sizes assumed, control activity not described (the summary does not describe it). **C, Results (4/7):** an independent t-test on post-task scores is not the best test for a pre/post design (ANCOVA with baseline as covariate is, as the report itself says); Figure 1 is described, not drawn. **C, Discussion (5/7):** the unsupported "shared baseline" inference. **C, writing (4/5):** 843 words under length.

## What this run supports and what it changes

- **Supported:** criteria that reward fluency, structure, a sustained argument, a well-handled counter-argument and template computation were satisfied by a single prompt with no course-specific input (A thesis 5/5, A analysis 5/5, C introduction 6/6, B Q1 to Q4 without error). This matches the vulnerability analyses for all three cases.
- **Changed:** the Case A and Case C analyses expected plausible but fabricated references. In this run none were fabricated. The weakness was different: the sources were real but unread, and two details were wrong in ways that only reading the source would reveal. The redesigned Case A verification gate (page-anchored quotation, one detail the citation alone could not supply) targets exactly that, while an "exists or not" reference check would have passed this essay.
- **Not shown:** what other models, other strategies or real students would produce, and whether the redesigned tasks hold up (not re-tested).

## Limitations (stated wherever these results appear)

1. **Single model, self-scored, not blind.** The same agent wrote, checked and scored every submission, knew which strategy it used, and had read the kit's vulnerability analysis beforehand. Scores may be biased in either direction; no agreement statistic exists.
2. **One strategy, one output per case.** Three submissions cannot show variation across prompts or runs.
3. **The agent is not a typical student tool.** It worked from its own knowledge with no browsing during generation; other tools may fabricate more or less, or retrieve sources.
4. **No human validation.** A human second scorer remains the planned upgrade (see [evaluation/METHODS.md](../../../evaluation/METHODS.md)).
