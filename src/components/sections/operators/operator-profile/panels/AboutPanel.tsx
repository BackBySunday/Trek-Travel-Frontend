import Link from "next/link";
import { ArrowRightIcon, StatIcon } from "../OperatorIcons";
import type { Operator, OperatorTrek } from "../OperatorProfileSection";

const currentDate = new Date("2026-09-07T00:00:00+05:30");

const credentials = [
  { icon: "star" as const, label: "Insured on every departure" },
  { icon: "mountain" as const, label: "Max 15 trekkers per lead" },
  { icon: "award" as const, label: "Wilderness first-aid certified" },
  { icon: "calendar" as const, label: "Leave No Trace practices" },
];

function formatCount(value: number) {
  if (value >= 1000) {
    return `${Number((value / 1000).toFixed(1))}k`;
  }

  return String(value);
}

function formatDateShort(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
  }).format(new Date(value));
}

export default function AboutPanel({
  operator,
  treks,
}: {
  operator: Operator;
  treks: OperatorTrek[];
}) {
  const nextDeparture = treks
    .flatMap((trek) => trek.upcomingDates)
    .filter((date) => new Date(date).getTime() >= currentDate.getTime())
    .sort()[0];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="flex h-full flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <h2 className="font-urbanist text-xl font-medium text-[#101010]">
            About {operator.name}
          </h2>
          <p className="font-urbanist text-base leading-relaxed text-[#666]">
            {operator.bio} We have been running trips out of {operator.homeBase}{" "}
            since {operator.since}, and in that time have taken more than{" "}
            {formatCount(operator.followerCount)} trekkers into the{" "}
            {operator.region}. Groups stay small so the lead can actually watch
            every person on the climb.
          </p>
          <p className="font-urbanist text-base leading-relaxed text-[#666]">
            Every departure includes transport from the nearest city, forest
            permits, meals on the trail, camping or homestay gear, first-aid
            cover and a certified trek leader. What you carry is a daypack and
            your own boots.
          </p>
        </div>
      </div>

      <div>
        <div className="flex h-full flex-col gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <h3 className="font-urbanist text-lg font-medium text-[#101010]">
            Credentials
          </h3>
          {credentials.map((credential) => (
            <span
              key={credential.label}
              className="flex items-center gap-2.5 font-urbanist text-sm text-[#666]"
            >
              <span className="shrink-0 text-[#101010]">
                <StatIcon icon={credential.icon} />
              </span>
              {credential.label}
            </span>
          ))}
        </div>
      </div>

      {nextDeparture ? (
        <div className="md:col-span-3">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-urbanist text-xs font-semibold uppercase tracking-[0.16em] text-[#666]">
                Next departure
              </p>
              <p className="mt-1.5 font-urbanist text-xl text-[#101010]">
                {formatDateShort(nextDeparture)} - {treks[0].title}
              </p>
            </div>
            <Link
              href="/trek-details"
              className="inline-flex items-center gap-2 rounded-full border border-[#D7D7D7] bg-white px-4 py-2 font-urbanist text-sm font-medium text-[#101010] hover:border-[#101010]"
            >
              See all dates
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
