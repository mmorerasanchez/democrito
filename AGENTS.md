# AGENTS.md — democrito

> The entry contract for any coding agent working in this repo — Claude Code, Cursor,
> Codex, GitHub Copilot, Windsurf. Every rule lives here once.

democrito is a general-purpose, themeable Atomic Design System for data-dense,
IDE-inspired applications — dashboards, editors, AI tools, and internal platforms.
It is a **library, not an app**: there is no `src/`. Source lives in `registry/`,
`tokens/`, `skill/`, and `docs/`, and ships as a shadcn registry.

## Source-of-truth order

1. This file — the rules.
2. `docs/` — start with [`docs/ai/README.md`](docs/ai/README.md) (reading order, decision
   hierarchy, AI bias table) before any component, token, or layout task.
3. The code — `tokens/index.css`, `registry/`, `package.json`, `.github/workflows/ci.yml`.

**Code wins.** When a doc and the code disagree, the code is right; report the drift.

The system is themeable. Before assuming any default value, read the `@theme` block and the
theme blocks in `tokens/index.css`: the accent, font families, radius, and surface palette may
be overridden. See [`docs/reference/theming.md`](docs/reference/theming.md).

## Commands

```bash
npm test                              # registry-token verification + Vitest (single run)
npm run test:watch                    # Vitest in watch mode
npm run verify                        # registry-token verification only
npx tsc -p tsconfig.app.json --noEmit # type-check
npm run build                         # regenerate counts, showcase, tokens, skill docs, registry
```

Drift gate — CI runs this after `npm run build`; it must exit 0:

```bash
git diff --exit-code -- registry.json "public/r" tokens/design-tokens.json skill/democrito docs/showcase.md README.md
```

Run `npm test && npx tsc -p tsconfig.app.json --noEmit && npm run build`, then the drift gate,
after **every** change before marking a task done.

## Stack

- React 18 + TypeScript strict + Tailwind CSS 4.2 (CSS-first, no config file)
- Radix UI / shadcn/ui primitives, extended with CVA
- Lucide icons
- Vite + Vitest
- Browser target: **Baseline 2024**. Default to Baseline 2024 Widely Available or Newly
  Available APIs and CSS; flag anything Limited Availability before using it.

## Architecture — Atomic Design

| Level | Directory | Rule | Examples |
|---|---|---|---|
| **UI primitives** | `registry/ui/` | shadcn/ui — extend via CVA variants, never modify | — |
| **Atoms** | `registry/atoms/` | Single-purpose, no child components | `Code`, `CodeBlock`, `CopyButton`, `Heading`, `Kbd`, `Link`, `Logo`, `Spinner`, `StatusBadge`, `Tag`, `Text` |
| **Molecules** | `registry/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState`, `TokenReferenceCard` |
| **Organisms** | `registry/organisms/` | Major UI sections, may include molecules — never nest organisms | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm`, `SidebarNav`, `UserMenu` |
| **Templates** | `registry/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout`, `DashboardLayout` |

Classify a component before writing it. If you can't classify it, don't build it yet.
Compose upward — atoms → molecules → organisms → templates — and never skip a level.

## Code style

- One component per file, PascalCase filenames.
- Every component defines an explicit `interface` for its props, with JSDoc descriptions.
- Check the inventory before creating a component: `registry/atoms/`, `registry/molecules/`, `registry/ui/`.
- Sentence case for all UI copy.
- One primary button per view, maximum.
- Disabled state: `opacity: 0.4` + `filter: saturate(0)` at container level.
- Spacing base unit: 4px. Layout tokens: `--header-height`, `--sidebar-width`, `--sidebar-collapsed`, `--right-panel`.
- Full token reference: [`docs/reference/tokens.md`](docs/reference/tokens.md).

## Tokens and themes

All tokens — colors, fonts, spacing, radii, motion — live in `tokens/index.css`: HSL CSS custom
properties in the theme blocks, wired to Tailwind through the CSS-first `@theme` block.

Themes are the class blocks `tokens/index.css` declares inside `@layer base`: **Warm**
(`:root, .warm`, the default), **Dark** (`.dark`), **Light** (`.light`). Block order is part of
the contract: `:root, .warm` comes first, then the other themes. Theme blocks have equal
specificity, so if the default block came last it would override every other theme (theme bleed).

There is one accent color: **terracotta**. Accent is brand only — status uses `--color-success`,
`--color-warning`, `--color-error`. Every color has a function; decorative colors don't exist.

## Immutable constraints

- **NEVER use a token before it exists.** Add it to `tokens/index.css` first — in every theme block — then use it.
- **NEVER hand-edit a generated file** (`registry.json`, `public/r/*`, `tokens/design-tokens.json`, `skill/democrito/*`, `docs/showcase.md`, README count strings, the `DESIGN.md` date stamp). Change the source and run `npm run build`.
- **NEVER create `tailwind.config.ts`.** It was deleted in v3.1.0; add tokens to the `@theme` block in `tokens/index.css`.
- **NEVER break the three-font rule.** `font-display` (Plus Jakarta Sans) for titles, headings, button labels, navigation · `font-body` (Satoshi) for paragraphs, descriptions, prose · `font-mono` (JetBrains Mono) for **all** user-editable content, data values, variables, code. `font-mono` is not a code style — it signals user-controlled or data-derived content; `font-body` on an editable input is always wrong.
- **NEVER add a fourth surface or fake depth with custom shadows or gradients.** Depth comes from `--background` → `--surface` → `--card` only.
- **NEVER hardcode color** — no hex, rgb, HSL, `bg-gray-800`, or `text-white` in a component, and no magic numbers for spacing or radii. Use semantic token classes: `bg-surface`, `bg-card`, `text-accent`, `border-border`, `text-muted-foreground`.
- **NEVER create component-scoped tokens** (`--button-accent-bg`). Use semantic tokens (`--accent`).
- **NEVER introduce a second accent hue.** Terracotta, one, no exceptions.
- **NEVER add a theme as a side effect of another change.** A new theme is its own change, declared as a block in `tokens/index.css` that defines every color token.
- **NEVER build an interactive primitive from scratch or modify `registry/ui/` directly.** Use the Radix / shadcn primitives in `registry/ui/`, extend them via CVA variants, and compose them into atoms and molecules.
- **NEVER use an icon library other than Lucide** (`lucide-react`).

### Ask before doing

- Installing or removing npm packages.
- Creating a new component (after checking the inventory).
- Changing font families or the accent hue in `tokens/index.css`.

### Always allowed

- Reading files, searching, listing directories.
- Running tests, type-check, and build.
- Adding tokens to `tokens/index.css`, in every theme block.

## Branch and PR rules

- **NEVER commit to `main`.** Branch from the latest `main` as `<type>/<issue#>-<desc>`, open a PR against `main`, and wait for review.
- **NEVER merge your own PR.**
- Commits follow [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<scope>): <description>` — lowercase, imperative mood, no trailing period, ≤72 characters. Describe **what changed**, not what you did.
- Types: `feat` | `fix` | `docs` | `style` | `refactor` | `chore` | `perf` | `test`
- Scopes map to layers: `tokens` | `atoms` | `molecules` | `organisms` | `templates` | `ui` | `theme` | `deps` | `pages`

```
feat(atoms): add Spinner component
fix(organisms): correct table overflow on mobile
chore(deps): bump vite from 4.5 to 5.0
perf(theme): reduce CSS custom property count by 12
```

Full branch, PR, and component-creation guide: `CONTRIBUTING.md`.

## Key files

| File | Purpose |
|---|---|
| `tokens/index.css` | Source of truth for all design tokens and the Tailwind `@theme` block |
| `docs/ai/README.md` | Reading order + AI bias table — read first |
| `docs/reference/tokens.md` | Full token reference |
| `docs/reference/theming.md` | How to customize the system for a specific brand or product |
| `docs/reference/design-system.md` | Full design system specification and component inventory |
| `DESIGN.md` | Design philosophy and visual language — the taste layer |
| `CONTRIBUTING.md` | Development workflow, commit conventions, component creation guide |
| `CHANGELOG.md` | Version history (Keep a Changelog format) |
