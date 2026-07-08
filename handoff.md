# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 48: desktop/mobile polish pass, dev-server hardening, case carousel repair, and contact/footer tuning.

- **Dev server:** added durable `npm run dev:server` via `scripts/start-dev-server.sh`; it clears stale port 8080 listeners, starts Vite detached, writes `.codex-runtime/`, and reuses an existing healthy server. `.codex-runtime/` is ignored.
- **Navigation / slide copy:** desktop nav labels simplified to `Home / About / Work / Clients / Cases / Contact`; removed the Slide 2 line `We turn dense product truth into market-facing clarity for the teams selling it.`
- **Services:** service cards now read `GET YOU [OUTCOME]`, with more scannable desktop cards and mobile accordion cards; removed the services subtitle line. Mobile accordion expand/collapse behavior preserved.
- **Clients:** LogoLoop speeds lowered and track compositing tuned for smoother marquee motion.
- **Case studies:** desktop names now stay on one line; proof tables now carry a subtle tint and label colors match the adjacent text color; bottom stat descriptors got a small readability tint and heavier/larger type. Desktop carousel replaced the scroll-timeline Blossom stack with a deterministic fanned stack to avoid Safari/desktop drift over the content.
- **Contact:** mobile hero/ripple/headline shifted up; mobile footer redesigned as a more scannable card without removing info; email forced lowercase on mobile; mobile ripple uses OwlSurf teal with dark outline rings removed; `Let’s talk` moved below the rotating headline.
- **Verification:** `git diff --check` passed; `npm run lint` passed with 2 existing fast-refresh warnings; `npm run build` passed. `npx vitest run` timed out after the Vitest header again, so no test pass is claimed.

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

Vite + React SPA, fixed dev port: `http://localhost:8080/` (LAN `http://192.168.0.132:8080/`).

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
