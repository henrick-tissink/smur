import { services } from "@/content/home";
import { MobileAbout } from "./about";
import { MobileHero } from "./hero";
import { MobileNav } from "./nav";
import { MobilePhotoStrip } from "./photo-strip";
import { MobileServiceCard } from "./service-card";
import { MobileServicesList } from "./services-list";
import { MobileTestimonial } from "./testimonial";

/*
  Mobile composition mirrors home mobile frame (268:3521): 393 × 5281.
  Each section has an explicit height matching the Figma layout. Gaps between
  sections come from the marginTop values below, which sum to Figma's exact
  y-coordinates:
    Hero               y=0    h=852
    Brand identity     y=923  h=826 (gap from hero = 71)
    Naming & Pos       y=1820 h=876 (gap = 71)
    Webdesign          y=2767 h=526 (gap = 71)
    Testimonial        y=3346 h=522 (gap = 53)
    Photo strip        y=3868 h=392 (gap = 0)
    About              y=4260 h=1021 (gap = 0)
    Total              y=5281
*/
export function MobileLayout() {
  return (
    <>
      <MobileNav />
      <main>
        <MobileHero />
        <div style={{ marginTop: "71px" }}>
          <MobileServiceCard service={services[0]} />
        </div>
        <div style={{ marginTop: "71px" }}>
          <MobileServiceCard service={services[1]} />
        </div>
        <div style={{ marginTop: "71px" }}>
          <MobileServicesList />
        </div>
        <div style={{ marginTop: "53px" }}>
          <MobileTestimonial />
        </div>
        <MobilePhotoStrip />
        <MobileAbout />
      </main>
    </>
  );
}
