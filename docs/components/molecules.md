# Molecules — Component Reference

> Compositions of 2+ atoms or UI primitives.
> Directory: `registry/molecules/`

---

## FormField

Labeled form field wrapper with error and helper text.

**Composes**: `Label` (ui), `AlertCircle` (lucide)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field label |
| `htmlFor` | `string` | — | Associated input ID |
| `required` | `boolean` | — | Shows red asterisk |
| `helper` | `string` | — | Helper text below input |
| `error` | `string` | — | Error message (replaces helper) |
| `children` | `ReactNode` | — | Input element slot |

```tsx
<FormField label="Email" htmlFor="email" required error="Invalid email">
  <Input id="email" />
</FormField>
```

**Tokens**: `font-body`, `text-sm`, `text-destructive`, `text-error`, `text-muted-foreground`

### Do/Don't

✅ Do: Use `font-mono` for all user-editable inputs inside a `FormField` — editable content uses JetBrains Mono per the system convention.
✅ Do: Show the `error` state only after the user has interacted with the field, not on initial page load — premature errors are disorienting.
❌ Don't: Never show both an inline `error` on a `FormField` and a banner-level error for the same field simultaneously — pick one error surface.
❌ Don't: Never place more than one input element as a child of a single `FormField` — one field wraps one control.

---

## SearchBar

Search input with icon, clear button, and keyboard shortcut hint.

**Composes**: `Input` (ui), `Button` (ui), `Kbd` (atom), `Search`/`X` (lucide)

| Prop | Type | Default | Description |
|---|---|---|---|
| `value` | `string` | `""` | Controlled search value |
| `onChange` | `(value: string) => void` | — | Change handler |
| `placeholder` | `string` | `"Search…"` | Input placeholder |
| `showShortcut` | `boolean` | `true` | Show ⌘K shortcut hint |

```tsx
<SearchBar value={search} onChange={setSearch} />
```

**Tokens**: `text-muted-foreground`, `bg-input`, `border-border`

### Do/Don't

✅ Do: Write placeholder text that describes the expected format, not the action — "Search prompts…" is correct; "Enter search term" is not.
✅ Do: Prefer the controlled form (`value` + `onChange`) over relying on internal state — it makes the search value accessible to parent logic.
❌ Don't: Never add a submit button to a live-search field — live search fires on every keystroke and a submit button implies a discrete action that doesn't exist.
❌ Don't: Never hide the clear (✕) button — it is the primary affordance for resetting the search state.

---

## StatCard

Metric display card with trend indicator.

**Composes**: None (standalone composition)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Metric label |
| `value` | `string \| number` | — | Metric value |
| `trend` | `{ direction: "up" \| "down" \| "neutral"; value: string }` | — | Trend indicator |

```tsx
<StatCard label="Total Prompts" value="1,247" trend={{ direction: "up", value: "+12%" }} />
```

**Tokens**: `bg-card`, `border-border`, `font-body` (label), `font-mono` (value/trend), `text-success` (up), `text-error` (down), `text-muted-foreground` (neutral)

### Do/Don't

✅ Do: Use `font-mono` for the metric value — the component applies it automatically; don't override with `font-body`.
✅ Do: Include the sign in the `trend.value` string ("+12%", not "12%") — the component renders the value verbatim, so the sign must be in the data.
❌ Don't: Never use `StatCard` for non-numeric metrics or qualitative labels — it is designed for KPI displays with quantifiable values.
❌ Don't: Never omit units or formatting for large numbers — pass "1.2K" not "1247"; the card does not auto-format values.

---

## TokenCounter

Token usage display with progress bar and threshold coloring.

**Composes**: `Progress` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `current` | `number` | — | Current token count |
| `max` | `number` | — | Maximum tokens |
| `compact` | `boolean` | — | Omit "tokens" suffix |

**Threshold colors**: >90% → `text-error`, >75% → `text-warning`, else → `text-muted-foreground`

```tsx
<TokenCounter current={3200} max={4096} compact />
```

**Tokens**: `font-mono`, `text-xs`, `text-error`, `text-warning`, `text-muted-foreground`

### Do/Don't

✅ Do: Use the `compact` prop inside tight spaces such as panel headers or status bars — it omits the "tokens" suffix.
✅ Do: Pass actual token counts and let the ratio drive threshold coloring automatically — >90% renders `text-error`, >75% renders `text-warning`.
❌ Don't: Never manually add `text-error` or `text-warning` classes — the component computes the color from `current/max` ratio; overriding it breaks the threshold contract.
❌ Don't: Never use `TokenCounter` as a general-purpose progress bar — use the `Progress` ui primitive for non-token progress indicators.

---

## TabNav

Horizontal tab navigation with icon and badge support.

**Composes**: None (standalone)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `TabNavItem[]` | — | Tab definitions |
| `value` | `string` | — | Active tab value |
| `onValueChange` | `(value: string) => void` | — | Selection handler |

**TabNavItem**: `{ label: string; value: string; icon?: LucideIcon; disabled?: boolean; badge?: string }`

```tsx
<TabNav items={[{ label: "Editor", value: "editor" }, { label: "Preview", value: "preview" }]} value={tab} onValueChange={setTab} />
```

**Tokens**: `bg-muted` (container), `bg-card` (active), `font-display`, `text-sm`, `text-muted-foreground`

### Do/Don't

✅ Do: Use `font-display` for tab labels — the component applies it via `bg-muted` container; keep label text short (1–3 words).
✅ Do: Control the active state externally via `value` + `onValueChange` — `TabNav` is a controlled component with no internal selection state.
❌ Don't: Never use `TabNav` for routing between pages — it is a within-page section switcher; use `NavItem` in `SidebarNav` for route-level navigation.
❌ Don't: Never put more than 5 items in a horizontal `TabNav` — beyond 5, the bar overflows on narrow viewports; use a `Select` dropdown for wider option sets.

---

## EmptyState

Centered empty state with title, description, and optional CTA.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Empty state heading |
| `description` | `string` | — | Explanation text |
| `action` | `{ label: string; onClick: () => void }` | — | Optional CTA button |
| `variant` | `"no-data" \| "no-results" \| "error" \| "first-use"` | — | Context variant |

```tsx
<EmptyState title="No prompts" description="Create your first prompt to get started." action={{ label: "Create", onClick: handleCreate }} />
```

**Tokens**: `font-display` (title), `font-body` (description), `text-foreground`, `text-muted-foreground`

### Do/Don't

✅ Do: Place `EmptyState` inside the container it describes — a table's `EmptyState` lives in the table body, not below the table.
✅ Do: Match the `title` and `description` copy to the specific `variant` context so users understand why the state is empty.
❌ Don't: Never render `EmptyState` while data is still loading — show a skeleton or `Spinner` during fetch and switch to `EmptyState` only when the result is confirmed empty.
❌ Don't: Never position `EmptyState` outside its parent container — it must be contained within the element it is describing.

---

## NavItem

Sidebar navigation item with icon, count badge, and collapsed state.

**Composes**: `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `icon` | `LucideIcon` | — | Navigation icon |
| `label` | `string` | — | Item label |
| `active` | `boolean` | — | Active highlight |
| `disabled` | `boolean` | — | Disabled state |
| `collapsed` | `boolean` | — | Collapsed sidebar mode |
| `count` | `number` | — | Count badge |
| `badge` | `string` | — | Text badge (e.g. "soon") |

```tsx
<NavItem icon={FileText} label="Store" active count={24} />
<NavItem icon={BarChart3} label="Analytics" disabled badge="soon" collapsed />
```

**Tokens**: `bg-card` (active), `bg-muted` (hover), `font-display`, `text-sm`, `text-muted-foreground`, `bg-accent` (collapsed count)

### Do/Don't

✅ Do: Switch all `NavItem` components to `collapsed={true}` together when the sidebar collapses — collapsed state must be consistent across the nav.
✅ Do: Use `count` for numeric item counts and `badge` for text labels like "soon" or "new" — they render differently and serve different purposes.
❌ Don't: Never set two `NavItem`s to `active` simultaneously in the same sidebar group — only one item should reflect the current route.
❌ Don't: Never use `NavItem` inside a horizontal tab bar — it is designed for vertical sidebar navigation only; use `TabNav` for horizontal tab switching.

---

## AvatarGroup

User identity display with avatar, name, role, and status.

**Composes**: `Avatar`, `AvatarFallback`, `AvatarImage`, `AvatarStatus` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | User display name |
| `role` | `string` | — | User role/title |
| `initials` | `string` | — | Fallback initials override |
| `imageSrc` | `string` | — | Avatar image URL |
| `status` | `"online" \| "offline" \| "busy"` | — | Status indicator |
| `size` | `AvatarSize` | `"md"` | Avatar size |

```tsx
<AvatarGroup name="Mariano" role="Admin" status="online" />
```

**Tokens**: `font-display` (name), `font-body` (role), `text-foreground`, `text-muted-foreground`

### Do/Don't

✅ Do: Always provide `initials` as a fallback for when `imageSrc` is missing or slow — the avatar renders initials in the fallback state.
✅ Do: Keep `initials` to 1–2 characters — three or more characters overflow the avatar circle.
❌ Don't: Never use `AvatarGroup` for non-person entities (organizations, bots, files) — it implies a human identity and the avatar affordance is person-specific.
❌ Don't: Never omit the `name` prop — it is used for the accessible label even when an image is shown.

---

## BreadcrumbNav

Breadcrumb navigation with truncation support.

**Composes**: `ChevronRight` (lucide)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `BreadcrumbItem[]` | — | Path segments |
| `maxItems` | `number` | `4` | Truncate after this count |

**BreadcrumbItem**: `{ label: string; href?: string }`

```tsx
<BreadcrumbNav items={[{ label: "Store", href: "/store" }, { label: "Prompt A" }]} />
```

**Tokens**: `font-body`, `text-sm`, `text-muted-foreground`, `text-foreground` (last item)

### Do/Don't

✅ Do: Make the last breadcrumb item non-clickable by omitting its `href` — it represents the current page and should not navigate anywhere.
✅ Do: Use `maxItems` to truncate deeply nested paths — paths longer than 4 segments should collapse with an ellipsis.
❌ Don't: Never use `BreadcrumbNav` for horizontal tab or section navigation — use `TabNav` instead; breadcrumbs communicate path hierarchy, not selection state.
❌ Don't: Never show more than 4 items without enabling `maxItems` — long breadcrumbs overflow on narrow viewports.

---

## ActivityFeedItem

Single activity feed row with user, action badge, target, and timestamp.

**Composes**: `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `user` | `string` | — | Actor name |
| `type` | `"created" \| "updated" \| "deployed" \| "archived" \| "commented"` | — | Action type |
| `target` | `string` | — | Target entity |
| `timestamp` | `string` | — | Relative time |
| `detail` | `string` | — | Optional description |

```tsx
<ActivityFeedItem user="Mariano" type="deployed" target="onboarding-v3" timestamp="2m ago" />
```

**Tokens**: `font-body` (user), `font-mono` (target/timestamp), `text-foreground-subtle`, `border-border`

### Do/Don't

✅ Do: Use `font-mono` for the `target` resource name — it is a code or data identifier, not prose.
✅ Do: Pass relative timestamps for the `timestamp` prop ("2m ago", "1h ago") — absolute timestamps are too noisy in a feed context.
❌ Don't: Never use `ActivityFeedItem` for system events, automated jobs, or error logs — it implies a human actor; use `RunHistoryItem` for execution records instead.
❌ Don't: Never put long descriptions in the `detail` prop — it is a one-line secondary string; wrap in a separate element if more context is needed.

---

## DiffLine

Single line in a diff view with semantic coloring.

**Composes**: None (standalone)

| Prop | Type | Default | Description |
|---|---|---|---|
| `lineNumber` | `number` | — | Line number |
| `type` | `"added" \| "removed" \| "unchanged"` | — | Diff type |
| `text` | `string` | — | Line content |

```tsx
<DiffLine lineNumber={1} type="added" text="New instruction line" />
```

**Tokens**: `font-mono`, `text-xs`, `bg-success-bg`/`text-success` (added), `bg-error-bg`/`text-error` (removed), `text-foreground-subtle` (line number)

### Do/Don't

✅ Do: Use the `type` prop to drive all coloring — `added`, `removed`, and `unchanged` map to semantic tokens automatically.
✅ Do: Always provide sequential `lineNumber` values starting from 1 — gaps in line numbers are confusing for readers.
❌ Don't: Never use `DiffLine` outside a diff container with scrollable overflow — long lines will break layout without horizontal scroll.
❌ Don't: Never mix `DiffLine` rows with regular content rows in the same list — diffs must be visually isolated in their own container.

---

## FieldHeader

Header bar for a labeled field section with a colored category dot and token counter.

**Composes**: `TokenCounter` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Field name |
| `field` | `AnatomyField` | — | Field category for color coding |
| `tokenCount` | `number` | — | Token usage |
| `tokenMax` | `number` | `4000` | Max tokens for progress |
| `required` | `boolean` | — | Required indicator |
| `actions` | `ReactNode` | — | Right-side action slot |

```tsx
<FieldHeader label="Role" field="role" tokenCount={52} required />
```

**Tokens**: all `bg-category-*` tokens, `font-body`, `font-mono`, `text-error` (required)

### Do/Don't

✅ Do: Always pair `FieldHeader` with the textarea or input it describes — it is a header bar for a specific anatomy field editor, not a standalone label.
✅ Do: Use the `actions` slot for inline action buttons (add variable, format, etc.) so they align correctly with the token counter.
❌ Don't: Never omit the `field` prop — the colored category dot requires an `AnatomyField` value to render the correct `bg-category-*` token.
❌ Don't: Never use `FieldHeader` as a generic section header — use `Heading` for that; `FieldHeader` carries anatomy-specific semantics.

---

## VariableHighlight

Inline styled `{{variable}}` token with resolved/unresolved states.

**Composes**: None (standalone)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Variable name (without braces) |
| `resolvedValue` | `string` | — | Resolved value for tooltip |
| `unresolved` | `boolean` | `false` | Error styling |
| `onClick` | `(name: string) => void` | — | Click handler |

```tsx
<VariableHighlight name="company_name" resolvedValue="Acme" />
<VariableHighlight name="missing_var" unresolved />
```

**Tokens**: `border-accent/30`, `bg-accent/10`, `text-accent` (resolved); `border-error-border`, `bg-error-bg`, `text-error` (unresolved)

### Do/Don't

✅ Do: Use `unresolved={true}` for variables that have no binding in the current context — it switches to error tokens to signal a missing value.
✅ Do: Pass `resolvedValue` to show the bound value in a tooltip on hover — it gives users visibility into what the variable will expand to.
❌ Don't: Never use `VariableHighlight` for static text — only render it for actual `{{variable}}` tokens extracted from prompt content.
❌ Don't: Never render `VariableHighlight` without the double-brace convention — the component displays `{{name}}` and users expect that format.

---

## VariableEditorRow

Name/value input row for variable management.

**Composes**: `Input` (ui), `Button` (ui), `Trash2` (lucide)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Variable name |
| `value` | `string` | — | Default value |
| `highlighted` | `boolean` | `false` | Active highlight |
| `onNameChange` | `(name: string) => void` | — | Name change handler |
| `onValueChange` | `(value: string) => void` | — | Value change handler |
| `onDelete` | `() => void` | — | Delete handler |

```tsx
<VariableEditorRow name="company_name" value="Acme" highlighted onDelete={() => {}} />
```

**Tokens**: `bg-accent/10`, `ring-accent/30` (highlighted), `font-mono`, `text-muted-foreground`, `hover:text-error` (delete)

### Do/Don't

✅ Do: Use `font-mono` for both the variable name and value inputs — they are user-data fields, not prose.
✅ Do: Use `highlighted={true}` to indicate the currently active or most recently added row.
❌ Don't: Never omit the `onDelete` handler — every variable row must be deletable; a row without a delete path traps the user.
❌ Don't: Never use `VariableEditorRow` for non-variable key-value pairs — use a `FormField` grid for generic name/value settings instead.

---

## RunHistoryItem

Single run entry in a history list.

**Composes**: `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `runId` | `string` | — | Run identifier |
| `model` | `string` | — | Model used |
| `status` | `"success" \| "error" \| "running" \| "pending"` | — | Run status |
| `tokens` | `number` | — | Token usage |
| `latencyMs` | `number` | — | Latency in ms |
| `timestamp` | `string` | — | Relative time |
| `onClick` | `() => void` | — | Click handler |

```tsx
<RunHistoryItem runId="#42" model="claude-3.5-sonnet" status="success" tokens={1247} latencyMs={1840} timestamp="2m ago" />
```

**Tokens**: `font-mono`, `text-foreground-subtle`, `text-muted-foreground`, `border-border`, `hover:bg-muted/50`

### Do/Don't

✅ Do: Use `font-mono` for `runId`, token counts, and latency values — they are numeric data identifiers.
✅ Do: Format `latencyMs` as a human-readable string before passing ("1.8s", not "1840") — the component renders the value verbatim.
❌ Don't: Never extend the four defined statuses (success/error/running/pending) ad-hoc — the color map is fixed and unknown values will render without styling.
❌ Don't: Never show `RunHistoryItem` in a non-scrollable list — run logs can grow long and require a scrollable container.

---

## ParameterControl

Labeled slider + numeric input for model parameters.

**Composes**: `Label` (ui), `Slider` (ui), `Input` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `label` | `string` | — | Parameter name |
| `value` | `number` | — | Current value |
| `onChange` | `(value: number) => void` | — | Change handler |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `1` | Maximum value |
| `step` | `number` | `0.01` | Step increment |
| `unit` | `string` | — | Unit suffix |

```tsx
<ParameterControl label="Temperature" value={0.7} onChange={setTemp} min={0} max={2} step={0.1} />
```

**Tokens**: `font-body` (label), `font-mono` (value/unit), `text-muted-foreground`

### Do/Don't

✅ Do: Use `font-mono` for the numeric value display — the component applies it to the input and unit suffix automatically.
✅ Do: Always provide explicit `min`, `max`, and `step` values — never rely on the defaults (0, 1, 0.01) for model-specific parameters like temperature or top-p.
❌ Don't: Never use `ParameterControl` for boolean settings — use a `Switch` or `Checkbox` ui primitive instead; sliders imply a continuous range.
❌ Don't: Never render `ParameterControl` without a `label` — the label is the only context for what the parameter controls.

---

# Examples: prompt-x molecules

The following molecules live in [`src/examples/prompt-x/`](../../src/examples/prompt-x/) and are NOT part of the public molecules barrel. They are full reference implementations for prompt-engineering UIs, importable for projects building on the prompt-x stack.

## TestCaseRow

Single row in a test dataset table — checkbox, name, input/expected preview, status badge, and score.

### Do/Don't

✅ Do: Use `font-mono` for the input and expected-output preview text — they are user-data values.
✅ Do: Use `StatusBadge` for the test case status — do not substitute with a custom badge.
❌ Don't: Never use `TestCaseRow` outside of a test dataset table context — it is a prompt-x example component, not a generic row.
❌ Don't: Never truncate the expected-output preview with JavaScript — use CSS `line-clamp` so the full value remains in the DOM for accessibility.

## ScoreBreakdown

Score badge that opens a centered modal with a weighted-rubric breakdown.

### Do/Don't

✅ Do: Use `font-mono` for all score and weight values — they are numeric data.
✅ Do: Open the breakdown in a centered modal, not a tooltip or popover — the rubric table requires enough vertical space.
❌ Don't: Never display raw float scores without rounding — format to one or two decimal places before passing.
❌ Don't: Never use `ScoreBreakdown` for non-rubric scores — it is designed for the CLEAR weighted-rubric system specifically.
