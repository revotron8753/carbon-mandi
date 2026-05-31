// Reusable responsive screenshot helper for the mobile refactor effort.
// Usage: node scripts/rshot.mjs <mobile|desktop> <selectorText> <outName> [maxH]
import { chromium } from "playwright-core";

const [, , mode = "mobile", text = "Who Benefits?", out = "out", maxH = "1500"] = process.argv;
const exe = "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const vp = mode === "mobile"
  ? { width: 390, height: 844, deviceScaleFactor: 1, isMobile: true }
  : { width: 1280, height: 900, deviceScaleFactor: 1 };

const browser = await chromium.launch({ executablePath: exe, headless: true });
const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor, isMobile: vp.isMobile });
await page.goto("http://localhost:3000/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForFunction(() => {
  const imgs = [...document.querySelectorAll("img")];
  return imgs.length > 0 && imgs.every((i) => i.complete && i.naturalWidth > 0);
}, { timeout: 30000 }).catch(() => {});
await page.waitForTimeout(1000);

// find the SECTION-level block containing the text
const sec = await page.evaluateHandle((t) => {
  const all = [...document.querySelectorAll("h1,h2,h3,h4,span,p")];
  const h = all.find((n) => n.textContent.replace(/\s+/g, " ").trim().startsWith(t));
  let el = h;
  while (el && el.parentElement && el.parentElement.tagName !== "SECTION" && el.tagName !== "SECTION") el = el.parentElement;
  return el;
}, text);
const el = sec.asElement();
if (!el) { console.log("MISS"); await browser.close(); process.exit(0); }
await el.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const box = await el.boundingBox();
await el.screenshot({ path: `scripts/${out}.png` });
console.log("OK", out, Math.round(box.width) + "x" + Math.round(box.height));
await browser.close();
