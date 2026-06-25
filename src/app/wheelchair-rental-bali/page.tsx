import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Wheelchair Rental Bali — Delivery to Your Hotel",
  description:
    "Rent a wheelchair in Bali. Lightweight, comfortable wheelchairs delivered to your hotel or villa. Daily, weekly, and holiday rates. Free delivery across Bali.",
  alternates: {
    canonical: "/wheelchair-rental-bali",
  },
  openGraph: {
    title: "Wheelchair Rental Bali | Bali Mobility",
    description:
      "Rent a wheelchair in Bali. Lightweight, comfortable wheelchairs delivered to your hotel. Free delivery across Bali.",
  },
};

const features = [
  { icon: "✈️", title: "Airport Delivery", description: "We can deliver your wheelchair to the airport or your hotel before you arrive." },
  { icon: "🔧", title: "Well Maintained", description: "All wheelchairs are regularly serviced, cleaned, and inspected for safety." },
  { icon: "📞", title: "24/7 Support", description: "Need help? Call or WhatsApp us anytime during your rental period." },
  { icon: "💰", title: "Flexible Rates", description: "Daily, weekly, or full-holiday rates. Extend your rental anytime." },
];

const faqs = [
  { q: "What type of wheelchairs do you offer?", a: "We offer lightweight, foldable wheelchairs suitable for travel. They have removable footrests, comfortable seating, and are easy to transport in cars." },
  { q: "Can I rent a wheelchair for just one day?", a: "Yes! We offer daily, weekly, and full-holiday rental rates. There's no minimum rental period." },
  { q: "Do you deliver wheelchairs to hotels?", a: "Yes, we deliver free of charge to hotels and villas across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas." },
  { q: "What if the wheelchair breaks down?", a: "Call or WhatsApp us immediately. We offer 24/7 support and will repair or replace the wheelchair within hours." },
  { q: "Is the wheelchair suitable for Bali's terrain?", a: "Our wheelchairs are chosen for Bali's conditions. For uneven terrain, we recommend our mobility scooters which handle rough surfaces better." },
];

export default function WheelchairRentalPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Equipment", url: "/equipment" },
        { name: "Wheelchair Rental Bali", url: "/wheelchair-rental-bali" },
      ]} />
      <ProductJsonLd
        name="Wheelchair Rental Bali"
        description="Lightweight, foldable wheelchair delivered to your hotel or villa in Bali. Daily, weekly, and full-holiday rates."
        price="20"
      />
      <PageHeader
        title="Wheelchair Rental Bali"
        subtitle="Mobility Equipment"
        description="Lightweight, comfortable wheelchairs delivered to your hotel or villa anywhere in Bali."
        variant="ocean"
        image="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Wheelchair rental rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Wheelchair Rental Rates</h2>
            <p className="text-muted text-lg">All prices include free delivery and pickup.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Standard Wheelchair</h3>
              <p className="text-muted mb-6">Lightweight aluminium frame, removable footrests, folding design. Weight capacity: 120 kg.</p>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Daily</div>
                  <div className="text-2xl font-bold text-ocean">AUD $20</div>
                  <div className="text-xs text-muted">IDR 200K</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Weekly</div>
                  <div className="text-2xl font-bold text-ocean">AUD $90</div>
                  <div className="text-xs text-muted">IDR 900K</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Full Holiday</div>
                  <div className="text-2xl font-bold text-ocean">AUD $130</div>
                  <div className="text-xs text-muted">IDR 1.3M</div>
                </div>
              </div>
              <Link href="/contact" className="block text-center bg-coral text-white py-3 rounded-full font-semibold hover:bg-coral/90 transition-colors">
                Rent a Wheelchair
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Rent From Us?</h2>
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
      <section className="py-16 md:py-24" aria-label="Wheelchair rental FAQ">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a wheelchair in Bali?</h2>
          <p className="text-white/90 text-lg mb-8">Contact us to reserve your wheelchair. Free delivery to your hotel or villa.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">
              Rent a Wheelchair
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
