import { readFileSync, readdirSync } from "node:fs";
import { resolve, join } from "node:path";

const root = resolve(".");

function countTsx(dir) {
  try {
    return readdirSync(join(root, dir)).filter((f) => f.endsWith(".tsx")).length;
  } catch {
    return 0;
  }
}

function countThemeTokens(cssPath) {
  const text = readFileSync(cssPath, "utf8");
  const themeMatch = text.match(/@theme\s*\{([\s\S]*?)\n\}/);
  if (!themeMatch) return 0;
  const theme = themeMatch[1];
  let inside = false;
  let count = 0;
  for (const line of theme.split("\n")) {
    if (line.includes("@keyframes")) { inside = true; continue; }
    if (inside && line.trim() === "}") { inside = false; continue; }
    if (!inside && /^\s+--/.test(line)) count++;
  }
  return count;
}

function tierDir(tier) {
  return `registry/${tier}`;
}
const cssPath = "tokens/index.css";

const atoms     = countTsx(tierDir("atoms"));
const molecules = countTsx(tierDir("molecules"));
const organisms = countTsx(tierDir("organisms"));
const templates = countTsx(tierDir("templates"));
const ui        = countTsx(tierDir("ui"));
const rawTokens = countThemeTokens(cssPath);
const tokenFloor = `${Math.floor(rawTokens / 10) * 10}+`;

console.log(`✓ counts.ts — atoms:${atoms} molecules:${molecules} organisms:${organisms} templates:${templates} ui:${ui} tokens:${tokenFloor}`);
