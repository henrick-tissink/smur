import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { About } from "@/components/sections/about";

describe("About (desktop)", () => {
  it("renders as the #about section with the light nav scheme", () => {
    const { container } = render(<About />);
    const section = container.querySelector("section#about") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
    expect(section).toHaveAttribute("aria-labelledby", "about-title");
  });

  it("renders the heading (accessible) and the body copy", () => {
    render(<About />);
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(
      screen.getByText(/grown beyond branding/i),
    ).toBeInTheDocument();
  });

  it("renders the social links", () => {
    render(<About />);
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
    const { container } = render(<About />);
    const stage = container.querySelector("[data-about-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/971");
    expect(stage.style.containerType).toBe("inline-size");
  });
});
