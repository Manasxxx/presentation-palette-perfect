import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const titleSource = readFileSync("src/components/slides/TitleSlide.tsx", "utf8");

describe("Title slide Review Case Studies CTA", () => {
  it("uses GlassSurface for the Review Case Studies button", () => {
    expect(titleSource).toContain("GlassSurface");
    expect(titleSource).toContain("Review Case Studies");
    expect(titleSource).not.toContain("ts-cta-sheen");
  });
});
