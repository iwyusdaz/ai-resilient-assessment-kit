#!/usr/bin/env node
// Mechanical workshop agenda check (no AI).
//
// Reads the "Agenda at a glance" table in docs/workshop/facilitator-guide.md
// and checks that the segments tile 0 to 90 minutes with no gaps or overlaps.
// Exits 1 on any problem.
//
// Usage: node evaluation/tests/agenda-check.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const guide = fs.readFileSync(path.join(repoRoot, "docs", "workshop", "facilitator-guide.md"), "utf8");

const section = guide.split("## Agenda at a glance")[1]?.split("\n## ")[0] ?? "";
const rows = [...section.matchAll(/^\|\s*(\d+)\s*[–-]\s*(\d+)\s*\|\s*([^|]+)\|/gm)].map((m) => ({
  start: Number(m[1]),
  end: Number(m[2]),
  segment: m[3].trim()
}));

const problems = [];
if (!rows.length) problems.push("No agenda rows found under '## Agenda at a glance'");
let prevEnd = 0;
for (const r of rows) {
  if (r.start !== prevEnd) problems.push(`${r.segment}: starts at ${r.start}, previous segment ended at ${prevEnd}`);
  if (r.end <= r.start) problems.push(`${r.segment}: ends (${r.end}) before it starts (${r.start})`);
  prevEnd = r.end;
}
if (rows.length && prevEnd !== 90) problems.push(`Agenda ends at ${prevEnd}, not 90 minutes`);

if (problems.length) {
  console.error(`Agenda check FAILED:\n- ${problems.join("\n- ")}`);
  process.exit(1);
}
console.log(`Agenda check PASS: ${rows.length} segments tile 0-90 minutes with no gaps or overlaps.`);
