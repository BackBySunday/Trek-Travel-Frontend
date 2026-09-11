import Image from "next/image";

type SocialPlatform = "facebook" | "instagram" | "x";

const socialLinks: Array<{
  label: string;
  platform: SocialPlatform;
  href?: string;
}> = [
  {
    label: "Facebook",
    platform: "facebook",
    href: "https://www.facebook.com/backbysunday",
  },
  {
    label: "Instagram",
    platform: "instagram",
    href: "https://www.instagram.com/thebackbysunday/",
  },
  { label: "X", platform: "x", href: "https://x.com/TheBackBySunday" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Treks" },
  { label: "Packages" },
  { label: "Gallery" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Cancellation & Refund Policy", href: "/cancellation-and-refund-policy" },
];

const contactInfo = [
  {
    label: "hello.backbysunday@gmail.com",
    href: "mailto:hello.backbysunday@gmail.com",
  },
  { label: "Pune, Maharashtra, India" },
  { label: "New Delhi, India" },
];

function SocialIcon({ platform }: { platform: SocialPlatform }) {
  if (platform === "facebook") {
    return (
      <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden="true">
        <path
          d="M15.12 8.12V10.5h3.05l-.48 3.22h-2.57V21h-3.36v-7.28H8.95V10.5h2.81V7.66C11.76 4.9 13.4 3.38 15.93 3.38c1.21 0 2.48.22 2.48.22v2.73h-1.4c-1.38 0-1.89.86-1.89 1.79Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  if (platform === "instagram") {
    return (
      <svg viewBox="0 0 24 24" className="h-[21px] w-[21px]" aria-hidden="true">
        <path
          d="M7.5 2.75h9A4.75 4.75 0 0 1 21.25 7.5v9a4.75 4.75 0 0 1-4.75 4.75h-9a4.75 4.75 0 0 1-4.75-4.75v-9A4.75 4.75 0 0 1 7.5 2.75Zm0 1.7A3.05 3.05 0 0 0 4.45 7.5v9a3.05 3.05 0 0 0 3.05 3.05h9a3.05 3.05 0 0 0 3.05-3.05v-9a3.05 3.05 0 0 0-3.05-3.05h-9Zm4.5 3.3a4.25 4.25 0 1 1 0 8.5 4.25 4.25 0 0 1 0-8.5Zm0 1.7a2.55 2.55 0 1 0 0 5.1 2.55 2.55 0 0 0 0-5.1Zm5.13-2.18a1.08 1.08 0 1 1 0 2.16 1.08 1.08 0 0 1 0-2.16Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-[20px] w-[20px]" aria-hidden="true">
      <path
        d="M13.7 10.62 20.34 3h-1.57l-5.77 6.62L8.39 3H3.08l6.97 10.02L3.08 21h1.57l6.1-6.99L15.61 21h5.31l-7.22-10.38Zm-2.16 2.48-.71-1-5.62-7.93h2.43l4.54 6.41.71 1 5.89 8.31h-2.43l-4.81-6.79Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SocialLink({
  href,
  label,
  platform,
}: {
  href?: string;
  label: string;
  platform: SocialPlatform;
}) {
  if (!href) {
    return (
      <span
        aria-label={label}
        className="flex h-[37px] w-[37px] items-center justify-center rounded-full border border-[#999292] text-[#999292]"
      >
        <SocialIcon platform={platform} />
      </span>
    );
  }

  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex h-[37px] w-[37px] items-center justify-center rounded-full border border-[#999292] text-[#999292] transition-colors duration-200 hover:border-[#101010] hover:text-[#101010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#101010]"
    >
      <SocialIcon platform={platform} />
    </a>
  );
}

function ArrowUpRightIcon({ className }: { className: string }) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M7.29541 21.8859L21.8861 7.29529M21.8861 18.2383V7.29529H10.9431"
        stroke="#101010"
        strokeWidth="1.82383"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-white pt-2 text-[#101010]">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-8 pt-8 sm:pt-10 md:grid-cols-[minmax(260px,1fr)_minmax(120px,150px)_minmax(120px,170px)] md:items-start md:justify-between xl:grid-cols-[minmax(260px,390px)_120px_170px_220px_minmax(280px,360px)] xl:gap-8 2xl:grid-cols-[minmax(300px,430px)_minmax(120px,140px)_minmax(150px,190px)_minmax(220px,260px)_390px] 2xl:gap-10">
          <div className="flex w-full max-w-[460px] flex-col items-start gap-3.5">
            <Image
              src="/Footer/footer-logo.png"
              alt="BackBySunday"
              width={217}
              height={72}
              className="h-auto w-full max-w-[280px] object-contain"
              sizes="280px"
            />
            <p className="w-full font-urbanist text-sm font-medium leading-[1.5] text-[#5E5E5E] sm:text-base">
              We craft unforgettable trekking experiences across India&apos;s most
              beautiful trails with expert guides, safe journeys, and
              responsible travel.
            </p>
            <div className="flex w-fit items-center gap-[9px]">
              {socialLinks.map((link) => (
                <SocialLink key={link.platform} {...link} />
              ))}
            </div>
          </div>
          <nav
            className="flex w-full max-w-[140px] flex-col items-start gap-5 md:w-[140px]"
            aria-label="Footer quick links"
          >
            <p className="w-full font-urbanist text-lg font-semibold leading-[1.15] text-[#101010]">
              Quick Links
            </p>
            <div className="flex w-full flex-col items-start gap-3">
              {quickLinks.map((link) =>
                link.href ? (
                  <a
                    key={link.label}
                    href={link.href}
                    className="w-full font-urbanist text-sm font-medium leading-[1.3] text-[#5E5E5E] transition-colors duration-200 hover:text-[#101010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101010] sm:text-base"
                  >
                    {link.label}
                  </a>
                ) : (
                  <span
                    key={link.label}
                    className="w-full text-left font-urbanist text-sm font-medium leading-[1.3] text-[#5E5E5E] sm:text-base"
                  >
                    {link.label}
                  </span>
                ),
              )}
            </div>
          </nav>
          <div className="flex w-full flex-col items-start gap-5 md:max-w-[280px]">
            <p className="w-full font-urbanist text-lg font-semibold leading-[1.15] text-[#101010]">
              Legal
            </p>
            <nav
              className="flex w-full flex-col items-start gap-3"
              aria-label="Footer legal links"
            >
              {legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="w-fit font-urbanist text-sm font-medium leading-[1.3] text-[#5E5E5E] transition-colors duration-200 hover:text-[#101010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101010] sm:text-base"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>
          <div className="flex w-full flex-col items-start gap-5 md:max-w-[280px]">
            <p className="w-full font-urbanist text-lg font-semibold leading-[1.15] text-[#101010]">
              Contact Info
            </p>
            <address className="flex w-full flex-col items-start gap-3 not-italic">
              {contactInfo.map((item) =>
                item.href ? (
                  <a
                    key={item.label}
                    href={item.href}
                    className="w-fit font-urbanist text-sm font-medium leading-[1.3] text-[#5E5E5E] transition-colors duration-200 hover:text-[#101010] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#101010] sm:text-base"
                  >
                    {item.label}
                  </a>
                ) : (
                  <p
                    key={item.label}
                    className="w-fit font-urbanist text-sm font-medium leading-[1.3] text-[#5E5E5E] sm:text-base"
                  >
                    {item.label}
                  </p>
                ),
              )}
            </address>
          </div>
          <div className="flex w-full max-w-[420px] flex-col items-start gap-4 md:col-span-3 xl:col-span-1">
            <div className="flex w-full flex-col items-start gap-3">
              <p className="w-fit font-urbanist text-lg font-semibold leading-[1.15] text-[#101010]">
                Stay in the loop
              </p>
              <p className="w-full font-urbanist text-sm font-medium leading-[1.5] text-[#5E5E5E] sm:text-base">
                Get trekking stories, offers &amp; updates straight to your
                inbox.
              </p>
            </div>
            <div className="flex w-full flex-col gap-2.5 overflow-hidden rounded-[28px] bg-[#E9E9E9] p-2.5 shadow-[inset_0_1px_12px_rgba(255,255,255,0.45)] sm:min-h-[56px] sm:flex-row sm:items-center sm:gap-3 sm:rounded-[98.605px] sm:bg-[linear-gradient(0deg,rgba(51,51,51,0.04)_0%,rgba(51,51,51,0.04)_100%),rgba(201,201,201,0.60)] sm:py-1.5 sm:pl-4 sm:pr-1.5">
              <label htmlFor="footer-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-email"
                type="email"
                placeholder="Enter your email address"
                className="min-h-9 min-w-0 flex-1 bg-transparent font-urbanist text-sm font-normal leading-none text-[#101010] outline-none placeholder:text-[#999292] sm:text-base"
              />
              <button
                type="button"
                className="group flex h-10 shrink-0 items-center justify-center gap-2 rounded-[113.1px] bg-[rgba(20,20,20,0.84)] py-1 pl-3.5 pr-1 font-urbanist text-sm font-normal text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform duration-200 hover:scale-[1.02] active:scale-95 sm:h-11 sm:gap-2.5 sm:text-base"
              >
                <span>Subscribe</span>
                <span className="flex h-8 w-8 items-center justify-center rounded-[76.6px] bg-white text-[#101010] sm:h-9 sm:w-9">
                  <ArrowUpRightIcon className="h-5 w-5 overflow-hidden" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className="relative mt-8 aspect-[1921/207] w-full overflow-hidden sm:mt-10 lg:mt-12"
        aria-label="Snow covered mountain range"
        role="img"
      >
        <Image
          src="/Footer/Card-1.png"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-x-0 bottom-4 px-4 sm:px-6 lg:px-8">
          <p className="mx-auto w-full max-w-[1500px] text-center font-urbanist text-sm font-medium leading-[1.1] text-[#5E5E5E] sm:text-base">
            Copyright 2026 backbysunday.in All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
