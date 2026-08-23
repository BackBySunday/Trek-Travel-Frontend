import SectionBadge from "@/components/layout/SectionBadge";
import OurPartnersIntro from "./OurPartnersIntro";
import PartnersCarousel from "./PartnersCarousel";

export default function OurPartnersSection() {
  return (
    <section className="w-full bg-white px-3 pb-16 pt-10 text-[#101010] sm:px-6 sm:pt-12 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 sm:gap-6">
        <SectionBadge>Our Partners</SectionBadge>
        <OurPartnersIntro />
        <PartnersCarousel />
      </div>
    </section>
  );
}
