

## Implementation Plan — Lovable-tagged changes from Notion

This plan covers the 10 Lovable-tagged tasks from your Notion "changes @democrito" database. After each task is implemented, its Status will be set to **Review** in the Notion database.

---

### Task Order and Dependencies

```text
Phase 1 (no dependencies, parallel-safe):
  P1.1  Author docs/components/templates.md
  P1.3  Slim CLAUDE.md tokens section
  P1.4  Fix live URL inconsistency in README
  P1.5  Delete bun.lockb and gitignore it
  P1.6  Generate GitHub social preview image
  P1.8  Write token contract test

Phase 1 (needs external input):
  P1.2  Move principles to docs/principles.md
        → Requires you to paste democrito-principles.md content

Phase 3 (dependencies noted):
  P3.2  Build public Claude Skill folder
        → Depends on P1.2 (principles.md must exist) + P3.1 (Cowork task, not Lovable)
  P3.3a Author shadcn registry manifest
        → No hard dependencies
  
Phase 4:
  P4.1  Set up visual regression tests
        → Depends on Phase 3 being stable
```

---

### Step-by-step implementation

**Step 1 — P1.4: Fix live URL inconsistency in README**
- Search all `.md` files for `design-system-prompt-x.lovable.app` (found 3 occurrences in `README.md`)
- Replace each with `democrito-design-system.lovable.app`
- Mark as Review in Notion

**Step 2 — P1.5: Delete bun.lockb and gitignore it**
- Verify `package-lock.json` exists (it does)
- Delete `bun.lockb` from the repo
- Add `bun.lockb` to `.gitignore`
- Remove the README note about bun.lockb being present
- Mark as Review in Notion

**Step 3 — P1.3: Slim CLAUDE.md tokens section**
- Replace the Design Tokens section (~lines 34-107) with a compact ~10-line version containing only behavioral rules + a pointer to `docs/tokens.md`
- Keep all other sections intact
- Target ~80 lines total
- Mark as Review in Notion

**Step 4 — P1.1: Author docs/components/templates.md**
- Create `docs/components/templates.md` documenting all 7 templates: `AppShell`, `ComparisonLayout`, `DashboardLayout`, `DetailLayout`, `EditorLayout`, `LibraryLayout`, `TemplatePreview`
- Match structure/tone of `docs/components/organisms.md`
- Include: name, purpose, when to use, props/slots, composition rules
- Update `docs/README.md` to add the templates doc to the Component Reference table
- Target 6-8 KB
- Mark as Review in Notion

**Step 5 — P1.8: Write the token contract test**
- Create `src/__tests__/tokens.contract.test.ts`
- Load `design-tokens.json`, extract token names
- Read `src/index.css` as string, verify each expected CSS custom property exists in `:root`
- Use existing vitest setup, no new dependencies
- Mark as Review in Notion

**Step 6 — P1.6: Generate GitHub social preview image**
- Generate a 1280x640 PNG using the warm theme palette
- Include: "democrito" title (Plus Jakarta Sans), tagline, URL in mono
- Save to `/mnt/documents/` for manual upload to GitHub
- Mark as Review in Notion

**Step 7 — P1.2: Move principles to docs/principles.md** (requires your input)
- I will need you to paste the content of `democrito-principles.md` from your design-writer skill folder
- Create `docs/principles.md` with that content
- Update `docs/README.md` and root `README.md` to link to it
- Mark as Review in Notion

**Step 8 — P3.3a: Author shadcn registry manifest**
- Create `registry.json` at repo root following shadcn CLI v4 spec
- Define `registry:base` referencing `src/index.css`, `tailwind.config.ts`, `src/lib/utils.ts`
- Define warm theme variant
- Add "Install" section to `README.md` after Quick Start
- Mark as Review in Notion

**Step 9 — P3.2: Build public Claude Skill folder** (depends on P1.2 + P3.1)
- Create `skill/democrito/` with 5 files: `SKILL.md`, `principles.md`, `tokens.md`, `components.md`, `agent-usage.md`
- Requires P3.1 (Cowork plan) to be done first for SKILL.md content
- Mark as Review in Notion

**Step 10 — P4.1: Set up visual regression tests** (depends on Phase 3)
- Add `@playwright/test` as dev dependency
- Create `playwright.config.ts` and `tests/visual/showcase.spec.ts`
- Screenshot 7 routes x 3 themes = 21 snapshots
- Add `test:visual` script to `package.json`
- Mark as Review in Notion

---

### Blocked/deferred tasks

| Task | Blocker |
|------|---------|
| P1.2 | Needs you to paste `democrito-principles.md` content |
| P3.2 | Needs P3.1 (Cowork) complete + P1.2 done + SKILL.md content |
| P4.1 | Should wait until Phase 3 is stable |

---

### Technical notes

- **Notion status updates**: After each implementation step, I will use the Notion MCP to set the task's Status property to "Review"
- **Files created**: `docs/components/templates.md`, `docs/principles.md`, `src/__tests__/tokens.contract.test.ts`, `registry.json`, `skill/democrito/*`
- **Files modified**: `README.md`, `CLAUDE.md`, `.gitignore`, `docs/README.md`, `package.json`
- **Files deleted**: `bun.lockb`
- **No new npm dependencies** except Playwright in Step 10

I recommend starting with Steps 1-6 (no external input needed), then handling P1.2 once you provide the principles content.

