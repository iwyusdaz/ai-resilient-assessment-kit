# Changelog

All notable changes to this kit. Format loosely follows Keep a Changelog; versions are the kit's own.

## [1.0.0] — 2026-10-25

### Added
- Research layer: verified literature notes (AIAS 2.1 level names, Sydney two-lane posts, detection-reliability evidence, 2026 context sources — each with access date and fetch status) and the full stress-test protocol.
- Three case studies (A: argumentative essay; B: statistics problem set; C: research report), each with original brief + rubric, stress-test page (exact prompts, PENDING score tables, labelled vulnerability reasoning, pending re-test), redesign, student brief with per-stage AI-use levels (icon + text), new rubric with alignment table, and faculty notes (grading time, 200+ scaling, accommodations, multilingual notes).
- Six design principles; eight-approach comparison with workload/equity/evidence ratings; AI-use-levels explainer with the verified AIAS 2.1 names.
- Decision tool: six questions, questions.json-driven, keyboard-first, fieldset/legend groups, Back/Start over, results announced via focus + live region, "Why this recommendation?" reasoning, nothing stored.
- Workshop: 90-minute facilitator guide with scripts, pushback responses and session-accessibility checklist; 13 accessible HTML slides (semantic headings, readable without CSS, speaker notes as text); redesign canvas (facilitated + blank); participant handout; pre/post survey (5 Likert items + 2 open).
- Templates: syllabus AI statement, assignment AI statement (level table + student disclosure), blank redesign canvas.
- Pending evaluation pipelines (placeholder-key safe, dry-run tested): stress test with blind cross-model judging, multi-model review panel, simulated workshop participants (plus a no-AI mechanical agenda check). One command: `npm run eval:pending`.
- Evaluation methods page, human-protocol pack (consent text, educator-review invitation + form, workshop review form, manual VoiceOver script), decision-tool scripted tests (20/20), internal link checker.
- Governance: README case study, LICENSE (CC BY 4.0), LICENSE-CODE (MIT), ATTRIBUTION, DECISIONS, STATUS, this changelog.

### Deferred (deliberate)
- Stress-test score tables: **PENDING — requires API key** (pipeline ready; reasoning-only analyses published and labelled until then).
- Educator review: template ready; ≥ 3 human reviewers not yet recruited.
- Manual VoiceOver check: script ready (Guidepup unavailable on the build machine's macOS 27).
- Social preview upload: image generated; uploading via the Settings UI is an owner task (no API).

## Unreleased

### Changed — 2026-10-26 (revisions from the agent review)
- Grading-time arithmetic reconciled in all three faculty-notes pages: headlines now equal the sum of their own rows (Case A ~14–16 min/student with the defence-sampling amortisation stated; Case B ≈68 h vs ≈210–250 h — "roughly 30%", was "about half"; Case C 13.5–14.5 min/student, Q&A aligned at 2 min/student for a 10-minute team session). Downstream repetitions (slide 8, pushback table) updated.
- Case B practice lane standardized at 10% total (was 15% in two files); each faculty-notes page states where the course-grade budget comes from; Case A's redesign declares the course AI-literacy outcome behind rubric criterion 4.
- Decision tool: assurance + take-home combinations now recommend a secure check (verified over all 972 answer combinations), "working well with AI tools" evidence has dedicated rules, the unreachable empty state is replaced by a low-confidence warning (top score ≤ 2), and focus moves to the results heading on first reveal only. Scripted tests extended 20 → 28.
- Workshop retimed to fit its slots: sprint 4/4/6/8/4 (+2 min buffer, canvas retitled "the 26-minute sprint"), post-survey in parallel with commitments with a six-pair go-around cap, 25–40 script rewritten to match the deck, gut-score skim made explicit, gallery walk capped at 2 canvases × 4 min, group size stated (12–30).
- Research markdown moved under `docs/research/` (browsable on the site; a Research page joins the nav); the decision tool and workshop slides join the sidebar nav.
- Pre-survey is calendar-invite only (~5 min; was "minutes 0–2").
