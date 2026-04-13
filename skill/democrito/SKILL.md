# democrito — Claude Skill

> **democrito** is an Atomic Design System and the visual foundation of
> [prompt-x](https://github.com/mmorerasanchez/prompt-x), a prompt engineering platform.
> This skill gives Claude the full design-system context needed to generate on-system
> UI code from the first attempt.

---

## What This Skill Provides

| File | Purpose |
|---|---|
| `SKILL.md` | Overview, architecture, and coding rules (this file) |
| `principles.md` | 6 core design principles that guide every decision |
| `tokens.md` | Complete token reference — colors, typography, spacing, motion |
| `components.md` | Component inventory across all atomic levels |
| `agent-usage.md` | Prompting strategies and compact token block for any AI tool |

---

## Architecture — Atomic Design

The component library follows **Atomic Design** methodology:

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `src/components/atoms/` | Single-purpose building blocks | `Heading`, `Tag`, `Spinner`, `Code`, `Kbd`, `Link`, `Text` |
| **Molecules** | `src/components/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState` |
| **Organisms** | `src/components/organisms/` | Major UI sections | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm` |
| **Templates** | `src/components/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout` |
| **Pages** | `src/pages/` | Route-level components | `DashboardPage`, `LibraryPage`, `SettingsPage` |

**UI Primitives** (`src/components/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

---

## Design Token Essentials

- All colors are HSL CSS custom properties in `src/index.css`, mapped in `tailwind.config.ts`
- **Three themes**: Dark (`:root`), Light (`.light`), Warm (`.warm`)
- **3-surface hierarchy**: `--background` → `--surface` → `--card`
- **3-font system**: `font-display` (headings), `font-body` (text), `font-mono` (data/code)
- **Spacing**: 4px base grid
- Never hardcode hex/rgb — always use semantic token classes

---

## Coding Rules

1. **Check existing atoms first** — verify the component doesn't already exist in `atoms/`, `molecules/`, or `ui/`.
2. **Always use design tokens** — never use magic numbers for colors, spacing, or radii.
3. **TypeScript with proper prop types** — explicit `interface` for every component's props.
4. **Follow naming conventions** — PascalCase filenames, one component per file, barrel `index.ts` exports.
5. **Extend shadcn/ui primitives** — compose them into atoms/molecules, never rebuild from scratch.
6. **User-editable content uses `font-mono`** — all code, data values, and user-generated content.
7. **Three-theme compliance** — new color tokens must be defined in all three themes.
8. **Semantic color only** — use `bg-card`, `text-muted-foreground`, etc. Never `bg-gray-800` or `text-white`.

---

## Technology Stack

- React 18 + TypeScript 5
- Vite 5
- Tailwind CSS v3
- shadcn/ui (Radix primitives)
- React Router v6

---

## Key Files

| File | Purpose |
|---|---|
| `src/index.css` | CSS custom properties — source of truth for all design tokens |
| `tailwind.config.ts` | Tailwind mappings to CSS variables |
| `CLAUDE.md` | Auto-read context file for AI agents working in the repo |
| `docs/theming.md` | How to customize the system for a specific brand |
| `CONTRIBUTING.md` | Development workflow and conventions |

---

*See the companion files in this skill folder for detailed token, component, and principle references.*
