import Link from "next/link";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { featuredTestimonialsQuery, servicesQuery, siteSettingsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";

const stats = [
  { value: "15+", label: "Years Experience", icon: "📅" },
  { value: "2,000+", label: "Happy Guests", icon: "😊" },
  { value: "4.9", label: "Google Rating", icon: "⭐" },
  { value: "100%", label: "Satisfaction", icon: "✅" },
];

const trustBadges = [
  { name: "NDIS Registered", icon: "🛡️" },
  { name: "Licensed & Insured", icon: "📋" },
  { name: "24/7 Support", icon: "📞" },
  { name: "Local Bali Team", icon: "🌴" },
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
  const [services, testimonials, settings] = await Promise.all([
    client.fetch(servicesQuery).catch(() => []),
    client.fetch(featuredTestimonialsQuery).catch(() => []),
    client.fetch(siteSettingsQuery).catch(() => null),
  ]);

  const displayServices = services.length > 0 ? services : fallbackServices;
  const displayTestimonials = testimonials.length > 0 ? testimonials : fallbackTestimonials;
  
  const heroImageUrl = settings?.heroImage 
    ? urlFor(settings.heroImage).width(1920).quality(80).url()
    : "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80";

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={heroImageUrl}
            alt="Beautiful Bali beach with accessible pathways"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl">
            {/* Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
              <span className="text-white text-sm font-medium">Rated 4.9/5 by 500+ guests</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Your mobility holiday
              <br />
              <span className="text-ocean-light">in beautiful Bali</span>
            </h1>
            
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              A family-run company dedicated to making your Bali holiday enjoyable
              and stress-free. We specialise in disability holidays, mobility equipment,
              carers, and accessible transport — so everyone can experience paradise.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-2 bg-coral text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-coral/90 transition-all shadow-lg hover:shadow-xl"
              >
                Plan My Holiday
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link 
                href="/packages" 
                className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all"
              >
                View Packages
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              {trustBadges.map((badge) => (
                <div key={badge.name} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                  <span>{badge.icon}</span>
                  <span className="text-white text-sm font-medium">{badge.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-b border-gray-100 shadow-sm" aria-label="Company statistics">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-ocean mb-2">{stat.value}</div>
                <div className="text-sm font-medium text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Snapshot */}
      <section className="py-20 md:py-28 bg-gray-50" aria-label="Our services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">Our Services</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Disability & family support, wherever you go</h2>
            <p className="text-muted max-w-2xl mx-auto text-lg">From mobility equipment to personal carers and accessible transport, we provide complete support so you can focus on enjoying Bali.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayServices.map((service: any) => (
              <Link 
                key={service.title} 
                href={service.ctaLink || "/services"} 
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-100 group hover:-translate-y-1"
              >
                {service.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={urlFor(service.image).width(600).height(400).quality(80).url()}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center text-3xl m-8 mb-0 group-hover:bg-ocean/20 transition-colors">
                    {service.icon}
                  </div>
                )}
                <div className="p-8">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-ocean transition-colors">{service.title}</h3>
                  <p className="text-muted leading-relaxed">{service.description}</p>
                  <div className="mt-4 text-ocean font-medium text-sm flex items-center gap-2">
                    Learn more
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Package */}
      <section className="py-20 md:py-28" aria-label="Featured package">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Side */}
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={settings?.featuredPackageImage 
                    ? urlFor(settings.featuredPackageImage).width(800).quality(80).url()
                    : "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80"}
                  alt="Accessible resort pool in Bali"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-4 -right-4 md:-right-8 bg-coral text-white rounded-2xl p-4 shadow-xl">
                <div className="text-sm font-medium">From</div>
                <div className="text-3xl font-bold">AUD $1,899</div>
                <div className="text-sm">/ person</div>
              </div>
            </div>

            {/* Content Side */}
            <div>
              <span className="inline-block bg-ocean/10 text-ocean text-sm font-semibold px-4 py-2 rounded-full mb-6">
                ⭐ Most Popular
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">7-Night Bali Discovery Package</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                Our most popular all-inclusive package. Everything you need for a perfect accessible holiday in Bali — from accommodation to activities.
              </p>
              <ul className="space-y-4 mb-8">
                {["7 nights accessible accommodation", "Mobility equipment hire included", "Personal carer (daytime)", "Accessible transport with driver", "3 guided accessible tours", "Airport collection & return"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-tropical/10 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-tropical" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href="/packages" 
                  className="inline-flex items-center justify-center gap-2 bg-ocean text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-ocean-dark transition-colors"
                >
                  View All Packages
                </Link>
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 border-2 border-ocean text-ocean px-8 py-4 rounded-lg text-lg font-semibold hover:bg-ocean/5 transition-colors"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-28 bg-gray-50" aria-label="Client testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">Testimonials</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">What our guests say</h2>
            <p className="text-muted text-lg">Real stories from travellers who experienced Bali with our support.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayTestimonials.map((t: any, i: number) => (
              <div key={t.name} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                {/* Stars */}
                <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <blockquote className="text-foreground mb-6 leading-relaxed text-lg">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  {t.photo ? (
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={urlFor(t.photo).width(96).height(96).quality(80).url()}
                        alt={t.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center text-ocean font-bold text-lg">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-foreground">{t.name}</div>
                    <div className="text-sm text-muted">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/testimonials" 
              className="inline-flex items-center gap-2 text-ocean font-semibold hover:text-ocean-dark transition-colors text-lg"
            >
              Read more reviews
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-28" aria-label="Why choose us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">Why Choose Us</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">A truly unforgettable experience for all</h2>
              <p className="text-muted text-lg mb-8 leading-relaxed">
                We&apos;re a family-run company with deep local knowledge. We take you to well-known
                tourist destinations and hidden beauty spots that mobility-impaired travellers
                can access — making your stay not just a holiday, but an experience you&apos;ll
                want to return to again and again.
              </p>
              <div className="space-y-6">
                {[
                  { title: "Family-Run & Caring", desc: "We&apos;re a local Balinese family who genuinely care about your comfort and wellbeing." },
                  { title: "Local Knowledge", desc: "We know every accessible corner of Bali — tourist spots and hidden gems alike." },
                  { title: "For Everyone", desc: "Whether you have disabilities or young children, we make Bali enjoyable for the whole family." },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">{item.title}</h3>
                      <p className="text-muted">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={settings?.aboutImage 
                    ? urlFor(settings.aboutImage).width(800).quality(80).url()
                    : "https://images.unsplash.com/photo-1604999333679-b86d54738315?w=800&q=80"}
                  alt="Friendly Bali local team"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-28 bg-ocean text-white" aria-label="Get started">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Make it a holiday all the family remembers</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
            With mobility scooters, wheelchairs, walking frames, and carers day or night —
            we&apos;ll make your Bali holiday one you&apos;ll want to return to. Get in touch for
            friendly advice from our local team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="inline-flex items-center justify-center gap-2 bg-coral text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-coral/90 transition-all shadow-lg"
            >
              Plan My Holiday
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link 
              href="https://wa.me/6281234567890?text=Hi%20Bali%20Mobility!%20I'd%20like%20to%20enquire%20about%20a%20holiday."
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-10 py-4 rounded-lg text-lg font-semibold hover:bg-white/20 transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat on WhatsApp
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
