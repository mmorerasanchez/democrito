# Design Tokens — Compact Reference

> Complete token inventory for **democrito**. All colors are HSL CSS custom properties.
> Three themes: Dark (`:root`), Light (`.light`), Warm (`.warm`).

---

## Color Palette

### Core Surfaces (3-Layer Hierarchy)

| Token | Tailwind | Dark | Light | Warm |
|---|---|---|---|---|
| `--background` | `bg-background` | `20 14% 4%` | `0 0% 96%` | `30 18% 91%` |
| `--surface` | `bg-surface` | `24 10% 10%` | `0 0% 98%` | `40 15% 94%` |
| `--card` | `bg-card` | `12 6% 15%` | `0 0% 100%` | `30 25% 97%` |

### Text

| Token | Tailwind | Purpose |
|---|---|---|
| `--foreground` | `text-foreground` | Primary text |
| `--muted-foreground` | `text-muted-foreground` | Secondary text, timestamps |
| `--foreground-subtle` | `text-foreground-subtle` | Tertiary text, placeholders |

### Accent (Terracotta Orange — Hue 18°)

| Token | Tailwind | Purpose |
|---|---|---|
| `--accent` | `text-accent` / `bg-accent` | Primary CTA, links, highlights |
| `--accent-foreground` | `text-accent-foreground` | Text on accent backgrounds |

### Semantic Feedback

Each has base (text), `-bg` (10% opacity background), and `-border` (30% opacity border):

| Category | Token | Tailwind |
|---|---|---|
| Success | `--success` | `text-success` / `bg-success-bg` / `border-success-border` |
| Warning | `--warning` | `text-warning` / `bg-warning-bg` / `border-warning-border` |
| Error | `--error` | `text-error` / `bg-error-bg` / `border-error-border` |
| Info | `--info` | `text-info` / `bg-info-bg` / `border-info-border` |

### Borders & Inputs

| Token | Tailwind | Purpose |
|---|---|---|
| `--border` | `border-border` | All borders |
| `--input` | `bg-input` | Input backgrounds |
| `--ring` | `ring-ring` | Focus rings |

### Status Lifecycle

| Status | Token | Tailwind |
|---|---|---|
| Draft | `--status-draft` | `text-status-draft` / `bg-status-draft/10` |
| Testing | `--status-testing` | `text-status-testing` / `bg-status-testing/10` |
| Production | `--status-production` | `text-status-production` / `bg-status-production/10` |
| Archived | `--status-archived` | `text-status-archived` / `bg-status-archived/10` |

### Anatomy Fields (9 Prompt Sections)

`text-anatomy-{role,tone,context,task,reasoning,examples,output,constraints,tools}`

Each supports `/10` bg and `/30` border opacity modifiers.

---

## Typography

### Font Families

| Purpose | Tailwind | Font |
|---|---|---|
| Headings, labels, buttons | `font-display` | Plus Jakarta Sans |
| Body text, descriptions | `font-body` | Satoshi |
| Data, code, prompts | `font-mono` | JetBrains Mono |

### Size Scale

| Class | Size | Use |
|---|---|---|
| `text-2xs` | 10px | Overlines, kbd |
| `text-xs` | 12px | Captions, metadata |
| `text-sm` | 13px | Small body, helpers |
| `text-base` | 14px | Default body |
| `text-md` | 16px | H3 headings |
| `text-lg` | 18px | H2 headings |
| `text-xl` | 22px | H1 headings |

### Heading Levels

| Level | Classes |
|---|---|
| H1 | `text-xl font-semibold font-display tracking-tight` |
| H2 | `text-lg font-medium font-display` |
| H3 | `text-md font-medium font-display` |
| H4 | `text-base font-medium font-display` |

---

## Spacing

Base unit: **4px**. Layout tokens:

| Token | Value | Tailwind |
|---|---|---|
| `--header-height` | 56px | `h-header` |
| `--sidebar-width` | 240px | `w-sidebar-w` |
| `--sidebar-collapsed` | 64px | `w-sidebar-collapsed` |
| `--right-panel` | 352px | `w-right-panel` |

---

## Border Radius

| Class | Value | Use |
|---|---|---|
| `rounded-sm` | 4px | Tags, small chips |
| `rounded-md` | 8px | Inputs, buttons |
| `rounded-lg` | 12px | Cards, dialogs |
| `rounded-full` | pill | Avatars, dots |

---

## Z-Index

| Level | Value | Tailwind |
|---|---|---|
| Dropdown | 50 | `z-dropdown` |
| Sticky | 100 | `z-sticky` |
| Overlay | 200 | `z-overlay` |
| Modal | 300 | `z-modal` |
| Toast | 400 | `z-toast` |

---

## Motion

| Duration | Value | Use |
|---|---|---|
| Instant | 50ms | Checkbox toggles |
| Fast | 100ms | Hover states |
| Normal | 150ms | Button press |
| Medium | 200ms | Panel slides |
| Slow | 300ms | Page transitions |

All animations respect `prefers-reduced-motion: reduce`.

---

## Breakpoints

| Name | Width |
|---|---|
| `sm` | 480px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |
