# democrito.design — Last-Mile UX/UI Audit

**Date:** 2026-05-16
**Auditor:** Cowork session, strategic + last-pixel hybrid
**Scope:** democrito.design public showcase site (9 URLs)
**Repo state audited:** `~/Desktop/apps/democrito/app-democrito` at HEAD
**Lenses applied:** democrito's own principles · last-pixel craft · Nielsen heuristics & IA · WCAG AA

---

## How to read this

This audit is structured in three layers, ordered by leverage:

1. **Executive summary** — the five things that, if fixed, change the perception of the site most.
2. **Strategic themes (12)** — cross-cutting patterns. Each theme cites the democrito rule or heuristic it violates, the rationale, and the fix shape.
3. **Page-by-page punch list** — concrete last-pixel issues on each of the 9 URLs, prioritised P0/P1/P2.

Every finding cites its source rule. Rules come from the project instructions document (the six design principles, the three-font typography rule, the three-surface hierarchy, atomic discipline, the source-of-truth ladder) or from Nielsen's 10 heuristics. Findings without a citable rule are flagged as **(taste call)** and you can ignore them without breaking the system.

Priorities:

- **P0** — visible inconsistency or rule violation that another designer would notice in 30 seconds. Fix before any public push.
- **P1** — last-pixel polish that compounds the impression of craft. Fix during the polish sprint.
- **P2** — taste calls or nice-to-haves. Optional.

---

## Executive summary — the five highest-leverage fixes

These five compound. They fix consistency problems that currently undermine the rest of the work, and they are all tractable.

### 1. Resolve the **"Templates / Layouts / Pages"** three-way naming collision (P0)

The atomic layer is called "Templates" in `CLAUDE.md`, `DESIGN_SYSTEM.md`, and the project instructions ("Atoms → Molecules → Organisms → Templates"). The sidebar labels it **Layouts**. The home-page Sections card labels it **Layouts**. The URL is **`/pages`** with a `/templates` redirect. The page component is `TemplatesPage.tsx`. The DOCUMENTATION text in the sidebar tooltips says nothing to reconcile.

This is the single most visible inconsistency on the site for anyone who has read the docs. **Rule violated:** Atomic discipline ("Atoms → Molecules → Organisms → Templates" — project instructions, "Design principles", item 5). **Heuristic violated:** Nielsen #4, Consistency and Standards.

**Fix shape:** Pick one canonical word — recommend **Templates** because it matches atomic methodology and the existing `.md` docs — and replace everywhere. URL becomes `/templates` (the redirect already exists, just flip the direction). Sidebar label = `Templates`. Home-page Sections card = `Templates`. Then update copy in the description blurb.

### 2. Fix the **5-card asymmetric grid** under Sections on the home page (P0)

`OverviewPage.tsx` line 119: `grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3` with 5 items produces a 3+2 layout with empty space on the right of row 2. On a landing page, this empty cell is the most visually loud thing on the screen — it reads as "unfinished".

**Rule violated:** Last-pixel craft (taste call, but compounded by "first impression" weight of the home page).

**Fix shape, ranked by preference:**

- **(A)** Add a 6th card — **Manifesto** — bringing the inventory up to 6 and aligning with the 6-up Summary grid above it. The card icon could be a `Quote` from Lucide. Description: *"Why design systems still matter — the taste argument."* This also surfaces the Manifesto from the sidebar-only state.
- **(B)** If you don't want Manifesto in this grid, drop the count to 4 by folding the **Tokens** card into a separate header treatment (Tokens is foundational, not a peer of Atoms/Molecules/Organisms/Templates anyway).
- **(C)** Change the grid to `lg:grid-cols-5` with smaller cards. Less recommended — it sacrifices card legibility for symmetry.

### 3. Bring the **brand wordmark vs. type scale** decision into the open (P1)

The site renders the wordmark `democrito` in `font-mono text-3xl font-bold lowercase` in the home hero and `font-mono text-lg font-semibold lowercase` in the topbar across all pages. The project's three-font typography rule says:

> `font-mono` (JetBrains Mono) → **all** user-editable content, all variables, all data values, all code

A brand wordmark is none of those. It is the canonical "title / structural text", which the rule assigns to `font-display`. The current treatment is the single most visible place where the design system breaks its own most-emphasised rule.

You have two coherent paths. Either is defensible. The incoherent path is the current one.

- **(A) Treat the wordmark as code-adjacent and update the rule.** Add an explicit exception to `DESIGN.md`: *"The wordmark `democrito` is rendered in `font-mono` lowercase as a brand decision — the only place mono is permitted for non-data content."* This makes the violation deliberate and documented. **Recommended** — the mono lowercase wordmark is genuinely distinctive and on-brand for "prompts are code".
- **(B) Re-render the wordmark in `font-display`.** Cleaner against the rule. Loses some of the IDE flavour. Sample weight: `font-display text-3xl font-bold tracking-tight lowercase`.

Whichever path you pick, **the type scale in `TokensPage` should also surface the wordmark treatment as a named entry**, so the choice is documented in the showcase, not just the brand.

### 4. **Per-page metadata is missing** — every URL ships the same title, description, and OG image (P0)

`index.html` hardcodes a single `<title>`, `<meta description>`, and `<og:image>`. The SPA does not update them on route change. Result: Google indexes nine URLs but they all look identical in SERPs; LinkedIn link previews show the same card for `/tokens` as for `/manifesto`.

**Rule violated:** Source-of-truth ladder + IDE-inspired discipline (project instructions). **Heuristic violated:** Nielsen #2, Match between system and the real world — page meta should match page content.

**Fix shape:** Add `react-helmet-async` (or the smaller `@unhead/react`), wrap the app, and put a `<Helmet>` per page with title, description, canonical, and optionally per-page OG images. A starter map:

| Route          | Title                                                | Description                                                                                          |
| -------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `/`            | democrito — Atomic Design System for AI-Native Development | (current)                                                                                            |
| `/manifesto`   | Manifesto · democrito                                | You can only be as good as your taste — why design systems still matter in the age of generation.   |
| `/tokens`      | Design Tokens · democrito                            | 90+ design tokens — colours, type, spacing, radius, shadows. Search, copy as HSL/HEX, export JSON. |
| `/atoms`       | Atoms · democrito                                    | 10 base components with variants, sizes, states, and copy-ready API examples.                       |
| `/molecules`   | Molecules · democrito                                | 18 composed components built from atoms.                                                            |
| `/organisms`   | Organisms · democrito                                | 19 complex UI sections.                                                                              |
| `/templates`   | Templates · democrito                                | 7 full-page layouts.                                                                                 |
| `/ai`          | AI Integration · democrito                           | Three-file architecture for Claude, Lovable, GitHub, and any LLM.                                   |
| `/ai/claude`   | Using democrito with Claude · democrito              | Workflow for Claude.ai, Claude Code, Cowork, and Claude Design.                                     |
| `/ai/vibe-coding` | Using democrito with Lovable, Stitch, Replit · democrito | Drop-in context files for vibe-coding tools.                                                     |
| `/ai/github`   | Using democrito on GitHub · democrito                | Fork, customise, contribute.                                                                        |

While there, also fix `meta-theme-color`: it's hardcoded to the dark-theme `--background` (`hsl(20, 14%, 4%)`) regardless of active theme. The `FaviconSync` hook already syncs the favicon to theme — extend it to update `<meta name="theme-color">` to the active theme's `--background`. Also generate a `sitemap.xml` (`robots.txt` already promises one).

### 5. Add an **on-page table of contents** to the long showcase pages (P0)

`AtomsPage` is 12+ stacked sections (Button, Input, Textarea, Badge, Tag, Typography, Avatar, Checkbox/Switch/Slider, Tooltip, Progress, etc.) totalling ~400 lines of rendered content. Each section already has an `id` attribute — but nothing in the UI surfaces those IDs. Users who arrive looking for "Tag" must scroll through eight sections to find it.

**Heuristic violated:** Nielsen #7, Flexibility and efficiency of use. Also #1, Visibility of system status (where am I in this page?).

**Fix shape:** Add a sticky right-rail TOC on `lg+` viewports (or a sticky top filter on small viewports). One organism, reusable across `AtomsPage`, `MoleculesPage`, `OrganismsPage`, `TemplatesPage`. Lucide already includes everything you need for the indicator (a thin accent bar against the active section). Existing equivalents to study: shadcn/ui's own docs site, Radix Primitives, the Storybook canvas TOC pattern.

---

## Strategic themes — 12 cross-cutting findings

Each theme is one paragraph of pattern + one paragraph of fix shape. Rationale is grounded in democrito's own rules; the rule is named in **bold**.

### Theme 1 — The "Documentation" group label and "DESIGN" collapsible are mismatched in shape

**Pattern:** The sidebar puts `README / AI / MANIFIESTO` under a "Documentation" group label (small mono caps) and then a `DESIGN` collapsible (no group label — the word `DESIGN` is the collapse trigger itself). Two different IA shapes in the same nav, two different affordances. The top three are flat, the next five are nested.

**Rule:** Atomic discipline + Nielsen #4 (consistency). When two sibling regions use different patterns, the user can't predict whether `MANIFIESTO` is collapsible too.

**Fix shape:** Make both regions the same shape. Either (A) both are collapsible groups with consistent group labels ("Documentation", "Design"), or (B) both are flat lists with a quiet separator between them. (B) is simpler and matches the sidebar density. Also: the lone `README` link is the equivalent of "Home" — consider relabeling it `Overview` or `Home` to match `DESIGN_SYSTEM.md`-style language.

### Theme 2 — Sidebar typography hierarchy inverts between levels

**Pattern:** Top-level items (`README`, `AI`, `MANIFIESTO`) render as `font-mono text-2xs uppercase tracking-widest`. Sub-items under `DESIGN` (`Tokens`, `Atoms`, …) render as `font-mono text-xs` — **larger, mixed-case, no tracking**. This makes the sub-items more visually prominent than their parents.

**Rule:** **Typography as Hierarchy** (project instructions principle 3). Subordinate items should be visually lighter than their parents, not heavier.

**Fix shape:** Invert. Top-level items should be the larger, mixed-case treatment; sub-items should be smaller and either match the parent uppercase tracking treatment or reduce in weight. Suggested:

- **Top-level:** `font-display text-sm font-medium` (mixed case, e.g. "Overview", "AI Integration", "Manifesto").
- **Section labels** ("Documentation", "Design"): `font-mono text-2xs uppercase tracking-widest text-muted-foreground` (the kicker treatment).
- **Sub-level under Design:** `font-mono text-xs` (kept) but with `pl-6` indent (already present) and `text-muted-foreground` (already present).

This also aligns the kicker treatment used in `AiDetailPage` (Note labels, Section labels) with the sidebar's region labels.

### Theme 3 — Headings under "Why / How / What" lack a clear scale jump

**Pattern:** On `OverviewPage`, the Heading atom renders `h2` at `text-lg` (18px) and `h3` at `text-md` (16px). The difference is 2px / 11%. Sibling subheaders (Summary, Sections, Design Principles) under "What" are h3s, so they are nearly indistinguishable in weight from the h2 above them.

**Rule:** **Typography as Hierarchy** (principle 3). The point of three font families is also three (or more) clear size steps within each family.

**Fix shape:** Stretch the ratio. Modern type scales target ~1.25–1.33x between adjacent steps. Suggested rebalance in `Heading.tsx`:

- `h1: text-2xl (24px) font-semibold` — page title
- `h2: text-xl (22px) font-medium` — section
- `h3: text-md (16px) font-medium` — card title (unchanged)
- `h4: text-sm (13px) font-medium uppercase tracking-widest` — subsection / kicker

This also gives `AtomsPage`'s 12 stacked `h2`s more visual presence as section anchors.

### Theme 4 — The `max-w-5xl` content rail leaves the design system showcase feeling cramped

**Pattern:** `ShowcaseLayout` wraps the Outlet in `max-w-5xl` (~1024px). With a 240px sidebar visible on `lg+`, the actual content well on a 1440px display is ~720px wide — which is too narrow to show a `lg:grid-cols-6` Summary grid, a 3-col Sections grid, and code blocks side-by-side preview without crowding. On the `/ai` PDF capture, the empty left rail between the sidebar and content is the loudest visual element.

**Rule:** **IDE-Inspired** (principle 6) — IDEs use the full width because data-density depends on it. **Heuristic:** Nielsen #8, Aesthetic and minimalist design — minimalism is not minimal width.

**Fix shape:** Widen to `max-w-6xl` (1152px) on most pages, `max-w-prose` (~65ch) inside the manifesto reading column only. Reading-heavy pages should be narrow; reference pages should be wide. Right now both use the same width. A pattern from Tailwind's own docs and the Radix docs: `max-w-6xl` outer + `prose` constraint applied selectively per-component.

### Theme 5 — The 6 stat numbers on the home page push the 4% accent budget

**Pattern:** The Summary card renders six big `font-mono text-2xl font-bold text-accent` numbers (90+ / 10 / 18 / 19 / 7 / 40+) in one row. Each is large, bold, and saturated orange. Together they occupy more accent ink than the rest of the page combined.

**Rule:** **Monochromatic + Accent** (principle 1, 95/4/1 split). Six large accent numbers in a single row probably puts that block well over 4% of the visible ink.

**Fix shape:** Two options. Either (A) drop the numbers to `text-foreground` and keep only the labels with a quiet accent rule above (a tiny `bg-accent/10 text-accent` count indicator), or (B) keep the orange but reduce weight to `font-medium` and size to `text-xl`. (B) preserves the visual rhythm with less weight. The numbers are the right tokens semantically (data values → `font-mono`) — just less ink.

### Theme 6 — Design Principles list has duplicated content with the type scale

**Pattern:** Principle 3 on the home page reads "Three font families convey meaning: Display, Body, Mono." The Tokens page renders the same scale as a typography table. The Manifesto echoes "Three surfaces. One accent. Three fonts." The same three claims repeat on three pages without cross-linking.

**Rule:** **Source-of-truth ladder** (workflow conventions). Repetition is fine; uncoordinated repetition is not — when one statement changes the others drift.

**Fix shape:** Define the principle once (e.g., on `/tokens` or a dedicated `/principles`) and let the other pages link to it. The home-page card stays as a teaser, but its description becomes a one-line summary plus a "See typography tokens →" link. The Manifesto's rhetorical version stays as written — it's a rhetorical claim, not a spec.

### Theme 7 — Hero CTA button hierarchy could be clearer

**Pattern:** On the home page, the hero has three buttons: **Star on GitHub** (primary, dark fill), **Components** (outline), **Tokens** (outline). The two outline buttons look identical and compete for attention. A first-time visitor doesn't know which to click first.

**Heuristic:** Nielsen #6, Recognition rather than recall — affordances should signal priority.

**Fix shape:** Treat the three buttons as a priority cascade.

- Star on GitHub — keep primary (correct for "first action").
- Components — outline (primary navigation into the system).
- Tokens — `variant="ghost"` or rendered as a text link with an arrow (e.g., `<Link>Explore tokens →</Link>`). This demotes it from competing-with-Components to "and also".

Optionally: replace "Components" with the more specific "Browse components" and add a count badge ("10 atoms · 18 molecules") — it tells the visitor what's behind the click.

### Theme 8 — The "Three-File Architecture" cards and "Distribution" cards use different affordance vocabularies

**Pattern:** On `/ai`, the upper "Three-File Architecture" cards have a `View on GitHub ↗` text link at the bottom. The lower "Distribution" cards have a top-right arrow icon and no text link. Same surface (`bg-card` rounded border), different "click here" signal. A user can't tell whether either card is fully clickable.

**Heuristic:** Nielsen #4, Consistency and standards. **Rule:** Atomic discipline — these are the same molecule used twice; they should expose the same API.

**Fix shape:** Pick one shape. Recommend: make the whole card clickable (the entire `<Link>` covers the card), and put one signal — a top-right arrow that fades from 50% to 100% opacity on hover, matching the Sections cards on the home page. This unifies three card patterns across the site. The `View on GitHub` text link inside Three-File becomes redundant (the whole card already links there).

### Theme 9 — Theme toggle lacks status feedback and keyboard cue

**Pattern:** The `Warm / Dark / Light` segmented control in the topbar is a clear visual control, but it has no `aria-pressed` semantics visible in the PDFs and no visible focus ring described in the source. Active state is communicated by background only (the active item has `bg-foreground` or similar). For keyboard users navigating with Tab, the segmented control needs a clear ring.

**Rule:** **Accessible by Default** (principle 5, WCAG 2.1 AA). **Heuristic:** Nielsen #1, Visibility of system status.

**Fix shape:** Confirm the segmented control implements `role="radiogroup"` with `aria-checked` per item, has visible `focus-visible:ring-2 focus-visible:ring-accent` on each option, and that the active item has at least 3:1 contrast against its neighbours in all three themes. Add a screenreader-only "Theme:" label preceding the group.

### Theme 10 — `meta theme-color` and footer emojis leak across themes

**Pattern (theme-color):** `index.html` hardcodes `<meta name="theme-color" content="hsl(20, 14%, 4%)">` — the dark theme's background. On warm or light, the iOS Safari status bar and Chrome address bar will render dark while the page renders warm/light. **Pattern (emojis):** The footer reads `Made with ❤️ from 🇪🇸 by Mariano`. The project instructions explicitly state Claude should "Only use emojis if the person explicitly requests it" — and while that rule is for Claude's output, it also signals the brand voice. The emojis in the footer feel inconsistent with the IDE-inspired, restrained tone of every other surface.

**Rule:** **IDE-Inspired** (principle 6) — restrained, distraction-free. **Rule:** Three themes, no more — the theme-color should follow the active theme.

**Fix shape:** Extend `FaviconSync` to also update `<meta name="theme-color">` to `getComputedStyle(document.documentElement).getPropertyValue('--background')` formatted as an HSL string. Replace the footer emojis with text or a small Lucide icon (`<Heart />` filled in accent, with a "·" separator before "from Spain by Mariano"). Cleaner, theme-aware, on-brand.

### Theme 11 — No empty state for the Tokens search (P0 on filter UX)

**Pattern:** `TokensPage` filter input filters across all groups. The source has an empty state for "no matches", but the empty state itself uses `font-display text-sm` and `font-body text-sm` — fine, but it's a single static message ("No tokens match …"). There's no "did you mean" guidance and no suggested filter chips. For a tool aimed at AI agents and developers, common queries like "primary", "accent", "spacing", "radius" should be one click away.

**Heuristic:** Nielsen #6, Recognition rather than recall.

**Fix shape:** Below the search field, render 5–7 quick-filter chips: `accent`, `surface`, `mono`, `radius`, `space-4`, `category-*`, `status-*`. Clicking a chip sets the query. The empty state, when shown, should restate the chips: "Try one of these: accent · surface · …". This is small, on-brand (mono chips in monoline), and turns search from a guessing game into a guided experience.

### Theme 12 — The CONTACT block at the bottom of every page is the same and feels orphaned

**Pattern:** Every page ends with the same CONTACT block above the made-with-line. On long pages (Atoms, Tokens, AI Detail) the CONTACT block arrives after 12–20 sections, with only a single border-top above it. There's no visual closure — no "End of section" indicator, no return-to-top.

**Heuristic:** Nielsen #7, Flexibility — long pages need a way back to the top. Nielsen #4 — endings should signal endings.

**Fix shape:**

- Add a small "Back to top ↑" link inside the CONTACT block, right-aligned, that scrolls `#main-scroll` to top with `behavior: 'smooth'`. (You already have a `ScrollToTop` hook for route changes — extend it.)
- Add a "Was this page useful? Edit on GitHub →" link in the same row, pointing at the relevant repo file (`docs/components/atoms.md` for `/atoms`, etc.). This makes the design system feel maintained and inviting.
- Move the social/CONTACT block to a real **Footer** organism that lives outside `ShowcaseLayout`'s scroll container, not inside the per-page content. The current structure is fragile to long pages.

---

## Page-by-page punch list

Per page, the issues are sorted P0 → P1 → P2. Where a finding repeats a theme above, the theme number is cited.

### `/` (Overview)

- **P0** — 5-card asymmetric Sections grid (Exec #2). The first thing a designer notices.
- **P0** — Manifesto is sidebar-only; it's the strongest piece of writing on the site and the home page doesn't surface it.
- **P0** — Hero CTAs `Components` and `Tokens` compete (Theme 7).
- **P1** — Tagline reads *"Hand-crafted atomic design system for AI applications. Ready to integrate in your app and LLM."* — "your app and LLM" is grammatically odd ("LLM" should be plural or "any LLM"). Rewrite: *"Hand-crafted atomic design system for AI applications — ready to drop into your codebase and any LLM."*
- **P1** — Six accent stat numbers overload the budget (Theme 5).
- **P1** — Hero wordmark + topbar wordmark are both visible above the fold ("democrito v3" appears twice). Either hide the topbar wordmark on `/` only, or compress the topbar wordmark when the hero is in view (`IntersectionObserver`).
- **P1** — Sections card `...` ellipsis in the description string conflicts with `line-clamp-2`. Either remove the literal `...` from the data and rely on `line-clamp`, or remove `line-clamp` and keep the literal ellipsis.
- **P1** — Heading scale ratio too tight (Theme 3).
- **P2** — *"Open source · MIT License · Built with React + Tailwind + shadcn/ui"* meta line could use a real `<ul>` with separators rendered via CSS `::after` for proper screen-reader semantics.
- **P2** — The "What" h2 has no content immediately under it; "From design tokens to full-page layouts…" reads like a Why-style explanation, not a What. Consider promoting it inside the Summary grid as a single-line caption.

### `/manifesto`

- **P0** — Reading width is too wide. Line length is ~90–100 characters; ideal is 60–75. Wrap the body in `max-w-prose` (or `max-w-2xl`) for the manifesto specifically. The kicker labels (THE EVIDENCE, etc.) and the closing line can remain full-width.
- **P1** — The closing four paragraphs ("X is dead" through "concentrating into its most essential work") have no kicker label. Every other major movement has one (THE EVIDENCE, THE LAST TWELVE MONTHS, THE GAP, DEMOCRITO). Add: `WHAT IS HAPPENING INSTEAD` or `THE RESPONSE`.
- **P1** — Pull quote from Joel Lewenstein needs more visual weight. Currently inline. Consider rendering as a blockquote with a 2px-accent left border, `bg-surface`, slightly larger type (`text-md`), and italic-by-convention.
- **P1** — `MANIFIESTO` (Spanish) as the only Spanish word on the site — strange in an `lang="en"` document. Either (A) make it `MANIFESTO` (English), and keep the Spanish "Made with from Spain" line as a localisation moment, or (B) keep `MANIFIESTO` as a deliberate code-switch and mark it `<span lang="es">MANIFIESTO</span>` so screen readers pronounce it correctly.
- **P2** — The author signature `— Mariano Morera, founder` should be `font-mono text-xs` (matches the rest of the meta language) and right-align it for editorial weight.
- **P2** — Section dividers are full-width horizontal rules. Consider replacing with the kicker pattern from `AiDetailPage` (`<span>LABEL</span><div className="flex-1 border-t" />`) to align manifesto with the rest of the site's structural language.

### `/tokens`

- **P0** — Per-page meta still says "Atomic Design System for AI-Native Development" (Exec #4).
- **P0** — No quick-filter chips under the search (Theme 11).
- **P1** — Search placeholder is *"Filter tokens — name, class, or value (e.g. accent, p-4, rounded-md)…"* — long, runs past mid-width. Shorten to *"Filter tokens (accent, p-4, rounded-md, hsl…)"*.
- **P1** — The Swatch card uses `font-mono text-xs` for the token name but the MiniCopy buttons use `font-mono text-2xs`. The hierarchy is right (name > value), but the value buttons feel hard to scan. Consider raising MiniCopy to `text-2xs` (kept) but switching the swatch label to `text-sm` for better top-of-card weight.
- **P1** — `--success-bg`, `--success-border`, etc. share the same HSL as `--success` (they apply opacity modifiers via `@theme` definitions). The Tokens page doesn't show this relationship — they're rendered identically. Consider grouping the three under one swatch with three labels, or annotating "10% bg / 30% border" inline.
- **P1** — `Export tokens` button label could be more specific: `Export theme as JSON`. The exported filename already includes the theme slug — surface that in the label.
- **P2** — The Spacing showcase uses `p-1` through `p-16` rendered as boxes. The boxes don't currently visualise the relationship to the base unit (4px). Add a small caption: `space-1 = 4px = 0.25rem`.
- **P2** — No "Aliases" section explaining the relationship between Tailwind utility, CSS variable, and DTCG token path (the JSON export already maps them — surface this on screen too).

### `/atoms`

- **P0** — No on-page TOC (Exec #5).
- **P0** — Per-page meta missing (Exec #4).
- **P1** — Each `Section` is `bg-card` inside `bg-background`. With 12 stacked card-on-bg sections, the page reads as a single visual stripe. Consider alternating: section title outside a card, then a `bg-card` example container — but separate the title from the example with whitespace, not by wrapping both in a card. This makes the section list more scannable and aligns with the 3-surface hierarchy (title is on background, example is on card).
- **P1** — The `CodeBlock` at the bottom of each section renders the API contract (e.g., `<Button variant="..." size="..." />`). These are valuable but visually they look like the next section starting. Add a kicker label `API` or `PROPS` above each code block and put it inside the same card so it visually belongs to the section above it.
- **P1** — Some sections have `flex-wrap gap-3` for variant chips; others have `flex-wrap gap-2`; some `gap` values are inferred from defaults. Audit and normalise to a single gap token (suggest `gap-3` for example clusters, `gap-2` for chip clusters).
- **P2** — Add a "Copy as JSX" affordance on hover of any rendered example. The Tokens page has copy buttons; the Atoms page demos do not.
- **P2** — Disabled-state previews (Button, Input, Textarea) need `aria-disabled` and a tooltip explaining why disabled, even in showcase. Currently they look ambiguous.

### `/molecules`

(I didn't read the full page but the structure mirrors `/atoms`.)

- **P0** — No on-page TOC (Exec #5).
- **P0** — Per-page meta missing (Exec #4).
- **P1** — Same card-on-bg stripe pattern as `/atoms` — apply the same fix.
- **P1** — Molecules are by definition compositions of atoms. Each molecule's example should include a "Built from:" line linking to the constituent atoms (`Form Field → Label + Input + Help Text + Error`). This is the kind of cross-linking that turns a showcase into a teaching tool.
- **P2** — Add a "Common combinations" row below each molecule showing 2–3 real-world configurations (a Search Bar with filters, a Search Bar in a Top Bar context, etc.). Helps consumers see the molecule in use.

### `/organisms`

- **P0** — No on-page TOC (Exec #5).
- **P0** — Per-page meta missing (Exec #4).
- **P1** — Same card-on-bg stripe pattern — apply the same fix.
- **P1** — Organisms are the inflection point in atomic design where the system meets the product. Each organism showcase should include a small "Used in:" line listing which template (`AppShell`, `DashboardLayout`, etc.) uses this organism. This makes the atomic relationships explicit.
- **P2** — Some organisms (Onboarding Wizard, Settings Nav) have inherent state. Provide a "Reset state" button on the demo so visitors can re-experience the empty/initial state without reloading.

### `/templates` (currently `/pages`)

- **P0** — URL/label naming collision (Exec #1).
- **P0** — Per-page meta missing (Exec #4).
- **P1** — Templates are visual outcomes — they should each have a screenshot or live iframe preview, not just a description. Currently I infer the page is a list of layout names; for the casual visitor browsing, this is the most "show, don't tell" page on the site and should be the most visual.
- **P1** — Consider a category split: **Application templates** (App Shell, Dashboard, Editor, Library, Settings) vs. **Marketing templates** (Auth, Landing). The seven templates have heterogeneous purposes.

### `/ai`

- **P0** — Per-page meta missing (Exec #4).
- **P1** — The "registry.json ↗" link right-aligned below the install code block looks orphaned. Move it inline with the code block header (where `bash` is rendered) as a small link: `bash · registry.json ↗`.
- **P1** — Three-File / Distribution affordance vocabulary mismatch (Theme 8).
- **P1** — The card titles `CLAUDE.md`, `DESIGN.md`, `DESIGN_SYSTEM.md` use `font-mono` (correct — they're filenames). The subtitle (`Coding Rules` / `Design Philosophy` / `Token Inventory`) is in accent orange. The accent here is correct usage. But the body copy below uses `text-muted-foreground` — consider raising to `text-foreground` for the description's first line so the card hierarchy reads as filename → kicker → lead → detail.
- **P2** — The "AI Integration" page is the load-bearing pitch for the whole project. Consider adding a 3-line "outcome" statement near the top: *"What you'll have: any AI agent producing on-brand democrito code from a single prompt — across Claude, Lovable, and any future LLM."*

### `/ai/claude`

- **P0** — Per-page meta missing (Exec #4).
- **P1** — Section labels (`Claude.ai`, `Claude Code`, `Cowork`, etc.) use the kicker pattern (`<span>LABEL</span><border-t />`). Good. But the section bodies are long (the Claude.ai section alone has 6+ Notes and Steps). Each section should have a small TOC of its steps right after the kicker, so the visitor can see "Step 1, 2, 3, 4" before scrolling.
- **P1** — The breadcrumb "← AI Integration" is `font-body text-sm`. Consider `font-mono text-xs` to match the kicker family. Breadcrumbs are navigation metadata — mono is appropriate.
- **P1** — Code blocks have a `bash`/`text`/`json` label and a copy button. Copy button is `opacity-50 hover:opacity-100` — discoverable on hover but easy to miss on first viewing. Bump to `opacity-70` default; show the label "Copy" alongside the icon on hover.
- **P2** — Step numbers (1, 2, 3, …) use accent. Good. But the numbers within a sub-step (e.g., "The 3 confirmation questions") are inline in body text. Consider rendering the inline "3" as a `Code` or accent number consistently, so numbers always feel like a system, not prose.

### `/ai/vibe-coding`

- **P0** — Per-page meta missing (Exec #4).
- **P1** — Three platforms (Lovable · Stitch · Replit) bundled into one page. Either split into three sub-routes (`/ai/vibe-coding/lovable`, etc.) or provide tab navigation within the page. Right now visitors who only want Lovable have to scan past Stitch and Replit content.
- **P1** — If keeping bundled: add a sticky tab nav at the top of the page (`Lovable | Stitch | Replit`) using the kicker-as-tab pattern that scrolls smoothly to the section.

### `/ai/github`

- **P0** — Per-page meta missing (Exec #4).
- **P1** — The GitHub flow page should end with a clear "next step" CTA: a primary button "Fork on GitHub" or "Clone & customise". Currently the page tapers off into the standard CONTACT block.
- **P1** — Include a small badges row at the top: GitHub stars, MIT license, npm-or-skill version (whichever is canonical). Same row, same kicker treatment. Signals that the project is alive.

---

## Cross-cutting accessibility checks (WCAG AA)

These are gaps I can't fully resolve from source alone — they need a manual contrast audit in DevTools with the real computed colours per theme. Treat the list as "things to verify, not things proven broken."

- **Contrast: `accent` on `background` in warm theme.** Token reads HSL `18 60% 45%` on `30 18% 91%`. Approx contrast ratio ~3.8:1. **Passes AA for large text and UI components, fails AA for body text.** Confirm accent is never used on body copy ≤14px against background. The home page CTA button (`bg-foreground text-background`) is fine because it inverts. Watch the Sections card icon `text-accent` on `bg-accent/10` — likely below 3:1.
- **Contrast: `muted-foreground` on `background`.** Warm: HSL `20 6% 41%` on `30 18% 91%`. Approx 4.5:1 — passes AA for body text exactly. Tight margin. Don't reduce the lightness on the foreground side.
- **Focus rings.** Confirm every interactive primitive has a visible `focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background` (or equivalent). The `MiniCopy` button in TokensPage uses `focus-visible:outline-2 outline-accent` — different pattern than shadcn's default `ring-*`. Normalise to one approach across the system.
- **Reduced motion.** `index.css` has the standard `@media (prefers-reduced-motion: reduce)` block setting durations to 0.01ms. Good. Verify the `animate-ai-pulse`, `animate-ai-cursor`, `animate-caret-blink` keyframes all respect this — they look like they're via `--animate-*` tokens which the media query should catch. Spot-test in macOS Reduce Motion mode.
- **Touch targets.** Principle 5 promises 44×44px. Confirm the `MiniCopy` button (`h-6` = 24px) and the theme toggle individual options meet this on mobile (likely they currently don't — `h-6` is 24px).
- **`alt` attributes.** No images audited yet, but every Lucide icon used as an icon-only button (`SidebarTrigger`, theme toggle items, `MiniCopy`) needs `aria-label` or visually-hidden text. Confirm none are decorative-only-but-clickable.
- **`lang` attribute on Spanish strings.** "MANIFIESTO" sidebar label, "🇪🇸" reference in footer, "Made with ❤️ from 🇪🇸 by Mariano" — wrap Spanish content in `<span lang="es">` so screen readers switch pronunciation.

---

## Suggested implementation roadmap

Sequenced for impact-per-hour. Each phase is a single commit-able unit.

### Phase 1 — Naming + meta (P0, 2–3 hours)

1. Resolve Templates/Layouts/Pages naming (Exec #1).
2. Add `react-helmet-async` and per-page meta (Exec #4).
3. Fix `theme-color` to follow active theme.
4. Generate `sitemap.xml` and uncomment the `Sitemap:` line in `robots.txt`.

### Phase 2 — Home page hero + structure (P0, 3–4 hours)

5. Fix the 5-card Sections grid: add Manifesto card (Exec #2).
6. Demote `Tokens` CTA to ghost / text link (Theme 7).
7. Rewrite tagline to remove "your app and LLM" awkwardness.
8. Reduce the visual weight of the six accent stat numbers (Theme 5).

### Phase 3 — Typography + nav coherence (P1, 4–5 hours)

9. Rebalance `Heading.tsx` scale (Theme 3).
10. Invert sidebar typography hierarchy (Theme 2).
11. Resolve `Documentation` / `DESIGN` shape inconsistency (Theme 1).
12. Document the wordmark mono exception in `DESIGN.md` (Exec #3).

### Phase 4 — Long-page UX (P0, 3–4 hours)

13. Build the sticky TOC organism. Apply to Atoms, Molecules, Organisms, Templates (Exec #5).
14. Widen content well to `max-w-6xl` on showcase pages, keep `max-w-prose` on Manifesto (Theme 4).

### Phase 5 — Card affordance + last-pixel polish (P1, 2–3 hours)

15. Unify card affordance vocabulary (Theme 8).
16. Add quick-filter chips to Tokens search (Theme 11).
17. Footer cleanup — kill emojis, add Back to top + Edit on GitHub (Theme 10, 12).
18. Theme toggle a11y pass (Theme 9).

### Phase 6 — Accessibility verification (P1, 2 hours)

19. Run axe DevTools across all 9 URLs in all 3 themes.
20. Verify contrast targets, focus rings, touch targets.

**Total estimated effort:** 16–21 hours of focused work. Phase 1+2 alone (~5–7 hours) closes the most visible gaps before any public push.

---

## What I deliberately did not audit

For transparency:

- **Mobile breakpoint behaviour** — only the desktop captures were shared. The site's mobile sidebar (`Sheet` from shadcn) and stack-on-`sm` patterns weren't verified.
- **Performance / Core Web Vitals** — outside the brief (Vercel Speed Insights is already wired).
- **Component-level internal consistency** within each atom/molecule/organism — that's a separate component audit, not a heuristic site audit.
- **Copy proofreading** — caught the worst offender in the tagline; the manifesto reads well as-is.
- **The `kit-template/` directory** — unclear if it's a separate distribution surface or scaffolding.
- **Live computed contrast ratios** — flagged warm-theme `accent` and `muted-foreground` as ones to verify; couldn't measure without rendering.

If any of these are in scope, say which and I'll do a focused pass on that surface.

---

## Addendum — Card consistency across `/ai/claude`, `/ai/vibe-coding`, `/ai/github`

Added on follow-up request. The original Theme 8 covered the `/ai` overview cards (Three-File Architecture and Distribution). This addendum is about the **detail pages**: the card-like primitives used inside each platform walkthrough and whether they behave as a coherent system or as three pages built at three different moments.

### The shared primitive inventory

All three platform pages compose from the same four primitives, all defined at the top of `AiDetailPage.tsx`:

| Primitive | Surface | Visual signature | Intended role |
| --- | --- | --- | --- |
| **`Note`** | `bg-surface` rounded card with `font-mono` kicker label | Mid-density information block | Section-level context-setter ("What it is", "What to know before starting") |
| **`Step`** | NOT a card — flex layout with an accent-circle number + title + body | Procedural unit | Numbered walkthrough step |
| **`StepCode`** | `bg-muted` rounded block with `bg-surface` header strip and copy button | Code/CLI artifact | A code block, always inside a Step |
| **`Section`** | NOT a card — kicker label + horizontal rule | Visual section break | Groups related Steps under a heading |

The primitives are well-designed. The problem is they are **applied inconsistently across the three pages**, which produces small visual surprises that compound into "this page feels different from that page".

### Findings, by severity

#### F1 — `/ai/github` skips the `Section` wrapper entirely (P0)

`ClaudePage` and `VibeCodingPage` both organise their content into `<Section label="X">` blocks (4 Sections on Claude, 3 on Vibe Coding). The kicker label + horizontal rule above each section gives the page a strong scannable rhythm and a clear "you are here" signal for long-scroll content.

`GithubPage` goes from the page header straight into Step 1, Step 2, Step 3, Step 4, Step 5 — **no Sections at all**. The five steps run flat, which makes the page feel like one undifferentiated wall of content even though Step 2 alone is the largest block in the entire `/ai/*` subtree.

**Rule violated:** Atomic discipline — the `Section` molecule exists to do exactly this job; using it on two pages and not the third breaks the system. **Heuristic violated:** Nielsen #4, Consistency and Standards.

**Fix shape:** Wrap the GitHub steps in 2–3 Sections. Suggested grouping:

- `<Section label="Setup">` — Step 1 (Fork and clone).
- `<Section label="The instruction layer">` — Step 2 (the ecosystem table) + Step 3 (design context files).
- `<Section label="Brand and contribution">` — Step 4 (customise) + Step 5 (contribute).

This brings the GitHub page into the same structural shape as the other two and gives Step 2 its own kicker so visitors can navigate to it directly via a TOC (which you'll want anyway — see Exec #5 in the original audit).

#### F2 — The Vibe Coding "Applies to every tool" block re-implements `Note` inline instead of using the primitive (P0)

`VibeCodingPage` lines 1074–1113 render a custom block:

```tsx
<div className="space-y-4 rounded-md border border-border bg-surface p-5">
  <p className="font-mono text-2xs uppercase tracking-widest text-muted-foreground">
    Applies to every tool in this section
  </p>
  <div className="space-y-4">
    <div className="space-y-1">
      <p className="font-display text-sm font-semibold">DESIGN.md is the common layer</p>
      <P>...</P>
    </div>
    {/* + 2 more subsections */}
  </div>
</div>
```

This block has the exact same surface, padding, radius, border, kicker label treatment, and content style as `Note` — but it is hand-rolled. The three sub-blocks inside it (each a `font-display text-sm font-semibold` mini-heading followed by a `<P>`) are a pattern that doesn't exist elsewhere as a primitive.

**Rule violated:** Atomic discipline + Source-of-truth ladder. If the visual treatment ever changes, the `Note` primitive updates everywhere except here, and this block silently drifts.

**Fix shape:** Two clean options.

- **(A) Extend `Note` to accept a list of subsections.** Add an optional `items?: { title: string; body: React.ReactNode }[]` prop. The Vibe Coding block becomes `<Note label="Applies to every tool in this section" items={[…]} />`. Same primitive, one signature.
- **(B) Compose three `Note`s vertically in a `<div className="space-y-3">`.** Each Note carries its own kicker ("DESIGN.md is the common layer" / "Token mapping is always required" / "Each tool has a persistent knowledge layer"). This loses the "preamble" grouping but uses the primitive as-built.

(A) is closer to the current intent. (B) is simpler.

#### F3 — `Note` carries two different roles across pages, which confuses what a Note "means" (P0)

In `/ai/claude` and `/ai/vibe-coding`, Notes appear at the **top of each `Section`** as introductory context — always two of them, always labelled "What it is" + "What to know before starting". The convention is so consistent that a reader learns to expect it.

In `/ai/github` Step 2, Notes appear **inside a Step as content subdivisions** — four of them labelled "The current landscape" / "What democrito ships" / "What to add for the full ecosystem" / "The directory hierarchy". Same primitive, different role: not introductory context, but mid-procedure subdivision.

When the same molecule means two different things in two different contexts, the user can't predict its behaviour. This is the **molecule's API leaking**.

**Heuristic violated:** Nielsen #4 (consistency) and #6 (recognition rather than recall — the user has to remember which role applies where).

**Fix shape:** Pick one role for `Note` and rename or build a sibling for the other.

- Option A: `Note` stays as "section-level context-setter". The four GitHub Step 2 sub-blocks become a new primitive — `Callout` or `Aside` — visually similar (kicker + `bg-surface` block) but semantically reserved for within-Step subdivisions.
- Option B: `Note` becomes general-purpose "a labelled information block". Then the convention "Note appears at the top of a Section" becomes a usage rule, not a primitive constraint. Document this in the Note JSDoc.

(A) is the cleaner long-term answer (one primitive = one job, the molecular ideal). (B) is the faster ship.

#### F4 — The table inside GitHub Step 2 violates the 3-surface hierarchy (P0)

`GithubPage` lines 794–830 render a comparison table **inside a Note**. The Note is `bg-surface`. The table header row is also `bg-surface`. The table body rows are `bg-background`.

Walking the surface stack from the page in: page = `bg-background`, Note = `bg-surface`, table rows = `bg-background`. **The body rows are stepping back to the page background, which makes the table look "punched through" the Note rather than nested inside it.**

**Rule violated:** **3-Surface Hierarchy** (principle 2). Background → Surface → Card. Surface containing Background creates a depth ambiguity — is the table behind or in front of the Note?

**Fix shape:** The table inside a `bg-surface` Note should use `bg-card` for body rows. The current colour assignments:

```tsx
<tr className="border-b border-border bg-surface">   {/* header */}
<tr className="bg-background">                       {/* body — WRONG */}
```

become:

```tsx
<tr className="border-b border-border bg-surface">   {/* header — unchanged */}
<tr className="bg-card">                             {/* body — fixed */}
```

This produces a clean stack: page background → Note surface → table-row card. Same surface order as a Sections card sitting on the page, applied recursively one level deeper. The page now visualises depth correctly.

#### F5 — `StepCode` uses `bg-muted` for its body, which is a fourth implicit surface (P1)

`StepCode` body is `bg-muted`. That maps to `--muted` (`HSL 25 12% 88%` in warm). The page renders: `bg-background` (91% lightness) → Note `bg-surface` (94%) → StepCode body `bg-muted` (88%). The muted is **darker than the background**, which inverts the normal "deeper = lighter or darker?" question the system answers everywhere else (cards are usually slightly lighter to lift forward).

**Rule:** **3-Surface Hierarchy** (principle 2) — only 3 surface levels. `bg-muted` is technically a different role (form-control fill) but here it's used as a fourth surface for code.

**Fix shape:** Either:

- **(A) Use `bg-card` for StepCode body** (lighter than surface, consistent with the rest of the hierarchy). Code reads as a card-on-surface.
- **(B) Keep `bg-muted` but document it as a deliberate "code surface".** Add it to `DESIGN.md` as a named exception: *"`bg-muted` may be used for inline and block code surfaces, where the darker fill carries a 'this is data' signal in parallel with `font-mono`."* This is defensible — code blocks reading as visually distinct from prose is intentional, and the darker tone reads as "terminal-adjacent".

I'd recommend (B). The current rendering is actually nice — but it must be named, otherwise contributors will keep stumbling into "why is this surface darker?".

#### F6 — Page header titles use three different grammatical patterns (P1)

- `/ai/claude`: **"Using democrito with Claude"**
- `/ai/github`: **"democrito on GitHub"**
- `/ai/vibe-coding`: **"Using democrito with Vibe Coding Tools"**

Two start with "Using democrito with…", one starts with "democrito on…". For three sibling pages reached from the same `/ai` index, the inconsistency is visible the moment a visitor opens two tabs.

**Heuristic violated:** Nielsen #4. **Rule:** IDE-Inspired — IDE-style products use rigorously consistent labels.

**Fix shape:** Pick a pattern and apply to all three.

- Pattern A — narrative: "Using democrito with Claude" / "Using democrito with Lovable, Stitch, and Replit" / "Using democrito with GitHub".
- Pattern B — terse, on-brand for mono lowercase: "democrito + Claude" / "democrito + Vibe Coding" / "democrito + GitHub". The `+` reads as code, fits the IDE aesthetic, and the lockup is distinctive.

I'd recommend (B) — it scales better if a fourth platform page ever appears, and it visually echoes the mono wordmark treatment.

#### F7 — Page header badges carry three different semantic meanings under the same chip (P1)

- `/ai/claude`: badge reads **"Anthropic"** (the company that makes the tool)
- `/ai/github`: badge reads **"Open Source"** (the distribution model)
- `/ai/vibe-coding`: badge reads **"Vibe Coding"** (the category of tool)

All use `<Badge variant="outline" className="font-mono text-xs">`, so visually they're identical. But a user who sees "Anthropic" on the Claude page learns "this badge tells me the company" — and then is confused when GitHub's badge says "Open Source" (not a company) and Vibe Coding's says "Vibe Coding" (not the company either — Lovable, Stitch, and Replit are different vendors).

**Heuristic violated:** Nielsen #2, Match between system and the real world — a visual signifier should always signify the same kind of thing.

**Fix shape:** Pick one semantic role for the badge and apply it consistently. Two coherent options:

- **(A) Badge = platform category.** "AI Agent" (Claude) / "Vibe Coding" (Lovable/Stitch/Replit) / "Source Control" (GitHub). Same category-of-tool meaning everywhere.
- **(B) Badge = vendor.** "Anthropic" (Claude) / "Lovable · Stitch · Replit" (Vibe Coding — note: the "/ai" index card already uses this pattern!) / "GitHub" (the platform itself, since the entry is for the platform).

(B) is more concrete and matches the `/ai` overview's Distribution cards which already list "Lovable · Stitch · Replit" as the subtitle. Consistency between index and detail pages is its own win.

#### F8 — The `Step` number circle is visually identical to the home page's principle number (P2 — taste call)

`Step` uses `flex h-6 w-6 rounded-full bg-accent/10 font-mono text-2xs font-bold text-accent`. `OverviewPage.tsx` line 145 uses the **exact same** classes for the principle numbers in the Design Principles grid.

This isn't wrong — both contexts want an ordered/enumerated marker. But the principle numbers (1–6 in a grid, unordered enumeration) and the Step numbers (1–5 in a procedure, strictly ordered) carry different meanings. Visually they're identical.

**Fix shape:** This is fine to leave as-is. If you want to differentiate, give procedural Steps a stronger affordance: solid `bg-accent text-accent-foreground` instead of `bg-accent/10 text-accent`. Procedural steps deserve more visual weight than principle markers — they're action-oriented. Lift the `Step` number to solid accent; leave principle numbers as the lighter tint.

### Card consistency scorecard

| Concern | `/ai/claude` | `/ai/github` | `/ai/vibe-coding` |
| --- | --- | --- | --- |
| Uses `Section` wrapper | ✅ | ❌ (F1) | ✅ |
| `Note` used only as section preamble | ✅ | ❌ (F3) | ✅ |
| Custom card primitives | None | None | "Preamble" block (F2) |
| 3-surface hierarchy respected | ✅ | ❌ (F4 — table) | ✅ |
| Header title grammar | "Using…" | "democrito on…" | "Using…" |
| Header badge semantic | Vendor | Distribution model | Tool category |

### Recommended order of attack

If you're going to touch this code, do it in this order for compounding wins:

1. **F4 — Fix the table surface mismatch.** 2-line change. Eliminates a real depth bug.
2. **F1 — Wrap GitHub steps in 2–3 Sections.** ~10 minutes. Brings the three pages into the same structural shape; unlocks future TOC support.
3. **F2 — Replace the inline Preamble with the `Note` primitive (option B: three stacked Notes).** ~10 minutes. Eliminates one custom block; aligns with atomic discipline.
4. **F6 + F7 — Unify page header title and badge patterns.** ~5 minutes. Small but compounds into "the three pages feel coordinated" the moment a visitor compares them.
5. **F3 — Decide on `Note`'s single role and either rename the GitHub Step 2 sub-blocks to a new `Callout` primitive, or document `Note` as general-purpose.** Bigger decision; can wait.
6. **F5 — Decide on `bg-muted` for code (rename or replace).** Even bigger decision; ties into how `DESIGN.md` describes the surface system. Can wait.
7. **F8 — Optional: lift Step number to solid accent.** Cosmetic.

Total time for items 1–4: ~30 minutes. Items 5–6 are real architectural decisions worth a separate sit-down.

---

*Audit produced 2026-05-16. Card-consistency addendum added on follow-up request, same date. Source-of-truth ladder: repo HEAD → uploaded PDF captures (warm theme, three URLs) → live URL meta. Where source and live diverged on visual rendering, the PDF capture wins (it shows actual rendered state).*
