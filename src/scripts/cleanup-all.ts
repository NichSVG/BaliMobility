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

const VALID_EQUIPMENT_SLUGS = [
  "mobility-scooter",
  "wheelchair",
  "baby-push-chair",
  "baby-car-seat",
  "walker-frame",
  "shower-seat",
  "toilet-seat",
];

async function cleanup() {
  // --- Testimonials ---
  console.log("=== Testimonials ===");
  const testimonials = await client.fetch<any[]>(
    `*[_type == "testimonial"]{ _id, name, location, text }`
  );
  console.log(`Found ${testimonials.length} testimonial documents.`);

  const seenTestimonials: string[] = [];
  const toDeleteTestimonials: string[] = [];

  for (const t of testimonials) {
    const key = `${t.name}|${t.location}|${t.text?.substring(0, 50)}`;
    if (seenTestimonials.includes(key)) {
      console.log(`Duplicate testimonial: "${t.name}" — deleting`);
      toDeleteTestimonials.push(t._id);
    } else {
      seenTestimonials.push(key);
    }
  }

  if (toDeleteTestimonials.length > 0) {
    const tx = client.transaction();
    for (const id of toDeleteTestimonials) tx.delete(id);
    await tx.commit();
    console.log(`Deleted ${toDeleteTestimonials.length} duplicate testimonials.\n`);
  } else {
    console.log("No duplicate testimonials.\n");
  }

  // --- Equipment ---
  console.log("=== Equipment ===");
  const equipment = await client.fetch<any[]>(
    `*[_type == "equipment"]{ _id, name, slug }`
  );
  console.log(`Found ${equipment.length} equipment documents.`);

  const toDeleteEquipment: string[] = [];
  const seenSlugs: string[] = [];

  for (const eq of equipment) {
    const slug = eq.slug?.current;
    if (!VALID_EQUIPMENT_SLUGS.includes(slug) || seenSlugs.includes(slug)) {
      console.log(`Removing "${eq.name}" (slug: ${slug}) — ${!VALID_EQUIPMENT_SLUGS.includes(slug) ? "not on website" : "duplicate"}`);
      toDeleteEquipment.push(eq._id);
    } else {
      seenSlugs.push(slug);
    }
  }

  if (toDeleteEquipment.length > 0) {
    const tx = client.transaction();
    for (const id of toDeleteEquipment) tx.delete(id);
    await tx.commit();
    console.log(`Deleted ${toDeleteEquipment.length} equipment documents.`);
  } else {
    console.log("No equipment to remove.");
  }

  // --- Services ---
  console.log("\n=== Services ===");
  const services = await client.fetch<any[]>(
    `*[_type == "service"]{ _id, title, slug }`
  );
  console.log(`Found ${services.length} service documents.`);

  const VALID_SERVICE_SLUGS = ["equipment-rental", "tour-services", "accessible-transport"];
  const toDeleteServices: string[] = [];
  const seenServiceSlugs: string[] = [];

  for (const svc of services) {
    const slug = svc.slug?.current;
    if (!VALID_SERVICE_SLUGS.includes(slug) || seenServiceSlugs.includes(slug)) {
      console.log(`Removing "${svc.title}" (slug: ${slug}) — ${!VALID_SERVICE_SLUGS.includes(slug) ? "not on website" : "duplicate"}`);
      toDeleteServices.push(svc._id);
    } else {
      seenServiceSlugs.push(slug);
    }
  }

  if (toDeleteServices.length > 0) {
    const tx = client.transaction();
    for (const id of toDeleteServices) tx.delete(id);
    await tx.commit();
    console.log(`Deleted ${toDeleteServices.length} service documents.`);
  } else {
    console.log("No services to remove.");
  }
}

cleanup().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});
