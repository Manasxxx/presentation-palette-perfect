

## Plan: Add Anime.js Animations to 3 Slides

### Install dependency
- Add `animejs` package

### Create reusable hook: `src/hooks/use-anime-scope.ts`
- Wraps `createScope({ root })` with a `useRef` for the root element
- Cleanup via `scope.current.revert()` in useEffect return
- Returns `{ root, scope }` for use in components

### 1. Skyrocket Slide — Elastic letter-by-letter slam
- Split "SKYROCKETING" into individual `<span>` elements with a shared class (e.g., `.sky-letter`)
- On viewport intersection, trigger anime.js `animate('.sky-letter', { translateY: [100, 0], opacity: [0, 1], scale: [0.3, 1], delay: stagger(40, { from: 'center' }) })` with `createSpring({ stiffness: 300 })` easing
- Remove the existing Framer Motion animation on that word (keep Framer Motion for the container fade and "YOUR PRESENCE" text)
- Use IntersectionObserver to trigger once when slide enters view

### 2. Case Study Slide (Mitsui) — Animated stat number tickers
- Replace the static `{stat.value}` text in the stat pills with anime.js-driven number count-ups
- For each stat, parse the numeric value and suffix (e.g., "5.8M" → animate 0 to 5.8, append "M")
- Use `animate(targetObj, { value: [0, numericValue] })` with `round: decimals` and update a React state via `onUpdate` callback
- Trigger on IntersectionObserver entering the stats section
- Keep existing Framer Motion stagger for the pill entrance; anime.js only handles the number animation inside each pill

### 3. Contact Slide — Staggered elastic card entrance
- Add anime.js scope to the contact section
- Replace the Framer Motion `containerVariants`/`cardVariants` stagger on the 3 contact cards with anime.js `animate('.contact-card', { translateY: [60, 0], opacity: [0, 1], scale: [0.8, 1], delay: stagger(120), ease: createSpring({ stiffness: 200 }) })`
- Cards start hidden (opacity: 0) via CSS, anime.js reveals them on intersection
- Keep Framer Motion for the logo spin, heading, and footer animations

### Files to create
- `src/hooks/use-anime-scope.ts`

### Files to modify
- `src/components/slides/SkyrocketSlide.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/ContactSlide.tsx`

