import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { WorkPage } from "@/components/sections/work-page";
import { workProjects } from "@/content/work";

describe("WorkPage (desktop)", () => {
  it("renders the fluid stage", () => {
    const { container } = renderWithIntl(<WorkPage />);
    const stage = container.querySelector("[data-work-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/5187");
    expect(stage.style.containerType).toBe("inline-size");
  });
  it("renders the heading and every project tile as a link", () => {
    renderWithIntl(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    for (const p of workProjects) {
      expect(screen.getByRole("link", { name: p.name })).toBeInTheDocument();
    }
  });
  it("positions the scroll-down arrow against the stage, not the hero-intro container", () => {
    const { container } = renderWithIntl(<WorkPage />);
    const cue = container.querySelector(
      "[data-scroll-cue]",
    ) as HTMLElement;
    expect(cue).toBeInTheDocument();
    // Stage-relative Figma coords (684, 345 of the 1440×5187 stage) — NOT
    // offset by the hero-intro container's x/y, since the arrow is now a
    // direct child of [data-work-stage], not nested inside hero-intro.
    expect(cue.style.left).toBe("47.5%");
    expect(cue.style.top).toBe("6.651243493348756%");
  });
});
