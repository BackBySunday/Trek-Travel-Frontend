"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const HERO_IMAGES = [
  "/Hero/sahyadri-fort-sunrise.png",
  "/Hero/mountain-ridge-trail.jpg",
  "/Hero/misty-hills-dawn.jpg",
  "/Hero/western-ghats-cliff.jpg",
];

export default function HeroBackgroundSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % HERO_IMAGES.length);
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion) {
      return;
    }

    const intervalId = window.setInterval(goToNext, 7500);
    return () => window.clearInterval(intervalId);
  }, [goToNext]);

  return (
    <>
      <div className="absolute inset-x-0 top-0 -z-10 h-[calc(100svh+30px)] overflow-hidden rounded-b-[30px] bg-[#121722]">
        {HERO_IMAGES.map((src, index) => (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={index === 0}
            sizes="100vw"
            className="object-cover transition-opacity duration-1000 ease-in-out"
            style={{ opacity: index === activeIndex ? 1 : 0 }}
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),rgba(0,0,0,0.46))]" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-[calc(100svh+30px)]">
        <div className="pointer-events-auto absolute bottom-[3.25rem] right-6 flex items-center gap-2 sm:right-8 md:bottom-16">
          {HERO_IMAGES.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Show hero image ${index + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                index === activeIndex
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
