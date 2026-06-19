export const page = {
  name: "page",
  title: "Page",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r: any) => r.required(),
    },
    {
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [
        { type: "heroSection" },
        { type: "featuresSection" },
        { type: "textSection" },
        { type: "ctaSection" },
        { type: "statsSection" },
        { type: "gallerySection" },
        { type: "testimonialsSection" },
        { type: "faqSection" },
        { type: "imageTextSection" },
      ],
      options: {
        insertMenu: {
          views: [
            {
              name: "grid",
              previewComponent: (item: any) => {
                const labels: Record<string, string> = {
                  heroSection: "Hero",
                  featuresSection: "Features",
                  textSection: "Text",
                  ctaSection: "CTA",
                  statsSection: "Stats",
                  gallerySection: "Gallery",
                  testimonialsSection: "Testimonials",
                  faqSection: "FAQ",
                  imageTextSection: "Image + Text",
                };
                return labels[item?.type] || item?.type || "Section";
              },
            },
          ],
        },
      },
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        { name: "metaTitle", title: "Meta Title", type: "string", description: "Override the page title for SEO (max 60 chars)" },
        { name: "metaDescription", title: "Meta Description", type: "text", rows: 2, description: "Description for search engines (max 160 chars)" },
        { name: "ogImage", title: "Social Share Image", type: "image", options: { hotspot: true } },
      ],
    },
    {
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: false,
      description: "Only published pages are visible on the site",
    },
  ],
  orderings: [
    { title: "Title A-Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", slug: "slug", published: "published" },
    prepare: ({ title, slug, published }: any) => ({
      title,
      subtitle: `/${slug?.current || "no-slug"}${published ? "" : " (draft)"}`,
    }),
  },
};
