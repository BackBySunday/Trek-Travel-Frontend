export default function TrekDetailsHeroImage() {
  const imageClass =
    "rounded-[20px] bg-cover bg-center bg-no-repeat lg:rounded-[10px]";

  return (
    <section className="mt-1 w-full px-4 [--hero-gap:16px] [--hero-header-top:max(1rem,env(safe-area-inset-top))] [--hero-nav-height:44px] sm:mt-2 sm:px-6 md:[--hero-header-top:32px] md:[--hero-nav-height:54px] lg:mt-0 lg:px-[30px] lg:[--hero-gap:20px] xl:[--hero-gap:max(20px,(100vw-1860px)/2)] xl:[--hero-header-top:40px]">
      <div className="mx-auto grid w-full max-w-[1846px] grid-cols-1 gap-2 sm:gap-4 md:grid-cols-[1.05fr_1.3fr] lg:h-[min(914px,calc(100svh-(var(--hero-header-top)+var(--hero-nav-height)+(var(--hero-gap)*2))))] lg:min-h-[560px] lg:grid-cols-[752fr_1059fr] lg:gap-2">
        <div
          aria-label="Vasota Fort Trek landscape"
          role="img"
          className={`${imageClass} relative min-h-[360px] overflow-hidden bg-[url('/Hero/card-1.png')] sm:min-h-[430px] md:min-h-[560px] lg:h-full lg:rounded-l-[30px]`}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.56)_100%)]" />
          <div className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-3 px-5 text-center sm:bottom-10 lg:bottom-12">
            <div className="trek-pill-glass h-9 px-4 font-urbanist text-sm font-normal leading-normal text-white sm:text-base">
              <span className="trek-pill-glass-effect" />
              <span className="trek-pill-glass-tint" />
              <span className="trek-pill-glass-shine" />
              <p className="trek-pill-glass-content">Adventure</p>
            </div>
            <h1 className="flex flex-col items-center gap-1">
              <span className="font-urbanist text-[clamp(2rem,4vw,52px)] font-medium leading-none text-white">
                Vasota Fort
              </span>
              <span className="font-urbanist text-[clamp(1.75rem,3.5vw,48px)] font-medium leading-none text-white">
                Trek - Pune
              </span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:min-h-[520px] sm:gap-4 lg:flex lg:h-full lg:flex-col lg:gap-2">
          <div className="contents lg:flex lg:flex-1 lg:gap-2">
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[156px] bg-[url('/Hero/card-2.png')] sm:min-h-[250px] lg:flex-[640]`}
            />
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[156px] bg-[url('/Hero/card-3.png')] sm:min-h-[250px] lg:flex-[390] lg:rounded-tr-[30px]`}
            />
          </div>
          <div className="contents lg:flex lg:flex-1 lg:gap-2">
            <div
              aria-label="Vasota trek preview"
              role="img"
              className={`${imageClass} min-h-[156px] bg-[url('/Hero/western-ghats-cliff.jpg')] sm:min-h-[250px] lg:flex-[390]`}
            />
            <div
              className={`${imageClass} relative min-h-[156px] overflow-hidden bg-[url('/Hero/mountain-ridge-trail.jpg')] sm:min-h-[250px] lg:flex-[640] lg:rounded-br-[30px]`}
            >
              <span
                className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/55 to-transparent"
                aria-hidden="true"
              />
              <a
                href="#photos"
                className="absolute bottom-3 right-3 inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-white/35 bg-black/50 px-3 font-urbanist text-[11px] font-semibold tracking-[0.02em] text-white backdrop-blur-md transition-colors hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 sm:text-xs"
                aria-label="View all photos"
              >
                <PhotoGridIcon />
                All photos
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhotoGridIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5 shrink-0" aria-hidden="true">
      <path
        d="M2.25 4.75C2.25 3.78 3.03 3 4 3H12C12.97 3 13.75 3.78 13.75 4.75V11.25C13.75 12.22 12.97 13 12 13H4C3.03 13 2.25 12.22 2.25 11.25V4.75Z"
        stroke="currentColor"
        strokeWidth="1.25"
      />
      <path
        d="M3.25 10.75L5.38 8.62C5.73 8.27 6.29 8.27 6.64 8.62L7.25 9.23L9.12 7.36C9.47 7.01 10.03 7.01 10.38 7.36L12.75 9.73"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
      <path
        d="M6 5.75H6.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}
