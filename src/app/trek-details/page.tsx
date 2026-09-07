import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import TrekDetailsHeroImage from "@/components/sections/trek-details/hero/TrekDetailsHeroImage";
import TripInfoSection from "@/components/sections/trek-details/trip-info/TripInfoSection";
import YouMightAlsoLoveSection from "@/components/sections/trek-details/you-might-also-love/YouMightAlsoLoveSection";

export default function TrekDetailsPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-white text-white">
      <TrekCardGlassFilters />
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar bookNowVariant="trekDetails" />
      </header>

      <TrekDetailsHeroImage />
      <TripInfoSection />
      <YouMightAlsoLoveSection />
      <Footer />
    </main>
  );
}
