import { describe, it, expect } from "vitest";
import { colors, space, radii, hairline, motion } from "@/lib/tokens";

describe("design tokens", () => {
  it("carries the exact spec palette", () => {
    expect(colors.page).toBe("#FFF7F4");
    expect(colors.ink).toBe("#35221A");
    expect(colors.cream).toBe("#FFF7F4");
    expect(colors.hero).toBe("#CBB3A6");
    expect(colors.accent).toBe("#A98A8A");
    expect(colors.about).toBe("#906553");
    expect(colors.band).toBe("#BBC2B5");
    expect(colors.line).toBe("#D9D2C8");
  });

  it("carries the real layout spacing scale", () => {
    expect(space).toEqual([6, 15, 25, 30, 35, 55, 61]);
  });

  it("carries radii and hairlines from the spec", () => {
    expect(radii).toEqual({ pill: 18, card: 5, media: 0 });
    expect(hairline).toEqual({ button: 1.44, underline: 2 });
  });

  it("carries the motion system values", () => {
    expect(motion.ease).toBe("cubic-bezier(0.22, 0.61, 0.36, 1)");
    expect(motion.durationMs.cardHover).toBe(520);
    expect(motion.workCardScale).toBe(1.035);
    expect(motion.buttonPressScale).toBe(0.985);
    expect(motion.linkDimOpacity).toBe(0.55);
  });
});
