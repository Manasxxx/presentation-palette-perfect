# Handoff

## Current Goal

Ship Session 53: restore the previous deck transition system, keep the Cover logo improvements, finish the mobile case-study viewer/reveals, and publish the reviewed copy/contact refinements.

## Current State

- Native deck scrolling and the previous snap/transition stack are restored. Lenis and Theatre runtime dependencies are removed. Long mobile programmatic jumps use an instant internal hop so Cover CTA and deep links land on the exact slide.
- Desktop and mobile case creatives use the original deterministic timed stacks. Mobile auto-advances every 3s and is intentionally not draggable. Blossom is fully removed. Cards keep the old glass frame, fade back cards, and have no opaque black backing/letterbox bars.
- All seven mobile case studies use the shared 720ms circular reveal with their brand tint. Only the inner full-slide layer clips; the observed section stays unclipped. Reduced motion shows full content.
- Mobile Contact keeps the teal ripple halo, dynamic rotating-pill widths, the glass `Ask AI what we do.` label, and Claude/ChatGPT links. Gemini is removed. Desktop keeps `Let’s talk`.
- Description copy is plainer and easier to understand. Services copy/layout was not changed.
- Cover logo enhancement is retained. Mobile wordmark filter/drop-shadow is disabled because Chromium/WebKit compositing produced a rectangular lighting box; desktop glow stays.

## Files In Play

- Deck/motion: `src/pages/Index.tsx`, `src/pages/deck-*.ts`, `src/components/{SlideReveal,DeckTransitionLayer,MobileTransitionLayer,MobileSlideMotion}.tsx`, `src/theatre/deck.ts`, `src/index.css`
- Cases: `src/components/CaseStudyCarousel.tsx`, `src/components/slides/{CaseStudySlide,CaseStudyLayout,MobileCaseStudyReveal}.tsx`, case slide copy files
- Cover/contact: `src/components/slides/{TitleSlide,ContactSlide}.tsx`
- Runtime/docs: `package*.json`, `README.md`, `context.md`, `prod.md`, `handoff.md`

## What Changed

- Reverted the unapproved Lenis/sliding transition change while retaining the approved logo work.
- Restored mobile Contact halo, added the mobile Ask AI treatment, then removed unreliable Gemini support.
- Fixed mobile Cover CTA navigation, removed empty Theatre runtime errors, simplified case descriptions, and generalized the approved branded case reveal.
- Reverted the failed draggable creative experiment to the old timed viewer and removed Blossom.

## What Failed

- Blossom repeat navigation did not advance reliably and the drag treatment hurt the old stacked visual. It was removed.
- Opaque anti-bleed card backings created ugly black bars around mismatched creative aspect ratios. The old translucent glass backing is restored.
- Gemini has no reliable mobile URL prompt prefill. It was removed at owner request.

## Verification

- `npx tsc --noEmit`: pass
- `npm test -- --run`: 29/29 pass
- `npm run lint`: pass, 0 errors and 7 existing warnings
- `npm run build`: pass; known Browserslist, Tailwind ambiguity, and large `vendor-3d` warnings remain
- `git diff --check`: pass
- Live mobile checks: Cover lighting box gone; old case viewer auto-advances; CTP/Kuraray black bars gone; Contact has Claude/ChatGPT only; no horizontal overflow in checked views

## Next Steps

1. Confirm the push-to-deploy run and `https://www.owlsurf.com` after push.
2. Confirm `https://www.owlsurf.media` still redirects to `.com`.
3. Continue future edits from this pushed state; do not re-add Blossom, Lenis, Gemini, or mobile drag without a new explicit request.

## Push Gate

Stage this session's code and docs only. `.github/workflows/deploy.yml` is a separate pre-existing local change and must remain unstaged.
