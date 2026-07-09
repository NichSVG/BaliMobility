import { Metadata } from "next";
import Image from "next/image";
import { client } from "@/lib/sanity";
import { testimonialsQuery } from "@/lib/queries";
import { urlFor } from "@/lib/image";
import PageHeader from "@/components/PageHeader";
import { EMAIL } from "@/lib/contact";

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
  { name: "Sarah M.", location: "Melbourne, Australia", rating: 5, text: "The mobility scooter was a game-changer for our Bali holiday. It was fully charged and waiting at our hotel when we arrived. We explored Seminyak, Ubud, and even Tanah Lot temple — all without worrying about getting tired. Best rental experience ever.", service: "Mobility Scooter" },
  { name: "James & Linda P.", location: "London, UK", rating: 5, text: "We hired a wheelchair for my father and the team delivered it to our villa in Nusa Dua before we even checked in. The chair was in excellent condition and made our family holiday so much more enjoyable. Can't recommend them enough.", service: "Wheelchair" },
  { name: "Tom K.", location: "Sydney, Australia", rating: 5, text: "Booked a full-day tour to Kintamani and the rice terraces. Our driver Putu was fantastic — knowledgeable, patient, and made sure every stop was accessible for my wife who uses a walker. The van had plenty of room and the whole day was seamless.", service: "Day Tour" },
  { name: "Rachel D.", location: "Auckland, New Zealand", rating: 5, text: "Travelling with a toddler and a baby is stressful enough, but Bali Mobility took care of everything. We rented a baby push chair and a car seat — both were clean, safe, and perfect quality. Made getting around Bali so much easier.", service: "Baby Push Chair" },
  { name: "Margaret H.", location: "Brisbane, Australia", rating: 5, text: "The shower seat was exactly what I needed after my hip surgery. It fit perfectly in the hotel bathroom and gave me the confidence to shower safely. Such a simple thing but it made a huge difference to my trip.", service: "Shower Seat" },
  { name: "David & Karen W.", location: "Perth, Australia", rating: 5, text: "We've rented mobility scooters from Bali Mobility three trips in a row now. Every time the scooter is in great condition, fully charged, and delivered on time. The team even remembers our preferences. That's the kind of service that keeps us coming back.", service: "Mobility Scooter" },
  { name: "Chen W.", location: "Singapore", rating: 5, text: "The electric wheelchair rental was brilliant. My mother could explore Bali independently — she loved the freedom. The battery lasted all day and the team showed us how to operate it before we left. Fantastic service.", service: "Electric Wheelchair" },
  { name: "Patricia & John R.", location: "Dublin, Ireland", rating: 5, text: "We booked a half-day tour to Tanah Lot and it was the highlight of our trip. Our driver was wonderful — helped John with his walker at every stop and knew exactly where to go for the best sunset views. Already planning our next visit.", service: "Day Tour" },
  { name: "Angela F.", location: "Toronto, Canada", rating: 5, text: "The walker frame rental was perfect for my mum. It was sturdy, easy to fold, and the team delivered it to our hotel in Sanur. They even adjusted the height for her before leaving. Such thoughtful, caring service.", service: "Walker Frame" },
  { name: "Michael & Susan T.", location: "Christchurch, New Zealand", rating: 5, text: "We rented a baby car seat for our 2-year-old and it was installed perfectly in our taxi. The team met us at the airport and had everything ready. Made travelling with a toddler in Bali so much less stressful. Highly recommend.", service: "Baby Car Seat" },
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
        image="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80"
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
                    {t.service && (
                      <div className="text-xs text-ocean font-medium mt-0.5">{t.service}</div>
                    )}
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
            href={`mailto:${EMAIL}?subject=My Bali Mobility Review`}
            className="inline-block bg-ocean text-white px-6 py-3 rounded-full font-semibold hover:bg-ocean-dark transition-colors"
          >
            Share Your Story
          </a>
        </div>
      </section>
    </>
  );
}
