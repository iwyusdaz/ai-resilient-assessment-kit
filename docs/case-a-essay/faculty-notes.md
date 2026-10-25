---
title: "Case A: Faculty notes"
parent: "Case A: Original assignment"
nav_order: 6
---

# Case A — faculty notes

Workload, scaling, equity and implementation details for the [redesign](redesign.html). Everything here is written for the fictional SOC 101 setting at Lakeside State University — a fictional US public university preparing for ADA Title II digital accessibility compliance — with 180 students, one lecturer and two TAs.

## Grading time

| Component | Original | Redesign | Notes |
|---|---|---|---|
| Per-student marking | 15–20 min × 180 (one 1,500-word essay each) | **~14–16 min per student × 180** (stages 1–4 below sum to 13–15 min; the sampled defence adds ≈ 1 min per student amortised — see scaling note 1) | Comparable to the original, spread over six weeks; every stage buys evidence the single essay could not |
| Stage 1 proposal | — | ~2 min (checklist) | Rubric-free: complete/revise |
| Stage 2 source list | — | ~4 min (checklist) | Spot-check 1 of 5 annotations against the source |
| Stage 3 draft + log | — | ~1 min (completion) | Log is read properly at stage 4 |
| Stage 4 final essay | (this was the 15–20 min) | ~6–8 min | Rubric now carries a verification criterion; no need to hunt citations one by one — the gate already did it |
| Stage 5 defence | — | ~4–5 min live for the sampled fifth of the cohort (≈ 1 min per student amortised; 2 min recorded at 1.5×) | Sampled: see scaling below |

**Where the grade weight comes from:** the five stages total 35% where the single essay was 25%. The extra 10% is re-weighted at adoption from Essay 1 — the course's other take-home essay, whose weight the course team reduces by 10% on the same reasoning the redesign applies here (its take-home marks are the least secure evidence in the course).

**Why it nets out:** the totals overlap — roughly 14–16 minutes per student against the original's 15–20 — so the marking load is comparable, not magically lower. What changes is where the time goes: a little time at five checkpoints instead of all of it inside one artefact, and the verification gate removes the most time-consuming uncertainty (are the sources real?). TAs carry stages 1–3 entirely.

## Scaling to 200+ students

1. **Sample the defence.** Mark the 5-minute defence for a stratified sample (e.g., every 5th student plus any case flagged by the stage 2 checklist or the AI-use log). Non-sampled students still complete it — completion earns the stage mark. Experience from interactive-oral programs (see [literature notes](../research/literature-notes.html)) is that the *existence* of the defence does most of the work; sampling protects the workload.
2. **TA-run checklists.** Stages 1–3 are checklist-gradable by TAs after a 45-minute calibration session (grade 10 samples together, discuss, re-grade 5).
3. **Cohort-level rubric anchors.** Before stage 4 marking, the team reads the same three essays together and calibrates criterion scores. Cheap, and it prevents the classic drift between markers.
4. **Group-scheduled defence slots.** Five-minute slots inside existing tutorial times — no extra contact hours. Recordings accepted for students who can't attend.
5. **Never** use detection as a triage shortcut: it adds a false-positive risk the redesign doesn't need (see [principle 6](../principles.html)).

## Accessibility and accommodations

- **The defence always has an equal-weight alternative:** live, recorded, or written Q&A (~250 words per question). Students with communication disabilities, anxiety or speaking accommodations choose once at the start of term — no disclosure of diagnosis required, no doctor's note demanded.
- All stage documents are provided in accessible formats (headings, real lists, no text-in-images) and the LMS pages meet the university's accessibility baseline; the same checklist used for this kit's pages works ([README accessibility section](https://github.com/iwyusdaz/ai-resilient-assessment-kit#accessibility)).
- Extended-time students get the standard extended window on stages 1–4; stage 5's recorded/written option removes the timing barrier entirely.
- AI-use levels never require paid AI subscriptions: every AI Planning / AI Collaboration stage is satisfiable with the university's free AI tool or a free tier. Students with no AI access at all complete stages 1 and 3 unaided (the levels permit that) — the log then says so, and that's a complete log.

## Multilingual students

- The stress-test analysis ([Case A, criterion 2](stress-test.html#vulnerability-analysis-design-reasoning-not-measured-results)) and the detection literature (Liang et al. 2023; Weber-Wulff et al. 2023) both argue against detector use; nothing in this redesign depends on one.
- **AI Collaboration is explicitly available for language help** at stage 3: having AI suggest clearer phrasing of *your own* sentences, logged, is legitimate and encouraged. What's assessed at stage 4 is the argument, and the defence verifies the thinking.
- Annotations are graded for content, not idiom: a slightly awkward but accurate annotation scores above a fluent generic one.
- For students still developing academic English, allow the stage 5 written Q&A to count double (defence 10% instead of 5% and essay 10%) on request — same evidence, different medium, no penalty for not speaking.

## Common pushback, with answers

- **"Five deadlines is more work for me."** The old design was one 15–20-minute mark × 180. The new one is ~14–16 minutes per student × 180 spread over six weeks, with TAs carrying stages 1–3. Marking time is comparable — what changes is what the time buys: five checkpoints of evidence instead of one un-verifiable artefact.
- **"Students will just have AI do the draft."** The draft stage is the open lane — AI help there is allowed and logged. What's assessed is whether the final essay and defence cohere with the student's own sources and choices. AI-drafted work that the student can't defend fails the defence, not the honesty rule.
- **"The verification gate sounds slow to check."** It's a checklist: does the annotation reference something specific to the source, is there a page-anchored quote, is the access route named? ~4 minutes including one spot-check.

## What we would measure after the first run

- Actual grading minutes per stage (vs. the estimates above) — the estimates are the design targets, not measurements.
- Share of stage 2 checklists that needed a source spot-check second look.
- Defence question completion rates by mode (live / recorded / written) — watching for equity gaps between modes.
