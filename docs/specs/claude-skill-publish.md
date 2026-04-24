# Claude Skill Publication — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Standard
> - Version: 1.0
> - Status: Draft
> - Source: P3.1 plan (Done) + P3.2 build (Done) — this spec covers verification and publication
> - Prompt chain: standalone (P3.1 and P3.2 are complete)
> - Created: 2026-04-17

## Role

Act as a senior developer familiar with Claude Code skills, the Anthropic
skill distribution model, and democrito's three-file AI context architecture
(CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md). You understand how skills bundle
knowledge files for Claude Code and how to structure SKILL.md for correct
triggering.

## Context

democrito ships a public Claude Skill so developers can install it directly
into Claude Code. The skill is packaged from the existing private
`design-writer` skill, adapted for the public repo. P3.1 (plan) and P3.2
(build folder structure) are complete — the `skill/democrito/` directory
exists in the repo with SKILL.md and knowledge files. This spec covers
verifying the skill works correctly and preparing it for publication.

## Codebase Orientation

- Skill folder: @skill/democrito/ (SKILL.md + knowledge files)
- Source knowledge: @docs/principles.md, @docs/tokens.md, @docs/ai-usage.md
- Component docs: @docs/components/atoms.md, @docs/components/molecules.md, @docs/components/organisms.md
- Private design-writer skill: reference for triggering patterns and structure
- CLAUDE.md: @CLAUDE.md (the coding rules file that ships with the project)
- DESIGN.md: @DESIGN.md (the design philosophy file)
- DESIGN_SYSTEM.md: @src/DESIGN_SYSTEM.md (the token inventory)

## Task

Verify the public Claude Skill folder is complete and correctly structured,
audit the SKILL.md for triggering accuracy, ensure knowledge files are
in sync with their `docs/` sources, and prepare the skill for distribution.

## Steps

1. Audit `skill/democrito/SKILL.md` — verify description triggers on the right
   queries and not-triggers are accurate
2. Verify all knowledge files in `skill/democrito/` are exact copies of their
   `docs/` sources (diff each pair)
3. Verify `components.md` is a correctly concatenated version of all four
   component layer docs
4. Test the skill locally by installing it in a fresh Claude Code session
5. Update `SKILL.md` if any triggering or content issues are found
6. Add a "Skill" section to README.md with install instructions
7. Ensure the skill folder is included in the git tree (not gitignored)

## Instructions

### SKILL.md audit

1. The `name` field must be `democrito` (lowercase, no prefix)
2. The `description` must trigger on: "design system", "democrito", "build a
   component", "design tokens", "atomic design", "shadcn component",
   "theme", "colour system", "typography"
3. The `description` must NOT trigger on: "prompt engineering",
   "AI evaluation", "business model" or anything prompt-x-specific
4. The skill must reference all bundled knowledge files in a `## Reference
   Files` section
5. The skill methodology section must explain: tokens first, three-surface
   hierarchy, three-font rule, six design principles from DESIGN.md

### Knowledge file verification

6. Diff `skill/democrito/principles.md` against `docs/principles.md` — they
   must be identical. If `docs/principles.md` doesn't exist, use the content
   from DESIGN.md as the source
7. Diff `skill/democrito/tokens.md` against `docs/tokens.md`
8. Diff `skill/democrito/agent-usage.md` against `docs/ai-usage.md`
9. Verify `skill/democrito/components.md` contains all four layers
   (atoms, molecules, organisms, templates) with clear `# Layer` headings
10. If any diff shows divergence, update the skill copy to match the `docs/`
    source — `docs/` is always canonical

### README update

11. Add a `## Claude Skill` section to README.md after the existing "Install"
    section. Content:
    - One-sentence description: "Install democrito as a Claude Code skill to
      get design-system-aware assistance in every session."
    - Install command (TBD — depends on Anthropic's distribution path)
    - Link to `skill/democrito/SKILL.md` for details

### Distribution preparation

12. Verify `skill/democrito/` is not in `.gitignore`
13. Ensure all files in the skill folder are committed
14. If Anthropic's skill registry is available, note the submission steps. If
    not, the GitHub repo path (`skill/democrito/`) is the distribution
    mechanism for now

## Constraints

- DO NOT modify any files in `docs/` — the `docs/` versions are canonical
- DO NOT modify the private `design-writer` skill — this is a separate public skill
- DO NOT add runtime dependencies — the skill is pure markdown knowledge files
- DO NOT rename the skill folder from `skill/democrito/`
- DO NOT include prompt-x-specific content in the public skill
- If any requirement is unclear, ask before making changes

## Notion Status Sync

| Change request | Notion ID | Current status |
|---------------|-----------|----------------|
| P3.1 — Plan public Claude Skill | `341887eb-6e4e-81de-a1da-f375ea4f120f` | Done |
| P3.2 — Build public Claude Skill folder | `341887eb-6e4e-81c8-86bd-e220dfbfaff2` | Done |
| P3.4 — Tag v3.1.0 with skill + registry | `341887eb-6e4e-8172-87fb-c6c27cfe6637` | Not started |

This spec covers the gap between P3.2 (Done) and P3.4 (tagging). Set P3.4
Status → **In progress** when starting the verification and publication steps.
