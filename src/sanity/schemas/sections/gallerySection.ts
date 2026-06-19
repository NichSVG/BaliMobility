export const gallerySection = {
  name: "gallerySection",
  title: "Gallery Section",
  type: "object",
  fields: [
    { name: "eyebrow", title: "Eyebrow Text", type: "string" },
    { name: "heading", title: "Heading", type: "string" },
    { name: "description", title: "Description", type: "text", rows: 2 },
    {
      name: "images",
      title: "Images",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "image", title: "Image", type: "image", options: { hotspot: true }, validation: (r: any) => r.required() },
            { name: "caption", title: "Caption", type: "string" },
            { name: "alt", title: "Alt Text", type: "string" },
          ],
        },
      ],
      validation: (r: any) => r.min(1),
    },
    {
      name: "columns",
      title: "Columns",
      type: "string",
      options: { list: [
        { title: "2 Columns", value: "2" },
        { title: "3 Columns", value: "3" },
        { title: "4 Columns", value: "4" },
      ]},
      initialValue: "3",
    },
  ],
  preview: {
    select: { title: "heading", images: "images" },
    prepare: ({ title, images }: any) => ({
      title: title || "Gallery",
      subtitle: `${images?.length || 0} images`,
    }),
  },
};
