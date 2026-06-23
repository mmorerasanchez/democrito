/**
 * scripts/verify-registry-tokens.mjs
 * Asserts the published registry base item is consistent with tokens/index.css.
 * (A) Color drift — every HSL-triple color token the registry SHIPS for a theme
 *     must equal the value resolved from tokens/index.css for that theme.
 * (B) Missing tokens — every democrito custom property consumed by a component
 *     under registry/ (via var(--x)) must be defined in the registry base item.
 * Exit 0 = consistent, 1 = problems. Run from repo root.
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const css = readFileSync("tokens/index.css", "utf8");
const reg = JSON.parse(readFileSync("registry.json", "utf8"));
const base = reg.items[0];

function block(re) {
  const m = css.match(re);
  if (!m) return {};
  const out = {};
  for (const line of m[1].split("\n")) {
    const mm = line.match(/^\s+--([\w-]+)\s*:\s*(.+?)\s*;/);
    if (mm) out[mm[1]] = mm[2].trim();
  }
  return out;
}
const warm  = block(/(?::root|\.warm)\s*[,{][\s\S]*?\{([\s\S]*?)\n\s{2,4}\}/);
const dark  = block(/\.dark\s*\{([\s\S]*?)\n\s{2,4}\}/);
const light = block(/\.light\s*\{([\s\S]*?)\n\s{2,4}\}/);
const resolved = { warm, dark: { ...warm, ...dark }, light: { ...warm, ...light } };

const norm = (v) =>
  String(v).replace(/^hsl\(/i, "").replace(/\)$/, "").replace(/^--/, "")
    .replace(/\s+/g, " ").trim().toLowerCase();
const isHslTriple = (v) => /^\d[\d.]*\s+[\d.]+%\s+[\d.]+%$/.test(norm(v));

const regWarm  = base.cssVars?.light ?? {};
const regDark  = base.cssVars?.dark ?? {};
const regLight = Object.fromEntries(
  Object.entries(base.css?.[".light"] ?? {})
    .filter(([k]) => k.startsWith("--"))
    .map(([k, v]) => [k.slice(2), v]),
);
const regByTheme = { warm: regWarm, dark: regDark, light: regLight };

// Check A: validate only tokens the registry actually ships (tokens it intentionally
// omits, e.g. --scrollbar-thumb, are not its concern)
const drift = [];
for (const theme of ["warm", "dark", "light"]) {
  for (const [name, got] of Object.entries(regByTheme[theme])) {
    const src = resolved[theme][name];
    if (src == null || !isHslTriple(src)) continue;
    if (norm(got) !== norm(src)) drift.push([theme, name, norm(src), norm(got)]);
  }
}

// Check B: democrito tokens consumed by components via var() but not shipped
const allTokenNames = new Set([
  ...Object.keys(warm), ...Object.keys(dark), ...Object.keys(light),
]);
const defined = new Set();
for (const k of Object.keys(base.cssVars?.theme ?? {})) defined.add(k.replace(/^--/, ""));
for (const slot of ["light", "dark"]) for (const k of Object.keys(base.cssVars?.[slot] ?? {})) defined.add(k);
for (const [sel, decls] of Object.entries(base.css ?? {})) {
  if (sel.startsWith("@")) continue;
  for (const k of Object.keys(decls)) if (k.startsWith("--")) defined.add(k.slice(2));
}
function walk(dir, acc = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, acc);
    else if (/\.(tsx?|css)$/.test(e)) acc.push(p);
  }
  return acc;
}
const used = new Set();
for (const tier of ["atoms", "molecules", "organisms", "templates", "ui"]) {
  for (const f of walk(join("registry", tier))) {
    const txt = readFileSync(f, "utf8");
    for (const m of txt.matchAll(/var\(\s*--([\w-]+)/g)) used.add(m[1]);
  }
}
const missing = [...used].filter((t) => allTokenNames.has(t) && !defined.has(t)).sort();

let ok = true;
if (drift.length) {
  ok = false;
  console.log(`\n✗ COLOR DRIFT — ${drift.length} token(s) differ from tokens/index.css:`);
  for (const [t, n, src, got] of drift) console.log(`  [${t}] --${n}: source=${src}  registry=${got}`);
}
if (missing.length) {
  ok = false;
  console.log(`\n✗ MISSING TOKENS — used by components but not shipped (${missing.length}):`);
  console.log("  " + missing.map((t) => "--" + t).join(", "));
}
console.log(ok
  ? "\n✓ Registry theme tokens are consistent with tokens/index.css, and all component-referenced tokens are shipped."
  : "");
process.exit(ok ? 0 : 1);
