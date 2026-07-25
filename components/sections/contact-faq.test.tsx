import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactFAQ } from "@/components/sections/contact-faq";
import { contactFAQItems, contactFAQ as contactFAQContent } from "@/content/contact";

describe("ContactFAQ (desktop)", () => {
  it("renders the section with the light nav scheme", () => {
    const { container } = render(<ContactFAQ />);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
  });

  it("renders the level-2 'Questions' heading", () => {
    render(<ContactFAQ />);
    expect(
      screen.getByRole("heading", { level: 2, name: /questions/i }),
    ).toBeInTheDocument();
  });

  it("renders all 4 FAQ questions", () => {
    render(<ContactFAQ />);
    for (const item of contactFAQItems) {
      expect(
        screen.getByRole("button", { name: new RegExp(item.question, "i") }),
      ).toBeInTheDocument();
    }
  });

  it("clicking a question toggles its aria-expanded state", async () => {
    const user = userEvent.setup();
    render(<ContactFAQ />);
    const button = screen.getByRole("button", {
      name: new RegExp(contactFAQItems[0].question, "i"),
    });
    expect(button).toHaveAttribute("aria-expanded", "false");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "true");
    await user.click(button);
    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("renders the answer text for an expanded question", async () => {
    const user = userEvent.setup();
    render(<ContactFAQ />);
    const button = screen.getByRole("button", {
      name: new RegExp(contactFAQItems[0].question, "i"),
    });
    await user.click(button);
    expect(
      screen.getByText(/complete identity systems/i),
    ).toBeInTheDocument();
  });

  it("renders the INSTAGRAM / PINTEREST social links with correct hrefs, opening in a new tab", () => {
    render(<ContactFAQ />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    const pinterest = screen.getByRole("link", { name: /pinterest/i });
    expect(instagram).toHaveAttribute("href", contactFAQContent.instagramUrl);
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(pinterest).toHaveAttribute("href", contactFAQContent.pinterestUrl);
    expect(pinterest).toHaveAttribute("target", "_blank");
  });

  it("renders the /work collage link with an accessible label", () => {
    render(<ContactFAQ />);
    expect(
      screen.getByRole("link", { name: /see all my work/i }),
    ).toHaveAttribute("href", "/work");
  });

  it("renders the 'my work :)' link to /work", () => {
    render(<ContactFAQ />);
    expect(
      screen.getByRole("link", { name: /my work :\)/i }),
    ).toHaveAttribute("href", "/work");
  });
});
