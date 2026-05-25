# CLAUDE.md — AI Agent Context

> This file is auto-read by AI coding agents (Claude Code, Cursor, Windsurf, etc.)
> working with **democrito**, a general-purpose, themeable Atomic Design System for
> data-dense, IDE-inspired applications — dashboards, editors, AI tools, and internal
> platforms. It provides essential project context to produce consistent, on-system
> code from the first generation.

> **⚠️ Themeable system.** This is a general-purpose, brandable design system. Before
> using default token values, check `src/index.css` (the `@theme` block) for any
> custom theme overrides. The accent color, font families, radius, and surface palette
> may differ from the defaults documented below. See [`docs/theming.md`](docs/theming.md)
> for the full theming guide.

---

## Browser Baseline Target

This project targets Baseline 2024 (features interoperable across all major engines since January 2024). When suggesting APIs, CSS properties, or browser features, default to Baseline 2024 Widely Available or Newly Available. Flag anything Limited Availability explicitly before using it.

---

## Documentation Reading Order

Before working on any component, token, or layout task, read [`docs/ai-context.md`](docs/ai-context.md).
It defines the reading order, decision hierarchy, and known AI bias patterns for this system.

---

## Architecture — Atomic Design

The component library follows **Atomic Design** methodology with five levels:

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `src/components/atoms/` | Smallest building blocks — single-purpose, no child components | `Heading`, `Tag`, `Spinner`, `Code`, `CodeBlock`, `Kbd`, `Link`, `Logo`, `StatusBadge`, `Text` |
| **Molecules** | `src/components/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState` |
| **Organisms** | `src/components/organisms/` | Major UI sections, may include molecules | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm`, `SidebarNav`, `UserMenu` |
| **Templates** | `src/components/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout`, `DashboardLayout` |
| **Pages** | `src/pages/` | Route-level components that compose templates + organisms | `OverviewPage`, `AtomsPage`, `MoleculesPage`, `TokensPage`, `AiPage`, `ManifiestoPage` |

**UI Primitives** (`src/components/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

Each level has a barrel `index.ts` for re-exports. One component per file, PascalCase filenames.

---

## Design Tokens

> **Full reference:** [`docs/tokens.md`](docs/tokens.md) — colors, typography, spacing, radii, motion.

**Key behavioral rules:**
- All colors are HSL CSS custom properties in `src/index.css`, defined via CSS-first `@theme` in `src/index.css`
- Three themes: **Warm** (`:root`, default), **Dark** (`.dark`), **Light** (`.light`)
- 3-surface hierarchy: `--background` → `--surface` → `--card`
- 3-font system: `font-display` (headings), `font-body` (text), `font-mono` (data/code)
- Spacing base unit: 4px. Layout tokens: `--header-height`, `--sidebar-width`, `--sidebar-collapsed`, `--right-panel`
- Never hardcode hex/rgb — always use semantic token classes (`bg-surface`, `text-accent`, `border-border`)

---

## Rules

1. **Check existing atoms first** — before creating any new component, verify it doesn't already exist in `atoms/`, `molecules/`, or `ui/`.
2. **Always use design tokens** — never use magic numbers for colors, spacing, or radii. Use Tailwind classes mapped to CSS variables.
3. **TypeScript with proper prop types** — every component must define an explicit `interface` for its props with JSDoc descriptions.
4. **Follow existing naming conventions** — PascalCase filenames, one component per file, barrel `index.ts` exports.
5. **Use shadcn/ui primitives as the base** — extend via CVA variants in `ui/` components; compose them into atoms/molecules, never rebuild from scratch.
6. **User-editable content uses `font-mono`** — all code, data values, and user-generated content must use the mono font family.
7. **Three-theme compliance** — any new color token must be defined in all three themes (`:root` for warm default, `.dark`, `.light`) in `src/index.css`.
8. **Semantic color only** — use `bg-card`, `text-muted-foreground`, `border-border` etc. Never write `bg-gray-800` or `text-white`.
9. **Check for theme overrides** — before assuming default token values, verify the project's `src/index.css` `@theme` block for custom theme configuration.

---

## Git Workflow

Follow `CONTRIBUTING.md` for commit conventions and branch naming.

**Never commit directly to `main`.** Always create a feature branch (`feat/`, `fix/`, `chore/`),
commit there, then create a PR.

### Notion status sync

Every change request in `changes @democrito` has a Status property that must stay
in sync with development progress:

1. **When you start work** on a change request — set its Status to **In progress**
   via Notion MCP before writing any code.
2. **When you create a PR** — set its Status to **Review** via Notion MCP immediately
   after the PR is created.

The same applies to `docs @democrito` when working directly on a doc.

Do not skip these transitions. They are how the project owner tracks progress
without asking.

---

> Maintainers track work in a private Notion workspace. Internal access only.

---

## Verification

Run after any code changes:

```bash
npm run lint && npm run test
```

Available test commands:

| Command | Purpose |
|---|---|
| `npm run test` | Vitest unit tests (single run) |
| `npm run test:watch` | Vitest in watch mode |
| `npm run test:visual` | Playwright visual regression |
| `npm run test:visual:update` | Update Playwright snapshots |
| `npm run lint` | ESLint |

---

## Key Files

| File | Purpose |
|---|---|
| `src/index.css` | CSS custom properties + CSS-first `@theme` — source of truth for all design tokens and Tailwind integration |
| `docs/theming.md` | How to customize the system for a specific brand or product |
| `src/DESIGN_SYSTEM.md` | Full design system specification and component inventory |
| `DESIGN.md` | Design philosophy and visual language — the "taste layer" for AI agents |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
