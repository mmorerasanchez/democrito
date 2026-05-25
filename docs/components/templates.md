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

No external props — manages sidebar collapsed/expanded state internally and reads route state from React Router.

| Internal State | Type | Description |
|---|---|---|
| `collapsed` | `boolean` | Sidebar collapse; toggled via `SidebarNav` |
| `mobileOpen` | `boolean` | Mobile drawer visibility; toggled via `TopBar` menu button |

```tsx
// Used as a route layout element — no props
<Route element={<AppShell />}>
  <Route path="library" element={<LibraryPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>
```

**Responsive:** Mobile (`< lg`) — sidebar hidden, rendered as overlay drawer with `bg-background/80` backdrop. Desktop (`lg+`) — sidebar is `relative` and always visible (`lg:translate-x-0`).

**Design Tokens:** `--sidebar-width`, `--sidebar-collapsed`, `--header-height`, `z-overlay`, `z-modal`

**Rules:**
- Wrap all authenticated `/app/*` routes with this template.
- Do not pass children directly — page content renders via `<Outlet />`.

---

# Content Layouts

Reusable page structures for different content types.

---

## DashboardLayout

Overview page template. Optional header → stats row → main content grid; constrained to `max-w-6xl` and centered.

| Prop | Type | Default | Description |
|---|---|---|---|
| `children` | `ReactNode` | — | Main content grid |
| `header` | `ReactNode` | — | Welcome section or page title |
| `stats` | `ReactNode` | — | KPI stats row (e.g. `DashboardStats`) |
| `className` | `string` | — | Additional classes |

```tsx
<DashboardLayout
  header={<WelcomeHeader />}
  stats={<DashboardStats items={kpis} />}
>
  <ActivityFeed />
  <RecentPrompts />
</DashboardLayout>
```

**Responsive:** `p-4` mobile · `md:p-6` tablet · `lg:p-8` desktop. All sections stack vertically.

---

## LibraryLayout

Filterable card grid template. FilterBar on top → scrollable responsive grid → optional pagination footer. Optional bulk actions bar overlays from the bottom when rendered.

| Prop | Type | Default | Description |
|---|---|---|---|
| `filters` | `ReactNode` | — | FilterBar or search controls |
| `children` | `ReactNode` | — | Card grid content (1/2/3-col responsive grid) |
| `pagination` | `ReactNode` | — | Pagination controls |
| `bulkActions` | `ReactNode` | — | BulkActionsBar (animates in from bottom via `animate-bulk-bar-in`) |
| `className` | `string` | — | Additional classes |

```tsx
<LibraryLayout
  filters={<FilterBar />}
  pagination={<Pagination />}
  bulkActions={selected.length > 0 && <BulkActionsBar count={selected.length} />}
>
  {prompts.map(p => <PromptCard key={p.id} {...p} />)}
</LibraryLayout>
```

**Responsive:** `grid-cols-1` mobile · `sm:grid-cols-2` small · `lg:grid-cols-3` desktop. Content padding: `p-4 md:p-6`.

**Design Tokens:** `animate-bulk-bar-in`

---

## DetailLayout

Full-width detail view with structured header and scrollable tab content. Breadcrumb → title bar → optional status lifecycle → optional tabs → content.

| Prop | Type | Default | Description |
|---|---|---|---|
| `titleBar` | `ReactNode` | — | Title + action buttons (required) |
| `children` | `ReactNode` | — | Active tab content, scrollable (required) |
| `breadcrumb` | `ReactNode` | — | Breadcrumb navigation above title |
| `statusBar` | `ReactNode` | — | StatusLifecycleBar or similar |
| `tabs` | `ReactNode` | — | Tab navigation; omit on saved/readonly views |
| `className` | `string` | — | Additional classes |

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

**Responsive:** Header sections use `px-4 md:px-6`. Content area uses `p-4 md:p-6`.

---

## EditorLayout

50/50 split-pane template. Left editor pane + 4px visual resizer + right preview pane. Optional header bar above the split.

| Prop | Type | Default | Description |
|---|---|---|---|
| `editor` | `ReactNode` | — | Left pane content |
| `preview` | `ReactNode` | — | Right pane content |
| `header` | `ReactNode` | — | Header bar above the split |
| `className` | `string` | — | Additional classes |

```tsx
<EditorLayout
  header={<EditorToolbar />}
  editor={<PromptEditorPanel />}
  preview={<CompiledPreview />}
/>
```

**Responsive:** Mobile (`< md`) — stacks `flex-col`; `border-b` separates panes; resizer hidden. Desktop (`md+`) — side-by-side `flex-row` with `border-r` on editor pane; 4px `cursor-col-resize` resizer visible (`md:block`).

**Design Tokens:** `bg-border`, `accent/30` (resizer hover)

---

## ComparisonLayout

Side-by-side 50/50 comparison template. Toolbar on top, two equal scrollable panels below.

| Prop | Type | Default | Description |
|---|---|---|---|
| `toolbar` | `ReactNode` | — | Version selectors, sync toggle, close button |
| `panelA` | `ReactNode` | — | Left version panel |
| `panelB` | `ReactNode` | — | Right version panel |
| `className` | `string` | — | Additional classes |

```tsx
<ComparisonLayout
  toolbar={<ComparisonToolbar />}
  panelA={<VersionPanel version={versionA} />}
  panelB={<VersionPanel version={versionB} />}
/>
```

**Responsive:** Mobile (`< md`) — toolbar → panel A → panel B, stacked `flex-col`; `border-b` separates panels. Desktop (`md+`) — panels side-by-side `md:flex-row`; `md:border-r` divider; 1px `bg-border` spacer visible (`md:block`).

---

# Showcase

Components used in the design system showcase itself.

---

## TemplatePreview

Interactive wireframe preview with viewport switcher (desktop / tablet / mobile). For use in showcase pages only.

| Prop | Type | Default | Description |
|---|---|---|---|
| `title` | `string` | — | Template name |
| `description` | `string` | — | One-line description |
| `responsive` | `string` | — | Responsive behavior summary |
| `composedOf` | `string` | — | Comma-separated components used |
| `zones` | `ContentZone[]` | — | Named layout zones for the wireframe |
| `layout` | `LayoutType` | — | Layout variant (see below) |
| `className` | `string` | — | Additional classes |

**`ContentZone`**: `{ label: string; className?: string }`

**Layout variants:**

| Value | Wireframe structure |
|---|---|
| `"sidebar-main"` | Sidebar + header + main; mobile collapses sidebar to drawer label |
| `"sidebar-main-panel"` | Sidebar + header + main + right panel; tablet hides right panel |
| `"split-pane"` | Sidebar + header + editor (50%) + preview (50%); mobile stacks |
| `"comparison"` | Sidebar + header + version A + version B; mobile stacks |
| `"centered"` | Centered auth card on muted background |
| `"modal-overlay"` | Modal with dimmed backdrop; scales by viewport |
| `"full-width"` | Header + hero/content + footer |
| `"sidebar-settings"` | Sidebar + header + settings nav + settings content |

```tsx
<TemplatePreview
  title="EditorLayout"
  description="50/50 split pane — editor left, preview right."
  responsive="Stacks vertically on mobile (< md)"
  composedOf="EditorToolbar, PromptEditorPanel, CompiledPreview"
  layout="split-pane"
  zones={[
    { label: "Sidebar" },
    { label: "Header" },
    { label: "Editor" },
    { label: "Preview" },
  ]}
/>
```

**Rules:**
- Use only in showcase/documentation pages (`/templates` route), never in production views.
- Viewport toggle buttons (desktop / tablet / mobile) are built in — do not wrap in another switcher.

---

## Composition rules

1. **Templates hold no business logic** — spatial structure only. Data fetching, state, and events belong in Pages.
2. **One template per page** — each route page composes exactly one template.
3. **Slots accept ReactNode** — templates are agnostic to what fills each slot.
4. **AppShell wraps everything** — all authenticated routes nest inside `AppShell` via `<Outlet />`.
5. **Responsive by default** — all templates handle breakpoints internally; do not override layout flex/grid in slot content.

---

## Responsive behavior summary

| Template | Mobile | Tablet / Desktop |
|---|---|---|
| `AppShell` | Sidebar hidden; overlay drawer via menu button | `lg+`: sidebar always visible, `relative` |
| `DashboardLayout` | `p-4` | `md:p-6` · `lg:p-8` |
| `LibraryLayout` | 1-col grid · `p-4` | `sm`: 2-col · `lg`: 3-col · `md:p-6` |
| `DetailLayout` | `px-4` header · `p-4` content | `md:px-6` header · `md:p-6` content |
| `EditorLayout` | Panes stacked; resizer hidden | `md+`: side-by-side; resizer visible |
| `ComparisonLayout` | Panels stacked | `md+`: panels side-by-side |
| `TemplatePreview` | 320px max-width preview | 580px (tablet) · 100% (desktop) |
