# Metadata Infrastructure — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.0
> - Status: Ready
> - Source SDD: SEO-GEO-PLAN.md (CR-2)
> - Prompt chain: standalone
> - Created: 2026-04-17

## Role

Act as a senior frontend developer implementing SEO metadata and structured
data for a React + Vite SPA. You understand Open Graph protocol, Twitter Card
markup, JSON-LD structured data, and how to implement them in a client-side
rendered application.

## Context

democrito is a design system showcase with zero SEO infrastructure. No
`<meta>` tags beyond the basic viewport, no Open Graph, no Twitter Card,
no JSON-LD, no favicon. When shared on social media or indexed by search
engines, the site appears with generic defaults. This task adds the
foundation layer.

## Codebase Orientation

- HTML entry: @index.html
- React entry: @src/main.tsx
- Existing head management: none — raw `<head>` in index.html
- Design tokens for branding: @src/index.css (accent = `hsl(18 65% 55%)` terracotta)
- Social preview image: check if one exists in `public/`

## Task

Add comprehensive metadata, Open Graph tags, Twitter Card tags, JSON-LD
structured data, and favicon to the democrito showcase site.

## Steps

1. Add static `<meta>` tags to `index.html` `<head>`
2. Add Open Graph tags with democrito branding
3. Add Twitter Card tags (summary_large_image)
4. Add JSON-LD structured data (SoftwareApplication schema)
5. Add or verify favicon in `public/`
6. Test with a link preview validator

## Instructions

1. **Title:** `democrito — Atomic Design System for AI-Native Development`
2. **Description:** `Themeable atomic design system with warm industrial aesthetic, three-surface depth, and three-font semantic typography. Built for data-dense, IDE-inspired applications.`
3. **Open Graph tags:**
   - `og:title` — same as title
   - `og:description` — same as description
   - `og:type` — `website`
   - `og:url` — `https://democrito.design`
   - `og:image` — social preview image path (check public/ or use placeholder)
   - `og:site_name` — `democrito`
4. **Twitter Card:**
   - `twitter:card` — `summary_large_image`
   - `twitter:title`, `twitter:description`, `twitter:image` — same as OG
5. **JSON-LD** (in a `<script type="application/ld+json">` block):
   - `@type`: `SoftwareApplication`
   - `name`: `democrito`
   - `description`: same as meta description
   - `url`: `https://democrito.design`
   - `applicationCategory`: `DesignApplication`
   - `operatingSystem`: `Web`
   - `offers`: `{ "@type": "Offer", "price": "0", "priceCurrency": "USD" }`
6. **Favicon:** verify `public/favicon.ico` or `public/favicon.svg` exists. If not, flag for creation.
7. **Theme color:** `<meta name="theme-color" content="hsl(20, 14%, 4%)">`  (dark theme background)

## Constraints

- DO NOT install a head management library (react-helmet, etc.) — static tags in index.html are sufficient for a showcase site
- DO NOT add per-page dynamic metadata — that's an Astro migration concern
- DO NOT use the old lovable.app URL — use `democrito.design`
- If social preview image doesn't exist, add a TODO comment and flag it
- If any requirement is unclear, ask before writing code

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e8131acabe2258dc0ca40
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
