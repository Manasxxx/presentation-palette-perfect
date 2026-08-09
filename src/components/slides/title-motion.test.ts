import { describe, expect, it } from "vitest";

import { getTitleTextMotionProfile } from "./title-motion";

describe("title text motion profile", () => {
  it("uses a layered text reveal instead of one block fade", () => {
    expect(getTitleTextMotionProfile(false)).toMatchObject({
      wordmarkDuration: 880,
      wordmarkDropY: -30,
      wordmarkStagger: 0,
      lineDuration: 920,
      pillDuration: 1050,
      subcopyDelay: 980,
      badgeDelay: 1280,
    });
  });

  it("keeps mobile cover text snappy but still staggered", () => {
    expect(getTitleTextMotionProfile(true)).toMatchObject({
      wordmarkDuration: 760,
      wordmarkDropY: -24,
      wordmarkStagger: 0,
      lineDuration: 820,
      pillDuration: 940,
      subcopyDelay: 820,
      badgeDelay: 1080,
    });
  });
});
