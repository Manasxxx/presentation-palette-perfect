import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync("src/components/CaseStudyCarousel.tsx", "utf8");
const styles = readFileSync("src/index.css", "utf8");
const main = readFileSync("src/main.tsx", "utf8");
const packageJson = readFileSync("package.json", "utf8");

describe("CaseStudyCarousel on mobile", () => {
  it("uses the original timed stack for every mobile variant", () => {
    const start = source.indexOf("if (isMobile)");
    const end = source.indexOf("// ─── Desktop", start);
    const mobileBranch = source.slice(start, end);

    expect(mobileBranch).toContain("cs-mobile-stack");
    expect(mobileBranch).toContain("cs-mobile-stack--wide");
    expect(mobileBranch).toContain("cs-mobile-stack--table");
    expect(mobileBranch).toContain("cs-mobile-stack-card--${position}");
  });

  it("advances the stack every three seconds on mobile", () => {
    expect(source).toContain("setMobileStackIndex");
    expect(source).toContain("isMobile ? 3000 : 4000");
  });

  it("keeps the glass stack visual without the broken desktop-card mobile override", () => {
    expect(styles).toContain(".cs-mobile-stack-card--active");
    expect(styles).toContain(".cs-mobile-stack-card--prev");
    expect(styles).toContain(".cs-mobile-stack-card--next");
    expect(styles).not.toContain(".cs-cards--mobile");
  });

  it("has no draggable carousel engine or horizontal scroll surface", () => {
    expect(source).not.toContain("BlossomCarousel");
    expect(main).not.toContain("@blossom-carousel");
    expect(packageJson).not.toContain("@blossom-carousel");
    expect(styles).toContain("touch-action: pan-y");
    expect(styles).not.toContain(".cs-mobile-stack-carousel");
  });
});
