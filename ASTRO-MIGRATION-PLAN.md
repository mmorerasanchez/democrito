# Democrito Astro Migration Plan

**Status:** Strategic Phase 5 Planning
**Domain:** democrito.design (301 redirect from democrito-design-system.lovable.app)
**Current Stack:** Vite 5 + React 18 + React Router 6 SPA
**Target Stack:** Astro 5 + React Islands + Tailwind CSS
**Version:** 1.0
**Created:** 2026-04-16

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Decision Rationale: Why Astro 5 Over Next.js 15](#decision-rationale)
3. [Architecture Overview](#architecture-overview)
4. [File-by-File Migration Map](#file-by-file-migration-map)
5. [Static vs. Hydrated Components](#static-vs-hydrated-components)
6. [Dependency Changes](#dependency-changes)
7. [Implementation Phases](#implementation-phases)
8. [Step-by-Step Migration Prompts](#step-by-step-migration-prompts)
9. [Risk Mitigation](#risk-mitigation)
10. [Success Criteria](#success-criteria)

---

## Executive Summary

This plan outlines the migration of democrito (a design system showcase + collaborative prompt editor) from Vite/React to **Astro 5**, enabling:

- **Zero-JS showcase pages** by default (/, /tokens, /atoms, /molecules, etc.) → static HTML with interactive React islands
- **Superior Core Web Vitals** through static-first rendering and lazy hydration
- **Hybrid rendering** for the /app/* SPA (dashboard, library, editor) — either as a full React island or a separate build artifact
- **Preserved component library** — all React components stay as .tsx, used as Astro islands with `client:*` directives
- **Same design tokens** and styling system (Tailwind + custom color tokens)

**Key win:** Showcase pages become searchable, linkable, fast-loading static sites while interactive features hydrate on demand. This aligns with democrito's dual nature: public-facing design documentation + private collaborative tool.

---

## Decision Rationale: Why Astro 5 Over Next.js 15

### Comparison Matrix

| Criterion | Astro 5 | Next.js 15 |
|-----------|---------|-----------|
| **Default Output** | Static HTML (zero JS unless opted in) | Server-side rendered (always sends JS) |
| **Showcase Use Case** | Perfect: static pages by default | Good: SSR adds overhead for read-only pages |
| **Bundle Size (showcase pages)** | <5 KB (HTML + minimal CSS) | 50–200 KB (JS runtime + React) |
| **Core Web Vitals** | Excellent (LCP <1.2s typical) | Good (LCP 1.5–2s typical with streaming) |
| **Islands Architecture** | Native (client:* directives) | Via client components (more boilerplate) |
| **React Component Reuse** | Full (no changes needed) | Full (existing Next.js components) |
| **Build Complexity** | Simple (one build, static output) | Complex (edge functions, streaming, middleware) |
| **Deployment** | CDN-friendly (static files + API routes) | Requires Node.js or Edge Runtime |
| **Theme Toggle** | React island with localStorage | Built-in with middleware |
| **Tailwind Integration** | First-class via @astrojs/tailwind | Built-in, same setup |

### Why Astro Wins for Democrito

1. **Showcase-first architecture**: The primary use case is documentation. Static HTML is faster and more searchable than hydrated React.
2. **Zero JS by default**: Showcase pages (/, /tokens, /atoms) send zero JavaScript unless a component explicitly opts in with `client:load` or `client:visible`.
3. **Islands are opt-in**: Only the theme toggle and interactive component previews hydrate React. Everything else is static.
4. **Lower operational cost**: Static files on CDN vs. Node.js servers or Edge Functions.
5. **Parallel SPA support**: The /app/* section can run as a full React island or a separate build, decoupled from showcase rendering.
6. **Better SEO baseline**: Search engines can crawl static HTML without executing JavaScript.

---

## Architecture Overview

```
democrito/
├── src/
│   ├── pages/                      # Astro file-based routing
│   │   ├── index.astro             # / → home
│   │   ├── tokens.astro            # /tokens
│   │   ├── atoms.astro             # /atoms
│   │   ├── molecules.astro         # /molecules
│   │   ├── organisms.astro         # /organisms
│   │   ├── templates.astro         # /templates
│   │   ├── pages.astro             # /pages
│   │   ├── 404.astro               # /404
│   │   └── app/                    # /app/* routes (React SPA)
│   │       └── [...slug].astro     # Catch-all for /app/*
│   ├── layouts/
│   │   └── ShowcaseLayout.astro    # Wrapper for all showcase pages
│   ├── components/                 # React components (unchanged .tsx)
│   │   ├── atoms/
│   │   ├── molecules/
│   │   ├── organisms/
│   │   ├── templates/
│   │   ├── ui/                     # shadcn/ui components
│   │   ├── ShowcaseLayout.tsx      # Refactored as React component for island use
│   │   ├── ThemeToggle.tsx
│   │   ├── AppSidebar.tsx
│   │   └── ... (all existing)
│   ├── hooks/                      # React hooks (unchanged .tsx)
│   │   ├── use-theme.tsx           # Refactored for Astro context
│   │   └── ... (all existing)
│   ├── lib/                        # Utilities (unchanged .ts)
│   ├── data/                       # Data files (unchanged)
│   ├── assets/                     # Images, fonts, static files
│   ├── layouts.astro               # Global layout (optional, for shared head)
│   └── index.css                   # Same token definitions
├── public/                         # Static assets (unchanged)
├── astro.config.mjs                # Astro configuration
├── tailwind.config.ts              # Reused from Vite
├── tsconfig.json                   # Extended Astro defaults
├── package.json                    # Updated dependencies
└── ASTRO-MIGRATION-PLAN.md         # This file
```

### Key Structural Changes

1. **`src/pages/` replaces React Router routes**
   - Astro file-based routing removes the need for React Router
   - Each `.astro` page file maps to a URL: `src/pages/tokens.astro` → `/tokens`
   - Dynamic routes use `[param]` and `[...slug]` syntax

2. **`src/layouts/` wraps common page structure**
   - `ShowcaseLayout.astro` provides header, sidebar, theme toggle for all showcase pages
   - Layout components are `.astro`, not React

3. **React components stay in `src/components/`**
   - No renaming or structural changes
   - Referenced in Astro pages via import and `client:*` directives

4. **`src/hooks/` stays for React island use**
   - Hooks like `use-theme` become React islands with `client:load`
   - No build-time execution; runs in the browser

---

## File-by-File Migration Map

### Pages & Routing

| Current File | Current Purpose | Astro Migration |
|--------------|-----------------|-----------------|
| `src/App.tsx` | React Router root + provider setup | Delete; split into Astro pages + `astro.config.mjs` |
| `src/main.tsx` | React entry point | Delete; Astro uses its own entry |
| `src/pages/OverviewPage.tsx` | / route content | Migrate to `src/pages/index.astro` |
| `src/pages/TokensPage.tsx` | /tokens route content | Migrate to `src/pages/tokens.astro` |
| `src/pages/AtomsPage.tsx` | /atoms route content | Migrate to `src/pages/atoms.astro` |
| `src/pages/MoleculesPage.tsx` | /molecules route content | Migrate to `src/pages/molecules.astro` |
| `src/pages/OrganismsPage.tsx` | /organisms route content | Migrate to `src/pages/organisms.astro` |
| `src/pages/TemplatesPage.tsx` | /templates route content | Migrate to `src/pages/templates.astro` |
| `src/pages/PagesPage.tsx` | /pages route content | Migrate to `src/pages/pages.astro` |
| `src/pages/NotFound.tsx` | 404 page | Migrate to `src/pages/404.astro` |
| `src/pages/TokenSmokeTest.tsx` | /test/tokens route | Migrate to `src/pages/test/tokens.astro` |
| `src/pages/DashboardPage.tsx` | /app dashboard | Part of `/app` island (see below) |
| `src/pages/LibraryPage.tsx` | /app library | Part of `/app` island |
| `src/pages/AIDesignerPage.tsx` | /app ai-designer | Part of `/app` island |
| `src/pages/SettingsPage.tsx` | /app settings | Part of `/app` island |
| `src/pages/OnboardingPage.tsx` | /app/welcome | Part of `/app` island |
| `src/pages/PromptEditorPage.tsx` | /app/library/:id/edit | Part of `/app` island |
| `src/pages/PromptDetailPage.tsx` | /app/library/:id | Part of `/app` island |

### Layouts & Components

| Current File | Current Purpose | Astro Migration |
|--------------|-----------------|-----------------|
| `src/components/ShowcaseLayout.tsx` | React layout wrapper for showcase | **Refactor**: Keep as React component, wrap showcase pages in Astro layout |
| `src/components/ThemeToggle.tsx` | Theme switcher UI | Keep `.tsx`, hydrate as `client:load` island |
| `src/components/AppSidebar.tsx` | Sidebar navigation | Keep `.tsx`, use in layout |
| `src/components/NavLink.tsx` | Router link wrapper | Convert to `<a>` tags in Astro pages |
| `src/components/ProtectedGate.tsx` | Auth guard for /app | Keep `.tsx` for /app island |
| `src/components/atoms/*` | Design tokens showcase | Keep `.tsx`, use in showcase pages |
| `src/components/molecules/*` | Component library tier 1 | Keep `.tsx`, use as islands |
| `src/components/organisms/*` | Component library tier 2 | Keep `.tsx`, use as islands |
| `src/components/templates/*` | Component library tier 3 | Keep `.tsx`, use as islands |
| `src/components/ui/*` | shadcn/ui components | Keep `.tsx`, use via islands |

### Utilities & Configuration

| Current File | Current Purpose | Astro Migration |
|--------------|-----------------|-----------------|
| `src/hooks/use-theme.tsx` | Theme context + provider | Refactor: Extract context logic into a React island; keep hook for island use |
| `src/lib/*` | Utility functions | Keep unchanged (`.ts` files work in Astro) |
| `src/data/*` | Static data files | Keep unchanged |
| `src/assets/*` | Images, fonts, static files | Move to `public/` if not imported; keep in `src/assets/` if imported in components |
| `src/index.css` | Token definitions + Tailwind | Keep, import in Astro layout |
| `tailwind.config.ts` | Tailwind configuration | Keep, reference in `astro.config.mjs` |
| `package.json` | Dependencies | Update (see below) |
| `vite.config.ts` | Vite configuration | **Delete**; Astro has built-in Vite |

### Build & Config Files

| Current File | Astro Equivalent | Action |
|--------------|-----------------|--------|
| `vite.config.ts` | N/A (Astro uses internal Vite) | Delete |
| `index.html` | N/A (Astro generates) | Delete |
| N/A | `astro.config.mjs` | **Create** — main Astro configuration |
| N/A | `src/env.d.ts` | **Create** — TypeScript environment types |
| `tsconfig.json` | Extend Astro defaults | Update |

---

## Static vs. Hydrated Components

### Static Astro Pages (Zero JS by Default)

These pages are **rendered at build time** to static HTML. No JavaScript executes on page load.

```
src/pages/
├── index.astro          # / — Home (static HTML only)
├── tokens.astro         # /tokens — Token showcase
├── atoms.astro          # /atoms — Component library
├── molecules.astro      # /molecules
├── organisms.astro      # /organisms
├── templates.astro      # /templates
├── pages.astro          # /pages
└── 404.astro            # /404
```

**Each page:**
- Imports and renders React components **at build time** (SSG)
- No JavaScript bundle sent to the browser (unless a component uses `client:*`)
- Fully searchable by search engines
- Fast first contentful paint (FCP) and largest contentful paint (LCP)

**Example: `src/pages/atoms.astro`**
```astro
---
import ShowcaseLayout from '@/layouts/ShowcaseLayout.astro';
import AtomsPage from '@/components/pages/AtomsPage.tsx';

export const prerender = true; // Explicit: render at build time
---

<ShowcaseLayout title="Atoms">
  <AtomsPage client:never /> {/* Static render; no hydration */}
</ShowcaseLayout>
```

### Interactive Islands (Hydrated React)

Components that need interactivity use `client:*` directives to hydrate React in the browser.

#### Theme Toggle (client:load)

The theme switcher must hydrate **immediately** on page load to prevent flash of wrong theme.

```astro
---
import ThemeToggle from '@/components/ThemeToggle.tsx';
---

<ThemeToggle client:load /> {/* Hydrate immediately on page load */}
```

#### Interactive Component Previews (client:visible)

Component showcases with live editing or interactive states hydrate **when scrolled into view**.

```astro
---
import ButtonShowcase from '@/components/molecules/ButtonShowcase.tsx';
---

<ButtonShowcase client:visible /> {/* Hydrate when visible */}
```

#### Context Providers (client:load)

React context providers (TooltipProvider, QueryClientProvider) are islands that wrap other islands:

```tsx
// src/components/Providers.tsx (React component)
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClientProvider } from '@tanstack/react-query';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider>
      <TooltipProvider>
        {children}
      </TooltipProvider>
    </QueryClientProvider>
  );
}
```

Used in Astro:
```astro
---
import Providers from '@/components/Providers.tsx';
---

<Providers client:load>
  <ComponentPreview />
</Providers>
```

### The /app/* SPA (Phase 2 Decision)

The `/app/*` section (dashboard, library, editor, settings) is a **full interactive SPA**. Two implementation paths:

#### Option A: React Island (Recommended for Phase 1)
- Create `src/pages/app/[...slug].astro` catch-all
- Render the entire App/AppShell component as a single `client:load` island
- Preserves all existing React Router logic and state management
- Lower migration risk; minimal code changes
- Trade-off: /app/* pages are not static; they're hydrated SPA pages

```astro
---
// src/pages/app/[...slug].astro
import App from '@/components/App.tsx'; // Full SPA component
export const prerender = false; // Dynamic routes
---

<App client:load />
```

#### Option B: Astro SSR + Hybrid (Recommended for Phase 2+)
- Keep `/app/*` as separate Astro SSR routes
- Each app page (dashboard, library, etc.) becomes an `.astro` file
- App shell, auth, and state are Astro-aware
- More work but better integration with Astro ecosystem
- Requires refactoring React Router to Astro routing for /app

For **Phase 1**, choose Option A (React Island) to minimize risk and maintain current functionality. Phase 2 can evaluate Option B for deeper integration.

---

## Dependency Changes

### Add (New)
```json
{
  "astro": "^5.0.0",
  "@astrojs/react": "^4.0.0",
  "@astrojs/tailwind": "^0.4.0",
  "@astrojs/sitemap": "^3.0.0",
  "@astrojs/partytown": "^2.0.0"
}
```

### Keep (Unchanged)
All React ecosystem libraries remain exactly as-is:
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "@radix-ui/*": "latest",
  "recharts": "^2.15.4",
  "sonner": "^1.7.4",
  "lucide-react": "^0.462.0",
  "tailwindcss": "^3.4.17",
  "zod": "^3.25.76"
}
```

### Remove
```json
{
  "vite": "^5.4.19",           // Astro has built-in Vite
  "react-router-dom": null,     // Only for showcase pages; /app uses React Router in island
  "@vitejs/plugin-react-swc": null  // Astro handles React via @astrojs/react
}
```

**Note on react-router-dom:** 
- If using Option A (/app as React island), keep `react-router-dom` for the island
- If using Option B (/app as Astro SSR), remove it entirely

### DevDependencies

Update test & build tools:
```json
{
  "typescript": "^5.8.3",        // Keep
  "eslint": "^9.32.0",           // Keep
  "@astrojs/check": "^0.9.0",    // Add: Astro-aware type checking
  "astro": "^5.0.0",             // Add: CLI for dev/build
  "playwright": "^1.59.1",        // Keep: visual tests still work
  "vitest": "^3.2.4"             // Keep: unit tests (Astro-compatible)
}
```

### Migration Dependency Update

1. **Remove:** `vite`, `@vitejs/plugin-react-swc`, `lovable-tagger` (incompatible with Astro)
2. **Add:** `astro`, `@astrojs/react`, `@astrojs/tailwind`
3. **Update:** Keep all React & design system dependencies unchanged
4. **Keep:** `react-router-dom` if using Option A for /app

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1–2)
1. Create `astro.config.mjs` and install dependencies
2. Migrate showcase pages (/, /tokens, /atoms, /molecules, /organisms, /templates, /pages)
3. Create `ShowcaseLayout.astro` and refactor React layout wrapper
4. Migrate theme provider to React island architecture
5. Update Tailwind configuration and CSS imports
6. Set up build pipeline (Astro build, deploy to CDN)
7. Verify all showcase pages render correctly
8. **Deployment:** Showcase pages live at democrito.design

### Phase 2: App Integration (Weeks 3–4)
1. Migrate /app/* using Option A (React SPA island) or Option B (Astro SSR)
2. Set up auth redirects and protected routes
3. Test full user flows (login, prompt creation, editing)
4. Migrate Playwright tests to Astro ecosystem
5. **Deployment:** Full app live at democrito.design/app

### Phase 3: Optimization (Week 5)
1. Run Lighthouse audit on all pages
2. Implement image optimization (@astrojs/image or native)
3. Set up analytics and monitoring
4. A/B test old Lovable URL redirect (301 to democrito.design)
5. Monitor bounce rates and engagement

### Phase 4: Hardening (Week 6)
1. Add security headers and CSP configuration
2. Set up automated visual regression tests
3. Document Astro setup for future maintainers
4. Archive Lovable project
5. Update internal docs and onboarding

---

## Step-by-Step Migration Prompts

Each prompt is self-contained and can be executed sequentially. Follow the same pattern as the democrito implementation plan (tasks in Notion @democrito changes).

### Prompt 1: Initialize Astro Project

**Goal:** Set up Astro 5 project structure and dependencies.

**Tool:** Claude Code (CLI commands)

**Context:**
- Current codebase: `/sessions/sweet-blissful-mayer/mnt/democrito/app-democrito/`
- Current package.json uses Vite 5 + React 18

**Requirements:**
1. Create `astro.config.mjs` with React integration and Tailwind
2. Create `src/env.d.ts` for TypeScript environment types
3. Update `package.json`: add astro, @astrojs/react, @astrojs/tailwind; remove vite, @vitejs/plugin-react-swc, lovable-tagger
4. Create empty `src/pages/` directory
5. Create empty `src/layouts/` directory
6. Verify `npm run build` works without errors
7. Verify `npm run dev` starts Astro dev server on port 8080

**Definition of Done:**
- `astro.config.mjs` exists and is valid
- `package.json` updated with Astro dependencies
- `npm install` succeeds
- `npm run dev` launches Astro dev server
- No TypeScript errors in IDE

---

### Prompt 2: Create ShowcaseLayout.astro

**Goal:** Build the Astro layout component wrapping all showcase pages.

**Tool:** Claude Code (file creation)

**Context:**
- Current layout: `src/components/ShowcaseLayout.tsx` (React component using React Router)
- Layout structure: sidebar, header (with theme toggle), main content area
- Tailwind classes are already defined and will continue to work
- Theme toggle is a React island that hydrates with `client:load`

**Requirements:**
1. Create `src/layouts/ShowcaseLayout.astro` with:
   - `<head>` section importing `src/index.css`
   - Sidebar (using React component: `<AppSidebar client:load />`)
   - Header with logo, title, and theme toggle
   - `<main>` with `<slot />` for page content
   - Same CSS classes and styling as current React layout
2. Keep `src/components/ShowcaseLayout.tsx` as a React component for potential re-use in islands
3. Update CSS imports to work in Astro context (use `import` statements, not `@import`)

**Definition of Done:**
- `src/layouts/ShowcaseLayout.astro` exists
- Sidebar renders without errors
- Theme toggle hydrates correctly
- CSS is applied and layout matches current design
- No layout shift when theme toggle renders

---

### Prompt 3: Migrate Showcase Pages (Part 1: /, /tokens, /atoms)

**Goal:** Convert React Router pages to Astro static pages.

**Tool:** Claude Code (file creation)

**Context:**
- Current pages: `src/pages/OverviewPage.tsx`, `src/pages/TokensPage.tsx`, `src/pages/AtomsPage.tsx`
- Each page is a React component that renders content within ShowcaseLayout (via React Router)
- No data fetching or dynamic routes; all data is static

**Requirements:**
1. Create `src/pages/index.astro` (/) that:
   - Imports `ShowcaseLayout` layout
   - Imports `OverviewPage` React component
   - Renders `<OverviewPage client:never />` (static, no hydration)
   - Sets page title in frontmatter
2. Create `src/pages/tokens.astro` (/tokens) — same pattern
3. Create `src/pages/atoms.astro` (/atoms) — same pattern
4. Verify each page builds and renders correctly
5. Check for any missing CSS or layout issues

**Definition of Done:**
- Three `.astro` files created: `src/pages/index.astro`, `src/pages/tokens.astro`, `src/pages/atoms.astro`
- Pages render without errors in dev server
- Navigation between pages works (static links, not React Router)
- CSS and layout match original design

---

### Prompt 4: Migrate Showcase Pages (Part 2: /molecules, /organisms, /templates, /pages)

**Goal:** Continue migrating remaining showcase pages.

**Tool:** Claude Code (file creation)

**Context:**
- Current pages: `src/pages/MoleculesPage.tsx`, `src/pages/OrganismsPage.tsx`, `src/pages/TemplatesPage.tsx`, `src/pages/PagesPage.tsx`
- Same pattern as Prompt 3

**Requirements:**
1. Create `src/pages/molecules.astro` (/molecules)
2. Create `src/pages/organisms.astro` (/organisms)
3. Create `src/pages/templates.astro` (/templates)
4. Create `src/pages/pages.astro` (/pages)
5. Verify all pages build and render
6. Test navigation between all showcase pages

**Definition of Done:**
- Four `.astro` files created
- All pages render correctly in dev server
- No broken links between pages
- CSS and layout consistent

---

### Prompt 5: Migrate Theme Provider to React Island

**Goal:** Refactor theme context and provider for Astro + React island architecture.

**Tool:** Claude Code (refactoring)

**Context:**
- Current: `src/hooks/use-theme.tsx` is a React context provider + hook
- In Astro: Context can't be passed between islands by default
- Solution: Make theme provider a React component island that wraps other islands and manages theme state

**Requirements:**
1. Create `src/components/ThemeProvider.tsx`:
   - Extract `ThemeProvider` and `ThemeContext` from `src/hooks/use-theme.tsx`
   - Make it a Client component that wraps children and hydrates with `client:load`
   - Manages localStorage and theme class on `<html>`
2. Keep `src/hooks/use-theme.tsx` hook for use within islands that need theme context
3. Update `src/layouts/ShowcaseLayout.astro`:
   - Wrap entire layout in `<ThemeProvider client:load>` (or just the theme toggle if possible)
   - Keep ThemeToggle component as separate island
4. Verify theme toggle works and persists theme across page reloads
5. Test all three themes (dark, light, warm)

**Definition of Done:**
- Theme provider island works correctly
- Theme toggle changes theme in real-time
- Theme persists in localStorage
- No flash of unstyled content (FOUC) on page load
- No prop-drilling needed between showcase pages

---

### Prompt 6: Create /app Catch-All Route (Phase 1: React Island)

**Goal:** Set up /app/* routing as a React SPA island for Phase 1.

**Tool:** Claude Code (file creation)

**Context:**
- Current: /app/* routes managed by React Router in `src/App.tsx`
- Phase 1 approach: Render entire App component as single React island
- This preserves all existing logic without major refactoring
- Trade-off: /app pages are not static; they're hydrated SPA pages (acceptable for Phase 1)

**Requirements:**
1. Create `src/pages/app/[...slug].astro`:
   - Catch-all route for /app/*
   - Imports full App component (or AppShell + ProtectedGate wrapper)
   - Renders with `client:load` directive
   - Sets `export const prerender = false` (dynamic routes)
   - Does NOT use ShowcaseLayout; is a standalone SPA page
2. Create `src/pages/app.astro` (optional):
   - Redirect /app to /app/ if needed
3. Verify /app/* routes are accessible from dev server
4. Test login flow, dashboard, library, and settings pages

**Definition of Done:**
- `/app/` route loads and renders AppShell
- Auth redirects work (ProtectedGate functions)
- React Router navigation within /app works
- Query client and other providers function correctly
- No console errors related to Astro/React integration

---

### Prompt 7: Create NotFound and Test Pages

**Goal:** Migrate 404 and test pages to Astro.

**Tool:** Claude Code (file creation)

**Context:**
- Current: `src/pages/NotFound.tsx`, `src/pages/TokenSmokeTest.tsx`
- 404 page uses special Astro naming convention: `src/pages/404.astro`
- Test page is accessible at `/test/tokens` route

**Requirements:**
1. Create `src/pages/404.astro`:
   - Renders NotFound component
   - Uses ShowcaseLayout or custom 404 layout
   - Astro automatically serves this for any 404 responses
2. Create `src/pages/test/tokens.astro` (/test/tokens):
   - Renders TokenSmokeTest component
   - Can be hidden or removed in production
3. Verify 404 page displays when accessing non-existent route
4. Verify /test/tokens is accessible

**Definition of Done:**
- 404 page displays on invalid routes
- Test page is accessible
- Both pages render without errors

---

### Prompt 8: Update Tailwind & CSS Setup

**Goal:** Ensure Tailwind and design tokens work in Astro build.

**Tool:** Claude Code (configuration update)

**Context:**
- Current: `tailwind.config.ts` and `src/index.css` with CSS token definitions
- Astro: Uses `@astrojs/tailwind` plugin for Tailwind integration
- No changes needed to config or token definitions; just need to verify Astro sees them

**Requirements:**
1. Verify `astro.config.mjs` includes `integrations: [tailwind()]`
2. Verify `tailwind.config.ts` content paths match Astro structure:
   ```ts
   content: [
     './src/**/*.{astro,tsx,ts}',  // Include .astro files
   ]
   ```
3. Verify `src/index.css` is imported in `src/layouts/ShowcaseLayout.astro`
4. Run `npm run build` and verify CSS is generated and minified correctly
5. Check built pages for correct color tokens and styles

**Definition of Done:**
- Tailwind classes work in `.astro` files
- CSS tokens (HSL variables) are applied correctly
- Build output includes minified CSS
- No missing styles or color mismatches

---

### Prompt 9: Set Up Build & Preview Pipeline

**Goal:** Create Astro build scripts and test production build.

**Tool:** Claude Code (package.json + build testing)

**Context:**
- Current: `npm run build` uses Vite
- Astro: Uses built-in `astro build` command
- Output: Static HTML files (by default) or hybrid with SSR config

**Requirements:**
1. Update `package.json` scripts:
   ```json
   {
     "dev": "astro dev",
     "build": "astro build",
     "preview": "astro preview",
     "check": "astro check",
     "lint": "eslint ."
   }
   ```
2. Run `npm run build` and verify:
   - Build completes without errors
   - `dist/` folder contains static HTML files for showcase pages
   - `dist/` contains hydrated pages for /app
   - Bundle size is reasonable (<5 MB total)
3. Run `npm run preview` and verify:
   - Production build serves locally
   - All pages load correctly
   - Navigation works
   - Theme toggle persists

**Definition of Done:**
- `npm run build` succeeds
- `npm run preview` starts successfully
- All pages accessible in preview mode
- No 404 errors or missing assets

---

### Prompt 10: Migrate & Update Tests

**Goal:** Update Playwright visual tests for Astro.

**Tool:** Claude Code (test migration)

**Context:**
- Current: Playwright visual tests in `src/__tests__/` and `playwright.config.ts`
- Astro: Same Playwright setup; just update base URL and test paths
- Visual regression tests should still work unchanged

**Requirements:**
1. Update `playwright.config.ts`:
   ```ts
   webServer: {
     command: 'npm run build && npm run preview',
     url: 'http://127.0.0.1:3000',
     reuseExistingServer: false,
   }
   ```
2. Verify all visual tests still pass:
   - `npm run test:visual` to run tests
   - Update snapshots if needed: `npm run test:visual:update`
3. If any tests fail, debug and fix selectors (Astro HTML structure may differ slightly)
4. Add a test for theme toggle (new feature in Astro)
5. Verify test coverage for all showcase pages and /app routes

**Definition of Done:**
- `npm run test:visual` passes
- Visual snapshots match design (or update snapshots if intentional changes)
- All pages have coverage
- No flaky tests

---

### Prompt 11: Deploy to democrito.design

**Goal:** Deploy Astro build to production domain.

**Tool:** Deployment platform (Vercel, Netlify, or CDN + API)

**Context:**
- Domain: democrito.design
- Current Lovable URL: democrito-design-system.lovable.app → set up 301 redirect
- Deployment: Static files + API routes for /app (if using Node.js) or full static (if using Option B)

**Requirements:**
1. Choose deployment platform (recommend Vercel or Netlify for Astro)
2. Set up deployment:
   - Connect repository
   - Set build command: `npm run build`
   - Set output directory: `dist/`
3. Configure custom domain: democrito.design
4. Set up 301 redirect from democrito-design-system.lovable.app:
   - In Lovable project settings or via DNS
5. Test production deployment:
   - Visit democrito.design
   - Verify all pages load
   - Test theme toggle and persistence
   - Test /app login flow
   - Check Core Web Vitals in Lighthouse
6. Monitor for errors and performance

**Definition of Done:**
- democrito.design is live and accessible
- All pages load and render correctly
- Theme toggle works in production
- /app auth flow works
- 301 redirect from Lovable URL works
- Lighthouse score is 90+ for Showcase pages

---

### Prompt 12: Documentation & Hand-Off

**Goal:** Document Astro setup and migration for future maintainers.

**Tool:** Documentation writer

**Context:**
- Audience: Future developers, design system maintainers, Lovable collaborators
- Current docs: `docs/` folder (check if exists)

**Requirements:**
1. Create `docs/ASTRO-SETUP.md`:
   - Astro project structure
   - Development workflow (dev server, hot reload)
   - Adding new showcase pages (how to create .astro files)
   - Adding React components (when to use `client:*` directives)
   - Build and deployment steps
2. Update main `README.md` to reference Astro setup
3. Document differences from React Router:
   - How file-based routing works
   - How to pass data to components (Astro frontmatter vs React props)
4. Add troubleshooting section:
   - Common Astro/React integration issues
   - Why theme toggle needs `client:load`
   - Why some components need islands
5. Add upgrade path for Phase 2 (Option B: full Astro SSR for /app)

**Definition of Done:**
- Setup docs are comprehensive and easy to follow
- New developers can understand project structure
- Maintenance and future migration path are clear

---

## Risk Mitigation

### 1. Lovable Compatibility (Critical)

**Risk:** Lovable won't recognize or support Astro projects. The lovable-tagger plugin won't work in Astro.

**Impact:** Cannot use Lovable for future iterations. This is a one-way door.

**Mitigation:**
- Archive the current Lovable project as a reference
- Document all custom logic and design tokens in code (this plan does that)
- After migration, use Claude Code exclusively for changes
- Keep a backup branch of the Vite/React version for 6 months (in case rollback is needed)

---

### 2. React Router Links → Astro Navigation

**Risk:** React Router `<Link>` components won't work; Astro uses file-based routing with `<a>` tags.

**Impact:** Broken navigation if not converted properly.

**Mitigation:**
- Replace all `<Link>` components with `<a>` tags in Astro pages
- In React islands, keep `<Link>` for internal navigation within islands (e.g., /app routes)
- Use href attributes relative to domain root: `href="/tokens"` not `href="tokens"`
- Test all navigation paths before deploying

---

### 3. Theme Provider & Context

**Risk:** React Context can't be shared directly between Astro islands. Theme state might not persist across page navigations.

**Impact:** Theme toggle works on one page but resets on another page.

**Mitigation:**
- Use localStorage as the single source of truth for theme (already done in current code)
- Create a client-side theme provider that hydrates from localStorage on page load
- Wrap theme toggle in its own island with `client:load` to ensure it runs first
- Store theme in `<html class="dark|light|warm">` so CSS can apply globally
- Test theme persistence manually and with Playwright

---

### 4. Component Hydration Mismatch

**Risk:** React component rendered at build time (SSG) may not match hydrated version on client, causing hydration mismatches.

**Impact:** Console warnings or visual glitches when React islands hydrate.

**Mitigation:**
- Use `client:never` for purely static components (no hydration needed)
- Use `client:load` for components that access localStorage or browser APIs
- Use `client:visible` for heavy components that can defer hydration
- Ensure server-rendered HTML matches client-side React output exactly
- Test in browser dev tools: check for hydration warnings

---

### 5. App SPA Integration (/app Routes)

**Risk:** Rendering the entire React app as a single island may cause issues with routing, state management, or auth.

**Impact:** /app routes don't load, auth doesn't work, state is lost on page navigation.

**Mitigation (Phase 1 - React Island):**
- Keep React Router and all state management unchanged
- Render entire App component with `client:load`
- Ensure QueryClientProvider and other providers are inside the island
- Test full user flows: login, create prompt, edit, delete, navigate
- Monitor performance: single island may be slower than static pages

**Mitigation (Phase 2 - Astro SSR):**
- Plan this refactoring separately after Phase 1 is stable
- Break /app routes into separate Astro pages
- Migrate auth to Astro-aware middleware or auth library (e.g., Astro Auth)
- Refactor React Router to Astro file-based routing
- More work, but better long-term maintainability

---

### 6. shadcn/ui Components with Context

**Risk:** shadcn/ui components that depend on context (Toast, Tooltip) might not work correctly if providers are in separate islands.

**Impact:** Toast notifications don't display, tooltips fail silently.

**Mitigation:**
- Create a `<Providers>` React component that wraps all context providers
- Use this single providers island in Astro layout or as a wrapper for other islands
- Ensure providers are hydrated first (top of layout with `client:load`)
- Test all shadcn components that use context before deploying

---

### 7. Build Size & Performance

**Risk:** Astro build might be larger than expected, or showcase pages might not be fully static.

**Impact:** Slower builds, larger deployments, worse Core Web Vitals.

**Mitigation:**
- Use `export const prerender = true` explicitly for all showcase pages
- Verify build output: check that showcase pages are `.html` files (not `.html.astro`)
- Run Lighthouse audit on production: target LCP <1.5s, CLS <0.1, FID <100ms
- Use `@astrojs/sitemap` to generate sitemap and verify all pages are crawlable
- Monitor build size: if >5MB, investigate unused dependencies

---

### 8. Browser Compatibility

**Risk:** Astro uses modern JavaScript syntax (ES2020+). Old browsers might not support it.

**Impact:** Some users see broken pages or console errors.

**Mitigation:**
- Target ES2020 or ES2022 (most users on modern browsers)
- Use polyfills only if needed (check browser usage stats)
- Test in target browsers (Chrome 90+, Firefox 88+, Safari 14+)
- Use Astro's built-in transpilation for older targets if needed

---

## Success Criteria

### Functional Requirements
- [ ] All showcase pages (/, /tokens, /atoms, /molecules, /organisms, /templates, /pages) are static HTML
- [ ] Theme toggle works and persists across page reloads
- [ ] All React components render correctly in Astro islands
- [ ] /app/* routes are accessible and functional
- [ ] Auth flow (login, logout, protected routes) works in /app
- [ ] Navigation between pages uses Astro routing (file-based)

### Performance Metrics
- [ ] Showcase pages: LCP <1.2s (was ~2.5s in React SPA)
- [ ] Showcase pages: CLS <0.1 (zero cumulative layout shift)
- [ ] Showcase pages: FID <100ms (first input delay)
- [ ] Bundle size for showcase pages: <5 KB (was ~50 KB in React SPA)
- [ ] /app page: LCP <2s (React island hydration time)
- [ ] Full build time: <2 minutes (on CI/CD)

### User Experience
- [ ] No flash of unstyled content (FOUC) on page load
- [ ] No theme flicker when toggling dark/light/warm
- [ ] Smooth navigation between pages
- [ ] Responsive design works on all breakpoints (mobile, tablet, desktop)
- [ ] All interactive components (dropdowns, modals, tabs) work correctly

### Technical Debt
- [ ] Codebase is documented with setup guide for future maintainers
- [ ] Tests pass: unit tests + visual regression tests
- [ ] TypeScript compilation is strict (no `any` types)
- [ ] No console errors or warnings in production
- [ ] Deployment is automated and repeatable

### Migration Completion
- [ ] Lovable project is archived or marked read-only
- [ ] 301 redirect from democrito-design-system.lovable.app → democrito.design is live
- [ ] Team is trained on Astro development workflow
- [ ] Phase 2 planning is documented in implementation plan (Notion)

---

## Appendix: Quick Reference

### Key Files to Delete
- `src/App.tsx`
- `src/main.tsx`
- `vite.config.ts`
- `index.html`

### Key Files to Create
- `astro.config.mjs`
- `src/env.d.ts`
- `src/pages/*.astro` (all showcase pages)
- `src/layouts/ShowcaseLayout.astro`

### Key Files to Refactor
- `src/components/ShowcaseLayout.tsx` (keep as React component, not layout)
- `src/hooks/use-theme.tsx` (extract to ThemeProvider.tsx)
- `package.json` (update dependencies, scripts)
- `tailwind.config.ts` (update content paths)

### Key Commands
```bash
npm install astro @astrojs/react @astrojs/tailwind
npm run dev        # Start Astro dev server
npm run build      # Build static site
npm run preview    # Preview production build
npm run test:visual # Run visual regression tests
```

### Astro Learning Resources
- [Astro Docs](https://docs.astro.build)
- [Astro + React Integration](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Islands Architecture](https://docs.astro.build/en/concepts/islands/)
- [Astro File-based Routing](https://docs.astro.build/en/guides/routing/)

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-16 | Initial comprehensive migration plan |

---

## Questions & Next Steps

**For Mariano (Project Owner):**
1. Confirm Phase 1 timeline (2 weeks) is acceptable
2. Choose Option A (React Island) or Option B (Astro SSR) for /app routes
3. Confirm democrito.design is secured and ready for DNS setup
4. Review risk mitigation strategies; any concerns?

**For Implementation:**
1. Start with Prompt 1 (Initialize Astro Project)
2. Follow prompts 2–12 in sequence
3. Each prompt is a self-contained task; pause between tasks for review
4. After Prompt 11, gather performance metrics and success criteria checklist

---

**Document created by:** Claude Code Agent
**Reviewed by:** N/A (awaiting stakeholder review)
**Status:** Ready for Implementation Planning
