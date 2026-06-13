import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  variant?: "ocean" | "tropical" | "warm" | "dark";
  size?: "sm" | "md" | "lg";
}

const variants = {
  ocean: {
    bg: "bg-gradient-to-br from-ocean via-ocean-dark to-ocean",
    pattern: "from-ocean/20 via-transparent to-ocean-dark/20",
    text: "text-white",
    accent: "text-ocean-light",
  },
  tropical: {
    bg: "bg-gradient-to-br from-tropical via-tropical-dark to-tropical",
    pattern: "from-tropical/20 via-transparent to-tropical-dark/20",
    text: "text-white",
    accent: "text-green-200",
  },
  warm: {
    bg: "bg-gradient-to-br from-coral via-orange-500 to-coral",
    pattern: "from-coral/20 via-transparent to-orange-500/20",
    text: "text-white",
    accent: "text-orange-200",
  },
  dark: {
    bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
    pattern: "from-gray-900/20 via-transparent to-gray-800/20",
    text: "text-white",
    accent: "text-gray-300",
  },
};

const sizes = {
  sm: "py-12 md:py-16",
  md: "py-16 md:py-24",
  lg: "py-24 md:py-32",
};

export default function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  variant = "ocean",
  size = "md",
}: PageHeaderProps) {
  const style = variants[variant];

  return (
    <section className={`relative ${style.bg} ${style.text} overflow-hidden`}>
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-30">
        {/* Geometric circles */}
        <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${sizes[size]} max-w-4xl`}>
          {/* Breadcrumbs */}
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="mb-6" aria-label="Breadcrumb">
              <ol className="flex items-center gap-2 text-sm">
                <li>
                  <Link href="/" className={`${style.accent} hover:text-white transition-colors`}>
                    Home
                  </Link>
                </li>
                {breadcrumbs.map((crumb, index) => (
                  <li key={crumb.href} className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    {index === breadcrumbs.length - 1 ? (
                      <span className="text-white font-medium">{crumb.label}</span>
                    ) : (
                      <Link href={crumb.href} className={`${style.accent} hover:text-white transition-colors`}>
                        {crumb.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {/* Subtitle */}
          {subtitle && (
            <span className={`inline-block ${style.accent} font-semibold text-sm uppercase tracking-wider mb-4`}>
              {subtitle}
            </span>
          )}

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            {title}
          </h1>

          {/* Description */}
          {description && (
            <p className={`${style.accent} text-lg md:text-xl max-w-2xl leading-relaxed`}>
              {description}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
