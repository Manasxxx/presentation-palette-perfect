

## Plan: Add Anime.js Letter Animation to Title Slide

### What changes
Split the "OWLSURF" title into individual letter `<span>` elements and animate them with a staggered entrance using anime.js, replacing the current static gradient text.

### Implementation

**File: `src/components/slides/TitleSlide.tsx`**

1. Import `animate`, `stagger`, `createSpring` from `animejs`
2. Split "OWLSURF" into letter spans with class `.owl-letter`, starting at `opacity: 0; transform: translateY(40px)`
3. On mount (inside `useEffect`), run:
   ```
   animate('.owl-letter', {
     translateY: [40, 0],
     opacity: [0, 1],
     scale: [0.5, 1],
     delay: stagger(60),
     ease: createSpring({ stiffness: 260, damping: 16 }),
   })
   ```
4. Remove the existing Framer Motion `initial`/`animate` on the title `<motion.div>` wrapper (keep it as a plain `<div>`) — the letters themselves handle the entrance
5. Keep all other Framer Motion animations (logo reveal, pill, badges, scroll indicator) unchanged

### Result
Each letter of "OWLSURF" will spring in one-by-one with elastic bounce on page load, giving a more dramatic branded entrance than the current simple fade.

