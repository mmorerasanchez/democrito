# Phase 2 — Define & extract the product seam

**Date:** 2026-06-16
**Repo audited:** `~/Desktop/apps/democrito/app-democrito` (public `democrito`, origin confirmed, on `main`)
**Distribution (locked):** shadcn registry + clone, **no npm**. Site consumes product via **git submodule**.
**Phase 2 rule:** additive/branching only — **no deletions from public `main`**. The clean structure is built in a working branch alongside the existing `src/`.
**Counts confirmed against tree:** 11 atoms / 17 molecules / 19 organisms / 7 templates / 48 ui = **102 components**.

---

## Headline findings (read first)

1. **🔴 The registry ships zero components.** `registry.json` has only **2 items**: `democrito` (`registry:base` — tokens + `cn` util) and `democrito-warm` (`registry:theme` alias). None of the 102 components are installable units. `npx shadcn add .../democrito.json` today installs *tokens and a theme*, not components. **This is the central 2.3 gap** — the registry contract must be built out before the throwaway-consumer proof (2.5) can pass.
2. **🟢 Components are overwhelmingly clean.** Of 102, the dominant coupling is the universal `@/lib/utils` (`cn`) import — which is a *legitimate* `registry:lib` dependency, not coupling. Cross-tier and `@/components/ui/*` imports are legitimate `registryDependencies`. There is **no showcase-chrome leakage** into atoms/molecules/organisms/ui.
3. **🟡 Exactly three real coupling cases**, all isolated and mechanical to fix: `Logo` (theme hook + bundled PNG assets), `AppShell` (imports `@/components/app/ThemeToggle` — showcase chrome path), and `CodeBlock` (needs `tokenizeBrackets` lib). Plus two `ui/` primitives needing hooks (`toaster`→`use-toast`, `sidebar`→`use-mobile`).
4. **🟢 No token violations.** The only hardcoded hex are false positives: `chart.tsx` `#ccc`/`#fff` target Recharts' internal SVG via selector strings (correct), and `OrganizationManager` hex are *data values* (a tag-color palette), not styling. All visual styling goes through CSS classes / `@theme` tokens.
5. **🟡 Stale registry metadata:** `registry.json` `meta.version` = `3.2.1` and one description still says `baseColor: stone` vs `components.json` `baseColor: slate`. Reconcile to 3.5.0 during 2.3.

---

## Task 2.1 — Locked product target structure

Built toward in the Phase-2 branch (verified against the real tree; divergences noted):

```
democrito/                      (public product)
├── README.md  LICENSE  CHANGELOG.md  CONTRIBUTING.md  CODE_OF_CONDUCT.md  SECURITY.md
├── CLAUDE.md  AGENTS.md  DESIGN.md          ← AI context (root)
├── registry.json                            ← shadcn manifest (rebuilt in 2.3)
├── components.json                          ← shadcn config (repoint css path → tokens/index.css)
├── tokens/
│   ├── index.css                            ← moved from src/index.css
│   └── design-tokens.json                   ← generated DTCG (moved from root)
├── registry/
│   ├── atoms/ molecules/ organisms/ templates/ ui/   ← decoupled component source
│   ├── lib/        ← utils.ts (cn), tokenizeBrackets.tsx        [genuine component deps only]
│   └── hooks/      ← use-theme.tsx, use-toast.ts, use-mobile.tsx [genuine component deps only]
├── docs/           ← ai/ guides/ components/ patterns/ + core refs
├── skill/democrito/
└── public/r/democrito.json                  ← built registry output (served on-domain)
```

**Divergences from the spec's 2.1 sketch (tree trusted):**
- The spec lists only `registry/lib/`. Reality needs a **`registry/hooks/`** too: `Logo`/`AppShell` depend on `use-theme`, `toaster` on `use-toast`, `sidebar` on `use-mobile`. These are genuine component deps. (`design-tokens.json` is currently at repo root, not nested — it moves into `tokens/`.)
- `src/lib/prototype-auth.ts` is **showcase-only** (imported by zero components) → does **not** enter `registry/`.
- `components.json` currently points `tailwind.css` at `src/index.css` → repoint to `tokens/index.css` in 2.4.
- Generators (`generate-counts.mjs`, `generate-tokens.mjs`) read `src/components/*` and `src/index.css` → repoint to `registry/*` and `tokens/index.css` in 2.4.

---

## Task 2.2 — Component coupling audit (all 102)

Classification: **clean** = only `cn`/Radix/lucide + legit tier deps · **needs-decoupling** = a dep to relocate but no showcase logic · **has-showcase-deps** = imports showcase chrome/assets/hooks that must be severed or relocated.

### Legend for "imports"
`cn` = `@/lib/utils` (→ `registry/lib/utils.ts`, the base dep every component already declares). `[ui:x]` = `@/components/ui/x` (→ `registryDependencies`). `[tier/X]` = cross-tier component (→ `registryDependencies`).

### Atoms (11)

| Component | Class | Imports beyond cn | Fix |
|---|---|---|---|
| Code | clean | — | none |
| CopyButton | clean | — | none |
| Heading | clean | — | none |
| Kbd | clean | — | none |
| Link | clean | — | none |
| Spinner | clean | — (exports Spinner, ThinkingDots) | none |
| StatusBadge | clean | — | none |
| Tag | clean | — | none |
| Text | clean | — | none |
| CodeBlock | needs-decoupling | `[atoms/CopyButton]`, `@/lib/tokenizeBrackets` | bring `tokenizeBrackets.tsx` into `registry/lib`; declare `CopyButton` as registryDependency |
| **Logo** | **has-showcase-deps** | `@/hooks/use-theme`, `@/assets/logo-dark.png`, `@/assets/logo-light-warm.png` | relocate `use-theme` → `registry/hooks`; bundle the two PNGs as registry `files` (type `registry:file`) OR make logo `src` a prop with sensible default. **Decision needed — see open items.** |

### Molecules (17) — all clean except as noted

| Component | Class | Imports beyond cn | Fix |
|---|---|---|---|
| BreadcrumbNav, DiffLine, FieldHeader, StatCard, TabNav, VariableHighlight | clean | — | none |
| ActivityFeedItem | clean | `[ui:badge]` | registryDep |
| AvatarGroup | clean | `[ui:avatar]` | registryDep |
| EmptyState | clean | `[ui:button]` | registryDep |
| FormField | clean | `[ui:label]` | registryDep |
| NavItem | clean | `[ui:badge]` | registryDep |
| ParameterControl | clean | `[ui:input,label,slider]` | registryDeps |
| RunHistoryItem | clean | `[ui:badge]` | registryDep |
| TokenCounter | clean | `[ui:progress]` | registryDep |
| TokenReferenceCard | clean | `[atoms barrel]`, `[ui:card]` | replace barrel `@/components/atoms` with explicit atom imports (see note); registryDeps |
| VariableEditorRow | clean | `[ui:button,input]` | registryDeps |
| SearchBar | clean | `[atoms barrel]`, `[ui:button,input]` | de-barrel; registryDeps |

### Organisms (19) — all clean except as noted

| Component | Class | Imports beyond cn | Fix |
|---|---|---|---|
| BulkActionsBar, DataTable, ExportMenu, ImportDialog, IntegrationCard, OnboardingWizard, UserMenu, APIDocPanel, APIKeyManager | clean | various `[ui:*]` | registryDeps only |
| ActivityFeed | clean | `[atoms barrel]`, `[ui:avatar]` | de-barrel; registryDeps |
| AuthForm | clean | `[atoms barrel]`, `[molecules/FormField]`, `[ui:button,input,separator]` | de-barrel; registryDeps. **Note:** does NOT import `prototype-auth` — clean. |

> **⚠️ Audit correction (2026-06-17):** `templates/AppShell.tsx` also imports **`react-router-dom`** (`Outlet, useNavigate, useLocation, useSearchParams`) — missed in the table below. It's the only component of the 102 that imports the router; it is a legitimate npm `dependency` on AppShell's registry item, not coupling to sever. See AppShell row in Templates.
| DashboardStats | clean | `[molecules/StatCard]` | registryDep |
| DataManager | clean | `[ui:button,checkbox,dialog,label]` | registryDeps |
| FilterBar | clean | `[molecules/SearchBar]`, `[ui:badge,button,select]` | registryDeps |
| RunHistory | clean | `[molecules/RunHistoryItem]`, `[ui:badge]` | registryDeps |
| SettingsNav | clean | `[molecules/TabNav]` | registryDep |
| SidebarNav | clean | `[atoms barrel]`, `[molecules/NavItem]`, `[ui:avatar,badge,button]` | de-barrel; registryDeps |
| TopBar | clean | `[atoms barrel]`, `[ui:button]` | de-barrel; registryDeps |
| **OrganizationManager** | clean | `[ui:badge,button,dialog,input,label,radio-group]` | registryDeps. Hardcoded hex are **data** (tag palette), not styling — **leave as-is**, optionally extract to a `defaultTagColors` const. |

### Templates (7)

| Component | Class | Imports beyond cn | Fix |
|---|---|---|---|
| ComparisonLayout, DashboardLayout, DetailLayout, EditorLayout, LibraryLayout | clean | — | none |
| TemplatePreview | clean | `[ui:button]` | registryDep |
| **AppShell** | **has-showcase-deps** | `@/components/app/ThemeToggle`, `[organisms/SidebarNav,TopBar]`, **`react-router-dom`** | (1) `ThemeToggle` → relocate into `registry/molecules/` (locked). (2) `react-router-dom` (`Outlet, useNavigate, useLocation, useSearchParams`) → legitimate npm dep, declare on AppShell's registry item, do NOT strip. (3) de-barrel SidebarNav/TopBar. |

### UI (48) — shadcn primitives

46 of 48 are **clean** (only `cn` + Radix + lucide, the standard shadcn shape). Two need hooks relocated:

| Component | Class | Extra dep | Fix |
|---|---|---|---|
| **sidebar** | needs-decoupling | `@/hooks/use-mobile` + `[ui:button,input,separator,sheet,skeleton,tooltip]` | bring `use-mobile.tsx` → `registry/hooks`; registryDeps |
| **toaster** | needs-decoupling | `@/hooks/use-toast` + `[ui:toast]` | bring `use-toast.ts` → `registry/hooks`; registryDep |
| chart | clean | `cn` (+ `#ccc` in Recharts selectors — not a token violation) | none |
| (other 45) | clean | `cn` / cross-ui | registryDeps where noted by scan |

### Summary

| Tier | Total | clean | needs-decoupling | has-showcase-deps |
|---|---|---|---|---|
| atoms | 11 | 9 | 1 (CodeBlock) | 1 (Logo) |
| molecules | 17 | 17 | 0 | 0 |
| organisms | 19 | 19 | 0 | 0 |
| templates | 7 | 6 | 0 | 1 (AppShell) |
| ui | 48 | 46 | 2 (sidebar, toaster) | 0 |
| **Total** | **102** | **97** | **3** | **2** |

**Cross-cutting fix — de-barrel:** several components import the tier barrel `@/components/atoms` (no specific file). Registry `files` must reference concrete paths, so during extraction replace barrel imports with explicit per-component imports (`@/components/atoms/Text` etc.). Affects: SearchBar, TokenReferenceCard, ActivityFeed, AuthForm, SidebarNav, TopBar.

---

## Task 2.3 — Registry contract (the must-fix)

**Current state:** `registry.json` → 2 items (base + theme), **0 components**. To make `npx shadcn add` work per-component, the manifest needs **one `registry:ui` item per installable component** (or curated bundles), each with correct `dependencies` / `registryDependencies` / `files`.

**Build rule per item:**
- `files`: the component's own `.tsx` (path under `registry/<tier>/`), plus any `registry/lib` or `registry/hooks` file only if not pulled via a registryDependency.
- `dependencies` (npm): Radix packages the file imports (`@radix-ui/react-*`), `lucide-react`, `class-variance-authority` where used, etc. — read from each file's imports.
- `registryDependencies`: every `@/components/ui/*` and cross-tier component it imports (e.g. `CodeBlock` → `["copy-button"]`; `AuthForm` → `["form-field","button","input","separator","text"]`).
- The base `cn`/`utils` stays the shared `registry:lib` dep.

**Also reconcile:** `meta.version` `3.2.1` → `3.5.0`; `baseColor` mismatch (`stone` in registry text vs `slate` in components.json) — pick one and align. Confirm final item count covers 102 components (or a documented curated subset) — the counts (11/17/19/7/48) must reflect reality.

> This is large but mechanical: the import scan above already yields each component's `registryDependencies`. A generator script (`scripts/build-registry.mjs`) that walks `registry/<tier>/*.tsx`, parses imports, and emits items is the right approach — propose it in 2.4 rather than hand-authoring 102 entries.

---

## Tasks 2.4 / 2.5 / 2.6 — handed off as Claude Code prompts

The git branch, structure build, throwaway-consumer proof, and submodule-seam doc are in the companion file **`PHASE-2-CLAUDE-CODE-PROMPTS.md`** (git stays in Claude Code, per workflow). 2.6 (submodule seam) is specified there as documentation only — implementation lands in Phase 5.

---

## Decisions locked (2026-06-16)

1. **Logo assets** → ✅ **`src` as prop with default.** Logo takes `logoSrc`/`logoDarkSrc` props; `useTheme` selects. No `@/assets` import — BYO-logo with a sensible default.
2. **ThemeToggle / AppShell** → ✅ **relocate `ThemeToggle` into `registry/molecules/`.** Ships a working theme switcher with `AppShell`. Adds one molecule to the registry set (intentional divergence from the 17 count — flagged in 2.4).
3. **Registry granularity** → ✅ **both.** 102 per-component items **plus** 5 curated tier bundles (`democrito-atoms/molecules/organisms/templates/ui`). Final manifest: 102 + 5 + 2 (base, theme) = **109 items**.

---

## Exit criteria status (Phase 2)

- ✅ Target structure locked (2.1), divergences noted (`registry/hooks` added, `prototype-auth` excluded)
- ✅ Per-component coupling audit complete — 97 clean / 3 needs-decoupling / 2 showcase-deps (2.2)
- 🔴 Registry contract: gap identified (0 components shipped today) + build rule specified (2.3) — **execution pending in 2.4**
- ⬜ Clean `tokens/`+`registry/` built additively in a branch (2.4) — Claude Code prompt provided
- ⬜ Throwaway-consumer proof (2.5) — Claude Code prompt provided; **the phase exit gate**
- ⬜ Submodule sync seam documented (2.6) — specified in prompts file
- ✅ Public `main` untouched (read-only audit; no writes to tracked source)
