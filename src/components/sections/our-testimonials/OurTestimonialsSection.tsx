import SectionBadge from "@/components/layout/SectionBadge";
import OurTestimonialsIntro from "./OurTestimonialsIntro";
import TestimonialsCarousel from "./TestimonialsCarousel";

export default function OurTestimonialsSection() {
  return (
    <section className="w-full bg-white px-4 py-12 text-[#101010] sm:py-16 lg:px-5 lg:py-20">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 text-center sm:gap-6">
        <SectionBadge>Our Testimonials</SectionBadge>
        <OurTestimonialsIntro />
        <TestimonialsCarousel />
      </div>
    </section>
  );
}
