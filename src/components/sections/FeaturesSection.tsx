import Link from "next/link";

interface Feature {
  icon?: string;
  title: string;
  description?: string;
  link?: string;
}

interface FeaturesSectionProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  columns?: string;
  features?: Feature[];
  background?: string;
}

const colMap: Record<string, string> = {
  "2": "sm:grid-cols-2",
  "3": "sm:grid-cols-2 lg:grid-cols-3",
  "4": "sm:grid-cols-2 lg:grid-cols-4",
};

export function FeaturesSection({
  eyebrow,
  heading,
  description,
  columns = "3",
  features = [],
  background = "white",
}: FeaturesSectionProps) {
  const bgClass = background === "gray" ? "bg-gray-50" : "bg-white";

  return (
    <section className={`py-20 md:py-28 ${bgClass}`}>
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
        <div className={`grid grid-cols-1 ${colMap[columns] || colMap["3"]} gap-8`}>
          {features.map((feature, i) => {
            const card = (
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100 group hover:-translate-y-1">
                {feature.icon && (
                  <div className="w-14 h-14 bg-ocean/10 rounded-xl flex items-center justify-center text-3xl mb-6 group-hover:bg-ocean/20 transition-colors">
                    {feature.icon}
                  </div>
                )}
                <h3 className="text-xl font-semibold mb-3 group-hover:text-ocean transition-colors">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-muted leading-relaxed">{feature.description}</p>
                )}
              </div>
            );

            return feature.link ? (
              <Link key={i} href={feature.link} className="block">
                {card}
              </Link>
            ) : (
              <div key={i}>{card}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
