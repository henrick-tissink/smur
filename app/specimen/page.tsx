import { Eyebrow, Button, Icon, Wordmark } from "@/components/core";
import { Nav, MobileNav } from "@/components/navigation";
import { Hero } from "@/components/sections/hero";
import { MobileHero } from "@/components/sections/mobile-hero";
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
    </main>
  );
}
