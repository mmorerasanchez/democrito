# Deploy-Spec — Astro 5 Migration

> **Meta**
> - Project: democrito
> - Feature: Vite/React SPA → Astro 5 + React Islands migration
> - Risk level: High (architecture change, one-way door)
> - Date: 2026-04-17
> - Status: Draft
> - Source: ASTRO-MIGRATION-PLAN.md (repo root) — canonical
> - Change requests: CR-22 (plan), CR-33 (Phase 1 foundation)

---

## Summary

Migrate democrito from Vite 5 + React 18 + React Router 6 SPA to Astro 5
with React islands. This is a one-way door — Lovable is archived after
migration. The showcase becomes static HTML (zero JS by default), with React
islands for interactive components (theme toggle, component previews,
playground). The /app/* SPA routes remain as a full React island.

**Why Astro over Next.js:** democrito showcase is 95% static content. Astro
ships zero JS by default. LCP improves from ~2.5s → ~1.2s. Bundle drops from
~50 KB → <5 KB for showcase pages. Better Core Web Vitals = better SEO
foundation for the public site.

---

## Pre-Deploy Checklist

- [ ] `ASTRO-MIGRATION-PLAN.md` is read and understood — it has 12 sequential prompts
- [ ] Current Vite SPA is deployed and working at democrito.design (baseline)
- [ ] Git branch `feat/astro-migration` created from `main`
- [ ] Lovable project archived (no more Lovable edits after this point)
- [ ] All existing tests pass on `main` before starting

---

## Environment Configuration

### Dependencies to add

```json
{
  "astro": "^5.x",
  "@astrojs/react": "^4.x",
  "@astrojs/tailwind": "^6.x"
}
```

### Dependencies to remove

```json
{
  "react-router-dom": "remove",
  "vite": "remove (Astro uses Vite internally)",
  "@vitejs/plugin-react-swc": "remove",
  "lovable-tagger": "remove"
}
```

### Dependencies to keep

All React deps, Radix UI, shadcn/ui, lucide-react, recharts, Tailwind CSS,
PostCSS, autoprefixer.

### New configuration files

| File | Purpose |
|------|---------|
| `astro.config.mjs` | Astro config with React + Tailwind integrations |
| `src/layouts/ShowcaseLayout.astro` | Base layout for static showcase pages |
| `src/pages/*.astro` | File-based routing replaces React Router |
| `src/pages/app/[...slug].astro` | Catch-all for SPA routes (full React island) |

### Files to delete

| File | Reason |
|------|--------|
| `App.tsx` | Replaced by Astro file-based routing |
| `main.tsx` | Replaced by Astro entry point |
| `vite.config.ts` | Astro uses Vite internally |

### Files unchanged

| File | Note |
|------|------|
| `src/index.css` | Imported in Astro layout, no changes |
| `tailwind.config.ts` | Referenced in `astro.config.mjs`, no changes |
| All `src/components/**/*.tsx` | Stay as React, used as islands |
| `design-tokens.json` | Unchanged |

---

## Infrastructure Changes

### Hydration strategy

| Component type | Astro directive | Rationale |
|---------------|----------------|-----------|
| Showcase pages | Static `.astro` | Zero JS, fastest possible |
| Theme toggle | `client:load` | Must be interactive immediately |
| Component previews | `client:visible` | Lazy hydration, only when scrolled into view |
| /app/* SPA | `client:only="react"` | Full React app, no SSR needed |
| Toast/Tooltip providers | `client:load` | React context needed for interactivity |

### Vercel configuration

Update `vercel.json` to handle Astro's output:

```json
{
  "buildCommand": "astro build",
  "outputDirectory": "dist",
  "framework": "astro"
}
```

Astro generates static HTML + selective JS bundles. Vercel detects Astro
natively — the `@vercel/static-build` adapter is not needed for static output.

---

## Deployment Steps

### Phase 1 — Foundation (Prompts 1–4)

**Branch:** `feat/astro-migration`

1. **Prompt 1:** Initialize Astro project, migrate Tailwind config and tokens
2. **Prompt 2:** Create `ShowcaseLayout.astro` with three-surface hierarchy
3. **Prompt 3:** Migrate showcase pages batch 1 (tokens, atoms, molecules)
4. **Prompt 4:** Migrate showcase pages batch 2 (organisms, templates, pages)

**Verify after Phase 1:**
- `astro build` succeeds
- Tokens and themes work identically to Vite SPA
- Atom and molecule components render in all three themes

### Phase 2 — Islands + routing (Prompts 5–8)

5. **Prompt 5:** Theme provider as React island (`client:load`)
6. **Prompt 6:** /app catch-all route with `client:only="react"`
7. **Prompt 7:** NotFound + test pages
8. **Prompt 8:** Tailwind/CSS setup verification

**Verify after Phase 2:**
- Theme switching works across all pages
- /app/* SPA routes function identically to current
- No hydration mismatches in console

### Phase 3 — Pipeline + deploy (Prompts 9–12)

9. **Prompt 9:** Build pipeline (CI/CD)
10. **Prompt 10:** Test migration end-to-end
11. **Prompt 11:** Deploy to democrito.design
12. **Prompt 12:** Documentation updates

**Verify after Phase 3:**
- Deployed to democrito.design
- 301 redirect from Lovable URL → democrito.design
- All tests pass
- Docs updated

---

## Rollback Plan

**This is a one-way door for Lovable.** Rollback is to the Vite SPA, not to
Lovable.

| Scenario | Action |
|----------|--------|
| Build fails during migration | Stay on `main`, fix on the feature branch |
| Deploy fails | Revert Vercel to previous Vite deployment |
| Post-deploy regression | Revert Vercel to previous deployment, hotfix on branch |
| Fundamental Astro incompatibility | Abandon branch, stay on Vite SPA (not expected) |

**Rollback command:**
```bash
# Revert Vercel to previous deployment
vercel rollback --project democrito
```

**Recovery time:** < 5 minutes (Vercel instant rollback to previous deployment).

---

## Security Checklist

- [ ] No secrets in Astro config or static output
- [ ] `robots.txt` and `llms.txt` served correctly from Astro's `public/` dir
- [ ] Security headers still applied via `vercel.json` (X-Frame-Options, CSP, etc.)
- [ ] No source maps in production build
- [ ] All static pages pass Content Security Policy checks

---

## Monitoring

### Success criteria (post-deploy)

| Metric | Target | Current (Vite SPA) |
|--------|--------|--------------------|
| Showcase LCP | < 1.2s | ~2.5s |
| Showcase JS shipped | < 5 KB | ~50 KB |
| Build time | < 30s | ~15s |
| All tests pass | Yes | Yes |
| /app SPA functional | Same behaviour | Baseline |

### What to watch

- Core Web Vitals in Vercel Analytics (first 48 hours)
- Console errors on deployed site across all three themes
- Search Console for any indexing issues after URL structure change
- shadcn registry install still works from new URL

---

## Risk Mitigation

| Risk | Mitigation |
|------|-----------|
| Lovable incompatibility | One-way door accepted. Archive Lovable project |
| React Router links break | Find/replace `<Link to=` → `<a href=` in Astro pages |
| Theme context across islands | Use localStorage + custom event, not React context |
| shadcn/ui context (toast, tooltip) | Wrap each island individually or use Astro-native alternatives |
| Hydration mismatches | Test all islands, use `client:only` for browser-API components |

---

## Notion Status Sync

| Change request | Notion ID |
|---------------|-----------|
| Astro Migration Plan | `344887eb-6e4e-8117-83a0-d75e5decc0ec` |
| Phase 1 Foundation | `344887eb-6e4e-816d-87e6-f0b0e0ef693b` |

Set Status → **In progress** before starting Prompt 1.
Set Status → **Review** after creating the PR for each phase.
