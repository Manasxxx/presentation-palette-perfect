import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const titleSource = readFileSync("src/components/slides/TitleSlide.tsx", "utf8");

describe("title slide responsive bridge", () => {
  it("keeps the mobile cover intact until the shared 768px breakpoint", () => {
    expect(titleSource).toContain("md:grid-cols-[minmax(0,1.08fr)_minmax(16rem,0.72fr)]");
    expect(titleSource).toContain("md:hidden");
    expect(titleSource).toContain("md:block");
    expect(titleSource).not.toContain("sm:grid-cols-");
  });

  it("reserves the 340px signal column for large screens", () => {
    expect(titleSource).toContain("lg:grid-cols-[minmax(0,1.04fr)_minmax(340px,0.76fr)]");
  });
});
