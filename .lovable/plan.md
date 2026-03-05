

## Mobile Case Study Redesign: Hero Image + Bottom Metrics

### Problem
On mobile, case study slides show images in a cramped grid (2-3 columns) and the ParallaxCardSlider uses desktop-sized 3D transforms that don't work well on small screens. Metrics compete with images for attention.

### Approach

**1. Make ParallaxCardSlider mobile-friendly** (`ParallaxCardSlider.tsx`)
- On mobile (`< 768px`), switch from the 3-card perspective layout to a single full-width image with fade/slide transitions
- Remove the 3D rotateY transforms on mobile — just show the current image large, centered
- Container sizing: `width: 85vw`, `height: auto` on mobile instead of the `calc(3 * min(35vw, 340px))` formula
- Keep dot navigation and auto-advance; hide chevron arrows on mobile
- Use the `useIsMobile` hook already in the project

**2. Convert all case study image grids to use ParallaxCardSlider on mobile** (Baxsaa, CultFit, GirlUp, CTP, VNT)
- On mobile: replace the `grid-cols-2` / `grid-cols-3` layout with `ParallaxCardSlider` showing one image at a time
- On desktop: keep the existing grid layout unchanged
- Each slide imports `useIsMobile` and conditionally renders slider vs grid

**3. Restructure mobile layout: image hero, metrics at bottom** (all 6 case study files)
- On mobile, use a flex-column layout: compact title/subtitle at top → large hero image slider in the middle → metrics row pinned at the bottom
- Reduce title `mb` and description `mb` on mobile to give more space to the image
- For Baxsaa's SEO card: hide it on mobile or collapse it into the stats row

### Files to modify
- `src/components/ParallaxCardSlider.tsx` — add mobile mode (single image, full width, no 3D)
- `src/components/slides/CaseStudySlide.tsx` — mobile layout reorder
- `src/components/slides/BaxsaaCaseStudy.tsx` — use slider on mobile, move stats down
- `src/components/slides/CultFitCaseStudy.tsx` — use slider on mobile, move stats down
- `src/components/slides/GirlUpCaseStudy.tsx` — use slider on mobile, move stats down
- `src/components/slides/CTPCaseStudy.tsx` — use slider on mobile, move stats down
- `src/components/slides/VNTCaseStudy.tsx` — use slider on mobile

