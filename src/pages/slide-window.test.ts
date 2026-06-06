import { describe, expect, it } from "vitest";

import { getMountedSlideIndexes, getSlideIndexFromScroll } from "./slide-window";

describe("slide window helpers", () => {
  it("keeps the current slide and one neighbor on each side ready", () => {
    expect(getMountedSlideIndexes(12, 0, 1)).toEqual(new Set([0, 1]));
    expect(getMountedSlideIndexes(12, 5, 1)).toEqual(new Set([4, 5, 6]));
    expect(getMountedSlideIndexes(12, 11, 1)).toEqual(new Set([10, 11]));
  });

  it("maps scroll position to a clamped slide index", () => {
    expect(getSlideIndexFromScroll(0, 800, 12)).toBe(0);
    expect(getSlideIndexFromScroll(401, 800, 12)).toBe(1);
    expect(getSlideIndexFromScroll(99999, 800, 12)).toBe(11);
    expect(getSlideIndexFromScroll(-100, 800, 12)).toBe(0);
  });

  it("falls back to the first slide when the measured slide height is invalid", () => {
    expect(getSlideIndexFromScroll(800, 0, 12)).toBe(0);
  });
});
