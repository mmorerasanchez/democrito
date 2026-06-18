# democrito with Claude Code and Terminal Agents

> Claude Code is democrito's primary terminal environment. It auto-reads `CLAUDE.md`
> on startup, giving it the full architecture reference and coding rules before you
> type a word.

---

## Claude Code

### Setup

```bash
# Clone and enter the project
git clone https://github.com/mmorerasanchez/democrito.git
cd democrito

# Start Claude Code — CLAUDE.md loads automatically
claude
```

### Install the democrito Skill

The skill gives Claude Code on-demand access to the full token reference, component
inventory, and principles — without embedding everything in CLAUDE.md:

```
cp -R skill/democrito ~/.claude/skills/
```

Invoke in session: `Use the democrito skill` or reference it directly in prompts.

### Context budget awareness

Claude Code follows ~150–200 instructions before compliance drops (its own system
prompt uses ~50 slots). Keep `CLAUDE.md` lean — use pointers to files, not embedded
content. Use `/clear` between unrelated tasks to reset accumulated context while
keeping `CLAUDE.md`.

**Per-repo vs global:** `CLAUDE.md` is per-project. For rules that apply across
all your products built on democrito, add a global `~/.claude/CLAUDE.md`. Put
democrito's universal rules there; keep product-specific overrides in the repo's
`CLAUDE.md`.

### Example prompts

```
Create a new atom called Avatar in registry/atoms/.
Use rounded-full, bg-muted for fallback, font-display text-xs for initials.
Export from the atoms index.
```

```
Build a PromptRunCard molecule. Props: prompt name (font-display text-base),
model badge (font-mono text-xs), latency (text-muted-foreground), status dot
using --status-* tokens. Follow the StatCard pattern.
```

```
Refactor TopBar to add a global search input.
Use the SearchBar molecule. Input: bg-surface, border-border, font-mono.
Refer to the existing TopBar.tsx for layout pattern.
```

### Tips

- Reference specific files: "check `registry/atoms/` before creating."
- Mention atomic level: "this is a molecule — it composes atoms."
- Use the democrito skill for token lookups mid-session.

---

## Cowork (Claude desktop)

Cowork is Claude's desktop planning tool. It reads project instructions and has
access to local files. Its role in a democrito workflow is **project-level
intelligence** — audits, planning, doc writing — not code generation.

### Setup

In your Cowork project instructions, include a brief democrito context block:

```
This project is democrito — a React + TypeScript + Tailwind v4 atomic design
system. Source is at the repo root (democrito/).
Key files: CLAUDE.md (coding rules), DESIGN.md (visual philosophy),
docs/ (documentation), docs/reference/design-system.md (component inventory).
The democrito skill is available — use it for token lookups and component
inventory checks.
```

### What Cowork is good for with democrito

- Auditing the component inventory against the atomic split
- Planning Claude Code sessions (what to build, in what order)
- Writing and reviewing documentation (docs/ updates, Notion mirrors)
- Token consistency checks across themes
- Reviewing DESIGN.md for accuracy after a refactor

### What to use instead

Cowork doesn't run builds or generate React components. For code generation,
use Claude Code. For visual generation, use Claude Design.

---

## Further reading

- [`CLAUDE.md`](../../CLAUDE.md) — auto-read context file; full architecture and rules
- [`docs/ai/README.md`](./README.md) — AI context layer overview and compact token reference
- [`docs/ai/claude-design.md`](./claude-design.md) — visual generation + handoff to Claude Code
