# Web Presentation Layer — Change Requests 2026-05-11

Claude Code session doc. 5 CRs for the democrito.design showcase app.
Run from `~/Desktop/apps/democrito/app-democrito`.

---

## CR-1 — Overview hero subtitle

**File:** `src/pages/OverviewPage.tsx`

Find and replace the hero subtitle string:

```
BEFORE:
"A minimal, monochromatic, hand-crafted atomic design system for data-dense, IDE-inspired applications. Ready to integrate in your app."

AFTER:
"Hand-crafted atomic design system for AI applications. Ready to integrate in your app and LLM."
```

No other changes to the hero section.

---

## CR-2 — KPI stat cards: add Summary title + strip descriptions

**File:** `src/pages/OverviewPage.tsx`

Two sub-tasks:

### 2a — Add "Summary" section title
Above the stat cards grid, add a section heading. Use the same heading style/component used for other section titles on the page (e.g., "Explore", "Design Principles", "Getting Started"). The heading text is exactly: `Summary`.

### 2b — Strip description text from every stat card
Each stat card currently renders three elements: a **count** (number in accent color, font-mono), a **label** (font-display), and a **description** (small muted body text). Remove the description element from every card. Keep only count + label.

The 6 cards and what to keep (count + label only):
1. `90+` / `Design Tokens`
2. `10` / `Atoms`
3. `16` / `Molecules`
4. `19` / `Organisms`
5. `7` / `Pages`  ← label already says "Templates" — change label to "Pages" here too (aligned with CR-4)
6. `48` / `UI Primitives`

---

## CR-3 — Explore section: fix sub-text + line-clamp

**File:** `src/pages/OverviewPage.tsx`

### 3a — Update Explore card descriptions to match actual page section headings

The Explore section currently has 6 cards. After CR-4, the "Pages" card is removed and the "Templates" card becomes "Pages". Apply both changes here simultaneously.

**Final Explore card list (5 cards):**

| Card title | Route | New description |
|---|---|---|
| Tokens | `/tokens` | `Colors, Typography, Spacing, Radius, Shadows, Breakpoints` |
| Atoms | `/atoms` | `Button, Input, Textarea, Badge, Tag, Typography, Avatar, Spinner, Tooltip, Link, ...` |
| Molecules | `/molecules` | `Form Field, Search Bar, Stat Card, Tab Nav, Empty State, Avatar Group, ...` |
| Organisms | `/organisms` | `Top Bar, Filter Bar, Data Table, Activity Feed, Onboarding Wizard, Settings Nav, ...` |
| Pages | `/pages` | `App Shell, Dashboard, Editor, Library, Detail View, Settings, Auth, ...` |

Remove the existing "Pages" card (the one that pointed to `/pages` with text "Dashboard Demo") entirely.

**Rationale:** The old Atoms description showed barrel-export names (Logo, Heading, Text…) instead of the section headings a user sees when they land on `/atoms` (Button, Input, Textarea…). All cards now reflect what users actually see on the destination page.

### 3b — Add line-clamp-2 to all Explore card description elements
Add Tailwind class `line-clamp-2` to the `<p>` or `<Text>` element rendering the grey description inside each Explore card. This enforces a consistent 2-line height with `...` truncation across all cards regardless of description length.

---

## CR-4 — Nav restructure: Templates → Pages, remove old Pages

**Files:** `src/components/AppSidebar.tsx`, `src/App.tsx`, `src/pages/PagesPage.tsx`

### 4a — AppSidebar.tsx
1. Find the nav item with label `"Templates"` (route `/templates`) and change:
   - label: `"Templates"` → `"Pages"`
   - href/to: `/templates` → `/pages`
2. Find the nav item with label `"Pages"` (route `/pages`) and **delete it entirely** from the nav array.

Final nav order (8 → 7 items):
```
Overview  /
Tokens    /tokens
Atoms     /atoms
Molecules /molecules
Organisms /organisms
Pages     /pages       ← was "Templates" at /templates
AI        /ai
```

### 4b — App.tsx
1. Change the route that renders `<TemplatesPage />` from path `/templates` to path `/pages`.
2. **Remove** the route that renders `<PagesPage />` (path `/pages`).
3. Optionally add a `<Navigate from="/templates" to="/pages" replace />` redirect so old links don't 404.
4. Remove the `import PagesPage` statement.

### 4c — Delete PagesPage.tsx
Delete `src/pages/PagesPage.tsx`. It is no longer used.

### 4d — Update TemplatesPage.tsx page header
Open `src/pages/TemplatesPage.tsx`. The page renders a `<PageHeader>` or similar component at the top with title `"Templates"`. Change the title to `"Pages"`.

---

## CR-5 — Getting Started section: content review + AI CTA

**File:** `src/pages/OverviewPage.tsx`
**Reference files to read first:** `CLAUDE.md`, `package.json`, `README.md` (if exists)

### 5a — Content accuracy review
Before editing, read `CLAUDE.md` and `package.json` to confirm the current stack. Then review the Getting Started section in `OverviewPage.tsx` for accuracy:

- The install/clone command must match the actual repo URL from `package.json` or CLAUDE.md.
- Any reference to `tailwind.config.ts` must be removed — that file was deleted in v3.1.0; Tailwind v4 is CSS-first, configured in `src/index.css` via the `@theme` block.
- Any mention of `npm` is fine; if `bun` is referenced, keep it as bun is the primary runtime.
- The AI context file references (`CLAUDE.md`, `DESIGN.md`, `DESIGN_SYSTEM.md`) should all be present — confirm they exist in the repo root before listing them.
- Remove any copy that no longer reflects the current architecture.

### 5b — Add CTA to AI page
At the end of the Getting Started section (after the existing GitHub Star and Contact Creator buttons, or as its own subsection), add a CTA card or button group linking to the AI page. Use this copy:

```
Heading: "AI-Ready by Design"
Body: "democrito ships structured AI context files so every LLM produces on-brand output — no prompt engineering required."
CTA button: "Explore AI Integration →"  → links to /ai
```

Use the same visual style as the existing "GitHub Star" / "Contact Creator" buttons, or a small card variant if that fits better. Keep it visually light — this is a secondary CTA, not a hero.

---

## CR-L — Logo: theme-aware image switching

**Files:** `src/components/atoms/Logo.tsx`, `src/assets/` (copy step), `public/` (favicon copy step)

### Background
Two logo variants already exist in `~/Desktop/apps/democrito/logo/`:
- `logo-dark.png` — for the dark theme
- `logo-light-warm.png` — for light and warm themes
- `favicon-dark.png` — dark favicon
- `favicon-light-warm.png` — light/warm favicon

The Logo component currently renders a single static `logo-mark.png` with no theme awareness.

### L1 — Copy assets into the app
```bash
cp ~/Desktop/apps/democrito/logo/logo-dark.png      src/assets/logo-dark.png
cp ~/Desktop/apps/democrito/logo/logo-light-warm.png src/assets/logo-light-warm.png
cp ~/Desktop/apps/democrito/logo/favicon-dark.png      public/favicon-dark.png
cp ~/Desktop/apps/democrito/logo/favicon-light-warm.png public/favicon-light-warm.png
```

### L2 — Update Logo.tsx
Read `src/components/atoms/Logo.tsx` and `src/components/ThemeToggle.tsx` (or wherever the theme context/hook lives — likely a `useTheme` hook). Then update `Logo.tsx` to:

1. Import both logo variants: `import logoDark from '../assets/logo-dark.png'` and `import logoLightWarm from '../assets/logo-light-warm.png'`.
2. Use the same theme detection pattern as ThemeToggle to read the current theme value.
3. Derive the correct src: `const logoSrc = theme === 'dark' ? logoDark : logoLightWarm`.
4. Keep the `size` prop, `className` passthrough, and `alt` attribute unchanged.

### L3 — Favicon (optional, same session)
For the favicon, the cleanest approach is a `<link rel="icon">` swap in `index.html` or via a `useEffect` in the root layout that mirrors the logo logic. If the project already has a theme-aware favicon mechanism, extend it. If not, add this to `ShowcaseLayout.tsx` or the root component:

```tsx
useEffect(() => {
  const link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (link) {
    link.href = theme === 'dark' ? '/favicon-dark.png' : '/favicon-light-warm.png';
  }
}, [theme]);
```

---

## CR-6 — Use Cases page + Overview CTA cards

**New file:** `src/pages/UseCasesPage.tsx`
**Modified files:** `src/App.tsx`, `src/components/AppSidebar.tsx` (optional), `src/pages/OverviewPage.tsx`

### 6a — New route in App.tsx
Add route: `<Route path="/use-cases" element={<UseCasesPage />} />`.
Add import: `import UseCasesPage from './pages/UseCasesPage'`.
Do NOT add Use Cases to the sidebar nav — it is accessed via the Overview CTA cards only.

### 6b — Overview: Use Cases CTA section
In `OverviewPage.tsx`, immediately after the Getting Started section (and the AI CTA added in CR-5), add a new "Use Cases" section using the same card grid style as the Explore section.

**Section heading:** `Use Cases`
**Section sub-heading (optional, muted):** `Three real projects. Full implementation decisions — from the problem through the token overrides.`

**3 cards** (icon + title + description, links to /use-cases with hash anchor):

| Icon (Lucide) | Title | Description | Link |
|---|---|---|---|
| `Code2` | Solo Developer | Building an AI prompt library with Lovable + Claude Code. Violet accent, dark-first, mono-heavy. | `/use-cases#solo-developer` |
| `BarChart3` | Two-person Startup | Building a developer observability dashboard. Blue accent, professional dual-theme. | `/use-cases#startup` |
| `Workflow` | Growth Engineer | Building an internal AI ops platform. Amber accent, dark warm, optimised for sustained use. | `/use-cases#growth-engineer` |

Apply `line-clamp-2` to card descriptions. Use the same hover style (arrow reveal) as the Explore cards.

### 6c — UseCasesPage.tsx
Create `src/pages/UseCasesPage.tsx`. Apply all democrito design system rules strictly:
- `font-display` for all headings and structural labels
- `font-body` for all paragraph/description text
- `font-mono` for all code blocks, token names, CSS property names, and bash commands
- Surface hierarchy: page uses `bg-background`, info sub-cards use `bg-card`
- All colors via CSS custom properties only — no inline hex or HSL values
- Use existing atoms and molecules: `Heading`, `Text`, `CodeBlock`, `Tag`, `Badge` where appropriate
- Use shadcn/ui `Card`, `CardHeader`, `CardContent`, `Separator` for structure

**Page header:**
- Title: `Use Cases`
- Subtitle: `Real projects. Real implementation decisions. Each guide covers the full journey — from the problem through the token overrides.`

---

**Structure for each of the 3 use case sections** (repeat this pattern):

```
<section id="{anchor}">
  <Badge>Persona {N}</Badge>
  <Heading level="h2">{Title}</Heading>
  <Text muted>{sub-description}</Text>

  <div class="3-col grid of info cards (bg-card)">
    Card 1: "The situation"    — body text
    Card 2: "What changes"     — body text  
    Card 3: "The real value"   — body text
  </div>

  <Card class="bg-surface, border, full-width">
    "The challenge" — body text (honest limitation, slightly different visual weight)
  </Card>

  <Heading level="h3">Implementation Guide</Heading>

  For each step (numbered):
    <Text class="font-display, step number + title">Step N — {title}</Text>
    <Text class="font-body">{explanation text}</Text>
    <CodeBlock language="bash|css|tsx">{code}</CodeBlock>
```

---

**Section 1** — `id="solo-developer"`
- Badge: `Persona 1`
- H2: `Solo developer building an AI tool`
- Sub: `Lovable + Claude Code · Violet accent · Dark-first · Mono-heavy`

**Info cards:**

*The situation:* A developer builds a prompt library app — users save, tag, and run prompts. Three weeks in: buttons look different between screens, sidebar uses a different gray than cards, one section uses Inter and another uses system-ui. Nothing broken. Everything slightly off. Fixing it means auditing every component manually.

*What democrito changes:* Install via shadcn CLI. Every Lovable prompt and Claude Code generation reads `CLAUDE.md` and `DESIGN.md` first. The agent knows: use `bg-surface` not `bg-gray-800`, use `font-mono` for all user content, never add a fourth surface level. New generations land on-system by default, not by coincidence. Existing inconsistencies resolve in a single Claude Code pass because the correct tokens are now defined and named.

*The real value:* Visual consistency becomes a property of the toolchain, not a discipline the developer maintains manually. For a solo builder, that's the difference between a product that looks considered and one that looks AI-generated.

**Challenge card:** This only works if the developer installs democrito before significant UI is built — or is willing to do a token migration pass after. With three weeks of hardcoded values, the install doesn't fix anything retroactively. democrito requires buy-in at the start, or a refactor cost upfront. The value is real, but the adoption window is narrow.

**Implementation guide steps:**

Step 1 — Install democrito
```bash
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito
```
*Caption:* Drops 70+ CSS custom properties into your project and wires up Tailwind v4's `@theme` block. Root is warm by default — you'll override it in Step 2.

Step 2 — Override tokens in `src/index.css`
```css
/* src/index.css — custom theme: dark violet */
:root {
  --background: 240 12% 5%;
  --surface:    240  8% 9%;
  --card:       240  6% 14%;

  --foreground:        240 15% 96%;
  --muted-foreground:  240  6% 58%;
  --foreground-subtle: 240  4% 42%;

  --accent:            262 70% 62%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      262 45% 38%;
  --accent-subtle:     262 20% 12%;

  --primary:            240 15% 88%;
  --primary-foreground: 240 12% 5%;

  --secondary:            240 8% 18%;
  --secondary-foreground: 240 15% 96%;

  --muted:            240 8% 13%;
  --muted-foreground: 240 6% 58%;

  --border: 240 8% 22%;
  --input:  240 8% 18%;
  --ring:   262 70% 62%;

  --radius: 0.375rem;
  --header-height:  3rem;
  --sidebar-width:  13rem;
  --right-panel:    26rem;
}
```
*Caption:* Replace `:root` entirely. You're overriding variables only — no component files touched. Violet (`262 70% 62%`) replaces terracotta. Wider right panel (`26rem`) for prompt preview context.

Step 3 — Update fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
}
```
*Caption:* Collapse display and body to Inter — maximises density. Keep JetBrains Mono for all prompt content.

Step 4 — Update `CLAUDE.md` and `DESIGN.md`
```markdown
## Design Tokens (this project's overrides)
- Accent: violet (`--accent: 262 70% 62%`) — not terracotta
- Theme: dark-first (`:root` is dark, no warm default)
- Radius: tight (`--radius: 0.375rem`)
- Font-display and font-body: Inter
- Font-mono: JetBrains Mono — used for ALL prompt content, variables, inputs
- Right panel: 26rem (wider than default — prompt preview context)
```
*Caption:* This is the step most developers skip and later regret. Without it, AI agents revert to terracotta and warm stone on the next generation.

Step 5 — Install shadcn components on top
```bash
npx shadcn@latest add button card input textarea badge separator
```
*Caption:* Components pick up token overrides automatically. No additional configuration.

---

**Section 2** — `id="startup"`
- Badge: `Persona 2`
- H2: `Two-person startup building a developer dashboard`
- Sub: `Blue accent · Professional dual-theme · Dark default + light opt-in`

**Info cards:**

*The situation:* Two engineers building an observability platform — logs, traces, metrics, query interface. No designer. Using shadcn/ui directly: default theme, default radius, default slate grays. The product works. It also looks identical to fifty other dev tools built on shadcn defaults. A potential enterprise customer says during a demo: "looks like a prototype." They're not wrong.

*What democrito changes:* Warm stone replaces slate grays. Terracotta replaces the default blue accent. The three-surface hierarchy gives dense data views genuine depth without visual complexity. The font stack — display for nav and headings, mono for all data values and table cells — immediately makes the product feel designed for reading data, not adapted from a generic template. None of this required a designer. One CLI command and one theme pass.

*The real value:* Visual differentiation at zero design headcount. For a two-person team in a crowded space, looking deliberate is a signal — to users, to investors, to the enterprise buyer comparing three tools.

**Challenge card:** The warm-industrial aesthetic is a bet. An enterprise buyer in financial services or healthcare might read "warm stone and terracotta" as quirky rather than professional. democrito is high-conviction on one aesthetic direction. If that direction doesn't match the product's context, the theming system helps, but it doesn't fully escape the warm-industrial bias.

**Implementation guide steps:**

Step 1 — Install democrito
```bash
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito
```
*Caption:* After install, your existing shadcn components shift to the warm default. You're about to override it — don't panic at the terracotta.

Step 2 — Override tokens for dark and light themes
```css
/* :root — dark default */
:root {
  --background: 222 16% 6%;
  --surface:    222 12% 10%;
  --card:       222 10% 15%;

  --foreground:        210 20% 94%;
  --muted-foreground:  215 8% 55%;
  --foreground-subtle: 215 6% 40%;

  --accent:            217 91% 60%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 60% 35%;
  --accent-subtle:     217 20% 12%;

  --primary:            210 20% 88%;
  --primary-foreground: 222 16% 6%;

  --secondary:            222 10% 18%;
  --secondary-foreground: 210 20% 94%;

  --muted:            222 10% 13%;
  --muted-foreground: 215 8% 55%;

  --border: 222 10% 22%;
  --input:  222 10% 15%;
  --ring:   217 91% 60%;

  --radius: 0.5rem;
  --sidebar-width:      12.5rem;
  --sidebar-collapsed:  3.5rem;
}

/* .light — enterprise customers preferring light mode */
.light {
  --background: 210 20% 98%;
  --surface:    210 15% 97%;
  --card:       0 0% 100%;

  --foreground:        222 20% 12%;
  --muted-foreground:  215 8% 45%;
  --foreground-subtle: 215 6% 60%;

  --accent:            217 85% 50%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 50% 70%;
  --accent-subtle:     217 30% 94%;

  --primary:            222 20% 12%;
  --primary-foreground: 210 20% 98%;

  --secondary:            210 12% 93%;
  --secondary-foreground: 222 20% 12%;

  --muted:            210 12% 93%;
  --muted-foreground: 215 8% 45%;

  --border: 215 10% 88%;
  --input:  215 10% 88%;
  --ring:   217 85% 50%;

  --radius: 0.5rem;
  --sidebar-width: 12.5rem;
}
```
*Caption:* Cascade order in `@layer base` matters: `:root` first, `.dark` second, `.light` third.

Step 3 — Update fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", Consolas, monospace;
}
```
*Caption:* Inter for everything structural. IBM Plex Mono for all data values — log lines, trace IDs, metrics, table cells, timestamps.

Step 4 — Update CLAUDE.md
```markdown
## Design Tokens (this project's overrides)
- Theme: dark default (`:root`), light opt-in (`.light` class on `<html>`)
- Accent: electric blue (`--accent: 217 91% 60%`) — not terracotta
- Radius: 0.5rem
- Font-display / font-body: Inter
- Font-mono: IBM Plex Mono — ALL data values, log output, trace IDs,
  metric numbers, table cells, timestamps
- Sidebar: 12.5rem (narrower — more canvas space for data)
```

Step 5 — Theme toggle wiring
```tsx
// Add to TopBar or settings
const toggleTheme = () => {
  document.documentElement.classList.toggle('light')
}
```
*Caption:* democrito's cascade handles the rest. No additional CSS needed.

---

**Section 3** — `id="growth-engineer"`
- Badge: `Persona 3`
- H2: `Growth engineer building an internal AI ops platform`
- Sub: `Amber accent · Dark warm · Optimised for sustained use`

**Info cards:**

*The situation:* A growth engineer at a 20-person company builds an internal tool: a dashboard where the team monitors AI-generated content, flags low-quality outputs, and manually reviews edge cases. Used eight hours a day by five people. The tool works but nobody enjoys using it. Sessions are tiring. Everything is the same visual weight — no hierarchy, no depth. After two hours of reviews the eyes have nowhere to rest.

*What democrito changes:* The 3-surface hierarchy gives reviewers a clear spatial map: sidebar is `bg-surface`, content area is `bg-background`, flagged items appear on `bg-card`. Without adding complexity, the interface communicates structure through depth. The mono font for all AI-generated content creates immediate visual distinction from structural UI elements — the thing you're looking at versus the thing you're looking through.

*The real value:* Reduced cognitive load in sustained, high-density work sessions. This is the use case democrito is most specifically designed for — where the "IDE-inspired, not consumer-grade" principle cashes out in practice. The value is ergonomic, not aesthetic.

**Challenge card:** This value is hard to measure and harder to attribute. The engineer who builds this tool won't write "democrito reduced review fatigue" in a success metric — they'll just notice fewer complaints from the team. That's real, but diffuse. democrito currently has no evidence base for this claim beyond first-principles reasoning. For the positioning to be defensible at scale, this use case needs testimonials or measured outcomes.

**Implementation guide steps:**

Step 1 — Install democrito
```bash
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito
```
*Caption:* Out of the box, warm theme is already close to what you need. You're making targeted adjustments rather than a full override.

Step 2 — Tune the warm theme for sustained reading
```css
/* src/index.css — :root tuned for review context */
:root {
  /* Darker than default warm — reduces eye strain over long sessions */
  --background: 25 10% 12%;
  --surface:    25  8% 16%;
  --card:       25  6% 21%;

  --foreground:        30 12% 92%;
  --muted-foreground:  25  5% 58%;
  --foreground-subtle: 25  3% 42%;

  /* Amber — less aggressive than terracotta, better for attention states */
  --accent:            38 80% 55%;
  --accent-foreground: 25 10% 8%;
  --accent-muted:      38 50% 35%;
  --accent-subtle:     35 20% 16%;

  --primary:            30 12% 86%;
  --primary-foreground: 25 10% 8%;

  --secondary:            25 8% 22%;
  --secondary-foreground: 30 12% 92%;

  --muted:            25 8% 18%;
  --muted-foreground: 25 5% 58%;

  --border: 28 8% 28%;
  --input:  28 8% 22%;
  --ring:   38 80% 55%;

  --radius: 0.5rem;
  --header-height:  3rem;
  --sidebar-width:  13.5rem;
  --right-panel:    28rem;
}
```
*Caption:* Shifting warm default from light (cream) to darker warm is the single most impactful change for reducing review fatigue. The aesthetic stays warm-industrial; the surfaces become workstation-grade.

Step 3 — Update fonts
```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');

@theme {
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body:    "IBM Plex Sans", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
}
```
*Caption:* Plus Jakarta Sans for structural labels. IBM Plex Sans for descriptions — slightly more readable at sustained reading distances. JetBrains Mono for all AI-generated content under review.

Step 4 — Update CLAUDE.md
```markdown
## Design Tokens (this project's overrides)
- Theme: dark warm (`:root` overridden — darker surfaces than democrito default)
- Accent: amber (`--accent: 38 80% 55%`) — used for flagged/attention states
- Radius: 0.5rem
- Font-display: Plus Jakarta Sans (nav, headings, structural labels)
- Font-body: IBM Plex Sans (descriptions, filter labels, non-data text)
- Font-mono: JetBrains Mono — CRITICAL: all AI-generated content being
  reviewed MUST use font-mono. This creates visual separation between
  the tool's UI (which reviewers look through) and the content
  (which reviewers look at). Never use font-body for content under review.
- Right panel: 28rem (wider — review metadata lives here)
```
*Caption:* The font-mono rule for reviewed content is specific to this tool's purpose. Write it explicitly — an AI agent won't infer it.

---

## Running order (updated)

```
1. CR-4   — route cleanup first (avoids 404s during dev)
2. CR-L   — logo assets copy + Logo.tsx update (quick, no dependencies)
3. CR-1 + CR-2 + CR-3  — single pass on OverviewPage.tsx
4. CR-5   — Getting Started review (reads CLAUDE.md first)
5. CR-6   — Use Cases page (new file + Overview CTA cards)
```

All changes are in `app-democrito/`. No design token changes — all edits are JSX/TSX content, routing, and one asset copy.
