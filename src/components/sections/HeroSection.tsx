import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/image";

interface HeroSectionProps {
  heading: string;
  subheading?: string;
  image?: any;
  buttons?: { text: string; link: string; style?: string }[];
  overlay?: string;
  height?: string;
}

const heightMap: Record<string, string> = {
  full: "min-h-[90vh]",
  medium: "min-h-[60vh]",
  small: "min-h-[40vh]",
};

const overlayMap: Record<string, string> = {
  dark: "bg-gradient-to-r from-black/70 via-black/50 to-black/30",
  medium: "bg-black/50",
  light: "bg-black/30",
  none: "",
};

export function HeroSection({
  heading,
  subheading,
  image,
  buttons,
  overlay = "dark",
  height = "full",
}: HeroSectionProps) {
  const imageUrl = image
    ? urlFor(image).width(1920).quality(80).url()
    : "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80";

  return (
    <section className={`relative ${heightMap[height] || heightMap.full} flex items-center`}>
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={heading}
          fill
          className="object-cover"
          priority
        />
        {overlayMap[overlay] && (
          <div className={`absolute inset-0 ${overlayMap[overlay]}`} />
        )}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            {heading}
          </h1>
          {subheading && (
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed">
              {subheading}
            </p>
          )}
          {buttons && buttons.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-4">
              {buttons.map((btn, i) => (
                <Link
                  key={i}
                  href={btn.link}
                  className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-lg font-semibold transition-all ${
                    btn.style === "secondary"
                      ? "bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20"
                      : "bg-coral text-white hover:bg-coral/90 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {btn.text}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
