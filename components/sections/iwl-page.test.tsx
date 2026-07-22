import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { IwlCaseStudy } from "./iwl-page";
import { MobileIwlCaseStudy } from "./mobile-iwl-page";

const STAGE_W = 1440;
const STAGE_H = 5081;

describe("IwlCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<IwlCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<IwlCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/iwl/']"),
    ).not.toBeNull();
  });

  // Containing-block guard for the Row 2 wrapper (Group 93, 297:57124):
  // in the legacy fixed canvas this was a direct child of the canvas at
  // frame-absolute (271, 2134.75), 898.64x491. It must stay a direct
  // child of the aspect-stage, sized in frame-relative % on the stage
  // basis (1440x5081) — NOT nested inside another absolutely-positioned,
  // height-less box, and NOT left as fixed px.
  it("positions the Row 2 band wrapper frame-relative to the stage (no fixed px, correct %)", () => {
    const { container } = render(<IwlCaseStudy />);
    const band = container.querySelector<HTMLImageElement>(
      "img[src*='row2-band.png'], [class*='overflow-hidden'] img[src*='row2-band']",
    );
    expect(band).not.toBeNull();
    const wrapper = band!.closest<HTMLElement>(".absolute");
    expect(wrapper).not.toBeNull();
    expect(wrapper!.style.left).toBe(`${(271 / STAGE_W) * 100}%`);
    expect(wrapper!.style.top).toBe(`${(2134.75 / STAGE_H) * 100}%`);
    expect(wrapper!.style.width).toBe(`${(898.64 / STAGE_W) * 100}%`);
    expect(wrapper!.style.height).toBe(`${(491 / STAGE_H) * 100}%`);
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileIwlCaseStudy />);
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
