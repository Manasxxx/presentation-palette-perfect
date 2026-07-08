# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 49: React Bits / Aceternity polish pass for Cover, Services, and desktop navigation.

- **Cover hero movers:** replaced the old trust/choose/believe moving treatment with local `FlipWords` movers. Both the industry mover and buyer-confidence mover now share the same timing (`3.5s`) and visual language while preserving the industry list: Solar, Industrial, Chemical, Pharma, Manufacturing, Mobility, Real Estate.
- **Cover CTA:** replaced the `Review Case Studies` button with a local React Bits `GlassSurface` button on desktop and mobile, plus a subtle cascading shimmer sweep.
- **Desktop navigation:** replaced the old pill-label nav with a local Aceternity-inspired `FloatingDock` on desktop. Mobile `InteractiveMenu` is unchanged.
- **Services / What We Do:** replaced the Services background with a visible, desktop-gated React Bits-style `DotField`; added edge-only `BorderGlow` to service cards; tightened vertical spacing without changing the five-pillar taxonomy.
- **Verification:** source guard checks passed, `npx tsc --noEmit` passed, `npm run lint` passed with existing warnings only, and `npm run build` passed. A direct `vitest` run still hung with no output, matching the previously documented local Vitest issue, so no full Vitest pass is claimed.
- **Push note:** `.github/workflows/deploy.yml` is still locally modified and must remain excluded from this push.

## Open Items / Next Steps

0. **Live-device follow-up:** local Playwright mobile/desktop visibility checks passed with no horizontal overflow in Session 46, but still verify on the previously-laggy laptop and a real phone after deploy. Low-power mode kicks in after ~5s; first session may stutter during sampling.

1. **iPhone ghost strip (mobile case headings) — OPEN.** Dark translucent vertical strip near left margin, clears on touch. Ruled out (S39-40): seam overlays, wrapper blur, clip-path/circle wipe, card backdrop-filter, residual blur(0px). Next suspects: mobile `backdrop-blur-sm` on proof table/stat pills, stack-card `box-shadow`, Motion cross-fade wrapper, `will-change` on stack cards, or forced-recomposite nudge on slide settle. (S43 removed the `bg-wipe` layer entirely — if the strip persists, that suspect is now eliminated by absence.)
2. **True 1200×630 OG card** — `index.html` still uses `/favicon.png` stopgap.
3. **`deploy.yml` retry flags** — in working tree, NOT pushed (remote PAT lacks `workflow` scope). Land via `gh auth refresh -s workflow` or GitHub web editor. Always exclude this file from pushes until then.
4. **Security:** GitHub PAT in plaintext in `.git/config` remote URL. Rotate + move to SSH/credential helper.
5. **`npm audit`** advisories outstanding (deferred by user).
6. **Parked plan:** `ui-design-plan.scratch.md` (gitignored, local only, do not commit). Three phases; pick up by phase.
7. **Hyperspeed on mobile** still flagged unreliable (`prod.md`); S45 low-power DPR scaling should help weak phones — re-test before deeper work.

## Current State

Vite + React SPA, fixed dev port: `http://localhost:8080/` (LAN may vary by network).

12 slides: Cover (0), Who We Are (1), Services (2), Clients (3), cases 4–10 = Mitsui, Kuraray, DEHN, Baxsaa, GirlUp, CTP, VNT, Contact (11). CultFit case study removed Session 46; Cult.fit remains as a Clients logo.

Per-slide detail, standing rules, and "do not reintroduce" lists live in `prod.md`. Session history + deploy runbook live in `context.md`.

Deck-order or case-count changes must update together: `Index.tsx` (slides array + `onCaseStudy` + `nativeMotion`), `PillNav`, `slide-routes.ts`, `slide-edge-colors.ts`, `scripts/mobile-shots.mjs`, case-number props. `DebugMenu` was removed in Session 47.

## Deployment

Push to `main` = production deploy to https://www.owlsurf.media (~10-60s, silent on failure). Full mechanics + recovery runbook: `context.md` "Deployment Pipeline & Operations". Quick recovery: `gh run list` → `gh run rerun <id>`. Never hand-edit on the VPS (`git reset --hard` on every deploy).

## Untracked Local Items (keep unstaged)

`.agents/`, `.claude/`, `carousel-b2b-marketing.html`, `our-team-slide-single-lanyard.png`, `skills-lock.json`, `ui-design-plan.scratch.md`, `.vite_error.log`.

## Push Gate

1. `handoff.md`, `context.md`, `prod.md` reflect current state.
2. `npm run lint` + `npx vitest run` + `npm run build` pass.
3. Stage only intended files. Exclude `.github/workflows/deploy.yml`.
4. Commit, push `main`, confirm live site.
