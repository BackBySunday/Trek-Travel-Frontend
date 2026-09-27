import { Suspense } from "react";
import type { Metadata } from "next";
import Footer from "@/components/layout/Footer";
import { TrekItemsProvider } from "@/components/providers/TrekItemsProvider";
import { getFilterDefs, getTrekSearchItems } from "@/lib/trekCards";
import Navbar from "@/components/layout/Navbar";
import SearchFeedPage from "@/components/search/SearchFeedPage";

export const metadata: Metadata = {
  title: "Search Treks",
  description:
    "Search BackBySunday treks by destination, region, difficulty, operator, price, and departure.",
  alternates: {
    canonical: "/search",
  },
};

export const dynamic = "force-dynamic";

export default async function SearchPage() {
  const [trekItems, filterDefs] = await Promise.all([getTrekSearchItems(), getFilterDefs()]);
  return (
    <TrekItemsProvider items={trekItems} filterDefs={filterDefs}>
    <main className="min-h-screen bg-[var(--bg)] [--bg:#eef1f6]">
      <header className="relative z-50 mx-auto w-full max-w-7xl px-4 pt-[max(1rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6 md:pt-8 lg:px-8 xl:pt-10">
        <Navbar variant="solid" logoSrc="/Footer/footer-logo.png" />
      </header>
      <Suspense fallback={<div className="min-h-[60vh]" />}>
        <SearchFeedPage />
      </Suspense>
      <Footer />
    </main>
    </TrekItemsProvider>
  );
}
