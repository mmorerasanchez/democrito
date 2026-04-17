# Using democrito with AI Coding Tools

> How to get consistent, on-system results from AI code generators by providing the right context.
> democrito is the visual foundation of [prompt-x](https://github.com/mmorerasanchez/prompt-x), a prompt engineering platform.

---

## Why This Matters

AI coding tools generate better components when they understand your design system. Without context, they default to generic styling — hardcoded colors, arbitrary spacing, mismatched typography. With the right references, they produce code that looks like it belongs.

This guide covers setup and prompting strategies for four categories of tools.

---

## 1. Lovable

Lovable is the primary development environment for democrito. It has full access to the codebase and can read component patterns directly.

### Setup

1. **Connect GitHub** — In Lovable, go to Settings → GitHub → Connect. This creates a synced repository.
2. **Add Custom Knowledge** — Go to Settings → Manage Knowledge and paste the compact token reference (see bottom of this doc) so Lovable always has design system context.
3. **Reference existing components** — Lovable can read your files, so reference them by name.

### Example Prompts

```
Create a new molecule called CopyButton that uses the Tag atom and a copy icon.
Follow the existing pattern in src/components/molecules/SearchBar.tsx.
Use font-mono for the code text and text-accent for the copy icon hover state.
```

```
Add a "Favorites" filter tab to the FilterBar organism.
Use the existing TabNav molecule pattern. Active state should use bg-accent-subtle.
```

```
Create a settings form using FormField molecules.
All inputs must use font-mono. Labels use font-display text-sm.
Follow the spacing pattern from the existing SettingsPage.
```

### Tips

- Reference specific component files so Lovable reads and follows the pattern.
- Name the atomic level in your prompt ("create a molecule", "add to the organism").
- Mention design tokens by class name (`text-accent`, `bg-surface`, `border-border`).

---

## 2. Cursor / Claude Code

These tools auto-read `CLAUDE.md` at the project root, which contains the full architecture reference.

### Setup

1. **Clone the repo** — `git clone https://github.com/mmorerasanchez/democrito.git`
2. **Open in Cursor** — The `CLAUDE.md` file is automatically loaded as context.
3. **For Claude Code** — Run `claude` in the project directory. It reads `CLAUDE.md` on startup.

### What CLAUDE.md Provides

- Atomic Design hierarchy with level descriptions and examples
- Design token reference (spacing, colors, typography, radii)
- Coding rules (use tokens, check existing atoms first, TypeScript props, etc.)
- Key file locations

### Example Prompts

```
Create a new atom called Avatar in src/components/atoms/.
Check CLAUDE.md for the component rules. Use rounded-full, bg-muted for fallback,
and font-display text-xs for initials. Export from the atoms index.
```

```
Build a PromptRunCard molecule that shows: prompt name (font-display text-base),
model badge (font-mono text-xs), latency (text-muted-foreground), and a status dot
using the --status-* tokens. Follow the StatCard pattern.
```

```
Refactor the TopBar organism to add a global search input.
Use the SearchBar molecule. The input should use bg-surface, border-border,
and font-mono. Refer to the existing TopBar.tsx for the layout pattern.
```

### Tips

- Cursor: Use `@CLAUDE.md` to explicitly reference the context file in prompts.
- Claude Code: It reads `CLAUDE.md` automatically — just write naturally.
- Reference specific directories: "check `src/components/atoms/` for existing atoms."

---

## 3. v0 / Bolt / Other Web-Based Tools

These tools don't have filesystem access, so you need to **paste context manually**.

### Setup

1. **Copy the compact token reference** (bottom of this doc) into your first prompt.
2. **Copy a reference component** — paste an existing component from the same atomic level as a pattern.
3. **Specify the rules** in your prompt.

### Example Prompts

Prefix your prompt with the compact reference, then:

```
Using the design system context above, create a React component called MetricCard.
It's a molecule (composition of atoms). Props: label (string), value (string),
change (number), trend ("up" | "down").

Requirements:
- Use font-display for the label, font-mono for the value
- Positive change: text-success, negative: text-error
- Card: bg-card border border-border rounded-lg p-4
- All colors must use the CSS variable classes, never hardcode
```

```
Create a toolbar organism with these elements:
- Left: breadcrumb using font-body text-sm text-muted-foreground
- Center: tab navigation with active state bg-accent-subtle border-b-2 border-accent
- Right: two buttons — primary (bg-primary) and ghost variant

Use only the semantic color tokens from the context. No gray-*, no white, no black.
```

### What to Paste

Copy the **Compact Token Reference** section below. For complex components, also paste one existing component file as a pattern example.

---

## 4. GitHub Copilot

Copilot infers patterns from surrounding code. The more consistent your codebase, the better its suggestions.

### Tips

- **Open related files** — when creating a new molecule, open an existing molecule in an adjacent tab. Copilot uses open files as context.
- **Write the interface first** — define the TypeScript props interface before the component. Copilot will generate the implementation following your type hints.
- **Use comments as prompts**:

```tsx
// Molecule: displays a prompt's version history entry
// Uses: font-mono for version number, text-muted-foreground for timestamp
// Pattern: same as RunHistoryItem
interface VersionEntryProps {
```

- **Name files correctly** — placing a file in `src/components/molecules/` signals Copilot to follow molecule patterns from that directory.

---

## Compact Token Reference

Copy-paste this block into any AI tool's context window for on-system results.

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

SIZE SCALE: 2xs=10px, xs=12px, sm=13px, base=14px, md=16px, lg=18px, xl=22px, 2xl=24px, 3xl=36px

COLORS (use Tailwind classes, never hardcode):
- Surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated)
- Text: text-foreground / text-muted-foreground / text-foreground-subtle
- Accent: text-accent (terracotta orange hue 18°) / bg-accent-subtle / text-accent-muted
- Borders: border-border / bg-input
- Semantic: text-success / text-warning / text-error / text-info (each has -bg and -border variants)
- Status: text-status-draft (yellow) / text-status-testing (blue) / text-status-production (green) / text-status-archived (gray)
- Anatomy: text-anatomy-{role,tone,context,task,reasoning,examples,output,constraints,tools}

SPACING: 4px base grid. Layout: h-header=56px, w-sidebar-w=240px, w-right-panel=352px
RADII: rounded-sm=4px, rounded-md=8px, rounded-lg=12px, rounded-full=pill
Z-INDEX: dropdown=50, sticky=100, overlay=200, modal=300, toast=400
THEMES: 3 themes (dark default, .light, .warm) — all via CSS variables, auto-switching

RULES:
1. Check existing atoms before creating new components
2. Always use design tokens — never magic numbers or hardcoded colors
3. TypeScript with explicit prop interfaces
4. Extend shadcn/ui primitives, don't rebuild
5. Prompts are code — all user content uses font-mono
6. One component per file, PascalCase, barrel index.ts exports
```

---

## Further Reading

- [Architecture](./architecture.md) — why Atomic Design, composition rules
- [Design Tokens](./tokens.md) — complete token inventory with hex values
- [CLAUDE.md](../CLAUDE.md) — the auto-read context file for AI agents
- [CONTRIBUTING.md](../CONTRIBUTING.md) — development workflow and conventions
