import Image from "next/image";

const partnerLogos = [
  {
    src: "/Our-Partners/card-1.png",
    alt: "Hollywood Adventure partner logo",
    width: 206,
    height: 88,
  },
  {
    src: "/Our-Partners/card-2.png",
    alt: "Panda Experiences partner logo",
    width: 150,
    height: 150,
  },
  {
    src: "/Our-Partners/card-3.png",
    alt: "Odus Pure Travels partner logo",
    width: 172,
    height: 150,
  },
  {
    src: "/Our-Partners/card-4.png",
    alt: "On the Go Tours partner logo",
    width: 126,
    height: 88,
  },
  {
    src: "/Our-Partners/card-5.png",
    alt: "Travel partner logo",
    width: 150,
    height: 150,
  },
];

const logoGroup = Array.from({ length: 3 }, () => partnerLogos).flat();

export default function PartnersCarousel() {
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
            className="flex shrink-0 items-center gap-6 pr-6 sm:gap-8 sm:pr-8 lg:gap-10 lg:pr-10"
            aria-hidden={groupIndex === 1}
          >
            {logoGroup.map((logo, logoIndex) => (
              <Image
                key={`${logo.src}-${groupIndex}-${logoIndex}`}
                src={logo.src}
                alt={groupIndex === 0 && logoIndex < partnerLogos.length ? logo.alt : ""}
                width={logo.width}
                height={logo.height}
                className="h-14 w-auto max-w-none object-contain sm:h-[72px]"
                sizes="180px"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
