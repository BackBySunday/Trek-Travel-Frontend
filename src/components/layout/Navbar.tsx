"use client";

import Image from "next/image";
import { useState } from "react";
import { useComingSoon } from "./ComingSoonProvider";

type NavbarProps = {
  bookNowVariant?: "default" | "trekDetails";
};

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Treks", href: "/#treks" },
  { label: "Destinations", href: "/#destinations" },
  { label: "Partners", href: "/#partners" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar({ bookNowVariant = "default" }: NavbarProps) {
  const [activeTab, setActiveTab] = useState(navLinks[0].label);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openWaitlist } = useComingSoon();
  const isTrekDetailsBookNow = bookNowVariant === "trekDetails";

  return (
    <>
      {/* Hidden SVG Filter providing liquid distortion map */}
      <svg className="absolute w-0 h-0 pointer-events-none -z-10" aria-hidden="true">
        <filter id="switcher" primitiveUnits="objectBoundingBox">
          <feImage
            result="map"
            width="100%"
            height="100%"
            x="0"
            y="0"
            href="data:image/webp;base64,UklGRq4vAABXRUJQVlA4WAoAAAAQAAAA5wEAhwAAQUxQSOYWAAABHAVpGzCrf9t7EiJCYdIGTDpvURGm9n7K+YS32rZ1W8q0LSSEBCQgAQlIwEGGA3CQOAAHSEDCJSEk4KDvUmL31vrYkSX3ufgXEb4gSbKt2LatxlqIgNBBzbM3ikHVkvUvq7btKpaOBCQgIRIiAQeNg46DwgE4oB1QDuKgS0IcXBykXieHkwdjX/4iAhZtK3ErSBYGEelp+4aM/5/+z14+//jLlz/++s/Xr4//kl9C8Ns8DaajU+lPX/74+viv/eWxOXsO+eHL3/88/ut/2b0zref99evjX8NLmNt1fP7178e/jJcw9k3G//XP49/Iy2qaa7328Xkk9ZnWx0VUj3bcyCY4Pi7C6reeEagEohnRCbQQwFmUp9ggYQj8MChjTSI0Ck7G/bh6P5ykNU9yP+10G8I2UAwXeQ96DQwNjqyPu/c4tK+5CtGOK0oM7AH5f767lHpotXVYYI66B+HjMhHj43C5wok3YDH4/vZFZRkB7rNnEfC39WS2Q3K78y525wFNTPf5f+/fN9YI1YyDvjuzV5rQtsfn1Ez1ka3PkeGxOZ6IODxDJqCLpF7vdb9Z3s/ufLr6jf/55zbW3LodwwVVg7Lmao+p3eGcqDFDGuuKnlBZAPSbnkYtTX+mZl2y57Gq85F3tDv7m7/yzpjXHoVA3YUObsHz80W3IUK1E8yRqggxTMzD4If2230ys7RDxWrLu9o9GdSWNwNRC2yMIg+HkTVT3BOZER49XLBMdljemLFMjw8VwZ8OdBti4lWdt7c7dzaSc5yILtztsTMT1GFGn/tysM23nF3xbOsnh/eQGKkxhWGEalljCvWZ+LDE+9t97uqEfb08rdYwZGhheLzG2SJzKS77OIAVgPDjf9jHt6c+0mjinS/v13iz9RV3vsPdmbNG1E+nD6s83jBrBEnlBiTojuJogGJNtzxtsIoD2CFuXYipzhGWHhWqCBSqd7l7GMrnuHzH6910FO+XYwgcDxoFRJNk2GUcpQ6I/GhLmqisuBS6uSFpfAz3Yb9Yatyed7r781ZYfr3+3FfXs1MykSbVcg4GiOKX19SZ9xFRwhG+UZGiROjsXhePVu12fCZTJ3CJ4Z3uXnyxz28RutHa5yCKG6jgfTBPuA9jHL7YdlAa2trNEr7BLANd3qNYcWZqnkvlDe8+F5Q/9k8jCFk17ObrIf0O/5U/iDnqcqA70mURr8FUN5pmQEzDcxuWvOPd1+KrbO4fd0vXK5OTtYEy5C2TA5L4ok6Y31WHR9ZR9lQr6IjwruSd775W6NVa2zz1fir2k1GWnT573Eu3mfMjIikYZkM4MDCnTWbmLrpK/Hs0KD5C8rZ3n0tnw0j76WuU8P1YBIjsvcESbnOQMY+gGC/sd/gG+hKKtDijJHhrcSj/GHa/FZ8oGLXeLx1IW+cgU8pqD0PzMzU3oG5lQ/ZaDPDMYq+aAPSEmHN+JiVIp0haHTvPt77732z5ed2K7NHs9FtCIk4BdNkKLRLvOKlFcw+UiovM4OB5sGgepyML+a4TEu/I29/dFtjJulojJR4Tg71ybApEdca0TSnaumNJyCWH2pjENASlQS/NIXMWtiPV9CHsvuftev08/lemYIcUnHSu6XEMvaBq41tqf/m0siLj7xeXsnBmhxY5z+nCwX4Iu4euTPaE4EQorgogisHrBtsAMdX+Huje7nlx3hMpKovdf+YftDQqytChXfEh7D5nyC8rzNTICINmpK5Ni0ngcAMzpmiYDwOMtmUTiCjvx2S2dIeSguP/QHZ3xYIeGhTt1CsCOIiEuVw8pGjVznDJppuojl30i9RvXccXzmXGj2b3H3XM38c/PZseyeOdplXhFekzZMZ2fUGuIBsKCcgQg4Ikqt4PDTkQiWQtMUBFAEhUH8vuvoAvnvGMCEP4/vMmZA2PnkmAJsQsHeFAIk43F00OS3sa/1TDJTPss2698T+i3V22L3PsIeFAHmWWi1FUh29TqpniVOt5hGA/q40Yubt4yXDEQomvldUNhfuuSvjHzPBysYhBMSmRrpuIUHJhQk5uw5V4EwpMp1NvklGkc03WYeC0KETcZ409HkEcwnEaE3EdNnIcfCb1jjWNfZyhhGH48AvsJ4WL+mYTM5i+yFNyM6PhbkuMGYREv48VihVyHXb9RjoE0HvoOuaO7fxxUYnQj1wB0DOZUagcEXfVkJ/nBgV+vl5yMfFaJs0myb9BjyNSsY9FbwZNq21wEFOEJ8Pk/vO1fSa6bOPZFCMc7grz9YXf8rBBPaK3qUJEfJG1A8nuytO1jg8CvWGEY1Z4o1gb3uEjILmNm5YfMXH3GtvyETX+j4jAXkkaA7FDQIdPzLZOcUJsqLQFxboX/MZ95f7MqPku/6IAGXer6xchZyiqcG2Tw4oSVcO0Q0vqOlmEcpsyBw2pwzcifb6t2th64vASkXGXzY9U7aFvkqJEOWSkEU0oL0FrnOfr432tJ5OtPUG1T0cg5yqNTNFAqKFxl80fxGGPFzIiASv+sEPaGMmewBjUEZNFtVCwzaG3PVSe5l+AIRNeFCzu2+H/7Cp2pbOjRUjNFFMX8ZEGl0D4uNWi4ykocIgBkGF+HAIHRNjAqioi4y7vjPtlTPTMXwl7aQD7gu9yVk+VdBwmVMnljIx4++8hq0qOtmjkwT1+RW4N0LhPQuahKrjGVIMy2hW3lgO8lqoLLBHAaTvRIgaPLNFx5ChJ8hTcsBdO383ouHspeqwelcvfEOELFMF0a+jWZJzZYWqZQlj9FnUeMq37zGWfbwRbvkDKOR0OKzAUNO5y8O+H24nczTdDZniPDwMUgIJDV1sEJn7xWMscorAcT3niXE+kcQS0NUMjkkoiNu43cbvQGGagTd6ycWgkkPbSb0Fi0iiYKTXo0mpx5/oT2pX5iYAAAAAAElFTkSuQmCC"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.04" result="blur" />
          <feDisplacementMap
            id="disp"
            in="blur"
            in2="map"
            scale="0.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* Header Container with Navbar & Book Now Button */}
      <div className="relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-3">
        <div className="flex w-[clamp(132px,28vw,180px)] items-center justify-self-start lg:w-[clamp(190px,15vw,240px)]">
          <Image
            src="/Hero/hero-logo.png"
            alt="BackBySunday"
            width={217}
            height={72}
            priority
            className="h-auto w-full object-contain"
            sizes="(min-width: 1024px) 240px, 180px"
          />
        </div>

        {/* Desktop Liquid Glass Navigation Links */}
        <nav
          className="liquid-glass-nav hidden max-w-full items-center gap-1 overflow-x-auto p-1.5 transition-all duration-300 md:flex lg:gap-2"
          aria-label="Primary navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeTab === link.label;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setActiveTab(link.label)}
                className={`relative flex cursor-pointer text-nowrap rounded-full px-3 py-1.5 text-center transition-all duration-300 lg:px-4 ${
                  isActive
                    ? "liquid-glass-active text-[#101010] font-medium shadow-sm"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <span className="select-none font-sans text-xs tracking-wide md:text-sm">
                  {link.label}
                </span>
              </a>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <div className="col-start-3 flex justify-self-end md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="liquid-glass-nav flex min-h-10 min-w-10 cursor-pointer items-center justify-center rounded-full p-2 text-white"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
          >
            <svg
              className="h-4.5 w-4.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Liquid Glass Book Now Button */}
        <div className="hidden min-w-0 justify-self-end sm:flex">
          <button
            type="button"
            onClick={() => openWaitlist()}
            className={
              isTrekDetailsBookNow
                ? "group inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full bg-[rgba(20,20,20,0.84)] py-1.5 pl-3 pr-1.5 bg-blend-darken shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform duration-300 active:scale-95 xs:gap-2 sm:pl-3.5 md:gap-3 md:pl-4"
                : "liquid-glass-nav group inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full py-1.5 pl-3 pr-1.5 transition-all duration-300 hover:scale-[1.03] active:scale-95 xs:gap-2 sm:pl-3.5 md:gap-3 md:pl-4"
            }
          >
            <span className="select-none text-nowrap font-sans text-xs font-medium tracking-wide text-white md:text-sm">
              Join Waitlist
            </span>
            <div
              className={
                isTrekDetailsBookNow
                  ? "flex items-center justify-center rounded-full bg-white p-1.5 text-[#101010]"
                  : "flex items-center justify-center rounded-full bg-white p-1.5 text-[#101010] shadow-sm transition-transform duration-300 group-hover:rotate-45"
              }
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={
                  isTrekDetailsBookNow
                    ? "h-3.5 w-3.5 overflow-hidden"
                    : "h-3.5 w-3.5"
                }
              >
                <path
                  d="M6 18L18 6M18 15V6H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <nav
            id="mobile-navigation"
            className="mobile-menu-panel fixed left-4 right-4 top-20 z-50 flex max-h-[calc(100svh-6rem)] flex-col gap-1.5 overflow-y-auto rounded-[28px] p-3 md:hidden"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => {
              const isActive = activeTab === link.label;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    setActiveTab(link.label);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full rounded-2xl px-5 py-3 text-left font-sans text-base transition-all duration-200 ${
                    isActive
                      ? "mobile-menu-active text-white font-medium"
                      : "text-[#101010]/90 hover:bg-black/10"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.label}
                </a>
              );
            })}
            <button
              type="button"
              className="mt-1 flex w-full items-center justify-between rounded-2xl bg-[#101010] px-5 py-3 font-sans text-base font-medium text-white transition-transform active:scale-[0.98]"
              onClick={() => {
                setMobileMenuOpen(false);
                openWaitlist();
              }}
            >
              <span>Join Waitlist</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M6 18L18 6M18 15V6H9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </nav>
        )}
      </div>
    </>
  );
}
