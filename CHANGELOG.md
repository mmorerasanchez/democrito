# Changelog

All notable changes to the **democrito** design system will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [3.1.1] — 2026-05-05

### Fixed

- `CLAUDE.md` and `README.md`: removed all references to deleted `tailwind.config.ts` (removed in v3.1.0 — replaced by CSS-first `@theme` block in `src/index.css`).
- `README.md`: updated Tailwind CSS badge from `3.4+` to `4.2+`.
- `public/llms.txt`: updated Tailwind CSS version to `4.2`.
- Component inventory tables in `README.md` and `CLAUDE.md` updated to reflect actual barrel exports: 10 / 18 / 19 / 7 (public surface) + 23 prompt-x organisms currently in `src/components/organisms/`, slated for extraction to `src/examples/prompt-x/` in v3.2.0.
- `docs/components/*.md` audited against barrel exports; missing atom stubs (`Logo`, `CodeBlock`, `CopyButton`) added; organisms docs now accurately reflect the 19-component public surface plus AI showcase + prompt-x pointer sections.

---

## [3.1.0] — 2026-04-24

### Changed — Tailwind CSS v4 migration (CSS-first config)

- **BREAKING:** Upgraded `tailwindcss` from `^3.4.17` to `^4.2.4`.
- **BREAKING:** Tailwind configuration moved from `tailwind.config.ts` (JS config) to a CSS-first `@theme` block in `src/index.css`. `tailwind.config.ts` deleted.
- **BREAKING:** `postcss.config.js` removed; Tailwind v4 integrates via the new `@tailwindcss/vite` plugin (added to `vite.config.ts`).
- **BREAKING:** `postcss` and `autoprefixer` dependencies removed (no longer needed).
- **BREAKING:** `@tailwindcss/typography` removed (unused — zero `prose` classes in codebase).
- **BREAKING:** `tailwindcss-animate` replaced by `tw-animate-css@^1.4.0` — the v4-native drop-in that preserves all `animate-in`, `fade-in-0`, `zoom-in-95`, `slide-in-from-*` utilities used by 16+ shadcn primitives.
- **BREAKING:** `shadow-sm` → `shadow-xs` across 6 component files (`ui/card.tsx`, `ui/slider.tsx`, `ui/tabs.tsx`, `molecules/TabNav.tsx`, `pages/OnboardingPage.tsx`, `pages/TokensPage.tsx`) — v4 shifted the shadow scale by one step; this rename preserves the v3 visual look.

### Fixed

- Defined the missing `caret-blink` keyframe referenced by `ui/input-otp.tsx` (previously dangling — only worked by accident).

### Updated

- `registry.json` rewritten for the shadcn v4 schema: dropped the legacy `tailwind.config` block, added `cssVars.theme` for @theme tokens, added a `css` block with all keyframes, swapped `tailwindcss-animate` for `tw-animate-css` in `dependencies`. Version bumped to `3.1.0`.
- `components.json` cleared the now-meaningless `tailwind.config` path.
- `CLAUDE.md` token/config references still point to `src/index.css` (source of truth for tokens — unchanged).

### Verification

- `npm run lint`, `npm run test` (56 tests), `npm run build`, `npm run test:visual` (21 snapshots × 3 themes) — all pass.
- End-to-end: fresh Vite + React-TS project with `shadcn init` + `shadcn add <democrito registry item>` successfully installs 10 UI components, merges all tokens, builds with custom app using `font-display` / `bg-background` / `text-accent` / `bg-muted` utilities.

### Notes

- The three CSS custom property theme blocks (`:root`, `.light`, `.warm`) are unchanged — the token system is still the source of truth; only the Tailwind integration layer moved.
- CSS bundle grew from ~83 KB → ~116 KB (+39%) due to `tw-animate-css` shipping a broader catalogue of utilities than `tailwindcss-animate`. JS bundle unchanged.

### Added — `/ai` showcase page integration (Session 9)

- `/ai` route moved from standalone layout into the `ShowcaseLayout` shell — now a peer of `/tokens`, `/atoms`, etc.
- "AI" tab added to the sidebar navigation with `Bot` icon from Lucide.
- All 5 AI organism sections (`HeroSection`, `FileArchitectureSection`, `QuickStartSection`, `ComparisonSection`, `EcosystemSection`) restyled to match showcase design patterns: `font-display text-lg font-medium tracking-tight` headings, `space-y-4` section spacing, `rounded-lg border border-border bg-card` cards, `sm:`/`lg:` breakpoint progression.
- Shared `INSTALL_COMMAND` constant extracted to `src/components/organisms/ai/install-command.ts` — single source of truth for hero and quick-start sections.

### Added — `/tokens` page tooling (Session 9)

- **Search/filter box** — filters color, typography, spacing, radius, and shadow sections by token name, Tailwind class, HEX value, or HSL value. Leading `#` is stripped for hex search convenience. Empty state shown when no tokens match.
- **JSON export** — "Export tokens" button downloads a `democrito-tokens-{theme}.json` file containing all active-theme tokens with `cssVar`, `tailwind`, `hsl`, and `hex` mappings for colors; `name`, `tailwind`, and `cssVar` for spacing, radius, and shadows; full typography scale with `tailwind` classes.
- **Per-swatch HEX/HSL copy** — compact copy chips on each color swatch; uses async Clipboard API with `document.execCommand("copy")` fallback for non-secure contexts.

### Added — Responsive audit (Session 9)

- `CloseMobileSidebarOnNav` helper in `ShowcaseLayout` — auto-closes the mobile sidebar drawer on route change.
- `min-w-0` on the `ShowcaseLayout` flex content column to prevent overflow.
- Header gap tightened (`gap-2 sm:gap-3`) with `truncate` on the wordmark for 320px safety.
- `OverviewPage` hero CTAs refactored to `flex-col sm:flex-row` for mobile stacking.
- `overflow-hidden` safety net added to `AtomsPage` and `MoleculesPage` Section demo wrappers.

### Removed — Legacy `/app` pages (Session 10)

- Deleted 7 prompt-x application pages: `DashboardPage`, `LibraryPage`, `PromptDetailPage`, `PromptEditorPage`, `AIDesignerPage`, `SettingsPage`, `OnboardingPage`.
- Deleted `ProtectedGate` component (only used by `/app` routes).
- Removed all `/app` route definitions from `App.tsx`.
- All organisms, templates, and molecules retained — they're showcased by the design system pages.

### Fixed — Registry token completeness

- `registry.json` `cssVars` expanded: `theme` 75 keys, `dark` 63 keys, `light` 58 keys — added `color-accent-muted`, `color-accent-subtle`, `color-warm-dark`, 8× `color-sidebar-*`, 8× semantic `{success,warning,error,info}-{bg,border}`, 9× `color-category-*`, 4× `color-status-*`.
- `democrito-warm` theme variant receives the same treatment with warm-specific HSL values.
- E2E verified: fresh Vite+RTS project installs registry and compiles `bg-category-teal`, `bg-sidebar`, `bg-accent-muted`, `bg-success-bg`, etc.

---

## [1.0.0] — 2026-04-17

### Added

- Production deployment to `democrito.design` via Vercel (first stable release).

### Changed

- Live showcase URL migrated from `democrito-design-system.lovable.app` to `democrito.design` across `README.md` and `registry.json`.

---

## [0.3.0] — 2026-02-19

### Changed

#### Organisms Showcase — Streamlined for Reusability
- Reduced organism showcase from 42 → 15 components (4 categories)
- Removed prompt-x specific organisms (Prompt Store, Prompt Editor, Playground & Testing, AI & Evaluation) — transferred to prompt-x application
- Remaining categories: Navigation & Layout (5), Dashboard & Data (4), Settings & Config (4), Import & Export (2)
- Removed password-protected overlay system from organisms page
- Updated all documentation, README, CLAUDE.md, and DESIGN_SYSTEM.md to reflect new counts

---

## [0.2.0] — 2026-02-19

### Added

#### Documentation
- `docs/getting-started.md` — quick start guide with prerequisites, scripts, project structure, and theming basics
- `docs/migration.md` — migration guide for consuming tokens and migrating from MUI, Chakra, Bootstrap, and Tailwind UI
- `design-tokens.json` — W3C DTCG–format design tokens for tooling interoperability (Figma Token Studio, Style Dictionary)
- Updated `docs/README.md` index with links to Getting Started and Migration guides

#### Repository Health
- `.github/ISSUE_TEMPLATE/bug_report.md` — structured bug report template
- `.github/ISSUE_TEMPLATE/feature_request.md` — feature request template
- `.github/PULL_REQUEST_TEMPLATE.md` — PR checklist with token compliance and theme testing
- `.github/CODEOWNERS` — ownership rules for tokens, components, and documentation
- `.github/workflows/ci.yml` — CI pipeline (lint, typecheck, test) on push/PR to main

### Changed

#### Organisms Showcase (`/organisms`)
- Grouped organisms into categories with clickable jump-nav and CategoryHeaders
- Added `CategoryHeader` component with border-top dividers and mono count badges

---

## [0.1.0] — 2026-02-18

### Added

#### Design System Architecture
- Atomic Design methodology with 5 layers: Atoms, Molecules, Organisms, Templates, UI Primitives
- Three-theme support: Dark (default), Light, Warm — all defined via CSS custom properties in `src/index.css`
- Monochromatic + accent color philosophy (95% warm stone grays, 4% terracotta orange, 1% semantic)
- Three-font typography system: Plus Jakarta Sans (display), Satoshi (body), JetBrains Mono (mono)

#### Atoms (7 components)
- `Code` — inline code with accent styling
- `Heading` — H1–H4 with font-display hierarchy
- `Kbd` — keyboard shortcut badges
- `Link` — styled anchor with accent underline
- `Spinner` — loading indicator
- `Tag` — anatomy field color tags (9 field colors)
- `Text` — body text variants (default, muted, subtle)

#### Molecules (18 components)
- `ActivityFeedItem` — single activity entry
- `AvatarGroup` — stacked avatar display
- `BreadcrumbNav` — navigation breadcrumbs
- `DiffLine` — version diff line display
- `EmptyState` — empty content placeholder
- `FormField` — label + input composition
- `NavItem` — sidebar navigation item
- `ParameterControl` — model parameter slider
- `PromptFieldHeader` — anatomy field section header
- `RunHistoryItem` — single run history entry
- `ScoreBreakdown` — evaluation score display
- `SearchBar` — search input with icon
- `StatCard` — dashboard metric card
- `TabNav` — tab navigation bar
- `TestCaseRow` — test dataset row
- `TokenCounter` — token usage display
- `VariableEditorRow` — variable key-value editor
- `VariableHighlight` — inline variable highlight

#### Organisms (15 showcase + additional prototype-only components)
- `AIGenerationPanel` — AI prompt generation interface
- `APIDocPanel` — API documentation viewer
- `APIKeyManager` — API key CRUD management
- `ActivityFeed` — activity timeline
- `AnatomyFieldCard` — 9-field anatomy editor card
- `AuthForm` — login/signup form
- `BulkActionsBar` — multi-select action bar
- `CLEARScorePanel` — CLEAR scoring panel
- `CompiledPreview` — compiled prompt preview
- `CreatePromptDialog` — new prompt creation dialog
- `DashboardStats` — dashboard statistics grid
- `DataManager` — data management interface
- `DataTable` — sortable data table
- `EvalConfirmModal` — evaluation confirmation modal
- `EvaluationResults` — evaluation results display
- `EvaluationResultsView` — full evaluation results view
- `ExportMenu` — export options menu
- `FilterBar` — filter controls bar
- `GlobalVariableManager` — global variable management
- `ImportDialog` — import dialog
- `ImprovedPromptPanel` — AI-improved prompt display
- `IntegrationCard` — third-party integration card
- `OnboardingWizard` — user onboarding flow
- `OrganizationManager` — organization settings
- `PlaygroundPanel` — prompt playground
- `PresetCard` — model preset card
- `PresetDetailPanel` — preset detail panel
- `PromptCard` — prompt library card
- `PromptConfigFields` — prompt configuration fields
- `PromptEditorPanel` — main prompt editor
- `RunHistory` — run history list
- `SettingsNav` — settings navigation
- `SidebarNav` — collapsible sidebar navigation
- `StatusLifecycleBar` — Draft → Testing → Production → Archived workflow
- `TemplatePicker` — template selection
- `TestDatasetManager` — test dataset management
- `TestRunnerModal` — test execution modal
- `TopBar` — top navigation bar with theme toggle
- `UserMenu` — user dropdown menu
- `VariableManager` — variable management panel
- `VersionComparison` — version diff comparison
- `VersionTimeline` — version history timeline

#### Templates (7 components)
- `AppShell` — root app layout (sidebar + topbar + outlet)
- `ComparisonLayout` — side-by-side comparison layout
- `DashboardLayout` — dashboard grid layout
- `DetailLayout` — detail view with right panel
- `EditorLayout` — split-pane editor layout
- `LibraryLayout` — library grid/list layout
- `TemplatePreview` — template wireframe preview

#### UI Primitives (40+ shadcn/ui components)
- Accordion, Alert, AlertDialog, AspectRatio, Avatar, Badge, Breadcrumb, Button, Calendar, Card, Carousel, Chart, Checkbox, Collapsible, Command, ContextMenu, Dialog, Drawer, DropdownMenu, Form, HoverCard, Input, InputOTP, Label, Menubar, NavigationMenu, Pagination, Popover, Progress, RadioGroup, Resizable, ScrollArea, Select, Separator, Sheet, Sidebar, Skeleton, Slider, Sonner, Switch, Table, Tabs, Textarea, Toast, Toaster, Toggle, ToggleGroup, Tooltip

#### Design Tokens
- **Core surfaces**: `--background`, `--surface`, `--card` (3-layer hierarchy)
- **Text colors**: `--foreground`, `--muted-foreground`, `--foreground-muted`, `--foreground-subtle`
- **Accent system**: `--accent`, `--accent-muted`, `--accent-subtle`, `--warm-dark`
- **Interactive**: `--primary`, `--secondary`, `--destructive`, `--muted`, `--popover`, `--input`, `--ring`, `--border`
- **Semantic feedback**: `--success`, `--warning`, `--error`, `--info` (each with `-bg` and `-border` variants)
- **Anatomy fields** (9 prompt sections): `--anatomy-role`, `--anatomy-tone`, `--anatomy-context`, `--anatomy-task`, `--anatomy-reasoning`, `--anatomy-examples`, `--anatomy-output`, `--anatomy-constraints`, `--anatomy-tools`
- **Status lifecycle**: `--status-draft`, `--status-testing`, `--status-production`, `--status-archived`
- **Typography scale**: `text-2xs` (10px) through `text-3xl` (36px) — 9 sizes
- **Spacing tokens**: `--header-height` (3.5rem), `--sidebar-width` (15rem), `--sidebar-collapsed` (4rem), `--right-panel` (22rem)
- **Border radius**: `--radius` (0.75rem) with `lg`, `md`, `sm` variants
- **Z-index scale**: `--z-dropdown` (50), `--z-sticky` (100), `--z-overlay` (200), `--z-modal` (300), `--z-toast` (400)
- **Motion tokens**: 5 durations (instant → slow), 4 easing curves, AI-specific animation tokens
- **Sidebar tokens**: `--sidebar-background`, `--sidebar-foreground`, `--sidebar-primary`, `--sidebar-accent`, `--sidebar-border`, `--sidebar-ring`

#### Animations
- `ai-pulse` — AI thinking indicator
- `ai-cursor` — AI cursor blink
- `slide-in-right` — panel slide-in
- `bulk-bar-in` — bulk actions bar entrance
- `accordion-down` / `accordion-up` — accordion open/close

#### Pages & Routes
- Design system showcase: Overview (`/`), Tokens (`/tokens`), Atoms (`/atoms`), Molecules (`/molecules`), Organisms (`/organisms`), Templates (`/templates`), Pages (`/pages`)
- Application pages: Dashboard (`/app`), Library (`/app/library`), Prompt Detail (`/app/library/:id`), Prompt Editor (`/app/library/:id/edit`), AI Designer (`/app/ai-designer`), Settings (`/app/settings`), Onboarding (`/app/welcome`)
- Testing: Token Smoke Test (`/test/tokens`)

#### Tooling
- **Vite** — build tool and dev server
- **TypeScript 5** (strict mode) — type safety
- **Tailwind CSS 3.4** with `tailwindcss-animate` plugin
- **Vitest** — unit testing framework
- **ESLint** — code linting
- **React Router 6** — client-side routing
- **TanStack React Query** — async state management

#### Documentation
- `README.md` — project overview, architecture, AI agent instructions, tech stack
- `CONTRIBUTING.md` — contribution guidelines, commit conventions, component workflow
- `CHANGELOG.md` — version history (this file)
- `LICENSE` — MIT license
- `src/DESIGN_SYSTEM.md` — complete design system specification (v2.3)

[3.1.0]: https://github.com/mmorerasanchez/democrito/compare/v1.0.0...v3.1.0
[1.0.0]: https://github.com/mmorerasanchez/democrito/compare/v0.3.0...v1.0.0
[0.3.0]: https://github.com/mmorerasanchez/democrito/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/mmorerasanchez/democrito/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/mmorerasanchez/democrito/releases/tag/v0.1.0
