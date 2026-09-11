
"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export type TrekCardProps = {
  title: string;
  description: string;
  image: string;
  alt: string;
  durationTag: string;
  rating: string;
  ratingCount?: string;
  altitude: string;
  difficulty: string;
  duration: string;
  spots: string;
  nextDeparture: string;
  operator: string;
  price: string;
  href?: string;
};

function ArrowIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 shrink-0 sm:h-4.5 sm:w-4.5"
      aria-hidden="true"
    >
      <path
        d="M7.00007 13.9303L21.0001 14.0697M15.8023 19.2674L21.0001 14.0697L15.6978 8.76741"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-3 w-3 shrink-0 sm:h-3.5 sm:w-3.5"
      aria-hidden="true"
    >
      <path
        d="M7.62759 4.50698C8.68314 2.61344 9.21091 1.66667 9.99996 1.66667C10.789 1.66667 11.3168 2.61344 12.3723 4.50698L12.6454 4.99686C12.9454 5.53494 13.0953 5.80399 13.3292 5.9815C13.563 6.15902 13.8542 6.22492 14.4367 6.35671L14.967 6.47669C17.0167 6.94046 18.0416 7.17235 18.2854 7.95644C18.5293 8.74053 17.8306 9.55756 16.4332 11.1916L16.0717 11.6143C15.6746 12.0787 15.4761 12.3109 15.3867 12.5981C15.2974 12.8853 15.3274 13.1951 15.3875 13.8146L15.4421 14.3787C15.6534 16.5588 15.759 17.6489 15.1207 18.1335C14.4823 18.6181 13.5227 18.1763 11.6036 17.2926L11.1071 17.064C10.5617 16.8129 10.289 16.6874 9.99996 16.6874C9.71091 16.6874 9.43823 16.8129 8.89286 17.064L8.39635 17.2926C6.47719 18.1763 5.51761 18.6181 4.87925 18.1335C4.24089 17.6489 4.34652 16.5588 4.55779 14.3787L4.61245 13.8146C4.67248 13.1951 4.7025 12.8853 4.61318 12.5981C4.52386 12.3109 4.32531 12.0787 3.92822 11.6143L3.56671 11.1916C2.16933 9.55756 1.47065 8.74053 1.71448 7.95644C1.95831 7.17235 2.98317 6.94046 5.03291 6.47669L5.5632 6.35671C6.14567 6.22492 6.4369 6.15902 6.67074 5.9815C6.90459 5.80399 7.05456 5.53495 7.35451 4.99686L7.62759 4.50698Z"
        fill="#FEB531"
      />
    </svg>
  );
}

function HeartIcon({ saved }: { saved: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={saved ? "currentColor" : "none"}
      xmlns="http://www.w3.org/2000/svg"
      className="h-3.5 w-3.5 transition-colors sm:h-4 sm:w-4"
      aria-hidden="true"
    >
      <path
        d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function VerifiedTickIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-3 w-3 shrink-0 text-white sm:h-3.5 sm:w-3.5"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M8 1.6 9.7 3l2.2-.2.6 2.1L14 7.4l-1.5 1.6.6 2.1-2.2.6L8 13.4l-1.9-1.1-2.2-.6.6-2.1L2 7.4l1.9-1.5.6-2.1L6.7 3z"
      />
      <path fill="#101010" d="M6.9 9.4 5.4 7.9l-.9.9 2.4 2.4 4-4-.9-.9z" />
    </svg>
  );
}

function TrekMeta({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0">
      <p className="font-urbanist text-[9px] leading-tight text-white/70 sm:text-[11px]">
        {label}
      </p>
      <p className="mt-0.5 truncate font-urbanist text-[10px] leading-tight text-white sm:mt-1 sm:text-[13px]">
        {value}
      </p>
    </div>
  );
}

function TrekSpotsMeta({ spots }: { spots: string }) {
  const spotsCount = Number.parseInt(spots, 10);
  const isLow = Number.isFinite(spotsCount) && spotsCount <= 5;

  return (
    <div className="min-w-0">
      <p className="font-urbanist text-[9px] leading-tight text-white/70 sm:text-[11px]">
        Spots
      </p>
      <p
        className={`mt-0.5 truncate font-urbanist text-[10px] leading-tight sm:mt-1 sm:text-[13px] ${
          isLow ? "text-[#f0c07a]" : "text-white"
        }`}
      >
        {spots}
      </p>
    </div>
  );
}

function TrekRatingMeta({
  rating,
  ratingCount,
}: {
  rating: string;
  ratingCount?: string;
}) {
  return (
    <div className="min-w-0">
      <p className="font-urbanist text-[9px] leading-tight text-white/70 sm:text-[11px]">
        Rating
      </p>
      <p className="mt-0.5 flex items-center gap-0.5 font-urbanist text-[10px] leading-tight text-white sm:mt-1 sm:gap-1 sm:text-[13px]">
        <StarIcon />
        {rating}
        {ratingCount && <span className="text-[9px] text-white/65 sm:text-[13px]">({ratingCount})</span>}
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

function TrekPill({
  children,
  indicatorColor,
}: {
  children: ReactNode;
  indicatorColor?: string;
}) {
  return (
    <span className="trek-pill-glass h-5 px-1.5 font-urbanist text-[10px] leading-none sm:h-7 sm:px-3 sm:text-xs">
      <span className="trek-pill-glass-effect" />
      <span className="trek-pill-glass-tint" />
      <span className="trek-pill-glass-shine" />
      <span className="trek-pill-glass-content">
        {indicatorColor && (
          <span
            className="h-1.5 w-1.5 shrink-0 rounded-full"
            style={{ backgroundColor: indicatorColor }}
            aria-hidden="true"
          />
        )}
        {children}
      </span>
    </span>
  );
}

export default function TrekCard({
  title,
  image,
  alt,
  durationTag,
  rating,
  ratingCount,
  altitude,
  difficulty,
  spots,
  nextDeparture,
  operator,
  price,
  href = "/trek-details",
}: TrekCardProps) {
  const [saved, setSaved] = useState(false);
  const [sparkKey, setSparkKey] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const difficultyColor =
    difficulty.toLowerCase().includes("hard")
      ? "#ef4444"
      : difficulty.toLowerCase().includes("moderate")
        ? "#f59e0b"
        : difficulty.toLowerCase().includes("easy")
          ? "#22c55e"
          : undefined;

  return (
    <article
      className="relative flex h-full min-w-0 flex-col overflow-hidden rounded-2xl bg-[#101010] text-left text-white no-underline outline-none focus-visible:ring-2 focus-visible:ring-[#101010] focus-visible:ring-offset-4 sm:rounded-[22px]"
    >
      <Image
        src={image}
        alt={alt}
        fill
        className="object-cover"
        sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/35 to-transparent" />

      <Link
        href={href}
        className="absolute inset-0 z-10"
        aria-label={`View details for ${title}`}
      />

      <button
        type="button"
        onClick={() => {
          setSaved((current) => {
            if (current) {
              setShakeKey((key) => key + 1);
            } else {
              setSparkKey((key) => key + 1);
            }

            return !current;
          });
        }}
        aria-pressed={saved}
        aria-label={saved ? `Remove ${title} from saved` : `Save ${title}`}
        className={`absolute right-2 top-2 z-30 grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-black/30 backdrop-blur-md transition-colors sm:right-3 sm:top-3 sm:h-9 sm:w-9 ${
          saved ? "text-[#ff2d55]" : "text-white"
        }`}
      >
        {sparkKey > 0 && (
          <span
            key={`spark-${sparkKey}`}
            className="pointer-events-none absolute inset-0"
            onAnimationEnd={() => setSparkKey(0)}
            aria-hidden="true"
          >
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="trek-heart-spark absolute left-1/2 top-1/2 h-2 w-0.5 rounded-full bg-[#ff2d55] sm:h-2.5"
                style={{ "--spark-rotate": `${index * 45}deg` } as CSSProperties}
              />
            ))}
          </span>
        )}
        <span
          key={`shake-${shakeKey}`}
          className={shakeKey > 0 ? "trek-heart-shake" : undefined}
        >
          <HeartIcon saved={saved} />
        </span>
      </button>

      <div className="pointer-events-none absolute left-2 top-2 z-20 flex max-w-[calc(100%-44px)] flex-wrap items-center gap-1 sm:left-3 sm:top-3 sm:max-w-none sm:gap-2">
        <TrekPill>{durationTag}</TrekPill>
        <TrekPill indicatorColor={difficultyColor}>{difficulty}</TrekPill>
      </div>
      <style jsx>{`
        .trek-heart-spark {
          animation: trek-heart-spark 420ms ease-out forwards;
        }

        .trek-heart-shake {
          animation: trek-heart-shake 220ms ease-out;
        }

        @keyframes trek-heart-spark {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) rotate(var(--spark-rotate)) translateY(-8px) scaleY(1);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) rotate(var(--spark-rotate)) translateY(-19px) scaleY(0.15);
          }
        }

        @keyframes trek-heart-shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-1px) rotate(-4deg);
          }
          50% {
            transform: translateX(1px) rotate(4deg);
          }
          75% {
            transform: translateX(-0.5px) rotate(-2deg);
          }
        }
      `}</style>

      <div className="pointer-events-none relative z-20 h-[104px] w-full overflow-hidden rounded-2xl sm:h-[210px] sm:rounded-[22px] lg:h-[230px]" />

      <div className="pointer-events-none relative z-20 flex flex-1 flex-col gap-2 p-2.5 sm:gap-5 sm:p-5">
        <div className="space-y-1 sm:space-y-2">
          <h3 className="line-clamp-2 font-urbanist text-sm font-semibold leading-tight text-white sm:text-xl">
            {title}
          </h3>
          <p className="flex items-center gap-1 font-urbanist text-[11px] font-medium leading-4 text-white/80 sm:gap-1.5 sm:text-sm sm:leading-5">
            <span className="truncate">{operator}</span>
            <VerifiedTickIcon />
          </p>
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <div className="grid grid-cols-3 gap-x-1.5 gap-y-2 sm:gap-x-4 sm:gap-y-4">
            <TrekMeta label="Altitude" value={altitude} />
            <TrekSpotsMeta spots={spots} />
            <TrekRatingMeta rating={rating} ratingCount={ratingCount} />
          </div>
          <p className="flex items-center gap-1 font-urbanist text-[9px] font-medium leading-tight text-white/65 sm:gap-1.5 sm:text-xs">
            Next departure
            <span className="h-1 w-1 rounded-full bg-white/35" aria-hidden="true" />
            {nextDeparture}
          </p>
        </div>

        <div className="mt-auto border-t border-dashed border-white/35 pt-2 sm:pt-4">
          <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <div className="flex min-w-0 items-end gap-1">
              <p className="font-[family:var(--font-ibm-plex-sans)] text-base font-semibold leading-none text-white sm:text-xl">
                {price}
              </p>
              <p className="pb-0.5 font-[family:var(--font-ibm-plex-sans)] text-[10px] font-medium leading-none text-white/70 sm:text-xs">
                /person
              </p>
            </div>
            <Link
              href={href}
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-auto inline-flex h-7 w-full shrink-0 items-center justify-between gap-1.5 rounded-full bg-white py-1 pl-2.5 pr-1 font-urbanist text-[11px] font-medium text-[#101010] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-9 sm:w-fit sm:gap-2 sm:pl-3 sm:pr-1.5 sm:text-sm"
            >
              <span className="text-nowrap">Book Now</span>
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#101010] text-white sm:h-6 sm:w-6">
                <ArrowIcon />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
