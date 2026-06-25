import { PHONE_DISPLAY, EMAIL } from "@/lib/contact";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balimobility.com";

export function LocalBusinessJsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bali Mobility",
    description:
      "Mobility equipment rental in Bali. Scooters, wheelchairs, walker frames, and more delivered to your hotel.",
    url: baseUrl,
    telephone: PHONE_DISPLAY,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Perumahan Griya Carik No.16 Bona Kelod",
      addressLocality: "Blahbatuh, Gianyar",
      addressRegion: "Bali",
      postalCode: "80581",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.5815,
      longitude: 115.3470,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "16:00",
      },
    ],
    priceRange: "$$",
    image: `${baseUrl}/og-image.jpg`,
    sameAs: [
      "https://www.facebook.com/balimobility",
      "https://www.instagram.com/balimobility",
      "https://www.tripadvisor.com/balimobility",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "500",
      bestRating: "5",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}

export function TravelAgencyJsonLd() {
  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bali Mobility",
    description:
      "Mobility equipment rental in Bali. Scooters, wheelchairs, walker frames, and more delivered to your hotel.",
    url: baseUrl,
    telephone: PHONE_DISPLAY,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Perumahan Griya Carik No.16 Bona Kelod",
      addressLocality: "Blahbatuh, Gianyar",
      addressRegion: "Bali",
      postalCode: "80581",
      addressCountry: "ID",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "8",
      highPrice: "250",
      offerCount: "7",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgency) }}
    />
  );
}

type BreadcrumbItem = {
  name: string;
  url: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
    />
  );
}

export function ProductJsonLd({ name, description, price, currency = "USD" }: { name: string; description: string; price: string; currency?: string }) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    offers: {
      "@type": "Offer",
      price,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: "Bali Mobility",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
    />
  );
}

export default function JsonLd() {
  return (
    <>
      <LocalBusinessJsonLd />
      <TravelAgencyJsonLd />
    </>
  );
}
