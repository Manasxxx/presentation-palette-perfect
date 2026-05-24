# Handoff

## Session Rule

This repo has a mandatory continuity workflow.

Every new coding session should read these files first:
- `handoff.md`
- `context.md`
- `prod.md`

`handoff.md` must be updated:
- before any push
- before ending or clearing a session
- whenever the approach changes in a meaningful way
- whenever debugging reveals an important root cause

If a session looks close to running out of context or hitting limits, refresh `handoff.md` before stopping.

## Current Goal

Session 11 focused on a full deck UX audit + copy rewrite + dead-code cleanup.

The work was driven by an IxDF UX audit (see `ux-audit-report.pdf` + `ux-audit-report.html` at repo root) that scored the upper deck 48/85 (D, 56%). The audit flagged stale nav labels, agency-speak boilerplate across all 7 case studies, accessibility gaps, and large amounts of orphan code.

This session addressed the copy pass and dead-code cleanup. Accessibility, mobile WebGL gating, motion control, and slide-mount resilience (P0 / P1 from the audit) are still pending.

## Current State

The app is a Vite + React presentation-style SPA running on the fixed dev port:
- `http://localhost:8080/`

The dev server was running during this session.

### Deck text — current state per slide

- **Cover (Title)** — Eyebrow `CREDENTIALS`. Col 1 body `For the people who sell complex things`. Col 2 label `MADE FOR`. CTA `See case studies →`.
- **Slide 2 Who We Are** — Kicker `B2B marketing for complex markets`. H2 `WHO WE / ARE.` (declarative, period not question mark). Body keeps the signature line `We translate technical depth into market momentum.` with a smaller secondary line below: `For the marketing teams selling what engineers built.` Sector eyebrow `Where we work`.
- **Slide 3 Our Team** — Roster titles now lowercased + tightened: Harshit `Strategy & growth`, Sakshi `Client lead`, Manas `Digital strategy`, Sanskriti `Creative direction`, Pankaj `Build & ship`, Vishnu `Brand & identity`.
- **Slide 4 Services** — Five pillars renamed to B2B buyer language: `Brand & Story`, `Demand Gen`, `Discovery`, `Marketing Stack`, `AI & Autopilot`. All 25 service card descriptions rewritten to plainspoken / never-rude / no em-dash style. The repeating `B2B / Industrial` footer band was removed from every CardSwap card.
- **Slide 5 Clients** — Heading `OUR CLIENTS` (was `MAJOR CLIENTS`). Placeholder `Client` logo + `client-extra.png` import removed.
- **Slides 6–12 Case studies** — All seven headings dropped the `Success` boast suffix; the colour-gradient second word is now a sub-brand piece (e.g. `Mitsui Chemicals`, `Cult.fit`, `The Baxsaa Co.`, `Check This Property`, `Girl Up`, `VNT Mobility`, `Raychem RPG`). Every subtitle rewritten in `Who they are. What we did.` pattern (e.g. `Specialty chemicals giant. We ran their digital across APAC.`). Baxsaa SEO card heading is now `SEO clean-up` and the metric prose is tightened.
- **Slide 13 Contact** — Untouched. Signature line `LET'S MAKE / COMPLEX / obvious.` stays.

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

## Files Touched This Session

Copy rewrites:
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

Audit deliverable (root):
- `ux-audit-report.html`
- `ux-audit-report.pdf`

Doc updates:
- `handoff.md`
- `context.md`
- `prod.md`

Deletes: 16 orphan files (see list above).

## Verified / Evidence

- `npm run build` passes after copy edits and after orphan-file deletes.
- `npm test` / `npm run lint` were not re-run in this session after the deletes; the project's pre-existing lint debt in `LightRays.tsx`, `Hyperspeed.tsx`, `PrismaticBurst.tsx`, and `tailwind.config.ts` is still expected to fail lint.
- Visual screenshot capture was intentionally skipped per the original handoff policy (the user prefers to judge browser output manually).

## Known Issues / Next Things To Do

Highest-priority follow-up is the audit's P0 batch (not addressed this session):

1. **Accessibility** — replace `role="menubar"` / `role="menuitem"` in `PillNav` with plain `<nav><ul>`; add `role="tab"` / `role="tablist"` / `aria-selected` to the Services pillar tabs; add `aria-expanded` and Escape/focus-trap to the mobile menu; fix inactive-roster contrast (`text-white/18` fails WCAG AA).
2. **Mobile WebGL gating** — `Hyperspeed`, `LightRays`, `PrismaticBurst`, and `Globe` should be gated behind `useIsMobile()` per `prod.md` line 22 (which the deck currently self-violates).
3. **`prefers-reduced-motion`** — add a single hook that gates auto-advance (roster 5s, CardSwap 3s), all anime.js / GSAP timelines, and the `scrollTo({ behavior: "smooth" })` in `Index.tsx`.
4. **Slide mount resilience** — bump `SLIDE_MOUNT_RADIUS` to 1 on desktop and replace the empty `SlideFallback` with a small skeleton so the lazy-chunk fetch does not produce a black flash between slides.
5. **Lovable default OG image** still in `index.html` — replace with an OwlSurf-branded social preview.
6. **`<main>` nested inside `<section>` slide** in `ContactSlide.tsx` is a landmark mistake; fix at the same time as the a11y pass.
7. **Mobile layout** — `OurTeamSlide` stacks roster + 620px lanyard at `<lg`, overflowing the viewport. `SkyrocketSlide` mobile IntroBlock uses a fixed `h-[31rem]` height that risks landscape overflow.

Other open project items carried over from earlier sessions:
- Vercel deployment is still broken and needs reconnect / redeploy.
- `logo-main.jpg` is still a JPG; should be WebP or SVG.
- Vishnu still reuses Pankaj's avatar until a dedicated Vishnu avatar is supplied.
- `vendor-lanyard` remains a very large chunk (~3MB minified / ~1MB gzip); audit noted but did not address in this session.
- Lint debt in visual components still fails `npm run lint`.

### Security flag carried from the audit

`.git/config` contains a GitHub PAT in plaintext in the remote URL. **Rotate the token and move to SSH or git credential helper** before any wider repo access. Not blocking this push, but should be the first follow-up.

## Current Workspace Notes

Intended files for the Session 11 commit:
- 13 slide / nav source files listed above
- `handoff.md`, `context.md`, `prod.md`
- `ux-audit-report.html`, `ux-audit-report.pdf`
- 16 orphan file deletes

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
