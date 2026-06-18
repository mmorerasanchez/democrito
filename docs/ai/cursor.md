# democrito with Cursor, Windsurf, and IDE Agents

> Cursor, Windsurf, and similar IDE agents auto-read `CLAUDE.md` at the project root,
> giving them the full architecture reference and coding rules before you type a word.

---

## Setup

```bash
git clone https://github.com/mmorerasanchez/democrito.git
# Open the folder in Cursor or Windsurf — CLAUDE.md loads automatically
```

**In Cursor:** Use `@CLAUDE.md` to explicitly reference the context file in prompts.

**In Windsurf:** `CLAUDE.md` is loaded as project rules automatically.

---

## Tips

- Reference specific component files in your prompts so the agent reads patterns
  directly from the source.
- The democrito Claude Skill doesn't install in Cursor/Windsurf — use the compact token
  reference block from [`docs/ai/README.md`](./README.md) as your fallback context.
- Name the atomic level in every prompt: "this is a molecule — it composes two atoms."
- For token lookups, point the agent at `docs/reference/tokens.md` or `tokens/index.css`.

---

## Further reading

- [`CLAUDE.md`](../../CLAUDE.md) — auto-read context file; full architecture and rules
- [`docs/ai/README.md`](./README.md) — AI context layer overview and compact token reference
- [`docs/reference/tokens.md`](../reference/tokens.md) — complete token inventory
