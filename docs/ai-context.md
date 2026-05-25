# AI Context — How to Read This Design System

This document is the entry point for any AI agent, language model, or vibe-coding tool
working with the democrito design system. Read it before touching any component, token, or layout.

## What democrito is

An atomic design system for AI-native, data-dense applications. It is:
- **IDE-inspired**: distraction-free, information-dense, no decorative elements
- **Dark-first**: the dark theme is the primary design target; light and warm themes are supported
- **Monochromatic + accent**: 95% neutral surfaces, one accent hue (terracotta), semantic colors for status only
- **Composable**: everything is built atoms → molecules → organisms → templates. Never skip levels.

## Reading order for a new task

**Step 1 — Identify the template**
Before placing any component, select the appropriate template from `docs/components/templates.md`.
The template defines all regions (header, sidebar, content area, footer).
Do not invent new page structures.

**Step 2 — Place organisms into regions**
Use the component inventory (`docs/components/`) to identify which organisms belong in each
template region. Read the organism's do/don't rules before placing.

**Step 3 — Compose organisms from molecules and atoms**
Molecules are composed of atoms. Organisms are composed of molecules.
Never place an organism inside another organism.

**Step 4 — Apply tokens**
- Colors: CSS custom properties only. Never hardcode hex values.
- Typography: `font-display` for titles and button labels, `font-body` for prose and descriptions,
  `font-mono` for ALL user-editable content, data values, and code
- Spacing: use the spacing scale from `docs/tokens.md` — check pattern-level spacing rules
  in `docs/patterns/` for specific element-to-element distances

**Step 5 — Apply content rules**
All copy follows `docs/content-guidelines.md`. Sentence case. Action verbs. No decorative language.

**Step 6 — Verify constraints**
Before finalizing: check do/don't rules for every component used.
Check antipatterns in relevant pattern docs.

## Known AI bias patterns — explicitly suppressed

These are recurring mistakes AI tools make when working with this system:

| Bias | Correct behavior |
|------|-----------------|
| Adding gradient backgrounds | Not in this system. Use --background, --surface, or --card only |
| Using --accent for status indicators | Accent is brand only. Use --color-success, --color-warning, --color-error, --color-info |
| Placing two primary buttons on one view | One primary button per view maximum |
| Using font-body for editable inputs | All user-editable content uses font-mono |
| Creating disabled states with per-token colors | Use CSS `opacity: 0.4` + `filter: saturate(0)` at container level |
| Generating title case copy | Sentence case always, everywhere |
| Inventing new accent hues | One accent color. Terracotta. No exceptions without a design decision. |
| Creating component-scoped tokens | democrito uses semantic tokens only (--accent, not --button-accent-bg) |

## Flexibility rules

- Use existing tokens before creating new ones. If no token fits, flag it — don't invent.
- Use existing components before creating new ones. 90% of any interface should be assembled from the existing inventory.
- New layout structures require a design decision. Do not create page structures not in `docs/components/templates.md`.
- The warm theme is a differentiator — preserve its Sanzo Wada earth-tone palette when generating warm-theme content.
