import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

// ---------------------------------------------------------------------------
// WCAG 2.1 contrast helpers
// ---------------------------------------------------------------------------

function hslToSrgb(h: number, s: number, l: number): [number, number, number] {
  s /= 100;
  l /= 100;
  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;
  let r = 0, g = 0, b = 0;
  if (h < 60)      { r = c; g = x; b = 0; }
  else if (h < 120){ r = x; g = c; b = 0; }
  else if (h < 180){ r = 0; g = c; b = x; }
  else if (h < 240){ r = 0; g = x; b = c; }
  else if (h < 300){ r = x; g = 0; b = c; }
  else             { r = c; g = 0; b = x; }
  return [r + m, g + m, b + m];
}

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(r: number, g: number, b: number): number {
  return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

function contrastRatio(l1: number, l2: number): number {
  const lighter = Math.max(l1, l2);
  const darker  = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

function luminanceFromHslString(hsl: string): number {
  const parts = hsl.trim().split(/\s+/);
  const h = parseFloat(parts[0]);
  const s = parseFloat(parts[1]);
  const l = parseFloat(parts[2]);
  const [r, g, b] = hslToSrgb(h, s, l);
  return relativeLuminance(r, g, b);
}

// Parse all CSS custom property tokens (HSL triples only) per named theme block.
// Returns { warm, dark, light } → { tokenName: "H S% L%" }
function parseThemeTokens(css: string): Record<string, Record<string, string>> {
  const result: Record<string, Record<string, string>> = {};

  const blocks: Array<{ name: string; regex: RegExp }> = [
    { name: "warm",  regex: /(?::root|\.warm)\s*(?:,\s*(?::root|\.warm)\s*)?\{([\s\S]*?)\}/g },
    { name: "dark",  regex: /\.dark\s*\{([\s\S]*?)\}/g },
    { name: "light", regex: /\.light\s*\{([\s\S]*?)\}/g },
  ];

  for (const { name, regex } of blocks) {
    const tokens: Record<string, string> = {};
    let match: RegExpExecArray | null;
    regex.lastIndex = 0;
    while ((match = regex.exec(css)) !== null) {
      const block = match[1];
      const varRe = /--([a-z][a-z0-9-]*):\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*;/g;
      let m: RegExpExecArray | null;
      while ((m = varRe.exec(block)) !== null) {
        tokens[m[1]] = `${m[2]} ${m[3]} ${m[4]}`;
      }
    }
    result[name] = tokens;
  }

  return result;
}

// ---------------------------------------------------------------------------
// WCAG contrast invariant tests
// ---------------------------------------------------------------------------

const THEME_NAMES = ["warm", "dark", "light"] as const;
type ThemeName = typeof THEME_NAMES[number];

/**
 * Token contract test — verifies that color, dimension, z-index, duration, and easing tokens
 * defined in design-tokens.json have corresponding CSS custom properties in index.css.
 *
 * Note: typography tokens (fontFamily, fontSize) are declared in the @theme block in
 * src/index.css as Tailwind utilities, not as --var properties, so they are excluded.
 */

const tokensJson = JSON.parse(
  readFileSync(resolve(__dirname, "../design-tokens.json"), "utf-8")
);

const indexCss = readFileSync(resolve(__dirname, "../tokens/index.css"), "utf-8");

// Only test groups that map to CSS custom properties
const CSS_VAR_GROUPS = ["color", "zIndex", "dimension", "duration", "cubicBezier"];

// Groups whose name is dropped from the CSS variable path
const TRANSPARENT_GROUPS = new Set(["color", "semantic", "dimension"]);

// Groups whose JSON key maps to a different CSS prefix
const GROUP_RENAMES: Record<string, string> = { zIndex: "z", cubicBezier: "ease" };

interface TokenNode { [key: string]: TokenNode | string }

function extractTokenNames(obj: Record<string, unknown>, segments: string[] = []): string[] {
  const names: string[] = [];
  for (const [key, rawValue] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (rawValue && typeof rawValue === "object") {
      const value = rawValue as TokenNode;
      const hasThemeValues = ["dark", "light", "warm"].some(
        (t) => {
          const themeNode = value[t] as TokenNode | undefined;
          return themeNode && themeNode.$value;
        }
      );
      const hasDirectValue = value.$value !== undefined;
      const cssKey = GROUP_RENAMES[key] ?? key;

      if (hasThemeValues || hasDirectValue) {
        const leafSegments = TRANSPARENT_GROUPS.has(key) ? segments : [...segments, cssKey];
        names.push(leafSegments.join("-"));
      } else {
        const newSegments = TRANSPARENT_GROUPS.has(key) ? segments : [...segments, cssKey];
        names.push(...extractTokenNames(value as Record<string, unknown>, newSegments));
      }
    }
  }
  return names;
}

const allTokenNames: string[] = [];
for (const groupKey of CSS_VAR_GROUPS) {
  const group = tokensJson[groupKey];
  if (group && typeof group === "object") {
    const isTransparent = TRANSPARENT_GROUPS.has(groupKey);
    const cssKey = GROUP_RENAMES[groupKey] ?? groupKey;
    allTokenNames.push(...extractTokenNames(group, isTransparent ? [] : [cssKey]));
  }
}

describe("Design token contract", () => {
  it("should have tokens defined in design-tokens.json", () => {
    expect(allTokenNames.length).toBeGreaterThan(0);
  });

  it.each(allTokenNames)("CSS variable --%s exists in index.css", (tokenName) => {
    expect(indexCss).toContain(`--${tokenName}`);
  });
});

// ---------------------------------------------------------------------------
// WCAG contrast invariants — ensures accessibility can never silently regress
// ---------------------------------------------------------------------------

describe("WCAG contrast invariants", () => {
  const themes = parseThemeTokens(indexCss);

  it("theme blocks parsed from index.css", () => {
    for (const name of THEME_NAMES) {
      expect(themes[name]).toBeDefined();
      expect(Object.keys(themes[name]).length).toBeGreaterThan(5);
    }
  });

  describe.each(THEME_NAMES)("%s theme — foreground/background ≥ 4.5 (AA text)", (theme: ThemeName) => {
    it(`${theme}: foreground / background`, () => {
      const t = themes[theme];
      const fg = luminanceFromHslString(t["foreground"]);
      const bg = luminanceFromHslString(t["background"]);
      const ratio = contrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  describe.each(THEME_NAMES)("%s theme — muted-foreground/background ≥ 4.5 (AA text)", (theme: ThemeName) => {
    it(`${theme}: muted-foreground / background`, () => {
      const t = themes[theme];
      const fg = luminanceFromHslString(t["muted-foreground"]);
      const bg = luminanceFromHslString(t["background"]);
      const ratio = contrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(4.5);
    });
  });

  // accent/background is KNOWN AA-large-only — Warm accent is ~3.9:1 (fails AA 4.5, passes AA-large 3.0)
  describe.each(THEME_NAMES)("%s theme — accent/background ≥ 3.0 (AA large)", (theme: ThemeName) => {
    it(`${theme}: accent / background`, () => {
      const t = themes[theme];
      const fg = luminanceFromHslString(t["accent"]);
      const bg = luminanceFromHslString(t["background"]);
      const ratio = contrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });

  // foreground-subtle/card is KNOWN AA-large-only — does not meet AA text in any theme.
  // Do not use foreground-subtle for body-size text (see DESIGN.md §7 Don'ts).
  describe.each(THEME_NAMES)("%s theme — foreground-subtle/card ≥ 3.0 (AA large UI minimum)", (theme: ThemeName) => {
    it(`${theme}: foreground-subtle / card`, () => {
      const t = themes[theme];
      const fg = luminanceFromHslString(t["foreground-subtle"]);
      const bg = luminanceFromHslString(t["card"]);
      const ratio = contrastRatio(fg, bg);
      expect(ratio).toBeGreaterThanOrEqual(3.0);
    });
  });
});
