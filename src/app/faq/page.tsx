import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { faqQuery } from "@/lib/queries";
import FAQClient from "./FAQClient";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Get answers to common questions about accessible holidays in Bali. Equipment hire, carers, transport, packages, and more.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "FAQ | Bali Mobility",
    description:
      "Get answers to common questions about accessible holidays in Bali. Equipment hire, carers, transport, packages, and more.",
  },
};

const fallbackFaq = [
  { category: "Equipment & Hire", question: "What mobility equipment do you offer?", answer: "We offer mobility scooters, electric wheelchairs, manual wheelchairs, walkers/rollators, adjustable toilet seats, shower chairs, beach wheelchairs, and pushchairs for children." },
  { category: "Equipment & Hire", question: "How does equipment delivery work?", answer: "We deliver directly to your hotel or villa in Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas. Delivery is free." },
  { category: "Equipment & Hire", question: "What if the equipment breaks down?", answer: "Call or WhatsApp us immediately. We offer 24/7 support and will repair or replace equipment within hours." },
  { category: "Equipment & Hire", question: "Can I hire equipment for just one day?", answer: "Yes! We offer daily, weekly, and full-holiday rates." },
  { category: "Equipment & Hire", question: "Is the equipment suitable for Bali's terrain?", answer: "Our scooters and wheelchairs are chosen for Bali's conditions. For uneven terrain, we recommend electric wheelchairs or a carer." },
  { category: "Carers & Support", question: "What qualifications do your carers have?", answer: "All carers are professionally trained in disability support, transfers, bathing assistance, and mobility aid." },
  { category: "Carers & Support", question: "Do carers speak English?", answer: "Yes, all our carers speak both Indonesian and English." },
  { category: "Carers & Support", question: "Can a carer accompany me on tours?", answer: "Absolutely. Our carers can accompany you on tours, restaurants, beaches, and any activities." },
  { category: "Transport & Getting Around", question: "How does airport pickup work?", answer: "We meet you at arrivals with a sign. Our accessible vehicle has a wheelchair ramp/lift. We track your flight for delays." },
  { category: "Transport & Getting Around", question: "Are your vehicles wheelchair accessible?", answer: "Yes. Our mobility vehicles have ramps or lifts. Drivers are trained in secure wheelchair tie-down procedures." },
  { category: "Packages & Pricing", question: "What's included in the holiday packages?", answer: "Packages include accommodation, equipment hire, carer, transport, tours, and activities. See our Packages page for full details." },
  { category: "Packages & Pricing", question: "Can I customise a package?", answer: "Yes! We can adjust any package — different accommodation, extra tours, longer stays, more carer hours." },
  { category: "Packages & Pricing", question: "What currency are prices shown in?", answer: "Primary pricing in AUD, with GBP and USD conversions. We accept bank transfer, credit card, or PayPal." },
  { category: "Packages & Pricing", question: "What's your cancellation policy?", answer: "30+ days: full refund minus admin fee. 15-29 days: 50% refund. Within 14 days: non-refundable but can reschedule." },
  { category: "Accessibility & Practical", question: "Is Bali wheelchair-friendly?", answer: "Bali has improved accessibility in tourist areas. Our equipment, carers, and local knowledge help you navigate the challenges." },
  { category: "Accessibility & Practical", question: "Do I need travel insurance?", answer: "Yes, we strongly recommend comprehensive travel insurance covering your specific medical needs." },
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
            <a href="https://wa.me/6281246522084" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">WhatsApp Us</a>
          </div>
        </div>
      </section>
    </>
  );
}
