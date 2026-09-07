import { StatIcon, type OperatorStatIcon } from "./OperatorIcons";

type StatTileProps = {
  icon: OperatorStatIcon;
  value: string;
  label: string;
  sub: string;
};

export default function StatTile({ icon, value, label, sub }: StatTileProps) {
  return (
    <div className="col-span-1">
      <div className="flex h-full min-h-[150px] flex-col justify-between rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-5 text-[#101010]">
        <div className="text-[#393939]">
          <StatIcon icon={icon} />
        </div>
        <div>
          <p className="font-urbanist text-3xl font-medium leading-none text-[#101010]">
            {value}
          </p>
          <p className="mt-1.5 font-urbanist text-sm text-[#666]">{label}</p>
          <p className="font-urbanist text-xs text-[#8E8E8E]">{sub}</p>
        </div>
      </div>
    </div>
  );
}
