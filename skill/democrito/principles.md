# Design Principles

> The 6 foundational beliefs behind every decision in **democrito**.

---

## 1. Monochromatic + Accent

**95% warm stone grays · 4% terracotta orange accent · 1% semantic colors.**

The palette is intentionally restrained. A near-monochromatic foundation keeps the interface calm and professional, while a single warm accent color (terracotta orange, `--accent`) draws attention exactly where it's needed.

- Use `bg-background`, `bg-surface`, `bg-card` for layouts — never colored backgrounds
- Reserve `text-accent` / `bg-accent` for interactive or highlighted elements
- Semantic feedback colors appear only in response to user actions or system state

---

## 2. 3-Surface Hierarchy

**Background → Surface → Card creates depth without complexity.**

| Layer | Token | Dark | Light | Warm |
|---|---|---|---|---|
| Background | `--background` | 4% lightness | 96% lightness | 91% lightness |
| Surface | `--surface` | 8% lightness | 97% lightness | 94% lightness |
| Card | `--card` | 15% lightness | 99% lightness | 97% lightness |

- Page backgrounds use `bg-background`
- Panels, sidebars, and headers use `bg-surface`
- Cards, dialogs, and elevated content use `bg-card`

---

## 3. Typography as Hierarchy

**Three font families convey meaning: Display, Body, Mono.**

| Family | Token | Usage |
|---|---|---|
| Plus Jakarta Sans | `font-display` | Headings, labels, navigation, buttons |
| Satoshi | `font-body` | Body text, descriptions, help content |
| JetBrains Mono | `font-mono` | Code, data values, prompts, user-editable content |

The font family itself signals the content type — size alone doesn't define hierarchy.

---

## 4. Progressive Disclosure

**Start with the lightest variant, add complexity as needed.**

- Default to `ghost` or `outline` button variants; use filled variants only for primary actions
- Show advanced options behind expandable sections or secondary tabs
- Use `text-muted-foreground` for secondary information
- Empty states should guide, not overwhelm

---

## 5. Accessible by Default

**WCAG 2.1 AA · 44×44px touch targets · keyboard navigation.**

- All text/background combinations meet WCAG 2.1 AA contrast ratios
- Interactive elements have a minimum touch target of 44×44px
- Focus states use `ring` tokens for visible keyboard navigation
- Reduced-motion preferences are respected via `prefers-reduced-motion`
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`) over generic `<div>`

---

## 6. IDE-Inspired

**Clean, distraction-free workspace optimized for prompt engineering.**

- Layouts use precise spatial tokens (`--header-height`, `--sidebar-width`)
- Data-heavy views use compact spacing and `font-mono` for scanability
- Chrome stays visually quiet so content takes focus
- Split-pane layouts follow IDE conventions
- No decorative gradients, illustrations, or animations without functional purpose

---

## Quick Checklist

1. **Is it monochromatic?** Only accent and semantic colors should stand out.
2. **Which surface layer?** Background, surface, or card — pick the right depth.
3. **Which font family?** Display, body, or mono — the family signals the content type.
4. **Is it minimal?** Start light, add complexity only when justified.
5. **Is it accessible?** Contrast, touch targets, keyboard — check all three.
6. **Is it functional?** Every visual element should serve a purpose.
