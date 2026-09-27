import SectionBadge from "@/components/layout/SectionBadge";
import { getOperatorSummaries } from "@/lib/operators";
import OurPartnersIntro from "./OurPartnersIntro";
import PartnersCarousel from "./PartnersCarousel";

export default async function OurPartnersSection() {
  const operators = await getOperatorSummaries();

  if (operators.length === 0) return null;

  return (
    <section id="partners" className="w-full bg-[var(--bg)] px-3 pb-16 pt-10 text-[#101010] sm:px-6 sm:pt-12 lg:px-[30px]">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 sm:gap-6">
        <SectionBadge>Our Partners</SectionBadge>
        <OurPartnersIntro />
        <PartnersCarousel operators={operators} />
      </div>
    </section>
  );
}
