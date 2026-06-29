import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";

export const metadata: Metadata = {
  title: "Equipment Rental",
  description:
    "Rent mobility scooters, wheelchairs, baby push chairs, car seats, walker frames, shower seats, and toilet seats in Bali. Delivered to your hotel.",
  alternates: {
    canonical: "/equipment",
  },
  openGraph: {
    title: "Equipment Rental | Bali Mobility",
    description:
      "Rent mobility scooters, wheelchairs, baby push chairs, car seats, walker frames, shower seats, and toilet seats in Bali. Delivered to your hotel.",
  },
};

const fallbackEquipment = [
  { name: "Mobility Scooter", icon: "🛵", slug: "mobility-scooter", description: "Lightweight mobility scooter perfect for exploring Bali.", features: ["Max speed: 8 km/h", "Range: 20 km per charge", "Weight capacity: 120 kg", "Easy to transport"], rateDaily: "$25", rate3Days: "$65", rateWeekly: "$130", bestFor: "Travellers with limited mobility who can stand and transfer." },
  { name: "Wheelchair", icon: "🦽", slug: "wheelchair", description: "Comfortable wheelchair with supportive seating and easy manoeuvrability.", features: ["Lightweight frame", "Removable footrests", "Folding design", "Weight capacity: 120 kg"], rateDaily: "$10", rate3Days: "$25", rateWeekly: "$50", bestFor: "Travellers who need a wheelchair for getting around Bali." },
  { name: "Baby Push Chair", icon: "👶", slug: "baby-push-chair", description: "Lightweight baby stroller for families with young children.", features: ["Ages 6 months – 4 years", "Reclining seat", "Sun canopy with UV protection", "5-point safety harness"], rateDaily: "$7", rate3Days: "$18", rateWeekly: "$35", bestFor: "Families with young children." },
  { name: "Baby Car Seat", icon: "🚗", slug: "baby-car-seat", description: "Safe and secure baby car seat for worry-free travel around Bali.", features: ["Suitable for ages 0–4 years", "5-point safety harness", "Easy installation", "Meets safety standards"], rateDaily: "$7", rate3Days: "$18", rateWeekly: "$35", bestFor: "Families travelling with infants or toddlers." },
  { name: "Walker Frame", icon: "🦯", slug: "walker-frame", description: "Sturdy four-wheel walker with seat, brakes, and basket.", features: ["Four-wheel design with brakes", "Built-in padded seat", "Storage basket underneath", "Adjustable height"], rateDaily: "$7", rate3Days: "$18", rateWeekly: "$35", bestFor: "Travellers who can walk but need extra stability." },
  { name: "Shower Seat", icon: "🚿", slug: "shower-seat", description: "Adjustable shower chair with backrest and armrests for safe bathing.", features: ["Adjustable seat height", "Backrest and armrests", "Non-slip rubber feet", "Rust-resistant aluminium"], rateDaily: "$5", rate3Days: "$13", rateWeekly: "$25", bestFor: "Travellers who need seated support while showering." },
  { name: "Toilet Seat", icon: "🚽", slug: "toilet-seat", description: "Raised toilet seat with armrests for safer bathroom use.", features: ["Height adjustable", "Padded armrests", "Fits most toilets", "Tool-free installation"], rateDaily: "$5", rate3Days: "$13", rateWeekly: "$25", bestFor: "Anyone needing extra height or support in the bathroom." },
];

export default async function EquipmentPage() {
  const display = fallbackEquipment;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "Home", url: "/" },
        { name: "Equipment", url: "/equipment" },
      ]} />
      <PageHeader
        title="Equipment Rental"
        subtitle="Mobility Solutions"
        description="Quality mobility equipment delivered to your hotel or villa. Rates shown in USD."
        variant="tropical"
        image="https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=1920&q=80"
        breadcrumbs={[
          { label: "Services", href: "/services" },
          { label: "Equipment", href: "/equipment" },
        ]}
      />

      <section className="py-16 md:py-24" aria-label="Equipment catalogue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {display.map((item: any) => (
              <article key={item.name} className="bg-white rounded-xl border border-sand-dark overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-6">

                  <div className="flex items-start gap-4 mb-4">
                    <span className="text-4xl" aria-hidden="true">{item.icon}</span>
                    <div>
                      <h2 className="text-xl font-bold text-foreground">{item.name}</h2>
                      <p className="text-sm text-muted mt-1">{item.description}</p>
                    </div>
                  </div>
                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Features:</h3>
                    <ul className="grid grid-cols-2 gap-1">
                      {(item.features || []).map((f: string) => (
                        <li key={f} className="text-xs text-muted flex items-center gap-1"><span className="text-tropical" aria-hidden="true">✓</span>{f}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4 bg-sand rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Rental Rates:</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><div className="text-xs text-muted">Daily</div><div className="font-bold text-ocean text-sm">{item.rateDaily}</div></div>
                      <div><div className="text-xs text-muted">3 Days</div><div className="font-bold text-ocean text-sm">{item.rate3Days}</div></div>
                      <div><div className="text-xs text-muted">Weekly</div><div className="font-bold text-ocean text-sm">{item.rateWeekly}</div></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted mb-4"><strong>Best for:</strong> {item.bestFor}</p>

                  {/* Stronger CTAs */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={whatsappLink(`Hi Bali Mobility! I'd like to check availability for: ${item.name}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center bg-green-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-green-600 transition-colors"
                      >
                        Check Availability
                      </a>
                      <Link
                        href="/contact"
                        className="text-center bg-ocean text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-ocean-dark transition-colors"
                      >
                        Book Now
                      </Link>
                    </div>
                    <a
                      href={whatsappLink(`Hi Bali Mobility! I'm not sure which ${item.name.toLowerCase()} is right for me. Can you help?`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center border border-green-500 text-green-600 py-2 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors"
                    >
                      Not sure? Ask which one you need
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>



      <section className="bg-ocean text-white py-16" aria-label="Get started">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help choosing equipment?</h2>
          <p className="text-white/90 mb-8">Tell us about your mobility needs and we&apos;ll recommend the right equipment.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Get Expert Advice</Link>
            <a
              href={whatsappLink("Hi Bali Mobility! I need help choosing the right equipment for my trip.")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-white/10 border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-colors"
            >
              Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
