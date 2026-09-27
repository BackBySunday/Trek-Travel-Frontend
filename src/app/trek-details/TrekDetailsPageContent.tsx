import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import { MobileTripBookingBar } from "@/components/sections/trek-details/trip-info/TripInfoCard";
import TrekDetailsHeroImage from "@/components/sections/trek-details/hero/TrekDetailsHeroImage";
import TrekDetailsSectionNav from "@/components/sections/trek-details/section-nav/TrekDetailsSectionNav";
import TripInfoSection from "@/components/sections/trek-details/trip-info/TripInfoSection";
import YouMightAlsoLoveSection from "@/components/sections/trek-details/you-might-also-love/YouMightAlsoLoveSection";
import { type TrekView, visibleSections } from "@/lib/trek";

export default function TrekDetailsPageContent({ trek }: { trek: TrekView }) {
  const siteUrl = "https://backbysunday.in";
  const pageUrl = `${siteUrl}/trek-details/${trek.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        { "@type": "ListItem", position: 2, name: trek.title, item: pageUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: trek.title,
      description: trek.headline,
      image: trek.photos[0] ?? `${siteUrl}/Hero/card-1.png`,
      url: pageUrl,
      provider: { "@type": "Organization", name: "BackBySunday", url: siteUrl },
    },
  ];

  return (
    <main className="relative isolate min-h-[100svh] overflow-x-clip bg-white text-white">
      <JsonLd data={jsonLd} />
      <TrekCardGlassFilters />
      <header className="relative z-50 mx-auto w-full max-w-7xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6 md:pt-8 lg:px-8 xl:pt-10">
        <Navbar variant="solid" logoSrc="/Footer/footer-logo.png" />
      </header>

      <TrekDetailsHeroImage trek={trek} />
      <div className="bg-white">
        <TrekDetailsSectionNav sections={visibleSections(trek)} />
        <TripInfoSection trek={trek} />
      </div>
      <YouMightAlsoLoveSection currentSlug={trek.slug} />
      <MobileTripBookingBar trek={trek} />
      <Footer />
    </main>
  );
}
