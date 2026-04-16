# Skill Audit — democrito batch documentation plan

> **Date:** 2026-04-17
> **Purpose:** Audit existing skills, extract patterns from prompt-x variants,
> and propose a batch of spec documents that give Claude Code full business
> context, design instructions, and engineering paths for every backlog task.

---

## 1. Audit Summary

### Skills available and their role

| Skill | Type | What it produces | Relevant to democrito? |
|-------|------|-----------------|----------------------|
| **sdd-writer** | Generic | SDD — feature spec with BDD scenarios, state machines, JTBD | **Yes** — /ai page, shadcn registry, Claude Skill |
| **dev-prompt-engineer** | Generic | Prompt-Spec — IDE-ready build prompts from an SDD | **Yes** — every Claude Code session task |
| **design-writer** | Generic | Design System doc or Behaviour Spec | **Partially** — Design System doc already exists (DESIGN.md + DESIGN_SYSTEM.md). Behaviour Specs useful for /ai page |
| **deploy-writer** | Generic | Deploy-Spec — env config, rollback, security, monitoring | **Yes** — Vercel deploy, Astro migration, production launch |
| **qa-prompt-engineer** | Generic | QA-Spec — test cases from SDD + Prompt-Spec | **Yes** — visual regression, theme compliance |
| **sdd-writer-prompt-x** | Tier 2 | SDD pre-filled with prompt-x context | **Extract patterns** — project context injection, cross-skill inputs |
| **dev-prompt-prompt-x** | Tier 2 | Claude Code prompts with real prompt-x file paths | **Extract patterns** — four-phase workflow, scope limits, prompt types |
| **design-engineer-prompt-x** | Tier 2 | Behaviour Specs grounded in prompt-x design system | **Extract patterns** — references existing DS instead of re-specifying |
| **lovable-prompt-prompt-x** | Tier 2 | Lovable prompts for prompt-x | **Not needed** — democrito is moving away from Lovable |
| **ai-engineer-prompt-x** | Tier 2 | AI function specs for prompt-x | **Not needed** — democrito has no AI functions |
| **content-writer** | Generic | Blog posts, LinkedIn, etc. in user's voice | **Later** — useful for launch content, not for current backlog |

### What the prompt-x Tier 2 skills add over generics

The prompt-x variants follow a clear pattern that we should replicate for democrito:

1. **`_shared/` context files** — product overview, data model, stack conventions, codebase map. These are loaded by every skill so they share a common foundation. (Note: the `_shared/` folder doesn't exist yet in the skills directory — the prompt-x skills reference it but it was never extracted.)

2. **Project-specific cross-skill inputs** — instead of generic "check for upstream docs," prompt-x skills name the exact upstream skills and what to pull from them.

3. **Pre-filled technical context** — real file paths, real store names, real type interfaces, real route patterns. This eliminates the "ask the user" step for context that's already known.

4. **Domain-specific scenario coverage** — prompt-x's SDD writer knows to always check for variable handling, platform switching, production locked state, and auto-save. democrito would have its own checklist: three-theme compliance, three-font rule, three-surface hierarchy, mono contract.

5. **`# TODO: extract to master`** — multiple prompt-x skills have this marker, confirming the methodology sections are reusable and the project-specific layer is the value-add.

---

## 2. What democrito needs — not Tier 2 skills, but spec documents

democrito doesn't need its own Tier 2 skill variants yet. The project is simpler than prompt-x (no Supabase, no Edge Functions, no state management complexity). What it needs is **spec documents written using the generic skills** that encode the business context, design rules, and engineering paths so Claude Code can execute autonomously.

The generic skills are designed exactly for this: sdd-writer produces the spec, dev-prompt-engineer translates it into Claude Code prompts, design-writer produces behaviour specs, deploy-writer produces the deployment plan. The missing piece is that **no backlog task has been through this pipeline yet**.

---

## 3. Backlog tasks mapped to skills

### Tasks that need an SDD (sdd-writer)

These are feature-level tasks where Claude Code needs to understand *what* to build, not just *which files to change*:

| Task # | Task | Why it needs an SDD |
|--------|------|-------------------|
| 8 | /ai page | New route, new content architecture, multiple component compositions. Needs JTBD, page structure, component inventory, state coverage. |
| 12-14 | Claude Skill + shadcn registry | Distribution features with specific install flows, verification steps, and user-facing contracts. Needs functional specs for the install experience. |

### Tasks that need a Prompt-Spec (dev-prompt-engineer)

Every Claude Code task benefits from a Prompt-Spec, but these are the ones where the generic change request description isn't enough:

| Task # | Task | Prompt type | Complexity |
|--------|------|------------|-----------|
| 1 | Replace getting-started | Simple | Single file swap + cross-ref check |
| 2 | bun.lockb cleanup | Simple | Delete + gitignore |
| 3 | URL updates | Simple | Grep + replace |
| 4 | vercel.json | Standard | New config file with specific rules |
| 6 | Structured data + metadata | Standard | Multiple files, OG/Twitter/JSON-LD |
| 7 | AI bot files | Standard | 3 new files with specific conventions |
| 8 | /ai page | Complex | New route, components, 3-theme compliance |
| 10 | Astro migration | Complex | Framework swap, 4-phase plan already exists |
| 12 | Claude Skill build | Standard | Directory structure, file creation |
| 13-14 | shadcn registry | Complex | Config + verification workflow |
| 16 | Visual regression | Standard | Playwright setup, snapshot config |

### Tasks that need a Behaviour Spec (design-writer)

| Task # | Task | Why |
|--------|------|-----|
| 8 | /ai page | New page with multiple content sections — needs component inventory, responsive behaviour, theme states |

### Tasks that need a Deploy-Spec (deploy-writer)

| Task # | Task | Why |
|--------|------|-----|
| 4+5 | vercel.json + DNS | First production deploy — security checklist, rollback plan, monitoring setup |
| 10 | Astro migration | Framework swap in production — high risk, needs rollback plan |

---

## 4. Proposed batch documentation plan

### Batch A — Specs for Session 1 (quick wins)

**Skill:** dev-prompt-engineer (Simple tier)
**Output:** 3 Prompt-Specs, one per task

These are mechanical tasks. A Simple Prompt-Spec (Role + Context + Task + Constraints) is sufficient. No SDD needed — the change request descriptions already contain the full scope.

| Doc | Task | Estimated effort |
|-----|------|-----------------|
| `specs/getting-started-swap.md` | Task 1 — replace with v2 | 5 min |
| `specs/bun-lockb-cleanup.md` | Task 2 — delete + gitignore | 5 min |
| `specs/url-migration.md` | Task 3 — lovable.app → democrito.design | 5 min |

### Batch B — Specs for Session 2 (production infra)

**Skills:** deploy-writer + dev-prompt-engineer (Standard tier)
**Output:** 1 Deploy-Spec + 3 Prompt-Specs

| Doc | Skill | Task | Estimated effort |
|-----|-------|------|-----------------|
| `specs/deploy-first-production.md` | deploy-writer | Tasks 4+5 — vercel.json + DNS + first deploy | 20 min |
| `specs/metadata-infrastructure.md` | dev-prompt-engineer | Task 6 — OG, Twitter Card, JSON-LD | 10 min |
| `specs/ai-bot-files.md` | dev-prompt-engineer | Task 7 — robots.txt, llms.txt | 10 min |

### Batch C — Specs for Session 3 (/ai page)

**Skills:** sdd-writer + design-writer + dev-prompt-engineer
**Output:** 1 SDD + 1 Behaviour Spec + 1 Prompt-Spec (Complex tier)

This is the only current task that needs the full skill pipeline — it's a new feature, not a maintenance task.

| Doc | Skill | What it covers | Estimated effort |
|-----|-------|---------------|-----------------|
| `specs/ai-page-sdd.md` | sdd-writer | JTBD, content architecture, functional specs, component inventory | 30 min |
| `specs/ai-page-behaviour.md` | design-writer | Component usage, states, responsive, theme compliance | 20 min |
| `specs/ai-page-prompt.md` | dev-prompt-engineer | Claude Code implementation prompt, Complex tier | 15 min |

### Batch D — Specs for Session 4 (Astro migration)

**Skills:** deploy-writer + dev-prompt-engineer
**Output:** 1 Deploy-Spec + reference to existing ASTRO-MIGRATION-PLAN.md

The Astro migration already has a 12-prompt plan. What's missing is the deploy safety layer.

| Doc | Skill | What it covers | Estimated effort |
|-----|-------|---------------|-----------------|
| `specs/deploy-astro-migration.md` | deploy-writer | Rollback plan, parallel deploy strategy, DNS cutover | 20 min |

The ASTRO-MIGRATION-PLAN.md already functions as a detailed Prompt-Spec sequence — no need to regenerate it through dev-prompt-engineer.

### Batch E — Specs for Session 5 (distribution)

**Skills:** sdd-writer + dev-prompt-engineer
**Output:** 1 SDD + 2 Prompt-Specs

| Doc | Skill | What it covers | Estimated effort |
|-----|-------|---------------|-----------------|
| `specs/distribution-sdd.md` | sdd-writer | Claude Skill + shadcn registry as a combined distribution feature | 25 min |
| `specs/claude-skill-prompt.md` | dev-prompt-engineer | Build the skill/ directory | 10 min |
| `specs/shadcn-registry-prompt.md` | dev-prompt-engineer | Author + verify registry.json | 15 min |

### Batch F — Specs for Session 6 (hardening)

**Skill:** dev-prompt-engineer (Standard tier)
**Output:** 1 Prompt-Spec

| Doc | Skill | What it covers | Estimated effort |
|-----|-------|---------------|-----------------|
| `specs/visual-regression-prompt.md` | dev-prompt-engineer | Playwright setup, 21 snapshots (7 routes × 3 themes) | 10 min |

---

## 5. Summary

| Batch | Skills used | Docs produced | Est. time |
|-------|-----------|--------------|-----------|
| A — Quick wins | dev-prompt-engineer | 3 Prompt-Specs | 15 min |
| B — Production infra | deploy-writer + dev-prompt-engineer | 1 Deploy-Spec + 3 Prompt-Specs | 40 min |
| C — /ai page | sdd-writer + design-writer + dev-prompt-engineer | 1 SDD + 1 Behaviour Spec + 1 Prompt-Spec | 65 min |
| D — Astro migration | deploy-writer | 1 Deploy-Spec | 20 min |
| E — Distribution | sdd-writer + dev-prompt-engineer | 1 SDD + 2 Prompt-Specs | 50 min |
| F — Hardening | dev-prompt-engineer | 1 Prompt-Spec | 10 min |
| **Total** | **4 skills** | **15 documents** | **~3.5 hours** |

### Execution order recommendation

**Option 1 — Spec-first (recommended):** Run all batches in Cowork before any Claude Code session. Total: ~3.5 hours of Cowork, then Claude Code executes with full context.

**Option 2 — Just-in-time:** Run each batch immediately before its Claude Code session. Spreads the work but means Claude Code sessions can't start until specs are ready.

**Option 3 — Prioritized:** Run Batch A+B now (quick wins + infra are mechanical, specs take 55 min total), skip specs for Session 1-2 tasks that are simple enough without them. Run Batch C before Session 3 since /ai page is the only task that truly needs the full pipeline. Batches D-F on demand.

### What this does NOT recommend

- **No Tier 2 skill variants for democrito** — the project doesn't have enough complexity to justify maintaining separate `-democrito` skills. The generic skills + project context from CLAUDE.md/DESIGN.md/DESIGN_SYSTEM.md provide sufficient grounding.
- **No `_shared/` context files** — democrito's context is already well-documented in three repo files. Creating a parallel `_shared/` structure would duplicate them.
- **No content-writer or marketing skills** — those become relevant at launch, not during the production build phase.
