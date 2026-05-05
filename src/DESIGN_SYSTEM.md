# democrito Design System v2.3

> Single Source of Truth · Last updated: 2026-05-05
> democrito is a general-purpose, themeable Atomic Design System for data-dense, IDE-inspired applications.

---

## 1. Executive Summary

democrito is a production-ready design system for data-dense, IDE-inspired applications — dashboards, editors, AI tools, and internal platforms. The design system uses monochromatic warm stone grays (95% of surface area), a terracotta orange accent (4%), and semantic colors (1%). It is IDE-inspired with a distraction-free workspace aesthetic, ships 80+ components across 5 atomic layers, supports 3 themes (dark default, light, warm), and meets WCAG 2.1 AA accessibility standards.

---

## 2. Design Principles

| Principle | Description |
|---|---|
| Monochromatic + Accent | 95% warm stone grays, 4% terracotta orange, 1% semantic |
| 3-Surface Hierarchy | `background` → `surface` → `card` creates depth without complexity |
| Data Is Code | All user-editable content, variables, identifiers, and code use `font-mono` always |
| Typography as Hierarchy | Display (titles/nav), Body (labels/descriptions), Mono (data/code) |
| Progressive Disclosure | Start with lightest variant, add complexity on demand |
| Accessible by Default | WCAG 2.1 AA, 44×44px touch targets, Radix UI primitives |
| IDE-Inspired | Clean, distraction-free workspace for data-dense work |

---

## 3. Font System

### Font Families

| Token | Font | Fallbacks | Usage |
|---|---|---|---|
| `font-display` | Plus Jakarta Sans | Poppins, Inter, system-ui | Headings, buttons, nav |
| `font-body` | Satoshi | Outfit, Inter, system-ui | Descriptions, labels, helpers |
| `font-mono` | JetBrains Mono | IBM Plex Mono, Consolas | ALL prompt content, variables, inputs, data, badges |

### Font Usage Matrix

| UI Element | Font Class | Size | Weight |
|---|---|---|---|
| Page titles | `font-display` | `text-xl` | `font-semibold` |
| Section headers | `font-display` | `text-lg` | `font-medium` |
| Card titles | `font-display` | `text-md` | `font-medium` |
| Button labels | `font-display` | — | `font-medium` |
| Nav items | `font-display` | `text-sm` | `font-medium` |
| Body text | `font-body` | `text-base` | — |
| Form labels | `font-body` | `text-sm` | `font-medium` |
| Descriptions | `font-body` | `text-sm` | — |
| Anatomy field names | `font-body` | `text-sm` | `font-medium` |
| All inputs/textareas | `font-mono` | `text-base` | — |
| Tab labels | `font-mono` | `text-sm` | `font-medium` |
| Badges | `font-mono` | `text-xs` | `font-medium` |
| Table headers | `font-mono` | `text-xs` | `uppercase tracking-widest` |
| Table data | `font-mono` | `text-sm` | — |
| Token counts | `font-mono` | `text-xs` | — |
| Variables | `font-mono` | `text-sm` | `font-medium` |
| KPI values | `font-mono` | `text-2xl` | `font-bold` |
| Metadata | `font-mono` | `text-2xs` | — |

> **Critical rule:** Provider names (Anthropic, OpenAI) use `font-body`. Model strings (`claude-3.5-sonnet`, `gpt-4-turbo`) **ALWAYS** use `font-mono`.

---

## 4. Color System

### Core Surfaces (3-layer hierarchy)

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Background | `--background` | `20 14% 4%` | `bg-background` | Page background (darkest) |
| Surface | `--surface` | `20 8% 8%` | `bg-surface` | Panels, sidebars, headers |
| Card | `--card` | `12 6% 15%` | `bg-card` | Cards, dialogs, elevated content |

### Text Colors

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Foreground | `--foreground` | `60 9% 98%` | `text-foreground` | Primary text |
| Muted | `--muted-foreground` | `24 5% 64%` | `text-muted-foreground` | Secondary text, timestamps |
| Subtle | `--foreground-subtle` | `24 5% 45%` | `text-foreground-subtle` | Tertiary text, placeholders |
| Accent | `--accent` | `18 65% 55%` | `text-accent` | Links, highlights, interactive |
| Warm Dark | `--warm-dark` | `20 8% 72%` | `text-warm-dark` | Emphasis text on warm surfaces |

### Accent & Action

| Token | CSS Variable | Dark HSL | Tailwind Class | Usage |
|---|---|---|---|---|
| Accent | `--accent` | `18 65% 55%` | `bg-accent text-accent-foreground` | Primary CTA, terracotta orange |
| Accent Muted | `--accent-muted` | `18 40% 30%` | `bg-accent-muted` | Hover states, disabled buttons, badges |
| Accent Subtle | `--accent-subtle` | `20 15% 10%` | `bg-accent-subtle` | Code blocks, active tabs, selected rows |
| Primary | `--primary` | `20 6% 90%` | `bg-primary text-primary-foreground` | Standard buttons (inverts per theme) |
| Destructive | `--destructive` | `6 65% 60%` | `bg-destructive` | Delete, danger actions (matches error) |

### Semantic Feedback (theme-adaptive)

Semantic colors are now **theme-adaptive** — each theme has tuned values for optimal contrast and warmth on its surfaces.

| State | CSS Variable | Dark HSL | Light HSL | Warm HSL |
|---|---|---|---|---|
| Success | `--success` | `148 45% 50%` | `148 50% 42%` | `152 45% 38%` |
| Warning | `--warning` | `40 75% 55%` | `40 80% 48%` | `38 70% 45%` |
| Error | `--error` | `6 65% 60%` | `6 70% 52%` | `8 60% 48%` |
| Info | `--info` | `215 50% 62%` | `215 55% 52%` | `215 45% 48%` |

Each has `bg` (10% opacity) and `border` (30% opacity) variants: `bg-success-bg`, `border-success-border`, etc.

### Anatomy Field Colors (9 fields)

Each field uses a colored dot indicator. Cards use plain `bg-card` backgrounds with standard `border-border`.

| Field | CSS Variable | HSL | Tailwind Class |
|---|---|---|---|
| Role | `--anatomy-role` | `185 55% 42%` | `text-anatomy-role` / `bg-anatomy-role` |
| Tone | `--anatomy-tone` | `38 80% 50%` | `text-anatomy-tone` / `bg-anatomy-tone` |
| Context | `--anatomy-context` | `152 55% 40%` | `text-anatomy-context` / `bg-anatomy-context` |
| Task | `--anatomy-task` | `25 85% 52%` | `text-anatomy-task` / `bg-anatomy-task` |
| Reasoning | `--anatomy-reasoning` | `262 55% 55%` | `text-anatomy-reasoning` / `bg-anatomy-reasoning` |
| Examples | `--anatomy-examples` | `340 65% 55%` | `text-anatomy-examples` / `bg-anatomy-examples` |
| Output | `--anatomy-output` | `230 60% 58%` | `text-anatomy-output` / `bg-anatomy-output` |
| Constraints | `--anatomy-constraints` | `0 70% 55%` | `text-anatomy-constraints` / `bg-anatomy-constraints` |
| Tools | `--anatomy-tools` | `48 85% 48%` | `text-anatomy-tools` / `bg-anatomy-tools` |

### Status Colors

| Status | CSS Variable | HSL | Tailwind Class |
|---|---|---|---|
| Draft | `--status-draft` | `45 93% 47%` | `text-status-draft` / `bg-status-draft/10` |
| Testing | `--status-testing` | `217 91% 60%` | `text-status-testing` / `bg-status-testing/10` |
| Production | `--status-production` | `142 71% 45%` | `text-status-production` / `bg-status-production/10` |
| Archived | `--status-archived` | `0 0% 45%` | `text-status-archived` / `bg-status-archived/10` |

---

## 5. Spacing & Layout

**Base unit:** 4px

**Spacing scale:** `4` · `8` · `12` · `16` · `24` · `32` · `48` · `64` px

### Layout Dimensions

| Token | CSS Variable | Value | Tailwind Class |
|---|---|---|---|
| Header height | `--header-height` | `56px` (3.5rem) | `h-header` |
| Sidebar width | `--sidebar-width` | `240px` (15rem) | `w-sidebar-w` |
| Sidebar collapsed | `--sidebar-collapsed` | `64px` (4rem) | `w-sidebar-collapsed` |
| Right panel | `--right-panel` | `352px` (22rem) | `w-right-panel` |

### Border Radius

| Token | Value | Tailwind Class |
|---|---|---|
| Small | `4px` | `rounded-sm` |
| Medium | `8px` | `rounded-md` |
| Large | `12px` (`--radius`) | `rounded-lg` |
| Full | `9999px` | `rounded-full` |

### Z-Index Scale

| Layer | Value | Tailwind Class |
|---|---|---|
| Dropdown | `50` | `z-dropdown` |
| Sticky | `100` | `z-sticky` |
| Overlay | `200` | `z-overlay` |
| Modal | `300` | `z-modal` |
| Toast | `400` | `z-toast` |

---

## 6. Motion & Animation

### Duration Tokens

| Token | CSS Variable | Value |
|---|---|---|
| Instant | `--duration-instant` | `50ms` |
| Fast | `--duration-fast` | `100ms` |
| Normal | `--duration-normal` | `150ms` |
| Medium | `--duration-medium` | `200ms` |
| Slow | `--duration-slow` | `300ms` |

### Easing Tokens

| Token | CSS Variable | Value |
|---|---|---|
| Default | `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` |
| Out | `--ease-out` | `cubic-bezier(0, 0, 0.2, 1)` |
| In | `--ease-in` | `cubic-bezier(0.4, 0, 1, 1)` |
| Spring | `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

### Usage Guide

| Interaction | Duration | Easing | CSS Variable |
|---|---|---|---|
| Hover | `150ms` | `ease` | `--duration-normal` |
| Press / active | `100ms` | `ease` | `--duration-fast` |
| Modal enter | `200ms` | `ease-out` | `--duration-medium` |
| Modal exit | `150ms` | `ease-in` | `--duration-normal` |
| Accordion | `200ms` | `ease-out` | `--duration-medium` |
| Toast | `300ms` | `ease-out` | `--duration-slow` |
| Skeleton pulse | `1.5s` | `ease-in-out` | — |
| Toggle | `200ms` | `spring` | `--ease-spring` |
| AI thinking dots | `1.4s` | `ease-in-out` | `ai-pulse` keyframe |
| AI cursor blink | `1s` | `step-end` | `ai-cursor` keyframe |
| Spinner | `1s` | `linear` | — |
| Typing animation | variable | `step-end` | `useTypingAnimation` hook |

> **Motion philosophy:** Restrained and functional. Max 300ms for UI transitions. Respect `prefers-reduced-motion` always.

---

## 7. Component Inventory

### Atoms (22)

| Name | Base | Status |
|---|---|---|
| Button | shadcn/ui Button + CVA | Ready |
| Input | shadcn/ui Input | Ready |
| Textarea | shadcn/ui Textarea | Ready |
| Select | shadcn/ui Select | Ready |
| Checkbox | shadcn/ui Checkbox | Ready |
| RadioGroup | shadcn/ui RadioGroup | Ready |
| Switch | shadcn/ui Switch | Ready |
| Slider | shadcn/ui Slider | Ready |
| Badge | shadcn/ui Badge + CVA | Ready |
| Tag | custom | Ready |
| Avatar | shadcn/ui Avatar | Ready |
| Heading | custom | Ready |
| Text | custom | Ready |
| Label | shadcn/ui Label | Ready |
| Link | custom | Ready |
| Code | custom | Ready |
| Separator | shadcn/ui Separator | Ready |
| Skeleton | shadcn/ui Skeleton | Ready |
| Spinner | custom | Ready |
| Tooltip | shadcn/ui Tooltip | Ready |
| Progress | shadcn/ui Progress | Ready |
| Kbd | custom | Ready |

### Molecules (18)

| Name | Base | Status | Notes |
|---|---|---|---|
| FormField | custom | Ready | |
| SearchBar | custom | Ready | |
| ParameterControl | custom | Ready | Slider + numeric input for model params |
| VariableHighlight | custom | Ready | Inline {{variable}} token with accent styling |
| TokenCounter | custom | Ready | |
| FieldHeader | custom | Ready | Field header with colored dot, label, token count |
| StatCard | custom | Ready | Trend shown via +/- prefix and color only (no icons) |
| EmptyState | custom | Ready | Title + description + CTA button (no icon) |
| NavItem | custom | Ready | Supports collapsed mode with count badge overlay |
| TabNav | custom | Ready | Horizontal tab navigation with active state, optional icons, disabled support |
| Breadcrumb | shadcn/ui Breadcrumb | Ready | |
| Pagination | shadcn/ui Pagination | Ready | |
| DiffLine | custom | Ready | Single diff line with line number, +/− prefix, semantic color |
| ActivityFeedItem | custom | Ready | Activity row with user, action badge, target, timestamp |
| VariableEditorRow | custom | Ready | Name/value input pair with delete and highlight state |
| RunHistoryItem | custom | Ready | Run entry with model, status, tokens, latency |

### Organisms (19 — public surface)

> 23 prompt-x example organisms + 2 example molecules (TestCaseRow, ScoreBreakdown) live in `src/examples/prompt-x/`. They are full-featured reference implementations and are NOT part of the public democrito surface.

| Name | Base | Status |
|---|---|---|
| TopBar | custom | Ready |
| SidebarNav | custom | Ready |
| FilterBar | custom | Ready |
| BulkActionsBar | custom | Ready |
| UserMenu | custom | Ready |
| DataTable | custom | Ready |
| DashboardStats | custom | Ready |
| ActivityFeed | custom | Ready |
| AuthForm | custom | Ready |
| ImportDialog | custom | Ready |
| ExportMenu | custom | Ready |
| SettingsNav | custom | Ready |
| APIKeyManager | custom | Ready |
| IntegrationCard | custom | Ready |
| OnboardingWizard | custom | Ready |

### Templates (8)

| Name | Description | Status |
|---|---|---|
| EditorLayout | Split-pane: 50/50 editor + preview with resizer | Ready |
| LibraryLayout | Sidebar + filterable card grid | Ready |
| DashboardLayout | Sidebar + header + scrollable main + optional right panel | Ready |
| DetailLayout | Sidebar + full-width detail view with tabs | Ready |
| ComparisonLayout | Side-by-side Version A / Version B (50/50) diff panels | Ready |
| SettingsLayout | Horizontal tab navigation below header + content area | Ready |
| AuthLayout | Centered card on full-height background | Ready |
| ModalLayout | Centered modal (60–80% viewport) over dimmed overlay | Ready |

---

## 8. Application Pages

### 8.1 Dashboard (`/app`)

**Template:** DashboardLayout  
**Key organisms:** DashboardStats, TabNav, PromptConfigFields, EvalConfirmModal, EvaluationResultsView, ActivityFeed

| Section | Width | Content |
|---|---|---|
| PageHeader | full | H1 "Dashboard" + muted subtitle |
| KPI Row | full | 4× StatCard (Total Prompts, Evaluations, Avg Score, Active Users) |
| AI Designer | full | TabNav (Generator / Evaluator) + "Open designer" link |
| Generator tab | full | Compact PromptConfigFields with typing animation + Generate button |
| Evaluator tab | full | Compact PromptConfigFields + Evaluate button → EvalConfirmModal → EvaluationResultsView |
| Activity Feed | full | Recent activity list |

### 8.2 Prompt Store (`/app/library`)

**Template:** DashboardLayout  
**Key organisms:** StatCard, FilterBar, PromptCard, BulkActionsBar, CreatePromptDialog

| Section | Width | Content |
|---|---|---|
| PageHeader | full | H1 "Prompt Store" + "New Prompt" button |
| KPI Row | full | 4× StatCard (Total, Production, Avg Tokens, This Week) |
| Toolbar | full | FilterBar with search, status chips, sort, grid/list toggle |
| Content | full | Grid (1/2/3-col responsive) or list table view |
| Bulk Actions | sticky bottom | Conditional bar when items selected |

**Grid/list toggle:** `viewMode` state switches between card grid and data table.

### 8.3 AI Designer (`/app/ai-designer`)

**Template:** DashboardLayout  
**Key organisms:** StatCard, TabNav, PromptConfigFields, EvalConfirmModal, EvaluationResultsView, RunHistory, TestDatasetManager

| Tab | Layout | Content |
|---|---|---|
| Generator | 50/50 split (lg) | Left: Full PromptConfigFields + Generate button. Right: Output area |
| Evaluator | stacked | Full PromptConfigFields + Evaluate button → EvalConfirmModal → EvaluationResultsView. Below: 2/3 TestDatasetManager + 1/3 RunHistory |

### 8.4 Prompt Detail — Saved View (`/app/library/:id`)

**Template:** DetailLayout  
**Key organisms:** BreadcrumbNav, StatusLifecycleBar, StatCard, AnatomyFieldCard, CompiledPreview, EvalConfirmModal, EvaluationResultsView

| Section | Width | Content |
|---|---|---|
| Breadcrumb | full | Library → Prompt Name |
| Title bar | full | H1 + version badge + History/Run/Edit buttons |
| Status bar | full | StatusLifecycleBar (Draft → Testing → Production → Archived) |
| KPI Row | full | 4× StatCard |
| Content | 50/50 split | Left: Fields (compact cards), Settings grid, Variables list. Right: Sticky CompiledPreview |

**Run action:** Run button opens EvalConfirmModal (with compiled prompt as instruction) → transitions to full-page EvaluationResultsView.  
**Navigation:** Edit button uses `useNavigate()` (not `asChild`) to avoid React `Slot` crash.

### 8.5 Prompt Editor (`/app/library/:id/edit`)

**Template:** EditorLayout (split-pane)  
**Key organisms:** BreadcrumbNav, TabNav, AnatomyFieldCard, CompiledPreview, VariableManager, VersionTimeline, VersionComparison, PromptConfigFields, EvalConfirmModal, EvaluationResultsView

| Tab | Content |
|---|---|
| Fields | 9 AnatomyFieldCards (expanded variant) with token counts |
| Settings | PromptConfigFields in `settings` mode (flat, no anatomy) |
| Variables | VariableManager with add/edit/delete |
| Versions | 1/3 VersionTimeline + 2/3 VersionComparison side-by-side |
| Variations | Disabled, "soon" badge |

**Run action:** Run button opens EvalConfirmModal (with compiled prompt as instruction) → transitions to full-page EvaluationResultsView.  
**Navigation:** Back button uses `useNavigate()`.

### 8.6 Settings (`/app/settings`)

**Template:** DashboardLayout  
**Key organisms:** SettingsNav, APIKeyManager, IntegrationCard, APIDocPanel, PresetCard, PresetDetailPanel, OrganizationManager, GlobalVariableManager, DataManager, StatCard

| Tab | Content |
|---|---|
| Profile | Personal info form + Editor Defaults (merged from Preferences) |
| Billing | Plan card with usage meters + credit usage bar chart + billing history |
| API Keys | APIKeyManager (BYOK) + APIDocPanel + Integrations grid |
| Presets | Model Presets (system + user CRUD) + Prompt Presets (system + user CRUD) with PresetDetailPanel |
| Organization | OrganizationManager (Tabs + Tags sections with create/edit modals) |
| Variables | GlobalVariableManager (table + add form + sync note) |
| Data | DataManager (Export checkboxes + Import drop zone + Danger Zone) |
| Team | Coming soon placeholder (disabled) |

### 8.7 Onboarding (`/app/welcome`)

**Template:** Centered (no app shell)  
**Key organisms:** OnboardingWizard, PromptConfigFields, ScoreBreakdown, TokenCounter

5-step guided wizard:

| Step | Title | Content | Interaction |
|---|---|---|---|
| 1 | Select Model & Platform | Model dropdown (grouped by provider) + Platform dropdown | Manual advance |
| 2 | Configure Parameters | Reasoning framework, Complexity buttons, Temperature/MaxTokens sliders | Manual advance |
| 3 | Provide Instructions | Toggle: Plain Text (textarea) / Anatomy Fields (borderless cards with textareas) | Manual advance |
| 4 | Generating Your Prompt | Phase indicators with ai-pulse animation (no icon) | Auto-advance after ~3.2s |
| 5 | Your Improved Prompt | Compiled output preview + TokenCounter + ScoreBreakdown (modal) + Save/Edit buttons | Save → Dashboard |

**Key details:**
- Step 3 anatomy field cards have NO borders (plain `bg-card` with rounded corners only)
- Step 4 has NO icon above the phase indicators
- ScoreBreakdown opens as a centered Dialog (not a Popover) with close button

---

## 9. Sidebar Navigation

### SidebarNav Component

3-section sidebar with equal `space-y-6` vertical spacing between sections:

| Section | Expanded | Collapsed |
|---|---|---|
| **Hubs** | Icon + label (Store, Designer, Settings) | Icon only |
| **Projects** | Hash icon + label + count badge + "Add" button | Hash icon + small count badge overlay (positioned `-top-1.5 -right-1.5`) |
| **Coming Soon** | Icon + label + "soon" badge (disabled) | Icon only (disabled) |

**Key behaviors:**
- Collapsed width: `64px` (`w-sidebar-collapsed`)
- Expanded width: `240px` (`w-sidebar-w`)
- Projects section remains visible when collapsed (count badges shown as small overlays on hash icons)
- User footer with avatar, name, and email
- Mobile: sidebar becomes overlay drawer triggered by hamburger menu

---

## 10. Accessibility Requirements

| Requirement | Standard |
|---|---|
| Color contrast | 4.5:1 normal text, 3:1 large text |
| Focus indicators | 2px accent ring, `focus-visible` only |
| Keyboard navigation | Radix UI primitives for all interactive elements |
| Screen readers | Semantic HTML + ARIA attributes |
| Motion | `prefers-reduced-motion` disables all animations |
| Touch targets | 44×44px minimum for all interactive elements |
| Forms | `aria-describedby` for help text, `aria-invalid` for errors |

---

## 11. Theme System

Three themes applied via class on `<html>`:

| Theme | Class | Description |
|---|---|---|
| Dark | `.dark` (default) | Warm dark grays, light text |
| Light | `.light` | Cool light grays, dark text |
| Warm | `.warm` | Sepia-toned, paper-like warmth |

- **Primary button** inverts per theme (light-on-dark in dark, dark-on-light in light)
- **Accent** stays terracotta orange (`hue 18°`) across all themes. Warm theme intentionally uses `hsl(18, 60%, 45%)` (−10% lightness) for better contrast on warm surfaces — this is by design.
- Semantic colors (success, warning, error, info) are **theme-adaptive** — each theme has tuned HSL values

---

## 12. Icon Rules

**Library:** Lucide React

| Size | Pixels | Tailwind Class | Usage |
|---|---|---|---|
| sm | `14px` | `size-3.5` | Inline, badges |
| md | `18px` | `size-4` | Buttons (default), nav |
| lg | `24px` | `size-5` | Large buttons, section headers |

**Color:** `currentColor` always — never hardcode icon colors.

| ✅ Allowed in | ❌ Not allowed in |
|---|---|
| Buttons | Page titles |
| Nav items | Section headers |
| Status indicators | KPI labels |
| Table actions | Card titles |
| — | Table row content |
| — | Empty states |
| — | KPI trend indicators |

---

## 13. Page Content Architecture

All pages follow a standardized information architecture:

1. **PageHeader:** H1 (`font-display text-xl font-semibold`) + muted subtitle (`Text variant="muted"`)
2. **KPI Row:** 4× `StatCard` in a `grid-cols-2 lg:grid-cols-4` grid
3. **Content Blocks:** Bordered card containers (`rounded-md border border-border bg-card`)
4. **Vertical Spacing:** Major sections separated by `space-y-6`
5. **Split Panes:** 50/50 ratio using `lg:flex-row` or `lg:grid-cols-2`

### Card Section Pattern

```
<div className="rounded-md border border-border bg-card">
  <div className="border-b border-border px-3 py-2">
    <span className="font-display text-sm font-medium text-foreground">Section Title</span>
  </div>
  <div className="p-4">{content}</div>
</div>
```

### Navigation Patterns

- **Edit/Back buttons:** Use `useNavigate()` with `onClick` handler. Never use `Button asChild > Link` to avoid `React.Children.only` crash.
- **External links:** Append `↗` suffix with `target="_blank"` and `rel="noopener noreferrer"`.
- **Tab navigation:** `font-mono text-sm font-medium` with `border-b-2 border-accent` active underline.

---

## 14. Form Component Standards

| Property | Value |
|---|---|
| Background | `bg-card` |
| Height | `h-9` (36px) |
| Corners | `rounded-md` |
| Font | `font-mono text-sm` |
| Focus ring | `ring-accent` |

All form components (Input, Textarea, SelectTrigger) must align visually with standard buttons.

---

## 15. Build Sequence

1. ~~**Verify tokens**~~ ✅ Font imports, feedback opacity, duration tokens
2. ~~**Build atoms**~~ ✅ All 22 atoms built and showcased
3. ~~**Build molecules**~~ ✅ All 17 molecules + ScoreBreakdown built and showcased
4. ~~**Build organisms**~~ ✅ All 36+ organisms built and showcased
5. ~~**Build democrito patterns**~~ ✅ All pattern organisms built and showcased
6. ~~**Build templates**~~ ✅ All 8 templates built and showcased
7. ~~**Assemble pages**~~ ✅ Dashboard, Library, AI Designer, Detail, Editor, Settings, Onboarding

---

## 16. Recent Changes Log

| Date | Change | Files Affected |
|---|---|---|
| 2026-02-18 | Cross-Theme Color Audit: 28 token changes + 3 new tokens (`accent-muted`, `accent-subtle`, `warm-dark`). Fixed collapsed surface hierarchy, cold light theme, theme-blind semantics, dark input/card collision. Semantic colors now theme-adaptive. | `index.css`, `tailwind.config.ts`, `TokenSmokeTest.tsx`, `DESIGN_SYSTEM.md` |
| 2026-02-17 | Settings Panel Overhaul: restructured from 6→8 tabs, merged Preferences→Profile, consolidated Integrations→API Keys, added Presets/Organization/Variables/Data tabs | `SettingsPage.tsx`, `APIDocPanel.tsx`, `PresetCard.tsx`, `PresetDetailPanel.tsx`, `OrganizationManager.tsx`, `GlobalVariableManager.tsx`, `DataManager.tsx` |
| 2026-02-12 | Unified evaluator flow: all 4 entry points (Dashboard, Designer, Detail, Editor) use EvalConfirmModal → EvaluationResultsView | `DashboardPage.tsx`, `AIDesignerPage.tsx`, `PromptDetailPage.tsx`, `PromptEditorPage.tsx` |
| 2026-02-12 | Added CLEARScorePanel: collapsible CLEAR framework scores with dimension breakdown + Insights placeholder | `CLEARScorePanel.tsx` |
| 2026-02-12 | Added ImprovedPromptPanel: tabbed view (Full Version / Anatomy Fields) with copy, save, re-evaluate actions | `ImprovedPromptPanel.tsx` |
| 2026-02-12 | Added EvalConfirmModal: configuration summary dialog before running evaluations | `EvalConfirmModal.tsx` |
| 2026-02-12 | Added EvaluationResultsView: full-page results with Improved Prompt, KPIs, CLEAR Score | `EvaluationResultsView.tsx` |
| 2026-02-12 | Deprecated TestRunnerModal in favor of EvalConfirmModal + EvaluationResultsView workflow | `TestRunnerModal.tsx` |
| 2026-02-12 | CLEARScorePanel: consolidated Strengths/Improvements/Suggestions into single "Insights" section with "soon" badge | `CLEARScorePanel.tsx` |
| 2026-02-10 | ScoreBreakdown: Converted from Popover to centered Dialog (modal) | `ScoreBreakdown.tsx` |
| 2026-02-10 | Onboarding step 3: Removed borders from anatomy field cards | `OnboardingPage.tsx` |
| 2026-02-10 | Onboarding step 4: Removed Sparkles icon above generation phases | `OnboardingPage.tsx` |
| 2026-02-10 | SidebarNav: Equal `space-y-6` spacing between all 3 sections | `SidebarNav.tsx` |
| 2026-02-10 | SidebarNav: Projects visible in collapsed mode with count badge overlays | `SidebarNav.tsx`, `NavItem.tsx` |
| 2026-02-10 | NavItem: Added collapsed count badge (positioned `-top-1.5 -right-1.5`) | `NavItem.tsx` |
| 2026-02-10 | Edit/Back buttons: Switched from `asChild > Link` to `useNavigate()` onClick | `PromptDetailPage.tsx`, `PromptEditorPage.tsx` |
| 2026-02-10 | PagesPage: Updated to reflect all 7 current app pages with accurate descriptions | `PagesPage.tsx` |

---

## 17. Evaluator Workflow Architecture

All 4 entry points share the same evaluator workflow:

```
[Configure] → [EvalConfirmModal] → [1.8s simulation] → [EvaluationResultsView]
```

| Entry Point | Instruction Source | Back Navigation |
|---|---|---|
| Dashboard (`/app`) | User-typed in evaluator textarea | Returns to Dashboard evaluator tab |
| AI Designer (`/app/ai-designer`) | User-typed in evaluator config | Returns to Designer evaluator tab |
| Prompt Detail (`/app/library/:id`) | Compiled prompt from anatomy fields | Returns to Detail page |
| Prompt Editor (`/app/library/:id/edit`) | Compiled prompt from anatomy fields | Returns to Editor page |

### EvaluationResultsView Layout

| Section | Component | Description |
|---|---|---|
| Back + Header | Button + Heading | "Back to Evaluator" + "Evaluation Results" |
| Improved Prompt | ImprovedPromptPanel | Tabbed: Full Version (monospace preview) / Anatomy Fields (editable cards). Actions: Copy, Save to Store, Re-evaluate |
| KPI Row | 4× StatCard | Tokens, Latency, Est. Cost, CLEAR Score |
| CLEAR Score | CLEARScorePanel | Collapsible: overall score, 5 dimension bars (C/L/E/A/R), Insights placeholder |

---

*80+ components · 3 themes · 9 anatomy fields · 7 app pages · WCAG 2.1 AA*

<!-- CHECKSUM: Atoms(22) + Molecules(18) + Organisms(15 showcase) + Templates(8) = 63 showcase -->
