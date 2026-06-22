import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bali Mobility — a family-run company dedicated to making your mobility holiday in Bali enjoyable and stress-free.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Bali Mobility",
    description:
      "Learn about Bali Mobility — a family-run company dedicated to making your mobility holiday in Bali enjoyable and stress-free.",
  },
};

const values = [
  { icon: "❤️", title: "People Who Care", description: "We genuinely care about your comfort and wellbeing throughout your stay." },
  { icon: "🤝", title: "Family-Run", description: "A local Balinese family business — we treat every guest like part of our family." },
  { icon: "🌏", title: "Local Knowledge", description: "Born and raised in Bali — we know the accessible spots and hidden gems alike." },
  { icon: "🦽", title: "Complete Equipment", description: "Mobility scooters, wheelchairs, walker frames — everything you need, delivered to you." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Our Story"
        description="A family-run company on the beautiful island of Bali, dedicated to making your mobility holiday enjoyable and stress-free."
        variant="dark"
        image="https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1920&q=80"
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="py-16 md:py-24" aria-label="Our story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted">
                <p>Bali Mobility is a family-run company situated on the beautiful island of Bali. We are dedicated to making your mobility holiday enjoyable and stress free.</p>
                <p>Our company specialises in mobility equipment rental for those who need help getting around and families with young children. We provide quality equipment delivered directly to your hotel or villa.</p>
                <p>Our local knowledge means we understand the needs of mobility-impaired travellers. We ensure you have the right equipment to enjoy all the well-known tourist destinations and many out-of-the-way local beauty spots most visitors never see.</p>
                <p>We will make your stay not just a holiday for the disabled and those lacking mobility, but a truly enjoyable experience for all of you — regardless of disabilities.</p>
              </div>
            </div>
            <div className="bg-sand rounded-2xl p-8">
              <div className="aspect-[4/3] bg-ocean/10 rounded-xl flex items-center justify-center text-6xl">🏝️</div>
              <p className="text-sm text-muted text-center mt-4">Sanur, Bali — our home base</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24" aria-label="Our values">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What We Stand For</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-sand rounded-xl p-6 text-center">
                <div className="text-4xl mb-3" aria-hidden="true">{v.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{v.title}</h3>
                <p className="text-sm text-muted">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ocean text-white py-16 md:py-24" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Bali Mobility?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Complete Mobility Solutions", desc: "Mobility scooters, wheelchairs, walker frames, shower seats, toilet seats — everything you need." },
              { title: "Local Knowledge", desc: "We understand the needs of mobility-impaired travellers in Bali and ensure you have the right equipment." },
              { title: "A Holiday to Remember", desc: "Not just a holiday — a truly enjoyable experience for the whole family, regardless of disabilities." },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-xl p-6 backdrop-blur-sm">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16" aria-label="Get in touch">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to explore Bali?</h2>
          <p className="text-muted mb-8">With mobility scooters, wheelchairs, walker frames, and more — we&apos;ll make your Bali stay comfortable and stress-free.</p>
          <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Rent Equipment</Link>
        </div>
      </section>
    </>
  );
}
