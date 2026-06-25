import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Airport Wheelchair Assistance Bali — Ngurah Rai Airport",
  description:
    "Wheelchair assistance at Ngurah Rai Airport Bali. Pre-arranged airport wheelchair service, meet-and-greet, and accessible transfers. Book before you fly.",
  alternates: {
    canonical: "/airport-wheelchair-assistance-bali",
  },
  openGraph: {
    title: "Airport Wheelchair Assistance Bali | Bali Mobility",
    description:
      "Wheelchair assistance at Ngurah Rai Airport Bali. Pre-arranged airport wheelchair service and accessible transfers.",
  },
};

const features = [
  { icon: "✈️", title: "Meet & Greet", description: "Our team meets you at arrivals with a wheelchair and helps with luggage." },
  { icon: "🚗", title: "Accessible Transfer", description: "We arrange accessible vehicle transfers from the airport to your hotel." },
  { icon: "🏨", title: "Hotel Delivery", description: "Have your rental wheelchair waiting at your hotel when you arrive." },
  { icon: "📞", title: "Flight Tracking", description: "We monitor your flight so we're there even if you're delayed." },
];

const faqs = [
  { q: "How does airport wheelchair assistance work?", a: "When you book with us, we arrange for a wheelchair and team member to meet you at Ngurah Rai Airport arrivals. They'll assist you through the airport and to your transfer vehicle. We track your flight so we're there on time, even if it's delayed." },
  { q: "Can I rent a wheelchair just for the airport?", a: "Yes! We offer airport-only wheelchair assistance, or you can rent a wheelchair for your entire Bali trip. Many guests book the airport service plus a hotel delivery so equipment is ready at both ends." },
  { q: "Do you provide accessible vehicle transfers?", a: "Yes, we can arrange accessible vehicle transfers from Ngurah Rai Airport to hotels across Bali. Let us know your accommodation details when booking and we'll coordinate everything." },
  { q: "How far in advance should I book?", a: "We recommend booking at least 48 hours before your flight. For peak season (July-August, December-January), a week's notice is best. Same-day requests are possible but not guaranteed." },
  { q: "What if my flight is delayed?", a: "We track all booked flights in real time. If your flight is delayed, our team adjusts their arrival time accordingly — no extra charge. You&apos;ll never arrive to an empty airport." },
];

export default function AirportWheelchairAssistancePage() {
  return (
    <>
      <PageHeader
        title="Airport Wheelchair Assistance Bali"
        subtitle="Airport Services"
        description="Pre-arranged wheelchair assistance at Ngurah Rai International Airport. Meet-and-greet, accessible transfers, and hotel delivery."
        variant="warm"
        image="https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Airport assistance rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Airport Wheelchair Assistance Rates</h2>
            <p className="text-muted text-lg">Includes wheelchair, meet-and-greet, and assistance through the airport.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Airport Assistance Package</h3>
              <p className="text-muted mb-6">Wheelchair at arrivals, team member to assist through airport, help with luggage. Optional accessible transfer to your hotel.</p>
              <div className="grid grid-cols-2 gap-4 text-center mb-6">
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Arrival Only</div>
                  <div className="text-2xl font-bold text-ocean">$25</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Arrival + Transfer</div>
                  <div className="text-2xl font-bold text-ocean">$45</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href={whatsappLink("Hi Bali Mobility! I'd like to book airport wheelchair assistance for my arrival in Bali. My flight is [flight number] on [date].")} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                  Book Airport Assistance
                </a>
                <Link href="/contact" className="block text-center bg-coral text-white py-3 rounded-full font-semibold hover:bg-coral/90 transition-colors">
                  Enquire Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What&apos;s Included?</h2>
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
      <section className="py-16 md:py-24" aria-label="Airport assistance FAQ">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Arriving in Bali soon?</h2>
          <p className="text-white/90 text-lg mb-8">Book airport wheelchair assistance and have everything arranged before you fly.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">
              Book Airport Assistance
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
