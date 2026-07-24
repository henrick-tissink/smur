import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import { KabinettCaseStudy } from "./kabinett-page";
import { MobileKabinettCaseStudy } from "./mobile-kabinett-page";

const STAGE_W = 1440;
const STAGE_H = 4985;

// Local coordinate space of the hero quadrant group (Section 1): the
// legacy outer wrapper sits at frame-absolute (272, 139.55), 894×645.377,
// and its four quadrant children use coordinates relative to THAT box
// (e.g. left: 1.07, top: 0), not frame-absolute coordinates. This is the
// containing-block trap: the quadrant children must be converted as a
// percentage of the LOCAL 894×645.377 box, not of the 1440×4985 stage.
const HERO_LOCAL_W = 894;
const HERO_LOCAL_H = 645.377;

describe("KabinettCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = renderWithIntl(<KabinettCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = renderWithIntl(<KabinettCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/kabinett/']"),
    ).not.toBeNull();
  });

  // Containing-block guard: the hero quadrant group (Section 1) is a
  // nested absolutely-positioned box whose children use LOCAL coordinates
  // (relative to the 894×645.377 wrapper), not frame-absolute ones. Assert
  // the "dark" quadrant resolves against the local box, not the stage.
  it("hero quadrant children resolve % against the local hero box, not the stage", () => {
    const { container } = renderWithIntl(<KabinettCaseStudy />);
    const darkImg = container.querySelector<HTMLImageElement>(
      "img[alt='Kabinett lockup on charcoal']",
    );
    expect(darkImg).not.toBeNull();
    const wrapper = darkImg!.parentElement!;
    const expectedLeft = `${(1.07 / HERO_LOCAL_W) * 100}%`;
    const expectedTop = `${(0 / HERO_LOCAL_H) * 100}%`;
    const expectedWidth = `${(434.52 / HERO_LOCAL_W) * 100}%`;
    const expectedHeight = `${(311.509 / HERO_LOCAL_H) * 100}%`;
    expect(wrapper.style.left).toBe(expectedLeft);
    expect(wrapper.style.top).toBe(expectedTop);
    expect(wrapper.style.width).toBe(expectedWidth);
    expect(wrapper.style.height).toBe(expectedHeight);

    // Sanity: NOT computed against the 1440×4985 stage.
    expect(wrapper.style.left).not.toBe(`${(1.07 / STAGE_W) * 100}%`);
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = renderWithIntl(<MobileKabinettCaseStudy />);
    const root = container.querySelector<HTMLElement>(
      "[style*='inline-size']",
    );
    expect(root).not.toBeNull();
    expect(root!.style.containerType).toBe("inline-size");
    // root width was unfixed: the legacy `width:393px` inline style is gone
    expect(container.innerHTML).not.toMatch(/width:\s*393px/);
    expect(container.innerHTML).not.toContain("zoom");
  });
});
