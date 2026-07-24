import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import { MobileServicesListSection } from "@/components/sections/mobile-services-list-section";
import { servicesList, ctaButton } from "@/content/home";

describe("MobileServicesListSection", () => {
  it("renders the webdesign-print section, heading, and all list items", () => {
    const { container } = renderWithIntl(<MobileServicesListSection />);
    expect(container.querySelector("section#m-webdesign-print")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    for (const item of servicesList) expect(screen.getByText(item)).toBeInTheDocument();
  });

  it("renders the CTA as a mobile inline link to /contact (not the foundation Button)", () => {
    renderWithIntl(<MobileServicesListSection />);
    const cta = screen.getByRole("link", { name: new RegExp(ctaButton, "i") });
    expect(cta).toHaveAttribute("href", "/contact");
    expect(cta.className).toContain("hover:opacity-80");
  });

  it("data-nav-scheme is dark", () => {
    const { container } = renderWithIntl(<MobileServicesListSection />);
    expect(container.querySelector("section")).toHaveAttribute("data-nav-scheme", "dark");
  });

  it("uses a fluid aspect-ratio stage (so absolutely-positioned children get height)", () => {
    const { container } = renderWithIntl(<MobileServicesListSection />);
    const stage = container.querySelector("[data-services-list-stage]") as HTMLElement;
    expect(stage.style.aspectRatio.replace(/\s/g, "")).toBe("393/526");
  });
});
