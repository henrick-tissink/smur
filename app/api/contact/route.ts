/*
  Contact-form submission endpoint. The SAVE & SEND button only flips to
  "SENT" when this returns 2xx (June 2026 client request) — so this route
  must only succeed when the message is actually delivered.

  Delivery is via the Resend HTTP API (no SDK dependency). Configure on
  Vercel / in .env.local:
    RESEND_API_KEY     — required for delivery
    CONTACT_TO_EMAIL   — optional, defaults to hello@smur-world.com
    CONTACT_FROM_EMAIL — optional, defaults to Resend's onboarding sender;
                         set to a verified domain sender in production.

  Without RESEND_API_KEY the route returns 503 and the UI shows an error
  with the direct email address — it never pretends to have sent.

  Email content (branded HTML + plain-text fallback) lives in ./email.ts.
*/

import { buildHtml, buildText, fullName } from "./email";

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const email = typeof data.email === "string" ? data.email.trim() : "";
  if (!email || !email.includes("@")) {
    return Response.json({ error: "A valid email address is required" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Not configured — fail honestly so the UI never shows a false "SENT".
    console.error("[contact] RESEND_API_KEY is not set; rejecting submission");
    return Response.json({ error: "Contact form is not configured" }, { status: 503 });
  }

  const name = fullName(data);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL ?? "SMUR Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL ?? "hello@smur-world.com"],
      reply_to: email,
      subject: `New project inquiry${name ? ` from ${name}` : ""}`,
      html: buildHtml(data, name, email),
      text: buildText(data),
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error(`[contact] Resend rejected the message (${res.status}): ${detail}`);
    return Response.json({ error: "Failed to send the message" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
