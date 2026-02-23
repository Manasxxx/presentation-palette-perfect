

## Plan: Section Navigation Bar with Labels + Partner Badges

### What changes

**1. Replace the right-side pill dots with a top navigation bar of labeled section links**

The current vertical pill indicator on the right side will be removed. Instead, the persistent header (visible from slide 1 onward, hidden on the last slide) will be expanded to include clickable section labels that jump to each slide. The labels will be:

- Intro | Why Us | About | Team | Services | Clients | Case Study | Baxsaa | Contact

The active section gets a subtle underline/highlight indicator. Clicking any label smooth-scrolls to that slide.

**2. Add Google Certified Partner and Meta (Facebook) Partner badges to the Title Slide**

Below the "www.owlsurf.com" link on the cover page, add a row of partner badges:
- Google Partner badge (SVG icon + "Google Certified" label)
- Meta Business Partner badge (SVG icon + "Meta Partner" label)

These will be styled as small glass pills with the respective brand colors, appearing with a staggered fade-in animation.

---

### Technical Details

**Remove `SlideNavigation` component usage from `Index.tsx`**
- Remove the `SlideNavigation` import and component render
- The `SlideNavigation.tsx` file can remain but will no longer be used

**Update `PersistentHeader.tsx`**
- Accept `currentSlide` and `onNavigate` props in addition to `visible`
- Add a row of section label buttons below or integrated into the header bar
- Each label is a compact clickable text button with:
  - Muted text by default, brighter text + bottom accent bar when active
  - `onClick` calls `onNavigate(index)` to scroll to that slide
- On mobile: labels become a horizontally scrollable row with smaller text
- The header will now also be visible on the first slide (slide 0) so users always have navigation, OR it stays hidden on slide 0 (cover) and appears from slide 1 -- keeping current behavior since the cover already has its own branding

**Update `Index.tsx`**
- Pass `currentSlide` and `onNavigate={navigateToSlide}` to `PersistentHeader`
- Remove `SlideNavigation` component

**Update `TitleSlide.tsx`**
- Add a badges row after the website link with two glass-styled badge pills
- Use Lucide icons (`Award`, `BadgeCheck`) or inline SVG for Google/Meta logos
- Staggered animation with delay after the website link appears

**Slide label mapping:**
```
const slideLabels = [
  "Intro", "Why Us", "About", "Team",
  "Services", "Clients", "Case Study", "Baxsaa", "Contact"
];
```

### Files to modify
- `src/components/PersistentHeader.tsx` -- add section nav labels with active state
- `src/pages/Index.tsx` -- pass new props, remove SlideNavigation
- `src/components/slides/TitleSlide.tsx` -- add Google + Meta partner badges
