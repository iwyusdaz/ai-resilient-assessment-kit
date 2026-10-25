#!/usr/bin/env node
// Multi-model review panel — PENDING (requires API keys in .env).
//
// What it does on a real run:
//   - Reviews the kit's key documents with >= 2 different models (MODEL_A,
//     MODEL_B required; MODEL_C optional) in THREE reviewer roles:
//       R1 assessment-design reviewer (constructive alignment, validity, rubrics)
//       R2 equity & accessibility reviewer
//       R3 feasibility & workload reviewer (large cohorts, TAs, timing)
//     Every model covers every role, so cross-model agreement is measurable.
//   - Reads the actual repo files (the same text any human reviewer would read).
//   - Reports agreement between models (page-level Jaccard + matched issues by
//     severity with tolerant text overlap) into the results summary.
//
// Honesty rules encoded:
//   - Method label: "Agent review (AI panel)" — NEVER "educator review" or
//     "expert feedback". The limitation that panel models may share the
//     author's underlying model is written into every summary.
//
// Usage:
//   node evaluation/run-review-panel.mjs            (real run; needs .env)
//   node evaluation/run-review-panel.mjs --dry-run  (stubs to dry-run/, no network)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { requireSlots, optionalSlot, isDryRun, ensureDir, writeJson, chat, extractJson, DRY_RUN_HEADER } from "../lib/env.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dry = isDryRun(process.argv);
const resultsDir = path.join(repoRoot, "evaluation", "results", "review-panel");
const dryDir = path.join(repoRoot, "dry-run", "review-panel");

const TARGETS = [
  "docs/index.md",
  "docs/principles.md",
  "docs/approaches.md",
  "docs/ai-use-levels.md",
  "docs/case-a-essay/redesign.md",
  "docs/case-a-essay/rubric.md",
  "docs/case-b-problem-set/redesign.md",
  "docs/case-b-problem-set/rubric.md",
  "docs/case-c-research-report/redesign.md",
  "docs/case-c-research-report/rubric.md",
  "docs/workshop/facilitator-guide.md"
];

const ROLES = [
  {
    id: "R1",
    name: "Assessment-design reviewer (role-played by a model - NOT a human expert)",
    focus: `Judge as an assessment-design reviewer would:
- constructive alignment: does the redesign certify what the outcome claims?
- validity reasoning: does the vulnerability analysis hold, and does the redesign target the right criteria?
- rubric quality: observable criteria, defensible level descriptors, alignment tables that actually align
- honesty of limits: are the "what this does NOT solve" sections credible and complete?`
  },
  {
    id: "R2",
    name: "Equity & accessibility reviewer (role-played by a model - NOT a human expert)",
    focus: `Judge as an equity and accessibility reviewer would:
- accommodations: is every alternative (written/recoral/asynchronous) equal in weight and dignity, not an afterthought?
- multilingual students: do levels and marking avoid penalising language, and avoid detector reliance?
- digital access: do AI-use levels assume paid tools? is free-tier access genuinely sufficient where the level affects marks?
- workload/readability of student-facing text (plain language, structure)`
  },
  {
    id: "R3",
    name: "Feasibility & workload reviewer (role-played by a model - NOT a human expert)",
    focus: `Judge as a large-enrollment coordinator would:
- grading-time arithmetic: are the per-component estimates coherent and realistic? does anything hidden contradict them?
- scaling plans: do the 200+ student moves actually work (sampling, TA calibration, tutorial-based orals)?
- implementation load: registration, dataset collection, calibration sessions - what breaks first?
- would you adopt this in a real term? what is the minimal version?`
  }
];

const SCHEMA = `{
  "scores": {"clarity": 1-5, "validity": 1-5, "feasibility": 1-5, "equity": 1-5},
  "issues": [
    {"section": "heading or location", "severity": "major|minor", "issue": "one paragraph", "suggestion": "one line"}
  ],
  "overall_note": "one short paragraph"
}`;

function buildPrompt(role, targetRel, text) {
  return `You are role-playing a structured design review. You are a MODEL, not a human; label nothing as human judgment.

Role: ${role.name}
Focus:
${role.focus}

Review the following file for those qualities. Ignore pure style preferences. Report at most 6 issues, each tied to a location.

--- FILE: ${targetRel} ---
${text.slice(0, 20000)}

Respond with JSON exactly like:
${SCHEMA}`;
}

function tokenize(s) {
  return String(s).toLowerCase().replace(/[^a-z0-9 ]+/g, " ").split(/\s+/).filter((w) => w.length > 3);
}
function textOverlap(a, b) {
  const A = new Set(tokenize(a));
  const B = new Set(tokenize(b));
  if (!A.size || !B.size) return 0;
  let inter = 0;
  for (const w of A) if (B.has(w)) inter++;
  return inter / Math.min(A.size, B.size);
}
function agreementBetween(listA, listB) {
  const pagesA = new Set(listA.map((i) => i.target));
  const pagesB = new Set(listB.map((i) => i.target));
  const union = new Set([...pagesA, ...pagesB]);
  const inter = [...pagesA].filter((p) => pagesB.has(p)).length;
  let matched = 0;
  for (const a of listA) {
    if (listB.some((b) => b.target === a.target && b.severity === a.severity && textOverlap(a.issue, b.issue) >= 0.3)) matched++;
  }
  return {
    jaccard_pages: union.size ? Number((inter / union.size).toFixed(2)) : null,
    matched_issues: matched,
    total_a: listA.length,
    total_b: listB.length
  };
}
function collectIssues(slotName) {
  const issues = [];
  if (!fs.existsSync(resultsDir)) return issues;
  for (const f of fs.readdirSync(resultsDir)) {
    if (!f.endsWith(`-${slotName.toLowerCase()}.json`)) continue;
    try {
      const r = JSON.parse(fs.readFileSync(path.join(resultsDir, f), "utf8"));
      (r.issues || []).forEach((i) => issues.push({ target: r.target, severity: i.severity, issue: i.issue }));
    } catch { /* skip unreadable */ }
  }
  return issues;
}

async function runReal() {
  const slots = requireSlots(["MODEL_A", "MODEL_B"]); // exits 1, zero network, if placeholders
  const slotC = optionalSlot("MODEL_C");
  const slotEntries = Object.entries(slots);
  if (slotC) slotEntries.push(["MODEL_C", slotC]);

  ensureDir(resultsDir);
  console.log(`[Review panel] ${TARGETS.length} targets x ${ROLES.length} roles x ${slotEntries.length} models. Label: Agent review (AI panel) - never presented as educator or expert feedback.`);

  for (const target of TARGETS) {
    const abs = path.join(repoRoot, target);
    if (!fs.existsSync(abs)) { console.log(`[Review panel] missing file, skipped: ${target}`); continue; }
    const text = fs.readFileSync(abs, "utf8");
    for (const role of ROLES) {
      for (const [slotName, slot] of slotEntries) {
        const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
        const outName = `${fileId}-${role.id}-${slotName.toLowerCase()}.json`;
        process.stdout.write(`[Review panel] ${target} · ${role.id} · ${slotName} ... `);
        try {
          const raw = await chat(slot, [
            { role: "system", content: "You are a model performing a structured design review. Respond with strict JSON only." },
            { role: "user", content: buildPrompt(role, target, text) }
          ], { temperature: 0.3, maxTokens: 1600 });
          const parsed = extractJson(raw);
          writeJson(path.join(resultsDir, outName), {
            method: "Agent review (AI panel) - not human expert review",
            target, role: role.id, role_name: role.name,
            model: slotName, model_name: slot.model, ...parsed, timestamp: new Date().toISOString()
          });
          console.log("ok");
        } catch (err) {
          console.log("FAILED");
          writeJson(path.join(resultsDir, outName.replace(".json", ".failed.json")), { target, role: role.id, model: slotName, error: String(err.message || err) });
        }
      }
    }
  }

  // Summary
  const lines = [];
  lines.push("# Multi-model review panel - results summary");
  lines.push("");
  lines.push(`Generated: ${new Date().toISOString().slice(0, 10)} · Method: **Agent review (AI panel)** - ${ROLES.length} roles x models.`);
  lines.push("");
  lines.push("> **Limitation (always stated):** panel models may share the underlying model that drafted the content; they are not human experts, and this is not educator feedback. Human educator review remains pending - see docs/evaluation/educator-review.md.");
  lines.push("");
  lines.push("| Target | Role | Model | Scores (clarity/validity/feasibility/equity) | Issues (major/minor) |");
  lines.push("|---|---|---|---|---|");
  for (const target of TARGETS) {
    for (const role of ROLES) {
      for (const [slotName] of slotEntries) {
        const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
        const file = path.join(resultsDir, `${fileId}-${role.id}-${slotName.toLowerCase()}.json`);
        if (fs.existsSync(file)) {
          const r = JSON.parse(fs.readFileSync(file, "utf8"));
          const s = r.scores || {};
          const majors = (r.issues || []).filter((i) => i.severity === "major").length;
          const minors = (r.issues || []).filter((i) => i.severity === "minor").length;
          lines.push(`| ${target} | ${role.id} | ${r.model_name || slotName} | ${s.clarity ?? "?"}/${s.validity ?? "?"}/${s.feasibility ?? "?"}/${s.equity ?? "?"} | ${majors}/${minors} |`);
        } else {
          lines.push(`| ${target} | ${role.id} | ${slotName} | FAILED - see raw dir | - |`);
        }
      }
    }
  }
  lines.push("");
  lines.push("## Agreement between models");
  lines.push("");
  lines.push("| Comparison | Page-level Jaccard | Matched issues (page+severity, tolerant text overlap) |");
  lines.push("|---|---|---|");
  const a = collectIssues("MODEL_A");
  const b = collectIssues("MODEL_B");
  if (a.length || b.length) {
    const ag = agreementBetween(a, b);
    lines.push(`| MODEL_A vs MODEL_B | ${ag.jaccard_pages ?? "-"} | ${ag.matched_issues} matched (A: ${ag.total_a}, B: ${ag.total_b}) |`);
  } else {
    lines.push("| MODEL_A vs MODEL_B | no issues collected | - |");
  }
  if (slotC) {
    const c = collectIssues("MODEL_C");
    if (c.length && a.length) {
      const agC = agreementBetween(a, c);
      lines.push(`| MODEL_A vs MODEL_C | ${agC.jaccard_pages ?? "-"} | ${agC.matched_issues} matched (A: ${agC.total_a}, C: ${agC.total_b}) |`);
    }
  }
  lines.push("");
  lines.push("Agreement here is a heuristic (page overlap + tolerant text match), not psychometric reliability. Issues feed docs/evaluation/revisions.md; accepted changes are recorded there.");
  lines.push("");
  fs.writeFileSync(path.join(repoRoot, "evaluation", "results", "review-panel-summary.md"), lines.join("\n") + "\n");
  console.log("[Review panel] done. Raw outputs in evaluation/results/review-panel/. Summary: evaluation/results/review-panel-summary.md.");
}

async function runDry() {
  ensureDir(dryDir);
  let n = 0;
  for (const target of TARGETS) {
    for (const role of ROLES) {
      for (const slotName of ["MODEL_A", "MODEL_B"]) {
        const fileId = target.replace(/^docs\//, "").replace(/[/.]/g, "-");
        writeJson(path.join(dryDir, `${fileId}-${role.id}-${slotName.toLowerCase()}.json`), {
          dry_run: true, notice: DRY_RUN_HEADER, method: "Agent review (AI panel) - not human expert review",
          target, role: role.id, model: `${slotName} (stub)`, issues: [], scores: null, overall_note: "STUB - pipeline not run"
        });
        n++;
      }
    }
  }
  fs.writeFileSync(path.join(dryDir, "review-panel-summary.md"), [DRY_RUN_HEADER, "", "# Review panel - DRY RUN summary (stub)", "", `| STUB | STUB | STUB | STUB | STUB |`, "|---|---|---|---|---|", `| ${n} stub reviews | - | - | - | - |`, "", "No network calls were made."].join("\n") + "\n");
  console.log(`[Review panel] DRY RUN: ${n} stub files -> dry-run/review-panel/. No network calls.`);
}

if (dry) await runDry();
else await runReal();
