# democrito Testing Session — 2026-05-13

> **Purpose:** Complete record of the AI integration testing session. Covers all use cases tested, findings, fixes shipped, and instruction packs produced. Use this as the source of truth for what was validated and what remains.

---

## Session scope

Testing democrito's full adoption surface — from first install to Claude AI integration — across every realistic user path: terminal, Claude Code, Claude.ai chat, Cowork, and fork/customization. Every test was run against real tools with real output, not simulated.

---

## What was fixed (shipped to main via PR)

### 1. Registry install path — three root causes fixed

The primary adopter path (`npx shadcn@latest add ...`) was broken. Three root causes identified and fixed:

| Root cause | Fix |
|---|---|
| `registry.json` uses `items[]` wrapper — CLI expects flat item at root | Created `public/r/democrito.json` as individual registry item file |
| `cssVars.light` slot had `.light` theme values instead of warm/default | Replaced all `cssVars.light` values with warm theme values |
| Third `.light` theme class not installed by CLI | Added `.light { }` block to the `css` field of the registry item |
| `utils.ts` written to literal `@/lib/utils.ts` path | Added inline `content` to utils.ts file entry; fixed root `tsconfig.json` |
| Install URL pointed to `registry.json` (index) not item file | Updated to `https://democrito.design/r/democrito.json` across all surfaces |

**Updated install command (canonical):**
```bash
npx shadcn@latest add https://democrito.design/r/democrito.json
```

### 2. Missing radius tokens

`--radius-xl/2xl/3xl/4xl` were absent from the registry. shadcn's `radix-nova` style uses `rounded-xl` on card components — without the token, `--radius` overrides had no effect on cards.

Added to `src/index.css` (@theme), `public/r/democrito.json`, and `registry.json`:
```css
--radius-xl:  calc(var(--radius) * 1.33);
--radius-2xl: calc(var(--radius) * 1.67);
--radius-3xl: calc(var(--radius) * 2);
--radius-4xl: calc(var(--radius) * 2.67);
```

### 3. CSS duplication after install

The shadcn CLI appends content to `src/index.css` during install, creating duplicate `@theme inline` and `:root` blocks that conflict with democrito's existing CSS. Discovered during UC-01 (white background instead of warm stone).

**Fix:** Truncate `src/index.css` to 244 lines after install:
```bash
# In Claude Code or terminal, after npx shadcn add:
head -244 src/index.css > /tmp/clean.css && mv /tmp/clean.css src/index.css
```
Or ask Claude Code: *"In src/index.css, remove everything after line 244."*

### 4. Root tsconfig.json missing path aliases

shadcn CLI reads the **root** `tsconfig.json` for `@/` alias resolution, not `tsconfig.app.json`. Without `paths` in the root file, component files are written to a literal `@/` directory.

**Fix added to docs and quick-start guide:**
```json
// tsconfig.json (root)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

### 5. Font override documentation

Font tokens (`--font-display`, `--font-body`, `--font-mono`) cannot be overridden via `@layer base` — they are compiled into Tailwind's utility classes at build time. Added caveat to `docs/getting-started.md`.

**Correct override method:**
```css
/* Edit @theme block directly in index.css */
@theme {
  --font-display: "Your Font", sans-serif;
}
```

### 6. StatusBadge atom

New atom contributed during UC-08 testing. Pill badge with `status` prop: `draft | testing | production | archived`. Uses `--status-*` color tokens, `font-mono`. Exported from atoms barrel index.

---

## Use cases tested

### Group 1 — shadcn install + token foundation (UC-01 to UC-07)

All tested in a fresh `my-app` Vite project.

| UC | Test | Result | Notes |
|---|---|---|---|
| UC-01 | shadcn install + warm background | ✅ | CSS duplication fix required |
| UC-02 | Card component + surface hierarchy | ✅ | — |
| UC-03 | Theme switching (warm/dark/light) | ✅ | — |
| UC-04 | Accent color override via @layer base | ✅ | — |
| UC-05 | Font override | ⚠️ | @layer base doesn't work — needs @theme edit directly |
| UC-06 | Radius override | ✅ | rounded-xl bypassed token (now fixed with --radius-xl) |
| UC-07 | Background/surface override | ✅ | — |

**Instruction pack:** `docs/quick-start-designer.md`

---

### Group 2 — Claude Code contributor path (UC-08)

| UC | Test | Result | Notes |
|---|---|---|---|
| UC-08 | Build StatusBadge atom from CLAUDE.md context | ✅ | Read CLAUDE.md + DESIGN_SYSTEM.md, verified tokens, ran lint, flagged DS update |

**Key observation:** Claude Code read the context files before writing code, verified token existence, ran lint clean, and flagged a design system gap (VariableToken not in inventory) — all without prompting.

---

### Group 3 — Claude AI integration (UC-A1, UC-A2, UC-B1, UC-B2, UC-A3)

| UC | Test | Result | Notes |
|---|---|---|---|
| UC-A1 | Claude.ai chat — StatCard atom | ✅ | One debug correction needed (hardcoded Tailwind colors → semantic tokens) |
| UC-A2 | Cowork skill — 4-prompt scorecard | ✅ | 4/4 pass — token lookup, classification, surface hierarchy, font rule all correct |
| UC-B1 | Design spec — NotificationBanner organism | ✅ | Correct classification, full token mapping, accessibility notes, font assignments, composition |
| UC-B2 | Behaviour spec — Prompts Are Code | ✅ | Applied font-mono to variables independently, warning vs error distinction correct, flagged missing VariableToken atom |
| UC-A3 | Claude Code — external project (Orbit) | ✅ / ⚠️ | Token compliance perfect; launched from wrong directory (prompt-x not my-app) |

**Instruction pack:** `docs/use-cases-claude-ai.md`

**UC-B1 findings:** Claude correctly classified NotificationBanner as an organism (composed of atoms + layout logic), mapped all severity states to semantic tokens (`bg-info/10`, `text-warning` etc. — no hex), called out `font-mono` for embedded data/code in messages, and respected the three-surface hierarchy without introducing a fourth surface. Font-body for message text, font-display for action button label, role="alert" vs role="status" distinction applied correctly by severity level.

---

## Key findings and rules discovered

### Finding 1 — Claude defaults to Tailwind built-in colors for semantic states
**Trigger:** When asking for status/sentiment colors without specifying tokens.
**Violation:** `text-green-600`, `text-red-500`, `bg-yellow-100`
**Fix:** Add to opening context: *"Semantic tokens: text-success, text-error, text-warning, text-info — never text-green-*, text-red-*, etc."*
**Debug prompt:** *"You used a hardcoded Tailwind color. democrito has semantic tokens for this: text-success, text-error, text-warning, text-info. Update every hardcoded color to use the correct semantic token."*

### Finding 2 — Claude adds dark: overrides at component level
**Trigger:** Multi-state components (filled/empty, active/inactive).
**Violation:** `dark:text-green-400`, `dark:bg-gray-800`
**Fix:** Add to context: *"Semantic tokens handle dark/light/warm theming internally — never add dark: overrides at component level."*
**Debug prompt:** *"Remove all dark: prefixes. democrito's semantic tokens adapt automatically across all three themes."*

### Finding 3 — Claude Code reads CLAUDE.md from launch directory
**Rule:** `cd` into the project before typing `claude`. Claude Code auto-reads the CLAUDE.md in the current directory.
**Failure mode:** If Claude Code is already open in another project (e.g. prompt-x), it reads that project's CLAUDE.md instead.
**Instruction:** Always confirm launch directory before running Claude Code prompts.

### Finding 4 — Font tokens are compiled static, not runtime-overridable
**Rule:** `--font-display`, `--font-body`, `--font-mono` in `@theme` generate static utility classes. Overriding the CSS var in `:root` has no effect.
**Correct method:** Edit the `@theme { }` block in `index.css` directly.

### Finding 5 — shadcn CLI appends duplicate CSS after install
**Trigger:** Running `npx shadcn@latest add` on a project that already has CSS in `src/index.css`.
**Effect:** Duplicate `@theme inline` and `:root` blocks create conflicting token definitions, causing white background.
**Fix:** Remove appended content (lines 245+) after install.

### Finding 7 — Same-surface-on-same-surface anti-pattern (UC-A2, Prompt 3)
**Trigger:** Designing a data table inside a modal dialog.
**Violation:** Using `bg-card` for the table container inside a `bg-card` modal — same surface on same surface collapses the visual hierarchy.
**Fix:** Use `bg-surface` inside a `bg-card` modal. Surface recedes, maintaining depth. Card is already the elevated layer — don't stack it.
**Rule:** The three-surface hierarchy goes background → surface → card (deepest). Inside a card, step back to surface to create internal depth.

### Finding 10 — Font changes require @theme + @import, not just context files (UC-C1/C2 simulation)
**Trigger:** Customizing fonts in a democrito fork.
**Violation:** Updating font names in CLAUDE.md and DESIGN_SYSTEM.md but not updating `src/index.css`. The old fonts (Plus Jakarta Sans, Satoshi) continue to render because the @import URLs and @theme font values are unchanged.
**Fix:** Three things must change in `src/index.css` for fonts to actually update:
1. Replace `@import` lines at the top with the new font URLs
2. Update `--font-display` and `--font-body` in the `@theme { }` block
3. If a font is a system font (e.g. Inter), remove its @import line — it doesn't need one
**Why @theme, not :root:** Tailwind v4 compiles `font-display`, `font-body`, `font-mono` utility classes from `@theme` at build time. Overriding the CSS variable in `:root` has no effect on those compiled utilities. This is the same constraint as Finding 4 (font override silent failure, UC-05).

### Finding 9 — Fork customization: accent has 5 linked tokens, not 1 (UC-C1 simulation)
**Trigger:** Step 4 of UC-C1 — updating the accent color in src/index.css warm theme.
**Violation:** Replacing only `--accent` leaves focus rings and sidebar active state in the old accent hue (terracotta), because `--ring`, `--sidebar-primary`, and `--sidebar-ring` are all set to the same HSL as `--accent`.
**Fix:** When replacing accent, update all five in sync: `--accent`, `--accent-muted`, `--ring`, `--sidebar-primary`, `--sidebar-ring`.
**Rule:** In democrito's warm theme, the accent hue propagates to 5 tokens. Always replace as a group.

### Finding 8 — font-mono must not split within a single data field (UC-A2, Prompt 4)
**Trigger:** Displaying a partially masked API key (`sk-...•••••••xyz`).
**Violation:** Rendering the visible prefix in `font-mono` and the masked characters in `font-body` (or vice versa).
**Fix:** The entire field — including masked characters — stays `font-mono`. Never split font treatment within a single data field.

### Finding 6 — Registry index vs registry item file
**Rule:** `registry.json` is a registry INDEX (has `items[]` wrapper). The CLI expects a flat ITEM file (no wrapper, `type` at root).
**Fix:** Serve the individual item at `/r/democrito.json` — not `registry.json` directly.

---

## Instruction packs produced

| Document | Covers | Audience |
|---|---|---|
| `docs/quick-start-designer.md` | Terminal install → shadcn → democrito → token customization | Designers, non-developers |
| `docs/use-cases-claude-ai.md` | Claude.ai chat, Cowork, Claude Code (external), design specs, fork | All users |
| `docs/testing-session-2026-05-13.md` | This document — full session record | Internal |

---

## Orbit sandbox project (template for UC-A3)

A fake project was created at `~/my-app/` to test the Claude Code external path. It can serve as a reusable template for onboarding users into the Claude Code workflow.

**Files created:**

`CLAUDE.md` — Orbit project rules, democrito token reference, Orbit-specific conventions (prompt lifecycle, variable chip tokens, font-mono rules)

`src/types/orbit.ts` — TypeScript types: `PromptStatus`, `Variable`, `Prompt`, `Run`

`src/data/mock.ts` — 4 prompts (one per status) + 4 runs with realistic data including variable bindings and timestamps

`src/App.tsx` — Minimal shell showing Orbit header + democrito active confirmation

**Key rule for Claude Code users:** Always `cd my-app && claude` — launch from the project root so Claude Code auto-reads the correct CLAUDE.md.

**Components built by Claude Code during testing:**
- `VariableChip` atom — inline `{{variable}}` chip, empty/filled variants, warning/accent tokens
- `StatusBadge` atom — status lifecycle badge, status-* tokens, font-mono
- `PromptCard` molecule — bg-card, font-display name, font-body description, font-mono meta row

---

## All use cases completed

All 7 use cases tested or validated via simulation. Final status:

| UC | Test | Result |
|---|---|---|
| UC-A1 | Claude chat — StatCard atom | ✅ |
| UC-A2 | Cowork skill — 4-prompt scorecard | ✅ |
| UC-A3 | Claude Code — external CLAUDE.md | ✅ / ⚠️ |
| UC-B1 | Design spec — NotificationBanner | ✅ |
| UC-B2 | Behaviour spec — Prompts Are Code | ✅ |
| UC-C1 | Fork + customize via terminal (simulation) | ✅ |
| UC-C2 | Fork + customize via Cowork (simulation) | ✅ |

**UC-C1 simulation:** Full end-to-end run in Cowork for brand "Stellar". Two bugs found and fixed: (1) Step 4 originally listed "replace all four" accent tokens but there are five (`--accent-muted` was missing); (2) font customization had no step — CLAUDE.md/DESIGN_SYSTEM.md updates don't change rendering without also updating @import URLs and @theme font values in src/index.css (Finding 9, Finding 10).

**UC-C2 simulation:** Same Stellar brand via Cowork prompts. Two additional bugs fixed: (1) Prompt 3 example HSL values used dark-theme lightness (8%) instead of warm-theme lightness (91%+); (2) missing Prompt 3b for font updates. Prompt 4 expanded to verify @theme font values, not just CLAUDE.md.

---

## Files changed in this session (committed to feat/web-presentation-layer-v3.4, merged to main)

```
docs/getting-started.md           — font override caveat added
docs/quick-start-designer.md      — new
docs/use-cases-claude-ai.md       — new
docs/testing-session-2026-05-13.md — new (this file)
public/r/democrito.json           — new individual registry item
public/llms.txt                   — install URL updated
public/llms-full.txt              — install URL updated
registry.json                     — radius-xl tokens + cssVars.light fix
src/index.css                     — radius-xl/2xl/3xl/4xl added to @theme
src/components/atoms/StatusBadge.tsx — new atom
src/components/atoms/index.ts     — StatusBadge export added
src/components/organisms/ai/install-command.ts — URL updated
src/components/organisms/ai/EcosystemSection.tsx — URL updated
src/pages/UseCaseDetailPage.tsx   — URL updated
```

---

*Testing session log — democrito v3.2.x | 2026-05-13*
