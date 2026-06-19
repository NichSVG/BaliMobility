export const heroSection = {
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string", validation: (r: any) => r.required() },
    { name: "subheading", title: "Subheading", type: "text", rows: 2 },
    { name: "image", title: "Background Image", type: "image", options: { hotspot: true } },
    {
      name: "buttons",
      title: "Buttons",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "text", title: "Button Text", type: "string", validation: (r: any) => r.required() },
            { name: "link", title: "Link", type: "string", validation: (r: any) => r.required() },
            {
              name: "style",
              title: "Style",
              type: "string",
              options: { list: [
                { title: "Primary (Coral)", value: "primary" },
                { title: "Secondary (Outline)", value: "secondary" },
              ]},
              initialValue: "primary",
            },
          ],
        },
      ],
    },
    {
      name: "overlay",
      title: "Overlay Opacity",
      type: "string",
      options: { list: [
        { title: "Dark (70%)", value: "dark" },
        { title: "Medium (50%)", value: "medium" },
        { title: "Light (30%)", value: "light" },
        { title: "None", value: "none" },
      ]},
      initialValue: "dark",
    },
    {
      name: "height",
      title: "Section Height",
      type: "string",
      options: { list: [
        { title: "Full (90vh)", value: "full" },
        { title: "Medium (60vh)", value: "medium" },
        { title: "Small (40vh)", value: "small" },
      ]},
      initialValue: "full",
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: any) => ({ title: title || "Hero Section", subtitle: "Hero" }),
  },
};
