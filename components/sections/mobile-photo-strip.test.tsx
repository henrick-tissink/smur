import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { MobilePhotoStrip } from "@/components/sections/mobile-photo-strip";
import { photos } from "@/content/home";

describe("MobilePhotoStrip (static, fluid 2x2 grid)", () => {
  it("renders the photo strip region", () => {
    const { container } = render(<MobilePhotoStrip />);
    const region = container.querySelector('[aria-label="Studio moments"]');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("data-nav-scheme", "dark");
  });

  it("renders exactly 4 photos with the correct alt text, reordered 3/4 top, 1/2 bottom", () => {
    const { container } = render(<MobilePhotoStrip />);
    const images = container.querySelectorAll("img");
    expect(images).toHaveLength(4);
    const expectedOrder = [photos[2], photos[3], photos[0], photos[1]];
    images.forEach((img, i) => {
      expect(img).toHaveAttribute("alt", expectedOrder[i].image.alt);
    });
  });
});
