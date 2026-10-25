---
title: Evaluation methods
nav_order: 1
has_toc: false
---

# Evaluation methods — what we ran, what it can show, and what it cannot

Every piece of evidence in this repo is labelled with its method. This page is the index of methods, their status, and their limits. Update it after every real run (see the rerun procedure below).

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

## Method 4 — Multi-model review panel (PENDING — requires API key)

- **What:** `evaluation/run-review-panel.mjs` reviews the kit with ≥ 2 different models (MODEL_A, MODEL_B; MODEL_C optional) in three roles — assessment design, equity & accessibility, feasibility & workload — reading the same files a human reviewer would. Cross-model agreement is computed and reported.
- **Can show:** model-diverse critique and its agreement; issues that survive more than one model.
- **Cannot show:** human expert judgement; it is not educator feedback. Its models may share the author's underlying model family.

## Method 5 — AI stress test with blind judge panel (PENDING — requires API key)

- **What:** `research/run-stress-test.mjs` runs the three cases through MODEL_A and MODEL_B (three prompt strategies), then blind-scores the anonymised outputs: MODEL_A's outputs are judged by MODEL_B + MODEL_C and vice versa — no model judges its own output. Judge agreement is reported.
- **Can show:** how those configured models, on those dates, perform on these briefs and rubrics.
- **Cannot show:** results for other models or future tools; validation against human scoring; anything about real students. The score tables on the case pages stay PENDING until this runs.
- **Status check:** if a case page shows a completed score table, the run date and model names are recorded in `research/results/stress-test/summary.md`. If not, treat every number-shaped thing on those pages as design reasoning only.

## Method 6 — AI-simulated workshop participants (PENDING — requires API key)

- **What:** `evaluation/run-simulated-participants.mjs` walks five fictional personas through the 90-minute agenda and flags timing, clarity, feasibility and accessibility risks. A mechanical agenda check (no AI) verifies the segment arithmetic and runs even in dry-run.
- **Can show:** unclear instructions, timing risks, and pushback moments before a human run.
- **Cannot show:** workshop outcomes, learning, or real participant experience. Never presented as a delivered workshop.

## Method 7 — Human protocols (ready; not run)

- **What:** consent text, educator review invitation + form, workshop review form, and a manual VoiceOver check script, in `evaluation/human-protocol/`.
- **Can show:** with real participants: educator judgement of clarity/feasibility; workshop confidence change (pre/post survey); real VoiceOver output on macOS.
- **Cannot show:** anything until real people actually take part. No claim of participant validation may be made before then.

## Rerun procedure (after adding API keys)

1. `cp .env.example .env` and fill MODEL_A/B/C (OpenAI-compatible endpoints; MODEL_A and MODEL_B must be different models for blind scoring).
2. `npm run eval:pending` — runs stress test (originals), review panel, simulated participants.
3. `npm run eval:stress-test-redesign` — re-tests the redesigned tasks (protocol step 5).
4. `research/results/*/summary.md` and `evaluation/results/*/` regenerate automatically.
5. Update: the case pages' score tables (from the summaries), the README evaluation-status line, this file's method statuses, and `docs/evaluation/revisions.md` with changes the new findings demand. Record model names and run dates everywhere numbers appear.

## Honesty rules this repo binds itself to

1. Every AI-generated artefact, review or score is labelled with its method wherever it appears; nothing AI-produced is presented as human work.
2. Pending results stay pending — tables say "PENDING: requires API key" and contain no invented numbers, no invented AI outputs, no "constructed examples" dressed as model output.
3. AI personas, agent reviews and judge panels never validate anything on their own; limits are stated next to every claim.
4. No real student work, no real course briefs, no simulated disabled users: accessibility evidence comes from standards-based tools and scripted tests, plus a manual VoiceOver protocol for a human to run (Guidepup is not functional on the build machine's macOS version).
5. Contact placeholders ([Email], [LinkedIn]) belong to the repo owner; nobody else fills them.
