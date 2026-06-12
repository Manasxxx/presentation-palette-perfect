# Handoff

## Session Rule

Push-gated continuity workflow. Every new coding session read first: `handoff.md`, `context.md`, `prod.md`.

Update `handoff.md` ONLY before push. Not at session end, context clearing, or ordinary debugging.

## Current Goal

Session 43 (current): cover lockup/tagline, Services D2 pillar-card redesign, brand marks, Hallmark minors, circle-wipe removal.

- **Cover lockup (`TitleSlide.tsx`):** OWLSURF now all teal (OWL got the SURF teal + glow treatment), DIGITAL stays white. Tagline rebuilt as a pill chip: teal/35 hairline border, teal/[0.07] fill, block Montserrat uppercase `WHERE TECH MEETS` (white/85 bold) + `DESIGN` (teal, font-black), tracking 0.22em, `md:-ml-4` optical left-align with the wordmark (rotating-pill `-ml-6` precedent). Old serif-italic "design" treatment gone.
- **Services desktop = D2 outcome pillar cards (`ServicesSlide.tsx`).** Editorial ledger + HoverCard replaced by five glass cards in a 3+2 grid (grid-cols-6; top three span-2, bottom two span-3). Card: BE + outcome verb (teal, glow) top-left, ordinal bottom-left (white/40), sentence right, inline tag row over hairline. Pillars: Found (SEO·AI Search·Reviews) / Seen (Meta·Google·LinkedIn) / Understood (Videos·Decks·Whitepapers) / Trusted (Web·UX·CRM) / Known (Events·PR·Launches). Glass = `bg-white/[0.04]` + `backdrop-blur-md` + white/10 hairline; hover = -2px lift + teal border/glow (brand spec). `desktopServices` data reshaped (`outcome`/`description`/`tags`); `categories` + ALL mobile code untouched — **mobile Services still shows the old 5 categories; rename pass parked** (owner: "we will come back to it").
- **Brand marks (`src/components/ui/brand-marks.tsx`, new):** official inline-SVG marks — Google G (4-color), Meta (#0081FB), LinkedIn (#0A66C2), ChatGPT (white), Claude (#D97757), Gemini (#3186FF); simple-icons paths. Rendered beside tag text in the Services cards (`brandMarks` map; "AI Search" gets the ChatGPT+Claude+Gemini trio) and replacing the "Meta + Google" text in the Clients credibility pill (sr-only text kept).
- **Hallmark minor pass (Services/Clients only; cover/contact/cases excluded by owner):** Services subtitle serif-italic → Palanquin with only "That's it." serif teal; dead `tabIndex={0}` removed from cards; Clients heading split "Our " white + "Clients" teal per heading recipe; logo-card bare `transition` → named `transition-[border-color,background-color,transform]`; pill numbers `tabular-nums`. Who We Are passed audit untouched. Flagged not fixed: 3 uppercase eyebrows on Who We Are (cap is 1-2; trimming = removal, barred).
- **Circle wipe REMOVED (all 8 case studies).** The `.bg-wipe` clip-path circle reveal was invisible everywhere except GirlUp — a full-opacity duplicate background at `z-[-1]` painted the same gradient under it (same-over-same; GirlUp only read because its translucent purple stop double-compounded). Tried dim-underlay + accent drop-shadow rim; owner judged it not worth the weight and cut it. Now one static background div per case slide; wipe animation, dup underlay, `.bg-wipe` CSS (reduced-motion block) all deleted. `CaseStudySlide.tsx`, `CaseStudyLayout.tsx`, `index.css`.
- **Verification:** `npm run lint` (0 errors; pre-existing badge.tsx warning + new same-class brand-marks.tsx warning), vitest 16/16, `npm run build` pass.

## Open Items / Next Steps

1. **iPhone ghost strip (mobile case headings) — OPEN.** Dark translucent vertical strip near left margin, clears on touch. Ruled out (S39-40): seam overlays, wrapper blur, clip-path/circle wipe, card backdrop-filter, residual blur(0px). Next suspects: mobile `backdrop-blur-sm` on proof table/stat pills, stack-card `box-shadow`, Motion cross-fade wrapper, `will-change` on stack cards, or forced-recomposite nudge on slide settle. (S43 removed the `bg-wipe` layer entirely — if the strip persists, that suspect is now eliminated by absence.)
2. **Services mobile rename pass.** Desktop now sells five outcome pillars (Found/Seen/Understood/Trusted/Known); mobile still shows the old five categories. Owner parked it: "we will come back to it."
3. **`DebugMenu.tsx`** — temp mobile FAB, owner keeps shipping it. Standing "remove before prod" unresolved.
4. **True 1200×630 OG card** — `index.html` still uses `/favicon.png` stopgap.
5. **`deploy.yml` retry flags** — in working tree, NOT pushed (remote PAT lacks `workflow` scope). Land via `gh auth refresh -s workflow` or GitHub web editor. Always exclude this file from pushes until then.
6. **Security:** GitHub PAT in plaintext in `.git/config` remote URL. Rotate + move to SSH/credential helper.
7. **`npm audit`** advisories outstanding (deferred by user).
8. **Parked plan:** `ui-design-plan.scratch.md` (gitignored, local only, do not commit). Three phases; pick up by phase.
9. **Hyperspeed on mobile** still flagged unreliable (`prod.md`); revisit if owner asks.

## Current State

Vite + React SPA, fixed dev port: `http://localhost:8080/` (LAN `http://192.168.0.132:8080/`).

13 slides: Cover (0), Who We Are (1), Services (2), Clients (3), cases 4–11 = Mitsui, Kuraray, DEHN, Baxsaa, CultFit, GirlUp, CTP, VNT (order changed Session 39), Contact (12).

Per-slide detail, standing rules, and "do not reintroduce" lists live in `prod.md`. Session history + deploy runbook live in `context.md`.

Deck-order or case-count changes must update together: `Index.tsx` (slides array + `onCaseStudy` + `nativeMotion`), `PillNav`, `DebugMenu`, `slide-routes.ts`, `slide-edge-colors.ts`, case-number props.

## Deployment

Push to `main` = production deploy to https://www.owlsurf.media (~10-60s, silent on failure). Full mechanics + recovery runbook: `context.md` "Deployment Pipeline & Operations". Quick recovery: `gh run list` → `gh run rerun <id>`. Never hand-edit on the VPS (`git reset --hard` on every deploy).

## Untracked Local Items (keep unstaged)

`.agents/`, `.claude/`, `carousel-b2b-marketing.html`, `our-team-slide-single-lanyard.png`, `skills-lock.json`, `ui-design-plan.scratch.md`, `.vite_error.log`.

## Push Gate

1. `handoff.md`, `context.md`, `prod.md` reflect current state.
2. `npm run lint` + `npx vitest run` + `npm run build` pass.
3. Stage only intended files. Exclude `.github/workflows/deploy.yml`.
4. Commit, push `main`, confirm live site.
