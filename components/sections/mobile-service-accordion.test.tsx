import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileServiceAccordion } from "@/components/sections/mobile-service-accordion";

describe("MobileServiceAccordion", () => {
  it("is collapsed by default (aria-expanded false)", () => {
    render(<MobileServiceAccordion label="Details" body={"intro\n\nlist"} />);
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "false");
  });
  it("expands on click", async () => {
    render(<MobileServiceAccordion label="Details" body={"intro\n\nlist"} />);
    await userEvent.click(screen.getByRole("button", { name: /details/i }));
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "true");
  });
  it("renders the intro and italic list from the body split on blank line", () => {
    render(<MobileServiceAccordion label="Details" body={"intro para\n\nline a\nline b"} />);
    expect(screen.getByText("intro para")).toBeInTheDocument();
    expect(screen.getByText(/line a/)).toBeInTheDocument();
  });
});
