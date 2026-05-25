# Claude Code prompts — frontend fixes v3.3

Branch: `fix/frontend-fixes-v3.3`
Repo root: `~/Desktop/apps/democrito/app-democrito`
Run these prompts sequentially. Each one is self-contained.

---

## Prompt 1 — Overview: copy edits

You are working inside the democrito design system repo. All changes are in `src/pages/OverviewPage.tsx` and `src/components/organisms/ai/QuickStartSection.tsx`. Make only the changes listed below — do not refactor, do not rename variables, do not touch anything not mentioned.

### 1.1 Hero subtitle text

In `OverviewPage.tsx`, find the `<Text>` component that renders the hero subtitle (currently "Agnostic, hand-crafted atomic design system…"). Replace its content with:

```
Agnostic, hand-crafted atomic design system for AI-native apps: 3 themes, structured tokens, accessible components; adaptable via Claude, vibe coding platforms or terminal.
```

### 1.2 Why — replace all 3 paragraphs

In `OverviewPage.tsx`, replace the 3 `<Text>` elements inside the `{/* Why */}` section with:

```tsx
<Text variant="muted" size="sm" className="max-w-prose">
  Around 400 BC, Democritus proposed something radical: that all matter is made of
  invisible, indivisible units he called <em>atoms</em> that combine to form everything.
</Text>
<Text variant="muted" size="sm" className="max-w-prose">
  Twenty-five centuries later, Brad Frost borrowed the concept for design interfaces:
  buttons are atoms, forms are molecules, pages are built from organisms. The methodology
  is called{" "}
  <a
    href="https://atomicdesign.bradfrost.com/chapter-2/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-foreground underline decoration-border underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
  >
    atomic design
  </a>{" "}
  — and the connection back to Democritus is in the name.
</Text>
<Text variant="muted" size="sm" className="max-w-prose">
  democrito carries that thread forward into the age of AI-assisted development to allow
  designers build consistent design systems with craft and taste — and besides them, there
  are now AI agents, vibe-coding tools, and LLMs that need the rules to create delightful
  AI products.
</Text>
```

### 1.3 How — subtitle text

In `OverviewPage.tsx`, find the `<Text>` inside the `{/* How */}` section that starts "Three paths: install via the shadcn registry…". Replace its content with:

```
Install via the shadcn registry in one command, copy the token layer manually for any non-React stack, and customize via Claude, vibe coding platform, or your favorite LLM to give any AI agent immediate design context — no build step required.
```

### 1.4 "Make it yours" heading → "Customize with your brand"

In `OverviewPage.tsx`, change:

```tsx
<Heading level="h3">Make it yours — three paths</Heading>
```

to:

```tsx
<h3 className="font-display text-base font-medium">Customize with your brand</h3>
```

This makes the heading style match the path titles rendered by `QuickStartSection` (same `font-display text-base font-medium` class applied to "shadcn Registry", "Git clone", "Manual download").

### 1.5 Claude card description

In `OverviewPage.tsx`, in the `paths` array, find the `Claude` entry and change its `desc` to:

```
Attach context files and describe your brand to create a customized design system.
```

### 1.6 GitHub card description

In `OverviewPage.tsx`, in the `paths` array, find the `GitHub` entry and change its `desc` to:

```
Edit src/index.css directly, modify context files with your brand and get started with the baseline made.
```

### 1.7 QuickStartSection — path title sentence case

In `src/components/organisms/ai/QuickStartSection.tsx`, in the `PATHS` array, update the titles to sentence case (first word capitalized only, product names preserved):

- `"shadcn Registry"` → `"shadcn registry"`
- `"Git Clone"` → `"Git clone"`
- `"Manual Download"` → `"Manual download"`

---

## Prompt 2 — Overview: structural & visual fixes

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Make only the changes listed below.

### 2.1 Fix hero → Why spacing (sentinel sibling bug)

In `src/pages/OverviewPage.tsx`, the outer container has `className="space-y-16"`. Inside it, `<div id="hero-sentinel" aria-hidden="true" className="h-px" />` is a direct sibling, which doubles the gap between the hero and the Why section.

Fix: move `<div id="hero-sentinel" aria-hidden="true" className="h-px" />` to be the **last child inside the hero `<div className="space-y-5">`** instead of a sibling of it. This preserves the sentinel's purpose (intersection observer for the topbar wordmark) while restoring uniform `space-y-16` spacing between all sections.

### 2.2 Summary stats — accent color on numbers

In `OverviewPage.tsx`, in the `{/* Summary */}` grid, find:

```tsx
<p className="font-mono text-xl font-medium text-foreground">{s.count}</p>
```

Change `text-foreground` to `text-accent`.

### 2.3 Summary stats — lighter label typography

In `OverviewPage.tsx`, in the same summary grid, find:

```tsx
<p className="font-display text-xs font-medium text-muted-foreground uppercase tracking-widest">{s.label}</p>
```

Change to:

```tsx
<p className="font-display text-xs text-muted-foreground">{s.label}</p>
```

Remove `font-medium`, `uppercase`, and `tracking-widest` so the label reads lighter, matching the card typography in the Sections grid.

### 2.4 Sections grid — always-visible arrow

In `OverviewPage.tsx`, in the `{/* Sections */}` grid, find:

```tsx
<ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity mt-0.5" />
```

Change `opacity-0` to `opacity-40` so the arrow is always visible (dimmed at rest, full on hover), matching the behavior of the AI integration cards in the "Customize with your brand" section:

```tsx
<ArrowRight className="h-4 w-4 text-muted-foreground opacity-40 group-hover:opacity-100 transition-opacity mt-0.5" />
```

### 2.5 Registry.json link below shadcn registry code block

In `src/components/organisms/ai/QuickStartSection.tsx`, add a registry.json link after the `<CodeBlock>` for the recommended (shadcn registry) path only. The link already exists in `HeroSection.tsx` — replicate the same pattern:

```tsx
{path.recommended && (
  <div className="flex justify-end">
    <a
      href="https://democrito.design/r/democrito.json"
      target="_blank"
      rel="noopener noreferrer"
      className="font-mono text-2xs text-muted-foreground transition-colors hover:text-accent"
    >
      registry.json ↗
    </a>
  </div>
)}
```

Place this immediately after `<CodeBlock code={path.code} language={path.language} />` inside the `PATHS.map()` block.

### 2.6 Sidebar top spacing

In `src/components/AppSidebar.tsx`, change:

```tsx
<SidebarContent className="pt-4">
```

to:

```tsx
<SidebarContent className="pt-6">
```

This adds a bit more breathing room between the topbar header border and the first nav item ("Overview").

### 2.7 Design Principles heading — sentence case

In `OverviewPage.tsx`, change:

```tsx
<Heading level="h3" className="mb-4">Design Principles</Heading>
```

to:

```tsx
<Heading level="h3" className="mb-4">Design principles</Heading>
```

---

## Prompt 3 — Manifesto quote removal + global fixes

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Make only the changes listed below.

### 3.1 Remove opening pull quote from Manifesto

In `src/pages/ManifiestoPage.tsx`, find the `{/* Opening: pull quote + intro paragraph */}` section. It starts with a `<div className="space-y-4">` containing a `<blockquote>` with the text `"You can only be as good as your taste."` and the cite `— Mariano Morera, founder`.

Remove **only the `<blockquote>` element** (including the cite inside it). Keep the `<div className="space-y-4">` and the `<p>` paragraph that follows — that content stays.

The quote appears once more at the end of the manifesto page — leave that occurrence untouched.

Also update `<PageMeta description=...>` at the top of the file: remove the quote from the description string, changing:

```
"You can only be as good as your taste — why design systems still matter in the age of generation."
```

to:

```
"Why design systems still matter in the age of AI generation."
```

### 3.2 Verify scroll-to-top on navigation

`ShowcaseLayout.tsx` already has a `<ScrollToTop />` component that calls `document.getElementById("main-scroll")?.scrollTo({ top: 0, behavior: "instant" })` on `pathname` change. Verify:

1. The `<main>` element in `ShowcaseLayout` has `id="main-scroll"` — confirm it does (it should, line ~113).
2. Confirm `<ScrollToTop />` is rendered inside `<SidebarProvider>` (it should be, after `<CloseMobileSidebarOnNav />`).

If both are in place, no change needed — log a comment confirming it's working. If `id="main-scroll"` is missing from the `<main>` tag, add it.

### 3.3 Capitalization sweep — general rule

Sentence case throughout: only the first word of any heading, label, or button text is capitalized, unless the word is a proper noun or acronym (React, Tailwind, GitHub, WCAG, LLM, AI, MIT, URL, CSS, etc.).

Apply to the following specific strings in `OverviewPage.tsx`:

| Current | Change to |
|---|---|
| `"Design Tokens"` (stats label) | `"Design tokens"` |
| `"UI Primitives"` (stats label) | `"UI primitives"` |
| `"Browse components"` (button) | already correct ✓ |
| `"Star on GitHub"` (button) | already correct ✓ |
| `"Explore tokens"` (text link) | already correct ✓ |

In `AppSidebar.tsx`:

| Current | Change to |
|---|---|
| `"Documentation"` (section label) | keep as-is (category label, intentional) |
| `"Design"` (section label) | keep as-is |

In `QuickStartSection.tsx`:

| Current | Change to |
|---|---|
| `"shadcn registry"` | already fixed in Prompt 1 ✓ |
| `"Git clone"` | already fixed in Prompt 1 ✓ |
| `"Manual download"` | already fixed in Prompt 1 ✓ |

---

## Prompt 4 — Typography consistency: Overview subtitle + Manifesto body

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Make only the changes listed below.

### 4.1 Overview hero subtitle — downsize to match AI / Manifesto

In `src/pages/OverviewPage.tsx`, the hero subtitle currently uses a large `<Text size="lg">`. The AI page and Manifesto use `font-body text-base text-muted-foreground` directly. Make them consistent.

Find:

```tsx
<Text size="lg" variant="muted" className="max-w-prose">
  Agnostic, hand-crafted atomic design system for AI-native apps: 3 themes, structured tokens, accessible components; adaptable via Claude, vibe coding platforms or terminal.
</Text>
```

Replace with a plain `<p>` tag (same as AiPage pattern):

```tsx
<p className="font-body text-base text-muted-foreground max-w-prose">
  Agnostic, hand-crafted atomic design system for AI-native apps: 3 themes, structured tokens, accessible components; adaptable via Claude, vibe coding platforms or terminal.
</p>
```

### 4.2 Manifesto body paragraphs — switch from `text-foreground` to `text-muted-foreground`

In `src/pages/ManifiestoPage.tsx`, all body `<p>` elements inside the narrative sections use `font-body text-base leading-relaxed text-foreground`, which renders darker than the rest of the site's paragraph text.

Do a targeted find-and-replace **only on that class string** — do not touch the `<p>` elements that use `text-accent` (the blockquote texts) or `font-mono` (the section labels):

```
Find:    font-body text-base leading-relaxed text-foreground
Replace: font-body text-base leading-relaxed text-muted-foreground
```

This is a replace-all within `ManifiestoPage.tsx` only. Verify after: the 2 closing blockquote `<p>` elements (which use `font-display text-2xl font-bold text-accent`) must remain unchanged.

---

## Prompt 5 — Design pages: category jump nav + component count

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Make only the changes listed below. The **Organisms page already has the correct pattern** — replicate it exactly on the other design pages.

### Reference pattern (already in OrganismsPage.tsx)

Hero subtext line (goes after the `<p>` description):
```tsx
<p className="mt-0.5 font-mono text-xs text-foreground-subtle">19 components · 4 categories</p>
```

Category jump nav (goes between the hero `<div>` and the first `CategoryHeader`):
```tsx
<nav className="flex flex-wrap gap-2">
  {categories.map((cat) => (
    <a
      key={cat.id}
      href={`#${cat.id}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-border bg-card px-3 py-1.5 font-display text-xs font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
    >
      {cat.label}
      <span className="font-mono text-2xs text-muted-foreground">{cat.count}</span>
    </a>
  ))}
</nav>
```

The `categories` array is declared at the top of the page component. The IDs in the array must match the `id` prop already on each `CategoryHeader`.

---

### 5.1 AtomsPage (`src/pages/AtomsPage.tsx`)

Add hero subtext after the description `<p>`:
```tsx
<p className="mt-0.5 font-mono text-xs text-foreground-subtle">10 atoms · 4 categories</p>
```

Add a `categories` const at the top of `AtomsPage()`:
```tsx
const categories = [
  { id: "cat-form",     label: "Form & Input",        count: 4 },
  { id: "cat-labels",   label: "Labels & typography",  count: 4 },
  { id: "cat-feedback", label: "Feedback & state",     count: 4 },
  { id: "cat-utility",  label: "Utilities",            count: 3 },
];
```

Add the `<nav>` jump nav block (using the reference pattern above) after the hero `<div>` and before the first `<CategoryHeader>`.

Verify the IDs match: `cat-form`, `cat-labels`, `cat-feedback`, `cat-utility` — these are already on the existing `CategoryHeader` components in the file.

---

### 5.2 MoleculesPage (`src/pages/MoleculesPage.tsx`)

Add hero subtext after the description `<p>`:
```tsx
<p className="mt-0.5 font-mono text-xs text-foreground-subtle">18 molecules · 4 categories</p>
```

Add a `categories` const at the top of `MoleculesPage()`:
```tsx
const categories = [
  { id: "cat-form",       label: "Form & input",       count: 5 },
  { id: "cat-navigation", label: "Navigation",          count: 3 },
  { id: "cat-data",       label: "Data & display",      count: 5 },
  { id: "cat-activity",   label: "Activity & status",   count: 3 },
];
```

Add the `<nav>` jump nav block after the hero `<div>` and before the first `<CategoryHeader>`.

Verify the IDs match: `cat-form`, `cat-navigation`, `cat-data`, `cat-activity` — already on existing `CategoryHeader` components.

---

### 5.3 TokensPage (`src/pages/TokensPage.tsx`)

The Tokens page has a search bar instead of categories. Add only the hero subtext line — no jump nav needed here since the search already serves as the navigation mechanism.

After the description `<p className="mt-1 font-body text-base text-muted-foreground">` in the hero `<div>`, add:
```tsx
<p className="mt-0.5 font-mono text-xs text-foreground-subtle">90+ tokens</p>
```

---

### 5.4 TemplatesPage (`src/pages/TemplatesPage.tsx`)

Add hero subtext only (no categories exist):
```tsx
<p className="mt-0.5 font-mono text-xs text-foreground-subtle">7 templates</p>
```

Place it after the description `<p>` inside the hero `<div>`.

---

---

## Prompt 6 — AI detail page: Claude (`src/pages/ai/claude.tsx`)

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Edit only `src/pages/ai/claude.tsx`. Make only the changes listed below — do not restructure the file.

### 6.1 Badge text

Change:
```tsx
<Badge variant="outline" className="font-mono text-xs">Anthropic</Badge>
```
to:
```tsx
<Badge variant="outline" className="font-mono text-xs">Claude</Badge>
```

### 6.2 Rename section labels

Using the `Section` component's `label` prop, rename:

| Current label | New label |
|---|---|
| `"Read the file, not the page"` | `"Inspect context files"` |
| `"What to attach as context"` | `"Install the context in your project"` |
| `"System prompt pattern for theming"` | `"Customize with your brand"` |
| `"Example prompt"` | `"Play with your taste"` |

### 6.3 Remove the explanation paragraphs from "Verify the reasoning" section

In the `{/* Section 2 — Verify the reasoning */}` block, keep everything up to and including the `<StepCode>` calibration prompt block. Remove the 4 `<P>` elements that follow it — the ones that start with:
- `"These questions have specific answers in DESIGN.md…"`
- `"The accent answer is scarcity as meaning…"`
- `"The 3-surface answer is depth without complexity…"`
- `"If Claude's answers mention those concepts…"`

The section ends at the `<StepCode>` — nothing after it.

### 6.4 Restructure: eliminate "Claude Projects setup", keep its Note

Currently the file has a `{/* Section 3 — Claude Projects setup */}` block that contains a `<P>` intro and a `<Note label="Files to add to Project knowledge">`.

- **Delete** the `<Section label="Claude Projects setup">` wrapper and its intro `<P>` entirely.
- **Move** the `<Note label="Files to add to Project knowledge">` element to appear **directly before** the `<Section label="Customize with your brand">` block — as a standalone element between sections, not inside any Section.

The resulting order of top-level elements should be:

1. Hero div
2. Section: "Inspect context files"
3. Section: "Verify the reasoning, not just the values"
4. Section: "Install the context in your project"
5. `<Note label="Files to add to Project knowledge">` ← moved here, standalone
6. Section: "Customize with your brand"
7. Section: "Play with your taste"

### 6.5 Expand "Play with your taste" with more prompt examples

The current section has one `<StepCode>` with a single prompt. Replace the section content with multiple prompt examples, each introduced by a short sentence. Use this structure:

```tsx
<Section label="Play with your taste">
  <P>
    Concrete, specific prompts produce precise output. Name the token you want
    to change, give the direction, and constrain what must stay the same.
  </P>
  <StepCode language="prompt">{`Change the accent to electric blue, keep the warm theme earth tones,
increase border radius to 0.75rem`}</StepCode>
  <P>Shift only the accent and keep everything else intact:</P>
  <StepCode language="prompt">{`Shift the accent from terracotta to forest green.
Keep the 3-surface hierarchy, monochromatic grays, and font roles unchanged.
Output only the CSS custom property values that change.`}</StepCode>
  <P>Explore contrast and density:</P>
  <StepCode language="prompt">{`Increase visual contrast: darken the muted-foreground token,
raise border opacity, and tighten spacing on the card surface.
Stay within the warm theme — no hue changes.`}</StepCode>
</Section>
```

---

## Prompt 7 — AI detail page: Vibe coding (`src/pages/ai/vibe-coding.tsx`)

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Edit only `src/pages/ai/vibe-coding.tsx`.

### 7.1 Rename section labels

| Current label | New label |
|---|---|
| `"The Lovable prompt block"` | `"Lovable"` |
| `"Replit system prompt snippet"` | `"Replit"` |
| `"The reference-by-URL pattern"` | `"Other vibe coding platforms"` |

### 7.2 Lovable — add a customization prompt

After the existing `<StepCode>` block in the Lovable section, add:

```tsx
<P>To push a specific brand direction:</P>
<StepCode language="prompt">{`Using the democrito design system, adjust the visual to feel more editorial:
- Change accent to deep teal (HSL 182° 83% 25%)
- Increase border radius on cards and inputs to 0.75rem
- Keep the 3-surface hierarchy and font roles unchanged
Output only the CSS custom property values that change.`}</StepCode>
```

### 7.3 Google Stitch — remove "What it is" Note

Find the `<Note label="What it is">` block inside the Google Stitch section and delete it entirely (the block and all its content).

### 7.4 Google Stitch — move DESIGN.md explanation out of Note card

Currently the text about `DESIGN.md` being Google's open-source format is inside a `<Note label="What to know before starting">`. 

Remove the `<Note>` wrapper — keep only the inner `<P>` text — and place it directly below the Section label as a regular `<P>`. The `<P>` content stays the same word-for-word. The Note shell is deleted.

### 7.5 Google Stitch — remove "Expected" paragraph from Step 2

In Step 2 ("Verify the import"), find and delete the `<P>` that starts `"Expected: terracotta, approximately HSL(18° 65% 55%)…"`. Keep the prompt `<StepCode>` above it.

### 7.6 Replit — add a customization prompt

After the existing `<StepCode>` in the Replit section, add:

```tsx
<P>To customize the design specifications with natural language:</P>
<StepCode language="prompt">{`Using the design system rules above, adjust the visual to feel warmer:
increase heading weight to 700, add 0.5rem more spacing between sections,
and use a slightly more saturated surface background.
Keep all token names — only describe the change direction.`}</StepCode>
```

### 7.7 Merge "Token mapping pass" into "Other vibe coding platforms"

The current file ends with a `{/* Section 5 — Token mapping pass */}` block. Do the following:

1. Delete the `<Section label="Token mapping pass — required after every generation">` wrapper (and its opening `label`).
2. Keep all the inner content (`<P>` elements and `<StepCode>`).
3. Append that content — without any section wrapper — at the end of the `<Section label="Other vibe coding platforms">` block, after the existing `<StepCode>` already there.

The "Other vibe coding platforms" section should now contain: its original `<P>` + `<StepCode>`, followed by the token mapping `<P>` elements and `<StepCode>`. No separate section heading for token mapping.

---

## Prompt 8 — AI detail page: Terminal/GitHub + card renames

You are working inside the democrito design system repo. Branch `fix/frontend-fixes-v3.3`. Edit `src/pages/ai/github.tsx`, `src/pages/AiPage.tsx`, and `src/pages/OverviewPage.tsx`.

### 8.1 Rename cards to "Terminal" in AiPage and OverviewPage

**In `src/pages/AiPage.tsx`**, in the `platforms` array, find the GitHub entry and change:
```tsx
{ path: "/ai/github", icon: Github, name: "GitHub", badge: "Open Source", desc: "..." }
```
to:
```tsx
{ path: "/ai/github", icon: Github, name: "Terminal", badge: "GitHub", desc: "..." }
```
Keep the existing `desc` text unchanged.

**In `src/pages/OverviewPage.tsx`**, in the `paths` array, find the GitHub entry and change `name` and `badge` the same way:
- `name: "GitHub"` → `name: "Terminal"`
- `badge: "Open Source"` → `badge: "GitHub"`

Keep the desc already updated in Prompt 1.6.

### 8.2 Delete "How CLAUDE.md works" section

In `src/pages/ai/github.tsx`, find the `{/* Section 1 — How CLAUDE.md works */}` block and delete it entirely — the comment, the `<Section>` wrapper, all `<P>` elements, and the `<Note>` inside it.

### 8.3 Update "The instruction file ecosystem" table

The current table in `{/* Section 2 — The instruction file ecosystem */}` needs two corrections and two additions.

**Corrections:**
- `GEMINI.md` — this file does **not** yet exist in the repo. Update the "Location" cell to read `"Project root (add this file — not yet in repo)"` and the "Tool(s)" cell to `"Gemini CLI (primary)"`.
- `.github/copilot-instructions.md` — does not exist in the repo either. Same treatment: location cell → `"Not yet in repo"`.
- `.cursor/rules/*.mdc` — does not exist. Location → `"Not yet in repo"`.

**Additions — add 2 new rows to the table:**

```tsx
<tr className="border-t border-border">
  <td className="px-4 py-2"><Code>DESIGN.md</Code></td>
  <td className="px-4 py-2 font-body text-sm text-foreground">Google Stitch (native), any DESIGN.md-compatible tool</td>
  <td className="px-4 py-2 font-body text-sm text-muted-foreground">Project root</td>
</tr>
<tr className="border-t border-border">
  <td className="px-4 py-2"><Code>docs/design-system.md</Code></td>
  <td className="px-4 py-2 font-body text-sm text-foreground">Any agent — full component inventory and usage rules</td>
  <td className="px-4 py-2 font-body text-sm text-muted-foreground">docs/ directory</td>
</tr>
```

Add both rows after the existing `.cursor/rules/*.mdc` row.

Also update the intro `<P>` of this section — replace "CLAUDE.md is democrito's primary instruction file…" opening with:

```tsx
<P>
  The AI tooling landscape has consolidated around a small set of instruction
  file formats. A repository built for AI-native development should ship the
  right file for each tool — or at minimum document which ones to add.
</P>
```

### 8.4 Rename section labels

In `src/pages/ai/github.tsx`:

| Current label | New label |
|---|---|
| `"AGENTS.md — minimal template for a democrito fork"` | `"AGENTS.md"` |
| `"Using docs/ as agent context"` | `"Docs"` |

### 8.5 Update "Docs" section content

In the renamed "Docs" section, add `docs/design-system.md` as a third entry alongside `docs/theming.md` and `docs/tokens.md`. Place it first in the list:

```tsx
<div className="space-y-1">
  <p className="font-display text-sm font-semibold">
    <Code>docs/design-system.md</Code>
  </p>
  <P>
    Full component inventory across all atomic layers — atoms, molecules,
    organisms, and templates — with usage rules and composition patterns.
    Use this when an agent needs to find an existing component or understand
    what's available before creating something new.
  </P>
</div>
```

---

## After all 8 prompts — commit & push

```bash
git add -A
git commit -m "fix(web): overview + manifesto + design pages + AI detail pages (v3.3)"
git push origin fix/frontend-fixes-v3.3
```

Then open a PR from `fix/frontend-fixes-v3.3` → `main` with title:
`fix(web): frontend polish pass — overview, AI pages, design pages (v3.3)`
