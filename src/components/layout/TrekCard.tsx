
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export type TrekCardProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  durationTag: string;
  rating: string;
  altitude: string;
  difficulty: string;
  duration: string;
  operator: string;
  price: string;
  href?: string;
};

function StarIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4"
      aria-hidden="true"
    >
      <path
        d="M7.62759 4.50698C8.68314 2.61344 9.21091 1.66667 9.99996 1.66667C10.789 1.66667 11.3168 2.61344 12.3723 4.50698L12.6454 4.99686C12.9454 5.53494 13.0953 5.80399 13.3292 5.9815C13.563 6.15902 13.8542 6.22492 14.4367 6.35671L14.967 6.47669C17.0167 6.94046 18.0416 7.17235 18.2854 7.95644C18.5293 8.74053 17.8306 9.55756 16.4332 11.1916L16.0717 11.6143C15.6746 12.0787 15.4761 12.3109 15.3867 12.5981C15.2974 12.8853 15.3274 13.1951 15.3875 13.8146L15.4421 14.3787C15.6534 16.5588 15.759 17.6489 15.1207 18.1335C14.4823 18.6181 13.5227 18.1763 11.6036 17.2926L11.1071 17.064C10.5617 16.8129 10.289 16.6874 9.99996 16.6874C9.71091 16.6874 9.43823 16.8129 8.89286 17.064L8.39635 17.2926C6.47719 18.1763 5.51761 18.6181 4.87925 18.1335C4.24089 17.6489 4.34652 16.5588 4.55779 14.3787L4.61245 13.8146C4.67248 13.1951 4.7025 12.8853 4.61318 12.5981C4.52386 12.3109 4.32531 12.0787 3.92822 11.6143L3.56671 11.1916C2.16933 9.55756 1.47065 8.74053 1.71448 7.95644C1.95831 7.17235 2.98317 6.94046 5.03291 6.47669L5.5632 6.35671C6.14567 6.22492 6.4369 6.15902 6.67074 5.9815C6.90459 5.80399 7.05456 5.53495 7.35451 4.99686L7.62759 4.50698Z"
        fill="#FEB531"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4.5 shrink-0 sm:h-4.5 sm:w-4.5"
      aria-hidden="true"
    >
      <path
        d="M7.00007 13.9303L21.0001 14.0697M15.8023 19.2674L21.0001 14.0697L15.6978 8.76741"
        stroke="#101010"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrekMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="font-urbanist text-[10px] leading-tight text-[#5E5E5E] sm:text-[11px]">
        {label}
      </p>
      <p className="mt-0.5 truncate font-urbanist text-[11px] leading-tight text-[#101010] sm:mt-1 sm:text-[13px]">
        {value}
      </p>
    </div>
  );
}

export function TrekCardGlassFilters() {
  return (
    <svg className="pointer-events-none absolute h-0 w-0 opacity-0" aria-hidden="true">
      <filter id="trek-btn-glass" primitiveUnits="objectBoundingBox">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.018" numOctaves="2" seed="24" result="map" />
        <feGaussianBlur in="SourceGraphic" stdDeviation="0.02" result="blur" />
        <feDisplacementMap in="blur" in2="map" scale="1" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

function TrekPill({ children }: { children: ReactNode }) {
  return (
    <span className="trek-pill-glass h-6 px-2 font-urbanist text-[11px] leading-none sm:h-7 sm:px-3 sm:text-xs">
      <span className="trek-pill-glass-effect" />
      <span className="trek-pill-glass-tint" />
      <span className="trek-pill-glass-shine" />
      <span className="trek-pill-glass-content">{children}</span>
    </span>
  );
}

export default function TrekCard({
  title,
  description,
  image,
  alt,
  durationTag,
  rating,
  altitude,
  difficulty,
  duration,
  operator,
  price,
  href = "/trek-details",
}: TrekCardProps) {
  return (
    <Link
      href={href}
      className="flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-[#F6F7F7] text-left no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#101010] focus-visible:ring-offset-4 sm:rounded-[22px]"
      aria-label={`View details for ${title}`}
    >
      <div className="relative h-36 w-full overflow-hidden rounded-2xl sm:h-[230px] sm:rounded-[22px] lg:h-[250px]">
        <Image
          src={image}
          alt={alt}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end gap-1.5 bg-gradient-to-t from-black/30 to-transparent p-2.5 sm:gap-2 sm:p-4">
          <TrekPill>
            {durationTag}
          </TrekPill>
          <TrekPill>
            <StarIcon />
            {rating}
          </TrekPill>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-3 sm:gap-5 sm:p-5">
        <div className="space-y-1.5 sm:space-y-2">
          <h3 className="line-clamp-2 font-urbanist text-base font-semibold leading-tight text-[#1A1A17] sm:text-xl">
            {title}
          </h3>
          <p className="line-clamp-2 font-urbanist text-xs font-medium leading-4 text-[rgba(25,25,25,0.70)] sm:text-sm sm:leading-5">
            {description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-3 sm:grid-cols-4 sm:gap-x-4 sm:gap-y-4">
          <TrekMeta label="Altitude" value={altitude} />
          <TrekMeta label="Difficulty" value={difficulty} />
          <TrekMeta label="Duration" value={duration} />
          <TrekMeta label="Operator" value={operator} />
        </div>

        <div className="mt-auto border-t border-dashed border-[rgba(26,26,23,0.35)] pt-3 sm:pt-4">
          <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex min-w-0 items-end gap-1">
              <p className="font-[family:var(--font-ibm-plex-sans)] text-lg font-semibold leading-none text-[#101010] sm:text-xl">
                {price}
              </p>
              <p className="pb-0.5 font-[family:var(--font-ibm-plex-sans)] text-[11px] font-medium leading-none text-[#5E5E5E] sm:text-xs">
                /person
              </p>
            </div>
            <span
              className="inline-flex h-8 w-full shrink-0 items-center justify-between gap-1.5 rounded-full bg-[rgba(42,42,42,0.84)] py-1 pl-3 pr-1 font-urbanist text-xs font-medium text-white transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-9 sm:w-fit sm:gap-2 sm:pr-1.5 sm:text-sm"
            >
              <span className="text-nowrap">Book Now</span>
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white">
                <ArrowIcon />
              </span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
