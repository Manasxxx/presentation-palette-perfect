import { describe, expect, it } from "vitest";

import { getSharedSlideMotionProfile } from "./slide-motion";

describe("shared slide motion profile", () => {
  it("uses a top-drop title reveal on desktop slides", () => {
    expect(getSharedSlideMotionProfile(false)).toMatchObject({
      headingDropY: -34,
      headingDuration: 920,
      accentDelay: 120,
      contentDelay: 300,
      itemStagger: 84,
    });
  });

  it("keeps the same title language noticeable on mobile", () => {
    expect(getSharedSlideMotionProfile(true)).toMatchObject({
      headingDropY: -26,
      headingDuration: 780,
      accentDelay: 90,
      contentDelay: 230,
      itemStagger: 66,
    });
  });
});
