# democrito

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2+-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white)

**democrito** is a general-purpose, themeable atomic design system for data-dense, IDE-inspired applications — dashboards, editors, AI tools, and developer workspaces.

103 components across five layers (including 48 shadcn/ui primitives), three themes (warm/dark/light), a three-font semantic typography hierarchy, and a CSS custom-property token architecture designed to be forked, rethemed, and kept consistent by AI agents.

[🌐 Live Showcase](https://democrito.design) · [📦 GitHub](https://github.com/mmorerasanchez/democrito)

> **v3.5.0 note for forkers:** The public repo history was reset to a single clean commit at this version. Earlier commit history lives in a private archive.

---

## Install

democrito is published as a [shadcn/ui-compatible registry](https://ui.shadcn.com/docs/registry).

```bash
# Install the base system (tokens + utils)
npx shadcn@latest add https://democrito.design/r/democrito.json

# Install by tier
npx shadcn@latest add https://democrito.design/r/democrito-atoms.json
npx shadcn@latest add https://democrito.design/r/democrito-molecules.json
npx shadcn@latest add https://democrito.design/r/democrito-organisms.json
npx shadcn@latest add https://democrito.design/r/democrito-templates.json
npx shadcn@latest add https://democrito.design/r/democrito-ui.json

# Or install individual components
npx shadcn@latest add https://democrito.design/r/app-shell.json
npx shadcn@latest add https://democrito.design/r/data-table.json
npx shadcn@latest add https://democrito.design/r/token-counter.json
```

> See [`registry.json`](registry.json) for the full 110-item manifest.

---

## What's Inside

### Component Inventory

| Layer | Count | Description |
| --- | --- | --- |
| **Atoms** | 11 | Typography, code blocks, tags, links, copy button, spinner, logo |
| **Molecules** | 18 | Form fields, nav items, stat cards, search, diff viewer, variable editors, theme toggle |
| **Organisms** | 19 | Navigation, tables, auth, settings, data management, API tooling, dashboards |
| **Templates** | 7 | Page layout shells — app shell, editor, dashboard, detail, comparison |
| **shadcn/ui primitives** | 48 | Radix UI base components, themed for democrito |

### Structure

```
tokens/
├── index.css              # CSS custom properties + @theme — source of truth for all tokens
└── design-tokens.json     # Generated W3C DTCG format (for Figma, Style Dictionary, etc.)

registry/
├── atoms/                 # 11 atomic components
├── molecules/             # 18 molecule compositions
├── organisms/             # 19 organism components
├── templates/             # 7 page layout shells
├── ui/                    # 48 shadcn/ui primitives
├── hooks/                 # use-theme, use-toast, use-mobile
└── lib/
    ├── utils.ts           # cn() utility
    └── tokenizeBrackets.tsx

docs/                      # Full design system specification
skill/democrito/           # Claude Skill — portable AI-native context
```

---

## Customize Tokens On-Brand

The entire visual identity lives in `tokens/index.css` as CSS custom properties. Rebranding requires only editing the `@theme` block — no component changes.

```css
/* tokens/index.css — override per theme block */
:root {
  --background: 220 15% 6%;       /* cool blue-gray */
  --accent:     210 100% 55%;      /* electric blue instead of terracotta */
  --radius:     0.5rem;
}
```

Two variables drive most of the personality: `--accent` (the system's single accent hue) and `--radius`.

**Token origin:** democrito's color palette is derived from Sanzo Wada's *A Dictionary of Color Combinations* (1933). The warm theme uses earth tones; dark/light are mathematical derivations from the same palette.

After editing `tokens/index.css`, regenerate the DTCG JSON:

```bash
npm run build   # runs generate-tokens + generate-counts + stamp-design-date + build-registry
```

Full theming guide: [`docs/reference/theming.md`](docs/reference/theming.md)

---

## Three-Theme Support

| Theme | Selector | Notes |
| --- | --- | --- |
| **Warm** | `:root` (default) | Sanzo Wada earth-tones, terracotta accent |
| **Dark** | `.dark` | Cold stone grays, deep workshop-at-night feel |
| **Light** | `.light` | High-contrast warm off-whites |

All token values are HSL CSS custom properties defined in all three themes simultaneously.

---

## Built With democrito

<!-- BEGIN GENERATED: showcase -->
democrito is a token contract. 5 systems show how far builders actually went.

| System | What it did | Verdict | URL |
| --- | --- | --- | --- |
| **habito** | Dropped the accent hue entirely — and the inherited components carried on regardless. | retheme-additions | [habito-health.lovable.app](https://habito-health.lovable.app/) |
| **prompt-x** | Inverted the palette end to end, and held the accent hue exactly where it started. | partial-fork | [prompt-x.io](https://prompt-x.io/) |
| **Southern Startups** | Kept none of the original colours. Still, structurally, the same system. | rewrite | [www.southern-startups.com](https://www.southern-startups.com/) |
| **mesa** (prototype) | The only pure retheme in the set. One hue moved; nothing else did. | pure-retheme | — |
| **strength** (prototype) | A semantic ramp where democrito has a single accent. | retheme-additions | — |

Full audit, token diffs, and what broke: [docs/showcase.md](docs/showcase.md)
<!-- END GENERATED: showcase -->

---

## For AI Agents

democrito is structured to be read and maintained by AI coding agents. Three files serve as the authoritative context:

| File | Purpose | Reader |
| --- | --- | --- |
| [`CLAUDE.md`](CLAUDE.md) | Coding rules, architecture summary, token reference | Claude Code, Cursor, Windsurf |
| [`AGENTS.md`](AGENTS.md) | Cross-tool agent context (non-Claude tools) | Copilot, Codex, Gemini CLI |
| [`DESIGN.md`](DESIGN.md) | Visual philosophy and taste layer — prevents AI aesthetic drift | All tools |

These files are auto-read at session start by Claude Code when you clone or add democrito.

### Claude Skill

Install the Claude Skill for design-system-aware assistance in every session:

```bash
cp -R skill/democrito ~/.claude/skills/
```

The skill bundles four knowledge files — `principles.md`, `tokens.md`, `components.md`, `agent-usage.md` — and triggers automatically on mentions of democrito, design tokens, atomic design, or "build a component."

### MCP Discovery

democrito publishes a machine-readable manifest at `/.well-known/mcp.json` and natural-language context at `/llms.txt` and `/llms-full.txt` for AI tool auto-discovery.

---

## Design Principles

| Principle | Description |
| --- | --- |
| **Monochromatic + Accent** | 95% neutral grays, single accent hue, semantic feedback colors only |
| **3-Surface Hierarchy** | `--background` → `--surface` → `--card` creates depth without complexity |
| **Typography as Hierarchy** | Three fonts convey meaning: Display (titles), Body (content), Mono (data/code) |
| **Progressive Disclosure** | Start with the lightest variant, add complexity as needed. |
| **IDE-Inspired** | Clean, distraction-free workspace optimized for data-dense work |
| **Accessible by Default** | WCAG 2.1 AA, 44×44px touch targets, keyboard navigation |

---

## Documentation

| Resource | Description |
| --- | --- |
| [Live Showcase](https://democrito.design) | Interactive component gallery and theme playground |
| [`docs/reference/theming.md`](docs/reference/theming.md) | Retheme guide — palette, fonts, spacing, full examples |
| [`docs/reference/design-system.md`](docs/reference/design-system.md) | Full component inventory, token reference, usage rules |
| [`tokens/design-tokens.json`](tokens/design-tokens.json) | W3C DTCG tokens for Figma Token Studio, Style Dictionary |
| [`CLAUDE.md`](CLAUDE.md) | AI agent context — auto-read by Claude Code and compatible tools |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history |

---

## License & Usage

MIT — see [LICENSE](LICENSE). Free to use in any project, commercial or personal. The Claude Skill and `DESIGN.md` follow the same MIT terms.

Paid brand-fit kits sold via [democrito.design](https://democrito.design) are licensed for use by the purchaser's company only and may not be redistributed.

Questions: [hola@atomic-products.com](mailto:hola@atomic-products.com)

---

Made in Spain · MIT License · Maintained by [@mmorerasanchez](https://github.com/mmorerasanchez)
