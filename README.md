# OwlSurf Digital Portfolio & Credentials

A scroll-snapping portfolio deck for OwlSurf Digital. The project behaves like a PowerPoint presentation in the browser: one full-screen idea per slide, bold visuals, minimal reading, and motion used only to support the pitch.

## What This Includes

- Intro/title slide with OwlSurf branding and animated ambient visuals.
- `Who We Are` editorial slide for technical and industrial B2B markets.
- `Our Team` slide with six horizontal profile cards and a teal radar background.
- Services, clients, case studies, and contact slides.
- Lazy-loaded slide registry so heavy visual sections do not all load at first paint.
- Fixed OwlSurf dark theme with Montserrat, Palanquin, and Lora typography.

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Anime.js
- GSAP
- OGL / WebGL visual effects

## Local Development

```sh
npm install
npm run dev
```

Before starting a new coding session in this repo, read:

- `handoff.md`
- `context.md`
- `prod.md`

Before any push, update `handoff.md` so it reflects the latest state.

The Vite dev server runs on:

```txt
http://localhost:8080
```

## Useful Commands

```sh
npm run build
npm test
npm run lint
npm run images:convert
```

Notes:

- `npm run build` currently passes.
- `npm test` currently passes.
- `npm run lint` currently reports existing visual-component typing debt in older WebGL/animation components.
- `npm run images:convert` requires `sharp` to be installed as a dev dependency.

## Project Structure

```txt
src/
  pages/Index.tsx                  Slide registry, lazy mounting, scroll navigation
  components/slides/               Full-screen deck slides
  components/ProfileCard.jsx       React Bits profile card component
  components/ProfileCard.css       Team-card styling overrides
  components/Radar.jsx             React Bits radar background
  components/Radar.css             Radar container styles
  components/ui/Hyperspeed/        WebGL road background effect
  index.css                        Global tokens, fonts, and OwlSurf design system
scripts/
  convert-images.mjs               PNG to WebP conversion helper
context.md                         Running implementation log
prod.md                            Product/design principles
```

## Design Direction

This is a deck-first product, not a traditional website. Each slide should communicate one dominant message, with visual hierarchy doing most of the work. Avoid long paragraphs, duplicated background effects, and unnecessary interaction. If a slide cannot be understood quickly, simplify it.

## Deployment

The repo is connected to GitHub at:

```txt
Manasxxx/presentation-palette-perfect
```

The previous Vercel deployment/domain needs reconnecting before production use.
