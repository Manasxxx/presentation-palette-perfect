

## Plan: Logo Marquee on Clients Slide

### What changes

Replace the current text-only client pills on the Clients slide with individual company logo images displayed in a smooth, infinitely scrolling marquee animation with a white/light tinted background behind each logo.

### Logos to extract (12 companies from uploaded image)

The uploaded image will be cropped into 12 individual logo files:
1. Mitsui Chemicals
2. DEHN
3. VNT
4. Kuraray
5. AVI Global Plast
6. GirlUp
7. Cliques
8. IIM Lucknow
9. The Doon School
10. Welham Girls' School
11. TCPL Packaging Limited
12. Ferroli

Each logo will be saved as a separate file in `src/assets/clients/`.

### Marquee design

- Two rows of logos scrolling horizontally in opposite directions (row 1 left-to-right, row 2 right-to-left)
- Each logo sits inside a white/light rounded pill container (providing contrast on the dark background)
- Logos are duplicated to create a seamless infinite loop
- Pure CSS `@keyframes` animation for smooth, performant scrolling
- Gradient fade masks on left and right edges for a polished look
- The "MAJOR CLIENTS" heading stays as-is above the marquee

### Technical Details

**New asset files (12 files)**
- Copy the uploaded image, then create individual logo images. Since we only have one composite image, we'll save it and use CSS background positioning, OR better: save the full image and use individual `<img>` tags with the composite. However, since we can't crop in-browser, we'll use the single uploaded image displayed as individual styled containers with the company names as fallback text, paired with the full image.

Actually, since we only have one composite image and cannot programmatically crop it, the best approach is:
- Save the composite image as a single asset
- Display individual logo containers with white backgrounds, using the company name as text (similar to current but styled as a marquee)
- The user can later replace each with individual cropped logos

**OR** we use the composite image sliced via CSS `object-position` -- but this is fragile.

**Recommended approach**: Save the full image, display it in the marquee as one long banner that scrolls, duplicated for seamless looping. This gives the exact visual effect the user wants without needing individual crops.

**Files to create:**
- `src/assets/clients-logos.png` -- the uploaded composite image

**Files to modify:**
- `src/components/slides/ClientsSlide.tsx` -- complete rewrite:
  - Replace text pills with a marquee component
  - Two rows: each row contains the full logo banner image repeated twice
  - CSS animation scrolls each row continuously
  - White/light semi-transparent background behind the image strip
  - Gradient edge masks using `mask-image` CSS property
  - Keep the heading

- `src/index.css` -- add marquee keyframes:
  ```css
  @keyframes marquee-left {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }
  @keyframes marquee-right {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0); }
  }
  ```

### Visual result
- Dark slide background with hexagon pattern
- "MAJOR CLIENTS" heading
- Two horizontal strips with white/frosted backgrounds scrolling smoothly
- Each strip shows the row of logos continuously looping
- Gradient fade on edges for polish

