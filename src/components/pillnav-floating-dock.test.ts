import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const pillNav = readFileSync("src/components/PillNav.tsx", "utf8");

describe("desktop nav", () => {
  it("uses FloatingDock for desktop nav and keeps mobile menu", () => {
    expect(pillNav).toContain("FloatingDock");
    expect(pillNav).toContain("desktop-only");
    expect(pillNav).toContain("InteractiveMenu");
    expect(pillNav).not.toContain("pill-list");
  });
});
