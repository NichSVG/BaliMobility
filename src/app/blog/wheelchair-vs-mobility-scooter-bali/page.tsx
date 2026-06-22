import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Wheelchair vs Mobility Scooter for Bali: Which Should You Rent?",
  description:
    "Planning a Bali trip and not sure whether to rent a wheelchair or mobility scooter? We compare both options for Bali's unique conditions, terrain, and travel needs.",
  alternates: {
    canonical: "/blog/wheelchair-vs-mobility-scooter-bali",
  },
  openGraph: {
    title: "Wheelchair vs Mobility Scooter for Bali | Bali Mobility",
    description:
      "Compare wheelchairs and mobility scooters for your Bali holiday. Which is right for your needs?",
  },
};

export default function BlogPost() {
  return (
    <>
      <PageHeader
        title="Wheelchair vs Mobility Scooter for Bali"
        subtitle="Equipment Guide"
        description="Planning a Bali trip and not sure which to rent? Here's our honest comparison based on years of helping travellers."
        variant="ocean"
      />

      <article className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted mb-8">
              One of the most common questions we get from travellers is: <strong>should I rent a wheelchair or a mobility scooter for Bali?</strong> The answer depends on your mobility level, where you&apos;re staying, and what you plan to do.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Mobility Scooter: Best for Independent Exploration</h2>
            <p className="text-muted mb-4">
              A mobility scooter is ideal if you can transfer yourself on and off, and want the freedom to explore independently. Here&apos;s what to consider:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Range:</strong> Up to 20km per charge — enough for a full day of sightseeing</li>
              <li><strong>Speed:</strong> Max 8 km/h (walking pace) — safe and comfortable</li>
              <li><strong>Foldable:</strong> Fits in most car boots for transport to attractions</li>
              <li><strong>Best for:</strong> Shopping areas, footpaths, smooth roads, hotel grounds</li>
              <li><strong>Not ideal for:</strong> Very uneven terrain, steep hills, sandy beaches</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Wheelchair: Best for All-Day Comfort</h2>
            <p className="text-muted mb-4">
              A wheelchair is the better choice if you need full-time seating support or prefer someone to push you. Here&apos;s the breakdown:
            </p>
            <ul className="space-y-2 text-muted mb-6">
              <li><strong>Comfort:</strong> Designed for extended sitting with good back support</li>
              <li><strong>Lightweight:</strong> Easy to fold and transport</li>
              <li><strong>Versatile:</strong> Works in restaurants, hotels, temples, and most tourist spots</li>
              <li><strong>Best for:</strong> All-day use, indoor venues, restaurants, temples</li>
              <li><strong>Not ideal for:</strong> Long distances without a companion to push</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Side-by-Side Comparison</h2>
            <div className="overflow-x-auto mb-8">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-sand">
                    <th className="text-left p-3 font-semibold text-foreground">Feature</th>
                    <th className="text-left p-3 font-semibold text-foreground">Mobility Scooter</th>
                    <th className="text-left p-3 font-semibold text-foreground">Wheelchair</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Independence</td>
                    <td className="p-3 text-muted">Self-drive</td>
                    <td className="p-3 text-muted">Companion push</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Range</td>
                    <td className="p-3 text-muted">20km per charge</td>
                    <td className="p-3 text-muted">Unlimited</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Transport</td>
                    <td className="p-3 text-muted">Folds for car</td>
                    <td className="p-3 text-muted">Folds for car</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Indoor use</td>
                    <td className="p-3 text-muted">Limited</td>
                    <td className="p-3 text-muted">Excellent</td>
                  </tr>
                  <tr className="border-b border-sand-dark">
                    <td className="p-3 text-muted">Daily rate</td>
                    <td className="p-3 text-muted">AUD $25</td>
                    <td className="p-3 text-muted">AUD $20</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="text-2xl font-bold text-foreground mt-12 mb-4">Our Recommendation</h2>
            <p className="text-muted mb-4">
              <strong>Choose a mobility scooter if:</strong> You can transfer independently and want to explore at your own pace. Great for shopping areas, beachside paths, and hotel grounds.
            </p>
            <p className="text-muted mb-4">
              <strong>Choose a wheelchair if:</strong> You need all-day seating support, prefer a companion to help, or plan to visit indoor venues like restaurants and temples.
            </p>
            <p className="text-muted mb-8">
              <strong>Can&apos;t decide?</strong> Many of our customers rent both — a scooter for exploring and a wheelchair for evenings and indoor activities. Contact us and we&apos;ll help you choose the right equipment for your specific needs.
            </p>

            <div className="bg-sand rounded-xl p-6 mt-8">
              <h3 className="font-bold text-foreground mb-2">Need help choosing?</h3>
              <p className="text-muted mb-4">Contact us on WhatsApp and we&apos;ll recommend the best equipment for your Bali trip.</p>
              <a href="https://wa.me/6282146522084" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-green-600 transition-colors">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
