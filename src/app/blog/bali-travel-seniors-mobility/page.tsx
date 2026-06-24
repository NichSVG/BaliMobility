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

            <p className="text-muted mb-4">
              <strong>Sanur</strong> is our top pick for seniors. It has flat terrain, a paved beachside boardwalk, and a quieter atmosphere. <strong>Nusa Dua</strong> is also excellent — it&apos;s a resort area with well-maintained paths and calm beaches. <strong>Seminyak</strong> has good restaurants and shops, but some uneven footpaths. <strong>Ubud</strong> is beautiful but hilly, so it&apos;s best with a mobility scooter or companion.
            </p>

            <p className="text-muted mb-4">
              For equipment, we recommend considering a mobility scooter for independent exploration of flat areas, a wheelchair for all-day comfort and indoor activities, a walker frame for extra stability when walking short distances, a shower seat for safer bathing, and a toilet seat riser for easier sitting and standing.
            </p>

            <p className="text-muted mb-4">
              Bali has many activities that are enjoyable with limited mobility. The Sanur boardwalk is flat, paved, and has beautiful ocean views. Many temples have accessible paths. Cooking classes often accommodate wheelchair users. Spa and massage treatments are affordable and accessible. And Sanur and Seminyak have many accessible shops and galleries.
            </p>

            <p className="text-muted mb-4">
              Some practical tips: Make sure your travel insurance covers your specific medical needs. Bring enough medication for your entire trip plus extras. Drink plenty of bottled water — Bali is hot and humid. Don&apos;t try to do too much — plan rest days between activities. And ask hotels about accessibility features before booking, as ground floor rooms are easier.
            </p>

            <p className="text-muted mb-6">
              For getting around, a private driver is affordable and convenient. Most drivers are happy to help with mobility equipment. The Grab ride-hailing app works well in tourist areas. And a mobility scooter is great for exploring flat areas independently.
            </p>

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
