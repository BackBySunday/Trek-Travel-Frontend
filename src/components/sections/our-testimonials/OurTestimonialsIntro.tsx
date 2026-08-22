import SectionIntro from "@/components/layout/SectionIntro";

export default function OurTestimonialsIntro() {
  return (
    <SectionIntro
      title={
        <>
          <span className="text-[#101010]">Loved by Adventurers</span>,{" "}
          Remembered Forever
        </>
      }
      description={
        <>
          Hear from fellow explorers as they share their experiences, cherished
          moments, and unforgettable memories created along the way with us.
        </>
      }
      titleClassName="w-full max-w-[1120px] text-balance !text-[1.75rem] sm:!text-[2rem] md:!text-[2.65rem] lg:!text-[3.35rem] xl:!text-[3.75rem]"
      descriptionClassName="max-w-[865px]"
    />
  );
}
