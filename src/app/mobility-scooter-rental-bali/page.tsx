import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Mobility Scooter Rental Bali — Hire a Scooter",
  description:
    "Rent a mobility scooter in Bali. Lightweight, foldable scooters delivered to your hotel. Explore Bali independently. Daily, weekly, and holiday rates.",
  alternates: {
    canonical: "/mobility-scooter-rental-bali",
  },
  openGraph: {
    title: "Mobility Scooter Rental Bali | Bali Mobility",
    description:
      "Rent a mobility scooter in Bali. Lightweight, foldable scooters delivered to your hotel. Free delivery across Bali.",
  },
};

const features = [
  { icon: "🔋", title: "Long Range", description: "Up to 20km per charge — enough for a full day of sightseeing." },
  { icon: "⚡", title: "Fast Charging", description: "Full charge in 4-6 hours. Charge overnight and you're ready to go." },
  { icon: "📦", title: "Foldable Design", description: "Folds down for easy transport in cars, taxis, and hotel storage." },
  { icon: "🏋️", title: "120kg Capacity", description: "Sturdy design supports up to 120kg. Comfortable padded seat." },
];

const faqs = [
  { q: "How fast does the mobility scooter go?", a: "Our scooters have a maximum speed of 8 km/h — a comfortable walking pace. They're designed for safe use on footpaths and in tourist areas." },
  { q: "How far can I go on one charge?", a: "Up to 20km per charge, which is enough for a full day of exploring Bali's tourist areas. We recommend charging overnight." },
  { q: "Can I take the scooter in a car?", a: "Yes! Our scooters fold down for easy transport. They fit in most car boots, making it easy to get to restaurants, beaches, and attractions." },
  { q: "Is the scooter suitable for Bali's roads?", a: "Our scooters work well on footpaths, in shopping areas, and on smooth roads. For very uneven terrain, we recommend a wheelchair with a companion." },
  { q: "Do you deliver scooters to hotels?", a: "Yes, we deliver free of charge to hotels and villas across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas." },
];

export default function MobilityScooterRentalPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Equipment", url: "/equipment" },
        { name: "Mobility Scooter Rental Bali", url: "/mobility-scooter-rental-bali" },
      ]} />
      <ProductJsonLd
        name="Mobility Scooter Rental Bali"
        description="Lightweight, foldable mobility scooter delivered to your hotel or villa in Bali. Daily, 3-day, and weekly rates."
        price="25"
      />
      <PageHeader
        title="Mobility Scooter Rental Bali"
        subtitle="Mobility Equipment"
        description="Lightweight, foldable mobility scooters delivered to your hotel or villa anywhere in Bali."
        variant="tropical"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Scooter rental rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mobility Scooter Rental Rates</h2>
            <p className="text-muted text-lg">All prices include free delivery and pickup.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Travel Mobility Scooter</h3>
              <p className="text-muted mb-6">Lightweight, foldable scooter with comfortable seat. Max speed: 8 km/h. Range: 20km per charge. Weight capacity: 120kg.</p>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Daily</div>
                  <div className="text-2xl font-bold text-ocean">AUD $25</div>
                  <div className="text-xs text-muted">IDR 250K</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Weekly</div>
                  <div className="text-2xl font-bold text-ocean">AUD $120</div>
                  <div className="text-xs text-muted">IDR 1.2M</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Full Holiday</div>
                  <div className="text-2xl font-bold text-ocean">AUD $180</div>
                  <div className="text-xs text-muted">IDR 1.8M</div>
                </div>
              </div>
              <Link href="/contact" className="block text-center bg-coral text-white py-3 rounded-full font-semibold hover:bg-coral/90 transition-colors">
                Rent a Scooter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Rent a Scooter From Us?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 text-center">
                <div className="text-4xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" aria-label="Scooter rental FAQ">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details key={faq.q} className="bg-white rounded-xl border border-sand-dark overflow-hidden group">
                <summary className="p-6 cursor-pointer font-semibold text-foreground hover:text-ocean transition-colors">
                  {faq.q}
                </summary>
                <div className="px-6 pb-6 text-muted">{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-ocean text-white" aria-label="Get started">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a mobility scooter in Bali?</h2>
          <p className="text-white/90 text-lg mb-8">Contact us to reserve your scooter. Free delivery to your hotel or villa.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">
              Rent a Scooter
            </Link>
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-block bg-white/10 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors">
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
