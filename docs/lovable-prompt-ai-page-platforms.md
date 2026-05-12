# Lovable Build Prompt — /ai Page Platform Sections

> Ready-to-paste Lovable prompt for restructuring the `/ai` page to add
> platform-specific sections for Claude Code, Claude Design, Cowork, Lovable,
> and Google Stitch.
>
> **Scope:** `src/components/organisms/ai/` only. No routing changes.
> No changes to HeroSection, FileArchitectureSection, QuickStartSection,
> ComparisonSection, or TokenReferenceCard.

---

## Context (read before prompting)

The `/ai` page (`src/pages/AiPage.tsx`) currently renders these organisms in order:
1. Page header (inline in AiPage)
2. `<HeroSection />`
3. `<FileArchitectureSection />`
4. `<QuickStartSection />`
5. `<ComparisonSection />`
6. TokenReferenceCard section (inline)
7. `<EcosystemSection />`

We are adding one new organism: `<PlatformSection />`, inserted **between
ComparisonSection and the TokenReferenceCard section**.

`EcosystemSection` moves to **after** `PlatformSection` (no change to its content).

---

## Lovable prompt

```
Read src/pages/AiPage.tsx and all files in src/components/organisms/ai/ before making any changes.

**Task:** Add a new `PlatformSection` organism to the /ai page.

---

### 1. New file: src/components/organisms/ai/PlatformSection.tsx

Create this organism following the same pattern as EcosystemSection.tsx.
Apply all democrito design system rules strictly:
- font-display for all headings and labels
- font-body for all description text
- font-mono for all code snippets, file paths, and bash commands
- bg-card for card containers, border-border, rounded-lg
- text-muted-foreground for secondary descriptions
- No hardcoded colors, no inline styles
- Use existing atoms: Tag, Text, Link where appropriate
- Use shadcn/ui Card, CardHeader, CardContent for card structure

**Section heading:** `Integrations`
**Section sub-text (muted, font-body text-sm):** `democrito ships structured context files for every major AI tool. Pick your platform.`

**Platform cards — render as a responsive grid (2 columns on md, 1 on sm):**

Card 1 — Claude Code
- Label tag: `Claude Code`
- Status tag: `Live` (emerald, same as EcosystemSection)
- Description: `Auto-reads CLAUDE.md on startup. Install the democrito skill for on-demand token and component lookups.`
- Setup snippet (font-mono text-xs bg-muted rounded-md p-2):
  ```
  claude  # from project root — CLAUDE.md loads automatically
  ```
- Link (font-mono text-xs): docs/ai-usage.md → use anchor text `Claude Code setup →`

Card 2 — Claude Design
- Label tag: `Claude Design`
- Status tag: `Live` (emerald)
- Description: `Point Claude Design's onboarding at DESIGN.md and src/index.css. It extracts your full token system and applies it to every generation.`
- Setup snippet (font-mono text-xs):
  ```
  Import: DESIGN.md + src/index.css + src/DESIGN_SYSTEM.md
  ```
- Link: docs/claude-design.md → anchor text `Claude Design guide →`

Card 3 — Google Stitch
- Label tag: `Google Stitch`
- Status tag: `Live` (emerald)
- Description: `democrito ships DESIGN.md in the Stitch open-source format. Import it into Stitch and generated screens follow democrito's visual rules.`
- Setup snippet (font-mono text-xs):
  ```
  Import: DESIGN.md  (or paste from GitHub raw URL)
  ```
- Link: docs/stitch.md → anchor text `Stitch integration guide →`

Card 4 — Lovable
- Label tag: `Lovable`
- Status tag: `Live` (emerald)
- Description: `Add democrito's global rules to Workspace Knowledge, product-specific overrides to Project Knowledge. Connect GitHub for direct CLAUDE.md access.`
- No code snippet (no single command — it's a UI setup)
- Link: docs/ai-usage.md#lovable → anchor text `Lovable setup →`

Card 5 — Cowork
- Label tag: `Cowork`
- Status tag: `Live` (emerald)
- Description: `Use Cowork for audits, planning, and documentation. Add a short democrito block to your project instructions and invoke the skill for token and inventory lookups.`
- No code snippet
- Link: docs/ai-usage.md#cowork → anchor text `Cowork setup →`

Card 6 — Other tools (v0, Bolt, Cursor, Copilot)
- Label tag: `Other tools`
- Status tag: Use a neutral Tag (no color, default style) — not emerald
- Description: `For tools without filesystem access, paste the compact token reference. For Cursor and Windsurf, CLAUDE.md auto-loads.`
- No code snippet
- Link: docs/ai-usage.md#cursor → anchor text `More tools →`

---

### 2. Update src/components/organisms/ai/index.ts

Add `PlatformSection` to the barrel export:
```ts
export { PlatformSection } from './PlatformSection'
```

---

### 3. Update src/pages/AiPage.tsx

Import `PlatformSection` and insert it between `<ComparisonSection />` and the
Token Quick Reference section. Order becomes:

```tsx
<HeroSection />
<FileArchitectureSection />
<QuickStartSection />
<ComparisonSection />
<PlatformSection />           {/* ← new, insert here */}

<section className="space-y-4">
  <h2 ...>Token Quick Reference</h2>
  <TokenReferenceCard />
</section>

<EcosystemSection />
```

No other changes to AiPage.tsx.

---

### Design rules reminder
- Cards: bg-card, border border-border, rounded-lg, p-5
- Card title: font-display text-base font-medium
- Card description: font-body text-sm text-muted-foreground
- Code snippets: font-mono text-xs bg-muted rounded-md px-3 py-2
- Tags: use the existing Tag atom — emerald for Live, default for neutral
- Links: use the existing Link atom — font-mono text-xs
- Grid: grid-cols-1 gap-4 sm:grid-cols-2 (same as EcosystemSection)
- No inline colors. No hardcoded hex/HSL values.
```

---

## Notes for Claude Code (alternative path)

If implementing via Claude Code instead of Lovable:

1. Read `src/components/organisms/ai/EcosystemSection.tsx` as the exact pattern to follow.
2. Create `src/components/organisms/ai/PlatformSection.tsx` with the 6 cards above.
3. Add to `src/components/organisms/ai/index.ts`.
4. Insert `<PlatformSection />` in `src/pages/AiPage.tsx` between `<ComparisonSection />` and the Token Quick Reference section.
5. Run `npm run lint && npm run test` after.
