import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import { resolve } from "path";

const tokens = JSON.parse(
  readFileSync(resolve(__dirname, "../tokens/design-tokens.json"), "utf-8")
);

interface TokenLeaf {
  path: string;
  value: unknown;
  type: string | undefined;
}

function collectLeaves(
  obj: Record<string, unknown>,
  ancestorType?: string,
  path = ""
): TokenLeaf[] {
  if (typeof obj !== "object" || obj === null) return [];
  const type = (obj.$type as string | undefined) ?? ancestorType;
  if ("$value" in obj) {
    return [{ path, value: obj.$value, type }];
  }
  return Object.entries(obj)
    .filter(([k]) => !k.startsWith("$"))
    .flatMap(([k, v]) =>
      collectLeaves(
        v as Record<string, unknown>,
        type,
        path ? `${path}.${k}` : k
      )
    );
}

const ALL_LEAVES = collectLeaves(tokens);
const LEAF_COUNT = ALL_LEAVES.length;
const COLOR_LEAVES = ALL_LEAVES.filter((l) => l.type === "color");

// ─── Group 1 — DTCG schema conformance ───────────────────────────────────────

describe("Group 1 — DTCG schema conformance", () => {
  it("no token node uses the old 'value' key instead of '$value'", () => {
    function findOldValueKeys(
      obj: Record<string, unknown>,
      path = ""
    ): string[] {
      if (typeof obj !== "object" || obj === null) return [];
      const violations: string[] = [];
      for (const [k, v] of Object.entries(obj)) {
        if (k === "value") violations.push(path || "(root)");
        if (typeof v === "object" && v !== null && !Array.isArray(v)) {
          violations.push(
            ...findOldValueKeys(
              v as Record<string, unknown>,
              path ? `${path}.${k}` : k
            )
          );
        }
      }
      return violations;
    }
    const violations = findOldValueKeys(tokens);
    expect(
      violations,
      `Old 'value' key found at: ${violations.join(", ")}`
    ).toHaveLength(0);
  });

  it("every leaf has a resolvable $type (direct or inherited)", () => {
    const untyped = ALL_LEAVES.filter((l) => l.type === undefined);
    expect(
      untyped.map((l) => l.path),
      `Leaves missing $type: ${untyped.map((l) => l.path).join(", ")}`
    ).toHaveLength(0);
  });
});

// ─── Group 2 — Required semantic tokens present ───────────────────────────────

describe("Group 2 — Required semantic tokens present", () => {
  const THEMES = ["warm", "light", "dark"] as const;
  const COLOR_TOKEN_NAMES = [
    "background",
    "surface",
    "card",
    "foreground",
    "foreground-muted",
    "accent",
    "border",
  ];

  for (const name of COLOR_TOKEN_NAMES) {
    for (const theme of THEMES) {
      it(`color.${name}.${theme} exists with a $value`, () => {
        const colorGroup = tokens.color as Record<
          string,
          Record<string, { $value?: unknown }>
        >;
        const node = colorGroup[name]?.[theme];
        expect(
          node,
          `tokens.color["${name}"]["${theme}"] is missing`
        ).toBeDefined();
        expect(
          node?.$value,
          `tokens.color["${name}"]["${theme}"].$value is missing`
        ).toBeDefined();
      });
    }
  }

  it("dimension.radius exists with a $value", () => {
    const dimensionGroup = tokens.dimension as Record<
      string,
      { $value?: unknown }
    >;
    const node = dimensionGroup?.radius;
    expect(node, "tokens.dimension.radius is missing").toBeDefined();
    expect(
      node?.$value,
      "tokens.dimension.radius.$value is missing"
    ).toBeDefined();
  });
});

// ─── Group 3 — HSL format on all color tokens ────────────────────────────────

describe("Group 3 — HSL format on all color $type tokens", () => {
  const HSL_REGEX = /^hsl\(\d+(?:\.\d+)? \d+(?:\.\d+)?% \d+(?:\.\d+)?%\)$/;
  const HEX_REGEX = /^#[0-9a-fA-F]{3,8}$/;

  it("all color tokens use hsl() space-separated format", () => {
    const nonHsl = COLOR_LEAVES.filter(
      (l) => typeof l.value === "string" && !HSL_REGEX.test(l.value as string)
    );
    expect(
      nonHsl.map((l) => `${l.path}: ${String(l.value)}`),
      "Color tokens not matching hsl(H S% L%) format"
    ).toHaveLength(0);
  });

  it("no color token uses a bare hex value", () => {
    const hexValues = COLOR_LEAVES.filter(
      (l) => typeof l.value === "string" && HEX_REGEX.test(l.value as string)
    );
    expect(
      hexValues.map((l) => `${l.path}: ${String(l.value)}`),
      "Color tokens using hex values (should be hsl)"
    ).toHaveLength(0);
  });
});

// ─── Group 4 — Token count regression guard ──────────────────────────────────

describe("Group 4 — Token count regression guard", () => {
  const BASELINE_LEAF_COUNT = 146;
  const EXPECTED_MIN_COUNT = BASELINE_LEAF_COUNT - 5;

  it(`total leaf token count (current: ${LEAF_COUNT}) stays above regression threshold (${EXPECTED_MIN_COUNT})`, () => {
    expect(LEAF_COUNT).toBeGreaterThan(EXPECTED_MIN_COUNT);
  });
});
