# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 47: mobile-first case-study metric/content pass, contact/footer cleanup, cover globe tuning, and dead-file cleanup.

- **CTP creatives:** converted nine supplied Check This Property JPGs to WebP (`ctp-creative-4..12.webp`) and appended them to the CTP carousel.
- **Case metrics:** updated Mitsui, Kuraray, DEHN, and VNT bottom/mobile stats; Mitsui uses five desktop columns and centers the fifth mobile pill, while Kuraray/DEHN/VNT use four metric pills.
- **Case mobile polish:** removed all `Case proof NN` eyebrows, added DEHN mobile breathing room, tightened Mitsui mobile table/image spacing, and reduced mobile stacked-card glass padding.
- **Navigation:** removed the mobile debug FAB/component and hid the top nav on all case-study slides (mobile and desktop) for an immersive case block.
- **Contact/footer:** removed CTA pills from Contact, moved tappable email + two phone numbers into `FlyonFooter`, added mail/phone icons, aligned desktop center with the ripple/logo, and made mobile logo-left/contact-right without using more vertical space.
- **Cover:** re-centered the mobile globe, then zoomed it in and moved it lower.
- **Cleanup:** removed unused debug/UI helper files and clearly unused old badge/team/service assets.
- **Verification:** `git diff --check` passed, `npm run lint` passed with 2 existing fast-refresh warnings, `npm run build` passed. `npx vitest run` hung twice after printing only the Vitest header and was stopped; no test pass claimed. Local live server used for visual checks at `http://localhost:8080/`.

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
