---
name: democrito
description: Use this skill when working with the democrito design system — generating UI components, applying design tokens, or following atomic-design conventions. Triggers on mentions of democrito, design system, design tokens, atomic design, shadcn component, theme, color system, typography, or "build a component" for any React + Tailwind + shadcn project that has adopted democrito. Provides tokens, principles, component inventory, and three-theme guidance so Claude produces on-system code from the first attempt.
---

# democrito — Claude Skill

> **democrito** is a general-purpose, themeable Atomic Design System for data-dense,
> IDE-inspired applications — dashboards, editors, AI tools, and internal platforms.
> This skill gives Claude the full design-system context needed to generate on-system
> UI code from the first attempt.

**Trigger this skill when:** generating React + Tailwind + shadcn UI in any project that has adopted democrito; applying tokens; composing atoms/molecules/organisms/templates; rebranding via theme tokens.

**Do not trigger this skill for:** application logic, data modeling, business rules, or any product-specific feature work. This skill covers the design-system layer only.

---

## Reference Files

Read these bundled files on-demand when you need deeper context:

| File | When to read |
|---|---|
| `principles.md` | Before any visual / structural decision — the 6 design principles behind every token and component choice |
| `tokens.md` | Whenever you need the exact HSL value, Tailwind class, or purpose of a design token (surfaces, text, accent, semantic, typography, spacing, motion) |
| `components.md` | Before creating a new component — check the inventory across Atoms, Molecules, Organisms, and Templates to avoid duplicates |
| `agent-usage.md` | For prompting strategies and the compact token block to hand to other AI tools |

---

## Methodology

When generating or reviewing democrito code, apply this order:

1. **Tokens first.** Never hardcode colors, spacing, or radii. Every visual value comes from the `@theme` block in `src/index.css` (Tailwind v4 — no `tailwind.config.ts`). Use Tailwind utility classes bound to tokens (`bg-surface`, `text-foreground-muted`, `border-border`) — never `bg-gray-800` or `text-white`.
2. **Three-surface hierarchy.** Build depth with `--background` → `--surface` → `--card`, in that order. Inputs must not share a surface with their containing card.
3. **Three-font system.** `font-display` for headings, `font-body` for prose, `font-mono` for all data, code, user-generated content, and tokens/commands.
4. **Three-theme compliance.** Every new color token must be defined in all three themes: `:root` (warm, default), `.dark`, and `.light`.
5. **Principles gate.** Changes must respect the six principles from `principles.md`:
   1. Monochromatic + Accent
   2. 3-Surface Hierarchy
   3. Typography as Hierarchy
   4. Progressive Disclosure
   5. Accessible by Default
   6. IDE-Inspired

---

## Architecture — Atomic Design

| Level | Directory | Description | Examples |
|---|---|---|---|
| **Atoms** | `src/components/atoms/` | Single-purpose building blocks | `Heading`, `Tag`, `Spinner`, `Code`, `Kbd`, `Link`, `Text`, `CopyButton`, `CodeBlock` |
| **Molecules** | `src/components/molecules/` | Compositions of 2+ atoms | `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav`, `EmptyState`, `TokenReferenceCard` |
| **Organisms** | `src/components/organisms/` | Major UI sections | `TopBar`, `DataTable`, `FilterBar`, `DashboardStats`, `AuthForm` |
| **Templates** | `src/components/templates/` | Page layout shells — no business logic | `AppShell`, `EditorLayout`, `LibraryLayout`, `DetailLayout` |
| **Pages** | `src/pages/` | Route-level components | `DashboardPage`, `LibraryPage`, `SettingsPage`, `AiPage` |

**UI Primitives** (`src/components/ui/`) are shadcn/ui components — extend via CVA variants, never modify directly.

---

## Coding Rules

1. **Check existing components first** — verify the component doesn't already exist in `atoms/`, `molecules/`, or `ui/` before creating anything new.
2. **TypeScript with explicit prop interfaces** — every component must declare an `interface` for its props with JSDoc descriptions.
3. **PascalCase filenames, one component per file, barrel `index.ts` exports.**
4. **Extend shadcn/ui primitives via CVA variants** — compose them into atoms/molecules, never rebuild from scratch.
5. **User-editable content uses `font-mono`** — all code, data values, and user-generated content.
6. **Semantic color only** — use `bg-card`, `text-muted-foreground`, `border-border`. Never `bg-gray-800` or `text-white`.

---

## Technology Stack

- React 18 + TypeScript 5
- Vite 5
- Tailwind CSS v4
- shadcn/ui (Radix primitives)
- React Router v6

---

## Key Files (in host repos adopting democrito)

| File | Purpose |
|---|---|
| `src/index.css` (`@theme` block) | CSS custom properties — source of truth for all design tokens and Tailwind utilities |
| `CLAUDE.md` | Auto-read context file for AI agents working in the repo |
| `docs/theming.md` | How to customize the system for a specific brand |
| `CONTRIBUTING.md` | Development workflow and conventions |

---

*See the companion files in this skill folder for detailed token, component, principle, and usage references.*
