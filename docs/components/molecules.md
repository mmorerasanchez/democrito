# Molecules — Component Reference

> Compositions of 2+ atoms or UI primitives.
> Directory: `src/components/molecules/`

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


---

# Examples: prompt-x molecules

The following molecules live in [`src/examples/prompt-x/`](../../src/examples/prompt-x/) and are NOT part of the public molecules barrel. They are full reference implementations for prompt-engineering UIs, importable for projects building on the prompt-x stack.

## TestCaseRow

Single row in a test dataset table — checkbox, name, input/expected preview, status badge, and score.

## ScoreBreakdown

Score badge that opens a centered modal with a weighted-rubric breakdown.
