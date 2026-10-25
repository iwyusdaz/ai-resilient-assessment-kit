#!/usr/bin/env node
// Stress-test pipeline — PENDING (requires API keys in .env).
//
// What it does on a real run (docs/research/stress-test-protocol.md is the method of record):
//   Phase 1  GENERATE  each case's original brief (or the redesigned brief with
//            --redesign) is given to MODEL_A and MODEL_B under three prompt
//            strategies (naive / moderate / determined). Wall-clock seconds,
//            model names and the exact prompt are saved with every output.
//   Phase 2  ANONYMISE  outputs become "Submission n" and are shuffled (seeded,
//            recorded). No judge ever sees model or strategy.
//   Phase 3  JUDGE  blind panel: MODEL_A's outputs are judged by MODEL_B + MODEL_C;
//            MODEL_B's outputs are judged by MODEL_A + MODEL_C. No model judges
//            its own output. Judges score every rubric criterion + list weaknesses.
//   Phase 4  SUMMARISE  per-case score tables + judge agreement into
//            research/results/stress-test/summary.md (or stress-test-redesign/).
//
// Honesty rules encoded:
//   - Raw outputs saved as-is; no paraphrasing into the repo.
//   - Method label on every summary: "AI stress test (blind judge panel)".
//   - Nothing here fabricates scores: with placeholder .env the script exits 1
//     before any network call; with --dry-run it writes STUBs labelled
//     "DRY RUN - NOT REAL RESULTS" and never calls the network.
//
// Usage:
//   node research/run-stress-test.mjs             (real run; needs .env)
//   node research/run-stress-test.mjs --redesign  (same, against the redesigned briefs)
//   node research/run-stress-test.mjs --dry-run   (stubs to dry-run/, no network)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireSlots, optionalSlot, isDryRun, ensureDir, writeJson, chat, extractJson, DRY_RUN_HEADER } from "../lib/env.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv;
const dry = isDryRun(argv);
const redesign = argv.includes("--redesign");

const MODE = redesign ? "redesign" : "original";
const resultsDir = path.join(repoRoot, "research", "results", `stress-test${redesign ? "-redesign" : ""}`);
const dryDir = path.join(repoRoot, "dry-run", `stress-test${redesign ? "-redesign" : ""}`);

// Cases: prompts are composed from the real repo files so brief and rubric
// cannot drift from what the site shows. (files: docs/case-*/...)
const CASES = [
  {
    id: "A",
    name: "Case A - argumentative essay (SOC 101)",
    brief: redesign ? "docs/case-a-essay/student-brief.md" : "docs/case-a-essay/original.md",
    rubric: redesign ? "docs/case-a-essay/rubric.md" : "docs/case-a-essay/original.md",
    briefNote: redesign
      ? "The student-facing brief includes the stage table and AI-use levels. Generate the FULL submission set as a student would (all stages' artefacts), not just the essay."
      : "Use the assignment brief exactly as written."
  },
  {
    id: "B",
    name: "Case B - statistics problem set (STAT 201)",
    brief: redesign ? "docs/case-b-problem-set/student-brief.md" : "docs/case-b-problem-set/original.md",
    rubric: redesign ? "docs/case-b-problem-set/rubric.md" : "docs/case-b-problem-set/original.md",
    briefNote: redesign
      ? "For the redesigned task, produce the open-lane artefacts a student would submit (problem set with AI-use log, find-and-fix answers, class-data interpretation). The in-class secure checks are not part of this generation."
      : "Use the assignment brief exactly as written."
  },
  {
    id: "C",
    name: "Case C - research report (PSY 250)",
    brief: redesign ? "docs/case-c-research-report/student-brief.md" : "docs/case-c-research-report/original.md",
    rubric: redesign ? "docs/case-c-research-report/rubric.md" : "docs/case-c-research-report/original.md",
    briefNote: redesign
      ? "For the redesigned task, produce the artefacts a student would submit (twist justification, notebook excerpt, analysis-choices memo, report with AI-use statement) for a team dataset."
      : "Use the assignment brief exactly as written; a dataset summary follows the brief."
  }
];

const STRATEGIES = [
  {
    id: "naive",
    suffix: "Produce the submission. Use the assignment brief exactly as written."
  },
  {
    id: "moderate",
    suffix: "Write as a real first-year student would under time pressure: competent but uneven, in your own voice, with believable slips and terse interpretations where a rushed student would produce them."
  },
  {
    id: "determined",
    suffix: "Treat the rubric as the scoring contract and revise toward the top band of every criterion. Use your best effort: correct methods, plausible scholarly apparatus, polished prose."
  }
];

function readRepo(rel) {
  return fs.readFileSync(path.join(repoRoot, rel), "utf8").slice(0, 24000);
}

function buildGenerationPrompt(kase, strategy) {
  const brief = readRepo(kase.brief);
  return [
    "You are producing a student submission for a university assignment, for a research stress test. This is not a real course and not a real student.",
    kase.briefNote,
    "--- ASSIGNMENT PAGE ---",
    brief,
    "--- END ASSIGNMENT PAGE ---",
    "",
    "Task: " + strategy.suffix,
    "Output the submission text only (markdown). No commentary about being an AI."
  ].join("\n");
}

const JUDGE_SCHEMA = `{
  "criteria": {"<criterion name>": <0-max points from the rubric>, ...},
  "total": <number, sum of criteria>,
  "max_total": <number, rubric maximum>,
  "weaknesses": ["observed weaknesses, one per item: fabricated/unchecked citations, calculation errors, generic analysis, no link to course-specific content, ..."],
  "notes": "one short paragraph"
}`;

function buildJudgePrompt(rubricText, submissionId, submissionText) {
  return [
    "You are a blind examiner scoring an anonymous submission for a research stress test. You do not know who or what produced it. Score strictly against the rubric.",
    "",
    "--- RUBRIC (scoring contract) ---",
    rubricText,
    "--- END RUBRIC ---",
    "",
    `--- SUBMISSION ${submissionId} ---`,
    submissionText.slice(0, 20000),
    "--- END SUBMISSION ---",
    "",
    "Score every rubric criterion, sum to a total, and list concrete observed weaknesses (e.g., citations you suspect are fabricated, arithmetic or statistical errors, generic examples, absence of course-specific content).",
    "Respond with JSON exactly like:",
    JUDGE_SCHEMA
  ].join("\n");
}

function parseJudgeJson(text) {
  const j = extractJson(text);
  if (!j || typeof j.total !== "number") throw new Error("Judge JSON missing total");
  return j;
}

/* ---------------- dry run ---------------- */

async function runDry() {
  ensureDir(dryDir);
  const gen = [];
  const subs = [];
  for (const kase of CASES) {
    for (const strategy of STRATEGIES) {
      for (const slot of ["MODEL_A", "MODEL_B"]) {
        const name = `${kase.id}-${strategy.id}-${slot}`;
        writeJson(path.join(dryDir, `gen-${name}.json`), {
          dry_run: true, notice: DRY_RUN_HEADER, case: kase.id, strategy: strategy.id,
          model: `${slot} (stub)`, prompt: "[STUB - prompt text would be composed from the repo files]", seconds: 0,
          output: `STUB OUTPUT - ${name}. The real pipeline sends the assignment page to ${slot} under the ${strategy.id} strategy and saves the raw completion here.`
        });
        gen.push(name); subs.push({ id: subs.length + 1, name });
      }
    }
  }
  for (const s of subs) {
    for (const judge of ["judge-1", "judge-2"]) {
      writeJson(path.join(dryDir, `judgment-sub${s.id}-${judge}.json`), {
        dry_run: true, notice: DRY_RUN_HEADER, submission: `Submission ${s.id}`,
        judge: `${judge} (stub; real run: cross-model - no model judges its own output)`,
        criteria: {}, total: null, max_total: null, weaknesses: [], notes: "STUB - pipeline not run"
      });
    }
  }
  const lines = [DRY_RUN_HEADER, "", "# Stress test - DRY RUN summary (stub)", "", "Mode: " + (redesign ? "REDESIGN (student briefs + new rubrics)" : "ORIGINAL (briefs + original rubrics)"), "", "| Submission | Case | Strategy | Judge 1 | Judge 2 | Mean | Diff |", "|---|---|---|---|---|---|---|"];
  for (const s of subs) lines.push(`| Submission ${s.id} | ${s.name} | STUB | STUB | STUB | - | - |`);
  lines.push("", "Generated 18 stub generations and 36 stub judgments. No network calls were made.", "");
  fs.writeFileSync(path.join(dryDir, "summary.md"), lines.join("\n") + "\n");
  console.log(`[Stress test] DRY RUN (${MODE}): ${gen.length} stub generations + ${subs.length * 2} stub judgments -> dry-run/stress-test${redesign ? "-redesign" : ""}/. No network calls.`);
}

/* ---------------- real run ---------------- */

function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function runReal() {
  const slots = requireSlots(["MODEL_A", "MODEL_B", "MODEL_C"]); // exits 1 with zero network if placeholders
  const t0 = new Date().toISOString();

  // Phase 1 - generate
  const outputs = [];
  for (const kase of CASES) {
    const rubricText = readRepo(kase.rubric);
    for (const strategy of STRATEGIES) {
      const prompt = buildGenerationPrompt(kase, strategy);
      for (const slotName of ["MODEL_A", "MODEL_B"]) {
        const slot = { ...slots[slotName], prefix: slotName };
        process.stdout.write(`[Stress test] generate ${kase.id}/${strategy.id}/${slotName} ... `);
        const started = Date.now();
        let text = "";
        try {
          text = await chat(slot, [
            { role: "system", content: "You are completing a university assignment for a research stress test. Write as the task asks." },
            { role: "user", content: prompt }
          ], { temperature: 0.7, maxTokens: 4000 });
        } catch (err) {
          console.log("FAILED");
          writeJson(path.join(resultsDir, "errors", `gen-${kase.id}-${strategy.id}-${slotName}.json`), { error: String(err.message || err) });
          continue;
        }
        const seconds = Math.round((Date.now() - started) / 1000);
        console.log(`ok (${seconds}s)`);
        const rec = {
          case: kase.id, strategy: strategy.id, model: slotName, model_name: slot.model,
          prompt, output: text, seconds, timestamp: new Date().toISOString()
        };
        ensureDir(path.join(resultsDir, "generations"));
        writeJson(path.join(resultsDir, "generations", `${kase.id}-${strategy.id}-${slotName}.json`), rec);
        outputs.push({ key: `${kase.id}-${strategy.id}-${slotName}`, rec, rubricText, rubricFile: kase.rubric });
      }
    }
  }
  if (!outputs.length) { console.error("[Stress test] No generations succeeded; aborting before judging."); process.exit(2); }

  // Phase 2 - anonymise + shuffle (seeded, recorded)
  const seed = Date.now() % 2147483647;
  const rand = mulberry32(seed);
  const shuffled = outputs.map((o, i) => ({ submission: i + 1, key: o.key })).sort(() => rand() - 0.5);
  const keyToSubmission = Object.fromEntries(shuffled.map((s) => [s.key, s.submission]));
  writeJson(path.join(resultsDir, "anonymisation.json"), { seed, note: "mapping key->Submission id; judges never see this file", mapping: keyToSubmission });

  // Phase 3 - blind judging, no model judges its own output
  const judgesFor = (model) => (model === "MODEL_A" ? ["MODEL_B", "MODEL_C"] : ["MODEL_A", "MODEL_C"]);
  const judgments = [];
  for (const o of outputs) {
    const subId = keyToSubmission[o.key];
    for (const judgeName of judgesFor(o.rec.model)) {
      const judge = { ...slots[judgeName], prefix: judgeName };
      const outName = `judgment-sub${subId}-${o.key}-${judgeName}.json`;
      process.stdout.write(`[Stress test] judge Submission ${subId} (${o.key}) by ${judgeName} ... `);
      try {
        const raw = await chat(judge, [
          { role: "system", content: "You are a blind examiner. Respond with strict JSON only." },
          { role: "user", content: buildJudgePrompt(o.rubricText, subId, o.rec.output) }
        ], { temperature: 0.2, maxTokens: 1600 });
        const parsed = parseJudgeJson(raw);
        console.log(`ok (total ${parsed.total}/${parsed.max_total})`);
        const rec = { submission: subId, submission_key: o.key, judge: judgeName, judge_model: judge.model, rubric_file: o.rubricFile, ...parsed, raw_judge_output: raw, timestamp: new Date().toISOString() };
        ensureDir(path.join(resultsDir, "judgments"));
        writeJson(path.join(resultsDir, "judgments", outName), rec);
        judgments.push(rec);
      } catch (err) {
        console.log("FAILED");
        ensureDir(path.join(resultsDir, "errors"));
        writeJson(path.join(resultsDir, "errors", outName.replace(".json", ".failed.json")), { submission: subId, submission_key: o.key, judge: judgeName, error: String(err.message || err) });
      }
    }
  }

  // Phase 4 - summary
  writeSummary({ t0, judgments, outputs, keyToSubmission });
  console.log(`[Stress test] done (${MODE}). Raw outputs + judgments in research/results/stress-test${redesign ? "-redesign" : ""}/. Summary: summary.md. Method: AI stress test (blind judge panel) - see docs/research/stress-test-protocol.md.`);
}

function writeSummary({ t0, judgments, outputs, keyToSubmission }) {
  const lines = [];
  lines.push(`# AI stress test - results summary (${redesign ? "redesigned tasks" : "original tasks"})`);
  lines.push("");
  lines.push(`Run started: ${t0} · Completed: ${new Date().toISOString()}`);
  lines.push("");
  lines.push(`Method: **AI stress test (blind judge panel)** per docs/research/stress-test-protocol.md. Outputs: MODEL_A + MODEL_B under naive/moderate/determined strategies. Judges: MODEL_A's outputs judged by MODEL_B+MODEL_C, MODEL_B's by MODEL_A+MODEL_C - no model judges its own output. This is an AI-measured result, not human scoring, and not validated against human scorers.`);
  lines.push("");
  const models = [...new Set(outputs.map((o) => o.rec.model_name))];
  lines.push(`Models (as configured): generations: ${models.join(", ")}; judges: same slots in cross-assignment.`);
  lines.push("");
  for (const caseId of ["A", "B", "C"]) {
    lines.push(`## Case ${caseId}`);
    lines.push("");
    lines.push("| Submission | Strategy | Model | Judge 1 | Judge 2 | Mean | Diff |");
    lines.push("|---|---|---|---|---|---|---|");
    const caseOutputs = outputs.filter((o) => o.rec.case === caseId);
    for (const o of caseOutputs) {
      const sub = keyToSubmission[o.key];
      const js = judgments.filter((j) => j.submission_key === o.key);
      const [j1, j2] = js;
      const mean = j1 && j2 && j1.max_total ? ((j1.total + j2.total) / 2).toFixed(1) : "-";
      const diff = j1 && j2 ? Math.abs(j1.total - j2.total) : "-";
      lines.push(`| ${sub} | ${o.rec.strategy} | ${o.rec.model_name} | ${j1 ? `${j1.total}/${j1.max_total}` : "FAILED"} | ${j2 ? `${j2.total}/${j2.max_total}` : "FAILED"} | ${mean} | ${diff} |`);
    }
    lines.push("");
  }
  // Agreement across all judged criteria
  const byKey = {};
  for (const j of judgments) {
    byKey[j.submission_key] = byKey[j.submission_key] || [];
    byKey[j.submission_key].push(j);
  }
  let critTotal = 0, critMatch = 0, diffSum = 0, pairs = 0;
  for (const key of Object.keys(byKey)) {
    const [a, b] = byKey[key];
    if (!a || !b || !a.criteria || !b.criteria) continue;
    const crits = new Set([...Object.keys(a.criteria), ...Object.keys(b.criteria)]);
    for (const c of crits) {
      critTotal++;
      if (a.criteria[c] === b.criteria[c]) critMatch++;
    }
    diffSum += Math.abs(a.total - b.total); pairs++;
  }
  lines.push("## Judge agreement");
  lines.push("");
  lines.push(pairs
    ? `Per-criterion exact agreement: ${critMatch}/${critTotal} (${Math.round((100 * critMatch) / Math.max(1, critTotal))}%). Mean |judge1-judge2| total-score difference: ${(diffSum / pairs).toFixed(2)} points across ${pairs} submissions. Simple concordance, not psychometric inter-rater reliability.`
    : "No paired judgments completed.");
  lines.push("");
  lines.push("## Known limits (always stated)");
  lines.push("");
  lines.push("- Results describe these models, prompts and this date; AI capability changes quickly.");
  lines.push("- Judge agreement is a concordance statistic, not validation against human scoring.");
  lines.push("- Weakness lists are the judges' observations, not verified facts about the outputs.");
  lines.push("");
  fs.writeFileSync(path.join(resultsDir, "summary.md"), lines.join("\n") + "\n");
}

if (dry) {
  await runDry();
} else {
  await runReal();
}
