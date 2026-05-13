# democrito × Claude AI — Use Cases Guide

> **What this covers:** How to use democrito's design system context across all Claude surfaces — Claude.ai chat, Cowork, Claude Code (external project), design specifications, and fork/customization. Each use case includes the exact prompts and parameters to use.

---

## Overview of use cases

| # | Path | Tool | User type |
|---|---|---|---|
| UC-A1 | Paste context into Claude chat | Claude.ai | Any designer/developer |
| UC-A2 | Use the Cowork democrito skill | Cowork | Designer in Cowork |
| UC-A3 | Point Claude Code at CLAUDE.md | Claude Code | Developer in their own project |
| UC-B1 | Generate a design spec | Claude.ai / Cowork | Designer |
| UC-B2 | Generate a behaviour spec for a component | Claude.ai / Cowork | Designer |
| UC-C1 | Fork the repo and customize CLAUDE.md | GitHub + Terminal | Developer / design team |
| UC-C2 | Customize DESIGN_SYSTEM.md for your brand | GitHub + Terminal | Design system owner |

---

## Group A — Using democrito in Claude apps

### UC-A1 — Claude.ai chat (paste context)

**Objective:** Use democrito's token system as context in a regular Claude.ai conversation to get on-system component code or design advice.

**Platform:** Claude.ai (web, desktop, or mobile)

**Who it's for:** Designers who want component suggestions, token lookups, or design decisions — without opening a terminal.

**Setup:**
1. Open [claude.ai](https://claude.ai) and start a new conversation
2. Go to [democrito.design/r/democrito.json](https://democrito.design/r/democrito.json) — this is the machine-readable token file. You don't need to read it, just have the URL.
3. Go to [github.com/mmorerasanchez/democrito/blob/main/CLAUDE.md](https://github.com/mmorerasanchez/democrito/blob/main/CLAUDE.md) and copy the full contents.

**Opening prompt — paste this first:**

```
I'm building a UI using the democrito design system. Here are the standing rules for all responses in this conversation:

DESIGN SYSTEM: democrito
- Tokens are CSS custom properties. All colors use HSL format without the hsl() wrapper: `--background: 30 18% 91%`
- Tailwind utilities reference tokens: `bg-background`, `text-foreground`, `text-accent`, `bg-surface`, `bg-card`
- Three surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated cards)
- Three fonts: font-display (Plus Jakarta Sans, headings), font-body (Satoshi, paragraphs), font-mono (JetBrains Mono, ALL data/code/user-editable content)
- Single accent color: terracotta (--accent: 18 60% 45% in warm theme)
- Three themes: warm (default, :root), dark (.dark), light (.light)
- Components use Radix UI / shadcn/ui primitives only — never rebuild from scratch
- Icons: Lucide React only
- Semantic status tokens: text-success, text-error, text-warning, text-info (never text-green-*, text-red-*, text-yellow-*)
- Semantic status backgrounds: bg-success-bg/10, bg-error-bg/10, bg-warning-bg/10, bg-info-bg/10

RULES:
- Never hardcode hex or RGB values — always use semantic token classes
- Never use Tailwind's built-in color palette (text-green-600, bg-red-500, etc.) — always use democrito semantic tokens
- font-mono is mandatory for any data value, variable, code, or user-editable text
- No fourth surface level — never use arbitrary bg colors outside the three-surface system
- All new components must be classifiable as: atom / molecule / organism / template
- Semantic tokens handle dark/light theming internally — never add dark: overrides at component level

When I ask for component code, give me React + TypeScript + Tailwind utility classes using democrito tokens.
```

**Follow-up prompt examples:**

```
Build me a StatCard atom — a small card showing a metric label and value. 
The value should use font-mono. Use bg-card surface. Show TypeScript props.
```

```
I have a list of users with status: active, inactive, pending. 
What's the right democrito pattern for displaying their status labels?
```

```
What token should I use for a disabled input field background?
```

**Expected results:** Claude responds with component code using correct token classes, never hardcodes colors, uses font-mono for data values, builds on shadcn primitives.

**Acceptance criteria:**
- [ ] Response uses `bg-card`, `text-foreground`, `text-muted-foreground` etc. — not arbitrary colors
- [ ] Data/code values use `font-mono` class
- [ ] Component imports from `@/components/ui/` not custom builds
- [ ] No fourth surface level introduced
- [ ] No hardcoded Tailwind colors (`text-green-*`, `text-red-*`, `bg-blue-*` etc.)
- [ ] No `dark:` overrides at component level (semantic tokens handle theming)

**Debug prompts — use when Claude violates a rule:**

```
The color you used (e.g. text-green-600) is a hardcoded Tailwind color. 
democrito has semantic tokens for this: text-success, text-error, text-warning, text-info. 
Please update every hardcoded color to use the correct semantic token.
```

```
You added dark: overrides at the component level. democrito's semantic tokens 
handle theming internally across all three themes — remove all dark: prefixes 
from the component. The tokens adapt automatically.
```

```
You built a custom card shell instead of using the shadcn Card primitive. 
Rebuild this using Card, CardHeader, CardContent from @/components/ui/card.
```

```
This component uses font-sans or no font class on the [label/value/description]. 
Apply the democrito font rule: font-display for headings/labels, font-body for 
descriptions, font-mono for all data values and code.
```

---

### UC-A2 — Cowork skill

**Objective:** Use the democrito Cowork skill inside a Cowork session for design system queries, component planning, and context-aware advice.

**Platform:** Cowork (Claude desktop app)

**Who it's for:** Designers using Cowork as their main AI workspace.

**Setup:** No setup required — the democrito skill is bundled with the Cowork plugin. Open a new Cowork session in the democrito project.

**Test prompts (run each separately and check the response):**

**Prompt 1 — Token lookup:**
```
What's the correct token for a secondary button background in the warm theme?
```
Expected: References `--secondary` / `bg-secondary`, explains warm theme value.

**Prompt 2 — Component classification:**
```
I want to build a collapsible sidebar section with a header, icon, and child nav items. 
What atomic layer does this belong to and what existing democrito components should it build on?
```
Expected: Classifies as molecule or organism, references SidebarNav, uses Radix Collapsible.

**Prompt 3 — Surface hierarchy:**
```
I have a modal dialog that contains a data table. What surface tokens should I use 
for the modal background, the table container, and the individual row hover state?
```
Expected: Modal = `bg-card`, table container = `bg-surface`, hover = `bg-muted` or `bg-accent-subtle`.

**Prompt 4 — Font rule:**
```
I'm showing a user's API key in a settings page. What font class should I use and why?
```
Expected: `font-mono`, because API keys are user-editable/data values — references the "Prompts Are Code" principle.

**Acceptance criteria:**
- [ ] All four prompts answered with correct token references
- [ ] No hallucinated token names
- [ ] Font-mono rationale explained correctly
- [ ] Surface hierarchy respected in Prompt 3

**Finding — common Prompt 3 gotcha:** Designers often reach for `bg-card` inside a `bg-card` modal thinking "elevated inside elevated." The correct pattern is `bg-surface` inside `bg-card` — it recedes rather than stacks, maintaining visual depth without introducing a fourth surface level.

**Finding — Prompt 4 edge case:** If an API key is partially masked (`sk-...•••••••xyz`), the full row including the masked characters must stay `font-mono`. Never split font treatment within a single data field.

---

### UC-A3 — Claude Code (external project, CLAUDE.md reference)

**Objective:** An external developer uses democrito's CLAUDE.md in their own project with Claude Code, so the AI agent generates on-system code without a design system briefing.

**Platform:** Claude Code (terminal, in user's own project)

**Who it's for:** Developers who installed democrito via shadcn CLI and want Claude Code to build new components automatically.

**Setup:**
1. Complete the quick start (see `docs/quick-start-designer.md`) — democrito tokens are installed in your project
2. In your project root, create a file called `CLAUDE.md` and paste this content:

```markdown
# Project AI Context

## Design system: democrito

Reference: https://democrito.design | Tokens: https://democrito.design/r/democrito.json

### Rules (enforce strictly)
- All colors via semantic tokens only: bg-background, bg-surface, bg-card, text-foreground, text-accent, border-border
- Three surfaces only: bg-background → bg-surface → bg-card. Never introduce a fourth.
- Three fonts: font-display (headings/buttons), font-body (paragraphs), font-mono (ALL data values, variables, code, user-editable content)
- Single accent: text-accent / bg-accent. Never add decorative colors.
- Components: Radix UI / shadcn/ui primitives only. Icons: Lucide React only.
- Tailwind v4 CSS-first: tokens live in src/index.css @theme block. No tailwind.config.ts.
- New components classified as: atom / molecule / organism / template before writing.

### Token reference
Colors: bg-background, bg-surface, bg-card, bg-muted, bg-accent, bg-accent-subtle
Text: text-foreground, text-muted-foreground, text-foreground-subtle, text-accent
Border: border-border
Fonts: font-display, font-body, font-mono
Status: text-status-draft, text-status-testing, text-status-production, text-status-archived
Semantic: text-success, text-warning, text-error, text-info
```

**Test prompt (run in Claude Code inside the project):**

```
Read CLAUDE.md. Then build a UserCard molecule — a card showing a user's avatar placeholder, name, email, and status badge. Requirements:
- Name uses font-display
- Email uses font-mono  
- Status badge uses status color tokens (draft/testing/production/archived)
- Card uses bg-card surface
- Follows shadcn/ui Card primitive pattern
Show the complete component file.
```

**Expected:** Claude Code reads CLAUDE.md, builds UserCard with correct tokens, never hardcodes colors, uses font-mono for email, references shadcn Card.

**Acceptance criteria:**
- [ ] CLAUDE.md read before writing code
- [ ] font-mono on email field
- [ ] Status uses semantic status tokens not hardcoded colors
- [ ] bg-card surface used
- [ ] Built on shadcn Card primitive

---

## Group B — Design specifications

### UC-B1 — Generate a component design spec

**Objective:** Use democrito context to generate a structured design spec for a new component before building it.

**Platform:** Claude.ai or Cowork

**Opening context prompt (same as UC-A1 opening):** Use the democrito system rules block from UC-A1.

**Spec request prompt:**

```
Generate a design spec for a NotificationBanner organism in democrito. It should:
- Display a message with a severity level: info, warning, error, success
- Include an optional action button
- Be dismissible

Format the spec as:
1. Atomic classification and rationale
2. Props interface (TypeScript)
3. Token mapping (which CSS token maps to which visual element)
4. States (default, hover, dismissed)
5. Font assignments for each text element
6. Accessibility notes
7. What existing democrito atoms/molecules it composes
```

**Expected output structure:**
- Classifies as organism (it composes atoms + has layout logic)
- Props: `severity`, `message`, `action?`, `onDismiss?`
- Token mapping: severity → `--info/warning/error/success` tokens
- Font: label = font-body, action = font-display (button label), any code = font-mono
- Composes: Text atom + Button atom + Lucide icon

**Acceptance criteria:**
- [ ] Correct atomic layer classification with rationale
- [ ] All colors via token names, not hex
- [ ] font-mono called out for any data/code content
- [ ] Three-surface hierarchy respected in layout spec

---

### UC-B2 — Generate a behaviour spec for a feature

**Objective:** Use democrito context to specify the interaction design for a UI feature — states, transitions, responsive behaviour.

**Platform:** Claude.ai or Cowork

**Prompt:**

```
I'm designing a prompt editor feature for a data tool. Users write prompts with 
{{variable}} placeholders that get filled in at runtime. 

Using democrito's design system, generate a behaviour spec covering:
1. How the editor container should be surfaced (which surface token, border treatment)
2. How {{variable}} placeholders should be visually distinguished (font, color, background)
3. The filled-in state — when a variable has a value vs when it's empty
4. Focus state for the editor
5. Read-only vs editable modes
6. Any democrito components I should compose this from

Apply the "Prompts Are Code" principle that democrito is built on.
```

**Expected output:**
- Editor container: `bg-surface` or `bg-card`, `border-border`
- Variable placeholders: **must use `font-mono`**, accent color treatment (`text-accent`, `bg-accent-subtle`)
- Filled = accent/success token; Empty = muted/warning token
- Focus: `ring` token
- Read-only: `bg-muted` with reduced opacity
- Composes: CodeBlock atom or custom input with font-mono

**Acceptance criteria:**
- [ ] `font-mono` specified for variable placeholders (this is the "Prompts Are Code" principle)
- [ ] Accent tokens used for variable highlighting, not hardcoded
- [ ] Surface tokens used for container, not arbitrary bg
- [ ] States covered: default, focus, filled, empty, read-only

---

## Group C — Fork and customize

### UC-C1 — Fork the repo and customize CLAUDE.md

**Objective:** A design team forks democrito and replaces the context files with their own brand parameters, creating a private version of the design system for their AI agents.

**Platform:** GitHub + Terminal + Claude Code

**Who it's for:** Design teams or developers who want democrito as a base but with their own brand tokens, naming, and rules baked into the AI context.

**Step 1 — Fork on GitHub:**
1. Go to [github.com/mmorerasanchez/democrito](https://github.com/mmorerasanchez/democrito)
2. Click **Fork** (top right)
3. Name it something like `my-brand-design-system`
4. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/my-brand-design-system.git
cd my-brand-design-system/app-democrito
```

**Step 2 — Customize `CLAUDE.md`:**

Open `CLAUDE.md` in your editor (or give Claude Code this prompt from inside the repo folder):

```
Read the current CLAUDE.md. Then rewrite it to replace all democrito-specific 
references with our brand. Replace:
- "democrito" → "[YOUR BRAND NAME]"  
- The accent color: warm terracotta → [YOUR BRAND COLOR in HSL, e.g. "210 85% 55%"]
- The font stack: Plus Jakarta Sans / Satoshi / JetBrains Mono → [YOUR FONTS]
- The repo URL → [YOUR FORK URL]
Keep all the structural rules (three surfaces, three fonts, atomic design, etc.) 
but update every brand-specific reference.
Show me the complete updated file.
```

**Step 3 — Customize `src/DESIGN_SYSTEM.md`:**

```
Read src/DESIGN_SYSTEM.md. Update the following for our brand — and ONLY these things:

1. Header: Replace "democrito Design System" with "[YOUR NAME] Design System"
2. Section 1 (Executive Summary): Replace "terracotta orange" with "[YOUR ACCENT COLOR NAME]" 
   and "warm stone grays" with your surface palette description
3. Section 3 (Font System): Replace in the Font Families table:
   - font-display: [YOUR HEADING FONT] (fallbacks: Poppins, Inter, system-ui)
   - font-body: [YOUR BODY FONT] (fallbacks: Outfit, Inter, system-ui)
   - font-mono: keep JetBrains Mono (or specify alternative)
4. Section 4 (Color System), Core Surfaces table: Replace the Dark HSL values:
   - --background: [YOUR BACKGROUND HSL]
   - --surface: [YOUR SURFACE HSL]
   - --card: [YOUR CARD HSL]
5. Section 4, Accent & Action table: Replace --accent HSL with [YOUR ACCENT HSL]

Do NOT change: status colors, semantic colors (success/warning/error/info), 
anatomy field colors, spacing, component inventory, or design principles.
Show me the complete updated header + Section 1 + Section 3 font table + Section 4 core surfaces table.
```

**Step 4a — Update colors in `src/index.css`:**

Give Claude Code this prompt:

```
In src/index.css, find the :root, .warm { } block. Make the following replacements only:

Accent (replace all five — they must stay in sync):
  --accent:          [YOUR ACCENT HSL, e.g. 210 85% 55%]
  --accent-muted:    [YOUR ACCENT at lower saturation/lightness, e.g. 210 60% 65%]
  --ring:            [SAME AS --accent — controls focus rings]
  --sidebar-primary: [SAME AS --accent — controls sidebar active item]
  --sidebar-ring:    [SAME AS --accent — controls sidebar focus ring]

Surfaces (warm theme is light — use high lightness values, e.g. 88–97%):
  --background: [YOUR BACKGROUND HSL, e.g. 220 15% 91%]
  --surface:    [YOUR SURFACE HSL — slightly lighter, e.g. 220 12% 94%]
  --card:       [YOUR CARD HSL — lightest, near-white, e.g. 220 20% 97%]

Do NOT change: foreground colors, semantic colors (success/warning/error/info),
status colors, category palette, .dark block, or .light block.
Show me only the updated :root, .warm { } block.
```

**Step 4b — Update fonts in `src/index.css`:**

Give Claude Code this prompt:

```
In src/index.css, make two font-related updates:

1. Replace the @import lines at the very top of the file with the correct
   import URLs for our brand fonts:
   [PASTE YOUR GOOGLE FONTS OR CDN IMPORT URL HERE]
   If a font is a system font (e.g. Inter), remove its @import line entirely.

2. In the @theme { } block, update these three lines:
   --font-display: "[YOUR DISPLAY FONT]", [fallbacks], system-ui, sans-serif;
   --font-body:    [YOUR BODY FONT], [fallbacks], system-ui, sans-serif;
   --font-mono:    "JetBrains Mono", "IBM Plex Mono", Consolas, monospace;

Do NOT change any other property in the @theme block or anywhere else.
Show me the updated @import lines and the three updated --font-* lines in @theme.
```

> **Why @theme and not :root?** Tailwind v4 compiles font utility classes (`font-display`, `font-body`, `font-mono`) from the `@theme` block at build time. Overriding the CSS variable in `:root` has no effect on those utility classes. See `docs/getting-started.md` for the full explanation.

**Step 5 — Verify context loads correctly:**

In Claude Code, run:
```
Read CLAUDE.md and src/DESIGN_SYSTEM.md. Tell me: what is this design system called, 
what is the primary accent color, what are the three font roles, and what is the 
three-surface hierarchy? Answer in one sentence each.
```

**What a passing response looks like (against the unmodified democrito source):**
1. *"The design system is called democrito — a general-purpose, themeable Atomic Design System for data-dense, IDE-inspired applications."*
2. *"The primary accent color is terracotta orange (`--accent: 18 65% 55%` in dark theme)."*
3. *"The three font roles are font-display (Plus Jakarta Sans, headings/buttons), font-body (Satoshi, descriptions/labels), and font-mono (JetBrains Mono, all data/code/user-editable content)."*
4. *"The three-surface hierarchy is bg-background (page shell, darkest) → bg-surface (panels/sidebars) → bg-card (elevated cards/dialogs)."*

After your customization, the same prompt should return YOUR brand name, accent, and font names in place of democrito's.

**Acceptance criteria:**
- [ ] CLAUDE.md references your brand name and fonts
- [ ] DESIGN_SYSTEM.md updated — Section 3 font table + Section 4 core surfaces + accent
- [ ] src/index.css :root, .warm block reflects your accent HSL and surface HSLs
- [ ] Claude Code reads the context correctly and answers with your brand values, not democrito's

---

### UC-C2 — Customize key context files via Cowork

**Objective:** Same as UC-C1 but done entirely in Cowork without touching a terminal, using Cowork's file access to edit the key context files directly.

**Platform:** Cowork (with your fork open as the workspace folder)

**Setup:** Fork the repo as in UC-C1 Step 1, then open the fork folder in Cowork.

**Prompt 1 — Audit current context:**
```
Read CLAUDE.md and src/DESIGN_SYSTEM.md in this repo. Give me a list of every 
brand-specific value I need to replace to make this my own design system: 
font names, color values, project name, accent color. Format as a checklist.
```

**Prompt 2 — Update CLAUDE.md:**
```
Update CLAUDE.md in this repo. Replace:
- Project name: [YOUR NAME]
- Accent color description: [YOUR COLOR NAME]
- Font stack: display=[YOUR FONT], body=[YOUR FONT], mono=JetBrains Mono
- Repo URL: [YOUR FORK URL]
Keep all design rules, atomic design guidelines, and structural content exactly as-is.
Save the file.
```

**Prompt 3 — Update colors in src/index.css:**
```
In src/index.css, find the :root, .warm { } block. Replace these token values only:

Accent — all five must stay in sync:
  --accent:          [YOUR ACCENT HSL, e.g. 210 85% 55%]
  --accent-muted:    [lightened version, e.g. 210 60% 65%]
  --ring:            [SAME AS --accent]
  --sidebar-primary: [SAME AS --accent]
  --sidebar-ring:    [SAME AS --accent]

Surfaces — warm theme is light, use high lightness (88–97%):
  --background: [e.g. 220 15% 91%]
  --surface:    [e.g. 220 12% 94%]
  --card:       [e.g. 220 20% 97%]

Keep ALL other tokens and ALL .dark / .light blocks untouched. Save the file.
```

**Prompt 3b — Update fonts in src/index.css:**
```
In src/index.css, make two changes:

1. At the top of the file, replace the @import lines with the correct
   font imports for our brand:
   [YOUR FONT IMPORT URL — from Google Fonts, Fontshare, or CDN]
   Remove any @import for fonts we're not using.

2. In the @theme { } block, update these three lines only:
   --font-display: "[YOUR DISPLAY FONT]", [fallbacks], system-ui, sans-serif;
   --font-body:    [YOUR BODY FONT], [fallbacks], system-ui, sans-serif;
   --font-mono:    "JetBrains Mono", "IBM Plex Mono", Consolas, monospace;

Do not change anything else in @theme. Save the file.
```

> **Why @theme and not :root?** Font utility classes in Tailwind v4 are compiled statically from `@theme` at build time — overriding in `:root` has no effect. This is a Tailwind v4 CSS-first constraint, documented in `docs/getting-started.md`.

**Prompt 4 — Verify:**
```
Read CLAUDE.md, src/DESIGN_SYSTEM.md, and src/index.css. Confirm:
1. What is the design system name?
2. What is the --accent value in the :root, .warm block?
3. What are the --font-display and --font-body values in the @theme block?
4. What is the three-surface hierarchy?
Answer in one sentence each.
```

**Acceptance criteria:**
- [ ] Cowork reads and edits all files correctly without corruption
- [ ] No structural content removed from CLAUDE.md or DESIGN_SYSTEM.md
- [ ] All five accent-linked tokens updated in sync in :root, .warm block
- [ ] @theme font values updated (not :root)
- [ ] @import lines replaced with brand font URLs
- [ ] Prompt 4 returns your brand name, accent HSL, font names, and correct surface hierarchy

---

## Testing scorecard

| UC | Test | Platform | Status | Notes |
|---|---|---|---|---|
| A1 | Claude chat — token context | Claude.ai | ✅ | One correction needed: hardcoded Tailwind colors → semantic tokens |
| A2 | Cowork skill — 4 prompts | Cowork | ✅ | 4/4 pass — all criteria met |
| A3 | Claude Code — external CLAUDE.md | Claude Code | ⚠️ | Token compliance perfect; wrong launch directory (prompt-x vs my-app) |
| B1 | Design spec generation | Claude.ai / Cowork | ✅ | Run in Cowork session 2026-05-13 |
| B2 | Behaviour spec — Prompts Are Code | Claude.ai / Cowork | ✅ | font-mono applied independently; VariableToken gap flagged |
| C1 | Fork + customize via terminal | GitHub + Claude Code | ✅ | Simulated in Cowork — 2 bugs found and fixed in prompts |
| C2 | Fork + customize via Cowork | Cowork | ✅ | Simulated in Cowork — 2 bugs found and fixed in prompts |

---

*democrito × Claude AI Use Cases v1.0 | Part of the [democrito](https://democrito.design/) documentation*
