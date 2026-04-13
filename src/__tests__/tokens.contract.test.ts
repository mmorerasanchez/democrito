import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Token contract test — verifies that every token defined in design-tokens.json
 * has a corresponding CSS custom property in src/index.css.
 */

const tokensJson = JSON.parse(
  readFileSync(resolve(__dirname, "../../design-tokens.json"), "utf-8")
);

const indexCss = readFileSync(
  resolve(__dirname, "../index.css"),
  "utf-8"
);

// Groups whose name is dropped from the CSS variable path
const TRANSPARENT_GROUPS = new Set(["color", "semantic", "layout", "motion", "typography"]);

// Groups whose JSON key maps to a different CSS prefix
const GROUP_RENAMES: Record<string, string> = { zIndex: "z" };

function extractTokenNames(obj: Record<string, any>, segments: string[] = []): string[] {
  const names: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (value && typeof value === "object") {
      const hasThemeValues = ["dark", "light", "warm"].some(
        (t) => value[t] && value[t].$value
      );
      const hasDirectValue = value.$value !== undefined;

      if (hasThemeValues || hasDirectValue) {
        // Leaf token
        const cssKey = GROUP_RENAMES[key] ?? key;
        const leafSegments = TRANSPARENT_GROUPS.has(key) ? segments : [...segments, cssKey];
        names.push(leafSegments.join("-"));
      } else {
        // Group node
        const cssKey = GROUP_RENAMES[key] ?? key;
        const newSegments = TRANSPARENT_GROUPS.has(key) ? segments : [...segments, cssKey];
        names.push(...extractTokenNames(value, newSegments));
      }
    }
  }
  return names;
}

const allTokenNames = extractTokenNames(tokensJson).filter((n) => n.length > 0);

describe("Design token contract", () => {
  it("should have tokens defined in design-tokens.json", () => {
    expect(allTokenNames.length).toBeGreaterThan(0);
  });

  it.each(allTokenNames)("CSS variable --%s exists in index.css", (tokenName) => {
    expect(indexCss).toContain(`--${tokenName}`);
  });
});
