import TrekCard from "@/components/layout/TrekCard";
import { ArrowRightIcon } from "./OperatorIcons";
import type { OperatorTrek } from "./OperatorProfileSection";

function ViewAllTreksButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[rgba(20,20,20,0.84)] py-1 pl-3.5 pr-1 font-urbanist text-sm text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:gap-3 sm:pl-4 sm:text-lg"
    >
      <span className="text-nowrap">View all treks</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-[#101010] sm:h-10 sm:w-10">
        <ArrowRightIcon />
      </span>
    </button>
  );
}

export default function MoreTreksSection({ treks }: { treks: OperatorTrek[] }) {
  return (
    <div className="mt-14 flex w-full flex-col items-center">
      <h2 className="w-full font-urbanist text-2xl font-medium text-[#101010]">
        More treks on Back by Sunday
      </h2>
      <div className="mt-6 grid w-full grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
        {treks.map((trek) => (
          <TrekCard key={trek.id} {...trek} comingSoon={false} />
        ))}
      </div>
      <div className="mt-5 flex w-full justify-center sm:mt-8">
        <ViewAllTreksButton />
      </div>
    </div>
  );
}
