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

export type FAQItem = {
  question: string;
  answer: string;
};

// Questions + answers lifted verbatim from "Written content.pdf" (May 2026).
export const contactFAQItems: FAQItem[] = [
  {
    question: "Do you offer logo-only projects?",
    answer:
      "I used to think I only worked in complete identity systems, where everything is built together from the ground up.\n\nThese days, I've realized I can also zoom in and focus on smaller pieces when the project calls for it.\n\nIf you like my work but only need a fragment, feel free to get in touch and we'll figure out what fits.",
  },
  {
    question: "Are payment plans available?",
    answer:
      "Yes. I usually structure payments in 1–4 installments depending on the complexity of the project.\n\nBranding and design work is an investment, and I try to keep the process flexible and accessible. In most cases, payments are split across the project timeline, with longer arrangements available if needed.\n\nYou also don't need to do everything at once. Many of my clients come back for additional work over time.",
  },
  {
    question: "What can I expect to invest?",
    answer:
      "Because every project is different and can be shaped around your specific needs, there isn't a fixed price list that applies to everything.\n\nOnce I understand what you're looking for, I will put together a tailored proposal based on complexity, priorities, volume and level of detail involved.",
  },
  {
    question: "What happens if I need extra time for feedback?",
    answer:
      "I usually work with a feedback window of up to 5 working days per round. This keeps the process flowing smoothly and helps us stay aligned with the overall timeline.\n\nIf you need a bit more time, that's absolutely fine, just let me know in advance and we'll adjust things where possible. I always aim to find a rhythm that works for both sides and keeps the project moving without pressure.",
  },
];

export const contactFAQ = {
  eyebrow: "I answered your",
  heading: "Questions",
  // Keep `items` for back-compat; new code should read `contactFAQItems`.
  items: contactFAQItems.map((i) => i.question),
  myWorkLink: "my work :)",
  socials: "INSTAGRAM   /   PINTEREST",
  instagramUrl: "https://www.instagram.com/smurstudio/",
  pinterestUrl: "https://ro.pinterest.com/smurstudio/_saved/",
  // FAQ strip — dedicated photos from EXPORTS/Let_s work (May 2026).
  // Each thumb links to its case study.
  workThumbs: [
    { src: "/figma-assets/contact/faq-strip/crisp.png", href: "/work/crisp" },
    { src: "/figma-assets/contact/faq-strip/interstellar.png", href: "/work/interstellar" },
    { src: "/figma-assets/contact/faq-strip/kokop.png", href: "/work/kokop" },
    { src: "/figma-assets/contact/faq-strip/taf.png", href: "/work/taf" },
  ],
} as const;
