import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import CTASection from "@/components/sections/home/cta/CTASection";
import FeaturedDestinationsSection from "@/components/sections/home/featured-destinations/FeaturedDestinationsSection";
import HeroSection from "@/components/sections/home/hero/HeroSection";
import OurPartnersSection from "@/components/sections/home/our-partners/OurPartnersSection";
import OurTestimonialsSection from "@/components/sections/home/our-testimonials/OurTestimonialsSection";
import SnapshotsSection from "@/components/sections/home/snapshots/SnapshotsSection";
import TopCategoriesSection from "@/components/sections/home/top-categories/TopCategoriesSection";
import WhyTrekWithUsSection from "@/components/sections/home/why-trek-with-us/WhyTrekWithUsSection";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-[100svh] w-full flex-col items-center overflow-x-hidden bg-white px-4 text-white sm:min-h-[900px] sm:px-6 lg:min-h-[100svh] lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100svh+30px)] overflow-hidden rounded-b-[30px] bg-[url('/Hero/hero-background.png')] bg-cover bg-center bg-no-repeat md:bg-fixed">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.46))]" />
      </div>

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
