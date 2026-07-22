import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { KokopCaseStudy } from "./kokop-page";
import { MobileKokopCaseStudy } from "./mobile-kokop-page";

describe("KokopCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<KokopCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<KokopCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/kokop/']"),
    ).not.toBeNull();
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileKokopCaseStudy />);
    const root = container.querySelector<HTMLElement>(
      "[style*='inline-size']",
    );
    expect(root).not.toBeNull();
    expect(root!.style.containerType).toBe("inline-size");
    expect(container.innerHTML).not.toMatch(/width:\s*393px/);
    expect(container.innerHTML).not.toContain("zoom");
  });

  // Containing-block guard: the live section8 extras composition
  // (kokop-extras/section8.tsx, KokopSection8Content) is positioned by a
  // wrapper in the PARENT page, not by its own root — section8's root is
  // `display:contents` (no left/top/width/height of its own). Legacy
  // applied a fixed-px `transform: translateX(-1.34px) scaleX(0.99524)`
  // correction to that wrapper — forbidden by the no-transform-scale
  // rule, and non-fluid besides. It must be hoisted into equivalent
  // stage-relative left/width percentages instead.
  it("hoists the section8 wrapper's corrective transform into stage-relative percentages", () => {
    const { container } = render(<KokopCaseStudy />);
    const section8Root = container.querySelector(
      '[data-node-id="297:57935"]',
    );
    expect(section8Root).not.toBeNull();
    const wrapper = section8Root!.parentElement as HTMLElement;
    expect(wrapper.style.left).toMatch(/%$/);
    expect(wrapper.style.width).toMatch(/%$/);
    expect(wrapper.style.transform).toBe("");
    expect(container.innerHTML).not.toContain("scaleX");
  });
});
