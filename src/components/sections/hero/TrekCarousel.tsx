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
    <div className="mt-8 flex w-full max-w-[1280px] items-start justify-center gap-3 overflow-visible transition-transform duration-500 md:w-[calc(100vw-2rem)] md:translate-x-[clamp(2.25rem,5.25vw,4.5rem)] md:justify-end lg:mt-10 lg:max-w-[1220px] lg:translate-x-[clamp(3rem,6.25vw,5.75rem)] xl:max-w-[1320px] xl:translate-x-[clamp(3.75rem,7.25vw,7.25rem)]">
      <article className="flex w-full max-w-[295px] -translate-y-2 flex-col items-center gap-2 text-left transition-all duration-500 sm:max-w-[325px] lg:max-w-[370px] 2xl:max-w-[405px] 2xl:gap-4">
        <Image
          src={orderedCards[0].image}
          alt={orderedCards[0].alt}
          width={400}
          height={250}
          priority
          className="h-[155px] w-full rounded-[15px] object-cover sm:h-[175px] lg:h-[190px] 2xl:h-[230px]"
        />

        <div className="flex w-full flex-col items-start gap-1.5 2xl:gap-2.5">
          <h2 className="w-full font-urbanist text-base text-[#FFF] sm:text-[17px] lg:text-lg 2xl:text-[22px]">
            {orderedCards[0].title}
          </h2>
          <p className="w-full font-urbanist text-xs leading-snug tracking-[0.02em] text-[#FFF] sm:text-sm lg:text-[15px] 2xl:text-base">
            {orderedCards[0].description}
          </p>
        </div>
      </article>

      <div className="hidden translate-y-2 overflow-visible transition-all duration-500 md:block">
        <div className="inline-flex items-start gap-3 xl:gap-4">
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
                className="h-[215px] w-[162px] rounded-[15px] object-cover opacity-90 transition-opacity group-hover:opacity-100 lg:h-[238px] lg:w-[178px] xl:h-[248px] xl:w-[188px] 2xl:h-[285px] 2xl:w-[215px]"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
