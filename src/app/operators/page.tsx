import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import OperatorProfileSection from "@/components/sections/operators/operator-profile/OperatorProfileSection";

export default function OperatorsPage() {
  return (
    <main className="relative isolate min-h-[100svh] overflow-x-hidden bg-[var(--bg)] text-white [--bg:#eef1f6]">
      <TrekCardGlassFilters />
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar bookNowVariant="trekDetails" />
      </header>

      <OperatorProfileSection />
      <Footer />
    </main>
  );
}
