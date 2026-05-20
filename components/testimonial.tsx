import { testimonial } from "@/content/home";
import { Reveal } from "./reveal";

/*
  Frame 31 (1:838): bg-[#bbc2b5] (sage), 1440 × 426
  Frame 45 (18:72) wrapper: x=361.27 width=702 top=103
  Quote (18:68): 17px DM Sans Regular, text-[#35221a]
  Attribution (18:69): 20px DM Sans Italic, text-[#35221a]
*/
export function Testimonial() {
  return (
    <section
      aria-label="Testimonial"
      data-nav-scheme="dark"
      className="bg-band text-ink"
      style={{ height: "426px" }}
    >
      <div className="relative mx-auto h-full max-w-[1440px]">
        <button
          type="button"
          aria-label="Previous testimonial"
          className="absolute text-ink/70 transition-colors hover:text-ink"
          style={{ left: "218px", top: "200px" }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next testimonial"
          className="absolute text-ink/70 transition-colors hover:text-ink"
          style={{ right: "218px", top: "200px" }}
        >
          →
        </button>

        <div
          className="absolute flex flex-col items-center gap-[30px] text-center"
          style={{ left: "361px", top: "103px", width: "702px" }}
        >
          <Reveal>
            <p className="text-[17px] leading-[1.33] text-ink">
              {testimonial.quote}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-sans text-[20px] italic leading-normal text-ink">
              {testimonial.attribution}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
