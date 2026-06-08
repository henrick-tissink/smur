"use client";

import { useState } from "react";

/*
  Shared submit flow for the desktop + mobile contact forms.

  The button label tracks real delivery (June 2026 client request):
    idle → sending → sent   only when POST /api/contact returns 2xx
                  → error   otherwise (with a hint to email directly)
*/
export type SendState = "idle" | "sending" | "sent" | "error";

export function useContactSubmit() {
  const [state, setState] = useState<SendState>("idle");

  async function submit(form: HTMLFormElement) {
    if (state === "sending" || state === "sent") return;
    setState("sending");
    try {
      const fd = new FormData(form);
      const payload: Record<string, string | string[]> = {};
      for (const [key, value] of fd.entries()) {
        const text = String(value);
        const prev = payload[key];
        if (prev === undefined) payload[key] = text;
        else if (Array.isArray(prev)) prev.push(text);
        else payload[key] = [prev, text];
      }
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  return { state, submit };
}
