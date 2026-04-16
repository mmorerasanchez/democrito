# Behaviour Spec — /ai Page

> **Meta**
> - Product: democrito
> - Feature: /ai page — AI agent integration showcase and sales page
> - SDD reference: docs/specs/ai-page-sdd.md
> - Design System version: 1.0.0
> - Date: 2026-04-17
> - Status: Draft
> - Target IDE: Claude Code

---

## Feature Overview

The /ai page is democrito's most commercially important page — a full-width marketing and education page that explains how to use the design system with AI coding assistants (Claude Code, Cursor, Windsurf). Developers land here from GitHub, the shadcn registry, or organic search. They see the three-file AI context architecture, copy install commands, compare AI output with and without democrito context, and (in v2) evaluate paid knowledge packs. The page itself is a proof point: it's built entirely with democrito tokens and components, demonstrating the system's quality for information-dense, developer-facing content.

---

## Screen Inventory

| # | Screen / View name | Route or location | New or existing |
|---|-------------------|------------------|-----------------|
| 1 | AI Page | `/ai` | New |

Single-page, no modals, no sub-views. All content is static, vertically scrolled.

---

## Layout and Composition

### Screen 1 — AI Page

**Template used:** Full-width content page (no sidebar). Uses the existing page layout pattern: header + scrollable main content area.

**Layout zones:**

| Zone | Content | Component layer |
|------|---------|----------------|
| Header | Global navigation (existing) | Organism: existing site header |
| Main — Hero | Headline, value prop, install CTA with copy button | Organism: HeroSection |
| Main — Architecture | Three-file visual explanation (CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md) | Organism: FileArchitectureSection |
| Main — Quick Start | Three install paths with copy-pasteable commands | Organism: QuickStartSection |
| Main — Comparison | Before/after AI output comparison | Organism: ComparisonSection |
| Main — Token Reference | Compact token quick reference card | Molecule: TokenReferenceCard |
| Main — Ecosystem | Status grid for AI integration assets | Organism: EcosystemSection |

**Spacing notes:**
- Sections separated by `gap-16` (64px) — the largest step in the 4px spacing scale
- Internal section padding: `py-12 px-6` on mobile, `py-16 px-8` on desktop
- Max content width: `max-w-4xl mx-auto` for readability on wide screens
- Hero gets additional top padding: `pt-20` to clear the header and create visual breathing room

---

## Component Usage

| Component | Variant | States required | Notes |
|-----------|---------|----------------|-------|
| Heading | h1, h2, h3 | default | `font-display` throughout |
| Text | body, muted | default | `font-body` for descriptions |
| Code (atom) | inline | default | Inline code references in explanatory text |
| CopyButton | primary, ghost | default, hover, active, copied | New atom — primary for hero CTA, ghost for code blocks |
| CodeBlock | default | default | New atom — multi-line code display with copy button |
| Card (shadcn) | default | default | Used for file architecture cards and token reference |
| Badge (shadcn) | default, outline, secondary | default | Status indicators in ecosystem section |
| Button (shadcn) | default, outline, ghost | default, hover, active, focus, disabled | Section CTAs (limited use — accent for primary only) |
| Tag (atom) | status variants | default | Ecosystem item status: "Live", "Coming soon" |

**New components required:**

- `[NEW] CopyButton` — Atom. Button that copies a text value to clipboard, shows "Copied!" confirmation for 2 seconds, then reverts. Two variants: primary (standalone CTA with visible command text) and ghost (icon-only, overlaid on code blocks). Uses `navigator.clipboard.writeText()` with fallback.
- `[NEW] CodeBlock` — Atom. Pre-formatted, syntax-aware code display block. Background: `--surface`. Text: `font-mono`. Includes a ghost CopyButton in the top-right corner. Horizontal scroll on overflow. Optional language label in top-left (e.g., "bash", "tsx").

---

## Interaction Flows

### Flow 1 — Copy install command (Happy path)

| Step | Trigger | Action | Visual feedback | Duration |
|------|---------|--------|----------------|----------|
| 1 | User clicks CopyButton (hero or code block) | `navigator.clipboard.writeText(command)` | Button icon swaps from Copy to Check | instant |
| 2 | Clipboard write succeeds | Button text changes to "Copied!" | Check icon + "Copied!" label (primary variant) or check icon only (ghost) | `--duration-fast` (100ms) fade |
| 3 | 2 seconds elapse | Timer resets button state | Icon reverts to Copy, label reverts | `--duration-fast` (100ms) fade |

### Flow 1a — Copy install command (Error: clipboard unavailable)

| Step | Trigger | Action | Visual feedback | Duration |
|------|---------|--------|----------------|----------|
| 1 | User clicks CopyButton | `navigator.clipboard.writeText()` fails (e.g., HTTP context, permissions denied) | — | — |
| 2 | Catch block fires | Select the command text for manual copy | Text in the code block becomes selected (browser selection highlight) | instant |

**Rationale:** No toast or error message — the fallback is silent text selection. The user sees their text highlighted and can Cmd+C / Ctrl+C. This avoids error UI for a low-stakes interaction.

### Flow 2 — Theme switching (Happy path)

| Step | Trigger | Action | Visual feedback | Duration |
|------|---------|--------|----------------|----------|
| 1 | User toggles theme via global theme switcher | CSS custom properties update on `:root` | All sections re-render with new theme tokens | `--duration-normal` (150ms) transition |
| 2 | Transition settles | All surfaces, text, accent colours reflect new theme | — | — |

**Note:** Theme switching is handled by the existing global mechanism. The /ai page has no theme-specific logic — it inherits. The key design verification is that all three themes (dark, light, warm) pass contrast and hierarchy checks.

---

## Component State Specifications

### CopyButton (primary variant)

| State | Trigger | Visual change | Token used |
|-------|---------|--------------|------------|
| Default | Resting | `--accent` background, white text, Copy icon + command text | `--accent`, `font-mono` for command |
| Hover | Cursor over | Slight brightness increase | `--accent` at 110% lightness (CSS filter) |
| Active | Mouse down | Scale to 98% | `--accent` |
| Focus | Keyboard tab | 2px accent outline, 2px offset | `--accent` outline, `--background` offset |
| Copied | After clipboard write | Background stays `--accent`, icon swaps to Check, text → "Copied!" | `--accent`, `--success` icon tint |
| Disabled | [Not used in v1] | — | — |

### CopyButton (ghost variant)

| State | Trigger | Visual change | Token used |
|-------|---------|--------------|------------|
| Default | Resting | Transparent background, `--foreground-muted` icon only | `--foreground-muted` |
| Hover | Cursor over | `--surface` background appears, icon brightens to `--foreground` | `--surface`, `--foreground` |
| Active | Mouse down | `--card` background | `--card` |
| Focus | Keyboard tab | 2px accent outline | `--accent` |
| Copied | After clipboard write | Icon swaps to Check, tinted `--success` | `--success` |

### CodeBlock

| State | Trigger | Visual change | Token used |
|-------|---------|--------------|------------|
| Default | Resting | `--surface` background, `--foreground` text, ghost CopyButton in top-right | `--surface`, `font-mono` |
| Hover | Cursor enters block | Ghost CopyButton becomes more visible (opacity 0.5 → 1) | `--foreground-muted` → `--foreground` |
| Overflow | Content wider than container | Horizontal scrollbar appears | Browser default scrollbar |

### File Architecture Card

| State | Trigger | Visual change | Token used |
|-------|---------|--------------|------------|
| Default | Resting | `--card` background, `--foreground` heading, `--foreground-muted` description | `--card`, `font-display` heading, `font-body` description |
| Hover | Cursor over | Subtle border colour shift | `--accent-subtle` border |

### Ecosystem Status Item

| State | Trigger | Visual change | Token used |
|-------|---------|--------------|------------|
| Live | Item is published/available | Tag with `--success` variant, clickable link | `--success`, `font-mono` for URL |
| Coming soon | Item not yet available | Tag with `--foreground-muted` variant, no link | `--foreground-muted` |

---

## Empty, Loading, and Error Specifications

### Empty state

Not applicable — all content is static. No data fetching, no user-generated content.

### Loading state

- **When it shows:** Initial page load (client-side React hydration)
- **Visual:** Not needed — the page is lightweight static content. If bundle size ever causes visible loading, add skeleton blocks matching the hero and first section shapes. For v1, no loading state required.
- **Rationale:** The page has no API calls and no dynamic data. React hydration on a static page should be near-instant.

### Error state

Not applicable — no network requests, no form submissions. The only potential error (clipboard unavailable) is handled inline in Flow 1a.

---

## Responsive Behaviour

| Breakpoint | Layout change | Component change |
|-----------|--------------|-----------------|
| Mobile (< 768px) | Single column, full-width sections, `px-4` horizontal padding | Hero: install command wraps, CopyButton below command. Architecture: cards stack vertically. Comparison: stacks vertically (Without above, With below). CodeBlocks: horizontal scroll. Token reference: 2-column grid → single column |
| Tablet (768–1024px) | Single column, `px-6` padding, wider content area | Architecture: 3 cards in a row. Comparison: side-by-side. Token reference: 2-column grid |
| Desktop (> 1024px) | `max-w-4xl mx-auto`, `px-8` padding | Full layout as designed. Architecture: 3 cards in a row. Comparison: side-by-side with equal width. Token reference: 4-column grid |

**Specific rules for this feature:**

- **Hero install command (mobile):** The full `npx shadcn@latest add ...` command is long. On mobile, display it in a CodeBlock with horizontal scroll rather than wrapping. The CopyButton sits below the CodeBlock, full-width.
- **Comparison section (mobile):** "Without democrito" stacks above "With democrito". Add a clear visual divider (1px `--border` line) between the two. Label each with a `font-display text-sm` heading.
- **Token reference card (mobile):** Collapse from 4-column grid to single-column list. Each token group (surfaces, text, accent, fonts) becomes a collapsible section. Default: first group expanded, others collapsed.
- **Touch targets:** All CopyButtons and interactive elements must be minimum 44×44px on mobile. Ghost CopyButtons on CodeBlocks expand their hit area accordingly.
- **Code blocks (all breakpoints):** Never word-wrap code. Always horizontal scroll. This preserves copy-paste accuracy.

**Undefined mobile behaviours:** None — all components used (Card, Badge, Button, Tag) have established mobile patterns in the design system.

---

## Typography

All typography follows Design System defaults with the following feature-specific applications:

| Element | Application | Rationale |
|---------|------------|-----------|
| Hero headline | `font-display text-4xl font-bold` (mobile: `text-3xl`) | Page-level headline, largest text on page |
| Hero value prop | `font-body text-lg text-foreground-muted` | Supporting copy, de-emphasised |
| Section headings | `font-display text-2xl font-semibold` | Consistent section anchors |
| Install commands | `font-mono text-sm` inside CodeBlock | Commands are code — mono contract |
| File names | `font-mono text-base font-medium` | File paths are data — mono contract |
| Token names | `font-mono text-sm` | Token references are code — mono contract |
| Token values | `font-mono text-sm text-foreground-muted` | Values are data, de-emphasised |
| Comparison labels | `font-display text-sm font-medium uppercase tracking-wide` | Small structural labels differentiating the two panels |
| Ecosystem status text | `font-body text-sm` | Descriptive, not structural |
| "Coming soon" labels | `font-body text-xs text-foreground-muted italic` | De-emphasised, informational |

**No deviations from the three-font rule.** Every text element maps to exactly one of display, body, or mono.

---

## Accessibility Requirements

- **Focus order:** Hero CopyButton → Quick Start section CopyButtons (top to bottom, left to right) → Comparison section (passive, no interactive elements) → Token Reference (if collapsible: section toggles) → Ecosystem links (live items only)
- **ARIA roles:**
  - CopyButton: `role="button"`, `aria-label="Copy [command description] to clipboard"`
  - After copy: `aria-live="polite"` announcement: "Copied to clipboard"
  - CodeBlock: `role="code"` on the `<pre>` element
  - Collapsible token sections (mobile): `aria-expanded="true|false"`, `aria-controls="[section-id]"`
- **Screen reader copy:**
  - Copy icon: hidden (`aria-hidden="true"`), label on the button itself
  - Status Tags: "Live" and "Coming soon" are text, no extra labelling needed
  - Comparison section: label each panel with `aria-label="AI output without democrito context"` and `aria-label="AI output with democrito context"`
- **Keyboard interactions:**
  - Enter/Space on CopyButton: triggers copy
  - Tab navigates between all interactive elements in focus order
  - No keyboard traps — the page is purely scrollable content
- **Contrast:** All text tokens verified against their background surfaces. Critical pairs:
  - `--foreground` on `--background`: passes 4.5:1 in all three themes
  - `--foreground-muted` on `--surface`: verify in warm theme (closest to threshold)
  - `--accent` on `--background`: verify in light theme

---

## Theme-Specific Verification

Because the /ai page is a showcase, all three themes must be explicitly verified.

| Theme | Key verification points |
|-------|----------------------|
| **Dark** (default) | Surface hierarchy visible: `--background` (darkest) → `--surface` (code blocks) → `--card` (architecture cards). Accent terracotta prominent against dark. |
| **Light** | Ensure code blocks (`--surface`) are distinguishable from page background. Accent must not wash out. Check `--foreground-muted` contrast on `--surface`. |
| **Warm** | Most differentiated theme. Verify earth-tone palette doesn't muddy the hierarchy. Accent terracotta must still read as accent, not blend with warm surface tones. Token reference card borders must be visible. |

---

## Design Decisions and Rationale

| Decision | Rationale | Anti-pattern |
|----------|-----------|-------------|
| Full-width page, no sidebar | This is a marketing/education page, not a dashboard. Sidebar adds cognitive overhead with no navigation benefit | DO NOT add sidebar navigation. Internal page links (if needed) use anchor scroll |
| One accent-coloured CTA per visible section | Prevents accent fatigue and preserves the "accent = action" signal | DO NOT make multiple buttons accent-coloured in the same viewport |
| Code blocks use `--surface`, not `--card` | Code blocks are content containers, not elevated cards. Using `--card` would incorrectly imply a higher hierarchy level | DO NOT use `--card` for code display |
| Comparison section uses side-by-side layout (desktop) | Direct visual comparison is the core value prop — temporal comparison (tabs, toggle) weakens the impact | DO NOT use tabs or toggles for the comparison |
| Ghost CopyButton appears on hover | Reduces visual noise. The copy action is discoverable but not competing with the content | DO NOT show copy buttons at full opacity by default — they clutter code blocks |
| Token reference uses `font-mono` for both names and values | Both are machine-readable references — consistency reinforces the mono contract | DO NOT use `font-body` for token values |
| No "scroll to top" button | Page is not long enough to justify one. If content grows significantly in v2, reconsider | DO NOT add scroll-to-top unless page exceeds ~6 viewport heights |
| Mobile token sections collapse | The full token grid is overwhelming on small screens. Collapsing preserves scannability | DO NOT show all token groups expanded on mobile |

---

## Downstream Connections

| Section | Feeds skill | For |
|---------|------------|-----|
| Component states (CopyButton, CodeBlock) | `dev-prompt-engineer` | Implementation requirements per state |
| Interaction flows (copy, theme switch) | `dev-prompt-engineer` | User flow implementation |
| State specifications (all components) | `qa-prompt-engineer` | Interaction test cases |
| Responsive behaviour rules | `qa-prompt-engineer` | Cross-device test matrix |
| Accessibility requirements | `qa-prompt-engineer` | Accessibility test cases |
| New components (CopyButton, CodeBlock) | Design System update | Add to atoms inventory before dev |
| Theme verification matrix | `qa-prompt-engineer` | Three-theme visual regression |
