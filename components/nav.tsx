import Image from "next/image";
import Link from "next/link";
import { nav } from "@/content/home";

/*
  Nav Component (Figma 6:1282) — 1440 × 64, positioned at y=30 in HOME.
  Inner row: absolute left=86 right=85 top=20 height=24,
    flex items-center justify-between
    - Logo (Layer_1): SVG 108×24
    - Links group: flex gap=61px, DM Sans 17px uppercase, color #fff7f4

  The nav sits at the top of the page (not sticky) and scrolls away with the
  content, overlapping only the first section. Its color is therefore fixed
  per page via the `scheme` prop, matching that first section's palette:
    - "light" → cream content (over the hero beige / contact)
    - "dark"  → dark-brown content (over the cream/sage work + case studies)
*/
export function Nav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const textClass = scheme === "light" ? "text-cream" : "text-ink";
  // SVG logo is light by default; make it dark on light-background sections.
  const logoInvert = scheme === "dark" ? "brightness-0" : "";

  return (
    <header
      className="absolute inset-x-0 top-0 z-50 h-[94px]"
      aria-label="Primary"
    >
      <div className="relative mx-auto h-full max-w-[1440px]">
        <div
          className="absolute flex h-[24px] items-center justify-between"
          style={{ left: "86px", right: "85px", top: "50px" }}
        >
          <Link
            href="/#home"
            aria-label="SMUR — home"
            className="block h-[24px] w-[108px]"
          >
            <Image
              src={nav.logo.src}
              alt={nav.logo.alt}
              width={nav.logo.width}
              height={nav.logo.height}
              priority
              unoptimized
              className={`block h-full w-full ${logoInvert}`}
            />
          </Link>
          <nav aria-label="Sections">
            <ul
              className={`flex items-center text-[17px] uppercase ${textClass}`}
              style={{ gap: `${nav.linkGap}px` }}
            >
              {nav.links.map((link) => (
                <li
                  key={link.label}
                  style={{ width: `${link.width}px` }}
                  className="shrink-0"
                >
                  <a
                    href={link.href}
                    className="block transition-opacity hover:opacity-70"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
