# democrito Design System v3.3

> Single Source of Truth · Last updated: 2026-05-17
> democrito is a general-purpose, themeable Atomic Design System for data-dense, IDE-inspired applications.

---

## 1. Executive Summary

democrito is a production-ready design system for data-dense, IDE-inspired applications — dashboards, editors, AI tools, and internal platforms. The design system uses monochromatic warm stone grays (95% of surface area), a terracotta orange accent (4%), and semantic colors (1%). It is IDE-inspired with a distraction-free workspace aesthetic, ships 80+ components across 5 atomic layers, supports 3 themes (warm default, dark, light), and meets WCAG 2.1 AA accessibility standards.

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

### Atoms

> **Two counts, different scopes:**
> - **Custom atoms** (`registry/atoms/`) — 11 hand-crafted single-purpose components. These are the "democrito atoms" referenced in OverviewPage stats and CLAUDE.md.
> - **shadcn/ui primitives** (`registry/ui/`) — 15 form/interactive atoms sourced from shadcn/ui and extended via CVA. Counted separately; extend them but never rebuild from scratch.
> - **Total atom-level components: 26** (11 custom + 15 shadcn/ui)

#### Custom atoms (11)

| Name | Base | Status |
|---|---|---|
| Code | custom | Ready |
| CodeBlock | custom | Ready |
| CopyButton | custom | Ready |
| Heading | custom | Ready |
| Kbd | custom | Ready |
| Link | custom | Ready |
| Logo | custom | Ready |
| Spinner / ThinkingDots | custom | Ready |
| StatusBadge | custom | Ready |
| Tag | custom | Ready |
| Text | custom | Ready |

#### shadcn/ui atoms (15)

| Name | Base | Status |
|---|---|---|
| Avatar | shadcn/ui Avatar | Ready |
| Badge | shadcn/ui Badge + CVA | Ready |
| Button | shadcn/ui Button + CVA | Ready |
| Checkbox | shadcn/ui Checkbox | Ready |
| Input | shadcn/ui Input | Ready |
| Label | shadcn/ui Label | Ready |
| Progress | shadcn/ui Progress | Ready |
| RadioGroup | shadcn/ui RadioGroup | Ready |
| Select | shadcn/ui Select | Ready |
| Separator | shadcn/ui Separator | Ready |
| Skeleton | shadcn/ui Skeleton | Ready |
| Slider | shadcn/ui Slider | Ready |
| Switch | shadcn/ui Switch | Ready |
| Textarea | shadcn/ui Textarea | Ready |
| Tooltip | shadcn/ui Tooltip | Ready |

### Molecules (17)

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
| BreadcrumbNav | custom | Ready | |
| AvatarGroup | custom | Ready | Overlapping avatar stack with +N overflow badge |
| DiffLine | custom | Ready | Single diff line with line number, +/− prefix, semantic color |
| ActivityFeedItem | custom | Ready | Activity row with user, action badge, target, timestamp |
| VariableEditorRow | custom | Ready | Name/value input pair with delete and highlight state |
| RunHistoryItem | custom | Ready | Run entry with model, status, tokens, latency |
| TokenReferenceCard | custom | Ready | Inline token swatch + name + value for token docs pages |

> **Pagination** is a shadcn/ui primitive at `registry/ui/pagination.tsx`, not a custom democrito molecule.

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
| RunHistory | custom | Ready |
| APIDocPanel | custom | Ready |
| OrganizationManager | custom | Ready |
| DataManager | custom | Ready |

### Templates (7)

| Name | Description | Status |
|---|---|---|
| AppShell | Full-page wrapper: header + collapsible sidebar + main | Ready |
| EditorLayout | Split-pane: 50/50 editor + preview with resizer | Ready |
| LibraryLayout | Sidebar + filterable card grid | Ready |
| DashboardLayout | Sidebar + header + scrollable main + optional right panel | Ready |
| DetailLayout | Sidebar + full-width detail view with tabs | Ready |
| ComparisonLayout | Side-by-side Version A / Version B (50/50) diff panels | Ready |
| TemplatePreview | Lightweight preview frame for showcase pages | Ready |

> **Planned (not yet implemented):** SettingsLayout, AuthLayout, ModalLayout

---

## 8. Showcase Pages

The democrito repo is a self-contained design system showcase — no application routes. All pages live in `src/pages/` and are routed via `src/App.tsx` inside `ShowcaseLayout`.

| Route | Page Component | Sidebar Label | Notes |
|---|---|---|---|
| `/` | `OverviewPage` | README | Hero, Why/How/What, stats, design principles |
| `/tokens` | `TokensPage` | Tokens | Full token reference + TokenReferenceCard |
| `/atoms` | `AtomsPage` | Atoms | Custom atoms + shadcn/ui atoms showcase |
| `/molecules` | `MoleculesPage` | Molecules | All 17 molecules |
| `/organisms` | `OrganismsPage` | Organisms | All 19 public organisms |
| `/pages` | `TemplatesPage` | Layouts | All 7 layout templates |
| `/ai` | `AiPage` | AI | Install + FileArchitecture + Distribution cards |
| `/ai/:platform` | `AiDetailPage` | — | Per-platform deep-dive (claude, vibe-coding, github, …) |
| `/manifesto` | `ManifiestoPage` | MANIFIESTO | Editorial manifesto |
| `/test/tokens` | `TokenSmokeTest` | — | Dev-only smoke test, not linked in nav |

---

## 9. Changelog

See [CHANGELOG.md](../CHANGELOG.md) for the full version history.

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

Three themes — warm is the default at `:root`; dark and light are class-toggled:

| Theme | Selector | Description |
|---|---|---|
| Warm | `:root` (default) | Sanzo Wada earth-tones, terracotta accent |
| Dark | `.dark` | Cold stone grays, light text |
| Light | `.light` | Warm off-whites, dark text |

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

---

*11 custom atoms + 15 shadcn/ui atoms · 17 molecules · 19 organisms · 7 templates · 3 themes · WCAG 2.1 AA*

<!-- CHECKSUM: Custom Atoms(11) + Molecules(17) + Organisms(19) + Templates(7) = 54 custom components; 48+ shadcn/ui primitives in ui/ -->
