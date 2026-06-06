export type DeckTransitionDirection = "forward" | "backward" | "idle";

export interface DeckTransitionState {
  direction: DeckTransitionDirection;
  distance: number;
  intensity: number;
}

export interface DeckTransitionMotionProfile {
  washDuration: number;
  crestDuration: number;
  slideDuration: number;
  pieceDuration: number;
  pieceStagger: number;
  pieceDelay: number;
  washOpacityMultiplier: number;
  slideTravelMultiplier: number;
  blurPx: number;
}

export const getDeckTransitionMotionProfile = (
  isMobile = false,
): DeckTransitionMotionProfile =>
  isMobile
    ? {
        washDuration: 1420,
        crestDuration: 1320,
        slideDuration: 1180,
        pieceDuration: 1040,
        pieceStagger: 22,
        pieceDelay: 160,
        washOpacityMultiplier: 1.65,
        slideTravelMultiplier: 1.35,
        blurPx: 9,
      }
    : {
        washDuration: 1280,
        crestDuration: 1180,
        slideDuration: 1120,
        pieceDuration: 960,
        pieceStagger: 18,
        pieceDelay: 190,
        washOpacityMultiplier: 1,
        slideTravelMultiplier: 1,
        blurPx: 6,
      };

export const getDeckTransitionState = (
  currentSlide: number,
  previousSlide: number,
): DeckTransitionState => {
  const delta = currentSlide - previousSlide;

  if (delta === 0) {
    return {
      direction: "idle",
      distance: 0,
      intensity: 0,
    };
  }

  const distance = Math.abs(delta);

  return {
    direction: delta > 0 ? "forward" : "backward",
    distance,
    intensity: Math.min(1, 0.58 + distance * 0.14),
  };
};
