import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServicesListSection } from "@/components/sections/services-list-section";
import { servicesList, ctaButton } from "@/content/home";

describe("ServicesListSection", () => {
  it("renders the webdesign-print section, heading, and all list items", () => {
    const { container } = render(<ServicesListSection />);
    expect(container.querySelector("section#webdesign-print")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    for (const item of servicesList) expect(screen.getByText(item)).toBeInTheDocument();
  });
  it("renders the CTA as a link to /contact (foundation Button)", () => {
    render(<ServicesListSection />);
    const cta = screen.getByRole("link", { name: new RegExp(ctaButton, "i") });
    expect(cta).toHaveAttribute("href", "/contact");
  });
  it("CTA uses the foundation Button treatment, not the legacy inline hover", () => {
    render(<ServicesListSection />);
    const cta = screen.getByRole("link", { name: new RegExp(ctaButton, "i") });
    expect(cta.className).toContain("hover:bg-[var(--color-accent)]");
    expect(cta.className).not.toContain("hover:opacity-80");
  });
});
