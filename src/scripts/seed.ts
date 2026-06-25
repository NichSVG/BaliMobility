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

async function seed() {
  console.log("🌱 Seeding Sanity with Bali Mobility content...\n");

  // Site Settings
  console.log("⚙️  Creating site settings...");
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Bali Mobility",
    tagline: "Wheelchair & mobility scooter rental in Bali",
    description:
      "Mobility equipment rental in Bali. Scooters, wheelchairs, walker frames, shower seats, and more delivered to your hotel.",
    phone: "+62 821-4652-2084",
    email: "dedikbali@yahoo.com",
    address: "Perumahan Griya Carik No.16 Bona Kelod, Blahbatuh, Gianyar, Bali, Indonesia",
    whatsappNumber: "6282146522084",
    whatsappMessage:
      "Hi Bali Mobility! I'd like to enquire about equipment rental.",
    businessHours: "Daily: 8:00 AM - 4:00 PM (WITA)",
  });

  // Services
  console.log("🛎️  Creating services...");
  const services = [
    {
      _type: "service",
      title: "Equipment Rental",
      slug: { current: "equipment-rental" },
      icon: "🦽",
      description:
        "Wide range of mobility equipment delivered directly to your hotel or villa. All equipment is well-maintained, clean, and ready to use.",
      details: [
        "Mobility scooters — lightweight and travel-friendly",
        "Wheelchairs — foldable with removable footrests",
        "Walkers and rollators — with seats and baskets",
        "Adjustable toilet seats and shower chairs",
        "Baby push chairs and car seats",
      ],
      ctaText: "View Equipment",
      ctaLink: "/equipment",
      order: 1,
    },
    {
      _type: "service",
      title: "Accessible Transport",
      slug: { current: "accessible-transport" },
      icon: "🚐",
      description:
        "Wheelchair-accessible vehicles with ramps. Airport transfers and day tours around Bali.",
      details: [
        "Wheelchair-accessible vehicles with ramps",
        "Airport collection and return",
        "Half-day and full-day tours",
        "Professional, trained drivers",
      ],
      ctaText: "Book Transport",
      ctaLink: "/accessible-transport-bali",
      order: 2,
    },
    {
      _type: "service",
      title: "Airport Assistance",
      slug: { current: "airport-assistance" },
      icon: "✈️",
      description:
        "Wheelchair assistance at Ngurah Rai Airport. Meet-and-greet, flight tracking, and accessible transfers.",
      details: [
        "Meet and greet at arrivals",
        "Wheelchair at the airport",
        "Flight tracking — we're there even if you're delayed",
        "Optional accessible transfer to your hotel",
      ],
      ctaText: "Book Airport Assistance",
      ctaLink: "/airport-wheelchair-assistance-bali",
      order: 3,
    },
  ];

  for (const svc of services) {
    await client.create(svc);
  }

  // Equipment
  console.log("🦽 Creating equipment...");
  const equipment = [
    {
      _type: "equipment",
      name: "Mobility Scooter",
      slug: { current: "mobility-scooter" },
      icon: "🛵",
      description:
        "Lightweight, foldable mobility scooter perfect for exploring Bali's footpaths, markets, and beachside paths.",
      features: [
        "Max speed: 8 km/h",
        "Range: 20 km per charge",
        "Weight capacity: 120 kg",
        "Foldable for easy transport",
      ],
      rateDaily: "$25",
      rate3Days: "$65",
      rateWeekly: "$130",
      bestFor:
        "Travellers with limited mobility who can stand and transfer.",
      order: 1,
    },
    {
      _type: "equipment",
      name: "Wheelchair",
      slug: { current: "wheelchair" },
      icon: "🦽",
      description:
        "Lightweight aluminium wheelchair with removable footrests and folding design.",
      features: [
        "Lightweight aluminium frame",
        "Removable footrests",
        "Folding design",
        "Weight capacity: 120 kg",
      ],
      rateDaily: "$10",
      rate3Days: "$25",
      rateWeekly: "$50",
      bestFor: "Travellers who need a wheelchair for getting around Bali.",
      order: 2,
    },
    {
      _type: "equipment",
      name: "Baby Push Chair",
      slug: { current: "baby-push-chair" },
      icon: "👶",
      description:
        "Lightweight baby stroller for families with young children.",
      features: [
        "Ages 6 months – 4 years",
        "Reclining seat",
        "Sun canopy with UV protection",
        "5-point safety harness",
      ],
      rateDaily: "$7",
      rate3Days: "$18",
      rateWeekly: "$35",
      bestFor: "Families with young children.",
      order: 3,
    },
    {
      _type: "equipment",
      name: "Baby Car Seat",
      slug: { current: "baby-car-seat" },
      icon: "🚗",
      description:
        "Safe and secure baby car seat for worry-free travel around Bali.",
      features: [
        "Suitable for ages 0–4 years",
        "5-point safety harness",
        "Easy installation",
        "Meets safety standards",
      ],
      rateDaily: "$7",
      rate3Days: "$18",
      rateWeekly: "$35",
      bestFor: "Families travelling with infants or toddlers.",
      order: 4,
    },
    {
      _type: "equipment",
      name: "Walker Frame",
      slug: { current: "walker-frame" },
      icon: "🦯",
      description:
        "Sturdy four-wheel walker with seat, brakes, and basket.",
      features: [
        "Four-wheel design with brakes",
        "Built-in padded seat",
        "Storage basket underneath",
        "Adjustable height",
      ],
      rateDaily: "$7",
      rate3Days: "$18",
      rateWeekly: "$35",
      bestFor: "Travellers who can walk but need extra stability.",
      order: 5,
    },
    {
      _type: "equipment",
      name: "Shower Seat",
      slug: { current: "shower-seat" },
      icon: "🚿",
      description:
        "Adjustable shower chair with backrest and armrests for safe bathing.",
      features: [
        "Adjustable seat height",
        "Backrest and armrests",
        "Non-slip rubber feet",
        "Rust-resistant aluminium",
      ],
      rateDaily: "$5",
      rate3Days: "$13",
      rateWeekly: "$25",
      bestFor: "Travellers who need seated support while showering.",
      order: 6,
    },
    {
      _type: "equipment",
      name: "Toilet Seat",
      slug: { current: "toilet-seat" },
      icon: "🚽",
      description:
        "Raised toilet seat with armrests for safer bathroom use.",
      features: [
        "Height adjustable",
        "Padded armrests",
        "Fits most toilets",
        "Tool-free installation",
      ],
      rateDaily: "$5",
      rate3Days: "$13",
      rateWeekly: "$25",
      bestFor: "Anyone needing extra height or support in the bathroom.",
      order: 7,
    },
  ];

  for (const eq of equipment) {
    await client.create(eq);
  }

  // Testimonials
  console.log("⭐ Creating testimonials...");
  const testimonials = [
    {
      _type: "testimonial",
      name: "Sarah M.",
      location: "Melbourne, Australia",
      rating: 5,
      text: "Bali Mobility made our family holiday absolutely stress-free. The scooter was waiting at our hotel and the equipment was in perfect condition. We could actually relax for the first time in years.",
      featured: true,
    },
    {
      _type: "testimonial",
      name: "James & Linda P.",
      location: "London, UK",
      rating: 5,
      text: "We were nervous about visiting Bali with my wheelchair, but the team handled everything — airport pickup, accessible transport, even arranged a beach wheelchair. Truly life-changing.",
      featured: true,
    },
    {
      _type: "testimonial",
      name: "Tom K.",
      location: "Sydney, Australia",
      rating: 5,
      text: "The equipment rental was worth every penny. They thought of everything we didn't even know we needed. Highly recommend for anyone with mobility challenges.",
      featured: true,
    },
    {
      _type: "testimonial",
      name: "Margaret H.",
      location: "Auckland, New Zealand",
      rating: 5,
      text: "As an elderly traveller, I was worried about visiting Bali alone. The mobility scooter they provided gave me independence and confidence. I felt safe and supported the entire trip.",
      featured: false,
    },
    {
      _type: "testimonial",
      name: "David & Karen W.",
      location: "Perth, Australia",
      rating: 5,
      text: "We've used Bali Mobility three times now. The consistency is amazing — every trip has been perfect. The equipment is always in great condition and the team is wonderful.",
      featured: false,
    },
  ];

  for (const t of testimonials) {
    await client.create(t);
  }

  // FAQ Items
  console.log("❓ Creating FAQ items...");
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
      category: "Airport Assistance",
      question: "What is your airport wheelchair assistance?",
      answer:
        "We arrange for a wheelchair and team member to meet you at Ngurah Rai Airport arrivals. They'll assist you through the airport and to your transfer vehicle. We track your flight so we're there on time, even if you're delayed.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Airport Assistance",
      question: "How much does airport wheelchair assistance cost?",
      answer:
        "Arrival-only assistance is $25. Arrival plus accessible transfer to your hotel is $45. Both include wheelchair, meet-and-greet, and luggage assistance.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Airport Assistance",
      question: "How far in advance should I book airport assistance?",
      answer:
        "We recommend booking at least 48 hours before your flight. For peak season (July-August, December-January), a week's notice is best. Same-day requests are possible but not guaranteed.",
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

  // Team Members
  console.log("👥 Creating team members...");
  const team = [
    {
      _type: "teamMember",
      name: "Wayan Sudarma",
      role: "Founder & Director",
      bio: "Born in Sanur, Wayan started Bali Mobility after seeing his own family members struggle to travel. He oversees all operations and personally ensures every client has a great experience.",
      order: 1,
    },
    {
      _type: "teamMember",
      name: "Ketut Ariani",
      role: "Client Coordinator",
      bio: "Ketut is your first point of contact. She speaks fluent English and Indonesian, and will help plan every detail of your accessible Bali holiday.",
      order: 2,
    },
    {
      _type: "teamMember",
      name: "Made Dharma",
      role: "Head of Equipment",
      bio: "Made ensures all mobility equipment is maintained, cleaned, and delivered on time. He's also our technical expert for specialised equipment needs.",
      order: 3,
    },
    {
      _type: "teamMember",
      name: "Ni Luh Sari",
      role: "Lead Carer",
      bio: "Ni Luh leads our team of personal carers. With 10+ years in disability support, she trains and supervises all carers to our high standards.",
      order: 4,
    },
    {
      _type: "teamMember",
      name: "Gede Wirawan",
      role: "Transport Manager",
      bio: "Gede manages our fleet of accessible vehicles and drivers. He ensures safe, comfortable transport across Bali for all our clients.",
      order: 5,
    },
    {
      _type: "teamMember",
      name: "Putu Eka",
      role: "Tour Coordinator",
      bio: "Putu designs and coordinates our accessible tours. She knows every accessible path, restaurant, and attraction in Bali.",
      order: 6,
    },
  ];

  for (const t of team) {
    await client.create(t);
  }

  console.log("\n✅ Seed complete! All content has been added to Sanity.");
  console.log("👉 Open Sanity Studio at /studio to edit content.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
