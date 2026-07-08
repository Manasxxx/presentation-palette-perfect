import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const servicesSource = readFileSync("src/components/slides/ServicesSlide.tsx", "utf8");

describe("Services slide background", () => {
  it("uses a visible DotField background and BorderGlow service cards", () => {
    expect(servicesSource).toContain("DotField");
    expect(servicesSource).toContain('style={{ position: "absolute", inset: 0 }}');
    expect(servicesSource).toContain("opacity-100");
    expect(servicesSource).toContain("BorderGlow");
    expect(servicesSource).toContain("glowIntensity={1.35}");
    expect(servicesSource).not.toContain("LightRays");
  });
});
