# Agent review — ai-resilient-assessment-kit

**Reviewer:** separate AI reviewer agent (fresh context), 2026-10-26. Limitation: the reviewer may share the same underlying model as the author. This is not human or educator review.

**Scope and method.** This review covers all three cases, the decision tool, the workshop package, the research layer and the live site (https://iwyusdaz.github.io/ai-resilient-assessment-kit/), using: (1) a cognitive walkthrough as a faculty member with mixed AI confidence; (2) a heuristic evaluation against Nielsen's 10 heuristics with severity ratings (0 = no problem, 4 = catastrophe); (3) the structured review form from `docs/evaluation/educator-review.md`, completed below and labelled **Agent review** (the form scopes one case + the decision tool for human reviewers; this agent review covered everything, which took the equivalent of substantially longer); (4) the binding repo-specific probes — workshop timing walkthrough, exhaustive decision-tool logic test, AIAS name sweep, pending-score framing, rubric alignment, honesty sweep; (5) automated accessibility re-checks on the live site plus a scripted keyboard spot-check of the decision tool.

Everything below cites files and quotes so each finding is actionable. Findings are ranked in the final section.

---

## 1. Cognitive walkthrough (faculty member, mixed AI confidence)

**Landing (live homepage).** First screen: title, one-line summary, evaluation-status notice, fictional-university note — honest and fast. The browser title is "Start here | AI-Resilient Assessment Kit" and the H1 is "Start here". "What problem this solves" speaks to the reader's actual frustration ("It doesn't tell a lecturer *which* parts of *their* assignment AI can already do"). Good.

**Finding "what do I do with MY assignment."** The homepage's "How to use this kit" gives three role paths: *"If you teach: start with principles, then read the case closest to your own course, then try the decision tool on your own assignment."* That is a three-artifact reading path (a ~1,700-word principles page + a 6-page case) before touching your own assignment. The decision tool is the fastest "do it with MY assignment" entry, and it works well — but:

- **Finding W1 (severity 3, findability).** The decision tool is **absent from the persistent sidebar navigation** on the live site (all 28 nav items checked; the tool is a static HTML page with no Jekyll front matter, so Just the Docs never lists it). Same for the workshop slides (`workshop/slides/`). A returning visitor cannot navigate to either from the sidebar; they only exist via in-page links. *Fix:* add nav entries (a `nav_order`-ed HTML page wrapper, a redirect page, or links in a "Tools" sidebar group).
- The "evidence trail" links on the homepage point to **GitHub blob URLs**, not site pages: `research/literature-notes.html` and `research/stress-test-protocol.html` are **404 on the live site** (research/ lives outside `/docs`). Mid-reading, a case page's "Per the stress-test protocol" link yanks the reader off the site to GitHub rendering. *Fix (W2, severity 2):* move `research/` under `docs/` (or add rendered summaries), so the evidence layer is part of the browsable site.

**Decision tool end-to-end (three answer combinations, live, keyboard).** Six questions on one page; radio groups in fieldsets with legends and hints; results auto-appear when all six are answered. Measured on the live site:

- Combo A (learning / process / 50–150 / take-home / AI goal yes / team) → cards: Open AI use with reflection, Oral checks, Staged submissions — 6 "why" bullets. Sensible.
- Combo B (assurance / product / >150 / take-home / no / minimal) → Personalized or local data, Proctored/secure checks, Staged submissions. Sensible (see §4 for the assurance gap that remains).
- Combo C (both / live-skill / >150 / some class time / no / solo) → Oral checks, Proctored/secure checks, Process portfolio. Sensible.
- Full keyboard run: 12 interactions (focus + Space per question). Back returns focus to the cleared question's radio (verified: after answering Q1–Q3, Back focused the size radio). Results heading receives focus and has `tabindex="-1"`; live region announces "Results ready: 3 recommended approaches shown below."
- **Finding W3 (severity 2, focus management).** After results are shown, changing any answer re-runs the search and **yanks focus to the results heading**, away from the radio the user just operated (verified live: focus = `results-heading` after clicking a different purpose label). A keyboard user changing their mind loses their place. *Fix:* only move focus on the *first* results reveal; on subsequent recomputes, update a live-region message instead.
- The "Why this recommendation?" box does explain — the bullets are the matched rule rationales, which is the right design.

**Case A chain (original → stress test → redesign → student brief → rubric).** All six pages live, cross-linked, with a pager on the original page and full sidebar presence. The stress-test page's status note is impossible to miss: *"All score tables are PENDING — requires API key. The vulnerability analysis below is our design reasoning, not measured results."* A skeptical faculty member knows exactly what they are and are not looking at. The chain is followable without help (form Q1: yes). One internal contradiction found (see §5, AIAS probe).

**Workshop materials, as a facilitator the day before.** The facilitator guide is genuinely runnable: per-segment scripts with quoted openings, a pushback table with six scripted answers, a pre-session checklist ("AI tool logged in and tested on the room's network; backup outputs pasted in the slides appendix"), an explicit demo-failure fallback (*"use the pre-generated backup… Never fake it live"*), and an honest appendix that forbids fabricated backups (*"Do not write your own 'AI-looking' text as a backup: a fabricated sample defeats the point of the session"*). The full timing walkthrough is §4; the summary for a facilitator: the top-level agenda tiles 0–90 exactly, but **two segments' internal step sums exceed their slot** (sprint 33 min of steps in a 28-min slot; closing 10 min of steps in 8), so the day-of experience will run late unless the guide is revised.

---

## 2. Heuristic evaluation (Nielsen's 10) — live site

| # | Heuristic | Severity | Evidence |
|---|---|---|---|
| 1 | Visibility of system status | 1 | Decision tool announces "Answered n of 6" politely and shows "Results ready: 3 recommended approaches" — good. Workshop slides are one scroll page with no position cue ("slide 5 of 13"); the plain-HTML trade-off is documented (DECISIONS D4), so minor. |
| 2 | Match with the real world | 1 | AIAS levels and "two lanes" are introduced before use; "viva-lite" glossed. "Assurance" and "validity" appear on the homepage without a one-line gloss; the audience includes faculty who have never used the assessment vocabulary. |
| 3 | User control and freedom | 2 | Back / Start over work with correct focus return. Exception: focus is captured to the results heading on every re-answer after results are visible (W3 above). |
| 4 | Consistency and standards | 3 | Case B's open-lane weight is **15%** in `redesign.md` and `student-brief.md` but **10%** in `rubric.md`, `README.md`, `DECISIONS.md`, slides slide 7 and the handout (see §5). Case C's Q&A is "two questions" in the student brief but has three anchors in redesign/faculty notes. These are factual contradictions a careful reader will catch. |
| 5 | Error prevention | 1 | Tool prevents empty submits with a `role=alert`, focus to the first unanswered question, and a count ("Please answer 2 more questions"). Canvas asks for grading-time estimate before committing. |
| 6 | Recognition rather than recall | 3 | Decision tool and slides missing from persistent nav (W1). Everything else is well cross-linked; the AIAS card is repeated in handout + canvas + slides so nobody must recall it. |
| 7 | Flexibility and efficiency | 1 | No-JS fallback for the tool links to the approaches page; `noscript` message present; site search enabled. Decision tool works on phones (slide 9 claims it; verified at 320 px and 256 px in the scripted suite, re-run live). |
| 8 | Aesthetic and minimalist | 1 | Case pages are long but every section earns its place; the six-page case split with parent/child nav keeps each page digestible. The rubric tables are wide but scrollable wrappers are keyboard-focusable (fixed per STATUS). |
| 9 | Recognize/recover from errors | 1 | Tool's fetch-failure path replaces the form with a plain-language message and a link to the approaches page. No dead ends found in the link check (137 internal links re-verified by the repo's own script and a 34-page live crawl per STATUS). |
| 10 | Help and documentation | 1 | Facilitator guide, handout, templates and literature notes are strong. Gap: no "start in 10 minutes" quick path for the impatient faculty member (W-path note in §1). |

No severity-4 issues. The severity-3 items are consistency (§4/§5), nav findability (W1) and the workshop timing overflows (§4).

---

## 3. Structured review — completed form (Agent review)

*Form from `docs/evaluation/educator-review.md`, completed by the reviewer agent and labelled as required. Part 1 (profile) is not applicable to an agent; the "case" for the deep read was Case A, with B and C reviewed at full-kit level.*

### Part 2 — The case (Case A; B and C noted where they differ)

1. **Clarity — 5/5.** The stress-test → redesign → rubric chain is followable without asking anyone. The PENDING status note on each stress-test page states exactly what is and is not measured, and the redesign's vulnerability table traces every choice back to a criterion risk. Step anchors like `redesign.html#what-learning-must-this-assessment-show` work.
2. **Validity of the redesign — 4/5.** The redesign genuinely re-aims certification at what AI cannot produce alone (verification gate, defence, AI-use judgment), and the rubric's alignment table maps each criterion to an outcome element. Deductions: the reasoning is unmeasured by design (pending pipeline — properly labelled), and Case A's rubric introduces criterion 4 (AI-use judgment) justified by a "course AI-literacy outcome" that the redesign's own outcome statement never declared (the alignment table cites it as if established).
3. **Feasibility — 3/5.** This is the weak flank, and it matters because the kit's pitch is that faculty notes "carry the arithmetic":
   - Case A: headline "12–14 min total × 180" vs. its own breakdown 2+4+1+6–8+4–5 = **17–20 min** (≈14–16 with the sampled defence) — the rows don't sum to the headline.
   - Case B: "10–12 min × 250 × 5 weeks (≈ 90–100 h)" is arithmetically **208–250 h**; "~1.5 min × 250 × 5 (≈ 19 h)" is arithmetically **≈ 31 h**. The "about half the original marking load" claim (also on slides slide 8 and in the pushback table) rests on numbers that don't reconcile.
   - Case C: headline "10–12 min per student total" vs. breakdown 3+4+4–5+1.5+1 = **13.5–14.5 min**; and the Q&A is "10 minutes per team" (brief, scaling note) but "~1.5 min per student (team session ≈ 15 min)" in the grading table (10/5 = 2 min).
   - Unaddressed in all cases: the redesigns *add graded weight* (Case A 25% → 35%; Case B adds a new 20% secure-lane component on top of the unchanged midterm) without saying where that course-grade budget comes from. An educator will ask this first.
4. **Equity — 5/5.** The strongest dimension. Every oral component has an equal-weight written/recorded alternative chosen once at term start with no diagnosis disclosure; AI-permitted stages are constrained to free tiers with an explicit "no access at all" path; multilingual notes in every case; Case C's provided-dataset fallback is designed to preserve the notebook criterion's meaning. Detection is excluded with cited evidence, consistently.
5. **Student experience — 4/5.** The student briefs are the best writing in the kit — plain language, honest "why these rules (the honest version)" sections, example disclosure statements, pre-submit checklists. Concerns: Case A now has five deadlines where it had one (acknowledged, but the student-facing cost deserves a line in the brief's honest section); Case C's team structure is well-mitigated (tagged entries, individual Q&A) but still a known stressor.
6. **Would you use it? — With changes.** Fix the arithmetic and weight contradictions (they are all one editing pass), add the gradebook-budget note, then yes — the design reasoning is sound and the materials are unusually complete.

### Part 3 — The decision tool

7. **Recommendations and reasoning — partly right, fixable.** Exhaustive test (scripted over all 972 answer combinations, replicating `tool.js` scoring):
   - **No combination yields an empty result** (0/972) — good news for robustness, but it makes the empty-state message (*"No recommendation fired for this combination. That usually means the answers point in different directions…"*) **unreachable**, i.e. dead copy promising behaviour that never occurs.
   - 12 combinations (1.2%) return a single weak recommendation (top score 1), all involving `evidence: "ai-collab"` — **no rule in `questions.json` keys on the `ai-collab` answer of question 2**, so the most on-topic answer has no dedicated scoring path; those users get incidental recommendations only.
   - **50 of 324 "certify/assurance" combinations produce no secure check at all** (all with size <50 + take-home only). The tool then recommends an all-open design for someone whose stated purpose is assurance — contradicting the kit's own principle 4 and Case B's "does not solve" (fully-remote offerings need a different secure-lane design). *Fix:* add a rule or a conditional results note for assurance + take-home, pointing to that exact caveat.
   - The "Why this recommendation?" bullets are genuinely explanatory (the matched rule rationales) — this part works as designed.
8. **Missing from the eight approaches:** program/course-level mapping (the kit is strictly task-level — see Part 4); peer assessment as a move; "AI-vulnerable skills re-timed" (e.g., moving retrieval-heavy tasks in-class without full invigilation). The evidence-base ratings are honest (critiquing-AI labelled "anecdotal-to-emerging… stated plainly rather than oversold").

### Part 4 — Missing pieces

9. For the kit's own stated audience the gaps are: (a) **course-level sequencing** — how several redesigned tasks share one secure/open budget across a term (the two-lane idea is applied per task; a program view is the natural next page); (b) where new grade weight comes from (Part 2.3); (c) non-US/non-English contexts (acknowledged in README next-steps: "the current three are US-flavoured"); (d) a filled-in example canvas (the workshop canvas has prompts and a one-line Case A example; one complete worked canvas would help solo adopters); (e) LMS specifics are deliberately out of scope but one paragraph on where disclosures live in common LMSs would prevent a real adoption stall.

---

## 4. Repo-specific probe 1 (binding): workshop flow and timing walkthrough

The top-level agenda tiles 0–90 exactly (0–10, 10–25, 25–40, 40–42 break, 42–70, 70–82, 82–90), and the repo's mechanical check verifies exactly that (tiling only). Segment by segment:

| Segment | Verdict | Evidence and fix |
|---|---|---|
| 0–10 Opening | **Plausible, one risk** | Poll is pre-run; script 3 min; reading 4–6 items aloud fits. Risk: the pre-survey is slotted "in minutes 0–2" (`survey.md`), but the survey has 5 Likert + 2 open questions — 2 minutes is not realistic. *Fix:* calendar-invite only; drop the in-session pre-survey option. |
| 10–25 Live demo (15 min) | **Tight; will hold only as a skim** | Internal split 5+7+3 = 15 ✓. But the demo needs two full 1,500-word essay generations (~1–1.5 min each) plus participants scoring **both** outputs against a 4-criterion, 20-point rubric. Real scoring of 1,500 words takes ~6 minutes of reading alone; the 60-second instruction only works as a gut-score skim, which the guide never says. *Fix:* relabel explicitly — "gut-score in 60 seconds per round; totals are a vibe, not a mark" — or score only two criteria per round. Fallback for tool/network failure: present and good (pre-generated backup, "Never fake it live", alternative = score a colleague's anonymised past submission). |
| 25–40 Principles + levels (15 min) | **Overflows as scripted in the guide; fits if you follow the deck** | Guide script: "walk the six principles — one slide each, 90 seconds" = 9 min, *then* "the AIAS 2.1 levels" — but the deck compresses principles 3&4 and 5&6 into slides 7–8 (four principle slides, AIAS already inside slide 6). Guide text and deck are out of sync; following the guide's own arithmetic (6×90 s + AIAS walk + 5-min interaction) needs ~17–18 min. *Fix:* rewrite the guide segment to match the deck: "slides 5–8 at ~90 s each (≈6 min), AIAS recap within slide 6, 5-min pair interaction, ≥3 min buffer." |
| 40–42 Break | OK | Return activity announced in script ✓. |
| 42–70 Redesign sprint (28 min) | **FAILS as written — the key timing failure** | The five canvas steps sum **5+5+8+10+5 = 33 min > 28 min** (both `facilitator-guide.md` and slides slide 10). The canvas page is even titled "Redesign canvas — 25-minute activity", contradicting both. As written, the gallery walk starts ≥5 min late every time. Also, step 4 asks pairs to run the decision tool as a cross-check *inside* its 10 minutes — the tool alone is ~3–5 min with reading. *Concrete fix:* 4/4/6/8/4 = 26 min (+2 buffer), make the decision tool "optional if you finish step 4 early", and retitle the canvas ("28-minute activity" or better "the 26-minute sprint"). |
| 70–82 Gallery walk (12 min) | **Under-specified** | "3 minutes per canvas, rotating" with no cap on how many canvases each pair visits; at 3 min/canvas, 12 min supports exactly 3 rotations with zero transition time. Online (swap PDFs/screen shares) is mentioned but rotation mechanics are not. *Fix:* "visit exactly two other canvases (2×4 min) + 4-min harvest"; for online, pre-assign doc pairs. Also state the designed group size (none appears anywhere; 12–30 participants / 6–15 pairs makes all segments work; 40+ does not). |
| 82–90 Commitments + survey (8 min) | **Overflows** | Guide's own split: script 3 + post-survey 5 + close 2 = **10 min > 8**, and the go-around ("each pair says their step in ≤15 seconds") adds ~3–4 min at 12–15 pairs. *Fix:* post-survey via QR while pairs write commitments (parallel), cap go-around to 6 volunteered pairs. |

**Online vs. in-person:** workable — poll/captions/screen-share variants exist for every segment; the gallery walk is the weakest online and needs the rotation mechanics above.

**Does the sprint produce a usable draft in 30 (28) minutes?** With the current 33-minute step list, no; with the rebalanced 26-minute list, a one-assignment draft through Box 5 is realistic for pairs who arrive with "the assignment they hate marking" — the guide does the right things to enable this (one sentence for Box 1, "time-box hard at minute 68", park course-level scope in Box 6).

**Summary verdict:** the agenda *tiles* to 90 but two segments' internals (sprint, closing) don't fit their slots, one segment's guide script overflows (25–40), and the demo needs its scoring reframed. All fixable in one editing pass; none require re-architecting the session. STATUS.md already says "agenda timing not yet validated by delivery" — accurate; this walkthrough adds the specific places it will break.

---

## 5. Repo-specific probes 2–5 (binding)

### Decision tool logic — full combination test

Method: script replicated `tool.js` scoring over all **972** answer combinations (3×4×3×3×3×3). Results: 878 combos → 3 recommendations, 82 → 2, 12 → 1, **0 → empty**. Findings (also raised in form Q7):

- **Logic hole A (assurance without class time):** 50/324 assurance combos (small + take-home) recommend no secure component, silently contradicting principle 4. Add a rule or a results-note for this case.
- **Logic hole B (`ai-collab` evidence unused):** no rule references question 2's "Working well with AI tools" answer; the 12 weakest results all sit there. Add rules mapping `evidence: ai-collab` → open-ai-reflection / critique-ai.
- **Dead copy:** the "No recommendation fired" empty-state can never render (0/972). Either make it reachable (e.g., stop the always-on open-lane rules from papering over contradictory inputs) or rewrite it as a low-confidence warning shown when the top score ≤ 1 (the 12 single-weak combos).
- **Focus jump on re-answer** (W3, severity 2): verified live; fix as described in §1.
- Cosmetic: `tool.js` line 166 computes `remaining` and never uses it (dead code).
- The `alwaysAdd` note (open-lane/AIAS pointer) renders in all 972 cases including alongside the empty-state — good.

### AIAS 2.1 level names — consistency sweep

Grep sweep across `docs/`, `research/`, `evaluation/` plus the decision tool and slides: the five names (**No AI / AI Planning / AI Collaboration / Full AI / AI Exploration**) are used verbatim and exclusively everywhere they appear (48 / 21 / 33 / 12 / 10 mentions respectively); no deviant or home-grown level names exist; icons are always paired with text; `ai-use-levels.md`, all three student briefs, all three redesign level tables, the rubrics, handout, canvas, templates, slides (slide 6) and the decision tool's note all agree. Literature notes document the verification (official site, 2026-10-25, with the JUTLP citation). **One drift exception (severity 2):** `case-a-essay/stress-test.md` re-test section says *"Parts of the redesign are deliberately open (AI Collaboration on the annotated-source commentary)"* — but the Case A redesign sets the annotated-source stage at **No AI (1)**; AI Collaboration belongs to the draft+log stage. Fix the stress-test sentence.

### Pending-score framing — honesty probe

All three `stress-test.md` pages: identical framing ("PENDING — requires API key"; "design reasoning, not measured results"; explicit refusal to include constructed AI text). Score tables contain only PENDING markers and dashes; grep found **no number-shaped values** in any score position. README ("AI stress-test scores: PENDING — requires API key"), STATUS ("PENDING — requires API key… dry-run tested"), DECISIONS D1 (treats the pending state as a decision with alternatives) and METHODS (Method 5 "cannot show… tables stay PENDING until this runs", plus a status-check rule for future readers) all agree. Dry-run stubs are labelled `DRY RUN – NOT REAL RESULTS` with `output: "STUB OUTPUT…"` — spot-checked. **Verdict: consistent and honest; no fabricated AI output anywhere.**

### Rubric alignment — Case A full spot-check

- 5 criteria × 4 levels, 40 points; alignment table maps all five course-outcome elements to criteria and evidence sources — every outcome element is covered and every criterion traces to an element.
- Stage weights in the gradebook mapping (5+10+0+15+5) = 35% ✓ matches the rubric header.
- Notes: (a) criterion 4's "course AI-literacy outcome" is not among the outcome elements listed in the redesign's "What learning must this assessment show?" — declare it there or in the alignment table's source column; (b) the original essay was 25% and the redesign's stages total 35% — see the feasibility finding about gradebook budget.
- Cases B and C checked at structure level: B's four criteria map to its outcome ("choose, execute, interpret, check") ✓, but B's gradebook (sets 10%) contradicts B's redesign/brief (15%) — see §2/§6; C's five criteria map ✓ with an honest "38% → scaled to 30%" note, but C's rubric gradebook (data collection 8% **and** notebook 8%) contradicts the redesign ("data collection (part of 8%)") and the student brief (no data-collection weight line). Both need reconciling.

### Honesty sweep

- AI disclosure: README "Authorship disclosure" states AI assistance and how scoring is kept honest; homepage carries the standard evaluation-status notice ✓.
- `[Email]` / `[LinkedIn]`: present only as untouched placeholders (README, human-protocol files; METHODS rule 5 forbids filling them) ✓.
- Fictional label: the exact one-liner "a fictional US public university preparing for ADA Title II digital accessibility compliance" appears 11× across README/docs/DECISIONS with no variant drift ✓.
- Detection: every detector mention is negative-evidence or refusal (principles 6; all three faculty notes; syllabus template "Why no AI detectors"; workshop pushback table). No workflow relies on detection ✓.
- One caveat to keep honest: the four 2026 sources rest on publisher-index verification with 403s documented in the literature notes — the notes disclose this properly, which is the right handling.

---

## 6. Accessibility spot-check (live)

- axe audit re-run this review (2026-10-26) on the decision tool, the workshop slides and the Case A rubric page (wide-table case): **0 violations of any level** on all three (1 incomplete on the rubric page, typical for scrollable wrappers). Output in `/tmp/review05-axe`.
- Repo's scripted suite re-run against the live tool: **20/20 PASS** (keyboard-only completion, focus management, live region, Back/Start-over, error alerts, 320 px and 256 px reflow, zero external requests). (The suite writes its results file on completion; that file was restored to its committed state after the run — no repo changes from this review other than `evaluation/agent-review.md`.)
- Keyboard spot-check beyond the suite: full run = 12 interactions; Back restores focus to the cleared question; Start over returns to the first radio. The one manual finding is the re-answer focus jump (W3).
- Standing limitation correctly stated: no VoiceOver/Guidepun pass ("Manual screen-reader check: not yet run" — README, with the 15-minute human script provided).

---

## 7. Ranked findings (top 10)

| # | Severity | Finding | Where | Fix |
|---|---|---|---|---|
| 1 | **Must-fix** | Case B open-lane weight contradiction: 15% (redesign, student brief) vs 10% (rubric gradebook, README, DECISIONS, slides slide 7, handout) | `docs/case-b-problem-set/redesign.md`, `student-brief.md` vs `rubric.md`, `README.md`, `DECISIONS.md`, `workshop/slides/index.html` (slide 7), `workshop/handout.md` | Pick one (10% matches the "2 completion points × 5 sets" arithmetic and every downstream claim); correct redesign.md and student-brief.md |
| 2 | **Must-fix** | Grading-time arithmetic that doesn't reconcile, in all three faculty-notes pages (A: headline 12–14 vs rows 17–20; B: both totals wrong by ~2×; C: headline 10–12 vs rows 13.5–14.5) — the kit's core credibility claim is "the arithmetic" | `docs/case-a-essay/faculty-notes.md`, `case-b-problem-set/faculty-notes.md`, `case-c-research-report/faculty-notes.md` | Re-do each table so rows sum to the headline; state the defence-sampling amortisation explicitly in A; recompute B's totals (or correct the per-script minutes); align C's Q&A figure (2 min/student for a 10-min team session) |
| 3 | **Must-fix** | Redesign sprint over-subscribed: canvas steps 5+5+8+10+5 = 33 min in a 28-min slot; canvas titled "25-minute activity"; closing segment steps 10 min in 8; 25–40 guide script overflows its slot and is out of sync with the deck (4 principle slides, not 6) | `docs/workshop/facilitator-guide.md` (42–70, 82–90, 25–40 sections), `docs/workshop/activity-redesign-canvas.md` (title), `docs/workshop/slides/index.html` (slide 10) | Rebalance sprint to 4/4/6/8/4 (+2 buffer); make the decision tool an early-finisher option; parallelise post-survey with commitments and cap the go-around; rewrite the 25–40 script to match the deck; retitle the canvas |
| 4 | High | Decision tool: 50/324 assurance combinations (small + take-home) get no secure check, contradicting principle 4; `evidence: ai-collab` has no rules (12 weakest results); "No recommendation fired" empty-state is unreachable (0/972) | `docs/decision-tool/questions.json`, `docs/decision-tool/tool.js` | Add an assurance+take-home rule or conditional note (point to Case B's "does not solve"); add ai-collab→open-ai-reflection/critique-ai rules; replace the dead empty-state with a low-confidence warning when top score ≤ 1 |
| 5 | High | Decision tool and workshop slides missing from the persistent sidebar nav on the live site (28 nav items; neither appears) | `docs/decision-tool/`, `docs/workshop/slides/` | Give both pages Jekyll-visible nav entries (wrapper page or direct include) so return visitors can navigate to them |
| 6 | Medium | Focus yanked to results heading every time an answer changes after results are shown (verified live) | `docs/decision-tool/tool.js` (`showResults` on every change) | Move focus only on first reveal; announce recomputes via the existing live region |
| 7 | Medium | Case C internal contradictions: Q&A "two questions" (student brief) vs three anchors (redesign, faculty notes, and the brief's own list of three); rubric gradebook 8%+8% for data collection + notebook vs redesign's "part of 8%"; faculty-notes Q&A minutes (1.5 vs 2 per student) | `docs/case-c-research-report/student-brief.md`, `rubric.md`, `redesign.md`, `faculty-notes.md` | Standardise on three anchors (method / result-or-limitation / next step) and on one weight structure (the rubric's 38→30 scaling is the honest one — update redesign + brief to match) |
| 8 | Medium | Case A stress-test says the redesign leaves "AI Collaboration on the annotated-source commentary" open — the redesign sets that stage to No AI | `docs/case-a-essay/stress-test.md` (re-test section) | Change to "on the draft and its AI-use log" |
| 9 | Medium | Research layer (literature notes, protocol) is not on the live site: 404 rendered, links go to GitHub blobs mid-reading | `research/` location; links in `docs/index.md`, case stress-test pages | Move `research/` under `docs/` (or render on-site summaries) and point internal links at site pages |
| 10 | Medium | Feasibility gap no educator will skip: redesigned tasks add graded weight (A: 25%→35%; B: new 20% secure lane) with no statement of where the course-grade budget comes from; also Case A rubric criterion 4 relies on a "course AI-literacy outcome" never declared in the redesign's outcome section | all three `faculty-notes.md` + `redesign.md`, `case-a-essay/rubric.md` | Add one line per case ("weight found by reducing X / replacing the old Y% component") and declare the AI-literacy outcome in Case A's outcome list |

**Also noted (below the cut):** pre-survey "minutes 0–2" is unrealistic (survey.md); gallery-walk rotation count and workshop group size unspecified; homepage "If you teach" path buries the fastest entry (the tool) third; `tool.js` dead variable `remaining`; slides have no position cue (documented trade-off).

**What is genuinely good (briefly):** the honesty architecture is the best I have reviewed in this portfolio — pending framing is airtight, the stress-test pages refuse constructed AI text explicitly, the slides appendix forbids fabricated backups, and every review/simulation is method-labelled. The student briefs are model documents (plain language, honest "why" sections, real disclosure examples). Equity treatment (equal-weight alternatives, free-tier constraint, multilingual notes, no-diagnosis accommodations) is consistent and specific. The decision tool's "Why this recommendation?" design and its 20/20 keyboard/a11y test suite are strong. The pushback table in the facilitator guide is ready to use verbatim.

---

*End of agent review. Findings are also delivered as the reviewer's reply to the build coordinator for logging in `docs/evaluation/revisions.md`; per that file's process, accepted/rejected dispositions belong to the author.*
