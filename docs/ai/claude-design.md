# Using democrito with Claude Design

> **Claude Design** is Anthropic's AI-powered visual creation tool (Anthropic Labs,
> launched April 2026). It lets you collaborate with Claude to generate polished
> visual artifacts — designs, prototypes, slides, React components, HTML layouts —
> using your team's design system as the source of truth.
>
> democrito is structured to work with Claude Design out of the box.
> This guide covers the full workflow: setup, generation, and handoff to Claude Code.
>
> **Prerequisites:** Claude Pro, Max, Team, or Enterprise subscription. Access at
> [claude.ai/design](https://claude.ai/design).

---

## Why democrito and Claude Design fit together

Claude Design's onboarding reads your codebase and design files to build your team's
design system — then stores it and applies it automatically to every project.

democrito ships exactly what Claude Design needs:

| democrito asset | What Claude Design reads from it |
|---|---|
| `DESIGN.md` | Visual philosophy, surface hierarchy, typography rules, do/don't list |
| `src/index.css` (`@theme` block) | Every CSS custom property — colors, radii, spacing, fonts |
| `docs/design-system.md` | Component inventory, usage rules, font matrix |

The result: Claude Design knows to use `bg-surface` not `bg-gray-800`, `font-mono`
for all data values, terracotta not generic blue, and never a fourth surface level.
It doesn't need to be taught these things per-session — they live in the design system.

---

## 1. Onboarding setup

When you first open Claude Design, it offers to build your team's design system from
your codebase. Point it at these three files:

1. **`DESIGN.md`** — the taste layer. Claude Design uses this to understand the
   visual philosophy, what the system is for, and the do/don't rules.
2. **`src/index.css`** — the token layer. The `@theme` block contains all CSS
   custom properties. Claude Design extracts color roles, radii, spacing tokens,
   and font stack from here.
3. **`docs/design-system.md`** — the vocabulary. Component inventory, font usage
   matrix, and the principles summary.

**If you've customized democrito for your product** (overridden tokens in `:root`),
point Claude Design at your overridden `src/index.css` rather than democrito's
defaults. Claude Design reads the actual CSS values, not the variable names.

**Optional:** also provide `docs/tokens.md` for the exhaustive color/type/spacing
reference with semantic role descriptions for each token.

---

## 2. What Claude Design extracts

After onboarding, your Claude Design session will know:

**From `DESIGN.md`:**
- The three-surface hierarchy (`background → surface → card`) and when to use each
- The three-font rule (`font-display` for headings/buttons, `font-body` for prose,
  `font-mono` for all data, code, and user-editable content)
- The accent scarcity rule (at most one accent-colored button per screen)
- What the system is not (no gradients, no pill buttons, no rounded-full on cards,
  no fourth surface, no decorative colors)
- The IDE-inspired aesthetic register (closer to VS Code/Linear than to Notion/Stripe)

**From `src/index.css`:**
- Exact HSL values for all three themes (warm, dark, light)
- Surface colors, foreground hierarchy, accent variants, semantic feedback colors
- Typography: `font-display`, `font-body`, `font-mono` and their fallback stacks
- Radius scale: sm=4px, md=8px, lg=12px
- Layout tokens: header height, sidebar widths, right panel

**What it does not extract:**
- The React component library — Claude Design does not know about `<StatCard>` or
  `<DataTable>`. It knows the visual rules those components follow.
- Atomic design levels (atom/molecule/organism/template) — that distinction lives
  in Claude Code, not Claude Design.

---

## 3. Generating visual artifacts

### Prompting patterns

Claude Design responds best to prompts that reference the semantic token roles, not
visual descriptions. Use token language, not color descriptions:

```
Create a dashboard card for a SaaS metrics screen.
- Outer container: bg-card, border-border, rounded-lg
- Metric value: font-mono text-2xl font-bold text-foreground
- Metric label: font-display text-sm font-medium text-muted-foreground
- Trend badge: font-mono text-xs. Use text-success for positive, text-error for negative.
- Max one accent element per screen. No shadows on the card itself.
```

```
Design a sidebar navigation with:
- Container: bg-surface, border-r border-border, w-sidebar-w
- Nav items: font-display text-sm font-medium with Lucide icons
- Active item: bg-sidebar-accent text-accent
- No bottom-of-sidebar decorative element. Dense, not spacious.
```

```
Create a data table layout for a log viewer.
- Table headers: font-mono text-xs uppercase tracking-widest text-muted-foreground, bg-surface
- Table cells: font-mono text-sm text-foreground
- Row hover: bg-accent-subtle
- Horizontal dividers only (border-b border-border). No vertical column lines.
- Timestamp column: text-foreground-subtle
```

### Referencing the design philosophy in prompts

For high-level visual decisions, invoke the DESIGN.md principles directly:

```
IDE-grade, not consumer-grade. Dense and purposeful. 
Warm industrial atmosphere — workshop, not sterile lab.
This is a settings panel for power users, not a consumer onboarding screen.
```

```
This is a flagging interface used eight hours a day. Optimise for sustained
reading — warm surfaces, clear visual hierarchy, no decorative elements.
```

---

## 4. The Claude Design → Claude Code handoff

Once a design is validated in Claude Design:

1. Claude Design packages the artifact into a bundle (HTML file, React component,
   or SVG — depending on what was generated).
2. The bundle includes the design system context Claude Design used.
3. Hand it off to Claude Code with a single instruction.

**Recommended handoff prompt for Claude Code:**

```
I have a validated design from Claude Design. Convert this to a React component
following the democrito atomic design system rules in CLAUDE.md and DESIGN.md.

- Classify it: is this an atom, molecule, organism, or template?
- Use existing atoms from src/components/atoms/ rather than recreating them.
- Replace any hardcoded colors with the correct Tailwind token classes
  (bg-surface, text-foreground, etc.).
- Ensure font-mono is applied to any data values.
- Test mentally in warm, dark, and light themes.
```

Because Claude Code auto-reads `CLAUDE.md` at project startup, it already knows the
atomic design hierarchy, token rules, and coding conventions. The handoff prompt
above just bridges the two contexts.

---

## 5. Using Claude Design for theme variations

Claude Design can generate the same component in all three themes. Use this for:
- **Visual review** before writing code: confirm the surface hierarchy holds in dark
  and light before handing off to Claude Code.
- **Stakeholder approval**: show warm, dark, and light side-by-side to confirm the
  palette works before committing to a theme override.

Prompt pattern:

```
Generate this card component in three versions:
1. Warm theme (bg-card = warm ivory, terracotta accent)
2. Dark theme (bg-card = dark stone, same terracotta accent)
3. Light theme (bg-card = near-white, same accent)

Show them side by side. Do not change any of the structural decisions —
only the surface and text color values.
```

---

## 6. Custom token overrides in Claude Design

If you've overridden democrito's default tokens for your product (e.g., violet accent
instead of terracotta), make sure Claude Design is reading your overridden
`src/index.css`, not the upstream democrito defaults.

After overriding, test Claude Design's understanding with a quick prompt:

```
What is the accent color in this design system, and where is it used?
```

If it responds with your override value (not terracotta), the setup is correct.
If it says terracotta, re-import the updated `src/index.css`.

---

## 7. Limitations

**Claude Design generates visual artifacts, not live React components.** The democrito
component library (`<StatCard>`, `<DataTable>`, `<FilterBar>`) doesn't run inside
Claude Design. Claude Design learns the *rules* — visual appearance, token usage,
typography — but the wiring to actual components happens in the Claude Code handoff.

**Claude Design doesn't enforce atomic levels.** It has no concept of atom vs
molecule. That classification is your job during the Claude Code handoff prompt.

**DESIGN.md is a taste layer, not a spec file.** Claude Design uses it for
intent and philosophy, not as a contract. If the generated artifact violates a rule
(e.g., uses four surface levels), mention the specific rule in your prompt, not just
"follow DESIGN.md."

**Theme import is static.** Claude Design reads your `src/index.css` once during
onboarding. If you update your token overrides, re-run the design system import.

---

## Further reading

- [`DESIGN.md`](../DESIGN.md) — the taste layer Claude Design reads
- [`src/index.css`](../src/index.css) — the CSS custom properties and `@theme` block
- [`docs/theming.md`](./theming.md) — how to customize democrito tokens for your product
- [`docs/tokens.md`](./tokens.md) — complete color/type/spacing reference
- [Claude Design help center](https://support.claude.com/en/articles/14604397-set-up-your-design-system-in-claude-design)
