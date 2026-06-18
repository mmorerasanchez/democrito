import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const cssFile = "tokens/index.css";
const css = readFileSync(resolve(cssFile), "utf8");

// Match pure HSL-triple values: "H S% L%" (no alpha, no calc, no var())
const HSL_RE = /(\d[\d.]*)\s+([\d.]+%)\s+([\d.]+%)/;

function parseHslBlock(text, pattern) {
  const match = text.match(pattern);
  if (!match) return {};
  const out = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^\s+--([\w-]+)\s*:\s*(.+?)\s*;/);
    if (!m) continue;
    const [, name, raw] = m;
    const hsl = raw.match(HSL_RE);
    if (hsl) out[name] = `hsl(${hsl[1]} ${hsl[2]} ${hsl[3]})`;
  }
  return out;
}

function parseRootBlock(text, tokenFilter) {
  // :root / .warm block — possibly inside @layer base
  const match = text.match(/(?::root|\.warm)\s*[,{][\s\S]*?\{([\s\S]*?)\n\s{2,4}\}/);
  const block = match ? match[1] : "";
  const out = {};
  for (const line of block.split("\n")) {
    const m = line.match(/^\s+--([\w-]+)\s*:\s*(.+?)\s*;/);
    if (!m) continue;
    const [, name, raw] = m;
    if (tokenFilter(name, raw)) out[name] = raw.trim();
  }
  return out;
}

// Parse color tokens per theme
const warm  = parseHslBlock(css, /(?::root|\.warm)\s*[,{][\s\S]*?\{([\s\S]*?)\n\s{2,4}\}/);
const dark  = parseHslBlock(css, /\.dark\s*\{([\s\S]*?)\n\s{2,4}\}/);
const light = parseHslBlock(css, /\.light\s*\{([\s\S]*?)\n\s{2,4}\}/);

// Build color group — only include tokens that appear in at least warm
const colorNames = Object.keys(warm);
const colorGroup = { $type: "color" };
for (const name of colorNames) {
  const entry = {};
  if (warm[name])  entry.warm  = { $value: warm[name] };
  if (dark[name])  entry.dark  = { $value: dark[name] };
  if (light[name]) entry.light = { $value: light[name] };
  if (Object.keys(entry).length > 0) colorGroup[name] = entry;
}

// Parse non-color tokens from :root only
const rootAll = parseRootBlock(css, () => true);

function pick(prefix, rename) {
  const out = {};
  for (const [k, v] of Object.entries(rootAll)) {
    if (k.startsWith(prefix)) {
      const key = rename ? k.slice(prefix.length) : k;
      out[key] = v;
    }
  }
  return out;
}

// dimension (--radius only, maps to CSS --radius)
const dimensionGroup = { $type: "dimension" };
if (rootAll["radius"]) dimensionGroup["radius"] = { $value: rootAll["radius"] };

// zIndex — CSS vars are --z-base etc. → JSON key "base"
const zGroup = { $type: "number" };
for (const [k, v] of Object.entries(rootAll)) {
  if (k.startsWith("z-")) {
    zGroup[k.slice(2)] = { $value: parseInt(v, 10) };
  }
}

// duration — CSS vars are --duration-instant etc. → JSON key "instant"
const durationGroup = { $type: "duration" };
for (const [k, v] of Object.entries(rootAll)) {
  if (k.startsWith("duration-")) {
    durationGroup[k.slice(9)] = { $value: v };
  }
}

// cubicBezier — CSS vars are --ease-default etc. → JSON key "default"
function parseCb(val) {
  const m = val.match(/cubic-bezier\(([\d.,\s]+)\)/);
  if (!m) return val;
  return m[1].split(",").map((n) => parseFloat(n.trim()));
}
const cbGroup = { $type: "cubicBezier" };
for (const [k, v] of Object.entries(rootAll)) {
  if (k.startsWith("ease-")) {
    cbGroup[k.slice(5)] = { $value: parseCb(v) };
  }
}

const today = new Date().toISOString().split("T")[0];

const out = {
  $schema: "https://design-tokens.github.io/community-group/format/",
  $description: `Atomic Design System — W3C DTCG format. Auto-generated ${today} from tokens/index.css.`,
  $version: "1.0.0",
  color: colorGroup,
  dimension: dimensionGroup,
  zIndex: Object.keys(zGroup).length > 1 ? zGroup : undefined,
  duration: Object.keys(durationGroup).length > 1 ? durationGroup : undefined,
  cubicBezier: Object.keys(cbGroup).length > 1 ? cbGroup : undefined,
};

// Remove undefined keys
const clean = Object.fromEntries(Object.entries(out).filter(([, v]) => v !== undefined));

writeFileSync(resolve("tokens/design-tokens.json"), JSON.stringify(clean, null, 2));

const colorCount = Object.keys(colorGroup).filter((k) => !k.startsWith("$")).length;
console.log(`✓ design-tokens.json — ${colorCount} color tokens, dimension/zIndex/duration/cubicBezier included`);
