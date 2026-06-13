export const siteSettings = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "siteName", title: "Site Name", type: "string" },
    { name: "tagline", title: "Tagline", type: "string" },
    { name: "description", title: "Site Description (SEO)", type: "text", rows: 2 },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "email", title: "Email", type: "string" },
    { name: "address", title: "Address", type: "text", rows: 2 },
    { name: "whatsappNumber", title: "WhatsApp Number (with country code)", type: "string" },
    { name: "whatsappMessage", title: "WhatsApp Default Message", type: "string" },
    { name: "googleMapsEmbed", title: "Google Maps Embed URL", type: "url" },
    { name: "businessHours", title: "Business Hours", type: "text", rows: 3 },
  ],
};
