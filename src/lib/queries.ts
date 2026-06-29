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
  rate3Days,
  rateWeekly,
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

export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug && published == true][0] {
  _id,
  title,
  "slug": slug.current,
  sections[]{
    _type,
    _key,
    ...,
    _type == "heroSection" => {
      heading,
      subheading,
      image,
      buttons[]{ text, link, style },
      overlay,
      height,
    },
    _type == "featuresSection" => {
      eyebrow,
      heading,
      description,
      columns,
      features[]{ icon, title, description, link },
      background,
    },
    _type == "textSection" => {
      eyebrow,
      heading,
      content,
      alignment,
      background,
      image,
      imagePosition,
    },
    _type == "ctaSection" => {
      heading,
      description,
      buttons[]{ text, link, style },
      background,
    },
    _type == "statsSection" => {
      stats[]{ value, label, icon },
      background,
    },
    _type == "gallerySection" => {
      eyebrow,
      heading,
      description,
      images[]{ image, caption, alt },
      columns,
    },
    _type == "testimonialsSection" => {
      eyebrow,
      heading,
      description,
      limit,
      showOnlyFeatured,
      background,
    },
    _type == "faqSection" => {
      eyebrow,
      heading,
      description,
      category,
      background,
    },
    _type == "imageTextSection" => {
      eyebrow,
      heading,
      text,
      points[]{ title, description },
      image,
      imageAlt,
      imagePosition,
      button{ text, link },
      background,
    },
  },
  seo{
    metaTitle,
    metaDescription,
    ogImage,
  },
}`;

export const allPagesSlugsQuery = groq`*[_type == "page" && published == true] {
  "slug": slug.current,
}`;

export const blogPostsQuery = groq`*[_type == "blogPost"] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  tags,
  publishedAt,
  featured,
  seoTitle,
  seoDescription
}`;

export const blogPostBySlugQuery = groq`*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  content,
  category,
  tags,
  publishedAt,
  featured,
  seoTitle,
  seoDescription
}`;

export const featuredBlogPostsQuery = groq`*[_type == "blogPost" && featured == true] | order(publishedAt desc) [0...3] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  publishedAt
}`;
