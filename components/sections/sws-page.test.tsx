import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import { SwsCaseStudy } from "./sws-page";
import { MobileSwsCaseStudy } from "./mobile-sws-page";

describe("SwsCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = renderWithIntl(<SwsCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = renderWithIntl(<SwsCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/sws/']"),
    ).not.toBeNull();
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = renderWithIntl(<MobileSwsCaseStudy />);
    const root = container.querySelector<HTMLElement>(
      "[style*='inline-size']",
    );
    expect(root).not.toBeNull();
    expect(root!.style.width).not.toBe("393px"); // root width was unfixed
    expect(container.innerHTML).not.toContain("zoom");
  });
});
