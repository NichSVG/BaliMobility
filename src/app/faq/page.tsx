import { Metadata } from "next";
import Link from "next/link";
import FAQClient from "./FAQClient";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers about mobility scooter, wheelchair, and equipment rental in Bali. Delivery, pricing, airport assistance, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Bali Mobility",
    description:
      "Get answers about mobility scooter, wheelchair, and equipment rental in Bali. Delivery, pricing, airport assistance, and more.",
  },
};

const faqItems = [
  {
    category: "Equipment",
    question: "What equipment do you rent?",
    answer:
      "We rent 7 types of equipment: mobility scooters, wheelchairs, baby push chairs, baby car seats, walker frames, shower seats, and raised toilet seats. All equipment is regularly serviced, cleaned, and inspected before each rental.",
  },
  {
    category: "Equipment",
    question: "What is the weight capacity of your equipment?",
    answer:
      "Mobility scooters and wheelchairs support up to 120 kg. Shower chairs support up to 130 kg. Walker frames and baby equipment have their own safety-rated limits — ask us and we'll match the right equipment to your needs.",
  },
  {
    category: "Equipment",
    question: "Is the mobility scooter suitable for Bali's roads?",
    answer:
      "Our scooters work well on footpaths, in shopping areas, and on smooth roads. They have a max speed of 8 km/h and a range of 20 km per charge. For very uneven terrain or cobblestone areas, we recommend a wheelchair with a companion.",
  },
  {
    category: "Equipment",
    question: "Can I take the mobility scooter in a car?",
    answer:
      "Yes — our scooters fold down for easy transport. They fit in most car boots, making it easy to get to restaurants, beaches, and attractions.",
  },
  {
    category: "Equipment",
    question: "What type of wheelchair do you offer?",
    answer:
      "We offer lightweight, foldable aluminium wheelchairs with removable footrests and a weight capacity of 120 kg. They're designed for travel and easy to transport in cars.",
  },
  {
    category: "Pricing",
    question: "How much does it cost to rent equipment?",
    answer:
      "Daily rates: mobility scooter $25, wheelchair $10, walker frame $7, shower seat $5, toilet seat $5. We also offer 3-day and weekly rates at a discount. See our equipment page for full pricing.",
  },
  {
    category: "Pricing",
    question: "What are your rental periods?",
    answer:
      "We offer three rental periods: daily, 3-day, and weekly. There is no minimum rental — you can rent for a single day. You can also extend your rental anytime during your trip.",
  },
  {
    category: "Pricing",
    question: "Do I need to pay a deposit?",
    answer:
      "No deposit is required for most rentals. Payment is due on delivery. For longer rentals (1 week or more) during peak season, we may ask for a small advance to secure your booking.",
  },
  {
    category: "Pricing",
    question: "What is your cancellation policy?",
    answer:
      "You can cancel or modify your booking anytime before delivery at no charge. For same-day cancellations after delivery has been arranged, contact us directly.",
  },
  {
    category: "Delivery",
    question: "Do you deliver to my hotel?",
    answer:
      "Yes — we deliver free of charge to hotels, villas, and private accommodations across Bali including Sanur, Kuta, Legian, Seminyak, Nusa Dua, Jimbaran, Ubud, Canggu, and surrounding areas.",
  },
  {
    category: "Delivery",
    question: "Can you deliver to the airport?",
    answer:
      "Yes! We can deliver wheelchairs or mobility scooters directly to Ngurah Rai International Airport so you have equipment from the moment you land. Share your flight details and we'll meet you at arrivals.",
  },
  {
    category: "Delivery",
    question: "How does delivery work?",
    answer:
      "Tell us your hotel or villa name, check-in date, and preferred delivery time. We'll coordinate with your accommodation so the equipment is waiting for you when you arrive. Pickup is also free — just let us know when you're done.",
  },
  {
    category: "Airport Assistance",
    question: "What is your airport wheelchair assistance?",
    answer:
      "We arrange for a wheelchair and team member to meet you at Ngurah Rai Airport arrivals. They'll assist you through the airport and to your transfer vehicle. We track your flight so we're there on time, even if you're delayed.",
  },
  {
    category: "Airport Assistance",
    question: "How much does airport wheelchair assistance cost?",
    answer:
      "Arrival-only assistance is $25. Arrival plus accessible transfer to your hotel is $45. Both include wheelchair, meet-and-greet, and luggage assistance.",
  },
  {
    category: "Airport Assistance",
    question: "How far in advance should I book airport assistance?",
    answer:
      "We recommend booking at least 48 hours before your flight. For peak season (July-August, December-January), a week's notice is best. Same-day requests are possible but not guaranteed.",
  },
  {
    category: "Accessible Transport",
    question: "Do you offer accessible transport in Bali?",
    answer:
      "Yes — we have wheelchair-accessible vehicles with ramps and secure tie-down systems. We offer airport transfers ($30), half-day tours ($55), and full-day tours ($95). All include a trained driver.",
  },
  {
    category: "Accessible Transport",
    question: "Can I book an accessible day tour?",
    answer:
      "Yes! We offer half-day (4 hours) and full-day (8 hours) accessible tours. Popular routes include Ubud rice terraces, Tanah Lot temple, Uluwatu, and beach tours. All vehicles are wheelchair accessible.",
  },
  {
    category: "Support",
    question: "What if the equipment breaks down?",
    answer:
      "Call or WhatsApp us immediately. We offer 24/7 support during your rental period and will repair or replace the equipment within hours — usually within 1-2 hours in popular areas like Sanur, Kuta, and Seminyak.",
  },
  {
    category: "Support",
    question: "Do I need travel insurance?",
    answer:
      "Yes, we strongly recommend comprehensive travel insurance covering your specific medical needs. While our equipment is well-maintained, travel insurance gives you extra peace of mind for your whole Bali trip.",
  },
  {
    category: "Support",
    question: "How do I contact you?",
    answer:
      "The fastest way is WhatsApp on +62 821-4652-2084 — we usually reply within minutes during business hours. You can also use the booking form on our contact page or email us at dedikbali@yahoo.com.",
  },
];

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ]} />
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="FAQ"
        description="Answers to common questions about equipment rental, delivery, pricing, airport assistance, and accessible transport in Bali."
        variant="tropical"
        image="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1920&q=80"
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
      />
      <FAQClient items={faqItems} />
      <section className="bg-sand py-12" aria-label="Still have questions">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">Still have questions?</h2>
          <p className="text-muted mb-6">We&apos;re happy to help with any questions about accessible travel in Bali.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors">Contact Us</Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">WhatsApp Us</a>
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </>
  );
}
