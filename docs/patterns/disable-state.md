# Disable State Pattern

## Scope rule — two layers

This is the primary decision rule. The implementation differs depending on what you are disabling.

| Layer | Scope | Implementation |
|-------|-------|----------------|
| **Atom / primitive** | Individual shadcn/ui components — `button`, `input`, `switch`, `slider`, `checkbox`, etc. | Tailwind `disabled:opacity-50` — shadcn default. **Do not override. Do not create custom tokens.** |
| **Container / region** | A wrapper element disabling a group of components | `opacity: 0.4` + `filter: saturate(0)` + `pointer-events: none` on the container |

---

## Three states — decision logic

Before applying any visual treatment, identify which state applies:

| State | When to use | Visual treatment |
|-------|-------------|-----------------|
| **Disabled** | User cannot perform the action due to permissions, prerequisites, or system state | Atom layer: `disabled:opacity-50`. Container layer: `opacity: 0.4` + `filter: saturate(0)` + `pointer-events: none`. |
| **Read-only** | Value exists and is visible, but editing is not the goal | Styled as text using `--foreground-muted`, not as an input. No border. |
| **Hidden** | Feature or element doesn't apply to this context | Conditional rendering — do not render the element at all. No token needed. |

### Decision tree

```
Is the user blocked from acting on this element?
  → YES: Is it temporary (permissions/state) or contextually irrelevant?
      → Temporary      → Disabled
      → Irrelevant     → Hidden
  → NO: Is the value shown for reference only?
      → YES            → Read-only
      → NO             → Active state (default)
```

---

## Atom layer — individual components

shadcn/ui components ship with `disabled:opacity-50` (and `disabled:cursor-not-allowed` or `disabled:pointer-events-none` depending on the element type). This is intentional and correct.

**Do:**
- Pass the native `disabled` prop to the component — the Tailwind class handles the rest
- Use `peer-disabled:opacity-70` on paired `<label>` elements (already set in `ui/label.tsx`)

**Don't:**
- Create per-token disabled variants (`--button-disabled-bg`, `--input-disabled-opacity`)
- Override `disabled:opacity-50` with a different value at the atom level
- Apply `filter: saturate(0)` to individual shadcn/ui components — that's a container-level concern

---

## Container layer — disabling a region

When a section of the UI is disabled as a whole (e.g., a form group locked behind a permission, a panel waiting for a prerequisite), apply the CSS filter approach on the wrapper:

**Do:** Apply at the container level using CSS:

```css
.disabled-region {
  opacity: 0.4;
  filter: saturate(0);
  pointer-events: none;
}
```

Or with Tailwind arbitrary values:

```tsx
<div className="opacity-40 saturate-0 pointer-events-none">
  {/* any component combination inside */}
</div>
```

The `filter: saturate(0)` removes all color from the region, making it unambiguously inactive regardless of accent color or component type. This is intentional — it scales to any component combination without needing per-component disabled token definitions.

**Don't:**
- Apply the container pattern to a single atom — use the native `disabled` prop instead
- Skip `filter: saturate(0)` when using the container approach — the accent color remains visible and confuses meaning

---

## Antipatterns

- ❌ **Disabling with color** — a dimmed orange button still reads as a call to action. Saturation must go to zero at the container level.
- ❌ **Opacity without desaturation** — `opacity: 0.4` alone at the container level is insufficient. The accent color remains visible and confuses meaning. Always pair with `filter: saturate(0)`.
- ❌ **Over-scoping** — disabling an entire page section when only one field is conditionally unavailable. Scope disabled state to the specific element or the smallest meaningful region.
- ❌ **Disabled for loading** — do not use a disabled state for content that is loading. Use a skeleton or loading state instead; disabled implies the action is blocked, not pending.
