# Handoff

## Session Rule

This repo has a push-gated continuity workflow.

Every new coding session should read these files first:
- `handoff.md`
- `context.md`
- `prod.md`

`handoff.md` must be updated only before a push.

Do not update `handoff.md` at session end, during context clearing, or during ordinary debugging unless a push is about to happen.

## Current Goal

Session 19 (current) is preparing a push for the latest cover and Mitsui iteration. The cover now uses downloaded badge image assets instead of text-only badge pills, the cover CTA uses a local SmoothUI-inspired magnetic button, and the Mitsui case study now uses a top-left heading, top-right Hover-style proof strip, and bottom-centered creative carousel. The temporary Mitsui web-preview block from Session 18 was removed after visual iteration.

Session 18 pushed interaction and conversion polish across the website/deck. The cover gained four credibility badges, Mitsui briefly gained an AI Elements-style web preview block below the stats, Contact gained a compact FlyonUI-inspired footer block at the bottom, and unknown routes now render a branded OwlSurf 404 page outside the slide matrix.

Session 17 pushed a focused visual asset update. The cover slide now uses a reusable animated SVG `OwlSurfLogo` component in the same right-side circular logo placement, the Who We Are slide's right-side technical illustration is shifted further toward the right edge, and the Raychem RPG case study now uses three refreshed WebP creatives converted from the user's Downloads folder.

Session 16 pushed the deck-wide Anime.js motion cleanup and OwlSurf teal scale update. The non-case-study slides now use stronger content-bound Anime.js motion: heading spring, accent-word blur-to-sharp motion, lanyard/card/logo overshoot, and link/icon pulses where useful. The broad scan-line sweep and circular glow-orbit blob have been removed from all slides, including all seven case studies.

Session 15 pushed the case-study Anime.js motion system. All seven case-study slides keep heading spring, accent-word blur-to-sharp slide, creative/slider overshoot, and stat icon pulse where stats exist. The scan-line sweep and glow orbit from that first pass were removed in Session 16 after visual feedback.

Session 14 pushed the Our Team lanyard band rendering and repo handoff workflow update. The lanyard strap keeps the OwlSurf mark upright and improves sharpness with a 4x generated texture, higher foreground Canvas DPR, antialiasing, sharper texture filters, larger logo draw size, and React Bits-style `repeat={[-4, 1]}`. The repo workflow now says `handoff.md` is updated only before a push, not at ordinary session end.

Session 13 began the case-study redesign pass. Two of seven case studies are now on the new recipe: Mitsui on a **split** layout (copy + stats column ~38–42% wide, parallax slider in the remaining space with intentional right-edge bleed) and Baxsaa on a **polished vertical** layout (centered heading recipe, 2-image grid, brand-tinted stat pills, eyebrow-styled SEO callout). `ParallaxCardSlider` now accepts a `cardWidth` prop for per-CS slider scaling. The remaining five case studies (CultFit, GirlUp, CTP, VNT, RaychemRPG) are still on the pre-Session-13 layout.

Session 12 cover/contact polish, the audit-file cleanup, and the parked `ui-design-plan.scratch.md` are all preserved untouched. The Session 11 P0 batch (a11y, mobile WebGL gating, prefers-reduced-motion hook, slide-mount resilience) and the Session 12 parked UI placement plan are all still pending — case-study redesign is taking priority this session because the deck owner is iterating live with prospects.

## Current State

The app is a Vite + React presentation-style SPA running on the fixed dev port:
- `http://localhost:8080/`

The dev server was running during this session. `npm run build` was run before push because the repo push gate requires it. Browser visual approval remains with the user.

### Deck-wide Anime.js motion cleanup + OwlSurf teal scale (Session 16)

- **Non-case-study slides** (`TitleSlide`, `SkyrocketSlide`, `OurTeamSlide`, `ServicesSlide`, `ClientsSlide`, `ContactSlide`) — stronger Anime.js entrances added: heading spring, accent-word blur-to-sharp motion, creative/lanyard/card/logo overshoot, and icon pulses where useful.
- **Case-study slides** — retained the useful case-study motion pieces, but removed every `.cs-scan-line` and `.cs-glow-orbit` animation/element.
- **No line/blob rule** — `rg -n "scan-line|glow-orbit" src/components/slides` returns no matches.
- **OwlSurf design system** (`src/index.css`, `tailwind.config.ts`) — added the supplied teal scale from `50` to `700`, kept `#4BC2C2` as the primary teal, and remapped teal light/dark aliases to the new scale.
- **Next session plan** — add/reuse a `prefers-reduced-motion` gate before broadening motion further or extracting shared helpers.

### Cover logo, Who We Are image placement, and Raychem creatives (Session 17)

- **Cover (TitleSlide)** — the old `logo-main.jpg` image inside the right-side circular logo treatment was replaced with a new reusable `OwlSurfLogo` SVG component. The existing link, rings, sizing wrapper, glass card, and reveal animation were kept.
- **Who We Are (SkyrocketSlide)** — the desktop right-side technical illustration panel now sits at `right-[-8%]` so the image hugs the right edge more closely while retaining its scale and existing animation.
- **Raychem RPG case study** — the three Raychem JPEG creatives from `~/Downloads/Client Projects/Raychem RPG/` were converted to WebP and replaced the existing site assets: `raychem-creative-1.webp`, `raychem-creative-2.webp`, and `Raychemcasestudy 3.webp`. The slide still renders all three through `ParallaxCardSlider`, with clearer alt text.
- **Verification approach** — browser visual checks were skipped at the user's explicit request. The user will provide visual feedback manually.

### Conversion polish, Mitsui preview, footer, and 404 (Session 18)

- **Cover (TitleSlide)** — added four small animated credibility badges in the bottom zone: `Meta / Verified Agency`, `Google / Partner Agency`, `LinkedIn / B2B Ads Partner`, and `HubSpot / Growth Partner`.
- **Mitsui (CaseStudySlide)** — added a local AI Elements-style `WebPreview` block below the stats, with `WebPreview`, `WebPreviewNavigation`, `WebPreviewUrl`, and `WebPreviewBody` primitives. The preview uses `srcDoc` markup instead of an external iframe URL so it is stable inside the deck.
- **Contact (ContactSlide)** — added a compact FlyonUI-inspired footer at the bottom of the final slide through `FlyonFooter`. It uses the supplied FlyonUI logo image URL and local `lucide-react` social icons instead of installing Tailwind 4 Iconify plugins into this Tailwind 3 project.
- **Website 404 (NotFound)** — replaced the default Vite-style 404 with a branded OwlSurf 404 page outside the slide matrix. The catch-all route already existed in `App.tsx`, so no route change was needed.
- **Clients slide** — the attempted one-row/four-block shuffle carousel was reverted. Clients is back to the existing two-line `LogoLoop` carousel.
- **Verification approach** — `npm run build` was used for compile verification. Browser visual checks were skipped per user preference.

### Cover badges, magnetic CTA, and Mitsui proof strip (Session 19)

- **Cover (TitleSlide)** — replaced text-only credibility pills with downloaded badge image assets for Meta Business Partner, Google Partner, LinkedIn Marketing Partner, and HubSpot Partner. The badge group sits bottom-right while the animated OwlSurf logo remains in its original right-side circular logo flow.
- **Cover CTA** — added `src/components/ui/MagneticButton.tsx`, a local SmoothUI-inspired magnetic button, and mounted it on the cover `See case studies` CTA while preserving the shimmer and click behavior.
- **Mitsui (CaseStudySlide)** — removed the temporary web-preview element. The slide now has `Mitsui Chemicals` top-left, a top-right horizontal proof strip, and a bottom-centered `ParallaxCardSlider` carousel. Stats are ordered as impressions, ad clicks, engagement increase, ROI, and follower growth, with an up-right trend icon on the engagement metric.
- **Carousel centering fix** — the bottom-centered slider uses an outer wrapper for structural `left-1/2` / `-translate-x-1/2` positioning and an inner `.cs-slider` element for Anime.js, so the reveal animation no longer overwrites layout centering.
- **Local plan note** — `ui-design-plan.scratch.md` was updated locally with future Hover.dev testimonials and case-study/social-media visual refresh notes. It remains gitignored and should not be committed.
- **Verification approach** — `npm run build` passed. Browser visual checks and screenshots were skipped by user preference; visual approval remains with the user.

### Our Team lanyard + handoff workflow (Session 14)

- **Lanyard band** (`src/components/ui/Lanyard/Lanyard.jsx`) — updated. Generated band texture is now 8192x2048 via a 4x scale, the band logo draw is larger while staying upright, Canvas DPR is raised for this foreground hero object, antialiasing is enabled, mipmap blur is disabled on the generated texture, and MeshLine repeat is now `[-4, 1]`.
- **Workflow docs** (`AGENTS.md`, `handoff.md`) — updated. `handoff.md` is now push-gated only: update before push, not at normal session end, context clearing, or ordinary debugging.
- **Project docs** (`context.md`, `prod.md`) — updated for the lanyard render change, the foreground WebGL DPR exception, and the push-gated handoff rule.

### Case-study redesign progress (Session 13)

- **Mitsui** (`src/components/slides/CaseStudySlide.tsx`) — done. Split layout: copy column on the left at `shrink-0 md:w-[42%] lg:w-[38%]`, parallax slider on the right at `flex-1 min-w-0 justify-start self-center`. Slider `cardWidth="min(24vw, 320px)"`. The slider's right edge is allowed to bleed past the section bound (clipped by `overflow-hidden` on `.slide`) — this is intentional after live iteration with the user. Eyebrow `Case study 01` in Mitsui cyan, h2 `Mitsui` (white) stacked over `Chemicals` (cyan gradient), Palanquin tagline, vertical stat list with icon circles.
- **Baxsaa** (`src/components/slides/BaxsaaCaseStudy.tsx`) — done. Polished vertical layout: centered eyebrow `Case study 02` (maroon) + Montserrat black h2 (`The Baxsaa` ink + `Co.` maroon gradient) + Palanquin tagline, 2-image grid with maroon shadow/ring, custom translucent stat pills replacing `LiquidGlassCard`, SEO callout card with the eyebrow recipe and `font-black` highlight numbers.
- **Slider prop** (`src/components/ParallaxCardSlider.tsx`) — done. Added `cardWidth?: string` default `"min(32vw, 340px)"`. Backward compatible: the five untouched case studies render identically because they don't pass the prop.
- **CultFit, GirlUp, CTP, VNT, RaychemRPG** — not started. Pending per-CS decision (split vs vertical) and a port to the new recipe.

### Deck text — current state per slide

- **Cover (Title)** — Eyebrow `CREDENTIALS`. Col 1 body `For the people who sell complex things`. Col 2 label `MADE FOR`. CTA `See case studies →`.
- **Slide 2 Who We Are** — Kicker `B2B marketing for complex markets`. H2 `WHO WE / ARE.` (declarative, period not question mark). Body keeps the signature line `We translate technical depth into market momentum.` with a smaller secondary line below: `For the marketing teams selling what engineers built.` Sector eyebrow `Where we work`.
- **Slide 3 Our Team** — Roster titles now lowercased + tightened: Harshit `Strategy & growth`, Sakshi `Client lead`, Manas `Digital strategy`, Sanskriti `Creative direction`, Pankaj `Build & ship`, Vishnu `Brand & identity`.
- **Slide 4 Services** — Five pillars renamed to B2B buyer language: `Brand & Story`, `Demand Gen`, `Discovery`, `Marketing Stack`, `AI & Autopilot`. All 25 service card descriptions rewritten to plainspoken / never-rude / no em-dash style. The repeating `B2B / Industrial` footer band was removed from every CardSwap card.
- **Slide 5 Clients** — Heading `OUR CLIENTS` (was `MAJOR CLIENTS`). Placeholder `Client` logo + `client-extra.png` import removed.
- **Slides 6–12 Case studies** — All seven headings dropped the `Success` boast suffix; the colour-gradient second word is now a sub-brand piece (e.g. `Mitsui Chemicals`, `Cult.fit`, `The Baxsaa Co.`, `Check This Property`, `Girl Up`, `VNT Mobility`, `Raychem RPG`). Every subtitle rewritten in `Who they are. What we did.` pattern (e.g. `Specialty chemicals giant. We ran their digital across APAC.`). Baxsaa SEO card heading is now `SEO clean-up` and the metric prose is tightened.
- **Slide 13 Contact** — Untouched. Signature line `LET'S MAKE / COMPLEX / obvious.` stays.

### Cover + Contact taglines (Session 12 refinements)

After Session 11, the user further refined the cover slide and contact closer (commit `1c2b908`):
- Cover wordmark sub-line: `Digital` → `B2B Marketing for complex markets` (smaller font weight so it sits under OWLSURF as a supporting line rather than a competing one).
- Cover Col 1: `B2B MARKETING / For the people who sell complex things` → `WHAT WE DO / B2B marketing for technical brands`.
- Cover Col 2 unchanged (`MADE FOR / Long cycles. Complex products. Buyers who expect substance.`).
- Contact main heading unchanged (`LET'S MAKE / COMPLEX / obvious.` is the signature line — do not touch).
- Contact intro tagline: `For industrial, technical, and B2B brands ready to be understood faster.` → `For B2B brands ready to skip the noise.`

The same commit removed `ux-audit-report.html` + `.pdf` from the product tree (they were committed in Session 11's PR `791cf83` by accident — working artefacts for the deck owner, not source) and added `ux-audit-report.*` + `*.scratch.*` to `.gitignore` so future audits / scratch files cannot leak into the product tree.

### UI design review (Session 12) — plan parked, NOT shipped

Ran the `ui-design-review` skill against the upper deck on 2026-05-25. Score 69/100 (C+/B-). Plan saved to `ui-design-plan.scratch.md` (gitignored via `*.scratch.*`) with three phases:

- **Phase 1** — eight ~3-hour single-line quick wins (LogoLoop fade color, contact bg, contact frame removal, card height trim, card stripe dedup, wordmark sub-line re-weight, secondary line contrast bump, logo card border).
- **Phase 2** — composition pass (Slide 1 background slimming, Slide 2 inner-panel removal, Slide 4 CardSwap mobile scale, Slide 5 logo anchor, Slide 13 h2 scale decision).
- **Phase 3** — mobile rebuild (Slide 3 OurTeam lanyard → static portrait, Slide 2 fixed height → flex, Slide 13 mobile logo aside).

The plan is gitignored and lives only on the user's machine. **Do not commit it to the repo.** When picking it up, work phase by phase and verify in the browser between phases.

A SessionEnd hook in `.claude/settings.local.json` (gitignored — only on the user's machine) prints a one-line reminder at session exit if the plan file still exists. It auto-skips once the plan is consumed.

### PillNav — current state

Labels were re-mapped to match the actual slide each entry points to:
- `Cover`, `Who We Are`, `Team`, `Services`, `Clients`, `Case Studies`, `Contact`.

The header still hides after 1600ms of inactivity. The `role="menubar"` / `role="menuitem"` pattern was flagged by the audit but has not been fixed yet (still a P0 a11y item).

### Dead-code cleanup

Removed 16 orphan files in this session:
- `src/components/slides/TeamSlide.tsx` (old, never imported)
- `src/components/ProfileCard.jsx` and `.css` (old team-slide path, no longer used)
- `src/components/Radar.jsx` and `.css` (old team-slide path, no longer used)
- `src/components/ui/SplitText.tsx` (never imported)
- `src/components/ui/marquee.tsx` (replaced by `LogoLoop`)
- `src/components/ui/toast.tsx`, `src/components/ui/tooltip.tsx` (never imported)
- `src/assets/client-extra.png` (placeholder)
- `src/assets/client-dehn.png`, `client-kuraray.png`, `client-mitsui.png` (never imported)
- `src/assets/logo-icon.png` (never imported; `logo-main.jpg` is the active logo)
- `src/assets/Raychemcasestudy 1.webp`, `Raychemcasestudy 2.webp` (only `3.webp` is imported by the Raychem case study)

`npm run build` passes after these deletes.

`vite.config.ts` `manualChunks` still lists `@radix-ui/react-slot`, `@radix-ui/react-toast`, and `@radix-ui/react-tooltip` under `vendor-ui`. These dependencies remain installed in `package.json` because nothing in `src/` imports them after the deletes — they are candidates for a future `npm uninstall`, but the dependency-removal pass was not done in this session.

`@gsap/react` becomes unused after `SplitText.tsx` was removed; same caveat applies.

## Files Touched (Session 17)

Focused visual asset update:
- `src/components/OwlSurfLogo.tsx` — new reusable animated SVG OwlSurf mark
- `src/components/slides/TitleSlide.tsx` — cover logo content swapped to `OwlSurfLogo`
- `src/components/slides/SkyrocketSlide.tsx` — right-side illustration panel shifted toward the right edge
- `src/components/slides/RaychemRPGCaseStudy.tsx` — Raychem slider alt text refreshed while keeping all three converted creatives
- `src/assets/raychem-creative-1.webp` — replaced with converted Raychem PowerGrid creative from Downloads
- `src/assets/raychem-creative-2.webp` — replaced with converted Raychem Invisible Infrastructure creative from Downloads
- `src/assets/Raychemcasestudy 3.webp` — replaced with converted Raychem human/field-engineer creative from Downloads
- `context.md` — Session 17 log and latest-state summary
- `prod.md` — cover logo, Slide 2 placement, and Raychem WebP guidance
- `handoff.md` — push-gate state refreshed for this push

## Files Touched (Session 18)

Conversion and route polish:
- `src/components/ai-elements/WebPreview.tsx` — new local AI Elements-style web preview primitives
- `src/components/blocks/FlyonFooter.tsx` — new compact FlyonUI-inspired footer block
- `src/components/slides/CaseStudySlide.tsx` — Mitsui web preview added below stats
- `src/components/slides/ContactSlide.tsx` — footer mounted at bottom of contact slide
- `src/components/slides/TitleSlide.tsx` — four cover credibility badges added
- `src/pages/NotFound.tsx` — branded OwlSurf 404 page for unknown routes
- `handoff.md` — push-gate state refreshed for this push
- `context.md` — Session 18 log and current-state summary
- `prod.md` — guidance for cover badges, local preview blocks, footer blocks, and 404 route

## Files Touched (Session 19)

Cover and Mitsui iteration:
- `src/assets/badge-meta-business-partner.png`
- `src/assets/badge-google-partner.png`
- `src/assets/badge-linkedin-marketing-partner.png`
- `src/assets/badge-hubspot-partner-gold.png`
- `src/components/ui/MagneticButton.tsx`
- `src/components/slides/TitleSlide.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `context.md`
- `prod.md`
- `handoff.md`

## Files Touched (Session 13)

Case-study redesign pass:
- `src/components/ParallaxCardSlider.tsx` — added `cardWidth` prop
- `src/components/slides/CaseStudySlide.tsx` — Mitsui split layout
- `src/components/slides/BaxsaaCaseStudy.tsx` — Baxsaa polished vertical layout
- `prod.md` — case-study rule rewritten to allow two layouts; heading-recipe note extended for case studies
- `context.md` — Session 13 entry, new architecture rows, TODO for remaining 5 case studies
- `handoff.md` — this file

## Files Touched (Session 14)

Lanyard + workflow push:
- `src/components/ui/Lanyard/Lanyard.jsx` — sharper upright strap mark and higher-quality foreground canvas render
- `AGENTS.md` — handoff update rule narrowed to push only
- `handoff.md` — push-gate state refreshed for this push
- `context.md` — Session 14 log added
- `prod.md` — lanyard sharpness and foreground DPR guidance added

## Files Touched (Session 15)

Case-study Anime.js motion:
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/BaxsaaCaseStudy.tsx`
- `src/components/slides/CultFitCaseStudy.tsx`
- `src/components/slides/GirlUpCaseStudy.tsx`
- `src/components/slides/CTPCaseStudy.tsx`
- `src/components/slides/VNTCaseStudy.tsx`
- `src/components/slides/RaychemRPGCaseStudy.tsx`
- `context.md` — Session 15 log and next-session plan
- `handoff.md` — push-gate state refreshed for this push
- `prod.md` — deck-wide Anime.js motion guidance added

## Files Touched (Session 16)

Deck-wide motion cleanup + OwlSurf design tokens:
- `src/components/slides/TitleSlide.tsx`
- `src/components/slides/SkyrocketSlide.tsx`
- `src/components/slides/OurTeamSlide.tsx`
- `src/components/slides/ServicesSlide.tsx`
- `src/components/slides/ClientsSlide.tsx`
- `src/components/slides/ContactSlide.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/BaxsaaCaseStudy.tsx`
- `src/components/slides/CultFitCaseStudy.tsx`
- `src/components/slides/GirlUpCaseStudy.tsx`
- `src/components/slides/CTPCaseStudy.tsx`
- `src/components/slides/VNTCaseStudy.tsx`
- `src/components/slides/RaychemRPGCaseStudy.tsx`
- `src/index.css`
- `tailwind.config.ts`
- `context.md`
- `handoff.md`
- `prod.md`

Outside-repo work in this session (NOT committed):
- `~/.claude/projects/-Users-manassrivastava/memory/feedback_no_build_screenshot_verify.md` — new feedback memory: skip build / screenshot / verify probes unless explicitly asked. Indexed in `MEMORY.md`.

## Files Touched (Sessions 11 + 12)

Session 11 copy rewrites (commit `791cf83`):
- `src/components/PillNav.tsx`
- `src/components/slides/TitleSlide.tsx`
- `src/components/slides/SkyrocketSlide.tsx`
- `src/components/slides/OurTeamSlide.tsx`
- `src/components/slides/ServicesSlide.tsx`
- `src/components/slides/ClientsSlide.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/BaxsaaCaseStudy.tsx`
- `src/components/slides/CultFitCaseStudy.tsx`
- `src/components/slides/GirlUpCaseStudy.tsx`
- `src/components/slides/CTPCaseStudy.tsx`
- `src/components/slides/VNTCaseStudy.tsx`
- `src/components/slides/RaychemRPGCaseStudy.tsx`

Session 11 deletes: 16 orphan files (see list above).

Session 12 cover/contact refinements (commit `1c2b908`):
- `src/components/slides/TitleSlide.tsx`
- `src/components/slides/ContactSlide.tsx`
- `.gitignore` (added `ux-audit-report.*` + `*.scratch.*`)
- Deleted: `ux-audit-report.html`, `ux-audit-report.pdf`

Session 12 outside-repo work (NOT committed, lives on user's machine only):
- `ui-design-plan.scratch.md` (parked plan, gitignored)
- `.claude/settings.local.json` SessionEnd hook
- `~/.claude/projects/-Users-manassrivastava/memory/project_owlsurf_ui_design_plan.md` (memory note)

Doc updates (this commit):
- `handoff.md`
- `context.md`

## Verified / Evidence

- `npm run build` passes after copy edits and after orphan-file deletes.
- `npm run build` passes before the Session 14 lanyard/workflow push.
- `npm run build` passes before the Session 15 case-study motion push.
- `npm run build` passes before the Session 16 deck-wide motion cleanup push.
- `npm run build` passes before the Session 17 visual asset push.
- `npm run build` passes before the Session 18 conversion polish push.
- `file src/assets/raychem-creative-1.webp src/assets/raychem-creative-2.webp 'src/assets/Raychemcasestudy 3.webp'` confirms all three Raychem assets are WebP images at 1080x1440.
- `rg -n "scan-line|glow-orbit" src/components/slides` returns no matches after Session 16 cleanup.
- `npm test` / `npm run lint` were not re-run in this session after the deletes; the project's pre-existing lint debt in `LightRays.tsx`, `Hyperspeed.tsx`, `PrismaticBurst.tsx`, and `tailwind.config.ts` is still expected to fail lint.
- Visual screenshot capture was intentionally skipped per the original handoff policy (the user prefers to judge browser output manually).

## Known Issues / Next Things To Do

Highest-priority follow-ups, in two stacks: the UX audit P0 batch (Session 11, still pending) and the UI design plan (Session 12, parked but ready).

1. **Accessibility** — replace `role="menubar"` / `role="menuitem"` in `PillNav` with plain `<nav><ul>`; add `role="tab"` / `role="tablist"` / `aria-selected` to the Services pillar tabs; add `aria-expanded` and Escape/focus-trap to the mobile menu; fix inactive-roster contrast (`text-white/18` fails WCAG AA).
2. **Mobile WebGL gating** — `Hyperspeed`, `LightRays`, `PrismaticBurst`, and `Globe` should be gated behind `useIsMobile()` per `prod.md` line 22 (which the deck currently self-violates).
3. **`prefers-reduced-motion`** — add a single hook that gates auto-advance (roster 5s, CardSwap 3s), all anime.js / GSAP timelines, and the `scrollTo({ behavior: "smooth" })` in `Index.tsx`.
4. **Slide mount resilience** — bump `SLIDE_MOUNT_RADIUS` to 1 on desktop and replace the empty `SlideFallback` with a small skeleton so the lazy-chunk fetch does not produce a black flash between slides.
5. **Lovable default OG image** still in `index.html` — replace with an OwlSurf-branded social preview.
6. **`<main>` nested inside `<section>` slide** in `ContactSlide.tsx` is a landmark mistake; fix at the same time as the a11y pass.
7. **Mobile layout** — `OurTeamSlide` stacks roster + 620px lanyard at `<lg`, overflowing the viewport. `SkyrocketSlide` mobile IntroBlock uses a fixed `h-[31rem]` height that risks landscape overflow.

### Session 13 — case-study redesign carry-over

- Five case studies (CultFit, GirlUp, CTP, VNT, RaychemRPG) still need to be ported to either the split (Mitsui) or polished vertical (Baxsaa) template. Decide per case study based on whether the existing content has an extra element (callout, side-by-side composition, secondary stat block) that a 50/50 split can't host cleanly.
- The Mitsui slider right-edge bleed only works because the section has `overflow-hidden`. If a future change removes that, retest Mitsui at common laptop widths (1280, 1440) — the bleed will visually leak into the next slide.

### Session 12 — UI design plan (parked)

See `ui-design-plan.scratch.md` (local only). Three phases, ~3 hrs / 4 hrs / 1 day respectively. Pick up by phase, not piecemeal. Phase 1 is the lowest-risk batch of eight single-line edits.

Other open project items carried over from earlier sessions:
- Vercel deployment is still broken and needs reconnect / redeploy.
- `logo-main.jpg` is still a JPG; should be WebP or SVG.
- Vishnu still reuses Pankaj's avatar until a dedicated Vishnu avatar is supplied.
- `vendor-lanyard` remains a very large chunk (~3MB minified / ~1MB gzip); audit noted but did not address in this session.
- Lint debt in visual components still fails `npm run lint`.

### Security flag carried from the audit

`.git/config` contains a GitHub PAT in plaintext in the remote URL. **Rotate the token and move to SSH or git credential helper** before any wider repo access. Not blocking this push, but should be the first follow-up.

## Current Workspace Notes

Intended files for the Session 18 commit:
- `src/components/ai-elements/WebPreview.tsx`
- `src/components/blocks/FlyonFooter.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/ContactSlide.tsx`
- `src/components/slides/TitleSlide.tsx`
- `src/pages/NotFound.tsx`
- `handoff.md`, `context.md`, `prod.md`

Unrelated untracked items that should remain unstaged unless asked:
- `.agents/`
- `.claude/`
- `carousel-b2b-marketing.html`
- `our-team-slide-screenshot.png`
- `our-team-slide-single-lanyard.png`
- `skills-lock.json`

## Push Gate

Before pushing:
1. `handoff.md`, `context.md`, `prod.md` reflect the current architecture and copy.
2. `npm run build` passes.
3. Stage only intended files.
4. Commit.
5. Push `main`.
