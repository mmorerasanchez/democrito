# Atoms — Component Reference

> Foundational building blocks. Single-purpose, no child components.
> Directory: `src/components/atoms/`

---

## Button

> `src/components/ui/button.tsx` — shadcn/ui primitive used throughout the system.

### Do/Don't

✅ Do: Use `font-display` (Plus Jakarta Sans) for all button labels — it's the display font for all interactive controls.
✅ Do: Use one `primary` variant per view maximum — primary draws the eye and must be the single dominant action.
❌ Don't: Never place two primary buttons adjacent to each other — the visual weight creates ambiguity about which action is preferred.
❌ Don't: Never use the `ghost` variant for destructive actions — use the `destructive` variant so the risk is visually communicated.
❌ Don't: Never add an article to a button label — write "Save", not "Save the file"; labels must be imperative and minimal.

---

## Heading

Semantic heading element with design-system typography.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `level` | `"h1" \| "h2" \| "h3" \| "h4"` | `"h2"` | Visual style level |
| `as` | `"h1" \| "h2" \| "h3" \| "h4"` | same as `level` | HTML tag override (for SEO) |
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Heading content |

### Variants

| Level | Classes Applied |
|---|---|
| `h1` | `text-xl font-semibold font-display tracking-tight` |
| `h2` | `text-lg font-medium font-display` |
| `h3` | `text-md font-medium font-display` |
| `h4` | `text-base font-medium font-display` |

### Usage

```tsx
import { Heading } from "@/components/atoms";

<Heading level="h1">Page Title</Heading>
<Heading level="h3" as="h2">Visually small, semantically h2</Heading>
```

### Design Tokens

`font-display`, `text-xl`/`text-lg`/`text-md`/`text-base`, `tracking-tight`

### Do/Don't

✅ Do: Use `font-display` (Plus Jakarta Sans) for all heading elements — every variant applies it automatically, so no extra class is needed.
✅ Do: Use the `as` prop to decouple visual level from semantic HTML when SEO requires a different tag order.
❌ Don't: Never use `h4` for visually prominent content — it renders as uppercase small-caps and is reserved for field labels and section subheadings.
❌ Don't: Never place icons inside a `Heading` — wrap in a flex container using `Text` or a `div` instead.

---

## Text

General-purpose text element with variant and size control.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "muted" \| "subtle" \| "accent" \| "error" \| "success"` | `"default"` | Color variant |
| `size` | `"xs" \| "sm" \| "base" \| "lg"` | `"base"` | Font size |
| `mono` | `boolean` | `false` | Use monospace font |
| `as` | `"p" \| "span" \| "div"` | `"p"` | HTML tag |
| `className` | `string` | — | Additional classes |

### Variant Mapping

| Variant | Color Token |
|---|---|
| `default` | `text-foreground` |
| `muted` | `text-muted-foreground` |
| `subtle` | `text-foreground-subtle` |
| `accent` | `text-accent` |
| `error` | `text-error` |
| `success` | `text-success` |

### Usage

```tsx
import { Text } from "@/components/atoms";

<Text variant="muted" size="sm">Secondary information</Text>
<Text mono size="xs" variant="muted">v1.2.3 · 2 min ago</Text>
```

### Design Tokens

`font-body` (default), `font-mono` (when `mono`), `text-foreground`, `text-muted-foreground`, `text-foreground-subtle`, `text-accent`, `text-error`, `text-success`

### Do/Don't

✅ Do: Use the `mono` prop for any inline data values, version strings, or user-generated content mixed with body text — it switches to `font-mono` (JetBrains Mono).
✅ Do: Use `variant="muted"` for secondary and supporting information — it renders `text-muted-foreground` which respects all three themes.
❌ Don't: Never use `variant="accent"` for long-form readable text — accent is a brand highlight color, not a reading color; reserve it for short interactive or emphasized values.
❌ Don't: Never hardcode color classes directly on a `Text` element — always use the `variant` prop so the value stays theme-consistent.

---

## Code

Inline code element with accent-colored monospace styling.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Code content |

### Usage

```tsx
import { Code } from "@/components/atoms";

<Code>{{variable_name}}</Code>
```

### Design Tokens

`rounded-sm`, `border-border`, `bg-muted`, `font-mono`, `text-sm`, `text-accent`

### Do/Don't

✅ Do: Use `Code` for all inline code references, variable names, and `{{variable}}` tokens in prose — it applies the correct accent background and monospace styling.
✅ Do: Use `Code` for single-line values only — it is an inline element and does not scroll.
❌ Don't: Never substitute `<Text mono>` for `Code` — `Text mono` applies only the font; `Code` also adds the background, border, and accent color.
❌ Don't: Never put multi-line content in `Code` — use `CodeBlock` for multi-line or copyable code.

---

## Kbd

Keyboard shortcut indicator.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Key label |

### Usage

```tsx
import { Kbd } from "@/components/atoms";

<span className="flex items-center gap-0.5"><Kbd>⌘</Kbd><Kbd>K</Kbd></span>
```

### Design Tokens

`border-border`, `bg-muted`, `font-mono`, `text-2xs`, `text-muted-foreground`, `shadow-[0_1px_0_1px_hsl(var(--border))]`

### Do/Don't

✅ Do: Use `Kbd` for all keyboard shortcut indicators in the UI — it applies the correct border-shadow that mimics a physical key.
✅ Do: Wrap multi-key shortcuts in a flex container with `gap-0.5` as shown in the usage example.
❌ Don't: Never use `Code` or `Tag` to represent keyboard shortcuts — only `Kbd` has the correct visual affordance.
❌ Don't: Never put full words inside `Kbd` — use standard abbreviated key names (⌘, ⌃, ⇧, Esc, Enter, etc.).

---

## Tag

Chip/label element with anatomy field color support.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `variant` | `"default" \| "removable" \| "selectable"` | `"default"` | Interaction mode |
| `selected` | `boolean` | — | Active state (for selectable) |
| `onRemove` | `() => void` | — | Callback for removable variant |
| `color` | `AnatomyColor` | — | Anatomy field color override |
| `className` | `string` | — | Additional classes |

### AnatomyColor Values

`"role"` · `"tone"` · `"context"` · `"task"` · `"reasoning"` · `"examples"` · `"output"` · `"constraints"` · `"tools"`

### States

| State | Styling |
|---|---|
| Default | `border-border bg-muted text-foreground` |
| Selected | `border-accent bg-card text-accent` |
| Anatomy color | `bg-anatomy-{color}/10 text-anatomy-{color} border-anatomy-{color}/30` |
| Selectable hover | `hover:bg-card` |

### Usage

```tsx
import { Tag } from "@/components/atoms";

<Tag>default</Tag>
<Tag color="role">Role</Tag>
<Tag variant="removable" onRemove={() => {}}>removable</Tag>
<Tag variant="selectable" selected>active</Tag>
```

### Design Tokens

`rounded-sm`, `font-mono`, `text-xs`, `border-border`, `bg-muted`, `text-accent`, all `anatomy-*` tokens

### Do/Don't

✅ Do: Use `font-mono` for tags that display user-inputted values or variables — it distinguishes data from prose.
✅ Do: Use the `color` prop with anatomy field names (`"role"`, `"task"`, `"context"`, etc.) for prompt engineering contexts — it maps to the correct `category-*` token.
✅ Do: Use `variant="removable"` when the user can delete a tag — it renders the ✕ button and wires the `onRemove` callback.
❌ Don't: Never use tags as navigation controls — use `TabNav` molecule instead; tags are labels, not interactive selectors.
❌ Don't: Never mix anatomy color-coded tags with default-styled tags in the same list — pick one visual system per container.

---

## Spinner

Loading indicator with accessible labeling. Includes `ThinkingDots` sub-component.

### Spinner Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `"sm" \| "md" \| "lg" \| "inline"` | `"md"` | Spinner diameter |
| `className` | `string` | — | Additional classes |

### Size Mapping

| Size | Dimensions |
|---|---|
| `sm` | `h-3.5 w-3.5` (14px) |
| `md` | `h-5 w-5` (20px) |
| `lg` | `h-7 w-7` (28px) |
| `inline` | `h-4 w-4` (16px) |

### ThinkingDots Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

### Usage

```tsx
import { Spinner, ThinkingDots } from "@/components/atoms";

<Spinner size="sm" />
<ThinkingDots />
```

### Design Tokens

`border-muted-foreground`, `border-t-accent`, `animate-spin` (Spinner); `bg-accent`, `animate-ai-pulse` (ThinkingDots)

### Do/Don't

✅ Do: Use `Spinner` for determinate loading states where a specific element is fetching data.
✅ Do: Use `ThinkingDots` specifically for AI generation and streaming states — the three-dot pulse animation carries AI-processing semantics.
✅ Do: Match `Spinner` size to its context: `"sm"` for inline use, `"md"` for panel-level loading, `"lg"` for full-screen skeleton replacement.
❌ Don't: Never use `ThinkingDots` outside AI generation contexts — the animation implies model processing and will confuse users when used for generic loading.
❌ Don't: Never render `Spinner` without surrounding context that indicates what is loading — the component provides `role="status"` but the parent must describe the state.

---

## Link

Anchor element with external link support.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `external` | `boolean` | `false` | Opens in new tab, adds ↗ indicator |
| `className` | `string` | — | Additional classes |
| `children` | `ReactNode` | — | Link content |
| _...rest_ | `AnchorHTMLAttributes` | — | Standard anchor props |

### Usage

```tsx
import { Link } from "@/components/atoms";

<Link href="/docs">Internal link</Link>
<Link href="https://example.com" external>External link ↗</Link>
```

### Design Tokens

`font-body`, `text-accent`, `hover:underline`

### Do/Don't

✅ Do: Always set `external={true}` for links pointing outside the application — it opens a new tab and adds the ↗ indicator that sets user expectations.
✅ Do: Use `Link` for text-embedded navigation rather than a hand-styled `<a>` tag — it applies the correct `text-accent` and `hover:underline` tokens.
❌ Don't: Never use `Link` as a button — when an action doesn't navigate to a URL, use `Button` instead.
❌ Don't: Never omit the `external` prop on cross-origin links — the missing ↗ indicator misleads users who expect in-app navigation.

---

## Logo

Brand mark rendered from the uploaded logo image. Works across all three themes
(Dark, Light, Warm) without per-theme assets.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `number` | `28` | Width and height in pixels |
| `className` | `string` | — | Additional classes |

### Usage

```tsx
import { Logo } from "@/components/atoms";

<Logo size={32} />
```

### Do/Don't

✅ Do: Let `Logo` handle theme-awareness automatically — it selects `logo-dark.png` for the dark theme and `logo-light-warm.png` for warm/light without any extra logic.
✅ Do: Use the `size` prop to control dimensions rather than adding `w-` or `h-` Tailwind classes.
❌ Don't: Never import raw logo image files directly — always use the `Logo` atom to get correct theme-aware behavior across all three themes.
❌ Don't: Never apply `filter`, `opacity`, or `mix-blend-mode` via `className` to adjust logo appearance — these break theme contrast guarantees.

---

## CodeBlock

Multi-line code display with optional language label and overlay copy button.
Uses `--surface` (not `--card`) so it reads as content, not an elevated container.
Horizontal-scroll only — content never wraps.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `code` | `string` | — | Code to render and optionally copy. Whitespace is preserved exactly |
| `language` | `string` | — | Optional language label shown top-left (e.g. `"bash"`, `"tsx"`) |
| `showCopy` | `boolean` | `true` | Whether to render the overlay copy button |
| `className` | `string` | — | Additional classes |

### Usage

```tsx
import { CodeBlock } from "@/components/atoms";

<CodeBlock language="bash" code={`npm install democrito`} />
```

### Design Tokens

`bg-surface`, `font-mono`, `text-foreground-muted`

### Do/Don't

✅ Do: Use `bg-surface` (not `bg-card`) — it's baked into the component and must not be overridden; surface reads as content, not an elevated container.
✅ Do: Provide a `language` label for every code block with a known language — it renders as a top-left label and improves scannability.
❌ Don't: Never use `CodeBlock` for a single short inline value — use `Code` instead; `CodeBlock` is for multi-line or copyable content only.
❌ Don't: Never override the horizontal scroll with `white-space: normal` or flex wrapping — code must scroll, not wrap.

---

## CopyButton

Copy-to-clipboard button. Two variants: `primary` (label + icon, accent background)
and `ghost` (icon-only, typically overlaid on a `CodeBlock`). Falls back to
selecting the nearest `<pre>` if the clipboard API is unavailable.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | — | Text written to the clipboard on click |
| `variant` | `"primary" \| "ghost"` | — | `primary` shows label + icon; `ghost` is icon-only |
| `label` | `string` | `value` | Visible text for the `primary` variant. Ignored for `ghost` |
| `className` | `string` | — | Additional classes |
| _...rest_ | `ButtonHTMLAttributes` | — | Standard button props (excluding `value`) |

### Usage

```tsx
import { CopyButton } from "@/components/atoms";

<CopyButton variant="primary" value="npm install democrito" label="Copy install command" />
```

### Design Tokens

`bg-accent`, `text-accent-foreground` (primary); `text-foreground-muted` (ghost)

### Do/Don't

✅ Do: Use `ghost` variant when overlaying on a `CodeBlock` — it renders as an icon-only button that blends into the surface background.
✅ Do: Use `primary` variant for standalone "Copy X" actions in prose, empty states, or action rows.
❌ Don't: Never use the `primary` variant inside a `CodeBlock` — the accent background clashes with the `bg-surface` container and breaks visual hierarchy.
❌ Don't: Never omit the `value` prop — it is the text that gets written to the clipboard; without it the button does nothing.

---

## StatusBadge

Lifecycle status badge for the four prompt states: draft, testing, production, archived.

### Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `status` | `"draft" \| "testing" \| "production" \| "archived"` | — | Lifecycle status |
| `className` | `string` | — | Additional classes |

### Usage

```tsx
import { StatusBadge } from "@/components/atoms";

<StatusBadge status="production" />
<StatusBadge status="draft" />
```

### Design Tokens

`bg-status-draft/10`, `bg-status-testing/10`, `bg-status-production/10`, `bg-status-archived/10` and matching `text-status-*` tokens.

### Do/Don't

✅ Do: Use semantic `status-*` tokens only for lifecycle status — they map to the correct success/warning/error/info visual meaning per state.
✅ Do: Use only the four defined lifecycle statuses (draft/testing/production/archived) — do not extend the `status` type ad-hoc.
❌ Don't: Never use `--accent` for status badges — accent is a brand color, not a status color; it carries no semantic meaning about lifecycle state.
❌ Don't: Never use more than one `StatusBadge` per list item — multiple status badges on one row create ambiguity.
❌ Don't: Never substitute a `Tag` for `StatusBadge` when displaying lifecycle status — they use different token sets and `Tag` does not carry the correct semantic weight.
