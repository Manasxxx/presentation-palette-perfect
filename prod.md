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
- Stats and numbers: weight 900, `clamp` sizing, teal color. Units always smaller weight.
- No carousels or tabbed UI unless absolutely necessary — every extra interaction is cognitive load.
- Case studies use one of two layouts and reuse the same heading recipe (see below), swapping deck teal for a per-case-study brand color:
  - **Split** (e.g. Mitsui): copy column (`shrink-0`, ~38–42% width) on one side with eyebrow + monster h2 + Palanquin tagline + vertical stat list. Creative column is a `ParallaxCardSlider` sized via the new `cardWidth` prop. The slider is `min-w-0` + `justify-start` so its right edge is allowed to bleed past the section bound and clip at the section's `overflow-hidden`. No surrounding decoration.
  - **Polished vertical** (e.g. Baxsaa): centered eyebrow + heading + tagline top, creative grid or `ParallaxCardSlider` middle, brand-tinted stat pills row, optional eyebrow-style callout card (e.g. Baxsaa's SEO clean-up) at bottom. Pills use a translucent fill + 1px brand-color hairline border instead of `LiquidGlassCard` so the brand palette reads cleanly on light or dark gradients.
- Animations reveal content, never distract from it. Duration cap: 1200ms max per element.
- Slide 2 now follows a split editorial layout: Palanquin copy on the left, sector badges anchored low-left, and a right-edge technical line illustration. Avoid reintroducing page-level header/footer labels, slide borders, decorative grids, or divider gradients there unless explicitly requested.
- Our Team uses a simplified left roster plus one live React Bits lanyard on the right. Only one WebGL lanyard should be mounted at a time; inactive employees stay visually muted, the active employee is fully colorified, and the roster/avatar auto-advance every 5 seconds. The lanyard strap mark should stay upright and crisp: use a high-resolution generated band texture, React Bits-style texture repeat, and avoid stretching the OwlSurf logo artwork to compensate for MeshLine mapping.
- Services slide (slide 4) is a left-pillars / right-CardSwap layout, NOT a flat icon grid. Five pillars use B2B buyer language: Brand & Story, Demand Gen, Discovery, Marketing Stack, AI & Autopilot. Each pillar holds 5 sub-services shown as stacked CardSwap cards. Card headings are teal; bodies stay layman-friendly while keeping industry terms (ABM, SEO, HubSpot/Marketo, AEO, Marketing Copilots). The per-card `[PILLAR] • B2B / Industrial` footer band was removed in Session 11 — do not reintroduce it; the active pillar label on the left tab is already the cue.
- Clients slide (slide 5) uses a top-left monster heading + two-row React Bits `LogoLoop` carousel. Keep true CSS mask edge fading, calm speeds, pause-on-hover, and offscreen RAF pausing.
- Contact slide is a chic closer: left-side `LET'S MAKE / COMPLEX / obvious.` headline, minimal contact links, and a right-side OwlSurf logo/ripple mark only. Do not reintroduce headers, credentials labels, rotated copy, vertical dividers, or explanatory close text unless explicitly requested.
- Unified heading recipe across slides 2–5: eyebrow (10px tracking-[0.3em] teal) + `clamp(3.4rem,5.9vw,6.6rem)` Montserrat black h2, white first word + teal-gradient second word, left-aligned via a `w-full h-full` wrapper that defeats `.slide`'s `items-center justify-center`. Always set `font-sans not-italic` on bare spans inside the h2 to avoid the `span:not([class])` Palanquin/italic footgun.
- Case studies share the same recipe family but with three differences: (1) the h2 clamp drops to `clamp(2.6rem,4.6vw,5.2rem)` (split) or `clamp(2.6rem,4.6vw,5.2rem)` (vertical) so the brand name fits a half-column or stays centered cleanly, (2) the eyebrow + gradient color is the case study's own brand color (Mitsui cyan, Baxsaa maroon, etc.) instead of OwlSurf teal, (3) the first word/text color flips per background: white ink on dark gradient backgrounds (Mitsui), dark ink (`hsl(0 0% 15%)`) on light gradient backgrounds (Baxsaa). Subtitle stays Palanquin (`font-body`) at base/lg size.

This document serves as a comprehensive overview of the design schemas, structural paradigms, and coding principles adopted in this project. It is intended to guide future development, maintenance, and refactoring efforts.

## 1. Architectural Overview
The codebase is structured as a **Single-Page Application (SPA)** using **Vite + React (TypeScript)**. 
Unlike traditional multipage websites, it adopts a **Vertical Scroll-Snapping Presentation** architecture.
- **Entry Point:** The application essentially routes entirely through `App.tsx` into `Index.tsx`.
- **Slide Array Pattern:** `Index.tsx` mounts an array of `SlideComponent`s. These components represent sequential, full-screen vertical sections.
- **Our Team Slide:** Shows a compact roster selector (`OurTeamSlide.tsx`) between the main editorial statement and Services, with one React Bits lanyard badge on the right. The lanyard uses the user-provided OwlSurf owl mark on a black strap and swaps the badge avatar to the active employee.
- **Who We Are Slide:** `SkyrocketSlide.tsx` is now the main slide-2 editorial statement. It uses Palanquin text, bottom-left sector tags, and a right-aligned technical line illustration asset.
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
