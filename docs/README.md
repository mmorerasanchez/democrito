# democrito Documentation

> Comprehensive documentation for the **democrito** Atomic Design System — a general-purpose, themeable system for data-dense, IDE-inspired applications.

---

## Guides

| Document | Description |
|---|---|
| [Getting Started](./guides/getting-started.md) | Installation, dev setup, and first steps |
| [Design Principles](./reference/principles.md) | The 6 foundational beliefs behind every design decision |
| [Architecture](./reference/architecture.md) | Atomic Design decisions and rationale |
| [Design Tokens](./reference/tokens.md) | Complete tokens reference — colors, typography, spacing, radii, motion |
| [Theming](./reference/theming.md) | How to customize the system for your brand — palette, fonts, spacing, with full examples |
| [AI Usage](./ai/ai-usage.md) | How to use this design system with AI coding tools (Claude, Cursor, Copilot) |
| [Migration](./reference/migration.md) | How to consume tokens in a new project and migrate from MUI, Chakra, Bootstrap, or Tailwind UI |
| [Content Guidelines](./guides/content-guidelines.md) | Voice, button labels, empty states, error messages, and AI copy anti-patterns |
| [AI Context](./ai/ai-context.md) | Agent entry point — reading order, decision hierarchy, and AI bias suppression rules |

## Component Reference

| Document | Level | Description |
|---|---|---|
| [Atoms](./components/atoms.md) | Atoms | Foundational building blocks — `Heading`, `Tag`, `Spinner`, `Code`, `Kbd`, `Link`, `Text` |
| [Molecules](./components/molecules.md) | Molecules | Compositions of atoms — `FormField`, `SearchBar`, `StatCard`, `TokenCounter`, `TabNav` |
| [Organisms](./components/organisms.md) | Organisms | Major UI sections — `TopBar`, `DataTable`, `PromptCard`, `FilterBar`, `DashboardStats` |
| [Templates](./components/templates.md) | Templates | Page layout shells — `AppShell`, `EditorLayout`, `LibraryLayout`, `DashboardLayout` |

## Patterns

| Document | Description |
|---|---|
| [Disable State](./patterns/disable-state.md) | When and how to apply disabled, read-only, and hidden states — atom vs container scope |
| [Form](./patterns/form.md) | Spacing rules for label → field → submit — field gaps, section gaps, inline error spacing |
| [Card](./patterns/card.md) | Spacing rules for card padding, header → body gap, compact stat card variant |

## Claude Skill (Portable AI Context)

The [`skill/democrito/`](../skill/democrito/SKILL.md) folder provides a self-contained set of design-system context files optimized for AI agents. It includes condensed versions of principles, tokens, components, and agent usage guides — ready to drop into any Claude Skill, MCP knowledge source, or AI tool context window.

| File | Description |
|---|---|
| [SKILL.md](../skill/democrito/SKILL.md) | Overview, architecture, and coding rules |
| [principles.md](../skill/democrito/principles.md) | 6 core design principles |
| [tokens.md](../skill/democrito/tokens.md) | Compact token reference |
| [components.md](../skill/democrito/components.md) | Full component inventory |
| [agent-usage.md](../skill/democrito/agent-usage.md) | Prompting strategies and compact token block |

## Root Documentation

These files live at the project root:

| File | Purpose |
|---|---|
| [README.md](../README.md) | Project overview, live demo, and quick start |
| [CONTRIBUTING.md](../CONTRIBUTING.md) | Development workflow, commit conventions, PR guidelines |
| [CHANGELOG.md](../CHANGELOG.md) | Version history (Keep a Changelog format) |
| [CLAUDE.md](../CLAUDE.md) | AI agent context file — auto-read by Claude Code, Cursor, etc. |
| [LICENSE](../LICENSE) | MIT License |
