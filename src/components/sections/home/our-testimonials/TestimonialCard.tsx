export type TestimonialCardProps = {
  name: string;
  trip: string;
  quote: string;
};

export default function TestimonialCard({
  name,
  trip,
  quote,
}: TestimonialCardProps) {
  return (
    <article className="flex w-full flex-col items-start gap-6 overflow-hidden rounded-[28px] bg-[#f7f7f7] p-6 text-left sm:gap-7 sm:rounded-[34px] sm:p-8 lg:gap-10 lg:rounded-[41px] lg:p-10">
      <div className="flex w-full min-w-0 items-center gap-3.5">
        <div
          className="h-[54px] w-[54px] shrink-0 rounded-full bg-white sm:h-[61px] sm:w-[61px]"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-inter text-xl font-medium leading-tight text-[#1a1a17] sm:text-2xl">
            {name}
          </h3>
          <p className="mt-1 truncate font-ibm-plex-sans text-base font-medium leading-tight text-[#5e5e5e] sm:text-lg">
            {trip}
          </p>
        </div>
      </div>

      <div className="h-px w-full border-t border-dashed border-[#1a1a17]/20" />

      <p className="font-ibm-plex-sans text-lg font-medium leading-[1.35] text-[#5e5e5e] sm:text-xl lg:text-[22px]">
        {quote}
      </p>
    </article>
  );
}
