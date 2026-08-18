import SectionIntro from "@/components/layout/SectionIntro";

export default function FeaturedDestinationsIntro() {
  return (
    <SectionIntro
      title={
        <>
          <span className="text-[#101010]">Places to Explore</span>, Memories
          to Keep
        </>
      }
      description={
        <>
          From iconic escapes to hidden gems, discover handpicked destinations
          that inspire wonder and create stories worth sharing.
        </>
      }
      titleClassName="w-fit max-w-full sm:text-nowrap"
      descriptionClassName="max-w-[827px]"
    />
  );
}
