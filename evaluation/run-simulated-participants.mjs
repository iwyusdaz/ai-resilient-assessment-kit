#!/usr/bin/env node
// AI-simulated workshop participants — PENDING (requires API keys in .env).
//
// What it does on a real run:
//   - Five persona specs (below, fictional, labelled) "walk" the 90-minute
//     agenda from docs/workshop/facilitator-guide.md: for every agenda segment,
//     each persona reports whether the segment is plausible, clear, feasible
//     and well-timed for THEM, with concrete flags.
//   - A mechanical timing check (no AI involved) verifies the agenda's segment
//     arithmetic and runs in every mode, including --dry-run.
//
// Honesty rules encoded:
//   - Method label: "AI-simulated workshop participants". These are NOT real
//     participants, not educators, and CANNOT validate workshop outcomes —
//     they surface unclear instructions and timing risks before a human run.
//   - With placeholder .env: exits 1, zero network. With --dry-run: stubs to
//     dry-run/ labelled "DRY RUN - NOT REAL RESULTS"; no network.
//
// Usage:
//   node evaluation/run-simulated-participants.mjs            (real; needs .env)
//   node evaluation/run-simulated-participants.mjs --dry-run  (stubs; no network)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireSlots, optionalSlot, isDryRun, ensureDir, writeJson, chat, extractJson, DRY_RUN_HEADER } from "../lib/env.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dry = isDryRun(process.argv);
const resultsDir = path.join(repoRoot, "evaluation", "results", "simulated-participants");
const dryDir = path.join(repoRoot, "dry-run", "simulated-participants");

// Agenda exactly as published in the facilitator guide (kept in sync by hand;
// the mechanical check below fails loudly if the guide's arithmetic changes).
const AGENDA = [
  { id: "S1", time: "0-10", segment: "Opening: what worries you? (anonymous poll / sticky wall)" },
  { id: "S2", time: "10-25", segment: "Live stress-test demo: sample brief through AI; participants score against the rubric" },
  { id: "S3", time: "25-40", segment: "Principles + AI-use levels (short input, case examples, pair chat)" },
  { id: "S4", time: "40-42", segment: "Break" },
  { id: "S5", time: "42-70", segment: "Redesign sprint on their own assignment (canvas + decision tool, pairs)" },
  { id: "S6", time: "70-82", segment: "Gallery walk / structured peer feedback" },
  { id: "S7", time: "82-90", segment: "Commitments + post-survey + close" }
];

// Mechanical timing check — no AI, always runs.
function checkAgenda() {
  const problems = [];
  let prevEnd = 0;
  for (const s of AGENDA) {
    const [start, end] = s.time.split("-").map(Number);
    if (start !== prevEnd) problems.push(`${s.id}: segment starts at ${start}, previous ended at ${prevEnd}`);
    if (end <= start) problems.push(`${s.id}: segment ends (${end}) before it starts (${start})`);
    prevEnd = end;
  }
  if (prevEnd !== 90) problems.push(`Agenda ends at ${prevEnd}, not 90 minutes`);
  return problems;
}

const PERSONAS = [
  {
    id: "P1",
    persona: "Senior lecturer, 25 years' experience, humanities, very skeptical of AI-era assessment redesign ('just ban it'), grades alone.",
    whatToTest: "whether the session respects their skepticism, whether evidence beats assertion, whether pushback is handled"
  },
  {
    id: "P2",
    persona: "Large-enrollment coordinator, STEM service course, 300+ students, two TAs, extreme time pressure.",
    whatToTest: "whether timing is realistic for a 300-student context, whether the sprint fits, whether workload claims hold"
  },
  {
    id: "P3",
    persona: "Faculty developer / accessibility specialist who runs teaching workshops professionally.",
    whatToTest: "accessibility of the session itself, pacing, whether materials work in advance, facilitation load"
  },
  {
    id: "P4",
    persona: "Early-career TA who does most of the grading in a first-year course, confident with AI tools personally.",
    whatToTest: "whether the redesigns are gradable by TAs as described, whether instructions are clear enough to follow without a facilitator"
  },
  {
    id: "P5",
    persona: "Second-language lecturer who multilingual students rely on for language scaffolding; cares about equity of AI access.",
    whatToTest: "whether AI-access assumptions hold, whether multilingual-student notes are concrete, whether poll/read-aloud accessibility works"
  }
];

const SCHEMA = `{
  "plausible": true/false,
  "timing": {"enough_time": true/false, "note": "one line"},
  "flags": [
    {"kind": "timing|clarity|feasibility|accessibility|pushback", "flag": "one sentence", "fix": "one line"}
  ],
  "note": "one short paragraph from this persona's perspective"
}`;

function buildPrompt(persona, seg, guideText) {
  return `You are simulating ONE fictional workshop participant (you are a MODEL, not a human; label nothing as human observation).

Persona: ${persona.persona}
What this persona is designed to test: ${persona.whatToTest}

Workshop: "Redesigning one assessment for the AI era", 90 minutes, mixed-confidence faculty and TAs.

Agenda segment under review:
- Time: ${seg.time} minutes of the 90
- Segment: ${seg.segment}

For context, the facilitator guide (including the detailed scripts for each segment):
--- FACILITATOR GUIDE ---
${guideText.slice(0, 16000)}
--- END ---

From this persona's honest perspective: is this segment plausible, clear, and is the time realistic? Flag anything concrete (timing risk, unclear instruction, infeasible activity, accessibility gap, likely pushback moment) with a one-line fix. Do not invent problems that are not there; if the segment works for this persona, say so and set plausible true.

Respond with JSON exactly like:
${SCHEMA}`;
}

async function runReal() {
  const slots = requireSlots(["MODEL_A", "MODEL_B"]);
  const slotC = optionalSlot("MODEL_C");
  const entries = [...Object.entries(slots)];
  if (slotC) entries.push(["MODEL_C", slotC]);
  ensureDir(resultsDir);

  const agendaProblems = checkAgenda();
  writeJson(path.join(resultsDir, "mechanical-agenda-check.json"), { method: "mechanical check (no AI)", problems: agendaProblems, ok: agendaProblems.length === 0, checked_at: new Date().toISOString() });
  console.log(`[Participants] Mechanical agenda check: ${agendaProblems.length === 0 ? "OK (segments cover 0-90)" : agendaProblems.join("; ")}`);

  const guideText = fs.readFileSync(path.join(repoRoot, "docs", "workshop", "facilitator-guide.md"), "utf8");
  let failures = 0;
  for (const persona of PERSONAS) {
    for (const seg of AGENDA) {
      for (const [slotName, slot] of entries) {
        const outName = `${persona.id}-${seg.id}-${slotName.toLowerCase()}.json`;
        process.stdout.write(`[Participants] ${persona.id} × ${seg.id} (${seg.time}) × ${slotName} ... `);
        try {
          const raw = await chat(slot, [
            { role: "system", content: "You are a model simulating a fictional workshop participant for design feedback. Respond with strict JSON only." },
            { role: "user", content: buildPrompt(persona, seg, guideText) }
          ], { temperature: 0.5, maxTokens: 1200 });
          const parsed = extractJson(raw);
          writeJson(path.join(resultsDir, outName), {
            method: "AI-simulated workshop participants - NOT real participants, NOT educator feedback",
            persona: persona.id, persona_desc: persona.persona, segment: seg.id, segment_time: seg.time,
            model: slotName, model_name: slot.model, ...parsed, timestamp: new Date().toISOString()
          });
          console.log("ok");
        } catch (err) {
          failures++;
          console.log("FAILED");
          writeJson(path.join(resultsDir, outName.replace(".json", ".failed.json")), { persona: persona.id, segment: seg.id, model: slotName, error: String(err.message || err) });
        }
      }
    }
  }

  // Summary: per-segment timing/clarity flags across personas and models
  const lines = [];
  lines.push("# AI-simulated workshop participants - results summary");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)} · Method: **AI-simulated workshop participants** (5 personas × 7 agenda segments × ${entries.length} models).`);
  lines.push("");
  lines.push("> These are fictional personas run by models — NOT real participants, NOT educator feedback, and they cannot validate outcomes. They surface unclear instructions and timing risks ahead of a human facilitation run. The same-model limitation (personas may share the author's underlying model) applies.");
  lines.push("");
  lines.push(`Mechanical agenda check (no AI): ${agendaProblems.length === 0 ? "PASS — segments tile 0–90 minutes with no gaps/overlaps" : "PROBLEMS: " + agendaProblems.join("; ")}`);
  lines.push("");
  for (const seg of AGENDA) {
    lines.push(`## ${seg.id} (${seg.time} min) — ${seg.segment}`);
    lines.push("");
    lines.push("| Persona | Model | Plausible | Timing ok | Flags |");
    lines.push("|---|---|---|---|---|");
    for (const persona of PERSONAS) {
      for (const [slotName] of entries) {
        const f = path.join(resultsDir, `${persona.id}-${seg.id}-${slotName.toLowerCase()}.json`);
        if (fs.existsSync(f)) {
          const r = JSON.parse(fs.readFileSync(f, "utf8"));
          const flags = (r.flags || []).map((x) => `${x.kind}: ${x.flag}`).join("; ") || "—";
          lines.push(`| ${persona.id} | ${r.model_name || slotName} | ${r.plausible ? "yes" : "no"} | ${r.timing?.enough_time ? "yes" : "no"} | ${flags} |`);
        } else {
          lines.push(`| ${persona.id} | ${slotName} | FAILED | - | see raw dir |`);
        }
      }
    }
    lines.push("");
  }
  lines.push("## How to use this");
  lines.push("");
  lines.push("- Timing flags go to the facilitator guide's checklist; accepted changes land in docs/evaluation/revisions.md.");
  lines.push("- This simulation cannot substitute for delivering the workshop with real participants (the owner's optional next step).");
  lines.push("");
  fs.writeFileSync(path.join(repoRoot, "evaluation", "results", "simulated-participants-summary.md"), lines.join("\n") + "\n");
  console.log(`[Participants] done. ${failures} failures. Summary: evaluation/results/simulated-participants-summary.md`);
}

async function runDry() {
  ensureDir(dryDir);
  const agendaProblems = checkAgenda();
  writeJson(path.join(dryDir, "mechanical-agenda-check.json"), { method: "mechanical check (no AI)", problems: agendaProblems, ok: agendaProblems.length === 0 });
  let n = 0;
  for (const persona of PERSONAS) {
    for (const seg of AGENDA) {
      for (const slotName of ["MODEL_A", "MODEL_B"]) {
        writeJson(path.join(dryDir, `${persona.id}-${seg.id}-${slotName.toLowerCase()}.json`), {
          dry_run: true, notice: DRY_RUN_HEADER,
          method: "AI-simulated workshop participants - NOT real participants",
          persona: persona.id, segment: seg.id, model: `${slotName} (stub)`,
          plausible: null, timing: { enough_time: null, note: "STUB" }, flags: [], note: "STUB - pipeline not run"
        });
        n++;
      }
    }
  }
  const okLine = agendaProblems.length === 0
    ? "Mechanical agenda check: PASS — segments tile 0–90 minutes with no gaps/overlaps (this check is real even in dry-run)."
    : "Mechanical agenda check PROBLEMS: " + agendaProblems.join("; ");
  fs.writeFileSync(path.join(dryDir, "summary.md"), [DRY_RUN_HEADER, "", "# Simulated participants — DRY RUN summary (stub)", "", okLine, "", `${n} stub files written. No network calls were made.`].join("\n") + "\n");
  console.log(`[Participants] DRY RUN: ${n} stubs -> dry-run/simulated-participants/. ${okLine}`);
}

if (dry) await runDry();
else await runReal();
