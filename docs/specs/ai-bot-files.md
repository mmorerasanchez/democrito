# AI Bot Strategy Files — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.0
> - Status: Ready
> - Source SDD: SEO-GEO-PLAN.md (CR-4, CR-5)
> - Prompt chain: standalone
> - Created: 2026-04-17

## Role

Act as a senior developer implementing AI discoverability infrastructure
for an open-source design system. You understand robots.txt conventions,
the emerging llms.txt standard, and how AI agents discover and consume
project documentation.

## Context

democrito is an AI-ready design system — it already has CLAUDE.md (coding
rules), DESIGN.md (visual philosophy), and DESIGN_SYSTEM.md (token
inventory). But it lacks the public-facing machine-readable files that
help AI crawlers and agents discover the project: robots.txt for
traditional crawlers, and llms.txt / llms-full.txt for LLM agents.

## Codebase Orientation

- Public static files: @public/ (served as-is by Vite)
- AI context files already in repo: @CLAUDE.md, @DESIGN.md, @src/DESIGN_SYSTEM.md
- Docs hub: @docs/ (architecture, tokens, theming, components, etc.)
- Install command: `npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito`
- Git clone: `git clone https://github.com/mmorerasanchez/democrito.git`

## Task

Create three files in `public/`: robots.txt, llms.txt, and llms-full.txt.

## Steps

1. Create `public/robots.txt` — standard crawl permissions
2. Create `public/llms.txt` — concise project summary for LLM agents
3. Create `public/llms-full.txt` — expanded version with token reference
4. Verify files are served correctly via `npm run dev`

## Instructions

1. **robots.txt:**
   - Allow all user-agents
   - Reference sitemap: `Sitemap: https://democrito.design/sitemap.xml`
   - Note: sitemap.xml doesn't exist yet — the reference is forward-looking for Astro migration
   
2. **llms.txt** (concise, ~30 lines):
   - Project name and one-line description
   - URL: https://democrito.design
   - Repo: https://github.com/mmorerasanchez/democrito
   - Stack: React 18, TypeScript, Tailwind CSS 3.4, shadcn/ui, Vite
   - Install commands (shadcn registry + git clone)
   - Key files: CLAUDE.md, DESIGN.md, src/DESIGN_SYSTEM.md
   - Design principles summary (3-surface, 3-font, monochromatic + accent)
   - Three themes: Dark (default), Light, Warm
   
3. **llms-full.txt** (expanded, ~100 lines):
   - Everything from llms.txt
   - Full token quick reference (surfaces, text colors, accent variants, semantic colors)
   - Typography system detail (font-display, font-body, font-mono with font names)
   - Component inventory summary (7 atoms, 18 molecules, 15 organisms, 7 templates)
   - Spacing scale: 4px base, scale 4·8·12·16·24·32·48·64
   - Border radius tokens
   - Layout dimensions (header, sidebar, right panel)
   - Do's and Don'ts summary
   - Link to full docs: docs/tokens.md, docs/theming.md, docs/architecture.md

## Constraints

- DO NOT create a sitemap.xml — that's an Astro migration deliverable
- DO NOT modify existing AI context files (CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md)
- DO NOT include any private or internal-only information
- All token values must match `src/index.css` — verify before writing
- If any requirement is unclear, ask before writing code

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e81fa88daedea95b0e473
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
