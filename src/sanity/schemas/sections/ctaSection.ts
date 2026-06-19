export const ctaSection = {
  name: "ctaSection",
  title: "Call to Action Section",
  type: "object",
  fields: [
    { name: "heading", title: "Heading", type: "string", validation: (r: any) => r.required() },
    { name: "description", title: "Description", type: "text", rows: 2 },
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
      name: "background",
      title: "Background",
      type: "string",
      options: { list: [
        { title: "Ocean Blue", value: "ocean" },
        { title: "White", value: "white" },
        { title: "Light Gray", value: "gray" },
      ]},
      initialValue: "ocean",
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: any) => ({ title: title || "CTA Section", subtitle: "Call to Action" }),
  },
};
