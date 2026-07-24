import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { MobileWorkPage } from "@/components/sections/mobile-work-page";
import { workProjects } from "@/content/work";

describe("MobileWorkPage", () => {
  it("renders the fluid stage", () => {
    const { container } = renderWithIntl(<MobileWorkPage />);
    const stage = container.querySelector("[data-work-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/2309");
    expect(stage.style.containerType).toBe("inline-size");
  });
  it("renders the heading and every project tile as a link", () => {
    renderWithIntl(<MobileWorkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    for (const p of workProjects) {
      expect(screen.getByRole("link", { name: p.name })).toBeInTheDocument();
    }
  });
  it("positions the scroll-down arrow against the stage, not the hero-intro container", () => {
    const { container } = renderWithIntl(<MobileWorkPage />);
    const cue = container.querySelector(
      "[data-scroll-cue]",
    ) as HTMLElement;
    expect(cue).toBeInTheDocument();
    // Stage-relative Figma coords (169, 245 of the 393×2309 stage) — NOT
    // offset by the hero-intro container's x/y, since the arrow is a direct
    // child of [data-work-stage], not nested inside hero-intro.
    expect(cue.style.left).toBe(`${(169 / 393) * 100}%`);
    expect(cue.style.top).toBe(`${(245 / 2309) * 100}%`);
  });
});
