# Getting Started with democrito

> democrito is an **atomic design system** and **visual foundation** for prompt engineering tools, dashboards, and AI-powered applications. Ship consistent, themeable interfaces across React, Next.js, Astro, Vue, and Svelte — or integrate with Claude Code, Lovable, v0, and other AI development tools.

Whether you're a **developer integrating democrito into your project** or a **contributor exploring the codebase**, this guide has the path for you.

---

## Path 1: Use democrito in Your Project

### For Design Engineers & React/Next.js/Astro Developers

You don't need to clone the repo. Install democrito's **design tokens and visual foundation** directly into your project in under 5 minutes.

---

### Option A: shadcn CLI (Recommended — One Command)

The fastest way to get democrito's tokens, fonts, and CSS custom properties working.

```bash
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito
```

**What this installs:**
- **CSS custom properties** (design tokens) — 70+ variables across 3 themes
- **Tailwind config mappings** — tokens available as Tailwind utilities
- **Three Google Fonts** — Plus Jakarta Sans (display), Satoshi (body), JetBrains Mono (data)
- **cn() utility** — classname merging for conditional styles
- **Three-surface depth hierarchy** — background → surface → card
- **Three theme definitions** — dark (default), light, warm

**Important:** This does NOT install React components. democrito provides the **design tokens and visual foundation** that makes shadcn/ui components (button, card, input, etc.) look consistent with your design system. Install shadcn components separately as needed:

```bash
npx shadcn@latest add button card input
```

**For the warm theme variant**, also run:

```bash
npx shadcn@latest add https://raw.githubusercontent.com/mmorerasanchez/democrito/main/registry.json democrito-warm
```

**After installation**, switch themes by adding a class to your root element:

```html
<!-- Dark (default) -->
<html>

<!-- Light -->
<html class="light">

<!-- Warm -->
<html class="warm">
```

---

### Option B: Manual Token Copy (Any Framework)

For projects not using shadcn CLI, non-React stacks (Vue, Svelte), or plain HTML/CSS.

**1. Copy the CSS custom properties**

Download or copy `src/index.css` from the [democrito repository](https://github.com/mmorerasanchez/democrito) and import it into your project:

```tsx
// main.tsx or main.js
import "./index.css";
```

**2. Copy the Tailwind config**

If using Tailwind CSS, copy the font families, spacing, colors, and animation sections from `tailwind.config.ts` into your project's config.

**3. Add the three fonts**

These load via Google Fonts in `src/index.css`. If you're not importing the full CSS file, add them to your `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
```

For Satoshi, which comes from [Fontshare](https://www.fontshare.com/fonts/satoshi), download the webfont and self-host it in your project.

**4. Start using semantic tokens**

```css
.my-card {
  @apply bg-card text-card-foreground border border-border rounded-lg p-4;
}
```

Available tokens: `bg-surface`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-accent`, `text-accent`, `font-display`, `font-body`, `font-mono`, and many more. See [Design Tokens](./tokens.md) for the complete reference.

---

### Option C: Claude Code / Claude Skill (AI-Assisted Development)

If you're using **Claude Code**, **Cursor**, or **Claude Code in your IDE**, point the AI agent to democrito for instant on-system code generation.

**Claude Code setup:**

```bash
claude add democrito
```

Or manually reference the CLAUDE.md file in your prompts:

```
@CLAUDE.md
Build a new component following the democrito design system.
Use CSS custom properties (--background, --surface, --card, --foreground).
All user-editable content uses font-mono. Button labels use font-display.
```

**Cursor setup:**

In your `.cursorrules` file or in a prompt:

```
@CLAUDE.md
@src/index.css
@tailwind.config.ts
```

The agent will read democrito's token definitions and generate components that integrate seamlessly.

---

## What You Get

| Feature | Details |
|---|---|
| **70+ CSS Custom Properties** | Complete token set across 3 themes (dark, light, warm) |
| **3-Surface Depth Hierarchy** | `--background` (page) → `--surface` (panels) → `--card` (elevated) |
| **3-Font Typography System** | Display (headings), Body (content), Mono (data/code) |
| **Monochromatic + Accent** | 95% warm stone grays, single terracotta accent, semantic colors |
| **Full WCAG 2.1 AA** | Accessible color contrast, 44×44px touch targets, keyboard nav |
| **Zero Breaking Changes** | Override tokens for custom branding without touching code |

---

## Works With

| Tool | Integration | Notes |
|---|---|---|
| **React + Tailwind** | Full support via shadcn registry | Option A recommended |
| **Next.js** | Full support via shadcn registry | Works with App and Pages Router |
| **Astro** | Full support | Use Option A or manual copy |
| **Vue / Svelte** | Token-level support | Use Option B (manual copy) |
| **Lovable / v0 / Bolt** | Reference in AI prompts | Paste design token reference + live demo URL |
| **Claude Code / Cursor** | Full support via CLAUDE.md | AI agents read token context automatically |
| **GitHub Copilot** | Token reference via comments | Include semantic class names in prompts |

---

## Quick Verification

After installing via shadcn CLI or copying tokens manually, verify the system is working:

```tsx
// Create a simple test component
export function CardTest() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
      <h3 className="font-display text-base">democrito is working!</h3>
      <p className="font-body text-sm text-muted-foreground">
        Your tokens are active.
      </p>
    </div>
  );
}
```

The card should render with the selected theme's colors. Switch themes by toggling the `class` on your `<html>` element.

---

## Customize for Your Brand

democrito is built for zero-effort theming. Override any token in your CSS:

```css
/* Your project's CSS */
:root {
  --accent: 210 100% 55%;        /* Swap terracotta for electric blue */
  --background: 220 15% 6%;      /* Change the page background */
  --radius: 0.5rem;              /* Sharper corners */
}

.light {
  --accent: 210 100% 50%;        /* Different accent for light theme */
}
```

No component code changes needed. Every component automatically inherits your new palette.

For a complete theming guide with real-world examples, see [Theming](./theming.md).

---

## Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | 18+ |
| **npm** (or your package manager) | 9+ |
| **Git** (for cloning, not required for shadcn CLI install) | Any recent version |

---

## Next Steps for Users

| Resource | Description |
|---|---|
| [Design Tokens Reference](./tokens.md) | Complete inventory of colors, typography, spacing, radii |
| [Theming Guide](./theming.md) | Customize democrito for your brand — full examples included |
| [Architecture](./architecture.md) | Atomic Design rationale and component composition rules |
| [Migration Guide](./migration.md) | Switching from MUI, Chakra, Bootstrap, or Tailwind UI |
| [AI Usage Guide](./ai-usage.md) | Using democrito with Lovable, Cursor, Claude Code, v0 |
| [Live Demo](https://democrito.design/) | Interactive token reference and component showcase |

---

---

## Path 2: Explore & Contribute

### For Contributors & System Explorers

Clone the repository and run the interactive showcase locally. Browse all 47 components, tokens, and themes. Contribute components, tokens, or documentation.

```bash
git clone https://github.com/mmorerasanchez/democrito.git
cd democrito
npm install
npm run dev
```

Opens the showcase at `http://localhost:5173` with hot-reload. You'll see:

- **Tokens** — Interactive color, typography, and spacing reference
- **Atoms** — 7 smallest building blocks (Heading, Tag, Spinner, Code, Kbd, Link, Text)
- **Molecules** — 18 composed components (FormField, SearchBar, StatCard, TabNav, FilterBar)
- **Organisms** — 15 major UI sections (DataTable, TopBar, PromptCard, SidebarNav)
- **Templates** — 7 layout shells (AppShell, EditorLayout, DashboardLayout)

### Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server with hot-reload |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest unit tests |

### Project Structure

```
src/
├── index.css                  # Design tokens (CSS custom properties) — source of truth
├── components/
│   ├── atoms/                 # Single-purpose building blocks
│   ├── molecules/             # Compositions of 2+ atoms
│   ├── organisms/             # Major UI sections
│   ├── templates/             # Layout shells
│   └── ui/                    # shadcn/ui primitives (extend, never modify)
├── pages/                     # Route pages for the showcase
├── hooks/                     # Custom React hooks (use-theme, use-mobile)
└── lib/                       # Utilities (cn helper, etc.)

tailwind.config.ts            # Tailwind token mappings
design-tokens.json            # W3C DTCG format for tooling interop
CLAUDE.md                      # AI agent context (auto-read by Claude Code, Cursor)
CONTRIBUTING.md               # Contribution guidelines
```

### Contributing

Read [CONTRIBUTING.md](../CONTRIBUTING.md) for:
- Component creation workflow (atoms → molecules → organisms)
- Commit conventions (Conventional Commits scoped to layers)
- Design token proposal process
- Pull request checklist

**Quick summary:**
1. Determine the atomic level (atom, molecule, organism, template)
2. Create the component file with TypeScript props
3. Use only semantic design tokens — never hardcode colors
4. Follow the three-font typography system
5. Extend shadcn/ui primitives via CVA variants
6. Update the barrel export (`index.ts`)
7. Write tests if adding a component
8. Submit a PR with a clear description

### Design Rules for Contributors

1. **Never hardcode colors** — use semantic tokens (`bg-surface`, `text-accent`, `border-border`)
2. **Three fonts**: `font-display` for headings, `font-body` for body text, `font-mono` for data/code
3. **Three surfaces**: `--background` → `--surface` → `--card` for depth hierarchy
4. **Extend shadcn/ui** via CVA variants — never rebuild primitives from scratch
5. **All themes**: new tokens must be defined in `:root`, `.light`, and `.warm`

---

## Questions or Issues?

- **[GitHub Issues](https://github.com/mmorerasanchez/democrito/issues)** — Report bugs, propose features, ask questions
- **[Discussions](https://github.com/mmorerasanchez/democrito/discussions)** — Community conversations
- **[Creator: Mariano](https://www.linkedin.com/in/mmorerasanchez/)** — LinkedIn

---

## Further Reading

| Document | Focus |
|---|---|
| [README.md](../README.md) | Project overview, why democrito exists, tech stack |
| [Architecture](./architecture.md) | Atomic Design decisions, layer descriptions, composition rules |
| [Design Tokens](./tokens.md) | Token inventory with hex values, theme definitions |
| [Theming](./theming.md) | Brand customization — palette, fonts, spacing, real examples |
| [AI Usage](./ai-usage.md) | Prompting strategies for Lovable, Cursor, Claude Code, v0 |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Development setup, commit conventions, component creation |
| [CLAUDE.md](../CLAUDE.md) | AI agent context — auto-read by Claude Code, Cursor |
| [DESIGN_SYSTEM.md](../src/DESIGN_SYSTEM.md) | Complete spec — component inventory, tokens, rules |

---

**Built with** ❤️ **for designers, developers, and AI agents.**
