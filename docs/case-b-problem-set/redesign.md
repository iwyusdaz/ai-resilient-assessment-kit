---
title: "Case B: Redesign"
parent: "Case B: Original assignment"
nav_order: 3
---

# Case B — redesign

## What learning must this assessment show?

**Course outcome (STAT 201, weeks 1–6):** "Students can choose an appropriate statistical procedure for a question, execute it correctly, and interpret the result in context — including checking claims and spotting common errors."

**What counts as valid evidence:**

1. Correct, self-explained solutions produced under some AI-free condition (secure lane).
2. Documented productive use of AI as a tutor — questions asked, misunderstandings caught (open lane).
3. The ability to *critique* a statistical solution — including an AI-written one (a real-world capability).
4. Interpretation applied to data the class actually collected.

**What no longer counts:** ten identical take-home answers, flagged by an unenforceable "no AI" line.

## Vulnerability summary (from the stress test)

| Original element | Risk | Reason (analysis) |
|---|---|---|
| Standard computation items | High | Textbook-shaped; thousands of solved instances in training data |
| Template interpretation sentences | High | Fluent generic context is a model strength |
| "No AI permitted" rule | Structural | Unenforceable; converts assessment into honesty lottery |
| Nothing tied to class data | Structural | No local anchor anywhere in the task |

## Options considered

| Option | How it helps validity | Workload | Equity/accessibility risks | Verdict |
|---|---|---|---|---|
| Ban AI, enforce with detectors | None; adds false-positive harm (multilingual students hit hardest) | Detector administration + dispute load | High — documented detector bias | Rejected (see [principle 6](../principles.html)) |
| Move all problem sets in-class | Strong assurance | Weekly invigilation at 250 students | High for anxious/slow processors | Rejected as blanket policy |
| Open lane (AI-as-tutor practice) + weighted secure in-class checks | Assurance where it matters; practice stays honest | Low; reuses tutorial slots | Low | **Chosen** |
| Class-collected dataset for interpretation items | Strong local anchor | One shared collection activity | Low with provided-data alternative | **Chosen** |
| "Find and fix the error in this AI solution" items | Builds critique skill; grades fast | Low | Low | **Chosen** |
| Oral checks per student | Strong but | 250 × 10 min = impossible | Mitigations exist but cost too high here | Rejected (Case A's design covers orals; B scales with in-class checks) |

## Chosen design and rationale

**Two lanes with unequal weight**, following the two-lane reasoning in the [approaches comparison](../approaches.html): weekly practice stays open and AI-friendly; the assurance weight moves to short in-class checks and to interpretation of the class's own data.

**The structure (weeks 1–6):**

1. **Weekly problem sets — open lane (15% total, 5 sets).** AI level: **Full AI**. Students may use AI as a tutor and even to solve, **with a one-line-per-question use log**: "asked AI about Q3's CI logic; it misstated the df; I redid it with the textbook formula." Graded for submission + log quality (2 completion points per set), not for answers — the answers are now cheap.
2. **Two in-class secure checks (weeks 3 and 6 — 20% total).** Twenty minutes, in tutorial, no devices: 4 questions on the same skills the sets practised (one computation, one interpretation, one "spot the error", one concept). AI level: **No AI**. Weighted at 10% each — more than the whole open lane.
3. **Class-survey data items (inside each set and the checks).** In week 2 the class collects a small shared dataset (two questions per student, ~250 responses: e.g., commute time and sleep hours). Interpretation questions run on *this* dataset; students must reference the actual numbers.
4. **"Find and fix" items (in sets from week 3).** Each set includes one AI-generated solution with a planted or naturally-occurring error; students must find it, fix it, and explain the fix in two sentences. AI level: **AI Exploration** — using AI to help hunt the error is fine, logged.

## AI-use level for each part of the task

| Part | AIAS 2.1 level | Why |
|---|---|---|
| Weekly problem sets | **Full AI (4)** with log | Practice is for learning; the log grades the learning, not the answers |
| In-class secure checks | **No AI (1)** | The assurance lane: individual achievement |
| Class-survey interpretation items | **AI Collaboration (3)** | Computing with the class data is allowed (even encouraged); the interpretation-in-context sentence must be the student's |
| "Find and fix" items | **AI Exploration (5)** | Critiquing AI output *is* the task |

## What students submit

1. Five weekly sets (PDF or photos of handwritten work) with the per-question use log.
2. Two in-class checks (written, in tutorial).
3. Nothing else — the design deliberately reduces artefact-administration.

## How it's graded

The [new rubric](rubric.html) has 4 criteria × 4 levels: method selection, execution & accuracy, interpretation in context, and AI-use judgment. The secure checks are marked on the first three; the open lane is graded on AI-use judgment (log quality).

## Implementation notes

- Tutorial time already exists (four sections); the 20-minute checks fit inside it — no new invigilation.
- The class survey runs in week 2 via a 3-minute LMS form; the dataset is posted cleaned and anonymised in week 3.
- Planted errors for "find and fix" come from *last year's* genuine student mistakes (anonymised), so the errors are realistic, not artificial.
- Full grading-time arithmetic, the 200+ plan and accommodations are in the [faculty notes](faculty-notes.html).

## What this does NOT solve

- **Practice-set answers stay AI-completable — by design.** If a student outsources practice entirely, the secure checks will find them; the log teaches the difference between productive and unproductive use.
- **Secure checks sample narrowly.** Twenty minutes × two occasions can't cover everything; they cover the highest-priority skills, and the weighting is honest about that.
- **The class dataset is shared.** Students could discuss answers; interpretation-in-context sentences are individual, but identical phrasing is still possible. The in-class checks are the backstop, not the sets.
- **No design secures a fully-remote offering.** The secure lane requires the in-person tutorial; a remote version needs a proctoring or oral-check substitute, which raises its own equity costs.
