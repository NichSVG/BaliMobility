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

async function cleanup() {
  console.log("Fetching holidayPackage and teamMember documents...");
  const docs = await client.fetch<any[]>(
    `*[_type == "holidayPackage" || _type == "teamMember"]{ _id, _type, name }`
  );

  if (docs.length === 0) {
    console.log("Nothing to delete.");
    return;
  }

  console.log(`Found ${docs.length} document(s):`);
  docs.forEach((d) => console.log(`  - ${d._type}: ${d.name || d._id}`));

  const transaction = client.transaction();
  for (const doc of docs) {
    transaction.delete(doc._id);
  }
  await transaction.commit();
  console.log(`Deleted ${docs.length} document(s).`);
}

cleanup().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
