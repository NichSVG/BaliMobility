export const imageTextSection = {
  name: "imageTextSection",
  title: "Image + Text Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "text", title: "Text", type: "text", rows: 4 },
    {
      name: "points",
      title: "Key Points",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string", validation: (r: any) => r.required() },
            { name: "description", title: "Description", type: "text", rows: 2 },
          ],
        },
      ],
    },
    { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r: any) => r.required() },
    { name: "imageAlt", title: "Image Alt Text", type: "string" },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: { list: [
        { title: "Right", value: "right" },
        { title: "Left", value: "left" },
      ]},
      initialValue: "right",
    },
    {
      name: "button",
      title: "Button (optional)",
      type: "object",
      fields: [
        { name: "text", title: "Button Text", type: "string" },
        { name: "link", title: "Link", type: "string" },
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
    prepare: ({ title }: any) => ({ title: title || "Image + Text", subtitle: "Image Text Section" }),
  },
};
