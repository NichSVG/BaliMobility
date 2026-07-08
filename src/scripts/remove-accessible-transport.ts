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

async function removeAccessibleTransport() {
  console.log("Removing accessible transport from Sanity CMS...\n");

  // 1. Delete the accessible-transport service
  console.log("=== Service ===");
  const service = await client.fetch<any[]>(
    `*[_type == "service" && slug.current == "accessible-transport"]{ _id, title }`
  );

  if (service.length > 0) {
    console.log(`Found service: "${service[0].title}" — deleting`);
    await client.delete(service[0]._id);
    console.log("Deleted accessible-transport service.");
  } else {
    console.log("No accessible-transport service found.");
  }

  // 2. Delete FAQ items in "Accessible Transport" category
  console.log("\n=== FAQ Items ===");
  const faqItems = await client.fetch<any[]>(
    `*[_type == "faqItem" && category == "Accessible Transport"]{ _id, question }`
  );

  if (faqItems.length > 0) {
    console.log(`Found ${faqItems.length} FAQ items in "Accessible Transport" category:`);
    faqItems.forEach((faq) => console.log(`  - "${faq.question}"`));

    const tx = client.transaction();
    for (const faq of faqItems) {
      tx.delete(faq._id);
    }
    await tx.commit();
    console.log(`Deleted ${faqItems.length} FAQ items.`);
  } else {
    console.log("No FAQ items found in 'Accessible Transport' category.");
  }

  console.log("\n✅ Done! Accessible transport has been removed from Sanity CMS.");
}

removeAccessibleTransport().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
