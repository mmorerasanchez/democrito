# ⚛️ democrito

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2+-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white)

democrito is a general-purpose, themeable atomic design system for AI-native applications — built to be the visual foundation of any product, not just one.

Born from the design system behind prompt-x.io, democrito was extracted and made fully agnostic so any designer or developer can fork it, retheme it — through natural language with Claude (Chat, Design, Cowork, Code), declaratively in vibe coding tools like Lovable or Replit, or directly in the terminal — and ship a consistent, tasteful AI product faster.

Whether you're building a prompt engineering tool, an analytics dashboard, a developer workspace, or an AI chat interface, democrito gives you a structured token architecture, accessible components, and a three-theme foundation to start from — and AI-friendly documentation to keep it consistent as you build.

[🌐 Live Demo](https://democrito.design) · [📦 GitHub](https://github.com/mmorerasanchez/democrito)

---

## Why This Exists

AI-assisted development tools like Lovable, Cursor, v0, and Claude Code generate UI at incredible speed — but without a shared design system, every generated component looks different. Colors drift, typography is inconsistent, spacing feels random, and the product loses its identity.

**democrito** solves that by providing a **single source of truth** for every visual decision: CSS custom properties as design tokens, pre-built accessible components following Atomic Design, a three-font typography hierarchy, and a monochromatic + accent color philosophy. Whether a human engineer or an AI agent is building the next feature, the output is consistent and professional.

**Use it for:** dashboards, editors, workspaces, and data-heavy tools.[^1]

[^1]: democrito was originally built as the visual foundation of [prompt-x](https://github.com/mmorerasanchez/prompt-x). It is now product-agnostic; the prompt-x-specific components live in [`src/examples/prompt-x/`](src/examples/prompt-x/).

---

## Quick Start

```bash
git clone https://github.com/mmorerasanchez/democrito.git
cd democrito
npm install
npm run dev
```

> **Package manager:** The project uses `npm` as the primary package manager. Always use `npm install` / `npm run dev` for local development.

## Install via shadcn CLI

democrito is published as a [shadcn/ui-compatible registry](https://ui.shadcn.com/docs/registry). You can install the base design system or the warm theme variant directly:

```bash
# Install the democrito base (warm + dark + light themes, tokens, fonts)
npx shadcn@latest add https://democrito.design/r/democrito.json democrito

# Optionally add the warm theme variant
npx shadcn@latest add https://democrito.design/r/democrito.json democrito-warm
```

> See [`registry.json`](registry.json) for the full manifest.

---

## Claude Skill

Install democrito as a Claude Code skill to get design-system-aware assistance in every session. Claude will automatically trigger it on mentions of democrito, design tokens, atomic design, or "build a component".

```bash
# Copy the skill folder into your project's Claude skills directory
cp -R skill/democrito ~/.claude/skills/
```

Or, in a repo that has cloned democrito:

```bash
ln -s "$(pwd)/skill/democrito" ~/.claude/skills/democrito
```

The skill bundles four knowledge files — `principles.md`, `tokens.md`, `components.md`, and `agent-usage.md` — so Claude can read each on demand. See [`skill/democrito/SKILL.md`](skill/democrito/SKILL.md) for the full definition and triggering rules.

---

## For Designers — Retheme Without Code

democrito is designed to be fully customizable through natural language. The entire visual identity lives in CSS custom properties in `src/index.css` and font definitions in `tailwind.config.ts` — which means any AI tool can read and rewrite them from a plain description of your brand.

Three paths to make it yours:

- **With Claude:** Attach `design-tokens.json` and `src/index.css` as context, describe your brand direction, and ask Claude to generate a new theme. See the [Claude guide](https://democrito.design/ai/claude) →
- **With Lovable or Replit:** Fork the repo and prompt your visual direction declaratively — no terminal needed. See the [vibe-coding guide](https://democrito.design/ai/vibe-coding) →
- **In the terminal:** Edit `src/index.css` token values directly. Two variables (`--accent` and `--radius`) change the whole personality of the system.

---

## Architecture

The design system follows **Atomic Design** methodology — Atoms → Molecules → Organisms → Templates — with design tokens defined as CSS custom properties in `src/index.css` and defined in the CSS-first `@theme` block in `src/index.css`.

> **Token formats:** The source of truth is CSS custom properties in `src/index.css`. A [`design-tokens.json`](design-tokens.json) file in [W3C DTCG format](https://design-tokens.github.io/community-group/format/) is also provided for tooling interoperability (Figma Token Studio, Style Dictionary, Specify, etc.). See [`docs/tokens.md`](docs/tokens.md) for the full reference.

```
src/
├── index.css                          # Design tokens (CSS custom properties), font imports, base resets
│
├── components/
│   ├── atoms/                         # Smallest building blocks (10 components)
│   ├── molecules/                     # Compositions of atoms (18 components)
│   ├── organisms/                     # Major UI sections (19 components)
│   ├── templates/                     # Page layout shells (7 components)
│   └── ui/                            # shadcn/ui primitives (40+ components)
│
├── pages/                             # Route pages (showcase + prototype)
├── hooks/                             # Custom React hooks
└── lib/
    └── utils.ts                       # Utility functions (cn, etc.)
```

### Component Inventory

| Layer | Count | Description |
| --- | --- | --- |
| **Atoms** | 10 | Typography, code, tags, links, copy button, spinner |
| **Molecules** | 18 | Form fields, nav items, stat cards, search, diff, variable editors |
| **Organisms** | 19 | Navigation, tables, auth, settings, data management, API tooling |
| **Templates** | 7 | Page layout shells (app shell, editor, dashboard, comparison) |
| **shadcn/ui primitives** | 40+ | Radix UI + shadcn base components |

> **Examples:** [`src/examples/prompt-x/`](src/examples/prompt-x/) contains 23 organisms + 2 molecules built for prompt-engineering UIs. They are not part of the public design system surface, but stand as fully-functional reference implementations of how to compose democrito atoms into a real product.

---

## Theming

The entire visual identity is controlled through CSS custom properties — **no component code changes required** to rebrand.

```css
/* Override the palette for your brand in index.css */
:root {
  --background: 220 15% 6%;       /* cool blue-gray */
  --surface:    220 12% 10%;
  --card:       220 10% 14%;
  --accent:     210 100% 55%;      /* electric blue instead of terracotta */
  --radius:     0.5rem;            /* sharper corners */
}
```

```ts
// Swap fonts in src/index.css under @theme
fontFamily: {
  display: ["Inter", "system-ui", "sans-serif"],
  body:    ["Inter", "system-ui", "sans-serif"],
  mono:    ['"IBM Plex Mono"', "monospace"],
},
```

📖 **[Full Theming Guide →](docs/theming.md)** — includes complete examples for a dark analytics dashboard and a light consumer app.

---

## Design Principles

| Principle | Description |
| --- | --- |
| **Monochromatic + Accent** | 95% warm stone grays, 4% terracotta orange accent, 1% semantic colors |
| **3-Surface Hierarchy** | `--background` → `--surface` → `--card` creates depth without complexity |
| **Typography as Hierarchy** | Three fonts convey meaning: Display (titles), Body (content), Mono (data) |
| **Progressive Disclosure** | Start with the lightest variant, add complexity as needed |
| **Accessible by Default** | WCAG 2.1 AA, 44×44px touch targets, keyboard navigation |
| **IDE-Inspired** | Clean, distraction-free workspace optimized for data-dense work |

> See [`docs/principles.md`](docs/principles.md) for the full guide with examples.

---

## Three-Theme Support

All tokens are defined as HSL in `src/index.css`. Hex approximations below for quick reference.

| Theme | Selector | Notes |
| --- | --- | --- |
| **Warm** | `:root` (default) | Sanzo Wada earth-tones, terracotta accent |
| **Dark** | `.dark` | Cold stone grays, deep workshop-at-night feel |
| **Light** | `.light` | High-contrast warm off-whites |

| Token | Warm (Default) | Dark | Light |
| --- | --- | --- | --- |
| `--background` | `hsl(30 18% 91%)` · `#EDE8E2` | `hsl(20 14% 4%)` · `#0E0C0B` | `hsl(30 6% 93%)` · `#EDEBE8` |
| `--surface` | `hsl(40 15% 94%)` · `#F3F0EB` | `hsl(20 8% 8%)` · `#161413` | `hsl(40 8% 97%)` · `#F8F7F5` |
| `--card` | `hsl(30 25% 97%)` · `#FAF8F5` | `hsl(12 6% 15%)` · `#282423` | `hsl(0 0% 100%)` · `#FFFFFF` |
| `--foreground` | `hsl(12 6% 15%)` · `#282423` | `hsl(60 9% 98%)` · `#FAFAF9` | `hsl(24 10% 10%)` · `#1C1917` |
| `--accent` | `hsl(18 60% 45%)` · `#B85C33` | `hsl(18 65% 55%)` · `#D4734A` | `hsl(18 65% 55%)` · `#D4734A` |

---

## Routes

### Design System Showcase (Public)

| Route | Page | Description |
| --- | --- | --- |
| `/` | Overview | Design system introduction and principles |
| `/tokens` | Tokens | Color, typography, spacing token reference |
| `/atoms` | Atoms | Atomic component gallery |
| `/molecules` | Molecules | Molecule composition showcase |
| `/organisms` | Organisms | Organism component demos |
| `/templates` | Templates | Page layout template previews |
| `/pages` | Pages | Full page compositions |

---

## For AI Agents & Vibe Coders

democrito is optimized to work with AI development tools. Paste or reference the relevant sections when prompting.

### With Lovable

Point your Lovable project to the live design system URL and reference it in prompts:

```
Use democrito (the design system at https://democrito.design)
for all visual decisions. Key rules:
- 3 fonts: Plus Jakarta Sans (font-display) for titles, Satoshi (font-body)
  for body text, JetBrains Mono (font-mono) for ALL data and code content
- Colors: 95% neutral grays, single accent hue, semantic feedback colors
- 3-surface hierarchy: Background → Surface → Card
- Radix UI / shadcn/ui for all component primitives
- Warm theme is default (`:root`). Support Dark (`.dark`) and Light (`.light`) themes.
```

### With Cursor / Claude Code

Reference `src/index.css` directly in your context:

```
@src/index.css
Build a new component following the democrito design system.
Use CSS custom properties (--background, --surface, --card, --foreground).
All user-editable content must use font-mono (JetBrains Mono).
Button labels use font-display (Plus Jakarta Sans).
```

### With v0 / Bolt

Include the core design rules in your system prompt:

```
Design system: monochromatic neutral grays with a single accent color.
Use shadcn/ui components, Tailwind CSS, Lucide React icons.
Typography: font-display for headings, font-body for paragraphs, font-mono for code/data.
No decorative colors — every color has a specific semantic function.
IDE-inspired, clean, distraction-free aesthetic.
```

---

## Tech Stack

| Technology | Purpose |
| --- | --- |
| **React 18** | UI library |
| **TypeScript 5** (strict) | Type safety |
| **Tailwind CSS 4.2** | Utility-first styling with design token integration |
| **Radix UI / shadcn/ui** | Accessible, unstyled component primitives |
| **Lucide React** | Icon library |
| **Vite** | Build tool and dev server |
| **Plus Jakarta Sans + Satoshi + JetBrains Mono** | Three-font typography system |

---

## Documentation

| Resource | Description |
| --- | --- |
| [Live Design System](https://democrito.design) | Interactive component gallery, token reference, and theme playground |
| [`docs/theming.md`](docs/theming.md) | How to customize the system for your brand — palette, fonts, spacing, with full examples |
| [`src/DESIGN_SYSTEM.md`](src/DESIGN_SYSTEM.md) | Complete design system specification — component inventory, token reference, usage rules |
| [`src/index.css`](src/index.css) | CSS custom properties + Tailwind v4 `@theme` — source of truth for all tokens |
| [`design-tokens.json`](design-tokens.json) | W3C DTCG–format tokens for tooling interoperability (Figma, Style Dictionary) |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution guidelines, commit conventions, and component creation workflow |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history following [Keep a Changelog](https://keepachangelog.com/) format |
| [`CLAUDE.md`](CLAUDE.md) | AI agent context file — auto-read by Claude Code, Cursor, and similar tools |
| [`docs/`](docs/README.md) | Documentation hub — architecture, theming guide, AI usage, component references |
| [`skill/democrito/`](skill/democrito/SKILL.md) | Claude Skill folder — portable AI-native context (principles, tokens, components, agent usage) |
| [`.editorconfig`](.editorconfig) | Editor formatting consistency (indent, line endings, charset) |

---

## License & Usage

MIT — see [LICENSE](LICENSE) for the license and [USAGE.md](USAGE.md) for usage
terms, attribution guidance, and the paid kit license summary.

---

## Author

**Mariano** — Creator & Product Lead

[LinkedIn](https://www.linkedin.com/in/mmorerasanchez/)

---

Built with ❤️ from 🇪🇸
