import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InterstellarRow5Content } from "./row5-full";

/*
  Guards the fluid fix for the row5 masked vector composition. The root
  wrapper scales with the stage (% width), so the interior must scale with it
  too — every interior length is a `cqw` relative to the wrapper's own width
  (via container-type on the root), NOT a fixed px. A single leftover `[Npx]`
  arbitrary value means that part of the composition renders at 1440-authored
  size inside a shrunk wrapper and overflows the section below it.
*/
describe("InterstellarRow5Content (fluid)", () => {
  it("makes its own root a container-query box with a locked aspect ratio", () => {
    const { container } = render(<InterstellarRow5Content />);
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.containerType).toBe("inline-size");
    // aspect-ratio gives the wrapper a real height (its %-height resolved to 0),
    // so cqw children scale uniformly regardless of the stage's height model.
    expect(root.style.aspectRatio.replace(/\s/g, "")).toBe("887.2/564");
  });

  it("has NO fixed-px interior lengths — they would not scale with the wrapper", () => {
    const { container } = render(<InterstellarRow5Content />);
    // Tailwind arbitrary px values like h-[564px], left-[455.2px],
    // mask-size-[..px..] don't shrink when the % wrapper does.
    expect(container.innerHTML).not.toMatch(/\[-?\d+(?:\.\d+)?px/);
    // React inline numeric styles (bare numbers = px) are also gone.
    expect(container.innerHTML).not.toMatch(/px;/);
  });
});
