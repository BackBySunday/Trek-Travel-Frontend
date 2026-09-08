import Image from "next/image";

function ArrowIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-[29px] w-[29px] overflow-hidden"
      aria-hidden="true"
    >
      <path
        d="M7.29541 21.8856L21.8861 7.29492M21.8861 18.2379V7.29492H10.9431"
        stroke="#101010"
        strokeWidth="1.82383"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CTASection() {
  return (
    <section className="w-full bg-[var(--bg)] px-4 py-10 sm:py-14 lg:px-[30px] lg:py-16">
      <div className="mx-auto w-full max-w-[1888px]">
        <div
          className="relative flex aspect-[1888/760] min-h-[320px] w-full flex-col items-center justify-center overflow-hidden rounded-[28px] px-5 py-10 sm:min-h-[430px] sm:rounded-[36px] sm:px-[30px] sm:py-14 lg:min-h-[520px] lg:rounded-[44px]"
          aria-label="Trekkers overlooking a mountain range at sunset"
          role="img"
        >
          <Image
            src="/CTA/Card-1.png"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width: 1920px) 1888px, calc(100vw - 2rem)"
          />
          <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
          <div className="relative z-10 flex w-full flex-col items-center gap-7 text-center sm:gap-8">
            <div className="flex w-full flex-col items-center gap-3">
              <h2 className="flex w-full max-w-[1180px] flex-col items-center gap-0.5 font-urbanist text-[clamp(2rem,4.6vw,3.75rem)] font-normal leading-none text-white">
                <span>
                  <span className="font-light">Experience the Magic of</span>{" "}
                  Trails,
                </span>
                <span>in Your Way</span>
              </h2>
              <p className="w-full max-w-[628px] text-center font-urbanist text-sm font-normal leading-6 tracking-[0.02em] text-[#E1E1E1] sm:text-base lg:text-lg">
                Custom treks for your group, your dates, and your pace. Tell us
                what you have in mind, and we&apos;ll take care of the rest.
              </p>
            </div>
            <button
              type="button"
              className="liquid-glass-nav group flex h-11 items-center gap-2.5 rounded-[113.078px] py-1 pl-4 pr-1 font-urbanist text-base text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:h-12 sm:text-lg"
            >
              <span className="w-fit text-nowrap">Send us Message</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[76.6px] bg-white shadow-sm transition-transform duration-300 group-hover:rotate-45 sm:h-10 sm:w-10">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
