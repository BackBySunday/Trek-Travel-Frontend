import TestimonialCard, { type TestimonialCardProps } from "./TestimonialCard";

const testimonialColumns: TestimonialCardProps[][] = [
  [
    {
      name: "Priya Nair",
      trip: "Bhutan Cultural Tour",
      quote:
        "From Paro to Punakha, every destination was breathtaking. The itinerary balanced sightseeing and relaxation beautifully.",
    },
    {
      name: "Neha Joshi",
      trip: "Bhutan Festival Tour",
      quote:
        "A memorable journey filled with culture, stunning landscapes, and warm hospitality. Would definitely book again.",
    },
    {
      name: "Vikram Singh",
      trip: "Bhutan Couple Tour",
      quote:
        "Our honeymoon in Bhutan was magical thanks to Nomadifly. Every detail was thoughtfully planned.",
    },
  ],
  [
    {
      name: "Meera Iyer",
      trip: "Bhutan Family Tour",
      quote:
        "Perfect for families. The pace was comfortable, and everyone from kids to grandparents enjoyed the trip.",
    },
    {
      name: "Aditya Das",
      trip: "Northeast Explorer",
      quote:
        "Northeast India surprised us with its beauty. Shillong, Dawki, and Cherrapunji were absolutely stunning.",
    },
    {
      name: "Rhea Kapoor",
      trip: "Himalayan Trail Escape",
      quote:
        "The guides were calm, organized, and deeply knowledgeable. Every trail felt thoughtfully chosen and safely managed.",
    },
  ],
  [
    {
      name: "Arjun Mehta",
      trip: "Western Ghats Trek",
      quote:
        "A refreshing trek with beautiful viewpoints, clean planning, and a team that handled every detail with care.",
    },
    {
      name: "Kavya Rao",
      trip: "Uttarakhand Adventure",
      quote:
        "The entire journey felt personal and well-paced. We came back with great photos and even better memories.",
    },
    {
      name: "Sahil Khan",
      trip: "Weekend Mountain Trek",
      quote:
        "Smooth booking, excellent coordination, and friendly guides made this one of our easiest weekend getaways.",
    },
  ],
];

export default function TestimonialsCarousel() {
  return (
    <div className="relative mt-10 w-full overflow-hidden sm:mt-12 lg:mt-14">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-20 bg-gradient-to-b from-[var(--bg)] to-transparent"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent"
        aria-hidden="true"
      />

      <div className="grid h-[760px] w-full gap-4 overflow-hidden sm:h-[860px] sm:gap-5 md:grid-cols-3 lg:h-[960px]">
        {testimonialColumns.map((column, columnIndex) => (
          <div
            key={column.map((testimonial) => testimonial.name).join("-")}
            className={`overflow-hidden ${
              columnIndex > 0 ? "hidden md:block" : ""
            }`}
          >
            <div
              className={`testimonials-marquee-column flex flex-col gap-4 sm:gap-5 ${
                columnIndex === 1
                  ? "testimonials-marquee-down"
                  : "testimonials-marquee-up"
              }`}
            >
              {[0, 1].map((groupIndex) => (
                <div
                  key={groupIndex}
                  className="flex flex-col gap-4 sm:gap-5"
                  aria-hidden={groupIndex === 1}
                >
                  {column.map((testimonial) => (
                    <TestimonialCard
                      key={`${testimonial.name}-${groupIndex}`}
                      {...testimonial}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
