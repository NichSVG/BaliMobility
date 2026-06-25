import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { siteSettingsQuery } from "@/lib/queries";
import VisualEditingOverlay from "@/components/VisualEditing";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import MobileMenu from "@/components/MobileMenu";
import { WHATSAPP_NUMBER, PHONE_DISPLAY, EMAIL, ADDRESS, BUSINESS_HOURS, DEFAULT_WHATSAPP_MSG } from "@/lib/contact";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/equipment", label: "Equipment" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Reviews" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://balimobility.com"),
  title: {
    default: "Wheelchair & Mobility Scooter Rental Bali | Bali Mobility",
    template: "%s | Bali Mobility",
  },
  description:
    "Rent wheelchairs, mobility scooters, walker frames and more in Bali. Free delivery to your hotel. Family-run equipment rental service since 2010.",
  keywords: [
    "wheelchair rental Bali",
    "mobility scooter hire Bali",
    "wheelchair hire Bali",
    "disability equipment rental Bali",
    "accessible holidays Bali",
    "mobility aids Bali",
    "walker rental Bali",
    "Bali wheelchair accessible",
  ],
  authors: [{ name: "Bali Mobility" }],
  creator: "Bali Mobility",
  publisher: "Bali Mobility",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Bali Mobility",
    title: "Bali Mobility — Accessible Holidays in Bali",
    description:
      "Bali Mobility — mobility equipment rental in Bali. Scooters, wheelchairs, walkers, and more delivered to your hotel.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Bali Mobility - Accessible Holidays in Paradise",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Bali Mobility — Accessible Holidays in Bali",
    description:
      "Bali Mobility — mobility equipment rental in Bali. Scooters, wheelchairs, walkers, and more delivered to your hotel.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await client.fetch(siteSettingsQuery).catch(() => null);

  const phone = settings?.phone || PHONE_DISPLAY;
  const email = settings?.email || EMAIL;
  const address = settings?.address || ADDRESS;
  const whatsapp = settings?.whatsappNumber || WHATSAPP_NUMBER;
  const whatsappMsg = settings?.whatsappMessage || DEFAULT_WHATSAPP_MSG;
  const hours = settings?.businessHours || BUSINESS_HOURS;

  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <VisualEditingOverlay />
        <Analytics />
        <JsonLd />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        {/* Header */}
        <header className="bg-white shadow-sm sticky top-0 z-50">
          <nav
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16"
            aria-label="Main navigation"
          >
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-ocean">
              <span aria-hidden="true">♿</span>
              <span>Bali Mobility</span>
            </Link>

            <ul className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-foreground hover:text-ocean transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="bg-coral text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-coral/90 transition-colors"
                >
                  Book Now
                </Link>
              </li>
            </ul>

            <MobileMenu />
          </nav>
        </header>

        {/* Main content */}
        <main id="main-content" className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="bg-foreground text-white" role="contentinfo">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div>
                <h3 className="font-bold text-lg mb-3">Bali Mobility</h3>
                <p className="text-sm text-gray-300 whitespace-pre-line">{address}</p>
                <p className="text-sm text-gray-300 mt-2">
                  {phone}
                  <br />
                  {email}
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Equipment</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/mobility-scooter-rental-bali" className="hover:text-white transition-colors">Mobility Scooters</Link></li>
                  <li><Link href="/wheelchair-rental-bali" className="hover:text-white transition-colors">Wheelchairs</Link></li>
                  <li><Link href="/tours" className="hover:text-white transition-colors">Day Tours</Link></li>
                  <li><Link href="/equipment" className="hover:text-white transition-colors">Walker Frames</Link></li>
                  <li><Link href="/equipment" className="hover:text-white transition-colors">Baby Equipment</Link></li>
              <li><Link href="/shower-chair-rental-bali" className="hover:text-white transition-colors">Shower Chairs</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                  <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
                  <li><Link href="/testimonials" className="hover:text-white transition-colors">Reviews</Link></li>
                  <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                  <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Hours</h4>
                <p className="text-sm text-gray-300 whitespace-pre-line mb-4">{hours}</p>
                <Link
                  href="/contact"
                  className="inline-block bg-coral text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-coral/90 transition-colors"
                >
                  Plan My Holiday
                </Link>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-6 text-center text-sm text-gray-400">
              © {new Date().getFullYear()} Bali Mobility. All rights reserved.
            </div>
          </div>
        </footer>

        {/* WhatsApp floating button */}
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(whatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg z-50 transition-transform hover:scale-110"
          aria-label="Chat with us on WhatsApp"
        >
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
        </a>
      </body>
    </html>
  );
}

