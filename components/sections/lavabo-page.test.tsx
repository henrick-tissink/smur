import { describe, it, expect } from "vitest";
import { renderWithIntl } from "@/lib/test-intl";
import { LavaboCaseStudy } from "./lavabo-page";
import { MobileLavaboCaseStudy } from "./mobile-lavabo-page";

// Desktop stage
const STAGE_W = 1440;
const STAGE_H = 5336;

// Mobile stage (lavabo is the ONE case study where mobile is ALSO Recipe A —
// legacy mobile root was a fixed 393×2499 canvas with absolute %-inset
// children, not a flow layout).
const M_STAGE_W = 393;
const M_STAGE_H = 2499;

// Containing-block trap: the "sink hero with overlay" section wrapper is
// itself position:absolute (a direct child of the stage, frame-absolute),
// but the white logotype overlay <Image> nested inside it is ALSO
// position:absolute — so it resolves its left/top/width/height against the
// WRAPPER's own local box, not the outer stage. Desktop wrapper is
// 896×895.5; mobile wrapper is 393×391.6.
const SINK_LOCAL_W = 896;
const SINK_LOCAL_H = 895.5;
const M_SINK_LOCAL_W = 393;
const M_SINK_LOCAL_H = 391.6;

describe("LavaboCaseStudy (faithful-fluid)", () => {
  it("renders an aspect-ratio stage, not a zoom/fixed canvas", () => {
    const { container } = renderWithIntl(<LavaboCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    // no zoom anywhere in the tree
    expect(container.innerHTML).not.toContain("zoom");
  });

  it("keeps the hero art (original asset, not a screenshot)", () => {
    const { container } = renderWithIntl(<LavaboCaseStudy />);
    expect(
      container.querySelector("[src*='/figma-assets/work/lavabo/']"),
    ).not.toBeNull();
  });

  // Mobile lavabo is ALSO Recipe A (fixed canvas → aspect-stage), unlike
  // every other case study's mobile (Recipe B, container-query flow).
  it("mobile tree ALSO renders an aspect-ratio stage (Recipe A, not Recipe B), no zoom", () => {
    const { container } = renderWithIntl(<MobileLavaboCaseStudy />);
    const stage = container.querySelector<HTMLElement>(
      "[style*='aspect-ratio']",
    );
    expect(stage).not.toBeNull();
    expect(stage!.style.containerType).toBe("inline-size");
    expect(container.innerHTML).not.toContain("zoom");
    expect(container.innerHTML).not.toMatch(/width:\s*393px/);
  });

  // Containing-block guard (desktop): the overlay resolves against the
  // sink-hero wrapper's own 896×895.5 box, NOT the 1440×5336 stage.
  it("desktop sink-hero overlay resolves % against its local wrapper, not the stage", () => {
    const { container } = renderWithIntl(<LavaboCaseStudy />);
    const overlay = container.querySelector<HTMLImageElement>(
      "img[src*='sink-overlay.svg']",
    );
    expect(overlay).not.toBeNull();
    const expectedLeft = `${(135 / SINK_LOCAL_W) * 100}%`;
    const expectedTop = `${(325 / SINK_LOCAL_H) * 100}%`;
    const expectedWidth = `${(624.14 / SINK_LOCAL_W) * 100}%`;
    const expectedHeight = `${(256.81 / SINK_LOCAL_H) * 100}%`;
    expect(overlay!.style.left).toBe(expectedLeft);
    expect(overlay!.style.top).toBe(expectedTop);
    expect(overlay!.style.width).toBe(expectedWidth);
    expect(overlay!.style.height).toBe(expectedHeight);

    // Sanity: NOT computed against the 1440×5336 stage.
    expect(overlay!.style.left).not.toBe(`${(135 / STAGE_W) * 100}%`);
  });

  // Containing-block guard (mobile): same trap, local box is 393×391.6.
  it("mobile sink-hero overlay resolves % against its local wrapper, not the stage", () => {
    const { container } = renderWithIntl(<MobileLavaboCaseStudy />);
    const overlay = container.querySelector<HTMLImageElement>(
      "img[src*='mobile/sink-overlay.svg']",
    );
    expect(overlay).not.toBeNull();
    const expectedLeft = `${(59 / M_SINK_LOCAL_W) * 100}%`;
    const expectedTop = `${(142 / M_SINK_LOCAL_H) * 100}%`;
    const expectedWidth = `${(272.93 / M_SINK_LOCAL_W) * 100}%`;
    const expectedHeight = `${(112.3 / M_SINK_LOCAL_H) * 100}%`;
    expect(overlay!.style.left).toBe(expectedLeft);
    expect(overlay!.style.top).toBe(expectedTop);
    expect(overlay!.style.width).toBe(expectedWidth);
    expect(overlay!.style.height).toBe(expectedHeight);

    // Sanity: NOT computed against the 393×2499 mobile stage (widths
    // coincide at 393, so assert against the height axis, where the local
    // wrapper's 391.6 clearly diverges from the stage's 2499).
    expect(overlay!.style.top).not.toBe(`${(142 / M_STAGE_H) * 100}%`);
  });
});
