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
    <article className="flex h-full flex-col items-start gap-4 rounded-[28px] bg-[#262626] p-5 text-left sm:gap-5 sm:rounded-[34px] sm:p-6 lg:min-h-[310px] lg:rounded-[40px] xl:min-h-[330px]">
      <div className="liquid-glass-nav flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-full p-2.5 text-[#E3E3E3] xl:h-[78px] xl:w-[78px] xl:p-[13px]">
        {icon}
      </div>
      <div className="flex flex-col gap-3 sm:gap-4">
        <h3 className="font-urbanist text-xl font-medium leading-tight text-white sm:text-2xl">
          {title}
        </h3>
        <p className="font-urbanist text-sm font-medium leading-6 text-[#888] sm:text-base sm:leading-7 lg:text-[15px] xl:text-base">
          {description}
        </p>
      </div>
    </article>
  );
}
