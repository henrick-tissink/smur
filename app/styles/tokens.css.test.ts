import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { colors, motion } from "@/lib/tokens";

const read = (p: string) => readFileSync(resolve(__dirname, p), "utf8");

describe("CSS token layers mirror lib/tokens.ts", () => {
  it("tokens.css declares every palette hex", () => {
    const css = read("./tokens.css");
    for (const hex of Object.values(colors)) {
      expect(css.toUpperCase()).toContain(hex.toUpperCase());
    }
  });

  it("globals.css @theme block declares every palette hex (no drift from tokens.css)", () => {
    const css = read("../globals.css");
    for (const hex of Object.values(colors)) {
      expect(css.toUpperCase()).toContain(hex.toUpperCase());
    }
  });

  it("motion.css declares the brand easing", () => {
    const css = read("./motion.css");
    expect(css).toContain(motion.ease);
  });

  it("typography.css defines the four semantic font roles", () => {
    const css = read("./typography.css");
    for (const role of ["--font-serif", "--font-body", "--font-ui", "--font-accent"]) {
      expect(css).toContain(role);
    }
  });

  it("spacing.css exposes the fluid section rhythm and column tokens", () => {
    const css = read("./spacing.css");
    expect(css).toContain("--space-section");
    expect(css).toContain("--col-content"); // 430px content column
  });
});
