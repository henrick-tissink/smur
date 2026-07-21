import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MobileServiceSection } from "@/components/sections/mobile-service-section";
import { services } from "@/content/home";

describe("MobileServiceSection", () => {
  it("renders the service section with its id, heading, eyebrow, and body", () => {
    const { container } = render(<MobileServiceSection service={services[0]} />);
    expect(container.querySelector(`section#${services[0].id}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(services[0].eyebrow)).toBeInTheDocument();
    expect(screen.getByText(/uncover the heart of your brand/i)).toBeInTheDocument();
  });

  it("renders the DETAILS + TIMELINE accordion buttons", () => {
    render(<MobileServiceSection service={services[0]} />);
    expect(screen.getByRole("button", { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /timeline/i })).toBeInTheDocument();
  });

  it("data-nav-scheme is dark and id has no legacy m- prefix", () => {
    const { container } = render(<MobileServiceSection service={services[1]} />);
    const section = container.querySelector("section")!;
    expect(section).toHaveAttribute("data-nav-scheme", "dark");
    expect(section.id).toBe(services[1].id);
    expect(section.id.startsWith("m-")).toBe(false);
  });
});
