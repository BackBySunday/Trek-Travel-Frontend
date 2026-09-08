import SectionIntro from "@/components/layout/SectionIntro";

export default function OurPartnersIntro() {
  return (
    <SectionIntro
      title={
        <>
          <span className="text-[#101010]">Stronger Together</span>, Better
          Journeys
        </>
      }
      description={
        <>
          We collaborate with trusted partners to create seamless experiences,
          build lasting connections, and make every adventure more memorable,
          meaningful, and rewarding.
        </>
      }
      titleClassName="max-w-full sm:text-nowrap"
      descriptionClassName="max-w-[859px]"
    />
  );
}
