# Session 7 — Tailwind v4 Migration + Registry Verification — Claude Code Prompt

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard (config migration, no architectural changes)
> - Version: 1.0
> - Status: Ready
> - Source: Session 5 blocker (Tailwind v3/v4 compat) + P3.4
> - Decision: Migrate to Tailwind v4 (decided 2026-04-23)
> - Created: 2026-04-23

## Role

Act as a senior frontend engineer experienced with Tailwind CSS v3 → v4
migration, CSS-first configuration, and the shadcn CLI v4 ecosystem. You
understand how CSS custom properties map to Tailwind utility classes and how
shadcn's `registry:base` specification works with v4's `@theme` directive.

## Context

democrito is a design system on Tailwind v3.4.17. Session 5 discovered that
`shadcn@4.3.0` requires Tailwind v4's CSS-first config — `shadcn init`
refuses to validate a v3 `tailwind.config.ts`. This blocks P3.4 (tag v3.1.0
with public Claude Skill + shadcn registry).

**Decision:** Migrate to Tailwind v4. The token system (`src/index.css` CSS
custom properties) stays the same — only the Tailwind integration layer
changes.

## Codebase Orientation

- Tailwind config: @tailwind.config.ts (JS config — will be replaced)
- CSS tokens: @src/index.css (CSS custom properties — three theme blocks)
- PostCSS config: @postcss.config.js (will be removed)
- Package: @package.json (tailwindcss ^3.4.17, postcss, autoprefixer)
- Registry manifest: @registry.json (references tailwind.config.ts)
- shadcn config: @components.json
- All components: @src/components/ (use Tailwind utilities)
- Tailwind plugins: `tailwindcss-animate`, `@tailwindcss/typography`

## Task

Migrate democrito from Tailwind CSS v3.4 to v4, update the shadcn registry
manifest, verify all three themes render correctly, and run end-to-end
registry install verification. Tag v3.1.0 after verification passes.

## Steps

1. Upgrade Tailwind CSS to v4
2. Migrate `tailwind.config.ts` to CSS-first `@theme` in `src/index.css`
3. Remove deprecated dependencies
4. Update `registry.json` for v4 compatibility
5. Verify all components render in all three themes
6. Run end-to-end shadcn install verification
7. Tag v3.1.0

## Instructions

### Step 1: Upgrade Tailwind

1. Read the official Tailwind v4 migration guide before making changes:
   https://tailwindcss.com/docs/upgrade-guide
2. Install Tailwind v4:
   ```bash
   npm install tailwindcss@latest @tailwindcss/vite
   ```
3. Update `vite.config.ts` to use the Tailwind v4 Vite plugin:
   ```typescript
   import tailwindcss from "@tailwindcss/vite";
   // Add to plugins array
   ```

### Step 2: Migrate config to CSS-first

1. Read the current `tailwind.config.ts` to understand all custom extensions:
   - Custom colors (mapped from CSS variables)
   - Custom fonts (display, body, mono)
   - Custom spacing, border-radius, animations
   - Plugin configurations

2. Translate each extension to `@theme` directives in `src/index.css`:
   ```css
   @import "tailwindcss";

   @theme {
     --font-display: "Plus Jakarta Sans", sans-serif;
     --font-body: "Satoshi", sans-serif;
     --font-mono: "JetBrains Mono", monospace;
     /* ... map all custom values ... */
   }
   ```

3. The existing CSS custom properties (`:root`, `.light`, `.warm` blocks)
   stay EXACTLY as they are. These are the design tokens — they don't change.
   The `@theme` directive maps Tailwind utilities to these properties.

4. Delete `tailwind.config.ts` after migration is complete.

### Step 3: Remove deprecated dependencies

1. Remove from `package.json`:
   - `postcss` (Tailwind v4 handles internally)
   - `autoprefixer` (Tailwind v4 handles internally)
   - Check if `tailwindcss-animate` has a v4-compatible version — if not,
     migrate animations to native CSS or `@theme`
   - Check if `@tailwindcss/typography` has a v4-compatible version

2. Delete `postcss.config.js` if it exists.

3. Run `npm install` to clean up the lockfile.

### Step 4: Update registry.json

1. Remove the reference to `tailwind.config.ts` from `registry.json`
2. Update the registry to distribute the CSS-first config instead
3. Ensure the registry entry includes the `@theme` block or references
   the correct CSS file

### Step 5: Theme verification

1. Run `npm run dev` and visually check:
   - Dark theme (default): monochromatic stone palette, accent visible
   - Light theme: clean white, proper contrast
   - Warm theme: earth tones, Sanzo Wada palette, terracotta accent
2. Check all 7 showcase routes: `/`, `/tokens`, `/atoms`, `/molecules`,
   `/organisms`, `/templates`, `/pages`
3. Check the `/ai` page
4. Run `npm run lint` and `npm run test` — all must pass

### Step 6: End-to-end registry verification

Follow the steps from `docs/specs/shadcn-registry-verify.md`:

1. Create fresh project:
   ```bash
   cd /tmp && rm -rf test-democrito
   npm create vite@latest test-democrito -- --template react-ts
   cd test-democrito && npm install
   ```

2. Install Tailwind v4 in the test project:
   ```bash
   npm install tailwindcss@latest @tailwindcss/vite
   ```

3. Initialize shadcn:
   ```bash
   npx shadcn@latest init
   ```

4. Install democrito from local registry:
   ```bash
   npx shadcn@latest add ~/Desktop/apps/democrito/app-democrito/registry.json
   ```

5. Verify tokens present, test component renders, warm theme works.

6. Clean up: `rm -rf /tmp/test-democrito`

### Step 7: Tag v3.1.0

Only after Steps 5 and 6 both pass:

1. Update `CHANGELOG.md` with v3.1.0 entry:
   - Tailwind v4 migration
   - Public Claude Skill
   - shadcn registry entry
2. Create git tag: `git tag v3.1.0`
3. Push tag: `git push origin v3.1.0`

## PR Template

```
feat: Session 7 — Tailwind v4 migration + registry verification (P3.4)

## Summary
- Migrate Tailwind CSS from v3.4 to v4 (CSS-first config)
- Remove postcss + autoprefixer (handled by Tailwind v4)
- Update registry.json for v4 compatibility
- Verify end-to-end shadcn install in fresh v4 project
- All three themes verified (dark, light, warm)
- Tag v3.1.0 with Claude Skill + shadcn registry

## Breaking changes
- Tailwind config moved from tailwind.config.ts to CSS-first (@theme in index.css)
- postcss.config.js removed

## Notion Status Sync
- P3.4 (Tag v3.1.0) → Done
```

## Constraints

- DO NOT modify the CSS custom properties in `:root`, `.light`, or `.warm` —
  these are the design tokens, they stay exactly as they are
- DO NOT change any component's visual appearance — this is a config migration,
  not a redesign
- DO NOT remove the three-font typography rule (display, body, mono)
- DO NOT add a fourth theme
- DO NOT skip the warm theme check — it's the most differentiated and easiest
  to break
- DO NOT tag v3.1.0 until both theme verification AND registry install pass
- If the migration reveals components using deprecated Tailwind v3 classes,
  fix them inline — don't create a separate task
- If any requirement is unclear, ask before making changes

## Notion Status Sync

| Change request | Notion ID | Current → Target |
|---------------|-----------|-----------------|
| P3.4 — Tag v3.1.0 | `341887eb-6e4e-8172-87fb-c6c27cfe6637` | In progress → Done |

Set P3.4 Status → **In progress** before starting Step 1.
Set P3.4 Status → **Done** after v3.1.0 is tagged and pushed.
