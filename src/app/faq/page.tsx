import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { faqQuery } from "@/lib/queries";
import FAQClient from "./FAQClient";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about mobility equipment rental in Bali. Delivery, rates, equipment, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Bali Mobility",
    description:
      "Get answers to common questions about mobility equipment rental in Bali. Delivery, rates, equipment, and more.",
  },
};

const fallbackFaq = [
  { category: "Equipment & Rental", question: "What mobility equipment do you offer?", answer: "We offer mobility scooters, wheelchairs, walker frames, shower seats, toilet seats, baby push chairs, and baby car seats. All equipment is regularly serviced, cleaned, and inspected for safety before each rental." },
  { category: "Equipment & Rental", question: "How does equipment delivery work?", answer: "We deliver directly to your hotel, villa, or private accommodation anywhere in Bali — completely free of charge. We can also deliver to the airport if you need equipment on arrival. Just let us know your check-in time and we'll coordinate with your accommodation." },
  { category: "Equipment & Rental", question: "What if the equipment breaks down?", answer: "Call or WhatsApp us immediately on +62 821-4652-2084. We offer 24/7 support during your rental period and will repair or replace the equipment within hours — usually within 1-2 hours in popular areas like Sanur, Kuta, and Seminyak." },
  { category: "Equipment & Rental", question: "Can I rent equipment for just one day?", answer: "Yes! We offer daily, weekly, and full-holiday rates with no minimum rental period. If you only need a wheelchair for a day trip or a scooter for one outing, that's completely fine." },
  { category: "Equipment & Rental", question: "Is the equipment suitable for Bali's terrain?", answer: "Our scooters and wheelchairs are specifically chosen for Bali's conditions. Mobility scooters work well on footpaths, shopping areas, and smooth roads. For uneven terrain or cobblestone areas, we recommend a wheelchair with a companion. We'll help you choose the right equipment based on where you're staying." },
  { category: "Pricing & Booking", question: "What currency are prices shown in?", answer: "Our primary pricing is in IDR (Indonesian Rupiah) and AUD (Australian Dollars). Contact us via WhatsApp or the booking form for current rates and availability. We accept cash (IDR), bank transfer, and credit card payments." },
  { category: "Pricing & Booking", question: "Do I need to pay a deposit?", answer: "No deposit is required for most rentals. We ask for payment on delivery or pickup. For longer rentals (1 week+), we may ask for a small advance to secure your booking during peak season." },
  { category: "Pricing & Booking", question: "What's your cancellation policy?", answer: "We understand travel plans change. You can cancel or modify your booking anytime before delivery at no charge. For same-day cancellations after delivery has been arranged, please contact us directly — we're always reasonable." },
  { category: "Delivery & Practical", question: "Do you deliver to all areas of Bali?", answer: "Yes, we deliver across Bali including Sanur, Kuta, Legian, Seminyak, Nusa Dua, Jimbaran, Ubud, Canggu, Tanah Benoa, and surrounding areas. Delivery to more remote areas may take a little longer, but we'll always do our best to accommodate." },
  { category: "Delivery & Practical", question: "Can you deliver to the airport?", answer: "Yes! We can deliver wheelchairs or mobility scooters directly to Ngurah Rai International Airport so you have equipment from the moment you land. Just share your flight details and we'll meet you at arrivals." },
  { category: "Delivery & Practical", question: "Do I need travel insurance?", answer: "Yes, we strongly recommend comprehensive travel insurance covering your specific medical needs. While our equipment is well-maintained and insured, travel insurance gives you extra peace of mind for your whole Bali trip." },
];

export default async function FAQPage() {
  const faqs = await client.fetch(faqQuery).catch(() => []);
  const display = faqs.length > 0 ? faqs : fallbackFaq;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "FAQ", url: "/faq" },
      ]} />
      <PageHeader
        title="Frequently Asked Questions"
        subtitle="FAQ"
        description="Answers to common questions from travellers planning an accessible Bali holiday. Can&apos;t find what you need? Get in touch."
        variant="tropical"
        image="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1920&q=80"
        breadcrumbs={[{ label: "FAQ", href: "/faq" }]}
      />
      <FAQClient items={display} />
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
            mainEntity: display.map((faq: any) => ({
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
