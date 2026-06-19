import { service } from "./service";
import { equipment } from "./equipment";
import { holidayPackage } from "./package";
import { testimonial } from "./testimonial";
import { faqItem } from "./faqItem";
import { teamMember } from "./teamMember";
import { siteSettings } from "./siteSettings";
import { enquiry } from "./enquiry";
import { page } from "./page";
import { sectionTypes } from "./sections";

export const schemaTypes = [
  service,
  equipment,
  holidayPackage,
  testimonial,
  faqItem,
  teamMember,
  siteSettings,
  enquiry,
  page,
  ...sectionTypes,
];
