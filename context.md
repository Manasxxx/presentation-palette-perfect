# Project Context — Presentation Palette Perfect

> Running log of all meaningful changes, rationale, and current state. Updated on every push.
> Read this before touching any file — it tells you what exists, why it was built that way, and what's been tried.

---

## Current State (as of last push)

**Live URL:** Was on Vercel (domain broken — needs reconnect). GitHub: `Manasxxx/presentation-palette-perfect`.
**Dev:** `npm run dev` → `localhost:8080` (port hardcoded in `vite.config.ts`).
**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Anime.js + GSAP + shadcn/ui (with most shadcn primitives now removed as dead code).
**Latest working state:** Session 18 added small conversion and route-polish details: cover credibility badges, a Mitsui web-preview block, a compact footer on Contact, and a branded 404 page for unknown routes outside the slide matrix. The Clients slide is back on the original two-line `LogoLoop` carousel after a brief shuffle-carousel experiment was rejected. Session 17's visual asset updates remain in place: animated cover logo, right-shifted Who We Are image, and refreshed Raychem WebP creatives.

---

## Session Log

### Session 18 — Cover badges, Mitsui web preview, Contact footer, branded 404

**What was done:**

**1. Cover credibility badges** (`src/components/slides/TitleSlide.tsx`)
- Added four small badges in the lower cover zone: Meta verified agency, Google partner agency, LinkedIn B2B ads partner, and HubSpot growth partner.
- Badges animate in with Anime.js and preserve the existing 3-zone cover structure.

**2. Mitsui web preview block** (`src/components/ai-elements/WebPreview.tsx`, `src/components/slides/CaseStudySlide.tsx`)
- Added local AI Elements-style primitives: `WebPreview`, `WebPreviewNavigation`, `WebPreviewUrl`, and `WebPreviewBody`.
- Mounted a compact preview below Mitsui's stats only.
- The preview uses inline `srcDoc` markup rather than a live external iframe so it is stable and not affected by embedding restrictions.

**3. Contact footer block** (`src/components/blocks/FlyonFooter.tsx`, `src/components/slides/ContactSlide.tsx`)
- Added a compact FlyonUI-inspired footer block at the bottom of the Contact slide.
- Used the supplied FlyonUI logo image URL and existing `lucide-react` social icons.
- Did not install Tailwind 4 Iconify plugins because this project is Tailwind 3 and the local icon set already covers the social icons.

**4. Branded 404 route page** (`src/pages/NotFound.tsx`)
- Replaced the default 404 with a branded OwlSurf 404 page inspired by Untitled UI's 404 examples.
- The existing catch-all route in `App.tsx` already handled unknown paths, so the slide matrix was not touched.

**5. Clients carousel revert**
- Reverted the one-row/four-block shuffle carousel experiment.
- Clients remains on the two-line React Bits `LogoLoop` carousel with existing mask fade and offscreen RAF pause behavior.

**Rationale:**
- The user wanted the new elements added to specific places without changing the deck's core slide order or navigation.
- Components from referenced libraries were adapted locally to avoid introducing dependency churn into the Tailwind 3 setup.
- The 404 page belongs to the website route layer, not the presentation slide matrix.

**Verification:**
- `npm run build` passed before push.
- Visual/browser verification was skipped per user preference.

### Session 17 — Cover logo component, Slide 2 image shift, Raychem WebP refresh

**What was done:**

**1. Cover logo replaced with animated SVG component** (`src/components/OwlSurfLogo.tsx`, `src/components/slides/TitleSlide.tsx`)
- Added a reusable `OwlSurfLogo` React component based on the user-supplied SVG animation file from Downloads.
- Swapped the cover slide's `logo-main.jpg` image for `OwlSurfLogo` inside the existing right-side circular logo treatment.
- Preserved the current placement, external link, ring treatment, glass card wrapper, size classes, and clip-path reveal animation.

**2. Who We Are image shifted right** (`src/components/slides/SkyrocketSlide.tsx`)
- Moved the desktop right-side image panel from `right-0` to `right-[-8%]`.
- Kept the image scale, object positioning, opacity, blend mode, and Anime.js entrance unchanged.

**3. Raychem creatives replaced with converted WebP assets** (`src/assets/*.webp`, `src/components/slides/RaychemRPGCaseStudy.tsx`)
- Converted these three files from `~/Downloads/Client Projects/Raychem RPG/` to WebP and replaced the existing site assets:
  - `Raychem PowerGrid.jpeg` -> `src/assets/raychem-creative-1.webp`
  - `Raychem Invisible Infrastructure.jpeg` -> `src/assets/raychem-creative-2.webp`
  - `Raychem 1 3am India.jpeg` -> `src/assets/Raychemcasestudy 3.webp`
- Kept the Raychem case study on its existing `ParallaxCardSlider` layout with all three refreshed creatives.
- Updated the slider alt text to describe each creative more clearly.

**Rationale:**
- The cover needed to use the supplied OwlSurf mark without disturbing the established first-slide composition.
- The Who We Are illustration needed to sit more aggressively on the right edge after live visual feedback.
- Raychem needed the current creative files from Downloads, but source assets in the product tree should remain WebP per `prod.md`.

**Verification:**
- `file` confirms all three Raychem assets are WebP images at 1080x1440.
- `npm run build` passed before push.
- Browser screenshots and browser verification were skipped because the user explicitly prefers to provide visual feedback manually.

### Session 16 — Deck-wide motion cleanup + OwlSurf teal scale

**What was done:**

**1. Anime.js extended beyond case studies** (`src/components/slides/TitleSlide.tsx`, `SkyrocketSlide.tsx`, `OurTeamSlide.tsx`, `ServicesSlide.tsx`, `ClientsSlide.tsx`, `ContactSlide.tsx`)
- Added stronger entrance motion to the cover, Who We Are, Our Team, Services, Clients, and Contact slides.
- Reused the case-study feel where it worked: heading spring, accent-word blur-to-sharp motion, card/lanyard/logo overshoot, and icon pulses.
- Removed the scan-line sweep and circular glow-orbit blob from every slide after visual feedback that those elements were not wanted.

**2. Case-study motion refined** (`src/components/slides/*CaseStudy*.tsx`)
- Kept heading, accent-word, creative/slider, and stat/icon motion.
- Removed the `.cs-scan-line` and `.cs-glow-orbit` animation blocks and JSX elements from all seven case-study slides.

**3. OwlSurf teal scale added** (`src/index.css`, `tailwind.config.ts`)
- Added the supplied teal scale: `#BAFDFD`, `#61F5F5`, `#4BC2C2`, `#43AFAF`, `#2C7A7A`, `#1F5C5C`, `#072222`, `#031414`.
- Kept `#4BC2C2` as the primary OwlSurf teal and mapped light/dark aliases to the new scale.

**Rationale:**
- The deck needed more visible Anime.js motion, but the broad line sweep and round glow blob were reading as extra decoration. The motion is now attached to content rather than floating above it.
- The design system needed to match the provided OwlSurf palette instead of only carrying a three-color teal set.

**Verification:**
- `rg -n "scan-line|glow-orbit" src/components/slides` returns no matches.
- `npm run build` passed before push.

### Session 15 — Case-study Anime.js motion system

**What was done:**

**1. Shared case-study motion language applied** (`src/components/slides/*CaseStudy*.tsx`)
- Applied the Mitsui motion treatment across all seven case-study slides: Mitsui, Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG.
- Each case study now uses a stronger heading spring, accent-word slide-in with blur-to-sharp, creative/slider overshoot, and stat icon pulse where stat rows exist. The earlier brand-color scan line and soft glow orbit were removed in Session 16.
- Kept layouts and copy intact. This pass was motion-only, not a redesign pass.

**2. Next-session plan captured**
- Next session should extend the same Anime.js motion language to the remaining non-case-study slides: Cover, Who We Are, Our Team, Services, Clients, and Contact.
- The next pass should centralize repeated motion helpers where practical instead of copying bespoke animation blocks into every slide.
- Add or reuse a `prefers-reduced-motion` gate before broadening the motion system deck-wide.

**Rationale:**
- The first Mitsui motion pass was too subtle, so the treatment was made visibly stronger and then propagated across the case-study section for consistency.
- Keeping the case-study motion consistent now makes it easier to build a unified whole-deck motion system in the next session.

**Verification:**
- `npm run build` passed before push.
- The live dev server was running at `http://localhost:8080/` with Vite HMR updates.

### Session 14 — Lanyard band sharpness + push-gated handoff

**What was done:**

**1. Our Team lanyard band rendering sharpened** (`src/components/ui/Lanyard/Lanyard.jsx`)
- Kept the OwlSurf band mark upright in the generated canvas texture.
- Increased the generated band texture from 2048x512 to 8192x2048 via `BAND_TEXTURE_SCALE = 4`.
- Increased the drawn mark size from 320 to 392 logical pixels before scaling, so more source detail survives on the narrow MeshLine strap.
- Switched the Canvas DPR from `[0.75, 1]` desktop max to `[1, 2]`, with mobile capped at `1.25`, and enabled antialiasing. This is intentionally allowed here because the lanyard is a foreground hero object rather than an ambient background.
- Disabled mipmap generation on the generated strap texture and used `LinearFilter` / `NearestFilter` to avoid extra softening on the repeated strap mark.
- Set the MeshLine texture repeat to `[-4, 1]`, matching the React Bits lanyard pattern more closely than the previous `[-0.9, 1]`.

**2. Handoff workflow narrowed to push only** (`AGENTS.md`, `handoff.md`)
- Updated the repo workflow language so `handoff.md` is a push handoff file, not a session-end diary.
- New rule: update `handoff.md` only before a push. Do not update it at session end, during context clearing, or during ordinary debugging unless a push is about to happen.

**Rationale:**
- The user flagged that the OwlSurf mark on the strap was blurred and that prior fixes were not visually grounded enough. The actual render path was a generated canvas texture mapped through MeshLine, so the durable fix was to improve texture resolution, render DPI, texture filtering, and repeat behavior rather than distorting the logo artwork itself.
- The user also explicitly changed the repo workflow: handoff updates should not happen every session, only when preparing to push.

**Verification:**
- `npm run build` run before this push.
- Visual browser verification was limited by local Chrome opening on the profile picker during the session; final visual approval remains with the user in the live browser.

### Session 13 — Case-study redesign (Mitsui split, Baxsaa polished vertical)

**What was done:**

**1. `ParallaxCardSlider` extended with `cardWidth` prop** (`src/components/ParallaxCardSlider.tsx`)
- Added optional `cardWidth?: string` prop, default `"min(32vw, 340px)"` (unchanged behavior for the five untouched case studies).
- Replaced all internal literals (`getSlideStyle` width, desktop container width + height, per-slide card width) with the prop so every dimension scales coherently.

**2. Mitsui case study rebuilt as split layout** (`src/components/slides/CaseStudySlide.tsx`)
- Previous layout: vertical centered stack (heading, slider, horizontal pill row).
- New layout: `flex md:flex-row` with copy column DOM-first / slider DOM-second. Copy column is `shrink-0 md:w-[42%] lg:w-[38%]` so the slider's intrinsic width can't squeeze it. Slider column is `flex-1 min-w-0 self-center justify-start` so the slider anchors to the left edge of its column and lets its right edge bleed past the section bound, which is clipped by the section's `overflow-hidden`. This was a deliberate decision after iteration — the user wanted the parallax stack to read big and accepted right-edge clipping.
- Heading recipe applied: eyebrow `Case study 01` in Mitsui cyan (`193 100% 42%`) + `clamp(2.8rem,4.7vw,5.4rem) font-black uppercase` h2 with `Mitsui` (white) stacked above `Chemicals` (cyan gradient). Tagline below in `font-body` (Palanquin), `text-white/70`.
- Stat list switched from horizontal pill row to a vertical icon-circle + big-number + small-label list. Stats animate with staggered translateX slide-in.
- `cardWidth={isMobile ? undefined : "min(24vw, 320px)"}` on desktop — roughly +30% over the original default, which is what made the right-edge bleed happen.

**3. Baxsaa case study polished in place — vertical layout** (`src/components/slides/BaxsaaCaseStudy.tsx`)
- Kept the vertical centered architecture (heading top → 2-image grid → stat pills → SEO callout) but rebuilt every element to match the new case-study recipe.
- Heading: eyebrow `Case study 02` (maroon) + `clamp(2.6rem,4.6vw,5.2rem)` Montserrat black uppercase h2 with `The Baxsaa` (ink) + `Co.` (maroon gradient). Tagline in Palanquin at ink-muted color. Both lines centered.
- 2-image grid: bumped to `gap-6`, added a soft maroon drop shadow + 1px maroon-tinted ring. Removed the explicit `mb-5` since the parent now uses `gap-6 md:gap-8`.
- Stat pills: dropped `LiquidGlassCard` entirely, replaced with custom translucent pills (`backdropFilter: blur(8px)` + 1px maroon hairline border). Tighter padding, `font-black tracking-tight` value + 0.18em-tracked Palanquin label.
- SEO callout: dropped `LiquidGlassCard`, matched the new pill aesthetic. Promoted "SEO clean-up" to the eyebrow recipe (10px / 0.3em / maroon) and bolded the inline stat highlights with `font-black` instead of `font-bold`.
- Animation cleanup: `el.querySelectorAll(".cs-heading")` (eyebrow + h2) with stagger 80ms — the previous code only animated the first `.cs-heading` match, so when both eyebrow and h2 carried that class on the first pass of the Mitsui rewrite, the h2 stayed at opacity 0 (caught and fixed).

**4. prod.md case-study rule updated to allow both layouts**
- The original line was "Case studies: full-bleed creative on one side, stats on the other. Nothing else." which was prescriptive of the split layout.
- Now documents both layouts as valid choices and explains when each fits (split for image-rich cases, polished vertical when there's an additional element like the Baxsaa SEO callout to land).
- Added a sibling note to the unified heading recipe explaining how case studies adapt it (smaller clamp, per-case-study brand color, ink color flips per background).

**Rationale:**
- The user asked for Mitsui as a pilot and chose direction #1 (split) of three options. After Mitsui shipped successfully ("looks great"), they explicitly asked for direction #2 (polished vertical) for Baxsaa instead of templating the same split treatment across all seven. So the deck now intentionally carries two case-study layouts side by side.
- Mitsui's right-edge bleed was a deliberate trade-off: the parallax slider at +30% scale won't fit cleanly inside a half-column at common laptop widths. The user explicitly OK'd clipping the rightmost peeking card at the section bound rather than shrinking the slider back down.

**Verification:**
- Per a new project rule saved in personal memory this session, `npm run build`, screenshots, and any other "did it work" probes were intentionally NOT run. The user provides visual feedback themselves and considers automated verification token waste. Mentioned here so future sessions don't reintroduce the verify step.
- Visual checks (heading visibility regression caught from screenshot #1, slider overflow regression caught from screenshot #3) came directly from user-supplied screenshots.

### Session 12 — Cover/contact polish, audit-file cleanup, UI design review (parked)

**What was done:**

**1. Cover + contact copy refinements** (`src/components/slides/TitleSlide.tsx`, `src/components/slides/ContactSlide.tsx` — commit `1c2b908`)
- Cover wordmark sub-line: `Digital` → `B2B Marketing for complex markets`. Font size dropped from `clamp(1.25, 3.5vw, 3rem)` to `clamp(0.9, 1.6vw, 1.5rem)`, tracking bumped to `0.22em`, opacity moved to `text-white/75` so the longer phrase sits as a supporting line rather than competing with the OWLSURF wordmark.
- Cover Col 1: `B2B MARKETING / For the people who sell complex things` → `WHAT WE DO / B2B marketing for technical brands`.
- Cover Col 2 + Contact main heading kept as signature lines. Contact intro tagline: `For industrial, technical, and B2B brands ready to be understood faster.` → `For B2B brands ready to skip the noise.`

**2. Audit deliverable cleanup** (commit `1c2b908`)
- Session 11's commit `791cf83` accidentally bundled `ux-audit-report.html` and `ux-audit-report.pdf` into the product repo. These are working artefacts for the deck owner, not source, and should never have shipped. Removed from the tree.
- Added `ux-audit-report.*` and `*.scratch.*` to `.gitignore` so the same class of leak cannot happen again — any future `*.scratch.*` files are local-only by default.
- The two PDFs/HTML still exist in git history at commit `791cf83`. A force-push to scrub history was not done; if the user wants that later, it requires explicit go-ahead.

**3. UI design review** (parked, no source changes)
- Ran the `ui-design-review` skill against the upper deck (slides 1–5 + Contact) on 2026-05-25. Scored 69/100 (C+/B-).
- Top three issues: Slide 1 background over-stim (4 layers, self-violates `prod.md` "one full-bleed per slide" rule), CardSwap mobile overflow (`scale(1.3)` on 520×270 cards pushes past 375 px viewports), empty bottom whitespace on CardSwap cards after the Session 11 footer-band removal.
- Saved findings to `ui-design-plan.scratch.md` at repo root (gitignored via `*.scratch.*`). Three phases: Phase 1 = 8 single-line quick wins (~3 hrs), Phase 2 = composition pass (~4 hrs), Phase 3 = mobile rebuild (~1 day).
- The user explicitly wants to pace this work. To enforce a reminder at session-end, added a `SessionEnd` hook to `.claude/settings.local.json` (already gitignored via the `.claude/` parent) that prints a one-line reminder while the plan file exists. The hook auto-skips once the plan file is deleted.
- A project memory note was also added at `~/.claude/projects/-Users-manassrivastava/memory/project_owlsurf_ui_design_plan.md` so future sessions know to ask about the plan toward the end of a wrap-up.

**Verification:**
- `npm run build` passes after cover + contact edits.
- No tests added or removed in this session.

### Session 11 — UX audit, full copy rewrite, dead-code purge

**What was done:**

**1. IxDF UX audit of upper deck** (`ux-audit-report.html`, `ux-audit-report.pdf` at repo root)
- Holistic audit using IxDF's 7 Factors + 5 Usability Characteristics + 5 Interaction Dimensions.
- Scored 48/85 (D, 56%) overall, with Accessibility at 1/5 (critical) and Findable / Usable / Words / Time / Physical-Space all at 2/5.
- Produced P0–P3 issue list and three concrete redesign proposals (nav truth pass, motion-control + reduced-motion hook, slide-mount resilience).
- The audit also flagged a GitHub PAT exposed in the `.git/config` remote URL — flagged in `handoff.md` for rotation.

**2. Nav label rewrite** (`src/components/PillNav.tsx`)
- `Intro / Why Us / About / Services / Clients / Case Study / Contact` was lying about the deck — `Why Us` pointed at the Who We Are slide, `About` pointed at Our Team, etc.
- Updated to `Cover / Who We Are / Team / Services / Clients / Case Studies / Contact` so each label matches the slide it scrolls to.

**3. Full deck copy rewrite (3-voice mix, never rude)**
- The audit found every case-study subtitle followed the same agency-speak template (`Boosted/Drove/Amplified [thing] through strategic [tactic]`). All seven were rewritten to a `Who they are. What we did.` pattern in plain English.
- The repeating `[PILLAR] • B2B / Industrial` footer band on the Services CardSwap cards was removed (25 identical strings were noise).
- 25 service-card descriptions tightened; em-dashes and "Strategic / Amplified / Elevated / Powerful / Vibrant" removed; "MAJOR CLIENTS" → "OUR CLIENTS"; `Cult Fit Success` etc. → `Cult.fit` etc. with the gradient highlight now applied to a sub-brand fragment.
- Team designations were lower-cased on the second word for a more human feel: Harshit `Strategy & growth`, Sakshi `Client lead`, Manas `Digital strategy`, Sanskriti `Creative direction`, Pankaj `Build & ship`, Vishnu `Brand & identity`.
- Services pillars were renamed to recognisable B2B buyer language: `Brand & Story` / `Demand Gen` / `Discovery` / `Marketing Stack` / `AI & Autopilot` (was `Content & Creative / Reach & Activation / Search & Listening / Data & Tech / AI & Automation`).
- Title slide: eyebrow shortened from `Portfolio & Credentials` to `Credentials`; Col 1 body rewritten to `For the people who sell complex things`; Col 2 label `Built For` → `Made For`; CTA `Jump to Creatives` → `See case studies →`.
- Slide 2 Who We Are: kicker disambiguated to `B2B marketing for complex markets`; H2 declarative (`WHO WE / ARE.` instead of `WHO WE / ARE?`); body kept the signature `We translate technical depth into market momentum.` and added a smaller secondary line below: `For the marketing teams selling what engineers built.`; sectors eyebrow `Sectors We Serve` → `Where we work`.

**4. Dead-code purge** (16 files deleted)
- Slides: `TeamSlide.tsx` (orphan, never registered in `Index.tsx`).
- Components: `ProfileCard.jsx` + `.css`, `Radar.jsx` + `.css` (old team-slide implementation, replaced by the lanyard).
- UI primitives: `ui/SplitText.tsx`, `ui/marquee.tsx` (replaced by `LogoLoop`), `ui/toast.tsx`, `ui/tooltip.tsx` (all never imported).
- Assets: `client-extra.png` (placeholder), `client-dehn.png`, `client-kuraray.png`, `client-mitsui.png`, `logo-icon.png`, `Raychemcasestudy 1.webp`, `Raychemcasestudy 2.webp` (never imported anywhere in `src/`).
- `vite.config.ts` `manualChunks` still names `@radix-ui/react-slot/toast/tooltip` and `@gsap/react` under `vendor-ui` / `vendor-gsap`. These packages are no longer imported anywhere in `src/` after the deletes and are candidates for a future `npm uninstall` pass, but the dependency removal was intentionally not done in this session to keep the change set focused.

**Verification:**
- `npm run build` passes after the copy edits and after the orphan-file deletes.
- `npm test` / `npm run lint` were not re-run; the pre-existing visual-component lint debt is unchanged.

### Session 10 — Our Team Single Lanyard + Global Idle Nav

**What was done:**

**1. Our Team slide rebuilt around one live lanyard** (`src/components/slides/OurTeamSlide.tsx`, `src/components/ui/Lanyard/`)
- Replaced the old six-card/Radar presentation with a compact left roster and one right-side React Bits lanyard.
- The roster auto-advances every 5 seconds; clicking a row makes that employee active immediately.
- Inactive employees are deliberately muted/desaturated, while the active row keeps full color and the progress rule.
- The lanyard component remains mounted while the active person changes, so the physics/WebGL scene is not remounted on each shuffle.

**2. Badge and strap tuning**
- The lanyard uses the provided OwlSurf `owl-icon.png` on a black branded strap.
- The badge avatar is rendered as its own high-resolution front-facing plane, avoiding the broken GLB-card UV placement that previously misplaced faces.
- The badge body uses a flat dark material to remove the single sparkle/glint seen during review.
- Lanyard hardware is OwlSurf teal and the strap is intentionally thick enough to read as a band.

**3. Global navigation behavior** (`src/pages/Index.tsx`, `src/components/PillNav.tsx`)
- The header nav is no longer tied only to the case-study range.
- It becomes visible during mouse, wheel, touch, scroll, or keyboard activity, then hides after 1600ms of inactivity.
- Logo, nav items, and mobile hamburger animate upward as they hide, and stagger back down when activity resumes.

**4. Stale/inefficiency cleanup**
- Removed an unused `materials` destructure from `Lanyard.jsx`.
- Replaced a mobile-menu `navItems.indexOf(item)` lookup with the map index in `PillNav.tsx`.
- Moved shared lanyard dependencies (`three`, React Three Fiber, Drei, Rapier, MeshLine) into a separate `vendor-lanyard` manual chunk so the lazy `OurTeamSlide` chunk does not carry the entire 3D/physics stack alone, and the older `vendor-3d` chunk does not load Rapier for unrelated effects.
- Updated `handoff.md`, `context.md`, and `prod.md` so they no longer describe the old six-card/Radar team slide as the current architecture.

**Verification:**
- `npm run build` passes.
- `npm test` passes.
- Visual screenshot capture was intentionally not used in this pass because the user asked not to screenshot.

### Session 1 — Setup + Design System + Title Slide Redesign

**What was done:**

**1. Dev environment wired**
- `.claude/launch.json` created pointing to port 8080 (Vite's hardcoded port in config).
- Build confirmed clean before any changes.

**2. OwlSurf Design System applied** (`src/index.css`, `tailwind.config.ts`)
- Fonts: Montserrat (Google Fonts, display/H1/UI), Lora italic (local `.ttf`, H2 only), Palanquin (local `.ttf`, body/descriptions).
- Font files copied to `public/fonts/`: `Lora-Italic-VariableFont_wght.ttf`, `Palanquin-Regular/Medium/SemiBold.ttf`.
- Bug found + fixed: global `span:not([class])` rule in `index.css` was forcing Palanquin onto the bare `OWL` span. Fixed by adding `className="font-sans"` to both OWL and SURF spans explicitly.
- CSS custom properties added: `--owl-teal` (#4BC2C2), full spacing scale (4px base), radii tokens, shadow tokens (including `--shadow-accent` teal glow), motion tokens (`--ease-default`, `--duration-*`).
- Tailwind `owl.*` colors updated from broken `hsl(var(--owl-black))` format to direct hex values.
- Old font imports (Roboto, Yantramanav, Trykker) removed — replaced by OwlSurf stack.

**3. Title slide (TitleSlide.tsx) — full redesign**
- Layout: 3-zone vertical (`justify-between`) — eyebrow top, wordmark+logo center, info+button bottom.
- Wordmark: `OWLSURF` left-aligned, OWL white + SURF teal, Montserrat 900. `DIGITAL` below in Palanquin medium, spaced tracking.
- Logo: right side, `<a>` linking to owlsurf.com. LiquidGlassCard wrapper retained. 3 concentric teal rings animate in.
- Info columns: 2-col grid — "B2B Marketing / For technical & industrial brands" + "Built For / Long cycles…".
- Jump to Creatives button: moved into bottom flex zone (was absolute, was overlapping info columns). Arrow above it.
- Removed: Google/Meta partner badges, centered shimmer letter animation, www.owlsurf.com text link (replaced by clickable logo), SCROLL indicator (no room at bottom).
- Globe: retained as ambient background, repositioned bottom-left, opacity 25%.
- LightRays: retained, opacity reduced to 30%.

**Rationale for 3-zone layout:** Matches the reference design provided by user (PowerPoint slide aesthetic). `justify-between` with fixed `py-14` padding pins each zone to its region without JS. Logo `items-center` with the wordmark flex row aligns them vertically without needing explicit height calculations.

**4. Scroll smoothness pass**
- `scroll-snap-type: mandatory` kept (reverted from `proximity` — caused jitter).
- `scroll-snap-stop: always` kept (reverted after removing caused jitter).
- Removed `contain: layout style paint` from `.slide` — was breaking absolute positioning inside slides.
- Removed `will-change: transform` from `.slide` — promoting all slides to GPU layers simultaneously causes VRAM pressure and jank.
- rAF-throttled scroll handler in `Index.tsx` — prevents React re-render on every scroll pixel.
- SlideReveal easing updated to OwlSurf's `cubic-bezier(0.25, 0.1, 0.25, 1.0)`, duration 900→1100ms, scale animation removed (was causing sub-pixel jank).

**5. Performance — bundle code-splitting** (`vite.config.ts`)
- Before: single 1.18MB JS chunk.
- After: 6 parallel chunks — `vendor-react` 157KB, `vendor-gsap` 70KB, `vendor-anime` 34KB, `vendor-ui` 58KB, `vendor-3d` 694KB (cobe/ogl/postprocessing), `index` 165KB.
- `vendor-3d` is large but loads in parallel and doesn't block render.

**6. Image conversion script** (`scripts/convert-images.mjs`)
- `npm run images:convert` — converts all PNGs in `src/assets` to WebP at quality 82.
- Requires `npm i -D sharp` (not auto-installed — run once).
- Typical saving: 40–60% per file.
- Current assets: 2.4MB total, mostly already WebP. PNGs left: client logos + some creatives.

### Session 2 — Performance Scan + Lifecycle Fixes

**What was done:**

**1. Live dev server started**
- `npm run dev` started successfully at `http://localhost:8080/`.
- Initial sandbox bind to port 8080 failed; rerun with approval fixed it.

**2. Codebase inefficiency scan**
- Build passed before changes, but warned about `vendor-3d` at ~694KB minified / ~213KB gzip.
- Tests passed (`vitest run`, 1 test).
- Lint failed before changes with existing visual-component typing debt (`any`, `@ts-nocheck`, hook dependency warnings, Tailwind `require()`).
- Main inefficiency buckets found: eager slide imports, offscreen animation loops, WebGL cleanup leaks, dead/misdirected scroll listeners, and image/font payload weight.

**3. Deck lazy-loading + mount strategy** (`src/pages/Index.tsx`)
- Heavy slides changed from eager static imports to `React.lazy` dynamic imports.
- Added a placeholder slide fallback that preserves scroll-snap height while unloaded.
- Added `mountedSlides` tracking: current + neighboring slides are loaded progressively, and once a slide is mounted it stays mounted.
- Important correction: first attempt unmounted far-away slides, which caused the Why Us / Hyperspeed animation to stop. Final approach preserves loaded slide lifecycles while still avoiding loading the full deck on first paint.
- Added `data-deck-scroll-container` to the main scroll container so slide-level effects can attach to the correct scroller.

**4. Hyperspeed lifecycle fixes** (`src/components/ui/Hyperspeed/Hyperspeed.tsx`, `src/components/slides/SkyrocketSlide.tsx`)
- Fixed resize listener leak by binding `onWindowResize` once and removing the same function reference in `dispose()`.
- Stored and cancelled the animation frame id during disposal.
- Guarded async `loadAssets().then(init)` so disposed instances do not initialize after unmount.
- Stabilized the Why Us slide's `effectOptions` with `useMemo` so Hyperspeed is not torn down/recreated on every render.

**5. Slider/offscreen work reduction** (`src/components/ParallaxCardSlider.tsx`)
- Replaced always-running desktop tilt loop with an IntersectionObserver-driven loop that only runs while the slider is visible.
- Auto-advance interval now only exists while the slider is visible.
- Slide-transition timeouts are tracked and cleared on unmount.
- Hook dependency warnings for `getPrev` / `getNext` were addressed by memoizing them.

**6. Scroll and pointer cleanup** (`TitleSlide.tsx`, `ServicesSlide.tsx`)
- Title parallax now listens to the actual deck scroll container, not `window`.
- Disabled LightRays mouse-follow on Title and Services because both usages are ambient and `pointer-events-none`; this avoids global mousemove tracking for decoration-only effects.

**Verification:**
- `npm run build` passed after changes.
- `npm test` passed after changes.
- `npm run lint` still fails due to pre-existing strict typing issues in visual components (`LightRays`, `Hyperspeed`, `PrismaticBurst`, `SplitText`, `globe`, `tailwind.config.ts`).
- Pushed commit `cf84d71` to `origin/main`.

### Session 3 — Slide 2 Reference Layout Iteration

**What was done:**

**1. Slide 2 rebuilt as a reference-style editorial shell** (`src/components/slides/SkyrocketSlide.tsx`)
- The old `Skyrocketing` / Why Us content was replaced with a dark OwlSurf version of the provided `Who We Are` reference layout.
- The slide keeps the existing Hyperspeed background animation behind the editorial frame.
- Current visible structure: `Owlsurf Digital` label, `02 / 05`, `Built For Industry`, `01 Introduction`, orange divider, empty body space, sectors grid, `Portfolio & Credentials`, and `www.owlsurf.com`.
- Per the latest direction, the large `Who / We Are` title and body copy were removed so the user can fill the layout manually later.

**2. Illustration removed after layout review**
- An industrial reference illustration was briefly added and then removed because the user wanted the layout copied without the right-side illustration.
- The current right side is intentionally minimal: only subtle technical grid texture, footer rule, and the animated background atmosphere.

**3. Navigation hidden on Slide 2** (`src/pages/Index.tsx`)
- Pill navigation is hidden when slide 2 is active so it does not cover the reference-style top labels or make the page look cluttered.
- Existing case-study nav hide behavior remains unchanged.

**Design note:** Slide 2 is now a content skeleton, not final copy. Preserve the empty body area unless the user explicitly asks to add text back.

### Session 4 — Theme Toggle Removal

**What was done:**

**1. Dark/light mode functionality removed** (`src/pages/Index.tsx`, `src/components/ThemeToggle.tsx`, `src/styles/theme-switch.css`)
- Removed the `ThemeToggle` import and render from the main deck shell.
- Deleted the standalone toggle component and its animated switch stylesheet.
- Case-study and slide-2 nav hiding now only controls `PillNav`; there is no bottom-right theme switch UI.

**2. Theme plumbing cleaned up** (`src/index.css`, `src/vite-env.d.ts`)
- Removed the `.light` CSS variable override block so the presentation stays on the dark OwlSurf theme.
- Removed the old root view-transition CSS and `Document.startViewTransition` type that existed only for the theme animation.

**Verification:**
- `npm run build` passed after changes.
- `npm test` passed after changes.
- Visual screenshots of the first five slides were captured from `http://localhost:8080/` after the cleanup.

### Session 5 — Slide 2 Who We Are Editorial Build

**What was done:**

**1. Page-level header/footer removed** (`src/components/slides/SkyrocketSlide.tsx`)
- Removed the old slide-2 top labels: `Owlsurf Digital`, `02 / 05`, and `Built For Industry`.
- Removed the old footer URL and page-frame border.
- Removed the `Introduction` kicker, orange divider, and `Portfolio & Credentials` text.

**2. Right-side technical illustration added**
- Added `src/assets/industrial-engineer-slide-2.png` from the generated technical line illustration.
- The image is anchored on the right, zoomed to reach the slide edges, shifted toward the right edge, and uses `mix-blend-screen`.
- Removed experimental circular crop, semicircle overlay, grid pattern, and gradient divider after review.

**3. Left-side copy added**
- Added `WHO / WE ARE` and B2B agency copy using the secondary/body font (`font-body`, Palanquin).
- Preserved the slide's dark OwlSurf visual system and Hyperspeed atmospheric background.
- Kept sectors visible under `Sectors We Serve`, anchored further toward the bottom-left.

**Verification:**
- `npm run build` passed after changes.

### Session 8 — Services Slide Tabbed CardSwap, AI Pillar

**What was done:**

**1. Services slide moved from icon grid to tabbed CardSwap layout** (`src/components/slides/ServicesSlide.tsx`, `src/components/ui/CardSwap/`)
- Replaced the flat 8-card grid with a 5-pillar tabbed layout: **Content & Creative**, **Reach & Activation**, **Search & Listening**, **Data & Tech**, **AI & Automation**. Each pillar holds 5 sub-services (25 total).
- Integrated React Bits' `CardSwap` component (`src/components/ui/CardSwap/CardSwap.jsx` + `CardSwap.css`). Uses gsap (already in `vendor-gsap` chunk via `vite.config.ts`). Elastic easing, 3s swap interval, `pauseOnHover` enabled.
- `<CardSwap key={activeKey} />` forces a clean remount on tab change so the gsap timeline and refs reinitialize cleanly.

**2. Pillar tabs (left column)**
- 5 pillars, each shown as a button with: a category icon in a 10×10 rounded square (replaces the earlier 01–04 numbers), a monster-styled `font-black uppercase tracking-tight` label, and a count chip on the right showing "5".
- Active state: teal border, teal-tinted bg, teal vertical accent stripe on the left edge, icon and chip flip to teal accent colors.
- Tabs and stack now align via `items-start` on the grid (was `items-stretch`).

**3. CardSwap stack (right column)**
- 5 cards per pillar. Card body: small teal-tinted icon (`h-8 w-8`) + small monster heading on the **top edge** so all 5 cards' icon-and-title strips peek above the front card in a staircase. Then a one-line description, then a footer band ("PILLAR LABEL • B2B / Industrial"). Vertical teal accent stripe on the left edge of each card.
- Card heading color is teal (`text-primary`), matches the active pillar accent.
- Card dimensions: 520×270. `cardDistance: 48`, `verticalDistance: 52` — chosen so each back card's 52px top strip fully exposes its icon+heading row.
- Card descriptions are layman-friendly but retain industry terms: **ABM**, **SEO**, **HubSpot / Marketo / Pardot**, **Salesforce**, **AEO (Answer Engine Optimization)**, **Marketing Copilots**, **AI Personalization**. No em dashes.

**4. CardSwap container positioning** (`src/components/ui/CardSwap/CardSwap.css`)
- Default React Bits CSS was `bottom: 0; right: 0; translate(5%, 20%)` (bottom-right overhang). Switched to centered within its parent column: `bottom: 30%; right: 50%; transform: translate(50%, 50%) scale(1.3)` so the stack reads bigger and sits low-center of the right column. Perspective bumped to 1100px. Card border / background tweaked to OwlSurf teal-on-dark.

**5. Layout shift up** (`ServicesSlide.tsx`)
- Grid moved from `my-auto` → `mt-[15vh]` → finally `mt-[3vh]` after iteration. Left pillars sit higher in the slide, right CardSwap is offset down via its own CSS (`bottom: 30%`), giving an asymmetric editorial feel.

**Verification:**
- `npm run build` passes (1773 transformed modules, ServicesSlide chunk grew from 3.78kB → ~13kB, gzipped ~5kB).
- `npm test` passes.
- Preview tool cannot reach slide 4 via programmatic scroll (lazy-load + scroll-snap limitation), so all visual verification happens in the browser. User confirmed live rendering at multiple checkpoints.

### Session 9 — Contact Slide Redesign, Clients LogoLoop, Performance Pass

**What was done:**

**1. Contact slide rebuilt as a chic deck closer** (`src/components/slides/ContactSlide.tsx`)
- Replaced the old centered logo + three glass-card contact layout with a quieter editorial closer.
- Current headline: `LET'S MAKE / COMPLEX / obvious.` with `obvious.` in Lora italic teal.
- Removed extra deck-label text after review: no header, no `Portfolio & Credentials`, no `Demand systems for serious markets`, no `Close` explainer block.
- Right side now uses only the OwlSurf circular logo/ripple mark. Important implementation note: the absolute centering wrapper (`ct-mark`) is separate from the animated scale wrapper (`ct-mark-inner`) so Anime.js does not overwrite Tailwind's centering transform.
- Logo/ripple mark is intentionally shifted a little upward (`top-[45%]`) after review.
- Contact links remain Email, Call, Web in a minimal bottom row.

**2. Clients slide moved from Marquee to React Bits LogoLoop** (`src/components/slides/ClientsSlide.tsx`, `src/components/ui/LogoLoop/`)
- Added React Bits `LogoLoop.jsx` and `LogoLoop.css`.
- Replaced the previous custom `Marquee` rows with two `LogoLoop` rows using the existing client logo images.
- Rows move in opposite directions, pause on hover, use a calmer speed, and apply a true CSS mask fade at the left/right edges.
- Hover scale was reduced to `1.08` to avoid a jumpy feel.
- `LogoLoop` was extended with an IntersectionObserver so its requestAnimationFrame loop pauses when the row is offscreen.

**3. Deck-wide performance pass** (`src/pages/Index.tsx`, `LightRays.tsx`, `PrismaticBurst.tsx`, `Hyperspeed.tsx`)
- Changed slide mounting from "current + neighbors and keep mounted forever" to active-slide-only mounting. Placeholder sections still preserve scroll height and scroll-snap behavior.
- This prevents old WebGL canvases, profile-card listeners, LogoLoop RAFs, and timers from piling up after the user scrolls through the deck.
- Capped ambient WebGL DPR to `1.25` for `LightRays`, `PrismaticBurst`, and `Hyperspeed`. This cuts Retina fragment workload substantially while keeping background effects visually acceptable.
- Runtime check after navigating to Clients showed only the Clients content active, with old profile cards unmounted and canvas count reduced.

**Verification:**
- `npm run build` passes.
- Live runtime checks confirmed Clients `LogoLoop` rows mount and offscreen-heavy content is cleaned up after navigation.
- Tradeoff: active-slide-only mounting is lighter, but very fast scroll jumps can reveal a short lazy-loading beat. If needed later, add route/chunk preloading without mounting visual effects.

### Session 7 — Services Rebuild, Clients Redesign, Heading Unification

**What was done:**

**1. Services slide stripped + rebuilt as B2B icon grid** (`src/components/slides/ServicesSlide.tsx`)
- Removed the old tabbed interface (4 services with active-tab content panel).
- New layout: 8-service icon grid (4×2 desktop, 2×4 mobile) inspired by FoxyMoron's services page but adapted to OwlSurf's dark theme and B2B angle.
- Services: Content Strategy, Creative Production, Creator Partnerships, Tech Solutions, Social Listening, Search & SEO, Paid Ads, Data & Insights. Each card has a teal Lucide icon, simplified layman-friendly title, and a B2B-angled description (e.g., "Targeted LinkedIn, Google, and programmatic campaigns built for long sales cycles and complex buying committees").
- Stagger reveal on intersection — header first, then cards on 70ms cascade.
- LiquidGlassCard, useIsMobile, and tab-switching state removed.

**2. Clients slide redesign** (`src/components/slides/ClientsSlide.tsx`)
- Heading repositioned from centered to top-left, monster-sized (matches OurTeamSlide's `clamp(3.4rem, 5.9vw, 6.6rem)` Montserrat black). MAJOR white + CLIENTS teal-gradient.
- Critical fix: `.slide` base class has `items-center justify-center`, so all heading attempts to left-align failed until a `w-full h-full` wrapper was introduced as the single centered flex child. Pattern is now applied to ClientsSlide, ServicesSlide, and OurTeamSlide.
- Bare-span footgun re-bit us: the global `span:not([class])` rule italicized MAJOR. Fix is `font-sans not-italic` explicitly on both word spans. CLIENTS also needs `inline-block pr-2` to prevent `bg-clip-text` from cropping the trailing S.
- Edge fade uses `mask-image` directly on the cards container (`transparent 0%, black 14%, black 86%, transparent 100%`) — cards now visibly fade to fully transparent at the edges. Earlier attempts with absolute-positioned blur+gradient overlays were either too dark (heavy background tint) or too weak (cards still visible through blur).
- Marquee jitter fixes (see #3) made the carousel smooth.
- PrismaticBurst `speed={0.18}` (was the default `0.5`) for a calmer background shimmer.

**3. Marquee GPU compositing + smoothness fixes** (`src/components/ui/marquee.tsx`, `tailwind.config.ts`)
- Tailwind `marquee` and `marquee-vertical` keyframes now use `translate3d(...)` instead of `translateX/Y(...)` to force GPU layer promotion.
- Inner marquee divs get `will-change: transform` and `backface-visibility: hidden` inline.
- Reverted a misguided `repeat={2}` attempt back to `repeat={4}` after seamless looping broke (need enough copies to span the viewport continuously).

**4. Heading format unified across upper-deck slides** (`SkyrocketSlide.tsx`, `OurTeamSlide.tsx`, `ServicesSlide.tsx`, `ClientsSlide.tsx`)
- Standard heading format now: `font-sans text-[clamp(3.4rem,5.9vw,6.6rem)] font-black uppercase leading-[0.95] tracking-normal text-white text-left pb-2`.
- Eyebrow above the h2: `text-[10px] md:text-xs tracking-[0.3em] text-primary font-medium mb-3 block` with a short label (e.g., WHO WE WORK WITH, WHAT WE DO, THE PEOPLE).
- Split-color treatment on most: first word white, second word `text-gradient-green`. Slide 2's "WHO WE / ARE?" already used split spans with `text-gradient-green` on WE — only the font-size and leading were updated to match.

**Verification:**
- `npm run build` passes (1772 transformed modules, expected `vendor-3d` ~678KB chunk warning).
- `npm test` passes (1 test).
- Preview tool cannot reliably mount slides past index 1 due to the lazy-load + scroll-snap combination, so visual verification has to happen in a real browser. Confirmed live for slide 2 (font size now 54.4px at desktop viewport, matching the standard `clamp(3.4rem, 5.9vw, 6.6rem)`).

### Session 6 — Team Slide Rebuild + Old Animation Removal

**What was done:**

**1. Slide 2 refined into final "Who We Are" copy**
- Headline now reads `WHO WE / ARE?`, with `WE` in teal and the question mark kept with `ARE`.
- Body copy now reads: `We translate technical depth into market momentum.`
- `technical depth` and `market momentum.` use matching Lora italic styling with larger hand-drawn teal highlights behind black text.
- Sectors were kept short and readable: Chemicals, Pharma, Energy, Infrastructure, Education.
- Sector icons were enlarged while labels were reverted to their concise original names after review.

**2. Old third "Who We Are" slide removed**
- Removed `WhoAreWeSlide` from the slide registry in `src/pages/Index.tsx`.
- Deleted `src/components/slides/WhoAreWeSlide.tsx`.
- Deleted the unused `src/components/ui/Ballpit/Ballpit.tsx` animation path.
- Updated navigation/case-study indices after the removal: case studies now run from slides 5 through 11 and Contact is slide 12.

**3. Our Team slide rebuilt**
- Added React Bits `ProfileCard` component files (`src/components/ProfileCard.jsx`, `src/components/ProfileCard.css`).
- Added React Bits `Radar` component files (`src/components/Radar.jsx`, `src/components/Radar.css`) using the existing `ogl` dependency.
- Rebuilt `OurTeamSlide.tsx` as a six-person grid: Harshit, Sakshi, Manas, Sanskriti, Pankaj, Vishnu.
- Current roles: Strategy & Growth, Client Partnerships, Digital Enablement, Creative Direction, Technology & Delivery, Creative Architect.
- Cards are horizontal, teal-tinted, and arranged three over three. Hover rainbow treatment is disabled; the idle/initial profile-card movement remains.
- Vishnu temporarily reuses Pankaj's avatar because no separate Vishnu avatar asset exists yet.

**4. Efficiency notes**
- Removing the old Ballpit path avoids carrying the extra ball animation code in the deck.
- `vendor-3d` is still the largest production chunk because the deck still uses WebGL effects (`Hyperspeed`, `Radar`, `ogl`, `cobe`, `postprocessing`).
- `Radar` is currently desktop-grade visual work behind the team cards. If mobile performance becomes a problem, gate it with `useIsMobile()`.

**Verification:**
- `npm run build` passed with 1771 transformed modules and the expected `vendor-3d` large chunk warning (~678KB minified / ~208KB gzip).
- `npm test` passed (1 test).
- `npm run lint` still fails only on existing visual-component typing debt in `LightRays`, `Hyperspeed`, `PrismaticBurst`, `SplitText`, `globe`, and `tailwind.config.ts`.
- Trace check confirms no remaining `WhoAreWeSlide` or `Ballpit` references in `src/`.

---

## Architecture Decisions (permanent)

| Decision | Why |
|---|---|
| Scroll-snap `mandatory` + `scroll-snap-stop: always` | Forces clean slide-by-slide navigation. `proximity` causes jitter. |
| No Redux/Zustand | Deliberate — local state + refs only. Cross-slide nav via prop drilling (`onViewCaseStudies`). |
| Anime.js for entrance sequences | Migrated from Framer Motion. Lighter, more control. |
| GSAP for PillNav only | Complex interdependent timelines. Anime.js handles everything else. |
| 3-zone title layout (justify-between) | Eyebrow top, hero center, footnotes bottom — matches PowerPoint slide convention. |
| Fonts local + Google hybrid | Montserrat from Google (large weight range), Lora+Palanquin local (italic VF not on Google). |
| Active-slide-only mounting | Only the current slide is mounted; placeholder sections preserve scroll height. This prevents offscreen WebGL canvases, LogoLoop RAFs, profile-card listeners, and timers from accumulating as the deck is viewed. |
| Slide 2 as editorial Who We Are slide | Uses Palanquin copy, low-left sectors, and right-side technical line illustration. Do not restore removed header/footer, border, grid, semicircle, or divider gradient unless asked. |
| No separate ball-animation Who We Are slide | The old third slide and Ballpit animation were intentionally removed to reduce visual clutter and code weight. |
| Our Team as one lanyard plus roster | Keep one React Bits lanyard mounted on the right and drive it from the left roster. Do not return to six simultaneous WebGL lanyards; that path was heavy and fragile. |
| Fixed dark theme | The deck no longer exposes light/dark switching; OwlSurf dark mode is the single visual system. |
| Unified upper-deck heading format | Slides 2–5 share one heading recipe: eyebrow + `clamp(3.4rem,5.9vw,6.6rem)` Montserrat black, white first word + teal-gradient second word, left-aligned via a `w-full h-full` wrapper that defeats `.slide`'s `items-center justify-center`. |
| Services as B2B icon grid | Slide 4 uses 8 icon cards (4×2) with simplified service names and B2B-angled descriptions (long sales cycles, complex buying committees, technical evaluators). No tabs. |
| Clients use React Bits LogoLoop | Slide 5 uses two `LogoLoop` rows with real CSS mask fading, calmer speeds, pause-on-hover, and offscreen RAF pausing. Avoid reverting to the old Marquee unless LogoLoop proves incompatible. |
| Bare-span footgun | `span:not([class])` in `index.css` forces Palanquin italic onto any class-less `<span>`. Always add `font-sans not-italic` (or equivalent) on bare spans inside h1/h2 to keep them in Montserrat. |
| Services as 5-pillar tabbed CardSwap | Slide 4 uses left-side pillar tabs + right-side CardSwap stack. Five pillars (Content & Creative, Reach & Activation, Search & Listening, Data & Tech, AI & Automation), 5 sub-services each. Card headings teal, monster-styled. `key={activeKey}` on CardSwap forces remount per tab so gsap timeline doesn't desync. |
| CardSwap stack readability | Cards designed so the icon + title row fits in the top `verticalDistance` (52px) — keep small icon (`h-8`) and small monster heading (`text-base font-black`) pinned to the top edge. That makes all stacked headings peek visibly in a staircase. |
| AI & Automation as a top-level pillar | Treated as a peer to Content, Reach, Search, and Data — not a sub-skill. Mention AEO, Marketing Copilots, AI Personalization explicitly because B2B buyers now expect them. |
| Ambient WebGL DPR cap | LightRays, PrismaticBurst, and Hyperspeed cap DPR at `1.25` to reduce heat/lag on Retina displays. These are ambient backgrounds, so do not raise back to full devicePixelRatio unless visual quality truly requires it. |
| Contact logo animation layering | Keep `ct-mark` for absolute positioning and animate only `ct-mark-inner`; animating the positioned wrapper overwrites centering transforms and misaligns the logo/ripples. |
| Two case-study layouts coexist | Case studies use either split (Mitsui) or polished vertical (Baxsaa). Both apply the eyebrow + monster h2 + Palanquin tagline recipe, just at a slightly smaller h2 clamp than slides 2–5 and with the brand color in place of teal. Pick per case study based on whether there's an extra element (callout, SEO card, supplementary copy) that breaks the split column cleanly. |
| `ParallaxCardSlider` `cardWidth` prop | Slider exposes an optional `cardWidth` (default `"min(32vw, 340px)"`). Per-case-study layouts can tune this without forking the slider. Mitsui uses `"min(24vw, 320px)"` on desktop. The slider's parent must be `min-w-0` for the prop to actually shrink/grow inside a flex row. |
| Case-study slider right-edge bleed | For the Mitsui split layout, the slider sits in a `flex-1 min-w-0 justify-start self-center` wrapper so its right edge can clip past the section bound at common widths. This is deliberate — section `overflow-hidden` clips the bleed and the copy column stays at its `shrink-0` width. Do not add `overflow-hidden` to the slider wrapper or anchor it `justify-center`, both will recenter the slider and reintroduce the column-squeeze regression caught during Session 13. |
| Case-study stats: no LiquidGlassCard | Baxsaa's pills were rewritten with a simple translucent fill + 1px brand-color hairline + backdrop-blur instead of `LiquidGlassCard`. The card library's pre-baked saturate/brightness fights brand color tints (especially on the Baxsaa cream background). Prefer the custom pill until a clear `LiquidGlassCard` use case returns. Mitsui's vertical stat list uses the same idea: an icon-circle with brand color border + a big-number + small-label layout, no glass card wrapper. |

---

## Known Issues / TODOs

- [ ] Five case studies still on the pre-Session-13 layout (`CultFitCaseStudy`, `GirlUpCaseStudy`, `CTPCaseStudy`, `VNTCaseStudy`, `RaychemRPGCaseStudy`). Each needs a split-or-vertical decision and a port to the new recipe. Pace is per-CS, similar to Mitsui/Baxsaa iteration.
- [ ] Vercel deployment broken — needs reconnect or redeploy.
- [ ] PNGs in `src/assets` not yet converted to WebP — run `npm run images:convert` after `npm i -D sharp`.
- [ ] `logo-main.jpg` used for owl logo — should be converted to WebP or replaced with SVG/PNG with transparency.
- [ ] Bundle `vendor-3d` still appears as a large chunk (~678KB minified) when 3D slides load — consider splitting `ogl`, `cobe`, and `postprocessing` by feature, or gate/deeper-lazy-load 3D code.
- [ ] Mobile layout for title slide not verified after redesign.
- [ ] Our Team uses Pankaj's avatar for Vishnu until a dedicated Vishnu avatar is supplied.
- [ ] The lanyard/strap/logo layout should still be judged by manual browser review; screenshot capture was intentionally skipped at the user's request.
- [ ] `npm run lint` fails on existing visual-component typing debt (`any`, `@ts-nocheck`, hook warnings, Tailwind `require()`).

---

## File Map (key files only)

```
src/
  App.tsx                  — BrowserRouter shell, root deck route, catch-all 404 route
  pages/Index.tsx          — lazy slide registry, progressive mounting, scroll handler, nav
  pages/NotFound.tsx       — branded OwlSurf 404 page for unknown paths
  components/
    slides/TitleSlide.tsx  — cover slide, 3-zone layout
    OwlSurfLogo.tsx        — animated SVG OwlSurf mark used in the cover logo slot
    ai-elements/WebPreview.tsx — local AI Elements-style web preview primitives
    blocks/FlyonFooter.tsx — compact FlyonUI-inspired footer block used on Contact
    slides/SkyrocketSlide.tsx — slide 2 Who We Are editorial layout, memoized Hyperspeed config, right-edge illustration
    slides/OurTeamSlide.tsx — left roster selector + single active team lanyard
    slides/CaseStudySlide.tsx — Mitsui split case study with stats, slider, and web preview
    slides/RaychemRPGCaseStudy.tsx — Raychem case study with three refreshed WebP creatives
    ui/Lanyard/            — React Bits lanyard, OwlSurf strap, active badge avatar
    ProfileCard.jsx/css    — older React Bits profile card files, not the current team-slide path
    Radar.jsx/css          — older WebGL radar files, not the current team-slide path
    SlideReveal.tsx        — intersection observer + anime.js entrance wrapper
    ParallaxCardSlider.tsx — visible-only auto-advance + tilt animation
    PillNav.tsx            — GSAP-powered top nav
    LightRays.tsx          — WebGL light rays background effect
    ui/LogoLoop/           — React Bits clients carousel with offscreen RAF pause
    ui/Hyperspeed/         — WebGL road effect; cleanup fixed for resize + rAF
    ui/globe.tsx           — cobe globe
  index.css                — all CSS tokens, OwlSurf design system vars
tailwind.config.ts         — font families, owl.* colors, keyframes
vite.config.ts             — port 8080, manualChunks code-splitting
scripts/convert-images.mjs — PNG→WebP batch converter
prod.md                    — design principles + product philosophy
context.md                 — this file
```
