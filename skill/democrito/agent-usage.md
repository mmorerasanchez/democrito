# Agent Usage Guide

> How to use the democrito design system context effectively with AI coding tools.

---

## For Claude Code / Cursor

These tools auto-read `CLAUDE.md` at the repo root. No extra setup needed.

**Best practices:**
- Reference specific component files so the agent reads and follows the pattern
- Name the atomic level: "create a molecule", "add to the organism"
- Mention design tokens by class name (`text-accent`, `bg-surface`, `border-border`)
- Reference the `docs/` folder for detailed specs: `docs/tokens.md`, `docs/components/`

**Example prompt:**
```
Create a new molecule called CopyButton that uses the Tag atom and a copy icon.
Follow the existing pattern in src/components/molecules/SearchBar.tsx.
Use font-mono for the code text and text-accent for the copy icon hover state.
```

---

## For Lovable

Lovable has full codebase access. Add the compact token reference (below) to Settings → Manage Knowledge.

**Example prompt:**
```
Add a "Favorites" filter tab to the FilterBar organism.
Use the existing TabNav molecule pattern. Active state should use bg-accent-subtle.
```

---

## For v0 / Bolt / Web-Based Tools

These tools lack filesystem access. Paste the **Compact Token Reference** below into your first prompt, then describe your component.

---

## For GitHub Copilot

- Open related files in adjacent tabs for pattern inference
- Write the TypeScript interface first — Copilot will follow your types
- Place files in the correct atomic directory for contextual suggestions

---

## Compact Token Reference

Copy-paste this block into any AI tool's context window:

```
=== democrito Design System — Token Reference ===
(Visual foundation of prompt-x — a prompt engineering platform)

ARCHITECTURE: Atomic Design (atoms → molecules → organisms → templates → pages)
- atoms/: single-purpose, no child components (Heading, Tag, Spinner, Code, Kbd, Link, Text)
- molecules/: compose 2+ atoms (FormField, SearchBar, StatCard, TokenCounter, TabNav)
- organisms/: major UI sections (TopBar, DataTable, PromptCard, FilterBar, DashboardStats)
- templates/: layout shells, no logic (AppShell, EditorLayout, LibraryLayout, DetailLayout)
- ui/: shadcn/ui primitives — extend via CVA, never rebuild

FONTS:
- font-display: Plus Jakarta Sans — headings, labels, buttons, nav
- font-body: Satoshi — body text, descriptions
- font-mono: JetBrains Mono — data, code, prompts, inputs, badges

SIZE SCALE: 2xs=10px, xs=12px, sm=13px, base=14px, md=16px, lg=18px, xl=22px

COLORS (use Tailwind classes, never hardcode):
- Surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated)
- Text: text-foreground / text-muted-foreground / text-foreground-subtle
- Accent: text-accent (terracotta orange hue 18°) / bg-accent-subtle
- Borders: border-border / bg-input
- Semantic: text-success / text-warning / text-error / text-info (+bg/border variants)
- Status: text-status-draft / text-status-testing / text-status-production / text-status-archived
- Anatomy: text-anatomy-{role,tone,context,task,reasoning,examples,output,constraints,tools}

SPACING: 4px base grid. Layout: h-header=56px, w-sidebar-w=240px, w-right-panel=352px
RADII: rounded-sm=4px, rounded-md=8px, rounded-lg=12px, rounded-full=pill
Z-INDEX: dropdown=50, sticky=100, overlay=200, modal=300, toast=400
THEMES: 3 themes (dark default, .light, .warm) — all via CSS variables

RULES:
1. Check existing atoms before creating new components
2. Always use design tokens — never magic numbers or hardcoded colors
3. TypeScript with explicit prop interfaces
4. Extend shadcn/ui primitives, don't rebuild
5. Prompts are code — all user content uses font-mono
6. One component per file, PascalCase, barrel index.ts exports
```

---

## Key Prompting Patterns

### Creating a new component
```
Create a new [level] called [Name] in src/components/[level]s/.
Follow the pattern in [ExistingComponent].tsx.
Props: [list props with types].
Use [specific tokens] for styling.
Export from the [level]s index.ts barrel.
```

### Extending an existing component
```
Add [feature] to the [Component] [level].
Use the [Token] token for [element].
Keep the existing API — add [prop] as optional.
```

### Theming compliance check
```
Verify that [Component] works in all three themes (dark, light, warm).
Check contrast ratios for text on [surface].
Ensure no hardcoded colors — only semantic token classes.
```
