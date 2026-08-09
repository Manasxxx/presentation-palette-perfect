import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

import { getMobileCaseRevealBacking } from "./MobileCaseStudyReveal";

const layoutSource = readFileSync("src/components/slides/CaseStudyLayout.tsx", "utf8");
const mitsuiSource = readFileSync("src/components/slides/CaseStudySlide.tsx", "utf8");
const revealSource = readFileSync("src/components/slides/MobileCaseStudyReveal.tsx", "utf8");
const styles = readFileSync("src/index.css", "utf8");

describe("mobile case-study circle reveal", () => {
  it("uses every shared case's accent and Mitsui's blue/cyan backing", () => {
    expect(layoutSource).toContain("getMobileCaseRevealBacking(accentColor, accentColor, lightMode)");
    expect(mitsuiSource).toContain("getMobileCaseRevealBacking(mitsuiBlue, mitsuiCyan)");
    expect(getMobileCaseRevealBacking("205 86% 46%").backgroundColor).toContain("205 86% 46%");
  });

  it("clips only an inner mobile layer and follows the real deck scroller", () => {
    expect(revealSource).toContain("case-mobile-circle-ready");
    expect(revealSource).toContain('closest<HTMLElement>("[data-deck-scroll-container]")');
    expect(revealSource).toContain('addEventListener("scroll", revealWhenEntering');
    expect(layoutSource).not.toContain('className="slide case-mobile-circle');
    expect(mitsuiSource).not.toContain('className="slide case-mobile-circle');
  });

  it("shows the full case content when reduced motion is requested", () => {
    const reducedMotionBlock = styles.slice(styles.indexOf("@media (prefers-reduced-motion: reduce)"));
    expect(reducedMotionBlock).toContain(".case-mobile-circle-ready");
    expect(reducedMotionBlock).toContain(".case-mobile-circle-reveal");
    expect(reducedMotionBlock).toContain("clip-path: none");
  });
});
