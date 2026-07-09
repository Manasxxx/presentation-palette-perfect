import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pillNav = readFileSync("src/components/PillNav.tsx", "utf8");

describe("desktop nav", () => {
  it("uses FloatingNav for desktop nav and keeps mobile menu", () => {
    expect(pillNav).toContain("FloatingNav");
    expect(pillNav).toContain("desktop-only");
    expect(pillNav).toContain("InteractiveMenu");
    expect(pillNav).not.toContain("pill-list");
  });

  it("animates the floating nav items the show/hide timeline queries", () => {
    expect(pillNav).toContain(".floating-nav-item");
  });
});
