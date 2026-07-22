import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BouncingArrow } from "@/components/bouncing-arrow";

describe("BouncingArrow", () => {
  it("renders a numeric size as px", () => {
    const { container } = render(<BouncingArrow direction="down" size={72} />);
    const span = container.querySelector("span")!;
    const style = window.getComputedStyle(span);
    expect(style.height).toBe("72px");
    expect(style.width).toMatch(/px$/);
  });

  it("accepts a string (cqw) size", () => {
    const { container } = render(<BouncingArrow direction="down" size="5cqw" />);
    const span = container.querySelector("span")!;
    const style = span.getAttribute("style") || "";
    expect(style).toContain("cqw");
  });
});
