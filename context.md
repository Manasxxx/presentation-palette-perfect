# Project Context — Presentation Palette Perfect

> Running log of meaningful changes, rationale, current state. Updated on every push.
> Read before touching files. Durable design rules + "do not reintroduce" lists live in `prod.md`; this file holds history + operations.

---

## Current State (Session 43 push prep)

Cover lockup + tagline pill, Services D2 outcome pillar cards, brand marks, Hallmark minor pass, circle-wipe removal.

- **Cover lockup + tagline (`TitleSlide.tsx`).** OWLSURF all teal (OWL span got SURF's `text-owl-teal` + glow; SURF `mx-1` → `mr-1` so the word reads as one), DIGITAL white. Tagline is now a pill chip under the wordmark (desktop only, as before): `rounded-full border-owl-teal/35 bg-owl-teal/[0.07] px-5 py-2`, content `WHERE TECH MEETS` (Montserrat bold uppercase, white/85, tracking 0.22em) + `DESIGN` (teal, font-black), `md:-ml-4` so inner text optically aligns with the wordmark's left edge (same trick as the hero rotating pills' `-ml-6`). The serif-italic lowercase "design" tagline treatment is gone — superseded by owner request.
- **Services desktop = D2 outcome pillar cards (`ServicesSlide.tsx`).** The S40 editorial ledger + HoverCard are replaced by five glass pillar cards, 3+2 grid (`grid-cols-6`: top three `col-span-2`, bottom two `col-span-3`), horizontal card layout: left column "BE / [OUTCOME]" (outcome always teal + glow) with ordinal bottom (white/40), right column one sentence + inline small-caps tag row over a hairline. Pillars (owner's taxonomy): Found = SEO·AI Search·Reviews / Seen = Meta·Google·LinkedIn / Understood = Videos·Decks·Whitepapers / Trusted = Web·UX·CRM / Known = Events·PR·Launches. Glass recipe `bg-white/[0.04] backdrop-blur-md border-white/10` + inner top highlight; hover −2px lift + teal border/glow (brand spec). All vertical sizing svh-clamped (S42 lesson). `desktopServices` type reshaped to `{outcome, description, tags}`; `categories`, `mobileServices`, and the whole mobile branch untouched — **mobile still presents the old five categories (parked)**. Subtitle de-serifed: sentence Palanquin, only "That's it." Lora italic teal.
- **Brand marks (`src/components/ui/brand-marks.tsx`, NEW).** Inline-SVG official marks: Google G (4-color), Meta `#0081FB`, LinkedIn `#0A66C2`, ChatGPT (white), Claude `#D97757`, Gemini `#3186FF` — paths from simple-icons. `brandMarks` map keys tags → marks; "AI Search" maps to an `AISearchMarks` trio (ChatGPT+Claude+Gemini). Used in Services card tags (mark beside text; composite gets no width constraint — see the conditional className in the tag renderer) and the Clients "Certified partner" pill, where Meta+Google text became the two marks with `sr-only` text.
- **Hallmark minor pass (Services + Clients; cover/contact/cases owner-excluded; Who We Are audited clean).** Services cards lost the dead `tabIndex={0}` (no interaction behind it); hover lift normalized to brand −2px; ordinals raised white/30 → /40. Clients: heading split `Our ` (white) + `Clients` (teal) per the unified heading recipe (accent animation stays on "Clients"); logo cards' bare `transition` → `transition-[border-color,background-color,transform]`; credibility pill values got `tabular-nums`. Open flag: Who We Are carries 3 uppercase eyebrows (Hallmark cap 1–2) — trimming needs owner sign-off.
- **Circle wipe REMOVED (all 8 case studies, `CaseStudySlide.tsx` + `CaseStudyLayout.tsx` + `index.css`).** Root cause chain worth keeping: the `.bg-wipe` circle clip-path reveal had been invisible since inception because a full-opacity duplicate of the same gradient sat at `z-[-1]` beneath it — the wipe painted identical pixels over identical pixels. Only GirlUp ever showed anything (its translucent purple gradient stop double-compounded where the layers overlapped). S43 first made it real (dim underlay 12% + accent `drop-shadow` rim on the clipped layer, 1600ms), owner reviewed and cut it as not worth the weight. Final state: one static background div per case slide; the wipe animation block, the dup underlay, and the `.bg-wipe` rules in the reduced-motion/coarse-pointer media block are all deleted. If the iPhone ghost strip persists, `bg-wipe` is now eliminated as a suspect by absence.
- **Verification.** `npm run lint` (0 errors; pre-existing `badge.tsx` warning + same-class `brand-marks.tsx` warning), vitest 16/16, `npm run build` pass. `.github/workflows/deploy.yml` excluded (PAT lacks `workflow` scope).

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

### Session 42 — desktop case-study visual pass + Contact ripple + docs compaction
- Carousel cards `25rem → 28rem` (`.cs-cards-stage--xl`), stage `md:left-[calc(100%-20rem)]` (fanned side cards need ~3rem clearance), `.cs-cards-ground` elliptical shadow (radial gradient, no blur filter).
- Interactive grid bg, all 8 cases desktop (`ui/interactive-grid-pattern.tsx`, MagicUI→TW3, inline `strokeColor`/`hoverFillColor`): 48×36 @40px, `inset-y-[-30%] h-[200%] skew-y-12`, 900px radial mask, accent /0.24 stroke /0.4 hover. Works because content layer is `md:pointer-events-none`; desktop text selection on cases lost (accepted).
- Contact ripple (`ui/ripple.tsx`, MagicUI): 52rem box centered in `.ct-mark`, `mainCircleSize 236`, 7 circles, radial mask; keyframes + reduced-motion gate in `index.css`.
- Cover globe invisible FIXED (`globe.tsx`): S41 cap fed shader uniform only while cobe sized the buffer from `devicePixelRatio` — cap now flows through dpr (`min(2, 2048/offsetWidth)`) so buffer and uniform agree.
- `scripts/clip-audit.mjs` (Playwright, 7 viewports): Services desktop ledger clipped ≤235px on short viewports → svh clamps on container/rows/type. Intentional bleeds (do not "fix"): LogoLoop edges, mobile sector marquee, mobile stack side-peek, desktop carousel fan.
- Nav glass blend-in: `--pill-bg: transparent`, active pill teal + ink text, dark-glass hamburger/popover, backdrop black/55; desktop nav pinned on 0-3 + Contact, activity-driven on cases. Gotcha: `.pill.is-active` text + `.hamburger-line` colors were derived from `--pill-bg` — re-check both on any var change.

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
