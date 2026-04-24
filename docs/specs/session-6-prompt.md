# Session 6 — Quick Wins + Analytics — Claude Code Prompt

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Simple (4 independent tasks, no architectural decisions)
> - Version: 1.0
> - Status: Ready
> - Created: 2026-04-23

## Role

Act as a senior frontend engineer maintaining a React 18 + TypeScript + Vite
design system deployed on Vercel. You're doing a cleanup pass — small,
independent tasks that can each be committed separately.

## Context

democrito is live at democrito.design (Vercel, Hobby plan). Sessions 1–5
shipped 6 PRs covering metadata, AI bot files, /ai page, URL migration,
Claude Skill audit, and registry verification. This session handles the
remaining quick wins before the Tailwind v4 migration in Session 7.

## Codebase Orientation

- App entry: @src/App.tsx (React Router, ThemeProvider wraps everything)
- App mount: @src/main.tsx (createRoot, imports index.css)
- CSS tokens: @src/index.css (three theme blocks: `:root` / `.light` / `.warm`)
- Token spec: @design-tokens.json (W3C DTCG format)
- Existing tests: @src/__tests__/tokens.contract.test.ts (already written)
- Getting started: @docs/getting-started.md (v2 dual-audience, already replaced)
- README: @README.md (has 3 stale lovable.app URLs on lines 13, 190, 244)
- Package: @package.json (no @vercel/analytics or @vercel/speed-insights)

## Tasks

Complete these 4 tasks. Each gets its own commit. Create a single PR at the end.

---

### Task 1: Install Vercel Analytics + Speed Insights

**Why:** Vercel Production Checklist is at 2/5. Adding Analytics and Speed
Insights gets it to 4/5 — free on Hobby plan, zero config.

**Steps:**

1. Install packages:
   ```bash
   npm install @vercel/analytics @vercel/speed-insights
   ```

2. Add both components to `src/App.tsx`. Import at the top:
   ```typescript
   import { Analytics } from "@vercel/analytics/react";
   import { SpeedInsights } from "@vercel/speed-insights/react";
   ```

3. Place `<Analytics />` and `<SpeedInsights />` as siblings inside the
   outermost fragment of the `App` component, after `<BrowserRouter>`:
   ```tsx
   const App = () => (
     <QueryClientProvider client={queryClient}>
       <ThemeProvider>
         <TooltipProvider>
           <Toaster />
           <Sonner />
           <BrowserRouter>
             {/* ... Routes ... */}
           </BrowserRouter>
           <Analytics />
           <SpeedInsights />
         </TooltipProvider>
       </ThemeProvider>
     </QueryClientProvider>
   );
   ```

4. Verify `npm run build` succeeds with no errors.

**Commit message:** `feat(analytics): add Vercel Analytics + Speed Insights`

---

### Task 2: Verify token contract test passes

**Why:** P1.8 — the token contract test was written in Session 5 but we need
to confirm it passes and all token assertions hold.

**Steps:**

1. Run: `npm run test -- src/__tests__/tokens.contract.test.ts`
2. If all tests pass → no changes needed, just note it in the PR description
3. If any tests fail → fix the token name mapping or add missing CSS vars to
   `src/index.css` (do NOT modify the test to skip failures)

**Commit message:** (only if fixes needed) `fix(tokens): align CSS vars with design-tokens.json contract`

---

### Task 3: Fix remaining lovable.app URLs in README

**Why:** P1.4 — PR #5 did the bulk URL migration but missed 3 occurrences
in README.md.

**Steps:**

1. Replace all 3 remaining occurrences of `democrito-design-system.lovable.app`
   with `democrito.design` in README.md:
   - Line 13: Live Demo link
   - Line 190: SKILL.md reference URL
   - Line 244: Live Design System table entry

2. Also fix the URL format — use `https://democrito.design` (not `https://www.`)
   to match the canonical domain.

3. Search the entire repo for any other `lovable.app` references:
   ```bash
   grep -r "lovable.app" --include="*.md" --include="*.ts" --include="*.tsx" --include="*.json" .
   ```
   Fix any found, EXCEPT:
   - Files in `docs/specs/` (these are historical specs, leave as-is)
   - References to "Built with Lovable" attribution (keep those)

**Commit message:** `fix(docs): replace remaining lovable.app URLs with democrito.design`

---

### Task 4: Close getting-started v2 review

**Why:** CR #26 — the v2 dual-audience getting-started.md is already in
the repo (334 lines, covers both developer and contributor paths). Verify
it's accurate and close the CR.

**Steps:**

1. Read `docs/getting-started.md` and verify:
   - Install command references `democrito.design` (not lovable.app)
   - shadcn registry install command is present and correct
   - Claude Skill section mentions the correct install path
   - Three themes documented (dark, light, warm)
   - No broken internal links

2. If any links or commands are stale, fix them.

3. If everything checks out, no commit needed — just note it in the PR.

**Commit message:** (only if fixes needed) `fix(docs): update getting-started.md stale references`

---

## PR Template

Create a single PR with all commits:

```
feat: Session 6 — analytics, token test verification, URL cleanup

## Summary
- Add @vercel/analytics and @vercel/speed-insights to App.tsx
- Verify P1.8 token contract test passes (56 tests + token assertions)
- Fix 3 remaining lovable.app URLs in README.md
- Verify getting-started.md v2 is accurate and complete

## Notion Status Sync
- P1.4 (Fix URL inconsistency) → Done
- P1.8 (Token contract test) → Done (already written in S5, verified here)
- CR #26 (Replace getting-started v2) → Done
- New: Vercel Analytics + Speed Insights installed
```

## Constraints

- DO NOT modify `src/index.css` or `tailwind.config.ts`
- DO NOT touch the shadcn registry or Tailwind version — that's Session 7
- DO NOT modify files in `docs/specs/` (historical specs, leave as-is)
- DO NOT remove "Built with Lovable" attributions — only URL references
- Run `npm run lint` and `npm run build` before creating the PR
- If `npm run test` passes, include the test results in the PR description

## Notion Status Sync

| Change request | Notion ID | Current → Target |
|---------------|-----------|-----------------|
| P1.4 — Fix URL inconsistency | `341887eb-6e4e-8140-94b9-da2fa623c2d5` | Not started → Done |
| P1.8 — Token contract test | `341887eb-6e4e-81cf-b0c8-eb266b82ff98` | Not started → Done |
| CR #26 — Replace getting-started v2 | `344887eb-6e4e-81ae-808e-c9218cec3d11` | Review → Done |
