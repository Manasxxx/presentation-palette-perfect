# Project Context — Presentation Palette Perfect

> Running log of all meaningful changes, rationale, and current state. Updated on every push.
> Read this before touching any file — it tells you what exists, why it was built that way, and what's been tried.

---

## Current State (as of last push)

**Live URL:** Was on Vercel (domain broken — needs reconnect). GitHub: `Manasxxx/presentation-palette-perfect`.
**Dev:** `npm run dev` → `localhost:8080` (port hardcoded in `vite.config.ts`).
**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Anime.js + GSAP + shadcn/ui.
**Latest pushed work:** Slide 2 "Who We Are" editorial update, old ball-animation slide removal, and Our Team rebuild with six horizontal profile cards over a teal radar background.

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

**6. Scroll and pointer cleanup** (`TitleSlide.tsx`, `ServicesSlide.tsx`)
- Title parallax now listens to the actual deck scroll container, not `window`.
- Disabled LightRays mouse-follow on Title and Services because both usages are ambient and `pointer-events-none`; this avoids global mousemove tracking for decoration-only effects.

**Verification:**
- `npm run build` passed after changes.
- `npm test` passed after changes.
- `npm run lint` still fails due to pre-existing strict typing issues in visual components (`LightRays`, `Hyperspeed`, `PrismaticBurst`, `SplitText`, `globe`, `tailwind.config.ts`).
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

### Session 4 — Theme Toggle Removal

**What was done:**

**1. Dark/light mode functionality removed** (`src/pages/Index.tsx`, `src/components/ThemeToggle.tsx`, `src/styles/theme-switch.css`)
- Removed the `ThemeToggle` import and render from the main deck shell.
- Deleted the standalone toggle component and its animated switch stylesheet.
- Case-study and slide-2 nav hiding now only controls `PillNav`; there is no bottom-right theme switch UI.

**2. Theme plumbing cleaned up** (`src/index.css`, `src/vite-env.d.ts`)
- Removed the `.light` CSS variable override block so the presentation stays on the dark OwlSurf theme.
- Removed the old root view-transition CSS and `Document.startViewTransition` type that existed only for the theme animation.

**Verification:**
- `npm run build` passed after changes.
- `npm test` passed after changes.
- Visual screenshots of the first five slides were captured from `http://localhost:8080/` after the cleanup.

### Session 5 — Slide 2 Who We Are Editorial Build

**What was done:**

**1. Page-level header/footer removed** (`src/components/slides/SkyrocketSlide.tsx`)
- Removed the old slide-2 top labels: `Owlsurf Digital`, `02 / 05`, and `Built For Industry`.
- Removed the old footer URL and page-frame border.
- Removed the `Introduction` kicker, orange divider, and `Portfolio & Credentials` text.

**2. Right-side technical illustration added**
- Added `src/assets/industrial-engineer-slide-2.png` from the generated technical line illustration.
- The image is anchored on the right, zoomed to reach the slide edges, shifted toward the right edge, and uses `mix-blend-screen`.
- Removed experimental circular crop, semicircle overlay, grid pattern, and gradient divider after review.

**3. Left-side copy added**
- Added `WHO / WE ARE` and B2B agency copy using the secondary/body font (`font-body`, Palanquin).
- Preserved the slide's dark OwlSurf visual system and Hyperspeed atmospheric background.
- Kept sectors visible under `Sectors We Serve`, anchored further toward the bottom-left.

**Verification:**
- `npm run build` passed after changes.

### Session 8 — Services Slide Tabbed CardSwap, AI Pillar

**What was done:**

**1. Services slide moved from icon grid to tabbed CardSwap layout** (`src/components/slides/ServicesSlide.tsx`, `src/components/ui/CardSwap/`)
- Replaced the flat 8-card grid with a 5-pillar tabbed layout: **Content & Creative**, **Reach & Activation**, **Search & Listening**, **Data & Tech**, **AI & Automation**. Each pillar holds 5 sub-services (25 total).
- Integrated React Bits' `CardSwap` component (`src/components/ui/CardSwap/CardSwap.jsx` + `CardSwap.css`). Uses gsap (already in `vendor-gsap` chunk via `vite.config.ts`). Elastic easing, 3s swap interval, `pauseOnHover` enabled.
- `<CardSwap key={activeKey} />` forces a clean remount on tab change so the gsap timeline and refs reinitialize cleanly.

**2. Pillar tabs (left column)**
- 5 pillars, each shown as a button with: a category icon in a 10×10 rounded square (replaces the earlier 01–04 numbers), a monster-styled `font-black uppercase tracking-tight` label, and a count chip on the right showing "5".
- Active state: teal border, teal-tinted bg, teal vertical accent stripe on the left edge, icon and chip flip to teal accent colors.
- Tabs and stack now align via `items-start` on the grid (was `items-stretch`).

**3. CardSwap stack (right column)**
- 5 cards per pillar. Card body: small teal-tinted icon (`h-8 w-8`) + small monster heading on the **top edge** so all 5 cards' icon-and-title strips peek above the front card in a staircase. Then a one-line description, then a footer band ("PILLAR LABEL • B2B / Industrial"). Vertical teal accent stripe on the left edge of each card.
- Card heading color is teal (`text-primary`), matches the active pillar accent.
- Card dimensions: 520×270. `cardDistance: 48`, `verticalDistance: 52` — chosen so each back card's 52px top strip fully exposes its icon+heading row.
- Card descriptions are layman-friendly but retain industry terms: **ABM**, **SEO**, **HubSpot / Marketo / Pardot**, **Salesforce**, **AEO (Answer Engine Optimization)**, **Marketing Copilots**, **AI Personalization**. No em dashes.

**4. CardSwap container positioning** (`src/components/ui/CardSwap/CardSwap.css`)
- Default React Bits CSS was `bottom: 0; right: 0; translate(5%, 20%)` (bottom-right overhang). Switched to centered within its parent column: `bottom: 30%; right: 50%; transform: translate(50%, 50%) scale(1.3)` so the stack reads bigger and sits low-center of the right column. Perspective bumped to 1100px. Card border / background tweaked to OwlSurf teal-on-dark.

**5. Layout shift up** (`ServicesSlide.tsx`)
- Grid moved from `my-auto` → `mt-[15vh]` → finally `mt-[3vh]` after iteration. Left pillars sit higher in the slide, right CardSwap is offset down via its own CSS (`bottom: 30%`), giving an asymmetric editorial feel.

**Verification:**
- `npm run build` passes (1773 transformed modules, ServicesSlide chunk grew from 3.78kB → ~13kB, gzipped ~5kB).
- `npm test` passes.
- Preview tool cannot reach slide 4 via programmatic scroll (lazy-load + scroll-snap limitation), so all visual verification happens in the browser. User confirmed live rendering at multiple checkpoints.

### Session 7 — Services Rebuild, Clients Redesign, Heading Unification

**What was done:**

**1. Services slide stripped + rebuilt as B2B icon grid** (`src/components/slides/ServicesSlide.tsx`)
- Removed the old tabbed interface (4 services with active-tab content panel).
- New layout: 8-service icon grid (4×2 desktop, 2×4 mobile) inspired by FoxyMoron's services page but adapted to OwlSurf's dark theme and B2B angle.
- Services: Content Strategy, Creative Production, Creator Partnerships, Tech Solutions, Social Listening, Search & SEO, Paid Ads, Data & Insights. Each card has a teal Lucide icon, simplified layman-friendly title, and a B2B-angled description (e.g., "Targeted LinkedIn, Google, and programmatic campaigns built for long sales cycles and complex buying committees").
- Stagger reveal on intersection — header first, then cards on 70ms cascade.
- LiquidGlassCard, useIsMobile, and tab-switching state removed.

**2. Clients slide redesign** (`src/components/slides/ClientsSlide.tsx`)
- Heading repositioned from centered to top-left, monster-sized (matches OurTeamSlide's `clamp(3.4rem, 5.9vw, 6.6rem)` Montserrat black). MAJOR white + CLIENTS teal-gradient.
- Critical fix: `.slide` base class has `items-center justify-center`, so all heading attempts to left-align failed until a `w-full h-full` wrapper was introduced as the single centered flex child. Pattern is now applied to ClientsSlide, ServicesSlide, and OurTeamSlide.
- Bare-span footgun re-bit us: the global `span:not([class])` rule italicized MAJOR. Fix is `font-sans not-italic` explicitly on both word spans. CLIENTS also needs `inline-block pr-2` to prevent `bg-clip-text` from cropping the trailing S.
- Edge fade uses `mask-image` directly on the cards container (`transparent 0%, black 14%, black 86%, transparent 100%`) — cards now visibly fade to fully transparent at the edges. Earlier attempts with absolute-positioned blur+gradient overlays were either too dark (heavy background tint) or too weak (cards still visible through blur).
- Marquee jitter fixes (see #3) made the carousel smooth.
- PrismaticBurst `speed={0.18}` (was the default `0.5`) for a calmer background shimmer.

**3. Marquee GPU compositing + smoothness fixes** (`src/components/ui/marquee.tsx`, `tailwind.config.ts`)
- Tailwind `marquee` and `marquee-vertical` keyframes now use `translate3d(...)` instead of `translateX/Y(...)` to force GPU layer promotion.
- Inner marquee divs get `will-change: transform` and `backface-visibility: hidden` inline.
- Reverted a misguided `repeat={2}` attempt back to `repeat={4}` after seamless looping broke (need enough copies to span the viewport continuously).

**4. Heading format unified across upper-deck slides** (`SkyrocketSlide.tsx`, `OurTeamSlide.tsx`, `ServicesSlide.tsx`, `ClientsSlide.tsx`)
- Standard heading format now: `font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2`.
- Eyebrow above the h2: `text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block` with a short label (e.g., WHO WE WORK WITH, WHAT WE DO, THE PEOPLE).
- Split-color treatment on most: first word white, second word `text-gradient-green`. Slide 2's "WHO WE / ARE?" already used split spans with `text-gradient-green` on WE — only the font-size and leading were updated to match.

**Verification:**
- `npm run build` passes (1772 transformed modules, expected `vendor-3d` ~678KB chunk warning).
- `npm test` passes (1 test).
- Preview tool cannot reliably mount slides past index 1 due to the lazy-load + scroll-snap combination, so visual verification has to happen in a real browser. Confirmed live for slide 2 (font size now 54.4px at desktop viewport, matching the standard `clamp(3.4rem, 5.9vw, 6.6rem)`).

### Session 6 — Team Slide Rebuild + Old Animation Removal

**What was done:**

**1. Slide 2 refined into final "Who We Are" copy**
- Headline now reads `WHO WE / ARE?`, with `WE` in teal and the question mark kept with `ARE`.
- Body copy now reads: `We translate technical depth into market momentum.`
- `technical depth` and `market momentum.` use matching Lora italic styling with larger hand-drawn teal highlights behind black text.
- Sectors were kept short and readable: Chemicals, Pharma, Energy, Infrastructure, Education.
- Sector icons were enlarged while labels were reverted to their concise original names after review.

**2. Old third "Who We Are" slide removed**
- Removed `WhoAreWeSlide` from the slide registry in `src/pages/Index.tsx`.
- Deleted `src/components/slides/WhoAreWeSlide.tsx`.
- Deleted the unused `src/components/ui/Ballpit/Ballpit.tsx` animation path.
- Updated navigation/case-study indices after the removal: case studies now run from slides 5 through 11 and Contact is slide 12.

**3. Our Team slide rebuilt**
- Added React Bits `ProfileCard` component files (`src/components/ProfileCard.jsx`, `src/components/ProfileCard.css`).
- Added React Bits `Radar` component files (`src/components/Radar.jsx`, `src/components/Radar.css`) using the existing `ogl` dependency.
- Rebuilt `OurTeamSlide.tsx` as a six-person grid: Harshit, Sakshi, Manas, Sanskriti, Pankaj, Vishnu.
- Current roles: Strategy & Growth, Client Partnerships, Digital Enablement, Creative Direction, Technology & Delivery, Creative Architect.
- Cards are horizontal, teal-tinted, and arranged three over three. Hover rainbow treatment is disabled; the idle/initial profile-card movement remains.
- Vishnu temporarily reuses Pankaj's avatar because no separate Vishnu avatar asset exists yet.

**4. Efficiency notes**
- Removing the old Ballpit path avoids carrying the extra ball animation code in the deck.
- `vendor-3d` is still the largest production chunk because the deck still uses WebGL effects (`Hyperspeed`, `Radar`, `ogl`, `cobe`, `postprocessing`).
- `Radar` is currently desktop-grade visual work behind the team cards. If mobile performance becomes a problem, gate it with `useIsMobile()`.

**Verification:**
- `npm run build` passed with 1771 transformed modules and the expected `vendor-3d` large chunk warning (~678KB minified / ~208KB gzip).
- `npm test` passed (1 test).
- `npm run lint` still fails only on existing visual-component typing debt in `LightRays`, `Hyperspeed`, `PrismaticBurst`, `SplitText`, `globe`, and `tailwind.config.ts`.
- Trace check confirms no remaining `WhoAreWeSlide` or `Ballpit` references in `src/`.

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
| Slide 2 as editorial Who We Are slide | Uses Palanquin copy, low-left sectors, and right-side technical line illustration. Do not restore removed header/footer, border, grid, semicircle, or divider gradient unless asked. |
| No separate ball-animation Who We Are slide | The old third slide and Ballpit animation were intentionally removed to reduce visual clutter and code weight. |
| Our Team as six horizontal cards | Team profiles use React Bits ProfileCard styling with local avatar assets and a teal Radar background. Preserve the 3x2 information density unless a new layout direction is given. |
| Fixed dark theme | The deck no longer exposes light/dark switching; OwlSurf dark mode is the single visual system. |
| Unified upper-deck heading format | Slides 2–5 share one heading recipe: eyebrow + `clamp(3.4rem,5.9vw,6.6rem)` Montserrat black, white first word + teal-gradient second word, left-aligned via a `w-full h-full` wrapper that defeats `.slide`'s `items-center justify-center`. |
| Services as B2B icon grid | Slide 4 uses 8 icon cards (4×2) with simplified service names and B2B-angled descriptions (long sales cycles, complex buying committees, technical evaluators). No tabs. |
| Marquee uses `translate3d` keyframes | GPU compositor path is required to avoid jitter on the Clients carousel. Inner divs also need `will-change: transform`. Don't drop below `repeat={4}` or the loop breaks. |
| Bare-span footgun | `span:not([class])` in `index.css` forces Palanquin italic onto any class-less `<span>`. Always add `font-sans not-italic` (or equivalent) on bare spans inside h1/h2 to keep them in Montserrat. |
| Services as 5-pillar tabbed CardSwap | Slide 4 uses left-side pillar tabs + right-side CardSwap stack. Five pillars (Content & Creative, Reach & Activation, Search & Listening, Data & Tech, AI & Automation), 5 sub-services each. Card headings teal, monster-styled. `key={activeKey}` on CardSwap forces remount per tab so gsap timeline doesn't desync. |
| CardSwap stack readability | Cards designed so the icon + title row fits in the top `verticalDistance` (52px) — keep small icon (`h-8`) and small monster heading (`text-base font-black`) pinned to the top edge. That makes all stacked headings peek visibly in a staircase. |
| AI & Automation as a top-level pillar | Treated as a peer to Content, Reach, Search, and Data — not a sub-skill. Mention AEO, Marketing Copilots, AI Personalization explicitly because B2B buyers now expect them. |

---

## Known Issues / TODOs

- [ ] Vercel deployment broken — needs reconnect or redeploy.
- [ ] PNGs in `src/assets` not yet converted to WebP — run `npm run images:convert` after `npm i -D sharp`.
- [ ] `logo-main.jpg` used for owl logo — should be converted to WebP or replaced with SVG/PNG with transparency.
- [ ] Bundle `vendor-3d` still appears as a large chunk (~678KB minified) when 3D slides load — consider splitting `ogl`, `cobe`, and `postprocessing` by feature, or gate/deeper-lazy-load 3D code.
- [ ] Mobile layout for title slide not verified after redesign.
- [ ] Our Team uses Pankaj's avatar for Vishnu until a dedicated Vishnu avatar is supplied.
- [ ] `npm run lint` fails on existing visual-component typing debt (`any`, `@ts-nocheck`, hook warnings, Tailwind `require()`).

---

## File Map (key files only)

```
src/
  pages/Index.tsx          — lazy slide registry, progressive mounting, scroll handler, nav
  components/
    slides/TitleSlide.tsx  — cover slide, 3-zone layout
    slides/SkyrocketSlide.tsx — slide 2 Who We Are editorial layout, memoized Hyperspeed config
    slides/OurTeamSlide.tsx — six horizontal team profile cards over Radar background
    ProfileCard.jsx/css    — React Bits profile card, locally styled for team slide
    Radar.jsx/css          — React Bits WebGL radar background using ogl
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
