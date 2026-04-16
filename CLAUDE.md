# CLAUDE.md — AI Agent Context

> This file is auto-read by AI coding agents (Claude Code, Cursor, Windsurf, etc.)
> working with **democrito**, an Atomic Design System and the visual foundation of
> [prompt-x](https://github.com/mmorerasanchez/prompt-x) — a prompt engineering platform.
> It provides essential project context to produce consistent, on-system code from the first generation.

> **⚠️ Themeable system.** This is a general-purpose, brandable design system. Before
> using default token values, check `tailwind.config.ts` and `src/index.css` for any
> custom theme overrides. The accent color, font families, radius, and surface palette
> may differ from the defaults documented below. See [`docs/theming.md`](docs/theming.md)
> for the full theming guide.

---

## Architecture — Atomic Design

The component library follows **Atomic Design** methodology with five levels:

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `src/components/atoms/` | Smallest building blocks — single-purpose, no child components | `Heading`, `Tag`, `Spinner`, `Code`, `Kbd`, `Link`, `Text` |
| **Molecules** | `src/components/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState` |
| **Organisms** | `src/components/organisms/` | Major UI sections, may include molecules | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm` |
| **Templates** | `src/components/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout`, `DashboardLayout` |
| **Pages** | `src/pages/` | Route-level components that compose templates + organisms | `DashboardPage`, `LibraryPage`, `SettingsPage` |

**UI Primitives** (`src/components/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

Each level has a barrel `index.ts` for re-exports. One component per file, PascalCase filenames.

---

## Design Tokens

> **Full reference:** [`docs/tokens.md`](docs/tokens.md) — colors, typography, spacing, radii, motion.

**Key behavioral rules:**
- All colors are HSL CSS custom properties in `src/index.css`, mapped in `tailwind.config.ts`
- Three themes: **Dark** (`:root`), **Light** (`.light`), **Warm** (`.warm`)
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
7. **Three-theme compliance** — any new color token must be defined in all three themes (`:root`, `.light`, `.warm`) in `src/index.css`.
8. **Semantic color only** — use `bg-card`, `text-muted-foreground`, `border-border` etc. Never write `bg-gray-800` or `text-white`.
9. **Check for theme overrides** — before assuming default token values, verify the project's `tailwind.config.ts` and `index.css` for custom theme configuration.

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

## Notion MCP

Connected. Claude Code can search and fetch from the democrito Notion workspace.

| Database | Collection URL | Purpose |
|---|---|---|
| `docs @democrito` | `collection://341887eb-6e4e-801b-923c-000b6a7f747e` | Feature docs, SDDs, architecture decisions |
| `changes @democrito` | `collection://341887eb-6e4e-805e-8df7-000bc4a49ef0` | Change requests for execution |

**Usage rules:**
- Always check the relevant database before creating content — avoid duplicates.
- For scoped searches, use the `collection://` URLs above.
- For surgical edits, use `notion-update-page` with `content_updates` — never replace whole page bodies.
- Don't fetch the same database repeatedly in one session — cache the result and reuse.

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
| `src/index.css` | CSS custom properties — source of truth for all design tokens |
| `tailwind.config.ts` | Tailwind mappings to CSS variables, font/size/color definitions |
| `docs/theming.md` | How to customize the system for a specific brand or product |
| `src/DESIGN_SYSTEM.md` | Full design system specification and component inventory |
| `DESIGN.md` | Design philosophy and visual language — the "taste layer" for AI agents |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
