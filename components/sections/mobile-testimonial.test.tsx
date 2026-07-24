import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithIntl } from "@/lib/test-intl";
import { MobileTestimonial } from "@/components/sections/mobile-testimonial";
import { testimonials } from "@/content/home";

describe("MobileTestimonial (fluid carousel)", () => {
  it("renders the testimonial region with the first quote and attribution", () => {
    const { container } = renderWithIntl(<MobileTestimonial />);
    const region = container.querySelector('[aria-label="Testimonial"]');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute("data-nav-scheme", "dark");

    const first = testimonials[0];
    expect(screen.getByText(first.attribution)).toBeInTheDocument();
    // Quote text is long/multiline; match on its leading fragment.
    expect(
      screen.getByText(new RegExp(first.quote.slice(0, 30)))
    ).toBeInTheDocument();
  });

  it("shows a different testimonial after clicking Next", async () => {
    renderWithIntl(<MobileTestimonial />);
    const first = testimonials[0];
    const second = testimonials[1];

    expect(screen.queryByText(second.attribution)).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /next testimonial/i })
    );

    expect(screen.queryByText(first.attribution)).not.toBeInTheDocument();
    expect(screen.getByText(second.attribution)).toBeInTheDocument();
  });
});
