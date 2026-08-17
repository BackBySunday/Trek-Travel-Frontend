import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/hero/HeroSection";
import TopCategoriesSection from "@/components/sections/top-categories/TopCategoriesSection";

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
      </div>
    </main>
  );
}
