import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileAbout } from "@/components/sections/mobile-about";

describe("MobileAbout", () => {
  it("renders as the #m-about section with the light nav scheme", () => {
    const { container } = render(<MobileAbout />);
    const section = container.querySelector("section#m-about") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
    expect(section).toHaveAttribute("aria-labelledby", "m-about-title");
  });

  it("renders the heading (accessible) and the body copy", () => {
    render(<MobileAbout />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/grown beyond branding/i)).toBeInTheDocument();
  });

  it("renders the social links", () => {
    render(<MobileAbout />);
    expect(screen.getByText("INSTAGRAM").closest("a")).toHaveAttribute(
      "href",
      "https://www.instagram.com/smurstudio/",
    );
    expect(screen.getByText("PINTEREST").closest("a")).toHaveAttribute(
      "href",
      "https://ro.pinterest.com/smurstudio/_saved/",
    );
  });

  it("uses a fluid aspect-ratio stage (no zoom)", () => {
    const { container } = render(<MobileAbout />);
    const stage = container.querySelector(
      "[data-mobile-about-stage]",
    ) as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/1081");
    expect(stage.style.containerType).toBe("inline-size");
  });
});
