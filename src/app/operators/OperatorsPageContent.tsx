import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import OperatorProfileSection from "@/components/sections/operators/operator-profile/OperatorProfileSection";

export default function OperatorsPageContent() {
  const siteUrl = "https://backbysunday.in";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Operators",
          item: `${siteUrl}/operators`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "JKL Trek & Travel",
      url: `${siteUrl}/operators`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "1284",
      },
    },
  ];

  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[var(--bg)] text-white [--bg:#eef1f6]">
      <JsonLd data={jsonLd} />
      <TrekCardGlassFilters />
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar />
      </header>

      <OperatorProfileSection />
      <Footer />
    </main>
  );
}
