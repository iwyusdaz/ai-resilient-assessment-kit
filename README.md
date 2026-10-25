# AI-Resilient Assessment Kit

One-sentence summary: three common university assignments stress-tested against generative AI, then redesigned with explicit AI-use levels, process evidence and new rubrics — packaged with a decision tool and a ready-to-run 90-minute faculty workshop.

**[Live site](https://iwyusdaz.github.io/ai-resilient-assessment-kit/)** · **[Start here](docs/index.md)** · Role: Learning designer (sole author), Lakeside State University case study

**Evaluation status:** Automated accessibility testing and agent-based design reviews are complete. AI-simulated learner and review-panel evaluations are pending. No real learners have tested this yet. See evaluation/METHODS.md.

**Context:** Lakeside State University — a fictional US public university preparing for ADA Title II digital accessibility compliance. All courses, enrolments and numbers in the cases are fictional; the frameworks and the evidence base are real and cited.

---

## The problem

Faculty AI guidance is mostly generic: "use more orals", "ban it", "teach prompt literacy". None of that tells a lecturer which parts of **their** assignment AI can already do, what to keep, what to tell students, and what it costs in grading time. Meanwhile unenforceable bans are quietly failing — and detection tools, the tempting shortcut, are neither accurate nor fair (none above 80% accuracy across 14 tested tools; consistent misclassification of non-native English writers; OpenAI retired its own classifier for inaccuracy).

## Audience and context

- **Primary:** faculty and TAs in first- and second-year undergraduate courses, mixed AI confidence, course sizes from 30 to 300+.
- **Secondary:** faculty developers and teaching centres who need a ready-to-run workshop; assessment specialists who need the reasoning, not just templates.

## My approach (analysis → design → build → evaluate)

1. **Research grounding.** Verified sources with access dates (AIAS 2.1 level names; Sydney's two-lane approach; detection-reliability evidence) — [research/literature-notes.md](research/literature-notes.md).
2. **Stress-test protocol.** Each original brief → three prompt strategies × two models → blind scoring by a judge panel where no model judges its own output — [research/stress-test-protocol.md](research/stress-test-protocol.md). The pipeline is built and dry-run tested; **scores are PENDING until API keys are added**.
3. **Vulnerability analysis (published now, labelled as reasoning).** Which rubric criteria AI satisfies for free — fluency, plausible citations, template analysis — and which need a student's own process or live defence.
4. **Three full redesigns.** Each: redesign rationale → per-stage AI-use levels (AIAS 2.1, icon + text) → student brief in plain language → new rubric with alignment table → faculty notes with grading-time arithmetic, 200+ scaling, accommodations, multilingual notes.
5. **Tooling.** A six-question accessible decision tool and a complete 90-minute workshop (guide, slides, canvas, handout, pre/post survey).
6. **Evaluation.** Automated accessibility audits, scripted keyboard/reflow tests, an agent review, and pending multi-model pipelines — [evaluation/METHODS.md](evaluation/METHODS.md).

## Key design decisions

| Decision | Alternatives considered | Rationale and evidence |
|---|---|---|
| Stress-test before redesigning | Assume vulnerability; redesign on instinct | Evidence shows *which* criteria are at risk and prevents over-engineering; the protocol (blind, cross-judged) is reusable when AI changes |
| Explicit AI-use level per task stage (AIAS 2.1: No AI / AI Planning / AI Collaboration / Full AI / AI Exploration) | Course-wide ban or permission | Stages serve different goals; clarity reduces accidental misconduct; level names verified against the official AIAS site (2026-10-25) |
| Two lanes: secure a few checks, open the practice | Secure everything; ban everything | Workload and student experience; follows the Sydney two-lane approach (Liu & Bridgeman, 2023); Case B weights secure checks (20%) above open practice (10%) |
| No reliance on detection, anywhere | Detection-based enforcement | Weber-Wulff et al. 2023 (14 tools, none above 80%; worse on edited and machine-translated text); Liang et al. 2023 (bias against non-native writers); OpenAI's classifier retired 2023 |
| Workload + equity notes in every case | Ideal designs only | Redesigns that cost more grading time or that disadvantage multilingual students and accommodations users don't survive; every case carries the arithmetic and the alternatives |
| Workshop centres on participants' own assignments | Lecture about AI | Transfer happens on your own brief; the canvas + decision tool structure it |

## Evidence and evaluation

**What was measured (or is pending):**

- Automated accessibility: axe-core 4.11.1 — decision tool and workshop slides: **0 violations** (local, 2026-10-25); full-site audit re-run against the live Pages build after publishing. Scripted Playwright tests of the decision tool: **20/20** (keyboard-only completion, focus management, live-region announcements, Back/Start-over, error alerts, 320 px and 256 px reflow, no data leaves the page). Internal link integrity: **137 links, all resolve**.
- **AI stress-test scores: PENDING — requires API key.** The case pages show the vulnerability *reasoning* (labelled as such), exact prompts, and empty score tables. When `npm run eval:pending` runs with real keys, measured scores replace the tables and this section is updated.
- Agent review (fresh-context reviewer agent): findings feed `docs/evaluation/revisions.md`. Labelled as agent review; same-model limitation stated.

**What this evidence cannot show:** student learning outcomes; real integrity-incident rates; results with future models or determined students using them; validation against human scoring (a human second scorer is the planned upgrade, protocol ready); whether the workshop "works" until it is delivered with real participants (exit form ready in `evaluation/human-protocol/`).

**What changed because of evidence so far:** the decision tool's incomplete-submit error became a `role=alert` with focus moved to the first unanswered question; slide navigation stayed linear/plain HTML after checking reveal.js accessibility trade-offs; the workshop agenda's arithmetic is verified by a mechanical check that runs in every pipeline dry-run.

## The three cases (one line each)

- **[Case A — argumentative essay](docs/case-a-essay/original.md):** staged build with a verified-source gate and a 5-minute defence; AI Collaboration on draft feedback, No AI on the defence.
- **[Case B — problem set](docs/case-b-problem-set/original.md):** open AI-as-tutor practice (10%) + weighted in-class secure checks (20%) + a class-collected dataset + find-and-fix-the-AI-error items.
- **[Case C — research report](docs/case-c-research-report/original.md):** team-collected data, dated lab notebook, analysis-choices memo, disclosed-AI write-up, structured Q&A with written alternative.

## Accessibility

- Tested: axe-core (0 violations on the interactive pages; full-site audit re-run on the live build), Playwright scripted keyboard/320 px/zoom tests (20/20), semantic HTML slides readable without CSS with speaker notes as text, AI-use-level icons always paired with text, rubric tables with proper header markup.
- **Manual screen-reader check: not yet run.** Guidepup/VoiceOver automation is non-functional on this build machine (macOS 27); the kit ships a 15-minute manual VoiceOver script (`evaluation/human-protocol/manual-voiceover-check.md`) so anyone can run and record it. This is a known gap, stated here rather than hidden.
- No WCAG conformance claim is made; pages are designed to support WCAG 2.1 AA and tested with automated tools.

## What I'd do differently / next steps

- Ship the stress-test numbers instead of (and alongside) the reasoning — the honest sequencing (reasoning first, measured numbers when the pipeline runs) is the right call, but the kit is visibly stronger with both.
- Pair the blind AI judge panel with a human second scorer as soon as one is available; agreement statistics from AI-only judging have known limits.
- Add a fourth case from a non-Western curriculum context; the current three are US-flavoured.
- Deliver the workshop for real and feed the exit-form data back into the guide.

## Tools used

Node 25.6, Playwright 1.57.0, axe-core 4.11.1, gitleaks 8.30.1, GitHub Pages + Jekyll (Just the Docs v0.12.0, pinned), vanilla HTML/CSS/JS for the decision tool and slides, dotenv 17.3.1 for the pending pipelines. No local AI models were used anywhere; all LLM work goes through pending API pipelines with placeholder keys.

## Authorship disclosure

This kit was authored with AI assistance (drafting, editing, pipeline code), then reviewed and structured by the human author whose portfolio it belongs to. The stress-test pipeline exists precisely so that any AI-performed scoring is labelled, blind, cross-model and reproducible — never invented. Agent-based reviews are labelled as such. [Email] · [LinkedIn]

## License and attribution

- Learning content (prose, rubrics, briefs, workshop): **CC BY 4.0** — [LICENSE](LICENSE).
- Code (decision tool, slides styling, pipelines, tests): **MIT** — [LICENSE-CODE](LICENSE-CODE).
- Third-party sources are cited with access dates in [research/literature-notes.md](research/literature-notes.md) and [ATTRIBUTION.md](ATTRIBUTION.md).
- AIAS level names © Perkins, Furze, Roe & MacVaugh (CC BY 4.0, aiassessmentscale.com); the two-lane framing is University of Sydney's (Teaching@Sydney). Both used with attribution under their licences.
