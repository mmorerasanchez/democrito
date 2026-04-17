# ⚛️ democrito

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18+-61DAFB?logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4+-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-latest-000000?logo=shadcnui&logoColor=white)

**A general-purpose, themeable atomic design system** — the visual foundation of prompt-x, a prompt engineering platform. Built on React, Tailwind CSS, and Radix UI with structured tokens, accessible components, and three-theme support.

Ship dashboards, editors, workspaces, and data-heavy tools with a consistent visual language that works for both humans and AI agents.

[🌐 Live Demo](https://democrito.design) · [📦 GitHub](https://github.com/mmorerasanchez/democrito)

---

## Why This Exists

AI-assisted development tools like Lovable, Cursor, v0, and Claude Code generate UI at incredible speed — but without a shared design system, every generated component looks different. Colors drift, typography is inconsistent, spacing feels random, and the product loses its identity.

**democrito** solves that by providing a **single source of truth** for every visual decision: CSS custom properties as design tokens, pre-built accessible components following Atomic Design, a three-font typography hierarchy, and a monochromatic + accent color philosophy. Whether a human engineer or an AI agent is building the next feature, the output is consistent and professional.

**Use it for:** prompt engineering tools, analytics dashboards, developer platforms, internal tools, AI chat interfaces, or any application where clarity and density matter.

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
# Install the democrito base (dark + light themes, tokens, fonts)
npx shadcn@latest add https://github.com/mmorerasanchez/democrito/raw/main/registry.json democrito

# Optionally add the warm theme variant
npx shadcn@latest add https://github.com/mmorerasanchez/democrito/raw/main/registry.json democrito-warm
```

> See [`registry.json`](registry.json) for the full manifest.

---

## Architecture

The design system follows **Atomic Design** methodology — Atoms → Molecules → Organisms → Templates — with design tokens defined as CSS custom properties in `src/index.css` and mapped through `tailwind.config.ts`.

> **Token formats:** The source of truth is CSS custom properties in `src/index.css`. A [`design-tokens.json`](design-tokens.json) file in [W3C DTCG format](https://design-tokens.github.io/community-group/format/) is also provided for tooling interoperability (Figma Token Studio, Style Dictionary, Specify, etc.). See [`docs/tokens.md`](docs/tokens.md) for the full reference.

```
src/
├── index.css                          # Design tokens (CSS custom properties), font imports, base resets
│
├── components/
│   ├── atoms/                         # Smallest building blocks (7 components)
│   ├── molecules/                     # Compositions of atoms (18 components)
│   ├── organisms/                     # Major UI sections (15 components)
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
| **Atoms** | 7 | Typography, code, tags, links, spinners |
| **Molecules** | 18 | Form fields, nav items, stat cards, search bars |
| **Organisms** | 15 | Navigation, data tables, auth forms, settings, import/export |
| **Templates** | 7 | Page layout shells (app shell, editor, dashboard) |
| **UI Primitives** | 40+ | shadcn/ui + Radix UI accessible base components |

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
// Swap fonts in tailwind.config.ts
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
| **IDE-Inspired** | Clean, distraction-free workspace optimized for prompt engineering |

> See [`docs/principles.md`](docs/principles.md) for the full guide with examples.

---

## Three-Theme Support

All tokens are defined as HSL in `src/index.css`. Hex approximations below for quick reference.

| Token | Dark (Default) | Light | Warm |
| --- | --- | --- | --- |
| `--background` | `hsl(20 14% 4%)` · `#0E0C0B` | `hsl(30 5% 96%)` · `#F5F4F3` | `hsl(30 18% 91%)` · `#EDE8E2` |
| `--surface` | `hsl(20 8% 8%)` · `#161413` | `hsl(40 6% 97%)` · `#F8F7F6` | `hsl(40 15% 94%)` · `#F3F0EB` |
| `--card` | `hsl(12 6% 15%)` · `#282423` | `hsl(40 8% 99%)` · `#FDFCFB` | `hsl(30 25% 97%)` · `#FAF8F5` |
| `--foreground` | `hsl(60 9% 98%)` · `#FAFAF9` | `hsl(24 10% 10%)` · `#1C1917` | `hsl(12 6% 15%)` · `#282423` |
| `--accent` | `hsl(18 65% 55%)` · `#D4734A` | `hsl(18 65% 55%)` · `#D4734A` | `hsl(18 60% 45%)` · `#B85C33` |

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
- Dark theme is default. Support Light and Warm themes.
```

### With Cursor / Claude Code

Reference `src/index.css` and `tailwind.config.ts` directly in your context:

```
@src/index.css @tailwind.config.ts
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
| **Tailwind CSS 3.4** | Utility-first styling with design token integration |
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
| [`src/index.css`](src/index.css) | CSS custom properties, font imports, three-theme definitions, base resets |
| [`tailwind.config.ts`](tailwind.config.ts) | Tailwind CSS integration with all custom tokens, fonts, spacing, and animations |
| [`design-tokens.json`](design-tokens.json) | W3C DTCG–format tokens for tooling interoperability (Figma, Style Dictionary) |
| [`CONTRIBUTING.md`](CONTRIBUTING.md) | Contribution guidelines, commit conventions, and component creation workflow |
| [`CHANGELOG.md`](CHANGELOG.md) | Version history following [Keep a Changelog](https://keepachangelog.com/) format |
| [`CLAUDE.md`](CLAUDE.md) | AI agent context file — auto-read by Claude Code, Cursor, and similar tools |
| [`docs/`](docs/README.md) | Documentation hub — architecture, theming guide, AI usage, component references |
| [`skill/democrito/`](skill/democrito/SKILL.md) | Claude Skill folder — portable AI-native context (principles, tokens, components, agent usage) |
| [`.editorconfig`](.editorconfig) | Editor formatting consistency (indent, line endings, charset) |

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

## Author

**Mariano** — Creator & Product Lead

[LinkedIn](https://www.linkedin.com/in/mmorerasanchez/)

---

Built with ❤️ from 🇪🇸
