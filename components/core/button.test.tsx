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

  it("outline variant leaves background unset via inline style so :hover can apply", () => {
    render(<Button>X</Button>);
    const el = screen.getByRole("button");
    const classes = el.className.split(/\s+/);
    expect(el.style.backgroundColor).toBeFalsy();
    expect(classes).toContain("hover:bg-[var(--color-accent)]");
    expect(classes).toContain("hover:text-[var(--color-cream)]");
  });

  it("solid variant applies the accent background via a class, not inline style", () => {
    render(<Button variant="solid">X</Button>);
    const el = screen.getByRole("button");
    const classes = el.className.split(/\s+/);
    expect(el.style.backgroundColor).toBeFalsy();
    expect(classes).toContain("bg-[var(--color-accent)]");
    expect(classes).toContain("text-[var(--color-cream)]");
  });
});
