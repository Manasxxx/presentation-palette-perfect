import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const TAG = process.env.SHOT_TAG ?? 'before';
const W = Number(process.env.SHOT_W ?? 390);
const H = Number(process.env.SHOT_H ?? 844);
const ONLY = process.env.SHOT_ONLY ? process.env.SHOT_ONLY.split(',').map(Number) : null;
const outDir = `scripts/_shots/${TAG}`;
mkdirSync(outDir, { recursive: true });

const names = [
  'title', 'whoweare', 'services', 'clients',
  'mitsui', 'kuraray', 'dehn', 'baxsaa', 'cultfit', 'girlup', 'ctp', 'vnt',
  'contact',
];

const browser = await chromium.launch();
const DESKTOP = process.env.SHOT_DESKTOP === '1';
const ctx = await browser.newContext(
  DESKTOP
    ? { viewport: { width: W, height: H }, deviceScaleFactor: 1 }
    : {
        viewport: { width: W, height: H },
        deviceScaleFactor: 2,
        isMobile: true,
        hasTouch: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
      }
);
const page = await ctx.newPage();
await page.goto('http://localhost:8080/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1500);

const indices = ONLY ?? names.map((_, i) => i);
for (const i of indices) {
  await page.evaluate((idx) => {
    const c = document.querySelector('[data-deck-scroll-container]');
    c.scrollTo({ top: idx * window.innerHeight, behavior: 'auto' });
  }, i);
  // wait for lazy mount + entrance anim + deferred lanyard (650ms)
  await page.waitForTimeout(2600);
  const file = `${outDir}/${String(i).padStart(2, '0')}-${names[i]}-${W}x${H}.png`;
  await page.screenshot({ path: file });
  // detect horizontal overflow on this slide
  const overflow = await page.evaluate(() => {
    const doc = document.documentElement;
    return { scrollW: doc.scrollWidth, clientW: doc.clientWidth, innerW: window.innerWidth };
  });
  console.log(`${names[i]}: ${file}  overflowX=${overflow.scrollW > overflow.clientW ? 'YES(' + overflow.scrollW + '>' + overflow.clientW + ')' : 'no'}`);
}

await browser.close();
console.log('done');
