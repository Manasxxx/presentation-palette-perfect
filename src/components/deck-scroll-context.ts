import { createContext, useContext, type RefObject } from "react";

/**
 * Holds a ref to the deck's scroll container (`[data-deck-scroll-container]`)
 * so descendant slides can drive Motion `useScroll` against the real scrollable
 * element instead of the window. Provided by `Index`, consumed by
 * `MobileSlideMotion`. Undefined outside the deck (Motion then falls back to the
 * viewport, which is fine for any non-deck usage).
 */
export const DeckScrollContext = createContext<RefObject<HTMLElement> | undefined>(
  undefined,
);

export const useDeckScrollContainer = () => useContext(DeckScrollContext);
