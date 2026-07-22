import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { CrispCaseStudy } from "./crisp-page";
import { MobileCrispCaseStudy } from "./mobile-crisp-page";

const STAGE_W = 1440;
const STAGE_H = 5340;

describe("CrispCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<CrispCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<CrispCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/crisp/']"),
    ).not.toBeNull();
  });

  // Phase-4-arrow guard: the legacy desktop page wrapped everything below
  // the intro (Sections 3-11) in
  // `<div className="absolute inset-0" style={{ transform:
  // "translateY(-279.21px)" }}>` to correct a transcription offset. That
  // wrapper must NOT survive the conversion as a fixed-px transform (it
  // wouldn't scale with the fluid stage) — its children must be hoisted to
  // direct stage children with the -279.21 shift baked into their
  // frame-absolute top values instead.
  it("hoists the shifted group (no fixed-px group transform, correct frame-relative position)", () => {
    const { container } = render(<CrispCaseStudy />);
    // The legacy correction wrapper was a fixed-px `transform:
    // translateY(-279.21px)` on a `class="absolute inset-0"` div — a
    // fixed-px transform that would not scale with the fluid stage. It
    // must be gone (Reveal's own mount-animation translateY(24px) is
    // unrelated and fine; the hero letterform images legitimately use an
    // unrelated `inset-0` Tailwind class to fill their own % wrapper).
    expect(container.innerHTML).not.toContain("translateY(-279.21");
    expect(container.innerHTML).not.toMatch(/class="absolute inset-0"/);

    const poster = container.querySelector<HTMLImageElement>(
      "img[src*='now-open-poster.png']",
    );
    expect(poster).not.toBeNull();
    // poster's wrapper div carries left/top — walk up to it.
    const wrapper = poster!.closest<HTMLElement>("div[style*='left']");
    expect(wrapper).not.toBeNull();
    const expectedLeft = `${(293 / STAGE_W) * 100}%`;
    const expectedTop = `${((4365.08 - 279.21) / STAGE_H) * 100}%`;
    expect(wrapper!.style.left).toBe(expectedLeft);
    expect(wrapper!.style.top).toBe(expectedTop);
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileCrispCaseStudy />);
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
