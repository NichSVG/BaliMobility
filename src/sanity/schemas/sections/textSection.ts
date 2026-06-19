export const textSection = {
  name: "textSection",
  title: "Text Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  { name: "href", type: "string", title: "URL" },
                ],
              },
            ],
          },
        },
      ],
    },
    {
      name: "alignment",
      title: "Text Alignment",
      type: "string",
      options: { list: [
        { title: "Left", value: "left" },
        { title: "Center", value: "center" },
      ]},
      initialValue: "left",
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
    {
      name: "image",
      title: "Side Image (optional)",
      type: "image",
      options: { hotspot: true },
      description: "If set, text and image display side by side",
    },
    {
      name: "imagePosition",
      title: "Image Position",
      type: "string",
      options: { list: [
        { title: "Right", value: "right" },
        { title: "Left", value: "left" },
      ]},
      initialValue: "right",
      hidden: ({ parent }: any) => !parent?.image,
    },
  ],
  preview: {
    select: { title: "heading" },
    prepare: ({ title }: any) => ({ title: title || "Text Section", subtitle: "Text" }),
  },
};
