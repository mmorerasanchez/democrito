# DESIGN.md — democrito

> Visual design philosophy for democrito, an atomic design system for
> data-dense, IDE-inspired applications. This file tells AI agents and
> human collaborators *why* the system looks the way it does and *how*
> to make decisions that stay on-system.
>
> Follows the [design.md convention](https://stitch.withgoogle.com/docs/design-md/overview)
> introduced by Google Stitch — a plain-text design brief that any AI
> coding agent reads alongside your code to generate consistent UI.
>
> **Complements, does not replace:**
> - `CLAUDE.md` — agent coding rules and project structure
> - `docs/reference/design-system.md` — full token inventory and component spec
> - `docs/reference/tokens.md` — exhaustive color/type/spacing reference
>
> This file is the *taste layer*; those files are the *vocabulary*.
>
> Last updated: 2026-08-10

---

## 1. Visual Theme & Atmosphere

democrito's visual identity draws from the philosophy of its namesake,
**Democritus** — the Greek atomist who proposed that all matter is
composed of indivisible units. The design system mirrors this idea:
small, well-defined visual atoms compose into larger structures.

**The atmosphere is:**
- **Warm industrial.** Think a well-lit workshop, not a sterile lab.
  Warm stone grays instead of cool blue-grays. Terracotta instead of
  electric blue.
- **Dense and purposeful.** Every pixel earns its place. Whitespace
  exists for hierarchy, not for decoration.
- **Quiet confidence.** The system doesn't announce itself. No
  gradients, no glows, no illustrations inside the app. Visual
  interest comes from typography contrast and the depth stack.
- **IDE-grade, not consumer-grade.** Closer to VS Code, Linear, or
  Raycast than to Notion, Stripe, or a marketing site. Power users
  are the primary audience.

**Inspiration sources:**
- Sanzo Wada's *Dictionary of Color Combinations* — the warm theme
  is directly derived from Wada's earth-tone palettes
- Dieter Rams' principles — "as little design as possible"
- Code editor color themes — the dark theme's warm stone base

**What democrito is NOT:**
- Not playful (no rounded pill buttons, no emoji in UI, no bouncing
  animations)
- Not cold (no pure grays, no blue-tinted surfaces, no pure white
  backgrounds)
- Not maximalist (no gradients, no shadows for static depth, no
  decorative borders)

---

## 2. Color Palette & Roles

All colors are HSL CSS custom properties defined in `tokens/index.css`.
The default palette is **Warm** — a Sanzo Wada–derived earth-tone system
anchored in stone gray with a terracotta orange accent. **Dark** and
**Light** variants are available via `.dark` and `.light` class toggles
on a theme root.

### Core Surfaces (3-layer depth hierarchy)

The entire depth system uses three surfaces. Never four. Never
shadow-based depth for static elements.

| Role | Token | Dark | Light | Warm | Usage |
|------|-------|------|-------|------|-------|
| Page | `--background` | `20 14% 4%` | `30 6% 93%` | `30 18% 91%` | Outermost page surface |
| Panel | `--surface` | `20 8% 8%` | `40 6% 97%` | `40 15% 94%` | Sidebars, headers, sticky regions |
| Elevated | `--card` | `12 6% 15%` | `40 8% 99%` | `30 25% 97%` | Cards, modals, popovers, dialogs |

**The rule:** `background → surface → card`. Each step is visually
lighter (in dark theme) or more opaque (in light/warm). This is the
only depth system. Shadows are reserved for floating elements
(dropdowns, popovers, tooltips).

### Text Hierarchy

| Role | Token | Dark | Tailwind |
|------|-------|------|----------|
| Primary | `--foreground` | `60 9% 98%` | `text-foreground` |
| Secondary | `--muted-foreground` | `24 5% 64%` | `text-muted-foreground` |
| Tertiary ⚠️ | `--foreground-subtle` | `24 5% 45%` | `text-foreground-subtle` |
| Accent | `--accent` | `18 65% 55%` | `text-accent` |

⚠️ `foreground-subtle` does not meet WCAG AA for body text in any theme, and fails AA-large on Warm and Light backgrounds. Use it only for non-text UI (decorative separators, disabled states) or very large (18px+) tertiary labels. Use `text-muted-foreground` for any readable secondary text.

### Accent: Terracotta Orange

The single accent color is terracotta: `hsl(18 65% 55%)`.

**Three variants, three jobs:**
- `--accent` → primary CTAs, links, focus rings
- `--accent-muted` → `hsl(18 40% 30%)` → hover states, badges
- `--accent-subtle` → `hsl(20 15% 10%)` → code blocks, active tabs,
  selected rows

**Scarcity is the point.** At most one accent-colored button per
screen. Accent marks the single most important action. If everything
is accent, nothing is.

### Semantic Feedback

| State | Token | Purpose |
|-------|-------|---------|
| Success | `--success` | Confirmation, saved states |
| Warning | `--warning` | Caution, approaching limits |
| Error | `--error` | Validation failures, destructive states |
| Info | `--info` | Neutral system messages |

Each semantic color has `bg` and `border` variants at reduced opacity.
Semantic colors are theme-adaptive — each theme tunes the values for
optimal contrast on its surfaces.

### Color philosophy

- **95% monochromatic warm stone grays.** The surface palette.
- **4% terracotta accent.** The action palette.
- **1% semantic colors.** Feedback only, never decoration.
- **No decorative colors, ever.** Every color has a documented
  functional role. If you can't name its role, it doesn't belong.

### A note on theme identity

Warm is the code default (`:root`) and the system's conceptual baseline.
Dark is the theme most associated with democrito's visual identity in
screenshots — the default in code is not the default in people's heads.
When generating UI for democrito, default to Dark for demonstrations
unless the context specifies otherwise.

**Precedence:** code default = Warm (`:root`); demo/screenshot default = Dark; when unsure, use Warm.

---

## 3. Typography Rules

Three fonts. Three semantic signals. No exceptions.

### Font Families

| Token | Font | Role | Signal |
|-------|------|------|--------|
| `font-display` | Plus Jakarta Sans | Headings, buttons, nav labels | "This is structure" |
| `font-body` | Satoshi | Descriptions, body copy, labels | "This is narrative" |
| `font-mono` | JetBrains Mono | All editable content, data, code | "This is data — edit it, copy it, reference it" |

### The Mono Contract

This is the most important typography rule in the system and the one
most often broken:

> **Everything a user can edit, copy, or reference uses `font-mono`.**

This includes: input fields, textareas, variables, model names
(`claude-3.5-sonnet`), data values, table data cells, badges, tab
labels, token counts, KPI numbers, timestamps, identifiers,
metadata.

The mono font is a promise: "you can interact with this content."
Mono text without edit/save/copy affordances is a broken contract.

### Type Scale

These are **CUSTOM sizes redefined in `@theme`** — NOT stock Tailwind values. Always resolve via `tokens/index.css`. `text-md` (16px) is a democrito-only step between `text-base` (14px) and `text-lg` (18px).

| Class | rem | px |
|-------|-----|----|
| `text-2xs` | 0.625rem | 10px |
| `text-xs` | 0.75rem | 12px |
| `text-sm` | 0.8125rem | 13px |
| `text-base` | 0.875rem | 14px |
| `text-md` | 1rem | 16px |
| `text-lg` | 1.125rem | 18px |
| `text-xl` | 1.375rem | 22px |
| `text-2xl` | 1.5rem | 24px |
| `text-3xl` | 2.25rem | 36px |

| Element | Font | Size | Resolved | Weight |
|---------|------|------|----------|--------|
| Page titles (h1) | `font-display` | `text-2xl` | 24px | `font-semibold` |
| Section headers (h2) | `font-display` | `text-xl` | 22px | `font-medium` |
| Card titles (h3) | `font-display` | `text-md` | 16px | `font-medium` |
| Kicker labels (h4) | `font-display` | `text-sm` | 13px | `font-medium uppercase tracking-widest` |
| Button labels | `font-display` | — | — | `font-medium` |
| Nav items | `font-display` | `text-sm` | 13px | `font-medium` |
| Body text | `font-body` | `text-base` | 14px | normal |
| Form labels | `font-body` | `text-sm` | 13px | `font-medium` |
| Descriptions | `font-body` | `text-sm` | 13px | normal |
| All inputs | `font-mono` | `text-base` | 14px | normal |
| Badges | `font-mono` | `text-xs` | 12px | `font-medium` |
| Table headers | `font-mono` | `text-xs` | 12px | `uppercase tracking-widest` |
| Table data | `font-mono` | `text-sm` | 13px | normal |
| KPI values | `font-mono` | `text-2xl` | 24px | `font-bold` |
| Metadata | `font-mono` | `text-2xs` | 10px | normal |

### The wordmark exception

The brand wordmark `democrito` is rendered in `font-mono` lowercase as a deliberate brand decision — the only place in the system where `font-mono` is permitted for non-data content. The rationale: democrito treats user content as code, and the brand identity carries that signal.

Concrete spec:

- Hero (Overview page): `font-mono text-3xl font-bold tracking-tight lowercase`
- Topbar (all pages): `font-mono text-lg font-semibold tracking-tight lowercase`
- Favicon, OG image, and any external surface: same lockup — lowercase mono with the `v3` badge in `text-2xs text-muted-foreground`.

This is the only documented exception to the `font-mono` rule. New content surfaces must use the standard three-font assignments without inventing additional exceptions.

### Font Loading

```html
<!-- Google Fonts (Plus Jakarta Sans + JetBrains Mono) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

<!-- Fontshare (Satoshi) -->
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

---

## 4. Component Stylings

democrito follows Atomic Design methodology. Components compose
upward: atoms → molecules → organisms → templates → pages.

### Buttons

- **Primary:** `bg-primary text-primary-foreground font-display
  font-medium` — inverts per theme (dark on light, light on dark)
- **Accent (CTA):** `bg-accent text-accent-foreground` — terracotta.
  One per screen maximum.
- **Secondary:** `bg-secondary text-secondary-foreground` — subtle,
  for secondary actions
- **Ghost:** `hover:bg-accent/10 text-foreground` — for toolbar
  actions, icon buttons
- **Destructive:** `bg-destructive text-destructive-foreground` —
  delete, danger only
- **States:** hover = `transition-colors duration-150`, focus =
  `ring-2 ring-accent ring-offset-2 ring-offset-background`,
  disabled = `opacity-50 cursor-not-allowed`
- **Never:** pill-shaped (no `rounded-full` on buttons), gradient
  backgrounds, icon-only without aria-label

### Cards

- **Surface:** `bg-card border border-border rounded-lg`
- **Inner spacing:** `p-4` (standard), `p-6` (featured)
- **Title:** `font-display text-md font-medium`
- **Body:** `font-body text-sm text-muted-foreground`
- **Data values inside cards:** `font-mono`
- **Depth:** Cards sit on `--surface` or `--background`. Never nest
  a card inside another card.

### Inputs

- **Container:** `bg-input border border-border rounded-md`
- **Text:** `font-mono text-base` — all input text is monospace
- **Placeholder:** `text-foreground-subtle font-mono`
- **Focus:** `ring-2 ring-accent border-accent`
- **Error:** `border-error ring-error`
- **Labels:** `font-body text-sm font-medium` — labels are NOT mono

### Navigation

- **Sidebar:** `bg-sidebar-background border-r border-sidebar-border`
  — full-height, collapsible (240px → 64px)
- **Top bar:** `bg-surface border-b border-border h-header` — 56px
  fixed height
- **Nav items:** `font-display text-sm font-medium` with Lucide icons
- **Active state:** `bg-sidebar-accent text-accent`

### Tables (DataTable)

- **Headers:** `font-mono text-xs uppercase tracking-widest
  text-muted-foreground bg-surface`
- **Cells:** `font-mono text-sm` — all data is monospace
- **Row hover:** `hover:bg-accent-subtle transition-colors`
- **Borders:** horizontal dividers only (`border-b border-border`)
- **Sorting indicators:** Lucide `ArrowUpDown` icon

### Badges & Tags

- **Badge:** `font-mono text-xs px-2 py-0.5 rounded-md` with
  semantic or status colors at 10% background opacity
- **Tag (atom):** `font-mono text-xs rounded-full bg-accent-subtle
  text-accent` — for categorization
- **Status badge:** uses `--status-draft`, `--status-testing`,
  `--status-production`, `--status-archived` at 10% bg opacity

### Modals & Dialogs

- **Overlay:** `bg-black/50 backdrop-blur-sm z-overlay`
- **Dialog:** `bg-card border border-border rounded-lg shadow-lg
  max-w-md` (default), `max-w-lg` for complex forms
- **Never:** full-width modals for simple content, nested modals

---

## 5. Layout Principles

### Spacing

**Base unit:** 4px

**Scale:** `4` · `8` · `12` · `16` · `24` · `32` · `48` · `64` px

Use Tailwind spacing utilities (`p-1` = 4px, `p-2` = 8px, `p-4` =
16px, etc.). Never use arbitrary values.

### Layout Dimensions

| Element | Token | Value |
|---------|-------|-------|
| Header height | `--header-height` | 56px (3.5rem) |
| Sidebar expanded | `--sidebar-width` | 240px (15rem) |
| Sidebar collapsed | `--sidebar-collapsed` | 64px (4rem) |
| Right panel | `--right-panel` | 352px (22rem) |

### Grid Philosophy

- **No fixed grid system.** Layouts use flexbox and CSS grid
  contextually, not a 12-column grid.
- **Density over sparseness.** Power users want to see more at once.
  Don't pad screens with whitespace to look "clean."
- **Content-first sizing.** Panels and sidebars have fixed token
  widths. Main content fills the remaining space.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `rounded-sm` | 4px | Small elements (badges, tags) |
| `rounded-md` | 8px | Inputs, small cards |
| `rounded-lg` | 12px (`--radius`) | Cards, dialogs, containers |
| `rounded-full` | 9999px | Avatars, status dots only |

**Never:** `rounded-full` on buttons or cards. Pill shapes signal
"consumer app," not "professional tool."

---

## 6. Depth & Elevation

### The Three-Surface Stack

All depth comes from the surface hierarchy, not from shadows:

```
┌─────────────────────────────────────────┐
│  --background  (page)                   │
│  ┌───────────────────────────────────┐  │
│  │  --surface  (sidebar, header)     │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  --card  (cards, dialogs)   │  │  │
│  │  └─────────────────────────────┘  │  │
│  └───────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### Shadow Rules

- **No shadows on static elements.** Cards get `border border-border`,
  not `shadow-md`.
- **Shadows only on floating elements:** dropdowns, popovers,
  tooltips, command palettes.
- **Shadow token:** `shadow-lg` for floating elements, nothing else.

### Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | `0` | Normal flow |
| Dropdown | `50` | Dropdown menus |
| Sticky | `100` | Sticky headers, floating toolbars |
| Overlay | `200` | Modal backdrops |
| Modal | `300` | Dialogs, command palette |
| Toast | `400` | Notifications (topmost) |

---

## 7. Do's and Don'ts

### Do

- **Use semantic token classes** (`bg-surface`, `text-accent`,
  `border-border`) — never hardcode hex, RGB, or HSL values
- **Use the three-font system** to create visual hierarchy without
  size changes
- **Honor the mono contract** — if it's editable, copyable, or
  referenceable, it's `font-mono`
- **Define tokens before using them** — add to `tokens/index.css` first
  (both the CSS custom property and the `@theme` mapping), then use in components
- **Test in all three themes** — Warm (default), Dark, and Light
- **Use Radix UI / shadcn/ui primitives** for all interactive
  elements — extend via CVA variants, never rebuild
- **Use Lucide React** as the only icon library
- **Respect `prefers-reduced-motion`** — all motion becomes instant

### Don't

- **Don't use decorative colors** — no gradients, no glows, no
  tinted backgrounds without a semantic role
- **Don't introduce a fourth surface level** — if a layout needs
  more depth, the hierarchy is wrong
- **Don't use shadows for static depth** — only floating elements
  get shadows
- **Don't use `rounded-full` on buttons** — pill shapes are for
  avatars and status dots
- **Don't add a fourth font** — three is the maximum, period
- **Don't use inline styles for color or spacing** — always go
  through the token system
- **Don't create components without classifying them** — every
  component is an atom, molecule, organism, or template before it's
  written
- **Don't use `bg-gray-800` or `text-white`** — always use semantic
  tokens that respond to theme switching
- **Don't announce AI** — no sparkle emojis, no "AI-powered" labels,
  no pulsing brain icons
- **Don't use more than one accent button per screen** — pick the
  single most important action
- **Don't hide important information behind hover** — if it matters,
  it's visible or one click away
- **Don't use `text-foreground-subtle` for body-size text** — it is
  reserved for non-text UI and large tertiary labels only. It does not
  meet WCAG AA contrast for body copy and fails AA-large on Warm and
  Light page backgrounds. For readable secondary text use
  `text-muted-foreground`.

---

## 8. Responsive Behavior

### Breakpoints

| Breakpoint | Width | Note |
|------------|-------|------|
| `sm` | **480px** | **CUSTOM** — overridden in `@theme` (Tailwind default is 640px) |
| `md` | 768px | Tailwind v4 default |
| `lg` | 1024px | Tailwind v4 default |
| `xl` | 1280px | Tailwind v4 default |
| `2xl` | 1536px | Tailwind v4 default |

Only `sm` is overridden in the `@theme` block (480px instead of 640px); all other breakpoints inherit Tailwind v4 defaults. Verify against `tokens/index.css`.

### Responsive Behavior at each breakpoint

| Breakpoint | Behavior |
|------------|----------|
| `sm` (480px) | Stack sidebar below content |
| `md` (768px) | Collapse sidebar to icon-only |
| `lg` (1024px) | Show full sidebar + content |
| `xl` (1280px) | Show sidebar + content + right panel |
| `2xl` (1536px) | Max content width with side margins |

### Responsive Patterns

- **Sidebar:** Full (240px) → collapsed (64px, icons only) → hidden
  (mobile drawer)
- **Right panel:** Visible at `xl+`, hidden below, accessible via
  button
- **Tables:** Horizontal scroll on small screens, never stack rows
  into cards (data density matters)
- **Cards:** Grid goes from 3–4 columns (`xl`) → 2 columns (`md`)
  → 1 column (`sm`)

### Touch Targets

- **Minimum 44×44px** for interactive elements on touch surfaces
- **Desktop minimum 32×32px** for clickable elements
- **Spacing between targets:** minimum 8px gap to prevent mis-taps

### Motion Reduction

When `prefers-reduced-motion: reduce` is active:
- All `transition-*` become instant (0ms)
- Skeleton shimmer becomes a static gray
- No layout shift animations

---

## 9. Agent Prompt Guide

Quick-reference block for AI coding agents. Copy this entire section
into your system prompt or project context to generate on-system UI.

### Token Quick Reference

```
SURFACES:
  bg-background    → page-level (darkest in dark theme)
  bg-surface       → panels, sidebars, headers
  bg-card          → elevated: cards, dialogs, modals

TEXT:
  text-foreground          → primary text
  text-muted-foreground    → secondary text
  text-foreground-subtle   → tertiary, placeholders
  text-accent              → links, interactive highlights

ACCENT:
  bg-accent         → primary CTA (terracotta, one per screen)
  bg-accent-muted   → hover states, soft badges
  bg-accent-subtle  → code blocks, active tabs, selected rows

BORDERS:
  border-border     → standard borders
  border-input      → input borders

FONTS:
  font-display  → headings, buttons, nav (Plus Jakarta Sans)
  font-body     → descriptions, labels (Satoshi)
  font-mono     → all editable/data content (JetBrains Mono)

SPACING: 4px base. Scale: 4·8·12·16·24·32·48·64px
RADIUS: sm=4px, md=8px, lg=12px, full=avatars only
MOTION: 150ms ease-out default. Respect prefers-reduced-motion.

THEMES: Warm (:root, default), Dark (.dark), Light (.light)
  (.warm is a backwards-compat alias for :root — do not use for new code)
  Toggle Dark/Light via class on <html> element.
```

### Prompt Patterns for Agents

**When generating a new component:**
```
Use democrito tokens. Surface: bg-card. Text: font-display for title,
font-body for description, font-mono for data values. Border:
border-border rounded-lg. Max one accent button. No shadows on cards.
Test in dark, light, and warm themes.
```

**When generating a layout:**
```
Three surfaces only: bg-background for page, bg-surface for sidebar
(w-sidebar-w), bg-card for content cards. Header is h-header
bg-surface. No fourth surface. No gradients.
```

**When generating a form:**
```
Labels: font-body text-sm font-medium. Inputs: font-mono bg-input
border-border rounded-md. Focus: ring-2 ring-accent. Error:
border-error. Submit button: bg-accent (if primary CTA) or
bg-primary (if not the most important action on screen).
```

### Decision Framework

When making a visual decision while working in democrito:

1. Does `docs/reference/design-system.md` already answer this? → Use that.
2. Does the three-surface hierarchy handle the depth? → If no,
   reconsider the layout.
3. Is a fourth font being introduced? → Stop. Three is the limit.
4. Is the color decorative or functional? → If decorative, remove it.
5. Does the mono contract hold? → Editable content must be mono.
6. Does it work in all three themes? → If not tested in Dark and
   Light, it's not done (Warm is the default and is your baseline).
7. Does it violate the Don'ts in section 7? → Don't ship it.
8. Would this feel right in VS Code or Linear? → If no, rethink.

---

## 10. Relationship to Other Docs

democrito has multiple context files that serve different audiences
and tools. This is how they relate:

| File | Role | Audience |
|------|------|----------|
| `DESIGN.md` (this file) | Design philosophy, visual taste, agent prompt guide | AI agents (Stitch, Claude, Cursor), designers |
| `CLAUDE.md` | Coding rules, project structure, key files | AI coding agents (Claude Code, Cursor, Windsurf) |
| `docs/reference/design-system.md` | Full token inventory, component spec, every value | Developers, component authors |
| `docs/reference/tokens.md` | Color/type/spacing reference with examples | Developers, designers |
| `docs/reference/theming.md` | How to customize for your brand | Developers adopting democrito |
| `docs/reference/architecture.md` | Why Atomic Design, folder structure, composition rules | Contributors |
| `docs/ai/README.md` | Prompting strategies for each AI tool | AI-assisted developers |
| `tokens/design-tokens.json` | W3C DTCG format tokens | Figma Token Studio, Style Dictionary |

**Resolution order when sources conflict:**

1. `tokens/index.css` — token values (the source of truth)
2. `DESIGN.md` — philosophy wins on intent questions
3. `docs/reference/design-system.md` — spec wins on component details
4. `CLAUDE.md` — rules win on coding conventions
5. `docs/` files — extended reference

### For Products Built on democrito

If you're building a product on top of democrito,
create your own `DESIGN.md` that:

1. References democrito as the visual foundation
2. Adds your product-specific opinions (metaphor, domain patterns,
   interaction principles)
3. Defines what's democrito-generic vs. product-specific
4. Points to your local token overrides

The test for what belongs in democrito vs. your product: *"Would a
dashboard, editor, or workspace built on democrito also benefit from
this?"* If yes → democrito. If no → your product's design.md.

---

## Appendix: Theme Previews

### Warm (default)

The most differentiated theme — democrito's baseline. Inspired by
Sanzo Wada's earth-tone palettes. Background is a visible warm beige
(`30 18% 91%`). Cards are warm ivory (`30 25% 97%`). This theme makes
democrito feel like a physical artifact — paper, stone, clay.

### Dark

Cold stone grays with terracotta accent. The "workshop at night"
feel. Background is near-black with warm undertones (`20 14% 4%`).
Surfaces step up in lightness. Text is warm white (`60 9% 98%`).
Applied via `.dark` class.

### Light

Warm off-whites with the same terracotta accent. Background is warm
cream (`30 6% 93%`), not pure white. Cards are near-white
(`40 8% 99%`). Text is dark warm gray (`24 10% 10%`).
Applied via `.light` class.

---

*Named for Democritus, the Greek atomist. Indivisible units,
composed into everything.*
