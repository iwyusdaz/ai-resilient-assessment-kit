---
title: Revisions log
nav_order: 12
---

# Revisions log

Every documented evaluation (agent review, educator review, simulated-participant pipeline, real workshop delivery) lands its accepted and rejected changes here. **No invented feedback**, per the kit's honesty rules.

## How entries are made

| Field | Meaning |
|---|---|
| Source | Which evaluation produced it ("Agent review, fresh-context reviewer, 2026-xx-xx" / "Educator #2, statistics lecturer" / "Simulated participant P4") |
| Finding | What the reviewer said, in one or two sentences |
| Change | What changed in the repo (file + substance), or **Rejected** with the reason |

## Pending entries

| # | Source | Finding | Change |
|---|---|---|---|
| — | *Multi-model review panel* | **PENDING: requires API key** (`evaluation/run-review-panel.mjs`) | — |
| — | *AI-simulated workshop participants* | **PENDING: requires API key** (`evaluation/run-simulated-participants.mjs`) | — |
| — | *Educator review (≥3 human educators)* | **Not yet recruited** — form ready in [`evaluation/human-protocol/`](https://github.com/iwyusdaz/ai-resilient-assessment-kit/tree/main/evaluation/human-protocol) | — |

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

1. The workshop agenda's timing (90 minutes) has **not** been validated by delivery — the facilitator guide's timings are estimates; the simulated-participant pipeline is designed to stress them.
2. The stress-test score tables are pending the API run; the vulnerability analyses are reasoning, and will be revised against measured results if the data disagrees.
