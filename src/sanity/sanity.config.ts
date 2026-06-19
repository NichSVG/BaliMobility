import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./schemas";
import { structure } from "./structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "demo-project";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "balimob-studio",
  title: "Bali Mobility CMS",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({ structure }),
    presentationTool({
      previewUrl: {
        origin:
          typeof location === "undefined"
            ? "http://localhost:3001"
            : location.origin,
        draftMode: {
          enable: "/api/draft",
        },
      },
      resolve: {
        locations: {
          page: {
            select: { slug: "slug.current", title: "title" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title || "Page",
                  href: `/${doc?.slug || ""}`,
                },
              ],
            }),
          },
        },
      },
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
