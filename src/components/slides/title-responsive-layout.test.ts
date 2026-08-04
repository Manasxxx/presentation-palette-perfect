import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const titleSource = readFileSync("src/components/slides/TitleSlide.tsx", "utf8");

describe("title slide responsive bridge", () => {
  it("switches split-view and small-tablet widths to the compact editorial grid", () => {
    expect(titleSource).toContain("sm:grid-cols-[minmax(0,1.05fr)_minmax(13rem,0.75fr)]");
    expect(titleSource).toContain("sm:hidden");
    expect(titleSource).toContain("sm:block");
  });

  it("reserves the 340px signal column for large screens", () => {
    expect(titleSource).toContain("lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.76fr)]");
  });
});
