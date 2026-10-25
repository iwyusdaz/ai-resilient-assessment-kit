# STATUS — ai-resilient-assessment-kit

Last updated: **2026-10-26** (revision round 1 applied — see docs/evaluation/revisions.md)

## Current state

| Item | Status |
|---|---|
| Repository | github.com/iwyusdaz/ai-resilient-assessment-kit (published 2026-10-25; revision round 2026-10-26) |
| Live site | https://iwyusdaz.github.io/ai-resilient-assessment-kit/ (Pages from main `/docs`, Just the Docs v0.12.0 pinned) |
| Research layer (verified literature notes + stress-test protocol) | Complete — browsable on the site under `docs/research/` (moved 2026-10-26; pipeline scripts remain in `research/`) |
| Core pages (principles, eight approaches, AI-use levels w/ verified AIAS 2.1 names) | Complete |
| Case A (essay) — 6 files | Complete (scores PENDING); grading-time arithmetic reconciled 2026-10-26 (rows sum to the headline) |
| Case B (problem set) — 6 files | Complete (scores PENDING); practice lane standardized at 10% total + gradebook budget stated 2026-10-26 |
| Case C (research report) — 6 files | Complete (scores PENDING); 38→30% weight structure adopted in brief + redesign; Q&A aligned at 2 min/student 2026-10-26 |
| Stress-test score tables | **PENDING — requires API key** (`research/run-stress-test.mjs`; dry-run tested; blind cross-model judging per DECISIONS.md D3) |
| Re-test on redesigns | **PENDING — requires API key** (`--redesign` mode; protocol step 5) |
| Decision tool | Complete, axe-clean (0 violations), **28/28 scripted tests** (keyboard, first-reveal focus + no focus yank on recompute, live region, low-confidence warning, 320px/256px reflow, zero data sent); logic verified over all 972 answer combinations (0 assurance combos without a secure check); in the sidebar nav since 2026-10-26 |
| Workshop package (guide, 13 HTML slides, canvas, handout, pre/post survey) | Complete — retimed 2026-10-26 so segment steps fit their slots (sprint 4/4/6/8/4 + buffer; parallel post-survey; gallery-walk rotation cap; group size stated); **agenda timing not yet validated by delivery** (mechanical arithmetic check passes; simulated-participant pipeline pending); slides in the sidebar nav since 2026-10-26 |
| Templates (syllabus + assignment AI statements, blank canvas) | Complete |
| axe audit (decision tool + slides, local) | Done — 0 violations (full-site audit re-run against live Pages build after publish) |
| Internal link integrity | Done — 163 internal links + fragments across 43 files resolve (research pages now inside docs/) |
| Playwright scripted tests | Done — 28/28 (see evaluation/results/accessibility/decision-tool-tests.md) |
| Agent review (fresh-context reviewer agent, structured form) | **Run 2026-10-26** — full review in `evaluation/agent-review.md` (labelled "Agent review", never "educator review"; same-model limitation stated); dispositions in docs/evaluation/revisions.md; changes applied this round |
| Multi-model review panel | **PENDING — requires API key** (`evaluation/run-review-panel.mjs`; dry-run tested) |
| AI-simulated workshop participants | **PENDING — requires API key** (`evaluation/run-simulated-participants.mjs`; dry-run tested; mechanical agenda check passes) |
| Educator review (≥ 3 human educators) | Not run — form, invitation and consent text ready in `evaluation/human-protocol/` + `docs/evaluation/educator-review.md` |
| Manual VoiceOver check | Not run — script ready (`evaluation/human-protocol/manual-voiceover-check.md`); Guidepup non-functional on macOS 27, so no VoiceOver claims are made anywhere |
| Social preview image | Generated at `docs/assets/social-preview.png` (1280×640); **uploading via Settings → General is an owner task** (no API) |
| Pipeline guardrails | Verified: placeholder `.env` → exit 1, zero network; `--dry-run` → stubs labelled "DRY RUN – NOT REAL RESULTS" |

## Verification log (2026-10-26) — post-publish, after the revision round

| Check | Command | Result |
|---|---|---|
| Pages build | `gh api .../pages/builds/latest` | built for commit `846d379`, no error |
| Decision tool tests (live) | `node evaluation/tests/decision-tool-tests.mjs https://iwyusdaz.github.io/ai-resilient-assessment-kit/decision-tool/index.html` | **28/28 PASS** (incl. focus-stays-put on recompute, assurance+take-home secure check, ai-collab rules, low-confidence warning) |
| Exhaustive tool logic | scripted replication of tool.js scoring over all 972 combinations | 0 assurance combinations without a secure check (was 50); 0 empty results; 24 low-confidence (top score ≤ 2) |
| Previously-broken combos driven live | Playwright against the live tool | assurance+take-home × 2 → "Proctored/secure checks" first card with the principle-4 rationale; weak combo → low-confidence warning renders |
| Live content spot-checks | curl + text match on all three faculty-notes pages + facilitator guide | new reconciled numbers present; old broken numbers ("12–14 min", "≈ 90–100 h", "About half", "roughly a quarter", "halves it") absent |
| Sidebar nav (live) | curl of homepage nav | 33 entries incl. **Decision tool** (top level), **Workshop slides** (under the guide), **Research** (+ 2 children); research pages return 200 (were 404) |
| axe (live) | `node tooling/audit-axe.mjs <tool, slides, research × 2, case-c faculty notes>` | **0 violations** on all five (1 incomplete on markdown-heavy pages, typical for scrollable wrappers) |
| Live linkcheck | `node tooling/linkcheck.mjs <live> --max 400` | **38 pages, 0 broken links** (was 34 — the research layer is now on the site) |
| Mechanical agenda check | `node evaluation/run-simulated-participants.mjs --dry-run` | PASS — segments tile 0–90 |
| Secrets | `gitleaks detect` | no leaks found |
| Local suite re-run | `npm run test:md-links` | 163 internal links across 43 files, all resolve |

## Verification log (2026-10-25)

| Check | Command | Result |
|---|---|---|
| Pipeline syntax | `node --check` on all pipelines | OK |
| Dry-run, stress test | `node research/run-stress-test.mjs --dry-run` | 18 stub generations + 36 stub judgments, no network (also `--redesign` mode) |
| Dry-run, review panel | `node evaluation/run-review-panel.mjs --dry-run` | 66 stub files, no network |
| Dry-run, participants | `node evaluation/run-simulated-participants.mjs --dry-run` | 70 stubs + mechanical agenda check PASS (segments tile 0–90) |
| Placeholder .env guard | `cp .env.example .env && npm run eval:pending` | all three pipelines exit 1, clear message, zero network |
| Decision tool tests (local) | `node evaluation/tests/decision-tool-tests.mjs` | 20/20 PASS |
| Decision tool tests (live) | `node evaluation/tests/decision-tool-tests.mjs https://iwyusdaz.github.io/ai-resilient-assessment-kit/decision-tool/index.html` | **20/20 PASS** |
| axe: decision tool + slides (local) | `node tooling/audit-axe.mjs <local urls>` | 0 violations |
| axe: all 30 live pages | `node tooling/audit-axe.mjs <30 live urls>` | **0 critical/serious on every page** after two live-only fixes (below) |
| Internal links + fragments (source) | `node evaluation/tests/check-md-links.mjs` | 137 internal links + fragments resolve |
| Live linkcheck | `node tooling/linkcheck.mjs https://iwyusdaz.github.io/ai-resilient-assessment-kit/ --max 400` | **34 pages, 0 broken links** |
| External citations | curl status sweep of 13 sources | 8 × 200; 4 bot-blocked (403: MDPI ×2, preprints.org, OpenAI — existence verified via publisher index, noted in literature-notes); TEQSA connection timeout (search-index verified, noted) |
| Secrets | `gitleaks detect` (9 commits) | no leaks found |
| No `.env` in history | `git log --all --name-only` | never committed |
| No files > 50 MB | `git rev-list --objects --all` size check | none |

### Live-build fixes (found only after Pages deploy — recorded per the plan's warning)

1. **GFM task-list checkboxes rendered as unlabeled inputs** (axe: critical, `label`) on the five pages using `- [ ]` syntax — Jekyll renders them as bare `<input type="checkbox" disabled>` with no accessible name. Fix: converted to plain bullets; re-audited clean (commit `8a28454`).
2. **Scrollable regions without keyboard access** (axe: serious, `scrollable-region-focusable`) — Just the Docs wraps wide rubric tables in `.table-wrapper` with `overflow-x: auto`; the four table-heavy pages were flagged. Fix: the theme footer now sets `tabindex="0"` on any overflowing wrapper/`pre` (commit `5ef7150`); re-audited 0 violations.

## Known gaps (honest list)

1. **All stress-test numbers pending** — case pages show labelled reasoning, not results, until the API run.
2. **No human participants in anything yet** — no educator review, no workshop delivery, no real screen-reader pass. All protocols ready.
3. **Same-model limitation** — agent review may share the author's underlying model; stated wherever agent review is mentioned.
4. **Workshop timings are estimates** — validated arithmetically and against the agent review's segment-by-segment timing walkthrough (2026-10-26, which found two overflowing segments; both rebalanced); the simulated-participants pipeline (pending) is designed to stress them; real delivery is the owner's optional step.
5. ~~Live-site axe audit + linkcheck re-run~~ — **done 2026-10-25**: all 30 pages 0 critical/serious (after the two live-build fixes above); 34-page crawl, 0 broken links; decision-tool suite 20/20 against the live build.
