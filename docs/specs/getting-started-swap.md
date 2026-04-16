# Getting Started v2 Swap — Prompt-Spec

> **Meta**
> - Project: democrito
> - Target IDE: Claude Code
> - Stage: Execution
> - Complexity: Simple
> - Version: 1.0
> - Status: Ready
> - Source SDD: N/A — maintenance task
> - Prompt chain: 1 of 3 — previous: N/A · next: bun-lockb-cleanup
> - Created: 2026-04-17

## Role

Act as a senior developer maintaining a design system repo. You understand
file replacement, cross-reference integrity, and conventional commit
conventions for documentation changes.

## Context

democrito has two versions of its Getting Started guide: the original
`docs/getting-started.md` and a newer `docs/getting-started-v2.md` (335
lines, dual-audience structure with Path 1 = use democrito via 3 install
options, Path 2 = contribute). The v2 version was authored in Cowork and
is the canonical replacement. The original must be replaced — not merged.

## Task

Replace `docs/getting-started.md` with the contents of
`docs/getting-started-v2.md`, then delete the v2 file.

## Steps

1. Read both files to confirm v2 is complete and v1 is the old version
2. Copy v2 contents into `docs/getting-started.md` (overwrite)
3. Delete `docs/getting-started-v2.md`
4. Grep the repo for any references to `getting-started-v2` and update them
5. Verify no broken cross-references in other docs that link to getting-started

## Constraints

- DO NOT merge the two files — v2 is a full replacement, not a patch
- DO NOT modify any content in v2 — it's been reviewed and approved
- DO NOT touch files outside `docs/` except to update cross-references
- If any requirement is unclear, ask before writing code

## Notion Status Sync

- Change request: https://www.notion.so/344887eb6e4e81ae808ec9218cec3d11
- Set Status → **In progress** before starting work
- Set Status → **Review** after creating the PR
