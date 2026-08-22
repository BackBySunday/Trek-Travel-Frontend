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
    <section className="w-full bg-white px-4 py-12 sm:py-16 lg:px-5 lg:py-20">
      <div className="mx-auto w-full max-w-[1888px]">
        <div
          className="relative flex aspect-[1888/1000] min-h-[360px] w-full flex-col items-center justify-center overflow-hidden rounded-[30px] px-5 py-12 sm:min-h-[520px] sm:rounded-[40px] sm:px-[30px] sm:py-20 lg:min-h-[720px] lg:rounded-[50px]"
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
          <div className="relative z-10 flex w-full flex-col items-center gap-10 text-center">
            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full flex-col items-center gap-1">
                <p className="w-full font-urbanist text-[clamp(2.5rem,5vw,4.75rem)] font-light leading-none text-white">
                  Experience the Magic of
                </p>
                <p className="w-full font-urbanist text-[clamp(2.35rem,4.75vw,4.5rem)] font-normal leading-none text-white">
                  Trails, in Your Way
                </p>
              </div>
              <p className="w-full max-w-[628px] text-center font-urbanist text-base font-normal leading-normal tracking-[0.02em] text-[#E1E1E1] sm:text-xl">
                Custom treks for your group, your dates, and your pace. Tell us
                what you have in mind, and we&apos;ll take care of the rest.
              </p>
            </div>
            <button
              type="button"
              className="liquid-glass-nav group flex h-14 items-center gap-[14.591px] rounded-[113.078px] py-[4.864px] pl-[14.591px] pr-[4.864px] font-urbanist text-lg text-white transition-transform duration-300 hover:scale-[1.03] active:scale-95 sm:h-[60px] sm:text-[22px]"
            >
              <span className="w-fit text-nowrap">Send us Message</span>
              <span className="flex w-fit items-center gap-3 rounded-[76.6px] bg-white p-2.5 shadow-sm transition-transform duration-300 group-hover:rotate-45">
                <ArrowIcon />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
