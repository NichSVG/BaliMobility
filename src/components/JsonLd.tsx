export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balimobility.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bali Mobility",
    description:
      "Accessible holidays and disability travel services in Bali. Equipment hire, personal carers, accessible transport, and all-inclusive packages.",
    url: baseUrl,
    telephone: "+62-812-3456-7890",
    email: "info@balimobility.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. By Pass Ngurah Rai #175",
      addressLocality: "Sanur",
      addressRegion: "Bali",
      postalCode: "80228",
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -8.6901,
      longitude: 115.2534,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "08:00",
        closes: "18:00",
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

  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bali Mobility",
    description:
      "Accessible holidays and disability travel services in Bali. Equipment hire, personal carers, accessible transport, and all-inclusive packages.",
    url: baseUrl,
    telephone: "+62-812-3456-7890",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Jl. By Pass Ngurah Rai #175",
      addressLocality: "Sanur",
      addressRegion: "Bali",
      postalCode: "80228",
      addressCountry: "ID",
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AUD",
      lowPrice: "1899",
      highPrice: "4999",
      offerCount: "3",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(travelAgency) }}
      />
    </>
  );
}
