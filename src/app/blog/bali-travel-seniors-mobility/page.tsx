import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Bali Travel Guide for Seniors with Limited Mobility",
  description:
    "Planning a Bali holiday as a senior with mobility challenges? Your complete guide to accessible accommodation, transport, activities, and equipment rental.",
  alternates: {
    canonical: "/blog/bali-travel-seniors-mobility",
  },
};

export default function BlogPost() {
  return (
    <>
      <PageHeader
        title="Bali Travel Guide for Seniors"
        subtitle="Travel Guide"
        description="Bali is a wonderful destination for seniors — here's how to make the most of it with limited mobility."
        variant="warm"
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted mb-8">
              Bali is increasingly popular with senior travellers, and for good reason — it&apos;s affordable, beautiful, and the Balinese people are incredibly warm and welcoming. If you have limited mobility, here&apos;s everything you need to know.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Best Areas to Stay</h2>
            <p className="text-muted mb-4">
              Not all areas of Bali are equally accessible. Here are our top picks for seniors:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Sanur:</strong> Flat terrain, paved beachside boardwalk, quieter atmosphere. Our top recommendation.</li>
              <li><strong>Nusa Dua:</strong> Resort area with excellent accessibility, manicured paths, calm beaches.</li>
              <li><strong>Seminyak:</strong> Good restaurants and shops, but some uneven footpaths.</li>
              <li><strong>Ubud:</strong> Beautiful but hilly. Best if you have a mobility scooter or companion.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Essential Equipment</h2>
            <p className="text-muted mb-4">
              We recommend considering these items for a comfortable trip:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Mobility scooter:</strong> For independent exploration of flat areas like Sanur and Nusa Dua</li>
              <li><strong>Wheelchair:</strong> For all-day comfort and indoor activities</li>
              <li><strong>Walker frame:</strong> For extra stability when walking short distances</li>
              <li><strong>Shower seat:</strong> For safer bathing in your hotel bathroom</li>
              <li><strong>Toilet seat riser:</strong> For easier sitting and standing</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Accessible Activities</h2>
            <p className="text-muted mb-4">
              Bali has many activities that are enjoyable with limited mobility:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Sanur boardwalk:</strong> Flat, paved, beautiful ocean views. Perfect for morning or evening walks.</li>
              <li><strong>Temple visits:</strong> Many temples have accessible paths. Tanah Lot and Uluwatu have some accessible areas.</li>
              <li><strong>Cooking classes:</strong> Many cooking schools accommodate wheelchair users.</li>
              <li><strong>Spa and massage:</strong> Bali is famous for affordable spa treatments.</li>
              <li><strong>Shopping:</strong> Sanur and Seminyak have many accessible shops and galleries.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Practical Tips</h2>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Travel insurance:</strong> Essential. Make sure it covers your specific medical needs.</li>
              <li><strong>Medication:</strong> Bring enough for your entire trip plus extras. Keep in carry-on luggage.</li>
              <li><strong>Hydration:</strong> Bali is hot and humid. Drink plenty of bottled water.</li>
              <li><strong>Rest:</strong> Don&apos;t try to do too much. Plan rest days between activities.</li>
              <li><strong>Hotels:</strong> Ask about accessibility features before booking. Ground floor rooms are easier.</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Getting Around</h2>
            <p className="text-muted mb-4">
              Bali doesn&apos;t have great public transport, but there are good options:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Private driver:</strong> Affordable and convenient. Most drivers are happy to help with mobility equipment.</li>
              <li><strong>Grab (ride-hailing app):</strong> Works well in tourist areas.</li>
              <li><strong>Mobility scooter:</strong> Great for exploring flat areas independently.</li>
              <li><strong>Wheelchair:</strong> Essential for indoor venues and longer outings.</li>
            </ul>

            <div className="bg-sand rounded-xl p-6 mt-8">
              <h3 className="font-bold text-foreground mb-2">Planning a senior trip to Bali?</h3>
              <p className="text-muted mb-4">We can help you choose the right equipment and plan your accessible holiday.</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/contact" className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors">
                  Contact Us
                </Link>
                <a href="https://wa.me/6282146522084" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
