import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    // Negotiated per-request via the Accept header: AVIF first (smallest, ~20%
    // under WebP), WebP fallback. This is what shrinks the hero showcase PNGs
    // (~2.7MB each) to a few hundred KB. Next 16 defaults to WebP-only, so AVIF
    // must be opted in explicitly.
    formats: ["image/avif", "image/webp"],
    // Next 16 requires every `quality` passed to next/image to be allow-listed
    // here, otherwise it silently snaps to the nearest allowed value (default
    // is [75]). 90 keeps brand-graphic/text edges crisp on the showcases.
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
