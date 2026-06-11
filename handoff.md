# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 42 (current): desktop case-study visual pass + Contact ripple + docs compaction.

- **Case-study carousel (all 8 desktop):** card `25rem → 28rem` via `.cs-cards-stage--xl` (`index.css`), stage moved right-of-center to `md:left-[calc(100%-20rem)]` (= 6rem clearance so fanned side cards don't clip at slide edge), elliptical ground shadow `.cs-cards-ground` under stack (radial gradient, no blur filter). Mitsui (`CaseStudySlide.tsx`) + shared (`CaseStudyLayout.tsx`).
- **Interactive grid bg (all 8 case studies, desktop only):** new local `src/components/ui/interactive-grid-pattern.tsx` (MagicUI, Tailwind 3 adapted, `strokeColor`/`hoverFillColor` inline props for runtime brand colors). Recipe: 48x36 squares 40px, `inset-y-[-30%] h-[200%] skew-y-12`, 900px radial spotlight mask, per-case accent at /0.24 stroke, /0.4 hover fill. Content layer got `md:pointer-events-none` so grid receives hover — carousel mouse interaction removed (auto-advance only), desktop text selection on case slides lost (accepted).
- **Contact ripple:** new local `src/components/ui/ripple.tsx` (MagicUI, TW3, `borderColor: hsl(var(--foreground))`). Keyframes + `.animate-ripple` in `index.css`, reduced-motion gated. Mounted inside `.ct-mark`: 52rem box centered on logo, `mainCircleSize 236`, 7 circles, radial mask (box-local linear mask would repeat/clip on overflow).
- **Cover globe invisible — FIXED.** Session 41's `globe.tsx` 2048 cap broke rendering: cobe hands `devicePixelRatio` to phenomenon, which sizes the canvas buffer `clientWidth * dpr` (2880), while the capped `width`/`height` (2048) only set the shader resolution uniform — mismatch drew the globe shrunken/offscreen. Cap now flows through dpr (`min(2, 2048 / offsetWidth)`) so buffer and uniform always agree.
- **Viewport clip audit + Services fix.** New `scripts/clip-audit.mjs` (Playwright): scrolls all 13 slides at 7 viewports (1280×560 → 2000×1107 desktop, 390×844 / 360×700 mobile) and reports meaningful content (text/img/button) crossing slide bounds. Findings: cover + all case studies + Contact clean at every size; **Services desktop ledger clipped up to 235px on short viewports** (fixed `pt-20`/`pb-10`/`py-6` rows + `xl:` text sizes ignore height). Fixed with svh clamps on container padding, row padding, eyebrow/subtitle margins, and `min(...,svh)` caps on h2/row-title/description sizes — identical look on tall viewports, compresses on short. Known intentional bleeds the audit flags (ignore): Clients LogoLoop logos at edges, mobile sector marquee pills, mobile stack-carousel side cards (~20px peek).
- **Docs:** `context.md` + `handoff.md` compacted to cut session-start token load. Full history in git.
- **Verification:** `npm run lint` (0 errors, 1 pre-existing badge.tsx warning), vitest 16/16, `npm run build` pass.

## Open Items / Next Steps

1. **iPhone ghost strip (mobile case headings) — OPEN.** Dark translucent vertical strip near left margin, clears on touch. Ruled out (S39-40): seam overlays, wrapper blur, clip-path/circle wipe, card backdrop-filter, residual blur(0px). Next suspects: mobile `backdrop-blur-sm` on proof table/stat pills, stack-card `box-shadow`, Motion cross-fade wrapper, `will-change` on stack cards, `bg-wipe` layer; or forced-recomposite nudge on slide settle.
2. **`DebugMenu.tsx`** — temp mobile FAB, owner keeps shipping it. Standing "remove before prod" unresolved.
3. **True 1200×630 OG card** — `index.html` still uses `/favicon.png` stopgap.
4. **`deploy.yml` retry flags** — in working tree, NOT pushed (remote PAT lacks `workflow` scope). Land via `gh auth refresh -s workflow` or GitHub web editor. Always exclude this file from pushes until then.
5. **Security:** GitHub PAT in plaintext in `.git/config` remote URL. Rotate + move to SSH/credential helper.
6. **`npm audit`** advisories outstanding (deferred by user).
7. **Parked plan:** `ui-design-plan.scratch.md` (gitignored, local only, do not commit). Three phases; pick up by phase.
8. **Hyperspeed on mobile** still flagged unreliable (`prod.md`); revisit if owner asks.

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
