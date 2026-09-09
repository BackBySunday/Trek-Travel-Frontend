"use client";

import Image from "next/image";
import { useComingSoon } from "@/components/layout/ComingSoonProvider";

// Sample partner statistics until live organiser data is connected.
const partnerLogos = [
  {
    src: "/Our-Partners/card-1.png",
    alt: "Hollywood Adventure partner logo",
    name: "Hollywood Adventure",
    rating: 4.8,
    treksLed: 240,
    followers: "12.4k",
    width: 206,
    height: 88,
  },
  {
    src: "/Our-Partners/card-2.png",
    alt: "Panda Experiences partner logo",
    name: "Panda Experiences",
    rating: 4.9,
    treksLed: 186,
    followers: "8.6k",
    width: 150,
    height: 150,
  },
  {
    src: "/Our-Partners/card-3.png",
    alt: "Odus Pure Travels partner logo",
    name: "Odus Pure Travels",
    rating: 4.7,
    treksLed: 320,
    followers: "15.2k",
    width: 172,
    height: 150,
  },
  {
    src: "/Our-Partners/card-4.png",
    alt: "On the Go Tours partner logo",
    name: "On the Go Tours",
    rating: 4.8,
    treksLed: 410,
    followers: "21.8k",
    width: 126,
    height: 88,
  },
  {
    src: "/Our-Partners/card-5.png",
    alt: "Travel partner logo",
    name: "Travel Partner",
    rating: 4.6,
    treksLed: 128,
    followers: "6.3k",
    width: 150,
    height: 150,
  },
];

const logoGroup = Array.from({ length: 3 }, () => partnerLogos).flat();

export default function PartnersCarousel() {
  const { openComingSoon } = useComingSoon();

  return (
    <div className="relative mt-8 w-screen overflow-hidden sm:mt-10">
      <div
        className="pointer-events-none absolute -bottom-4 -top-4 left-0 z-10 w-4 bg-[rgba(253,253,253,0.60)] blur-[9.45px] sm:w-5"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-4 -top-4 right-0 z-10 w-4 bg-[rgba(253,253,253,0.60)] blur-[9.45px] sm:w-5"
        aria-hidden="true"
      />
      <div className="partners-marquee flex w-max items-center">
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            className="flex shrink-0 items-center gap-5 pr-5"
            aria-hidden={groupIndex === 1}
          >
            {logoGroup.map((logo, logoIndex) => (
              <button
                key={`${logo.src}-${groupIndex}-${logoIndex}`}
                type="button"
                onClick={() => openComingSoon(logo.name)}
                tabIndex={groupIndex === 0 && logoIndex < partnerLogos.length ? 0 : -1}
                aria-hidden={groupIndex !== 0 || logoIndex >= partnerLogos.length}
                className="group flex h-14 w-[240px] shrink-0 cursor-pointer items-center gap-2 rounded-lg border border-[#dce1e5] bg-white p-1.5 text-left transition-colors hover:border-[#9aa6a0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857] sm:h-[72px]"
              >
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f6f7f7] sm:h-14 sm:w-16">
                  <Image
                    src={logo.src}
                    alt=""
                    fill
                    className="rounded-xl object-contain"
                    sizes="(min-width: 640px) 64px, 56px"
                  />
                </span>
                <span className="min-w-0 flex-1 font-urbanist">
                  <span className="block truncate text-[13px] font-medium text-[#101010]">
                    {logo.name}
                  </span>
                  <span className="mt-1 flex items-center gap-2 whitespace-nowrap text-[11px] text-[#6b7470]" aria-label={`${logo.rating.toFixed(1)} stars, ${logo.treksLed} treks, ${logo.followers} followers`}>
                    <span className="inline-flex items-center gap-1">
                      <span className="text-sm leading-none text-[#d69b26]" aria-hidden="true">&#9733;</span>
                      {logo.rating.toFixed(1)}
                    </span>
                    <span>{logo.treksLed} treks</span>
                    <span title={`${logo.followers} followers`}>{logo.followers}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
