# Design Tokens Reference

> Complete inventory of every design token in the **democrito** design system.
> democrito is the visual foundation of [prompt-x](https://github.com/mmorerasanchez/prompt-x).
> This document is the reference for implementing the system without reading source code.

---

## Color Palette

All colors are defined as CSS custom properties in HSL format (without the `hsl()` wrapper).
Three themes are supported: **Dark** (default), **Light**, and **Warm**.

### Core Surfaces (3-Layer Hierarchy)

| Token | Tailwind Class | Dark | Light | Warm | Purpose |
|---|---|---|---|---|---|
| `--background` | `bg-background` | `hsl(20 14% 4%)` · #0D0B0A | `hsl(30 5% 96%)` · #F5F4F3 | `hsl(30 18% 91%)` · #EDE6DC | Page background |
| `--surface` | `bg-surface` | `hsl(20 8% 8%)` · #161413 | `hsl(40 6% 97%)` · #F8F7F6 | `hsl(40 15% 94%)` · #F2EDE5 | Panels, sidebars, headers |
| `--card` | `bg-card` | `hsl(12 6% 15%)` · #282423 | `hsl(40 8% 99%)` · #FDFCFB | `hsl(30 25% 97%)` · #FAF6F1 | Cards, dialogs, elevated content |

### Text Colors

| Token | Tailwind Class | Dark | Light | Warm | Purpose |
|---|---|---|---|---|---|
| `--foreground` | `text-foreground` | `hsl(60 9% 98%)` · #FAFAF8 | `hsl(24 10% 10%)` · #1C1917 | `hsl(12 6% 15%)` · #282423 | Primary text |
| `--muted-foreground` | `text-muted-foreground` | `hsl(24 5% 64%)` · #A8A29E | `hsl(20 6% 41%)` · #6E6863 | `hsl(20 6% 41%)` · #6E6863 | Secondary text, timestamps |
| `--foreground-subtle` | `text-foreground-subtle` | `hsl(24 5% 45%)` · #787067 | `hsl(20 3% 55%)` · #8E8B88 | `hsl(20 3% 55%)` · #8E8B88 | Tertiary text, placeholders |
| `--foreground-muted` | `text-foreground-muted` | `hsl(24 5% 64%)` · #A8A29E | `hsl(20 6% 41%)` · #6E6863 | `hsl(20 6% 41%)` · #6E6863 | Alias for muted-foreground |

### Accent (Terracotta Orange — Hue 18°)

| Token | Tailwind Class | Dark | Light | Warm | Purpose |
|---|---|---|---|---|---|
| `--accent` | `bg-accent` / `text-accent` | `hsl(18 65% 55%)` · #D47639 | `hsl(18 65% 55%)` · #D47639 | `hsl(18 60% 45%)` · #B8622E | Primary CTA, links, highlights |
| `--accent-foreground` | `text-accent-foreground` | `hsl(60 9% 98%)` · #FAFAF8 | `hsl(40 6% 99%)` · #FDFCFB | `hsl(30 25% 97%)` · #FAF6F1 | Text on accent backgrounds |
| `--accent-muted` | `text-accent-muted` | `hsl(18 40% 30%)` · #6B4429 | `hsl(18 35% 65%)` · #C49A7E | `hsl(18 38% 55%)` · #C17A50 | Hover states, disabled badges |
| `--accent-subtle` | `bg-accent-subtle` | `hsl(20 15% 10%)` · #1D1916 | `hsl(30 12% 94%)` · #F2EFEC | `hsl(30 15% 92%)` · #EEE8E0 | Code block backgrounds, active tabs |

### Primary & Secondary (Theme-Inverted)

| Token | Dark | Light | Warm | Purpose |
|---|---|---|---|---|
| `--primary` | `hsl(20 6% 90%)` · #E7E5E3 | `hsl(24 10% 10%)` · #1C1917 | `hsl(15 10% 22%)` · #3D3530 | Standard button fill |
| `--primary-foreground` | `hsl(20 14% 4%)` · #0D0B0A | `hsl(40 6% 98%)` · #FBF9F8 | `hsl(30 25% 97%)` · #FAF6F1 | Text on primary |
| `--secondary` | `hsl(20 8% 17%)` · #2E2A27 | `hsl(30 8% 93%)` · #EDEBE9 | `hsl(28 14% 87%)` · #E2DBD2 | Secondary surfaces |
| `--secondary-foreground` | `hsl(60 9% 98%)` · #FAFAF8 | `hsl(24 10% 10%)` · #1C1917 | `hsl(12 6% 15%)` · #282423 | Text on secondary |

### Muted

| Token | Dark | Light | Warm | Purpose |
|---|---|---|---|---|
| `--muted` | `hsl(24 10% 12%)` · #221E1B | `hsl(25 6% 91%)` · #E9E7E5 | `hsl(25 12% 88%)` · #E4DDD3 | Muted backgrounds |
| `--muted-foreground` | `hsl(24 5% 64%)` · #A8A29E | `hsl(20 6% 41%)` · #6E6863 | `hsl(20 6% 41%)` · #6E6863 | Muted text |

### Borders & Inputs

| Token | Dark | Light | Warm | Purpose |
|---|---|---|---|---|
| `--border` | `hsl(25 8% 25%)` · #453E38 | `hsl(25 8% 89%)` · #E5E1DD | `hsl(28 14% 81%)` · #D5CBC0 | All borders |
| `--input` | `hsl(20 8% 17%)` · #2E2A27 | `hsl(25 8% 89%)` · #E5E1DD | `hsl(28 14% 81%)` · #D5CBC0 | Input backgrounds |
| `--ring` | `hsl(18 65% 55%)` · #D47639 | `hsl(18 65% 55%)` · #D47639 | `hsl(18 60% 45%)` · #B8622E | Focus rings |

### Destructive

| Token | Dark | Light | Warm |
|---|---|---|---|
| `--destructive` | `hsl(6 65% 60%)` · #D9604A | `hsl(6 70% 52%)` · #D24030 | `hsl(8 60% 48%)` · #C34A2E |
| `--destructive-foreground` | `hsl(60 9% 98%)` | `hsl(40 6% 99%)` | `hsl(30 25% 97%)` |

### Semantic Feedback

Each semantic color has three tokens: base (text), `-bg` (background at 10% opacity), and `-border` (border at 30% opacity).

| Category | Dark | Light | Warm |
|---|---|---|---|
| **Success** | `hsl(148 45% 50%)` · #46B876 | `hsl(148 50% 42%)` · #35A864 | `hsl(152 45% 38%)` · #359162 |
| **Warning** | `hsl(40 75% 55%)` · #D9A825 | `hsl(40 80% 48%)` · #DCA218 | `hsl(38 70% 45%)` · #C39422 |
| **Error** | `hsl(6 65% 60%)` · #D9604A | `hsl(6 70% 52%)` · #D24030 | `hsl(8 60% 48%)` · #C34A2E |
| **Info** | `hsl(215 50% 62%)` · #6D93CC | `hsl(215 55% 52%)` · #4475B9 | `hsl(215 45% 48%)` · #4370A5 |

Usage pattern:
```html
<div class="bg-success-bg border border-success-border text-success">...</div>
```

### Anatomy Field Colors (9 Prompt Sections)

| Field | Token | Value | Tailwind |
|---|---|---|---|
| Role | `--anatomy-role` | `hsl(185 55% 42%)` · #30A0A6 | `text-anatomy-role` / `bg-anatomy-role/10` |
| Tone | `--anatomy-tone` | `hsl(38 80% 50%)` · #E6A817 | `text-anatomy-tone` |
| Context | `--anatomy-context` | `hsl(152 55% 40%)` · #2EA370 | `text-anatomy-context` |
| Task | `--anatomy-task` | `hsl(25 85% 52%)` · #E57A1F | `text-anatomy-task` |
| Reasoning | `--anatomy-reasoning` | `hsl(262 55% 55%)` · #7F4FCF | `text-anatomy-reasoning` |
| Examples | `--anatomy-examples` | `hsl(340 65% 55%)` · #D43B6E | `text-anatomy-examples` |
| Output | `--anatomy-output` | `hsl(230 60% 58%)` · #506DCC | `text-anatomy-output` |
| Constraints | `--anatomy-constraints` | `hsl(0 70% 55%)` · #D93D3D | `text-anatomy-constraints` |
| Tools | `--anatomy-tools` | `hsl(48 85% 48%)` · #E2C016 | `text-anatomy-tools` |

### Status Lifecycle

| Status | Token | Value | Tailwind |
|---|---|---|---|
| Draft | `--status-draft` | `hsl(45 93% 47%)` · #E7B80D | `text-status-draft` / `bg-status-draft/10` |
| Testing | `--status-testing` | `hsl(217 91% 60%)` · #3B82F6 | `text-status-testing` / `bg-status-testing/10` |
| Production | `--status-production` | `hsl(142 71% 45%)` · #22C55E | `text-status-production` / `bg-status-production/10` |
| Archived | `--status-archived` | `hsl(0 0% 45%)` · #737373 | `text-status-archived` / `bg-status-archived/10` |

### Utility

| Token | Dark | Light | Warm | Purpose |
|---|---|---|---|---|
| `--warm-dark` | `hsl(20 8% 72%)` · #BAB2AA | `hsl(20 12% 36%)` · #665749 | `hsl(20 14% 30%)` · #574536 | High-contrast emphasis on warm surfaces |

---

## Typography

### Font Families

| Purpose | CSS Class | Primary Font | Fallbacks |
|---|---|---|---|
| Headings, labels, buttons, navigation | `font-display` | Plus Jakarta Sans | Poppins, Inter, system-ui, sans-serif |
| Body text, descriptions, form labels | `font-body` | Satoshi | Outfit, Inter, system-ui, sans-serif |
| Data, code, prompts, variables, badges | `font-mono` | JetBrains Mono | IBM Plex Mono, Consolas, monospace |

**Rule**: All `<input>`, `<textarea>`, and `<SelectTrigger>` components use `font-mono`, except authentication forms which use `font-body` for personal data fields.

### Size Scale

| Class | Size | Line Height | Typical Use |
|---|---|---|---|
| `text-2xs` | 0.625rem (10px) | 1.4 | Overlines, kbd shortcuts |
| `text-xs` | 0.75rem (12px) | 1.4 | Captions, metadata, timestamps |
| `text-sm` | 0.8125rem (13px) | 1.5 | Small body text, helper text |
| `text-base` | 0.875rem (14px) | 1.6 | Default body text |
| `text-md` | 1rem (16px) | 1.5 | H3 headings, emphasized body |
| `text-lg` | 1.125rem (18px) | 1.5 | H2 headings |
| `text-xl` | 1.375rem (22px) | 1.4 | H1 headings |
| `text-2xl` | 1.5rem (24px) | 1.3 | Page titles |
| `text-3xl` | 2.25rem (36px) | 1.2 | Hero / display text |

### Weight Scale

| Weight | Tailwind | Use |
|---|---|---|
| 400 | `font-normal` | Body text, descriptions |
| 500 | `font-medium` | Labels, H3/H4 headings, navigation items |
| 600 | `font-semibold` | H1/H2 headings, buttons, emphasis |
| 700 | `font-bold` | Strong emphasis (rare) |

### Heading Levels

| Level | Classes |
|---|---|
| H1 | `text-xl font-semibold font-display tracking-tight` |
| H2 | `text-lg font-medium font-display` |
| H3 | `text-md font-medium font-display` |
| H4 | `text-base font-medium font-display` |

### Special Text Patterns

| Pattern | Classes |
|---|---|
| Muted body | `text-base font-body text-muted-foreground` |
| Subtle body | `text-base font-body text-foreground-subtle` |
| Caption/meta | `text-xs font-mono text-muted-foreground` |
| Overline | `text-2xs font-mono uppercase tracking-widest text-muted-foreground` |
| Inline code | `rounded-sm border border-border bg-muted px-1.5 py-0.5 font-mono text-sm text-accent` |
| Kbd | `inline-flex h-5 items-center rounded border border-border bg-muted px-1.5 font-mono text-2xs text-muted-foreground` |

---

## Spacing

Base unit: **4px**. All spacing uses Tailwind's default scale mapped to this grid.

| Tailwind | Value | Pixels | Common Use |
|---|---|---|---|
| `p-0.5` / `gap-0.5` | 0.125rem | 2px | Micro adjustments |
| `p-1` / `gap-1` | 0.25rem | 4px | Tight inner padding |
| `p-1.5` | 0.375rem | 6px | Inline code padding |
| `p-2` / `gap-2` | 0.5rem | 8px | Icon gaps, compact padding |
| `p-3` / `gap-3` | 0.75rem | 12px | Card inner padding |
| `p-4` / `gap-4` | 1rem | 16px | Standard section padding |
| `p-5` | 1.25rem | 20px | Medium padding |
| `p-6` / `gap-6` | 1.5rem | 24px | Page-level padding |
| `p-8` / `gap-8` | 2rem | 32px | Large section spacing |
| `p-10` | 2.5rem | 40px | Hero spacing |
| `p-12` | 3rem | 48px | Major section breaks |
| `p-16` | 4rem | 64px | Maximum spacing |

### Layout Tokens

| Token | CSS Variable | Value | Tailwind |
|---|---|---|---|
| Header height | `--header-height` | 3.5rem (56px) | `h-header` |
| Sidebar width | `--sidebar-width` | 15rem (240px) | `w-sidebar-w` |
| Sidebar collapsed | `--sidebar-collapsed` | 4rem (64px) | `w-sidebar-collapsed` |
| Right panel | `--right-panel` | 22rem (352px) | `w-right-panel` |

---

## Border Radius

Based on `--radius: 0.75rem` (12px):

| Class | Formula | Computed | Typical Use |
|---|---|---|---|
| `rounded-sm` | `calc(var(--radius) - 8px)` | 4px | Tags, inline badges, small chips |
| `rounded-md` | `calc(var(--radius) - 4px)` | 8px | Inputs, buttons, dropdowns |
| `rounded-lg` | `var(--radius)` | 12px | Cards, dialogs, panels |
| `rounded-full` | `9999px` | Pill | Avatars, status dots, pill badges |

---

## Z-Index Scale

| Token | CSS Variable | Value | Tailwind | Use |
|---|---|---|---|---|
| Base | `--z-base` | 0 | — | Default stacking |
| Dropdown | `--z-dropdown` | 50 | `z-dropdown` | Dropdown menus, popovers |
| Sticky | `--z-sticky` | 100 | `z-sticky` | Sticky headers, sidebars |
| Overlay | `--z-overlay` | 200 | `z-overlay` | Backdrops, dimming layers |
| Modal | `--z-modal` | 300 | `z-modal` | Dialogs, sheets |
| Toast | `--z-toast` | 400 | `z-toast` | Toast notifications |

---

## Motion

### Duration Scale

| Token | Value | Use |
|---|---|---|
| `--duration-instant` | 50ms | Checkbox toggles, micro-feedback |
| `--duration-fast` | 100ms | Hover state changes, focus rings |
| `--duration-normal` | 150ms | Button press, color transitions |
| `--duration-medium` | 200ms | Panel slides, dropdown open |
| `--duration-slow` | 300ms | Page transitions, accordion expand |

### Easing Curves

| Token | Value | Use |
|---|---|---|
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | General purpose |
| `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering view |
| `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` | Elements leaving view |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful / bouncy feedback |

### Keyframe Animations

| Animation | Tailwind Class | Duration | Use |
|---|---|---|---|
| `ai-pulse` | `animate-ai-pulse` | 1.4s infinite | AI thinking indicator |
| `ai-cursor` | `animate-ai-cursor` | 1s step-end infinite | Blinking cursor in AI output |
| `slide-in-right` | `animate-slide-in-right` | 0.3s ease-out | Panel entry from right |
| `bulk-bar-in` | `animate-bulk-bar-in` | 0.3s ease-out | Bulk action bar entry from bottom |
| `accordion-down` | `animate-accordion-down` | 0.2s ease-out | Accordion content expand |
| `accordion-up` | `animate-accordion-up` | 0.2s ease-out | Accordion content collapse |

### AI State Tokens

| Token | Value | Purpose |
|---|---|---|
| `--ai-pulse-duration` | 1.5s | Pulse animation timing |
| `--ai-thinking-dot-size` | 6px | Thinking indicator dot diameter |
| `--ai-thinking-gap` | 4px | Gap between thinking dots |
| `--ai-thinking-duration` | 1.4s | Thinking animation cycle |
| `--ai-cursor-width` | 2px | Blinking cursor width |
| `--ai-cursor-blink` | 1s | Cursor blink interval |

---

## Reduced Motion

All animations respect `prefers-reduced-motion: reduce`. When active, animation durations are set to `0.01ms` and iteration counts to `1`.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## Breakpoints

| Name | Width | Typical Use |
|---|---|---|
| `sm` | 480px | Large phones |
| `md` | 768px | Tablets |
| `lg` | 1024px | Small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

---

## Sidebar Tokens

Dedicated tokens for the sidebar component, themed per theme:

| Token | Dark | Light | Warm |
|---|---|---|---|
| `--sidebar-background` | `hsl(24 10% 10%)` | `hsl(40 6% 97%)` | `hsl(40 15% 94%)` |
| `--sidebar-foreground` | `hsl(60 9% 98%)` | `hsl(24 10% 10%)` | `hsl(12 6% 15%)` |
| `--sidebar-primary` | `hsl(18 65% 55%)` | `hsl(18 65% 55%)` | `hsl(18 60% 45%)` |
| `--sidebar-primary-foreground` | `hsl(60 9% 98%)` | `hsl(40 6% 99%)` | `hsl(30 25% 97%)` |
| `--sidebar-accent` | `hsl(24 10% 14%)` | `hsl(30 8% 93%)` | `hsl(28 14% 87%)` |
| `--sidebar-accent-foreground` | `hsl(60 9% 98%)` | `hsl(24 10% 10%)` | `hsl(12 6% 15%)` |
| `--sidebar-border` | `hsl(30 6% 25%)` | `hsl(25 8% 89%)` | `hsl(28 14% 81%)` |
| `--sidebar-ring` | `hsl(18 65% 55%)` | `hsl(18 65% 55%)` | `hsl(18 60% 45%)` |

---

## Touch Targets

Minimum interactive element size: **44×44px** (WCAG 2.5.5 AAA).
