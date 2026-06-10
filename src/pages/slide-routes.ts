/**
 * Single source of truth mapping each deck slide to a real URL slug.
 *
 * The deck is one continuous scroll page (one `<Index/>`), but on mobile the
 * URL is kept in sync with the slide the user is looking at (Way A): every
 * slide is deep-linkable and browser back/forward steps between slides. Desktop
 * ignores this map and stays a single one-page deck.
 *
 * Order must match the `slides` array in `Index.tsx` (13 slides):
 * Cover(0), Positioning(1), Services(2), Clients(3),
 * case studies 4-11 (Mitsui, Kuraray, Baxsaa, CultFit, GirlUp, CTP, VNT, DEHN),
 * Contact(12).
 */
export const SLIDE_SLUGS: readonly string[] = [
  "/",
  "/who-we-are",
  "/services",
  "/clients",
  "/work/mitsui",
  "/work/kuraray",
  "/work/baxsaa",
  "/work/cultfit",
  "/work/girlup",
  "/work/ctp",
  "/work/vnt",
  "/work/dehn",
  "/contact",
];

/** Slug for a slide index. Falls back to "/" for out-of-range indexes. */
export const slugForIndex = (index: number): string =>
  SLIDE_SLUGS[index] ?? "/";

/**
 * Slide index for a pathname. Returns 0 ("/") when the path is unknown.
 * Trailing slashes are normalised so "/services/" resolves like "/services".
 */
export const indexForSlug = (pathname: string): number => {
  const normalised =
    pathname.length > 1 && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname;
  const index = SLIDE_SLUGS.indexOf(normalised);
  return index >= 0 ? index : 0;
};
