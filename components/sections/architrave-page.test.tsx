import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ArchitraveCaseStudy } from "./architrave-page";
import { MobileArchitraveCaseStudy } from "./mobile-architrave-page";

describe("ArchitraveCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<ArchitraveCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<ArchitraveCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/architrave/']"),
    ).not.toBeNull();
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileArchitraveCaseStudy />);
    const root = container.querySelector<HTMLElement>(
      "[style*='inline-size']",
    );
    expect(root).not.toBeNull();
    expect(root!.style.containerType).toBe("inline-size");
    // root width was unfixed: the legacy `width:393px` inline style is gone
    expect(container.innerHTML).not.toMatch(/width:\s*393px/);
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("floating brand vector keeps its frame-relative position (containing-block guard)", () => {
    // Legacy: direct child of the fixed canvas at left:717.26, top:4261.62
    // of a 1440x4593 stage. Must remain a direct child of the aspect-stage,
    // not nested inside another absolutely-positioned group.
    const { container } = render(<ArchitraveCaseStudy />);
    const floating = container.querySelector<HTMLElement>(
      "img[src*='floating.svg']",
    );
    expect(floating).not.toBeNull();
    const expectedLeft = (717.26 / 1440) * 100;
    const expectedTop = (4261.62 / 4593) * 100;
    expect(floating!.style.left).toBe(`${expectedLeft}%`);
    expect(floating!.style.top).toBe(`${expectedTop}%`);
  });
});
