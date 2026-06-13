export const service = {
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r: any) => r.required() },
    { name: "icon", title: "Icon (emoji)", type: "string" },
    { name: "description", title: "Short Description", type: "text", rows: 3 },
    {
      name: "details",
      title: "What's Included",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "ctaText", title: "CTA Button Text", type: "string" },
    { name: "ctaLink", title: "CTA Link", type: "string" },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
