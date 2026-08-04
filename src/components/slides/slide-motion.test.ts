import { describe, expect, it } from "vitest";

import { getSharedSlideMotionProfile } from "./slide-motion";

describe("shared slide motion profile", () => {
  it("keeps the desktop title settle short and restrained", () => {
    expect(getSharedSlideMotionProfile(false)).toMatchObject({
      headingDropY: -22,
      headingDuration: 760,
      accentDelay: 120,
      contentDelay: 300,
      itemStagger: 84,
    });
  });

  it("uses an even lighter title settle on mobile", () => {
    expect(getSharedSlideMotionProfile(true)).toMatchObject({
      headingDropY: -16,
      headingDuration: 680,
      accentDelay: 90,
      contentDelay: 230,
      itemStagger: 66,
    });
  });
});
