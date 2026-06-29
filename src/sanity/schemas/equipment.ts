export const equipment = {
  name: "equipment",
  title: "Equipment",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: any) => r.required() },
    { name: "slug", title: "Slug", type: "slug", options: { source: "name" }, validation: (r: any) => r.required() },
    { name: "description", title: "Description", type: "text", rows: 3 },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "rateDaily", title: "Rate — Daily (USD)", type: "string" },
    { name: "rate3Days", title: "Rate — 3 Days (USD)", type: "string" },
    { name: "rateWeekly", title: "Rate — Weekly (USD)", type: "string" },
    { name: "bestFor", title: "Best For", type: "text", rows: 2 },
    { name: "image", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
