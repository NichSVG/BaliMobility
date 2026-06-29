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

async function removeEmojis() {
  console.log("Fetching all service documents...");
  const all = await client.fetch<any[]>(
    `*[_type == "service"]{ _id, title, icon }`
  );

  console.log(`Found ${all.length} services.`);

  const transaction = client.transaction();
  for (const doc of all) {
    if (doc.icon) {
      console.log(`Removing icon from "${doc.title}" (was: ${doc.icon})`);
      transaction.patch(doc._id, { unset: ["icon"] });
    }
  }
  await transaction.commit();
  console.log("Done!");
}

removeEmojis().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
