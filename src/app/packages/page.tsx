import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { packagesQuery } from "@/lib/queries";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Accessible Holiday Packages",
  description:
    "All-inclusive accessible holiday packages in Bali. 3, 5, and 7-night packages with accommodation, equipment, carers, transport, and tours.",
  alternates: {
    canonical: "/packages",
  },
  openGraph: {
    title: "Accessible Holiday Packages | Bali Mobility",
    description:
      "All-inclusive accessible holiday packages in Bali. 3, 5, and 7-night packages with accommodation, equipment, carers, transport, and tours.",
  },
};

const fallbackPackages = [
  { name: "Bali Taster", nights: 3, priceAud: 899, priceGbp: 499, priceUsd: 649, popular: false, description: "Perfect for a short getaway. Experience accessible Bali with everything you need.", included: ["3 nights accessible hotel", "Mobility equipment rental", "Personal carer — 8 hours/day", "Airport collection & return", "1 guided accessible tour", "Welcome pack"], excluded: ["Flights", "Travel insurance", "Meals (except breakfast)"], itinerary: ["Day 1: Airport pickup, hotel check-in, welcome briefing", "Day 2: Guided tour — accessible Sanur beach & markets", "Day 3: Free day with equipment", "Day 4: Airport transfer & departure"] },
  { name: "Bali Discovery", nights: 7, priceAud: 1899, priceGbp: 1049, priceUsd: 1349, popular: true, description: "Our most popular package. A full week of accessible Bali with tours, activities, and complete support.", included: ["7 nights accessible hotel or villa", "Mobility equipment rental", "Personal carer — 10 hours/day", "Accessible transport with driver", "3 guided accessible tours", "1 Balinese massage", "1 cultural Bali night", "Airport collection & return"], excluded: ["Flights", "Travel insurance", "Meals (except breakfast and 1 dinner)"], itinerary: ["Day 1: Airport pickup, check-in, welcome dinner", "Day 2: Sanur beach day", "Day 3: Ubud art tour", "Day 4: Free day", "Day 5: Tanah Lot temple", "Day 6: Snorkelling trip", "Day 7: Shopping & massage", "Day 8: Departure"] },
  { name: "Bali Complete", nights: 14, priceAud: 3499, priceGbp: 1949, priceUsd: 2499, popular: false, description: "The ultimate accessible Bali experience. Two weeks of fully supported travel with premium accommodation.", included: ["14 nights premium villa with pool", "Full equipment package", "Personal carer — 12 hours/day", "Dedicated transport with driver", "5 guided tours", "2 Balinese massages", "1 diving/snorkelling session", "1 fishing trip", "Airport transfers"], excluded: ["Flights", "Travel insurance", "Meals (except breakfast and 2 dinners)"], itinerary: ["Day 1: Arrival & villa setup", "Day 2-3: Sanur exploration", "Day 4: Ubud tour", "Day 5: Free day", "Day 6: Temple tour", "Day 7: Diving/snorkelling", "Day 8: Shopping", "Day 9: Spa day", "Day 10: Fishing trip", "Day 11: Free day", "Day 12: Cultural night", "Day 13: Nusa Dua beach", "Day 14: Farewell dinner", "Day 15: Departure"] },
];

export default async function PackagesPage() {
  const packages = await client.fetch(packagesQuery).catch(() => []);
  const display = packages.length > 0 ? packages : fallbackPackages;

  return (
    <>
      <PageHeader
        title="Holiday Packages"
        subtitle="All-Inclusive"
        description="All-inclusive accessible holiday packages. Equipment, carers, transport, tours, and accommodation — everything arranged for you."
        variant="warm"
        image="https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80"
        breadcrumbs={[
          { label: "Packages", href: "/packages" },
        ]}
      />

      <section className="py-16 md:py-24" aria-label="Holiday packages">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {display.map((pkg: any) => (
              <article key={pkg.name} className={`bg-white rounded-2xl border overflow-hidden ${pkg.popular ? "border-ocean shadow-lg ring-2 ring-ocean" : "border-sand-dark shadow-sm"}`}>
                {pkg.popular && <div className="bg-ocean text-white text-center py-2 text-sm font-semibold">Most Popular Package</div>}
                <div className="p-6 md:p-8">
                  <div className="grid md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                      <div className="flex items-center gap-3 mb-3">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">{pkg.name}</h2>
                        <span className="bg-sand text-foreground text-sm font-medium px-3 py-1 rounded-full">{pkg.nights} nights</span>
                      </div>
                      <p className="text-muted mb-6">{pkg.description}</p>
                      <div className="grid sm:grid-cols-2 gap-6 mb-6">
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-sm">What&apos;s included:</h3>
                          <ul className="space-y-2">
                            {(pkg.included || []).map((item: string) => (
                              <li key={item} className="text-sm text-muted flex items-start gap-2">
                                <svg className="w-4 h-4 text-tropical shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground mb-3 text-sm">Not included:</h3>
                          <ul className="space-y-2">
                            {(pkg.excluded || []).map((item: string) => (
                              <li key={item} className="text-sm text-muted flex items-start gap-2">
                                <svg className="w-4 h-4 text-muted/50 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <details className="group">
                        <summary className="cursor-pointer text-ocean font-semibold text-sm hover:underline">View sample itinerary</summary>
                        <ol className="mt-3 space-y-2 border-l-2 border-ocean-light pl-4">
                          {(pkg.itinerary || []).map((day: string, i: number) => (<li key={i} className="text-sm text-muted">{day}</li>))}
                        </ol>
                      </details>
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="bg-sand rounded-xl p-6 text-center mb-4">
                        <div className="text-sm text-muted mb-1">From</div>
                        <div className="text-4xl font-bold text-ocean">AUD ${pkg.priceAud?.toLocaleString()}</div>
                        <div className="text-sm text-muted mt-1">per person</div>
                        <div className="flex justify-center gap-4 mt-3 text-sm text-muted">
                          <span>£{pkg.priceGbp?.toLocaleString()} GBP</span>
                          <span>${pkg.priceUsd?.toLocaleString()} USD</span>
                        </div>
                      </div>
                      <Link href="/contact" className={`block text-center py-3 rounded-full font-semibold transition-colors ${pkg.popular ? "bg-coral text-white hover:bg-coral/90" : "bg-ocean text-white hover:bg-ocean-dark"}`}>Enquire About This Package</Link>
                      <p className="text-xs text-muted text-center mt-3">Custom packages available — tell us your needs</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16" aria-label="Custom package">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Need something different?</h2>
          <p className="text-muted mb-8">We can create a custom package tailored to your exact needs.</p>
          <Link href="/contact" className="inline-block bg-ocean text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-ocean-dark transition-colors">Request Custom Package</Link>
        </div>
      </section>
    </>
  );
}
