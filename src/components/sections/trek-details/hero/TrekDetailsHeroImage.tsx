export default function TrekDetailsHeroImage() {
  return (
    <section className="mt-[calc(var(--hero-header-top)+var(--hero-nav-height)+var(--hero-gap))] w-full px-4 [--hero-gap:16px] [--hero-header-top:max(1rem,env(safe-area-inset-top))] [--hero-nav-height:44px] sm:px-6 sm:[--hero-gap:24px] md:[--hero-header-top:32px] md:[--hero-nav-height:54px] lg:px-5 lg:[--hero-gap:20px] xl:[--hero-gap:max(20px,(100vw-1860px)/2)] xl:[--hero-header-top:40px]">
      <div className="relative mx-auto h-[min(914px,calc(100svh-(var(--hero-header-top)+var(--hero-nav-height)+(var(--hero-gap)*2))))] min-h-[420px] w-full max-w-[1860px] overflow-hidden rounded-[30px] bg-neutral-200 sm:min-h-[560px]">
        <div
          aria-label="Mountain trek landscape at sunset"
          role="img"
          className="absolute inset-0 bg-[url('/Hero/hero-background.png')] bg-cover bg-center bg-no-repeat"
        />
        <div className="absolute inset-x-0 bottom-[var(--hero-gap)] flex justify-center px-4 sm:px-6 lg:px-5">
          <div className="flex w-full max-w-[568px] flex-col items-center gap-6 text-center sm:gap-8 lg:gap-10">
            <div className="flex w-full max-w-[850px] flex-col items-center gap-4">
              <div className="trek-pill-glass h-10 px-4 font-urbanist text-base font-normal leading-normal text-white sm:text-lg lg:h-12 lg:px-5 lg:text-[22px]">
                <span className="trek-pill-glass-effect" />
                <span className="trek-pill-glass-tint" />
                <span className="trek-pill-glass-shine" />
                <p className="trek-pill-glass-content">
                  Adventure
                </p>
              </div>
              <div className="flex w-full flex-col items-center gap-1">
                <p className="w-full font-urbanist text-[clamp(2.25rem,7vw,76px)] font-medium leading-none text-white">
                  Vasota Fort
                </p>
                <p className="w-full font-urbanist text-[clamp(2rem,6.5vw,72px)] font-medium leading-none text-white">
                  Trek - Pune
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
