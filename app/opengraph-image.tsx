import { ImageResponse } from "next/og";

/*
  Default social-share image (Open Graph + Twitter), auto-applied by Next to
  every route that doesn't define its own. Generated (no design asset needed):
  brand ink background with the cream wordmark + tagline, mirroring the hero.
  Smaranda can later drop a designed 1200×630 PNG at app/opengraph-image.png
  to override this.
*/

export const alt = "SMUR — Naming, Branding & Design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#35221A",
          color: "#FFF7F4",
          padding: "96px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 150, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1 }}>
          SMUR
        </div>
        <div style={{ display: "flex", width: 140, height: 6, backgroundColor: "#A98A8A", marginTop: 36, marginBottom: 40 }} />
        <div style={{ fontSize: 50, opacity: 0.95 }}>Naming, Branding &amp; Design</div>
        <div style={{ fontSize: 28, color: "#CBB3A6", marginTop: 28 }}>
          Independent brand identity studio · smur-world.com
        </div>
      </div>
    ),
    { ...size },
  );
}
