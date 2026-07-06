import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { BreadcrumbJsonLd } from "@/components/JsonLd";
import { whatsappLink } from "@/lib/contact";
import { client } from "@/lib/sanity";
import { equipmentQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";

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
  { name: "Mobility Scooter", slug: "mobility-scooter", image: "/images/equipment/mobility-scooter.jpeg", description: "Lightweight mobility scooter perfect for exploring Bali.", features: ["Long Range — Up to 20km per charge", "Fast Charging — Full charge in 4-6 hours", "Foldable Design — Folds down, weighs just 25kg", "120kg Capacity — Padded seat with armrests", "Storage Basket — Front basket for bags and shopping", "Well Maintained — Serviced, cleaned, and charged before delivery"], rateDaily: "$25", rate3Days: "$65", rateWeekly: "$130", bestFor: "Travellers with limited mobility who can stand and transfer." },
  { name: "Wheelchair", slug: "wheelchair", image: "/images/equipment/wheelchair.jpeg", description: "Comfortable wheelchair with supportive seating and easy manoeuvrability.", features: ["Lightweight frame", "Removable footrests", "Folding design", "Weight capacity: 120 kg"], rateDaily: "$10", rate3Days: "$25", rateWeekly: "$50", bestFor: "Travellers who need a wheelchair for getting around Bali." },
  { name: "Baby Push Chair", slug: "baby-push-chair", image: "/images/equipment/baby-push-chair.jpg", description: "Lightweight baby stroller for families with young children.", features: ["Ages 6 months – 4 years", "Reclining seat", "Sun canopy with UV protection", "5-point safety harness"], rateDaily: "$7", rate3Days: "$18", rateWeekly: "$35", bestFor: "Families with young children." },
  { name: "Baby Car Seat", slug: "baby-car-seat", image: "/images/equipment/baby-car-seat.webp", description: "Safe and secure baby car seat for worry-free travel around Bali.", features: ["Suitable for ages 0–4 years", "5-point safety harness", "Easy installation", "Meets safety standards"], rateDaily: "$7", rate3Days: "$18", rateWeekly: "$35", bestFor: "Families travelling with infants or toddlers." },
  { name: "Walker Frame", slug: "walker-frame", image: "/images/equipment/walker-frame.webp", description: "Sturdy four-wheel walker with seat, brakes, and basket.", features: ["Four-wheel design with brakes", "Built-in padded seat", "Storage basket underneath", "Adjustable height"], rateDaily: "$10", rate3Days: "$25", rateWeekly: "$50", bestFor: "Travellers who can walk but need extra stability." },
  { name: "Shower Seat", slug: "shower-seat", image: "/images/equipment/shower-seat.jpg", description: "Adjustable shower chair with backrest and armrests for safe bathing.", features: ["Adjustable seat height", "Backrest and armrests", "Non-slip rubber feet", "Rust-resistant aluminium"], rateDaily: "$5", rate3Days: "$13", rateWeekly: "$25", bestFor: "Travellers who need seated support while showering." },
  { name: "Toilet Seat", slug: "toilet-seat", image: "/images/equipment/toilet-seat.jpeg", description: "Raised toilet seat with armrests for safer bathroom use.", features: ["Height adjustable", "Padded armrests", "Fits most toilets", "Tool-free installation"], rateDaily: "$5", rate3Days: "$13", rateWeekly: "$25", bestFor: "Anyone needing extra height or support in the bathroom." },
  { name: "Electric Wheelchair", slug: "electric-wheelchair", image: "/images/equipment/electric-wheelchair.jpeg", description: "Powered electric wheelchair with joystick control for effortless mobility around Bali.", features: ["Joystick control — easy one-handed operation", "Long range — up to 15km per charge", "Comfortable padded seat with armrests", "Weight capacity: 120kg", "Foldable design for transport", "Well maintained — serviced and charged before delivery"], rateDaily: "$25", rate3Days: "$65", rateWeekly: "$130", bestFor: "Travellers who need a powered wheelchair for independent mobility around Bali." },
];

export default async function EquipmentPage() {
  const sanityEquipment = await client.fetch(equipmentQuery).catch(() => []);

  // Use Sanity data if available, otherwise use fallback
  const display = sanityEquipment.length > 0
    ? sanityEquipment.map((item: any) => ({
        name: item.name,
        slug: item.slug,
        image: item.image
          ? urlFor(item.image).width(600).url()
          : (fallbackEquipment.find(f => f.slug === item.slug)?.image || `/images/equipment/${item.slug}.jpeg`),
        description: item.description,
        features: item.features || [],
        rateDaily: item.rateDaily,
        rate3Days: item.rate3Days,
        rateWeekly: item.rateWeekly,
        bestFor: item.bestFor,
      }))
    : fallbackEquipment;

  // Sort most expensive to cheapest (by daily rate)
  const sortedDisplay = [...display].sort(
    (a, b) => parseFloat(b.rateDaily.replace(/[^0-9.]/g, "")) - parseFloat(a.rateDaily.replace(/[^0-9.]/g, ""))
  );

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

      <section className="py-12 md:py-16" aria-label="Equipment catalogue">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3">
            {sortedDisplay.map((item: any) => (
              <article key={item.name} className="bg-white rounded-xl border border-sand-dark overflow-hidden hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row">
                  <div className="relative w-full sm:w-44 h-36 sm:h-auto bg-sand shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 640px) 100vw, 176px"
                    />
                  </div>
                  <div className="p-4 flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 flex-wrap">
                      <div className="min-w-0">
                        <h2 className="text-base font-bold text-foreground">{item.name}</h2>
                        <p className="text-xs text-muted mt-0.5">{item.description}</p>
                      </div>
                    </div>

                    <div className="mt-3 bg-sand rounded-lg p-2.5">
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div><div className="text-[10px] text-muted leading-none">Daily</div><div className="font-bold text-ocean text-sm mt-0.5">{item.rateDaily}</div></div>
                        <div><div className="text-[10px] text-muted leading-none">3 Days</div><div className="font-bold text-ocean text-sm mt-0.5">{item.rate3Days}</div></div>
                        <div><div className="text-[10px] text-muted leading-none">Weekly</div><div className="font-bold text-ocean text-sm mt-0.5">{item.rateWeekly}</div></div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 mt-3">
                      <div className="grid grid-cols-2 gap-2">
                        <a
                          href={whatsappLink(`Hi Bali Mobility! I'd like to check availability for: ${item.name}`)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-center bg-green-500 text-white py-2 rounded-lg text-xs font-semibold hover:bg-green-600 transition-colors"
                        >
                          Check Availability
                        </a>
                        <Link
                          href="/contact"
                          className="text-center bg-ocean text-white py-2 rounded-lg text-xs font-semibold hover:bg-ocean-dark transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>

                      <details className="group">
                        <summary className="text-xs font-medium text-tropical cursor-pointer select-none list-none flex items-center gap-1">
                          <span className="group-open:hidden">View details</span>
                          <span className="hidden group-open:inline">Hide details</span>
                          <svg className="w-3 h-3 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </summary>
                        <div className="mt-2">
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                            {(item.features || []).map((f: string) => (
                              <li key={f} className="text-xs text-muted flex items-start gap-1"><span className="text-tropical mt-0.5" aria-hidden="true">✓</span><span>{f}</span></li>
                            ))}
                          </ul>
                          <p className="text-xs text-muted mt-2"><strong>Best for:</strong> {item.bestFor}</p>
                          <a
                            href={whatsappLink(`Hi Bali Mobility! I'm not sure which ${item.name.toLowerCase()} is right for me. Can you help?`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block border border-green-500 text-green-600 py-1.5 px-3 rounded-lg text-xs font-medium hover:bg-green-50 transition-colors mt-2"
                          >
                            Not sure? Ask which one you need
                          </a>
                        </div>
                      </details>
                    </div>
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
