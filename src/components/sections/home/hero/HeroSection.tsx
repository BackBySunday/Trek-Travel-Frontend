import HeaderBadge from "./HeaderBadge";
import HeroTitle from "./HeroTitle";
import SearchBar from "./SearchBar";

export default function HeroSection() {
  return (
    <section className="absolute left-0 top-[62px] flex w-full flex-col items-center gap-1 px-4 pt-16 text-center sm:pt-20 md:pt-24 lg:pt-28">
      <HeaderBadge />
      <HeroTitle />
      <SearchBar />
    </section>
  );
}
