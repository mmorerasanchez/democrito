# Organisms — Component Reference

> Major UI sections composed of molecules, atoms, and UI primitives.
> Directory: `src/components/organisms/`
> **19 components · 5 categories**, plus 5 AI-page showcase organisms. 23 prompt-x example organisms live in [`src/examples/prompt-x/`](../../src/examples/prompt-x/) and are documented at the bottom of this page.

---

## Categories

| Category | Count | Components |
|---|---|---|
| [Navigation & Layout](#navigation--layout) | 5 | TopBar, SidebarNav, FilterBar, BulkActionsBar, UserMenu |
| [Dashboard & Data](#dashboard--data) | 5 | DataTable, DashboardStats, ActivityFeed, AuthForm, RunHistory |
| [Data Management](#data-management) | 2 | DataManager, OrganizationManager |
| [Import, Export & API](#import-export--api) | 3 | ImportDialog, ExportMenu, APIDocPanel |
| [Settings & Config](#settings--config) | 4 | SettingsNav, APIKeyManager, IntegrationCard, OnboardingWizard |

---

# Navigation & Layout

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

# Dashboard & Data

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

# Import & Export

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

# Settings & Config

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

---

# Dashboard & Data (additional)

---

## RunHistory

Chronological list of run/execution entries with status, timestamp, and metadata.
Composes `RunHistoryItem` (molecule) and surfaces filters, pagination, and an
empty state when there are no runs yet.

**Composes**: `RunHistoryItem` (molecule), `EmptyState` (molecule), `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `runs` | `RunRecord[]` | — | List of run entries to render |
| `onRunClick` | `(runId: string) => void` | — | Handler invoked when a row is selected |
| `loading` | `boolean` | `false` | Show skeleton state |
| `emptyMessage` | `string` | — | Message rendered when `runs` is empty |

---

# Data Management

Generic CRUD/admin surfaces for managing collections of records or organizations.

---

## DataManager

Generic record-management surface — combines a data table, filter bar, bulk-action
toolbar, and create/edit modal triggers. Used as a reusable shell for resource
listing pages (datasets, prompts, evaluations, etc.).

**Composes**: `DataTable`, `FilterBar`, `BulkActionsBar`, `EmptyState`

| Prop | Type | Default | Description |
|---|---|---|---|
| `records` | `T[]` | — | Records to render |
| `columns` | `Column<T>[]` | — | Column definitions for the embedded table |
| `onCreate`/`onEdit`/`onDelete` | `(record: T) => void` | — | CRUD handlers |
| `loading` | `boolean` | `false` | Show skeleton/loader state |

---

## OrganizationManager

Manage an organization's members, roles, and invites. Renders a member list,
role selector, invite form, and pending-invite tracker.

**Composes**: `DataTable`, `FormField` (molecule), `Button` (ui), `Avatar` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `members` | `OrgMember[]` | — | Current organization members |
| `pendingInvites` | `OrgInvite[]` | — | Outstanding invitations |
| `onInvite` | `(email: string, role: Role) => void` | — | Invite handler |
| `onRoleChange` | `(memberId: string, role: Role) => void` | — | Role-change handler |
| `onRemove` | `(memberId: string) => void` | — | Remove-member handler |

---

# Import, Export & API (additional)

---

## APIDocPanel

Inline API documentation panel — renders an endpoint's method, path, request
schema, response schema, and a copyable cURL example. Designed to live alongside
an editor or settings surface so engineers don't need to leave the page.

**Composes**: `CodeBlock` (atom), `CopyButton` (atom), `Tag` (atom), `Tabs` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `endpoint` | `EndpointSpec` | — | OpenAPI-shaped endpoint description |
| `defaultLanguage` | `"curl" \| "ts" \| "python"` | `"curl"` | Initial code-sample language |
| `showAuth` | `boolean` | `true` | Whether to render the auth/token requirement section |

---

# Showcase (AI page)

Marketing-page organisms used on the AI overview route (`/ai`). Live in
`src/components/organisms/ai/` and not part of the general application surface.

| Component | Purpose |
|---|---|
| `HeroSection` | Hero block with headline, subhead, and primary CTA |
| `FileArchitectureSection` | Visual breakdown of the file-tree architecture |
| `QuickStartSection` | Install + first-run instructions with copyable commands |
| `ComparisonSection` | Feature comparison table vs. alternative tools |
| `EcosystemSection` | Ecosystem partners / supported integrations grid |

---

# Examples: prompt-x organisms

The 23 prompt-x-specific organisms live in [`src/examples/prompt-x/`](../../src/examples/prompt-x/). They are NOT exported from the public registry or the main organisms barrel, but stand as full reference implementations of how to compose democrito atoms into a prompt-engineering UI.

| Component | Description |
|---|---|
| `AIGenerationPanel` | Right-pane assistant for AI-driven prompt generation, with model picker and streaming output |
| `AnatomyFieldCard` | Card for a single prompt anatomy field (role / task / examples / etc.) with variable highlighting |
| `CLEARScorePanel` | CLEAR rubric breakdown panel — five sub-scores plus overall, with critique text |
| `CompiledPreview` | Live preview of the compiled prompt with resolved variables and token counts |
| `CreatePromptDialog` | Modal for creating a new prompt — name, description, template picker |
| `EvalConfirmModal` | Confirmation modal before running an evaluation, surfacing cost + dataset stats |
| `EvaluationResults` | Results table for a finished evaluation run — per-test-case pass/fail/score |
| `EvaluationResultsView` | Full-page evaluation results view with summary stats, score chart, and case drill-down |
| `GlobalVariableManager` | Workspace-level variables editor with scope filters |
| `ImprovedPromptPanel` | Side-by-side panel showing original vs. AI-improved prompt with apply controls |
| `PlaygroundPanel` | Run pane — model picker, parameter controls, streaming output, run history |
| `PresetCard` | Card representing a reusable prompt preset (template + defaults) |
| `PresetDetailPanel` | Detail view for a preset — anatomy preview, variables, derived runs |
| `PromptCard` | Library card for a prompt — title, status, last-run, score, action menu |
| `PromptConfigFields` | Form fields for prompt configuration — model, temperature, top-p, max tokens, etc. |
| `PromptEditorPanel` | Multi-field anatomy editor with token counters and variable management |
| `StatusLifecycleBar` | Horizontal lifecycle bar (draft → testing → production → archived) |
| `TemplatePicker` | Modal picker for choosing a starter template when creating a prompt |
| `TestDatasetManager` | Test dataset CRUD with rows, expected outputs, and bulk import |
| `TestRunnerModal` | Modal that streams a multi-test-case run with per-case status badges |
| `VariableManager` | Per-prompt variable editor — name, default value, description |
| `VersionComparison` | Two-column diff view comparing two prompt versions |
| `VersionTimeline` | Vertical timeline of prompt versions with author, timestamp, and inline diff toggle |
