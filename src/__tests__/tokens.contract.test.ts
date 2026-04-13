import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

/**
 * Token contract test — verifies that every token defined in design-tokens.json
 * has a corresponding CSS custom property in src/index.css :root.
 */

const tokensJson = JSON.parse(
  readFileSync(resolve(__dirname, "../../design-tokens.json"), "utf-8")
);

const indexCss = readFileSync(
  resolve(__dirname, "../index.css"),
  "utf-8"
);

function extractTokenNames(obj: Record<string, any>, prefix = ""): string[] {
  const names: string[] = [];
  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue;
    if (value && typeof value === "object" && !value.$value) {
      // Check if this level has theme variants (dark/light/warm) with $value
      const hasThemeValues = ["dark", "light", "warm"].some(
        (t) => value[t] && value[t].$value
      );
      if (hasThemeValues) {
        names.push(prefix ? `${prefix}-${key}` : key);
      } else {
        names.push(...extractTokenNames(value, prefix ? `${prefix}-${key}` : key));
      }
    }
  }
  return names;
}

// Extract top-level groups from design-tokens.json (color, typography, etc.)
const allTokenNames: string[] = [];
for (const [groupKey, groupValue] of Object.entries(tokensJson)) {
  if (groupKey.startsWith("$")) continue;
  if (typeof groupValue === "object" && groupValue !== null) {
    allTokenNames.push(...extractTokenNames(groupValue as Record<string, any>));
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
