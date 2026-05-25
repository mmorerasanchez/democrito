# Contributing to democrito

Thank you for considering contributing to **democrito** — a production-ready, product-agnostic atomic design system for developers and AI agents! 🎉

Whether you're fixing a bug, proposing a new component, improving documentation, or suggesting a design token change — your contributions make this project better for everyone. We appreciate your time and effort.

---

## Development Setup

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:

```bash
git clone https://github.com/<your-username>/democrito.git
cd democrito
```

3. **Install dependencies**:

```bash
npm install
```

4. **Start the dev server** (with live preview):

```bash
npm run dev
```

5. **Run tests** to make sure everything passes:

```bash
npm test
```

6. **Create a branch** for your changes:

```bash
git checkout -b feat/your-feature-name
```

---

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/) scoped to design system layers.

### Format

```
<type>(<scope>): <short description>
```

### Examples

| Commit | Description |
| --- | --- |
| `feat(atoms): add Tooltip atom component` | New atom component |
| `feat(molecules): add CopyButton molecule` | New molecule component |
| `fix(organisms): fix DataTable sort order` | Bug fix in an organism |
| `feat(tokens): add --spacing-2xs token` | New design token |
| `refactor(templates): simplify EditorLayout grid` | Code refactor |
| `docs: update README architecture tree` | Documentation only |
| `chore: upgrade tailwindcss to 3.5` | Tooling / dependency updates |
| `test(molecules): add SearchBar unit tests` | Test additions |

### Scopes

- `atoms`, `molecules`, `organisms`, `templates` — component layers
- `ui` — shadcn/ui primitives
- `tokens` — design tokens (`index.css`, `tailwind.config.ts`)
- `pages` — route pages
- No scope for cross-cutting changes (`docs:`, `chore:`, `ci:`)

---

## Adding a New Component

### 1. Determine the atomic level

| Level | Criteria | Examples |
| --- | --- | --- |
| **Atom** | Single-purpose, no child components | `Heading`, `Tag`, `Spinner` |
| **Molecule** | Composition of 2+ atoms | `FormField`, `StatCard`, `SearchBar` |
| **Organism** | Major UI section, may include molecules | `DataTable`, `SidebarNav`, `PromptCard` |
| **Template** | Page layout shell (no business logic) | `EditorLayout`, `DashboardLayout` |

### 2. Create the component file

Place it in the correct directory:

```
src/components/<level>/YourComponent.tsx
```

- **One component per file**, PascalCase filename
- Use TypeScript with an explicit props interface

### 3. Define TypeScript types

```tsx
interface YourComponentProps {
  /** The main label displayed to the user */
  label: string;
  /** Optional variant for visual styling */
  variant?: "default" | "accent" | "muted";
  /** Callback fired on user interaction */
  onAction?: () => void;
}

export function YourComponent({ label, variant = "default", onAction }: YourComponentProps) {
  // Use semantic design tokens — never hardcode colors
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
      <span className="font-display text-base">{label}</span>
    </div>
  );
}
```

### 4. Follow design system rules

- **Colors**: Use semantic tokens (`bg-surface`, `text-foreground`, `text-accent`) — never hardcode hex/rgb
- **Typography**: `font-display` for headings/labels, `font-body` for body text, `font-mono` for data/code
- **Spacing**: Use Tailwind spacing utilities
- **Extend shadcn/ui** via CVA variants when building on existing primitives

### 5. Write tests

Add a test file alongside your component or in `src/test/`:

```bash
npm test
```

### 6. Update the barrel export

Add your component to the layer's `index.ts`:

```ts
// src/components/<level>/index.ts
export { YourComponent } from "./YourComponent";
```

### 7. Submit a pull request

- Use a clear title following the commit convention: `feat(molecules): add CopyButton molecule`
- Describe **what** you added, **why**, and include a screenshot if visual
- Reference any related issues

---

## Design Token Changes

Design tokens are the foundation of the visual system. Changes to tokens affect every component, so they require careful consideration.

### Where tokens live

| File | Role |
| --- | --- |
| `src/index.css` | CSS custom properties (source of truth), three-theme definitions |
| `tailwind.config.ts` | Tailwind mappings to CSS variables |

### How to propose a token change

1. **Open an issue first** describing the token you want to add, modify, or remove — and why
2. **Update `src/index.css`** with the new token in all three themes (`:root` dark, `.light`, `.warm`)
3. **Update `tailwind.config.ts`** if the token needs a Tailwind utility class
4. **Update `docs/design-system.md`** to document the new token
5. **Test visually** across all three themes using the theme toggle in the showcase (`/tokens`)
6. Submit a PR with before/after screenshots showing all three themes

### Token naming convention

```
--<category>-<name>
```

Examples: `--background`, `--surface`, `--accent`, `--status-draft`, `--anatomy-role`

---

## Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).

By participating, you agree to uphold a welcoming, inclusive, and harassment-free environment for everyone.

If you experience or witness unacceptable behavior, please report it by opening an issue or contacting the maintainer directly.

---

## Questions?

Open a [GitHub issue](https://github.com/mmorerasanchez/democrito/issues) or reach out on [LinkedIn](https://www.linkedin.com/in/mmorerasanchez/).

Thank you for helping make **democrito** better! 🧡
