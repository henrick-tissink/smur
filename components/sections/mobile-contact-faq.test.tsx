import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MobileContactFAQ } from "@/components/sections/mobile-contact-faq";
import { contactFAQItems, contactFAQ as contactFAQContent } from "@/content/contact";

describe("MobileContactFAQ", () => {
  it("renders the section with the light nav scheme", () => {
    const { container } = render(<MobileContactFAQ />);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "light");
  });

  it("renders the level-2 'Questions' heading", () => {
    render(<MobileContactFAQ />);
    expect(
      screen.getByRole("heading", { level: 2, name: /questions/i }),
    ).toBeInTheDocument();
  });

  it("renders all 4 FAQ questions", () => {
    render(<MobileContactFAQ />);
    for (const item of contactFAQItems) {
      expect(
        screen.getByRole("button", { name: new RegExp(item.question, "i") }),
      ).toBeInTheDocument();
    }
  });

  it("clicking a question toggles its aria-expanded state", async () => {
    const user = userEvent.setup();
    render(<MobileContactFAQ />);
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
    render(<MobileContactFAQ />);
    const button = screen.getByRole("button", {
      name: new RegExp(contactFAQItems[0].question, "i"),
    });
    await user.click(button);
    expect(
      screen.getByText(/complete identity systems/i),
    ).toBeInTheDocument();
  });

  it("renders the INSTAGRAM / PINTEREST social links with correct hrefs, opening in a new tab", () => {
    render(<MobileContactFAQ />);
    const instagram = screen.getByRole("link", { name: /instagram/i });
    const pinterest = screen.getByRole("link", { name: /pinterest/i });
    expect(instagram).toHaveAttribute("href", contactFAQContent.instagramUrl);
    expect(instagram).toHaveAttribute("target", "_blank");
    expect(pinterest).toHaveAttribute("href", contactFAQContent.pinterestUrl);
    expect(pinterest).toHaveAttribute("target", "_blank");
  });

  it("renders the 'my work :)' link to /work", () => {
    render(<MobileContactFAQ />);
    expect(
      screen.getByRole("link", { name: /my work :\)/i }),
    ).toHaveAttribute("href", "/work");
  });

  it("renders the pinwheel collage link (accessible label) to /work, matching legacy's single-link behavior", () => {
    render(<MobileContactFAQ />);
    expect(
      screen.getByRole("link", { name: /see all my work/i }),
    ).toHaveAttribute("href", "/work");
  });

  it("renders all 4 collage thumb images inside the collage link", () => {
    render(<MobileContactFAQ />);
    const collageLink = screen.getByRole("link", { name: /see all my work/i });
    const images = collageLink.querySelectorAll("img");
    expect(images).toHaveLength(4);
  });
});
