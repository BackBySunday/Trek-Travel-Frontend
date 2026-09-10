import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/layout/JsonLd";
import Navbar from "@/components/layout/Navbar";
import CTASection from "@/components/sections/home/cta/CTASection";
import FeaturedDestinationsSection from "@/components/sections/home/featured-destinations/FeaturedDestinationsSection";
import HeroBackgroundSlider from "@/components/sections/home/hero/HeroBackgroundSlider";
import HeroSection from "@/components/sections/home/hero/HeroSection";
import OurPartnersSection from "@/components/sections/home/our-partners/OurPartnersSection";
import OurTestimonialsSection from "@/components/sections/home/our-testimonials/OurTestimonialsSection";
import SnapshotsSection from "@/components/sections/home/snapshots/SnapshotsSection";
import TopCategoriesSection from "@/components/sections/home/top-categories/TopCategoriesSection";
import WhyTrekWithUsSection from "@/components/sections/home/why-trek-with-us/WhyTrekWithUsSection";

export default function Home() {
  const siteUrl = "https://backbysunday.in";
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "BackBySunday",
      url: siteUrl,
      logo: `${siteUrl}/Hero/hero-logo.png`,
      email: "hello.backbysunday@gmail.com",
      sameAs: [
        "https://www.facebook.com/backbysunday",
        "https://www.instagram.com/thebackbysunday/",
        "https://x.com/TheBackBySunday",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "BackBySunday",
      url: siteUrl,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Weekend treks and trips in India",
      itemListElement: [
        "Vasota Fort Trek",
        "Lohagad Fort Trek",
        "Rajmachi Trail",
        "Harishchandragad Trek",
        "Kalsubai Peak",
        "Devkund Waterfall",
        "Andharban Forest",
        "Sandhan Valley",
      ].map((name, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${siteUrl}/#treks`,
      })),
    },
  ];

  return (
    <main className="relative isolate flex min-h-[100svh] w-full flex-col items-center overflow-x-hidden bg-[var(--bg)] px-4 text-white [--bg:#eef1f6] sm:min-h-[900px] sm:px-6 lg:min-h-[100svh] lg:px-8">
      <JsonLd data={jsonLd} />
      <HeroBackgroundSlider />

      {/* Fixed Header Bar */}
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar />
      </header>

      <HeroSection />

      <div className="mt-[calc(100svh+30px)] w-screen">
        <TopCategoriesSection />
        <OurPartnersSection />
        <FeaturedDestinationsSection />
        <WhyTrekWithUsSection />
        <SnapshotsSection />
        <OurTestimonialsSection />
        <CTASection />
        <Footer />
      </div>
    </main>
  );
}
