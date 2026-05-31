# Presentation Palette Perfect: Codebase Analysis and Principles

> **Core product intent:** This is a PowerPoint + portfolio website hybrid. Every slide is a presentation slide first — one dominant message, bold visual, minimal reading required. Think deck, not blog post.

## 0. Product Philosophy

### Visual-First, Always
- Each slide communicates **one idea**. If a slide has more than one primary message, it should be split or simplified.
- Text is support material. The visual — stat, image, animation, graphic — is the hero.
- If the slide can't be understood in 3 seconds of glancing, it needs redesigning.

### Message Hierarchy
- **H1-level:** The one thing you want them to remember. Big, bold, center/dominant.
- **H2-level:** One supporting detail or proof point. Smaller. Present only if needed.
- **Body-level:** Optional context. Never more than 2 sentences. Palanquin, muted color.
- **No paragraphs in slides.** Ever. Use fragments, stats, or single punchy lines.

### Lightweight as a Feature
- JS bundle target: under 800KB gzipped. Current: app chunk 165KB + vendors parallel-loaded ✓ (code-split via `vite.config.ts` manualChunks).
- Images: all deliverable assets must be WebP. PNGs allowed only as originals in `/src/assets` during dev. Run `npm run images:convert` (requires `npm i -D sharp`) to batch-convert to WebP.
- When replacing client creatives from external folders such as Downloads, convert them to WebP before wiring them into the site. Raychem RPG's three active creative assets are the converted WebP files in `src/assets/`, not the source JPEGs in Downloads.
- Heavy effects (3D, particle systems, blur) are **gated on desktop only** via `useIsMobile()`. Never on mobile, except for foreground hero objects that have a deliberate mobile fallback/performance cap.
- Mount only the active slide. Placeholder sections preserve scroll height, but offscreen slides must not keep WebGL canvases, RAF loops, timers, or pointer listeners alive.
- Ambient WebGL backgrounds should cap device pixel ratio at `1.25` unless a specific foreground detail requires more. On Retina displays this is a major heat/lag control.
- Foreground WebGL hero objects, such as the Our Team lanyard, may use a higher desktop DPR when the object carries brand detail. Keep mobile capped lower and document the exception in `context.md`.
- Any custom animation loop (`requestAnimationFrame`, interval, GSAP timeline, WebGL renderer) must pause or unmount when offscreen. Visibility gating is a product requirement, not a polish task.
- Lazy-load all case study images via Vite's `?url` + lazy `<img loading="lazy" />`.
- Code-split vendors: GSAP, Anime.js, older ambient 3D libraries, lanyard-specific 3D/physics libraries, and UI libs — each in its own chunk (see `vite.config.ts`).

### Copy Discipline

- No agency-speak template on case studies. The pattern is **`Who they are. What we did.`** — never `Boosted / Drove / Amplified / Elevated [thing] through strategic [tactic]`. The seven case-study subtitles were rewritten to this pattern in Session 11.
- Banned words across the deck: **strategic, amplified, elevated, boosted, drove, impactful, vibrant, compelling, powerful, Success** (as a heading suffix). These signal nothing and pattern-match to every other agency deck.
- Never rude — confidence without spite. Lines that knock other agencies or imply the client was broken before us are not on-brand.
- No em dashes. Use commas or periods. Mobile readability + matches the deck's terse rhythm.
- Service-card descriptions stay plainspoken, one sentence, never two clauses joined by "and that".
- Pillar labels use **B2B-buyer language**, not agency-internal jargon (e.g. "Demand Gen" not "Reach & Activation").

### Slide Design Rules
- One full-bleed background or effect per slide. Never two competing backgrounds.
- Stats and numbers: weight 900, `clamp` sizing, teal color. Units always smaller weight. For horizontal proof strips, keep each stat cell on a consistent rhythm: tabular numbers, even cell widths, non-adjacent percentage metrics where possible, and readable label pills/backplates.
- No carousels or tabbed UI unless absolutely necessary — every extra interaction is cognitive load.
- Anime.js is the deck's primary entrance-motion layer. The deck now uses a visible entrance recipe: heading spring, accent-word blur-to-sharp slide, creative/slider overshoot, and stat/icon pulse where useful. Do not add broad scan-line sweeps or circular glow-orbit blobs unless explicitly requested.
- The cover (TitleSlide) is now hook-led, not wordmark-led. The hero headline is `When the product is complex, the choice shouldn't be.` with a restrained editorial hierarchy: small setup, large Montserrat anchor word, and one Lora italic teal payoff. The `OWLSURF DIGITAL` lockup sits top-left, the large clipped globe is centered behind the bottom zone with only its top half visible, the right side carries an editorial signal graphic around the OwlSurf mark, and the `Review case studies` CTA is centered above the partner badge strip. Do not reintroduce the old centered-wordmark hero, the literal portfolio-proof info box, the `What We Do` / `Made For` info columns, or the top-right `Credentials / 01` label unless explicitly asked.
- The cover can carry compact credibility badges. Use actual badge image assets, keep them as a compact horizontal strip secondary to the wordmark/logo, and avoid decorative framing or per-badge frames. Crop source images tightly when badges contain excess white padding so visual size is controlled by the badge content, not transparent/white margins.
- Case studies use one of two layouts and reuse the same heading recipe (see below), swapping deck teal for a per-case-study brand color:
  - **Split / proof-strip** (e.g. Mitsui): headline and tagline can anchor top-left while a horizontal proof strip sits top-right and the creative carousel occupies the bottom-centered stage. If using an animated slider, keep structural centering transforms on a stable outer wrapper and animate an inner element so Anime.js does not overwrite layout transforms.
  - **Polished vertical** (e.g. Baxsaa): centered eyebrow + heading + tagline top, creative grid or `ParallaxCardSlider` middle, brand-tinted stat pills row, optional eyebrow-style callout card (e.g. Baxsaa's SEO clean-up) at bottom. Pills use a translucent fill + 1px brand-color hairline border instead of `LiquidGlassCard` so the brand palette reads cleanly on light or dark gradients.
- Animations reveal content, never distract from it. Duration cap: 1200ms max per element, except a deliberate foreground hero reveal can run up to 1350ms when it reads as one object.
- Slide 2 Who We Are was redesigned as a full-width editorial layout over the Hyperspeed running-lines background (the right-edge technical illustration was removed). Structure is three clear blocks: top-left message (eyebrow `Who we are / 02`, headline, short manifesto), top-right `Industries we serve` rail, and a full-width `What makes us different` differentiator-card row across the bottom, separated by a divider. The headline is `Hard to explain.` / `Easy to choose.` — `Hard to` / `Easy to` stay white upright Montserrat, while `explain.` / `choose.` use the cursive Lora serif (`font-serif italic`) in teal gradient. Keep the running lines visible (panel fill is light, Hyperspeed opacity ~0.7). The industries rail has no leading numbers. Do not reintroduce the old split layout, the engineering illustration, or per-row numbering unless asked.
- The cover slide's right-side logo treatment is now an editorial signal map, not a proof card: technical grid, quiet rules, orbit rings, signal nodes, subtle scan sweep, and the animated `OwlSurfLogo` SVG as the focal point. Keep it graphic and non-literal; avoid restoring checklist/card/table copy on the cover.
- Local UI-library-inspired blocks are acceptable when they avoid dependency churn. Adapt external component patterns into local React/Tailwind 3 components unless the user explicitly asks to install the library stack.
- Web-preview elements inside slides should be self-contained and stable. Prefer `srcDoc` or local preview markup over external iframes that may be blocked by frame policies.
- Our Team uses a simplified left cylindrical name roulette plus one live React Bits lanyard on the right. Only one WebGL lanyard should be mounted at a time; inactive names stay visually muted, the highlighted name is colored, and the roster/avatar auto-advance every 5 seconds. Do not draw the person's name on or below the lanyard; the badge should show the avatar plus the person's field/title (for example `Digital strategy`) in the name slot. The lanyard strap mark should stay upright and crisp: use a high-resolution generated band texture, React Bits-style texture repeat, and avoid stretching the OwlSurf logo artwork to compensate for MeshLine mapping. The heavy lanyard (WebGL + Rapier physics + large generated texture) is mounted on a short delay (~650ms) after the slide becomes visible, gated by a `showLanyard` state, so its initialization does not jank the scroll-snap entrance. The stage `min-h` reserves the layout height while it is deferred.
- CardSwap (Services slide stack) drives its swap loop with GSAP's own scheduler (`gsap.delayedCall`) and calls `gsap.ticker.wake()` on mount, instead of `window.setInterval`. A prior `setInterval`-driven loop left the stack frozen on load until a user interaction woke GSAP's rAF ticker. Keep the loop inside the ticker; do not revert to setInterval.
- Services slide (slide 4) is a left-pillars / right-CardSwap layout, NOT a flat icon grid. Five pillars use B2B buyer language: Brand & Story, Demand Gen, Discovery, Marketing Stack, AI & Autopilot. Each pillar holds 5 sub-services shown as stacked CardSwap cards. Card headings are teal; bodies stay layman-friendly while keeping industry terms (ABM, SEO, HubSpot/Marketo, AEO, Marketing Copilots). The first `Brand & Story` vertical has a two-column card body with text left and a clip-art SVG illustration right; keep the illustration contained and non-clipping. The other service verticals stay text-only unless the user asks to extend the format. The per-card `[PILLAR] • B2B / Industrial` footer band was removed in Session 11 — do not reintroduce it; the active pillar label on the left tab is already the cue.
- Clients slide (slide 5) uses a top-left monster heading + two-row React Bits `LogoLoop` carousel. Keep true CSS mask edge fading, calm speeds, pause-on-hover, and offscreen RAF pausing.
- Contact slide is a chic closer: left-side `LET'S MAKE / COMPLEX / obvious.` headline, minimal contact links, right-side OwlSurf logo/ripple mark, and the compact bottom footer block. Do not reintroduce headers, credentials labels, rotated copy, vertical dividers, or explanatory close text unless explicitly requested.
- The site has a route-level branded 404 page outside the slide matrix. Unknown paths should go there through React Router's catch-all route, not become another presentation slide.
- Unified heading recipe across slides 2–5: eyebrow (10px tracking-[0.3em] teal) + `clamp(3.4rem,5.9vw,6.6rem)` Montserrat black h2, white first word + teal-gradient second word, left-aligned via a `w-full h-full` wrapper that defeats `.slide`'s `items-center justify-center`. Always set `font-sans not-italic` on bare spans inside the h2 to avoid the `span:not([class])` Palanquin/italic footgun.
- Case studies share the same recipe family but with four differences: (1) the h2 clamp drops to `clamp(2.6rem,4.6vw,5.2rem)`-ish so the brand name fits a half-column or stays clean, (2) the eyebrow + accent color is the case study's own brand color (Mitsui cyan, Baxsaa maroon, etc.) instead of OwlSurf teal, (3) the first word/text color flips per background: white ink on dark gradient backgrounds, dark ink (`hsl(0 0% 15%)`) on light gradient backgrounds, (4) the proof/info panel sits in the same vertical band as the creative carousel on desktop. Subtitle/tagline text should stay Palanquin, larger than body copy, and readable at a glance.

### Accessibility & Motion (added Session 23)

- **Real semantics, not decoration roles.** Navigation is a plain `nav > ul > li > button` — never `role="menubar"`/`menuitem"` (that implies app-menu keyboard behavior the deck does not provide). Active nav items use `aria-current="page"`. Disclosure controls (the mobile hamburger) expose `aria-expanded` + `aria-controls`, and the disclosed menu closes on Escape, takes focus on open, and returns focus to its trigger on close.
- **The Services pillars are a tablist.** They use the WAI-ARIA tabs pattern: `role="tablist"`/`tab"`/`tabpanel"`, `aria-selected`, `aria-controls`/`aria-labelledby`, roving `tabIndex`, and Arrow/Home/End keyboard nav. Keep this pattern if the tabs are restyled.
- **Contrast is a requirement.** Body and roster text must meet WCAG AA. The Our Team roster keeps the active name in teal and inactive names readable (`text-white/65`+), not the old `text-white/22`. Do not drop inactive content text below a legible contrast just for a depth effect.
- **Heavy WebGL is desktop-only and enforced in code.** `Hyperspeed`, `LightRays`, `PrismaticBurst`, and `Globe` are gated behind `useIsMobile()` and must not mount below 768px (this is the concrete enforcement of the line-22 rule above). Mobile keeps the static gradient backdrops. Gate any new heavy effect the same way.
- **Respect `prefers-reduced-motion`.** Use `usePrefersReducedMotion()` (`src/hooks/use-reduced-motion.tsx`). It already gates the deck `scrollTo` (smooth → instant), the roster auto-advance (pauses), and `CardSwap` (the `reduceMotion` prop snaps cards instantly but keeps cycling so back-card content stays reachable). When adding new auto-advancing or large entrance motion, gate it through this hook. Auto-advancing content should pause or become instant under reduced motion, and must not become unreachable.
- **No black flash between slides.** `SlideFallback` is a soft branded skeleton, not an empty section. `SLIDE_MOUNT_RADIUS` stays at `0` (see line 23, "mount only the active slide"); fix lazy-load flashes with the skeleton, not by mounting neighbors.
- **Social/OG image** must be an OwlSurf-branded asset, never a generic placeholder. `index.html` currently uses local `/favicon.png` as a stopgap; a true 1200×630 card is preferred.

### Mobile Layout (added Session 24)

- **Every slide must fit one mobile viewport.** No content clipped at the top or bottom edge on phones. Mobile changes are gated with default/`max`-width Tailwind classes plus `md:` tokens that restore the desktop values verbatim, or with `useIsMobile()` branches. Desktop must stay byte-for-byte identical when editing mobile — verify with a desktop screenshot, not just a phone one.
- **Heavy/oversized widgets get compact mobile variants, they are not just shrunk.** The Our Team WebGL lanyard (≈680px, foreground-hero exception on desktop) is replaced on mobile by a static badge card (avatar + name + field/title) via `useIsMobile()`; the lanyard mounts on desktop only. The Services 3D `CardSwap` stack overflows phones, so mobile renders the active category's five services as a plain readable list instead, and the left pillar column becomes a horizontal-scroll chip row. Do not try to make `CardSwap` or the lanyard "fit" on mobile by scaling — use the mobile variant.
- **Long content rows become horizontal swipe rows on mobile**, not tall vertical stacks (e.g. the Who We Are differentiator cards: `flex overflow-x-auto` on mobile, `sm:grid sm:grid-cols-3` from 640px up). This keeps the slide inside one viewport without an internal vertical scroll that would fight the deck's scroll-snap.
- **Keep slides inside the scroll-snap height.** Do not make a single mobile slide taller than the viewport to "solve" overflow; that breaks `scroll-snap-type: y mandatory`. Compact spacing/type and swap widgets instead.
- **Mobile verification harness:** `scripts/mobile-shots.mjs` (Playwright, kept as a devDependency) screenshots every slide at a phone viewport against the running dev server. `SHOT_TAG`, `SHOT_W`/`SHOT_H`, `SHOT_ONLY` (comma slide indices), and `SHOT_DESKTOP=1` env vars control it. Output under `scripts/_shots/` is gitignored. Use it before declaring mobile work done.

This document serves as a comprehensive overview of the design schemas, structural paradigms, and coding principles adopted in this project. It is intended to guide future development, maintenance, and refactoring efforts.

## 1. Architectural Overview
The codebase is structured as a **Single-Page Application (SPA)** using **Vite + React (TypeScript)**. 
Unlike traditional multipage websites, it adopts a **Vertical Scroll-Snapping Presentation** architecture.
- **Entry Point:** The application essentially routes entirely through `App.tsx` into `Index.tsx`.
- **Slide Array Pattern:** `Index.tsx` mounts an array of `SlideComponent`s. These components represent sequential, full-screen vertical sections.
- **Our Team Slide:** Shows a compact roster selector (`OurTeamSlide.tsx`) between the main editorial statement and Services, with one React Bits lanyard badge on the right. The lanyard uses the user-provided OwlSurf owl mark on a black strap and swaps the badge avatar to the active employee.
- **Who We Are Slide:** `SkyrocketSlide.tsx` is now the main slide-2 editorial statement. It uses a full-width editorial layout over the Hyperspeed running-lines background: message block, industries rail, and differentiator row. The old right-aligned technical illustration asset was removed.
- **Removed About Animation:** The old separate third `WhoAreWeSlide` and `Ballpit` animation were removed to keep the deck lighter and avoid redundant "Who We Are" messaging.
- **Scroll Hijacking:** Native CSS scroll behaviors (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`) are used heavily on `.slide` elements to emulate a traditional "PowerPoint-like" or "Deck-like" feel on the web.
- **Header Navigation:** `PillNav` is global but activity-driven. It appears while the user is moving through the deck and hides after a short idle delay so each slide can be viewed cleanly.
- **Case Study Sub-Stack:** Slides 5 through 11 form a continuous block of interactive case studies.

## 2. Code Principles

### Minimal State Management
- **Local React State:** There is deliberately no heavy global state management library (like Redux or Zustand). 
- **Prop Drilling for Core Interactions:** Features that require cross-component communication, like letting a specific slide trigger navigation (`onViewCaseStudies`), pass navigation handlers via props down to the slide component.
- **Navigation via Refs & Scrolling:** Slide transitions are managed natively by tracking the container scroll offset (`scrollTop / slideHeight`) inside `Index.tsx`, and explicit navigation triggers a `scrollTo` invocation on the `containerRef`. 

### Performance and Separation of Logic
- **Decoupled Animations:** Complex enter/exit animations are decoupled from standard rendering logic. Component `SlideReveal.tsx` acts as an Intersection Observer wrapper that delegates sequence animations to libraries rather than polluting component state loops.
- **Mobile vs Desktop Branching:** Computationally intensive effects (like the 3D transforms inside `ParallaxCardSlider.tsx`) are gated behind custom hooks (`useIsMobile`). Mobile relies predominantly on hardware-accelerated CSS transforms (`translateX`) and native touch swiping, whereas Desktop gets heavy JS-controlled `requestAnimationFrame` tilt updates.
- **Active Slide Lifecycle:** `Index.tsx` should keep only the active slide mounted. This is now the primary protection against cumulative lag as the user scrolls through WebGL-heavy slides.
- **Animation Ownership:** If a component owns a RAF loop, WebGL renderer, interval, or pointer listener, it must clean it up on unmount and ideally pause it with IntersectionObserver when merely offscreen.
- **Contact Logo Centering:** The contact-slide logo/ripple group uses a positioning wrapper plus a separate animated inner wrapper. Do not animate transforms on the positioned wrapper, or the logo will lose center alignment.

## 3. Design and Aesthetic Principles

### Tailwind + Fixed Dark Theme
- **CSS Variable Injection:** Global styling overrides are defined fundamentally using CSS custom properties inside `@layer base` in `src/index.css`. This enforces a strict color token system (e.g. `--primary`, `--card`, `--owl-green`).
- **Fixed OwlSurf Dark Mode:** The deck no longer exposes a light/dark toggle. The dark OwlSurf presentation theme is the single production visual system.
- **Tailwind Utility Classes:** Components rely extensively on Tailwind classes for scaffolding, structure, layout (`flex`, `grid`, `absolute inset-0`), and standard spacing. 

### Fluidity and Animations
- **Anime.js for All Sequencing:** The project was recently migrated entirely away from Framer Motion. `Anime.js` now exclusively handles staggered entrance animations (resolving opacity, translatation, scale) both directly in components (like `TitleSlide.tsx`) and through the `SlideReveal` HOC. 
- **GSAP for Complex Timeline Control:** Interdependent nested timelines use GSAP (e.g., `PillNav` hovering and structural layouts).
- **CSS Transitions:** Standard hover effects and states explicitly specify easing parameters, ensuring fluid hover state inversions. Easing curves like `cubic-bezier(0.4, 0, 0.2, 1)` are used over harsh linear jumps.

### Aesthetic Patterns "The Glass and Glow"
- **Glassmorphism:** Navigation menus (`PillNav`), popovers, and specific slide cards rely on `backdrop-filter: blur() saturate()`. Elements are intended to sit fluidly over complex background arrays or 3D visuals.
- **Soft Emittance (Glow):** Gradients (`.text-gradient-green`, `.glow-green`) and box-shadow pulses give elements a neon, high-contrast, cyberpunk-adjacent glow against the otherwise dark backgrounds. Ensure any primary accent is accompanied by an underglow to give an illusion of light emissions.
