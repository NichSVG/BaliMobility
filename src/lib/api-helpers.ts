import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

export const sanity = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export function ok(data: any) {
  return NextResponse.json(data);
}

export function err(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function getTypeFromPath(path: string): string {
  const map: Record<string, string> = {
    services: "service",
    equipment: "equipment",
    packages: "holidayPackage",
    testimonials: "testimonial",
    faq: "faqItem",
    team: "teamMember",
    settings: "siteSettings",
  };
  return map[path] || path;
}
