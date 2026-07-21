import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Wordmark } from "@/components/core/wordmark";

describe("Wordmark", () => {
  it("has an accessible name", () => {
    render(<Wordmark />);
    expect(screen.getByRole("img", { name: "SMUR" })).toBeInTheDocument();
  });

  it("tints via CSS mask of the logo asset and inherits currentColor", () => {
    render(<Wordmark />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect((el as HTMLElement).style.backgroundColor).toBe("currentcolor");
    expect((el as HTMLElement).style.maskImage).toContain("smur-logo.svg");
  });

  it("applies width and height", () => {
    render(<Wordmark width={108} height={24} />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect(el).toHaveStyle({ width: "108px", height: "24px" });
  });

  it("defaults to the desktop logo asset", () => {
    render(<Wordmark />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect((el as HTMLElement).style.maskImage).toContain("/figma-assets/smur-logo.svg");
  });

  it("accepts a custom src (e.g. the mobile logo)", () => {
    render(<Wordmark src="/figma-assets/mobile/smur-logo.svg" />);
    const el = screen.getByRole("img", { name: "SMUR" });
    expect((el as HTMLElement).style.maskImage).toContain("/figma-assets/mobile/smur-logo.svg");
  });
});
