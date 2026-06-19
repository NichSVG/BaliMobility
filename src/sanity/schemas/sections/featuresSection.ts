export const featuresSection = {
  name: "featuresSection",
  title: "Features Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string", description: "Small text above the heading" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    {
      name: "columns",
      title: "Columns per Row",
      type: "string",
      options: { list: [
        { title: "2 Columns", value: "2" },
        { title: "3 Columns", value: "3" },
        { title: "4 Columns", value: "4" },
      ]},
      initialValue: "3",
    },
    {
      name: "features",
      title: "Features",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "icon", title: "Icon (emoji)", type: "string" },
            { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 2 },
            { name: "link", title: "Link (optional)", type: "string" },
          ],
        },
      ],
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
    prepare: ({ title }: any) => ({ title: title || "Features Section", subtitle: "Features" }),
  },
};
