# Handoff

## Current Goal

Ship Session 54: make the Cover platform strip factual, visually balanced, and responsive without disturbing the approved hero, logo, deck motion, cases, or Contact experience.

## Current State

- Cover reads `WHERE YOUR BUYERS ARE` above LinkedIn, Google, and Meta marks. No platform-partner or certification claim remains.
- LinkedIn uses the official approved white `[in]` artwork as a lossless WebP. Google and Meta use the existing inline marks in off-white.
- Desktop aligns the CTA text, platform label, and first mark to the hero's left rail. Mobile keeps the group centered.
- Cover mobile composition owns widths through `767px`; desktop grid starts at `768px`, matching `useIsMobile()`.
- Session 53 native scroll/CSS snap, case stacks/reveals, Contact halo/AI links, and Cover logo rules remain unchanged.

## Files In Play

- Cover: `src/components/slides/TitleSlide.tsx`, `src/assets/linkedin-in-white.webp`
- Regression test: `src/components/slides/title-responsive-layout.test.ts`
- Docs: `README.md`, `design.md`, `context.md`, `prod.md`, `handoff.md`

## What Changed

- Replaced long partner badges and `Platform partners` with a three-symbol `WHERE YOUR BUYERS ARE` strip.
- Replaced the rejected typed LinkedIn imitation with LinkedIn's official white `[in]` artwork.
- Balanced the three marks, aligned the desktop bottom group to the hero rail, and preserved centered mobile composition.
- Removed the `sm` desktop-grid bridge so CSS and JavaScript share the `768px` mobile/desktop boundary.
- Updated the responsive source test to prevent the mixed-layout regression.

## What Failed

- The first icon pass reused badge-shaped/compound marks with uneven optical weight.
- The second pass typed `in` in Montserrat instead of using the real LinkedIn mark. It was rejected and removed.
- The old `sm` Cover grid activated desktop CSS while JavaScript still used mobile behavior from `640px` to `767px`, producing a clipped hybrid layout. The grid now starts at `md`.

## Verification

- `git diff --check`: pass
- `npx tsc --noEmit`: pass
- `npm test`: 29/29 pass
- `npm run lint`: pass, 0 errors and 7 existing warnings
- `npm run build`: pass; known Browserslist, Tailwind ambiguity, and large `vendor-3d` warnings remain
- Cover screenshots checked at 320, 375, 390, 414, 640, 767, 768, 1024, and 1440 widths; no horizontal overflow

## Next Steps

1. Confirm the push-to-deploy run completes.
2. Confirm `https://www.owlsurf.com` returns 200 with the updated Cover.
3. Confirm `https://www.owlsurf.media` still redirects to `.com`.

## Push Gate

Stage only the Cover asset/code/test and the five docs listed above. `.github/workflows/deploy.yml` is a separate pre-existing local change and must remain unstaged.
