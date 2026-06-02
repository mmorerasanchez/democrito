import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Token contract test — verifies that color, dimension, z-index, and motion tokens
 * defined in design-tokens.json have corresponding CSS custom properties in index.css.
 *
 * Note: typography tokens (fontFamily, fontSize) are declared in the @theme block in
 * src/index.css as Tailwind utilities, not as --var properties, so they are excluded.
 */

const tokensJson = JSON.parse(
  readFileSync(resolve(__dirname, "../../design-tokens.json"), "utf-8")
);

const indexCss = readFileSync(resolve(__dirname, "../index.css"), "utf-8");

// Only test groups that map to CSS custom properties
const CSS_VAR_GROUPS = ["color", "zIndex", "dimension", "duration", "cubicBezier"];

// Groups whose name is dropped from the CSS variable path
const TRANSPARENT_GROUPS = new Set(["color", "semantic", "motion", "dimension"]);

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
