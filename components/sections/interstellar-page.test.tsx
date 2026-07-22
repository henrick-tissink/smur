import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InterstellarCaseStudy } from "./interstellar-page";
import { MobileInterstellarCaseStudy } from "./mobile-interstellar-page";

const STAGE_W = 1440;
const STAGE_H = 5075;

// Local coordinate space of the Row 3 masked photo (Section 5): the
// legacy wrapper sits at frame-absolute (283, 2037.59 - 330 = 1707.59),
// 429×556, and the photo <img> inside it is positioned with LOCAL
// coordinates relative to THAT box (left: -357.45, top: -36.14, width:
// 913.18, height: 636.19 — far larger/negative vs any frame-absolute
// value), not frame-absolute ones. This is the containing-block trap:
// the photo must resolve against the local 429×556 box, not the stage.
const ROW3_LOCAL_W = 429;
const ROW3_LOCAL_H = 556;

describe("InterstellarCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = render(<InterstellarCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = render(<InterstellarCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/interstellar/']"),
    ).not.toBeNull();
  });

  // Phase-4-arrow guard: the legacy desktop page wrapped everything below
  // the intro (Sections 3-8 + the floating vector, INCLUDING the inlined
  // InterstellarRow5Content) in `<div className="absolute inset-0"
  // style={{ transform: "translateY(-330px)" }}>` to correct a
  // transcription offset. That wrapper must NOT survive the conversion as
  // a fixed-px transform (it wouldn't scale with the fluid stage) — its
  // children must be hoisted to direct stage children with the -330
  // shift baked into their frame-absolute top values instead.
  it("hoists the shifted group (no fixed-px group transform, correct frame-relative position)", () => {
    const { container } = render(<InterstellarCaseStudy />);
    expect(container.innerHTML).not.toContain("translateY(-330");
    expect(container.innerHTML).not.toMatch(/class="absolute inset-0"/);

    const row4 = container.querySelector<HTMLImageElement>(
      "img[src*='row4-full.png']",
    );
    expect(row4).not.toBeNull();
    const wrapper = row4!.closest<HTMLElement>("div[style*='left']");
    expect(wrapper).not.toBeNull();
    const expectedLeft = `${(283 / STAGE_W) * 100}%`;
    const expectedTop = `${((2618.59 - 330) / STAGE_H) * 100}%`;
    expect(wrapper!.style.left).toBe(expectedLeft);
    expect(wrapper!.style.top).toBe(expectedTop);
  });

  // Confirm the InterstellarRow5Content positioning wrapper (its own root
  // div, defined inside interstellar-extras/row5-full.tsx) resolves as a
  // DIRECT stage child at the hoisted frame-absolute position
  // (283, 4099.84 - 330 = 3769.84), not nested inside a stale transformed
  // group and not left at raw, unconverted pixel values.
  it("InterstellarRow5Content wrapper is a direct stage child at the hoisted position", () => {
    const { container } = render(<InterstellarCaseStudy />);
    const rectImg = container.querySelector<HTMLImageElement>(
      "img[src*='row5-full/imgRectangle.jpg']",
    );
    expect(rectImg).not.toBeNull();
    // Walk up to the row5-full root wrapper (left/top/width/height, no
    // intermediate `transform: translateY` ancestor).
    let node: HTMLElement | null = rectImg;
    let row5Root: HTMLElement | null = null;
    while (node && node !== container) {
      if (node.style.left && node.style.top && node.style.width && node.style.height) {
        row5Root = node;
      }
      node = node.parentElement;
    }
    expect(row5Root).not.toBeNull();
    const expectedLeft = `${(283 / STAGE_W) * 100}%`;
    const expectedTop = `${((4099.84 - 330) / STAGE_H) * 100}%`;
    const expectedWidth = `${(887.2 / STAGE_W) * 100}%`;
    const expectedHeight = `${(564 / STAGE_H) * 100}%`;
    expect(row5Root!.style.left).toBe(expectedLeft);
    expect(row5Root!.style.top).toBe(expectedTop);
    expect(row5Root!.style.width).toBe(expectedWidth);
    expect(row5Root!.style.height).toBe(expectedHeight);
  });

  // Containing-block guard: the Row 3 masked photo (Section 5) is nested
  // inside a sized overflow-hidden wrapper and uses LOCAL coordinates
  // relative to THAT 429×556 box, not frame-absolute ones.
  it("Row 3 masked photo resolves % against its local 429×556 wrapper, not the stage", () => {
    const { container } = render(<InterstellarCaseStudy />);
    const photo = container.querySelector<HTMLImageElement>(
      "img[src*='row3-photo.svg']",
    );
    expect(photo).not.toBeNull();
    const expectedLeft = `${(-357.45 / ROW3_LOCAL_W) * 100}%`;
    const expectedTop = `${(-36.14 / ROW3_LOCAL_H) * 100}%`;
    const expectedWidth = `${(913.18 / ROW3_LOCAL_W) * 100}%`;
    const expectedHeight = `${(636.19 / ROW3_LOCAL_H) * 100}%`;
    expect(photo!.style.left).toBe(expectedLeft);
    expect(photo!.style.top).toBe(expectedTop);
    expect(photo!.style.width).toBe(expectedWidth);
    expect(photo!.style.height).toBe(expectedHeight);

    // Sanity: NOT computed against the 1440×5075 stage.
    expect(photo!.style.left).not.toBe(`${(-357.45 / STAGE_W) * 100}%`);
  });

  // Recipe B mobile (flow + container-query): assert the container-query
  // root, NOT aspect-ratio.
  it("mobile tree is a fluid container-query flow, no zoom", () => {
    const { container } = render(<MobileInterstellarCaseStudy />);
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
