# Handoff

## Current Goal

Ship Session 52: Lenis deck scrolling, stronger mobile flick intent, responsive/mobile spacing polish, and focused Cover/Mitsui/Contact refinements without breaking Vijay's domain migration.

## Current State

- Rebased onto Vijay's upstream `0de0ef9`. Primary production domain and deploy webhook are `https://www.owlsurf.com`; `https://www.owlsurf.media` redirects to `.com`.
- Lenis is the sole deck-scroll owner on desktop/mobile. It uses raw gesture intent for one-slide flicks and a short no-bounce nearest-slide settle.
- Old CSS deck snap, desktop/mobile transition layers, Motion wrapper, seam colors, and Theatre.js parameters are removed. `@theatre/*` left dependencies; `lenis` was added.
- Mobile case studies have more vertical air; Who We Are, Services, and Clients received smaller spacing lifts.
- Mitsui alone trials a 620ms mobile circular reveal. The observed section stays unclipped; only its inner visual layer clips.
- Cover has an odd-width responsive bridge, whole-pill CTA shimmer, lower mobile CTA/partner block, and a white Google badge tile.
- External circular frames/rings were removed from Cover and Contact owl marks. The animated OwlSurf SVG remains.

## Files In Play

- Scroll: `src/pages/Index.tsx`, `src/pages/deck-flick.ts`, `src/components/SlideReveal.tsx`, `src/index.css`
- Slides: `TitleSlide.tsx`, `CaseStudySlide.tsx`, `CaseStudyLayout.tsx`, `SkyrocketSlide.tsx`, `ServicesSlide.tsx`, `ClientsSlide.tsx`, `ContactSlide.tsx`
- Runtime/docs: `package*.json`, `vite.config.ts`, `README.md`, `context.md`, `prod.md`, `handoff.md`

## What Failed

- First Mitsui circle attempt clipped the IntersectionObserver target, so the slide stayed blank. The clip now lives on an inner layer.
- No agent visual/Vitest run this pass by owner request. Owner handled live visual review.

## Verification

- `git diff --check`: pass
- `npx tsc --noEmit`: pass
- `npm run lint`: pass, 0 errors and 7 existing warnings
- `npm run build`: pass; known stale Browserslist, ambiguous Tailwind duration, and `vendor-3d` size warnings remain

## Next Steps

1. Confirm the deploy run and `https://www.owlsurf.com` after push; confirm `.media` redirects to `.com`.
2. Approve or reject the Mitsui circle trial before copying it to other case studies.
3. Continue real-phone review of slide fit/flick behavior; agent should not run visual tests unless asked.

## Push Gate

Stage the intended code and docs only. `.github/workflows/deploy.yml` contains separate local retry flags and stays unstaged; Vijay's committed `.com` endpoint is already in the base branch.
