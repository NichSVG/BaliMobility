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

const VALID_SLUGS = [
  "mobility-scooter",
  "wheelchair",
  "baby-push-chair",
  "baby-car-seat",
  "walker-frame",
  "shower-seat",
  "toilet-seat",
];

async function cleanup() {
  console.log("Fetching all equipment documents...");
  const all = await client.fetch<any[]>(
    `*[_type == "equipment"]{ _id, name, slug, order }`
  );

  console.log(`Found ${all.length} total equipment documents.`);

  // Group by slug
  const grouped: Record<string, any[]> = {};
  for (const doc of all) {
    const slug = doc.slug?.current;
    if (!slug) continue;
    if (!grouped[slug]) grouped[slug] = [];
    grouped[slug].push(doc);
  }

  const toDelete: string[] = [];
  const validSlugsSet = new Set(VALID_SLUGS);

  for (const [slug, docs] of Object.entries(grouped)) {
    if (!validSlugsSet.has(slug)) {
      // Irrelevant slug — delete ALL of them
      console.log(`Irrelevant slug "${slug}" — deleting ${docs.length} document(s)`);
      toDelete.push(...docs.map((d) => d._id));
      continue;
    }

    if (docs.length > 1) {
      // Duplicates — keep the first, delete the rest
      const sorted = docs.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
      const keep = sorted[0];
      const remove = sorted.slice(1);
      console.log(
        `Duplicate slug "${slug}" — keeping ${keep._id} (order ${keep.order}), deleting ${remove.length}`
      );
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
  console.log("Done! Deleted", toDelete.length, "document(s).");
}

cleanup().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
