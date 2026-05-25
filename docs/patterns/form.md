# Form Pattern — Spacing Rules

All values are derived from actual Tailwind classes in source files. No value is assumed or invented.

---

## Spacing rules

| Measurement | Tailwind class | px | Token | Source |
|---|---|---|---|---|
| Label → input (within one field) | `space-y-1` | 4px | `p-1` | `FormField.tsx:18` |
| Helper / inline error → (rendered within FormField) | `space-y-1` | 4px | `p-1` | `FormField.tsx:18` |
| Field → field (recurring) | `space-y-4` | 16px | `p-4` | `AuthForm.tsx:54` |
| Last field → submit button | `space-y-4` | 16px | `p-4` | `AuthForm.tsx:54` |
| Major form section → next section | `space-y-6` | 24px | `p-6` | `AuthForm.tsx:26` |

---

## Field anatomy

A single `FormField` composes three layers stacked with `space-y-1`:

```
┌─────────────────────────────┐
│ Label                        │  ← <Label>
│ ─ ─ ─ ─ ─ ─ space-y-1 ─ ─ │
│ [ Input / Textarea ]         │  ← children (any shadcn/ui input)
│ ─ ─ ─ ─ ─ ─ space-y-1 ─ ─ │
│ Helper text  OR  ⚠ Error    │  ← <p> (conditional)
└─────────────────────────────┘
```

Source — `src/components/molecules/FormField.tsx:18`:
```tsx
<div className={cn("space-y-1", className)}>
  <Label>{label}</Label>
  {children}
  {error ? <p className="... gap-1 ...">...</p> : helper ? <p>...</p> : null}
</div>
```

---

## Form stack (field → field → submit)

Fields and the submit button share a single vertical stack with `space-y-4`:

```
┌─────────────────────────────┐
│ FormField (Email)            │
│ ─ ─ ─ ─ ─ space-y-4 ─ ─ ─ │
│ FormField (Password)         │
│ ─ ─ ─ ─ ─ space-y-4 ─ ─ ─ │
│ Button (Submit)              │
└─────────────────────────────┘
```

Source — `src/components/organisms/AuthForm.tsx:54`:
```tsx
<form className="space-y-4">
  <FormField label="Email" ...>...</FormField>
  <FormField label="Password" ...>...</FormField>
  <Button type="submit" className="w-full">Sign In</Button>
</form>
```

---

## Section gap

When a form is preceded by a header, social auth block, or separator, the surrounding wrapper uses `space-y-6` to separate major sections:

```
┌─────────────────────────────┐
│ Logo + Heading + Subtext     │  ← space-y-1 within group
│ ─ ─ ─ ─ ─ space-y-6 ─ ─ ─ │
│ Social auth buttons          │
│ ─ ─ ─ ─ ─ space-y-6 ─ ─ ─ │
│ Separator ("or")             │
│ ─ ─ ─ ─ ─ space-y-6 ─ ─ ─ │
│ <form> (space-y-4 fields)    │
└─────────────────────────────┘
```

Source — `src/components/organisms/AuthForm.tsx:26`:
```tsx
<div className="... space-y-6">
  <div className="... space-y-1">...</div>  {/* header group */}
  <div className="grid grid-cols-2 gap-2">...</div>  {/* social */}
  <div className="relative">...</div>  {/* separator */}
  <form className="space-y-4">...</form>
</div>
```

---

## Antipatterns

- ❌ **Using `space-y-2` between fields** — field-to-field gap is `space-y-4`. Using `space-y-2` makes the form feel compressed and inconsistent with AuthForm.
- ❌ **Using `gap-4` on a flex column instead of `space-y-4`** — the form stack uses `space-y-*`, not `flex flex-col gap-*`. Keep the pattern consistent.
- ❌ **Adding `mt-*` to individual FormField instances** — spacing is owned by the parent stack (`space-y-4`), not by individual fields. Adding margin to fields breaks the stack contract.
- ❌ **Skipping `space-y-1` inside custom field wrappers** — any wrapper that manually lays out label + input + error must use `space-y-1`, matching `FormField.tsx:18`.
