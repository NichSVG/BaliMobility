import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Bali Tours — Accessible Day Tours with Driver",
  description:
    "Book a private day tour in Bali with driver and petrol included. Half-day tours from $60 and full-day tours from $100 per car. Explore Bali at your own pace.",
  alternates: {
    canonical: "/tours",
  },
  openGraph: {
    title: "Bali Tours | Bali Mobility",
    description:
      "Book a private day tour in Bali with driver and petrol included. Half-day from $60, full-day from $100 per car.",
  },
};

const tourIdeas = [
  { icon: "🌾", title: "Ubud Rice Terraces", description: "Tegallalang rice terraces, Ubud Monkey Forest, art galleries, and local craft markets." },
  { icon: "🛕", title: "Tanah Lot Temple", description: "Iconic sea temple with stunning sunset views. Combine with Canggu beach stops." },
  { icon: "🏖️", title: "Uluwatu & Beaches", description: "Clifftop temple, Kecak fire dance, and beautiful beaches around the Bukit peninsula." },
  { icon: "🌋", title: "Kintamani & Mt Batur", description: "Volcano views, hot springs, and coffee plantation visits in the highlands." },
  { icon: "🛍️", title: "Shopping & Markets", description: "Seminyak boutiques, Kuta markets, Sukawati art market, and local souvenir shops." },
  { icon: "🐬", title: "Lovina & North Bali", description: "Dolphin watching, Gitgit waterfall, and quiet northern beaches (full day)." },
];

const faqs = [
  { q: "What's included in the tour price?", a: "The price includes the car, driver, and petrol. Entrance fees, parking, and meals are not included but are very affordable in Bali." },
  { q: "How many people can fit in the car?", a: "Our standard car fits up to 4 passengers comfortably. For larger groups, let us know and we can arrange a bigger vehicle." },
  { q: "Can I choose my own route?", a: "Absolutely! Tell us where you want to go and we'll plan the route. Or pick from our popular tour ideas above. The driver will follow your schedule." },
  { q: "What time does the tour start?", a: "You choose the pickup time. Most guests start between 8-9 AM. Half-day tours are approximately 4 hours, full-day tours are approximately 8 hours." },
  { q: "Do you pick up from my hotel?", a: "Yes — the driver picks you up from your hotel, villa, or accommodation and drops you back at the end of the tour." },
];

export default function ToursPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Tours", url: "/tours" },
      ]} />
      <PageHeader
        title="Bali Day Tours"
        subtitle="Private Tours"
        description="Explore Bali with a private driver. Petrol and driver included. Just tell us where you want to go."
        variant="tropical"
        image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80"
      />

      {/* Pricing */}
      <section className="py-16 md:py-24" aria-label="Tour pricing">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tour Prices</h2>
            <p className="text-muted text-lg">Per car, not per person. Driver and petrol included.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl border border-sand-dark overflow-hidden shadow-sm p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">Half-Day Tour</h3>
              <p className="text-sm text-muted mb-4">Approximately 4 hours</p>
              <div className="text-4xl font-bold text-ocean mb-1">$60</div>
              <div className="text-sm text-muted mb-6">per car</div>
              <ul className="text-sm text-muted text-left space-y-2 mb-6">
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Private car with driver</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Petrol included</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Hotel pickup & drop-off</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Up to 4 passengers</li>
              </ul>
              <a
                href={whatsappLink("Hi Bali Mobility! I'd like to book a half-day tour in Bali.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                Book on WhatsApp
              </a>
            </div>
            <div className="bg-white rounded-2xl border border-ocean overflow-hidden shadow-md p-8 text-center relative">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ocean text-white text-xs font-bold px-3 py-1 rounded-full">Popular</span>
              <h3 className="text-xl font-bold text-foreground mb-2">Full-Day Tour</h3>
              <p className="text-sm text-muted mb-4">Approximately 8 hours</p>
              <div className="text-4xl font-bold text-ocean mb-1">$100</div>
              <div className="text-sm text-muted mb-6">per car</div>
              <ul className="text-sm text-muted text-left space-y-2 mb-6">
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Private car with driver</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Petrol included</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Hotel pickup & drop-off</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Up to 4 passengers</li>
                <li className="flex items-center gap-2"><span className="text-tropical">✓</span> Multiple stops</li>
              </ul>
              <a
                href={whatsappLink("Hi Bali Mobility! I'd like to book a full-day tour in Bali.")}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
              >
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Ideas */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Tour ideas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Popular Tour Ideas</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">Choose one of these routes or tell us your own ideas. The driver will follow your schedule.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tourIdeas.map((tour) => (
              <div key={tour.title} className="bg-white rounded-xl p-6 text-center border border-sand-dark hover:shadow-md transition-shadow">
                <div className="text-4xl mb-3">{tour.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{tour.title}</h3>
                <p className="text-sm text-muted">{tour.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24" aria-label="Tour FAQ">
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
      <section className="py-16 md:py-24 bg-ocean text-white" aria-label="Book a tour">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore Bali?</h2>
          <p className="text-white/90 text-lg mb-8">Message us on WhatsApp to book your tour. Tell us where you want to go and we&apos;ll arrange everything.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink("Hi Bali Mobility! I'd like to book a tour in Bali. Here's where I want to go:")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Book on WhatsApp
            </a>
            <Link href="/contact" className="inline-block bg-white/10 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors">
              Use Booking Form
            </Link>
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
