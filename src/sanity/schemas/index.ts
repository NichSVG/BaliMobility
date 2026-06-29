import { service } from "./service";
import { equipment } from "./equipment";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { siteSettings } from "./siteSettings";
import { enquiry } from "./enquiry";
import { page } from "./page";
import { blogPost } from "./blogPost";
import { sectionTypes } from "./sections";

export const schemaTypes = [
  service,
  equipment,
  testimonial,
  faqItem,
  siteSettings,
  enquiry,
  page,
  blogPost,
  ...sectionTypes,
];
