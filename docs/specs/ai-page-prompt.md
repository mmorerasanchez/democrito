# /ai Page — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Complex
> - Version: 1.0
> - Status: Draft
> - Source SDD: docs/specs/ai-page-sdd.md
> - Behaviour Spec: docs/specs/ai-page-behaviour.md
> - Business context: Notion-only (not in repo — see changes @democrito)
> - Prompt chain: 1 of 2 — next: ai-page-v2-sales (Knowledge Packs + CTAs, after storefront is live)
> - Created: 2026-04-17

## Role

Act as a senior React developer building a design system showcase site with
democrito — an atomic design system using React 18, TypeScript strict, Tailwind
CSS 3.4, and shadcn/ui. You understand Atomic Design methodology, CSS custom
property token systems, and how to build information-dense marketing pages that
work across three themes (dark, light, warm). You build from existing component
patterns, never invent new conventions, and treat `font-mono` as the only
acceptable font for all code, commands, file paths, and data values.

## Context

democrito is an open-source design system for AI-native development workflows.
Its key differentiator is three structured context files (CLAUDE.md, DESIGN.md,
DESIGN_SYSTEM.md) that AI coding assistants consume to produce on-brand output.
The /ai page is the most commercially important page on the site — it explains
the AI integration story, provides copy-pasteable install commands, and shows
a before/after comparison of AI output quality. The page itself is a proof
point: it must be built entirely with democrito tokens and components,
demonstrating the system's quality for developer-facing content. This is v1 —
informational content only, no purchase flow.

## Codebase Orientation

- Page component pattern: @src/pages/AtomsPage.tsx (uses `Section` + `SubSection` wrappers)
- Existing organisms: @src/components/organisms/ (45 components — follow naming conventions)
- Existing atoms: @src/components/atoms/ (Code.tsx, Heading.tsx, Text.tsx, Tag.tsx, etc.)
- Design tokens: @src/index.css (surfaces: `--background`, `--surface`, `--card`; accent: `--accent`, `--accent-muted`, `--accent-subtle`; text: `--foreground`, `--foreground-muted`, `--foreground-subtle`)
- Tailwind mapping: @tailwind.config.ts (custom breakpoints: sm 480, md 768, lg 1024, xl 1280)
- Font classes: `font-display` (Plus Jakarta Sans), `font-body` (Satoshi), `font-mono` (JetBrains Mono)
- Route setup: @src/App.tsx or wherever React Router routes are defined — add `/ai` route
- shadcn/ui components: @src/components/ui/ (Button, Card, Badge available)
- Three themes: dark (default), light, warm — all defined in @src/index.css
- Animation tokens: `--duration-fast` (100ms), `--duration-normal` (150ms), `--ease-default`

## Task

Build the /ai page as a full-width, static content page with six sections:
Hero, Three-File Architecture, Quick Start, How It Works comparison,
Token Quick Reference, and Ecosystem Status. Create two new atoms (CopyButton,
CodeBlock) and five new organisms for the page sections.

## Steps

1. Create the `CopyButton` atom in `src/components/atoms/CopyButton.tsx` — two variants (primary with text, ghost icon-only), clipboard write with 2-second confirmation
2. Create the `CodeBlock` atom in `src/components/atoms/CodeBlock.tsx` — `--surface` background, `font-mono`, ghost CopyButton overlay, horizontal scroll on overflow, optional language label
3. Create the `HeroSection` organism in `src/components/organisms/ai/HeroSection.tsx` — headline, value prop, primary CopyButton with install command
4. Create the `FileArchitectureSection` organism in `src/components/organisms/ai/FileArchitectureSection.tsx` — three Card components explaining CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md
5. Create the `QuickStartSection` organism in `src/components/organisms/ai/QuickStartSection.tsx` — three install paths with CodeBlock + CopyButton each
6. Create the `ComparisonSection` organism in `src/components/organisms/ai/ComparisonSection.tsx` — side-by-side "Without context" vs "With context" CodeBlocks with realistic code snippets
7. Create the `TokenReferenceCard` molecule in `src/components/molecules/TokenReferenceCard.tsx` — compact token quick reference in a 4-column grid (responsive to single column on mobile)
8. Create the `EcosystemSection` organism in `src/components/organisms/ai/EcosystemSection.tsx` — status grid with Tag indicators (Live / Coming soon)
9. Create the `AiPage` page component in `src/pages/AiPage.tsx` — compose all sections, full-width layout
10. Register the `/ai` route in the router configuration
11. Verify all three themes render correctly — dark, light, and warm

## Instructions

### Structure and layout

1. `AiPage` uses a single-column, full-width layout — no sidebar. Max content width: `max-w-4xl mx-auto`. Page-level padding: `px-4` (mobile), `px-6` (tablet), `px-8` (desktop).
2. Sections separated by `gap-16` (64px). Internal section padding: `py-12` (mobile), `py-16` (desktop).
3. Hero section gets additional `pt-20` top padding to clear the header and create breathing room.
4. All section organisms go in `src/components/organisms/ai/` — create the `ai/` subdirectory.
5. The `TokenReferenceCard` molecule goes in `src/components/molecules/` alongside existing molecules.

### CopyButton atom

6. Two variants controlled by a `variant` prop: `"primary"` (accent background, white text, shows command text + Copy icon) and `"ghost"` (transparent background, `--foreground-muted` icon only).
7. Props: `value: string` (text to copy), `variant: "primary" | "ghost"`, `label?: string` (display text for primary variant, defaults to `value`).
8. On click: call `navigator.clipboard.writeText(value)`. On success: swap icon from `Copy` to `Check`, change label to "Copied!" (primary) or just swap icon (ghost). Revert after 2 seconds.
9. On clipboard failure (fallback): select the text in the nearest code block for manual copy. No toast or error UI.
10. Hover states: primary — slight brightness increase via CSS filter. Ghost — `--surface` background appears, icon brightens to `--foreground`.
11. Focus: 2px `--accent` outline with 2px offset for keyboard navigation.
12. Use Lucide React icons: `Copy` and `Check`.
13. Minimum touch target: 44×44px on all breakpoints.

### CodeBlock atom

14. Props: `code: string`, `language?: string`, `showCopy?: boolean` (default true).
15. Renders a `<pre>` block with `--surface` background, `font-mono text-sm`, `rounded-lg`, and `p-4`.
16. Ghost CopyButton positioned absolute in the top-right corner. Opacity 0.5 by default, 1 on parent hover.
17. Optional language label in top-left corner: `font-mono text-xs text-foreground-muted`.
18. Content overflows horizontally with `overflow-x-auto`. Never word-wrap code.

### HeroSection

19. Headline: "Built for AI-Native Development" — `font-display text-4xl font-bold` (mobile: `text-3xl`).
20. Value prop: one sentence below the headline — `font-body text-lg text-foreground-muted`.
    Suggested copy: "The first open-source design system with structured AI context files. Drop three files into your project and every AI assistant produces on-brand output."
21. Primary CopyButton below the value prop with the shadcn registry install command:
    `npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`
22. On mobile, the CopyButton sits below the CodeBlock containing the command, full-width.

### FileArchitectureSection

23. Section heading: "Three-File Architecture" — `font-display text-2xl font-semibold`.
24. Three shadcn Card components in a row (desktop) or stacked (mobile). Each card:
    - File name heading: `font-mono text-base font-medium` (e.g., "CLAUDE.md")
    - Role label: `font-display text-sm` (e.g., "Coding Rules")
    - Description: `font-body text-sm text-foreground-muted` (2-3 sentences on what the file provides)
    - Card background: `--card`. Hover: subtle border colour shift to `--accent-subtle`.
25. Card content for each file:
    - **CLAUDE.md** — "Coding Rules" — Project stack, code conventions, architecture rules, common mistakes. Loaded automatically by Claude Code on session start.
    - **DESIGN.md** — "Design Philosophy" — Visual principles, colour system rationale, typography rules, spacing philosophy. The "taste" layer that guides aesthetic decisions.
    - **DESIGN_SYSTEM.md** — "Token Inventory" — Complete reference of CSS custom properties, component inventory, variant specifications. The machine-readable specification.

### QuickStartSection

26. Section heading: "Quick Start" — `font-display text-2xl font-semibold`.
27. Three install paths, each with a heading, brief description, and CodeBlock:
    - **shadcn Registry** (recommended): `npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`
    - **Git Clone**: `git clone https://github.com/mmorerasanchez/democrito.git`
    - **Manual Download**: "Download CLAUDE.md + DESIGN.md from the repo and drop into your project root."
28. Each CodeBlock has `showCopy={true}`. Manual download path shows the GitHub repo URL in a CodeBlock.

### ComparisonSection

29. Section heading: "How It Works" — `font-display text-2xl font-semibold`.
30. Two panels side-by-side on desktop (equal width), stacked on mobile with a 1px `--border` divider between them.
31. Each panel has a label: `font-display text-sm font-medium uppercase tracking-wide` — "Without democrito context" and "With democrito context".
32. **"Without" panel** — generic React code snippet using inline styles, no design tokens, inconsistent spacing, hardcoded hex colours. Example:
    ```tsx
    // Generic button — no design system context
    <button style={{ background: '#3b82f6', padding: '8px 16px', borderRadius: '4px', color: 'white', fontSize: '14px' }}>
      Submit
    </button>
    ```
33. **"With" panel** — democrito-compliant code snippet using tokens, correct font classes, proper shadcn/ui usage. Example:
    ```tsx
    // democrito-aware — tokens, typography, atomic design
    <Button variant="default" className="bg-accent text-accent-foreground font-display">
      Submit
    </Button>
    ```
34. Code snippets use `font-mono` inside CodeBlock. Keep examples short (5-8 lines each) and visually obvious in the difference.

### TokenReferenceCard

35. Section heading: "Token Quick Reference" — `font-display text-2xl font-semibold`.
36. A single Card (`--card` background) containing a grid of token groups.
37. Desktop: 4-column grid. Tablet: 2-column. Mobile: single column with collapsible sections (first expanded, others collapsed).
38. Token groups:
    - **Surfaces**: `--background`, `--surface`, `--card` — show name + brief description
    - **Text**: `--foreground`, `--foreground-muted`, `--foreground-subtle`
    - **Accent**: `--accent`, `--accent-muted`, `--accent-subtle`
    - **Fonts**: `font-display`, `font-body`, `font-mono` — show font name + usage
39. All token names in `font-mono text-sm`. Descriptions in `font-body text-xs text-foreground-muted`.
40. Mobile collapse uses `aria-expanded` and `aria-controls` for accessibility.

### EcosystemSection

41. Section heading: "Ecosystem" — `font-display text-2xl font-semibold`.
42. Grid of ecosystem items. Each item: name, brief description, status Tag, and link (if live).
43. Items:
    - **shadcn Registry** — Status: "Live" (`--success` Tag) — Link: registry.json URL
    - **Claude Skill** — Status: "Coming soon" (`--foreground-muted` Tag) — No link
    - **llms.txt** — Status: "Live" (if already created) or "Coming soon" — Link: /llms.txt
    - **robots.txt** — Status: "Live" (if already created) or "Coming soon" — Link: /robots.txt
    - **npm Package** — Status: "Coming soon" — No link
44. Use existing Tag atom for status indicators. Live items have clickable links in `font-mono`.

### Theme compliance

45. All surfaces must follow the three-surface hierarchy: `--background` → `--surface` → `--card`. Code blocks use `--surface`. Architecture cards use `--card`.
46. Only one accent-coloured element per visible section (the primary CopyButton in the hero; all other interactive elements use ghost or outline variants).
47. Verify all three themes manually after implementation — pay special attention to warm theme where accent terracotta may blend with warm surface tones.

### Responsive behaviour

48. All breakpoints follow Tailwind config: `sm: 480px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`.
49. Comparison section: side-by-side on `md` and above, stacked with divider below `md`.
50. Token reference: 4-column on `lg`, 2-column on `md`, collapsible single column below `md`.
51. All CopyButtons and interactive elements minimum 44×44px touch target on mobile.
52. Code blocks: always horizontal scroll, never word-wrap.

### Accessibility

53. CopyButton: `aria-label="Copy [description] to clipboard"`. After copy: `aria-live="polite"` announcement "Copied to clipboard".
54. CodeBlock: `role="code"` on the `<pre>` element.
55. Comparison panels: `aria-label="AI output without democrito context"` and `aria-label="AI output with democrito context"`.
56. Collapsible token sections (mobile): `aria-expanded`, `aria-controls`.
57. Focus order: Hero CopyButton → Quick Start CopyButtons → Token Reference toggles (mobile) → Ecosystem links.
58. All text must pass 4.5:1 contrast against its background in all three themes.

## Data Model

No backend data model — static content. Local UI state only:

```typescript
// CopyButton internal state
type CopyState = 'idle' | 'copied'

// TokenReferenceCard collapse state (mobile only)
type TokenSectionState = {
  surfaces: boolean  // true = expanded
  text: boolean
  accent: boolean
  fonts: boolean
}
```

## Constraints

- DO NOT use `any` type — use strict TypeScript throughout
- DO NOT hardcode colours — use CSS custom properties via Tailwind classes (`bg-surface`, `text-foreground`, etc.)
- DO NOT import fonts directly — use `font-display`, `font-body`, `font-mono` utility classes only
- DO NOT use `font-body` for code, commands, file paths, or token names — use `font-mono`
- DO NOT use `--card` for CodeBlock backgrounds — use `--surface` (code blocks are content, not elevated cards)
- DO NOT make multiple elements accent-coloured in the same viewport section
- DO NOT word-wrap code in CodeBlocks — use horizontal scroll
- DO NOT add a sidebar, breadcrumbs, or navigation beyond the global header
- DO NOT implement the Knowledge Packs section — that is v2, after the storefront is live
- DO NOT install new dependencies for copy-to-clipboard — use `navigator.clipboard.writeText()` with fallback
- DO NOT create a separate CSS file — use Tailwind utility classes referencing existing tokens
- DO NOT modify existing components (atoms, molecules, organisms) — create new ones
- If any requirement is unclear, ask before writing code

## Definition of Done

- [ ] `/ai` route is registered and navigable from the browser
- [ ] All six sections render with correct content and hierarchy
- [ ] CopyButton copies to clipboard and shows 2-second "Copied!" confirmation in both variants
- [ ] CodeBlock renders with `--surface` background, `font-mono`, and ghost CopyButton overlay
- [ ] Three-file architecture cards use `--card` background with hover border effect
- [ ] Comparison section shows side-by-side (desktop) and stacked (mobile) layout
- [ ] Token reference shows 4-column (desktop) and collapsible (mobile) layouts
- [ ] Ecosystem section shows correct status for each item (live vs. coming soon)
- [ ] All three themes (dark, light, warm) render correctly — surfaces, text, accent all readable
- [ ] No TypeScript errors on build (`npm run build` passes)
- [ ] Responsive at 375px (mobile) and 1280px (desktop) — all touch targets ≥ 44×44px
- [ ] All accessibility requirements met: aria-labels, focus order, contrast ratios
- [ ] No `any` types, no hardcoded colours, no inline styles for design tokens

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e815494d1ec5a329619d8
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
