import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Icon } from "@/components/core/icon";

describe("Icon", () => {
  it("renders an inline svg that inherits currentColor", () => {
    const { container } = render(<Icon name="arrow-right" title="next" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toBeInTheDocument();
    expect(svg.getAttribute("stroke")).toBe("currentColor");
    expect(svg.getAttribute("fill")).toBe("none");
  });

  it("exposes an accessible name when title is given", () => {
    render(<Icon name="arrow-left" title="previous" />);
    expect(screen.getByRole("img", { name: "previous" })).toBeInTheDocument();
  });

  it("is aria-hidden when no title is given", () => {
    const { container } = render(<Icon name="chevron-down" />);
    expect(container.querySelector("svg")!.getAttribute("aria-hidden")).toBe("true");
  });

  it("applies the size to width and height", () => {
    const { container } = render(<Icon name="hamburger" size={28} />);
    const svg = container.querySelector("svg")!;
    expect(svg.getAttribute("width")).toBe("28");
    expect(svg.getAttribute("height")).toBe("28");
  });
});
