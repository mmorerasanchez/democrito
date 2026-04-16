# Business Model — democrito

> **Meta**
> - Product: democrito
> - Date: 2026-04-17
> - Stage: Pre-revenue
> - Business model type: Hybrid (open-source core + paid knowledge packs)
> - Status: Draft
> - Evidence key: [confirmed] = known data · [benchmarked] = industry reference · [hypothesis] = pre-revenue unvalidated assumption
> - Lift source key: [lift: historical] = past experiments · [lift: benchmark] = industry data · [lift: judgment] = team estimate

---

## Strategic Opportunity

### Problem and market fit

Developers building data-dense, IDE-inspired applications face a recurring problem: design systems are either consumer-oriented (wrong aesthetic), enterprise-locked (wrong access model), or too abstract to use with AI coding assistants (wrong format). The rise of AI-assisted development — Claude Code, Cursor, Windsurf, GitHub Copilot — creates a new distribution channel for design systems that speak the language of AI agents: structured context files, machine-readable tokens, and executable specifications.

democrito occupies a specific niche: the first open-source design system built *for* AI-native development workflows, with context files (CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md) as first-class distribution artifacts alongside the traditional CSS tokens and component library.

**Market sizing reference:**

| Level | Size | Source | Evidence |
|-------|------|--------|----------|
| TAM | ~$2.4B | Global UI component library and design system tools market (2026) | [benchmarked] |
| SAM | ~$120M | Open-source design system ecosystem — developers using shadcn/ui, Radix, Tailwind UI, and similar paid/free systems | [benchmarked] |
| SOM (3-year target) | ~$50K-150K ARR | Individual developer tool creators selling templates, kits, and knowledge products to the shadcn/ui + AI coding ecosystem | [hypothesis] |

### Strategic thesis

The shift from manual to AI-assisted development changes what makes a design system valuable. Traditional systems compete on visual quality and component breadth. AI-native systems compete on **context quality** — how effectively an AI agent can produce on-brand, consistent output from the system's documentation. democrito's investment in three structured context files, a Claude Skill, and a shadcn registry creates a distribution model where the system installs itself into the developer's AI workflow, not just their codebase. This makes adoption stickier and creates a natural upsell: free tokens get you started, paid knowledge packs make you productive.

### Defensibility

- **Primary moat:** Knowledge depth — the curated skill library (sdd-writer, dev-prompt-engineer, design-writer, deploy-writer, qa-prompt-engineer) contextualized for democrito represents hundreds of hours of workflow refinement that cannot be reverse-engineered from the open-source tokens alone.
- **Secondary moat:** Community and content — worked examples, prompt libraries, and real-world project templates create a growing body of "how to use this well" content that compounds.
- **Time to moat:** 6-12 months of shipping paid packs and building a user base of developers who've internalized the workflow. [hypothesis]

---

## Revenue Model

### Revenue streams

| Stream | Type | Description | Priority |
|--------|------|-------------|----------|
| Knowledge Packs | One-time purchase | Curated skill bundles + prompt libraries + worked examples for AI-assisted development with democrito | Primary |
| Premium Templates | One-time purchase | Complete project templates (dashboard, editor, settings) built with democrito, with full SDD → Prompt-Spec → QA-Spec documentation chain | Secondary |
| Custom Theming | Services / one-time | Brand-specific theme configuration + skill customization for teams adopting democrito as their design foundation | Future (deprioritized) |

### Pricing structure

| Tier | Price | Included | Target segment |
|------|-------|----------|---------------|
| **Open Source** (Free) | €0 | CSS tokens, component library, CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md, shadcn registry install, Claude Skill (public, basic) | Individual developers exploring, students, open-source contributors |
| **Starter Pack** | €39 one-time | Expanded Claude Skill (full principles + tokens + component inventory), DESIGN.md template for custom projects, design-writer skill with democrito defaults, usage guide with 10 worked examples | Solo developers and small teams building their first democrito project |
| **Pro Pack** | €129 one-time | Everything in Starter + full SDD pipeline (sdd-writer, dev-prompt-engineer, design-writer, deploy-writer, qa-prompt-engineer all contextualized for democrito), 20+ prompt library, visual regression template, complete example project with full spec chain | Professional developers and teams using AI coding assistants daily |

**Pricing rationale:** One-time pricing chosen over subscription because the product is a knowledge asset, not a service. Developers buy it once and use it indefinitely — subscription would feel extractive for static content. €39 and €129 are positioned below the "needs approval" threshold for most individual developers and small teams. The gap between free and Starter must be large enough to justify the price — the free tier gives you the *what* (tokens, components), the paid tiers give you the *how* (workflow, methodology, enforcement). [hypothesis] [lift: benchmark — Tailwind UI, shadcn/ui templates, Refactoring UI pricing]

---

## Unit Economics

### Customer acquisition

| Input | Base | Bull | Bear | Evidence |
|-------|------|------|------|----------|
| CAC (blended) | €0-5 | €0-3 | €5-10 | [hypothesis] |
| Primary acquisition channel | GitHub/organic + /ai page | + Product Hunt launch | GitHub only | [hypothesis] |
| Payback period | Immediate (one-time) | Immediate | Immediate | One-time purchase model |

**CAC assumption:** Near-zero CAC for the primary channel — developers discover democrito through GitHub, the shadcn registry, the Claude Skill marketplace, or through prompt-x. The /ai page on democrito.design serves as the sales page. Paid acquisition (ads, sponsorships) is not planned for the initial phase. [hypothesis] [lift: benchmark — similar open-source-to-paid-kit models like Tailwind UI had near-zero CAC from the open-source community]

### Revenue per customer

| Input | Base | Bull | Bear | Evidence |
|-------|------|------|------|----------|
| Average order value | €65 | €85 | €39 | [hypothesis] |
| Mix (Starter : Pro) | 60:40 | 40:60 | 80:20 | [hypothesis] |
| Repeat purchase rate | 0% (one-time) | 10% (future packs) | 0% | [hypothesis] |

**Segment variation:** Pro Pack conversion will skew toward developers already using AI coding assistants (Claude Code, Cursor) who understand the value of structured prompts. Starter Pack appeals to developers who want better AI output but aren't yet running a full spec-driven workflow. [hypothesis] [lift: judgment]

### Cost structure

| Cost item | Per unit | Notes | Evidence |
|-----------|---------|-------|----------|
| Hosting (Vercel) | €0 | Free tier sufficient for showcase site | [confirmed] |
| Payment processing (Stripe/Lemon Squeezy) | ~3-5% | Per transaction | [confirmed] |
| Content creation | €0 (own time) | Skills and docs authored by Mariano + Claude | [confirmed] |
| GitHub hosting | €0 | Public repo | [confirmed] |
| **Total cost per sale** | **€2-6** | | |

**Gross margin per sale:**

| Scenario | AOV | Cost/sale | Gross margin |
|----------|-----|-----------|-------------|
| Base | €65 | €4 | 94% |
| Bull | €85 | €5 | 94% |
| Bear | €39 | €3 | 92% |

---

## Growth Model

### Key growth assumptions

| Assumption | Value | Evidence | Lift source |
|-----------|-------|----------|-------------|
| GitHub stars (Month 6) | 300-500 | [hypothesis] | [lift: benchmark — well-positioned design systems] |
| Monthly unique visitors to democrito.design | 500-1,000 | [hypothesis] | [lift: benchmark] |
| Visitor → sales page view rate | 15-25% | [hypothesis] | [lift: judgment] |
| Sales page → purchase rate | 3-5% | [hypothesis] | [lift: benchmark — developer tool landing pages] |
| Starting customer count (M1) | 0 | [confirmed] | — |

### Growth levers

| Stage | Lever | Mechanism | Expected impact | Evidence | Lift source |
|-------|-------|-----------|----------------|----------|-------------|
| Acquisition | shadcn registry listing | `npx shadcn add` installs democrito tokens, discovery through shadcn ecosystem | High — primary discovery channel for Tailwind developers | [hypothesis] | [lift: benchmark] |
| Acquisition | Claude Skill marketplace | Public Claude Skill appears in skill search, developers try democrito through AI | High — direct access to AI-first developers | [hypothesis] | [lift: judgment] |
| Acquisition | /ai page SEO | "design system for AI development" keyword targeting | Medium — long-tail organic traffic | [hypothesis] | [lift: benchmark] |
| Acquisition | prompt-x cross-promotion | prompt-x users discover democrito as the design foundation | Medium — warm audience, already understands the value | [hypothesis] | [lift: judgment] |
| Activation | Free tier quality | CLAUDE.md + DESIGN.md produce noticeably better AI output than no context | High — the free tier must sell itself | [hypothesis] | [lift: judgment] |
| Conversion | /ai page as sales page | Shows free vs. paid comparison, copy-pasteable examples of the difference | High — converts visitors who've already tried the free tier | [hypothesis] | [lift: judgment] |
| Expansion | New knowledge packs | Themed packs (dashboard kit, editor kit, settings kit) with full spec chains | Medium — repeat purchases from Pro customers | [hypothesis] | [lift: judgment] |

### Revenue projection

| Month | Visitors (Base) | Sales (Base) | Revenue (Base) | Sales (Bull) | Revenue (Bull) | Sales (Bear) | Revenue (Bear) |
|-------|----------------|-------------|---------------|-------------|---------------|-------------|---------------|
| M1 | 200 | 0-1 | €0-65 | 1-2 | €65-130 | 0 | €0 |
| M3 | 500 | 2-4 | €130-260 | 5-8 | €325-520 | 1-2 | €39-78 |
| M6 | 1,000 | 5-8 | €325-520 | 10-15 | €650-975 | 3-4 | €117-156 |
| M12 | 2,000 | 10-15 | €650-975 | 25-35 | €1,625-2,275 | 5-8 | €195-312 |
| M24 | 3,500 | 20-30 | €1,300-1,950 | 50-70 | €3,250-4,550 | 10-15 | €390-585 |

**Cumulative revenue (24 months):**
- Base: ~€4,000-6,000
- Bull: ~€10,000-14,000
- Bear: ~€1,200-2,000

### Breakeven

| Input | Value | Evidence |
|-------|-------|----------|
| Fixed monthly costs | €0 (domain ~€15/yr, everything else free tier) | [confirmed] |
| Gross margin | ~94% | [from unit economics above] |
| **Breakeven revenue** | **€15/year** (just the domain cost) | |
| **Breakeven sales** | **1 Starter Pack per year** | |

The near-zero cost structure means breakeven is trivially achievable. The real question is whether revenue justifies the time investment in creating and maintaining the paid content.

**Time investment value check:**
- Estimated time to create paid content: ~40 hours (skills, examples, templates, guide)
- At €65 AOV (Base), need ~62 sales to earn €4,000 (€100/hr equivalent)
- At €85 AOV (Bull), need ~47 sales for the same
- Timeline to 62 sales: 18-24 months (Base), 6-12 months (Bull)

---

## Go-to-Market Motion

**Primary motion:** Product-led — the open-source repo and free tier are the acquisition engine. No outbound sales, no paid ads.

**Why this motion fits:** Developer tools sell through demonstration, not persuasion. The free tier (CLAUDE.md + DESIGN.md + shadcn registry) must produce noticeably better AI output than using no design system context. Developers who experience that improvement are pre-sold on the paid tier — the /ai page just needs to show them what "even better" looks like with the full skill pipeline. [hypothesis] [lift: benchmark — Tailwind CSS → Tailwind UI conversion model]

**Acquisition channels (prioritised):**

| Channel | Rationale | Est. CAC | Time to results | Priority |
|---------|-----------|---------|----------------|----------|
| GitHub + shadcn ecosystem | Developers search for shadcn themes/systems, find democrito | €0 | 1-3 months | Primary |
| Claude Skill marketplace | AI-first developers discover democrito through Claude | €0 | 1-2 months (after skill ships) | Primary |
| /ai page (SEO) | Long-tail search: "design system for AI," "AI coding design tokens" | €0 | 3-6 months | Secondary |
| prompt-x cross-promotion | Warm audience, direct integration | €0 | Ongoing | Secondary |
| Product Hunt launch | One-time visibility spike | €0 | 1 day (plan for M3-M6) | Test |
| Dev Twitter/X + blog posts | Content marketing around the AI-native design system concept | €0 | Ongoing | Test |

---

## Business Objectives and Success Metrics

| Objective | Milestone | Target metric | Timeline |
|-----------|-----------|--------------|----------|
| Validate free tier adoption | 200 GitHub stars + 50 shadcn installs | Stars, registry installs (npm download proxy) | M3 |
| Ship paid tiers | Starter + Pro packs live on storefront | Packs published, payment flow working | M4 |
| First 10 sales | Revenue confirms willingness to pay | 10 completed purchases | M6 |
| Validate Pro Pack value | Pro:Starter ratio > 30% | Purchase mix ratio | M9 |
| Sustainable side revenue | €200+/month average | Monthly revenue (trailing 3-month) | M18 |

---

## Insights

### What this means for the product

- **The /ai page is the most commercially important page on the site.** It serves triple duty: AI discoverability (llms.txt target), developer education (how to use democrito with AI), and sales conversion (free vs. paid comparison). Spec it accordingly — it's not a documentation page, it's a landing page.
- **The Claude Skill and shadcn registry are distribution, not product.** They should be free and generous. Their purpose is to get democrito into workflows, not to gate value. The paid value is the *methodology* (skills, specs, examples), not the *artifacts* (tokens, components).
- **Content marketing around the "AI-native design system" concept is the highest-leverage growth activity.** The category barely exists. Being the first to define it — through blog posts, Twitter threads, and the /ai page — creates positioning that compounds.
- **prompt-x is both a customer and a case study.** The fact that democrito powers a real product (prompt-x) is the strongest proof point. Every spec, prompt, and deployment doc created for prompt-x is a potential example in the paid pack.

### Key assumption

- **[KEY ASSUMPTION]:** Developer willingness to pay for AI workflow optimization in the design system category. The model assumes 3-5% of sales page visitors convert — validated by: ship the Starter Pack at €39, track conversion for 90 days. If conversion is below 1%, the pricing or value proposition needs rework. If above 5%, consider raising prices.

### Segment dynamics

- **Strongest segment:** Professional developers already using Claude Code or Cursor who build data-dense applications (dashboards, editors, internal tools). They immediately understand the value of structured AI context and are willing to pay for workflow acceleration.
- **Weakest segment:** Developers building consumer-facing apps. democrito's IDE-inspired aesthetic is wrong for their use case, and no amount of workflow tooling changes that.
- **Unknown segment:** Teams considering democrito as a shared design foundation (like prompt-x uses it). Team adoption could justify higher pricing but requires different packaging (team licenses, onboarding guides). [TBD — monitor for signals]

### Risks and open questions

- **"Just use the free tier" risk** — If CLAUDE.md + DESIGN.md are good enough, the paid tier has no market. Resolved if: free tier produces noticeably inferior output compared to the full skill pipeline, demonstrable through side-by-side examples.
- **Category risk** — "AI-native design system" may not become a recognized category. Resolved if: other design systems start shipping AI context files, validating the category without requiring democrito to create it alone.
- **Time investment risk** — 40 hours of content creation for potentially modest returns. Resolved if: the content creation serves double duty (improves democrito's quality AND generates revenue).

### What to model next

- **Pricing sensitivity test:** After first 20 sales, survey buyers on perceived value vs. price. Consider whether €39/€129 is too low for Pro.
- **Pack expansion model:** If Pro Pack sells, model the revenue impact of quarterly themed packs (€49 each) as repeat purchase opportunities.
- **Team pricing:** If 3+ buyers come from the same organization, model a team license at €299-499 with onboarding support.

---

## Actuals vs. Estimates

> **Complete this section when real data becomes available.**

| Metric | Estimated (Base) | Actual | Delta | Learning |
|--------|-----------------|--------|-------|----------|
| M3 GitHub stars | 300-500 | — | — | — |
| M3 sales | 2-4 | — | — | — |
| M6 revenue | €325-520 | — | — | — |
| Sales page conversion | 3-5% | — | — | — |
| Starter:Pro ratio | 60:40 | — | — | — |

**Calibration note:** To be completed after M3 data is available.
