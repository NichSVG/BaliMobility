import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { servicesQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive accessibility services in Bali: mobility equipment hire, personal carers, accessible transport, and all-inclusive holiday packages.",
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: "Our Services | Bali Mobility",
    description:
      "Comprehensive accessibility services in Bali: mobility equipment hire, personal carers, accessible transport, and all-inclusive holiday packages.",
  },
};

const fallbackServices = [
  { icon: "🦽", title: "Mobility Equipment Hire", description: "Wide range of mobility equipment delivered directly to your hotel or villa. All equipment is well-maintained, clean, and ready to use.", details: ["Mobility scooters — lightweight and travel-friendly", "Electric wheelchairs — joystick controlled, foldable", "Walkers and rollators — with seats and baskets", "Adjustable toilet seats and shower chairs", "Beach wheelchairs — for sand and water access", "Crutches and walking sticks"], ctaText: "View Equipment", ctaLink: "/equipment" },
  { icon: "🤝", title: "Personal Carers", description: "Experienced, compassionate carers available day or night. Our team is trained in disability support and speaks both Indonesian and English.", details: ["Daytime carers — assistance from morning to evening", "Night-time carers — overnight support available", "Experienced with spinal cord injuries, MS, cerebral palsy, and more", "Help with transfers, bathing, dressing, and mobility", "Bilingual team (Indonesian / English)", "Can accompany you on tours and activities"], ctaText: "Enquire About Carers", ctaLink: "/contact" },
  { icon: "🚐", title: "Accessible Transport", description: "Comfortable, air-conditioned mobility vehicles with professional drivers. Airport transfers and daily transport around Bali.", details: ["Mobility car with wheelchair ramp or lift", "Airport collection and return — any time of day", "Daily transport to attractions, restaurants, beaches", "Professional, English-speaking drivers", "Vehicles accommodate wheelchairs and mobility aids", "Child car seats available on request"], ctaText: "Book Transport", ctaLink: "/contact" },
  { icon: "🏖️", title: "All-Inclusive Holiday Packages", description: "Stress-free holiday bundles that include accommodation, equipment, carers, transport, tours, and activities — all arranged for you.", details: ["3, 5, and 7-night packages available", "Accessible hotel or villa accommodation", "Mobility equipment hire included", "Personal carer included", "Accessible transport with driver", "Guided tours and cultural experiences"], ctaText: "View Packages", ctaLink: "/packages" },
  { icon: "🤿", title: "Activities & Experiences", description: "Accessible activities and cultural experiences curated for travellers with mobility needs. Enjoy the best of Bali without barriers.", details: ["Accessible diving and snorkelling", "Fishing trips with accessible boat", "Traditional Balinese massage and spa", "Cultural Bali nights — dance, music, dinner", "Ubud art and temple tours", "Beach days with beach wheelchair"], ctaText: "Explore Activities", ctaLink: "/packages" },
  { icon: "👶", title: "Family Services", description: "Extra support for families travelling with young children. Pushchairs, car seats, nannies, and babysitters so parents can relax.", details: ["Pushchair and stroller hire", "Child car safety seats", "Qualified nannies and babysitters", "Family-friendly accessible tours", "Cots and highchairs for accommodation", "Kids' activity recommendations"], ctaText: "Learn More", ctaLink: "/contact" },
];

export default async function ServicesPage() {
  const services = await client.fetch(servicesQuery).catch(() => []);
  const displayServices = services.length > 0 ? services : fallbackServices;

  return (
    <>
      <PageHeader
        title="Our Services"
        subtitle="What We Offer"
        description="Complete disability travel support in Bali — from mobility equipment to all-inclusive holiday packages."
        variant="ocean"
        breadcrumbs={[{ label: "Services", href: "/services" }]}
      />

      <section className="py-16 md:py-24" aria-label="Service details">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {displayServices.map((service: any, index: number) => (
              <div key={service.title} className="grid md:grid-cols-2 gap-10 items-start">
                <div className={index % 2 === 1 ? "md:order-2" : ""}>
                  {service.image ? (
                    <div className="relative h-64 rounded-xl overflow-hidden mb-6">
                      <Image
                        src={urlFor(service.image).width(800).height(500).quality(80).url()}
                        alt={service.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="text-5xl mb-4" aria-hidden="true">{service.icon}</div>
                  )}
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{service.title}</h2>
                  <p className="text-muted mb-6">{service.description}</p>
                  <Link href={service.ctaLink || "/contact"} className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors">{service.ctaText || "Learn More"}</Link>
                </div>
                <div className={`bg-sand rounded-xl p-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <h3 className="font-semibold text-foreground mb-4">What&apos;s included:</h3>
                  <ul className="space-y-3">
                    {(service.details || []).map((detail: string) => (
                      <li key={detail} className="flex items-start gap-3">
                        <svg className="w-5 h-5 text-tropical shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        <span className="text-foreground text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-white py-16 md:py-24" aria-label="How it works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How it works</h2>
            <p className="text-muted max-w-2xl mx-auto">Booking your accessible Bali holiday is simple.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Tell us your needs", desc: "Fill out our enquiry form or message us on WhatsApp." },
              { step: "2", title: "We create your plan", desc: "Our team prepares a personalised holiday plan." },
              { step: "3", title: "Confirm & relax", desc: "Review your plan, confirm, and we handle everything else." },
              { step: "4", title: "Enjoy Bali", desc: "Arrive to a warm welcome. Equipment ready, carer waiting." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-ocean text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean text-white py-16" aria-label="Get started">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Not sure what you need?</h2>
          <p className="text-white/90 mb-8">Tell us about your situation and we&apos;ll recommend the right services.</p>
          <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Get in Touch</Link>
        </div>
      </section>
    </>
  );
}
