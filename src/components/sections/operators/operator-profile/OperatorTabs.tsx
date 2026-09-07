"use client";

export type OperatorTab = "Treks" | "Videos" | "Gallery" | "About" | "Reviews";

type OperatorTabsProps = {
  activeTab: OperatorTab;
  counts: Partial<Record<OperatorTab, number>>;
  onTabChange: (tab: OperatorTab) => void;
  tabs: OperatorTab[];
};

export default function OperatorTabs({
  activeTab,
  counts,
  onTabChange,
  tabs,
}: OperatorTabsProps) {
  return (
    <div className="mx-auto mt-8 max-w-[1500px] px-[30px]">
      <div className="flex gap-1 overflow-x-auto border-b border-[#E5E5E5] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => {
          const isActive = activeTab === tab;
          const count = counts[tab];

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              aria-current={isActive ? "page" : undefined}
              className={`relative shrink-0 px-4 py-3 font-urbanist text-sm font-medium transition-colors ${
                isActive ? "text-[#101010]" : "text-[#8E8E8E] hover:text-[#666]"
              }`}
            >
              {tab}
              {count !== undefined ? (
              <span className="ml-1.5 text-xs text-[#8E8E8E]">{count}</span>
              ) : null}
              {isActive ? (
                <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-[#101010]" />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
