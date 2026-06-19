import Image from "next/image";
import { client } from "@/lib/sanity";
import { urlFor } from "@/lib/image";
import { testimonialsQuery, featuredTestimonialsQuery } from "@/lib/queries";

interface TestimonialsSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  limit?: number;
  showOnlyFeatured?: boolean;
  background?: string;
}

export async function TestimonialsSection({
  eyebrow = "Testimonials",
  heading = "What our guests say",
  description,
  limit = 3,
  showOnlyFeatured = true,
  background = "gray",
}: TestimonialsSectionProps) {
  const query = showOnlyFeatured ? featuredTestimonialsQuery : testimonialsQuery;
  const allTestimonials = await client.fetch(query).catch(() => []);
  const testimonials = allTestimonials.slice(0, limit);

  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          {eyebrow && (
            <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">
              {eyebrow}
            </span>
          )}
          {heading && (
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {heading}
            </h2>
          )}
          {description && (
            <p className="text-muted text-lg">{description}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t: any) => (
            <div key={t._id} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-foreground mb-6 leading-relaxed text-lg">
                &ldquo;{t.text}&rdquo;
              </blockquote>
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
      </div>
    </section>
  );
}
