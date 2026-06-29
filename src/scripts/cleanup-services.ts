import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

const VALID_slugs = ["equipment-rental", "tour-services", "accessible-transport"];

async function cleanup() {
  console.log("Fetching all service documents...");
  const all = await client.fetch<any[]>(
    `*[_type == "service"]{ _id, title, slug, order }`
  );

  console.log(`Found ${all.length} total service documents.`);

  const toDelete: string[] = [];
  const validSlugsSet = new Set(VALID_slugs);

  for (const doc of all) {
    const slug = doc.slug?.current;
    if (!validSlugsSet.has(slug)) {
      console.log(`Irrelevant service "${doc.title}" (slug: ${slug}) — deleting`);
      toDelete.push(doc._id);
    }
  }

  // Also check for duplicates of valid slugs
  const grouped: Record<string, any[]> = {};
  for (const doc of all) {
    const slug = doc.slug?.current;
    if (!validSlugsSet.has(slug)) continue;
    if (!grouped[slug]) grouped[slug] = [];
    grouped[slug].push(doc);
  }

  for (const [slug, docs] of Object.entries(grouped)) {
    if (docs.length > 1) {
      const sorted = docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      const keep = sorted[0];
      const remove = sorted.slice(1);
      console.log(`Duplicate service "${slug}" — keeping ${keep.title}, deleting ${remove.length}`);
      toDelete.push(...remove.map((d) => d._id));
    }
  }

  if (toDelete.length === 0) {
    console.log("Nothing to delete. All clean!");
    return;
  }

  console.log(`\nDeleting ${toDelete.length} document(s)...`);
  const transaction = client.transaction();
  for (const id of toDelete) {
    transaction.delete(id);
  }
  await transaction.commit();
  console.log("Done!");
}

cleanup().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
