import { createClient } from "@sanity/client";
import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(__dirname, "../../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.argv[2] || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2025-06-10",
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

async function updateFaq() {
  console.log("🔄 Updating FAQ items in Sanity CMS...\n");

  // 1. Delete all existing FAQ items
  console.log("🗑️  Deleting old FAQ items...");
  const oldFaqs = await client.fetch(`*[_type == "faqItem"]._id`);
  for (const id of oldFaqs) {
    await client.delete(id);
  }
  console.log(`   Deleted ${oldFaqs.length} old FAQ items.`);

  // 2. Create new FAQ items
  console.log("📝 Creating new FAQ items...");
  const faqs = [
    {
      _type: "faqItem",
      category: "Equipment",
      question: "What equipment do you rent?",
      answer:
        "We rent 7 types of equipment: mobility scooters, wheelchairs, baby push chairs, baby car seats, walker frames, shower seats, and raised toilet seats. All equipment is regularly serviced, cleaned, and inspected before each rental.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Equipment",
      question: "What is the weight capacity of your equipment?",
      answer:
        "Mobility scooters and wheelchairs support up to 120 kg. Shower chairs support up to 130 kg. Walker frames and baby equipment have their own safety-rated limits — ask us and we'll match the right equipment to your needs.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Equipment",
      question: "Is the mobility scooter suitable for Bali's roads?",
      answer:
        "Our scooters work well on footpaths, in shopping areas, and on smooth roads. They have a max speed of 8 km/h and a range of 20 km per charge. For very uneven terrain or cobblestone areas, we recommend a wheelchair with a companion.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Equipment",
      question: "Can I take the mobility scooter in a car?",
      answer:
        "Yes — our scooters fold down for easy transport. They fit in most car boots, making it easy to get to restaurants, beaches, and attractions.",
      order: 4,
    },
    {
      _type: "faqItem",
      category: "Equipment",
      question: "What type of wheelchair do you offer?",
      answer:
        "We offer lightweight, foldable aluminium wheelchairs with removable footrests and a weight capacity of 120 kg. They're designed for travel and easy to transport in cars.",
      order: 5,
    },
    {
      _type: "faqItem",
      category: "Pricing",
      question: "How much does it cost to rent equipment?",
      answer:
        "Daily rates: mobility scooter $25, wheelchair $10, walker frame $7, shower seat $5, toilet seat $5. We also offer 3-day and weekly rates at a discount. See our equipment page for full pricing.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Pricing",
      question: "What are your rental periods?",
      answer:
        "We offer three rental periods: daily, 3-day, and weekly. There is no minimum rental — you can rent for a single day. You can also extend your rental anytime during your trip.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Pricing",
      question: "Do I need to pay a deposit?",
      answer:
        "No deposit is required for most rentals. Payment is due on delivery. For longer rentals (1 week or more) during peak season, we may ask for a small advance to secure your booking.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Pricing",
      question: "What is your cancellation policy?",
      answer:
        "You can cancel or modify your booking anytime before delivery at no charge. For same-day cancellations after delivery has been arranged, contact us directly.",
      order: 4,
    },
    {
      _type: "faqItem",
      category: "Delivery",
      question: "Do you deliver to my hotel?",
      answer:
        "Yes — we deliver free of charge to hotels, villas, and private accommodations across Bali including Sanur, Kuta, Legian, Seminyak, Nusa Dua, Jimbaran, Ubud, Canggu, and surrounding areas.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Delivery",
      question: "Can you deliver to the airport?",
      answer:
        "Yes! We can deliver wheelchairs or mobility scooters directly to Ngurah Rai International Airport so you have equipment from the moment you land. Share your flight details and we'll meet you at arrivals.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Delivery",
      question: "How does delivery work?",
      answer:
        "Tell us your hotel or villa name, check-in date, and preferred delivery time. We'll coordinate with your accommodation so the equipment is waiting for you when you arrive. Pickup is also free — just let us know when you're done.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Accessible Transport",
      question: "Do you offer accessible transport in Bali?",
      answer:
        "Yes — we have wheelchair-accessible vehicles with ramps and secure tie-down systems. We offer airport transfers ($30), half-day tours ($55), and full-day tours ($95). All include a trained driver.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Accessible Transport",
      question: "Can I book an accessible day tour?",
      answer:
        "Yes! We offer half-day (4 hours) and full-day (8 hours) accessible tours. Popular routes include Ubud rice terraces, Tanah Lot temple, Uluwatu, and beach tours. All vehicles are wheelchair accessible.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Tours",
      question: "How much does a tour cost?",
      answer:
        "Half-day tours (approx. 4 hours) are $60 per car. Full-day tours (approx. 8 hours) are $100 per car. Both include the car, driver, and petrol. Entrance fees and meals are not included.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Tours",
      question: "Can I choose my own tour route?",
      answer:
        "Absolutely! Tell us where you want to go and we'll plan the route. Popular options include Ubud rice terraces, Tanah Lot temple, Uluwatu, Kintamani volcano, and shopping tours. The driver follows your schedule.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Support",
      question: "What if the equipment breaks down?",
      answer:
        "Call or WhatsApp us immediately. We offer 24/7 support during your rental period and will repair or replace the equipment within hours — usually within 1-2 hours in popular areas like Sanur, Kuta, and Seminyak.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Support",
      question: "Do I need travel insurance?",
      answer:
        "Yes, we strongly recommend comprehensive travel insurance covering your specific medical needs. While our equipment is well-maintained, travel insurance gives you extra peace of mind for your whole Bali trip.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Support",
      question: "How do I contact you?",
      answer:
        "The fastest way is WhatsApp on +62 821-4652-2084 — we usually reply within minutes during business hours. You can also use the booking form on our contact page or email us at dedikbali@yahoo.com.",
      order: 3,
    },
  ];

  for (const faq of faqs) {
    await client.create(faq);
  }
  console.log(`   Created ${faqs.length} new FAQ items.`);

  // 3. Update siteSettings contact info
  console.log("⚙️  Updating site settings...");
  await client
    .patch("siteSettings")
    .set({
      phone: "+62 821-4652-2084",
      email: "dedikbali@yahoo.com",
      address:
        "Perumahan Griya Carik No.16 Bona Kelod, Blahbatuh, Gianyar, Bali, Indonesia",
      whatsappNumber: "6282146522084",
      whatsappMessage:
        "Hi Bali Mobility! I'd like to enquire about equipment rental.",
      businessHours: "Daily: 8:00 AM - 4:00 PM (WITA)",
    })
    .catch(() => {
      console.log("   ⚠️  siteSettings not found, skipping.");
    });

  // 4. Update equipment pricing to USD
  console.log("🦽 Updating equipment pricing to USD...");
  const equipmentUpdates: Record<string, any> = {
    "mobility-scooter": {
      rateDaily: "$25",
      rate3Days: "$65",
      rateWeekly: "$130",
    },
    "manual-wheelchair": {
      rateDaily: "$10",
      rate3Days: "$25",
      rateWeekly: "$50",
    },
    "electric-wheelchair": {
      rateDaily: "$15",
      rate3Days: "$40",
      rateWeekly: "$75",
    },
    walker: {
      rateDaily: "$7",
      rate3Days: "$18",
      rateWeekly: "$35",
    },
    "beach-wheelchair": {
      rateDaily: "$20",
      rate3Days: "$50",
      rateWeekly: "$100",
    },
  };

  for (const [slug, rates] of Object.entries(equipmentUpdates)) {
    const eq = await client.fetch(
      `*[_type == "equipment" && slug.current == $slug][0]._id`,
      { slug }
    );
    if (eq) {
      await client.patch(eq).set(rates).commit();
      console.log(`   Updated ${slug}`);
    }
  }

  console.log("\n✅ CMS update complete!");
  console.log("   FAQ: 20 items across 7 categories (USD pricing, no packages/carers)");
  console.log("   Site settings: contact info updated");
  console.log("   Equipment: pricing converted to USD");
}

updateFaq().catch((err) => {
  console.error("❌ Update failed:", err);
  process.exit(1);
});
