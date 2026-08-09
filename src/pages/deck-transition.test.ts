import { describe, expect, it } from "vitest";

import { getDeckTransitionMotionProfile, getDeckTransitionOrganicOffset, getDeckTransitionState } from "./deck-transition";

describe("deck transition helpers", () => {
  it("detects forward and backward slide movement", () => {
    expect(getDeckTransitionState(2, 1)).toMatchObject({
      direction: "forward",
      distance: 1,
    });

    expect(getDeckTransitionState(1, 2)).toMatchObject({
      direction: "backward",
      distance: 1,
    });
  });

  it("treats unchanged slides as idle", () => {
    expect(getDeckTransitionState(3, 3)).toMatchObject({
      direction: "idle",
      distance: 0,
    });
  });

  it("caps transition intensity for large navigation jumps", () => {
    expect(getDeckTransitionState(8, 1).intensity).toBe(1);
    expect(getDeckTransitionState(2, 1).intensity).toBe(0.72);
  });

  it("uses a slow liquid motion profile instead of abrupt slide timing", () => {
    expect(getDeckTransitionMotionProfile()).toMatchObject({
      washDuration: 1280,
      crestDuration: 1180,
      slideDuration: 1120,
      settleDuration: 1360,
      settleBounce: 0.24,
      pieceDuration: 960,
      pieceStagger: 18,
      washOpacityMultiplier: 1,
    });
  });

  it("uses a more noticeable liquid profile on mobile", () => {
    expect(getDeckTransitionMotionProfile(true)).toMatchObject({
      washDuration: 1580,
      crestDuration: 1500,
      slideDuration: 1240,
      settleDuration: 1540,
      settleBounce: 0.32,
      pieceDuration: 1160,
      pieceStagger: 22,
      washOpacityMultiplier: 1.65,
    });
  });

  it("adds deterministic organic drift so the light does not finish identically each time", () => {
    expect(getDeckTransitionOrganicOffset(2, "forward")).toMatchObject({
      lightX: -10,
      lightY: 6,
      rotate: 0.6,
    });
    expect(getDeckTransitionOrganicOffset(3, "forward")).not.toEqual(
      getDeckTransitionOrganicOffset(2, "forward"),
    );
    expect(getDeckTransitionOrganicOffset(2, "idle")).toMatchObject({
      lightX: 0,
      lightY: 0,
      rotate: 0,
    });
  });
});
