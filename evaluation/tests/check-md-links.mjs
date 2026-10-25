#!/usr/bin/env node
// Markdown + HTML internal link checker for the kit.
// Verifies that every internal link in docs/**/*.md, docs/**/*.html and the
// root-level .md files resolves to a real file on disk, and that #fragments
// match a real heading (GitHub-style slugs for .md — the same algorithm
// jekyll-heading-anchors uses on the Pages build — or an id= for .html).
// Usage: node evaluation/tests/check-md-links.mjs
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const failures = [];
let checked = 0;

function githubSlug(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s_\-]/gu, "") // drop punctuation (keep letters, numbers, spaces, _, -)
    .replace(/\s+/g, "-");
}

function mdHeadings(md) {
  const slugs = new Set();
  let inFence = false;
  let prev = "";
  for (const line of md.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    if (inFence) { prev = line.trim(); continue; }
    const h = line.match(/^(#{1,6})\s+(.*)$/);
    if (h) {
      slugs.add(githubSlug(h[2].replace(/[#\s]+$/, "")));
      prev = line.trim();
      continue;
    }
    // setext headings
    if (/^===+\s*$/.test(line) && prev) slugs.add(githubSlug(prev));
    if (/^-{3,}\s*$/.test(line) && prev && !prev.startsWith("|") && !prev.match(/^\[.*\]:/)) slugs.add(githubSlug(prev));
    prev = line.trim();
  }
  return slugs;
}

function htmlIds(html) {
  const ids = new Set();
  for (const m of html.matchAll(/\bid="([^"]+)"/g)) ids.add(m[1]);
  for (const m of html.matchAll(/\bname="([^"]+)"/g)) ids.add(m[1]);
  return ids;
}

let prev = "";
function extractLinks(md, isHtml = false) {  const links = [];
  if (isHtml) {
    for (const m of md.matchAll(/href="([^"]+)"/g)) links.push({ url: m[1] });
    return links;
  }
  // markdown links, ignoring code fences
  let inFence = false;
  for (const raw of md.split(/\r?\n/)) {
    if (/^\s*(```|~~~)/.test(raw)) inFence = !inFence;
    if (inFence) continue;
    const inline = /\[([^\]]*)\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
    let m;
    while ((m = inline.exec(raw))) links.push({ url: m[2] });
    const ref = /\]\:?\s*<?([^>\s]+)>?/g; // skip; reference links rare here
  }
  return links;
}

function targetsFor(fromFile, linkPath) {
  // Jekyll on Pages: site root = docs/; docs/x.md is served as x.html.
  // Relative links on the site resolve against the PAGE's directory, but our
  // sources are .md — so every candidate is tried in both spaces:
  //   as written (docs-rooted and file-relative), and with .html<->.md swapped.
  const fromDir = path.dirname(fromFile);
  const inDocs = fromFile.startsWith(path.join(repoRoot, "docs") + path.sep);
  let p = linkPath;
  if (p.endsWith("/")) p += "index.html";
  const candidates = new Set();
  const add = (base, rel) => candidates.add(path.resolve(base, rel));
  const bases = inDocs ? [fromDir, path.join(repoRoot, "docs")] : [fromDir];
  const variants = [p];
  if (p.endsWith(".md")) variants.push(p.replace(/\.md$/, ".html"));
  if (p.endsWith(".html")) variants.push(p.replace(/\.html$/, ".md"));
  for (const b of bases) for (const v of variants) add(b, v);
  return [...candidates];
}

function checkFragment(file, frag, ctx) {
  if (!frag) return true;
  // For a .html link, the fragment lives in the built page; we verify against
  // both the .html source (ids) and its .md source (heading slugs).
  const files = new Set([file]);
  if (file.endsWith(".html")) {
    const md = file.replace(/\.html$/, ".md");
    if (fs.existsSync(md)) files.add(md);
  }
  if (file.endsWith(".md")) {
    const html = file.replace(/\.md$/, ".html");
    if (fs.existsSync(html)) files.add(html);
  }
  for (const f of files) {
    const ext = path.extname(f);
    let ids;
    try {
      const text = fs.readFileSync(f, "utf8");
      ids = ext === ".html" ? htmlIds(text) : mdHeadings(text);
    } catch {
      continue;
    }
    if (ids.has(frag)) return true;
  }
  failures.push(`FRAGMENT: in ${ctx}: #${frag} not found in ${path.relative(repoRoot, file)}`);
  return false;
}

function walk(dir, exts, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".git" || e.name === "dry-run" || e.name === "results") continue;
      walk(p, exts, out);
    } else if (exts.some((x) => e.name.endsWith(x))) out.push(p);
  }
  return out;
}

const mdFiles = [
  ...walk(path.join(repoRoot, "docs"), [".md"]),
  ...walk(path.join(repoRoot, "evaluation"), [".md"]),
  path.join(repoRoot, "README.md")
];
// Note: the research markdown lives under docs/research/ since 2026-10-26 so it
// is part of the browsable Pages site; docs/ walk above covers it. research/
// holds only the pipeline scripts now.
const htmlFiles = walk(path.join(repoRoot, "docs"), [".html"]);

for (const file of mdFiles) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, "utf8");
  const rel = path.relative(repoRoot, file);
  for (const { url } of extractLinks(text)) {
    if (/^(https?:|mailto:|#)/.test(url)) {
      if (url.startsWith("#")) checkFragment(file, url.slice(1), rel);
      continue;
    }
    if (/^data:/.test(url)) continue;
    checked++;
    const [p, frag] = url.split("#");
    let found = null;
    for (const c of targetsFor(file, p)) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) { found = c; break; }
    }
    if (!found) {
      failures.push(`MISSING: ${rel} -> ${url}`);
      continue;
    }
    if (frag) checkFragment(found, frag, rel);
  }
}

for (const file of htmlFiles) {
  const rel = path.relative(repoRoot, file);
  const text = fs.readFileSync(file, "utf8");
  for (const { url } of extractLinks(text, true)) {
    if (/^(https?:|mailto:|#)/.test(url)) {
      if (url.startsWith("#")) checkFragment(file, url.slice(1), rel);
      continue;
    }
    checked++;
    const [p, frag] = url.split("#");
    let found = null;
    for (const c of targetsFor(file, p)) {
      if (fs.existsSync(c) && fs.statSync(c).isFile()) { found = c; break; }
    }
    if (!found) { failures.push(`MISSING: ${rel} -> ${url}`); continue; }
    if (frag) checkFragment(found, frag, rel);
  }
}

console.log(`Checked ${checked} internal links across ${mdFiles.length + htmlFiles.length} files.`);
if (failures.length) {
  console.error(`\n${failures.length} problems:`);
  for (const f of [...new Set(failures)]) console.error("  " + f);
  process.exit(1);
} else {
  console.log("All internal links and fragments resolve.");
}
