import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { FigmaImage } from "@/components/figma-image";

const base = { src: "/x.png", alt: "x", intrinsicWidth: 100, intrinsicHeight: 100, crop: { w: 200, h: 100, left: -50, top: 0 } };

describe("FigmaImage", () => {
  it("fixed mode uses px width/height", () => {
    const { container } = render(<FigmaImage {...base} width={429} height={561} />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.width).toBe("429px");
    expect(frame.style.height).toBe("561px");
  });
  it("fluid mode uses aspect-ratio + capped fluid width", () => {
    const { container } = render(<FigmaImage {...base} width={429} height={561} fluid />);
    const frame = container.firstChild as HTMLElement;
    expect(frame.style.width).toBe("100%");
    expect(frame.style.maxWidth).toBe("429px");
    expect(frame.style.aspectRatio.replace(/\s/g, "")).toBe("429/561");
  });
});
