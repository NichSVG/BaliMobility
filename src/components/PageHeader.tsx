import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  breadcrumbs?: { label: string; href: string }[];
  variant?: "ocean" | "tropical" | "warm" | "dark";
  size?: "sm" | "md" | "lg";
  image?: string;
  imageAlt?: string;
}

const variants = {
  ocean: {
    overlay: "bg-gradient-to-r from-ocean/90 via-ocean-dark/80 to-ocean/70",
    text: "text-white",
    accent: "text-ocean-light",
  },
  tropical: {
    overlay: "bg-gradient-to-r from-emerald-900/90 via-emerald-800/80 to-emerald-700/70",
    text: "text-white",
    accent: "text-emerald-200",
  },
  warm: {
    overlay: "bg-gradient-to-r from-amber-900/90 via-amber-800/80 to-amber-700/70",
    text: "text-white",
    accent: "text-amber-200",
  },
  dark: {
    overlay: "bg-gradient-to-r from-slate-900/90 via-slate-800/80 to-slate-900/70",
    text: "text-white",
    accent: "text-slate-300",
  },
};

const defaultImages = {
  ocean: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1920&q=80",
  tropical: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1920&q=80",
  warm: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1920&q=80",
  dark: "https://images.unsplash.com/photo-1501117716987-c8c3ec790c75?w=1920&q=80",
};

const sizes = {
  sm: "py-16 md:py-20",
  md: "py-20 md:py-28",
  lg: "py-24 md:py-32",
};

export default function PageHeader({
  title,
  subtitle,
  description,
  breadcrumbs,
  variant = "ocean",
  size = "md",
  image,
  imageAlt,
}: PageHeaderProps) {
  const style = variants[variant];
  const bgImage = image || defaultImages[variant];
  const altText = imageAlt || `${title} - Bali Mobility`;

  return (
    <section className={`relative ${style.text} overflow-hidden`}>
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={bgImage}
          alt={altText}
          fill
          className="object-cover"
          priority
        />
        <div className={`absolute inset-0 ${style.overlay}`} />
      </div>

      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '32px 32px'
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
                    <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
            <span className={`inline-block ${style.accent} font-semibold text-sm uppercase tracking-widest mb-4`}>
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
