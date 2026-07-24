import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithIntl } from "@/lib/test-intl";
import userEvent from "@testing-library/user-event";
import { ContactForm } from "@/components/sections/contact-form";

describe("ContactForm (desktop)", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true } as Response),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the section with the dark nav scheme", () => {
    const { container } = renderWithIntl(<ContactForm />);
    const section = container.querySelector("section") as HTMLElement;
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("data-nav-scheme", "dark");
  });

  it("the email input preserves name/type/required (used by /api/contact)", () => {
    renderWithIntl(<ContactForm />);
    const email = screen.getByPlaceholderText(/email adress \(required\)/i);
    expect(email).toHaveAttribute("name", "email");
    expect(email).toHaveAttribute("type", "email");
    expect(email).toHaveAttribute("required");
  });

  it("every interest checkbox is named 'interests' so multiple selections POST as an array", () => {
    renderWithIntl(<ContactForm />);
    const checkboxes = screen.getAllByRole("checkbox");
    expect(checkboxes.length).toBeGreaterThan(1);
    for (const box of checkboxes) {
      expect(box).toHaveAttribute("name", "interests");
    }
  });

  it("the submit button shows SAVE & SEND", () => {
    renderWithIntl(<ContactForm />);
    expect(
      screen.getByRole("button", { name: /save & send/i }),
    ).toBeInTheDocument();
  });

  it("submits the form to /api/contact via POST with field values and interests as an array", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(screen.getByPlaceholderText(/^first name$/i), "Ada");
    await user.type(screen.getByPlaceholderText(/^last name$/i), "Lovelace");
    await user.type(
      screen.getByPlaceholderText(/email adress \(required\)/i),
      "ada@example.com",
    );
    await user.click(screen.getByRole("checkbox", { name: /naming/i }));
    await user.click(screen.getByRole("checkbox", { name: /web design/i }));

    await user.click(screen.getByRole("button", { name: /save & send/i }));

    expect(global.fetch).toHaveBeenCalledWith(
      "/api/contact",
      expect.objectContaining({ method: "POST" }),
    );
    const call = (global.fetch as ReturnType<typeof vi.fn>).mock.calls[0];
    const [, init] = call;
    const body = JSON.parse((init as RequestInit).body as string);
    expect(body.firstName).toBe("Ada");
    expect(body.lastName).toBe("Lovelace");
    expect(body.email).toBe("ada@example.com");
    expect(body.interests).toEqual(
      expect.arrayContaining(["Naming", "Web design"]),
    );
    expect(body.interests).toHaveLength(2);

    expect(
      await screen.findByRole("button", { name: /^sent$/i }),
    ).toBeInTheDocument();
  });

  it("shows the role=alert error message with a mailto link when submission fails", async () => {
    (global.fetch as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
      ok: false,
      status: 500,
    } as Response);
    const user = userEvent.setup();
    renderWithIntl(<ContactForm />);

    await user.type(
      screen.getByPlaceholderText(/email adress \(required\)/i),
      "ada@example.com",
    );
    await user.click(screen.getByRole("button", { name: /save & send/i }));

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(/something went wrong/i);
    const link = screen.getByRole("link", { name: /hello@smur-world\.com/i });
    expect(link).toHaveAttribute("href", "mailto:hello@smur-world.com");
  });
});
