# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 46: visual polish, CultFit case removal, Mitsui asset add, mobile/desktop visibility checks.

- **Mitsui creatives:** converted three supplied JPGs to WebP and added them to the Mitsui carousel as `mitsui-extra-6/7/8.webp`.
- **Deck structure:** removed the CultFit case-study slide from the deck, routes, debug menu, nav mapping, edge-color map, and screenshot harness. Contact is now slide 11; case block is slides 4-10. Cult.fit client logo remains on Clients.
- **Carousel polish:** removed bottom/card shadows from all case-study carousels; DEHN desktop wide cards enlarged (`32rem`) and shifted left; shared case proof tables enlarged; VNT light slide proof text now black for readability.
- **Visibility polish:** cover partner badges now fit to image height without black shadow/wrapper; Clients proof pills enlarged and higher-contrast; case-study interactive checker grid made stronger; Contact black areas got subtle teal side/bottom glow.
- **Verification:** local dev server `http://localhost:8080/`; mobile shots all 12 slides (`scripts/_shots/codex-mobile-004956`) and desktop shots all 12 slides (`scripts/_shots/codex-desktop-005102`) showed no horizontal overflow. Contact sheets visually reviewed. Smoothness probe ran; headless mobile improved after low-power sampling, desktop headless remained rough but visual pass was acceptable. Full `npm run lint` hung locally and was stopped; no full lint/build pass claimed.

## Open Items / Next Steps

0. **Live-device follow-up:** local Playwright mobile/desktop visibility checks passed with no horizontal overflow in Session 46, but still verify on the previously-laggy laptop and a real phone after deploy. Low-power mode kicks in after ~5s; first session may stutter during sampling.

1. **iPhone ghost strip (mobile case headings) — OPEN.** Dark translucent vertical strip near left margin, clears on touch. Ruled out (S39-40): seam overlays, wrapper blur, clip-path/circle wipe, card backdrop-filter, residual blur(0px). Next suspects: mobile `backdrop-blur-sm` on proof table/stat pills, stack-card `box-shadow`, Motion cross-fade wrapper, `will-change` on stack cards, or forced-recomposite nudge on slide settle. (S43 removed the `bg-wipe` layer entirely — if the strip persists, that suspect is now eliminated by absence.)
2. **`DebugMenu.tsx`** — temp mobile FAB, owner keeps shipping it. Standing "remove before prod" unresolved.
3. **True 1200×630 OG card** — `index.html` still uses `/favicon.png` stopgap.
4. **`deploy.yml` retry flags** — in working tree, NOT pushed (remote PAT lacks `workflow` scope). Land via `gh auth refresh -s workflow` or GitHub web editor. Always exclude this file from pushes until then.
5. **Security:** GitHub PAT in plaintext in `.git/config` remote URL. Rotate + move to SSH/credential helper.
6. **`npm audit`** advisories outstanding (deferred by user).
7. **Parked plan:** `ui-design-plan.scratch.md` (gitignored, local only, do not commit). Three phases; pick up by phase.
8. **Hyperspeed on mobile** still flagged unreliable (`prod.md`); S45 low-power DPR scaling should help weak phones — re-test before deeper work.

## Current State

Vite + React SPA, fixed dev port: `http://localhost:8080/` (LAN `http://192.168.0.132:8080/`).

12 slides: Cover (0), Who We Are (1), Services (2), Clients (3), cases 4–10 = Mitsui, Kuraray, DEHN, Baxsaa, GirlUp, CTP, VNT, Contact (11). CultFit case study removed Session 46; Cult.fit remains as a Clients logo.

Per-slide detail, standing rules, and "do not reintroduce" lists live in `prod.md`. Session history + deploy runbook live in `context.md`.

Deck-order or case-count changes must update together: `Index.tsx` (slides array + `onCaseStudy` + `nativeMotion`), `PillNav`, `DebugMenu`, `slide-routes.ts`, `slide-edge-colors.ts`, `scripts/mobile-shots.mjs`, case-number props.

## Deployment

Push to `main` = production deploy to https://www.owlsurf.media (~10-60s, silent on failure). Full mechanics + recovery runbook: `context.md` "Deployment Pipeline & Operations". Quick recovery: `gh run list` → `gh run rerun <id>`. Never hand-edit on the VPS (`git reset --hard` on every deploy).

## Untracked Local Items (keep unstaged)

`.agents/`, `.claude/`, `carousel-b2b-marketing.html`, `our-team-slide-single-lanyard.png`, `skills-lock.json`, `ui-design-plan.scratch.md`, `.vite_error.log`.

## Push Gate

1. `handoff.md`, `context.md`, `prod.md` reflect current state.
2. `npm run lint` + `npx vitest run` + `npm run build` pass.
3. Stage only intended files. Exclude `.github/workflows/deploy.yml`.
4. Commit, push `main`, confirm live site.
