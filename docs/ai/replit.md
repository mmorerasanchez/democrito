# democrito with Replit, v0, Bolt, and Web-Based Tools

> These tools don't have filesystem access to read `CLAUDE.md`. Paste the compact
> token reference (in [`docs/ai/README.md`](./README.md)) into your first prompt,
> then write your request.

---

## Replit

Paste the compact token reference into your Replit AI agent's context, then include
the live demo URL for visual reference. The compact block is your primary context
source since Replit agents can't read files from your repo.

### Example prompt structure

```
[Paste compact token reference here]

Using the design system context above, create a React component called MetricCard.
It's a molecule (composition of atoms). Props: label (string), value (string),
change (number), trend ("up" | "down").

Requirements:
- font-display for the label, font-mono for the value
- text-success for positive change, text-error for negative
- bg-card border border-border rounded-lg p-4
- Never hardcode hex, RGB, or HSL values
```

---

## v0, Bolt, and other web-based tools

Same approach as Replit — no filesystem access, so the compact token reference is
your primary context. Paste it at the start of the session, then write your request.

### Example prompt structure

```
[Paste compact token reference here]

Using the design system context above, create a React component called MetricCard.
It's a molecule (composition of atoms). Props: label (string), value (string),
change (number), trend ("up" | "down").

Requirements:
- font-display for the label, font-mono for the value
- text-success for positive change, text-error for negative
- bg-card border border-border rounded-lg p-4
- Never hardcode hex, RGB, or HSL values
```

### Tips for web-based tools

- Include the live showcase URL (`https://democrito.design`) for visual reference.
- Paste only the compact token reference, not the full `docs/reference/tokens.md` — it's too long.
- Name the atomic level explicitly in every prompt ("this is a molecule — it composes atoms").

---

## Further reading

- [`docs/ai/README.md`](./README.md) — compact token reference to paste
- [`docs/reference/design-system.md`](../reference/design-system.md) — full component inventory
