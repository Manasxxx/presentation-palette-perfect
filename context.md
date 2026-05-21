# Project Context — Presentation Palette Perfect

> Running log of all meaningful changes, rationale, and current state. Updated on every push.
> Read this before touching any file — it tells you what exists, why it was built that way, and what's been tried.

---

## Current State (as of last push)

**Live URL:** Was on Vercel (domain broken — needs reconnect). GitHub: `Manasxxx/presentation-palette-perfect`.
**Dev:** `npm run dev` → `localhost:8080` (port hardcoded in `vite.config.ts`).
**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Anime.js + GSAP + shadcn/ui.

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

---

## Known Issues / TODOs

- [ ] Vercel deployment broken — needs reconnect or redeploy.
- [ ] PNGs in `src/assets` not yet converted to WebP — run `npm run images:convert` after `npm i -D sharp`.
- [ ] `logo-main.jpg` used for owl logo — should be converted to WebP or replaced with SVG/PNG with transparency.
- [ ] Bundle `vendor-3d` at 694KB — consider lazy-loading Globe + Hyperspeed only when slide is in view.
- [ ] Mobile layout for title slide not verified after redesign.
- [ ] `OurTeamSlide.tsx` still placeholder — needs real team content.

---

## File Map (key files only)

```
src/
  pages/Index.tsx          — slide array, scroll handler, rAF throttle, nav
  components/
    slides/TitleSlide.tsx  — cover slide, 3-zone layout
    SlideReveal.tsx        — intersection observer + anime.js entrance wrapper
    PillNav.tsx            — GSAP-powered top nav
    LightRays.tsx          — WebGL light rays background effect
    ui/globe.tsx           — cobe globe
  index.css                — all CSS tokens, OwlSurf design system vars
tailwind.config.ts         — font families, owl.* colors, keyframes
vite.config.ts             — port 8080, manualChunks code-splitting
scripts/convert-images.mjs — PNG→WebP batch converter
prod.md                    — design principles + product philosophy
context.md                 — this file
```
