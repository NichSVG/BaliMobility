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

const updates = [
  {
    question: "Do you deliver to my hotel?",
    newAnswer:
      "Yes — we deliver to hotels, villas, and private accommodations across Bali. Delivery and collection are by car, with a small fee depending on your area:\n\n• Sanur area: $20\n• Ubud: $20\n• Kuta, Seminyak, Canggu, Nusa Dua: $30\n\nFree delivery on rentals of 1 week or longer. Tell us your hotel or villa name and we'll confirm the exact fee for your area.",
  },
  {
    question: "Can you deliver to the airport?",
    newAnswer:
      "We do not deliver directly to the airport. Ngurah Rai International Airport already provides free wheelchairs at arrivals for anyone who needs one, so most guests prefer to use that service at the airport and have us deliver their equipment directly to their hotel or villa instead. This way you have comfortable equipment ready and waiting at your accommodation.",
  },
  {
    question: "How does delivery work?",
    newAnswer:
      "Delivery and collection are both by car. Tell us your hotel or villa name, check-in date, and preferred delivery time. We'll coordinate with your accommodation so the equipment is waiting for you when you arrive. On collection day, we pick up the equipment from your hotel or villa at a time that suits you — no need to bring it anywhere.",
  },
];

async function updateFAQs() {
  console.log("Fetching all FAQ items from Sanity...");

  const all = await client.fetch<any[]>(
    `*[_type == "faqItem"]{ _id, question, answer }`
  );

  console.log(`Found ${all.length} FAQ items in Sanity.`);

  const transaction = client.transaction();
  let updated = 0;
  let notFound = 0;

  for (const update of updates) {
    const match = all.find(
      (faq) => faq.question.trim().toLowerCase() === update.question.trim().toLowerCase()
    );

    if (match) {
      console.log(`Updating: "${update.question}" (id: ${match._id})`);
      transaction.patch(match._id, { set: { answer: update.newAnswer } });
      updated++;
    } else {
      console.log(`NOT FOUND in Sanity: "${update.question}" — adding as new item`);
      transaction.create({
        _type: "faqItem",
        category: "Delivery",
        question: update.question,
        answer: update.newAnswer,
      });
      notFound++;
    }
  }

  await transaction.commit();
  console.log(`\nDone! Updated: ${updated} | Added: ${notFound}`);
}

updateFAQs().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
