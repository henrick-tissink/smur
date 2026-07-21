import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { photos } from "@/content/home";

describe("PhotoStrip (static, fluid)", () => {
  it("renders the photo strip region", () => {
    const { container } = render(<PhotoStrip />);
    const region = container.querySelector('[aria-label="Studio moments"]');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("data-nav-scheme", "dark");
  });

  it("renders exactly 4 photos with the correct alt text, in Figma order", () => {
    const { container } = render(<PhotoStrip />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(4);
    images.forEach((img, i) => {
      expect(img).toHaveAttribute("alt", photos[i].image.alt);
    });
  });
});
