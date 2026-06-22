import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Bali Accessibility Blog — Travel Tips & Guides",
  description:
    "Expert guides and tips for accessible travel in Bali. Wheelchair accessibility, mobility scooter guides, and travel advice for people with disabilities.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Bali Accessibility Blog | Bali Mobility",
    description:
      "Expert guides and tips for accessible travel in Bali.",
  },
};

const posts = [
  {
    slug: "wheelchair-vs-mobility-scooter-bali",
    title: "Wheelchair vs Mobility Scooter for Bali: Which Should You Rent?",
    excerpt: "Planning a Bali trip and not sure whether to rent a wheelchair or mobility scooter? We compare both options for Bali's unique conditions.",
    date: "2026-06-20",
    readTime: "5 min read",
    category: "Equipment Guides",
  },
  {
    slug: "best-wheelchair-accessible-beaches-bali",
    title: "Best Wheelchair Accessible Beaches in Bali",
    excerpt: "Discover the most accessible beaches in Bali for wheelchair users. From Sanur to Nusa Dua, here's where you can enjoy the sand and sea.",
    date: "2026-06-18",
    readTime: "6 min read",
    category: "Travel Guides",
  },
  {
    slug: "how-to-rent-wheelchair-bali",
    title: "How to Rent a Wheelchair in Bali: Complete Guide",
    excerpt: "Everything you need to know about renting a wheelchair in Bali. Delivery, rates, equipment types, and tips from a local rental company.",
    date: "2026-06-15",
    readTime: "4 min read",
    category: "Equipment Guides",
  },
  {
    slug: "bali-travel-seniors-mobility",
    title: "Bali Travel Guide for Seniors with Limited Mobility",
    excerpt: "Planning a Bali holiday as a senior with mobility challenges? Here's your complete guide to accessible accommodation, transport, and activities.",
    date: "2026-06-12",
    readTime: "7 min read",
    category: "Travel Guides",
  },
];

export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Bali Accessibility Blog"
        subtitle="Travel Tips & Guides"
        description="Expert guides and tips for accessible travel in Bali. Equipment advice, destination guides, and practical travel tips."
        variant="ocean"
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
      />

      <section className="py-16 md:py-24" aria-label="Blog posts">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white rounded-xl border border-sand-dark overflow-hidden hover:shadow-lg transition-shadow group"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-semibold text-ocean bg-ocean/10 px-3 py-1 rounded-full">{post.category}</span>
                    <span className="text-xs text-muted">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-3 group-hover:text-ocean transition-colors">{post.title}</h2>
                  <p className="text-muted mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">{new Date(post.date).toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" })}</span>
                    <span className="text-ocean font-medium text-sm flex items-center gap-2">
                      Read more
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
