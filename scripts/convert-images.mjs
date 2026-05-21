/**
 * Convert PNG/JPG assets to WebP.
 * Run once: node scripts/convert-images.mjs
 * Requires: npm install -D sharp
 */
import sharp from "sharp";
import { readdirSync, existsSync } from "fs";
import { join, extname, basename } from "path";

const ASSETS_DIR = new URL("../src/assets", import.meta.url).pathname;
const QUALITY = 82; // WebP quality — good visual/size tradeoff

const files = readdirSync(ASSETS_DIR).filter(f =>
  [".png", ".jpg", ".jpeg"].includes(extname(f).toLowerCase())
);

console.log(`Converting ${files.length} files to WebP (q${QUALITY})...\n`);

for (const file of files) {
  const src = join(ASSETS_DIR, file);
  const dest = join(ASSETS_DIR, basename(file, extname(file)) + ".webp");

  if (existsSync(dest)) {
    console.log(`  skip  ${file} (webp exists)`);
    continue;
  }

  try {
    const info = await sharp(src).webp({ quality: QUALITY }).toFile(dest);
    const srcSize = (await import("fs")).statSync(src).size;
    const saving = (((srcSize - info.size) / srcSize) * 100).toFixed(0);
    console.log(`  ✓  ${file} → ${basename(dest)}  (${saving}% smaller)`);
  } catch (e) {
    console.error(`  ✗  ${file}: ${e.message}`);
  }
}

console.log("\nDone. Update imports in components to use .webp paths.");
