# Templates — Component Reference

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

# App Chrome

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

# Content Layouts

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

# Showcase

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
