# AI Context — democrito with AI Tools

> Entry point for any AI agent, language model, or vibe-coding tool working with the
> democrito design system. Read this file before touching any component, token, or layout.
>
> **Live reference:** The [AI Integration page](https://democrito.design/ai) groups tools
> into three audiences — Claude, Vibe Coding Tools, and GitHub. The per-tool files below
> provide deeper setup and prompting detail.

---

## The AI context layer

democrito provides three files designed to be read by AI tools:

| File | Format | Auto-read by | Purpose |
|---|---|---|---|
| `CLAUDE.md` | Markdown | Claude Code, Cursor, Windsurf | Coding rules, architecture, key files |
| `AGENTS.md` | Markdown | Codex, GitHub Copilot, Cursor | Entry point for non-Claude agents; consistent with CLAUDE.md |
| `DESIGN.md` | Markdown (Stitch-compatible) | Google Stitch, any agent you paste it into | Visual philosophy, token quick-reference, do/don't |
| `skill/democrito/` | Claude Skill package | Claude Code (via `cp -R skill/democrito ~/.claude/skills/`) | On-demand principles, tokens, component inventory |

> **Precedence:** `CLAUDE.md` takes priority for Claude Code; `AGENTS.md` is the equivalent entry point for other agents. Both files are kept in sync — `AGENTS.md` defers to `CLAUDE.md` for the full context.

The compact token reference at the bottom of this file works for tools that need manual context (v0, Bolt, ChatGPT, etc.).

---

## What democrito is

An atomic design system for AI-native, data-dense applications. It is:
- **IDE-inspired**: distraction-free, information-dense, no decorative elements
- **Warm-default**: warm (`:root`) is the primary theme; dark (`.dark`) and light (`.light`) are the other two
- **Monochromatic + accent**: 95% neutral surfaces, one accent hue (terracotta), semantic colors for status only
- **Composable**: everything is built atoms → molecules → organisms → templates. Never skip levels.

---

## Reading order for a new task

**Step 1 — Identify the template**
Before placing any component, select the appropriate template from `docs/components/templates.md`.
The template defines all regions (header, sidebar, content area, footer).
Do not invent new page structures.

**Step 2 — Place organisms into regions**
Use the component inventory (`docs/components/`) to identify which organisms belong in each
template region. Read the organism's do/don't rules before placing.

**Step 3 — Compose organisms from molecules and atoms**
Molecules are composed of atoms. Organisms are composed of molecules.
Never place an organism inside another organism.

**Step 4 — Apply tokens**
- Colors: CSS custom properties only. Never hardcode hex values.
- Typography: `font-display` for titles and button labels, `font-body` for prose and descriptions,
  `font-mono` for ALL user-editable content, data values, and code
- Spacing: use the spacing scale from `docs/reference/tokens.md` — check pattern-level spacing rules
  in `docs/patterns/` for specific element-to-element distances

**Step 5 — Apply content rules**
All copy follows `docs/guides/content-guidelines.md`. Sentence case. Action verbs. No decorative language.

**Step 6 — Verify constraints**
Before finalizing: check do/don't rules for every component used.
Check antipatterns in relevant pattern docs.

---

## Known AI bias patterns — explicitly suppressed

These are recurring mistakes AI tools make when working with this system:

| Bias | Correct behavior |
|------|-----------------|
| Adding gradient backgrounds | Not in this system. Use --background, --surface, or --card only |
| Using --accent for status indicators | Accent is brand only. Use --color-success, --color-warning, --color-error, --color-info |
| Placing two primary buttons on one view | One primary button per view maximum |
| Using font-body for editable inputs | All user-editable content uses font-mono |
| Creating disabled states with per-token colors | Use CSS `opacity: 0.4` + `filter: saturate(0)` at container level |
| Generating title case copy | Sentence case always, everywhere |
| Inventing new accent hues | One accent color. Terracotta. No exceptions without a design decision. |
| Creating component-scoped tokens | democrito uses semantic tokens only (--accent, not --button-accent-bg) |

---

## Flexibility rules

- Use existing tokens before creating new ones. If no token fits, flag it — don't invent.
- Use existing components before creating new ones. 90% of any interface should be assembled from the existing inventory.
- New layout structures require a design decision. Do not create page structures not in `docs/components/templates.md`.
- The warm theme is a differentiator — preserve its Sanzo Wada earth-tone palette when generating warm-theme content.

---

## Per-tool guides

| Tool | File | Notes |
|---|---|---|
| Claude Code / terminal agents | [terminal.md](./terminal.md) | Auto-reads `CLAUDE.md`; Claude Skill available |
| Lovable | [lovable.md](./lovable.md) | GitHub sync + two-tier knowledge architecture |
| Cursor / Windsurf / IDE agents | [cursor.md](./cursor.md) | Auto-reads `CLAUDE.md`; use compact token ref as fallback |
| Replit / v0 / Bolt / web tools | [replit.md](./replit.md) | No filesystem access — paste compact token reference |
| Claude Design | [claude-design.md](./claude-design.md) | Full onboarding + handoff workflow |
| Google Stitch | [stitch.md](./stitch.md) | DESIGN.md import + MCP bridge |

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
6. One component per file, PascalCase
7. Three themes: define any new token in all three (warm/dark/light)
```
