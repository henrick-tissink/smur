import { Eyebrow, Button, Icon, Wordmark } from "@/components/core";
import { Nav, MobileNav } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { MobileHero } from "@/components/sections/mobile-hero";
import { ServiceSection } from "@/components/sections/service-section";
import { ServicesListSection } from "@/components/sections/services-list-section";
import { MobileServiceSection } from "@/components/sections/mobile-service-section";
import { MobileServicesListSection } from "@/components/sections/mobile-services-list-section";
import { Testimonial } from "@/components/sections/testimonial";
import { MobileTestimonial } from "@/components/sections/mobile-testimonial";
import { PhotoStrip } from "@/components/sections/photo-strip";
import { MobilePhotoStrip } from "@/components/sections/mobile-photo-strip";
import { About } from "@/components/sections/about";
import { MobileAbout } from "@/components/sections/mobile-about";
import { services } from "@/content/home";
import { colors } from "@/lib/tokens";

export default function SpecimenPage() {
  return (
    <main style={{ padding: "48px", background: "var(--color-page)", color: "var(--color-ink)" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-display)", lineHeight: "var(--leading-display)" }}>
        Foundation specimen
      </h1>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>colour tokens</Eyebrow>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 12 }}>
          {Object.entries(colors).map(([name, hex]) => (
            <div key={name} style={{ width: 120 }}>
              <div style={{ height: 64, background: hex, border: "1px solid var(--color-line)" }} />
              <div style={{ fontSize: 12, marginTop: 4 }}>{name}<br />{hex}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>type scale</Eyebrow>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h2)" }}>H2 — Naming &amp; Positioning</p>
        <p style={{ fontFamily: "var(--font-serif)", fontSize: "var(--text-h3)" }}>H3 — Print &amp; More</p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "var(--text-body)", lineHeight: "var(--leading-body)", maxWidth: 430 }}>
          Body 17/1.33 — Branding is not just aesthetics, it&rsquo;s a reflection of who you are.
        </p>
      </section>

      <section style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
        <Eyebrow>components</Eyebrow>
        <Wordmark />
        <Button href="#" trailingArrow>LET&apos;S WORK TOGETHER</Button>
        <Button variant="solid">SEND</Button>
        <span style={{ display: "inline-flex", gap: 12 }}>
          <Icon name="arrow-left" title="prev" />
          <Icon name="arrow-right" title="next" />
          <Icon name="chevron-down" />
          <Icon name="hamburger" />
          <Icon name="close" />
        </span>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>navigation</Eyebrow>
        {/* Nav is position:absolute; give each demo a tall relative band so it sits over a colored ground */}
        <div style={{ position: "relative", height: 120, marginTop: 12, background: "var(--color-hero)" }}>
          <Nav scheme="light" />
        </div>
        <div style={{ position: "relative", height: 120, marginTop: 12, background: "var(--color-page)", border: "1px solid var(--color-line)" }}>
          <Nav scheme="dark" />
        </div>
        <div style={{ position: "relative", height: 160, marginTop: 12, background: "var(--color-hero)", maxWidth: 393 }}>
          <MobileNav scheme="dark" />
        </div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>hero — desktop</Eyebrow>
        <div style={{ marginTop: 12 }}><Hero /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <Eyebrow>hero — mobile</Eyebrow>
        <div style={{ marginTop: 12, width: 393 }}><MobileHero /></div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>service sections — desktop</Eyebrow>
        <div style={{ marginTop: 12 }}><ServiceSection service={services[0]} /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <div style={{ marginTop: 12 }}><ServiceSection service={services[1]} /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <div style={{ marginTop: 12 }}><ServicesListSection /></div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>service sections — mobile</Eyebrow>
        <div style={{ marginTop: 12, width: 393 }}><MobileServiceSection service={services[0]} /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <div style={{ marginTop: 12, width: 393 }}><MobileServiceSection service={services[1]} /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <div style={{ marginTop: 12, width: 393 }}><MobileServicesListSection /></div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>testimonial — desktop</Eyebrow>
        <div style={{ marginTop: 12 }}><Testimonial /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <Eyebrow>testimonial — mobile</Eyebrow>
        <div style={{ marginTop: 12, width: 393 }}><MobileTestimonial /></div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>photo strip — desktop</Eyebrow>
        <div style={{ marginTop: 12 }}><PhotoStrip /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <Eyebrow>photo strip — mobile</Eyebrow>
        <div style={{ marginTop: 12, width: 393 }}><MobilePhotoStrip /></div>
      </section>

      <section style={{ marginTop: 40 }}>
        <Eyebrow>about — desktop</Eyebrow>
        <div style={{ marginTop: 12 }}><About /></div>
      </section>
      <section style={{ marginTop: 40 }}>
        <Eyebrow>about — mobile</Eyebrow>
        <div style={{ marginTop: 12, width: 393 }}><MobileAbout /></div>
      </section>
    </main>
  );
}
