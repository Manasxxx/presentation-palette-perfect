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
  settleDuration: number;
  settleBounce: number;
  pieceDuration: number;
  pieceStagger: number;
  pieceDelay: number;
  washOpacityMultiplier: number;
  slideTravelMultiplier: number;
  blurPx: number;
}

export interface DeckTransitionOrganicOffset {
  lightX: number;
  lightY: number;
  rotate: number;
}

export const getDeckTransitionMotionProfile = (
  isMobile = false,
): DeckTransitionMotionProfile =>
  isMobile
    ? {
        washDuration: 1580,
        crestDuration: 1500,
        slideDuration: 1240,
        settleDuration: 1540,
        settleBounce: 0.32,
        pieceDuration: 1160,
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
        settleDuration: 1360,
        settleBounce: 0.24,
        pieceDuration: 960,
        pieceStagger: 18,
        pieceDelay: 190,
        washOpacityMultiplier: 1,
        slideTravelMultiplier: 1,
        blurPx: 6,
      };

const organicOffsets: DeckTransitionOrganicOffset[] = [
  { lightX: -6, lightY: 4, rotate: 0.4 },
  { lightX: 8, lightY: -5, rotate: -0.5 },
  { lightX: -10, lightY: 6, rotate: 0.6 },
  { lightX: 5, lightY: 3, rotate: -0.3 },
  { lightX: 11, lightY: -4, rotate: 0.5 },
];

export const getDeckTransitionOrganicOffset = (
  currentSlide: number,
  direction: DeckTransitionDirection,
): DeckTransitionOrganicOffset => {
  if (direction === "idle") return { lightX: 0, lightY: 0, rotate: 0 };

  const offset = organicOffsets[Math.abs(currentSlide) % organicOffsets.length];
  const directionSign = direction === "forward" ? 1 : -1;
  return {
    lightX: offset.lightX * directionSign,
    lightY: offset.lightY,
    rotate: offset.rotate * directionSign,
  };
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
