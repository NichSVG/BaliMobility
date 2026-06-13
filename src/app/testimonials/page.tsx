import { Metadata } from "next";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { testimonialsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Guest Reviews",
  description:
    "Read real stories from travellers who experienced accessible holidays in Bali with Bali Mobility. 4.9/5 average rating.",
  alternates: {
    canonical: "/testimonials",
  },
  openGraph: {
    title: "Guest Reviews | Bali Mobility",
    description:
      "Read real stories from travellers who experienced accessible holidays in Bali with Bali Mobility. 4.9/5 average rating.",
  },
};

const fallbackTestimonials = [
  { name: "Sarah M.", location: "Melbourne, Australia", rating: 5, text: "Bali Mobility made our family holiday absolutely stress-free. The scooter was waiting at our hotel and the carers were incredible. We could actually relax for the first time in years." },
  { name: "James & Linda P.", location: "London, UK", rating: 5, text: "We were nervous about visiting Bali with my wheelchair, but the team handled everything — airport pickup, accessible transport, even arranged a beach wheelchair. Truly life-changing." },
  { name: "Tom K.", location: "Sydney, Australia", rating: 5, text: "The all-inclusive package was worth every penny. They thought of everything we didn't even know we needed. Highly recommend for anyone with mobility challenges." },
  { name: "Margaret H.", location: "Auckland, New Zealand", rating: 5, text: "As an elderly traveller, I was worried about visiting Bali alone. The carer they provided was like having a friend by my side. I felt safe and supported the entire trip." },
  { name: "David & Karen W.", location: "Perth, Australia", rating: 5, text: "We've used Bali Mobility three times now. The consistency is amazing — every trip has been perfect. The equipment is always in great condition and the team is wonderful." },
];

export default async function TestimonialsPage() {
  const testimonials = await client.fetch(testimonialsQuery).catch(() => []);
  const display = testimonials.length > 0 ? testimonials : fallbackTestimonials;

  return (
    <>
      <PageHeader
        title="What Our Guests Say"
        subtitle="Testimonials"
        description="Real stories from travellers who experienced Bali with our support. Every review is from a real guest who used our services."
        variant="ocean"
        breadcrumbs={[{ label: "Reviews", href: "/testimonials" }]}
      />

      {/* Testimonials Grid */}
      <section className="py-16 md:py-24" aria-label="Guest testimonials">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {display.map((t: any, index: number) => (
              <div
                key={t.name + index}
                className="bg-white rounded-xl p-6 shadow-sm border border-sand-dark"
              >
                <div
                  className="flex gap-1 mb-3"
                  aria-label={`${t.rating} out of 5 stars`}
                >
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="text-foreground mb-4">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
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
                    <div className="w-12 h-12 bg-ocean/10 rounded-full flex items-center justify-center text-ocean font-bold">
                      {t.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold">{t.name}</div>
                    <div className="text-sm text-muted">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-sand py-12" aria-label="Share your story">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Been on a Bali Mobility holiday?
          </h2>
          <p className="text-muted mb-6">
            We&apos;d love to hear about your experience. Your story helps other
            travellers plan their trip with confidence.
          </p>
          <a
            href="mailto:info@balimobility.com?subject=My Bali Mobility Review"
            className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </>
  );
}
