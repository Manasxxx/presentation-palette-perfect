# Project Context — Presentation Palette Perfect

> Running log of all meaningful changes, rationale, and current state. Updated on every push.
> Read this before touching any file — it tells you what exists, why it was built that way, and what's been tried.

---

## Current State (as of Session 32 push prep)

**Session 32** is a mobile polish pass (slides 2–4 + all seven case studies), the orphaned-lanyard cleanup, and a temporary on-device debug menu.

- **Lanyard stack removed.** The Our Team slide (and its lanyard) went in Session 30, leaving the Three.js lanyard orphaned. Deleted `src/components/ui/Lanyard/` (`Lanyard.jsx`, `Lanyard.css`) and `src/assets/lanyard/card.glb` (~2.4 MB). Uninstalled `@react-three/fiber`, `@react-three/drei`, `@react-three/rapier`, `meshline`. `vite.config.ts`: dropped the `vendor-lanyard` manualChunk and folded the residual `three` (used only by Hyperspeed) into `vendor-3d`; removed the now-dead `assetsInclude: ["**/*.glb"]`. `src/vite-env.d.ts`: removed the `*.glb` and `meshline` module decls. `three`/`postprocessing` (Hyperspeed) and `cobe`/`ogl` (Globe/other GL) stay. Largest chunk is now `vendor-3d` (~686 KB / ~210 KB gzip), desktop-gated. Build + lint clean.
- **Temporary debug menu** (`src/components/DebugMenu.tsx`, wired in `Index.tsx`). `md:hidden` teal bug FAB bottom-right → expands to a Hot-reload button + a jump-to-any-slide list (labels for all 12 slides, current highlighted). Replaces the throwaway refresh button + session debug menu that earlier sessions kept re-adding/removing. **Temporary — must be removed before the production push** (delete file + import/usage).
- **Slide 2 (Who We Are / `SkyrocketSlide`), mobile.** Modest vertical-rhythm increase. Priority-sectors marquee: bleeds full width (`-mx-5`), symmetric edge fade `linear-gradient(to right, transparent 0%, #000 8%, #000 92%, transparent 100%)`. Buyer outcomes consolidated 5→3 via a new `mobileOutcomes` array (Understood faster / Easier internal buy-in / Lower perceived risk), each a pill with a one-line sentence; desktop keeps the 5-card `differentiators` grid. Hyperspeed eased on mobile (`autoSpeedUp` 0.9→0.5, `movingAwaySpeed`/`movingCloserSpeed` down ~30%).
- **Slide 3 (Services / `ServicesSlide`), mobile.** Header eyebrow "WHAT WE BUILD" → the thicker `font-black` teal eyebrow shared by slides 2/4. Removed the "Tap a system…" hint and the `01/02…` numbering from the mobile build-sequence list.
- **Slide 4 (Clients / `ClientsSlide`), mobile.** Header eyebrow → same `font-black` teal style. Credibility badges rebuilt as rounded-full pills (sector/outcome family). On mobile the pills are replaced by **three** moving logo sliders (`mobileRow1/2/3` = distinct slices of `allClients`, so no logo appears in two rows at once); desktop keeps two sliders + the pills. Logo cards narrowed + zoomed (`renderClientLogo`), loop speeds bumped.
- **Case studies (all 7), mobile.** Cover-flow image is the hero — in `index.css`: `.cs-coverflow-item` width 9.9→18.6rem, `aspect-ratio` 1/1.5→1/1.08, `.cs-coverflow-card img` back to `object-fit: contain` (full image; `cover` was clipping the square creatives), card `padding: 1px`, `.cs-coverflow` `scroll-behavior: smooth`, softened `cs-coverflow-slide` keyframe (center scale 1.14→1.06, travel 24→20%); centering `calc()`s updated to the new width. In `CaseStudyLayout.tsx` + `CaseStudySlide.tsx`: company name forced to one line on mobile (`block`→`md:block` + trailing space), description nudged up (mt-2.5→1.5), container top/bottom spacing pt-10/pb-8. Proof table: **"Shift" row filtered out centrally** in `CaseStudyLayout` (`["proof","shift"]`), scrim backgrounds (dark `black/40`, light `white/0.7`), stronger borders, brighter+larger values. Stat-pill numbers use a Helvetica stack. **Gotcha:** on Mitsui the number lives in a class-less `<span>`, which `index.css` rule `span:not([class]) { font-family: var(--font-body) }` was forcing to Palanquin — fixed by giving that span its own class + inline `fontFamily`. (Layout's value is a bare text node, so it was already fine.)
- **Baxsaa copy corrected.** Was wrongly "D2C beauty commerce". The Baxsaa Co (thebaxsaaco.com) is a Mumbai premium custom-packaging studio (rigid boxes, paper bags, etc.). Rewrote subtitle/market/role in plain, outcome-based language. **Standing rule:** case-study descriptions must be plain (not corporate) and outcome-based; verify the client's real business first.
- **Push:** committed and pushed to production. `.github/workflows/deploy.yml` excluded again (remote PAT lacks `workflow` scope). `DebugMenu.tsx` intentionally shipped (temporary).

---

## Current State (as of Session 31 push prep)

**Session 31** is a desktop case-study + Contact polish pass (plus a nav-centering fix and more case-study creatives that were already in the working tree).

- **Desktop case-study carousel → Blossom "cards" stack.** `CaseStudyCarousel.tsx` (renamed from `ParallaxCardSlider.tsx` in this session) was rewritten: the desktop branch now renders a `BlossomCarousel` card stack instead of the old JS `requestAnimationFrame` 3D-tilt parallax slider (all that tilt/`getSlideStyle`/`changeSlide` machinery was deleted). Mobile cover-flow is unchanged. The desktop recipe is new CSS in `src/index.css` — `.cs-cards` (scroll-snap grid, `width: calc(var(--card-width)*3)`, `padding-inline: var(--card-width)`), `.cs-cards-slide` (sticky, `view-timeline: --cs-cards`, `cs-cards-stack` z-order keyframes using `sibling-index()`), `.cs-cards-card` (`cs-cards-rotate` keyframes, ported verbatim from the blossom-carousel.com cards example) with an `@supports not (animation-timeline: --cs-cards)` static fallback. Same `view-timeline` pattern the mobile cover-flow already used, so the modern-CSS dependency is consistent.
- **Card sizing/fit iterations.** Settled on `--card-width: 25rem`, `aspect-ratio: 1/1` (square — matches the square creatives so `object-fit: contain` doesn't letterbox), and a 1px inner inset (`.cs-cards-card { padding: 1px }`, image `border-radius: calc(1rem - 1px)`). The stage is centered+aligned with the left proof table via the wrapper in `CaseStudyLayout.tsx`/`CaseStudySlide.tsx`: `md:left-[50%] md:top-[58%] md:-translate-x-1/2 md:-translate-y-1/2 md:w-auto` (was `left-[73%] top-[36%] bottom-[6%] w-[54%]`). Right-side space is intentionally left blank for future video embeds; `.cs-cards-card video` is pre-styled.
- **Stat pills unified to the pill shape on desktop.** Both `CaseStudyLayout.tsx` (6 shared case studies) and `CaseStudySlide.tsx` (Mitsui) had their desktop stat pills changed from a fixed-height box to the mobile `rounded-full` pill (`value │ label` row, brand-tinted left divider). Fixed height → `md:min-h-[3.4rem]` so tall values/labels grow instead of clipping. Container widened to `md:w-[68%] lg:w-[60%]` and internal padding/value-size/label-tracking tightened so long labels ("INTERACTION RATE") fit without clipping.
- **More case-study creatives.** Baxsaa (+3), Girl Up (+3), VNT (+1) gained extra WebP creatives in their `sliderImages` arrays (new `*-extra-*.webp` assets in `src/assets/`).
- **Contact slide.** Headline forced to one continuous line on desktop (`flex md:flex-nowrap md:max-w-none`, static words `shrink-0 whitespace-nowrap`; mobile still `flex-wrap`), font reduced to `md:text-[clamp(1.7rem,3.1vw,2.6rem)]` / pills `clamp(1.5rem,2.7vw,2.4rem)` so the widest rotating combo doesn't clip off-screen. Ripple owl mark shrunk (`md:w-[380px]→[300px]`) and vertical rhythm tightened to stop the footer being clipped. Phone CTA was wrapping into a deformed circle inside the `max-w-[20rem]` row — fixed with `sm:max-w-none` on the row and `shrink-0 whitespace-nowrap` on both CTAs. Rotating word sets swapped to the everyday "Clarity" theme (`rotatingComplexity = [complex, technical, complicated, confusing, overwhelming]`, `rotatingChoose = [understand, explain, buy, get, choose]`) because the pills rotate independently and the old `dense`/`trust` combos read unnaturally.
- **WordRotate.** Added a `+6px` width buffer (`measure.offsetWidth + 6`) so the last glyph of a word isn't clipped by the shell's `overflow-hidden`. Pills keep dynamic per-word width. (A `lockWidth` option was prototyped and removed — pills are dynamic.)
- **Nav centering** (`src/styles/PillNav.css`, pre-existing working-tree change, included this push). Centered via `left:0; right:0; width:max-content; margin-inline:auto` instead of `transform: translateX(-50%)`, because the show/hide animation animates `translateY` and would clobber a translateX centering.
- **Cleanup.** Removed dead code surfaced by this pass: the now-unused `cardWidth` prop on the carousel (+ its two call sites) and the prototyped `lockWidth` path in `WordRotate`. `npm run lint` (0 warnings) and `npm run build` pass.
- **Push:** committed and pushed to production. `.github/workflows/deploy.yml` excluded again (still has the uncommitted retry-flag hardening; remote PAT lacks `workflow` scope).
- **Naming:** `ParallaxCardSlider` was renamed to `CaseStudyCarousel` (`src/components/CaseStudyCarousel.tsx`) since it's a Blossom wrapper now, not a parallax slider; both importers (`CaseStudyLayout`, `CaseStudySlide`) were updated. Done via `git mv` to preserve history.

---

## Current State (as of Session 30 push prep)

**Session 30** removed the Our Team slide, cleared the Hallmark-audit backlog, moved all animation to Anime.js (GSAP removed), ran a mobile polish round, and rewrote the Services / Buyer Systems copy in plain language across desktop + mobile.

- **Our Team slide removed.** `OurTeamSlide.tsx` deleted; deck is now 12 slides. Indices shifted: Services 2, Clients 3, case studies 4–10, Contact 11. All hardcoded indices fixed in `Index.tsx` (slides array, `onCaseStudy` 4–10, cover CTA → 4) and `PillNav.tsx` (removed `Team` item, reindexed `slideToNavIndex`). The lanyard is orphaned, so `vendor-lanyard` dropped from ~3MB to ~477KB (residual is Hyperspeed's `three`).
- **Hallmark audit fixes.** Global `:focus-visible` ring (teal, instant) in `index.css`; `transition-all` → named-property transitions (5 spots); `tabular-nums` on the Clients strip; curly apostrophes in Contact; `logo-main.jpg` → `logo-main.webp`. Eyebrows and the teal-gradient headline kept (brand-mandated by `design.md`). The original audit punch list lives under the Session 29 block below; all four majors are now addressed.
- **Anime.js everywhere; GSAP removed.** `PillNav` + `CardSwap` ported to Anime.js. `gsap` uninstalled (package.json, lockfile, `vendor-gsap` chunk). CardSwap centering moved to CSS negative margins; its loop uses `createTimer`. Dead keyframes removed (`gradient-shift`, `float`, `pulse-glow`, `shimmer`). WebGL backgrounds (Hyperspeed, LightRays, PrismaticBurst, Globe) kept.
- **Mobile polish.** Cover logo + badges bigger; Slide 1 breathing room; Services comprehension cues (`Tap a system…` hint + `INSIDE {category} · BUILD ORDER` header); Clients credibility cards prettied; case-study cover-flow image `contain` + aspect `1/1.5` so the whole image shows; Contact logo enlarged.
- **Services plain-language rewrite.** Subtitle → `Five systems that make a complex product easy to buy.`; all 25 desktop pillar descriptions simplified to one short glanceable sentence; `AEO` → `AI Search Optimization`, `Marketing Copilots` → `Marketing Assistants`. The Clients credibility strip now also renders on desktop (rough 5-across). **All slide text is shared desktop↔mobile; copy changes must land on both.**
- `npm run lint` (0 warnings) and `npm run build` pass; `vendor-gsap` gone.

---

## Current State (as of Session 29 push prep)

**Session 29** fixes the Session 28 real-phone black-screen bug and runs a mobile polish pass on the case studies, Contact, and Clients slides.

- **Black-screen root cause + fix** — `Index.tsx` computed the active slide as `Math.round(scrollTop / window.innerHeight)`. On Android Chrome `window.innerHeight` grows when the URL bar auto-hides, but slides are a constant rendered height, so the index drifted low and compounded down the deck. With `SLIDE_MOUNT_RADIUS = 0`, a wrong index means the looked-at slide isn't mounted and the black `SlideFallback` shows; the final slide survived only because `Math.min(..., length-1)` clamped it (why Contact stayed visible while the middle case studies blacked out). Fixed with `getSlideHeight(container)` measuring a real `.slide` via `getBoundingClientRect`, used for both the scroll→index map and `navigateToSlide`. Confirmed fixed on the user's phone. Not the Blossom carousel / WebGL / backdrop-filter — those were ruled out with a temporary `?dbg=` toggle harness (since removed).
- **Case studies (mobile)** — top-aligned, "Case proof NN" eyebrow hidden on mobile, smaller stat pills, tuned spacing; cover-flow image taller (`aspect-ratio 1/2`) with `object-fit: cover`. Nav bar (logo + menu) hidden on case-study slides 5–11 on mobile.
- **Contact slide** — redesigned centered closer: enlarged OwlSurf ripple mark, `Let's talk` eyebrow, `We make the [rotating] easy to [rotating]` with two teal block-uppercase `WordRotate` pills, primary email CTA + ghost phone CTA, trimmed footer. Removed the old `LET'S MAKE / COMPLEX / obvious.` headline, the PDF-replacement line, the four frame borders, and the desktop-only side mark.
- **Footer (`FlyonFooter`)** — logo + three social badges + copyright only; phone/email/owlsurf.com moved to the Contact CTA buttons.
- **Clients slide** — added a mobile-only credibility card strip below the logo loops; heading and loops untouched; desktop keeps PrismaticBurst.
- **Cleanup** — removed the temporary mobile refresh button and a session-only debug jump-menu before push.
- `git diff --check`, `npm run lint` (0 warnings), and `npm run build` pass; only the known `vendor-lanyard` chunk warning remains.

### Next-session plan — Hallmark audit punch list (run Session 29, no edits made)

Ran `hallmark audit` against the deck (editorial genre, `design.md`-managed). Structure is sound — no AI-template fingerprint, no critical findings. Backlog for next session, in priority order:

- **MAJOR · `transition-all`** (`ParallaxCardSlider.tsx:262`, `TitleSlide.tsx:362`, `SkyrocketSlide.tsx:264`, `ServicesSlide.tsx:465,551`) — replace with named-property transitions (`background-color`, `transform`, `border-color`); never `all`.
- **MAJOR · missing `:focus-visible` rings** — only `LogoLoop.css` has one. Add visible focus rings (≥3:1 contrast, instant, never animated) to the Contact CTAs, cover CTA, Slide-2 sector chips, Services tabs, and any custom interactive button. Real WCAG gap.
- **MAJOR · eyebrow-on-every-section** — 11 uppercase tracked kickers across slides. Cap at 1–2 per deck; keep only genuinely-ordinal ones (case numbers). `design.md` "credentials rhythm" half-sanctions these, so this is a brand-vs-tell judgment call.
- **MAJOR · gradient headline** (`text-gradient-green`, `index.css:230,330`) — bg-clip-text teal accent word on every slide is the canonical editorial AI tell, but `design.md`/`prod.md` explicitly mandate it as the brand signature. Decide: keep as signature, or switch to solid teal + weight/italic.
- **MINOR · `tabular-nums`** — only 3 usages; verify the Clients stat strip and Contact numbers align (`font-variant-numeric: tabular-nums`).
- **MINOR · straight apostrophes** — `Let's` / `We'll` / `You'll` in copy should use curly `’`.
- **MINOR · scroll-reveal breadth** — IntersectionObserver entrance on 7 slides; `design.md` sanctions one entrance per slide, so keep as-is but don't add more stagger.
- **MINOR · glassmorphism breadth** — `backdrop-blur` on 5 slides; purposeful now, watch for decorative creep.
- **MINOR · existing known** — `logo-main.jpg` still JPG (→ WebP/SVG), OG image is a `/favicon.png` stopgap (→ true 1200×630 card), `vendor-lanyard` ~3MB chunk.

Tally: 0 critical · 4 major · 6 minor. Verdict: close, fix the majors — focus rings and `transition-all` are the highest-value, lowest-risk wins.

---

## Current State (as of Session 28 push prep)

**Session 28** is a mobile-only case-study pass. The desktop case-study layouts were not intentionally changed.

- **Mobile case-study carousel** — `ParallaxCardSlider` now uses Blossom cover-flow on mobile only, with native hand scrolling and a 3-second auto-advance. Desktop keeps the existing parallax slider.
- **Mobile case-study layout** — Mitsui plus the shared case-study slides now use a tighter mobile stack: heading, subtitle, taller creative carousel, compact translucent proof table, and four translucent stat pills where metrics exist. The `Role` row stays in the table; the `Proof` row was removed. The least relevant fifth metric was removed from slides that had five metrics.
- **Temporary mobile refresh button** — `Index.tsx` has a site-wide center-right refresh button for phone testing. It is temporary and should be removed once browser refresh behavior is normal again.
- **Known unresolved phone bug** — on the user's real phone, after the Baxsaa slide, the later case-study slides briefly appear and then turn black/dark. This was not fixed in this session. Next session should start here, using the live phone path first. Likely files to inspect: `SlideReveal.tsx`, `CaseStudyLayout.tsx`, `CaseStudySlide.tsx`, `use-mobile.tsx`, `index.css` mobile visibility overrides, and the Blossom carousel mobile branch in `ParallaxCardSlider.tsx`.
- **Slide 2 mobile animation carry-over** — the Hyperspeed/running-lines mobile animation was re-enabled/tuned earlier but was still unreliable on the user's phone. Keep it as a later follow-up after the case-study black-screen bug.
- **Deploy hardening (still pending commit)** — `.github/workflows/deploy.yml` still has local retry flags, but it is not included in this push because the current remote auth rejects workflow-file changes without `workflow` scope.
- `git diff --check`, `npm run lint`, and `npm run build` pass; only the known Browserslist and `vendor-lanyard` chunk warnings remain.

---

## Current State (as of Session 27 push prep)

**Session 27** is a live mobile polish pass on slides 2 (Who We Are) and 4 (Services), with zero desktop change (both use `isMobile` branches or mobile-only Tailwind/`md:` pairs).

- **Slide 2 (`SkyrocketSlide`) mobile** — more breathing room (centered, larger headline, bigger gaps/padding). `Priority sectors` now render as an auto-scrolling CSS marquee of teal pills (two duplicated sets, `translateX(-50%)` loop, edge mask-fade, `prefers-reduced-motion` pauses it) instead of the desktop vertical list. `What this means for buyers` is now a two-column card grid with the final card spanning full width. An earlier attempt to reuse the `LogoLoop` component failed: LogoLoop measures sequence width from `<img>` children, and the icon pills have none, so it measured ~0 and over-duplicated to ~965 items off-screen (invisible). Replaced with a self-contained CSS marquee (`who-sector-marquee` keyframe in `index.css`).
- **Slide 4 (`ServicesSlide`) mobile** — bigger structural redesign. The category tabs became a two-row segmented icon bar (3 + centered 2) so all five verticals are visible with no hidden horizontal scroll. The highlighted category now auto-advances every 3.5s (re-armed on each change so a manual tap resets it; paused under reduced motion; cleared when the slide unmounts offscreen). The right panel is a numbered build-sequence stepper on a teal spine, titles only — descriptions are dropped on mobile to cut the "wall of text." Each category is consolidated from five services to three headline groups on mobile via a new `mobileServices` map; desktop CardSwap still shows all five with descriptions. Item swaps fade in via the `sv-step-in` keyframe.
- **Deploy hardening (still pending commit)** — the `--retry 5 --retry-all-errors --retry-delay 10` flags on the Actions webhook `curl` (documented after the 2026-06-04 incident) remain uncommitted on disk. The Session 27 push could not include `deploy.yml` because the remote PAT lacks `workflow` scope (push rejected). Land it separately after `gh auth refresh -s workflow` (and switch the remote off the embedded PAT), or commit the one file via the GitHub web UI.
- `npm run lint` (0 warnings) and `npm run build` pass; only the known Browserslist and `vendor-lanyard` chunk warnings remain.

---

## Current State (as of Session 26 push prep)

**Session 26** is the live mobile polish pass after the Hallmark credentials deck. The only intentional desktop visual change is the cover headline: it now reads `We turn [rotating industry] businesses into brands buyers actually [rotating trust word]`. The two dynamic teal pills are local React components powered by Anime.js, with dynamic width animation so shorter words shrink the pill. Mobile cover spacing, wordmark centering, logo scale, partner badge fit, and the shiny case-study CTA were tuned. Slide 2 now uses clearer buyer-outcome language, Our Team uses Anime.js for the roster/card transition and removes duplicate mobile card names, and the Proof Clients slide removes the market-note grid while centering and slightly speeding the logo slider. `git diff --check`, `npm run lint`, and `npm run build` pass; only the known Browserslist and `vendor-lanyard` warnings remain.

---

## Deployment Pipeline & Operations

> How the live site at https://www.owlsurf.media gets updated, and how to recover when it doesn't. Added 2026-06-04 after a missed-deploy incident.

**Push-to-deploy chain.** A push to `main` updates production in ~10-60s with no manual step:

1. GitHub Actions `.github/workflows/deploy.yml` fires on push to `main`.
2. It sends `POST https://www.owlsurf.media/deploy` with header `X-Deploy-Token: ${{ secrets.DEPLOY_TOKEN }}`.
3. On the VPS, `deployment/server.js` (Express, bound to `127.0.0.1:8081`, reverse-proxied at `/deploy`) checks the token, then spawns `deployment/deploy.sh` **detached** with `child.unref()`. The `200` response is only an ack — the build runs after the response returns, so a fast `200` does not mean the build succeeded.
4. `deployment/deploy.sh`: `git fetch` → `git reset --hard origin/main` → `npm ci` → `npm run build` → `pm2 restart heyowlsurf`. Logs to `deployment/logs/deploy.log`; self-locks via `deployment/.deploy-lock` (mirrored by an in-memory flag in `server.js`) so deploys can't overlap.

**Webhook resilience follow-up.** The desired Actions `curl` retry flags (`--retry 5 --retry-all-errors --retry-delay 10`) are present locally but not pushed yet because the current remote auth rejects workflow-file changes without `workflow` scope. Until that lands, a brief VPS blip can still fail the deploy.

**Failure mode is silent.** There is no alerting. A failed deploy just leaves the live site on the previous build — the only symptom is "my push didn't show up." It does **not** retry itself once the Actions job has ended.

**Incident, 2026-06-04.** A push (`e930531` "Polish mobile deck slides") didn't go live. Diagnosis: `git push` reached GitHub fine (local `HEAD` == `origin/main`), the Actions workflow ran, but the deploy step failed in 22s with `curl: (28) Failed to connect to www.owlsurf.media port 443 after 15001 ms: Timeout`. The webhook never reached the VPS, so `deploy.sh` never ran. From a separate machine the endpoint was healthy minutes later (DNS → `187.127.133.27`, `GET /` → `200`, `POST /deploy` without token → `403`), confirming a **transient VPS unavailability** at the moment the webhook fired — most likely the box being saturated/unresponsive during a build or `pm2 restart` (the `vendor-lanyard` Three.js chunk makes the build heavy on a small VPS). Not a repo or pipeline bug. Recovered with `gh run rerun 26956763977`, which succeeded; live site returned `200`. Retry flags were added afterward to absorb future blips.

**Recovery runbook.**
1. `gh run list --limit 5` — find the `failure`; `gh run view <id> --log` for the reason.
2. Verify endpoint from any machine: `GET https://www.owlsurf.media/` should be `200`; `POST /deploy` (no token) should be `403`.
3. Re-fire: `gh run rerun <id>`. Idempotent — only rebuilds `origin/main`. No force-push, no history rewrite, nothing on teammates' machines. `git reset --hard` discards uncommitted edits made directly on the VPS, so don't hand-edit on the server.
4. On the VPS: `tail deployment/logs/deploy.log`, `pm2 status` / `pm2 logs heyowlsurf`, clear a stale `deployment/.deploy-lock` if a deploy died mid-run.

**Open follow-up.** Investigate *why* the VPS goes unreachable during deploys (likely build memory pressure from `vendor-lanyard`); consider building to a temp dir and swapping, or capping build concurrency. Plus the standing security item: rotate the plaintext GitHub PAT in `.git/config` and move the remote to SSH or a credential helper.

---

## Current State (as of Session 25 push prep)

**Session 25** is a Hallmark-led B2B credentials pass on top of Sessions 23 and 24. It adds a locked Hallmark design system (`design.md`, `tokens.css`, `.hallmark/`) and sharpens the deck as a concise portfolio-PDF replacement for Indian and international B2B buyers in chemical, industrial, and technical markets. The cover now reads `When the product is complex, the choice shouldn't be.`, uses a right-side editorial signal graphic instead of a literal proof/info box, and keeps the mobile WebGL gating from Session 23. Case studies now include proof/info panels, larger taglines, right-shifted creative carousels, and more translucent inactive carousel cards. The nav remains compact and centered with short labels. `npm run lint` and `npm run build` pass; only the known Browserslist and `vendor-lanyard` warnings remain.

---

## Current State (as of Session 24 push prep)

**Session 24** is a mobile-only layout pass on top of Session 23. It fixes the slides that clipped or broke on phones, with zero desktop change (verified with both desktop and mobile screenshots). Services no longer hides its cards off-screen on mobile — the 3D `CardSwap` is replaced by a readable service list plus a horizontal-scroll pillar-chip row; Our Team swaps the clipped WebGL lanyard for a static badge card on mobile; Who We Are is compacted so the headline and differentiator cards stop clipping; Clients is balanced instead of showing a large empty void. A Playwright screenshot harness (`scripts/mobile-shots.mjs`) was added and `playwright` kept as a devDependency. `npm run lint` passes with 0 warnings. See the Session 24 log entry below and `handoff.md`.

---

## Current State (as of Session 23 push prep)

**Session 23** is an accessibility + performance hardening pass on top of Session 22. It clears most of the P0 UX-audit backlog without touching the desktop visual design: real ARIA semantics in `PillNav` and the Services pillar tabs (with keyboard nav), a new `prefers-reduced-motion` hook wired into the deck scroll + auto-advancers, mobile gating of the heavy WebGL backdrops (now matching `prod.md` line 22), a roster-contrast fix, the Contact `<main>`→`<div>` landmark fix, a local OG image, and a soft slide skeleton that removes the black flash between slides. `npm run lint` passes with 0 warnings and `npm run build` passes (only the known `vendor-lanyard` chunk warning remains). See the Session 23 log entry below and `handoff.md` for the full breakdown.

---

## Current State (as of Session 22 push prep)

**Live URL:** Was on Vercel (domain broken — needs reconnect). GitHub: `Manasxxx/presentation-palette-perfect`.
**Dev:** `npm run dev` → `localhost:8080` (port hardcoded in `vite.config.ts`).
**Stack:** Vite + React 18 + TypeScript + Tailwind 3 + Anime.js + GSAP + shadcn/ui remnants only where still imported.
**Latest working state:** Session 22 completed the live visual pass across the cover, Services, case studies, Contact footer, and Our Team lanyard. The cover now keeps the centered/top-half globe treatment, uses larger cropped partner badge images, reads `OWLSURF DIGITAL`, and no longer shows the top-right `Credentials / 01` label. Services keeps the left-pillar/right-CardSwap structure, but the first `Brand & Story` vertical cards now split text left and clip-art SVG illustration right. All non-Mitsui case studies now use the shared Mitsui-style `CaseStudyLayout`; Mitsui and Raychem include the additional WebP creatives from Downloads. Our Team uses the left-side cylindrical name roulette and the lanyard badge now shows the person's field/title in place of their name. The stale Slide 2 engineer PNG and old lanyard PNG were removed, unused UI dependencies were uninstalled, lint is clean, and `npm run build` passes with the known lanyard chunk warning.

---

## Session Log

### Session 26 — Mobile cover, Slide 2, Team, and Proof Clients polish

**What was done:**

**1. Cover headline and CTA** (`src/components/slides/TitleSlide.tsx`, `src/components/ui/word-rotate.tsx`, `src/components/ui/animated-shiny-text.tsx`)
- Replaced the prior cover line with `We turn [rotating industry] businesses into brands buyers actually [rotating trust word]`.
- Added a local `WordRotate` component that uses Anime.js for word exit/entry and dynamic pill width, respecting reduced motion.
- Rotating industry words: `Solar`, `Industrial`, `Chemical`, `Pharma`, `Manufacturing`, `Mobility`, and `Real Estate`.
- Rotating buyer-confidence words: `trust`, `choose`, `believe`, `prefer`, and `buy from`.
- Replaced the review-case-studies button text treatment with local `AnimatedShinyText`, preserving the same action.

**2. Cover mobile fit** (`TitleSlide.tsx`)
- Centered the top `OWLSURF DIGITAL` wordmark on mobile.
- Removed the mobile credentials subline and the mobile strategy/content/demand paragraph.
- Removed the teal vertical rule from the headline area.
- Tuned heading spacing, shifted the CTA/badges upward, enlarged the logo circle, and compacted the partner badges so all four remain visible on one line.

**3. Slide 2 buyer-outcome layout** (`src/components/slides/SkyrocketSlide.tsx`)
- Improved the heading visibility for `What we understand`, `Priority sectors`, and `What this means for buyers`.
- Removed the old rule/em-dash styling and removed `Why this replaces the PDF`.
- Changed the headline to `Long sales. Technical buyers.`, with `sales.` and `buyers.` in teal cursive styling.
- Replaced generic differentiators with buyer outcomes: `Clear first look`, `Faster buy-in`, `Less explaining`, `Credible proof`, and `Sales alignment`.

**4. Our Team mobile and animation polish** (`src/components/slides/OurTeamSlide.tsx`)
- Shifted the mobile heading upward and removed the rule before `Core team`.
- Removed the duplicate employee name from the mobile card and moved the designation/title into the primary card text slot.
- Reworked the roster roulette and mobile card change animation to Anime.js so the slider moves smoothly instead of snapping.

**5. Proof Clients slider cleanup** (`src/components/slides/ClientsSlide.tsx`)
- Shifted the heading upward.
- Removed the four market-note lines below the heading.
- Centered the logo loop in the available slide space.
- Increased the two logo loop speeds slightly.

**Verification:**
- `git diff --check` passed.
- `npm run lint` passed.
- `npm run build` passed.
- Known build notices remain the stale Browserslist/caniuse-lite warning and the large `vendor-lanyard` chunk warning.

### Session 25 — Hallmark B2B credentials pass, cover redesign, case-study proof polish

**What was done:**

**1. Hallmark design system** (`design.md`, `tokens.css`, `.hallmark/`, `src/index.css`)
- Added a locked Hallmark design system for an editorial, technical OwlSurf credentials deck.
- Imported the portable tokens into `src/index.css` and kept `overflow-x: clip` on `html` and `body` per Hallmark mobile-safety guidance.
- Captured Hallmark preflight/log metadata in `.hallmark/`.

**2. Cover redesign** (`src/components/slides/TitleSlide.tsx`, `src/index.css`)
- Removed the literal `Portfolio proof` information box and the small explanatory top-right cover copy.
- Added a right-side editorial signal graphic: OwlSurf mark, grid, orbit rings, signal nodes, and a subtle moving scan sweep.
- Reworked the heading to `When the product is complex, the choice shouldn't be.` with a calmer typographic hierarchy.
- Preserved the Session 23 mobile WebGL gating: the globe remains desktop-only.

**3. B2B portfolio copy and slide polish** (`TitleSlide`, `SkyrocketSlide`, `ServicesSlide`, `ClientsSlide`, `ContactSlide`)
- Reframed the deck as a concise portfolio-PDF replacement for B2B buyers in chemical, industrial, and technical sectors.
- Updated Services into buyer-facing language for brand/story, demand generation, discovery, marketing stack, and AI/autopilot work while preserving the Session 23 tab semantics and Session 24 mobile list fallback.
- Tightened Clients and Contact copy around proof, sector fit, and long-cycle B2B work.

**4. Case-study proof system** (`CaseStudyLayout.tsx`, all case-study slides, `ParallaxCardSlider.tsx`)
- Added larger proof/info panels to case-study slides, then aligned those panels vertically with the creative carousel band.
- Increased case-study tagline text size.
- Shifted creative carousels farther toward the right edge and made inactive carousel images more translucent so the left proof panel remains readable.
- Added market, buyer, role, and proof context to each case study while keeping the deck concise.

**5. Navigation polish** (`PillNav.tsx`, `PillNav.css`)
- Restored a compact centered header after the broken full-width split experiment.
- Kept shorter labels: `Cover`, `Positioning`, `Team`, `Services`, `Proof`, `Cases`, `Contact`.
- Preserved the Session 23 plain nav/list/button semantics and mobile-menu accessibility wiring.

**Verification:**
- `git diff --check` passed during the polish pass.
- `npm run lint` passed.
- `npm run build` passed. Build still prints the stale Browserslist/caniuse-lite notice and the known large `vendor-lanyard` chunk warning.
- Browser/screenshot verification was skipped per the user's standing preference; visual approval remains with the user in their live browser.

### Session 24 — Mobile-only layout fixes

**What was done** (all changes mobile-gated; desktop untouched and screenshot-verified):

**1. Services cards visible on mobile** (`src/components/slides/ServicesSlide.tsx`)
- The desktop 3D `CardSwap` stack is positioned absolutely (`bottom:30%`, scaled) and on phones it sat off-screen below the pillar list — the actual service content was invisible, leaving a blank lower half. On mobile (`useIsMobile()`) the right panel now renders the active category's five services as a plain readable list (icon + teal title + description). The left pillar column switches from a vertical column to a horizontal-scroll chip row (`flex overflow-x-auto` on mobile, `md:flex-col`), with the per-category count badge hidden on mobile to keep chips compact. Heading and paddings compacted so all five service rows fit a 360×740 phone. Desktop keeps the pillars + `CardSwap` exactly as before.

**2. Our Team static badge on mobile** (`src/components/slides/OurTeamSlide.tsx`)
- The WebGL + Rapier lanyard (≈680px) was clipped on phones — only the strap showed, the badge was below the fold. On mobile the lanyard is no longer mounted; instead a static badge card shows the active member's avatar, name, and field/title. The roster roulette height drops from 390px to 286px on mobile so roster + badge fit. Desktop still mounts the live lanyard.

**3. Who We Are fits one viewport** (`src/components/slides/SkyrocketSlide.tsx`)
- Content was taller than the phone viewport and vertically centered, so the headline clipped at the top and the differentiator cards clipped at the bottom. Mobile now top-aligns (`justify-start md:justify-center`), uses a smaller headline (`text-[2rem] sm:text-[2.5rem] md:` original clamp), tighter gaps/paddings/industry-row spacing, and turns the three differentiator cards into a horizontal swipe row on mobile (`flex overflow-x-auto`, `sm:grid sm:grid-cols-3`). Nothing clips.

**4. Clients balanced on mobile** (`src/components/slides/ClientsSlide.tsx`)
- The `my-auto` logo block left a large empty void under the heading. On mobile the heading + logo rows are centered together as a group (`justify-center md:justify-start`, cards `mt-8 md:my-auto`), and the heading uses a smaller mobile size. Desktop layout unchanged.

**5. Mobile verification harness** (`scripts/mobile-shots.mjs`, `playwright` devDependency)
- Added a Playwright script that screenshots each slide against the running dev server at a configurable viewport (`SHOT_TAG`, `SHOT_W`/`SHOT_H`, `SHOT_ONLY`, `SHOT_DESKTOP`). Output lives under `scripts/_shots/` (gitignored). `playwright` is kept as a devDependency for future mobile/visual passes.

**Rationale:**
- The deck owner asked for a phone pass with no desktop change. Phones were the long-open "mobile layout" item in Known Issues. Heavy/absolute widgets (the lanyard, the `CardSwap` stack) cannot just be scaled to fit, so they get purpose-built mobile variants behind `useIsMobile()`; everything else is compaction via `max`/`md:` class pairs. Slides are kept inside one viewport rather than made internally scrollable, to avoid fighting the deck's `scroll-snap-type: y mandatory`.

**6. Removed the scaffolding tool's branding** (`vite.config.ts`, `package.json`, `package-lock.json`, `bun.lock`/`bun.lockb`, `README.md`)
- Dropped the builder-branded dev tagging plugin (import + usage in `vite.config.ts`, and the package itself) so the build no longer pulls a scaffolding-tool plugin. Deleted the stale `bun.lock`/`bun.lockb` (the repo uses npm) since they were the last files naming the tool. Reworded the OG-placeholder notes in the docs. Rewrote `README.md` from scratch: the old one described a team slide (`ProfileCard`/`Radar`) that was deleted in Session 11 and claimed lint had typing debt that was cleared in Session 22.

**Verification:**
- Playwright mobile screenshots at 390×844 and 360×740 confirm no clipping and no horizontal overflow on every slide; a 1440×900 desktop capture of Services and Our Team confirms the desktop `CardSwap` and lanyard render unchanged.
- `npm run lint` passes with 0 warnings; `npm run build` passes (only the known `vendor-lanyard` chunk-size warning).

### Session 23 — Accessibility + performance hardening (P0 backlog)

**What was done:**

**1. ARIA semantics + keyboard** (`src/components/PillNav.tsx`, `src/components/slides/ServicesSlide.tsx`)
- `PillNav` shed the bogus `role="menubar"` / `role="none"` / `role="menuitem"` markup (a menubar role implies app-menu keyboard semantics this nav never had). It is now a plain `nav > ul > li > button`, active items carry `aria-current="page"`, the hamburger exposes `aria-expanded` + `aria-controls`, and the mobile menu closes on Escape, focuses the first item on open, and restores focus to the hamburger on close.
- The Services pillar buttons became a real WAI-ARIA vertical tablist: `role="tablist"` / `role="tab"` / `role="tabpanel"`, `aria-selected`, `aria-controls` / `aria-labelledby`, roving `tabIndex`, and ArrowUp/Down/Left/Right + Home/End handling that moves selection and focus together.

**2. Contrast + landmarks** (`src/components/slides/OurTeamSlide.tsx`, `src/components/slides/ContactSlide.tsx`)
- Inactive roster names were `text-white/22` (fails WCAG AA). Raised to `text-white/65` (hover `/90`) and lifted neighbor-row opacity `0.42` → `0.6` so adjacent names read while the carousel depth stays.
- Contact's inner `<main>` (nested inside the slide `<section>`, and one of 13 per-slide mains) is now a `<div>`.

**3. Mobile WebGL gating** (`TitleSlide`, `SkyrocketSlide`, `ServicesSlide`, `ClientsSlide`)
- `prod.md` line 22 already required heavy effects to be desktop-only, but the deck mounted them on mobile too. Gated behind `useIsMobile()`: `LightRays` + `Globe` (cover), `Hyperspeed` (Who We Are), `LightRays` (Services), `PrismaticBurst` (Clients). Desktop is unchanged; mobile keeps the static gradient backdrops already in place.

**4. prefers-reduced-motion** (`src/hooks/use-reduced-motion.tsx` + wiring)
- New `usePrefersReducedMotion` hook. Wired into the `Index.tsx` deck `scrollTo` (smooth → instant) and the container `scroll-smooth` class, the `OurTeamSlide` roster auto-advance (pauses), and `CardSwap` via a new `reduceMotion` prop that snaps cards with ~0s tweens but keeps the cycle running so back-card content stays reachable.

**5. Slide-mount flash + OG image** (`src/pages/Index.tsx`, `index.html`)
- `SlideFallback` was an empty black `section`; it is now a soft branded skeleton (faint teal radial), removing the black flash while the next lazy chunk loads. `SLIDE_MOUNT_RADIUS` was kept at `0` on purpose to respect `prod.md` line 23.
- `og:image` / `twitter:image` no longer point at an external placeholder; they use local `/favicon.png` (a square stopgap, not a true 1200×630 card).

**Rationale:**
- These were the long-parked P0 items from the Session 11 IxDF audit. They are objective best-practice fixes (WCAG, reduced motion, the deck's own mobile-perf rule) and were chosen for low visual risk so the established OwlSurf identity and all the `prod.md` "do not reintroduce" rules stay intact.
- `SLIDE_MOUNT_RADIUS` was intentionally NOT bumped to 1: that conflicts with `prod.md` line 23 and would keep offscreen WebGL canvases alive (the lag the rule exists to prevent). The skeleton fixes the visible symptom without that tradeoff.

**Verification:**
- `npm run lint` passes with 0 warnings.
- `npm run build` passes; only the known large `vendor-lanyard` chunk warning remains.
- Browser/visual approval remains with the user per standing preference.

### Session 22 — Visual polish, shared case-study layout, asset/dependency cleanup

**What was done:**

**1. Cover partner and globe polish** (`src/components/slides/TitleSlide.tsx`, `src/assets/badge-*.png`)
- Centered the globe on the title page and shifted/clipped it so only its top half is visible from the bottom zone.
- Enlarged and aligned the partner badges; the Meta Business Partner and Google Partner source images were cropped tighter so the visible badge content, not white padding, controls the perceived size.
- Removed the top-right `Credentials / 01` label, changed the brand lockup to `OWLSURF DIGITAL`, and slightly enlarged the OwlSurf logo mark.

**2. Services first vertical illustrations** (`src/components/slides/ServicesSlide.tsx`, `src/assets/service-illustration-*.svg`)
- Added clip-art SVGs only for the first service vertical (`Brand & Story`).
- The moving CardSwap cards now use a two-column body: description on the left, illustration on the right, giving the right side most of the bottom-half card space.
- Other service verticals keep the existing text-only card format.

**3. Case-study layout + creative additions** (`src/components/slides/CaseStudyLayout.tsx`, case-study slides, `src/assets/*extra*.webp`)
- Added the additional Mitsui and Raychem WebP creatives from the user's Downloads assets folder into their existing slideshows.
- Added shared `CaseStudyLayout` and applied the Mitsui-style formatting to Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG.
- Mitsui remains its custom proof-strip + bottom carousel layout; the shared layout keeps consistent heading, proof strip, and bottom carousel behavior for the rest.

**4. Contact footer and Our Team lanyard polish** (`src/components/blocks/FlyonFooter.tsx`, `ContactSlide.tsx`, `OurTeamSlide.tsx`, `src/components/ui/Lanyard/Lanyard.jsx`)
- Contact footer alignment was tightened so the logo pill, contact links, and copyright line sit on a cleaner shared vertical rhythm.
- Our Team's left roster is now a smoother cylindrical name roulette. Duplicate name text was removed from below the lanyard.
- Lanyard badge avatar crops are centered in their circles. The badge now draws the person's field/title horizontally in place of their name.

**5. Cleanup and efficiency pass** (`package.json`, `package-lock.json`, `vite.config.ts`, visual helper files)
- Removed stale unreferenced assets: `src/assets/industrial-engineer-slide-2.png` and `src/assets/lanyard/lanyard.png`.
- Removed unused dependencies: `@gsap/react`, `@radix-ui/react-slot`, `@radix-ui/react-toast`, `@radix-ui/react-tooltip`, and `class-variance-authority`.
- Tightened `vite.config.ts` manual chunks so they no longer name removed packages.
- Cleaned existing lint blockers in WebGL helper typings and Tailwind config import style so `npm run lint` now passes.

**Verification:**
- Asset filename scan reports no obvious unused files in `src/assets`.
- Only one asset over 1 MB remains: the existing lanyard `card.glb`.
- `npm run lint` passes.
- `npm run build` passes. Build still prints the stale Browserslist/caniuse-lite notice and the known large `vendor-lanyard` chunk warning.
- Browser/screenshot verification was skipped per the user's standing preference; visual approval remains with the user in their live browser.

### Session 21 — Cover + Who We Are redesign, Our Team polish, CardSwap freeze fix

**What was done:**

**1. Cover (TitleSlide) redesigned hook-first** (`src/components/slides/TitleSlide.tsx`)
- Lead element is now an editorial hero headline `We make complex products easy to buy.`, with the accent phrase in a cursive serif (Lora) teal treatment, plus a thin teal seam down the left.
- The `OWLSURF` wordmark + subline moved to a smaller top-left brand lockup; the eyebrow + `01` index sits top-right; the animated `OwlSurfLogo` circular glass/ring mark stays on the right.
- Removed the `What We Do` / `Made For` info columns. The `See case studies` CTA is centered in the bottom zone, with the partner badge strip centered beneath it under a `Trusted partner` label. Badge max-heights were trimmed so the strip reads as one neat row.
- Spacing opened up (`py-16 md:py-24`).

**2. Who We Are (SkyrocketSlide) fully redesigned** (`src/components/slides/SkyrocketSlide.tsx`)
- Removed the right-edge engineering illustration (`industrial-engineer-slide-2.png` import dropped) and the italic `HighlightPhrase` marker-highlight component.
- Kept the Hyperspeed running-lines background; lightened the panel fill and raised Hyperspeed opacity (~0.7) so the lines stay visible.
- New full-width three-block layout: top-left message (eyebrow `Who we are / 02` + headline + short manifesto), top-right `Industries we serve` rail (5 industries with icon + descriptor tag, no leading numbers, hover `↗`), and a full-width `What makes us different` differentiator-card row across the bottom (`One team, end to end` / `Engineering-fluent` / `Outcome-led`).
- Headline copy `Hard to explain.` / `Easy to choose.`: `Hard to` / `Easy to` are white upright Montserrat; `explain.` / `choose.` use the cursive Lora serif in teal gradient. Manifesto tightened to one short idea.

**3. Our Team (OurTeamSlide) polish** (`src/components/slides/OurTeamSlide.tsx`)
- Removed the `01`–`06` index numbers next to roster names.
- Fixed scroll-in lag: the lanyard (WebGL + Rapier physics + large generated band texture) was initializing during the scroll-snap. It is now gated behind a `showLanyard` state and mounted ~650ms after the slide becomes visible, so the heading/roster entrance stays smooth and the lanyard drops in after the slide settles. The stage `min-h` preserves layout height while deferred.

**4. Services CardSwap freeze fix** (`src/components/ui/CardSwap/CardSwap.jsx`)
- The swap loop ran from `window.setInterval`, outside GSAP's rAF ticker. After the heavy initial load the ticker could be asleep, so swap tweens created from the interval didn't render and the stack sat frozen until a user interaction (hover/click) woke rAF.
- Replaced the interval with a self-scheduling `gsap.delayedCall` loop and call `gsap.ticker.wake()` on mount, keeping the whole cycle inside the ticker. Pause/resume on hover now pause/resume the delayedCall and re-wake the ticker.

**Rationale:**
- The user wanted the cover and Who We Are slides to be more memorable and less generic, with copy that sticks (the `Hard to explain. / Easy to choose.` line was specifically approved). The differentiator row is intentionally not a service list because Services has its own slide.
- The Our Team lag and the CardSwap freeze were both initialization/timing issues around heavy or ticker-driven work on slide entry.

**Verification:**
- `npm run build` was run before this push (see Verified / Evidence in handoff.md).
- Browser visual approval remains with the user per the standing preference.

### Session 20 — VPS/domain migration documentation

**What was done:**

**1. VPS/domain migration guide** (`docs/vps-domain-migration.md`)
- Documented the production model: `npm run build` creates a static `dist/` folder that can be served by Nginx, Caddy, or another static server.
- Added VPS prerequisites, DNS checklist, first-deploy steps, update steps, TLS/Certbot command, cache policy, SPA fallback requirement, smoke tests, rollback structure, and maintainer notes.
- Captured the important React Router hosting rule: unknown app paths should fall back to `/index.html`, not a raw server 404.

**2. Dependency and runtime notes** (`docs/dependencies.md`)
- Documented npm as the deployment package manager because `package-lock.json` is present.
- Added Node guidance using `.nvmrc` as the target, currently Node 22.
- Grouped app, animation/WebGL, build, test, and lint dependencies so a future maintainer can see what matters for migration.
- Noted that `npm run images:convert` imports `sharp`, but `sharp` is not currently installed.
- Documented that production serving does not require Node when the built `dist/` directory is served statically.

**3. Deploy config examples** (`deploy/README.md`, `deploy/nginx-site.conf.example`, `deploy/Caddyfile.example`)
- Added example Nginx and Caddy static-server configs with root pointing at `/var/www/owlsurf/current/dist`.
- Included cache headers for hashed Vite assets and `index.html`.
- Included the SPA fallback needed for the branded route-level 404.

**4. Config breadcrumbs** (`.nvmrc`, `.env.example`, `README.md`)
- Added `.nvmrc` with Node `22`.
- Added `.env.example` explaining that no environment variables are currently required and warning not to put private secrets in `VITE_` browser variables.
- Updated README deployment section to point maintainers to the migration docs and deploy examples.

**Rationale:**
- The user is moving hosting to a VPS and domain and asked for documentation/config support only. The website behavior, slide code, assets, and styling were intentionally not changed.
- The docs assume static hosting from `dist/`, which is the simplest production shape for this Vite SPA.

**Verification:**
- `git diff --check` passed.
- `npm run build` passed before push. Build output still shows the known large `vendor-lanyard` warning and stale Browserslist data notice.

### Session 19 — Cover badge assets, magnetic CTA, Mitsui proof-strip layout

**What was done:**

**1. Cover credibility badges** (`src/components/slides/TitleSlide.tsx`, `src/assets/badge-*.png`)
- Replaced the text-only badge pills with downloaded image badge assets for Meta Business Partner, Google Partner, LinkedIn Marketing Partner, and HubSpot Partner.
- Moved the badges into a bottom-right two-line arrangement and kept the animated OwlSurf logo in its original right-side circular logo flow.

**2. Cover CTA magnetic button** (`src/components/ui/MagneticButton.tsx`, `src/components/slides/TitleSlide.tsx`)
- Added a local SmoothUI-inspired magnetic button component.
- Mounted it on the cover `See case studies` CTA while preserving the existing shimmer and click behavior.

**3. Mitsui case study layout** (`src/components/slides/CaseStudySlide.tsx`)
- Removed the temporary AI Elements-style web-preview block from the slide.
- Reworked the slide into a top-left `Mitsui Chemicals` heading, a top-right Hover-style proof strip, and a bottom-centered `ParallaxCardSlider`.
- Reordered the stats to avoid adjacent percentage metrics: impressions, ad clicks, engagement increase, ROI, follower growth.
- Added an up-right trend icon to the `99.2%` engagement increase metric and normalized number/label typography.
- Fixed the carousel centering bug by moving the `-translate-x-1/2` positioning transform to an outer wrapper so Anime.js can animate the inner slider without overriding layout centering.

**4. Local plan note** (`ui-design-plan.scratch.md`, not committed)
- Added future notes to consider a Hover.dev-inspired testimonials section and to refresh case-study visuals with more current social-media-sourced assets.

**Verification:**
- `npm run build` passed before push.
- Browser/screenshot verification was skipped by user preference; visual approval remains with the user.

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
- Session 22 removed the previously noted unused UI/animation dependencies and tightened `vite.config.ts` manual chunks. `tailwindcss-animate` stays because `tailwind.config.ts` still uses it.

**Verification:**
- `npm run build` passes after the copy edits and after the orphan-file deletes.
- At the time, `npm test` / `npm run lint` were not re-run; Session 22 later cleaned the visual-component lint blockers and `npm run lint` now passes.

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
| Services as 5-pillar tabbed CardSwap | Slide 4 uses left-side pillar tabs + right-side CardSwap stack. Five pillars (`Brand & Story`, `Demand Gen`, `Discovery`, `Marketing Stack`, `AI & Autopilot`), 5 sub-services each. Card headings teal, monster-styled. `key={activeKey}` on CardSwap forces remount per tab so gsap timeline doesn't desync. The first vertical can use text-left/illustration-right cards; the other verticals remain text-only unless the user asks to extend the illustration format. |
| CardSwap stack readability | Cards designed so the icon + title row fits in the top `verticalDistance` (52px) — keep small icon (`h-8`) and small monster heading (`text-base font-black`) pinned to the top edge. That makes all stacked headings peek visibly in a staircase. |
| AI & Automation as a top-level pillar | Treated as a peer to Content, Reach, Search, and Data — not a sub-skill. Mention AEO, Marketing Copilots, AI Personalization explicitly because B2B buyers now expect them. |
| Ambient WebGL DPR cap | LightRays, PrismaticBurst, and Hyperspeed cap DPR at `1.25` to reduce heat/lag on Retina displays. These are ambient backgrounds, so do not raise back to full devicePixelRatio unless visual quality truly requires it. |
| Contact logo animation layering | Keep `ct-mark` for absolute positioning and animate only `ct-mark-inner`; animating the positioned wrapper overwrites centering transforms and misaligns the logo/ripples. |
| Case-study shared layout | Mitsui keeps its custom proof-strip + bottom carousel layout. Baxsaa, CultFit, GirlUp, CTP, VNT, and Raychem RPG now use `CaseStudyLayout`, a shared Mitsui-style structure with top-left heading, top-right stat strip, and bottom-centered carousel. Keep future per-case-study edits inside the shared layout when possible. |
| `ParallaxCardSlider` `cardWidth` prop | Slider exposes an optional `cardWidth` (default `"min(32vw, 340px)"`). Per-case-study layouts can tune this without forking the slider. Mitsui uses `"min(24vw, 320px)"` on desktop. The slider's parent must be `min-w-0` for the prop to actually shrink/grow inside a flex row. |
| Case-study slider right-edge bleed | For the Mitsui split layout, the slider sits in a `flex-1 min-w-0 justify-start self-center` wrapper so its right edge can clip past the section bound at common widths. This is deliberate — section `overflow-hidden` clips the bleed and the copy column stays at its `shrink-0` width. Do not add `overflow-hidden` to the slider wrapper or anchor it `justify-center`, both will recenter the slider and reintroduce the column-squeeze regression caught during Session 13. |
| Case-study stats: no LiquidGlassCard | Baxsaa's pills were rewritten with a simple translucent fill + 1px brand-color hairline + backdrop-blur instead of `LiquidGlassCard`. The card library's pre-baked saturate/brightness fights brand color tints (especially on the Baxsaa cream background). Prefer the custom pill until a clear `LiquidGlassCard` use case returns. Mitsui's vertical stat list uses the same idea: an icon-circle with brand color border + a big-number + small-label layout, no glass card wrapper. |

---

## Known Issues / TODOs

- [ ] Vercel deployment broken — needs reconnect or redeploy.
- [ ] PNGs in `src/assets` not yet converted to WebP — run `npm run images:convert` after `npm i -D sharp`.
- [ ] `logo-main.jpg` used for owl logo — should be converted to WebP or replaced with SVG/PNG with transparency.
- [ ] Bundle `vendor-lanyard` remains very large (~3MB minified / ~1MB gzip) because the interactive lanyard isolates Three/Rapier/Drei/MeshLine in one chunk. Consider deeper lazy loading or a static mobile/team fallback if this becomes a real loading issue.
- [ ] Mobile layout for title slide not verified after redesign.
- [ ] Our Team uses Pankaj's avatar for Vishnu until a dedicated Vishnu avatar is supplied.
- [ ] The lanyard/strap/logo layout should still be judged by manual browser review; screenshot capture was intentionally skipped at the user's request.
- [ ] `npm audit` still reports dependency advisories after the unused-package uninstall (17 total at push prep). Review separately from visual work.

---

## File Map (key files only)

```
src/
  App.tsx                  — BrowserRouter shell, root deck route, catch-all 404 route
  pages/Index.tsx          — lazy slide registry, progressive mounting, scroll handler, nav
  pages/NotFound.tsx       — branded OwlSurf 404 page for unknown paths
  components/
    slides/TitleSlide.tsx  — cover slide, hook-led editorial layout, centered clipped globe, OWLSURF DIGITAL lockup, centered CTA + badge strip
    OwlSurfLogo.tsx        — animated SVG OwlSurf mark used in the cover logo slot
    ai-elements/WebPreview.tsx — local AI Elements-style web preview primitives
    blocks/FlyonFooter.tsx — compact FlyonUI-inspired footer block used on Contact
    slides/SkyrocketSlide.tsx — slide 2 Who We Are full-width editorial layout over Hyperspeed; message + industries rail + differentiator row (no illustration)
    slides/OurTeamSlide.tsx — cylindrical name roulette + single active team lanyard, deferred-mounted to avoid scroll-in jank
    slides/CaseStudyLayout.tsx — shared Mitsui-style layout for Baxsaa/CultFit/GirlUp/CTP/VNT/Raychem
    slides/CaseStudySlide.tsx — Mitsui custom proof-strip case study with expanded WebP carousel
    slides/RaychemRPGCaseStudy.tsx — Raychem case study with refreshed and additional WebP creatives
    ui/Lanyard/            — React Bits lanyard, OwlSurf strap, active badge avatar, role/title drawn on badge
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
docs/vps-domain-migration.md — VPS/domain migration guide
docs/dependencies.md      — dependency and runtime notes
deploy/                   — Nginx and Caddy static hosting examples
prod.md                    — design principles + product philosophy
context.md                 — this file
```
