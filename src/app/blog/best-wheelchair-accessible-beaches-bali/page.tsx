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

            <p className="text-muted mb-4">
              <strong>Sanur Beach</strong> is our top recommendation for wheelchair users. The beachfront has a paved boardwalk that runs for several kilometres along the coast. You can roll along the path, enjoy ocean views, and stop at beachside cafes. The surfaces are flat and smooth, there are accessible restaurants and cafes, and the water is calm (protected by a reef). There are wheelchair-friendly hotels nearby too.
            </p>

            <p className="text-muted mb-4">
              <strong>Nusa Dua Beach</strong> is a resort area with well-maintained paths and accessible beach access points. The beaches here are clean and the water is calm — perfect for a relaxed day out. The pathways are well-maintained and the resort-area accessibility is excellent.
            </p>

            <p className="text-muted mb-4">
              <strong>Kuta Beach</strong> has improved accessibility in recent years. The beachfront walkway is wheelchair-friendly, and there are accessible entry points to the beach. It&apos;s busier than Sanur but has great sunset views. Just note that it can be crowded and the sand can be soft in places.
            </p>

            <p className="text-muted mb-6">
              <strong>Tips for beach visits:</strong> Go early morning for fewer people and cooler temperatures. Bring a beach wheelchair if you have one — wide wheels handle sand much better than standard chairs. Ask your hotel if they have beach wheelchairs available. And stay near the boardwalk so you can enjoy ocean views without going on sand.
            </p>

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
