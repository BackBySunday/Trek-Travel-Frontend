export default function TrekDetailsHeroImage() {
  const imageClass =
    "rounded-[22px] bg-cover bg-center bg-no-repeat sm:rounded-[26px] lg:rounded-[30px]";

  return (
    <section className="mt-[calc(var(--hero-header-top)+var(--hero-nav-height)+var(--hero-gap))] w-full px-4 [--hero-gap:16px] [--hero-header-top:max(1rem,env(safe-area-inset-top))] [--hero-nav-height:44px] sm:px-6 sm:[--hero-gap:24px] md:[--hero-header-top:32px] md:[--hero-nav-height:54px] lg:px-5 lg:[--hero-gap:20px] xl:[--hero-gap:max(20px,(100vw-1860px)/2)] xl:[--hero-header-top:40px]">
      <div className="mx-auto grid w-full max-w-[1846px] grid-cols-1 gap-4 md:grid-cols-[1.05fr_1.3fr] lg:h-[min(914px,calc(100svh-(var(--hero-header-top)+var(--hero-nav-height)+(var(--hero-gap)*2))))] lg:min-h-[560px] lg:grid-cols-[752fr_1059fr] lg:gap-5">
        <div
          aria-label="Vasota Fort Trek landscape"
          role="img"
          className={`${imageClass} relative min-h-[430px] overflow-hidden bg-[url('/Hero/card-1.png')] md:min-h-[560px] lg:h-full`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.56)_100%)]" />
          <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-5 text-center sm:bottom-10 lg:bottom-12">
            <div className="trek-pill-glass h-9 px-4 font-urbanist text-sm font-normal leading-normal text-white sm:text-base">
              <span className="trek-pill-glass-effect" />
              <span className="trek-pill-glass-tint" />
              <span className="trek-pill-glass-shine" />
              <p className="trek-pill-glass-content">Adventure</p>
            </div>
            <div className="flex flex-col items-center gap-1">
              <p className="font-urbanist text-[clamp(2rem,4vw,52px)] font-medium leading-none text-white">
                Vasota Fort
              </p>
              <p className="font-urbanist text-[clamp(1.75rem,3.5vw,48px)] font-medium leading-none text-white">
                Trek - Pune
              </p>
            </div>
          </div>
        </div>

        <div className="grid min-h-[520px] grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:h-full lg:flex-col lg:gap-5">
          <div className="contents lg:flex lg:flex-1 lg:gap-5">
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[250px] bg-[url('/Hero/card-2.png')] lg:flex-[640]`}
            />
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[250px] bg-[url('/Hero/card-3.png')] lg:flex-[390]`}
            />
          </div>
          <div className="contents lg:flex lg:flex-1 lg:gap-5">
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[250px] bg-[url('/Hero/western-ghats-cliff.jpg')] lg:flex-[390]`}
            />
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[250px] bg-[url('/Hero/mountain-ridge-trail.jpg')] lg:flex-[640]`}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
