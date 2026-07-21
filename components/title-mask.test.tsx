import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TitleMask } from "@/components/title-mask";

describe("TitleMask", () => {
  it("renders the accessible alt text", () => {
    render(<TitleMask src="/x.svg" width={100} height={40} alt="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("sizes numeric width/height in px", () => {
    const { container } = render(<TitleMask src="/x.svg" width={100} height={40} alt="a" as={null} />);
    const box = container.querySelector("[data-title-mask]") as HTMLElement;
    expect(box.style.width).toBe("100px");
    expect(box.style.height).toBe("40px");
  });

  it("passes string width/height through verbatim (e.g. cqw)", () => {
    const { container } = render(<TitleMask src="/x.svg" width="40.75cqw" height="20.1cqw" alt="a" as={null} />);
    const box = container.querySelector("[data-title-mask]") as HTMLElement;
    expect(box.style.width).toBe("40.75cqw");
    expect(box.style.height).toBe("20.1cqw");
  });
});
