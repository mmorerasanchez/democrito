# Migration Guide

> How to adopt the Atomic Design System in a new project — or migrate from another design system.

---

## 1. Consuming Tokens in a New Project

### Option A: CSS Custom Properties (recommended)

Copy `tokens/index.css` into your project. This gives you all design tokens as CSS variables with three-theme support (Dark, Light, Warm).

```bash
# 1. Copy the token source file
cp tokens/index.css your-project/src/index.css

# 2. Install required dependencies
npm install tailwindcss tailwind-merge class-variance-authority clsx tailwindcss-animate
```

democrito uses Tailwind v4 CSS-first config — all token mappings live in `tokens/index.css`. Copy the `@theme { }` block into your project's CSS.

Then ensure your `main.tsx` (or equivalent entry) imports the CSS:

```tsx
import "./index.css";
```

All tokens are immediately available via Tailwind classes:

```tsx
<div className="bg-surface text-foreground border border-border rounded-lg">
  <h2 className="font-display text-xl">Title</h2>
  <p className="font-body text-muted-foreground">Description</p>
  <code className="font-mono text-accent">variable</code>
</div>
```

### Option B: W3C DTCG JSON (for design tooling)

The [`design-tokens.json`](../design-tokens.json) file follows the [W3C Design Tokens Community Group](https://design-tokens.github.io/community-group/format/) format. Use it with:

| Tool | How |
|---|---|
| **Figma Token Studio** | Import `design-tokens.json` directly as a token set |
| **Style Dictionary** | Point your `config.json` source to `design-tokens.json` and build to any platform (CSS, iOS, Android) |
| **Specify** | Sync tokens from the JSON file into your design tool pipeline |
| **Tokens Studio** | Load as a local token source |

```json
// Style Dictionary config example
{
  "source": ["design-tokens.json"],
  "platforms": {
    "css": {
      "transformGroup": "css",
      "buildPath": "build/css/",
      "files": [{
        "destination": "variables.css",
        "format": "css/variables"
      }]
    }
  }
}
```

### Option C: Cherry-Pick Tokens

If you only need a subset (e.g., just colors), copy the relevant `:root` block and `@theme` entries from `tokens/index.css`.

Minimum viable setup — just the 3-surface hierarchy and accent:

```css
:root {
  --background: 20 14% 4%;
  --surface: 20 8% 8%;
  --card: 12 6% 15%;
  --foreground: 60 9% 98%;
  --accent: 18 65% 55%;
  --accent-foreground: 60 9% 98%;
  --border: 25 8% 25%;
  --radius: 0.75rem;
}
```

---

## 2. Migrating from Other Design Systems

### From Material UI (MUI)

| MUI Concept | Atomic DS Equivalent |
|---|---|
| `theme.palette.primary.main` | `--accent` (terracotta) or `--primary` |
| `theme.palette.background.paper` | `--card` |
| `theme.palette.background.default` | `--background` |
| `theme.palette.text.primary` | `--foreground` |
| `theme.palette.text.secondary` | `--muted-foreground` |
| `theme.palette.error.main` | `--error` |
| `theme.spacing(n)` | Tailwind spacing (`p-4`, `gap-6`, etc.) |
| `theme.shape.borderRadius` | `--radius` |

**Key difference:** MUI uses JavaScript theme objects; this system uses CSS custom properties. Replace `sx={{ bgcolor: 'primary.main' }}` with `className="bg-accent"`.

### From Chakra UI

| Chakra Concept | Atomic DS Equivalent |
|---|---|
| `colorScheme="blue"` | `bg-accent` / `text-accent` |
| `bg="gray.800"` | `bg-surface` or `bg-card` |
| `color="gray.400"` | `text-muted-foreground` |
| `<Heading size="lg">` | `<Heading level={2}>` (atom) |
| `<Text fontSize="sm">` | `<Text variant="muted">` (atom) |
| `useColorModeValue()` | CSS variables auto-switch via `.light` / `.warm` class |

**Key difference:** Chakra uses runtime color mode values; this system uses CSS class-based theming with zero JavaScript overhead.

### From Bootstrap

| Bootstrap Concept | Atomic DS Equivalent |
|---|---|
| `$primary` | `--accent` |
| `$body-bg` | `--background` |
| `$body-color` | `--foreground` |
| `$border-color` | `--border` |
| `$border-radius` | `--radius` |
| `.text-muted` | `text-muted-foreground` |
| `.bg-light` | `bg-surface` |
| `.card` | `bg-card` with shadcn `<Card>` |
| `.btn-primary` | shadcn `<Button>` with `variant="default"` |

**Key difference:** Bootstrap uses Sass variables compiled at build time; this system uses CSS custom properties that switch at runtime via theme classes.

### From Tailwind UI / Headless UI

This is the closest migration path since the system is built on Tailwind + Radix UI:

1. Replace hardcoded Tailwind colors (`bg-gray-900`, `text-blue-500`) with semantic tokens (`bg-surface`, `text-accent`)
2. Replace Headless UI components with shadcn/ui equivalents (same Radix primitives)
3. Add the font-family classes (`font-display`, `font-body`, `font-mono`) per the typography rules

---

## 3. Step-by-Step Migration Checklist

### Phase 1: Foundation (Day 1)

- [ ] Copy `tokens/index.css` into your project (contains both tokens and `@theme` mappings)
- [ ] Add font `@import` statements (Plus Jakarta Sans, Satoshi, JetBrains Mono)
- [ ] Verify the three themes render correctly (add `.light` or `.warm` class to `<html>`)
- [ ] Install shadcn/ui: `npx shadcn@latest init`

### Phase 2: Token Swap (Day 2–3)

- [ ] Find-and-replace hardcoded colors → semantic tokens (see mapping tables above)
- [ ] Replace font utilities → `font-display`, `font-body`, `font-mono`
- [ ] Replace spacing constants → Tailwind utilities or layout tokens (`--header-height`, etc.)
- [ ] Replace border-radius values → `rounded-sm` / `rounded-md` / `rounded-lg`

### Phase 3: Component Swap (Day 3–5)

- [ ] Replace buttons with shadcn `<Button>` variants
- [ ] Replace form inputs with shadcn primitives (`<Input>`, `<Select>`, `<Checkbox>`)
- [ ] Replace modals/dialogs with shadcn `<Dialog>`
- [ ] Adopt Atomic components where available (`<Heading>`, `<Text>`, `<Tag>`, `<Code>`, `<Kbd>`)

### Phase 4: Validation (Day 5)

- [ ] Verify WCAG AA contrast in all three themes
- [ ] Test responsive breakpoints (`sm:480`, `md:768`, `lg:1024`, `xl:1280`)
- [ ] Check `prefers-reduced-motion` media query
- [ ] Visual regression test across themes

---

## 4. Common Pitfalls

| Pitfall | Solution |
|---|---|
| Using `text-white` / `bg-black` directly | Always use `text-foreground` / `bg-background` — they adapt to themes |
| Mixing `hex` / `rgb` with the HSL token system | All tokens are HSL. Use `hsl(var(--accent))` in custom CSS |
| Forgetting `font-mono` on data content | Prompts, code, table data, and user-generated content must use `font-mono` |
| Only testing dark theme | Always verify Light and Warm themes — contrast ratios differ |
| Importing component CSS from old system alongside new tokens | Remove old design system CSS completely to avoid specificity conflicts |

---

## 5. Need Help?

- 📖 **[Theming Guide](./theming.md)** — full rebranding walkthrough with examples
- 🎨 **[Tokens Reference](./tokens.md)** — complete token inventory
- 🧱 **[Component Docs](./components/)** — atoms, molecules, organisms API reference
- 🤖 **[AI Usage Guide](../ai/README.md)** — optimized prompts for Lovable, Cursor, Claude Code
