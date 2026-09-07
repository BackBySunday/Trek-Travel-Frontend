"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const cards = [
  {
    title: "Sahyadri Adventures",
    description:
      "Explore rugged forts, misty valleys, waterfalls, and sunrise trails around Pune.",
    image: "/Hero/card-1.png",
    alt: "Trekkers climbing rocks near a lake",
  },
  {
    title: "Mountain Escapes",
    description:
      "Find scenic ridges, peaceful trails, and weekend treks built for every explorer.",
    image: "/Hero/card-2.png",
    alt: "Vertical trek destination preview",
  },
  {
    title: "Wild Trail Moments",
    description:
      "Step into open landscapes, forest paths, and memorable group adventures.",
    image: "/Hero/card-3.png",
    alt: "Vertical adventure destination preview",
  },
];

export default function TrekCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % cards.length);
    }, 3500);

    return () => window.clearInterval(intervalId);
  }, []);

  const orderedCards = [
    cards[activeIndex],
    cards[(activeIndex + 1) % cards.length],
    cards[(activeIndex + 2) % cards.length],
  ];

  return (
    <div className="mt-6 flex w-full max-w-[1140px] items-start justify-center gap-3 overflow-visible transition-transform duration-500 md:w-[calc(100vw-2rem)] md:translate-x-[clamp(5rem,8.75vw,7.75rem)] md:justify-end lg:mt-8 lg:max-w-[1080px] lg:translate-x-[clamp(6.75rem,10.5vw,9.75rem)] xl:max-w-[1180px] xl:translate-x-[clamp(8rem,12vw,12rem)]">
      <article className="flex w-full max-w-[270px] -translate-y-2 flex-col items-center gap-2 text-left transition-all duration-500 sm:max-w-[300px] lg:max-w-[325px] 2xl:max-w-[355px] 2xl:gap-3">
        <Image
          src={orderedCards[0].image}
          alt={orderedCards[0].alt}
          width={400}
          height={250}
          priority
          className="h-[122px] w-full rounded-[15px] object-cover sm:h-[142px] lg:h-[156px] 2xl:h-[182px]"
        />

        <div className="flex w-full flex-col items-start gap-1.5 2xl:gap-2">
          <h2 className="w-full font-urbanist text-base text-[#FFF] sm:text-[17px] lg:text-[17px] 2xl:text-xl">
            {orderedCards[0].title}
          </h2>
          <p className="w-full font-urbanist text-xs leading-snug tracking-[0.02em] text-[#FFF] sm:text-sm lg:text-sm 2xl:text-[15px]">
            {orderedCards[0].description}
          </p>
        </div>
      </article>

      <div className="hidden translate-y-2 overflow-visible transition-all duration-500 md:block">
        <div className="inline-flex items-start gap-3">
          {orderedCards.slice(1).map((card) => (
            <button
              key={card.title}
              type="button"
              className="group shrink-0 overflow-hidden rounded-[15px] transition-transform hover:-translate-y-1"
              onClick={() =>
                setActiveIndex(cards.findIndex((item) => item.title === card.title))
              }
              aria-label={`Show ${card.title}`}
            >
              <Image
                src={card.image}
                alt={card.alt}
                width={280}
                height={360}
                className="h-[184px] w-[144px] rounded-[15px] object-cover opacity-90 transition-opacity group-hover:opacity-100 lg:h-[206px] lg:w-[160px] xl:h-[218px] xl:w-[170px] 2xl:h-[248px] 2xl:w-[192px]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
