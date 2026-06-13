export const faqItem = {
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  fields: [
    { name: "category", title: "Category", type: "string", validation: (r: any) => r.required() },
    { name: "question", title: "Question", type: "string", validation: (r: any) => r.required() },
    { name: "answer", title: "Answer", type: "text", rows: 4, validation: (r: any) => r.required() },
    { name: "order", title: "Display Order", type: "number" },
  ],
  orderings: [
    { title: "Category then Order", name: "catOrder", by: [{ field: "category", direction: "asc" }, { field: "order", direction: "asc" }] },
  ],
};
