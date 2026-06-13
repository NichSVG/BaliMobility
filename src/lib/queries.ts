import { groq } from "next-sanity";

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  title,
  "slug": slug.current,
  icon,
  image,
  description,
  details,
  ctaText,
  ctaLink
}`;

export const equipmentQuery = groq`*[_type == "equipment"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  icon,
  description,
  features,
  rateDaily,
  rateWeekly,
  rateHoliday,
  rateDailyAud,
  rateWeeklyAud,
  rateHolidayAud,
  bestFor,
  image
}`;

export const packagesQuery = groq`*[_type == "holidayPackage"] | order(order asc) {
  _id,
  name,
  "slug": slug.current,
  nights,
  priceAud,
  priceGbp,
  priceUsd,
  popular,
  description,
  included,
  excluded,
  itinerary,
  image
}`;

export const testimonialsQuery = groq`*[_type == "testimonial"] {
  _id,
  name,
  location,
  rating,
  text,
  photo,
  featured
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] {
  _id,
  name,
  location,
  rating,
  text,
  photo
}`;

export const faqQuery = groq`*[_type == "faqItem"] | order(category asc, order asc) {
  _id,
  category,
  question,
  answer
}`;

export const teamQuery = groq`*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  role,
  bio,
  photo
}`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0] {
  siteName,
  tagline,
  description,
  phone,
  email,
  address,
  whatsappNumber,
  whatsappMessage,
  googleMapsEmbed,
  businessHours,
  heroImage,
  ogImage,
  aboutImage,
  featuredPackageImage
}`;
