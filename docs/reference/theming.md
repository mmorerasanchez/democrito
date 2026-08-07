# Theming Guide

> How to customize the design system for your specific product or brand.

The design system ships with a warm, monochromatic palette as the default and two opt-in variants — **Warm** (`:root`, default), **Dark** (`.dark`), **Light** (`.light`). Everything is built on CSS custom properties and Tailwind mappings — **you never touch component code to rebrand**.

---

## Architecture Overview

```
tokens/index.css          →  CSS custom properties (source of truth)
tokens/index.css @theme   →  Maps CSS vars to Tailwind utilities
components/               →  Only use semantic tokens (bg-surface, text-accent, etc.)
```

Theming flows **one direction**: change variables → everything updates. Components never reference raw colors.

---

## 1. Color Palette

### Core Tokens

Every theme must define these tokens in `index.css` inside `@layer base`:

| Token | Purpose | Example Usage |
|---|---|---|
| `--background` | Page background (deepest layer) | `bg-background` |
| `--surface` | Panels, sidebars, headers | `bg-surface` |
| `--card` | Cards, dialogs, elevated content | `bg-card` |
| `--foreground` | Primary text | `text-foreground` |
| `--muted-foreground` | Secondary text, timestamps | `text-muted-foreground` |
| `--foreground-subtle` | Tertiary text, placeholders | `text-foreground-subtle` |
| `--primary` | Standard buttons | `bg-primary` |
| `--secondary` | Secondary actions | `bg-secondary` |
| `--accent` | Brand color, CTAs, links | `bg-accent`, `text-accent` |
| `--border` | All borders | `border-border` |
| `--input` | Form input backgrounds | `bg-input` |
| `--ring` | Focus rings | `ring-ring` |
| `--destructive` | Danger actions | `bg-destructive` |

### Surface Hierarchy

The system uses a **3-layer depth model**. In dark themes, layers get lighter; in light themes, layers get lighter too (higher luminance):

```
Background (deepest) → Surface (mid) → Card (elevated)
```

**Dark example:**
```css
--background: 20 14% 4%;    /* nearly black */
--surface:    20  8% 8%;    /* dark gray */
--card:       12  6% 15%;   /* lighter gray */
```

**Light example:**
```css
--background: 30  5% 96%;   /* off-white */
--surface:    40  6% 97%;   /* slightly warmer */
--card:       40  8% 99%;   /* near white */
```

### Accent System

Three tiers control accent intensity:

| Token | Use |
|---|---|
| `--accent` | Full-strength brand color (CTAs, active states) |
| `--accent-muted` | Hover states, disabled elements |
| `--accent-subtle` | Highlights, selected rows, code backgrounds |

### Semantic Colors

Four feedback tokens with background/border variants at reduced opacity:

```css
--success:        148 45% 50%;
--success-bg:     148 45% 50%;   /* used as bg-success-bg (10% opacity) */
--success-border: 148 45% 50%;   /* used as border-success-border (30% opacity) */
```

Same pattern for `--warning`, `--error`, `--info`. Adjust hue/saturation per theme to maintain readability — avoid using identical neon values across light and dark backgrounds.

### Category Palette

Nine distinct hues for content tagging, labels, and categorical data:

```css
--category-teal:    185 55% 42%;
--category-amber:    38 80% 50%;
--category-emerald: 152 55% 40%;
--category-orange:   25 85% 52%;
--category-violet:  262 55% 55%;
--category-rose:    340 65% 55%;
--category-blue:    230 60% 58%;
--category-red:       0 70% 55%;
--category-gold:     48 85% 48%;
```

You can remap these to your own categorical needs — they're used via `text-category-teal`, `bg-category-violet/10`, etc.

---

## 2. Typography

### Font Families

Three font stacks in the `@theme` block of `tokens/index.css`, each with a strict purpose:

```css
@theme {
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body:    "Satoshi", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
}
```

| Stack | Class | Use For |
|---|---|---|
| Display | `font-display` | Headings, navigation, buttons, labels |
| Body | `font-body` | Paragraphs, descriptions, helper text |
| Mono | `font-mono` | Data values, code, user-generated content, table headers |

**To rebrand:** Replace the font names in the `@theme { --font-*: }` entries and the `@import` statements at the top of `tokens/index.css`. The class names (`font-display`, etc.) stay the same — components don't change.

### Type Scale

```ts
fontSize: {
  "2xs": ["0.625rem", { lineHeight: "1.4" }],   // 10px — captions, overlines
  xs:    ["0.75rem",  { lineHeight: "1.4" }],    // 12px — metadata
  sm:    ["0.8125rem",{ lineHeight: "1.5" }],    // 13px — small body
  base:  ["0.875rem", { lineHeight: "1.6" }],    // 14px — default body
  md:    ["1rem",     { lineHeight: "1.5" }],     // 16px — large body
  lg:    ["1.125rem", { lineHeight: "1.5" }],     // 18px — H3
  xl:    ["1.375rem", { lineHeight: "1.4" }],     // 22px — H2
  "2xl": ["1.5rem",   { lineHeight: "1.3" }],    // 24px — H1
  "3xl": ["2.25rem",  { lineHeight: "1.2" }],    // 36px — Hero
},
```

For a consumer app with larger text, scale everything up by ~2px. For a dense data app, you might keep the defaults or even shrink `base` to `0.8125rem`.

---

## 3. Spacing

The spacing grid is based on a **4px base unit** via Tailwind's default scale. Layout-specific tokens live in CSS:

```css
--header-height:     3.5rem;   /* 56px */
--sidebar-width:     15rem;    /* 240px */
--sidebar-collapsed:  4rem;    /* 64px */
--right-panel:       22rem;    /* 352px */
```

Override these in `:root` to adjust shell proportions without touching template components.

---

## 4. Border Radius

Controlled by a single `--radius` variable:

```css
--radius: 0.75rem;  /* 12px — current default */
```

Tailwind maps derive from it:
- `rounded-sm` → `calc(var(--radius) - 8px)` → 4px
- `rounded-md` → `calc(var(--radius) - 4px)` → 8px
- `rounded-lg` → `var(--radius)` → 12px

Set `--radius: 0.5rem` for a sharper look, or `--radius: 1rem` for a softer, more consumer-friendly feel.

---

## 5. Motion

Duration and easing tokens for consistent animation:

```css
--duration-fast:   100ms;
--duration-normal: 150ms;
--duration-medium: 200ms;
--duration-slow:   300ms;
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
--ease-spring:  cubic-bezier(0.34, 1.56, 0.64, 1);
```

---

## 6. Complete Examples

### Example A: Dark Analytics Dashboard

A data-heavy dashboard with a cool-toned palette and tight spacing.

```css
/* index.css — :root overrides */
:root {
  /* Cool blue-gray surfaces */
  --background: 220 15% 6%;
  --surface:    220 12% 10%;
  --card:       220 10% 14%;

  /* Text */
  --foreground:        210 20% 95%;
  --muted-foreground:  215 10% 55%;
  --foreground-subtle: 215 8% 40%;

  /* Electric blue accent */
  --accent:            210 100% 55%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      210 60% 35%;
  --accent-subtle:     215 20% 12%;

  /* Borders */
  --border: 220 10% 20%;
  --input:  220 10% 14%;
  --ring:   210 100% 55%;

  /* Tighter radius for data density */
  --radius: 0.5rem;

  /* Narrower sidebar */
  --sidebar-width: 13rem;
}
```

```css
/* tokens/index.css — @theme font overrides */
@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", Consolas, monospace;
}
```

```css
/* index.css — @import replacement */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
```

**Key differences from default:**
- Cool blue-gray neutrals instead of warm stone
- Electric blue accent instead of terracotta
- Single font family (Inter) for display and body — maximizes data density
- Smaller radius (8px base) for a tighter, more technical feel

---

### Example B: Light Consumer App

A friendly, spacious consumer product with a green accent.

```css
/* index.css — .light class (or :root if light-only) */
:root {
  /* Warm cream surfaces */
  --background: 40 20% 97%;
  --surface:    40 15% 98%;
  --card:       0 0% 100%;

  /* Text */
  --foreground:        30 10% 12%;
  --muted-foreground:  30 5% 45%;
  --foreground-subtle: 30 3% 60%;

  /* Green accent */
  --accent:            155 65% 42%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      155 40% 65%;
  --accent-subtle:     155 15% 95%;

  /* Soft borders */
  --border: 30 10% 90%;
  --input:  30 10% 90%;
  --ring:   155 65% 42%;

  /* Rounder corners */
  --radius: 1rem;

  /* Larger sidebar for readability */
  --sidebar-width: 16rem;
}
```

```css
/* tokens/index.css — @theme font overrides */
@theme {
  --font-display: "DM Sans", system-ui, sans-serif;
  --font-body:    "DM Sans", system-ui, sans-serif;
  --font-mono:    "Fira Code", monospace;
}
```

```css
/* index.css — @import replacement */
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fira+Code:wght@400;500;700&display=swap');
```

**Key differences from default:**
- Warm cream backgrounds with pure white cards
- Green accent for a fresh, consumer-friendly feel
- Larger radius (16px base) for softer, friendlier shapes
- DM Sans for a modern, approachable personality

---

## Checklist: Rebranding the System

1. **Pick your accent color** — one hue that defines your brand. Set `--accent`, `--accent-muted`, `--accent-subtle`.
2. **Set your surface scale** — three HSL values with increasing lightness (dark themes) or decreasing saturation (light themes).
3. **Choose your fonts** — update `@import` and the `@theme { --font-*: }` entries in `tokens/index.css`.
4. **Tune radius** — set `--radius` once; all components inherit.
5. **Adjust semantics** — shift success/warning/error/info hues to harmonize with your palette temperature.
6. **Test all three layers** — background, surface, and card should feel like a natural depth progression.
7. **Verify contrast** — ensure `--foreground` on `--background` meets WCAG AA (4.5:1 for body text).
8. **Set `color-scheme`** — add `color-scheme: light` or `color-scheme: dark` to each theme block so native browser controls (scrollbars, inputs, `<dialog>` backdrops) match the rest of the UI.

No component files need to change. The system is designed so that **tokens are the only branding surface**.

---

Three systems have rethemed democrito in production. The [showcase](../showcase.md) records how far each went and what broke.
