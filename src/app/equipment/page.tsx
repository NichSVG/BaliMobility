import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { equipmentQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Mobility Equipment Hire",
  description:
    "Rent mobility scooters, electric wheelchairs, walkers, and beach wheelchairs in Bali. Delivered to your hotel with 24/7 support.",
  alternates: {
    canonical: "/equipment",
  },
  openGraph: {
    title: "Mobility Equipment Hire | Bali Mobility",
    description:
      "Rent mobility scooters, electric wheelchairs, walkers, and beach wheelchairs in Bali. Delivered to your hotel with 24/7 support.",
  },
};

const fallbackEquipment = [
  { name: "Mobility Scooter", icon: "🛵", description: "Lightweight, foldable mobility scooter perfect for exploring Bali.", features: ["Max speed: 8 km/h", "Range: 20 km per charge", "Weight capacity: 120 kg", "Foldable for easy transport"], rateDaily: "IDR 250K", rateWeekly: "IDR 1.2M", rateHoliday: "IDR 1.8M", rateDailyAud: "AUD $25", rateWeeklyAud: "AUD $120", rateHolidayAud: "AUD $180", bestFor: "Travellers with limited mobility who can stand and transfer." },
  { name: "Electric Wheelchair", icon: "🦽", description: "Joystick-controlled electric wheelchair with comfortable seating.", features: ["Joystick controller", "Max speed: 6 km/h", "Range: 15 km per charge", "Weight capacity: 130 kg"], rateDaily: "IDR 350K", rateWeekly: "IDR 1.8M", rateHoliday: "IDR 2.5M", rateDailyAud: "AUD $35", rateWeeklyAud: "AUD $180", rateHolidayAud: "AUD $250", bestFor: "Travellers who use a wheelchair full-time." },
  { name: "Manual Wheelchair", icon: "♿", description: "Lightweight manual wheelchair with removable footrests.", features: ["Lightweight aluminium frame", "Removable footrests", "Weight capacity: 100 kg", "Foldable design"], rateDaily: "IDR 150K", rateWeekly: "IDR 700K", rateHoliday: "IDR 1M", rateDailyAud: "AUD $15", rateWeeklyAud: "AUD $70", rateHolidayAud: "AUD $100", bestFor: "Travellers who can self-propel or have a companion." },
  { name: "Walker / Rollator", icon: "🦯", description: "Sturdy four-wheel walker with seat, brakes, and basket.", features: ["Four-wheel design with brakes", "Built-in padded seat", "Storage basket underneath", "Adjustable height"], rateDaily: "IDR 100K", rateWeekly: "IDR 500K", rateHoliday: "IDR 750K", rateDailyAud: "AUD $10", rateWeeklyAud: "AUD $50", rateHolidayAud: "AUD $75", bestFor: "Travellers who can walk but need extra stability." },
  { name: "Adjustable Toilet Seat", icon: "🚽", description: "Raised toilet seat with armrests for safer bathroom use.", features: ["Height adjustable", "Padded armrests", "Fits most toilets", "Tool-free installation"], rateDaily: "IDR 75K", rateWeekly: "IDR 350K", rateHoliday: "IDR 500K", rateDailyAud: "AUD $8", rateWeeklyAud: "AUD $35", rateHolidayAud: "AUD $50", bestFor: "Anyone needing extra height or support." },
  { name: "Shower Chair", icon: "🚿", description: "Adjustable shower chair with backrest and armrests.", features: ["Adjustable seat height", "Backrest and armrests", "Non-slip rubber feet", "Rust-resistant aluminium"], rateDaily: "IDR 75K", rateWeekly: "IDR 350K", rateHoliday: "IDR 500K", rateDailyAud: "AUD $8", rateWeeklyAud: "AUD $35", rateHolidayAud: "AUD $50", bestFor: "Travellers who need seated support while showering." },
  { name: "Beach Wheelchair", icon: "🏖️", description: "Wide-wheel beach wheelchair for sand and shallow water.", features: ["Wide pneumatic tyres", "Floats in shallow water", "Rust-resistant frame", "Sun canopy included"], rateDaily: "IDR 300K", rateWeekly: "IDR 1.5M", rateHoliday: "IDR 2M", rateDailyAud: "AUD $30", rateWeeklyAud: "AUD $150", rateHolidayAud: "AUD $200", bestFor: "Any traveller wanting beach and water access." },
  { name: "Pushchair / Stroller", icon: "👶", description: "Lightweight baby stroller for families with young children.", features: ["Ages 6 months – 4 years", "Reclining seat", "Sun canopy with UV protection", "5-point safety harness"], rateDaily: "IDR 100K", rateWeekly: "IDR 500K", rateHoliday: "IDR 750K", rateDailyAud: "AUD $10", rateWeeklyAud: "AUD $50", rateHolidayAud: "AUD $75", bestFor: "Families with young children." },
];

export default async function EquipmentPage() {
  const equipment = await client.fetch(equipmentQuery).catch(() => []);
  const display = equipment.length > 0 ? equipment : fallbackEquipment;

  return (
    <>
      <PageHeader
        title="Equipment Hire"
        subtitle="Mobility Solutions"
        description="Quality mobility equipment delivered to your hotel or villa. Rates shown in IDR and AUD."
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
                  {item.image && <img src={urlFor(item.image).width(600).url()} alt={item.name} className="w-full h-48 object-cover rounded-lg mb-4" />}
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
                    <h3 className="text-sm font-semibold text-foreground mb-2">Hire Rates:</h3>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div><div className="text-xs text-muted">Daily</div><div className="font-bold text-ocean text-sm">{item.rateDailyAud}</div><div className="text-xs text-muted">{item.rateDaily}</div></div>
                      <div><div className="text-xs text-muted">Weekly</div><div className="font-bold text-ocean text-sm">{item.rateWeeklyAud}</div><div className="text-xs text-muted">{item.rateWeekly}</div></div>
                      <div><div className="text-xs text-muted">Holiday</div><div className="font-bold text-ocean text-sm">{item.rateHolidayAud}</div><div className="text-xs text-muted">{item.rateHoliday}</div></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted mb-4"><strong>Best for:</strong> {item.bestFor}</p>
                  <Link href="/contact" className="block text-center bg-ocean text-white py-2.5 rounded-full text-sm font-semibold hover:bg-ocean-dark transition-colors">Enquire Now</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12" aria-label="Delivery information">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div><div className="text-3xl mb-2" aria-hidden="true">🚚</div><h3 className="font-semibold mb-1">Free Delivery</h3><p className="text-sm text-muted">Delivered to your hotel in Sanur, Kuta, Seminyak, Nusa Dua, and Ubud.</p></div>
            <div><div className="text-3xl mb-2" aria-hidden="true">🔧</div><h3 className="font-semibold mb-1">Well Maintained</h3><p className="text-sm text-muted">All equipment serviced, cleaned, and tested. 24/7 support available.</p></div>
            <div><div className="text-3xl mb-2" aria-hidden="true">📦</div><h3 className="font-semibold mb-1">Flexible Hire</h3><p className="text-sm text-muted">Daily, weekly, or full-holiday rates. Extend anytime.</p></div>
          </div>
        </div>
      </section>

      <section className="bg-ocean text-white py-16" aria-label="Get started">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need help choosing equipment?</h2>
          <p className="text-white/90 mb-8">Tell us about your mobility needs and we&apos;ll recommend the right equipment.</p>
          <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Get Expert Advice</Link>
        </div>
      </section>
    </>
  );
}
