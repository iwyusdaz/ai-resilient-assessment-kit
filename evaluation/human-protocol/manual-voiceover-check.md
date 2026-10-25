# Manual VoiceOver check — decision tool (and any page, adapted)

**Why manual:** Guidepup's automated VoiceOver control is not functional on this build machine (macOS 27; see the workspace SYSTEM-CHANGES notes), and this kit does not simulate disabled users — a real assistive-technology pass by a human is the honest substitute. This script is written so **anyone on a Mac can run it in about 15 minutes**; results go to `evaluation/results/manual-voiceover-2026.md` (create the file when you run it) and the README accessibility section is updated with what was found.

## Setup

1. macOS with VoiceOver: open System Settings → Accessibility → VoiceOver; also enable "Use Trackpad Commander" off (or ignore it) and leave default verbosity.
2. Turn VoiceOver on: **Cmd+F5** (or triple-press Touch ID).
3. Serve the pages: from the repo root run `python3 -m http.server 8090 --directory docs`, then browse to `http://localhost:8090/decision-tool/index.html`.
4. Use **Safari** (VoiceOver pairs best with it) or Chrome; note which browser you used.

## The scripted pass (decision tool)

For each step, write down what VoiceOver **actually said** (or that it said nothing — that's a finding, not a failure of the protocol).

1. **First Tab.** Expected: the skip link ("Skip to the tool") is the first stop. Follow it: does it jump to `<main id="tool">`?
2. **Form landmarks.** VO+U (rotor) → Form Controls: do all six questions appear as groups? Each question's legend should be announced when you reach its first radio (e.g., "1. What is this assessment mainly for? group").
3. **Radio group behaviour.** Enter a question; press ↓/↑ (or Tab through options). Expected: "1 of 3" position announcements; arrows move selection; labels read fully.
4. **Answer all six questions.** On each selection, listen: the polite live region should say "Answered N of 6 questions." When the sixth is selected, results should appear and VoiceOver should announce "Results ready…" (live region) and focus should land on the results heading ("Your recommended approaches, heading level 2").
5. **Results cards.** Tab through the results: each card reads its title, description, "Why this recommendation?" list, and links (each link should make sense out of context — note any that just say "Approach details" without context).
6. **Back button.** Activate Back: the last answer should clear, focus should return to that question's first radio, and the live region should announce the cleared answer.
7. **Start over.** Activate: everything clears; focus returns to the first radio; announcement confirms.
8. **Submit incomplete.** Clear one answer (Back) and submit: the error ("Please answer 1 more question…") should be announced as an alert, and focus should land on the first unanswered radio.
9. **No-JS fallback.** Disable JavaScript (Safari: Develop → Disable JavaScript), reload: the noscript message must be the first meaningful content, pointing to the approaches page.
10. **Reflow + zoom sanity (visual, not VO):** at 320 px window width and at 400 % browser zoom, confirm no horizontal scrolling and visible focus outlines.

## Also spot-check (10 minutes, same method)

- Workshop slides (`/workshop/slides/index.html`): rotor → Headings: one H1 then 13 H2s, in order; each slide's speaker notes in a `<details>` announced with "collapsed/expanded"; no missing landmarks.
- Kit index (`/index.html`): links list via rotor should be understandable out of context (no bare "click here").

## Reporting

Write into `evaluation/results/manual-voiceover-2026.md`:

- Date, macOS version, browser, VoiceOver version.
- Per step: expected / heard / pass-fail.
- Anything VoiceOver skipped, double-read, or announced confusingly — these are the findings automated tools cannot give you.
- Update the README accessibility section: what was tested, with what, and the findings (including unresolved ones).

*If you are the repo owner and cannot run VoiceOver yourself: ask a colleague or the campus accessibility office; the script is deliberately self-contained.*
