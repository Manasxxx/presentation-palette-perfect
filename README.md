# OwlSurf Digital — Portfolio Deck

A single-page portfolio for OwlSurf Digital, built to feel like a presentation rather than a website. The whole thing is a vertical stack of full-screen slides with scroll-snap, so scrolling moves deck-style from one idea to the next. One dominant message per slide, visuals doing the heavy lifting, motion kept in service of the pitch.

It's a marketing artifact first, so most of the engineering effort goes into two places that usually get ignored on a site like this: keeping it fast despite the WebGL, and keeping the motion from feeling like a screensaver.

## Architecture, and why it's built this way

**The deck is an array, not a router.** `src/pages/Index.tsx` holds an ordered list of slide components and maps the container's scroll offset to a current index. There's no per-slide route; the URL stays at `/`. React Router only exists to catch unknown paths and render a branded 404 outside the deck. State is deliberately local React state and prop drilling. No Redux, no Zustand. For a linear deck the global store would be ceremony.

**Only the active slide is mounted.** `SLIDE_MOUNT_RADIUS` is `0`, so off-screen slides are replaced by a height-preserving skeleton instead of staying in the DOM. This is the main defense against cumulative jank: several of these slides own a WebGL context, a physics sim, or a RAF loop, and keeping them all alive while you scroll is what kills the framerate. The trade-off is a lazy-load fetch on each transition, which the skeleton hides so you never see a black flash.

**Heavy effects are desktop-only and gated in code.** `Hyperspeed`, `LightRays`, `PrismaticBurst`, and the cover globe mount only above 768px via `useIsMobile()`. Ambient WebGL caps its device pixel ratio so retina displays don't cook the GPU. The one foreground exception is the Our Team lanyard (Three.js + Rapier physics), which earns a higher DPR because the brand mark needs to stay crisp, and which is deferred ~650ms after the slide settles so its init doesn't stutter the scroll-snap entrance.

**Mobile gets purpose-built variants, not shrunk desktop.** Two widgets don't survive a naive resize: the Services 3D card stack and the Our Team lanyard. On phones the former becomes a readable service list with a horizontal chip selector, and the latter becomes a static badge card. Everything else is handled with `max`/`md:` Tailwind pairs so the desktop layout is byte-for-byte unchanged. Slides are kept inside a single viewport rather than made internally scrollable, because an oversized slide fights `scroll-snap-type: y mandatory`.

**Two animation systems, on purpose.** Anime.js drives entrance choreography (heading springs, accent-word blur-to-sharp, staggered reveals). GSAP drives anything with an interdependent timeline or its own scheduler, like the Services card swap and `PillNav`. Both respect `prefers-reduced-motion` through `useReducedMotion`, which downgrades the deck scroll to instant and pauses auto-advancing content.

## Stack

Vite · React 18 · TypeScript · Tailwind CSS 3 · Anime.js · GSAP · Three.js / React Three Fiber / Rapier (lanyard) · OGL / cobe / postprocessing (ambient effects).

Node target is pinned in `.nvmrc` (Node 22). npm is the package manager of record; `package-lock.json` is the lockfile the deploy uses.

## Getting started

```sh
npm install
npm run dev      # Vite dev server on http://localhost:8080 (port is fixed in vite.config.ts)
```

Other scripts:

```sh
npm run build    # production build to dist/
npm run lint     # eslint, currently clean (0 warnings)
npm test         # vitest
npm run images:convert   # batch PNG -> WebP, requires `npm i -D sharp`
```

`npm run build` prints a known size warning for the `vendor-lanyard` chunk (the Three.js + physics stack). It's isolated in its own lazy chunk on purpose and doesn't block first paint.

## Project layout

```txt
src/
  pages/
    Index.tsx              Slide registry, one-active-slide mounting, scroll-to-index nav
    NotFound.tsx           Branded 404, lives outside the deck
  components/
    slides/                One file per full-screen slide (cover, who-we-are, team, services, clients, 7 case studies, contact)
    ui/                    Self-contained visual primitives (Lanyard, CardSwap, LogoLoop, Hyperspeed, PrismaticBurst, ...)
    PillNav.tsx            Activity-driven header nav (shows on movement, hides when idle)
    SlideReveal.tsx        IntersectionObserver wrapper that hands entrance timing to the animation libs
  hooks/
    use-mobile.tsx         768px breakpoint gate for heavy effects and mobile variants
    use-reduced-motion.tsx prefers-reduced-motion source of truth
  index.css                Design tokens, fonts, and the OwlSurf dark theme
scripts/
  convert-images.mjs       PNG -> WebP helper
  mobile-shots.mjs         Playwright screenshot harness for mobile/desktop verification
docs/ , deploy/            VPS/domain migration guide and example Nginx/Caddy static configs
```

## Working in this repo

There's a small amount of process here because the deck is iterated live with prospects and visual regressions are easy to miss.

- **Read first:** `prod.md` (design and copy rules, plus "do not reintroduce" decisions), `context.md` (running change log with rationale), `handoff.md` (current state). They exist so a change doesn't undo something that was deliberate.
- **Update `handoff.md` before a push.** Not at session end, not mid-debug. Only when something is actually shipping.
- **Copy discipline is enforced.** No agency-speak, a banned-words list, and no em dashes. See `prod.md`.
- **Assets ship as WebP.** PNGs are dev-only originals.
- **Verify visuals, then commit.** `scripts/mobile-shots.mjs` screenshots every slide at a chosen viewport against the running dev server (`SHOT_TAG`, `SHOT_W`/`SHOT_H`, `SHOT_ONLY`, `SHOT_DESKTOP`). Output under `scripts/_shots/` is gitignored.

## Deployment

Production is a static build: `npm run build` emits `dist/`, served by any static host with an SPA fallback to `index.html` (the 404 route is client-side). Start with `docs/vps-domain-migration.md`, `docs/dependencies.md`, and the example configs in `deploy/`. A prior Vercel deployment and domain still need reconnecting before going live.
