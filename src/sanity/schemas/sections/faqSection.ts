export const faqSection = {
  name: "faqSection",
  title: "FAQ Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string", initialValue: "FAQ" },
    { name: "heading", title: "Heading", type: "string", initialValue: "Frequently Asked Questions" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    {
      name: "category",
      title: "Filter by Category (optional)",
      type: "string",
      description: "Leave empty to show all FAQs",
    },
    {
      name: "background",
      title: "Background",
      type: "string",
      options: { list: [
        { title: "White", value: "white" },
        { title: "Light Gray", value: "gray" },
      ]},
      initialValue: "white",
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: any) => ({ title: title || "FAQ", subtitle: "FAQ Section" }),
  },
};
