import { describe, expect, it } from "vitest";

import { getFlickDirection } from "./deck-flick";

describe("deck flick intent", () => {
  it("advances on a short fast forward flick", () => {
    expect(getFlickDirection({ distance: 48, peak: 20, durationMs: 120 })).toBe(1);
  });

  it("moves back on a fast reverse flick", () => {
    expect(getFlickDirection({ distance: -31, peak: 27, durationMs: 90 })).toBe(-1);
  });

  it("leaves slow drags to the nearest-slide settle", () => {
    expect(getFlickDirection({ distance: 80, peak: 12, durationMs: 420 })).toBe(0);
  });

  it("ignores tiny trackpad noise", () => {
    expect(getFlickDirection({ distance: 12, peak: 8, durationMs: 80 })).toBe(0);
  });

  it("accepts a smaller, slightly longer mobile flick with mobile thresholds", () => {
    expect(getFlickDirection({
      distance: 30,
      peak: 14,
      durationMs: 280,
      windowMs: 320,
      distanceThreshold: 28,
      peakThreshold: 16,
    })).toBe(1);
  });
});
