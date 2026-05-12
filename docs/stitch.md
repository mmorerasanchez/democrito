# Using democrito with Google Stitch

> **Google Stitch** is Google Labs' AI-powered UI design tool. It generates
> high-fidelity screens from natural language, exports code in multiple frameworks,
> and integrates with AI coding agents via an MCP server.
>
> democrito speaks Stitch's language natively: `DESIGN.md` (the taste layer in
> democrito's repo root) follows the open-source DESIGN.md convention that Google
> Stitch introduced and open-sourced in April 2026.
>
> This guide covers two integration workflows and the MCP bridge.
>
> **Access Stitch:** [stitch.withgoogle.com](https://stitch.withgoogle.com)

---

## Why democrito and Stitch fit together

On April 21, 2026, Google Labs published the DESIGN.md spec as an open-source
standard — a plain-text design brief that AI agents read to generate consistent UI.
democrito shipped `DESIGN.md` following this convention. The two were designed
for the same problem from different sides:

- **Stitch** generates screens and exports design rules as DESIGN.md
- **democrito** ships a design system with DESIGN.md as the machine-readable taste layer

This means democrito users can import their system into Stitch immediately, and Stitch
users can use democrito as the foundation for the design rules their exports reference.

---

## Workflow A — democrito-first (recommended for existing adopters)

You've already installed democrito. You want to use Stitch to generate screens that
follow democrito's visual rules without starting from scratch.

### 1. Import democrito's DESIGN.md into Stitch

In Stitch, open your project settings and import your design rules. You have two options:

**Option 1 — Paste the content directly:**
Copy the full content of `DESIGN.md` from your repo root and paste it into Stitch's
design context field.

**Option 2 — Point Stitch at the GitHub URL:**
If Stitch supports URL imports, use the raw GitHub URL:
```
https://raw.githubusercontent.com/mmorerasanchez/democrito/main/DESIGN.md
```
Or point at your fork/product's own DESIGN.md if you've customized the tokens.

### 2. Confirm Stitch understood the system

Ask Stitch directly before generating screens:

```
What is the accent color in this design system, and what is its role?
```

Expected answer: terracotta (hsl 18°), used for primary CTAs, links, focus rings.
At most one per screen.

```
What typography rules apply to data values in this system?
```

Expected answer: JetBrains Mono (font-mono). All user-editable content, data values,
inputs, badges, and code use font-mono.

If the answers are wrong, re-import DESIGN.md.

### 3. Generate screens in Stitch

With democrito's rules loaded, prompt Stitch using token language:

```
Design a dashboard for an AI ops platform. IDE-grade, not consumer-grade.
Dense and purposeful — power user audience. Dark warm industrial atmosphere.
Three-surface hierarchy: background for the page, surface for the sidebar,
card for elevated data panels. Single terracotta accent for the primary CTA only.
Font-mono for all metric values and data cells.
```

```
Create a settings page with a two-column layout: navigation sidebar on the
left (bg-surface, w-sidebar-w), content area on the right (bg-background).
All form input text in font-mono. Labels in font-body text-sm. One primary
action button per section at most.
```

### 4. What Stitch will generate correctly vs what needs adjustment

**What Stitch will get right:**
- Color atmosphere (warm stone surfaces, terracotta accent)
- Typography intent (display for headings, mono for data)
- Layout proportions (sidebar widths, header height)
- The "no decorative color" constraint

**What will need a token mapping pass:**
Stitch's Tailwind CSS export uses generic class patterns (`bg-neutral-900`,
`text-orange-500`). These do not match democrito's CSS custom property structure
(`bg-card`, `text-accent`). After exporting from Stitch, you'll need to replace
generic Tailwind classes with democrito's semantic token classes.

This is the most important limitation to know going in. The visual output from
Stitch will be on-system; the code output needs a cleanup pass.

**Recommended pass after export:**

Search-and-replace patterns:
```
# Surfaces
bg-neutral-* → bg-background / bg-surface / bg-card (match by visual role)
border-neutral-* → border-border

# Text
text-neutral-* → text-foreground / text-muted-foreground / text-foreground-subtle
text-white → text-foreground

# Accent
text-orange-* → text-accent
bg-orange-* → bg-accent / bg-accent-muted / bg-accent-subtle

# Fonts
font-mono stays as font-mono (if Stitch respected it)
font-sans → font-display (headings) or font-body (prose)
```

---

## Workflow B — Stitch-first (for teams generating designs in Stitch before adopting democrito)

You're designing in Stitch and want to bring the generated design rules into a
democrito codebase.

### 1. Generate your screens in Stitch

Design freely in Stitch. When your screens are in a good place, export DESIGN.md:
Stitch → Project Settings → Export → DESIGN.md.

### 2. Reconcile the exported DESIGN.md with democrito's

The exported DESIGN.md will describe your product's specific palette. Open it
alongside democrito's `DESIGN.md` and decide:

- Which values do you want democrito to provide? (3-surface hierarchy, font system,
  spacing, border rules — take these from democrito rather than the Stitch export)
- Which values are product-specific overrides? (your accent color, your font choices,
  your radius preference — these go into your `src/index.css` override block)

The pattern: **democrito provides the system, your product provides the theme.**

### 3. Add Stitch-derived overrides to src/index.css

Take the color values from the Stitch export and map them to democrito token names
in your `:root` block:

```css
/* src/index.css — overrides derived from Stitch export */
:root {
  /* Map Stitch's bg-page color to democrito's --background */
  --background: 222 16% 6%;   /* was: bg-neutral-950 in Stitch export */
  --surface:    222 12% 10%;  /* was: bg-neutral-900 */
  --card:       222 10% 15%;  /* was: bg-neutral-800 */

  /* Map Stitch's brand color to --accent */
  --accent:     217 91% 60%;  /* was: text-blue-500 in Stitch export */
  ...
}
```

### 4. Update your DESIGN.md

Replace the Stitch-generated DESIGN.md content with a version that:
1. References democrito as the visual foundation
2. Adds your product-specific opinions
3. Points to your `src/index.css` overrides for exact values

---

## MCP integration — Stitch + Claude Code

The Stitch MCP server lets AI coding agents (including Claude Code) read your Stitch
designs directly — color tokens, component structure, layout rules — without copying
and pasting anything.

### Setup

1. **Install the Stitch MCP server.** Official documentation at:
   [stitch.withgoogle.com/docs/mcp/setup](https://stitch.withgoogle.com/docs/mcp/setup)

2. **Configure Claude Code** to connect to the MCP server. In your project root,
   add or update `.mcp.json`:
   ```json
   {
     "mcpServers": {
       "stitch": {
         "command": "npx",
         "args": ["-y", "@google/stitch-mcp"],
         "env": {
           "STITCH_API_KEY": "your-stitch-api-key"
         }
       }
     }
   }
   ```

3. **Run Claude Code** from your democrito project root. It will now have access
   to both `CLAUDE.md` (project rules) and the Stitch MCP (live design data).

### Using the MCP in Claude Code sessions

With both connected, Claude Code can read your Stitch designs and generate components
that match — using democrito tokens:

```
Read the "Dashboard" screen from Stitch via MCP. Generate the StatCard component
it uses as a democrito molecule. Follow the component rules in CLAUDE.md.
Map any generic colors to the appropriate token classes from src/index.css.
```

```
Pull the sidebar component from the Stitch "Settings" screen.
Classify it as an organism (TopBar pattern). Use democrito tokens throughout.
Check if SidebarNav already exists in src/components/organisms/ before creating.
```

---

## Further reading

- [`DESIGN.md`](../DESIGN.md) — democrito's taste layer (the file Stitch reads)
- [`docs/tokens.md`](./tokens.md) — complete token reference for manual mapping
- [`docs/theming.md`](./theming.md) — how to override democrito tokens for your product
- [Google Stitch DESIGN.md open-source announcement](https://blog.google/innovation-and-ai/models-and-research/google-labs/stitch-design-md/)
- [Stitch MCP documentation](https://stitch.withgoogle.com/docs/mcp/setup/)
