/**
 * Approximate dominant background colors at each slide's top and bottom edge,
 * in deck order. Used by the mobile seam blend: the joint between slide i and
 * i+1 is bridged by short gradients on both sides that meet at the 50/50
 * color-mix of `bottom[i]` and `top[i+1]`, so no hard divider line shows.
 *
 * These are eyeballed flattenings of each slide's real background (most are
 * 160deg gradients over the dark base) — they only need to be close, the
 * gradients are soft and short. Update when a slide's background changes or
 * the deck order shifts (same bookkeeping as Index.tsx / PillNav).
 */
export interface SlideEdgeColors {
  top: string;
  bottom: string;
}

const dark = "hsl(214 30% 6%)";

export const slideEdgeColors: SlideEdgeColors[] = [
  // 0 Cover
  { top: dark, bottom: dark },
  // 1 Who We Are
  { top: dark, bottom: dark },
  // 2 Services
  { top: dark, bottom: dark },
  // 3 Clients
  { top: dark, bottom: dark },
  // 4 Mitsui — deep blue → cyan-tinted dark
  { top: "hsl(210 80% 16%)", bottom: "hsl(199 45% 18%)" },
  // 5 Kuraray — dark navy → brand blue (desaturated so the mix with Baxsaa's
  // beige reads as a quiet grey-blue, not a saturated band)
  { top: "hsl(210 35% 10%)", bottom: "hsl(207 38% 22%)" },
  // 6 Baxsaa — light warm beige
  { top: "hsl(36 33% 93%)", bottom: "hsl(28 24% 82%)" },
  // 7 CultFit — dark purple → pink-tinted dark
  { top: "hsl(260 20% 8%)", bottom: "hsl(340 35% 14%)" },
  // 8 Girl Up — teal → purple-tinted dark (desaturated so the mix with CTP's
  // light sage doesn't read as a mauve band)
  { top: "hsl(168 70% 26%)", bottom: "hsl(268 14% 26%)" },
  // 9 CTP — light sage
  { top: "hsl(95 30% 92%)", bottom: "hsl(95 25% 80%)" },
  // 10 VNT — light green → deep green (kept dark/desaturated so the mix with
  // Contact's near-black doesn't read as a yellow band at Contact's top)
  { top: "hsl(120 25% 75%)", bottom: "hsl(140 30% 28%)" },
  // 11 DEHN — dark slate → deep red-tinted dark
  { top: "hsl(220 20% 9%)", bottom: "hsl(355 40% 16%)" },
  // 12 Contact
  { top: "hsl(220 30% 4%)", bottom: "hsl(220 30% 4%)" },
];

/** The shared blend color at the seam between slide `index` and `index + 1`. */
export const seamColor = (index: number): string | undefined => {
  const a = slideEdgeColors[index];
  const b = slideEdgeColors[index + 1];
  if (!a || !b) return undefined;
  return `color-mix(in oklab, ${a.bottom} 50%, ${b.top})`;
};
