import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Eyebrow } from "@/components/core/eyebrow";

describe("Eyebrow", () => {
  it("renders its text", () => {
    render(<Eyebrow>full service</Eyebrow>);
    expect(screen.getByText("full service")).toBeInTheDocument();
  });

  it("is italic and mauve", () => {
    render(<Eyebrow>strategy focused</Eyebrow>);
    const el = screen.getByText("strategy focused");
    expect(el).toHaveStyle({ fontStyle: "italic" });
    expect(el).toHaveStyle({ color: "var(--color-accent)" });
  });

  it("renders as a <span> when as='span'", () => {
    render(<Eyebrow as="span">more.more.more.</Eyebrow>);
    expect(screen.getByText("more.more.more.").tagName).toBe("SPAN");
  });

  it("merges a custom className", () => {
    render(<Eyebrow className="mb-4">x</Eyebrow>);
    expect(screen.getByText("x")).toHaveClass("mb-4");
  });
});
