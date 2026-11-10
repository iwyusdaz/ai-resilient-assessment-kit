# Agent-simulated review panel: results summary

**Run date:** 2026-11-11 · **Performed by:** one AI agent (the Kiro build agent working in this repository's workspace) role-playing three reviewer roles. Single model, no API, no human reviewer.

**Method label:** *agent-simulated review panel (single model).* These are role-played reviews, **not** educator review, peer review or expert feedback. The original design (each role reviewed by two or three independent models, with cross-model agreement) could not be reproduced without model APIs, so **no agreement figure is reported**.

## Roles and scope

| Role | Lens |
|---|---|
| R1 Assessment design | Constructive alignment; does the redesign certify what the outcome claims; rubric and alignment-table quality; honesty of the "does not solve" sections |
| R2 Equity and accessibility | Weight and dignity of alternatives; multilingual students; AI access and cost; readability of student-facing text |
| R3 Feasibility and workload | Grading-time arithmetic; 200+ scaling; implementation load; what breaks first |

Files: the three redesign pages and the workshop facilitator guide (3 roles × 4 files = **12 reviews**). Each review read the file plus the pages it links for numbers (faculty notes, rubric, student brief), gave 1 to 5 scores, and listed at most 6 location-tied issues.

## Scores

| File | Role | Clarity | Validity | Feasibility | Equity |
|---|---|---|---|---|---|
| Case A redesign | R1 | 5 | 4 | 4 | 4 |
| Case A redesign | R2 | 4 | 4 | 4 | 4 |
| Case A redesign | R3 | 4 | 4 | 3 | 4 |
| Case B redesign | R1 | 4 | 4 | 5 | 4 |
| Case B redesign | R2 | 4 | 4 | 4 | 4 |
| Case B redesign | R3 | 5 | 4 | 4 | 4 |
| Case C redesign | R1 | 4 | 4 | 4 | 4 |
| Case C redesign | R2 | 4 | 4 | 4 | 5 |
| Case C redesign | R3 | 4 | 4 | 3 | 4 |
| Facilitator guide | R1 | 5 | 4 | 4 | 4 |
| Facilitator guide | R2 | 4 | 4 | 4 | 3 |
| Facilitator guide | R3 | 4 | 4 | 4 | 4 |

**Totals:** 2 major and 21 minor issues. None has been applied yet; they are open revision candidates in [docs/evaluation/revisions.md](../../docs/evaluation/revisions.md).

## Issues

### Case A redesign (`docs/case-a-essay/redesign.md`)

| Role | Severity | Location | Issue | Suggestion |
|---|---|---|---|---|
| R1 | **major** | Stage 5, "The defence" | The faculty notes (scaling note 1) mark the defence for a sampled fifth of students; everyone else earns the stage mark for completion. For four in five students the defence therefore certifies nothing beyond its deterrent effect, but the redesign page presents it as the secure check for everyone. | State the sampling on the redesign page and say that, for non-sampled students, the assurance rests on the verification gate. |
| R1 | minor | AI-use level table, Stage 4 | Stage 3 allows AI Collaboration on the draft; Stage 4 is No AI "for new prose" while "the draft's own words carry forward". It is unclear whether AI-suggested wording accepted in Stage 3 may stay in the final essay. | Add one sentence: wording kept from the logged draft is allowed; new AI wording after Stage 3 is not. |
| R2 | minor | Stage 2, verification note | The note requires a page number and the library database used. Open-access and online-first articles often have no page numbers, and off-campus students may reach sources outside the library database. | Accept paragraph or section numbers (as APA 7 does) and any named access route. |
| R2 | minor | Stage 2, "No AI for source discovery" | Library databases now include AI-assisted search; students cannot tell whether using it breaks the rule. | Say whether the library's own AI search counts as AI use. |
| R3 | **major** | Stage 5 + options table | If all 180 students complete a five-minute live defence (faculty notes: non-sampled students still complete it), that is about 15 hours of tutorial time, the cost the options table uses to reject "oral exam for all 180". Recorded and written modes reduce it only if many students pick them. | Either make the live slot apply to the sampled fifth only, or state the expected mode mix and the resulting hours. |
| R3 | minor | Implementation notes, deadlines | "No two stages due in the same week", but the final essay is due in week 10 and the defence runs in weeks 10 to 11. | Move the defence window to week 11 or adjust the sentence. |

### Case B redesign (`docs/case-b-problem-set/redesign.md`)

| Role | Severity | Location | Issue | Suggestion |
|---|---|---|---|---|
| R1 | minor | Structure item 4 vs. implementation notes | "Find and fix" items are "one AI-generated solution with a planted or naturally-occurring error", but the implementation notes say the errors come from last year's student mistakes. It is unclear who writes the solution text. | Say the solution is AI-written and the planted error is taken from last year's mistakes (or whichever is meant). |
| R1 | minor | Rubric criterion 4 vs. gradebook | The top band requires catching at least one AI error, while the weekly sets are graded "completion-based" at 2 points; the four-level criterion and completion grading do not fit together. | Say which applies to the weekly sets, or map the levels onto the 2 points. |
| R2 | minor | Structure item 2, "no devices" | The faculty notes promise a typed equal-weight alternative for the checks, but the redesign page and student brief only say "no devices", so a student who needs to type may not know it exists. | Add the typed alternative to the student brief. |
| R2 | minor | AI-use level table, weekly sets | Full AI with a log assumes every student has AI access. Case A's faculty notes state that free tiers suffice; Case B's pages do not. | Add the same free-access statement to Case B. |
| R3 | minor | Faculty notes, accommodations | "Doubling time still fits a tutorial slot" (40 minutes), but tutorial length is never stated. | State the tutorial length the claim assumes. |
| R3 | minor | Implementation notes, planted errors | The error bank comes from last year's student mistakes; in the first year of adoption there is no such bank. | Name a first-year source (e.g. the TAs' marking notes from the original sets). |

### Case C redesign (`docs/case-c-research-report/redesign.md`)

| Role | Severity | Location | Issue | Suggestion |
|---|---|---|---|---|
| R1 | minor | "How it's graded" vs. rubric gradebook | The redesign says the Q&A feeds criteria 1 to 3 and the notebook and memo feed 1 to 3 and 5; the rubric's gradebook maps the Q&A to 1, 3 and 5, the notebook to 2 and 5, and the memo to 3. | Align the redesign sentence with the rubric table. |
| R1 | minor | Structure item 5, report AI level | "Language and clarity only, not for analysis decisions or results sentences" is a boundary no marker can see; the design does not depend on it, but the disclosure template does not ask about it. | Add a disclosure line: "Did AI write or change any results sentence? yes/no". |
| R2 | minor | Structure item 6, Q&A | Three anchored answers in about two minutes per student leaves roughly 40 seconds per answer, which is tight for students speaking in a second language in the live mode. | Allow a short preparation minute or keep the written mode clearly equal. |
| R3 | minor | Structure item 6, Q&A timing | Ten minutes per team of five includes no transition or follow-up time; the session is likely to overrun. | Budget 12 minutes per team or drop to two anchors in the live mode. |
| R3 | minor | Structure item 1 vs. faculty notes | Teams of 4 to 5 from about 120 students gives 24 to 30 teams; the faculty notes plan for 24 registrations, which assumes every team has five. | Plan for up to 30 teams or fix team size at 5. |

### Facilitator guide (`docs/workshop/facilitator-guide.md`)

| Role | Severity | Location | Issue | Suggestion |
|---|---|---|---|---|
| R1 | minor | 10 to 25, debrief | Session outcome 1 ("know which rubric criteria are at risk") rests on one live demo with one tool. | Point to the agent-simulated stress-test results as a second, labelled data point. |
| R2 | minor | 70 to 82, gallery walk | In person, the walk assumes participants move around the room and read posted canvases; the guide gives an online alternative but no seated or large-print in-person option. | Offer a seated swap of canvases between neighbouring pairs. |
| R2 | minor | 10 to 25, live demo | AI output streaming on a projector cannot be followed by blind or low-vision participants unless it is read aloud; the guide says to read poll results aloud but not the AI output. | Read key passages aloud and put the backup output in the handout. |
| R3 | minor | 10 to 25, setup | The demo needs a working AI account on the room network; many institutions block AI tools on teaching PCs. | Treat the pre-generated backup as the default and the live run as optional. |
| R3 | minor | 0 to 10, opening | The script is 3 minutes of a 10-minute slot; the other 7 minutes are not described. | Say what fills them (late arrivals, poll reading, introductions). |
| R3 | minor | 70 to 82, rotation | Two 4-minute visits plus a 4-minute harvest fill all 12 minutes with no time to move between canvases. | Use 3.5-minute windows or a 1-minute move. |

## Limitations (stated wherever these results appear)

1. **Single model, not independent.** One agent played every role, had read the whole repository first, and may share the model family that drafted the content. The roles are not independent reviewers, so overlap between roles says nothing about reliability.
2. **Not expert judgement.** No educator, assessment specialist or accessibility professional took part. A human educator review remains not run (protocol ready in `evaluation/human-protocol/`).
3. **Scope.** Four files were reviewed; the rubrics, student briefs, templates and decision tool were read only where the four files referred to them.
