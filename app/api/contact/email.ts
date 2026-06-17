/*
  Email content for the contact-form route. Kept separate from route.ts so the
  HTML builder can be unit-rendered/previewed without booting the API.

  Resend renders the `html` body in its dashboard preview and in the recipient's
  inbox; `text` is the plain-text fallback for clients that block HTML. We send
  both.
*/

export const FIELD_LABELS: Record<string, string> = {
  firstName: "First name",
  lastName: "Last name",
  email: "Email address",
  business: "Business name",
  interests: "What can I help you with?",
  brandAbout: "What is your brand about?",
  deadline: "Ideal deadline",
  details: "Additional details",
  source: "How did you find the website?",
};

// Fields surfaced as labelled blocks in the HTML body, in display order.
// firstName/lastName/email are promoted into the header, so they're omitted here.
const DETAIL_KEYS = [
  "business",
  "interests",
  "brandAbout",
  "deadline",
  "details",
  "source",
] as const;

// SMUR brand palette (mirrors app/globals.css). Email clients strip <style> and
// ignore CSS variables, so every colour is inlined literally below.
const BRAND = {
  page: "#f5f1ec",
  surface: "#fff7f4",
  brown: "#906553",
  ink: "#35221a",
  muted: "#6a6660",
  accent: "#a98a8a",
  line: "#d9d2c8",
  cream: "#fff7f4",
} as const;

const SANS = "'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";
const SERIF = "'DM Serif Display', Georgia, 'Times New Roman', serif";

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function valueToText(v: unknown): string {
  if (Array.isArray(v)) {
    return v.filter((x): x is string => typeof x === "string" && x.trim() !== "").join(", ");
  }
  return typeof v === "string" ? v.trim() : "";
}

export function fullName(data: Record<string, unknown>): string {
  return [data.firstName, data.lastName]
    .filter((v): v is string => typeof v === "string" && v.trim() !== "")
    .join(" ");
}

// Plain-text fallback body — every provided field as `Label:\nvalue`.
export function buildText(data: Record<string, unknown>): string {
  const lines = Object.entries(FIELD_LABELS)
    .map(([key, label]) => {
      const text = valueToText(data[key]);
      return text ? `${label}:\n${text}` : null;
    })
    .filter(Boolean)
    .join("\n\n");
  return lines || "(empty form)";
}

// Branded, table-based HTML email. Tables + inline styles are the only layout
// primitives that render consistently across Gmail / Apple Mail / Outlook.
export function buildHtml(data: Record<string, unknown>, name: string, email: string): string {
  const displayName = name ? escapeHtml(name) : "New inquiry";
  const safeEmail = escapeHtml(email);

  const rows = DETAIL_KEYS.map((key) => {
    const text = valueToText(data[key]);
    if (!text) return "";
    const label = escapeHtml(FIELD_LABELS[key]);
    const value = escapeHtml(text).replace(/\n/g, "<br>");
    return `
            <tr>
              <td style="padding:18px 32px 0 32px;">
                <div style="font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${BRAND.accent};">${label}</div>
                <div style="margin-top:7px;font-family:${SANS};font-size:15px;line-height:1.55;color:${BRAND.ink};">${value}</div>
              </td>
            </tr>`;
  }).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light">
<title>New project inquiry</title>
</head>
<body style="margin:0;padding:0;background-color:${BRAND.page};">
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;">New project inquiry${name ? ` from ${escapeHtml(name)}` : ""} — reply directly to respond.</div>
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:${BRAND.page};">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:600px;background-color:${BRAND.surface};border:1px solid ${BRAND.line};border-radius:14px;overflow:hidden;">
          <tr>
            <td style="background-color:${BRAND.brown};padding:30px 32px;">
              <div style="font-family:${SERIF};font-size:28px;line-height:1;letter-spacing:1px;color:${BRAND.cream};">SMUR</div>
              <div style="margin-top:8px;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#e8d8cf;">New project inquiry</div>
            </td>
          </tr>
          <tr>
            <td style="padding:30px 32px 4px 32px;">
              <div style="font-family:${SERIF};font-size:24px;line-height:1.2;color:${BRAND.ink};">${displayName}</div>
              <div style="margin-top:8px;font-family:${SANS};font-size:15px;line-height:1.4;">
                <a href="mailto:${safeEmail}" style="color:${BRAND.brown};text-decoration:underline;">${safeEmail}</a>
              </div>
            </td>
          </tr>
          ${rows}
          <tr><td style="height:28px;"></td></tr>
          <tr>
            <td style="padding:22px 32px 30px 32px;border-top:1px solid ${BRAND.line};">
              <div style="font-family:${SANS};font-size:12px;line-height:1.55;color:${BRAND.muted};">
                Sent from the SMUR website contact form. Reply directly to this email to respond${name ? ` to ${escapeHtml(name)}` : ""}.
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
