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

## Revision rounds

### Revisions from agent review, 2026-10-26

A fresh-context reviewer agent produced `evaluation/agent-review.md` (labelled as agent review; the same-model limitation is stated there). Findings, dispositions and the file-by-file changes are logged in `docs/evaluation/revisions.md`. The round's headline: **grading-time arithmetic reconciled line by line, and the workshop retimed so its segments fit their slots.** The decisions below record the judgment calls the round required.

**R1 — Arithmetic before advocacy.**
**Decision.** Every grading-time headline equals the sum of its own rows, recomputed from the already-stated per-item minutes — even where the honest total is less flattering than the claim it replaces. Where the honest total is *more* flattering, it is corrected too; the number, not the narrative, is the authority.
**Alternatives.** (a) Adjust the per-item minutes to rescue the old headlines — rejected: that is inventing data. (b) Leave the tables and add a caveat — rejected: the kit's core credibility claim (D5) is the arithmetic.
**Applied.** Case A: "12–14 min total" was 17–20 by its own rows → **~14–16 min/student** (stages 1–4 sum to 13–15; the sampled defence amortises to ≈ 1 min/student, stated explicitly), framed as comparable marking load spread over six weeks with checkpoint evidence. Case B: the original load was understated as "≈ 90–100 h" (10–12 min × 250 × 5 = **≈ 210–250 h**) and the redesign as "≈ 19 h" (actually **≈ 31 h**); the net is ≈ 68 h ≈ **30% of the original** — the "about half the marking load" claim on slide 8 and in the pushback table is corrected upward in both directions. Case C: headline corrected to **13.5–14.5 min/student** (rows 3+4+4–5+2+0.5), Q&A aligned at 2 min/student for a 10-minute team session, net corrected from "a quarter" to roughly 30%.

**R2 — One weight story per lane, stated end to end.**
**Decision.** Case B's open practice lane is **10% total** everywhere (it matches the 2 completion points × 5 sets arithmetic and every downstream claim); the rubric's assessment-change summary now tells the whole weight story — the original sets were 10% *each* (≈ 50% of the course grade), and the redesign cuts the lane to 10% and moves 20% into the secure checks. Every faculty-notes page now states where the course-grade budget comes from: Case A re-weights Essay 1 (−10% at adoption); Case B funds the checks from the old sets' weight; Case C adds no new weight (38 raw points scaled to the handbook's 30% cap). Case A's redesign declares the course AI-literacy outcome that rubric criterion 4 had been citing without an anchor.
**Consequence.** Case C's student brief and redesign adopt the rubric's honest 38→30% structure (data collection is its own 8%, not "part of" the notebook's), the Q&A is "three anchors" everywhere, and the pre-survey is calendar-invite only (five Likert items + two open questions never fit "minutes 0–2").

**R3 — The decision tool must give every answer combination a usable, honest answer.**
**Decision.** Three logic changes, verified exhaustively over all 972 answer combinations: (a) assurance + take-home-only now recommends a secure check whose rationale points to Case B's "what this does NOT solve" on fully-remote offerings — the 50 previously-unsecured assurance combinations are now 0; (b) evidence = "working well with AI tools" now keys to dedicated open-reflection and critique rules (it previously fired none); (c) the unreachable "no recommendation fired" empty state is replaced by a low-confidence warning shown when the top score ≤ 2 (24/972 combinations).
**Note on the threshold.** The review suggested "top score ≤ 1", measured on the pre-fix rule set. After (b) strengthened the 12 weakest results, ≤ 1 fires for 0/972 — the warning would have been dead copy again. The threshold was recomputed, not invented: ≤ 2 is where the data says "no approach matches these answers strongly".
**Consequence.** Focus moves to the results heading on the *first* reveal only; recomputes announce via the live region instead of yanking focus. The scripted suite is extended from 20 to 28 checks (focus-on-recompute, the previously-broken assurance combination, the ai-collab rules, the low-confidence warning).

**R4 — Browsable evidence layer and findable tools.**
**Decision.** The research markdown (literature notes, stress-test protocol) moved from `research/` to `docs/research/` so it renders on the Pages site (it already carried Jekyll front matter; `research/` keeps the pipeline scripts); every in-page reference now points at site pages instead of GitHub blobs mid-read. The decision tool and the workshop slides join the sidebar nav via front matter (`layout: none` keeps their hand-built HTML output byte-identical while Just the Docs v0.12.0 lists any titled page).
**Alternatives.** For nav: wrapper/redirect pages (duplicate URLs) or `nav_external_links` (hardcodes the site URL) — rejected.
**Consequence.** Site link count grew from 137 to 163 internal links, all resolving; the sidebar nav gains three entries (Decision tool, Workshop slides, Research).

