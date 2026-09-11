import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import TrekDetailsHeroImage from "@/components/sections/trek-details/hero/TrekDetailsHeroImage";
import TripInfoSection from "@/components/sections/trek-details/trip-info/TripInfoSection";
import YouMightAlsoLoveSection from "@/components/sections/trek-details/you-might-also-love/YouMightAlsoLoveSection";

export default function TrekDetailsPageContent() {
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
          name: "Vasota Fort Trek",
          item: `${siteUrl}/trek-details`,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "TouristTrip",
      name: "Vasota Fort Trek from Pune",
      description:
        "A weekend trek to Vasota Fort with forest trails, backwater views, and Sahyadri landscapes near Pune.",
      image: `${siteUrl}/Hero/card-1.png`,
      url: `${siteUrl}/trek-details`,
      provider: {
        "@type": "Organization",
        name: "BackBySunday",
        url: siteUrl,
      },
      touristType: "Weekend trekkers",
    },
  ];

  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-white text-white">
      <JsonLd data={jsonLd} />
      <TrekCardGlassFilters />
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar variant="solid" />
      </header>

      <TrekDetailsHeroImage />
      <TripInfoSection />
      <YouMightAlsoLoveSection />
      <Footer />
    </main>
  );
}
