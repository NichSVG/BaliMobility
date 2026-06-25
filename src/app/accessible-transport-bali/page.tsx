import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Accessible Transport Bali — Wheelchair Friendly Transfers",
  description:
    "Accessible transport and wheelchair-friendly transfers in Bali. Airport pickups, day tours, and hotel transfers with mobility equipment. Book your accessible ride.",
  alternates: {
    canonical: "/accessible-transport-bali",
  },
  openGraph: {
    title: "Accessible Transport Bali | Bali Mobility",
    description:
      "Accessible transport and wheelchair-friendly transfers in Bali. Airport pickups, day tours, and hotel transfers.",
  },
};

const features = [
  { icon: "🚐", title: "Wheelchair Accessible", description: "Vehicles with ramps or lifts for easy wheelchair access. No transfers needed." },
  { icon: "👨‍✈️", title: "Trained Drivers", description: "Our drivers are trained to assist passengers with mobility needs safely." },
  { icon: "🗺️", title: "Island-Wide Service", description: "We cover all major Bali areas: Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and more." },
  { icon: "⏰", title: "Flexible Scheduling", description: "Book by the hour, half-day, or full day. We work around your itinerary." },
];

const faqs = [
  { q: "What types of accessible vehicles do you have?", a: "We have vehicles with wheelchair ramps and secure wheelchair tie-down systems. Our fleet includes MPVs and minibuses that can accommodate wheelchairs, mobility scooters, and passengers with limited mobility." },
  { q: "Can I book accessible transport for day tours?", a: "Yes! We offer full-day and half-day accessible tours around Bali. Popular routes include Ubud rice terraces, Tanah Lot temple, Uluwatu, and beach tours. All vehicles are wheelchair accessible." },
  { q: "Do you provide airport transfers?", a: "Yes, we provide accessible airport transfers from Ngurah Rai International Airport to hotels across Bali. We track your flight and meet you at arrivals with assistance." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 24 hours in advance. For peak season or specific vehicle requirements, a week's notice is best. Same-day requests are possible depending on availability." },
  { q: "Can the vehicle also carry my mobility equipment?", a: "Absolutely. Our vehicles have space for wheelchairs, mobility scooters, walkers, and other equipment. If you're renting equipment from us, we'll have it loaded and ready for your transfer." },
];

export default function AccessibleTransportPage() {
  return (
    <>
      <PageHeader
        title="Accessible Transport Bali"
        subtitle="Transport Services"
        description="Wheelchair-friendly transfers, airport pickups, and day tours across Bali. Comfortable, safe, and reliable."
        variant="tropical"
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Transport rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Accessible Transport Rates</h2>
            <p className="text-muted text-lg">Prices include vehicle, driver, fuel, and wheelchair assistance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm p-6 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">Airport Transfer</h3>
              <p className="text-sm text-muted mb-4">One-way Ngurah Rai Airport to/from your hotel</p>
              <div className="text-3xl font-bold text-ocean mb-1">$30</div>
              <div className="text-xs text-muted mb-4">one-way</div>
              <a href={whatsappLink("Hi Bali Mobility! I'd like to book an accessible airport transfer. My flight is [details].")} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                Book Transfer
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-ocean overflow-hidden shadow-md p-6 text-center relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ocean text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
              <h3 className="text-lg font-bold text-foreground mb-2">Half-Day Tour</h3>
              <p className="text-sm text-muted mb-4">4 hours with driver and accessible vehicle</p>
              <div className="text-3xl font-bold text-ocean mb-1">$60</div>
              <div className="text-xs text-muted mb-4">4 hours</div>
              <a href={whatsappLink("Hi Bali Mobility! I'd like to book a half-day accessible tour in Bali.")} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                Book Tour
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm p-6 text-center">
              <h3 className="text-lg font-bold text-foreground mb-2">Full-Day Tour</h3>
              <p className="text-sm text-muted mb-4">8 hours with driver and accessible vehicle</p>
              <div className="text-3xl font-bold text-ocean mb-1">$100</div>
              <div className="text-xs text-muted mb-4">8 hours</div>
              <a href={whatsappLink("Hi Bali Mobility! I'd like to book a full-day accessible tour in Bali.")} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-500 text-white py-2.5 rounded-full text-sm font-semibold hover:bg-green-600 transition-colors">
                Book Tour
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Our Transport?</h2>
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
      <section className="py-16 md:py-24" aria-label="Transport FAQ">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need accessible transport in Bali?</h2>
          <p className="text-white/90 text-lg mb-8">Book your wheelchair-friendly transfer or tour. We handle everything so you can enjoy the ride.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">
              Book Transport
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
