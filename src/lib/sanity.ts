import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-06-10";

// Production client with visual editing (stega) enabled
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "/studio",
    enabled: process.env.NEXT_PUBLIC_SANITY_VISUAL_EDITING === "true",
  },
});

// Draft client — always fetches latest drafts
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "previewDrafts",
  stega: {
    studioUrl: "/studio",
    enabled: true,
  },
});

export function getClient(preview?: boolean) {
  return preview ? previewClient : client;
}
