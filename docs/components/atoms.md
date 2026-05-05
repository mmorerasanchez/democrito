# Atoms — Component Reference

> Foundational building blocks. Single-purpose, no child components.
> Directory: `src/components/atoms/`

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

### Rules

- No icons inside headings — use `Text` or a wrapper instead.

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
