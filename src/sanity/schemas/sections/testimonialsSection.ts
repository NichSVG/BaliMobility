export const testimonialsSection = {
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string", initialValue: "Testimonials" },
    { name: "heading", title: "Heading", type: "string", initialValue: "What our guests say" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    {
      name: "limit",
      title: "Max Testimonials to Show",
      type: "number",
      initialValue: 3,
      validation: (r: any) => r.min(1).max(12),
    },
    {
      name: "showOnlyFeatured",
      title: "Show Only Featured",
      type: "boolean",
      initialValue: true,
    },
    {
      name: "background",
      title: "Background",
      type: "string",
      options: { list: [
        { title: "Light Gray", value: "gray" },
        { title: "White", value: "white" },
      ]},
      initialValue: "gray",
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: any) => ({ title: title || "Testimonials", subtitle: "Testimonials Section" }),
  },
};
