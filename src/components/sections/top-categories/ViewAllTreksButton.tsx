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

export default function ViewAllTreksButton() {
  return (
    <button
      type="button"
      className="inline-flex h-10 items-center gap-2.5 rounded-full bg-[rgba(20,20,20,0.84)] py-1 pl-3.5 pr-1 font-urbanist text-sm text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-12 sm:gap-3 sm:pl-4 sm:text-lg"
    >
      <span className="text-nowrap">View all treks</span>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white sm:h-10 sm:w-10">
        <ArrowUpRightIcon />
      </span>
    </button>
  );
}
