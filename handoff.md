# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 45 (current): mobile menu space pass, Services mobile = desktop pillar accordion, low-power perf mode.

- **Mobile heading clearance:** slides 1-3 mobile-only `pt-[5.25rem]` (Skyrocket/Services/Clients) so headings clear the ~70px menu bar; desktop verbatim via `md:`.
- **Mobile nav hidden on cover:** `Index.tsx` mobile visibility gains `currentSlide !== 0`; menu animates in from slide 1.
- **Services mobile rebuilt (old item 2 CLOSED):** old categories/stepper/tablist/`mobileServices` deleted; mobile renders the same five `pillarServices` (renamed from `desktopServices`) as an auto-advancing accordion — expanded card (teal tint, description + tag row with `tagIcons` lucide icons; brand tags keep marks), others compressed to `GET [OUTCOME]` rows (mobile "Get", desktop keeps "BE"). 3.5s auto-advance, tap re-arms, reduced-motion paused, `grid-rows 0fr→1fr` collapse. Header copy unified (`OUR SERVICES` / `WHAT WE DO`). Desktop byte-identical.
- **Low-power perf mode (owner: live site choppy on weaker laptop):** new `src/hooks/use-low-power.tsx` FPS watchdog (median rAF frame > 28ms after load ⇒ low-power, sticky per session). **Nothing unmounts** (owner rule: optimize, never remove): Hyperspeed `maxPixelRatio` / LightRays + PrismaticBurst `maxDpr` drop 1.25 → 0.75 — same visuals, ~64% fewer fragments. Healthy machines unchanged.
- **Verification:** lint clean, vitest 16/16, `npm run build` pass.

## Open Items / Next Steps

0. **CHECK FIRST: verify on the previously-laggy laptop** that the live site is smooth now (low-power mode kicks in after ~5s; first session may stutter during sampling). Also re-check the Session 45 mobile changes (menu clearance, cover nav hide, Services accordion) on a real phone.

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

13 slides: Cover (0), Who We Are (1), Services (2), Clients (3), cases 4–11 = Mitsui, Kuraray, DEHN, Baxsaa, CultFit, GirlUp, CTP, VNT (order changed Session 39), Contact (12).

Per-slide detail, standing rules, and "do not reintroduce" lists live in `prod.md`. Session history + deploy runbook live in `context.md`.

Deck-order or case-count changes must update together: `Index.tsx` (slides array + `onCaseStudy` + `nativeMotion`), `PillNav`, `DebugMenu`, `slide-routes.ts`, `slide-edge-colors.ts`, case-number props.

## Deployment

Push to `main` = production deploy to https://www.owlsurf.media (~10-60s, silent on failure). Full mechanics + recovery runbook: `context.md` "Deployment Pipeline & Operations". Quick recovery: `gh run list` → `gh run rerun <id>`. Never hand-edit on the VPS (`git reset --hard` on every deploy).

## Untracked Local Items (keep unstaged)

`.agents/`, `.claude/`, `carousel-b2b-marketing.html`, `our-team-slide-single-lanyard.png`, `skills-lock.json`, `ui-design-plan.scratch.md`, `.vite_error.log`.

## Push Gate

1. `handoff.md`, `context.md`, `prod.md` reflect current state.
2. `npm run lint` + `npx vitest run` + `npm run build` pass.
3. Stage only intended files. Exclude `.github/workflows/deploy.yml`.
4. Commit, push `main`, confirm live site.
