import type { ReactNode } from "react";

type SectionIntroProps = {
  title: ReactNode;
  description: ReactNode;
  titleClassName?: string;
  descriptionClassName?: string;
};

export default function SectionIntro({
  title,
  description,
  titleClassName = "",
  descriptionClassName = "",
}: SectionIntroProps) {
  const titleClasses = [
    "max-w-4xl font-urbanist text-[clamp(2rem,4.6vw,3.75rem)] font-normal leading-[1.05] text-[#666]",
    titleClassName,
  ]
    .filter(Boolean)
    .join(" ");
  const descriptionClasses = [
    "w-full max-w-2xl font-urbanist text-sm leading-6 tracking-[0.02em] text-[#666] sm:text-base lg:text-lg",
    descriptionClassName,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="flex w-full max-w-5xl flex-col items-center gap-3 text-center">
      <h2 className={titleClasses}>{title}</h2>
      <p className={descriptionClasses}>{description}</p>
    </div>
  );
}
