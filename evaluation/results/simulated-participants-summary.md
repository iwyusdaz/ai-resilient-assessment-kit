# Agent-simulated workshop participants: results summary

**Run date:** 2026-11-11 · **Performed by:** one AI agent (the Kiro build agent working in this repository's workspace) role-playing five fictional personas. Single model, no API, no real participants.

**Method label:** *agent-simulated workshop participants (single model).* These are fictional personas played by one agent, **not** real participants and **not** educator feedback. They cannot show workshop outcomes, learning or real participant experience; they surface unclear instructions and timing risks before a human run. The original design (each persona run by two or three independent models) could not be reproduced without model APIs.

**Mechanical agenda check (no AI):** PASS. `npm run test:agenda` reads the agenda table in `docs/workshop/facilitator-guide.md` and confirms the seven segments tile minutes 0 to 90 with no gaps or overlaps.

## Personas (fictional)

| ID | Persona | What it tests |
|---|---|---|
| P1 | Senior humanities lecturer, 25 years, skeptical ("just ban it"), grades alone | Whether evidence beats assertion; whether pushback is handled |
| P2 | Coordinator of a 300+ student STEM service course with two TAs | Whether timing and workload claims hold at scale |
| P3 | Faculty developer and accessibility specialist | Accessibility of the session itself; pacing; facilitation load |
| P4 | Early-career TA who does most first-year grading, confident with AI | Whether instructions work without the facilitator; gradability |
| P5 | Second-language lecturer supporting multilingual students | AI-access assumptions; multilingual notes; poll and read-aloud accessibility |

## Procedure

For each of the 7 agenda segments, the agent read the segment script in the facilitator guide (and the slide it uses) as each persona and recorded: is the segment plausible for this persona, is the time realistic, and any concrete flag (timing, clarity, feasibility, accessibility, pushback) with a one-line fix. 5 personas × 7 segments = **35 judgments**, one pass each.

## Results

**Plausible:** 35 of 35. **Time realistic:** 33 of 35. **Flags:** 11 (timing 2, clarity 2, feasibility 2, accessibility 4, pushback 1). Segment 25 to 40 had no flags. Every flag below is an open revision candidate in [docs/evaluation/revisions.md](../../docs/evaluation/revisions.md); none has been applied yet.

| Segment | Persona | Time ok | Flag | Suggested fix |
|---|---|---|---|---|
| 0 to 10 Opening | P3 | yes | accessibility: the poll tool (Mentimeter or Forms) is not checked for screen-reader use, and the 7 minutes after the 3-minute script are unplanned | Name a tested tool, keep a typed chat or sticky-note alternative, and say what fills the remaining minutes |
| 10 to 25 Demo | P1 | yes | pushback: "one essay from one tool proves nothing" | Acknowledge it and point to the kit's agent-simulated stress-test results as a second, labelled data point |
| 10 to 25 Demo | P3 | yes | accessibility: streaming AI text on the projector cannot be followed without sight | Read key passages aloud; include the backup output in the handout |
| 10 to 25 Demo | P5 | yes | feasibility: the demo assumes the facilitator's AI account works on the room network and that participants could reproduce it; neither is stated | Make the pre-generated backup the default; name the tool and whether a free tier works |
| 40 to 42 Break | P3 | **no** | timing: 2 minutes is not enough for a comfort break in a 90-minute session | Lengthen to 5 minutes from the 25 to 40 buffer, or say people may step out at any time |
| 42 to 70 Sprint | P2 | yes | clarity: none of the five steps asks for grading time, the first question a large-course coordinator will ask | Add "minutes per student?" to step 5 |
| 42 to 70 Sprint | P3 | yes | feasibility: one facilitator circulating among 15 pairs in the 8-minute step 4 gets about 30 seconds per pair | Recommend a co-facilitator above 10 pairs |
| 42 to 70 Sprint | P4 | yes | clarity: a TA may not own an assignment to redesign | Allow redesigning an assignment they grade, with the lecturer's brief |
| 70 to 82 Gallery walk | P3 | yes | accessibility: in person, the walk assumes participants stand and move to posted canvases | Offer a seated swap between neighbouring pairs |
| 70 to 82 Gallery walk | P4 | **no** | timing: 2 × 4 minutes + 4-minute harvest leaves no time to move between canvases | Use 3.5-minute windows or a 1-minute move |
| 82 to 90 Commitments | P3 | yes | accessibility: the post-survey is offered by QR code only on the slide | Show a short typed link next to the QR code (the printed version in survey.md also works) |

All other persona and segment pairs (24 of 35) were judged plausible with realistic timing and no flag. For example, P1's likely "detectors would solve this" pushback at minute 0 to 10 is already handled by the guide's parking line and the pushback table.

## Limitations (stated wherever these results appear)

1. **Single model, one pass.** One agent played all five personas, had read the whole kit and the earlier agent review (which already retimed two segments), and may share the model family that wrote the guide. Persona judgments are not independent.
2. **Not delivery evidence.** The workshop has never been delivered. These judgments cannot show whether the session works, how long segments really take, or how real faculty respond. Real delivery with the pre/post survey remains the owner's optional next step.
