# Handoff

## Session Rule

This repo now has a mandatory handoff rule.

Every new session should read these files first:
- `handoff.md`
- `context.md`
- `prod.md`

`handoff.md` must be updated:
- before any push
- before ending or clearing a session
- whenever the approach changes in a meaningful way
- whenever debugging reveals an important root cause

If a session looks close to running out of context or hitting limits, refresh `handoff.md` before stopping.

## Goal

Stabilize and redesign the `Our Team` slide so it keeps the React Bits elastic lanyard feel without black-screening the whole deck.

The latest user direction was:
- use the real lanyard again
- show only one lanyard on the right side
- show a clickable employee/name list on the left
- switch the active employee through that list instead of rendering six lanyards at once

## Current State

The slide currently renders:
- a left-side vertical roster of team members
- one live React Bits `Lanyard` on the right
- clicking a name swaps the active employee shown in the badge

The crash that was blanking the whole app has been fixed:
- root cause was `map-anisotropy` being applied while `activeCardTexture` was `null`
- this caused a React Three Fiber runtime exception and blanked the React tree
- the material now renders a plain dark card until the texture exists

The app builds successfully with:
- `npm run build`

The dev server was restarted and is currently intended to be:
- `http://localhost:8081/`

## Files In Play

- [handoff.md](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/handoff.md)
- [src/components/slides/OurTeamSlide.tsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/slides/OurTeamSlide.tsx)
- [src/components/ui/Lanyard/Lanyard.jsx](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/ui/Lanyard/Lanyard.jsx)
- [src/components/ui/Lanyard/Lanyard.css](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/components/ui/Lanyard/Lanyard.css)
- [src/assets/lanyard/card.glb](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/assets/lanyard/card.glb)
- [src/assets/lanyard/lanyard.png](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/assets/lanyard/lanyard.png)
- [vite.config.ts](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/vite.config.ts)
- [src/vite-env.d.ts](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/src/vite-env.d.ts)
- [package.json](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/package.json)

## What Changed

### Team slide

`OurTeamSlide.tsx` now uses:
- `useState` for `activeIndex`
- a left roster of buttons
- one `Lanyard` instance keyed by the active member name
- the active member name/title displayed below the badge

Auto-rotation was removed because repeatedly remounting a physics/WebGL lanyard every few seconds is unnecessary churn. Right now it only changes on click.

### Lanyard component

`Lanyard.jsx` now:
- uses the real React Bits 3D/physics lanyard
- builds a custom band texture with OwlSurf branding
- builds a custom card texture using the selected avatar
- uses a guarded material render path:
  - textured material only when `activeCardTexture` exists
  - plain dark material before texture load

Also adjusted:
- lighter lighting setup than the original multi-light/environment version
- avatar texture placement on the card:
  - `avatarSize = 560`
  - `avatarX = 80`
  - `avatarY = 245`

### CSS

`Lanyard.css` currently only contains simple sizing/shadow rules for:
- `.team-lanyard`
- `.single-team-lanyard`
- `.team-lanyard-name`

## What Was Tried And Failed

### 1. Six live lanyards at once

This looked closest to the original idea, but it was too heavy and repeatedly caused black screens or GPU/context loss.

### 2. CSS-only fake lanyard grid

A full CSS recreation was built to avoid WebGL entirely.
It was stable, but the user did not like the look and explicitly asked to bring back the real lanyard.

### 3. One live lanyard with auto-rotation

This was closer, but still produced instability while debugging because:
- the material crashed before textures loaded
- repeated remounts were noisy during testing

The actual runtime bug was not “too many lanyards” alone.
It was specifically this:
- `map-anisotropy={8}` was still being passed while `map={null}`
- React Three Fiber crashed with:
  - `TypeError: Cannot read properties of null (reading 'anisotropy')`

## Verified / Evidence

- `npm run build` passes
- Headless checks confirmed the runtime crash went away after the material guard
- Headless checks also confirmed:
  - the roster text is present
  - one canvas exists on the team slide
  - no runtime errors were emitted after the guard fix

There are also local screenshots from debugging:
- [our-team-slide-screenshot.png](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/our-team-slide-screenshot.png)
- [our-team-slide-single-lanyard.png](/Users/manassrivastava/Documents/untitled%20folder/presentation-palette-perfect/our-team-slide-single-lanyard.png)

Be aware:
- headless screenshot capture was inconsistent during debugging
- one successful capture showed the new layout
- some later captures returned blank compositor frames even when DOM/runtime checks were healthy

## Known Issues / Next Things To Do

### Highest priority

Open the live slide manually in the browser and visually tune the single badge layout.

The current capture suggests the right-side lanyard still needs polish:
- the badge/card may be too large and too far right
- the avatar crop may still need more tuning
- the badge name below may need spacing refinement

### Recommended next steps

1. Keep the single-lanyard architecture.
2. Do not go back to six simultaneous WebGL lanyards.
3. Visually tune:
   - lanyard scale
   - camera position / `fov`
   - card texture crop
   - right-column width and centering
4. If needed, add small non-destructive UI polish to the roster:
   - stronger active-state contrast
   - hover motion
   - more breathing room around the right-side badge

### If another black screen appears

Check these first:
- whether a material prop is being applied while the texture/map is still `null`
- whether the canvas count accidentally increased above 1
- whether a new remount loop or timer was introduced

## Current Workspace Notes

Current modified tracked files:
- `package-lock.json`
- `package.json`
- `src/components/slides/OurTeamSlide.tsx`
- `src/vite-env.d.ts`
- `vite.config.ts`

Current untracked items include:
- `.agents/`
- `.claude/`
- `skills-lock.json`
- `src/assets/lanyard/`
- `src/components/ui/Lanyard/`
- screenshot files in repo root

Do not assume those untracked files are safe to delete without checking intent.
