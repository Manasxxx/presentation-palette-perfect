import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const indexSource = readFileSync("src/pages/Index.tsx", "utf8");

describe("Lenis deck scrolling", () => {
  it("uses one smooth-scroll owner for wheel and touch", () => {
    expect(indexSource).toContain('from "lenis"');
    expect(indexSource).toContain("smoothWheel: true");
    expect(indexSource).toContain("syncTouch: true");
    expect(indexSource).toContain("data-lenis-content");
    expect(indexSource).not.toContain("scroll-smooth");
  });

  it("removes the old animated transition layers", () => {
    expect(indexSource).not.toContain("DeckTransitionLayer");
    expect(indexSource).not.toContain("MobileTransitionLayer");
    expect(indexSource).not.toContain("seamColor");
  });

  it("keeps reduced motion instant and native", () => {
    expect(indexSource).toContain('scrollSnapType: prefersReducedMotion ? "y mandatory" : "none"');
    expect(indexSource).toContain("if (!wrapper || !content || prefersReducedMotion) return");
  });
});
