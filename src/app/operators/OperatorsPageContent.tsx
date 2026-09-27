import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import OperatorProfileSection from "@/components/sections/operators/operator-profile/OperatorProfileSection";
import type { OperatorPageData } from "@/lib/operator";

export default function OperatorsPageContent({ slug, data }: { slug: string; data: OperatorPageData }) {
  const { operator } = data;
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
          name: operator.name,
          item: `${siteUrl}/operators/${slug}`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: operator.name,
      url: `${siteUrl}/operators/${slug}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: operator.homeBase,
        addressCountry: "IN",
      },
      ...(operator.reviewCount > 0
        ? {
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: operator.rating.toFixed(1),
              reviewCount: String(operator.reviewCount),
            },
          }
        : {}),
    },
  ];

  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[var(--bg)] text-white [--bg:#eef1f6]">
      <JsonLd data={jsonLd} />
      <TrekCardGlassFilters />
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar />
      </header>

      <OperatorProfileSection {...data} />
      <Footer />
    </main>
  );
}
