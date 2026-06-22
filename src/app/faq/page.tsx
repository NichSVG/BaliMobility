import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { faqQuery } from "@/lib/queries";
import FAQClient from "./FAQClient";
import PageHeader from "@/components/PageHeader";

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
  { category: "Equipment & Rental", question: "What mobility equipment do you offer?", answer: "We offer mobility scooters, wheelchairs, walker frames, shower seats, toilet seats, baby push chairs, and baby car seats." },
  { category: "Equipment & Rental", question: "How does equipment delivery work?", answer: "We deliver directly to your hotel or villa across Bali. Delivery is free." },
  { category: "Equipment & Rental", question: "What if the equipment breaks down?", answer: "Call or WhatsApp us immediately. We offer 24/7 support and will repair or replace equipment within hours." },
  { category: "Equipment & Rental", question: "Can I rent equipment for just one day?", answer: "Yes! We offer daily, weekly, and full-holiday rates." },
  { category: "Equipment & Rental", question: "Is the equipment suitable for Bali's terrain?", answer: "Our scooters and wheelchairs are chosen for Bali's conditions. We can recommend the best equipment for your needs." },
  { category: "Pricing & Booking", question: "What currency are prices shown in?", answer: "Primary pricing in IDR and AUD. Contact us for current rates and availability." },
  { category: "Pricing & Booking", question: "What's your cancellation policy?", answer: "Contact us for our current cancellation and refund policy." },
  { category: "Delivery & Practical", question: "Do you deliver to all areas of Bali?", answer: "Yes, we deliver across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas." },
  { category: "Delivery & Practical", question: "Do I need travel insurance?", answer: "Yes, we strongly recommend comprehensive travel insurance covering your specific medical needs." },
];

export default async function FAQPage() {
  const faqs = await client.fetch(faqQuery).catch(() => []);
  const display = faqs.length > 0 ? faqs : fallbackFaq;

  return (
    <>
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
            <a href="/contact" className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors">Contact Us</a>
            <a href="https://wa.me/6282146522084" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">WhatsApp Us</a>
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
