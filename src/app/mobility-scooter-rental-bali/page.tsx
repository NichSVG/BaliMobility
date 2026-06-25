import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd, ProductJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Mobility Scooter Rental Bali — Hire a Scooter | Bali Mobility",
  description:
    "Rent a mobility scooter in Bali from $25/day. Lightweight, foldable scooters delivered free to your hotel in Sanur, Kuta, Seminyak, Nusa Dua, Ubud, and Canggu. Book on WhatsApp.",
  keywords: [
    "mobility scooter rental Bali",
    "mobility scooter hire Bali",
    "scooter rental for elderly Bali",
    "disability scooter Bali",
    "mobility scooter Sanur",
    "mobility scooter Kuta",
    "mobility scooter Seminyak",
    "Bali mobility scooter delivery",
  ],
  alternates: {
    canonical: "/mobility-scooter-rental-bali",
  },
  openGraph: {
    title: "Mobility Scooter Rental Bali | Bali Mobility",
    description:
      "Rent a mobility scooter in Bali from $25/day. Lightweight, foldable scooters delivered free to your hotel. Book on WhatsApp.",
  },
};

const features = [
  { icon: "🔋", title: "Long Range", description: "Up to 20km per charge — enough for a full day of sightseeing across Bali's tourist areas." },
  { icon: "⚡", title: "Fast Charging", description: "Full charge in 4-6 hours. Plug in overnight and you're ready to explore again the next morning." },
  { icon: "📦", title: "Foldable Design", description: "Folds down in seconds for easy transport in cars, taxis, and hotel storage. Weighs just 25kg." },
  { icon: "🏋️", title: "120kg Capacity", description: "Sturdy design supports up to 120kg. Comfortable padded seat with armrests." },
  { icon: "🛒", title: "Storage Basket", description: "Front basket for your bags, water bottles, and shopping. Keep your hands free for driving." },
  { icon: "🔧", title: "Well Maintained", description: "Every scooter is serviced, cleaned, and fully charged before delivery. Safety inspected each time." },
];

const deliveryAreas = [
  "Sanur", "Kuta", "Legian", "Seminyak", "Nusa Dua", "Jimbaran",
  "Ubud", "Canggu", "Tanah Benoa", "Denpasar", "Kerobokan",
];

const faqs = [
  { q: "How fast does the mobility scooter go?", a: "Our scooters have a maximum speed of 8 km/h — a comfortable walking pace. They're designed for safe use on footpaths, shopping areas, and tourist zones in Bali." },
  { q: "How far can I go on one charge?", a: "Up to 20km per charge, which is enough for a full day of exploring Bali's tourist areas like Sanur beachfront, Kuta shopping district, or Ubud centre. We recommend charging overnight." },
  { q: "Can I take the scooter in a car?", a: "Yes! Our scooters fold down for easy transport. They fit in most car boots, making it easy to get to restaurants, beaches, and attractions. Many guests use them alongside our day tours." },
  { q: "Is the scooter suitable for Bali's roads?", a: "Our scooters work well on footpaths, in shopping areas, hotel grounds, and on smooth roads. For very uneven terrain or cobblestone areas, we recommend a wheelchair with a companion." },
  { q: "Do you deliver scooters to hotels?", a: "Yes, we deliver free of charge to hotels and villas across Bali including Sanur, Kuta, Seminyak, Nusa Dua, Ubud, Canggu, and surrounding areas. We can also deliver to the airport." },
  { q: "What if the scooter runs out of battery?", a: "Our scooters have a 20km range per charge, so this rarely happens. If it does, call or WhatsApp us and we'll arrange assistance. We recommend charging overnight as a precaution." },
  { q: "Can I rent a scooter for just one day?", a: "Yes! We offer daily ($25), 3-day ($65), and weekly ($130) rates. There's no minimum rental period. You can extend your rental anytime during your trip." },
  { q: "Do I need a driver's licence to use a mobility scooter?", a: "No licence required. Mobility scooters are classified as mobility aids, not motor vehicles. They're legal to use on footpaths and pedestrian areas throughout Bali." },
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
        description="Lightweight, foldable mobility scooter delivered to your hotel or villa in Bali. Daily, 3-day, and weekly rates from $25/day."
        price="25"
      />
      <PageHeader
        title="Mobility Scooter Rental Bali"
        subtitle="Mobility Equipment"
        description="Lightweight, foldable mobility scooters delivered to your hotel or villa anywhere in Bali. Explore Bali independently."
        variant="tropical"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
      />

      {/* Intro Content */}
      <section className="py-16 md:py-24" aria-label="About mobility scooter rental">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Rent a Mobility Scooter in Bali</h2>
          <div className="prose prose-lg text-muted max-w-none space-y-4">
            <p>
              Bali is a beautiful island with so much to see — from the rice terraces of Ubud to the beaches of Seminyak and the temples of Tanah Lot. But if you have limited mobility, getting around can be challenging. That&apos;s where a mobility scooter rental makes all the difference.
            </p>
            <p>
              At Bali Mobility, we rent lightweight, foldable mobility scooters that give you the freedom to explore Bali at your own pace. Our scooters are delivered directly to your hotel or villa — free of charge — so you can start exploring from the moment you arrive.
            </p>
            <p>
              Each scooter has a range of 20km per charge, a comfortable padded seat, and folds down to fit in a car boot. Whether you&apos;re visiting markets in Ubud, shopping in Seminyak, or enjoying the beachfront in Sanur, our scooters let you experience Bali independently.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Scooter rental rates">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mobility Scooter Rental Rates</h2>
            <p className="text-muted text-lg">All prices include free delivery and pickup to your hotel or villa.</p>
          </div>
          <div className="max-w-lg mx-auto bg-white rounded-2xl border border-sand-dark shadow-sm">
            <div className="p-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">Travel Mobility Scooter</h3>
              <p className="text-muted mb-6">Lightweight, foldable scooter with comfortable seat and armrests. Max speed: 8 km/h. Range: 20km per charge. Weight capacity: 120kg. Includes storage basket.</p>
              <div className="grid grid-cols-3 gap-4 text-center mb-6">
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Daily</div>
                  <div className="text-2xl font-bold text-ocean">$25</div>
                  <div className="text-xs text-muted">per day</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">3 Days</div>
                  <div className="text-2xl font-bold text-ocean">$65</div>
                  <div className="text-xs text-muted">$22/day</div>
                </div>
                <div className="bg-sand rounded-xl p-4">
                  <div className="text-sm text-muted mb-1">Weekly</div>
                  <div className="text-2xl font-bold text-ocean">$130</div>
                  <div className="text-xs text-muted">$19/day</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href={whatsappLink("Hi Bali Mobility! I'd like to rent a mobility scooter. My dates are [arrival] to [departure] and I'm staying at [hotel name].")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-green-500 text-white py-3 rounded-full font-semibold hover:bg-green-600 transition-colors"
                >
                  Book on WhatsApp
                </a>
                <Link href="/contact" className="block text-center bg-coral text-white py-3 rounded-full font-semibold hover:bg-coral/90 transition-colors">
                  Use Booking Form
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24" aria-label="Scooter features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Rent a Mobility Scooter From Us?</h2>
            <p className="text-muted text-lg max-w-2xl mx-auto">We&apos;ve been renting mobility equipment in Bali since 2010. Every scooter is maintained to the highest standard.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-xl p-6 border border-sand-dark">
                <div className="text-3xl mb-3">{f.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Delivery areas">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Free Delivery Across Bali</h2>
            <p className="text-muted text-lg">We deliver mobility scooters free of charge to hotels, villas, and private accommodations in all major Bali areas.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {deliveryAreas.map((area) => (
              <span key={area} className="bg-white border border-sand-dark rounded-full px-4 py-2 text-sm font-medium text-foreground">{area}</span>
            ))}
          </div>
          <p className="text-center text-muted">
            Staying somewhere not listed? <a href={whatsappLink("Hi Bali Mobility! I'd like to rent a mobility scooter. I'm staying at [location]. Do you deliver there?")} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">Message us on WhatsApp</a> and we&apos;ll let you know.
          </p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24" aria-label="How rental works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How to Rent a Mobility Scooter</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Book", description: "WhatsApp us or use the booking form. Tell us your dates, hotel, and any questions." },
              { step: "2", title: "Delivery", description: "We deliver the scooter to your hotel or villa at your preferred time. Free of charge." },
              { step: "3", title: "Explore", description: "Use the scooter to explore Bali at your own pace. 20km range per charge." },
              { step: "4", title: "Return", description: "When you're done, we pick up the scooter from your hotel. No hassle." },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 bg-ocean text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">{item.step}</div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scooter vs Wheelchair */}
      <section className="py-16 md:py-24 bg-gray-50" aria-label="Scooter vs wheelchair">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">Mobility Scooter vs Wheelchair — Which Do You Need?</h2>
          <div className="bg-white rounded-xl border border-sand-dark overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-sand">
                  <th className="text-left p-4 font-semibold text-foreground">Feature</th>
                  <th className="text-left p-4 font-semibold text-foreground">Mobility Scooter</th>
                  <th className="text-left p-4 font-semibold text-foreground">Wheelchair</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Best for", "People who can stand and transfer independently", "People who need full-time seated support"],
                  ["Speed", "Up to 8 km/h (self-driven)", "Companion-pushed or self-propelled"],
                  ["Range", "20km per charge", "Unlimited (manual)"],
                  ["Terrain", "Smooth roads, footpaths, shopping areas", "All terrain with companion help"],
                  ["In a car", "Folds to fit in boot", "Folds to fit in boot"],
                  ["Daily rate", "$25", "$10"],
                ].map(([feature, scooter, wheelchair], i) => (
                  <tr key={feature} className={i % 2 === 0 ? "border-t border-sand-dark" : "border-t border-sand-dark bg-sand/50"}>
                    <td className="p-4 font-medium text-foreground">{feature}</td>
                    <td className="p-4 text-muted">{scooter}</td>
                    <td className="p-4 text-muted">{wheelchair}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-muted mt-6">
            Not sure which is right for you? <a href={whatsappLink("Hi Bali Mobility! I'm not sure if I need a mobility scooter or wheelchair for my Bali trip. Can you help?")} target="_blank" rel="noopener noreferrer" className="text-ocean hover:underline">Ask us on WhatsApp</a> — we&apos;ll help you choose.
          </p>
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore Bali on a mobility scooter?</h2>
          <p className="text-white/90 text-lg mb-8">Book now and we&apos;ll deliver your scooter to your hotel. Free delivery, no deposit required.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={whatsappLink("Hi Bali Mobility! I'd like to rent a mobility scooter for my Bali trip.")}
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
