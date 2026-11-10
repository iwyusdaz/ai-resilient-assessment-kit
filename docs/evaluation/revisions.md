---
title: Revisions log
nav_order: 12
---

# Revisions log

Every documented evaluation (agent review, agent-simulated runs, educator review, real workshop delivery) lands its accepted and rejected changes here. **No invented feedback**, per the kit's honesty rules.

## How entries are made

| Field | Meaning |
|---|---|
| Source | Which evaluation produced it ("Agent review, fresh-context reviewer, 2026-xx-xx" / "Educator #2, statistics lecturer" / "Simulated participant P4") |
| Finding | What the reviewer said, in one or two sentences |
| Change | What changed in the repo (file + substance), or **Rejected** with the reason |

## Not yet run

| # | Source | Status | Change |
|---|---|---|---|
| H1 | *Educator review (≥3 human educators)* | **Not yet recruited**; form ready in [`evaluation/human-protocol/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/tree/main/evaluation/human-protocol) | None yet |
| H2 | *Real workshop delivery* | **Not run**; survey and review form ready | None yet |

## Agent-simulated runs (one AI agent, single model, 2026-11-11)

Source files: [review panel](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/evaluation/results/review-panel-summary.md) (12 role-played reviews: 2 major, 21 minor issues), [simulated participants](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/evaluation/results/simulated-participants-summary.md) (35 persona judgments: 11 flags) and the [stress test](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/research/results/agent-stress-test-2026-11-11/summary.md). One agent played every role and persona and may share the author's underlying model; these are not educator or participant feedback. **None of the findings has been applied yet**; they are open revision candidates. S1 and S2 are the two major findings:

| # | Source | Finding | Change |
|---|---|---|---|
| S1 | Agent-simulated panel, R1 (Case A) | The defence is marked for a sampled fifth only; for the other students it earns a completion mark, but the redesign page presents it as the secure check for everyone | **Open** |
| S2 | Agent-simulated panel, R3 (Case A) | If every student completes a five-minute live defence, that is about 15 hours of tutorial time, the cost used to reject orals for all 180 | **Open** |
| S3 | Agent-simulated participants (11 flags) and panel (21 minor issues) | Timing, clarity and accessibility details listed in the two summaries, e.g. a 2-minute break, no move time in the gallery walk, QR-only post-survey link, Case C grading-map mismatch | **Open** |
| S4 | Agent-simulated stress test (Cases A and C) | All 16 references were real; the expected fabrication did not appear, but the essay misstated two source details it had not read | **Stated** on the Case A and C stress-test pages next to the analysis; no redesign change needed (the verification gate already targets unread sources) |

## Agent review (fresh-context reviewer agent, 2026-10-26)

Full review: [`evaluation/agent-review.md`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/blob/main/evaluation/agent-review.md) (labelled as agent review; the reviewer may share the author's underlying model, and says so). The judgment calls behind the dispositions below are recorded as R1–R4 in `DECISIONS.md`.

| # | Finding | Change |
|---|---|---|
| 1 | Case B open-lane weight contradicted itself (15% vs 10%) | **Accepted** — standardized on 10% in `case-b-problem-set/redesign.md` + `student-brief.md`; the rubric's assessment-change summary now states the full weight story (original sets were 10% each) |
| 2 | Grading-time arithmetic didn't reconcile in all three faculty-notes pages | **Accepted** — every table recomputed so rows sum to the headline: Case A ~14–16 min/student (defence amortisation stated), Case B ≈68 h vs ≈210–250 h ("roughly 30%", was "about half"), Case C 13.5–14.5 min/student with Q&A aligned at 2 min/student; downstream repetitions fixed (slide 8, pushback table, Case C redesign "drops slightly" → "roughly 30%") |
| 3 | Workshop segments overflowed (sprint 33 min of steps in 28; closing 10 in 8; 25–40 script out of sync with the deck; demo scoring only fits as a skim; gallery walk under-specified) | **Accepted** — sprint rebalanced to 4/4/6/8/4 (+2 min buffer) with the decision tool as an early-finisher option (guide, canvas retitled "the 26-minute sprint", slide 10); closing runs the post-survey in parallel and caps the go-around at six pairs; 25–40 script rewritten to follow the deck's four principle slides; gut-score skim made explicit (guide + slide 3); gallery walk capped at exactly 2 canvases × 4 min + 4-min harvest, online pre-assigns doc pairs; designed group size stated (12–30 participants, 6–15 pairs) |
| 4 | Decision tool logic holes: 50 assurance combinations with no secure check; `ai-collab` evidence unused; unreachable empty state | **Accepted** — assurance + take-home rule added (rationale points to Case B's "does not solve"); two `ai-collab` rules added; empty state replaced by a low-confidence warning at top score ≤ 2 (threshold recomputed after the new rules; see DECISIONS R3); verified over all 972 combinations: 0 assurance combos without a secure check, 0 empty results |
| 5 | Decision tool + slides absent from the sidebar nav | **Accepted** — both pages now carry front matter (`layout: none` keeps the hand-built HTML output identical); a Research parent page joins the nav with the moved research layer (finding 9) |
| 6 | Focus yanked to the results heading on every re-answer | **Accepted** — focus moves on first reveal only; recomputes announce via the live region ("Results updated: …"); test T12 added |
| 7 | Case C contradictions (Q&A "two questions" vs three anchors; collection "part of 8%" vs 8%+8%) | **Accepted** — three anchors everywhere (brief, redesign, faculty notes); rubric's honest 38→30% structure adopted in brief (scaling note added) and redesign; Q&A minutes aligned (finding 2) |
| 8 | Case A stress-test said "AI Collaboration on the annotated-source commentary"; the redesign sets that stage to No AI | **Accepted** — corrected to "on the draft and its AI-use log" |
| 9 | Research layer 404 on the live site; links routed to GitHub blobs mid-read | **Accepted** — `research/literature-notes.md` + `stress-test-protocol.md` moved to `docs/research/` (with a Research parent page); all in-page links now point at site pages; the pipeline scripts stay in `research/` (imports unchanged); link checker updated (163 links, all resolve) |
| 10 | Redesigns add graded weight with no statement of where it comes from; Case A criterion 4 cited an undeclared outcome | **Accepted** — one "where the grade weight comes from" note per faculty-notes page (A: Essay 1 −10% at adoption; B: from the old sets' ≈50%; C: none new, 38→30 scaling); the AI-literacy outcome is now declared in Case A's redesign outcome section |
| 11 | Pre-survey "in minutes 0–2" unrealistic for 5 Likert + 2 open questions | **Accepted** — calendar-invite only (~5 min), non-responders excluded from pre/post means (survey.md data handling); closing segment runs the post-survey in parallel |
| 12 | (below the cut) Gallery-walk rotation count and group size unspecified; `tool.js` dead `remaining` variable | **Accepted** — rotation cap + group size added (finding 3); dead variable removed |
| 13 | (below the cut) Homepage "If you teach" path lists the decision tool third | **Not changed** — mitigated by finding 5: the tool is now a first-level sidebar entry; the reading path (principles → case → tool) stays intentional |
| 14 | (below the cut) Slides have no position cue ("slide 5 of 13") | **Not changed** — documented trade-off (DECISIONS D4); slide headings already carry their number |

## Known gaps already on the list

1. The workshop agenda's timing (90 minutes) has **not** been validated by delivery. The facilitator guide's timings are estimates; the agent-simulated participants judged 33 of 35 persona and segment timings realistic, which is not delivery evidence.
2. The stress-test score tables come from one agent-simulated, self-scored run (one Determined output per case). The planned blind cross-model run and the re-test on the redesigns have not been done; the vulnerability analyses remain reasoning.
