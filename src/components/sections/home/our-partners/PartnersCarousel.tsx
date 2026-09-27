import Image from "next/image";
import Link from "next/link";
import type { OperatorSummary } from "@/lib/operators";

export default function PartnersCarousel({ operators }: { operators: OperatorSummary[] }) {
  // The marquee needs enough tiles to fill the width, so short lists are repeated.
  const repeat = Math.max(1, Math.ceil(6 / Math.max(1, operators.length)));
  const logoGroup = Array.from({ length: repeat }, () => operators).flat();

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
              <Link
                key={`${logo.id}-${groupIndex}-${logoIndex}`}
                href={`/operators/${logo.slug}`}
                aria-hidden={groupIndex !== 0 || logoIndex >= operators.length}
                tabIndex={groupIndex === 0 && logoIndex < operators.length ? 0 : -1}
                className="flex h-14 w-[240px] shrink-0 items-center gap-2 rounded-lg border border-[#dce1e5] bg-white p-1.5 text-left transition-colors hover:border-[#9aa6a0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857] sm:h-[72px]"
              >
                <span className="relative h-10 w-14 shrink-0 overflow-hidden rounded-xl bg-[#f6f7f7] sm:h-14 sm:w-16">
                  {logo.logoUrl ? (
                    <Image
                      src={logo.logoUrl}
                      alt=""
                      fill
                      unoptimized={/^https?:/.test(logo.logoUrl)}
                      className="rounded-xl object-cover"
                      sizes="(min-width: 640px) 64px, 56px"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center font-urbanist text-lg font-semibold text-[#101010]">
                      {logo.name.charAt(0)}
                    </span>
                  )}
                </span>
                <span className="min-w-0 flex-1 font-urbanist">
                  <span className="block truncate text-[13px] font-medium text-[#101010]">
                    {logo.name}
                  </span>
                  <span className="mt-1 flex items-center gap-2 whitespace-nowrap text-[11px] text-[#6b7470]">
                    <span className="inline-flex items-center gap-1">
                      <span className="text-sm leading-none text-[#d69b26]" aria-hidden="true">&#9733;</span>
                      {logo.reviewCount > 0 ? logo.rating.toFixed(1) : "New"}
                    </span>
                    <span>{logo.trekCount} {logo.trekCount === 1 ? "trek" : "treks"}</span>
                    {logo.city ? <span>{logo.city}</span> : null}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
