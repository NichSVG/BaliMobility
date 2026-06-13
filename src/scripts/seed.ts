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
    tagline: "Bali without limits — disability holidays made easy",
    description:
      "Stress-free mobility holidays and disability travel services in Bali. Equipment hire, personal carers, accessible transport, and all-inclusive packages.",
    phone: "+62 812 3456 7890",
    email: "info@balimobility.com",
    address: "Jl. By Pass Ngurah Rai #175\nSanur, Bali 80228, Indonesia",
    whatsappNumber: "6281234567890",
    whatsappMessage:
      "Hi Bali Mobility! I'd like to enquire about a holiday.",
    businessHours:
      "Mon-Sat: 8:00 AM - 6:00 PM (WITA)\nSun: By appointment\nEmergency support available 24/7",
  });

  // Services
  console.log("🛎️  Creating services...");
  const services = [
    {
      _type: "service",
      title: "Equipment Hire",
      slug: { current: "equipment-hire" },
      icon: "🦽",
      description:
        "Wide range of mobility equipment delivered directly to your hotel or villa. All equipment is well-maintained, clean, and ready to use.",
      details: [
        "Mobility scooters — lightweight and travel-friendly",
        "Electric wheelchairs — joystick controlled, foldable",
        "Walkers and rollators — with seats and baskets",
        "Adjustable toilet seats and shower chairs",
        "Beach wheelchairs — for sand and water access",
        "Crutches and walking sticks",
      ],
      ctaText: "View Equipment",
      ctaLink: "/equipment",
      order: 1,
    },
    {
      _type: "service",
      title: "Personal Carers",
      slug: { current: "personal-carers" },
      icon: "🤝",
      description:
        "Experienced, compassionate carers available day or night. Our team is trained in disability support and speaks both Indonesian and English.",
      details: [
        "Daytime carers — assistance from morning to evening",
        "Night-time carers — overnight support available",
        "Experienced with spinal cord injuries, MS, cerebral palsy, and more",
        "Help with transfers, bathing, dressing, and mobility",
        "Bilingual team (Indonesian / English)",
        "Can accompany you on tours and activities",
      ],
      ctaText: "Enquire About Carers",
      ctaLink: "/contact",
      order: 2,
    },
    {
      _type: "service",
      title: "Accessible Transport",
      slug: { current: "accessible-transport" },
      icon: "🚐",
      description:
        "Comfortable, air-conditioned mobility vehicles with professional drivers. Airport transfers and daily transport around Bali.",
      details: [
        "Mobility car with wheelchair ramp or lift",
        "Airport collection and return — any time of day",
        "Daily transport to attractions, restaurants, beaches",
        "Professional, English-speaking drivers",
        "Vehicles accommodate wheelchairs and mobility aids",
        "Child car seats available on request",
      ],
      ctaText: "Book Transport",
      ctaLink: "/contact",
      order: 3,
    },
    {
      _type: "service",
      title: "Holiday Packages",
      slug: { current: "holiday-packages" },
      icon: "🏖️",
      description:
        "All-inclusive accessible holiday bundles with accommodation, equipment, carers, transport, tours, and activities.",
      details: [
        "3, 5, and 7-night packages available",
        "Accessible hotel or villa accommodation",
        "Mobility equipment hire included",
        "Personal carer included",
        "Accessible transport with driver",
        "Guided tours and cultural experiences",
      ],
      ctaText: "View Packages",
      ctaLink: "/packages",
      order: 4,
    },
    {
      _type: "service",
      title: "Activities & Experiences",
      slug: { current: "activities" },
      icon: "🤿",
      description:
        "Accessible activities and cultural experiences curated for travellers with mobility needs.",
      details: [
        "Accessible diving and snorkelling",
        "Fishing trips with accessible boat",
        "Traditional Balinese massage and spa",
        "Cultural Bali nights — dance, music, dinner",
        "Ubud art and temple tours",
        "Beach days with beach wheelchair",
      ],
      ctaText: "Explore Activities",
      ctaLink: "/packages",
      order: 5,
    },
    {
      _type: "service",
      title: "Family Services",
      slug: { current: "family-services" },
      icon: "👶",
      description:
        "Extra support for families travelling with young children.",
      details: [
        "Pushchair and stroller hire",
        "Child car safety seats",
        "Qualified nannies and babysitters",
        "Family-friendly accessible tours",
        "Cots and highchairs for accommodation",
        "Kids' activity recommendations",
      ],
      ctaText: "Learn More",
      ctaLink: "/contact",
      order: 6,
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
        "Basket for personal items",
        "USB charging port",
      ],
      rateDaily: "IDR 250K",
      rateWeekly: "IDR 1.2M",
      rateHoliday: "IDR 1.8M",
      rateDailyAud: "AUD $25",
      rateWeeklyAud: "AUD $120",
      rateHolidayAud: "AUD $180",
      bestFor:
        "Travellers with limited mobility who can stand and transfer with some assistance.",
      order: 1,
    },
    {
      _type: "equipment",
      name: "Electric Wheelchair",
      slug: { current: "electric-wheelchair" },
      icon: "🦽",
      description:
        "Joystick-controlled electric wheelchair with comfortable seating. Ideal for full-time wheelchair users.",
      features: [
        "Joystick controller",
        "Max speed: 6 km/h",
        "Range: 15 km per charge",
        "Weight capacity: 130 kg",
        "Foldable frame",
        "Padded armrests and seat",
      ],
      rateDaily: "IDR 350K",
      rateWeekly: "IDR 1.8M",
      rateHoliday: "IDR 2.5M",
      rateDailyAud: "AUD $35",
      rateWeeklyAud: "AUD $180",
      rateHolidayAud: "AUD $250",
      bestFor: "Travellers who use a wheelchair full-time.",
      order: 2,
    },
    {
      _type: "equipment",
      name: "Manual Wheelchair",
      slug: { current: "manual-wheelchair" },
      icon: "♿",
      description:
        "Lightweight manual wheelchair with removable footrests.",
      features: [
        "Lightweight aluminium frame",
        "Removable footrests",
        "Weight capacity: 100 kg",
        "Foldable design",
        "Seat belt included",
        "Attendant brakes",
      ],
      rateDaily: "IDR 150K",
      rateWeekly: "IDR 700K",
      rateHoliday: "IDR 1M",
      rateDailyAud: "AUD $15",
      rateWeeklyAud: "AUD $70",
      rateHolidayAud: "AUD $100",
      bestFor: "Travellers who can self-propel or have a companion to push.",
      order: 3,
    },
    {
      _type: "equipment",
      name: "Walker / Rollator",
      slug: { current: "walker" },
      icon: "🦯",
      description:
        "Sturdy four-wheel walker with seat, brakes, and basket.",
      features: [
        "Four-wheel design with brakes",
        "Built-in padded seat",
        "Storage basket underneath",
        "Adjustable height",
        "Weight capacity: 130 kg",
        "Folds flat for storage",
      ],
      rateDaily: "IDR 100K",
      rateWeekly: "IDR 500K",
      rateHoliday: "IDR 750K",
      rateDailyAud: "AUD $10",
      rateWeeklyAud: "AUD $50",
      rateHolidayAud: "AUD $75",
      bestFor:
        "Travellers who can walk but need extra stability and support.",
      order: 4,
    },
    {
      _type: "equipment",
      name: "Beach Wheelchair",
      slug: { current: "beach-wheelchair" },
      icon: "🏖️",
      description:
        "Wide-wheel beach wheelchair designed for sand and shallow water access.",
      features: [
        "Wide pneumatic tyres for sand",
        "Floats in shallow water",
        "Rust-resistant frame",
        "Weight capacity: 120 kg",
        "Attendant-pushed",
        "Sun canopy included",
      ],
      rateDaily: "IDR 300K",
      rateWeekly: "IDR 1.5M",
      rateHoliday: "IDR 2M",
      rateDailyAud: "AUD $30",
      rateWeeklyAud: "AUD $150",
      rateHolidayAud: "AUD $200",
      bestFor: "Any traveller wanting to enjoy Bali's beaches.",
      order: 5,
    },
  ];

  for (const eq of equipment) {
    await client.create(eq);
  }

  // Holiday Packages
  console.log("🏖️  Creating packages...");
  const packages = [
    {
      _type: "holidayPackage",
      name: "Bali Taster",
      slug: { current: "bali-taster" },
      nights: 3,
      priceAud: 899,
      priceGbp: 499,
      priceUsd: 649,
      popular: false,
      description:
        "Perfect for a short getaway. Experience accessible Bali with everything you need for a comfortable stay.",
      included: [
        "3 nights accessible hotel (Sanur or Kuta area)",
        "Mobility equipment hire (scooter or wheelchair)",
        "Personal carer — 8 hours/day",
        "Airport collection & return",
        "1 guided accessible tour",
        "Welcome pack with local info",
      ],
      excluded: [
        "Flights",
        "Travel insurance",
        "Meals (except breakfast)",
        "Additional tours or activities",
      ],
      itinerary: [
        "Day 1: Airport pickup, hotel check-in, welcome briefing",
        "Day 2: Guided tour — accessible Sanur beach & local markets",
        "Day 3: Free day — explore at your own pace with equipment",
        "Day 4: Airport transfer & departure",
      ],
      order: 1,
    },
    {
      _type: "holidayPackage",
      name: "Bali Discovery",
      slug: { current: "bali-discovery" },
      nights: 7,
      priceAud: 1899,
      priceGbp: 1049,
      priceUsd: 1349,
      popular: true,
      description:
        "Our most popular package. A full week of accessible Bali with tours, activities, and complete support.",
      included: [
        "7 nights accessible hotel or villa",
        "Mobility equipment hire (choice of scooter, wheelchair, or walker)",
        "Personal carer — 10 hours/day",
        "Accessible transport with driver",
        "3 guided accessible tours",
        "1 Balinese massage (60 min)",
        "1 cultural Bali night (dance & dinner)",
        "Airport collection & return",
        "Welcome pack with local SIM card",
      ],
      excluded: [
        "Flights",
        "Travel insurance",
        "Meals (except breakfast and 1 dinner)",
        "Personal expenses",
      ],
      itinerary: [
        "Day 1: Airport pickup, hotel check-in, equipment setup, welcome dinner",
        "Day 2: Sanur beach day — beach wheelchair, beachside lunch",
        "Day 3: Ubud art tour — accessible galleries, rice terraces viewpoint",
        "Day 4: Free day — spa, relax, or explore with equipment",
        "Day 5: Tanah Lot temple visit & sunset cultural show",
        "Day 6: Accessible snorkelling or fishing trip",
        "Day 7: Shopping day — Kuta/Seminyak, Balinese massage",
        "Day 8: Airport transfer & departure",
      ],
      order: 2,
    },
    {
      _type: "holidayPackage",
      name: "Bali Complete",
      slug: { current: "bali-complete" },
      nights: 14,
      priceAud: 3499,
      priceGbp: 1949,
      priceUsd: 2499,
      popular: false,
      description:
        "The ultimate accessible Bali experience. Two weeks of fully supported travel with premium accommodation.",
      included: [
        "14 nights premium accessible villa with pool",
        "Full mobility equipment package",
        "Personal carer — 12 hours/day",
        "Dedicated accessible transport with driver",
        "5 guided accessible tours",
        "2 Balinese massages (60 min each)",
        "1 accessible diving or snorkelling session",
        "1 fishing trip with accessible boat",
        "1 cultural Bali night (dance & dinner)",
        "Airport collection & return",
        "Welcome pack with local SIM card & Bali guide",
        "24/7 emergency support line",
      ],
      excluded: [
        "Flights",
        "Travel insurance",
        "Meals (except breakfast and 2 dinners)",
        "Personal expenses",
      ],
      itinerary: [
        "Day 1: Airport pickup, villa check-in, equipment setup, welcome dinner",
        "Day 2-3: Sanur beach area — beach wheelchair, local exploration",
        "Day 4: Ubud art & culture tour — accessible galleries, monkey forest",
        "Day 5: Free day — pool, spa, relax",
        "Day 6: Tanah Lot & Uluwatu temple tour with sunset",
        "Day 7: Accessible diving or snorkelling experience",
        "Day 8: Shopping day — Kuta, Seminyak, local markets",
        "Day 9: Balinese massage & spa day",
        "Day 10: Fishing trip with accessible boat",
        "Day 11: Free day — explore at your own pace",
        "Day 12: Cultural Bali night — traditional dance & dinner",
        "Day 13: Nusa Dua beach day & water activities",
        "Day 14: Final shopping, farewell dinner",
        "Day 15: Airport transfer & departure",
      ],
      order: 3,
    },
  ];

  for (const pkg of packages) {
    await client.create(pkg);
  }

  // Testimonials
  console.log("⭐ Creating testimonials...");
  const testimonials = [
    {
      _type: "testimonial",
      name: "Sarah M.",
      location: "Melbourne, Australia",
      rating: 5,
      text: "Bali Mobility made our family holiday absolutely stress-free. The scooter was waiting at our hotel and the carers were incredible. We could actually relax for the first time in years.",
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
      text: "The all-inclusive package was worth every penny. They thought of everything we didn't even know we needed. Highly recommend for anyone with mobility challenges.",
      featured: true,
    },
    {
      _type: "testimonial",
      name: "Margaret H.",
      location: "Auckland, New Zealand",
      rating: 5,
      text: "As an elderly traveller, I was worried about visiting Bali alone. The carer they provided was like having a friend by my side. I felt safe and supported the entire trip.",
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
      category: "Equipment & Hire",
      question: "What mobility equipment do you offer?",
      answer:
        "We offer mobility scooters, electric wheelchairs, manual wheelchairs, walkers/rollators, adjustable toilet seats, shower chairs, beach wheelchairs, and pushchairs for children. All equipment is well-maintained and sanitised between hires.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Equipment & Hire",
      question: "How does equipment delivery work?",
      answer:
        "We deliver equipment directly to your hotel, villa, or accommodation in Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas. Delivery is free within these zones. We'll set everything up and show you how to use it.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Equipment & Hire",
      question: "What if the equipment breaks down?",
      answer:
        "All our equipment is regularly serviced, but if you have any issues, call or WhatsApp us immediately. We offer 24/7 support and will repair or replace the equipment as quickly as possible — usually within a few hours.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Equipment & Hire",
      question: "Can I hire equipment for just one day?",
      answer:
        "Yes! We offer daily, weekly, and full-holiday rates. You can hire equipment for as little as one day, and extend anytime if your plans change.",
      order: 4,
    },
    {
      _type: "faqItem",
      category: "Carers & Support",
      question: "What qualifications do your carers have?",
      answer:
        "All our carers are professionally trained in disability support, including transfers, bathing assistance, and mobility aid. Many have backgrounds in nursing or aged care. They're experienced with spinal cord injuries, MS, cerebral palsy, and other conditions.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Carers & Support",
      question: "Do carers speak English?",
      answer:
        "Yes, all our carers speak both Indonesian and English. Communication is never a barrier.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Carers & Support",
      question: "Can a carer accompany me on tours?",
      answer:
        "Absolutely. Our carers can accompany you on tours, to restaurants, beaches, and any activities. They'll help with transfers, mobility, and any personal care needs throughout the day.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Packages & Pricing",
      question: "What's included in the holiday packages?",
      answer:
        "Our packages include accessible accommodation, mobility equipment hire, personal carer, accessible transport, guided tours, and activities. The exact inclusions depend on the package — see our Packages page for full details.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Packages & Pricing",
      question: "Can I customise a package?",
      answer:
        "Yes! We can adjust any package to suit your needs — different accommodation, extra tours, longer stays, more carer hours, or specific activities. Just tell us what you want and we'll create a custom package.",
      order: 2,
    },
    {
      _type: "faqItem",
      category: "Packages & Pricing",
      question: "What's your cancellation policy?",
      answer:
        "Cancellations made 30+ days before arrival receive a full refund minus a small admin fee. Cancellations 15-29 days out receive a 50% refund. Cancellations within 14 days are non-refundable, but we can often reschedule your trip.",
      order: 3,
    },
    {
      _type: "faqItem",
      category: "Accessibility & Practical",
      question: "Is Bali wheelchair-friendly?",
      answer:
        "Bali has improved accessibility significantly in recent years, especially in tourist areas like Sanur, Nusa Dua, and parts of Ubud. However, it's not as accessible as Australia or Europe. That's where we come in — our equipment, carers, and local knowledge help you navigate the challenges.",
      order: 1,
    },
    {
      _type: "faqItem",
      category: "Accessibility & Practical",
      question: "Do I need travel insurance?",
      answer:
        "Yes, we strongly recommend comprehensive travel insurance that covers your specific medical needs. We can advise on insurers that cover disability-related travel, but the policy is your responsibility.",
      order: 2,
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
  console.log("👉 Open /admin to manage content via the admin dashboard.");
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
