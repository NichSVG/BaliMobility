interface Stat {
  value: string;
  label: string;
  icon?: string;
}

interface StatsSectionProps {
  stats?: Stat[];
  background?: string;
}

const bgMap: Record<string, string> = {
  white: "bg-white",
  gray: "bg-gray-50",
  ocean: "bg-ocean text-white",
};

export function StatsSection({ stats = [], background = "white" }: StatsSectionProps) {
  const bgClass = bgMap[background] || bgMap.white;
  const isLight = background !== "ocean";

  return (
    <section className={`${bgClass} border-b border-gray-100 shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              {stat.icon && <div className="text-2xl mb-2">{stat.icon}</div>}
              <div className={`text-4xl md:text-5xl font-bold mb-2 ${isLight ? "text-ocean" : "text-white"}`}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium ${isLight ? "text-gray-600" : "text-white/80"}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
