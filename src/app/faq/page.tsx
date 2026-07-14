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
      "Get answers about mobility scooter, wheelchair, and equipment rental in Bali. Delivery, pricing, and more.",
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
      "Yes — we deliver to hotels, villas, and private accommodations across Bali. Delivery and collection are by car, with a small fee depending on your area:\n\n• Sanur area: $20\n• Ubud: $20\n• Kuta, Seminyak, Canggu, Nusa Dua: $30\n\nFree delivery on rentals of 1 week or longer. Tell us your hotel or villa name and we'll confirm the exact fee for your area.",
  },
  {
    category: "Delivery",
    question: "Can you deliver to the airport?",
    answer:
      "We do not deliver directly to the airport. Ngurah Rai International Airport already provides free wheelchairs at arrivals for anyone who needs one, so most guests prefer to use that service at the airport and have us deliver their equipment directly to their hotel or villa instead. This way you have comfortable equipment ready and waiting at your accommodation.",
  },
  {
    category: "Delivery",
    question: "How does delivery work?",
    answer:
      "Delivery and collection are both by car. Tell us your hotel or villa name, check-in date, and preferred delivery time. We'll coordinate with your accommodation so the equipment is waiting for you when you arrive. On collection day, we pick up the equipment from your hotel or villa at a time that suits you — no need to bring it anywhere.",
  },
  {
    category: "Tours",
    question: "How much does a tour cost?",
    answer:
      "Half-day tours (approx. 4 hours) are $60 per car. Full-day tours (approx. 8 hours) are $100 per car. Both include the car, driver, and petrol. Entrance fees and meals are not included.",
  },
  {
    category: "Tours",
    question: "Can I choose my own tour route?",
    answer:
      "Absolutely! Tell us where you want to go and we'll plan the route. Popular options include Ubud rice terraces, Tanah Lot temple, Uluwatu, Kintamani volcano, and shopping tours. The driver follows your schedule.",
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
        description="Answers to common questions about equipment rental, delivery, pricing, and tours in Bali."
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
