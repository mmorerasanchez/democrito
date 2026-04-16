# SDD — /ai Page

> **Meta**
> - Product: democrito
> - Feature: /ai page — AI agent integration showcase and sales page
> - Stage: Definition
> - Version: 1.0
> - Date: 2026-04-17
> - Status: Draft
> - Author: Mariano (Cowork)
> - Upstream docs: business-model-democrito.md, DESIGN.md, DESIGN_SYSTEM.md, SEO-GEO-PLAN.md
> - SDD consumer: Claude Code

---

## Context

**Business context:** democrito's monetization strategy identifies the /ai page as the most commercially important page on the site — it serves triple duty as AI discoverability hub (llms.txt target), developer education (how to use democrito with AI assistants), and sales conversion (free vs. paid knowledge pack comparison). The business model projects 3-5% conversion from sales page visitors, making this page's quality directly tied to revenue.

**Design context:** democrito is a design system showcase with a warm industrial aesthetic. The /ai page must use democrito's own components and tokens — it's a proof point that the system produces good-looking, information-dense pages. Three themes (dark, light, warm) must all work. The mono contract applies: all code snippets, install commands, file paths, and data values use `font-mono`.

**Technical context:** React 18 + Vite SPA with React Router. The page is a new route at `/ai` with no backend dependencies — pure static content rendered client-side. Will be migrated to Astro in a future phase (static page, no React islands needed).

**Research context:** The "AI-native design system" category barely exists. This page defines what that means for democrito and positions the project before competitors start shipping similar context files.

---

## Outcome

### Benefits

- Developers discover how to use democrito with AI coding assistants (Claude Code, Cursor, Windsurf) — reducing the barrier from "interesting repo" to "productive workflow"
- AI agents crawling the site find a structured summary of democrito's capabilities, install commands, and context files — improving discoverability in AI-first search
- Potential buyers of the Starter and Pro knowledge packs see the value difference between free context files and the full skill pipeline — driving conversion
- The page itself demonstrates democrito's component quality — a meta-proof point

### Objectives and milestones

| Milestone | Definition | Stage |
|-----------|-----------|-------|
| v1 — Info page | Static content page with all sections, three-theme compliant, no purchase flow | Execution |
| v2 — Sales page | Add pricing comparison, CTA buttons linking to storefront (Lemon Squeezy/Gumroad), testimonials section (empty initially) | Iteration |

---

## Success Metrics

| Metric | Event name | Measurement method | Target | Timeline |
|--------|-----------|-------------------|--------|----------|
| Page visits | `ai_page_view` | Analytics (Plausible) | 100 unique/month by M3 | M3 |
| Install command copies | `ai_install_copy` | Click event on copy buttons | 20% of page visitors | M6 |
| CTA click-through (v2) | `ai_cta_click` | Click event on purchase buttons | 5% of page visitors | M6 |
| Time on page | `ai_time_on_page` | Analytics | > 90 seconds average | M3 |

---

## Problem Statement and JTBD

### Problem statement

Developers who discover democrito on GitHub see a component library with good documentation, but they don't understand how to make it work *with* their AI coding assistant. The three context files (CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md) are in the repo but their purpose and value proposition aren't explained anywhere on the live site. There's no page that says "here's how to make Claude Code produce on-brand democrito output from your first prompt." This means developers either miss the AI integration entirely or spend time figuring it out through trial and error.

### Jobs to Be Done

- **When** I find a design system on GitHub and want to use it with Claude Code, **I want to** quickly understand what context files it provides and how to install them, **so I can** start getting on-brand AI output without reading the entire repo.

- **When** I'm evaluating design systems for a new project that will use AI-assisted development, **I want to** see concrete evidence that this system works well with AI agents, **so I can** choose a system that reduces my prompting overhead.

- **When** I'm already using democrito's free tier and want better AI output, **I want to** understand what the paid knowledge packs add beyond the free context files, **so I can** decide if the investment is worth it for my workflow.

---

## Pages and Workflows

### Route: `/ai`

**Layout:** Full-width content page using democrito's existing page layout pattern. No sidebar needed — this is a marketing/education page, not a dashboard.

**Sections (top to bottom):**

1. **Hero** — "Built for AI-Native Development" headline. One-sentence value prop. Primary CTA: install command (copy-to-clipboard).
2. **Three-File Architecture** — Visual explanation of CLAUDE.md (coding rules), DESIGN.md (design philosophy), DESIGN_SYSTEM.md (token inventory). What each file does, how they complement each other.
3. **Quick Start** — Three install paths with copy-pasteable commands:
   - shadcn registry: `npx shadcn@latest add ...`
   - Git clone: `git clone ...`
   - Manual: download CLAUDE.md + DESIGN.md
4. **How It Works** — Side-by-side comparison: "Without democrito context" vs. "With democrito context" showing AI output quality difference. Use realistic code snippets.
5. **Token Quick Reference** — Compact reference card with surface tokens, text tokens, accent tokens, font tokens. Copy-pasteable.
6. **Ecosystem** — Claude Skill status, shadcn registry status, llms.txt, robots.txt. Links to each.
7. **Knowledge Packs** (v2) — Starter vs. Pro comparison table. CTAs to storefront. Initially hidden or placeholder.

---

## Functional Specs (BDD)

### Feature: AI page content display

> As a developer visiting democrito.design, I want a dedicated /ai page
> that explains the AI integration story so I can quickly adopt the system
> with my AI coding assistant.

**Scenario: Happy path — page loads with all sections**
```
Given I navigate to /ai
When the page loads
Then I see the hero section with headline and install command
And I see the three-file architecture explanation
And I see the quick start section with three install paths
And I see the "How It Works" comparison
And I see the token quick reference card
And I see the ecosystem status section
And all sections use democrito design tokens
And all code snippets use font-mono
```

**Scenario: Copy-to-clipboard interaction**
```
Given I am on the /ai page
When I click the copy button next to an install command
Then the command is copied to my clipboard
And the button shows a brief "Copied!" confirmation
And the confirmation reverts after 2 seconds
```

**Scenario: Theme compliance**
```
Given I am on the /ai page
When I switch between dark, light, and warm themes
Then all sections render correctly in each theme
And surfaces follow the three-surface hierarchy
And text colors maintain readable contrast ratios
And accent color (terracotta) is used for CTAs only
```

**Scenario: Empty state — ecosystem section**
```
Given the Claude Skill is not yet published
When I view the ecosystem section
Then I see "Coming soon" for the Claude Skill status
And I see active links for items that are live (registry, llms.txt)
```

**Scenario: Responsive behavior**
```
Given I am on the /ai page on a mobile device (375px)
When I view the page
Then the layout stacks to single column
And the "How It Works" comparison stacks vertically
And code blocks scroll horizontally if needed
And touch targets are at least 44×44px
```

---

## User Stories

**US-1:** As a developer, I want to copy democrito's install command from the /ai page, so that I can add it to my project in one step.
- AC: Copy button works for all three install paths
- AC: Copied text is the exact command (no extra whitespace or formatting)

**US-2:** As a developer evaluating design systems, I want to see a concrete before/after comparison of AI output with and without democrito context, so that I can understand the value proposition.
- AC: Comparison shows realistic code snippets
- AC: "Without" example shows generic, off-brand output
- AC: "With" example shows on-brand output using democrito tokens

**US-3:** As a developer already using democrito, I want to see all AI integration touchpoints in one place, so that I know what's available and what's coming.
- AC: Ecosystem section lists all AI assets with status (live/coming soon)
- AC: Each item links to its resource

### Out of scope

- Purchase flow (v2 — after storefront is set up)
- Interactive demos (try democrito in-browser)
- User accounts or personalization
- Analytics dashboard for AI usage

---

## Technical Spec

### Component structure

| Component | Level | New/Existing | Purpose |
|-----------|-------|-------------|---------|
| `AiPage` | Page | New | Route component at `/ai` |
| `HeroSection` | Organism | New | Hero with headline, value prop, install CTA |
| `FileArchitectureSection` | Organism | New | Three-file visual explanation |
| `QuickStartSection` | Organism | New | Three install paths with copy buttons |
| `ComparisonSection` | Organism | New | Before/after AI output comparison |
| `TokenReferenceCard` | Molecule | New | Compact token quick reference |
| `EcosystemSection` | Organism | New | Status grid for AI assets |
| `CopyButton` | Atom | Existing or new | Copy-to-clipboard with confirmation |
| `CodeBlock` | Atom | Existing | Syntax-highlighted code display |

### Data model

No data model — static content. All text lives in the component files.
No API calls. No state management beyond local UI state (copy confirmation).

### Solution architecture

- New route: add `/ai` to React Router config
- New page component: `src/pages/AiPage.tsx`
- New section components: `src/components/organisms/ai/` directory
- Token reference data: hardcoded object in component (not fetched)
- Copy-to-clipboard: `navigator.clipboard.writeText()` with fallback

### AI agent context

```
Stack context:
- Frontend: React 18 + TypeScript strict + Tailwind + shadcn/ui
- Build: Vite 5
- Design: democrito tokens in src/index.css, mapped in tailwind.config.ts
- Tests: Vitest

Existing patterns to follow:
- Page components: @src/pages/ (look at existing pages for route setup)
- Organisms: @src/components/organisms/ (follow existing structure)
- Code display: check if a CodeBlock component exists in atoms/
- Design tokens: @src/index.css (verify all token references)

Do not:
- Use `any` type
- Hardcode colors — use CSS variables
- Import fonts directly — use font-display, font-body, font-mono classes
- Create more than one accent-colored CTA per screen section
```

---

## Dependencies

| Dependency | Type | Status |
|-----------|------|--------|
| Three-theme token system | Design | Available (src/index.css) |
| React Router | Technical | Available (existing setup) |
| Copy-to-clipboard API | Technical | Browser native, no dependency needed |
| Storefront (Lemon Squeezy/Gumroad) | External | Not yet set up — v2 blocker |

---

## Ready to Feed

```
Ready to feed:
- dev-prompt-engineer: All sections ready — Context, Outcome, Functional specs, Technical spec, Component structure
- qa-prompt-engineer: BDD scenarios testable — theme compliance, copy interaction, responsive
- design-writer: Behaviour Spec needed for responsive layout, comparison section interaction, token card layout
```
