import Navbar from "@/components/Navbar";
import HeaderBadge from "@/components/HeaderBadge";
import HeroTitle from "@/components/HeroTitle";
import SearchBar from "@/components/SearchBar";
import TrekCarousel from "@/components/TrekCarousel";

export default function Home() {
  return (
    <main className="relative isolate flex min-h-[100svh] w-full flex-col items-center overflow-x-hidden bg-white px-4 text-white sm:min-h-[900px] sm:px-6 lg:min-h-[100svh] lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100svh+30px)] overflow-hidden rounded-b-[30px] bg-[url('/hero-background.png')] bg-cover bg-center bg-no-repeat md:bg-fixed">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.46))]" />
      </div>

      {/* Fixed Header Bar */}
      <header className="absolute inset-x-0 top-[max(1rem,env(safe-area-inset-top))] z-50 mx-auto w-full max-w-7xl px-4 sm:top-6 sm:px-6 md:top-8 lg:px-8 xl:top-10">
        <Navbar />
      </header>

      {/* Hero Content Section */}
      <section className="absolute left-0 top-[62px] flex w-full flex-col items-center gap-1 px-4 pt-16 text-center sm:pt-20 md:pt-24 lg:pt-28">
        <HeaderBadge />
        <HeroTitle />
        <SearchBar />
        <TrekCarousel />
      </section>

      <section
        aria-label="Next page"
        className="mt-[calc(100svh+30px)] min-h-screen w-screen bg-white"
      />
    </main>
  );
}
