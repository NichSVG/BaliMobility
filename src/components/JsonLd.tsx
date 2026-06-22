export default function JsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://balimobility.com";

  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Bali Mobility",
    description:
      "Mobility equipment rental in Bali. Scooters, wheelchairs, walker frames, and more delivered to your hotel.",
    url: baseUrl,
    telephone: "+62-821-4652-2084",
    email: "dedikbali@yahoo.com",
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

  const travelAgency = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Bali Mobility",
    description:
      "Mobility equipment rental in Bali. Scooters, wheelchairs, walker frames, and more delivered to your hotel.",
    url: baseUrl,
    telephone: "+62-821-4652-2084",
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
      priceCurrency: "AUD",
      lowPrice: "8",
      highPrice: "250",
      offerCount: "7",
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
