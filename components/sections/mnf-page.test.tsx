import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MnfCaseStudy } from "./mnf-page";
import { MobileMnfCaseStudy } from "./mobile-mnf-page";

const STAGE_W = 1440;
const STAGE_H = 4367;

describe("MnfCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<MnfCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<MnfCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/mnf/']"),
    ).not.toBeNull();
  });

  // Phase-4-arrow guard: the legacy desktop page wrapped Sections 3–6 +
  // the floating brand vector in a `transform: translateY(-286px)` group
  // to correct a transcription offset. That wrapper must NOT survive the
  // conversion as a fixed-px transform (it wouldn't scale with the fluid
  // stage) — its children must be hoisted to direct stage children with
  // the -286 shift baked into their frame-absolute top values instead.
  it("hoists the shifted group (no fixed-px group transform, correct frame-relative position)", () => {
    const { container } = render(<MnfCaseStudy />);
    // The legacy fixed-canvas wrapper corrected a transcription offset with
    // `transform: translateY(-286px)` on an intermediate group — a fixed-px
    // transform that would not scale with the fluid stage. It must be gone
    // (Reveal's own mount-animation translateY(24px) is unrelated and fine).
    expect(container.innerHTML).not.toContain("translateY(-286");
    expect(container.innerHTML).not.toContain("inset-0");

    const floating = container.querySelector<HTMLImageElement>(
      "img[src*='floating.svg']",
    );
    expect(floating).not.toBeNull();
    const expectedLeft = `${(717.26 / STAGE_W) * 100}%`;
    const expectedTop = `${((4250.49 - 286) / STAGE_H) * 100}%`;
    expect(floating!.style.left).toBe(expectedLeft);
    expect(floating!.style.top).toBe(expectedTop);
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileMnfCaseStudy />);
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
