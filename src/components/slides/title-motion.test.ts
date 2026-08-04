import { describe, expect, it } from "vitest";

import { getTitleTextMotionProfile } from "./title-motion";

describe("title text motion profile", () => {
  it("uses a layered text reveal instead of one block fade", () => {
    expect(getTitleTextMotionProfile(false)).toMatchObject({
      wordmarkDuration: 700,
      wordmarkDropY: -16,
      wordmarkStagger: 0,
      lineDuration: 760,
      pillDuration: 800,
      subcopyDelay: 760,
      badgeDelay: 980,
    });
  });

  it("keeps mobile cover text snappy but still staggered", () => {
    expect(getTitleTextMotionProfile(true)).toMatchObject({
      wordmarkDuration: 620,
      wordmarkDropY: -12,
      wordmarkStagger: 0,
      lineDuration: 680,
      pillDuration: 720,
      subcopyDelay: 680,
      badgeDelay: 880,
    });
  });
});
