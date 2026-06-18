# Organisms — Component Reference

> Major UI sections composed of molecules, atoms, and UI primitives.
> Directory: `registry/organisms/`
> **19 components · 5 categories**. 23 prompt-x example organisms are documented in the democrito-site repo and are not part of the public registry.

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

### Do/Don't

✅ Do: Use the `actions` slot exclusively for top-right controls (notifications, user menu, global actions) — it is the only intended extension point.
✅ Do: Keep `TopBar` at `z-sticky` — it is a sticky header and must remain above scrollable page content.
❌ Don't: Never place navigation items inside `TopBar` — primary navigation belongs in `SidebarNav`; TopBar is app chrome, not a nav bar.
❌ Don't: Never add more than 3 items to the `actions` slot — it will overflow on mobile viewports.

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

### Do/Don't

✅ Do: Active state uses `--accent` for the indicator dot/line only, not the full item background — `bg-card` is the active item background, and accent marks only the active indicator.
✅ Do: Switch all `NavItem` children to `collapsed={true}` together when `collapsed` is toggled — the sidebar must be visually consistent.
❌ Don't: Never show more than one active state simultaneously in the same nav group — only one item can represent the current route.
❌ Don't: Never place primary actions (Create, Run, Publish) inside `SidebarNav` — primary actions belong in page headers or `TopBar`.

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

### Do/Don't

✅ Do: Use the embedded `SearchBar` as the single search input — `FilterBar` composes it internally and provides the ⌘K shortcut hint automatically.
✅ Do: Keep `FilterBar` sticky at the top of `LibraryLayout` — users need filters accessible while scrolling through long lists.
❌ Don't: Never use `FilterBar` in a `DetailLayout` or `EditorLayout` — it is designed for library/listing views only.
❌ Don't: Never add custom filter chips outside the built-in status badge filters without extending the organism — ad-hoc classes bypass the filter state management.

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

### Do/Don't

✅ Do: Let the bar auto-hide — it renders only when `selectedCount > 0`; never manually toggle its visibility.
✅ Do: Keep the `animate-bulk-bar-in` animation — it is already applied by the organism; do not remove the class.
❌ Don't: Never position `BulkActionsBar` at the top of a page — it is a floating bottom bar by design and must not displace the `FilterBar`.
❌ Don't: Never add more than 4 bulk actions — the bar is space-constrained on mobile and additional actions overflow.

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

### Do/Don't

✅ Do: Always include the `plan` badge — it surfaces the user's current subscription tier, which informs feature gating decisions.
✅ Do: Always wire `onLogout` — users expect a logout action in the user menu and omitting it breaks a fundamental UX expectation.
❌ Don't: Never render `UserMenu` as an inline section — it is a dropdown triggered by an avatar or button; the open/close state is managed internally.
❌ Don't: Never expose destructive actions like "Delete account" directly in `UserMenu` — gate them behind a separate confirmation dialog.

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

### Do/Don't

✅ Do: Use `font-mono` with tabular figures for all numeric cells — numeric data must align vertically in a table context.
✅ Do: Place `EmptyState` inside the table container, not outside it — the empty state is part of the table surface, not a sibling element.
✅ Do: Use the `render` column property for any cell that needs formatting — it keeps layout logic out of the data layer.
❌ Don't: Never use `--accent` color for row hover — use a surface token step-up (e.g., `bg-muted/50`) so the accent remains available for active/selected state.
❌ Don't: Never show more than 7 columns without enabling horizontal scroll — the table will break the page layout on narrow viewports.

---

## DashboardStats

4-column stat grid with mock data.

**Composes**: `StatCard` (molecule)

| Prop | Type | Default | Description |
|---|---|---|---|
| `className` | `string` | — | Additional classes |

### Do/Don't

✅ Do: Use `DashboardStats` as a read-only display — it has no interactive props and is intentionally static.
✅ Do: Place it at the top of a dashboard view before content grids — it sets quantitative context for the page.
❌ Don't: Never replace `DashboardStats` with individually placed `StatCard` components in a dashboard — use the composed organism to maintain consistent layout and spacing.
❌ Don't: Never add click handlers or hover states to the stat cards via `className` — if interactivity is needed, build a new organism.

---

## ActivityFeed

Scrollable activity list with avatar and resource code highlighting.

**Composes**: `Text`/`Code` (atoms), `Avatar` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `items` | `FeedItem[]` | — | Activity entries |

**FeedItem**: `{ actor: string; initials: string; action: string; resource: string; time: string }`

### Do/Don't

✅ Do: Wrap `ActivityFeed` in a fixed-height scrollable container — the feed can grow unbounded and must not push other content off-screen.
✅ Do: Use the `Code` atom (applied internally via the `resource` field) for resource names — it renders `font-mono` and `text-accent` which distinguishes data identifiers from prose.
❌ Don't: Never show more than 20 items without pagination — longer feeds become unscannable; truncate and provide a "View all" link.
❌ Don't: Never use `ActivityFeed` for system events, automated jobs, or error logs — it implies a human actor; use `RunHistory` for execution records.

---

## AuthForm

Login/signup form with social OAuth and email/password fields.

**Composes**: `FormField` (molecule), `Heading`/`Text` (atoms), `Input`/`Button`/`Separator` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `mode` | `"login" \| "signup"` | `"login"` | Form mode |
| `onSubmit` | `(data: { email: string; password: string; name?: string }) => void` | — | Submit handler |

### Do/Don't

✅ Do: Default `mode` to `"login"` for returning users — only switch to `"signup"` at the start of a registration flow.
✅ Do: Handle `onSubmit` externally — never put authentication logic (API calls, session storage) inside the component.
❌ Don't: Never add custom fields to `AuthForm` — extend via a wrapper component for additional registration fields; modifying the organism breaks its reusability.
❌ Don't: Never show `AuthForm` inside a modal — it must occupy a full centered page layout to meet accessibility and focus management requirements.

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

### Do/Don't

✅ Do: Always wire the `onCancel` handler — users need a clear path to dismiss the dialog without importing.
✅ Do: Support all four import formats unless deliberately limiting scope — partial format support should be explicitly communicated in the UI.
❌ Don't: Never validate import content inside `ImportDialog` — validate in the `onImport` handler after the content is received; the dialog handles collection only.
❌ Don't: Never trigger `ImportDialog` from a small icon button — always use a labeled "Import" action so the affordance is discoverable.

---

## ExportMenu

Export format selection panel with descriptions.

**Composes**: `Button` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `onExport` | `(format: ExportFormat) => void` | — | Export handler |
| `promptName` | `string` | — | Current prompt name |

**ExportFormat**: `"json" \| "csv" \| "yaml" \| "markdown" \| "clipboard"`

### Do/Don't

✅ Do: Pass `promptName` so the format descriptions can include the content name — users need to confirm they are exporting the right item.
✅ Do: Position `ExportMenu` as a secondary action (toolbar, overflow menu) — export is not a primary page action.
❌ Don't: Never add formats outside the five defined (json/csv/yaml/markdown/clipboard) without updating the `ExportFormat` type — mismatched values will fall through without styling.
❌ Don't: Never place `ExportMenu` in a primary button position — it is a utility action, not the page's main CTA.

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

### Do/Don't

✅ Do: Use `SettingsNav` at the page level as the sole tab controller for all settings sections — it owns the horizontal tab bar.
✅ Do: Sync `activeSection` with route state so deep-linking to a settings tab works correctly.
❌ Don't: Never embed `SettingsNav` inside a panel or card — it is a page-level component that must span the full content width.
❌ Don't: Never add icons to `SettingsNav` items — it is a text-only tab bar by design; icons add noise without improving scannability in settings contexts.

---

## APIKeyManager

API key list with masked values, reveal toggle, and add form.

**Composes**: `Badge`/`Button`/`Input` (ui)

| Prop | Type | Default | Description |
|---|---|---|---|
| `keys` | `APIKey[]` | — | Key list |
| `onAdd` | `(name: string, value: string) => void` | — | Add handler |
| `onDelete` | `(id: string) => void` | — | Delete handler |

### Do/Don't

✅ Do: Always mask key values by default — the reveal toggle is a deliberate user action and keys must not be visible on page load.
✅ Do: Use per-key reveal toggles, not a global "show all" — exposing all keys simultaneously increases the risk of accidental exposure.
❌ Don't: Never pre-populate the DOM with full key values — masked keys must not exist in the rendered HTML; fetch them on reveal.
❌ Don't: Never auto-copy keys to the clipboard without an explicit user action — clipboard access without intent is a security antipattern.

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

### Do/Don't

✅ Do: Use `connected={false}` with `status="inactive"` as the default for a not-yet-connected integration.
✅ Do: Match `status` to the actual connection state — use `"error"` when the connection attempt fails, not just when `connected` is `false`.
❌ Don't: Never show `IntegrationCard` as `connected={true}` when `status="error"` — the two props must be consistent or the card sends contradictory signals.
❌ Don't: Never stack more than 3 `IntegrationCard` components per row without wrapping — beyond 3, the cards become too small to read comfortably.

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

### Do/Don't

✅ Do: Always provide `onSkip` for non-required steps — forcing users through onboarding they don't need causes drop-off.
✅ Do: Control `currentStep` externally — the wizard is a controlled component; step progression must live in parent state.
❌ Don't: Never put more than 5 steps in a wizard — longer flows lose users; split into separate flows if more steps are needed.
❌ Don't: Never use `OnboardingWizard` for settings configuration — it is for first-run onboarding flows only; use `TabNav` + form sections for settings.

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

### Do/Don't

✅ Do: Use `loading={true}` while runs are fetching — it switches the organism to a skeleton state that prevents layout shift.
✅ Do: Provide a meaningful `emptyMessage` that explains the context ("No runs yet — click Run to execute this prompt.").
❌ Don't: Never show `RunHistory` inline alongside the content it relates to — it belongs in a dedicated side panel or tab.
❌ Don't: Never use `RunHistory` for non-execution data (activity logs, audit trails) — it is specifically for prompt execution records.

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

### Do/Don't

✅ Do: Pass `loading={true}` while data is fetching — the skeleton state prevents layout shift during load.
✅ Do: Use `DataManager` as the standard shell for any resource listing page (datasets, prompts, evaluations) — it provides the table, filters, bulk actions, and empty state in one organism.
❌ Don't: Never place a separate `FilterBar` outside a `DataManager` — it includes its own `FilterBar`; a second one creates conflicting filter state.
❌ Don't: Never pass more than 7 columns — the embedded `DataTable` will break layout on narrow viewports beyond that limit.

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

### Do/Don't

✅ Do: Always provide both `members` and `pendingInvites` arrays — the organism renders both lists and shows an empty state for each independently.
✅ Do: Gate `OrganizationManager` behind an admin role check — it exposes role assignment and member removal, which must not be accessible to non-admins.
❌ Don't: Never allow assigning a role higher than the current user's own role — enforce this in `onRoleChange` before updating state.
❌ Don't: Never show pending invites without an expiry or cancel action — dangling invites create security ambiguity.

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

### Do/Don't

✅ Do: Default to `"curl"` as the initial language — it is the most universally understood format for API exploration.
✅ Do: Use `APIDocPanel` alongside editors or settings forms so engineers can reference the API without leaving the page.
❌ Don't: Never show `APIDocPanel` in a modal — code samples require adequate width and the modal constrains horizontal space.
❌ Don't: Never set `showAuth={false}` without a clear reason — omitting auth requirements causes integration failures for consumers.

---

# Showcase (AI page)

Marketing-page organisms used on the AI overview route (`/ai`). These are site-only components and not part of the public registry surface.

| Component | Purpose |
|---|---|
| `HeroSection` | Hero block with headline, subhead, and primary CTA |
| `FileArchitectureSection` | Visual breakdown of the file-tree architecture |
| `QuickStartSection` | Install + first-run instructions with copyable commands |
| `ComparisonSection` | Feature comparison table vs. alternative tools |
| `EcosystemSection` | Ecosystem partners / supported integrations grid |

### Do/Don't

✅ Do: Use showcase organisms exclusively on the `/ai` marketing page — they are not part of the application component surface.
✅ Do: Keep copy and marketing claims inside these organisms in sync with product reality — they are visible externally.
❌ Don't: Never compose showcase organisms into app pages — they are marketing-only components with no application state integration.
❌ Don't: Never import showcase organisms into app pages — they are site-only and intentionally isolated from the public registry.

---

# Examples: prompt-x organisms

The 23 prompt-x-specific organisms live in the democrito-site repo. They are not part of the public registry, but stand as full reference implementations of how to compose democrito atoms into a prompt-engineering UI.

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
