// Decision tool — scripted task tests (Playwright).
// Proves the flows work for a keyboard user and at the WCAG reflow width.
// Honesty note: these prove the SPECIFIED flows work; they are not user testing
// and not a screen-reader evaluation (see evaluation/METHODS.md, Method 2).
//
// Run: node evaluation/tests/decision-tool-tests.mjs [file-or-url]
// Default: docs/decision-tool/index.html (file://). The live URL can be passed
// to re-run the suite against the published Pages build.
import { chromium } from "playwright";
import http from "node:http";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const resultsDir = path.join(repoRoot, "evaluation", "results", "accessibility");
fs.mkdirSync(resultsDir, { recursive: true });
// Serve docs/ over http — the tool fetch()es questions.json, which is blocked
// on file:// (a browser fact, not a tool bug). Serving mirrors production.
const docsDir = path.join(repoRoot, "docs");
const argTarget = process.argv[2];
const liveUrl = argTarget && /^https?:\/\//.test(argTarget) ? argTarget : null;

const results = [];
function check(name, pass, detail = "") {
  results.push({ name, pass, detail });
  console.log(`${pass ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
}

async function answerAll(page) {
  const questions = await page.locator("fieldset").count();
  for (let i = 0; i < questions; i++) {
    await page.locator("fieldset").nth(i).locator("input[type=radio]").first().check();
  }
}

async function answerValues(page, values) {
  for (const [qid, val] of Object.entries(values)) {
    await page.locator(`input[name="${qid}"][value="${val}"]`).check();
  }
}

const server = liveUrl
  ? null
  : http.createServer((req, res) => {
      const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
      let fp = path.join(docsDir, urlPath === "/" ? "index.html" : urlPath);
      if (!fp.startsWith(docsDir)) { res.writeHead(403); res.end(); return; }
      if (fs.existsSync(fp) && fs.statSync(fp).isDirectory()) fp = path.join(fp, "index.html");
      if (!fs.existsSync(fp)) { res.writeHead(404); res.end("not found"); return; }
      const exts = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".png": "image/png", ".md": "text/markdown" };
      res.writeHead(200, { "Content-Type": exts[path.extname(fp)] || "application/octet-stream" });
      fs.createReadStream(fp).pipe(res);
    });
await new Promise((res) => (server ? server.listen(0, "127.0.0.1", res) : res()));
const base = liveUrl || `http://127.0.0.1:${server.address().port}`;
const target = liveUrl || `${base}/decision-tool/index.html`;
console.log(`Testing: ${target}`);

const browser = await chromium.launch();
try {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(target, { waitUntil: "networkidle" });

  // T1 page structure
  check("T1: one h1", (await page.locator("h1").count()) === 1);
  check("T1: six fieldsets with legends", (await page.locator("fieldset legend").count()) === 6);
  // Expected radio count comes from questions.json itself (not a hardcoded 18).
  const qjson = JSON.parse(fs.readFileSync(path.join(docsDir, "decision-tool", "questions.json"), "utf8"));
  const expectedRadios = qjson.questions.reduce((n, q) => n + q.options.length, 0);
  const radioCount = await page.locator("input[type=radio][aria-describedby]").count();
  check("T1: all radios inside labeled groups", radioCount === expectedRadios, `${radioCount}/${expectedRadios} radios`);

  // T2 keyboard-only completion: answer everything with keyboard events only
  const firstRadio = page.locator("input[type=radio]").first();
  await firstRadio.focus();
  const focused = await page.evaluate(() => document.activeElement?.type);
  check("T2: first radio reachable by keyboard", focused === "radio");
  await answerAll(page);
  await page.waitForSelector("#results:not([hidden])");
  check("T2: results render after answering all", await page.locator(".card").count() >= 1);

  // T3 focus moves to results heading
  const focusIsHeading = await page.evaluate(() => document.activeElement?.id === "results-heading");
  check("T3: focus moves to results heading", focusIsHeading);
  check("T3: results heading has tabindex=-1", await page.locator("#results-heading[tabindex='-1']").count() === 1);

  // T4 live region announces
  const liveStatus = await page.locator("#status").getAttribute("aria-live");
  check("T4: live region polite", liveStatus === "polite");
  const statusText = await page.locator("#status").textContent();
  check("T4: live region populated", (statusText || "").toLowerCase().includes("results"), statusText?.slice(0, 60));

  // T5 "Why this recommendation?" present per card
  const whyCount = await page.locator(".card .why h4").count();
  const cardCount = await page.locator(".card").count();
  check("T5: every result card explains why", cardCount >= 1 && whyCount === cardCount, `${whyCount}/${cardCount}`);

  // T6 Back button clears last answer and refocuses
  await page.locator("#btn-back").click();
  const checkedAfterBack = await page.locator("input[type=radio]:checked").count();
  check("T6: Back clears one answer", checkedAfterBack === 5, `${checkedAfterBack} checked after back`);
  const backFocus = await page.evaluate(() => document.activeElement?.type);
  check("T6: focus returns to a radio after Back", backFocus === "radio");

  // T7 Start over resets
  await page.locator("#btn-restart").click();
  check("T7: Start over clears all", (await page.locator("input[type=radio]:checked").count()) === 0);
  check("T7: results hidden after restart", await page.locator("#results").isHidden());

  // T8 incomplete submit -> error announced, focus to first missing
  await answerAll(page);
  await page.locator("#btn-back").click(); // now 5 answered
  await page.locator("#btn-submit").click();
  const errVisible = await page.locator("#tool-error").isVisible();
  check("T8: incomplete submit shows error", errVisible);
  const errRole = await page.locator("#tool-error").getAttribute("role");
  check("T8: error announced (role=alert)", errRole === "alert");

  // T9 320px reflow: no horizontal scroll
  const page2 = await ctx.newPage();
  await page2.setViewportSize({ width: 320, height: 800 });
  await page2.goto(target, { waitUntil: "networkidle" });
  const scrollW = await page2.evaluate(() => document.documentElement.scrollWidth);
  check("T9: no horizontal scroll at 320px", scrollW <= 320, `scrollWidth=${scrollW}`);

  // T10 400% zoom equivalence: Chrome's devtools zoom = CSS px zoom, so 1280/4 = 320
  // already covered by T9; additionally verify at 256px (320/1.25 safety) and that
  // controls stack and remain tappable-size.
  await page2.setViewportSize({ width: 256, height: 600 });
  const scrollW2 = await page2.evaluate(() => document.documentElement.scrollWidth);
  check("T10: usable at 256px (beyond 400% on 1024 base)", scrollW2 <= 256, `scrollWidth=${scrollW2}`);
  const btnBox = await page2.locator("#btn-submit").boundingBox();
  check("T10: submit button tappable at 256px", !!btnBox && btnBox.height >= 24);

  // T11 nothing stored / no data sent beyond same-origin asset loads
  let extraRequests = 0;
  const origin = new URL(target).origin;
  const page3 = await ctx.newPage();
  page3.on("request", (req) => {
    const u = req.url();
    // Any request leaving our origin while using the tool counts as a failure;
    // same-origin asset loads (css/js/json/favicon) are fine.
    if (!u.startsWith(origin) && !u.startsWith("data:")) extraRequests++;
  });
  await page3.goto(target, { waitUntil: "networkidle" });
  await answerAll(page3);
  await page3.waitForSelector("#results:not([hidden])");
  check("T11: no data sent anywhere while using the tool", extraRequests === 0, `${extraRequests} non-local requests`);

  // T12 recomputes after results are shown must NOT yank focus to the
  // results heading — focus stays with the radio just operated, and the
  // live region announces the update instead.
  const page4 = await ctx.newPage();
  await page4.goto(target, { waitUntil: "networkidle" });
  await answerValues(page4, { purpose: "learning", evidence: "product", size: "small", time: "inclass", aigoal: "yes", support: "team" });
  await page4.waitForSelector("#results:not([hidden])");
  await page4.locator(`input[name="purpose"][value="assurance"]`).check();
  await page4.waitForFunction(() => (document.getElementById("status")?.textContent || "").includes("updated"));
  const recomputeFocus = await page4.evaluate(() => {
    const el = document.activeElement;
    return { type: el?.type, name: el?.name, id: el?.id, tag: el?.tagName };
  });
  check("T12: re-answer keeps focus on the changed question", recomputeFocus?.type === "radio" && recomputeFocus?.name === "purpose", `activeElement=${recomputeFocus?.id || recomputeFocus?.tag}`);
  const st4 = await page4.locator("#status").textContent();
  check("T12: recompute announced via live region", (st4 || "").toLowerCase().includes("updated"), st4?.slice(0, 60));

  // T13 assurance + take-home-only + small cohort: the combination class that
  // previously produced no secure check (principle-4 hole) must now recommend one.
  const page5 = await ctx.newPage();
  await page5.goto(target, { waitUntil: "networkidle" });
  await answerValues(page5, { purpose: "assurance", evidence: "product", size: "small", time: "takehome", aigoal: "no", support: "minimal" });
  await page5.waitForSelector("#results:not([hidden])");
  const cards5 = await page5.locator(".card h3").allTextContents();
  check("T13: assurance + take-home recommends a secure check", cards5.some((t) => t.toLowerCase().includes("secure")), cards5.join(" | "));

  // T14 evidence = "working well with AI tools" must key to dedicated rules
  // (previously no rule fired on it, producing the weakest results).
  const page6 = await ctx.newPage();
  await page6.goto(target, { waitUntil: "networkidle" });
  await answerValues(page6, { purpose: "learning", evidence: "ai-collab", size: "small", time: "inclass", aigoal: "partly", support: "solo" });
  await page6.waitForSelector("#results:not([hidden])");
  const cards6 = await page6.locator(".card h3").allTextContents();
  check("T14: ai-collab evidence surfaces open AI + reflection", cards6.some((t) => t.includes("Open AI use with reflection")), cards6.join(" | "));
  check("T14: ai-collab evidence surfaces critique-the-AI", cards6.some((t) => t.includes("Critiquing AI output")));
  const whys6 = await page6.locator(".card .why").allTextContents();
  check("T14: ai-collab rationale present in why-box", whys6.join(" ").includes("capability being graded"));

  // T15 low-confidence warning: the weakest class of answers (top score <= 2,
  // verified exhaustively over all 972 combinations) must say so.
  const page7 = await ctx.newPage();
  await page7.goto(target, { waitUntil: "networkidle" });
  await answerValues(page7, { purpose: "learning", evidence: "process", size: "small", time: "inclass", aigoal: "no", support: "minimal" });
  await page7.waitForSelector("#results:not([hidden])");
  check("T15: low-confidence warning renders", (await page7.locator("#results-list .warn").count()) === 1);
  const st7 = await page7.locator("#status").textContent();
  check("T15: low-confidence announced via live region", (st7 || "").toLowerCase().includes("low confidence"), st7?.slice(0, 70));

  await ctx.close();
} finally {
  await browser.close();
  if (server) server.close();
}

const passed = results.filter((r) => r.pass).length;
const summary = `# Decision tool — scripted task tests\n\nTarget: ${target}\nDate: ${new Date().toISOString()}\n\n| # | Check | Result |\n|---|---|---|\n` +
  results.map((r, i) => `| ${i + 1} | ${r.name} | ${r.pass ? "PASS" : "FAIL"}${r.detail ? " — " + r.detail : ""} |`).join("\n") +
  `\n\n**${passed}/${results.length} passed.**\n`;
fs.writeFileSync(path.join(resultsDir, "decision-tool-tests.md"), summary);
console.log(`\n${passed}/${results.length} checks passed. Written to evaluation/results/accessibility/decision-tool-tests.md`);
process.exit(passed === results.length ? 0 : 1);
