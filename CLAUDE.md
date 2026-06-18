# CLAUDE.md — AI Agent Context

> This file is auto-read by AI coding agents (Claude Code, Cursor, Windsurf, etc.)
> working with **democrito**, a general-purpose, themeable Atomic Design System for
> data-dense, IDE-inspired applications — dashboards, editors, AI tools, and internal
> platforms. It provides essential project context to produce consistent, on-system
> code from the first generation.

> **⚠️ Themeable system.** This is a general-purpose, brandable design system. Before
> using default token values, check `tokens/index.css` (the `@theme` block) for any
> custom theme overrides. The accent color, font families, radius, and surface palette
> may differ from the defaults documented below. See [`docs/reference/theming.md`](docs/reference/theming.md)
> for the full theming guide.

---

## Browser Baseline Target

This project targets Baseline 2024 (features interoperable across all major engines since January 2024). When suggesting APIs, CSS properties, or browser features, default to Baseline 2024 Widely Available or Newly Available. Flag anything Limited Availability explicitly before using it.

---

## Documentation Reading Order

Before working on any component, token, or layout task, read [`docs/ai/README.md`](docs/ai/README.md).
It defines the reading order, decision hierarchy, and known AI bias patterns for this system.

---

## Architecture — Atomic Design

The component library follows **Atomic Design** methodology with five levels:

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `registry/atoms/` | Smallest building blocks — single-purpose, no child components | `Code`, `CodeBlock`, `CopyButton`, `Heading`, `Kbd`, `Link`, `Logo`, `Spinner`, `StatusBadge`, `Tag`, `Text` |
| **Molecules** | `registry/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState`, `TokenReferenceCard` |
| **Organisms** | `registry/organisms/` | Major UI sections, may include molecules | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm`, `SidebarNav`, `UserMenu` |
| **Templates** | `registry/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout`, `DashboardLayout` |

**UI Primitives** (`registry/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

One component per file, PascalCase filenames.

---

## Design Tokens

> **Full reference:** [`docs/reference/tokens.md`](docs/reference/tokens.md) — colors, typography, spacing, radii, motion.

**Key behavioral rules:**
- All colors are HSL CSS custom properties in `tokens/index.css`, defined via CSS-first `@theme` in `tokens/index.css`
- Three themes: **Warm** (`:root`, default), **Dark** (`.dark`), **Light** (`.light`)
- 3-surface hierarchy: `--background` → `--surface` → `--card`
- 3-font system: `font-display` (headings), `font-body` (text), `font-mono` (data/code)
- Spacing base unit: 4px. Layout tokens: `--header-height`, `--sidebar-width`, `--sidebar-collapsed`, `--right-panel`
- Never hardcode hex/rgb — always use semantic token classes (`bg-surface`, `text-accent`, `border-border`)

---

## Rules

1. **Check existing atoms first** — before creating any new component, verify it doesn't already exist in `registry/atoms/`, `registry/molecules/`, or `registry/ui/`.
2. **Always use design tokens** — never use magic numbers for colors, spacing, or radii. Use Tailwind classes mapped to CSS variables.
3. **TypeScript with proper prop types** — every component must define an explicit `interface` for its props with JSDoc descriptions.
4. **Follow existing naming conventions** — PascalCase filenames, one component per file.
5. **Use shadcn/ui primitives as the base** — extend via CVA variants in `ui/` components; compose them into atoms/molecules, never rebuild from scratch.
6. **User-editable content uses `font-mono`** — all code, data values, and user-generated content must use the mono font family.
7. **Three-theme compliance** — any new color token must be defined in all three themes (`:root` for warm default, `.dark`, `.light`) in `tokens/index.css`.
8. **Semantic color only** — use `bg-card`, `text-muted-foreground`, `border-border` etc. Never write `bg-gray-800` or `text-white`.
9. **Check for theme overrides** — before assuming default token values, verify the project's `tokens/index.css` `@theme` block for custom theme configuration.

---

## Git Workflow

**Every change must go on a branch** (`<type>/<issue#>-<desc>`), open a PR, and wait for review — never commit directly to `main`, never self-merge.

Commit message format: `<type>(<scope>): <description>` — lowercase, imperative mood, no trailing period, ≤72 chars.

Types: `feat fix docs style refactor chore perf test`

Scopes map to layers: `tokens atoms molecules organisms templates ui theme deps pages`

See `CONTRIBUTING.md` for the full branch and PR workflow.

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
| `tokens/index.css` | CSS custom properties + CSS-first `@theme` — source of truth for all design tokens and Tailwind integration |
| `docs/reference/theming.md` | How to customize the system for a specific brand or product |
| `docs/reference/design-system.md` | Full design system specification and component inventory |
| `DESIGN.md` | Design philosophy and visual language — the "taste layer" for AI agents |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
