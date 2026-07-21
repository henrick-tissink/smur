import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ServiceSection } from "@/components/sections/service-section";
import { services } from "@/content/home";

describe("ServiceSection", () => {
  it("renders the service section with its id and heading + body", () => {
    const { container } = render(<ServiceSection service={services[0]} />);
    expect(container.querySelector(`section#${services[0].id}`)).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2 })).toBeInTheDocument();
    expect(screen.getByText(/uncover the heart of your brand/i)).toBeInTheDocument();
  });
  it("renders the DETAILS + TIMELINE accordions", () => {
    render(<ServiceSection service={services[0]} />);
    expect(screen.getByRole("button", { name: /details/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /timeline/i })).toBeInTheDocument();
  });
  it("data-nav-scheme is dark", () => {
    const { container } = render(<ServiceSection service={services[1]} />);
    expect(container.querySelector("section")).toHaveAttribute("data-nav-scheme", "dark");
  });
});
