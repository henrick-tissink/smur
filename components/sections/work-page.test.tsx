import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { WorkPage } from "@/components/sections/work-page";
import { workProjects } from "@/content/work";

describe("WorkPage (desktop)", () => {
  it("renders the fluid stage", () => {
    const { container } = render(<WorkPage />);
    const stage = container.querySelector("[data-work-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("1440/5187");
    expect(stage.style.containerType).toBe("inline-size");
  });
  it("renders the heading and every project tile as a link", () => {
    render(<WorkPage />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
    for (const p of workProjects) {
      expect(screen.getByRole("link", { name: p.name })).toBeInTheDocument();
    }
  });
});
