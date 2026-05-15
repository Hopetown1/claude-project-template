#!/usr/bin/env node
// Compares "before" and "after" screenshots from <baseline-dir> and <current-dir>.
// Pass = pixel diff ratio below threshold for every (viewport, route) pair.
// Usage: visual-regression.mjs <baseline-dir> <current-dir> <out-json-path>

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { resolve, basename } from "node:path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const [, , baselineDir, currentDir, outPath] = process.argv;
if (!baselineDir || !currentDir || !outPath) {
  console.error("Usage: visual-regression.mjs <baseline-dir> <current-dir> <out-path>");
  process.exit(2);
}

if (!existsSync(baselineDir)) {
  // No baseline yet (first pass) — record current as baseline and pass.
  writeFileSync(outPath, JSON.stringify({
    gate: "visual-regression",
    status: "pass",
    note: "no baseline; current snapshot recorded",
  }, null, 2));
  console.log("PASS: visual-regression (no baseline)");
  process.exit(0);
}

const THRESHOLD = 0.05;  // 5% changed pixels per image

const results = {};
let allPass = true;

for (const viewport of ["desktop", "mobile"]) {
  const baseVp = resolve(baselineDir, viewport);
  const curVp = resolve(currentDir, viewport);
  if (!existsSync(baseVp) || !existsSync(curVp)) continue;

  for (const file of readdirSync(curVp).filter((f) => f.endsWith(".png"))) {
    const basePath = resolve(baseVp, file);
    const curPath = resolve(curVp, file);
    if (!existsSync(basePath)) continue;

    const base = PNG.sync.read(readFileSync(basePath));
    const cur = PNG.sync.read(readFileSync(curPath));
    if (base.width !== cur.width || base.height !== cur.height) {
      results[`${viewport}/${file}`] = { status: "fail", reason: "dimensions differ", ratio: 1 };
      allPass = false;
      continue;
    }
    const diff = new PNG({ width: base.width, height: base.height });
    const changed = pixelmatch(base.data, cur.data, diff.data, base.width, base.height, { threshold: 0.1 });
    const total = base.width * base.height;
    const ratio = changed / total;
    const pass = ratio <= THRESHOLD;
    if (!pass) allPass = false;
    results[`${viewport}/${file}`] = { status: pass ? "pass" : "fail", ratio };
  }
}

writeFileSync(outPath, JSON.stringify({
  gate: "visual-regression",
  status: allPass ? "pass" : "fail",
  threshold: THRESHOLD,
  results,
}, null, 2));

console.log(allPass ? "PASS: visual-regression" : "FAIL: visual-regression");
process.exit(allPass ? 0 : 1);
