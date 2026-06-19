import Image from "next/image";
import { urlFor } from "@/lib/image";

interface GalleryImage {
  image: any;
  caption?: string;
  alt?: string;
}

interface GallerySectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  images?: GalleryImage[];
  columns?: string;
}

const colMap: Record<string, string> = {
  "2": "grid-cols-2",
  "3": "grid-cols-2 md:grid-cols-3",
  "4": "grid-cols-2 md:grid-cols-4",
};

export function GallerySection({
  eyebrow,
  heading,
  description,
  images = [],
  columns = "3",
}: GallerySectionProps) {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(eyebrow || heading || description) && (
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
              <p className="text-muted max-w-2xl mx-auto text-lg">{description}</p>
            )}
          </div>
        )}
        <div className={`grid ${colMap[columns] || colMap["3"]} gap-4`}>
          {images.map((item, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image
                src={urlFor(item.image).width(800).height(600).quality(80).url()}
                alt={item.alt || item.caption || heading || "Gallery image"}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {item.caption && (
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="text-white text-sm font-medium">{item.caption}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
