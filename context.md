# Project Context — Presentation Palette Perfect

> Running log of meaningful changes, rationale, current state. Updated on every push.
> Read before touching files. Durable design rules + "do not reintroduce" lists live in `prod.md`; this file holds history + operations.

---

## Current State (Session 42 push prep)

Desktop case-study visual pass + Contact ripple + docs compaction.

- **Carousel (all 8 case studies, desktop).** Card width `25rem → 28rem` via `.cs-cards-stage--xl` in `index.css` (stage class sets `--card-width` at wrapper level AND on `.cs-cards`, which re-declares it locally). Stage repositioned `md:left-[64%]` → `md:left-[calc(100%-20rem)]` (card center 6rem + half-card from right edge; fanned side cards need ~3rem clearance or they clip at the slide edge — 17rem clipped, 20rem clears). Elliptical ground shadow `.cs-cards-ground` (radial-gradient, no blur filter = no compositor layer) sits inside `.cs-slider` so it fades in with the carousel entrance. Files: `CaseStudySlide.tsx` (Mitsui), `CaseStudyLayout.tsx` (shared 7), `index.css`.
- **Interactive grid background (all 8 case studies, desktop only).** New local `src/components/ui/interactive-grid-pattern.tsx` — MagicUI component adapted to Tailwind 3 (`[&:not(:hover)]:duration-1000` arbitrary variant, no default border) with added `hoverFillClassName` + inline `strokeColor`/`hoverFillColor` props (runtime brand colors; Tailwind can't generate dynamic classes). Render: 48×36 squares at 40px, MagicUI demo recipe `inset-x-0 inset-y-[-30%] h-[200%] skew-y-12` + `[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]`, `z-[1]` (above bg gradient, below `z-10` content), stroke `hsl(accent / 0.24)`, hover fill `hsl(accent / 0.4)`. **Hover only works because the full-slide content layer is `md:pointer-events-none`** — carousel mouse interaction was removed deliberately (it auto-advances every 4s programmatically). Side effect: desktop text selection on case slides is dead. Mobile untouched (no hover, grid not rendered).
- **Contact ripple.** New local `src/components/ui/ripple.tsx` (MagicUI, TW3; `borderColor: "hsl(var(--foreground))"` because project tokens are HSL triplets). `@keyframes ripple` + `.animate-ripple` + reduced-motion off-switch in `index.css`. Mounted as first child of `.ct-mark`: fixed `52rem` square centered on the logo (NOT `inset-0` — rings overflow the mark box and a box-local linear mask would repeat/clip), `mainCircleSize 236` (hugs the 64% inner logo circle ≈238px desktop), 7 circles, radial fade mask. Inherits the `.ct-mark` entrance fade.
- **Cover globe invisible — FIXED (`globe.tsx`).** The Session 41 backing-store cap (`min(offsetWidth * 2, 2048)`) silently broke the globe: cobe passes `devicePixelRatio` to phenomenon, which sizes the actual canvas buffer as `clientWidth * dpr` (2880 on a 1440px container), while cobe's `width`/`height` options only feed the fragment-shader resolution uniform. With uniform (2048) < buffer (2880) the sphere rendered shrunken into the buffer's lower-left, below the viewport. Fix: cap flows through dpr — `dpr = min(2, 2048 / offsetWidth)`, `renderSize = offsetWidth * dpr`, `devicePixelRatio: dpr` passed to `createGlobe` — buffer and uniform now always match at any container size. Lesson: cobe `width`/`height` and `devicePixelRatio` must describe the same buffer.
- **Viewport clip audit (new tool) + Services desktop fix.** `scripts/clip-audit.mjs` scrolls every slide at 7 viewports (desktop 1280×560/1728×700/1280×624/1440×750/1512×823/1920×1080/2000×1107, mobile 390×844/360×700) and reports text/img/button content crossing slide bounds (6px tolerance), excluding canvas/svg. Result: cover, Clients, all 8 case studies, Contact clean everywhere; **Services desktop ledger overflowed bottom up to 235px below ~750px viewport height** — `md:pt-20`/`md:pb-10`, five `py-6`/`xl:py-7` rows, and `xl:text-3xl`/`xl:text-xl` row text are height-blind. Fix (same svh-clamp pattern as the S41 cover fix, desktop classes only, mobile untouched): container `md:pt-[clamp(2.75rem,8svh,5rem)]` + `md:pb-[clamp(1.25rem,4svh,2.5rem)]`, ledger `md:mt-[clamp(0.5rem,2svh,1.5rem)]`, rows `py-[clamp(0.5rem,1.8svh,1.5rem)]`/`xl:py-[clamp(0.6rem,2svh,1.75rem)]`, h2 `md:text-[min(clamp(3rem,4.8vw,5.2rem),10svh)]`, row title `text-[min(1.5rem,3.8svh)]`/`xl:[min(1.875rem,4svh)]`, row description `text-[min(1.125rem,2.9svh)]`/`xl:[min(1.25rem,3svh)]`, eyebrow/subtitle `md:m*-[clamp(0.4rem,1.2svh,0.75rem)]`. All resolve to the old values on ≥900px-tall viewports. **Intentional bleeds the audit flags — do not "fix":** Clients LogoLoop logos crossing edges (masked marquee), Who We Are mobile sector marquee pills, mobile case stack-carousel side-card peek (~20px), case-study desktop carousel side fan (decorative).
- **Verification.** `npm run lint` (0 errors, 1 pre-existing `badge.tsx` react-refresh warning), vitest 16/16, `npm run build` pass. `.github/workflows/deploy.yml` excluded (PAT lacks `workflow` scope).

---

## Deployment Pipeline & Operations

> Live site https://www.owlsurf.media is push-to-deploy. Added 2026-06-04 after missed-deploy incident.

**Chain.** Push to `main` → GitHub Actions `.github/workflows/deploy.yml` POSTs `https://www.owlsurf.media/deploy` (header `X-Deploy-Token: ${{ secrets.DEPLOY_TOKEN }}`) → VPS `deployment/server.js` (Express, `127.0.0.1:8081`, reverse-proxied at `/deploy`) checks token, spawns `deployment/deploy.sh` detached (`child.unref()`) → `git fetch` → `git reset --hard origin/main` → `npm ci` → `npm run build` → `pm2 restart heyowlsurf`. Logs: `deployment/logs/deploy.log`. Lock: `deployment/.deploy-lock`. Live in ~10-60s. The Actions `200` is an ack, not build success.

**Failure mode is silent.** No alerting. Failed deploy = live site stays on previous build. Does not self-retry after the Actions job ends.

**Incident 2026-06-04.** Push `e930531` didn't go live: Actions ran, webhook `curl` failed `curl: (28) ... port 443 ... Timeout` — transient VPS unavailability (likely build memory pressure). Recovered with `gh run rerun 26956763977`. Retry flags (`--retry 5 --retry-all-errors --retry-delay 10`) added locally to the webhook `curl` but NOT pushed — workflow-file changes need `workflow` auth scope (`gh auth refresh -s workflow`).

**Recovery runbook.**
1. `gh run list --limit 5` → find failure; `gh run view <id> --log`.
2. Verify endpoint: `GET https://www.owlsurf.media/` → `200`; `POST /deploy` (no token) → `403`.
3. `gh run rerun <id>` — idempotent, only rebuilds `origin/main`.
4. On VPS: `tail deployment/logs/deploy.log`, `pm2 status`/`pm2 logs heyowlsurf`, clear stale `deployment/.deploy-lock` if deploy died mid-run.

**Open follow-ups.** Why does VPS go unreachable during builds (memory pressure from `vendor-3d`?) — consider temp-dir build + swap. Rotate the plaintext GitHub PAT in `.git/config`; move remote to SSH/credential helper. Never hand-edit files on the VPS.

---

## Session Log (compressed; details in git history + prod.md rules)

### Session 41 — desktop perf pass + cover badge clip
- Cover badge clip fixed (`TitleSlide.tsx`): fixed vertical sizes → svh clamps (`md:py-[clamp(2.5rem,6svh,5rem)]`, aside `md:min-h-[min(31rem,46svh)]`, bottom `md:gap-[clamp(1rem,3svh,2.5rem)]`) — identical on tall viewports, compress instead of clip on short.
- `Hyperspeed.tsx`: `App.setPaused()` + IntersectionObserver — three.js+bloom loop stops offscreen (was main idle lag; deck keeps neighbours mounted). `clock.getDelta()` flushed on resume.
- `globe.tsx`: WebGL backing store capped `min(offsetWidth * 2, 2048)` (was ~3460² for a 25%-opacity ambient).
- `SlideReveal.tsx`: standing `will-change: transform, opacity` removed from 13 slide wrappers; now set before reveal anim, cleared `onComplete`.
- `OwlSurfLogo.tsx`: 30fps rAF→setState loop IO-gated, runs only in view.

### Session 40 — desktop scan pass: Services ledger + case-study Split Studio v2
- Services desktop = editorial ledger: ordinals `01–05`, brighter descriptions (`white/70`, `text-lg/xl`), `+5` HoverCard depth cue, quiet row hover. Grid `[2.75rem_minmax(0,23rem)_minmax(0,1fr)_auto]`.
- All 8 case studies desktop: stats → bottom proof strip (`md:inset-x-12 md:bottom-10`, 4 cols, 900-weight numerals, per-cell `md:border-l` NOT `divide-x` — loses to `md:border-0` cascade). Market/Buyer/Role = open hairline ledger (`md:top-[46%]`). Header `md:w-[36%]`. Carousel right-of-center. `lightMode` via `statBorder` + isMobile-branched inline colors. Mitsui subtitle deduped vs Market row.
- Who We Are desktop outcomes 5 → 3 (Understood faster / Easier internal buy-in / Lower perceived risk).
- `CardSwap` deleted (orphaned since ledger; owner approved).
- iPhone ghost strip: removed stack-card `backdrop-filter` + new `clearInlineFilter()` in `slide-motion.ts` (clears residual inline `blur(0px)` after entrances) — both shipped, strip STILL OPEN.

### Session 39 — mobile snap + case carousel + DEHN order
- `deck-snap.ts` + test: mobile `y mandatory` with `scroll-snap-stop: normal` (harder catch, can still skip slides).
- DEHN moved to case `03` after Kuraray; downstream cases renumbered. Bookkeeping in `Index.tsx`, `DebugMenu`, `slide-routes.ts`, `slide-edge-colors.ts`.
- Mobile case carousels → custom stacked-card carousel (`.cs-mobile-stack*` in `CaseStudyCarousel.tsx`/`index.css`), 3s auto-advance, glass frame, DEHN wide via `mobileWideCarousel`. Cover badges near-zero padding; mobile globe centered in 100vw. Clients heading `Our Clients`.
- iPhone ghost strip first parked here (touch clears it; iOS repaint artifact).

### Session 38 — mobile copy + Contact relayout + DEHN case study
- `mobileSubtitle` prop on `CaseStudyLayout` (all 7) + Mitsui inline branch. Parity rule relaxed: mobile may carry shorter variant of same message, never different message.
- Contact: `Bring the product…` paragraph removed (desktop too); mobile column centered, ripple mark 248px, CTAs full-width pair (`Hi` / `Call us`).
- Seam fixes: VNT bottom `hsl(140 30% 28%)`, Kuraray bottom `hsl(207 38% 22%)`, GirlUp bottom `hsl(268 14% 26%)`; gradients 8→6.5svh, 45% mid-stop.
- Mobile springs removed: `getSlideContentEase(isMobile)` in `slide-motion.ts` → settle ease on mobile, springs desktop-only.
- New DEHN case study (`DEHNCaseStudy.tsx`): German lightning/surge protection + earthing, brand red `353 100% 44%`, six WebP creatives, no stats. Deck → 13 slides.

### Session 37 — mobile liquid crest + stagger + color-aware seams (owner-approved on device)
- Sweep flash fixed (`MobileTransitionLayer.tsx`): dt-based eased follower (attack 14 / release 5, ~450ms tail, frame-rate independent); circular glow mark deleted.
- Transition = "liquid crest": teal hairline + bloom position-locked to the physical slide seam (position never eased; opacity eased). Theatre params `tealOpacity`/`blurPx`/`glowScale`.
- Staggered entrance for non-native-motion slides (Cover, Who We Are, Contact) in `MobileSlideMotion.tsx`; native-motion slides skip (own animejs entrances).
- Color-aware seam blend: per-slide edge colors in `src/pages/slide-edge-colors.ts`, joints blend through oklab 50/50 mix. **Slide-order/background changes must update that file.**

### Session 36 — mobile deck motion rebuild (Way A)
- Mobile-only, desktop byte-identical. One continuous scroll page, URL synced to slide in view (`slide-routes.ts`, routes in `App.tsx`, debounced navigate + guards `suppressUrlSyncRef`/`currentSlideRef` in `Index.tsx`). Deep links + back/forward.
- Mobile snap `y proximity`; Motion (`motion` 12.x) cross-fade wrapper `MobileSlideMotion.tsx` (NEVER add `scale` — corrupts `getSlideHeight`). Theatre.js (`@theatre/core`; `@theatre/studio` devDependency, never ships, auto-init disabled) for transition params in `src/theatre/deck.ts`. Swup evaluated, dropped.

### Session 35 — Kuraray added, Raychem removed, cover pass
- `KurarayCaseStudy.tsx` (case 02, dark blue, 10 WebP creatives); Raychem RPG deleted entirely (component + 6 assets).
- Cover: pills `md:-ml-6`, tagline `where tech meets design` (desktop), badges reduced to 3 (LinkedIn/Google/Meta, sharp-trimmed on uniform white chips; Google+Meta from third-party mirrors, user accepted), grid lines behind owl removed, mobile globe ~3/4 visible, CTA `.ts-cta-sheen` shimmer (no text shimmer, no inline arrow).
- VNT +7 creatives. Clients `PrismaticBurst` runs on mobile (documented exception).

### Session 34 — mobile motion refinement
- Cover lockup drops as one unit (`title-motion.ts`); deck wash softened (`deck-transition.ts` profiles); Services/Clients/cases marked `nativeMotion` so `SlideReveal`/`DeckTransitionLayer` don't double-animate (main mobile jagger fix); Clients heading `CLIENTS`; case-study motion unified, no offscreen fallback on mobile.

### Session 32 — lanyard cleanup + mobile polish + DebugMenu
- Deleted `src/components/ui/Lanyard/` + `card.glb` (~2.4MB); uninstalled `@react-three/fiber`/`drei`/`rapier`/`meshline`; `three` folded into `vendor-3d` (~686KB, desktop-gated).
- `DebugMenu.tsx` added (mobile FAB: reload + slide jump). Temporary, still shipping.
- Mobile: sectors marquee full-bleed, outcomes 5→3 pills, Services eyebrow unified, Clients 3 mobile logo rows, case cover-flow image hero, proof "Shift" row filtered centrally, Helvetica stat numbers (beware `span:not([class])` Palanquin footgun).
- Baxsaa identity corrected: Mumbai premium custom-packaging studio (NOT beauty commerce). **Standing rule: verify client identity before writing case copy; plain, outcome-based.**

### Session 31 — desktop Blossom card stack + Contact polish
- `ParallaxCardSlider` → `CaseStudyCarousel.tsx` (git mv): desktop = Blossom "cards" stack (`.cs-cards*` CSS, `view-timeline` + `sibling-index()` keyframes, `@supports` static fallback), old rAF 3D-tilt deleted. Square cards, `object-fit: contain`, 1px inset.
- Stat pills unified to `rounded-full` (superseded on desktop by S40 proof strip). Contact headline one line on desktop; `WordRotate` +6px width buffer; "Clarity" word sets. Nav centered via `margin-inline: auto` (translateX would clobber the show/hide translateY).

### Session 30 — Our Team removed, GSAP removed, plain language
- `OurTeamSlide.tsx` deleted; indices shifted; nav reindexed.
- All animation → Anime.js; `gsap` uninstalled. `PillNav` + CardSwap ported (`createTimeline`/`createTimer`).
- Hallmark fixes: global `:focus-visible` teal ring, `transition-all` → named props, `tabular-nums`, curly apostrophes, `logo-main.jpg` → `.webp`.
- Services plain-language rewrite: 25 descriptions one short sentence each; `AEO` → `AI Search Optimization`, `Marketing Copilots` → `Marketing Assistants`.

### Session 29 — black-screen root cause + mobile polish
- **Real-phone black-screen FIXED:** `Index.tsx` divided `scrollTop` by `window.innerHeight`, which grows when mobile Chrome's URL bar hides → index drift → wrong slide mounted → black `SlideFallback`. Fix: `getSlideHeight(container)` measures a real `.slide`. **Never reintroduce `window.innerHeight` into slide-index/scrollTo math.**
- Contact redesigned as centered closer (ripple mark, `Let's talk`, rotating pills, email+phone CTAs); footer trimmed to logo+socials+copyright.
- Hallmark audit run (0 critical / 4 major / 6 minor) — majors cleared in S30.

### Sessions 25–28 (Hallmark system + early mobile)
- S25: Hallmark design system locked (`design.md`, `tokens.css`, `.hallmark/`); cover `When the product is complex…`; deck reframed as portfolio-PDF replacement for chemical/industrial/technical B2B.
- S26: cover rotating-pill headline (`We turn [industry] businesses into brands buyers actually [trust word]`), local `WordRotate`.
- S27: Slide-2 sector marquee (don't use `LogoLoop` for icon pills — it measures `<img>` widths and over-duplicates); Services mobile segmented bar + stepper + `mobileServices` map.
- S28: Blossom cover-flow mobile carousel; 4-pill stat max; black-screen bug discovered (fixed S29).

### Sessions 20–24 (infra, a11y, mobile base)
- S20: VPS migration docs (`docs/vps-domain-migration.md`, `docs/dependencies.md`, `deploy/` examples, `.nvmrc` Node 22, `.env.example`).
- S21: hook-led cover; Who We Are editorial rebuild over Hyperspeed.
- S22: shared `CaseStudyLayout` created; badges cropped tight; dependency cleanup; lint cleaned to 0.
- S23: a11y pass — PillNav plain `nav>ul>li>button` semantics, Services WAI-ARIA tablist, `usePrefersReducedMotion` hook, mobile WebGL gating, branded `SlideFallback` skeleton, local OG stopgap.
- S24: mobile layout pass; Playwright harness `scripts/mobile-shots.mjs` (`SHOT_TAG`/`SHOT_W`/`SHOT_H`/`SHOT_ONLY`/`SHOT_DESKTOP`, output gitignored).

### Sessions 1–19 (foundation)
- S1: OwlSurf design system (Montserrat/Lora-italic/Palanquin, teal `#4BC2C2`, tokens in `index.css`); 3-zone cover; code-split chunks; `scripts/convert-images.mjs`.
- S2: lazy slide mounting, Hyperspeed lifecycle fixes, DPR caps, offscreen RAF pauses.
- S5–9: Who We Are editorial; Services pillar/CardSwap era; Clients `LogoLoop` (offscreen RAF pause); Contact closer; active-slide-only mounting era (later radius 1).
- S10: single-lanyard team slide (later removed); idle-hiding global nav (1600ms).
- S11: IxDF UX audit; full copy rewrite (`Who they are. What we did.` pattern, banned-words purge); nav labels truth pass; 16 orphan files deleted; PAT exposure flagged.
- S12: gitignored `*.scratch.*` + audit artifacts; `ui-design-plan.scratch.md` parked (local only).
- S13: Mitsui split + Baxsaa vertical case layouts established.
- S15–16: Anime.js motion system deck-wide; scan-line/glow-orbit removed; teal scale 50–700 added.
- S17–19: `OwlSurfLogo` animated SVG; badge image assets; FlyonFooter; branded 404 (`NotFound.tsx`); Mitsui proof-strip layout; `MagneticButton`.

---

## Architecture Decisions (permanent, still valid)

| Decision | Why |
|---|---|
| Desktop scroll-snap `y mandatory` + `stop: always`; mobile `y mandatory` + `stop: normal` (S39) | Clean slide-by-slide; mobile keeps natural swipe momentum. |
| No Redux/Zustand | Local state + refs; nav handlers via props. |
| Anime.js only animation library (GSAP removed S30) | One engine; Motion (mobile cross-fade) + Theatre (params) are the documented mobile exceptions. |
| Slide-index math uses `getSlideHeight(container)`, never `window.innerHeight` | Mobile URL-bar growth drifts the index → black slide (S28/29 bug). |
| Mount current slide + neighbors (`SLIDE_MOUNT_RADIUS = 1`); branded skeleton fallback | Bounded WebGL/RAF load, no black flash. |
| Every loop (rAF/interval/WebGL/timer) pauses offscreen | Product requirement (prod.md); S41 closed the last violators. |
| Ambient WebGL DPR cap 1.25 | Retina heat/lag control. |
| Bare-span footgun | `span:not([class])` forces Palanquin italic — always `font-sans not-italic` on bare spans in headings. |
| Contact logo layering | Position `ct-mark`, animate only `ct-mark-inner` — animating the positioned wrapper kills centering. |
| Carousel centering | Structural transforms on a stable outer wrapper; Anime.js animates an inner element only. |
| Case-study edits go in `CaseStudyLayout` | Mitsui (`CaseStudySlide`) is the only custom case file; keep parity when porting. |
| No `LiquidGlassCard` for stats | Pre-baked saturate/brightness fights brand tints; custom translucent pills instead. |
| Local adaptations over dependency installs | External UI patterns (MagicUI, FlyonUI, SmoothUI…) get ported into local TW3 components. |

---

## Known Issues / TODOs

- [ ] iPhone ghost strip on mobile case headings (see handoff item 1).
- [ ] `DebugMenu.tsx` removal decision before "real" prod.
- [ ] True 1200×630 OG card (favicon stopgap live).
- [ ] `deploy.yml` retry flags unpushed (needs `workflow` scope); PAT rotation outstanding.
- [ ] `npm audit` advisories (user deferred).
- [ ] `vendor-3d` ~686KB chunk warning (desktop-gated; acceptable for now).
- [ ] Stale Browserslist/caniuse-lite build notice.

---

## File Map (key files)

```
src/
  App.tsx                     — router; per-slide slug routes → Index; catch-all 404
  pages/Index.tsx             — slide registry, mount window, scroll→index, URL sync (mobile)
  pages/slide-routes.ts       — slide index ↔ URL slug map
  pages/slide-edge-colors.ts  — per-slide edge colors for mobile seam blend (keep in sync with deck order)
  pages/deck-snap.ts (+test)  — snap config
  pages/NotFound.tsx          — branded 404
  components/
    SlideReveal.tsx           — entrance wrapper; nativeMotion skip; mobile seam overlays
    MobileSlideMotion.tsx     — mobile cross-fade + stagger (no scale, ever)
    MobileTransitionLayer.tsx — liquid crest (Theatre params in src/theatre/deck.ts)
    DeckTransitionLayer.tsx   — desktop liquid wash
    CaseStudyCarousel.tsx     — Blossom stack (desktop .cs-cards / mobile .cs-mobile-stack)
    PillNav.tsx               — idle-hiding nav (Anime.js)
    DebugMenu.tsx             — TEMP mobile FAB
    OwlSurfLogo.tsx           — animated SVG mark (IO-gated loop)
    blocks/FlyonFooter.tsx    — contact footer
    slides/                   — TitleSlide, SkyrocketSlide, ServicesSlide, ClientsSlide,
                                CaseStudySlide (Mitsui), CaseStudyLayout + 7 case files,
                                ContactSlide, slide-motion.ts (shared eases/helpers)
    ui/interactive-grid-pattern.tsx — MagicUI grid (case-study bg, S42)
    ui/ripple.tsx             — MagicUI ripple (Contact, S42)
    ui/word-rotate.tsx        — Anime.js rotating word pill
    ui/Hyperspeed/, LightRays.tsx, ui/PrismaticBurst/, ui/globe.tsx, ui/LogoLoop/ — WebGL/loop effects (all offscreen-paused)
  hooks/use-mobile.tsx, use-reduced-motion.tsx
  index.css                   — tokens, slide CSS, carousel recipes, keyframes
scripts/mobile-shots.mjs      — Playwright screenshot harness
scripts/convert-images.mjs    — PNG→WebP (needs sharp)
deployment/                   — VPS webhook server + deploy script (see ops section)
docs/, deploy/                — migration guides + static-host config examples
design.md, tokens.css, .hallmark/ — locked Hallmark design system
prod.md                       — design principles, product philosophy, do-not-reintroduce rules
```
