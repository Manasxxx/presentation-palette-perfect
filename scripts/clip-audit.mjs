// Clip audit: scrolls through every slide at several viewports and reports
// meaningful content (text, images, buttons, links) that crosses the slide's
// top/bottom/right/left bounds. Decorative bleeds (canvas, svg backdrops,
// carousel side cards) are excluded. Run: node scripts/clip-audit.mjs
import { chromium } from "playwright";

const BASE = process.env.SHOT_BASE || "http://localhost:8080/";
const VIEWPORTS = [
  { w: 1280, h: 560, label: "desktop-tiny" },
  { w: 1728, h: 700, label: "desktop-wide-short" },
  { w: 1280, h: 624, label: "desktop-short" },
  { w: 1440, h: 750, label: "desktop-mid" },
  { w: 1512, h: 823, label: "desktop-mbp" },
  { w: 1920, h: 1080, label: "desktop-full" },
  { w: 2000, h: 1107, label: "desktop-wide" },
  { w: 390, h: 844, label: "mobile-iphone" },
  { w: 360, h: 700, label: "mobile-short" },
];
const SLIDES = 13;
const TOL = 6; // px tolerance

const browser = await chromium.launch();
for (const vp of VIEWPORTS) {
  const page = await browser.newPage({ viewport: { width: vp.w, height: vp.h } });
  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const issues = [];
  for (let i = 0; i < SLIDES; i++) {
    await page.evaluate((idx) => {
      const c = document.querySelector("[data-deck-scroll-container]") || document.scrollingElement;
      const slide = document.querySelectorAll(".slide")[0];
      const h = slide ? slide.getBoundingClientRect().height : window.innerHeight;
      c.scrollTo({ top: idx * h, behavior: "instant" });
    }, i);
    await page.waitForTimeout(i === 0 ? 800 : 2400); // mount + entrance settle
    const res = await page.evaluate(({ idx, tol }) => {
      const slides = document.querySelectorAll(".slide");
      const slide = slides[idx];
      if (!slide) return { idx, missing: true, clips: [] };
      const sb = slide.getBoundingClientRect();
      const clips = [];
      const seen = new Set();
      const meaningful = (el) => {
        if (el.closest("canvas,svg")) return false;
        const tag = el.tagName;
        if (tag === "IMG" || tag === "BUTTON" || tag === "A") return true;
        // direct text content
        for (const n of el.childNodes) {
          if (n.nodeType === 3 && n.textContent.trim().length > 1) return true;
        }
        return false;
      };
      slide.querySelectorAll("*").forEach((el) => {
        if (!meaningful(el)) return;
        const cs = getComputedStyle(el);
        if (cs.display === "none" || cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return;
        const b = el.getBoundingClientRect();
        if (b.width === 0 || b.height === 0) return;
        const over = {
          top: sb.top - b.top,
          bottom: b.bottom - sb.bottom,
          left: sb.left - b.left,
          right: b.right - sb.right,
        };
        const bad = Object.entries(over).filter(([, v]) => v > tol);
        if (bad.length) {
          const key = el.tagName + "|" + (el.textContent || "").trim().slice(0, 40);
          if (seen.has(key)) return;
          seen.add(key);
          clips.push({
            el: el.tagName + "." + String(el.className).split(" ").slice(0, 3).join("."),
            text: (el.textContent || el.getAttribute("alt") || "").trim().slice(0, 40),
            over: Object.fromEntries(bad.map(([k, v]) => [k, Math.round(v)])),
          });
        }
      });
      return { idx, clips };
    }, { idx: i, tol: TOL });
    if (res.missing) issues.push({ slide: i, error: "slide not mounted" });
    else if (res.clips.length) issues.push({ slide: i, clips: res.clips.slice(0, 6) });
  }
  console.log(`\n=== ${vp.label} ${vp.w}x${vp.h} ===`);
  if (!issues.length) console.log("clean");
  else for (const iss of issues) console.log(JSON.stringify(iss));
  await page.close();
}
await browser.close();
