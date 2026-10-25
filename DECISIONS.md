# Design decisions

The reasoning behind the choices that shape this kit. Each decision records alternatives and the trade-off accepted. (The stress-test pending status is treated as a decision, not just a gap — see D1.)

## D1 — Publish vulnerability reasoning before measured scores

**Decision.** Ship the kit with the stress-test protocol, exact prompts, and labelled design-reasoning analyses, while every score table stays "PENDING — requires API key". No fabricated outputs, no "constructed examples" of AI text.
**Alternatives.** (a) Wait for the API run before publishing anything — delays the redesigns and workshop that are ready now. (b) Publish invented "illustrative AI outputs" — dishonest and unusable as evidence.
**Rationale.** The redesigns follow from *structural* validity reasoning (what the task certifies vs. what models produce), which stands or falls on its own logic; measured scores will strengthen or revise them via the re-test. The portfolio's honesty rules (nothing pending may be faked) make (b) forbidden outright.
**Consequence.** Case pages carry a status note distinguishing reasoning from results; the rerun procedure in `evaluation/METHODS.md` defines how tables get filled and how the reasoning gets revised if the data disagrees.

## D2 — AIAS 2.1, level names quoted verbatim, per stage

**Decision.** Use the AI Assessment Scale **v2.1** with its exact level names (No AI / AI Planning / AI Collaboration / Full AI / AI Exploration), set per task stage, always shown as icon + text.
**Alternatives.** A home-grown 3-level scale (simpler, but loses the community vocabulary and the CC-licensed icons); course-wide single level (too coarse — the cases show stages genuinely differ).
**Rationale.** Verified against the scale's official site (2026-10-25) and cited to the JUTLP article; per-stage setting is what makes Case A's "open draft / closed defence" pattern legible to students.
**Consequence.** Level names must not drift: if AIAS revises again, the names page and every student brief change together (single source in `docs/ai-use-levels.md`).

## D3 — Blind cross-model judging, three model slots

**Decision.** MODEL_A outputs are judged by MODEL_B + MODEL_C and vice versa; no model judges its own output; MODEL_C is required (not optional) for the stress test.
**Alternatives.** Two slots with self-judging excluded (possible: A→B, B→A) — but a two-judge panel with per-criterion concordance needs a tiebreaker; self-judging (rejected outright: bias).
**Rationale.** Matches the portfolio's evidence rules for blind scoring and makes agreement reporting meaningful (mean total difference + per-criterion exact agreement, reported with the caveat that it is not human-validated).
**Consequence.** `.env.example` needs three slots; the pipeline exits before any network call if any slot is a placeholder.

## D4 — Slides as plain semantic HTML, not reveal.js

**Decision.** The workshop deck is one linear HTML page: one `<section>` per slide with a real `<h2>`, readable with CSS off, speaker notes as visible `<details>` text.
**Alternatives.** Reveal.js (pinned) — richer presenter mode, but its accessibility support needs its own audit pass and a second toolchain; PDF export — worse for screen readers.
**Rationale.** The deck's accessibility requirement (linear reading, screen-reader friendly, no keyboard traps) is met by plain HTML *by construction*; the facilitator guide already replaces presenter-mode needs (guide + printed notes).
**Consequence.** No arrow-key slide navigation (scrolling is the navigation) — documented on the slides page itself.

## D5 — Secure lanes inside existing contact time

**Decision.** Every secure component (Case A defence, Case B in-class checks, Case C Q&A) fits inside existing tutorial slots and ships an equal-weight written/recorded alternative.
**Alternatives.** Invigilated exam halls (real assurance, real cost, equity-heavy); fully remote designs (no enforceable secure lane without proctoring software — out of scope).
**Rationale.** Adoption fails on logistics before pedagogy; the faculty notes carry the arithmetic that makes this credible.
**Consequence.** The kit is explicit that fully-remote offerings need a different secure-lane design (stated in Case B's "does not solve").

## D6 — Fictional single-campus framing (Lakeside State)

**Decision.** All cases live at Lakeside State University — "a fictional US public university preparing for ADA Title II digital accessibility compliance" — the same fictional university as the portfolio's accessibility case study.
**Alternatives.** Anonymised real cases (ethics-heavy, no real student work allowed anyway); no framing (weaker, less transferable detail).
**Rationale.** One-line description shared across the portfolio keeps the story coherent while every number stays fictional and labelled.
**Consequence.** Enrolments and grading estimates are design targets, never measurements — stated in each faculty-notes page.
