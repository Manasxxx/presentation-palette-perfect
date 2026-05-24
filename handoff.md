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

Finish the OwlSurf portfolio/deck polish pass that focused on:
- redesigning the `Our Team` slide around a single React Bits lanyard
- making the employee roster cleaner and auto-rotating
- keeping the lanyard avatar synced to the active employee
- improving the black OwlSurf-logo strap and teal hardware
- making the global header navigation appear while the user is moving and hide when the user stops to view a slide
- updating `handoff.md`, `context.md`, and `prod.md` so future sessions do not follow stale six-card/Radar assumptions
- checking for obvious stale code or inefficiencies before pushing

## Current State

The app is a Vite + React presentation-style SPA running on the fixed dev port:
- `http://localhost:8080/`

The live dev server was started during this session and should be left running unless the user asks to stop it.

The `Our Team` slide currently renders:
- a simplified left-side roster selector
- muted/desaturated inactive employees
- one fully colorified active employee
- one live React Bits lanyard on the right
- a 5-second auto-advance loop
- click-to-select roster rows
- the active employee name/title below the badge
- a stable lanyard instance whose avatar texture updates from the active `person` prop

The lanyard currently uses:
- the real React Bits rope/physics behavior
- one GLB badge body with a separate front-facing avatar plane
- a 1024x1024 high-quality avatar texture for better badge clarity
- a plain dark badge material to remove the small sparkle/glint that appeared in review
- a black branded strap texture generated from `src/assets/owl-icon.png`
- thicker strap geometry
- OwlSurf teal metal clip/clamp materials

The header navigation now behaves globally:
- it appears while the user is actively moving through the deck via mouse, wheel, touch, scroll, or keyboard
- it hides after 1600ms of inactivity so the current slide can be viewed cleanly
- logo, desktop nav items, and mobile hamburger animate upward when hiding
- those elements stagger back into place when activity resumes

## Files In Play

- [handoff.md](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/handoff.md)
- [context.md](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/context.md)
- [prod.md](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/prod.md)
- [src/pages/Index.tsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/pages/Index.tsx)
- [src/components/PillNav.tsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/PillNav.tsx)
- [src/components/slides/OurTeamSlide.tsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/slides/OurTeamSlide.tsx)
- [src/components/ui/Lanyard/Lanyard.jsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/ui/Lanyard/Lanyard.jsx)
- [src/components/ui/Lanyard/Lanyard.css](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/ui/Lanyard/Lanyard.css)
- [src/assets/owl-icon.png](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/assets/owl-icon.png)
- [src/assets/lanyard/card.glb](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/assets/lanyard/card.glb)
- [vite.config.ts](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/vite.config.ts)

## What Changed

### Session startup

Read the required startup files:
- `handoff.md`
- `context.md`
- `prod.md`

Started the Vite dev server with:
- `npm run dev`

Vite reported:
- Local: `http://localhost:8080/`

### Team slide roster

`OurTeamSlide.tsx` now uses:
- `useState` for `activeIndex`
- `useEffect` with a timeout-driven 5-second advance
- a compact roster instead of cluttered left-side cards
- active/inactive row styling to keep the eye on the current employee
- one stable `Lanyard` component instance on the right
- active member metadata below the lanyard badge

The lanyard is intentionally not keyed by active employee. This prevents the physics/WebGL scene from fully remounting every 5 seconds.

### Lanyard component

`Lanyard.jsx` now:
- uses the real React Bits lanyard/rope physics
- renders the GLB badge as a physical dark badge body
- generates the active avatar as a separate 1024x1024 texture
- renders the avatar on a plane placed over the badge front, avoiding broken GLB UV placement
- generates a black strap texture from the user-provided `owl-icon.png`
- uses high-quality canvas smoothing, mipmaps, and anisotropy for the strap and avatar textures
- uses teal physical materials for the clip and clamp
- avoids applying texture props when a texture is still `null`
- no longer destructures unused `materials` from the GLB load

Important root cause from earlier debugging:
- a previous `map-anisotropy` prop was applied while `map` was `null`
- React Three Fiber tried to read `anisotropy` on `null`
- that runtime exception blanked the React tree
- the current badge/avatar approach avoids that crash path

### Lanyard styling

`Lanyard.css` now includes:
- `.team-lanyard`
- `.single-team-lanyard`
- `.team-lanyard-name`
- `.team-roster-progress`
- `@keyframes team-roster-progress`

Current visual tuning:
- `.single-team-lanyard` shifts up with `transform: translateY(-52px)`
- the roster progress line runs for 5000ms and resets with active employee changes

### Header navigation

`Index.tsx` now owns:
- `navActive`
- `navIdleTimerRef`
- `NAV_IDLE_HIDE_DELAY = 1600`

Activity events:
- `mousemove`
- `wheel`
- `touchstart`
- `touchmove`
- `scroll`
- `keydown`

`PillNav.tsx` now:
- accepts global visibility from `Index.tsx`
- animates the container, logo, nav items, and hamburger with GSAP
- staggers top-nav items upward when inactive
- returns them to `y: 0` when active again
- uses the mobile-menu map index instead of `navItems.indexOf(item)` for active-state lookup

### Bundle cleanup

`vite.config.ts` now keeps the lanyard's shared 3D/physics libraries in a separate `vendor-lanyard` manual chunk:
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `@react-three/rapier`
- `meshline`

This prevents the lazy `OurTeamSlide` chunk from carrying the whole lanyard dependency stack by itself without making the older `vendor-3d` chunk load Rapier for unrelated effects.

### Documentation

Updated:
- `handoff.md`
- `context.md`
- `prod.md`

The docs now describe the current `Our Team` architecture as:
- one live lanyard plus a left roster
- not six `ProfileCard` cards over `Radar`
- not six simultaneous WebGL lanyards

The docs also now describe the header nav as:
- global activity/idle behavior
- not case-study-only hiding

## What Was Tried And Failed

### 1. Six live lanyards at once

This best matched the earliest lanyard idea, but it was too heavy and repeatedly led to instability or blank-screen behavior.

### 2. CSS-only fake lanyard grid

This was stable, but the user disliked the result and explicitly asked to keep the real lanyard feel.

### 3. One lanyard with GLB card texture mapping

This was closer, but avatar placement was unreliable because the card UV mapping did not match the desired front-facing employee avatar placement.

The current solution renders the avatar as a separate plane over the badge front. That is more predictable and keeps the live lanyard physics.

### 4. Tiny repeated strap logos

Earlier strap texture attempts made the OwlSurf logo look like small teal dots on the black band. The current texture uses the provided `owl-icon.png`, larger marks, thicker band geometry, and lower repeat density.

## Verified / Evidence

Before this handoff refresh, builds passed after:
- restoring the real lanyard
- simplifying the roster
- changing auto-advance to 5 seconds
- sharpening the avatar texture output
- removing the badge sparkle
- replacing the strap logo source with `owl-icon.png`
- thickening the band
- recoloring lanyard hardware to OwlSurf teal
- adding global nav activity/idle behavior

This session also checks:
- `npm run build`
- `npm test`
- `git diff --check`
- `npm run lint`

Latest verification result:
- `npm run build` passes
- `npm test -- --run` passes
- `git diff --check` passes
- `npm run lint` still fails on pre-existing visual-component typing/config debt in `LightRays.tsx`, `Hyperspeed.tsx`, `PrismaticBurst.tsx`, `SplitText.tsx`, `globe.tsx`, `src/vite-env.d.ts`, and `tailwind.config.ts`

Visual screenshot capture is intentionally not part of the final verification loop because the user explicitly said not to screenshot and will judge the browser output manually.

## Known Issues / Next Things To Do

Highest-priority manual review:
- visually inspect the Our Team slide in the live browser
- confirm the black strap logo clarity is acceptable
- confirm the lanyard/badge/avatar alignment looks good at the user's viewport
- confirm the nav hide/show timing feels right during real deck movement

Known remaining project issues:
- Vercel deployment is noted in `context.md` as broken and needing reconnect/redeploy
- `npm run lint` has historically failed on existing visual-component typing debt
- some PNG/JPG source assets remain in `src/assets`; conversion to WebP is still a future optimization
- Vishnu still appears to reuse Pankaj's avatar unless a dedicated Vishnu avatar is supplied
- `vendor-3d` remains the largest chunk because the deck still uses WebGL effects

## Current Workspace Notes

Intended modified/staged files for this push:
- `handoff.md`
- `context.md`
- `prod.md`
- `src/pages/Index.tsx`
- `src/components/PillNav.tsx`
- `src/components/slides/OurTeamSlide.tsx`
- `src/components/ui/Lanyard/Lanyard.jsx`
- `src/components/ui/Lanyard/Lanyard.css`
- `src/assets/owl-icon.png`
- `vite.config.ts`

Current unrelated untracked items should stay unstaged unless the user explicitly asks for them:
- `.agents/`
- `.claude/`
- `carousel-b2b-marketing.html`
- `our-team-slide-screenshot.png`
- `our-team-slide-single-lanyard.png`
- `skills-lock.json`

## Push Gate

Before pushing:
1. Confirm `handoff.md`, `context.md`, and `prod.md` reflect the current architecture.
2. Run the verification commands.
3. Stage only intended files.
4. Commit.
5. Push `main`.
