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

Session 27 (current) is a live mobile polish pass on slides 2 (Who We Are) and 4 (Services), with no desktop change. Slide 2 mobile gains breathing room, an auto-scrolling teal-pill marquee for `Priority sectors` (replacing a broken `LogoLoop` attempt that over-duplicated because it measures `<img>` children the icon pills don't have), and a two-column buyer-outcomes grid. Slide 4 mobile is restructured: a two-row segmented category bar so all five verticals are visible with no hidden horizontal scroll, the highlighted category auto-advancing every 3.5s, and a numbered titles-only stepper consolidated to three headline groups per category (descriptions dropped on mobile only via a `mobileServices` map; desktop CardSwap untouched). The previously-uncommitted deploy webhook retry flags could not ship in this push (the remote PAT lacks `workflow` scope, so `deploy.yml` is rejected); that change stays in the working tree for a separate workflow-scoped push.

Session 26 is a live mobile polish pass on top of the pushed Hallmark B2B credentials deck. It keeps the desktop deck intact except for the requested cover headline update: the cover now reads `We turn [rotating industry] businesses into brands buyers actually [rotating trust word]`, with Anime.js-powered dynamic teal pills for industries and buyer-confidence words, plus a local shiny-text case-study CTA. Mobile cover spacing, wordmark centering, logo scale, and partner badge fit were tuned. Slide 2 was rebuilt into a tighter buyer-outcomes layout, Our Team now uses Anime.js for the roster/card transitions and removes duplicate mobile badge names, and the Clients proof slide removes the market-note grid while centering and slightly speeding the logo loops.

Session 25 is the Hallmark-led B2B credentials pass that added the locked Hallmark design system (`design.md`, `tokens.css`, `.hallmark/`) and refined the deck into a concise portfolio-PDF replacement for Indian and international B2B buyers in chemical, industrial, and long-cycle technical sectors.

Session 24 is the mobile-only layout pass that fixed the phone-layout breakage from the long-open "Mobile layout" item in Known Issues. Services cards became readable on mobile, Our Team gained a static mobile badge card, Who We Are was compacted, Clients was balanced, and the Playwright screenshot harness was added.

Session 23 is an accessibility + performance hardening pass on top of Session 22. It clears most of the long-standing P0 UX-audit backlog: real ARIA semantics in `PillNav` and the Services pillar tabs, a new `prefers-reduced-motion` gate, mobile gating of the heavy WebGL backdrops (now matching `prod.md` line 22 instead of self-violating it), a roster-contrast fix, the Contact landmark fix, a local OG image, and a soft slide skeleton to remove the black flash between slides. `npm run lint` and `npm run build` both pass clean. Full details under Current State below.

Session 22 completed the live visual pass and cleanup requested before push. The cover (`TitleSlide`) now has the centered clipped globe with only the top half visible, larger/tighter partner badges, `OWLSURF DIGITAL` in the top-left lockup, no top-right `Credentials / 01`, and a slightly larger OwlSurf logo. Services keeps the left-pillar/right-CardSwap format, with clip-art SVG illustrations added only to the first `Brand & Story` vertical in a text-left/illustration-right card split. Case studies now share the Mitsui-style formatting through `CaseStudyLayout` for Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG; Mitsui and Raychem slideshows include the additional WebP creatives from Downloads. Contact footer alignment was tightened. Our Team now has the smoother cylindrical name roulette and the lanyard badge draws the person's field/title instead of the person's name. Cleanup removed two stale assets, removed unused UI/animation dependencies, tightened manual chunks, fixed lint blockers, and verified assets/build/lint before push.

### Session 20 — documentation-only VPS/domain migration prep. The website code and visual behavior were intentionally left unchanged. Added migration guidance, dependency/runtime notes, environment-variable breadcrumbs, Node version pinning, and example static-server configs so a future maintainer can move the built Vite SPA to a VPS and domain more easily. The user explicitly asked to record this in both `handoff.md` and `context.md`.

Session 19 prepared the latest cover and Mitsui iteration. The cover now uses downloaded badge image assets instead of text-only badge pills, the cover CTA uses a local SmoothUI-inspired magnetic button, and the Mitsui case study now uses a top-left heading, top-right Hover-style proof strip, and bottom-centered creative carousel. The temporary Mitsui web-preview block from Session 18 was removed after visual iteration.

Session 18 pushed interaction and conversion polish across the website/deck. The cover gained four credibility badges, Mitsui briefly gained an AI Elements-style web preview block below the stats, Contact gained a compact FlyonUI-inspired footer block at the bottom, and unknown routes now render a branded OwlSurf 404 page outside the slide matrix.

Session 17 pushed a focused visual asset update. The cover slide now uses a reusable animated SVG `OwlSurfLogo` component in the same right-side circular logo placement, the Who We Are slide's right-side technical illustration is shifted further toward the right edge, and the Raychem RPG case study now uses three refreshed WebP creatives converted from the user's Downloads folder.

Session 16 pushed the deck-wide Anime.js motion cleanup and OwlSurf teal scale update. The non-case-study slides now use stronger content-bound Anime.js motion: heading spring, accent-word blur-to-sharp motion, lanyard/card/logo overshoot, and link/icon pulses where useful. The broad scan-line sweep and circular glow-orbit blob have been removed from all slides, including all seven case studies.

Session 15 pushed the case-study Anime.js motion system. All seven case-study slides keep heading spring, accent-word blur-to-sharp slide, creative/slider overshoot, and stat icon pulse where stats exist. The scan-line sweep and glow orbit from that first pass were removed in Session 16 after visual feedback.

Session 14 pushed the Our Team lanyard band rendering and repo handoff workflow update. The lanyard strap keeps the OwlSurf mark upright and improves sharpness with a 4x generated texture, higher foreground Canvas DPR, antialiasing, sharper texture filters, larger logo draw size, and React Bits-style `repeat={[-4, 1]}`. The repo workflow now says `handoff.md` is updated only before a push, not at ordinary session end.

Session 13 began the case-study redesign pass. Session 22 superseded the old carry-over: Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG now use the shared `CaseStudyLayout`, while Mitsui remains the custom proof-strip + bottom carousel slide.

Session 12 cover/contact polish, the audit-file cleanup, and the parked `ui-design-plan.scratch.md` are all preserved untouched. The Session 11 P0 batch (a11y, mobile WebGL gating, prefers-reduced-motion hook, slide-mount resilience) and the Session 12 parked UI placement plan are all still pending — case-study redesign is taking priority this session because the deck owner is iterating live with prospects.

## Current State

The app is a Vite + React presentation-style SPA running on the fixed dev port:
- `http://localhost:8080/`

The Session 27 push prep is checked and ready to push. Current live-dev shape is `localhost:8080`; a WiFi-accessible dev server was also run at `http://192.168.0.132:8080/` for phone review during this session, and mobile layouts were verified with the Playwright shot harness at 390x844. Final push verification is command-based. `git diff --check`, `npm run lint` (0 warnings), and `npm run build` pass. The known build notices are still the stale Browserslist/caniuse-lite message and the large `vendor-lanyard` chunk warning.

### Session 27 mobile polish — Slide 2 + Slide 4

- **Slide 2 (`SkyrocketSlide`) mobile** — centered with larger headline and bigger gaps. `Priority sectors` is now an auto-scrolling CSS marquee of teal pills (two duplicated sets, `translateX(-50%)`, edge mask-fade, reduced-motion pauses); `who-sector-marquee` keyframe added to `index.css`. `What this means for buyers` is now a two-column card grid, last card full width. Do not use `LogoLoop` for these pills (it measures `<img>` widths the pills lack and over-duplicates).
- **Slide 4 (`ServicesSlide`) mobile** — the tabs + panel are now a dedicated `isMobile` branch (desktop CardSwap markup is reproduced verbatim in the `else` branch, byte-for-byte). Categories show as a two-row segmented icon bar (3 + centered 2), all five visible, no hidden scroll. The highlighted category auto-advances every 3.5s (one-shot `setTimeout` re-armed on `activeKey` change, so manual taps reset it; gated off under reduced motion; cleared on unmount). The panel is a numbered build-sequence stepper on a teal spine, titles only, consolidated 5 -> 3 per category via the new `mobileServices` map. Item swaps fade in via the `sv-step-in` keyframe. Desktop still shows all five services with descriptions.
- **Deploy hardening (NOT pushed)** — the `--retry 5 --retry-all-errors --retry-delay 10` flags on the Actions webhook `curl` are still only in the working tree. The push that included `deploy.yml` was rejected because the remote PAT has no `workflow` scope. Land separately via `gh auth refresh -s workflow` (and move the remote off the embedded PAT) or the GitHub web editor.


### Session 26 mobile cover, Slide 2, Team, and Proof Clients polish

- **Cover** — replaced the old complex-product headline with a rotating buyer-trust headline: `We turn [Solar / Industrial / Chemical / Pharma / Manufacturing / Mobility / Real Estate] businesses into brands buyers actually [trust / choose / believe / prefer / buy from]`. The rotating pills use the local `WordRotate` component and Anime.js width/word transitions.
- **Cover mobile** — centered the `OWLSURF DIGITAL` wordmark, removed the mobile credentials subline, hid the mobile strategy/content/demand paragraph, improved heading spacing, enlarged the signal logo circle, and kept all four partner badges on one visible line.
- **CTA** — replaced the review-case-studies CTA text effect with a local `AnimatedShinyText` component while preserving the click behavior.
- **Slide 2** — improved the `What we understand`, `Priority sectors`, and `What this means for buyers` headings, removed the old wide rules and PDF-replacement copy, made `sales.` and `buyers.` teal serif accents, and changed the bottom block to buyer outcomes: clear first look, faster buy-in, less explaining, credible proof, and sales alignment.
- **Our Team** — shifted the mobile heading up, removed the rule before `Core team`, removed duplicate names from the mobile employee card, moved the designation/title into the card's primary text slot, and moved both the roster roulette and mobile card change to Anime.js.
- **Proof Clients** — shifted the heading up, removed the four market-note lines, centered the logo slider in the slide, and slightly increased both loop speeds.

### Session 25 Hallmark credentials pass

- **Hallmark system** — added `design.md`, `tokens.css`, `.hallmark/preflight.json`, and `.hallmark/log.json`; `src/index.css` imports the tokens.
- **Cover** — removed the literal `Portfolio proof` box and small explanatory top-right copy; added an editorial signal-map graphic with grid, orbit rings, nodes, scan sweep, and central OwlSurf mark; headline now reads `When the product is complex, the choice shouldn't be.` with calmer typographic hierarchy.
- **Copy and positioning** — reframed the deck around chemical, industrial, and technical B2B buyers who need a concise portfolio-PDF replacement.
- **Case studies** — added proof/info panels, larger taglines, aligned the panels with the creative carousel band, shifted creatives farther right, and increased inactive image translucency.
- **Navigation** — kept the compact centered header, shortened labels, removed the width animation, and preserved the plain nav/list/button semantics from Session 23.

### Session 23 accessibility + performance hardening

This pass clears most of the P0 UX-audit backlog without changing the desktop visual design.

- **Accessibility**
  - `PillNav` — removed the incorrect `role="menubar"` / `role="none"` / `role="menuitem"` markup (it was lying to assistive tech); the desktop nav is now a plain `nav > ul > li > button`. Active items expose `aria-current="page"`. The hamburger exposes `aria-expanded` + `aria-controls="mobile-nav-menu"`. The mobile menu now closes on Escape, moves focus into the menu on open, and returns focus to the hamburger on close.
  - `ServicesSlide` — the five pillar buttons are now a real WAI-ARIA tablist: `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls` / `aria-labelledby` wiring, roving `tabIndex`, and ArrowUp/Down/Left/Right + Home/End keyboard navigation.
  - `OurTeamSlide` — the inactive roster names used `text-white/22`, which failed WCAG AA. Bumped the inactive color to `text-white/65` (hover `/90`) and raised the neighbor row opacity from `0.42` to `0.6` so adjacent names are legible while the depth illusion stays.
  - `ContactSlide` — the inner `<main>` was nested inside the slide `<section>` (a landmark error and a per-slide `<main>` duplication). Changed to a `<div>`.
- **Mobile WebGL gating** — `prod.md` line 22 requires heavy effects to be desktop-only, but the deck was self-violating it. Gated behind `useIsMobile()` so they do not mount below 768px: `LightRays` + `Globe` (`TitleSlide`), `Hyperspeed` (`SkyrocketSlide`), `LightRays` (`ServicesSlide`), and `PrismaticBurst` (`ClientsSlide`). Desktop rendering is unchanged.
- **prefers-reduced-motion** — added `src/hooks/use-reduced-motion.tsx`. Wired into: the deck `scrollTo` in `Index.tsx` (smooth → instant) plus the container `scroll-smooth` class, the `OurTeamSlide` roster auto-advance (pauses), and `CardSwap` (a new `reduceMotion` prop snaps cards into place with ~0s tweens instead of animating, but keeps cycling so back-card content stays reachable). The broad anime.js / GSAP entrance timelines were intentionally left ungated for now — see Known Issues.
- **Slide-mount black flash** — `Index.tsx` `SlideFallback` was an empty black `section`; it is now a soft branded skeleton (faint teal radial). `SLIDE_MOUNT_RADIUS` was deliberately kept at `0` to respect `prod.md` line 23 ("mount only the active slide"); the skeleton removes the flash without keeping offscreen WebGL alive.
- **OG image** — `index.html` `og:image` / `twitter:image` no longer point at an external placeholder; they use local `/favicon.png`. This is a square stopgap, not a true 1200×630 social card.

**Verification:** `npm run lint` passes with 0 warnings. `npm run build` passes; only the known `vendor-lanyard` chunk-size warning remains. Browser/visual approval remains with the user per standing preference.

### Session 22 visual polish and cleanup

- **Cover** — globe centered and clipped to the top half only; badges enlarged/aligned with tighter Meta and Google crops; `OWLSURF DIGITAL` restored; top-right `Credentials / 01` removed; logo slightly enlarged.
- **Services** — first `Brand & Story` vertical now uses card illustrations in the right column of the moving CardSwap cards; other verticals are unchanged text-only cards.
- **Case studies** — Mitsui and Raychem have additional WebP slideshow creatives; Baxsaa/CultFit/GirlUp/CTP/VNT/Raychem use shared Mitsui-style `CaseStudyLayout`.
- **Contact** — footer contact row/copyright/logo alignment tightened.
- **Our Team** — left name roulette smoothed/aligned; duplicate lanyard names removed; lanyard badge avatar crop centered; field/title now replaces the name on the badge.
- **Cleanup** — removed stale `industrial-engineer-slide-2.png` and `lanyard/lanyard.png`; uninstalled unused `@gsap/react`, Radix slot/toast/tooltip, and `class-variance-authority`; cleaned lint blockers in visual helpers/config.

### VPS/domain migration docs (Session 20)

- **Migration guide** (`docs/vps-domain-migration.md`) — documents the static Vite production model, DNS checklist, VPS prerequisites, `npm ci` / `npm run build`, Nginx setup, TLS via Certbot, SPA fallback, cache policy, smoke tests, rollback shape, and notes not to serve the Vite dev server publicly.
- **Dependency/runtime notes** (`docs/dependencies.md`) — documents npm as the deployment package manager, `package-lock.json` as the server lockfile, Node 22 via `.nvmrc`, dependency groups, optional `sharp` requirement for image conversion, static build output, Vite hosting details, and files that should never be exposed from the server root.
- **Deploy examples** (`deploy/README.md`, `deploy/nginx-site.conf.example`, `deploy/Caddyfile.example`) — provide static hosting examples for Nginx and Caddy with React Router fallback and cache headers.
- **Config breadcrumbs** (`.nvmrc`, `.env.example`) — pin the documented Node target to 22 and make clear that the app currently has no required environment variables. Future public browser-safe values should use `VITE_`; private secrets must not.
- **README pointer** (`README.md`) — points maintainers to the migration docs and deploy examples.
- **Verification approach** — `git diff --check` passed, then `npm run build` passed before push. Build output still shows the known large `vendor-lanyard` warning and stale Browserslist data notice.

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

Session 22 removed the previously noted unused Radix dependencies, `@gsap/react`, and `class-variance-authority`, then tightened the manual chunk lists accordingly.

## Files Touched (Session 27)

Mobile polish on slides 2 and 4 + deploy hardening:
- `src/components/slides/SkyrocketSlide.tsx` — mobile breathing room, sector marquee, two-column buyer-outcomes grid
- `src/components/slides/ServicesSlide.tsx` — mobile `isMobile` branch: two-row segmented category bar, 3.5s auto-advance, numbered titles-only stepper, `mobileServices` 5->3 consolidation map
- `src/index.css` — `who-sector-marquee` and `sv-step-in` keyframes
- `prod.md`, `context.md`, `handoff.md` — Session 27 push-prep updates
- `.github/workflows/deploy.yml` — webhook `curl` retry flags staged in the working tree but NOT in this commit (PAT lacks `workflow` scope)

## Files Touched (Session 26)

Live mobile polish and the requested desktop cover headline change:
- `src/components/slides/TitleSlide.tsx` — rotating headline pills, mobile wordmark/heading/logo/badge alignment, shiny case-study CTA
- `src/components/ui/word-rotate.tsx` — new Anime.js word-rotation component with dynamic width
- `src/components/ui/animated-shiny-text.tsx` — new local shiny-text CTA primitive
- `src/components/slides/SkyrocketSlide.tsx` — Slide 2 buyer-outcome copy, compact mobile layout, teal serif headline accents
- `src/components/slides/OurTeamSlide.tsx` — Anime.js roster/card animation, mobile card/title cleanup, heading/rule spacing
- `src/components/slides/ClientsSlide.tsx` — proof-client heading/slider alignment, removed market notes, speed bump
- `context.md`, `prod.md`, `handoff.md` — push-prep continuity updates

## Files Touched (Session 25)

Hallmark and global design:
- `design.md`
- `tokens.css`
- `.hallmark/preflight.json`
- `.hallmark/log.json`
- `src/index.css`

Visual/content polish:
- `src/components/slides/TitleSlide.tsx`
- `src/components/slides/SkyrocketSlide.tsx`
- `src/components/slides/ServicesSlide.tsx`
- `src/components/slides/ClientsSlide.tsx`
- `src/components/slides/ContactSlide.tsx`
- `src/components/PillNav.tsx`
- `src/styles/PillNav.css`
- `src/components/ParallaxCardSlider.tsx`
- `src/components/slides/CaseStudyLayout.tsx`
- `src/components/slides/CaseStudySlide.tsx`
- `src/components/slides/BaxsaaCaseStudy.tsx`
- `src/components/slides/CultFitCaseStudy.tsx`
- `src/components/slides/GirlUpCaseStudy.tsx`
- `src/components/slides/CTPCaseStudy.tsx`
- `src/components/slides/VNTCaseStudy.tsx`
- `src/components/slides/RaychemRPGCaseStudy.tsx`

Docs:
- `context.md`
- `prod.md`
- `handoff.md`

## Files Touched (Session 24)

Mobile-only layout fixes (desktop unchanged, screenshot-verified):
- `src/components/slides/ServicesSlide.tsx` — mobile renders a readable service list instead of the off-screen `CardSwap`; pillars become a horizontal-scroll chip row; compacted heading/paddings; count badge hidden on mobile
- `src/components/slides/OurTeamSlide.tsx` — static badge card (avatar + name + title) on mobile via `useIsMobile()`; lanyard desktop-only; roster height 286px on mobile
- `src/components/slides/SkyrocketSlide.tsx` — top-aligned + compacted spacing + smaller headline; differentiator cards become a horizontal swipe row on mobile
- `src/components/slides/ClientsSlide.tsx` — heading + logo rows centered as a group on mobile (no empty void); smaller mobile heading
- `scripts/mobile-shots.mjs` — new Playwright mobile/desktop screenshot harness
- `package.json`, `package-lock.json` — `playwright` added as a devDependency (kept for future visual passes); builder-branded dev tagging plugin removed
- `.gitignore` — ignore `scripts/_shots/` screenshot output
- `prod.md`, `context.md`, `handoff.md` — Session 24 updates

Builder/scaffolding de-branding (same session):
- `vite.config.ts` — removed the builder-branded dev tagging plugin import + usage (and the now-unused `mode` arg)
- `package.json`, `package-lock.json` — uninstalled the builder-branded dev tagging plugin
- deleted `bun.lock` and `bun.lockb` — stale (repo uses npm); they were the last files carrying the scaffolding-tool name
- `README.md` — rewritten to accurately describe the current architecture (the old one still referenced the deleted `ProfileCard`/`Radar` team slide and stale lint state)
- doc mentions of the external OG placeholder reworded in `prod.md` / `context.md` / `handoff.md`

## Files Touched (Session 23)

Accessibility + performance hardening:
- `src/hooks/use-reduced-motion.tsx` — new `usePrefersReducedMotion` hook
- `src/pages/Index.tsx` — reduced-motion scroll + conditional `scroll-smooth`; soft branded `SlideFallback` skeleton (mount radius kept at 0)
- `src/components/PillNav.tsx` — removed fake menubar roles; `aria-current`; hamburger `aria-expanded` / `aria-controls`; mobile menu Escape-close + focus management
- `src/components/slides/ServicesSlide.tsx` — WAI-ARIA tablist/tab/tabpanel + keyboard nav; mobile gating of `LightRays`; `CardSwap reduceMotion` wiring
- `src/components/slides/OurTeamSlide.tsx` — roster contrast fix; reduced-motion auto-advance pause
- `src/components/slides/TitleSlide.tsx` — mobile gating of `LightRays` + `Globe`
- `src/components/slides/SkyrocketSlide.tsx` — mobile gating of `Hyperspeed`
- `src/components/slides/ClientsSlide.tsx` — mobile gating of `PrismaticBurst`
- `src/components/slides/ContactSlide.tsx` — `<main>` → `<div>` landmark fix
- `src/components/ui/CardSwap/CardSwap.jsx` — new `reduceMotion` prop (instant snap, keeps cycling)
- `index.html` — OG/Twitter image swapped off an external placeholder to local `/favicon.png`
- `prod.md`, `context.md`, `handoff.md` — Session 23 updates

## Files Touched (Session 22)

Visual/content polish:
- `src/components/slides/TitleSlide.tsx` — centered clipped globe; larger aligned partner badge strip; `OWLSURF DIGITAL`; removed top-right credentials label; slightly larger logo
- `src/components/slides/ServicesSlide.tsx` — first service vertical two-column card body with right-side SVG illustrations
- `src/components/slides/CaseStudyLayout.tsx` — new shared Mitsui-style case-study layout
- `src/components/slides/BaxsaaCaseStudy.tsx`, `CultFitCaseStudy.tsx`, `GirlUpCaseStudy.tsx`, `CTPCaseStudy.tsx`, `VNTCaseStudy.tsx`, `RaychemRPGCaseStudy.tsx` — moved to shared case-study layout
- `src/components/slides/CaseStudySlide.tsx`, `src/components/slides/RaychemRPGCaseStudy.tsx` — added Mitsui/Raychem extra WebP slideshow creatives
- `src/components/blocks/FlyonFooter.tsx`, `src/components/slides/ContactSlide.tsx` — footer alignment cleanup
- `src/components/slides/OurTeamSlide.tsx`, `src/components/ui/Lanyard/Lanyard.jsx` — smoother name roulette; lanyard avatar centering; role/title drawn on badge instead of name

Assets/dependencies/verification cleanup:
- `src/assets/badge-meta-business-partner.png`, `src/assets/badge-google-partner.png` — tighter badge crops
- `src/assets/mitsui-extra-1.webp`, `mitsui-extra-2.webp`, `mitsui-extra-4.webp`, `mitsui-extra-5.webp` — added Mitsui slideshow creatives
- `src/assets/raychem-extra-1.webp`, `raychem-extra-2.webp`, `raychem-extra-3.webp` — added Raychem slideshow creatives
- `src/assets/service-illustration-brand-story.svg`, `service-illustration-video.svg`, `service-illustration-design-system.svg`, `service-illustration-research.svg`, `service-illustration-thought-leadership.svg` — added first-service vertical illustrations
- Deleted stale assets: `src/assets/industrial-engineer-slide-2.png`, `src/assets/lanyard/lanyard.png`
- `package.json`, `package-lock.json`, `vite.config.ts` — removed unused dependencies and stale manual chunk entries
- `src/components/LightRays.tsx`, `src/components/ui/Hyperspeed/Hyperspeed.tsx`, `src/components/ui/PrismaticBurst/PrismaticBurst.tsx`, `src/components/ui/globe.tsx`, `src/vite-env.d.ts`, `tailwind.config.ts` — lint/type cleanup
- `prod.md`, `context.md`, `handoff.md` — push handoff/context updates

## Files Touched (Session 21)

Cover + Who We Are redesign, Our Team polish, CardSwap fix:
- `src/components/slides/TitleSlide.tsx` — hook-led cover redesign; removed info columns; centered CTA + centered partner badge strip; trimmed badge heights; added hero headline, seam, and brand lockup
- `src/components/slides/SkyrocketSlide.tsx` — full-width Who We Are redesign over Hyperspeed; `Hard to explain. / Easy to choose.` headline (cursive teal accents); industries rail without numbers; full-width differentiator-card row; removed engineering illustration import and the `HighlightPhrase` component
- `src/components/slides/OurTeamSlide.tsx` — removed roster index numbers; deferred lanyard mount via `showLanyard` to fix scroll-in jank
- `src/components/ui/CardSwap/CardSwap.jsx` — swap loop moved from `setInterval` to `gsap.delayedCall` + `gsap.ticker.wake()` to fix the freeze-until-interaction bug
- `prod.md`, `context.md`, `handoff.md` — Session 21 updates

## Files Touched (Session 20)

VPS/domain migration documentation only:
- `.nvmrc` — documents Node 22 as the migration build target
- `.env.example` — documents that no environment variables are currently required and warns against putting secrets in `VITE_` variables
- `README.md` — links to the migration docs and deploy examples
- `docs/vps-domain-migration.md` — VPS/domain migration guide for static Vite hosting
- `docs/dependencies.md` — dependency, runtime, build, and hosting notes
- `deploy/README.md` — explains the deploy config examples
- `deploy/nginx-site.conf.example` — Nginx static SPA config example
- `deploy/Caddyfile.example` — Caddy static SPA config example
- `context.md` — Session 20 log and file-map updates
- `handoff.md` — Session 20 handoff update requested by the user

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

- Session 25: `git diff --check`, `npm run lint`, and `npm run build` pass before push. Build still reports stale Browserslist/caniuse-lite data and the known large `vendor-lanyard` chunk. Browser/screenshot verification was skipped per the user's standing preference; visual approval remains with the user.
- Session 22: asset filename scan reports no obvious unused files in `src/assets`; `find src/assets -type f -size +1000k` shows only the existing lanyard `card.glb` above 1 MB; `npm run lint` passes; `npm run build` passes. Build still reports stale Browserslist/caniuse-lite data and the known large `vendor-lanyard` chunk. `npm uninstall` reported 17 dependency advisories still present; audit remediation was not part of this visual push.
- Session 21: `npm run build` passed before push. Browser visual approval remains with the user per standing preference. CardSwap fix verified by reasoning about GSAP ticker behavior; the user confirms motion in the live browser.
- Session 20 documentation-only pass: `git diff --check` passed, then `npm run build` passed before push. Build output still shows the known large `vendor-lanyard` warning and stale Browserslist data notice.
- `npm run build` passes after copy edits and after orphan-file deletes.
- `npm run build` passes before the Session 14 lanyard/workflow push.
- `npm run build` passes before the Session 15 case-study motion push.
- `npm run build` passes before the Session 16 deck-wide motion cleanup push.
- `npm run build` passes before the Session 17 visual asset push.
- `npm run build` passes before the Session 18 conversion polish push.
- `file src/assets/raychem-creative-1.webp src/assets/raychem-creative-2.webp 'src/assets/Raychemcasestudy 3.webp'` confirms all three Raychem assets are WebP images at 1080x1440.
- `rg -n "scan-line|glow-orbit" src/components/slides` returns no matches after Session 16 cleanup.
- Visual screenshot capture was intentionally skipped per the original handoff policy (the user prefers to judge browser output manually).

## Known Issues / Next Things To Do

Highest-priority follow-ups, in two stacks: the UX audit P0 batch (Session 11, still pending) and the UI design plan (Session 12, parked but ready).

Most of the P0 UX-audit batch was cleared in Session 23. Remaining and follow-ups:

1. **Accessibility — done in Session 23.** PillNav menubar roles, Services tab semantics + keyboard, mobile-menu Escape/focus, and roster contrast are fixed. Follow-up: re-run an automated a11y audit (axe / Lighthouse) to confirm focus order and the teal-on-dark active-state contrast.
2. **Mobile WebGL gating — done in Session 23** for `Hyperspeed`, `LightRays`, `PrismaticBurst`, and `Globe`. Gate any new heavy effect the same way.
3. **`prefers-reduced-motion` — partially done.** The hook gates the deck scroll, the roster auto-advance, and CardSwap. Still open: the broad anime.js / GSAP entrance timelines in every slide are not yet gated. Add the hook (or a shared reveal wrapper) to skip or shorten those entrances under reduced motion.
4. **Slide mount resilience — partially done.** The black flash is fixed via the skeleton `SlideFallback`. `SLIDE_MOUNT_RADIUS` was deliberately left at `0` to honor `prod.md` line 23 ("mount only the active slide"). If the owner accepts the offscreen-WebGL tradeoff, revisit a desktop-only radius bump with explicit offscreen pause/unmount of canvases.
5. **OG image — stopgap done.** `index.html` now uses local `/favicon.png`. Replace with a true 1200×630 OwlSurf social card.
6. **`<main>` landmark — done in Session 23** (`ContactSlide` now uses `<div>`).
7. **Mobile layout — done in Session 24.** Services (cards were off-screen), Our Team (clipped lanyard → static badge card), Who We Are (clipped headline/differentiators), and Clients (empty void) are fixed mobile-only; desktop unchanged and screenshot-verified. Follow-up: case-study creative carousels bleed off the bottom edge on phones by design (`overflow-hidden`); revisit only if the owner wants them fully contained. Landscape phone was not exhaustively tuned (deck is portrait-first).

### Case-study layout carry-over

- Mitsui remains the custom proof-strip + bottom carousel slide. Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG now share `CaseStudyLayout`. Keep future broad case-study formatting changes in the shared layout when possible.
- The Mitsui slider right-edge bleed only works because the section has `overflow-hidden`. If a future change removes that, retest Mitsui at common laptop widths (1280, 1440) so the bleed does not leak into the next slide.

### Session 12 — UI design plan (parked)

See `ui-design-plan.scratch.md` (local only). Three phases, ~3 hrs / 4 hrs / 1 day respectively. Pick up by phase, not piecemeal. Phase 1 is the lowest-risk batch of eight single-line edits.

Other open project items carried over from earlier sessions:
- Production now runs on a VPS at https://www.owlsurf.media via push-to-deploy (see "Deployment pipeline" below), not Vercel. The old Vercel item is retired.
- `logo-main.jpg` is still a JPG; should be WebP or SVG.
- Vishnu still reuses Pankaj's avatar until a dedicated Vishnu avatar is supplied.
- `vendor-lanyard` remains a very large chunk (~3MB minified / ~1MB gzip); the chunk is isolated but not reduced in this session.
- `npm audit` still reports 17 dependency advisories after the unused-package cleanup; review separately from the visual push.

### Deployment pipeline + 2026-06-04 missed-deploy incident

Push to `main` auto-deploys to https://www.owlsurf.media in ~10-60s: GitHub Actions (`.github/workflows/deploy.yml`) POSTs the token-gated `/deploy` webhook → VPS `deployment/server.js` spawns `deployment/deploy.sh` detached → `git reset --hard origin/main` + `npm ci` + `npm run build` + `pm2 restart heyowlsurf`. Full mechanics + recovery runbook are in `context.md` ("Deployment Pipeline & Operations"); the operational contract is in `prod.md` section 4.

**Incident 2026-06-04:** push `e930531` didn't go live. Push + Actions were fine; the deploy step failed with `curl: (28) ... port 443 ... Timeout` — the webhook never reached the VPS (transient unavailability, likely build memory pressure from `vendor-lanyard`). `deploy.sh` never ran, so the site stayed on the old build. Recovered with `gh run rerun 26956763977` once the box was reachable; site returned `200`.

**Hardening done:** added `--retry 5 --retry-all-errors --retry-delay 10` to the webhook `curl` so brief VPS blips no longer fail the deploy. **Still open:** find the root cause of the VPS going unreachable during builds (consider building to a temp dir + atomic swap, or a swapfile / build memory cap on a small box). Deploy failures remain silent (no alerting) — consider adding a notification.

### Security flag carried from the audit

`.git/config` contains a GitHub PAT in plaintext in the remote URL. **Rotate the token and move to SSH or git credential helper** before any wider repo access. Not blocking this push, but should be the first follow-up.

## Current Workspace Notes

Intended files for the Session 25 Hallmark credentials commit:
- slide/source changes listed under `Files Touched (Session 25)`
- Hallmark files: `.hallmark/`, `design.md`, `tokens.css`
- doc updates: `prod.md`, `context.md`, `handoff.md`

Unrelated untracked items that should remain unstaged unless asked:
- `.agents/`
- `.claude/`
- `carousel-b2b-marketing.html`
- `our-team-slide-single-lanyard.png`
- `skills-lock.json`

## Push Gate

Before pushing:
1. `handoff.md`, `context.md`, `prod.md` reflect the current architecture and copy.
2. `npm run build` passes.
3. Stage only intended files.
4. Commit.
5. Push `main`.
