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
  // 5 Kuraray — dark navy → brand blue
  { top: "hsl(210 35% 10%)", bottom: "hsl(205 60% 26%)" },
  // 6 Baxsaa — light warm beige
  { top: "hsl(36 33% 93%)", bottom: "hsl(28 24% 82%)" },
  // 7 CultFit — dark purple → pink-tinted dark
  { top: "hsl(260 20% 8%)", bottom: "hsl(340 35% 14%)" },
  // 8 Girl Up — teal → purple-tinted teal
  { top: "hsl(168 70% 26%)", bottom: "hsl(268 30% 30%)" },
  // 9 CTP — light sage
  { top: "hsl(95 30% 92%)", bottom: "hsl(95 25% 80%)" },
  // 10 VNT — light green → brand green
  { top: "hsl(120 25% 75%)", bottom: "hsl(105 40% 52%)" },
  // 11 Contact
  { top: "hsl(220 30% 4%)", bottom: "hsl(220 30% 4%)" },
];

/** The shared blend color at the seam between slide `index` and `index + 1`. */
export const seamColor = (index: number): string | undefined => {
  const a = slideEdgeColors[index];
  const b = slideEdgeColors[index + 1];
  if (!a || !b) return undefined;
  return `color-mix(in oklab, ${a.bottom} 50%, ${b.top})`;
};
