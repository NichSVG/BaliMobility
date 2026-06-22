export const blogPost = {
  name: "blogPost",
  title: "Blog Post",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (r: any) => r.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r: any) => r.required(),
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      description: "Short summary for blog listing page",
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Bali Culture & Festivals", value: "bali-culture" },
          { title: "Accessibility & Disability", value: "accessibility" },
          { title: "Travel Tips", value: "travel-tips" },
          { title: "Equipment Guides", value: "equipment" },
          { title: "Destinations", value: "destinations" },
        ],
      },
    },
    {
      name: "tags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
    },
    {
      name: "featured",
      title: "Featured Post?",
      type: "boolean",
    },
    {
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: "Override page title for search engines",
    },
    {
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      rows: 2,
      description: "Meta description for search engines",
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category",
      media: "mainImage",
    },
  },
};
