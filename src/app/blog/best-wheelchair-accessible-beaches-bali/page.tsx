import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Best Wheelchair Accessible Beaches in Bali",
  description:
    "Discover the most accessible beaches in Bali for wheelchair users. From Sanur to Nusa Dua, here are the beaches where you can enjoy the sand and sea.",
  alternates: {
    canonical: "/blog/best-wheelchair-accessible-beaches-bali",
  },
};

export default function BlogPost() {
  return (
    <>
      <PageHeader
        title="Best Wheelchair Accessible Beaches in Bali"
        subtitle="Travel Guide"
        description="Bali has some beautiful beaches — and some are more accessible than others. Here's our guide for wheelchair users."
        variant="tropical"
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted mb-8">
              Bali&apos;s beaches are world-famous, but not all are easy to access in a wheelchair. After years of helping travellers with mobility challenges, here are our top picks for accessible beach experiences.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">1. Sanur Beach</h2>
            <p className="text-muted mb-4">
              Sanur is our top recommendation for wheelchair users. The beachfront has a <strong>paved boardwalk</strong> that runs for several kilometres along the coast. You can roll along the path, enjoy ocean views, and stop at beachside cafes.
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li>✅ Paved boardwalk along the beach</li>
              <li>✅ Flat, smooth surfaces</li>
              <li>✅ Accessible restaurants and cafes</li>
              <li>✅ Calm water (protected by reef)</li>
              <li>✅ Wheelchair-friendly hotels nearby</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">2. Nusa Dua Beach</h2>
            <p className="text-muted mb-4">
              Nusa Dua is a resort area with well-maintained paths and accessible beach access points. The beaches here are clean and the water is calm — perfect for a relaxed day out.
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li>✅ Well-maintained pathways</li>
              <li>✅ Resort-area accessibility</li>
              <li>✅ Clean, manicured beaches</li>
              <li>✅ Calm swimming conditions</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">3. Kuta Beach</h2>
            <p className="text-muted mb-4">
              Kuta has improved accessibility in recent years. The beachfront walkway is wheelchair-friendly, and there are accessible entry points to the beach. It&apos;s busier than Sanur but has great sunset views.
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li>✅ Beachfront walkway</li>
              <li>✅ Accessible entry points</li>
              <li>⚠️ Can be crowded</li>
              <li>⚠️ Sand can be soft in places</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Tips for Beach Visits</h2>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Go early morning:</strong> Fewer people, cooler temperatures, easier to navigate</li>
              <li><strong>Bring a beach wheelchair:</strong> Wide wheels handle sand much better than standard chairs</li>
              <li><strong>Ask your hotel:</strong> Many resorts have beach wheelchairs available for guests</li>
              <li><strong>Stay near the boardwalk:</strong> You can enjoy the ocean views without going on sand</li>
            </ul>

            <div className="bg-sand rounded-xl p-6 mt-8">
              <h3 className="font-bold text-foreground mb-2">Need mobility equipment for your beach trip?</h3>
              <p className="text-muted mb-4">We deliver wheelchairs and mobility scooters to hotels across Bali.</p>
              <Link href="/contact" className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors">
                Rent Equipment
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
