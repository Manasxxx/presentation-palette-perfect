import { describe, expect, it } from "vitest";

import { getDeckSnapConfig } from "./deck-snap";

describe("deck snap config", () => {
  it("makes mobile snap stronger while still allowing natural swipes", () => {
    expect(getDeckSnapConfig(true)).toEqual({
      container: "y mandatory",
      slideStop: "normal",
    });
  });

  it("keeps desktop mandatory", () => {
    expect(getDeckSnapConfig(false)).toEqual({
      container: "y mandatory",
      slideStop: "always",
    });
  });
});
