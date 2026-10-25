---
title: "Case A: Redesign"
parent: "Case A: Original assignment"
nav_order: 3
---

# Case A — redesign

## What learning must this assessment show?

**Course outcome (SOC 101, week 9):** "Students can construct a sociologically-informed argument: select and verify appropriate scholarly evidence, reason from it, and defend the argument's key choices in dialogue with objections."

**What counts as valid evidence of that outcome:**

1. An argument the student can trace through their own sources (not just cite).
2. Verified sources — the student demonstrably found, opened and read what they cite.
3. The ability to defend a key argumentative choice when questioned.
4. Honest accounting of any AI assistance, showing the student can evaluate AI output rather than outsource to it.

**What no longer counts as valid evidence:** a single fluent take-home artefact. The stress test's [vulnerability analysis](stress-test.html#vulnerability-analysis-design-reasoning-not-measured-results) shows all four original criteria reward exactly what generative models produce cheaply.

## Vulnerability summary (from the stress test)

| Original criterion | Risk | Reason (analysis) |
|---|---|---|
| Thesis & argument | High | Generic topic, no class-specific constraint |
| Use of evidence | Highest | Rewards citation formatting; fabrication hard to catch at 90 essays/TA |
| Analysis & depth | Moderate | Abstract counter-arguments are AI's strength; no local/personal anchor required |
| Writing & organization | None | Fluency is free for models; non-diagnostic |

## Options considered

| Option | How it helps validity | Workload | Equity/accessibility risks | Verdict |
|---|---|---|---|---|
| Move the essay in-class | Strong product-to-student link | Low grading change; loses drafting iteration | High: typing speed, accommodations, ESL writing time pressure | Rejected as sole form |
| In-person oral exam for all 180 | Strong assurance | ~15 h of orals per run | High anxiety; written alternatives needed | Rejected at this scale |
| Staged submissions with a verified-source gate | Strong: evidence chain is gradeable | Moderate; stages grade fast | Low (asynchronous) | **Chosen** |
| Critique an AI-generated essay | Builds evaluation skill | Low | Low | Adopted as one required element |
| Open AI use with reflection only | Matches real practice | Low | Moderate (tool access) | Partially adopted (stage 3) |
| In-class proctored essay | Assurance | Rooms + invigilation | High | Rejected: disproportionate for a 25% task |

## Chosen design and rationale

A **staged build with a source-verification gate and a short defence**, on the same sociological question. Rationale: each stage produces cheap-to-grade evidence of a capability that generic AI output cannot fake at scale, and the total grading load stays close to the original (see [faculty notes](faculty-notes.html#grading-time)).

**The stages:**

1. **Proposal (week 5, 5%).** Position, thesis draft, two candidate counter-arguments. AI level: **AI Planning** — AI may help surface counter-arguments and structure; the commitment to a position is the student's.
2. **Annotated source list — the verification gate (week 7, 10%).** Five scholarly sources. For each: full APA reference + a 120-word annotation the student writes after reading it + **a verification note** (how they accessed it, one direct quotation with page number, library database used). AI level: **No AI** for source discovery and annotation. Annotations must reference at least one detail the AI could not have generated from the citation alone (a specific table, footnote or claim).
3. **Draft with AI-use log (week 8, formative).** Full draft + one-page log of any AI use: tool, what was asked, what was kept or rejected. AI level: **AI Collaboration** — students may use AI for feedback on draft clarity, and must critique its suggestions. This stage is the open lane: it's graded complete/incomplete, not for quality.
4. **Final essay (week 10, 15%).** Revised essay on the same rubric dimensions as the original — argument, evidence use, analysis, writing — graded from the new [rubric](rubric.html).
5. **The defence (week 10–11, 5%).** A five-minute structured defence, live in tutorial or recorded, answering three published question types: (a) walk me through how you found source X; (b) why did you choose this framing over the counter-argument; (c) one thing in your essay you changed after feedback or AI critique, and why. AI level: **No AI** during the defence itself.

## AI-use level for each part of the task

| Stage | AIAS 2.1 level | Why this level |
|---|---|---|
| Proposal | **AI Planning (2)** | Idea generation is cheap; commitment is the learning |
| Annotated sources + verification | **No AI (1)** | Verifying sources is a core capability; AI fabricates citations |
| Draft + AI-use log | **AI Collaboration (3)** | Practising critical AI use *is* a course-relevant skill |
| Final essay | **No AI (1)** for new prose; the draft's own words carry forward | The essay certifies the student's sustained argument |
| Defence | **No AI (1)** | Secure lane: the student's own reasoning in real time |

## What students submit

1. Proposal document (1 page).
2. Annotated source list (2–3 pages) with verification notes.
3. Draft + one-page AI-use log (completion-graded).
4. Final essay (1,500 words).
5. Defence: 5 minutes live in tutorial, **or** a recorded video/slides-and-audio version, **or** a structured written Q&A (250 words per question) — student's choice, equal weight. (Accommodations: see [faculty notes](faculty-notes.html#accessibility-and-accommodations).)

## How it's graded

The [new rubric](rubric.html) has 5 criteria × 4 levels: argument construction, source verification & evidence integrity, engagement with counter-arguments, AI-use judgment & disclosure, and clarity & presentation. Alignment to the course outcome is shown in the rubric's alignment table.

## Implementation notes

- Deadlines spaced weeks 5, 7, 8, 10, 11 — no two stages due in the same week.
- Tutorial time in weeks 5 and 8 doubles as proposal/feedback workshops, so the redesign does not add contact hours.
- TAs grade stages 1–2 against a one-page checklist (~4 min/submission); the lecturer grades defences with the published question bank.
- Full grading-time analysis, the 200+ scaling plan and the accommodation plan are in the [faculty notes](faculty-notes.html).

## What this does NOT solve

- **The open lane stays open.** A student could still have AI write their draft (stage 3 is completion-graded) — but the final essay must evolve from it coherently, and the defence checks authorship of the argument, not the draft.
- **Determined fabrication of the whole trail.** A sufficiently determined student could fabricate annotations, a log and a rehearsed defence. Nothing fully prevents that; the design raises the cost far above the original's and produces checkpoint evidence (per the [honesty of limits](stress-test.html#what-we-did-not-conclude)), not certainty.
- **AI's fluency advantage.** The final essay can still *sound* excellent even when done with undisclosed AI help. That's why it now carries 15% instead of 25%, and why the defence and verification gate carry the assurance load.
- **Model evolution.** Future tools may pass the verification gate (e.g., agents that actually retrieve and read sources). The re-test (`--redesign` mode) is the mechanism for finding out; see the pending section in the [stress test](stress-test.html#re-test-redesigned-task).
