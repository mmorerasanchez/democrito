# AGENTS.md — democrito

> **For Claude Code users:** this repo auto-loads `CLAUDE.md` instead. All rules
> here are consistent with `CLAUDE.md`; read that file for the full context.
>
> **For Codex, GitHub Copilot, Cursor, and other agents:** this file is your entry
> point. Read `docs/ai/README.md` for the AI-specific bias table before touching
> any component.

democrito is a general-purpose, themeable Atomic Design System built on
**React 18 + TypeScript strict + Tailwind CSS 4.2 + Radix UI / shadcn/ui**.

---

## Key Commands

```bash
npm run dev          # start dev server (Vite)
npm run build        # production build
npm run lint         # ESLint — run before every commit
npm run test         # Vitest unit tests (single run)
npm run test:watch   # Vitest in watch mode
npm run test:visual  # Playwright visual regression
npm run test:visual:update  # update Playwright snapshots
```

Run `npm run lint && npm run test` after **every** code change before marking a task done.

---

## Non-Obvious Stack Decisions

These are the most common agent errors in this codebase — read before writing any code.

### Tailwind v4 — no config file

`tailwind.config.ts` **does not exist** and must not be created. It was deleted in v3.1.0
when the project migrated to Tailwind CSS 4.2's CSS-first configuration.

All theme tokens — colors, fonts, spacing, radii — live as CSS custom properties in
`tokens/index.css` inside the `@theme` block. Add tokens there, not in a config file.

### Three-font rule (most-broken rule)

| Class | Font | Use it for |
|---|---|---|
| `font-display` | Plus Jakarta Sans | Titles, headings, button labels, navigation |
| `font-body` | Satoshi | Paragraphs, descriptions, prose |
| `font-mono` | JetBrains Mono | **ALL** user-editable content, data values, variables, code |

Using `font-body` for editable inputs is always wrong. `font-mono` is not a code style —
it is the signal that content is user-controlled or data-derived.

### 3-surface hierarchy

Depth comes from three surface levels only: `--background` → `--surface` → `--card`.
Never introduce a 4th surface. Never use custom shadows to fake depth.

### CSS cascade order in `tokens/index.css`

Theme blocks must appear in this order inside `@layer base`:
1. `:root, .warm` (default — warm earth tone palette)
2. `.dark`
3. `.light`

If warm comes last, it overrides dark/light (equal specificity, last wins). Breaking this
order causes theme bleed.

### Token-only colors

Never write `bg-gray-800`, `text-white`, or any hex/HSL value in a component.
Use semantic token classes: `bg-surface`, `text-accent`, `border-border`,
`text-muted-foreground`, etc. Every color has a function; decorative colors don't exist.

### One accent, three themes

There is one accent color: **terracotta**. Do not introduce a second accent hue.
There are three themes: warm (default), dark, light. Do not create a fourth.

Every new color token must be defined in all three theme blocks in `tokens/index.css`.

### shadcn/ui primitives

All interactive primitives come from `registry/ui/` (shadcn/ui).
**Never modify `ui/` files directly** — extend via CVA variants.
Compose ui/ primitives into atoms/molecules; never rebuild from scratch.

---

## AI Bias Patterns — Explicitly Suppressed

| Wrong behavior | Correct behavior |
|---|---|
| Adding gradient backgrounds | Use `--background`, `--surface`, or `--card` only |
| Using `--accent` for status indicators | Accent is brand only — use `--color-success`, `--color-warning`, `--color-error` |
| Two primary buttons on one view | One primary button per view maximum |
| `font-body` for editable inputs | All user-editable content uses `font-mono` |
| Disabled state via per-token colors | Use `opacity: 0.4` + `filter: saturate(0)` at container level |
| Title Case copy | Sentence case everywhere |
| New accent hue | Terracotta. One. No exceptions |
| Component-scoped tokens | Semantic tokens only (`--accent`, not `--button-accent-bg`) |

---

## Commit Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/) with design system scopes. Full spec in `CONTRIBUTING.md`.

```
<type>(<scope>): <description>
```

Types: `feat` | `fix` | `docs` | `style` | `refactor` | `chore` | `perf` | `test`

Scopes: `tokens` | `atoms` | `molecules` | `organisms` | `templates` | `ui` | `theme` | `deps` | `pages`

Rules: lowercase, imperative mood, no period, under 72 characters. Describe **what changed**, not what you did.

```
feat(atoms): add Spinner component
fix(organisms): correct table overflow on mobile
chore(deps): bump vite from 4.5 to 5.0
perf(theme): reduce CSS custom property count by 12
```

---

## Boundaries

### ✅ Always allowed
- Read files, search, list directories
- Run lint, typecheck, test commands
- Add tokens to `tokens/index.css` (all three theme blocks)

### ⚠️ Ask before doing
- Installing or removing npm packages
- Creating new components (verify inventory first — `registry/atoms/`, `registry/molecules/`, `registry/ui/`)
- Any change to `tokens/index.css` `@theme` block font families or accent hue

### 🚫 Never
- Commit directly to `main` — always branch as `<type>/<issue#>-<desc>`, open a PR, and wait for review (never self-merge)
- Hardcode hex, rgb, or HSL values in components
- Create `tailwind.config.ts`
- Introduce a 4th theme or 2nd accent color
- Modify `registry/ui/` files directly
- Skip the three-font rule

---

## Atomic Design Levels

| Level | Directory | Rule |
|---|---|---|
| Atoms | `registry/atoms/` | Single-purpose, no child components |
| Molecules | `registry/molecules/` | Compositions of 2+ atoms |
| Organisms | `registry/organisms/` | Major UI sections — never nest organisms |
| Templates | `registry/templates/` | Layout shells — no business logic |
| Pages | `src/pages/` | Route-level, composes templates + organisms |

Classify a component before writing it. If you can't classify it, don't build it yet.

---

## Key Files

| File | Purpose |
|---|---|
| `tokens/index.css` | All design tokens — CSS custom properties + Tailwind `@theme` block |
| `CLAUDE.md` | Full AI agent context (Claude Code) |
| `docs/ai/README.md` | Reading order + AI bias table (read first) |
| `docs/reference/tokens.md` | Full token reference |
| `docs/reference/theming.md` | How to customize for a specific brand |
| `docs/reference/design-system.md` | Full component inventory |
| `CONTRIBUTING.md` | Commit conventions, branch naming, component creation guide |
