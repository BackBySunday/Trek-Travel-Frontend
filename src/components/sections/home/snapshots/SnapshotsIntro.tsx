import SectionIntro from "@/components/layout/SectionIntro";

export default function SnapshotsIntro() {
  return (
    <SectionIntro
      title={
        <>
          Unforgettable Moments across{" "}
          <span className="text-[#101010]">India&apos;s Greatest Trails</span>
        </>
      }
      description={
        <>
          Capture breathtaking sunrises, hidden trails, and unforgettable moments
          across the Sahyadris, Uttarakhand, and Himachal.
        </>
      }
      titleClassName="w-full max-w-[980px]"
      descriptionClassName="max-w-[698px]"
    />
  );
}
