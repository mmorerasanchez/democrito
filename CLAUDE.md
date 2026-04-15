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

## Key Files

| File | Purpose |
|---|---|
| `src/index.css` | CSS custom properties — source of truth for all design tokens |
| `tailwind.config.ts` | Tailwind mappings to CSS variables, font/size/color definitions |
| `docs/theming.md` | How to customize the system for a specific brand or product |
| `src/DESIGN_SYSTEM.md` | Full design system specification and component inventory |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
