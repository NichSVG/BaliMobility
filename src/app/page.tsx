import Link from "next/link";
import { client } from "@/lib/sanity";
import { featuredTestimonialsQuery, servicesQuery } from "@/lib/queries";

const stats = [
  { value: "15+", label: "Years in business" },
  { value: "2,000+", label: "Happy clients" },
  { value: "30+", label: "Nationalities served" },
  { value: "4.9★", label: "Average rating" },
];

// Fallback data if CMS is empty
const fallbackServices = [
  { icon: "🦽", title: "Equipment Hire", description: "Mobility scooters, electric wheelchairs, walkers, and more — delivered to your hotel.", ctaLink: "/equipment" },
  { icon: "🤝", title: "Personal Carers", description: "Experienced day and night carers who understand disability support.", ctaLink: "/services" },
  { icon: "🚐", title: "Accessible Transport", description: "Mobility car with driver, airport collection and return.", ctaLink: "/services" },
  { icon: "🏖️", title: "Holiday Packages", description: "All-inclusive packages with tours, accommodation, and full support.", ctaLink: "/packages" },
  { icon: "👶", title: "Family Services", description: "Pushchairs, car seats, nannies, and babysitters for families.", ctaLink: "/services" },
  { icon: "🤿", title: "Activities & Tours", description: "Accessible diving, fishing, massages, and Bali cultural nights.", ctaLink: "/packages" },
];

const fallbackTestimonials = [
  { name: "Sarah M.", location: "Melbourne, Australia", rating: 5, text: "Bali Mobility made our family holiday absolutely stress-free. The scooter was waiting at our hotel and the carers were incredible. We could actually relax for the first time in years." },
  { name: "James & Linda P.", location: "London, UK", rating: 5, text: "We were nervous about visiting Bali with my wheelchair, but the team handled everything — airport pickup, accessible transport, even arranged a beach wheelchair. Truly life-changing." },
  { name: "Tom K.", location: "Sydney, Australia", rating: 5, text: "The all-inclusive package was worth every penny. They thought of everything we didn't even know we needed. Highly recommend for anyone with mobility challenges." },
];

export default async function Home() {
  const [services, testimonials] = await Promise.all([
    client.fetch(servicesQuery).catch(() => []),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
  ]);

  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-ocean text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-ocean via-ocean-dark to-ocean opacity-90" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Bali without limits —{" "}
              <span className="text-ocean-light">disability holidays made easy</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Stress-free mobility holidays with equipment hire, personal carers,
              accessible transport, and all-inclusive packages. We handle everything
              so you can enjoy paradise.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors text-center">
                Plan My Holiday
              </Link>
              <Link href="/packages" className="inline-block border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-colors text-center">
                View Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-sand-dark" aria-label="Company statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl md:text-4xl font-bold text-ocean">{stat.value}</div>
                <div className="text-sm text-muted mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-16 md:py-24" aria-label="Our services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything you need for a carefree holiday</h2>
            <p className="text-muted max-w-2xl mx-auto">From mobility equipment to personal carers, we provide complete support so you can focus on enjoying Bali.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((service: any) => (
              <Link key={service.title} href={service.ctaLink || "/services"} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-sand-dark group">
                <div className="text-4xl mb-4" aria-hidden="true">{service.icon}</div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-ocean transition-colors">{service.title}</h3>
                <p className="text-muted text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Package */}
      <section className="bg-ocean text-white py-16 md:py-24" aria-label="Featured package">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block bg-ocean-light text-ocean-dark text-sm font-semibold px-3 py-1 rounded-full mb-4">Most Popular</span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">7-Night Bali Discovery Package</h2>
              <p className="text-white/90 mb-6">Our most popular all-inclusive package. Everything you need for a perfect accessible holiday in Bali — from accommodation to activities.</p>
              <ul className="space-y-3 mb-8">
                {["7 nights accessible accommodation", "Mobility equipment hire included", "Personal carer (daytime)", "Accessible transport with driver", "3 guided accessible tours", "Airport collection & return"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-ocean-light shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex items-end gap-2 mb-6">
                <span className="text-4xl font-bold">From AUD $1,899</span>
                <span className="text-white/70 pb-1">/ person</span>
              </div>
              <Link href="/packages" className="inline-block bg-coral text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">View All Packages</Link>
            </div>
            <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
              <div className="aspect-[4/3] bg-white/5 rounded-xl flex items-center justify-center text-6xl">🌴</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-sand" aria-label="Client testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What our guests say</h2>
            <p className="text-muted">Real stories from travellers who experienced Bali with our support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {displayTestimonials.map((t: any) => (
              <div key={t.name} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex gap-1 mb-3" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <blockquote className="text-foreground mb-4">&ldquo;{t.text}&rdquo;</blockquote>
                <div>
                  <div className="font-semibold">{t.name}</div>
                  <div className="text-sm text-muted">{t.location}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/testimonials" className="text-ocean font-semibold hover:underline">Read more reviews →</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24" aria-label="Get started">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready for your Bali adventure?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">Tell us about your needs and we&apos;ll create a personalised holiday plan. No obligation, no pressure — just friendly advice.</p>
          <Link href="/contact" className="inline-block bg-coral text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-coral/90 transition-colors">Plan My Holiday</Link>
        </div>
      </section>
    </>
  );
}
