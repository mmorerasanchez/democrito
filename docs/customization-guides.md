# Customization Guides

> How to use democrito as a baseline and build your own custom atomic design system on top of it. Three worked examples, each grounded in a real use case.

The customization pattern is identical across all three guides:
1. One CLI install
2. Token overrides in `src/index.css` only — no component files touched
3. Font swap in `@theme`
4. `CLAUDE.md` updated with your actual token values
5. `DESIGN.md` updated with your system's character

Tokens are the only branding surface. Components inherit and render correctly.

---

## Guide 1 — AI prompt library (dark violet, solo developer)

**Context:** Greenfield project. Primary use case is prompt editing and management. Dark-first aesthetic, violet accent (signals "AI / intelligence"), monospace-heavy interface. Using Lovable for UI generation, Claude Code for logic.

### Step 1 — Install

```bash
npx shadcn@latest add https://democrito.design/r/democrito.json
```

### Step 2 — Override tokens in `src/index.css`

Replace the `:root` block inside `@layer base`:

```css
:root {
  /* Surfaces: cool-dark, slight violet shift */
  --background: 240 12% 5%;
  --surface:    240  8% 9%;
  --card:       240  6% 14%;

  /* Text */
  --foreground:        240 15% 96%;
  --muted-foreground:  240  6% 58%;
  --foreground-subtle: 240  4% 42%;
  --foreground-muted:  240  6% 58%;

  /* Accent: violet */
  --accent:            262 70% 62%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      262 45% 38%;
  --accent-subtle:     262 20% 12%;

  /* Primary */
  --primary:            240 15% 88%;
  --primary-foreground: 240 12% 5%;

  /* Secondary */
  --secondary:            240 8% 18%;
  --secondary-foreground: 240 15% 96%;

  /* Muted */
  --muted:            240 8% 13%;
  --muted-foreground: 240  6% 58%;

  /* Card and popover */
  --card-foreground:    240 15% 96%;
  --popover:            240  6% 14%;
  --popover-foreground: 240 15% 96%;

  /* Borders and inputs */
  --border: 240  8% 22%;
  --input:  240  8% 18%;
  --ring:   262 70% 62%;

  /* Destructive */
  --destructive:            6 65% 60%;
  --destructive-foreground: 0 0% 100%;

  /* Sidebar */
  --sidebar-background:           240  8% 9%;
  --sidebar-foreground:           240 15% 96%;
  --sidebar-primary:              262 70% 62%;
  --sidebar-primary-foreground:   0 0% 100%;
  --sidebar-accent:               240  8% 18%;
  --sidebar-accent-foreground:    240 15% 96%;
  --sidebar-border:               240  8% 22%;
  --sidebar-ring:                 262 70% 62%;

  /* Semantic feedback */
  --success: 148 45% 50%; --success-bg: 148 45% 50%; --success-border: 148 45% 50%;
  --warning: 40 75% 55%;  --warning-bg: 40 75% 55%;  --warning-border: 40 75% 55%;
  --error:   6 65% 60%;   --error-bg:   6 65% 60%;   --error-border:   6 65% 60%;
  --info:    215 50% 62%; --info-bg:    215 50% 62%; --info-border:    215 50% 62%;

  /* Warm-dark utility */
  --warm-dark: 240 8% 72%;

  /* Radius: tighter — code-editor feel */
  --radius: 0.375rem;

  /* Layout: narrower sidebar, wider right panel for prompt preview */
  --header-height:      3rem;
  --sidebar-width:      13rem;
  --sidebar-collapsed:  3.5rem;
  --right-panel:        26rem;

  color-scheme: dark;
  --scrollbar-thumb: hsl(240 8% 28%);
  --scrollbar-track: transparent;
  --scrollbar-width: thin;
}
```

### Step 3 — Update fonts in `src/index.css`

Replace both `@import` lines at the top of the file:

```css
/* Replace both @import lines */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
/* Remove the Fontshare line — Satoshi is no longer used */
```

Replace the `@theme` font declarations:

```css
@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
  /* ... rest of @theme unchanged ... */
}
```

Rationale: collapsing display and body to Inter maximises density. JetBrains Mono stays — it is the right font for a prompt editor.

### Step 4 — Update `CLAUDE.md`

Add this block to the Design Tokens section:

```markdown
## Design Tokens (this project's overrides)
- Accent: violet (`--accent: 262 70% 62%`) — not the default terracotta
- Theme: dark-first (`:root` is dark, no warm default)
- Radius: 0.375rem (tight — code-editor feel)
- font-display / font-body: Inter
- font-mono: JetBrains Mono — used for ALL prompt content, variables, inputs
- Right panel: 26rem (wider — prompt preview context)
```

### Step 5 — Update `DESIGN.md`

Replace the Visual Theme section:

```markdown
## Visual Theme (this project)
Dark, dense, violet-accented. Closer to a code editor than a dashboard.
Violet signals AI/intelligence without feeling playful.
Mono font is dominant — most content is user-generated prompt text.
No warm tones. No terracotta.
```

### Step 6 — Install shadcn components

```bash
npx shadcn@latest add button card input textarea badge separator
```

---

## Guide 2 — Developer observability dashboard (dark + light, two-person startup)

**Context:** Existing codebase, shadcn defaults, slate grays. Need distinct visual identity without a redesign. Cool-toned palette, blue accent, professional-grade. Must support dark and light — enterprise customers may prefer light mode.

### Step 1 — Install

```bash
npx shadcn@latest add https://democrito.design/r/democrito.json
```

After install your existing components shift to the warm default. The next step overrides it entirely.

### Step 2 — Override tokens for both themes

Order in `src/index.css @layer base` matters: `:root` first, `.dark` second, `.light` third.

```css
/* Dark default */
:root {
  --background: 222 16%  6%;
  --surface:    222 12% 10%;
  --card:       222 10% 15%;

  --foreground:        210 20% 94%;
  --muted-foreground:  215  8% 55%;
  --foreground-subtle: 215  6% 40%;
  --foreground-muted:  215  8% 55%;

  --card-foreground:    210 20% 94%;
  --popover:            222 10% 15%;
  --popover-foreground: 210 20% 94%;

  /* Electric blue accent */
  --accent:            217 91% 60%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 60% 35%;
  --accent-subtle:     217 20% 12%;

  --primary:            210 20% 88%;
  --primary-foreground: 222 16%  6%;

  --secondary:            222 10% 18%;
  --secondary-foreground: 210 20% 94%;

  --muted:            222 10% 13%;
  --muted-foreground: 215  8% 55%;

  --border: 222 10% 22%;
  --input:  222 10% 15%;
  --ring:   217 91% 60%;

  --destructive:            6 65% 60%;
  --destructive-foreground: 0 0% 100%;

  --sidebar-background:         222 12% 10%;
  --sidebar-foreground:         210 20% 94%;
  --sidebar-primary:            217 91% 60%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent:             222 10% 18%;
  --sidebar-accent-foreground:  210 20% 94%;
  --sidebar-border:             222 10% 22%;
  --sidebar-ring:               217 91% 60%;

  --success: 148 45% 50%; --success-bg: 148 45% 50%; --success-border: 148 45% 50%;
  --warning: 40 75% 55%;  --warning-bg: 40 75% 55%;  --warning-border: 40 75% 55%;
  --error:   6 65% 60%;   --error-bg:   6 65% 60%;   --error-border:   6 65% 60%;
  --info:    215 50% 62%; --info-bg:    215 50% 62%; --info-border:    215 50% 62%;

  --warm-dark: 210 8% 72%;

  --radius: 0.5rem;
  --header-height: 3.5rem;
  --sidebar-width:      12.5rem;
  --sidebar-collapsed:  3.5rem;
  --right-panel:        22rem;

  color-scheme: dark;
  --scrollbar-thumb: hsl(222 10% 28%);
  --scrollbar-track: transparent;
  --scrollbar-width: thin;
}

/* Light — for enterprise customers preferring light mode */
.light {
  --background: 210 20% 98%;
  --surface:    210 15% 97%;
  --card:       0 0% 100%;

  --foreground:        222 20% 12%;
  --muted-foreground:  215  8% 45%;
  --foreground-subtle: 215  6% 60%;
  --foreground-muted:  215  8% 45%;

  --card-foreground:    222 20% 12%;
  --popover:            0 0% 100%;
  --popover-foreground: 222 20% 12%;

  --accent:            217 85% 50%;
  --accent-foreground: 0 0% 100%;
  --accent-muted:      217 50% 70%;
  --accent-subtle:     217 30% 94%;

  --primary:            222 20% 12%;
  --primary-foreground: 210 20% 98%;

  --secondary:            210 12% 93%;
  --secondary-foreground: 222 20% 12%;

  --muted:            210 12% 93%;
  --muted-foreground: 215  8% 45%;

  --border: 215 10% 88%;
  --input:  215 10% 88%;
  --ring:   217 85% 50%;

  --destructive:            6 70% 52%;
  --destructive-foreground: 0 0% 100%;

  --sidebar-background:         210 15% 97%;
  --sidebar-foreground:         222 20% 12%;
  --sidebar-primary:            217 85% 50%;
  --sidebar-primary-foreground: 0 0% 100%;
  --sidebar-accent:             210 12% 93%;
  --sidebar-accent-foreground:  222 20% 12%;
  --sidebar-border:             215 10% 88%;
  --sidebar-ring:               217 85% 50%;

  --success: 148 50% 42%; --success-bg: 148 50% 42%; --success-border: 148 50% 42%;
  --warning: 40 80% 48%;  --warning-bg: 40 80% 48%;  --warning-border: 40 80% 48%;
  --error:   6 70% 52%;   --error-bg:   6 70% 52%;   --error-border:   6 70% 52%;
  --info:    215 55% 52%; --info-bg:    215 55% 52%; --info-border:    215 55% 52%;

  --warm-dark: 210 12% 36%;

  --radius: 0.5rem;
  --header-height: 3.5rem;
  --sidebar-width:     12.5rem;
  --sidebar-collapsed: 3.5rem;
  --right-panel:       22rem;

  color-scheme: light;
  --scrollbar-thumb: hsl(215 10% 82%);
  --scrollbar-track: transparent;
  --scrollbar-width: thin;
}
```

### Step 3 — Update fonts

Replace both `@import` lines and the `@theme` font declarations:

```css
/* Replace both @import lines */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;700&display=swap');
/* Remove the Fontshare line — Satoshi is no longer used */
```

```css
@theme {
  --font-display: "Inter", system-ui, sans-serif;
  --font-body:    "Inter", system-ui, sans-serif;
  --font-mono:    "IBM Plex Mono", Consolas, monospace;
  /* ... rest of @theme unchanged ... */
}
```

Inter for everything structural, IBM Plex Mono for all data values (log lines, trace IDs, metrics, table cells).

### Step 4 — Update `CLAUDE.md`

```markdown
## Design Tokens (this project's overrides)
- Theme: dark default (`:root`), light opt-in (`.light` class on `<html>`)
- Accent: electric blue (`--accent: 217 91% 60%`) — not terracotta
- Radius: 0.5rem
- font-display / font-body: Inter
- font-mono: IBM Plex Mono — used for ALL data values, log output, trace IDs,
  metric numbers, table cells, timestamps
- Sidebar: 12.5rem (narrower — more canvas space for data)
```

### Step 5 — Theme toggle

```tsx
const toggleTheme = () => {
  document.documentElement.classList.toggle('light')
}
```

democrito's cascade handles the rest.

---

## Guide 3 — Internal AI ops review platform (dark warm, internal tool)

**Context:** Internal tool, 6–8 hours daily use by 5 reviewers. Primary task: reviewing AI-generated content. Needs clear visual separation between structural UI (looked *through*) and content being reviewed (looked *at*). Warm tones acceptable. Amber accent. Single dark theme — no light mode needed.

### Step 1 — Install

```bash
npx shadcn@latest add https://democrito.design/r/democrito.json
```

The warm default is close to what you need. This guide makes targeted adjustments rather than a full override.

### Step 2 — Override `:root` for sustained reading

```css
:root {
  /* Darker warm surfaces — reduces eye strain over long sessions.
     Default warm background (30 18% 91%) is too light for all-day use. */
  --background: 25 10% 12%;
  --surface:    25  8% 16%;
  --card:       25  6% 21%;

  --foreground:        30 12% 92%;
  --muted-foreground:  25  5% 58%;
  --foreground-subtle: 25  3% 42%;
  --foreground-muted:  25  5% 58%;

  --card-foreground:    30 12% 92%;
  --popover:            25  6% 21%;
  --popover-foreground: 30 12% 92%;

  /* Amber accent — less aggressive than terracotta,
     better for "flag / attention" semantics */
  --accent:            38 80% 55%;
  --accent-foreground: 25 10% 8%;   /* dark text on amber */
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

  --destructive:            8 60% 48%;
  --destructive-foreground: 30 25% 97%;

  --sidebar-background:         25  8% 16%;
  --sidebar-foreground:         30 12% 92%;
  --sidebar-primary:            38 80% 55%;
  --sidebar-primary-foreground: 25 10% 8%;
  --sidebar-accent:             25  8% 22%;
  --sidebar-accent-foreground:  30 12% 92%;
  --sidebar-border:             28  8% 28%;
  --sidebar-ring:               38 80% 55%;

  --warm-dark: 25 10% 68%;

  --success: 152 45% 38%; --success-bg: 152 45% 38%; --success-border: 152 45% 38%;
  --warning: 38 80% 55%;  --warning-bg: 38 80% 55%;  --warning-border: 38 80% 55%;
  --error:   8 60% 48%;   --error-bg:   8 60% 48%;   --error-border:   8 60% 48%;
  --info:    215 45% 48%; --info-bg:    215 45% 48%; --info-border:    215 45% 48%;

  --radius: 0.5rem;
  --header-height: 3rem;
  --sidebar-width:     13.5rem;
  --sidebar-collapsed: 3.5rem;
  --right-panel:       28rem;   /* wider — review metadata and AI scores live here */

  color-scheme: dark;
  --scrollbar-thumb: hsl(28 8% 32%);
  --scrollbar-track: transparent;
  --scrollbar-width: thin;
}
```

### Step 3 — Update fonts

Replace the Google Fonts `@import` line. Keep the structure but swap body to IBM Plex Sans. Remove Fontshare (Satoshi no longer used):

```css
/* Replace both @import lines */
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500&family=JetBrains+Mono:wght@400;500;700&display=swap');
/* Remove the Fontshare line — Satoshi is no longer used */
```

```css
@theme {
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body:    "IBM Plex Sans", system-ui, sans-serif;
  --font-mono:    "JetBrains Mono", Consolas, monospace;
  /* ... rest of @theme unchanged ... */
}
```

Plus Jakarta Sans for structural labels (nav, headings). IBM Plex Sans for body — more readable at sustained distances than Satoshi. JetBrains Mono for all AI-generated content under review.

### Step 4 — Update `CLAUDE.md`

```markdown
## Design Tokens (this project's overrides)
- Theme: dark warm (`:root` overridden — darker surfaces than democrito default)
- Accent: amber (`--accent: 38 80% 55%`) — used for flagged/attention states
- Radius: 0.5rem
- font-display: Plus Jakarta Sans (nav, headings, structural labels)
- font-body: IBM Plex Sans (descriptions, filter labels, non-data text)
- font-mono: JetBrains Mono — CRITICAL: all AI-generated content being
  reviewed MUST use font-mono. This creates visual separation between
  the tool's UI (which reviewers look through) and the content
  (which reviewers look at). Never use font-body for content under review.
- Right panel: 28rem (wider — review metadata and AI scores live here)
```

The font-mono rule for reviewed content is specific to this tool's purpose and will not be obvious to an AI agent without it. Write it explicitly.

---

## The shared pattern

Every guide above follows the same five steps regardless of how different the outputs look:

| Step | What changes | What stays the same |
|---|---|---|
| 1. Install | Nothing — one command always | The install command |
| 2. Token overrides | HSL values in `src/index.css @layer base` | Token names, `@theme` mappings, component files |
| 3. Font swap | `@import` lines + `@theme { --font-* }` entries | Class names (`font-display`, `font-body`, `font-mono`) |
| 4. `CLAUDE.md` update | Token values and rules for this project | File location, structure |
| 5. `DESIGN.md` update | Character, atmosphere, what the system is NOT | File location, structure |

**Token names never change.** `bg-accent`, `font-mono`, `bg-surface` — these are the same in every project. The CSS custom properties behind them are what you override. Components always inherit correctly.

---

> See also: [`docs/theming.md`](theming.md) for the full token reference, [`docs/tokens.md`](tokens.md) for exhaustive color/type/spacing values, and [`DESIGN.md`](../DESIGN.md) for the taste layer philosophy.
