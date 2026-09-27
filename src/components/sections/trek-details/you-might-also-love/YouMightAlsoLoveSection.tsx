import SectionBadge from "@/components/layout/SectionBadge";
import SectionIntro from "@/components/layout/SectionIntro";
import Link from "next/link";
import TrekCard from "@/components/layout/TrekCard";
import { getTrekSearchItems } from "@/lib/trekCards";

function ArrowUpRightIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 sm:h-7 sm:w-7"
      aria-hidden="true"
    >
      <path
        d="M7.29541 21.8859L21.8861 7.29529M21.8861 18.2383V7.29529H10.9431"
        stroke="#101010"
        strokeWidth="1.82383"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ViewAllTreksButton() {
  return (
    <Link
      href="/search"
      className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[rgba(20,20,20,0.84)] py-1 pl-3.5 pr-1 font-urbanist text-sm text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:gap-3 sm:pl-4 sm:text-lg"
    >
      <span className="text-nowrap">View all treks</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white sm:h-10 sm:w-10">
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}

export default async function YouMightAlsoLoveSection({ currentSlug }: { currentSlug?: string }) {
  const relatedTreks = (await getTrekSearchItems()).filter((trek) => trek.slug !== currentSlug).slice(0, 4);

  if (relatedTreks.length === 0) return null;

  return (
    <section id="related-treks" className="w-full scroll-mt-20 bg-white px-4 py-12 text-[#101010] sm:py-16 lg:px-[30px]">
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 sm:gap-6">
        <div className="flex w-full flex-col items-center">
          <div className="mx-auto flex w-full max-w-[977px] flex-col items-center gap-8">
            <SectionBadge>You Might Also Love</SectionBadge>
            <SectionIntro
              title={
                <>
                  <span className="text-[#101010]">Most Journeys</span> Crafted
                  <br />
                  <span className="text-[#101010]">for Curious Travelers</span>
                </>
              }
              description=""
              titleClassName="w-full max-w-none text-[clamp(2.75rem,6vw,4.5rem)]"
              descriptionClassName="hidden"
            />
          </div>
          <div className="mt-8 grid w-full grid-cols-2 gap-4 sm:gap-5 lg:mt-10 xl:grid-cols-4">
            {relatedTreks.map((trek) => (
              <TrekCard key={trek.id} {...trek} />
            ))}
          </div>
        </div>
        <div className="mt-5 flex w-full justify-center sm:mt-8">
          <ViewAllTreksButton />
        </div>
      </div>
    </section>
  );
}
