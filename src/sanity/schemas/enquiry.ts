export const enquiry = {
  name: "enquiry",
  title: "Enquiry",
  type: "document",
  fields: [
    { name: "firstName", title: "First Name", type: "string" },
    { name: "lastName", title: "Last Name", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "phone", title: "Phone", type: "string" },
    { name: "contactMethod", title: "Preferred Contact", type: "string" },
    {
      name: "services",
      title: "Services Interested In",
      type: "array",
      of: [{ type: "string" }],
    },
    { name: "dateFrom", title: "Arrival Date", type: "string" },
    { name: "dateTo", title: "Departure Date", type: "string" },
    { name: "people", title: "Number of People", type: "string" },
    { name: "accommodation", title: "Accommodation Area", type: "string" },
    { name: "mobilityLevel", title: "Mobility Level", type: "string" },
    { name: "specificNeeds", title: "Specific Needs", type: "text", rows: 3 },
    { name: "message", title: "Message", type: "text", rows: 3 },
    {
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Contacted", value: "contacted" },
          { title: "Confirmed", value: "confirmed" },
          { title: "Completed", value: "completed" },
        ],
      },
    },
    { name: "submittedAt", title: "Submitted At", type: "datetime" },
  ],
  preview: {
    select: {
      title: "firstName",
      subtitle: "email",
      status: "status",
    },
    prepare({ title, subtitle, status }: any) {
      return {
        title: `${title} ${status ? `(${status})` : ""}`,
        subtitle,
      };
    },
  },
};
