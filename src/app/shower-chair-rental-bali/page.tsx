import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Shower Chair Rental Bali — Bathroom Safety Equipment",
  description:
    "Rent a shower chair in Bali. Adjustable shower seats with backrest and armrests delivered to your hotel. Safe bathing for elderly and mobility-impaired travellers.",
  alternates: {
    canonical: "/shower-chair-rental-bali",
  },
  openGraph: {
    title: "Shower Chair Rental Bali | Bali Mobility",
    description:
      "Rent a shower chair in Bali. Adjustable shower seats with backrest and armrests delivered to your hotel.",
  },
};

const features = [
  { icon: "🔧", title: "Adjustable Height", description: "Seat height adjusts to fit any shower or bathroom configuration." },
  { icon: "🛡️", title: "Non-Slip Feet", description: "Rubber feet grip wet tiles firmly for safe, stable seating." },
  { icon: "💪", title: "Armrests & Backrest", description: "Full support with padded armrests and a supportive backrest." },
  { icon: "🪶", title: "Rust-Resistant", description: "Aluminium frame won't rust in Bali's humid tropical climate." },
];

const faqs = [
  { q: "What size shower chair do you offer?", a: "We offer standard and wide shower chairs. The standard fits most hotel showers. Let us know your weight and we'll recommend the right size — our chairs support up to 130kg." },
  { q: "Will the shower chair fit in my hotel bathroom?", a: "Our shower chairs are designed to fit standard hotel showers and bathrooms in Bali. If you're unsure, send us a photo of your bathroom and we'll confirm it will fit." },
  { q: "Can I rent a shower chair for just a few days?", a: "Yes! We offer daily, 3-day, and weekly rates. No minimum rental period. Delivery and pickup are free." },
  { q: "Do you deliver shower chairs to villas?", a: "Yes, we deliver free of charge to hotels, villas, and private accommodations across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and surrounding areas." },
  { q: "Is the shower chair easy to set up?", a: "Yes — our shower chairs arrive fully assembled. Just place it in your shower and adjust the height. No tools needed." },
];

export default function ShowerChairRentalPage() {
  return (
    <>
      <PageHeader
        title="Shower Chair Rental Bali"
        subtitle="Bathroom Safety"
        description="Adjustable shower chairs with backrest and armrests delivered to your hotel or villa anywhere in Bali."
        variant="ocean"
        image="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Shower chair rental rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Shower Chair Rental Rates</h2>
            <p className="text-muted text-lg">All prices include free delivery and pickup.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Adjustable Shower Chair</h3>
              <p className="text-muted mb-6">Aluminium frame with backrest, armrests, and non-slip rubber feet. Rust-resistant. Weight capacity: 130kg.</p>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Daily</div>
                  <div className="text-2xl font-bold text-ocean">$5</div>
                  <div className="text-xs text-muted">per day</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">3 Days</div>
                  <div className="text-2xl font-bold text-ocean">$13</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Weekly</div>
                  <div className="text-2xl font-bold text-ocean">$25</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a href={whatsappLink("Hi Bali Mobility! I'd like to rent a shower chair for my Bali trip.")} target="_blank" rel="noopener noreferrer" className="block text-center bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                  Check Availability on WhatsApp
                </a>
                <Link href="/contact" className="block text-center bg-coral text-white py-3 rounded-full font-semibold hover:bg-coral/90 transition-colors">
                  Book This Equipment
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Rent a Shower Chair From Us?</h2>
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
      <section className="py-16 md:py-24" aria-label="Shower chair FAQ">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Need a shower chair in Bali?</h2>
          <p className="text-white/90 text-lg mb-8">Contact us to reserve your shower chair. Free delivery to your hotel or villa.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">
              Book a Shower Chair
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
