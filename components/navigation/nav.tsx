import Link from "next/link";
import { Wordmark } from "@/components/core";
import { nav } from "@/content/home";

/*
  Desktop nav (Figma 6:1282) — non-sticky; scrolls away, overlapping only the
  first section, so color is fixed per page via `scheme` to match it.
  Faithful-fluid: flex row with token horizontal padding (--nav-pad-x), no
  absolute-pixel positioning, no zoom.
*/
export function Nav({ scheme = "dark" }: { scheme?: "light" | "dark" }) {
  const color = scheme === "light" ? "var(--color-cream)" : "var(--color-ink)";
  return (
    <header
      aria-label="Primary"
      className="absolute inset-x-0 top-0 z-50"
      style={{ paddingTop: "clamp(28px, 3.5vw, 50px)" }}
    >
      <div
        data-nav-text
        className="mx-auto flex max-w-[1440px] items-center justify-between"
        style={{
          color,
          paddingLeft: "var(--nav-pad-x)",
          paddingRight: "var(--nav-pad-x)",
        }}
      >
        <Link href="/#home" aria-label="SMUR — home" className="block">
          <Wordmark width={108} height={24} />
        </Link>
        <nav aria-label="Sections">
          <ul
            className="flex items-center uppercase"
            style={{ gap: `${nav.linkGap}px`, fontFamily: "var(--font-body)", fontSize: "17px" }}
          >
            {nav.links.map((link) => (
              <li key={link.label} className="shrink-0">
                <Link
                  href={link.href}
                  className="block transition-opacity hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
