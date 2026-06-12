// Throwaway: full-res crops of case-slide text regions for readability check.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const outDir = 'scripts/_shots/crops';
mkdirSync(outDir, { recursive: true });

const targets = [
  { idx: 4, name: 'mitsui' },
  { idx: 6, name: 'dehn' },
  { idx: 8, name: 'cultfit' },
  { idx: 10, name: 'ctp' },
  { idx: 11, name: 'vnt' },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

for (const t of targets) {
  await page.evaluate((idx) => {
    const c = document.querySelector('[data-deck-scroll-container]');
    c.scrollTo({ top: idx * window.innerHeight, behavior: 'auto' });
  }, t.idx);
  await page.waitForTimeout(5000);
  // left claim column + ledger
  await page.screenshot({ path: `${outDir}/${t.name}-claim.png`, clip: { x: 0, y: 80, width: 620, height: 560 } });
  // bottom stat strip
  await page.screenshot({ path: `${outDir}/${t.name}-stats.png`, clip: { x: 0, y: 680, width: 1440, height: 220 } });
  console.log(t.name);
}

await browser.close();
console.log('done');
