export const teamMember = {
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string", validation: (r: any) => r.required() },
    { name: "role", title: "Role / Title", type: "string", validation: (r: any) => r.required() },
    { name: "bio", title: "Bio", type: "text", rows: 3 },
    { name: "photo", title: "Photo", type: "image", options: { hotspot: true } },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
};
