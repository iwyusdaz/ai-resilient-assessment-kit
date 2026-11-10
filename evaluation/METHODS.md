---
title: Evaluation methods
nav_order: 1
has_toc: false
---

# Evaluation methods — what we ran, what it can show, and what it cannot

Every piece of evidence in this repo is labelled with its method. This page is the index of methods, their status, and their limits. Update it after every new run (see "Updating results" below).

## Method 1 — Automated accessibility testing (complete)

- **What:** axe-core 4.11.1 audits (WCAG 2.1 A/AA + best practice) over the decision tool and workshop slides locally, and over every published page after the Pages build; Playwright 1.57.0 scripted keyboard-only, 320 px reflow and 400 %-zoom-equivalent tests of the decision tool; markdown-link integrity checks.
- **Where:** `evaluation/tests/` (re-runnable); results in `evaluation/results/accessibility/`.
- **Can show:** the pages pass the tested automated and scripted checks on the tested dates and browsers.
- **Cannot show:** WCAG conformance as a claim ("designed to support WCAG 2.1 AA" is the strongest statement anyone should make), real assistive-technology users' experience.

## Method 2 — Scripted task tests (complete)

- **What:** Playwright scripts that walk the decision tool's key tasks keyboard-only, at 320 px width, and at simulated 400 % zoom, count steps, and assert the accessibility contract (focus on results heading, Back/Start-over behaviour, error announcements).
- **Where:** `evaluation/tests/decision-tool-tests.mjs`.
- **Can show:** the flows work as specified for a keyboard user on the tested viewport sizes.
- **Cannot show:** the lived experience of screen-reader users (see Method 5's limitation).

## Method 3 — Agent review (complete at build time)

- **What:** a separate reviewer agent, in a fresh context, worked through the educator review form in `docs/evaluation/educator-review.md`. Labelled **Agent review** everywhere — never "educator review" or "expert feedback".
- **Limitation (always stated):** the reviewer agent may run on the same underlying model that drafted the content. Gap-finding only; no expert endorsement.
- **Where:** findings and changes land in `docs/evaluation/revisions.md`.

## Method 4: Agent-simulated review panel (done 2026-11-11, single model)
- **Who:** one AI agent (the Kiro build agent working in this repository's workspace) role-played three reviewer roles: R1 assessment design, R2 equity and accessibility, R3 feasibility and workload. No API, no second model, no human reviewer.
- **Scope:** 3 roles × 4 files (the three redesign pages and the facilitator guide) = 12 reviews, each with 1 to 5 scores (clarity, validity, feasibility, equity) and at most 6 location-tied issues.
- **Result:** scores of 3 to 5 throughout; **2 major issues** (both Case A defence: it is marked for a sampled fifth only, and a live defence for all 180 students would cost about 15 tutorial hours) and **21 minor issues**. All are open revision candidates in `docs/evaluation/revisions.md`; none has been applied yet. Full results: `evaluation/results/review-panel-summary.md`.
- **Limitation:** the planned design used two or three independent models per role with cross-model agreement. That could not be reproduced without model APIs. One agent played every role, had read the whole repository and may share the author's underlying model, so the roles are not independent and **no agreement figure is reported**.
- **Can show:** gaps a careful reader with each lens finds. **Cannot show:** human expert judgement; it is not educator feedback.

## Method 5: Agent-simulated stress test (done 2026-11-11, single model, self-scored)
- **Who:** the same AI agent. No API, no second model, no human scorer.
- **What:** one submission per case under the **Determined** strategy (brief + original rubric + "revise toward the top band"), using the exact prompts on the case pages; every reference looked up by web search; every statistic recomputed with Node.js; each submission scored against the original rubric by the same agent.
- **Result:** Case A 18/20; Case B Q1 to Q4 with 0 arithmetic, formula or interpretation errors (Q5 to Q10 cannot be answered from the brief; no points total); Case C 23/30. All 16 references exist; none was fabricated, but the essay misstated two source details it had not read. Both length targets were missed (1,270 of 1,500 and 1,157 of 2,000 words). Raw outputs and checks: `research/results/agent-stress-test-2026-11-11/`; tables on each case's stress-test page.
- **Not run:** the Naive and Moderate strategies, a second model, blind anonymised judging and judge agreement, and the re-test on the redesigned tasks (protocol step 5).
- **Limitation:** the planned design was blind cross-model judging (MODEL_A's outputs judged by two other models, and vice versa). That could not be reproduced. Here one agent wrote, checked and scored its own work, knew the strategy and had read the vulnerability analysis first. One output per case cannot show variation.
- **Can show:** what this one agent produced for these briefs on this date, and which rubric criteria that output satisfied. **Cannot show:** results for other models or future tools; validation against human scoring; anything about real students.

## Method 6: Agent-simulated workshop participants (done 2026-11-11, single model)
- **Who:** the same AI agent role-played five fictional personas (skeptical senior lecturer, 300+ student coordinator, faculty developer and accessibility specialist, early-career TA, second-language lecturer).
- **What:** each persona walked the 7 agenda segments of `docs/workshop/facilitator-guide.md` (35 judgments: plausible, time realistic, concrete flags with fixes).
- **Result:** 35 of 35 plausible, 33 of 35 with realistic timing, **11 flags** (e.g. a 2-minute break, no move time in the gallery walk, AI demo output not read aloud, QR-only survey link). Open revision candidates; none applied yet. Full results: `evaluation/results/simulated-participants-summary.md`.
- **Mechanical agenda check (no AI):** `npm run test:agenda` confirms the agenda table tiles minutes 0 to 90 with no gaps or overlaps. PASS on 2026-11-11.
- **Limitation:** the planned design ran each persona on two or three independent models; one agent played all five here, one pass each.
- **Can show:** unclear instructions, timing risks and pushback moments before a human run. **Cannot show:** workshop outcomes, learning, or real participant experience. Never presented as a delivered workshop.

## Method 7 — Human protocols (ready; not run)

- **What:** consent text, educator review invitation + form, workshop review form, and a manual VoiceOver check script, in `evaluation/human-protocol/`.
- **Can show:** with real participants: educator judgement of clarity/feasibility; workshop confidence change (pre/post survey); real VoiceOver output on macOS.
- **Cannot show:** anything until real people actually take part. No claim of participant validation may be made before then.

## Updating results
1. Record any new run in a dated file or folder under `evaluation/results/` or `research/results/`, with the date and who or what performed it (tool or model name, or "human, role").
2. Update this file's method statuses, the case pages' score tables, the README evaluation-status line, `STATUS.md` and `docs/evaluation/revisions.md`, keeping the honesty rules below.
3. Re-run `npm run test:md-links`, `npm run test:agenda`, the decision-tool tests and the axe audit if any content files changed.
4. No model APIs or model endpoints are used anywhere in this repository.

## Honesty rules this repo binds itself to

1. Every AI-generated artefact, review or score is labelled with its method wherever it appears; nothing AI-produced is presented as human work.
2. Results that do not exist are marked "not run". Tables contain no invented numbers, no invented AI outputs, and no "constructed examples" dressed as model output; the only AI output shown is what an AI actually produced, labelled with what produced it.
3. AI personas, agent reviews and judge panels never validate anything on their own; limits are stated next to every claim.
4. No real student work, no real course briefs, no simulated disabled users: accessibility evidence comes from standards-based tools and scripted tests, plus a manual VoiceOver protocol for a human to run (Guidepup is not functional on the build machine's macOS version).
5. Contact placeholders ([Email], [LinkedIn]) belong to the repo owner; nobody else fills them.
