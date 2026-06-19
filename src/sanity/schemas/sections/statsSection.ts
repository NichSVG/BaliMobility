export const statsSection = {
  name: "statsSection",
  title: "Stats Section",
  type: "object",
  fields: [
    {
      name: "stats",
      title: "Statistics",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", title: "Value", type: "string", description: "e.g. 15+, 2,000+, 4.9", validation: (r: any) => r.required() },
            { name: "label", title: "Label", type: "string", validation: (r: any) => r.required() },
            { name: "icon", title: "Icon (emoji)", type: "string" },
          ],
        },
      ],
      validation: (r: any) => r.min(1).max(6),
    },
    {
      name: "background",
      title: "Background",
      type: "string",
      options: { list: [
        { title: "White", value: "white" },
        { title: "Light Gray", value: "gray" },
        { title: "Ocean Blue", value: "ocean" },
      ]},
      initialValue: "white",
    },
  ],
  preview: {
    select: { stats: "stats" },
    prepare: ({ stats }: any) => ({
      title: `${stats?.length || 0} statistics`,
      subtitle: "Stats Section",
    }),
  },
};
