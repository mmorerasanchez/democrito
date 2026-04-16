# URL Migration — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Simple
> - Version: 1.0
> - Status: Draft — blocked until Vercel deploy is live
> - Source SDD: N/A — repo-wide string replacement
> - Prompt chain: 3 of 3 — previous: bun-lockb-cleanup · next: N/A (standalone)
> - Created: 2026-04-17

## Role

Act as a developer performing a repo-wide URL migration. You understand
the difference between a live demo URL reference and a build tool
attribution, and you preserve the latter while replacing the former.

## Context

democrito is migrating its live demo from `democrito-design-system.lovable.app`
to the production domain `democrito.design`. All documentation, README
references, and meta files that point to the Lovable-hosted URL need to
be updated. However, references to Lovable as the *build tool* (e.g.,
"Built with Lovable") should be preserved — only the URL pointing to
the live site changes.

## Task

Replace all occurrences of `democrito-design-system.lovable.app` with
`democrito.design` across the entire repo, preserving Lovable tool
attribution.

## Steps

1. Grep the repo for all occurrences of `lovable.app`
2. Categorise each hit: live demo URL vs. build tool reference
3. Replace live demo URLs with `democrito.design`
4. Leave build tool attributions unchanged
5. Check `package.json` for a `homepage` field and update if present
6. Verify CLAUDE.md, DESIGN.md, DESIGN_SYSTEM.md, README.md, and all `docs/` files

## Constraints

- DO NOT replace Lovable references that describe the build tool itself
  (e.g., "Built with Lovable", "Lovable scaffold") — only replace URLs
  pointing to the live demo
- DO NOT modify `src/` code files unless they contain hardcoded demo URLs
- DO NOT create redirects or aliases — this is a clean string replacement
- If any occurrence is ambiguous, flag it and ask before replacing
- If any requirement is unclear, ask before writing code

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e8145a72de7abc279980d
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
