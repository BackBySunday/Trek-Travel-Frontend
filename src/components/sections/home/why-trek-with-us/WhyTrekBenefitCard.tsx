import type { ReactNode } from "react";

export type WhyTrekBenefitCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
};

export default function WhyTrekBenefitCard({
  icon,
  title,
  description,
}: WhyTrekBenefitCardProps) {
  return (
    <article className="flex h-full flex-col items-start gap-3 rounded-[22px] bg-[#262626] p-4 text-left sm:rounded-[26px] sm:p-5 lg:min-h-[220px] lg:rounded-[30px] xl:min-h-[230px]">
      <div className="liquid-glass-nav flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full p-2 text-[#E3E3E3] xl:h-14 xl:w-14">
        {icon}
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-urbanist text-lg font-medium leading-tight text-white sm:text-xl lg:text-2xl">
          {title}
        </h3>
        <p className="font-urbanist text-sm font-medium leading-snug text-[#888] sm:text-[15px] lg:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}
