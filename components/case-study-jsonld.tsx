import { getTranslations, getLocale } from "next-intl/server";
import { workProjects } from "@/content/work";
import { caseStudySchema } from "@/lib/structured-data";

/*
  Per-project CreativeWork JSON-LD on a /work/<slug> page. Name + image come
  from content/work.ts; the description + language are localized (the route's
  own Metadata.<slug>.description), so the structured data matches the page's
  active locale.
*/
export async function CaseStudyJsonLd({ slug }: { slug: string }) {
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return null;

  const t = await getTranslations("Metadata");
  const locale = await getLocale();

  const schema = caseStudySchema({
    slug,
    name: project.name,
    description: t(`${slug}.description`),
    image: project.image,
    locale,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
