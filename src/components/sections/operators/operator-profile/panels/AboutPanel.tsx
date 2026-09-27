import Link from "next/link";
import { ArrowRightIcon, StatIcon } from "../OperatorIcons";
import type { Operator, OperatorTrek } from "../OperatorProfileSection";

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
  // upcomingDates only ever holds future departures (filtered server-side)
  const nextDeparture = treks
    .flatMap((trek) => trek.upcomingDates.map((date) => ({ date, trek })))
    .sort((x, y) => x.date.localeCompare(y.date))[0];
  const facts: { icon: "star" | "mountain" | "award" | "calendar"; label: string }[] = [
    ...(operator.verified ? [{ icon: "award" as const, label: "Verified operator" }] : []),
    { icon: "star" as const, label: `Safety rating: ${operator.safetyBand}` },
    ...(operator.responseRate != null ? [{ icon: "calendar" as const, label: `${operator.responseRate}% response rate` }] : []),
    { icon: "mountain" as const, label: `${operator.travellersServed} travellers served` },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="md:col-span-2">
        <div className="flex h-full flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <h2 className="font-urbanist text-xl font-medium text-[#101010]">
            About {operator.name}
          </h2>
          <p className="font-urbanist text-base leading-relaxed text-[#666]">
            {operator.bio || `${operator.name} runs weekend treks out of ${operator.homeBase}.`}
          </p>
          <p className="font-urbanist text-sm text-[#8E8E8E]">
            On BackBySunday since {operator.since}
            {operator.travellersServed > 0 ? ` - ${formatCount(operator.travellersServed)} travellers served` : ""}.
          </p>
          {operator.social.length > 0 ? (
            <div className="mt-1 flex flex-wrap gap-2">
              {operator.social.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-[#D7D7D7] bg-white px-4 py-1.5 font-urbanist text-sm font-medium text-[#101010] hover:border-[#101010]"
                >
                  {link.platform.charAt(0) + link.platform.slice(1).toLowerCase()}
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div>
        <div className="flex h-full flex-col gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <h3 className="font-urbanist text-lg font-medium text-[#101010]">
            At a glance
          </h3>
          {facts.map((credential) => (
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

      {operator.faqs.length > 0 ? (
        <div className="md:col-span-2">
          <div className="flex h-full flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
            <h3 className="font-urbanist text-lg font-medium text-[#101010]">
              Frequently asked questions
            </h3>
            {operator.faqs.map((faq) => (
              <div key={faq.question}>
                <p className="font-urbanist text-base font-semibold text-[#101010]">
                  {faq.question}
                </p>
                {faq.answer ? (
                  <p className="mt-1 font-urbanist text-sm leading-6 text-[#666]">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {operator.policies.length > 0 ? (
        <div>
          <div className="flex h-full flex-col gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
            <h3 className="font-urbanist text-lg font-medium text-[#101010]">
              Operator policies
            </h3>
            <ul className="flex flex-col gap-2.5">
              {operator.policies.map((policy) => (
                <li
                  key={policy}
                  className="flex items-start gap-2 font-urbanist text-sm leading-6 text-[#666]"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#1A1A17]" />
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}

      {nextDeparture ? (
        <div className="md:col-span-3">
          <div className="flex flex-col items-start justify-between gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7 sm:flex-row sm:items-center">
            <div>
              <p className="font-urbanist text-xs font-semibold uppercase tracking-[0.16em] text-[#666]">
                Next departure
              </p>
              <p className="mt-1.5 font-urbanist text-xl text-[#101010]">
                {formatDateShort(nextDeparture.date)} - {nextDeparture.trek.title}
              </p>
            </div>
            <Link
              href={`/trek-details/${nextDeparture.trek.slug}`}
              className="inline-flex items-center gap-2 rounded-full border border-[#D7D7D7] bg-white px-4 py-2 font-urbanist text-sm font-medium text-[#101010] hover:border-[#101010]"
            >
              View this trek
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
