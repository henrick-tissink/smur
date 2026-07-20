import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/core/button";

describe("Button", () => {
  it("renders a link when href is provided", () => {
    render(<Button href="/contact">LET&apos;S WORK TOGETHER</Button>);
    const link = screen.getByRole("link", { name: /LET'S WORK TOGETHER/i });
    expect(link).toHaveAttribute("href", "/contact");
  });

  it("renders a button and fires onClick when no href", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>SEND</Button>);
    await userEvent.click(screen.getByRole("button", { name: "SEND" }));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("has a pill radius", () => {
    render(<Button>X</Button>);
    expect(screen.getByRole("button")).toHaveStyle({
      borderRadius: "var(--radius-pill)",
    });
  });

  it("renders a trailing arrow icon when requested", () => {
    const { container } = render(<Button trailingArrow>NEXT</Button>);
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
