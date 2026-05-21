# Project Context — Presentation Palette Perfect

> Running log of all meaningful changes, rationale, and current state. Updated on every push.
> Read this before touching any file — it tells you what exists, why it was built that way, and what's been tried.

---

## Current State (as of last push)

**Live URL:** Was on Vercel (domain broken — needs reconnect). GitHub: `Manasxxx/presentation-palette-perfect`.
**Dev:** `npm run dev` → `localhost:8080` (port hardcoded in `vite.config.ts`).
**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Anime.js + GSAP + shadcn/ui.
**Latest pushed work:** Slide 2 editorial skeleton cleanup — remove `Who / We Are`, keep the layout shell for later copy.

---

## Session Log

### Session 1 — Setup + Design System + Title Slide Redesign

**What was done:**

**1. Dev environment wired**
- `.claude/launch.json` created pointing to port 8080 (Vite's hardcoded port in config).
- Build confirmed clean before any changes.

**2. OwlSurf Design System applied** (`src/index.css`, `tailwind.config.ts`)
- Fonts: Montserrat (Google Fonts, display/H1/UI), Lora italic (local `.ttf`, H2 only), Palanquin (local `.ttf`, body/descriptions).
- Font files copied to `public/fonts/`: `Lora-Italic-VariableFont_wght.ttf`, `Palanquin-Regular/Medium/SemiBold.ttf`.
- Bug found + fixed: global `span:not([class])` rule in `index.css` was forcing Palanquin onto the bare `OWL` span. Fixed by adding `className="font-sans"` to both OWL and SURF spans explicitly.
- CSS custom properties added: `--owl-teal` (#4BC2C2), full spacing scale (4px base), radii tokens, shadow tokens (including `--shadow-accent` teal glow), motion tokens (`--ease-default`, `--duration-*`).
- Tailwind `owl.*` colors updated from broken `hsl(var(--owl-black))` format to direct hex values.
- Old font imports (Roboto, Yantramanav, Trykker) removed — replaced by OwlSurf stack.

**3. Title slide (TitleSlide.tsx) — full redesign**
- Layout: 3-zone vertical (`justify-between`) — eyebrow top, wordmark+logo center, info+button bottom.
- Wordmark: `OWLSURF` left-aligned, OWL white + SURF teal, Montserrat 900. `DIGITAL` below in Palanquin medium, spaced tracking.
- Logo: right side, `<a>` linking to owlsurf.com. LiquidGlassCard wrapper retained. 3 concentric teal rings animate in.
- Info columns: 2-col grid — "B2B Marketing / For technical & industrial brands" + "Built For / Long cycles…".
- Jump to Creatives button: moved into bottom flex zone (was absolute, was overlapping info columns). Arrow above it.
- Removed: Google/Meta partner badges, centered shimmer letter animation, www.owlsurf.com text link (replaced by clickable logo), SCROLL indicator (no room at bottom).
- Globe: retained as ambient background, repositioned bottom-left, opacity 25%.
- LightRays: retained, opacity reduced to 30%.

**Rationale for 3-zone layout:** Matches the reference design provided by user (PowerPoint slide aesthetic). `justify-between` with fixed `py-14` padding pins each zone to its region without JS. Logo `items-center` with the wordmark flex row aligns them vertically without needing explicit height calculations.

**4. Scroll smoothness pass**
- `scroll-snap-type: mandatory` kept (reverted from `proximity` — caused jitter).
- `scroll-snap-stop: always` kept (reverted after removing caused jitter).
- Removed `contain: layout style paint` from `.slide` — was breaking absolute positioning inside slides.
- Removed `will-change: transform` from `.slide` — promoting all slides to GPU layers simultaneously causes VRAM pressure and jank.
- rAF-throttled scroll handler in `Index.tsx` — prevents React re-render on every scroll pixel.
- SlideReveal easing updated to OwlSurf's `cubic-bezier(0.25, 0.1, 0.25, 1.0)`, duration 900→1100ms, scale animation removed (was causing sub-pixel jank).

**5. Performance — bundle code-splitting** (`vite.config.ts`)
- Before: single 1.18MB JS chunk.
- After: 6 parallel chunks — `vendor-react` 157KB, `vendor-gsap` 70KB, `vendor-anime` 34KB, `vendor-ui` 58KB, `vendor-3d` 694KB (cobe/ogl/postprocessing), `index` 165KB.
- `vendor-3d` is large but loads in parallel and doesn't block render.

**6. Image conversion script** (`scripts/convert-images.mjs`)
- `npm run images:convert` — converts all PNGs in `src/assets` to WebP at quality 82.
- Requires `npm i -D sharp` (not auto-installed — run once).
- Typical saving: 40–60% per file.
- Current assets: 2.4MB total, mostly already WebP. PNGs left: client logos + some creatives.

### Session 2 — Performance Scan + Lifecycle Fixes

**What was done:**

**1. Live dev server started**
- `npm run dev` started successfully at `http://localhost:8080/`.
- Initial sandbox bind to port 8080 failed; rerun with approval fixed it.

**2. Codebase inefficiency scan**
- Build passed before changes, but warned about `vendor-3d` at ~694KB minified / ~213KB gzip.
- Tests passed (`vitest run`, 1 test).
- Lint failed before changes with existing visual-component typing debt (`any`, `@ts-nocheck`, hook dependency warnings, Tailwind `require()`).
- Main inefficiency buckets found: eager slide imports, offscreen animation loops, WebGL cleanup leaks, dead/misdirected scroll listeners, and image/font payload weight.

**3. Deck lazy-loading + mount strategy** (`src/pages/Index.tsx`)
- Heavy slides changed from eager static imports to `React.lazy` dynamic imports.
- Added a placeholder slide fallback that preserves scroll-snap height while unloaded.
- Added `mountedSlides` tracking: current + neighboring slides are loaded progressively, and once a slide is mounted it stays mounted.
- Important correction: first attempt unmounted far-away slides, which caused the Why Us / Hyperspeed animation to stop. Final approach preserves loaded slide lifecycles while still avoiding loading the full deck on first paint.
- Added `data-deck-scroll-container` to the main scroll container so slide-level effects can attach to the correct scroller.

**4. Hyperspeed lifecycle fixes** (`src/components/ui/Hyperspeed/Hyperspeed.tsx`, `src/components/slides/SkyrocketSlide.tsx`)
- Fixed resize listener leak by binding `onWindowResize` once and removing the same function reference in `dispose()`.
- Stored and cancelled the animation frame id during disposal.
- Guarded async `loadAssets().then(init)` so disposed instances do not initialize after unmount.
- Stabilized the Why Us slide's `effectOptions` with `useMemo` so Hyperspeed is not torn down/recreated on every render.

**5. Slider/offscreen work reduction** (`src/components/ParallaxCardSlider.tsx`)
- Replaced always-running desktop tilt loop with an IntersectionObserver-driven loop that only runs while the slider is visible.
- Auto-advance interval now only exists while the slider is visible.
- Slide-transition timeouts are tracked and cleared on unmount.
- Hook dependency warnings for `getPrev` / `getNext` were addressed by memoizing them.

**6. Scroll and pointer cleanup** (`TitleSlide.tsx`, `WhoAreWeSlide.tsx`, `ServicesSlide.tsx`)
- Title parallax now listens to the actual deck scroll container, not `window`.
- WhoAreWe parallax code was pointed at the deck scroll container too, although it currently exits early because `.wa-parallax-bg` is not present in the markup.
- Disabled LightRays mouse-follow on Title and Services because both usages are ambient and `pointer-events-none`; this avoids global mousemove tracking for decoration-only effects.

**Verification:**
- `npm run build` passed after changes.
- `npm test` passed after changes.
- `npm run lint` still fails due to pre-existing strict typing issues in visual components (`LightRays`, `Ballpit`, `Hyperspeed`, `PrismaticBurst`, `SplitText`, `globe`, `tailwind.config.ts`).
- Pushed commit `cf84d71` to `origin/main`.

### Session 3 — Slide 2 Reference Layout Iteration

**What was done:**

**1. Slide 2 rebuilt as a reference-style editorial shell** (`src/components/slides/SkyrocketSlide.tsx`)
- The old `Skyrocketing` / Why Us content was replaced with a dark OwlSurf version of the provided `Who We Are` reference layout.
- The slide keeps the existing Hyperspeed background animation behind the editorial frame.
- Current visible structure: `Owlsurf Digital` label, `02 / 05`, `Built For Industry`, `01 Introduction`, orange divider, empty body space, sectors grid, `Portfolio & Credentials`, and `www.owlsurf.com`.
- Per the latest direction, the large `Who / We Are` title and body copy were removed so the user can fill the layout manually later.

**2. Illustration removed after layout review**
- An industrial reference illustration was briefly added and then removed because the user wanted the layout copied without the right-side illustration.
- The current right side is intentionally minimal: only subtle technical grid texture, footer rule, and the animated background atmosphere.

**3. Navigation hidden on Slide 2** (`src/pages/Index.tsx`)
- Pill navigation is hidden when slide 2 is active so it does not cover the reference-style top labels or make the page look cluttered.
- Existing case-study nav hide behavior remains unchanged.

**Design note:** Slide 2 is now a content skeleton, not final copy. Preserve the empty body area unless the user explicitly asks to add text back.

---

## Architecture Decisions (permanent)

| Decision | Why |
|---|---|
| Scroll-snap `mandatory` + `scroll-snap-stop: always` | Forces clean slide-by-slide navigation. `proximity` causes jitter. |
| No Redux/Zustand | Deliberate — local state + refs only. Cross-slide nav via prop drilling (`onViewCaseStudies`). |
| Anime.js for entrance sequences | Migrated from Framer Motion. Lighter, more control. |
| GSAP for PillNav only | Complex interdependent timelines. Anime.js handles everything else. |
| 3-zone title layout (justify-between) | Eyebrow top, hero center, footnotes bottom — matches PowerPoint slide convention. |
| Fonts local + Google hybrid | Montserrat from Google (large weight range), Lora+Palanquin local (italic VF not on Google). |
| Progressive slide mounting | Load the visible slide and neighbors first, but keep loaded slides mounted so WebGL/animation-heavy slides do not restart or freeze. |
| Slide 2 as editable skeleton | User wants to fill the body copy later, so keep only the reference layout frame, sectors, labels, and background animation. |

---

## Known Issues / TODOs

- [ ] Vercel deployment broken — needs reconnect or redeploy.
- [ ] PNGs in `src/assets` not yet converted to WebP — run `npm run images:convert` after `npm i -D sharp`.
- [ ] `logo-main.jpg` used for owl logo — should be converted to WebP or replaced with SVG/PNG with transparency.
- [ ] Bundle `vendor-3d` still appears as a large chunk (~694KB minified) when 3D slides load — consider splitting `ogl`, `cobe`, and `postprocessing` by feature or moving 3D code behind deeper dynamic imports.
- [ ] Mobile layout for title slide not verified after redesign.
- [ ] `OurTeamSlide.tsx` still placeholder — needs real team content.
- [ ] `npm run lint` fails on existing visual-component typing debt (`any`, `@ts-nocheck`, hook warnings, Tailwind `require()`).

---

## File Map (key files only)

```
src/
  pages/Index.tsx          — lazy slide registry, progressive mounting, scroll handler, nav
  components/
    slides/TitleSlide.tsx  — cover slide, 3-zone layout
    slides/SkyrocketSlide.tsx — slide 2 editorial skeleton, memoized Hyperspeed config
    SlideReveal.tsx        — intersection observer + anime.js entrance wrapper
    ParallaxCardSlider.tsx — visible-only auto-advance + tilt animation
    PillNav.tsx            — GSAP-powered top nav
    LightRays.tsx          — WebGL light rays background effect
    ui/Hyperspeed/         — WebGL road effect; cleanup fixed for resize + rAF
    ui/globe.tsx           — cobe globe
  index.css                — all CSS tokens, OwlSurf design system vars
tailwind.config.ts         — font families, owl.* colors, keyframes
vite.config.ts             — port 8080, manualChunks code-splitting
scripts/convert-images.mjs — PNG→WebP batch converter
prod.md                    — design principles + product philosophy
context.md                 — this file
```
