export const testimonial = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", title: "Guest Name", type: "string", validation: (r: any) => r.required() },
    { name: "location", title: "Location (City, Country)", type: "string" },
    { name: "rating", title: "Rating (1-5)", type: "number", validation: (r: any) => r.min(1).max(5) },
    { name: "text", title: "Testimonial Text", type: "text", rows: 4, validation: (r: any) => r.required() },
    { name: "photo", title: "Photo (with permission)", type: "image", options: { hotspot: true } },
    { name: "service", title: "Service Reviewed", type: "string", options: { list: ["Mobility Scooter", "Wheelchair", "Electric Wheelchair", "Baby Push Chair", "Baby Car Seat", "Walker Frame", "Shower Seat", "Toilet Seat", "Day Tour", "General"] } },
    { name: "featured", title: "Featured on Homepage?", type: "boolean" },
  ],
};
