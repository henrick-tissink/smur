// "Work With Me" / Contact page content. Figma frames:
//   - desktop 193:1383 (WORK WE ME): 1440 × 3093
//   - mobile  282:39442 (work w me): 393 × 2683
//
// Sections (desktop coords):
//   y=0-812    Hero (sage #bbc2b5 bg, cream text, intro + project images)
//   y=812-2039 Form (cream page bg, fields stacked with underline style)
//   y=2039-3093 Brown FAQ (warm brown #906553, accordion + image strip)
//
// Text content lifted verbatim from get_design_context.

export const contactFrame = {
  desktop: { width: 1440, height: 3093 },
  mobile: { width: 393, height: 2683 },
} as const;

export const contactHero = {
  // Sage section bg: #bbc2b5; text cream #fff7f4
  title: "Tell Me About Your Project",
  body:
    "Branding is a thoughtful investment in both your business and the way you want to be experienced.  If you feel aligned with my work, please take a moment to review the services and FAQ before filling out the inquiry form below. From there, I’ll follow up with a few questions so we can explore whether we’re the right fit for each other. If aligned, I’ll prepare a custom proposal tailored to your project. For anything else, feel free to reach out at hello@smur-world.com",
  email: "hello@smur-world.com",
} as const;

export type ContactField =
  | { kind: "text"; id: string; label: string; helper?: string }
  | { kind: "checkboxGroup"; id: string; label: string; options: string[] }
  | { kind: "textarea"; id: string; placeholder: string };

export const contactForm: {
  fields: ContactField[];
  buttonLabel: string;
} = {
  fields: [
    { kind: "text", id: "firstName", label: "First name" },
    { kind: "text", id: "lastName", label: "Last name" },
    { kind: "text", id: "email", label: "Email adress", helper: "(required)" },
    { kind: "text", id: "business", label: "Business name", helper: "(if any)" },
    {
      kind: "checkboxGroup",
      id: "interests",
      label: "What can I help you with?",
      options: [
        "Brand Identiy (Logo and further)",
        "Naming",
        "Web design",
        "Digital design deliverables",
        "Print design deliverables",
        "Other",
      ],
    },
    { kind: "text", id: "brandAbout", label: "What is your brand about?" },
    {
      kind: "text",
      id: "deadline",
      label: "Do you have an ideal deadline in mind?",
    },
    {
      kind: "textarea",
      id: "details",
      placeholder: "Any additional details you’d like to include?",
    },
    {
      kind: "text",
      id: "source",
      label: "How did you come across this website?",
    },
  ],
  buttonLabel: "SAVE & SEND",
};

export const contactFAQ = {
  eyebrow: "I answered your",
  heading: "Questions",
  items: [
    "WOULD YOU DESIGN JUST A LOGO?",
    "DO YOU OFFER PAYMENT PLANS?",
    "HOW MUCH DOES DESIGN COST?",
    "What if I need more time for feedback?",
  ],
  myWorkLink: "my work :)",
  socials: "INSTAGRAM   /   PINTEREST",
  // Reuse 4 tiles from /public/figma-assets/work/ for the bottom strip.
  workThumbs: [
    "/figma-assets/work/crisp.png",
    "/figma-assets/work/interstellar.png",
    "/figma-assets/work/kokop.png",
    "/figma-assets/work/taf.png",
  ],
} as const;
