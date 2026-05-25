# Using democrito with AI Tools

> How to get consistent, on-system results from every AI assistant by providing
> the right context. democrito ships a structured AI context layer — `CLAUDE.md`,
> `DESIGN.md`, and a Claude Skill — so setup is usually one step, not a paste session.

> **Live reference:** The [AI Integration page](https://democrito.design/ai) on the
> design system site groups tools into three audiences — **Claude** (chat, Design,
> Cowork, Code), **Vibe Coding Tools** (Lovable, Stitch, Replit), and **GitHub**
> (fork, contribute). The sections below provide deeper per-tool detail for each.

---

## The AI context layer

democrito provides three files designed to be read by AI tools:

| File | Format | Auto-read by | Purpose |
|---|---|---|---|
| `CLAUDE.md` | Markdown | Claude Code, Cursor, Windsurf | Coding rules, architecture, key files |
| `DESIGN.md` | Markdown (Stitch-compatible) | Google Stitch, any agent you paste it into | Visual philosophy, token quick-reference, do/don't |
| `skill/democrito/` | Claude Skill package | Claude Code (via `/skills add`) | On-demand principles, tokens, component inventory |

The compact token reference at the bottom of this page works for tools that need
manual context (v0, Bolt, ChatGPT, etc.).

---

## Claude

---

## 1. Claude Code

Claude Code is democrito's primary terminal environment. Run it from the project
root — it auto-reads `CLAUDE.md` on startup, giving it the full architecture
reference and coding rules before you type a word.

### Setup

```bash
# Clone and enter the project
git clone https://github.com/mmorerasanchez/democrito.git
cd democrito

# Start Claude Code — CLAUDE.md loads automatically
claude
```

### Install the democrito Skill

The skill gives Claude Code on-demand access to the full token reference, component
inventory, and principles — without embedding everything in CLAUDE.md:

```
/skills add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/skill/democrito/SKILL.md
```

Invoke in session: `Use the democrito skill` or reference it directly in prompts.

### Context budget awareness

Claude Code follows ~150–200 instructions before compliance drops (its own system
prompt uses ~50 slots). Keep `CLAUDE.md` lean — use pointers to files, not embedded
content. Use `/clear` between unrelated tasks to reset accumulated context while
keeping `CLAUDE.md`.

**Per-repo vs global:** `CLAUDE.md` is per-project. For rules that apply across
all your products built on democrito, add a global `~/.claude/CLAUDE.md`. Put
democrito's universal rules there; keep product-specific overrides in the repo's
`CLAUDE.md`.

### Example prompts

```
Create a new atom called Avatar in src/components/atoms/.
Use rounded-full, bg-muted for fallback, font-display text-xs for initials.
Export from the atoms index.
```

```
Build a PromptRunCard molecule. Props: prompt name (font-display text-base),
model badge (font-mono text-xs), latency (text-muted-foreground), status dot
using --status-* tokens. Follow the StatCard pattern.
```

```
Refactor TopBar to add a global search input.
Use the SearchBar molecule. Input: bg-surface, border-border, font-mono.
Refer to the existing TopBar.tsx for layout pattern.
```

### Tips

- Reference specific files: "check `src/components/atoms/` before creating."
- Mention atomic level: "this is a molecule — it composes atoms."
- Use the democrito skill for token lookups mid-session.

---

## 2. Claude Design

Claude Design (Anthropic Labs) generates visual artifacts — designs, prototypes,
React components, HTML layouts — using your team's design system.

democrito's `DESIGN.md` and `src/index.css` are exactly what Claude Design's
onboarding reads to learn your system.

> **Full guide:** [`docs/claude-design.md`](./claude-design.md)

### Quick setup

1. Open [claude.ai/design](https://claude.ai/design)
2. During onboarding, import: `DESIGN.md`, `src/index.css`, and `docs/design-system.md`
3. Claude Design stores your system and applies it to every project automatically

### Handoff to Claude Code

Once a design is validated, hand it off to Claude Code:

```
Convert this Claude Design artifact to a democrito React component.
Classify it (atom / molecule / organism / template), use existing atoms where
possible, replace any generic colors with democrito token classes, and ensure
font-mono is used for all data values. Rules are in CLAUDE.md.
```

---

## 3. Cowork (Claude desktop)

Cowork is Claude's desktop planning tool. It reads project instructions and has
access to local files. Its role in a democrito workflow is **project-level
intelligence** — audits, planning, doc writing — not code generation.

### Setup

In your Cowork project instructions, include a brief democrito context block:

```
This project is democrito — a React + TypeScript + Tailwind v4 atomic design
system. Source is at ~/Desktop/apps/democrito/app-democrito.
Key files: CLAUDE.md (coding rules), DESIGN.md (visual philosophy),
docs/ (documentation), docs/design-system.md (component inventory).
The democrito skill is available — use it for token lookups and component
inventory checks.
```

### What Cowork is good for with democrito

- Auditing the component inventory against the 11/17/19/7 atomic split
- Planning Claude Code sessions (what to build, in what order)
- Writing and reviewing documentation (docs/ updates, Notion mirrors)
- Token consistency checks across themes
- Reviewing DESIGN.md for accuracy after a refactor

### What to use instead

Cowork doesn't run builds or generate React components. For code generation,
use Claude Code. For visual generation, use Claude Design.

---

## Vibe Coding Tools

---

## 4. Lovable

Lovable is a primary visual development environment for democrito. It has direct access
to your GitHub repo and can read component patterns, `CLAUDE.md`, and all source files.

### Knowledge architecture

Lovable has a two-tier persistent knowledge system. Use both tiers — they serve
different purposes:

| Tier | Location | Scope | What to put here |
|---|---|---|---|
| **Workspace Knowledge** | Workspace settings → Knowledge | All projects in the workspace | democrito's global rules: atomic design conventions, three-font system, token-first rule, check-existing-atoms rule |
| **Project Knowledge** | Project settings → Knowledge (10,000 char limit) | This project only | Product-specific overrides: accent color, font substitutions, radius, any product-specific constraints |

**When both are set, Project Knowledge takes priority.** Put democrito's universal
rules in Workspace Knowledge once, then use Project Knowledge only for what changes
per product.

**Workspace Knowledge — what to paste:**

```
democrito design system rules (apply to all projects):

ARCHITECTURE: Atomic Design (atoms → molecules → organisms → templates → pages)
- Before creating any component, check src/components/atoms/, molecules/, ui/ for existing ones.
- Name the atomic level in every prompt ("create a molecule", "extend the organism").

TOKENS: All colors, spacing, and radii come from CSS custom properties. Never hardcode.
- Surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated). Max 3 levels.
- Text: text-foreground / text-muted-foreground / text-foreground-subtle
- Accent: text-accent (terracotta) — at most one accent button per screen
- Borders: border-border / bg-input

FONTS (non-negotiable):
- font-display (Plus Jakarta Sans): headings, buttons, nav labels
- font-body (Satoshi): descriptions, body copy
- font-mono (JetBrains Mono): ALL data values, inputs, badges, code, user-editable content

RULES:
- Never use bg-gray-800, text-white, or any hardcoded color
- No fourth surface level, no gradients, no decorative colors
- Extend shadcn/ui primitives (src/components/ui/), never rebuild them
- TypeScript with explicit prop interfaces
```

**Project Knowledge — example for a product override:**

```
This project overrides democrito's warm default with a dark violet theme:
- Accent: violet (--accent: 262 70% 62%), not terracotta
- Theme: dark-first (root is dark, no warm default)
- Font-mono: IBM Plex Mono instead of JetBrains Mono
- Right panel: 26rem (wider — prompt preview context)
All other democrito rules apply unchanged.
```

### GitHub sync and CLAUDE.md

When Lovable is connected to your GitHub repo, it reads `CLAUDE.md` directly.
If both Workspace Knowledge and `CLAUDE.md` are active:
- Put the **coding conventions and file structure** in `CLAUDE.md` (Lovable reads it per-session)
- Put the **token quick-reference and rules summary** in Workspace Knowledge (always loaded)
- Avoid duplicating the same content in both — it wastes your context budget

### Cross-project component referencing

Lovable's `@` mention lets you reference components from another project in your
workspace. If you've built democrito atoms (Button, Tag, Input) in one project, you
can reference them from a new project:

```
Build a FilterBar molecule. Reference the Tag atom from @democrito-core.
Use the same font-mono text-xs pattern as the Badge component there.
```

### Example prompts

```
Create a new molecule called NotificationBanner that composes the StatusBadge and Text atoms.
Follow the existing pattern in src/components/molecules/StatCard.tsx.
Use font-body for the message text and text-accent for the icon color.
```

```
Add a "Favorites" filter tab to the FilterBar organism.
Use the existing TabNav molecule pattern. Active state: bg-accent-subtle.
```

```
Create a settings form using FormField molecules.
All inputs must use font-mono. Labels use font-display text-sm.
Follow the spacing pattern from the existing SettingsPage.
```

---

## 5. Google Stitch

democrito's `DESIGN.md` follows the Stitch open-source format. Import it into
Stitch and any screen you generate will already follow democrito's visual rules.

> **Full guide:** [`docs/stitch.md`](./stitch.md)

### Quick setup

Import democrito's `DESIGN.md` into your Stitch project:
```
https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md
```

Or connect the Stitch MCP server to Claude Code so the agent can read your Stitch
designs directly:
```json
{
  "mcpServers": {
    "stitch": {
      "command": "npx",
      "args": ["-y", "@google/stitch-mcp"],
      "env": { "STITCH_API_KEY": "your-key" }
    }
  }
}
```

**Note:** Stitch's Tailwind export uses generic class names (`bg-neutral-900`),
not democrito's semantic tokens (`bg-card`). A token mapping pass is needed after
export. See the full guide.

---

## 6. Replit

Paste the compact token reference (below) into your Replit AI agent's context,
then include the live demo URL for visual reference. Replit agents don't have
filesystem access to read `CLAUDE.md`, so the compact block is your primary context source.

### Example prompt structure

```
[Paste compact token reference here]

Using the design system context above, create a React component called MetricCard.
It's a molecule (composition of atoms). Props: label (string), value (string),
change (number), trend ("up" | "down").

Requirements:
- font-display for the label, font-mono for the value
- text-success for positive change, text-error for negative
- bg-card border border-border rounded-lg p-4
- Never hardcode hex, RGB, or HSL values
```

---

## Other Tools

---

## 7. Cursor / Windsurf / IDE agents

Cursor, Windsurf, and similar agents auto-read `CLAUDE.md` at the project root.

### Setup

```bash
git clone https://github.com/mmorerasanchez/democrito.git
# Open the folder in Cursor — CLAUDE.md loads automatically
```

**In Cursor:** Use `@CLAUDE.md` to explicitly reference the context file in prompts.
**In Windsurf:** `CLAUDE.md` is loaded as project rules automatically.

### Tips

- Reference specific component files in your prompts so the agent reads patterns
  directly from the source.
- The democrito skill doesn't install in Cursor/Windsurf — use the compact token
  reference block below as your fallback context.

---

## 8. v0, Bolt, and other web-based tools

These tools don't have filesystem access. Paste the compact token reference (below)
into your first prompt, then write your request.

### Example prompt structure

```
[Paste compact token reference here]

Using the design system context above, create a React component called MetricCard.
It's a molecule (composition of atoms). Props: label (string), value (string),
change (number), trend ("up" | "down").

Requirements:
- font-display for the label, font-mono for the value
- text-success for positive change, text-error for negative
- bg-card border border-border rounded-lg p-4
- Never hardcode hex, RGB, or HSL values
```

---

## Compact Token Reference

Copy-paste this block into any AI tool's context window for on-system results.

```
=== democrito Design System — Token Reference ===
(General-purpose atomic design system for data-dense, IDE-inspired applications)

ARCHITECTURE: Atomic Design (atoms → molecules → organisms → templates → pages)
- atoms/: single-purpose, no child components — 11 custom (CopyButton, Heading, Tag, Spinner, Code, CodeBlock, Kbd, Link, Logo, StatusBadge, Text) + shadcn/ui primitives in ui/
- molecules/: compose 2+ atoms (FormField, SearchBar, StatCard, TokenCounter, TabNav)
- organisms/: major UI sections (TopBar, DataTable, FilterBar, DashboardStats, AuthForm)
- templates/: layout shells, no logic (AppShell, EditorLayout, LibraryLayout, DetailLayout)
- ui/: shadcn/ui primitives — extend via CVA, never rebuild

FONTS:
- font-display: Plus Jakarta Sans — headings, labels, buttons, nav
- font-body: Satoshi — body text, descriptions
- font-mono: JetBrains Mono — data, code, prompts, inputs, badges

SIZE SCALE: 2xs=10px, xs=12px, sm=13px, base=14px, md=16px, lg=18px, xl=22px, 2xl=24px, 3xl=36px

COLORS (use Tailwind classes, never hardcode):
- Surfaces: bg-background (page) → bg-surface (panels) → bg-card (elevated)
- Text: text-foreground / text-muted-foreground / text-foreground-subtle
- Accent: text-accent (terracotta orange hue 18°) / bg-accent-subtle / text-accent-muted
- Borders: border-border / bg-input
- Semantic: text-success / text-warning / text-error / text-info (each has -bg and -border variants)
- Status: text-status-draft / text-status-testing / text-status-production / text-status-archived

SPACING: 4px base grid. Layout: h-header=56px, w-sidebar-w=240px, w-right-panel=352px
RADII: rounded-sm=4px, rounded-md=8px, rounded-lg=12px, rounded-full=pill (avatars only)
Z-INDEX: dropdown=50, sticky=100, overlay=200, modal=300, toast=400
THEMES: 3 themes — warm default (`:root`), `.dark`, `.light` — CSS variables, class-switched

RULES:
1. Check existing atoms before creating new components
2. Always use design tokens — never magic numbers or hardcoded colors
3. TypeScript with explicit prop interfaces and JSDoc
4. Extend shadcn/ui primitives, don't rebuild
5. Prompts are code — all user content uses font-mono
6. One component per file, PascalCase, barrel index.ts exports
7. Three themes: define any new token in all three (warm/dark/light)
```

---

## Further reading

- [`CLAUDE.md`](../CLAUDE.md) — auto-read context file for AI coding agents
- [`DESIGN.md`](../DESIGN.md) — design philosophy and agent prompt guide
- [`docs/claude-design.md`](./claude-design.md) — full Claude Design setup guide
- [`docs/stitch.md`](./stitch.md) — full Google Stitch integration guide
- [`docs/tokens.md`](./tokens.md) — complete token inventory with hex values
- [`docs/theming.md`](./theming.md) — how to customize democrito for your product
- [`docs/architecture.md`](./architecture.md) — why Atomic Design, composition rules
