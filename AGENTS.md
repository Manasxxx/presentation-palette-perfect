# Agent Workflow Rules

This repository uses a mandatory handoff workflow.

## Required startup reads

At the beginning of any new coding session, read these files before making changes:

1. `handoff.md`
2. `context.md`
3. `prod.md`

If one of these files is missing, note that clearly in the session and continue with the remaining files.

## Handoff rule

`handoff.md` is a living session handoff file.

It must include:
- current goal
- current state
- files in play
- what changed
- what failed
- what to do next

## When to update `handoff.md`

Update `handoff.md` in each of these cases:

1. Before any push
2. Before ending a session
3. Before clearing context or starting a fresh session
4. When a major approach changes
5. When debugging reveals a meaningful root cause

If a session appears close to running out of context or hitting usage limits, refresh `handoff.md` before stopping.

## Push gate

Do not push until `handoff.md` has been reviewed and updated to match the latest repo state.

## Fresh-session rule

When starting a new session for this repo, do not rely only on chat history.
Use `handoff.md` as the first source of continuity, then read `context.md` and `prod.md`.
