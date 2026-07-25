import { workProjects } from "@/content/work";
import { caseStudySchema } from "@/lib/structured-data";

/*
  Renders per-project CreativeWork JSON-LD on a /work/<slug> page. Name + image
  come from content/work.ts (single source of truth); the description is passed
  in (the route's own SEO metadata.description, so the two stay in sync).
*/
export function CaseStudyJsonLd({
  slug,
  description,
}: {
  slug: string;
  description: string;
}) {
  const project = workProjects.find((p) => p.slug === slug);
  if (!project) return null;

  const schema = caseStudySchema({
    slug,
    name: project.name,
    description,
    image: project.image,
  });

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
