import { testimonial } from "@/content/home";
import { Reveal } from "../reveal";

/*
  Mobile testimonial (Frame 90 268:34805): bg #bbc2b5 (sage), 393 × 522.
  Content (Group 79) at left=42 top=90, 308 wide:
    - Quote: 15px DM Sans Regular text-[#35221a] center
    - Attribution: 20px DM Sans Italic text-[#35221a] center
    - Arrows at top=417
*/
export function MobileTestimonial() {
  return (
    <section
      aria-label="Testimonial"
      data-nav-scheme="dark"
      className="bg-band text-ink"
      style={{ height: "522px" }}
    >
      <div
        className="relative mx-auto h-full"
        style={{ maxWidth: "393px" }}
      >
        <div
          className="absolute flex flex-col items-center text-center"
          style={{ left: "42px", right: "43px", top: "90px" }}
        >
          <Reveal>
            <p
              className="text-ink"
              style={{ fontSize: "15px", lineHeight: 1.33 }}
            >
              {testimonial.quote}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p
              className="mt-[30px] font-sans italic text-ink"
              style={{ fontSize: "20px", lineHeight: "normal" }}
            >
              {testimonial.attribution}
            </p>
          </Reveal>
        </div>
        <div
          className="absolute flex items-center gap-[42px]"
          style={{ top: "417px", left: "115px" }}
        >
          <button
            type="button"
            aria-label="Previous testimonial"
            className="text-ink/70 transition-colors hover:text-ink"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            className="text-ink/70 transition-colors hover:text-ink"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
