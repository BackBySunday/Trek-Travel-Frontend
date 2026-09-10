import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for is not available on BackBySunday.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#D7E0DE] px-4 py-8 text-[#101010] sm:px-6">
      <section className="mx-auto flex w-full max-w-[640px] flex-col items-center text-center">
        <div className="relative aspect-square w-[min(76vw,340px)] overflow-hidden sm:w-[390px] lg:w-[430px]">
          <video
            src="/Animation/404.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-1 font-urbanist text-[clamp(2.1rem,7vw,4.75rem)] font-semibold leading-none text-[#101010]">
          Trail not found
        </h1>
        <p className="mt-4 max-w-[430px] font-urbanist text-base font-medium leading-6 text-[#4f5d55] sm:text-lg">
          This page is not available yet. Head back to BackBySunday and find a
          weekend worth taking.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
        >
          Back to home
        </Link>
      </section>
    </main>
  );
}
