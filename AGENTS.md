# Agent Workflow Rules

This repository uses a push-gated handoff workflow.

## Required startup reads

At the beginning of any new coding session, read these files before making changes:

1. `handoff.md`
2. `context.md`
3. `prod.md`

If one of these files is missing, note that clearly in the session and continue with the remaining files.

## Handoff rule

`handoff.md` is a push handoff file.

It must include:
- current goal
- current state
- files in play
- what changed
- what failed
- what to do next

## When to update `handoff.md`

Update `handoff.md` only before a push.

Do not update `handoff.md` at session end, during context clearing, or during ordinary debugging unless a push is about to happen.

## Push gate

Do not push until `handoff.md` has been reviewed and updated to match the latest repo state.

## Fresh-session rule

When starting a new session for this repo, do not rely only on chat history.
Use `handoff.md` as the first source of continuity, then read `context.md` and `prod.md`.
