# democrito with Lovable

> Lovable is fully supported as a visual development environment. It connects to your
> GitHub repo and reads component patterns, `CLAUDE.md`, and all source files directly.

---

## Knowledge architecture

Lovable has a two-tier persistent knowledge system. Use both tiers — they serve
different purposes:

| Tier | Location | Scope | What to put here |
|---|---|---|---|
| **Workspace Knowledge** | Workspace settings → Knowledge | All projects in the workspace | democrito's global rules: atomic design conventions, three-font system, token-first rule, check-existing-atoms rule |
| **Project Knowledge** | Project settings → Knowledge (10,000 char limit) | This project only | Product-specific overrides: accent color, font substitutions, radius, any product-specific constraints |

**When both are set, Project Knowledge takes priority.** Put democrito's universal
rules in Workspace Knowledge once, then use Project Knowledge only for what changes
per product.

**Workspace Knowledge — what to paste:**

```
democrito design system rules (apply to all projects):

ARCHITECTURE: Atomic Design (atoms → molecules → organisms → templates → pages)
- Before creating any component, check registry/atoms/, registry/molecules/, registry/ui/ for existing ones.
- Name the atomic level in every prompt ("create a molecule", "extend the organism").

TOKENS: All colors, spacing, and radii come from CSS custom properties. Never hardcode.
- Surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated). Max 3 levels.
- Text: text-foreground / text-muted-foreground / text-foreground-subtle
- Accent: text-accent (terracotta) — at most one accent button per screen
- Borders: border-border / bg-input

FONTS (non-negotiable):
- font-display (Plus Jakarta Sans): headings, buttons, nav labels
- font-body (Satoshi): descriptions, body copy
- font-mono (JetBrains Mono): ALL data values, inputs, badges, code, user-editable content

RULES:
- Never use bg-gray-800, text-white, or any hardcoded color
- No fourth surface level, no gradients, no decorative colors
- Extend shadcn/ui primitives (registry/ui/), never rebuild them
- TypeScript with explicit prop interfaces
```

**Project Knowledge — example for a product override:**

```
This project overrides democrito's warm default with a dark violet theme:
- Accent: violet (--accent: 262 70% 62%), not terracotta
- Theme: dark is the root; warm not used
- Font-mono: IBM Plex Mono instead of JetBrains Mono
- Right panel: 26rem (wider — prompt preview context)
All other democrito rules apply unchanged.
```

---

## GitHub sync and CLAUDE.md

When Lovable is connected to your GitHub repo, it reads `CLAUDE.md` directly.
If both Workspace Knowledge and `CLAUDE.md` are active:
- Put the **coding conventions and file structure** in `CLAUDE.md` (Lovable reads it per-session)
- Put the **token quick-reference and rules summary** in Workspace Knowledge (always loaded)
- Avoid duplicating the same content in both — it wastes your context budget

---

## Cross-project component referencing

Lovable's `@` mention lets you reference components from another project in your
workspace. If you've built democrito atoms (Button, Tag, Input) in one project, you
can reference them from a new project:

```
Build a FilterBar molecule. Reference the Tag atom from @democrito-core.
Use the same font-mono text-xs pattern as the Badge component there.
```

---

## Example prompts

```
Create a new molecule called NotificationBanner that composes the StatusBadge and Text atoms.
Follow the existing pattern in registry/molecules/StatCard.tsx.
Use font-body for the message text and text-accent for the icon color.
```

```
Add a "Favorites" filter tab to the FilterBar organism.
Use the existing TabNav molecule pattern. Active state: bg-accent-subtle.
```

```
Create a settings form using FormField molecules.
All inputs must use font-mono. Labels use font-display text-sm.
Follow the spacing pattern from the existing SettingsPage.
```

---

## Further reading

- [`CLAUDE.md`](../../CLAUDE.md) — auto-read by Lovable when GitHub is connected
- [`docs/ai/README.md`](./README.md) — AI context layer overview and compact token reference
