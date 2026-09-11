import Image from "next/image";
import Link from "next/link";
import TrekCard from "@/components/layout/TrekCard";
import { ArrowRightIcon } from "../OperatorIcons";
import StatTile from "../StatTile";
import type {
  Operator,
  OperatorReview,
  OperatorTrek,
} from "../OperatorProfileSection";

const currentDate = new Date("2026-09-07T00:00:00+05:30");

const quote =
  "Turned up nervous and came back already planning the next one. The leads never once made me feel slow.";

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Number((value / 1000).toFixed(1))}k`;
  }

  return String(value);
}

type TreksPanelProps = {
  galleryImages: string[];
  operator: Operator;
  reviews: OperatorReview[];
  treks: OperatorTrek[];
};

export default function TreksPanel({
  galleryImages,
  operator,
  reviews,
  treks,
}: TreksPanelProps) {
  const featured = treks[0];
  const years = currentDate.getFullYear() - operator.since;
  const soon = currentDate.getTime() + 90 * 86_400_000;
  const upcomingCount = treks.reduce(
    (count, trek) =>
      count +
      trek.upcomingDates.filter((date) => {
        const time = new Date(date).getTime();
        return time >= currentDate.getTime() && time <= soon;
      }).length,
    0,
  );

  return (
    <>
      <div className="grid grid-cols-2 gap-4 lg:auto-rows-[190px] lg:grid-cols-4">
        {featured ? (
          <div className="col-span-2 lg:row-span-2">
            <Link
              href="/trek-details"
              className="group relative flex h-full min-h-[300px] w-full flex-col justify-end overflow-hidden rounded-[20px] border border-[#E5E5E5] p-6 text-left"
            >
              <Image
                src={featured.coverUrl}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10" />
              <div className="relative">
                <span className="font-urbanist text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  Featured trek
                </span>
                <h3 className="mt-2 font-urbanist text-2xl font-medium text-white">
                  {featured.title}
                </h3>
                <p className="mt-1.5 font-urbanist text-sm text-white/75">
                  {featured.region} - {featured.durationLabel} - {featured.difficulty}
                </p>
                <p className="mt-3 flex items-center gap-2 font-urbanist text-sm font-medium text-white">
                  from {featured.priceFrom}
                  <span className="text-white/50">/person</span>
                  <span className="transition-transform group-hover:translate-x-1">
                    <ArrowRightIcon />
                  </span>
                </p>
              </div>
            </Link>
          </div>
        ) : null}

        <StatTile
          icon="star"
          value={operator.rating.toFixed(1)}
          label="Average rating"
          sub={`${operator.reviewCount} verified reviews`}
        />
        <StatTile
          icon="calendar"
          value={String(upcomingCount)}
          label="Departures"
          sub="in the next 90 days"
        />
        <StatTile
          icon="award"
          value={`${years} yrs`}
          label="On the trail"
          sub={`operating since ${operator.since}`}
        />
        <StatTile
          icon="mountain"
          value={`${operator.treksLed}+`}
          label="Treks led"
          sub={`${formatCount(operator.followerCount)} followers`}
        />

        <div className="col-span-2">
          <blockquote className="flex h-full min-h-[150px] flex-col justify-center rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-6">
            <p className="font-urbanist text-lg italic leading-snug text-[#101010]">
              {quote}
            </p>
            <footer className="mt-3 font-urbanist text-xs text-[#8E8E8E]">
              - {reviews[0]?.name.replace(/\s.*/, "") ?? "Guest"}, on{" "}
              {featured?.title ?? "a recent trek"}
            </footer>
          </blockquote>
        </div>

        <div className="col-span-2">
          <div className="grid h-full min-h-[150px] grid-cols-3 gap-1.5 overflow-hidden rounded-[20px] border border-[#E5E5E5]">
            {galleryImages.slice(0, 3).map((src) => (
              <span key={src} className="relative">
                <Image src={src} alt="" fill sizes="200px" className="object-cover" />
              </span>
            ))}
          </div>
        </div>
      </div>

      <h2 className="mb-6 mt-14 font-urbanist text-2xl font-medium text-[#101010]">
        All {treks.length} treks from {operator.name}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
        {treks.map((trek) => (
          <TrekCard key={trek.id} {...trek} />
        ))}
      </div>
    </>
  );
}
