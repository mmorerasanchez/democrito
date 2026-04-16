# democrito.design — SEO/GEO Implementation Plan

**Status:** Draft  
**Version:** 1.0  
**Last Updated:** 2026-04-16  
**Owner:** Mariano  
**Canonical Domain:** democrito.design

---

## Executive Summary

This document outlines a 4-phase SEO/GEO implementation strategy for democrito.design, a design system showcase website currently hosted on Lovable as a client-side rendered React SPA. The plan aims to:

1. **Migrate** from Vite/React SPA to a framework with server-side rendering (SSR) and static site generation (SSG) capabilities
2. **Implement** structured data, semantic HTML, and metadata management across all public showcase pages
3. **Establish** agent declaration files (robots.txt, llms.txt, .well-known/mcp.json) following a 3-tier AI bot strategy
4. **Optimize** for search visibility, AI discoverability, and long-tail programmatic content

The implementation follows patterns proven in the prompt-x web project, adapted for democrito's dual nature: mostly static design system content (/, /tokens, /atoms, /molecules, /organisms, /templates, /pages) with protected interactive prototype routes (/app/*).

### Key Decision: Astro + React Islands

**Technology Choice: Astro 5.x with React islands**

After evaluating Next.js 15 vs Astro:

| Criterion | Astro 5 | Next.js 15 |
|-----------|---------|-----------|
| Static-first architecture | Ideal (default) | Secondary (SSG layer) |
| SEO/SSR by default | Yes | Yes |
| Partial hydration (islands) | Native support | Requires App Router complications |
| Design system showcase use case | Perfect fit | Overengineered |
| Interactive prototype components | React islands handle this | Natural fit |
| Ecosystem familiarity | New learning curve | Team experience with prompt-x |
| Build output size | Minimal (static focus) | Larger |
| **Recommendation** | **CHOSEN** | Fallback option |

**Rationale:** Astro's island architecture is purpose-built for sites that are mostly static (design system showcase) with strategic interactive components (React islands for the playground, component previews). This eliminates unnecessary JavaScript shipping, improves Core Web Vitals, and provides superior DX for content-heavy documentation sites. The learning curve is outweighed by the architectural fit.

---

## Current State Analysis

### Existing Architecture
- **Framework:** Vite + React 18.3 + React Router 6.30
- **Hosting:** Lovable (democrito-design-system.lovable.app)
- **Rendering:** Client-side SPA (CSR) — poor SEO by default
- **Routing:**
  - Public showcase: `/`, `/tokens`, `/atoms`, `/molecules`, `/organisms`, `/templates`, `/pages`
  - Protected app routes: `/app/*` (Dashboard, Library, AI Designer, Settings, etc.) behind ProtectedGate
  - Test routes: `/test/tokens`

### Current Meta Setup (index.html)
- Minimal OG tags (og:title, og:description, og:image)
- Twitter card metadata
- No structured data (no JSON-LD)
- No canonical URL
- No dynamic metadata per page
- robots.txt allows all bots (no AI bot strategy)

### Content Assets
- Design system documentation: `src/DESIGN_SYSTEM.md` (27.4 KB)
- 7 showcase pages with ~5-15 components each
- No blog, changelog, or dynamic content
- No programmatic content generation

---

## Implementation Phases

### Phase 1: Foundation (8 weeks)

**Goal:** Establish SSR/SSG framework, structured data infrastructure, and agent declaration files. Move from Lovable to Claude Code as primary development environment.

#### CR-1: Framework Migration — Vite+React → Astro 5

**Type:** Infrastructure  
**Priority:** P0 Critical  
**Dependencies:** None  
**Effort:** 40 hours

**Scope:**
- Initialize Astro 5 project with TypeScript
- Install Astro integrations: React (for islands), TailwindCSS, shadcn/ui integration
- Migrate public routes to Astro pages (7 showcase routes)
- Keep /app/* routes in a separate React app or use Astro's hybrid rendering mode
- Set up build output to generate static HTML for showcase, SSR endpoint for /app/*
- Configure import aliases (@/ → src/)
- Migrate existing CSS/Tailwind config
- Update package.json scripts for Astro (dev, build, preview, type-check)
- Preserve existing React components and hooks (convert ShowcaseLayout, pages to Astro layout)
- Update environment variables and deployment config

**Deliverables:**
- Astro config (astro.config.mjs) with React integration
- Root layout (src/layouts/RootLayout.astro)
- 7 showcase pages in src/pages/ (/, /tokens.astro, /atoms.astro, etc.)
- Build verification (static HTML output with proper routing)
- Local dev server running on localhost:3000

---

#### CR-2: Structured Data & Metadata Infrastructure

**Type:** Feature  
**Priority:** P0 Critical  
**Dependencies:** CR-1  
**Effort:** 20 hours

**Scope:**
- Create `src/lib/schema.ts` — TypeScript helpers for JSON-LD schema generation
  - `organizationSchema()` — democrito organization with contact/social
  - `softwareApplicationSchema()` — design system as SoftwareApplication
  - `breadcrumbSchema()` — for navigation hierarchy
  - `webPageSchema()` — base page metadata
  - `collectionSchema()` — for token/component library pages
- Create `src/lib/metadata.ts` — Astro-compatible metadata helper
  - `generateMetadata()` — per-page OG, Twitter, canonical URL
  - `pageTitle()` — title template with suffix
  - Image management (OG image per page type)
- Create `src/components/SchemaScript.astro` — JSON-LD renderer
- Create `src/components/MetaHead.astro` — reusable head metadata component
- Update RootLayout to include SchemaScript + MetaHead
- Document metadata patterns in CLAUDE.md for page authors

**Metadata Standards:**
- Title template: `{pageTitle} · democrito`
- Description per page (50–160 chars)
- Canonical URL: `https://democrito.design{pathname}`
- OG image: 1200×630px (generate per page or use default)
- Twitter card: summary_large_image
- lang attribute: en

**Deliverables:**
- src/lib/schema.ts (300 lines)
- src/lib/metadata.ts (250 lines)
- src/components/SchemaScript.astro
- src/components/MetaHead.astro
- Metadata documentation in CLAUDE.md

---

#### CR-3: Dynamic Domain & Environment Setup

**Type:** Config  
**Priority:** P0 Critical  
**Dependencies:** CR-1  
**Effort:** 8 hours

**Scope:**
- Register democrito.design domain (or confirm ownership if already registered)
- Set up DNS records (A, AAAA, CNAME for www subdomain)
- Configure domain routing to production hosting (Vercel or Netlify)
- Set environment variables:
  - `VITE_SITE_URL=https://democrito.design` (development: http://localhost:3000)
  - `VITE_ORG_NAME=democrito`
  - `VITE_BRAND_COLOR=#000000` (adjust to brand)
  - OG image path
- Verify canonical URL generation uses democrito.design
- Set up 301 redirects from democrito-design-system.lovable.app → democrito.design

**Deliverables:**
- .env.production with democrito.design configuration
- DNS records documented
- Vercel/Netlify project configured with domain
- 301 redirect rule verified

---

#### CR-4: AI Bot Declaration Files (3-Tier Strategy)

**Type:** Config  
**Priority:** P0 Critical  
**Dependencies:** CR-1, CR-3  
**Effort:** 12 hours

**Scope:**

Create three declaration files at site root:

1. **robots.txt** (3-tier AI bot strategy)
   ```
   # Tier 1: Search crawlers — allow
   User-agent: Googlebot
   Allow: /
   Allow: /robots.txt
   Allow: /sitemap.xml
   Allow: /.well-known/
   
   User-agent: Bingbot
   Allow: /
   
   # Tier 2: AI training bots — disallow
   # (OpenAI, Anthropic, etc. web crawlers that train models)
   User-agent: GPTBot
   User-agent: CCBot
   User-agent: anthropic-ai
   Disallow: /
   
   # Tier 3: User-initiated AI agents — allow
   # (Claude with code interpreter, Claude in browser, etc.)
   User-agent: Claude
   Allow: /
   Allow: /robots.txt
   Allow: /sitemap.xml
   Allow: /.well-known/
   
   # Default — allow search, disallow most bots
   User-agent: *
   Allow: /
   Disallow: /admin/
   Disallow: /app/
   Crawl-delay: 1
   Request-rate: 1/10
   
   Sitemap: https://democrito.design/sitemap.xml
   ```

2. **llms.txt** (LLM-readable site description)
   - Location: /public/llms.txt
   - Purpose: Provides LLMs with structured information about the site
   - Content:
     ```
     Site: democrito.design
     Description: democrito is an atomic design system for AI products.
     
     ## Design System Showcase
     - Overview: https://democrito.design/
     - Design Tokens: https://democrito.design/tokens
     - Atomic Components: https://democrito.design/atoms
     - Molecules: https://democrito.design/molecules
     - Organisms: https://democrito.design/organisms
     - Page Templates: https://democrito.design/templates
     - Page Examples: https://democrito.design/pages
     
     ## About
     - Repository: [link to GitHub if public]
     - Documentation: See /DESIGN_SYSTEM.md in repo
     - Contact: [contact info]
     
     ## Usage Guidelines
     - This design system is available as an npm package (@democrito/design-system)
     - Component showcase is public, preview-only
     - Prototype app (/app/*) requires authentication
     ```

3. **.well-known/mcp.json** (MCP server manifest)
   - Location: /public/.well-known/mcp.json
   - Purpose: Declares MCP-compatible endpoints if relevant (future integration)
   - Content (initial):
     ```json
     {
       "mcpServers": {
         "democrito-design": {
           "url": "https://democrito.design/.well-known/mcp",
           "protocol": "stdio",
           "description": "democrito design system component API"
         }
       }
     }
     ```

**Deliverables:**
- /public/robots.txt (3-tier bot strategy)
- /public/llms.txt (LLM-readable description)
- /public/.well-known/mcp.json (manifest)
- Documentation of bot strategy in CLAUDE.md

---

#### CR-5: Dynamic Sitemap.xml

**Type:** Feature  
**Priority:** P1 High  
**Dependencies:** CR-1  
**Effort:** 10 hours

**Scope:**
- Create `src/pages/sitemap.xml.ts` — dynamic sitemap generator
  - Include all 7 showcase routes with last-modified dates
  - Set priority: homepage (1.0), tokens/atoms/molecules/organisms (0.9), templates/pages (0.8)
  - Exclude /app/*, /test/*, and protected routes
  - Generate lastmod from file modification time or Git commit date
- Verify sitemap.xml is referenced in robots.txt
- Set up sitemap submission to Google Search Console
- Test sitemap validity with XML validator

**Deliverables:**
- src/pages/sitemap.xml.ts
- robots.txt reference to sitemap
- GSC submission confirmation

---

#### CR-6: Core Web Vitals & Security Headers

**Type:** Config  
**Priority:** P1 High  
**Dependencies:** CR-1  
**Effort:** 10 hours

**Scope:**
- Create Astro middleware or Vercel middleware for security headers:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`
- Configure Astro image optimization (astro:assets with sharp)
- Set up lazy-loading for images
- Enable Gzip/Brotli compression in build config
- Document Lighthouse performance targets (Core Web Vitals)
  - LCP < 2.5s
  - FID < 100ms
  - CLS < 0.1
- Configure Sentry for error monitoring (optional for Phase 1)

**Deliverables:**
- Security headers configured in Vercel/Netlify deployment
- Image optimization enabled and tested
- Lighthouse CI integrated (GitHub Actions)

---

**Phase 1 Deliverables Summary:**
- Astro 5 project fully migrated from Vite/React SPA
- Structured data infrastructure (JSON-LD helpers, metadata management)
- 3-tier AI bot declaration files (robots.txt, llms.txt, .well-known/mcp.json)
- Dynamic sitemap.xml
- democrito.design domain live with proper canonical URLs
- Security headers and Core Web Vitals baseline
- Project deployable to Vercel/Netlify with static + SSR hybrid output

---

### Phase 2: Content & Semantic HTML (6 weeks)

**Goal:** Optimize showcase pages for search and AI discoverability with semantic HTML, GEO content standards, and per-page structured data.

#### CR-7: GEO Content Writing Standards

**Type:** Content  
**Priority:** P0 Critical  
**Dependencies:** CR-2  
**Effort:** 8 hours

**Scope:**
- Author `docs/GEO-STANDARDS.md` — guide for writing SEO/GEO-optimized content for democrito
  - **Heading hierarchy:** H1 per page (not multiple), H2 for major sections, H3 for details
  - **Semantic elements:** Use `<article>`, `<section>`, `<nav>`, `<aside>` appropriately
  - **Keyword targeting:** Design system terms (tokens, atomic design, components, etc.)
    - Primary keyword: "design system"
    - Secondary keywords: "component library", "design tokens", "atomic design", "React components"
    - Long-tail: "accessible design system", "Tailwind design tokens", "shadcn alternative"
  - **Citation optimization:** When referencing methodologies or standards (e.g., Brad Frost's atomic design), include citations for AI training credit
  - **Internal linking:** Cluster pages by component hierarchy (tokens → atoms → molecules → organisms)
  - **Schema matching:** Match page content to schema type (CollectionPage for /tokens, ComponentPage for individual showcases)
  - **Length guidelines:** Showcase pages 1,500–3,000 words (balance readability with crawlability)
  - **Code examples:** Include copy-paste ready component code with syntax highlighting

**Deliverables:**
- docs/GEO-STANDARDS.md (comprehensive guide)
- Checklist template for content authors
- Examples of well-optimized pages

---

#### CR-8: Homepage Redesign (Semantic HTML + Structured Data)

**Type:** Content  
**Priority:** P0 Critical  
**Dependencies:** CR-2, CR-7  
**Effort:** 16 hours

**Scope:**
- Redesign `/` (OverviewPage) with semantic HTML structure
  - H1: "democrito — Atomic Design System for AI Products"
  - `<main role="main">` wrapper
  - Sections:
    1. Hero/intro (why democrito exists)
    2. Key features (atomic design, accessibility, design tokens)
    3. Navigation to showcase sections (tokens → atoms → molecules → organisms → templates → pages)
    4. Use case examples (e.g., "Build AI product UIs faster")
    5. Getting started (npm install, link to GitHub)
  - Add Organization JSON-LD (company info, contact, social)
  - Add SoftwareApplication JSON-LD (description, operatingSystem, applicationCategory: "DesignLibrary")
  - Add breadcrumbList JSON-LD (home level)
  - Optimize meta description (155 chars): "democrito is an atomic design system for AI products. Pre-built components, design tokens, and templates for React."
  - OG image: custom branded 1200×630px hero
  - Internal links to /tokens, /atoms, etc. with anchor text

**Deliverables:**
- Updated OverviewPage.astro with semantic structure
- Homepage JSON-LD schemas
- Meta tags (description, OG, Twitter)
- Homepage OG image (1200×630px)

---

#### CR-9: Design Tokens Page Optimization (/tokens)

**Type:** Content  
**Priority:** P0 Critical  
**Dependencies:** CR-2, CR-7  
**Effort:** 12 hours

**Scope:**
- Restructure `/tokens` (TokensPage) for SEO
  - H1: "Design Tokens — democrito Design System"
  - Semantic sections:
    1. What are design tokens? (definition, benefits, AI citation if inspired by systems)
    2. Token categories (colors, spacing, typography, shadows, border-radius)
    3. Live token showcase (interactive component — React island)
    4. Usage examples (code snippets: CSS variables, Tailwind utilities)
    5. Integration guide (how to use in your project)
  - Add CollectionPage JSON-LD (lists all token categories)
  - Add BreadcrumbList JSON-LD (home > tokens)
  - OG image: design tokens visualization (1200×630px)
  - Meta description (155 chars): "Design tokens for democrito design system. Colors, spacing, typography, shadows, and more. Ready-to-use CSS variables and Tailwind utilities."

**Deliverables:**
- Restructured TokensPage.astro with semantic sections
- Token CollectionPage JSON-LD
- Token visualization OG image
- Meta tags optimized

---

#### CR-10: Atomic Components Pages (Atoms, Molecules, Organisms)

**Type:** Content  
**Priority:** P0 Critical  
**Dependencies:** CR-2, CR-7  
**Effort:** 20 hours (atoms 8h + molecules 8h + organisms 4h due to existing complexity)

**Scope:**

For each of `/atoms`, `/molecules`, `/organisms`:
- Restructure with consistent semantic HTML
- H1 per page (e.g., "Atomic Components — democrito Design System")
- Semantic sections:
  1. Level definition (atoms are basic, molecules combine atoms, etc.)
  2. Component showcase (interactive React islands for live preview)
  3. Code examples (copy-paste ready)
  4. Accessibility notes (ARIA, keyboard navigation)
  5. Related components (internal links to atoms → molecules → organisms chain)
- Add ComponentCollection JSON-LD for each level
- Add BreadcrumbList JSON-LD (home > atoms/molecules/organisms)
- OG image: level-specific visual (1200×630px)
- Meta descriptions optimized (155 chars each)

**Page-Specific Metadata:**
| Page | H1 | Primary Keyword | Meta Description |
|------|----|----|---|
| /atoms | "Basic Components (Atoms) — democrito" | "atomic design atoms" | "Basic UI components: buttons, inputs, badges, and more. Fundamental building blocks for democrito design system." |
| /molecules | "Component Combinations (Molecules) — democrito" | "design system molecules" | "Combined atomic components: search bars, form groups, card layouts. Pre-built component patterns for AI products." |
| /organisms | "Complex UI Patterns (Organisms) — democrito" | "design system organisms" | "Complete UI sections: navigation, headers, sidebars, modals. Full-page and section-level component patterns." |

**Deliverables:**
- Restructured AtomsPage.astro, MoleculesPage.astro, OrganismsPage.astro
- JSON-LD schemas for each level
- Internal linking strategy implemented
- OG images for each (3 images)

---

#### CR-11: Templates & Pages Examples

**Type:** Content  
**Priority:** P1 High  
**Dependencies:** CR-2, CR-7  
**Effort:** 12 hours

**Scope:**
- Restructure `/templates` (TemplatesPage) — pre-built page layouts
  - H1: "Page Templates — democrito Design System"
  - Section: "Pre-built layouts for common AI product UIs"
  - List templates with live previews (React islands)
  - Use cases for each template (dashboard layout, form page, etc.)
  - Add CollectionPage JSON-LD
  - OG image: template showcase grid (1200×630px)
- Restructure `/pages` (PagesPage) — full page examples
  - H1: "Page Examples — democrito Design System"
  - Section: "Real-world page examples built with democrito"
  - List examples with descriptions
  - Internal links to relevant organisms/molecules
  - Add CollectionPage JSON-LD
  - OG image: page examples showcase (1200×630px)

**Deliverables:**
- Restructured TemplatesPage.astro and PagesPage.astro
- Collection JSON-LD for both
- 2 OG images (templates + pages)

---

#### CR-12: Internal Linking & Silos Strategy

**Type:** Content  
**Priority:** P1 High  
**Dependencies:** CR-7, CR-8 through CR-11  
**Effort:** 8 hours

**Scope:**
- Document internal linking hierarchy in docs/INTERNAL-LINKING.md
  - Topic silo structure: Design Tokens → Atoms → Molecules → Organisms → Templates/Pages
  - Anchor text guidelines (avoid "click here", use descriptive terms)
  - Create internal link network:
    - Homepage → all showcase sections (7 links)
    - Each showcase page → related pages (breadcrumbs + contextual links)
    - Atoms ↔ Molecules ↔ Organisms (upward/downward links)
    - Atoms/Molecules → Templates/Pages (use case links)
- Create automated link audit script (optional)

**Deliverables:**
- docs/INTERNAL-LINKING.md
- Updated page components with structured link navigation

---

**Phase 2 Deliverables Summary:**
- All 7 showcase pages optimized with semantic HTML and per-page JSON-LD
- GEO content writing standards documented
- 7 OG images (one per showcase page type)
- Internal linking silo strategy implemented
- Pages indexed and crawlable by search engines

---

### Phase 3: Interactive & Content Infrastructure (4 weeks)

**Goal:** Add interactive playgrounds, changelog/blog capability, and dynamic content generation for long-tail SEO.

#### CR-13: Component Playground (React Island)

**Type:** Feature  
**Priority:** P1 High  
**Dependencies:** CR-1, CR-2  
**Effort:** 16 hours

**Scope:**
- Create interactive component playground (React island in Astro)
- Location: `/playground` or embedded in component showcase pages
- Features:
  - Live code editor (import from) with syntax highlighting
  - Component prop inspector (show available props, types)
  - Theme toggle (light/dark)
  - Responsive preview (mobile, tablet, desktop)
  - Copy code button (generates import + JSX)
  - Live preview updates as code changes
- Implementation: Use react-live or Monaco editor (lightweight)
- Metadata: Add article JSON-LD (interactive guide type)

**Deliverables:**
- /playground page (Astro + React island)
- Component inspector component
- Code editor component
- Playground documentation

---

#### CR-14: Changelog Pipeline (ISR)

**Type:** Feature  
**Priority:** P2 Medium  
**Dependencies:** CR-1  
**Effort:** 12 hours

**Scope:**
- Set up changelog infrastructure (optional for Phase 3, can defer to Phase 4)
- Location: `/changelog` (single page listing all releases)
- Data source: Parse git tags + commit messages from GitHub API
- Implementation:
  - Weekly ISR (incremental static regeneration) in Vercel/Netlify
  - Fetch latest releases from GitHub API
  - Generate changelog page with structured data (ReleaseEvent schema)
  - Support version filtering (v1.x, v2.x, etc.)
  - Include breaking changes, new features, bug fixes
- Metadata: Add changelog page schema

**Deliverables:**
- src/pages/changelog.astro
- GitHub API integration for release fetching
- ReleaseEvent JSON-LD schema
- ISR configuration in deployment

---

#### CR-15: Blog Platform (Optional — Defer to Phase 4)

**Type:** Feature  
**Priority:** P2 Medium  
**Dependencies:** CR-1, CR-7  
**Effort:** 20 hours (defer if timeline tight)

**Scope:**
- Set up blog infrastructure (if desired for thought leadership)
- Options:
  1. Markdown files in src/content/blog/ (simplest for 2-3 posts)
  2. Astro Content Collections API for type safety
  3. Headless CMS integration (Sanity, Contentful) — overkill for design system
- Proposed articles (if implemented):
  - "Atomic Design Methodology Explained" (internal link magnet)
  - "Building Accessible UI Components" (design system + accessibility)
  - "Design Tokens in Practice" (deep dive on /tokens)
- Publishing: One per month (non-critical for Phase 3)

**Deliverables:**
- Blog architecture decision (Markdown vs CMS)
- 1-2 sample blog posts (optional)

---

#### CR-16: Topic Cluster Pages (Long-Tail GEO)

**Type:** Content  
**Priority:** P2 Medium  
**Dependencies:** CR-7, CR-12  
**Effort:** 24 hours

**Scope:**
- Create programmatically generated long-tail pages for SEO
- Target long-tail keywords by component/token category
- Page types:
  1. **Component reference pages** — one per atomic component (e.g., `/button`, `/input`, `/checkbox`)
     - Format: `/components/{component-name}`
     - Content: Component description, props table, code examples, accessibility notes, design tokens used
     - Template: `src/pages/components/[component].astro`
     - Schema: Article + SoftwareApplication/Component
  2. **Design token reference pages** — one per token category (e.g., `/tokens/colors`, `/tokens/spacing`)
     - Format: `/tokens/{category}`
     - Content: Token definitions, usage examples, CSS variable names, Tailwind mappings
     - Template: `src/pages/tokens/[category].astro`
     - Schema: CollectionPage + BreadcrumbList
  3. **Pattern pages** — reusable patterns (e.g., `/patterns/form-validation`, `/patterns/error-states`)
     - Format: `/patterns/{pattern-name}`
     - Content: Pattern description, use cases, code examples, interactive preview
     - Schema: Article + HowTo

- Data source: Component registry (src/data/components.json) + token definitions
- Sitemap: auto-generated to include all programmatic pages
- Internal linking: All programmatic pages link back to parent showcase pages

**Implementation Timeline:**
- Week 1: Design programmatic page templates
- Week 2: Build component reference pages (20-30 components)
- Week 3: Build token reference pages (5-10 categories)
- Week 4: Build pattern pages (5-10 patterns) + test all links

**Example URLs:**
- `/components/button` — "Button Component — democrito Design System"
- `/components/input` — "Text Input Component — democrito Design System"
- `/tokens/colors` — "Color Design Tokens — democrito Design System"
- `/tokens/spacing` — "Spacing System — democrito Design System"
- `/patterns/form-validation` — "Form Validation Pattern — democrito Design System"

**Deliverables:**
- Component reference page template (src/pages/components/[component].astro)
- Token category page template (src/pages/tokens/[category].astro)
- Pattern page template (src/pages/patterns/[pattern].astro)
- src/data/components.json (component registry with metadata)
- src/data/patterns.json (pattern registry)
- Automated page generation script
- Updated sitemap.xml to include programmatic pages
- Internal linking rules for all programmatic pages

---

**Phase 3 Deliverables Summary:**
- Interactive component playground (React island)
- Changelog pipeline with GitHub integration
- 30-50 programmatic long-tail pages (components, tokens, patterns)
- Blog foundation (optional)
- Expanded sitemap with 50+ pages
- Improved keyword coverage and internal link density

---

### Phase 4: Performance, Analytics & Monitoring (4 weeks)

**Goal:** Optimize for Core Web Vitals, implement AI bot monitoring, and establish GEO analytics.

#### CR-17: Core Web Vitals Optimization

**Type:** Performance  
**Priority:** P1 High  
**Dependencies:** CR-1, CR-6  
**Effort:** 16 hours

**Scope:**
- Analyze Lighthouse scores for all pages
- Optimize metrics:
  1. **Largest Contentful Paint (LCP) < 2.5s**
     - Preload critical fonts (Inter)
     - Optimize hero images (WebP, responsive sizing)
     - Defer non-critical CSS/JS
  2. **First Input Delay (FID) / Interaction to Next Paint (INP) < 100ms**
     - Minimize main thread blocking
     - Code-split React islands (lazy load components)
     - Optimize event handlers
  3. **Cumulative Layout Shift (CLS) < 0.1**
     - Set explicit image dimensions
     - Avoid unsized ads/embeds
     - Use CSS containment for dynamic content
- Set up Lighthouse CI in GitHub Actions (fail on red metrics)
- Configure PageSpeed Insights monitoring (weekly reports)
- Target: All pages > 90 Lighthouse score, > 2.0s LCP

**Deliverables:**
- Lighthouse CI configuration (.github/workflows/lighthouse.yml)
- Image optimization audit + fixes
- CSS/JS split optimization
- Performance baseline + targets documented

---

#### CR-18: AI Bot Monitoring & Analytics

**Type:** Infrastructure  
**Priority:** P1 High  
**Dependencies:** CR-4, CR-5  
**Effort:** 12 hours

**Scope:**
- Implement AI bot monitoring (track which LLMs crawl the site)
- Methods:
  1. **User-Agent parsing** — identify bot type in server logs
  2. **Custom analytics** — log bot requests to separate analytics table
  3. **Search Console** — monitor crawl stats by bot type
- Track metrics:
  - GPT bot crawls (disallowed in robots.txt, should be 0)
  - Claude user-agent crawls (allowed, should increase)
  - Search engine crawls (Google, Bing, etc.)
- Set up Vercel Analytics or Plausible Analytics
  - Dashboard showing top pages by bot type
  - Monthly bot activity report
  - Crawl budget analysis
- Document findings in monthly reports

**Deliverables:**
- Bot monitoring analytics script
- Dashboard configured (Vercel or Plausible)
- Monthly reporting template

---

#### CR-19: GEO Analytics Framework

**Type:** Analytics  
**Priority:** P2 Medium  
**Dependencies:** CR-2, CR-7  
**Effort:** 10 hours

**Scope:**
- Set up GEO-specific metrics in analytics
- Track:
  1. **Search visibility** — GSC impressions/clicks per page
  2. **AI discoverability** — bot visits, llms.txt views
  3. **Content performance** — pages with highest dwell time
  4. **Long-tail keywords** — programmatic page search rankings
- Reporting:
  - Weekly: Top 10 pages by traffic, bot activity
  - Monthly: Keyword rankings, crawl stats, content recommendations
  - Quarterly: GEO strategy review, next phase planning
- Tools: Google Search Console, Google Analytics 4, Vercel Analytics
- Documentation: docs/GEO-ANALYTICS.md with metric definitions

**Deliverables:**
- Analytics dashboard setup
- docs/GEO-ANALYTICS.md
- Monthly reporting template
- Alert rules for anomalies

---

#### CR-20: Dynamic OG Image Generation

**Type:** Feature  
**Priority:** P2 Medium  
**Dependencies:** CR-2, CR-8 through CR-11  
**Effort:** 14 hours

**Scope:**
- Generate OG images dynamically (avoid static image management)
- Implementation:
  1. Use Vercel OG or Satori (open-source) + sharp
  2. Template: democrito branded background + page title + icon
  3. Per-page generation: H1 title, color scheme per page type
- Setup:
  - Create `src/pages/og/[slug].png.ts` — dynamic image route
  - Generate at build time (SSG) or on-demand
  - Cache generated images
- Benefits: Consistent branding, scalable to 50+ pages, auto-updated with content

**Example:**
```typescript
// src/pages/og/[slug].png.ts
export const GET = async ({ params }) => {
  const { slug } = params;
  const pageData = getPageData(slug);
  const image = await generateOGImage({
    title: pageData.title,
    type: pageData.type, // 'component', 'token', 'pattern'
    color: pageData.color,
  });
  return new Response(image, { headers: { 'Content-Type': 'image/png' } });
};
```

**Deliverables:**
- Dynamic OG image generation endpoint
- Satori/Vercel OG integration
- Template design (branded background, typography)
- Per-page image mapping

---

#### CR-21: Search Console & Indexing Verification

**Type:** Infrastructure  
**Priority:** P1 High  
**Dependencies:** CR-5, CR-6, CR-8 through CR-11  
**Effort:** 8 hours

**Scope:**
- Submit sitemap.xml to Google Search Console
- Monitor:
  - Crawl stats (pages crawled, errors)
  - Index coverage (indexed vs blocked pages)
  - Core Web Vitals report
  - Rich results (JSON-LD validation)
  - Mobile usability
- Fix issues:
  - Address crawl errors (broken links, 404s on redirect chains)
  - Ensure all 50+ programmatic pages indexed
  - Validate JSON-LD with Structured Data Testing Tool
- Competitors: Check SEO performance vs other design systems (shadcn/ui, Radix UI, Storybook)

**Deliverables:**
- GSC property verified
- Sitemap submitted
- Rich results status confirmed (100% valid JSON-LD)
- Baseline metrics captured (impressions, clicks, CTR by page)

---

#### CR-22: Programmatic GEO Strategy (Phase 4+)

**Type:** Strategy  
**Priority:** P3 Low  
**Dependencies:** CR-16, CR-20  
**Effort:** 6 hours

**Scope:**
- Document long-term GEO strategy beyond Phase 4
- Expansion opportunities:
  1. **AI comparison content** — "democrito vs shadcn/ui", "best design systems for AI"
  2. **Use case guides** — "Design systems for chat interfaces", "Building form libraries"
  3. **Integration tutorials** — "Using democrito with Next.js", "democrito + Tailwind"
  4. **Video content** (future) — component overviews, design token deep dives
- Keyword research: Tools (Ahrefs, SEMrush) to find long-tail opportunities
- Content calendar: Plan 3-6 months of blog posts + programmatic pages

**Deliverables:**
- docs/GEO-STRATEGY-PHASE5.md
- Long-tail keyword research + prioritized list
- Content calendar template

---

**Phase 4 Deliverables Summary:**
- All pages > 90 Lighthouse score, LCP < 2.5s
- AI bot monitoring dashboard active
- GEO analytics framework established
- Dynamic OG images deployed
- Search Console fully configured
- Long-term GEO strategy documented

---

## Success Metrics & Milestones

### Phase 1 (8 weeks) — Foundation
| Metric | Target | Success Criteria |
|--------|--------|---|
| Site speed (LCP) | < 3.0s | Astro SSG default performance |
| Canonical URLs | 100% | democrito.design on all pages |
| JSON-LD validation | 100% valid | All schemas pass validator |
| robots.txt tiers | 3 levels implemented | Search/AI training/user agents |
| Sitemap pages | 7+ | All showcase routes included |
| Deploy success | Pass CI/CD | Vercel/Netlify green build |

### Phase 2 (6 weeks) — Content
| Metric | Target | Success Criteria |
|--------|--------|---|
| Semantic HTML | 100% | All showcase pages optimized |
| Meta descriptions | All pages | 155 chars, keyword-focused |
| OG images | 7 custom | Brand-consistent, crawlable |
| Internal links | 50+ | Silo structure implemented |
| Keyword coverage | 20 primary keywords | Atoms, molecules, organisms, tokens, etc. |
| GSC indexing | 7/7 showcase pages | All pages in index |

### Phase 3 (4 weeks) — Interactive
| Metric | Target | Success Criteria |
|--------|--------|---|
| Playground islands | 3+ React islands | Code editor + preview functional |
| Programmatic pages | 30-50 pages | Components, tokens, patterns |
| Sitemap size | 50+ pages | All long-tail pages included |
| Link density | 100+ internal links | Silos fully connected |

### Phase 4 (4 weeks) — Performance
| Metric | Target | Success Criteria |
|--------|--------|---|
| Lighthouse score | > 90 all pages | Automated CI/CD checks |
| LCP | < 2.5s | All pages, all devices |
| AI bot visits | > 50 visits/month | Claude user-agent tracking |
| GSC impressions | > 100/month | Pages appearing in search |
| OG images | 50+ dynamic | All pages have custom preview |

---

## Risk Mitigation & Decisions

### Tech Stack Decision: Astro vs Next.js

**Decision:** Astro 5 with React islands

**Rationale:**
- Astro's static-first philosophy matches democrito's content-heavy showcase nature
- Island architecture allows strategic React use (playground, interactive components) without shipping JS to showcase pages
- Better SEO defaults (SSG by default, minimal hydration)
- Smaller bundle size improves Core Web Vitals

**Risks Mitigated:**
- "But the team uses Next.js for prompt-x" → Astro has similar DX; TypeScript support is excellent
- "Interactive components need React" → React islands solve this; Astro integrates React seamlessly
- "ISR or on-demand generation needed" → Astro supports hybrid rendering; can use Vercel Serverless Functions for dynamic routes

---

### Phased Rollout Strategy

**Risk:** Breaking existing traffic during migration
**Mitigation:**
- Keep democrito-design-system.lovable.app live during Phase 1 development
- Use feature branch for Astro migration (no production impact)
- At Phase 1 completion, redirect 301 Lovable → democrito.design
- Pre-warm Google cache with sitemap submission before cutover

---

### Protected Routes (/app/*)

**Challenge:** /app/* routes behind ProtectedGate should not be SEO-indexed
**Solution:**
- Set `robots: noindex, follow` in robots.txt for /app/*
- Add `<meta name="robots" content="noindex, follow">` on protected pages
- Astro hybrid rendering: Use SSR for /app/* routes (requires auth check)
- Or: Keep /app/* in separate React SPA (no migration needed)
- Recommended: SSR + auth middleware (cleaner architecture)

---

### Changelog & Blog (Phase 3 Deferral)

**Reason for deferral:** Phase 1-2 focus on core showcase
**Timeline:**
- Week 14 (Phase 3): Implement changelog (ISR from GitHub API) — quick wins
- Week 16 (Phase 3): Optional blog (2-3 foundational posts)
- Phase 4+: Expand blog content (monthly articles)

---

### Content Ownership & Update Cycle

**Ownership:** Mariano (design system custodian)
**Update workflow:**
- Component changes → Astro data files updated
- Token changes → src/data/tokens.json regenerated
- Blog/changelog → Git commits + automatic ISR

---

## Timeline & Dependencies

```
Phase 1: Foundation (Weeks 1-8)
├─ CR-1: Astro migration (Weeks 1-3)
├─ CR-2: Structured data (Weeks 2-4)
├─ CR-3: Domain setup (Week 2, parallel)
├─ CR-4: AI bot files (Weeks 3-4)
├─ CR-5: Dynamic sitemap (Weeks 4-5)
└─ CR-6: Security headers (Weeks 5-6)

Phase 2: Content (Weeks 7-12)
├─ CR-7: GEO standards (Week 7, 1-day turnaround)
├─ CR-8: Homepage redesign (Weeks 8-9)
├─ CR-9: Tokens page (Week 9)
├─ CR-10: Atoms/Molecules/Organisms (Weeks 10-11)
├─ CR-11: Templates/Pages (Week 11)
└─ CR-12: Internal linking (Week 12)

Phase 3: Interactive (Weeks 13-16)
├─ CR-13: Playground (Weeks 13-14)
├─ CR-14: Changelog (Week 15)
├─ CR-15: Blog (Week 16, optional)
└─ CR-16: Long-tail pages (Weeks 14-16)

Phase 4: Performance (Weeks 17-20)
├─ CR-17: Core Web Vitals (Weeks 17-18)
├─ CR-18: Bot monitoring (Week 19)
├─ CR-19: GEO analytics (Week 19)
├─ CR-20: Dynamic OG images (Week 20)
├─ CR-21: GSC verification (Week 20)
└─ CR-22: Future strategy (Week 20)
```

**Total Duration:** 20 weeks (5 months)  
**Resource Allocation:** Primarily Mariano (design system expert), with Claude Code for implementation

---

## Deployment Architecture

### Hosting: Vercel (Recommended)

**Why Vercel:**
- Native Astro support
- ISR (incremental static regeneration) for dynamic pages
- Edge Functions for dynamic OG images
- Built-in security headers
- GitHub integration (auto-deploy on merge)

**Alternative:** Netlify (also excellent; swap ISR for Scheduled Functions)

### Build Pipeline
```
main branch
  ↓
GitHub Actions: Lint, type-check, build
  ↓
Vercel: SSG static pages + SSR /app/* routes
  ↓
Edge Functions: Dynamic OG images
  ↓
Deployment: democrito.design live
```

### Environment Variables
```bash
# .env.production
VITE_SITE_URL=https://democrito.design
VITE_ORG_NAME=democrito
VITE_GITHUB_REPO=democrito-design/design-system  # for changelog ISR
VITE_ANALYTICS_ID=<google-analytics-id>
```

---

## Documentation to Create

**Core documents:**
1. `CLAUDE.md` — Updated with Astro setup, metadata patterns, component contribution guide
2. `docs/GEO-STANDARDS.md` — Writing standards for SEO/GEO content
3. `docs/INTERNAL-LINKING.md` — Link hierarchy and silo strategy
4. `docs/GEO-ANALYTICS.md` — Metrics, dashboards, reporting
5. `docs/DEPLOYMENT.md` — Vercel config, environment setup, rollback procedures
6. `docs/ARCHITECTURE.md` — Astro file structure, island usage, data flows

**Implementation documents (auto-generated):**
- `src/lib/schema.ts` — JSON-LD helpers
- `src/lib/metadata.ts` — Metadata management
- Astro config (`astro.config.mjs`)
- Middleware (security headers)

---

## Go-Live Checklist

**Pre-launch (Phase 1 completion):**
- [ ] Astro build passes CI/CD
- [ ] All pages render without errors
- [ ] Core Web Vitals baseline measured (Lighthouse)
- [ ] JSON-LD validates 100% (Structured Data Testing Tool)
- [ ] robots.txt 3-tier bot strategy tested
- [ ] llms.txt readable (manual test)
- [ ] Sitemap.xml generates correctly
- [ ] 301 redirects configured (Lovable → democrito.design)

**Launch day (Phase 2 completion):**
- [ ] democrito.design goes live
- [ ] Sitemap submitted to Google Search Console
- [ ] Search Console property verified
- [ ] All 7 showcase pages indexed within 24h
- [ ] Lighthouse CI running in GitHub Actions
- [ ] Analytics dashboard active
- [ ] Error monitoring (Sentry) operational

**Post-launch (Phase 3-4):**
- [ ] GSC shows > 100 impressions (target: 2 weeks)
- [ ] Programmatic pages indexed (50+ pages)
- [ ] AI bot monitoring shows Claude user-agent traffic
- [ ] Lighthouse score > 90 on all pages
- [ ] Monthly GEO analytics review scheduled

---

## Appendix A: Glossary

**Astro** — Static-first web framework; generates optimized HTML with zero JavaScript by default  
**GEO** — Generative Engine Optimization; optimizing content for AI/LLM discovery  
**SSG** — Static Site Generation; pre-render pages at build time  
**SSR** — Server-Side Rendering; render pages on-demand at request time  
**ISR** — Incremental Static Regeneration; rebuild static pages without full rebuild  
**JSON-LD** — Linked Data format for structured metadata; recognized by search engines & LLMs  
**OG tags** — Open Graph tags; control how pages appear in social media previews  
**robots.txt** — File instructing bots which pages to crawl  
**llms.txt** — Emerging convention for LLM-readable site descriptions  
**CLS** — Cumulative Layout Shift; metric measuring visual stability  
**LCP** — Largest Contentful Paint; metric measuring page load speed  
**Core Web Vitals** — Google's 3 key UX metrics (LCP, FID/INP, CLS)

---

## Appendix B: Component Registry Template

**File:** `src/data/components.json`

```json
{
  "components": [
    {
      "id": "button",
      "name": "Button",
      "category": "atoms",
      "description": "Clickable element for user actions",
      "path": "/components/button",
      "variants": ["primary", "secondary", "outline", "ghost"],
      "keywords": ["button", "cta", "action", "click"],
      "relatedTokens": ["color.primary", "spacing.md"],
      "accessibility": "WCAG 2.1 AA compliant"
    },
    {
      "id": "input",
      "name": "Text Input",
      "category": "atoms",
      "description": "Single-line text input field",
      "path": "/components/input",
      "variants": ["default", "error", "disabled"],
      "keywords": ["input", "text field", "form", "field"],
      "relatedTokens": ["color.text", "spacing.md", "border-radius.sm"],
      "accessibility": "WCAG 2.1 AA compliant"
    }
  ]
}
```

---

## Appendix C: Structured Data Schema Examples

**Organization JSON-LD (homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "democrito",
  "description": "Atomic design system for AI products",
  "url": "https://democrito.design",
  "sameAs": [
    "https://github.com/democrito-design"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "Customer Support",
    "email": "[contact@democrito.design]"
  }
}
```

**SoftwareApplication JSON-LD (homepage):**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "democrito Design System",
  "description": "Atomic design system for building AI product UIs",
  "url": "https://democrito.design",
  "applicationCategory": "DesignLibrary",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  }
}
```

---

## Appendix D: Next Steps After Phase 1

Once Phase 1 (Foundation) is complete:

1. **Verify migration success** — All routes working, no broken links
2. **Capture baseline metrics** — Lighthouse, GSC impressions, crawl stats
3. **Approve Phase 2** — Content optimization (7 showcase pages)
4. **Schedule content refresh** — Coordinate with Mariano for page rewrites
5. **Plan launch timing** — Avoid major traffic events; allow 2-3 weeks for indexing

---

## Document Ownership & Updates

**Owner:** Mariano (democrito design system)  
**Maintainer:** Claude Code (implementation)  
**Reviewers:** TBD (stakeholder approval for Phase decisions)  
**Last Updated:** 2026-04-16  
**Next Review:** End of Phase 1 (Week 8)

---

**End of SEO/GEO Implementation Plan**
