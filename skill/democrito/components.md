# Component Inventory

> Reference for all democrito components across the four atomic layers. shadcn/ui primitives (`src/components/ui/`) are omitted — extend them via CVA variants, never rebuild from scratch.

---

# Atoms

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

# Molecules

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

# Organisms

> Major UI sections composed of molecules, atoms, and UI primitives.
> Directory: `src/components/organisms/`
> **15 components · 4 categories**

---

## Categories

| Category | Count | Components |
|---|---|---|
| [Navigation & Layout](#navigation--layout) | 5 | TopBar, SidebarNav, FilterBar, BulkActionsBar, UserMenu |
| [Dashboard & Data](#dashboard--data) | 4 | DataTable, DashboardStats, ActivityFeed, AuthForm |
| [Import & Export](#import--export) | 2 | ImportDialog, ExportMenu |
| [Settings & Config](#settings--config) | 4 | SettingsNav, APIKeyManager, IntegrationCard, OnboardingWizard |

---

## Navigation & Layout

App chrome, menus, and toolbar components.

---

## TopBar

Sticky header with mobile menu toggle, search button, and action slot.

**Composes**: `Kbd` (atom), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onMenuClick` | `() => void` | — | Mobile menu toggle |
| `showMobileMenu` | `boolean` | `true` | Show hamburger button |
| `actions` | `ReactNode` | — | Right-side action slot |

---

## SidebarNav

Full sidebar with hub items, project list, and user footer.

**Composes**: `NavItem` (molecule), `Avatar` (ui), `Badge` (ui), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `collapsed` | `boolean` | `false` | Collapsed mode |
| `onToggle` | `() => void` | — | Toggle handler |
| `activeItem` | `string` | `"store"` | Active hub item |
| `onItemClick` | `(id: string) => void` | — | Hub item click |
| `activeProject` | `string` | — | Active project |
| `onProjectClick` | `(slug: string) => void` | — | Project click |

---

## FilterBar

Search + status filters + sort + view mode toggle.

**Composes**: `SearchBar` (molecule), `Badge` (ui), `Select` (ui), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `search` | `string` | — | Search value |
| `onSearchChange` | `(v: string) => void` | — | Search handler |
| `viewMode` | `"grid" \| "list"` | — | Controlled view mode |
| `onViewModeChange` | `(mode: "grid" \| "list") => void` | — | View mode handler |

---

## BulkActionsBar

Floating action bar for multi-select operations.

**Composes**: `Button` (ui), `Badge` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `selectedCount` | `number` | — | Number selected (0 hides bar) |
| `onDismiss` | `() => void` | — | Dismiss handler |
| `onMove`/`onTag`/`onArchive`/`onDelete` | `() => void` | — | Action handlers |

**Animation**: `animate-bulk-bar-in`

---

## UserMenu

Dropdown-style user menu with profile info and actions.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | User name |
| `email` | `string` | — | User email |
| `plan` | `string` | — | Plan badge |
| `onProfile`/`onSettings`/`onBilling`/`onLogout` | `() => void` | — | Action handlers |

---

## Dashboard & Data

Data display, metrics, authentication, and activity tracking.

---

## DataTable

Generic sortable, paginated table.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `columns` | `Column<T>[]` | — | Column definitions |
| `data` | `T[]` | — | Row data |
| `pageSize` | `number` | `10` | Rows per page |
| `onRowClick` | `(row: T) => void` | — | Row click handler |

**Column**: `{ key: string; header: string; sortable?: boolean; render?: (row: T) => ReactNode }`

---

## DashboardStats

4-column stat grid with mock data.

**Composes**: `StatCard` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

---

## ActivityFeed

Scrollable activity list with avatar and resource code highlighting.

**Composes**: `Text`/`Code` (atoms), `Avatar` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `FeedItem[]` | — | Activity entries |

**FeedItem**: `{ actor: string; initials: string; action: string; resource: string; time: string }`

---

## AuthForm

Login/signup form with social OAuth and email/password fields.

**Composes**: `FormField` (molecule), `Heading`/`Text` (atoms), `Input`/`Button`/`Separator` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"login" \| "signup"` | `"login"` | Form mode |
| `onSubmit` | `(data: { email: string; password: string; name?: string }) => void` | — | Submit handler |

---

## Import & Export

Content import and export in multiple formats.

---

## ImportDialog

Import panel with format selection, paste area, and file drop zone.

**Composes**: `Button`/`Input`/`Textarea` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onImport` | `(content: string, format: ImportFormat) => void` | — | Import handler |
| `onCancel` | `() => void` | — | Cancel handler |

**ImportFormat**: `"json" \| "csv" \| "yaml" \| "text"`

---

## ExportMenu

Export format selection panel with descriptions.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onExport` | `(format: ExportFormat) => void` | — | Export handler |
| `promptName` | `string` | — | Current prompt name |

**ExportFormat**: `"json" \| "csv" \| "yaml" \| "markdown" \| "clipboard"`

---

## Settings & Config

API keys, integrations, onboarding, and settings navigation.

---

## SettingsNav

Horizontal tab navigation for settings pages.

**Composes**: `TabNav` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `sections` | `SettingsSection[]` | — | Tab definitions |
| `activeSection` | `string` | — | Active tab |
| `onSectionChange` | `(value: string) => void` | — | Change handler |

---

## APIKeyManager

API key list with masked values, reveal toggle, and add form.

**Composes**: `Badge`/`Button`/`Input` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `keys` | `APIKey[]` | — | Key list |
| `onAdd` | `(name: string, value: string) => void` | — | Add handler |
| `onDelete` | `(id: string) => void` | — | Delete handler |

---

## IntegrationCard

External integration card with connection status and actions.

**Composes**: `Badge`/`Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | — | Integration name |
| `description` | `string` | — | Description |
| `provider` | `string` | — | Provider name |
| `connected` | `boolean` | `false` | Connection status |
| `status` | `"active" \| "inactive" \| "error"` | `"inactive"` | Status |

---

## OnboardingWizard

Step-by-step wizard with progress indicator and navigation.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `steps` | `WizardStep[]` | — | Step definitions |
| `currentStep` | `number` | — | Active step index |
| `onNext`/`onBack`/`onSkip` | `() => void` | — | Navigation handlers |
| `children` | `ReactNode` | — | Step content slot |
| `hideActions` | `boolean` | `false` | Hide footer buttons |

---

# Templates

> Page layout shells that define spatial structure without business logic.
> Directory: `src/components/templates/`
> **7 components · 3 categories**

---

## Categories

| Category | Count | Components |
|---|---|---|
| [App Chrome](#app-chrome) | 1 | AppShell |
| [Content Layouts](#content-layouts) | 5 | DashboardLayout, LibraryLayout, DetailLayout, EditorLayout, ComparisonLayout |
| [Showcase](#showcase) | 1 | TemplatePreview |

---

## App Chrome

The top-level application wrapper.

---

## AppShell

Full application shell with collapsible sidebar, top bar, and routed content area.

**Composes**: `SidebarNav` (organism), `TopBar` (organism), `ThemeToggle`, React Router `Outlet`

| Prop | Type | Default | Description |
|---|---|---|---|
| — | — | — | No props — reads route state from React Router |

**Behavior:**
- Manages sidebar collapsed/expanded state
- Mobile: sidebar renders as overlay drawer with backdrop
- Reads `?project=` search param for active project highlighting
- Maps route paths to sidebar nav items

**When to use:** Wrap all authenticated `/app/*` routes.

```tsx
<Route element={<AppShell />}>
  <Route path="library" element={<LibraryPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>
```

---

## Content Layouts

Reusable page structures for different content types.

---

## DashboardLayout

Overview page template with optional header, stats row, and main content grid.

**Slots:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `header` | `ReactNode` | No | Welcome section or page title |
| `stats` | `ReactNode` | No | KPI stats row (e.g. `DashboardStats`) |
| `children` | `ReactNode` | Yes | Main content grid |
| `className` | `string` | No | Additional classes |

**When to use:** Dashboard and overview pages with KPI summaries.

```tsx
<DashboardLayout
  header={<WelcomeHeader />}
  stats={<DashboardStats items={kpis} />}
>
  <ActivityFeed />
  <RecentPrompts />
</DashboardLayout>
```

---

## LibraryLayout

Filterable card grid template with pagination and bulk actions.

**Slots:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `filters` | `ReactNode` | Yes | FilterBar or search controls |
| `children` | `ReactNode` | Yes | Card grid content (renders in 1/2/3-col responsive grid) |
| `pagination` | `ReactNode` | No | Pagination controls |
| `bulkActions` | `ReactNode` | No | BulkActionsBar (slides in from bottom) |
| `className` | `string` | No | Additional classes |

**When to use:** List/grid views — prompt library, template gallery, dataset browser.

```tsx
<LibraryLayout
  filters={<FilterBar />}
  pagination={<Pagination />}
  bulkActions={selected.length > 0 && <BulkActionsBar count={selected.length} />}
>
  {prompts.map(p => <PromptCard key={p.id} {...p} />)}
</LibraryLayout>
```

---

## DetailLayout

Full-width detail view with breadcrumb, title bar, status bar, and tabs.

**Slots:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `breadcrumb` | `ReactNode` | No | Breadcrumb navigation |
| `titleBar` | `ReactNode` | Yes | Title + action buttons |
| `statusBar` | `ReactNode` | No | StatusLifecycleBar or similar |
| `tabs` | `ReactNode` | No | Tab navigation |
| `children` | `ReactNode` | Yes | Active tab content (scrollable) |
| `className` | `string` | No | Additional classes |

**When to use:** Single-item detail pages — prompt detail, version history, test results.

```tsx
<DetailLayout
  breadcrumb={<BreadcrumbNav items={crumbs} />}
  titleBar={<PromptTitleBar prompt={prompt} />}
  statusBar={<StatusLifecycleBar status={prompt.status} />}
  tabs={<TabNav items={tabs} active={activeTab} />}
>
  <TabContent />
</DetailLayout>
```

---

## EditorLayout

50/50 split-pane template with optional header. Left pane for editing, right pane for preview.

**Slots:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `editor` | `ReactNode` | Yes | Left pane content |
| `preview` | `ReactNode` | Yes | Right pane content |
| `header` | `ReactNode` | No | Header bar above the split |
| `className` | `string` | No | Additional classes |

**Behavior:**
- Desktop: side-by-side with 4px visual resizer divider
- Mobile: stacks vertically (editor on top, preview below)

**When to use:** Editor pages — prompt editor, template builder, diff viewer.

```tsx
<EditorLayout
  header={<EditorToolbar />}
  editor={<PromptEditorPanel />}
  preview={<CompiledPreview />}
/>
```

---

## ComparisonLayout

Side-by-side 50/50 comparison template with toolbar.

**Slots:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `toolbar` | `ReactNode` | Yes | Version selectors, sync toggle, close button |
| `panelA` | `ReactNode` | Yes | Left version panel |
| `panelB` | `ReactNode` | Yes | Right version panel |
| `className` | `string` | No | Additional classes |

**Behavior:**
- Desktop: two equal panels separated by a 1px border
- Mobile: stacks vertically

**When to use:** Version comparison, A/B prompt testing, diff views.

```tsx
<ComparisonLayout
  toolbar={<ComparisonToolbar />}
  panelA={<VersionPanel version={versionA} />}
  panelB={<VersionPanel version={versionB} />}
/>
```

---

## Showcase

Components used in the design system showcase itself.

---

## TemplatePreview

Interactive wireframe preview with viewport switcher (desktop/tablet/mobile).

**Props:**

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | Yes | Template name |
| `description` | `string` | Yes | Template description |
| `responsive` | `string` | Yes | Responsive behavior summary |
| `composedOf` | `string` | Yes | Components used |
| `zones` | `ContentZone[]` | Yes | Named layout zones |
| `layout` | `LayoutType` | Yes | Layout variant (see below) |
| `className` | `string` | No | Additional classes |

**Layout variants:** `sidebar-main`, `centered`, `full-width`, `sidebar-settings`, `split-pane`, `sidebar-main-panel`, `modal-overlay`, `comparison`

**When to use:** Only in the design system showcase (`/templates` route) to demonstrate template structures.

---

## Composition Rules

1. **Templates hold no business logic** — they define spatial structure only. All data fetching, state management, and event handling belong in Pages.
2. **One template per page** — each route page composes exactly one template.
3. **Slots accept ReactNode** — templates are agnostic to what fills each slot.
4. **AppShell wraps everything** — all authenticated routes nest inside `AppShell` via React Router's `<Outlet />`.
5. **Responsive by default** — all templates handle mobile/tablet/desktop breakpoints internally.
