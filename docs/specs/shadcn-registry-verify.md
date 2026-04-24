# shadcn Registry Verification — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.1
> - Status: Updated — Tailwind v4 migration required
> - Source: P3.3a (Done) + P3.3b (Done — static only) + Tailwind v4 compat
> - Prompt chain: 1 of 2 — next: tag-v3.1.0 (P3.4)
> - Created: 2026-04-17
> - Updated: 2026-04-23 — Tailwind v4 migration decision made

## Role

Act as a senior developer experienced with shadcn CLI v4, its `registry:base`
specification, and the npm/Vite/Tailwind ecosystem. You understand how
`registry.json` manifests work for custom component distribution and how to
verify an install end-to-end in a fresh project.

## Context

democrito is distributed as a shadcn registry entry — installable via
`npx shadcn@latest add`. P3.3a already authored the `registry.json` manifest
and updated `components.json`. This spec covers P3.3b: verifying the install
works end-to-end in a fresh project. Once verified, P3.4 tags v3.1.0 with
both the skill and registry.

## Codebase Orientation

- Registry manifest: @registry.json (repo root — created in P3.3a)
- shadcn config: @components.json (updated in P3.3a)
- CSS tokens source: @src/index.css (what the registry should install)
- Tailwind config: @tailwind.config.ts (what the registry should install)
- Utilities: @src/lib/utils.ts (base utilities the system depends on)
- README install section: @README.md (added in P3.3a)

## Task

Verify that the democrito shadcn registry manifest produces a working install
in a fresh Vite + React + Tailwind project, fix any issues found, and confirm
the registry is ready for the v3.1.0 tag.

## Steps

1. Create a fresh Vite + React + TypeScript project in `/tmp/test-democrito`
2. Initialize Tailwind CSS and shadcn in the test project
3. Install democrito from the local `registry.json`
4. Verify tokens are present in the test project's CSS
5. Verify a test component using democrito tokens renders correctly
6. If install fails, diagnose and fix `registry.json` in the democrito repo
7. Document the verified install command for the README

## Instructions

### Test project setup

1. Create a fresh project:
   ```bash
   cd /tmp && rm -rf test-democrito
   npm create vite@latest test-democrito -- --template react-ts
   cd test-democrito && npm install
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   npx shadcn@latest init
   ```

### Install verification

2. Install democrito from the local registry:
   ```bash
   npx shadcn@latest add [path-to-democrito-repo]/registry.json democrito
   ```
   If the install command syntax has changed in shadcn v4, check the docs first.

3. After install, verify the test project has:
   - CSS custom properties on `:root` matching democrito's token set
     (`--background`, `--surface`, `--card`, `--accent`, `--foreground`,
     `--foreground-muted`, `--foreground-subtle`)
   - Tailwind config extended with democrito's custom colours and fonts
   - Three theme definitions (dark, light, warm) accessible

### Rendering verification

4. Create a minimal test component in the test project that uses democrito tokens:
   ```tsx
   // src/TestDemocrito.tsx
   export function TestDemocrito() {
     return (
       <div className="bg-background min-h-screen p-8">
         <h1 className="font-display text-2xl text-foreground">
           democrito tokens working
         </h1>
         <div className="bg-surface rounded-lg p-4 mt-4">
           <p className="font-body text-foreground-muted">
             Surface container with muted text
           </p>
           <code className="font-mono text-accent text-sm">
             --accent token
           </code>
         </div>
         <div className="bg-card rounded-lg p-4 mt-4 border border-border">
           <p className="font-body text-foreground">
             Card container — highest surface level
           </p>
         </div>
       </div>
     );
   }
   ```

5. Run `npm run dev` and verify:
   - Page renders without console errors
   - Three-surface hierarchy is visually distinguishable
   - Font families load correctly (display, body, mono)
   - Accent colour renders correctly

### Warm theme verification

6. Switch to warm theme (apply the `.warm` class to `<html>`) and verify:
   - Earth tones replace the default dark palette
   - Accent terracotta is visible and distinguishable from surface tones
   - Text remains readable (contrast check)

### Fix and iterate

7. If the install fails or tokens are missing:
   - Check `registry.json` structure against shadcn v4 spec
   - Verify file paths in the manifest match actual repo paths
   - Fix in the democrito repo, re-run install, iterate
   - DO NOT modify the test project to work around manifest issues

### README update

8. After verification passes, update the install command in README.md if the
   exact syntax differs from what P3.3a wrote. The command must work with
   the published GitHub raw URL:
   ```bash
   npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito
   ```

## Tailwind v4 Migration (added 2026-04-23)

**Decision:** Migrate democrito from Tailwind v3.4 to Tailwind v4.

**Why:** Session 5 (PR #6) flagged a blocking compat issue — `shadcn@4.3.0`
requires Tailwind v4's CSS-first config. democrito is on `tailwindcss ^3.4.17`.
`shadcn init` refuses to validate a v3 `tailwind.config.ts`. This is not a
manifest bug — it's a real ecosystem requirement.

**What changes:**
1. Upgrade `tailwindcss` from `^3.4.17` to `^4.x` in `package.json`
2. Migrate from `tailwind.config.ts` (JS config) to CSS-first configuration
   in `src/index.css` using `@theme` directive
3. Remove `postcss` + `autoprefixer` (Tailwind v4 handles this internally)
4. Remove `@tailwindcss/typography` plugin (or replace with v4 equivalent)
5. Remove `tailwindcss-animate` (or replace with v4 equivalent)
6. Update `registry.json` to reference CSS-first config instead of
   `tailwind.config.ts`
7. Verify all existing components still render correctly in all three themes
8. Re-run end-to-end shadcn install verification in a fresh v4 project

**Risk:** Medium. Tailwind v4 changes the config model significantly. The
token system in `src/index.css` (CSS custom properties) stays the same —
only the Tailwind integration layer changes.

**Sequencing:** This migration MUST complete before P3.4 (tag v3.1.0). It
belongs in Session 7 as a dedicated migration session.

## Constraints

- DO NOT modify `src/index.css` or `tailwind.config.ts` to fix install issues — fix `registry.json` instead
- DO NOT install from npm — democrito is distributed via GitHub raw URL, not npm
- DO NOT skip the warm theme check — it's the most differentiated and easiest to break
- DO NOT leave the test project in `/tmp/` after verification — clean up
- DO NOT tag v3.1.0 in this spec — that's P3.4, a separate step after both
  skill and registry are verified
- If any requirement is unclear, ask before making changes

## Notion Status Sync

| Change request | Notion ID | Current status |
|---------------|-----------|----------------|
| P3.3a — Author registry manifest | `341887eb-6e4e-81e0-ae00-f947e818275b` | Done |
| P3.3b — Verify registry install | `341887eb-6e4e-8136-a9fc-deed94f86c81` | Done (static) |
| P3.4 — Tag v3.1.0 | `341887eb-6e4e-8172-87fb-c6c27cfe6637` | Blocked → In progress after TW v4 |

P3.3b static verification passed in Session 5. End-to-end install blocked by
Tailwind v3/v4 compat. Decision made 2026-04-23: migrate to Tailwind v4.
Re-run full verification after migration completes in Session 7.
