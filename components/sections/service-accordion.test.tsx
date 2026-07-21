import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ServiceAccordion } from "@/components/sections/service-accordion";

describe("ServiceAccordion", () => {
  it("is collapsed by default (aria-expanded false)", () => {
    render(<ServiceAccordion label="Details" body={"intro\n\nlist"} />);
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "false");
  });
  it("expands on click", async () => {
    render(<ServiceAccordion label="Details" body={"intro\n\nlist"} />);
    await userEvent.click(screen.getByRole("button", { name: /details/i }));
    expect(screen.getByRole("button", { name: /details/i })).toHaveAttribute("aria-expanded", "true");
  });
  it("renders the intro and italic list from the body split on blank line", () => {
    render(<ServiceAccordion label="Details" body={"intro para\n\nline a\nline b"} />);
    expect(screen.getByText("intro para")).toBeInTheDocument();
    expect(screen.getByText(/line a/)).toBeInTheDocument();
  });
});
