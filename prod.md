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
- Heavy effects (3D, particle systems, blur) are **gated on desktop only** via `useIsMobile()`. Never on mobile.
- Lazy-load all case study images via Vite's `?url` + lazy `<img loading="lazy" />`.
- Code-split vendors: GSAP, Anime.js, cobe/ogl, UI libs — each in its own chunk (see `vite.config.ts`).

### Slide Design Rules
- One full-bleed background or effect per slide. Never two competing backgrounds.
- Stats and numbers: weight 900, `clamp` sizing, teal color. Units always smaller weight.
- No carousels or tabbed UI unless absolutely necessary — every extra interaction is cognitive load.
- Case studies: full-bleed creative on one side, stats on the other. Nothing else.
- Animations reveal content, never distract from it. Duration cap: 1200ms max per element.
- Slide 2 now follows a split editorial layout: Palanquin copy on the left, sector badges anchored low-left, and a right-edge technical line illustration. Avoid reintroducing page-level header/footer labels, slide borders, decorative grids, or divider gradients there unless explicitly requested.
- Our Team uses six horizontal profile cards in a 3x2 grid over a teal radar field. Do not bring back the deleted ball-animation slide as a team/about substitute.

This document serves as a comprehensive overview of the design schemas, structural paradigms, and coding principles adopted in this project. It is intended to guide future development, maintenance, and refactoring efforts.

## 1. Architectural Overview
The codebase is structured as a **Single-Page Application (SPA)** using **Vite + React (TypeScript)**. 
Unlike traditional multipage websites, it adopts a **Vertical Scroll-Snapping Presentation** architecture.
- **Entry Point:** The application essentially routes entirely through `App.tsx` into `Index.tsx`.
- **Slide Array Pattern:** `Index.tsx` mounts an array of `SlideComponent`s. These components represent sequential, full-screen vertical sections.
- **Our Team Slide:** Shows six profile-card team members (`OurTeamSlide.tsx`) between the main editorial statement and Services, with React Bits `ProfileCard` cards and a subtle React Bits `Radar` background.
- **Who We Are Slide:** `SkyrocketSlide.tsx` is now the main slide-2 editorial statement. It uses Palanquin text, bottom-left sector tags, and a right-aligned technical line illustration asset.
- **Removed About Animation:** The old separate third `WhoAreWeSlide` and `Ballpit` animation were removed to keep the deck lighter and avoid redundant "Who We Are" messaging.
- **Scroll Hijacking:** Native CSS scroll behaviors (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`) are used heavily on `.slide` elements to emulate a traditional "PowerPoint-like" or "Deck-like" feel on the web.
- **Case Study Sub-Stack:** Slides 5 through 11 form a continuous block of interactive case studies. Navigation UI auto-hides during inactivity while inside this indices range to enhance immersive viewing.

## 2. Code Principles

### Minimal State Management
- **Local React State:** There is deliberately no heavy global state management library (like Redux or Zustand). 
- **Prop Drilling for Core Interactions:** Features that require cross-component communication, like letting a specific slide trigger navigation (`onViewCaseStudies`), pass navigation handlers via props down to the slide component.
- **Navigation via Refs & Scrolling:** Slide transitions are managed natively by tracking the container scroll offset (`scrollTop / slideHeight`) inside `Index.tsx`, and explicit navigation triggers a `scrollTo` invocation on the `containerRef`. 

### Performance and Separation of Logic
- **Decoupled Animations:** Complex enter/exit animations are decoupled from standard rendering logic. Component `SlideReveal.tsx` acts as an Intersection Observer wrapper that delegates sequence animations to libraries rather than polluting component state loops.
- **Mobile vs Desktop Branching:** Computationally intensive effects (like the 3D transforms inside `ParallaxCardSlider.tsx`) are gated behind custom hooks (`useIsMobile`). Mobile relies predominantly on hardware-accelerated CSS transforms (`translateX`) and native touch swiping, whereas Desktop gets heavy JS-controlled `requestAnimationFrame` tilt updates.

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
