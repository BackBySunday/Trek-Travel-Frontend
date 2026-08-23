import SectionIntro from "@/components/layout/SectionIntro";

export default function TopCategoriesIntro() {
  return (
    <SectionIntro
      title={
        <>
          <span className="text-[#101010]">Unforgettable</span> Moments across{" "}
          <span className="text-[#101010]">India&apos;s Greatest Trails</span>
        </>
      }
      description={
        <>
          Experience breathtaking sunrises, explore hidden mountain trails, and
          create memories across the Sahyadris, Uttarakhand, and Himachal.
        </>
      }
    />
  );
}
