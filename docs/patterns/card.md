# Card Pattern — Spacing Rules

All values are derived from actual Tailwind classes in source files. No value is assumed or invented.

---

## Variants

Two card variants are in use. Choose based on content density.

| Variant | Use case | Source |
|---|---|---|
| **Standard Card** (`ui/card.tsx`) | General content containers, dialogs, elevated sections | `src/components/ui/card.tsx` |
| **StatCard** (`molecules/StatCard.tsx`) | Compact KPI / metric display | `src/components/molecules/StatCard.tsx` |

---

## Standard Card

Built from shadcn/ui primitives: `Card`, `CardHeader`, `CardContent`, `CardFooter`.

### Spacing rules

| Measurement | Tailwind class | px | Source |
|---|---|---|---|
| Card section padding (all sides) | `p-6` | 24px | `card.tsx:12` (CardHeader) |
| Header title → description gap | `space-y-1.5` | 6px | `card.tsx:12` (CardHeader) |
| Header → body gap | `pt-0` on CardContent | 0px (flush) | `card.tsx:32` |
| Body → footer gap | `pt-0` on CardFooter | 0px (flush) | `card.tsx:38` |

**Note on padding model:** Each sub-section owns its own `p-6`. CardContent and CardFooter remove only the top padding (`pt-0`) so they sit flush below the section above, while left, right, and bottom padding remain at 24px.

### Anatomy

```
┌────────────────────────────────────────┐
│ p-6                                     │
│  CardTitle                              │  ← space-y-1.5 between title/desc
│  CardDescription                        │
│  ─ ─ ─ ─ ─ ─ ─ ─ (flush, pt-0) ─ ─  │
│  p-6 pt-0                               │
│  CardContent                            │
│  ─ ─ ─ ─ ─ ─ ─ ─ (flush, pt-0) ─ ─  │
│  p-6 pt-0                               │
│  CardFooter                             │
└────────────────────────────────────────┘
```

### Source

`src/components/ui/card.tsx`:
```tsx
// CardHeader
<div className={cn("flex flex-col space-y-1.5 p-6", className)} />

// CardContent
<div className={cn("p-6 pt-0", className)} />

// CardFooter
<div className={cn("flex items-center p-6 pt-0", className)} />
```

---

## StatCard (compact variant)

Used in metric grids and KPI dashboards. Smaller padding, tighter internal spacing.

### Spacing rules

| Measurement | Tailwind class | px | Source |
|---|---|---|---|
| Card padding (all sides) | `p-4` | 16px | `StatCard.tsx:12` |
| Label → value → trend gap | `space-y-1` | 4px | `StatCard.tsx:12` |

### Source

`src/components/molecules/StatCard.tsx`:
```tsx
<div className={cn("rounded-md border border-border bg-card p-4 space-y-1", className)}>
  <p className="font-body text-xs text-muted-foreground">{label}</p>
  <p className="font-mono text-2xl font-bold text-foreground">{value}</p>
  {trend && <p className="... gap-1 ...">{trend.value}</p>}
</div>
```

---

## Choosing between variants

| Signal | Use |
|---|---|
| Content has a title + body + optional actions | Standard Card |
| Single metric: label + number + optional trend | StatCard |
| Content needs a footer with buttons | Standard Card (`CardFooter`) |
| Grid of 3–4+ metrics side by side | StatCard |

---

## Antipatterns

- ❌ **Using `p-4` on a Standard Card section** — standard card sections use `p-6`. Using `p-4` creates misaligned padding between sections.
- ❌ **Adding `pt-4` to CardContent** — CardContent intentionally removes top padding (`pt-0`) to stay flush below CardHeader. Adding top padding creates a double-gap.
- ❌ **Using `space-y-4` inside a StatCard** — the tight `space-y-1` spacing is what makes the metric card compact. Increasing it breaks the compact variant's visual rhythm.
- ❌ **Using the Standard Card for metrics** — StatCard uses `font-mono` for the value and is sized for scannable grids. Wrapping a metric in a Standard Card adds unnecessary bulk.
