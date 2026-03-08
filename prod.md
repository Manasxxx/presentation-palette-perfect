# Presentation Palette Perfect: Codebase Analysis and Principles

This document serves as a comprehensive overview of the design schemas, structural paradigms, and coding principles adopted in this project. It is intended to guide future development, maintenance, and refactoring efforts.

## 1. Architectural Overview
The codebase is structured as a **Single-Page Application (SPA)** using **Vite + React (TypeScript)**. 
Unlike traditional multipage websites, it adopts a **Vertical Scroll-Snapping Presentation** architecture.
- **Entry Point:** The application essentially routes entirely through `App.tsx` into `Index.tsx`.
- **Slide Array Pattern:** `Index.tsx` mounts an array of `SlideComponent`s. These components represent sequential, full-screen vertical sections.
- **Scroll Hijacking:** Native CSS scroll behaviors (`scroll-snap-type: y mandatory`, `scroll-snap-align: start`) are used heavily on `.slide` elements to emulate a traditional "PowerPoint-like" or "Deck-like" feel on the web.

## 2. Code Principles

### Minimal State Management
- **Local React State:** There is deliberately no heavy global state management library (like Redux or Zustand). 
- **Prop Drilling for Core Interactions:** Features that require cross-component communication, like letting a specific slide trigger navigation (`onViewCaseStudies`), pass navigation handlers via props down to the slide component.
- **Navigation via Refs & Scrolling:** Slide transitions are managed natively by tracking the container scroll offset (`scrollTop / slideHeight`) inside `Index.tsx`, and explicit navigation triggers a `scrollTo` invocation on the `containerRef`. 

### Performance and Separation of Logic
- **Decoupled Animations:** Complex enter/exit animations are decoupled from standard rendering logic. Component `SlideReveal.tsx` acts as an Intersection Observer wrapper that delegates sequence animations to libraries rather than polluting component state loops.
- **Mobile vs Desktop Branching:** Computationally intensive effects (like the 3D transforms inside `ParallaxCardSlider.tsx`) are gated behind custom hooks (`useIsMobile`). Mobile relies predominantly on hardware-accelerated CSS transforms (`translateX`) and native touch swiping, whereas Desktop gets heavy JS-controlled `requestAnimationFrame` tilt updates.

## 3. Design and Aesthetic Principles

### Tailwind + CSS Variables Theming
- **CSS Variable Injection:** Global styling overrides are defined fundamentally using CSS custom properties inside `@layer base` in `src/index.css`. This enforces a strict color token system (e.g. `--primary`, `--card`, `--owl-green`).
- **Dark/Light Mode:** Readily toggled by an overarching `.light` class changing the variables.
- **Tailwind Utility Classes:** Components rely extensively on Tailwind classes for scaffolding, structure, layout (`flex`, `grid`, `absolute inset-0`), and standard spacing. 

### Fluidity and Animations
- **Anime.js for Sequential Timing:** `Anime.js` handles sequenced, staggered entrance animations (resolving opacity, translatation, scale) using the `SlideReveal` HOC. 
- **GSAP for Complex Timeline Control:** Previously integrated logic uses GSAP for complex timelines (e.g. `PillNav` hovering and structural layouts).
- **CSS Transitions:** Standard hover effects and states explicitly specify easing parameters, ensuring fluid hover state inversions. Easing curves like `cubic-bezier(0.4, 0, 0.2, 1)` are used over harsh linear jumps.

### Aesthetic Patterns "The Glass and Glow"
- **Glassmorphism:** Navigation menus (`PillNav`), popovers, and specific slide cards rely on `backdrop-filter: blur() saturate()`. Elements are intended to sit fluidly over complex background arrays or 3D visuals.
- **Soft Emittance (Glow):** Gradients (`.text-gradient-green`, `.glow-green`) and box-shadow pulses give elements a neon, high-contrast, cyberpunk-adjacent glow against the otherwise dark backgrounds. Ensure any primary accent is accompanied by an underglow to give an illusion of light emissions.
