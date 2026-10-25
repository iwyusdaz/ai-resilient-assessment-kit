# STATUS — ai-resilient-assessment-kit

Last updated: **2026-10-25** (v1.0.0 build complete)

## Current state

| Item | Status |
|---|---|
| Repository | github.com/iwyusdaz/ai-resilient-assessment-kit (published 2026-10-25) |
| Live site | https://iwyusdaz.github.io/ai-resilient-assessment-kit/ (Pages from main `/docs`, Just the Docs v0.12.0 pinned) |
| Research layer (verified literature notes + stress-test protocol) | Complete |
| Core pages (principles, eight approaches, AI-use levels w/ verified AIAS 2.1 names) | Complete |
| Case A (essay) — 6 files | Complete (scores PENDING) |
| Case B (problem set) — 6 files | Complete (scores PENDING) |
| Case C (research report) — 6 files | Complete (scores PENDING) |
| Stress-test score tables | **PENDING — requires API key** (`research/run-stress-test.mjs`; dry-run tested; blind cross-model judging per DECISIONS.md D3) |
| Re-test on redesigns | **PENDING — requires API key** (`--redesign` mode; protocol step 5) |
| Decision tool | Complete, axe-clean (0 violations), 20/20 scripted tests (keyboard, focus, live region, 320px/256px reflow, zero data sent) |
| Workshop package (guide, 13 HTML slides, canvas, handout, pre/post survey) | Complete — **agenda timing not yet validated by delivery** (mechanical arithmetic check passes; simulated-participant pipeline pending) |
| Templates (syllabus + assignment AI statements, blank canvas) | Complete |
| axe audit (decision tool + slides, local) | Done — 0 violations (full-site audit re-run against live Pages build after publish) |
| Internal link integrity | Done — 137 internal links + fragments resolve |
| Playwright scripted tests | Done — 20/20 (see evaluation/results/accessibility/decision-tool-tests.md) |
| Agent review (fresh-context reviewer agent, structured form) | Scheduled post-build — labelled "Agent review", never "educator review"; same-model limitation stated |
| Multi-model review panel | **PENDING — requires API key** (`evaluation/run-review-panel.mjs`; dry-run tested) |
| AI-simulated workshop participants | **PENDING — requires API key** (`evaluation/run-simulated-participants.mjs`; dry-run tested; mechanical agenda check passes) |
| Educator review (≥ 3 human educators) | Not run — form, invitation and consent text ready in `evaluation/human-protocol/` + `docs/evaluation/educator-review.md` |
| Manual VoiceOver check | Not run — script ready (`evaluation/human-protocol/manual-voiceover-check.md`); Guidepup non-functional on macOS 27, so no VoiceOver claims are made anywhere |
| Social preview image | Generated at `docs/assets/social-preview.png` (1280×640); **uploading via Settings → General is an owner task** (no API) |
| Pipeline guardrails | Verified: placeholder `.env` → exit 1, zero network; `--dry-run` → stubs labelled "DRY RUN – NOT REAL RESULTS" |

## Verification log (2026-10-25)

| Check | Command | Result |
|---|---|---|
| Pipeline syntax | `node --check` on all pipelines | OK |
| Dry-run, stress test | `node research/run-stress-test.mjs --dry-run` | 18 stub generations + 36 stub judgments, no network |
| Dry-run, review panel | `node evaluation/run-review-panel.mjs --dry-run` | 66 stub files, no network |
| Dry-run, participants | `node evaluation/run-simulated-participants.mjs --dry-run` | 70 stubs + mechanical agenda check PASS (segments tile 0–90) |
| Placeholder .env guard | `cp .env.example .env && npm run eval:pending` | exits 1, clear message, zero network (see verification transcript) |
| Decision tool tests | `node evaluation/tests/decision-tool-tests.mjs` | 20/20 PASS |
| axe: decision tool + slides | `node tooling/audit-axe.mjs <local urls>` | 0 violations (0 critical/serious) |
| Internal links + fragments | `node evaluation/tests/check-md-links.mjs` | 137 links, all resolve |
| Secrets | `gitleaks detect` | clean (no secrets in history or working tree) |
| No `.env` in history | `git log --all --name-only` check | never committed |
| No files > 50 MB | `git rev-list --objects --all` size check | none |

## Known gaps (honest list)

1. **All stress-test numbers pending** — case pages show labelled reasoning, not results, until the API run.
2. **No human participants in anything yet** — no educator review, no workshop delivery, no real screen-reader pass. All protocols ready.
3. **Same-model limitation** — agent review may share the author's underlying model; stated wherever agent review is mentioned.
4. **Workshop timings are estimates** — validated only arithmetically; the simulated-participants pipeline (pending) is designed to stress them; real delivery is the owner's optional step.
5. **Live-site axe audit + linkcheck re-run** — scheduled immediately after the Pages build completes.
