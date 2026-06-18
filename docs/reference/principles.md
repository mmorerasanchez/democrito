# Design Principles

> The foundational beliefs behind every decision in **democrito**.
> These principles guide token choices, component APIs, and layout patterns.

---

## 1. Monochromatic + Accent

**95% warm stone grays · 4% terracotta orange accent · 1% semantic colors.**

The palette is intentionally restrained. A near-monochromatic foundation keeps the interface calm and professional, while a single warm accent color (terracotta orange, `--accent`) draws attention exactly where it's needed — active states, links, variable highlights, and primary CTAs.

Semantic colors (success, warning, error, info) exist strictly for feedback. They never appear decoratively.

**In practice:**
- Use `bg-background`, `bg-surface`, `bg-card` for layouts — never colored backgrounds
- Reserve `text-accent` / `bg-accent` for interactive or highlighted elements
- Semantic feedback colors (`text-success`, `text-error`, etc.) appear only in response to user actions or system state

---

## 2. 3-Surface Hierarchy

**Background → Surface → Card creates depth without complexity.**

Three surface layers establish visual depth through subtle lightness shifts, replacing shadows and borders as the primary depth cue. Each theme maintains minimum visual separation between layers to prevent "collapsed" surfaces where two levels resolve to the same color.

| Layer | Token | Dark | Light | Warm |
|---|---|---|---|---|
| Background | `--background` | 4% lightness | 96% lightness | 91% lightness |
| Surface | `--surface` | 8% lightness | 97% lightness | 94% lightness |
| Card | `--card` | 15% lightness | 99% lightness | 97% lightness |

**In practice:**
- Page backgrounds use `bg-background`
- Panels, sidebars, and headers use `bg-surface`
- Cards, dialogs, and elevated content use `bg-card`
- Input fields must be visually decoupled from their card container — never use the same surface color for both

---

## 3. Typography as Hierarchy

**Three font families convey meaning: Display, Body, Mono.**

Rather than relying on size alone, the font family itself signals the content type. This creates an instantly scannable interface where users can distinguish navigation from content from data at a glance.

| Family | Token | Usage |
|---|---|---|
| Plus Jakarta Sans | `font-display` | Headings, labels, navigation, buttons |
| Satoshi | `font-body` | Body text, descriptions, help content |
| JetBrains Mono | `font-mono` | Code, data values, prompts, user-editable content |

**In practice:**
- Headings always use `font-display` — never `font-body` or `font-mono`
- All user-editable content (prompts, code, data) uses `font-mono`
- Body descriptions and help text use `font-body`
- Size alone doesn't define hierarchy — the font family is the primary signal

---

## 4. Progressive Disclosure

**Start with the lightest variant, add complexity as needed.**

Every component should begin in its most minimal form. Borders, shadows, hover states, and additional controls appear only when they serve a clear purpose. This keeps the default state clean and prevents visual overload.

**In practice:**
- Default to `ghost` or `outline` button variants; use filled variants only for primary actions
- Show advanced options behind expandable sections or secondary tabs
- Use `text-muted-foreground` for secondary information — promote to `text-foreground` only when contextually important
- Empty states should guide, not overwhelm — minimal illustration + single CTA

---

## 5. Accessible by Default

**WCAG 2.1 AA · 44×44px touch targets · keyboard navigation.**

Accessibility is not an afterthought or an enhancement — it's a baseline requirement baked into every token and component. Contrast ratios, touch target sizes, and keyboard focus indicators are built into the design system so developers get accessible output without extra effort.

**In practice:**
- All text/background combinations meet WCAG 2.1 AA contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Interactive elements have a minimum touch target of 44×44px
- Focus states use `ring` tokens for consistent, visible keyboard navigation
- Reduced-motion preferences are respected via `prefers-reduced-motion` media query
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`) are used over generic `<div>`

---

## 6. IDE-Inspired

**Clean, distraction-free workspace optimized for data-dense work.**

democrito is designed for tools, not toys. The visual language borrows from code editors and developer tools: high information density, precise alignment, monospaced data, and minimal ornamentation. The interface should feel like a professional workspace where every pixel earns its place.

**In practice:**
- Layouts use precise spatial tokens (`--header-height`, `--sidebar-width`) — not arbitrary values
- Data-heavy views use compact spacing and `font-mono` for scanability
- Chrome (sidebars, toolbars, headers) stays visually quiet so content takes focus
- Split-pane layouts (editor + preview) follow IDE conventions
- No decorative gradients, illustrations, or animations that don't serve a functional purpose

---

## Applying the Principles

When making design decisions, check against these questions:

1. **Is it monochromatic?** Only accent and semantic colors should stand out.
2. **Which surface layer?** Background, surface, or card — pick the right depth.
3. **Which font family?** Display, body, or mono — the family signals the content type.
4. **Is it minimal?** Start light, add complexity only when justified.
5. **Is it accessible?** Contrast, touch targets, keyboard — check all three.
6. **Is it functional?** Every visual element should serve a purpose.

---

*See [`docs/tokens.md`](./tokens.md) for the full token reference and [`docs/theming.md`](./theming.md) for customization.*
