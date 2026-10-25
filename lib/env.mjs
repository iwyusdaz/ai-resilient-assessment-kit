// Shared environment loader/validator for the pending evaluation pipelines.
// Rules (binding, from the portfolio build spec):
//   - Read configuration from .env (never committed; see .env.example).
//   - If any needed value is missing OR still starts with "YOUR_", exit(1)
//     with a clear message and make ZERO network calls.
//   - Never log secret values.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function loadDotenv() {
  const envPath = path.join(repoRoot, ".env");
  if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, quiet: true });
  } else {
    dotenv.config({ quiet: true }); // walks up if absent; none expected above the repo
  }
}

function slotStatus(prefix) {
  const missing = [];
  const placeholder = [];
  for (const suffix of ["BASE_URL", "API_KEY", "NAME"]) {
    const key = `${prefix}_${suffix}`;
    const value = process.env[key];
    if (value === undefined || String(value).trim() === "") missing.push(key);
    else if (String(value).trim().startsWith("YOUR_")) placeholder.push(key);
  }
  return { prefix, missing, placeholder, ok: missing.length === 0 && placeholder.length === 0 };
}

/**
 * Validate that every required model slot is fully configured.
 * Exits (code 1) with a clear message if not — BEFORE any network-capable code runs.
 * @param {string[]} prefixes e.g. ["MODEL_A","MODEL_B"]
 */
export function requireSlots(prefixes) {
  loadDotenv();
  const statuses = prefixes.map((p) => slotStatus(p));
  const bad = statuses.filter((s) => !s.ok);
  if (bad.length > 0) {
    console.error(`
[Pipelines] This pipeline needs real API configuration. It will not run, and
no network calls have been made.

Copy .env.example to .env at the repository root and fill in:
`);
    for (const s of bad) {
      if (s.missing.length) console.error(`  ${s.prefix}: missing      -> ${s.missing.join(", ")}`);
      if (s.placeholder.length) console.error(`  ${s.prefix}: placeholder -> ${s.placeholder.join(", ")} (still starts with YOUR_)`);
    }
    console.error(`
Slots use OpenAI-compatible chat completion endpoints. Blind scoring requires
MODEL_A and MODEL_B to be different models. After a real run, follow the rerun
procedure in evaluation/METHODS.md to refresh results tables and status lines.`);
    process.exit(1);
  }
  return Object.fromEntries(
    statuses.map((s) => [
      s.prefix,
      {
        baseUrl: process.env[`${s.prefix}_BASE_URL`].replace(/\/+$/, ""),
        apiKey: process.env[`${s.prefix}_API_KEY`],
        model: process.env[`${s.prefix}_NAME`]
      }
    ])
  );
}

/** Probe a slot without exiting. Returns null if not configured. (Run after requireSlots populated process.env.) */
export function optionalSlot(prefix) {
  const s = slotStatus(prefix);
  if (!s.ok) return null;
  return {
    baseUrl: process.env[`${prefix}_BASE_URL`].replace(/\/+$/, ""),
    apiKey: process.env[`${prefix}_API_KEY`],
    model: process.env[`${prefix}_NAME`]
  };
}

export function isDryRun(argv) {
  return argv.includes("--dry-run");
}

export const DRY_RUN_HEADER = "DRY RUN – NOT REAL RESULTS";

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
  return dir;
}

export function writeJson(file, obj) {
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + "\n");
}

/** Minimal OpenAI-compatible chat completion call. Only invoked after requireSlots() passed. */
export async function chat(slot, messages, options = {}) {
  const res = await fetch(`${slot.baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${slot.apiKey}`
    },
    body: JSON.stringify({
      model: slot.model,
      messages,
      temperature: options.temperature ?? 0.7,
      ...(options.maxTokens ? { max_tokens: options.maxTokens } : {})
    })
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`API error ${res.status} from ${slot.prefix || "model slot"} (${slot.model}): ${body.slice(0, 400)}`);
  }
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "";
}

export function extractJson(text) {
  // Tolerant JSON extraction: first balanced {...} or [...] block.
  const start = text.search(/[{[]/);
  if (start === -1) throw new Error("No JSON found in model output");
  const openChar = text[start];
  const closeChar = openChar === "{" ? "}" : "]";
  let depth = 0;
  let inString = false;
  let escaped = false;
  for (let i = start; i < text.length; i++) {
    const ch = text[i];
    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === '"') inString = false;
      continue;
    }
    if (ch === '"') inString = true;
    else if (ch === openChar) depth++;
    else if (ch === closeChar) {
      depth--;
      if (depth === 0) return JSON.parse(text.slice(start, i + 1));
    }
  }
  throw new Error("Unbalanced JSON in model output");
}
