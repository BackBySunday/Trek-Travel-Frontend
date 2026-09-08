import SectionIntro from "@/components/layout/SectionIntro";

export default function WhyTrekWithUsIntro() {
  return (
    <SectionIntro
      title={
        <>
          More Than a Trek, <span className="text-white">It&apos;s an Experience</span>
        </>
      }
      description={
        <>
          Thoughtfully planned adventures, experienced guides, and unforgettable
          trails, everything you need to make every journey count.
        </>
      }
      titleClassName="w-full max-w-[1120px] text-[#666] lg:text-nowrap"
      descriptionClassName="max-w-[591px] text-[#8C8C8C]"
    />
  );
}
