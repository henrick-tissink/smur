import { ctaButton, services, servicesList } from "@/content/home";
import { Reveal } from "../reveal";

/*
  Mobile Webdesign — Group 77 (text) + Frame 78 (list) + BUTTON 2 (CTA).
  All in a fixed-height section. Per Figma metadata (absolute y in home mobile):
    - Group 77 (text): y=2767, w=308 h=282 — eyebrow + title + body
      - Eyebrow at y=0,    "more.more.more."
      - Title   at y=36,   "Webdesign, Print & More"
      - Body    at y=167
    - Frame 78 (list): y=3096, w=194 h=115
    - BUTTON 2: y=3258, w=307 h=35

  Section spans y=2767 to y=3293 (button end) — height 526.
  Relative coords within section (subtracting 2767):
    - Text block top: 0
    - Body top: 167
    - List top: 329 (3096 - 2767)
    - Button top: 491 (3258 - 2767)
*/
export function MobileServicesList() {
  const service = services[2];
  return (
    <section
      id="m-webdesign-print"
      aria-labelledby="m-webdesign-title"
      data-nav-scheme="dark"
      className="relative mx-auto"
      style={{ width: "393px", height: "526px" }}
    >
      <div
        className="absolute"
        style={{ left: "42px", top: "0px", width: "308px" }}
      >
        <Reveal>
          <span
            className="block font-sans italic text-accent"
            style={{ fontSize: "15px", lineHeight: 1 }}
          >
            {service.eyebrow}
          </span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2
            id="m-webdesign-title"
            className="mt-[25px] font-heading text-ink"
            style={{ fontSize: "45px", lineHeight: 1.21 }}
          >
            {service.title}
          </h2>
        </Reveal>
      </div>

      <div
        className="absolute"
        style={{ left: "42px", top: "167px", width: "308px" }}
      >
        <Reveal delay={0.1}>
          <p className="text-ink" style={{ fontSize: "15px", lineHeight: 1.33 }}>
            {service.body}
          </p>
        </Reveal>
      </div>

      <div
        className="absolute"
        style={{ left: "42px", top: "329px", width: "194px" }}
      >
        <Reveal delay={0.15}>
          <ul
            className="text-ink"
            style={{ fontSize: "15px", lineHeight: 1, display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {servicesList.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div
        className="absolute"
        style={{ left: "42px", top: "491px" }}
      >
        <Reveal delay={0.2}>
          <a
            href="#contact"
            className="inline-flex items-center gap-[6px] rounded-full border border-accent px-[24px] py-[6px] no-underline transition-opacity hover:opacity-80"
            style={{ color: "#a18080" }}
          >
            <span
              className="font-sans"
              style={{ fontSize: "19.51px", lineHeight: 1.21 }}
            >
              {ctaButton}{" "}
            </span>
            <img
              src="/figma-assets/mobile/button-arrow.svg"
              alt=""
              aria-hidden
              style={{ width: "40px", height: "14px" }}
            />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
