# Component Inventory

> All custom components in **democrito**, organized by atomic level.
> shadcn/ui primitives (`src/components/ui/`) are omitted — extend them via CVA variants.

---

## Atoms (`src/components/atoms/`)

Single-purpose building blocks. No child components.

| Component | Purpose | Key Tokens |
|---|---|---|
| **Heading** | Semantic heading (h1–h4) with design-system typography | `font-display`, `tracking-tight` |
| **Text** | General-purpose text with variant and size control | `font-body`, `font-mono` (when `mono`) |
| **Code** | Inline code element | `font-mono`, `text-accent`, `bg-muted` |
| **Kbd** | Keyboard shortcut indicator | `font-mono`, `text-2xs`, `border-border` |
| **Tag** | Chip/label with anatomy field color support | `font-mono`, `text-xs`, anatomy tokens |
| **Spinner** | Loading indicator + ThinkingDots sub-component | `border-t-accent`, `animate-ai-pulse` |
| **Link** | Anchor with external link support | `text-accent`, `font-body` |
| **Logo** | Brand logo mark | — |

---

## Molecules (`src/components/molecules/`)

Compositions of 2+ atoms or UI primitives.

| Component | Purpose | Composes |
|---|---|---|
| **FormField** | Labeled field wrapper with error/helper text | Label (ui) |
| **SearchBar** | Search input with ⌘K shortcut hint | Input (ui), Kbd (atom) |
| **StatCard** | Metric card with trend indicator | — |
| **TokenCounter** | Token usage bar with threshold coloring | Progress (ui) |
| **TabNav** | Horizontal tabs with icon/badge support | — |
| **EmptyState** | Empty state with title, description, CTA | Button (ui) |
| **NavItem** | Sidebar nav item with collapsed mode | Badge (ui) |
| **AvatarGroup** | User identity with avatar, name, status | Avatar (ui) |
| **BreadcrumbNav** | Breadcrumb with truncation | — |
| **ActivityFeedItem** | Activity row with action badge | Badge (ui) |
| **DiffLine** | Single diff line with semantic coloring | — |
| **PromptFieldHeader** | Anatomy field header with token counter | TokenCounter |
| **VariableHighlight** | Inline `{{variable}}` token | — |
| **VariableEditorRow** | Name/value input for variables | Input (ui) |
| **RunHistoryItem** | Run entry with status, tokens, latency | Badge (ui) |
| **TestCaseRow** | Test dataset row with score | Badge (ui), Checkbox (ui) |
| **ScoreBreakdown** | Score badge with rubric modal | Badge (ui), Dialog (ui) |
| **ParameterControl** | Labeled slider + numeric input | Slider (ui), Input (ui) |

---

## Organisms (`src/components/organisms/`)

Major UI sections. 15 components in 4 categories.

### Navigation & Layout

| Component | Purpose |
|---|---|
| **TopBar** | Sticky header with search and actions |
| **SidebarNav** | Full sidebar with hub items and projects |
| **FilterBar** | Search + status filters + sort + view toggle |
| **BulkActionsBar** | Floating multi-select action bar |
| **UserMenu** | Dropdown user menu with profile actions |

### Dashboard & Data

| Component | Purpose |
|---|---|
| **DataTable** | Generic sortable, paginated table |
| **DashboardStats** | 4-column stat grid |
| **ActivityFeed** | Scrollable activity list |
| **AuthForm** | Login/signup with social OAuth |

### Import & Export

| Component | Purpose |
|---|---|
| **ImportDialog** | Format selection + paste/drop import |
| **ExportMenu** | Export format selection panel |

### Settings & Config

| Component | Purpose |
|---|---|
| **SettingsNav** | Horizontal settings tab navigation |
| **APIKeyManager** | API key list with masked values |
| **IntegrationCard** | External integration card |
| **OnboardingWizard** | Step-by-step wizard with progress |

---

## Templates (`src/components/templates/`)

Page layout shells — no business logic. 7 components.

| Component | Purpose | Key Slots |
|---|---|---|
| **AppShell** | Full app wrapper with sidebar + top bar | React Router `Outlet` |
| **DashboardLayout** | Overview with header, stats, content grid | `header`, `stats`, `children` |
| **LibraryLayout** | Filterable card grid with pagination | `filters`, `children`, `pagination`, `bulkActions` |
| **DetailLayout** | Detail view with breadcrumb, title, tabs | `breadcrumb`, `titleBar`, `statusBar`, `tabs`, `children` |
| **EditorLayout** | 50/50 split pane (editor + preview) | `editor`, `preview`, `header` |
| **ComparisonLayout** | Side-by-side 50/50 comparison | `toolbar`, `panelA`, `panelB` |
| **TemplatePreview** | Interactive wireframe for showcase | `zones`, `layout` |

### Composition Rules

1. Templates hold no business logic — spatial structure only.
2. One template per page — each route composes exactly one template.
3. Slots accept `ReactNode` — templates are agnostic to slot content.
4. `AppShell` wraps all authenticated routes via `<Outlet />`.
5. All templates handle responsive breakpoints internally.
