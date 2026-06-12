# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 44 (current): case-study readability pass, DEHN wide desktop cards, mobile nav replaced with Modern Mobile Menu.

- **Case-study readability (desktop only):** `CaseStudyLayout.tsx` `muted` → `white/0.9` dark / `0 0% 20%` light; desktop stat labels → `white/0.8` dark / `0 0% 20%` light; same ported to Mitsui (`CaseStudySlide.tsx`). Root cause on light slides: CTP + Baxsaa gradient end stops were translucent brand tints compositing over the dark section bg into a dark corner under dark-ink stats — now opaque light stops (`hsl(95 30% 74%)`, `hsl(8 28% 79%)`). Standing rule added to prod.md: light case-study backgrounds need opaque end stops.
- **DEHN wide desktop cards:** `desktopWideCarousel` prop → `.cs-cards--wide` (`aspect-ratio: 1256/650`, 2px card inset). Kills the letterbox on DEHN's landscape creatives; other cases keep square cards.
- **Mobile nav replaced:** `src/components/ui/modern-mobile-menu.tsx` (NEW, local 21st.dev easemize port; `.imenu*` CSS reconstructed in `PillNav.css`). Always-visible icon bar, active item = icon bounce + label + underline grown to label width; controlled by `currentSlide`. Old hamburger + popover + backdrop deleted; mobile logo hidden (hide rule must stay after `.pill-logo` base rule — cascade order). Desktop nav byte-identical.
- **Harness:** `mobile-shots.mjs` names array fixed to current deck order; new `scripts/crop-shots.mjs` (full-res text-region crops; ~5s settle per slide or it catches entrances mid-flight).
- **Verification:** `npm run lint` (0 errors; pre-existing badge.tsx + brand-marks.tsx warnings), vitest 16/16, `npm run build` pass.

## Open Items / Next Steps

0. **CHECK FIRST (owner asked for this reminder): review the new mobile nav on a real device** — Modern Mobile Menu bar (Session 44), plus the readability changes and DEHN wide cards on the live site.

1. **iPhone ghost strip (mobile case headings) — OPEN.** Dark translucent vertical strip near left margin, clears on touch. Ruled out (S39-40): seam overlays, wrapper blur, clip-path/circle wipe, card backdrop-filter, residual blur(0px). Next suspects: mobile `backdrop-blur-sm` on proof table/stat pills, stack-card `box-shadow`, Motion cross-fade wrapper, `will-change` on stack cards, or forced-recomposite nudge on slide settle. (S43 removed the `bg-wipe` layer entirely — if the strip persists, that suspect is now eliminated by absence.)
2. **Services mobile rename pass.** Desktop now sells five outcome pillars (Found/Seen/Understood/Trusted/Known); mobile still shows the old five categories. Owner parked it: "we will come back to it."
3. **`DebugMenu.tsx`** — temp mobile FAB, owner keeps shipping it. Standing "remove before prod" unresolved.
4. **True 1200×630 OG card** — `index.html` still uses `/favicon.png` stopgap.
5. **`deploy.yml` retry flags** — in working tree, NOT pushed (remote PAT lacks `workflow` scope). Land via `gh auth refresh -s workflow` or GitHub web editor. Always exclude this file from pushes until then.
6. **Security:** GitHub PAT in plaintext in `.git/config` remote URL. Rotate + move to SSH/credential helper.
7. **`npm audit`** advisories outstanding (deferred by user).
8. **Parked plan:** `ui-design-plan.scratch.md` (gitignored, local only, do not commit). Three phases; pick up by phase.
9. **Hyperspeed on mobile** still flagged unreliable (`prod.md`); revisit if owner asks.

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
