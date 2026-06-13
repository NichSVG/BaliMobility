import Link from "next/link";
import { Metadata } from "next";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Bali Mobility — our mission to make Bali accessible for everyone.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About Us | Bali Mobility",
    description:
      "Learn about Bali Mobility — our mission to make Bali accessible for everyone.",
  },
};

const values = [
  { icon: "❤️", title: "Compassion First", description: "We treat every client with dignity, respect, and genuine care." },
  { icon: "🤝", title: "Reliability", description: "We deliver what we promise. Equipment on time, carers professional, transport ready." },
  { icon: "🌏", title: "Local Knowledge", description: "Born and raised in Bali — we know the accessible spots and hidden gems." },
  { icon: "💬", title: "Clear Communication", description: "Bilingual team with transparent pricing. No surprises, no hidden costs." },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Our Story"
        description="We&apos;re a family-run company in Sanur, Bali, dedicated to making Bali accessible for everyone."
        variant="dark"
        breadcrumbs={[{ label: "About", href: "/about" }]}
      />

      <section className="py-16 md:py-24" aria-label="Our story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Story</h2>
              <div className="space-y-4 text-muted">
                <p>Bali Mobility started with a simple observation: travellers with disabilities were missing out on the beauty of Bali because the support they needed simply didn&apos;t exist.</p>
                <p>Founded over 15 years ago by a local Balinese family with personal experience in disability care, we set out to change that. We began with just two mobility scooters and a car — today, we&apos;ve helped over 2,000 travellers from more than 30 countries experience Bali without limits.</p>
                <p>Our team is bilingual (Indonesian/English), professionally trained in disability support, and deeply passionate about what we do.</p>
                <p>Based on Jl. By Pass Ngurah Rai in Sanur, we operate across Bali — from the beaches of Kuta and Seminyak to the rice terraces of Ubud and the clifftops of Uluwatu.</p>
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
              { title: "15+ Years Experience", desc: "We've been doing this since 2010. We know what works." },
              { title: "2,000+ Happy Clients", desc: "Travellers from 30+ countries trust us. 4.9-star average rating." },
              { title: "Complete Service", desc: "Equipment, carers, transport, tours — we handle everything." },
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
          <h2 className="text-3xl font-bold text-foreground mb-4">Ready to plan your trip?</h2>
          <p className="text-muted mb-8">Get in touch and let us create your perfect accessible Bali holiday.</p>
          <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Plan My Holiday</Link>
        </div>
      </section>
    </>
  );
}
