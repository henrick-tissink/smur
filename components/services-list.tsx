import { ctaButton, services, servicesList } from "@/content/home";
import { Reveal } from "./reveal";
import { LavaboBrandBook } from "./work/lavabo-brand-book";

/*
  Third service section: Webdesign, Print & More.
  Frame 79 (text): x=218 y=1881 width=425 height=258
  Frame 78 (list): x=218 y=2183 width=194 height=142
  BUTTON: x=218 y=2368 width=318
  Image (LAVABO) on right
*/
export function ServicesList() {
  const service = services[2];
  return (
    <section
      id="webdesign-print"
      aria-labelledby="webdesign-title"
      data-nav-scheme="dark"
      className="mx-auto max-w-[1440px] px-[220px] py-[130px]"
    >
      <div className="flex items-start justify-between gap-[120px]">
        <div className="w-[430px]">
          <Reveal>
            <span className="eyebrow">{service.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2
              id="webdesign-title"
              className="mt-[16px] font-heading text-[58px] leading-[1.21] text-ink"
            >
              {service.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-[36px] max-w-[425px] text-[17px] leading-[1.33] text-ink">
              {service.body}
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <ul className="mt-[44px] space-y-[27px] text-[14px] text-ink">
              {servicesList.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="#contact"
              className="group mt-[60px] inline-flex items-center gap-3 rounded-full border border-ink/50 px-7 py-3 text-[13px] uppercase tracking-[0.15em] text-ink transition-colors hover:border-ink hover:bg-ink hover:text-page"
            >
              {ctaButton}
              <span
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <LavaboBrandBook
            width={service.frameWidth}
            height={service.frameHeight}
          />
        </Reveal>
      </div>
    </section>
  );
}
