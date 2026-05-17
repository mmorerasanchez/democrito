# Architecture

> Why the democrito design system is structured the way it is, and how the pieces fit together.
> democrito is a general-purpose, themeable atomic design system for data-dense, IDE-inspired applications.

---

## Why Atomic Design?

We chose [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) (Brad Frost, 2013) for one core reason: **it creates a natural hierarchy that both humans and AI agents can reason about.**

When an AI coding tool encounters a component request, the atomic levels provide an unambiguous decision framework:

1. Does this exist already? → Check atoms, then molecules, then organisms.
2. What level should it be? → Count its children. No child components = atom. Composes atoms = molecule. Major UI section = organism.
3. Where does it go? → The level determines the directory. No ambiguity.

This predictability is essential for a design system built to be consumed by AI-assisted workflows. The methodology eliminates the "where should I put this?" problem that plagues flat component libraries.

### Additional benefits

- **Enforced composability** — molecules _must_ be built from atoms, organisms from molecules. This prevents monolithic components.
- **Parallel development** — atoms can be built independently, then composed upward without coordination.
- **Clear testing boundaries** — each level has a well-defined scope of responsibility.

---

## Five Levels → Folder Structure

```
src/components/
├── atoms/           # Level 1 — Foundational building blocks
│   ├── Code.tsx
│   ├── CodeBlock.tsx
│   ├── CopyButton.tsx
│   ├── Heading.tsx
│   ├── Kbd.tsx
│   ├── Link.tsx
│   ├── Logo.tsx
│   ├── Spinner.tsx
│   ├── StatusBadge.tsx
│   ├── Tag.tsx
│   ├── Text.tsx
│   └── index.ts     # Barrel export
│
├── molecules/       # Level 2 — Compositions of 2+ atoms
│   ├── ActivityFeedItem.tsx
│   ├── AvatarGroup.tsx
│   ├── BreadcrumbNav.tsx
│   ├── DiffLine.tsx
│   ├── EmptyState.tsx
│   ├── FieldHeader.tsx
│   ├── FormField.tsx
│   ├── NavItem.tsx
│   ├── ParameterControl.tsx
│   ├── RunHistoryItem.tsx
│   ├── SearchBar.tsx
│   ├── StatCard.tsx
│   ├── TabNav.tsx
│   ├── TokenCounter.tsx
│   ├── TokenReferenceCard.tsx
│   ├── VariableEditorRow.tsx
│   ├── VariableHighlight.tsx
│   └── index.ts
│
├── organisms/       # Level 3 — Major UI sections
│   ├── APIDocPanel.tsx
│   ├── APIKeyManager.tsx
│   ├── ActivityFeed.tsx
│   ├── AuthForm.tsx
│   ├── BulkActionsBar.tsx
│   ├── DashboardStats.tsx
│   ├── DataManager.tsx
│   ├── DataTable.tsx
│   ├── ExportMenu.tsx
│   ├── FilterBar.tsx
│   ├── ImportDialog.tsx
│   ├── IntegrationCard.tsx
│   ├── OnboardingWizard.tsx
│   ├── OrganizationManager.tsx
│   ├── RunHistory.tsx
│   ├── SettingsNav.tsx
│   ├── SidebarNav.tsx
│   ├── TopBar.tsx
│   ├── UserMenu.tsx
│   ├── ai/          # AI showcase organisms (5)
│   └── index.ts
│
├── templates/       # Level 4 — Page layout shells (no business logic)
│   ├── AppShell.tsx
│   ├── ComparisonLayout.tsx
│   ├── DashboardLayout.tsx
│   ├── DetailLayout.tsx
│   ├── EditorLayout.tsx
│   ├── LibraryLayout.tsx
│   ├── TemplatePreview.tsx
│   └── index.ts
│
├── ui/              # shadcn/ui base primitives (see below)
│   ├── button.tsx
│   ├── input.tsx
│   ├── dialog.tsx
│   └── ...
│
src/pages/           # Level 5 — Route-level components
    ├── AiPage.tsx
    ├── AiDetailPage.tsx
    ├── AtomsPage.tsx
    ├── ManifiestoPage.tsx
    ├── MoleculesPage.tsx
    ├── OrganismsPage.tsx
    ├── TemplatesPage.tsx
    ├── TokensPage.tsx
    ├── NotFound.tsx
    └── ...
```

Each directory contains an `index.ts` barrel file for clean imports:

```ts
// Consumer code
import { Heading, Tag, Spinner } from "@/components/atoms";
import { StatCard, SearchBar } from "@/components/molecules";
import { TopBar, DataTable } from "@/components/organisms";
import { AppShell } from "@/components/templates";
```

---

## Composition Rules

The atomic hierarchy enforces a strict **upward composition** model:

```
┌─────────────────────────────────────────────┐
│  Pages         compose templates + organisms │
├─────────────────────────────────────────────┤
│  Templates     compose organisms (layout)    │
├─────────────────────────────────────────────┤
│  Organisms     compose molecules + atoms     │
├─────────────────────────────────────────────┤
│  Molecules     compose atoms                 │
├─────────────────────────────────────────────┤
│  Atoms         use design tokens + ui/       │
├─────────────────────────────────────────────┤
│  Design Tokens (CSS variables)               │
└─────────────────────────────────────────────┘
```

### What each level can import

| Level | Can import from |
|---|---|
| Atoms | `ui/` primitives, design tokens, utilities |
| Molecules | Atoms, `ui/` primitives, design tokens |
| Organisms | Molecules, atoms, `ui/` primitives, design tokens |
| Templates | Organisms (via `ReactNode` slots), design tokens |
| Pages | Templates, organisms, molecules, atoms, hooks, data |

### What each level must NOT do

- **Atoms** must not import molecules or organisms.
- **Molecules** must not import organisms.
- **Templates** must not contain business logic — they define layout slots (`ReactNode` props) that pages fill.
- **No level** should hardcode colors, spacing, or typography values. Always use design tokens.

---

## Relationship with shadcn/ui

The `src/components/ui/` directory contains **shadcn/ui primitives** — the raw building blocks provided by the [shadcn/ui](https://ui.shadcn.com/) library. These are pre-styled, accessible components built on Radix UI.

### The contract

1. **Never modify `ui/` components directly** — they are the upstream source. Customization happens through CSS variables and CVA variants defined within the files, not by rewriting their internals.
2. **Atoms wrap or extend `ui/` components** — an atom like `Tag` may compose `Badge` from `ui/badge.tsx`, adding democrito-specific variants.
3. **`ui/` components can be used directly** in molecules and organisms when no atom wrapper is needed (e.g., `Button`, `Input`, `Dialog`).

```
shadcn/ui (ui/)          democrito atoms (atoms/)
┌────────────┐           ┌────────────┐
│ Badge      │──extends──▶ Tag        │
│ Button     │           │ (used directly in molecules)
│ Input      │           │ (used directly in molecules)
│ Dialog     │           │ (used directly in organisms)
└────────────┘           └────────────┘
```

This layering gives us accessible, well-tested primitives _and_ a design-system-specific API on top.

---

## Design Tokens as Foundation

Design tokens are the **invisible layer beneath atoms**. They are the single source of truth for every visual decision in the system.

```
Tokens ──▶ Atoms ──▶ Molecules ──▶ Organisms ──▶ Templates ──▶ Pages
```

### Where tokens live

| File | Role |
|---|---|
| `src/index.css` | **Source of truth** — CSS custom properties in HSL + CSS-first `@theme` block that maps tokens to Tailwind utilities (`bg-surface`, `text-accent`, etc.). Defined for all three themes (Dark, Light, Warm). |

### Token categories

- **Surfaces**: `--background`, `--surface`, `--card` (3-layer depth hierarchy)
- **Text**: `--foreground`, `--muted-foreground`, `--foreground-subtle`
- **Accent**: `--accent`, `--accent-muted`, `--accent-subtle` (terracotta orange)
- **Semantic**: `--success`, `--warning`, `--error`, `--info` (with `-bg` and `-border` variants)
- **Anatomy**: 9 prompt-section colors (`--anatomy-role`, `--anatomy-task`, etc.)
- **Status**: `--status-draft`, `--status-testing`, `--status-production`, `--status-archived`
- **Typography**: 3 font families (display, body, mono) with a 9-step size scale
- **Spacing**: 4px base grid via Tailwind utilities, plus layout tokens (`--header-height`, `--sidebar-width`)
- **Motion**: Duration scale (`--duration-fast` through `--duration-slow`) and easing curves
- **Z-index**: 5-tier scale (base → dropdown → sticky → overlay → modal → toast)

### Why this matters

Tokens ensure that when a theme changes from Dark to Warm, _every_ component adapts automatically. No component ever contains a hardcoded color — they all reference the same CSS variables, which the theme class switches at the `:root` level.

---

## Further Reading

- [Design Tokens Reference](./tokens.md) — complete token inventory with values
- [AI Usage Guide](./ai-usage.md) — how AI tools consume this architecture
- [Component Inventory](../src/DESIGN_SYSTEM.md) — full list of every component
