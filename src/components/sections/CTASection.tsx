import Link from "next/link";

interface CTASectionProps {
  heading: string;
  description?: string;
  buttons?: { text: string; link: string; style?: string }[];
  background?: string;
}

const bgMap: Record<string, string> = {
  ocean: "bg-ocean text-white",
  white: "bg-white text-foreground",
  gray: "bg-gray-50 text-foreground",
};

export function CTASection({
  heading,
  description,
  buttons,
  background = "ocean",
}: CTASectionProps) {
  const bgClass = bgMap[background] || bgMap.ocean;
  const isLight = background !== "ocean";

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{heading}</h2>
        {description && (
          <p className={`text-lg mb-10 max-w-2xl mx-auto leading-relaxed ${isLight ? "text-muted" : "text-white/90"}`}>
            {description}
          </p>
        )}
        {buttons && buttons.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {buttons.map((btn, i) => (
              <Link
                key={i}
                href={btn.link}
                className={`inline-flex items-center justify-center gap-2 px-10 py-4 rounded-lg text-lg font-semibold transition-all ${
                  btn.style === "secondary"
                    ? isLight
                      ? "border-2 border-ocean text-ocean hover:bg-ocean/5"
                      : "bg-white/10 backdrop-blur-sm border-2 border-white text-white hover:bg-white/20"
                    : isLight
                      ? "bg-ocean text-white hover:bg-ocean-dark"
                      : "bg-coral text-white hover:bg-coral/90 shadow-lg"
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
    </section>
  );
}
