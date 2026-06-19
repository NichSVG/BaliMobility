import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/image";

interface Point {
  title: string;
  description?: string;
}

interface ImageTextSectionProps {
  eyebrow?: string;
  heading?: string;
  text?: string;
  points?: Point[];
  image: any;
  imageAlt?: string;
  imagePosition?: string;
  button?: { text: string; link: string };
  background?: string;
}

export function ImageTextSection({
  eyebrow,
  heading,
  text,
  points,
  image,
  imageAlt,
  imagePosition = "right",
  button,
  background = "white",
}: ImageTextSectionProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";
  const imageUrl = urlFor(image).width(800).quality(80).url();

  const contentEl = (
    <div>
      {eyebrow && (
        <span className="inline-block text-ocean font-semibold text-sm uppercase tracking-wider mb-4">
          {eyebrow}
        </span>
      )}
      {heading && (
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{heading}</h2>
      )}
      {text && <p className="text-muted text-lg mb-8 leading-relaxed">{text}</p>}
      {points && points.length > 0 && (
        <div className="space-y-6 mb-8">
          {points.map((point, i) => (
            <div key={i} className="flex gap-4">
              <div className="w-12 h-12 bg-ocean/10 rounded-xl flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-ocean" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-lg mb-1">{point.title}</h3>
                {point.description && <p className="text-muted">{point.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {button && (
        <Link
          href={button.link}
          className="inline-flex items-center justify-center gap-2 bg-ocean text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-ocean-dark transition-colors"
        >
          {button.text}
        </Link>
      )}
    </div>
  );

  const imageEl = (
    <div className="relative rounded-2xl overflow-hidden shadow-2xl">
      <Image
        src={imageUrl}
        alt={imageAlt || heading || ""}
        width={800}
        height={600}
        className="w-full h-auto"
      />
    </div>
  );

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {imagePosition === "left" ? (
            <>
              <div className="md:order-1">{contentEl}</div>
              <div className="md:order-0">{imageEl}</div>
            </>
          ) : (
            <>
              <div>{contentEl}</div>
              <div>{imageEl}</div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
