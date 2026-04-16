# DESIGN.md — democrito

> Atomic design system for data-dense, IDE-inspired applications.
> Warm industrial aesthetic with terracotta accent, three-surface
> depth, and three-font semantic typography.
>
> Open-source: https://github.com/mmorerasanchez/democrito
> Live demo: https://democrito.design
>
> Unlike most entries in this collection, democrito is not a
> reverse-engineered brand aesthetic — it's an actual open-source
> design system with real CSS custom properties, a shadcn/ui
> registry, and a Claude Skill for AI-assisted development.

---

## 1. Visual Theme & Atmosphere

democrito is named after **Democritus**, the Greek atomist who
proposed that all matter is composed of indivisible units. The
design system mirrors this: small, well-defined visual atoms
compose into larger structures.

**The atmosphere is:**

- **Warm industrial.** A well-lit workshop, not a sterile lab.
  Warm stone grays instead of cool blue-grays. Terracotta instead
  of electric blue.
- **Dense and purposeful.** Every pixel earns its place. Whitespace
  exists for hierarchy, not decoration.
- **Quiet confidence.** No gradients, no glows, no illustrations
  inside the app. Visual interest comes from typography contrast
  and the depth stack.
- **IDE-grade, not consumer-grade.** Closer to VS Code, Linear,
  or Raycast than to Notion, Stripe, or a marketing site.

**Inspiration:** Sanzo Wada's *Dictionary of Color Combinations*
(the Warm theme), Dieter Rams' "as little design as possible,"
code editor color themes (warm stone base).

**What it is NOT:** playful (no pill buttons, no emoji in UI),
cold (no pure grays, no blue-tinted surfaces), maximalist (no
gradients, no decorative shadows).

---

## 2. Color Palette & Roles

All colors are HSL CSS custom properties. Three themes: **Dark**
(default), **Light**, and **Warm**.

### Core Surfaces (3-layer depth hierarchy)

Never four surfaces. Never shadow-based depth for static elements.

| Role | Token | Dark HSL | Light HSL | Warm HSL |
|------|-------|----------|-----------|----------|
| Page | `--background` | `20 14% 4%` | `30 5% 96%` | `30 18% 91%` |
| Panel | `--surface` | `20 8% 8%` | `40 6% 97%` | `40 15% 94%` |
| Elevated | `--card` | `12 6% 15%` | `40 8% 99%` | `30 25% 97%` |

### Text Colors

| Role | Token | Dark HSL |
|------|-------|----------|
| Primary | `--foreground` | `60 9% 98%` |
| Secondary | `--muted-foreground` | `24 5% 64%` |
| Tertiary | `--foreground-subtle` | `24 5% 45%` |
| Interactive | `--accent` | `18 65% 55%` |

### Accent: Terracotta Orange

Single accent hue — `hsl(18 65% 55%)` — with three intensity
variants:

| Variant | Token | HSL | Usage |
|---------|-------|-----|-------|
| Full | `--accent` | `18 65% 55%` | CTAs, links, focus rings |
| Muted | `--accent-muted` | `18 40% 30%` | Hover states, badges |
| Subtle | `--accent-subtle` | `20 15% 10%` | Code blocks, active tabs, selected rows |

**Rule:** At most one accent button per screen. Accent marks the
single most important action. Scarcity is the point.

### Semantic Feedback

| State | Token | Dark HSL |
|-------|-------|----------|
| Success | `--success` | `148 45% 50%` |
| Warning | `--warning` | `40 75% 55%` |
| Error | `--error` | `6 65% 60%` |
| Info | `--info` | `215 50% 62%` |

### Color Distribution

- **95%** monochromatic warm stone grays (surfaces)
- **4%** terracotta accent (action)
- **1%** semantic colors (feedback only)
- **0%** decorative colors — every color has a functional role

---

## 3. Typography Rules

Three fonts. Three semantic signals. No exceptions.

| Token | Font | Role | Signal |
|-------|------|------|--------|
| `font-display` | Plus Jakarta Sans | Headings, buttons, nav | "This is structure" |
| `font-body` | Satoshi | Body text, labels, descriptions | "This is narrative" |
| `font-mono` | JetBrains Mono | All editable content, data, code | "This is data" |

### The Mono Contract

> **Everything a user can edit, copy, or reference uses `font-mono`.**

Inputs, variables, model names, data values, table cells, badges,
KPI numbers, timestamps, identifiers. Mono is a promise: "you can
interact with this content."

### Type Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Page titles | display | xl | semibold |
| Section headers | display | lg | medium |
| Card titles | display | md | medium |
| Button labels | display | — | medium |
| Nav items | display | sm | medium |
| Body text | body | base | normal |
| Form labels | body | sm | medium |
| All inputs | mono | base | normal |
| Badges | mono | xs | medium |
| Table headers | mono | xs | uppercase tracking-widest |
| Table data | mono | sm | normal |
| KPI values | mono | 2xl | bold |

### Font Loading

```html
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
<link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700&display=swap" rel="stylesheet">
```

---

## 4. Component Stylings

### Buttons

| Variant | Style | Usage |
|---------|-------|-------|
| Primary | `bg-primary text-primary-foreground` | Standard actions |
| Accent | `bg-accent text-accent-foreground` | Single CTA per screen |
| Ghost | `hover:bg-accent/10 text-foreground` | Toolbar, icon buttons |
| Destructive | `bg-destructive` | Delete, danger only |

- All buttons: `font-display font-medium rounded-md`
- Hover: `transition-colors duration-150`
- Focus: `ring-2 ring-accent ring-offset-2 ring-offset-background`
- Never: pill-shaped (`rounded-full`), gradient backgrounds

### Cards

- Surface: `bg-card border border-border rounded-lg p-4`
- Title: `font-display text-md font-medium`
- Body: `font-body text-sm text-muted-foreground`
- Data inside: `font-mono`
- No nested cards. Cards sit on `--surface` or `--background`.

### Inputs

- Container: `bg-input border border-border rounded-md`
- Text: `font-mono text-base` (all input text is monospace)
- Labels: `font-body text-sm font-medium` (labels are NOT mono)
- Focus: `ring-2 ring-accent border-accent`
- Error: `border-error ring-error`

### Navigation

- Sidebar: `240px` expanded, `64px` collapsed, full-height
- Top bar: `56px` fixed height, `bg-surface border-b`
- Nav items: `font-display text-sm font-medium` with Lucide icons
- Active: `bg-sidebar-accent text-accent`

### Tables

- Headers: `font-mono text-xs uppercase tracking-widest bg-surface`
- Cells: `font-mono text-sm`
- Row hover: `hover:bg-accent-subtle transition-colors`
- Borders: horizontal only (`border-b border-border`)

### Badges

- Standard: `font-mono text-xs px-2 py-0.5 rounded-md`
- Semantic colors at 10% background opacity
- Status variants: draft (yellow), testing (blue), production
  (green), archived (gray)

---

## 5. Layout Principles

### Spacing

**Base:** 4px
**Scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 px

### Layout Dimensions

| Element | Value |
|---------|-------|
| Header height | 56px |
| Sidebar expanded | 240px |
| Sidebar collapsed | 64px |
| Right panel | 352px |

### Grid Philosophy

- No fixed column grid. Layouts use flexbox and CSS grid.
- Density over sparseness — power users want to see more.
- Content-first sizing — panels have token widths, main fills
  remaining space.

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| sm | 4px | Badges, tags |
| md | 8px | Inputs, small cards |
| lg | 12px | Cards, dialogs |
| full | 9999px | Avatars and status dots only |

---

## 6. Depth & Elevation

### Three-Surface Stack

```
  --background  (page, outermost)
    --surface   (sidebar, header, panels)
      --card    (cards, dialogs, elevated content)
```

Depth comes from surface color steps, not from shadows.

### Shadow Rules

- **No shadows** on static elements (cards, panels)
- Shadows only on floating elements: dropdowns, popovers,
  tooltips, command palette
- Single shadow token: `shadow-lg`

### Z-Index

| Layer | Value |
|-------|-------|
| Base | 0 |
| Dropdown | 50 |
| Sticky | 100 |
| Overlay | 200 |
| Modal | 300 |
| Toast | 400 |

---

## 7. Do's and Don'ts

### Do

- Use semantic tokens (`bg-surface`, `text-accent`, `border-border`)
- Use three-font system for hierarchy without size changes
- Honor the mono contract (editable = mono)
- Test in all three themes (Dark, Light, Warm)
- Use Radix UI / shadcn/ui for interactive primitives
- Use Lucide React for icons
- Respect `prefers-reduced-motion`

### Don't

- Hardcode hex/RGB values — always use CSS custom properties
- Introduce a fourth surface level
- Use shadows for static depth
- Use `rounded-full` on buttons (pill = consumer app)
- Add a fourth font
- Use decorative colors (no gradients, no glows)
- Use sparkle emojis or "AI-powered" labels
- Show more than one accent button per screen
- Hide information behind hover states

---

## 8. Responsive Behavior

### Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| sm | 640px | Stack sidebar below |
| md | 768px | Collapse sidebar to icons |
| lg | 1024px | Full sidebar + content |
| xl | 1280px | Add right panel |

### Patterns

- **Sidebar:** Full → icons → mobile drawer
- **Right panel:** Visible at xl+, button-toggled below
- **Tables:** Horizontal scroll, never card-stacking
- **Cards:** 4col → 2col → 1col

### Touch & Motion

- Minimum 44×44px touch targets (32×32 desktop)
- Default transition: `150ms ease-out`
- `prefers-reduced-motion`: all transitions become instant

---

## 9. Agent Prompt Guide

### Token Quick Reference

```
SURFACES:  bg-background → bg-surface → bg-card
TEXT:      text-foreground | text-muted-foreground | text-foreground-subtle
ACCENT:    bg-accent (CTA) | bg-accent-muted (hover) | bg-accent-subtle (selected)
BORDER:    border-border
FONTS:     font-display (headings) | font-body (prose) | font-mono (data)
SPACING:   4px base. Scale: 4·8·12·16·24·32·48·64
RADIUS:    sm=4 md=8 lg=12 full=avatars
MOTION:    150ms ease-out. Respect prefers-reduced-motion.
THEMES:    Dark (:root) | Light (.light) | Warm (.warm)
```

### Ready-to-Use Prompts

**New component:**
```
Use democrito design tokens. bg-card surface, font-display for title,
font-body for description, font-mono for data. border-border rounded-lg.
One accent button max. No shadows on cards. Works in dark, light, warm.
```

**Layout:**
```
Three surfaces: bg-background (page), bg-surface (sidebar 240px),
bg-card (content). Header 56px bg-surface. No fourth surface.
```

**Form:**
```
Labels: font-body text-sm font-medium. Inputs: font-mono bg-input
border-border rounded-md. Focus: ring-2 ring-accent. Error: border-error.
```

### Install

```bash
# shadcn registry (tokens + Tailwind config)
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito

# Clone full system
git clone https://github.com/mmorerasanchez/democrito.git
```
