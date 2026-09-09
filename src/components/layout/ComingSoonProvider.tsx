"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

type ComingSoonContextValue = {
  openComingSoon: (destination?: string) => void;
};

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

function ClimberAnimation() {
  return (
    <video
      src="/Coming%20soon.mp4"
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="aspect-[320/190] w-full max-w-[320px] object-contain"
      aria-hidden="true"
    />
  );
}

function ComingSoonModal({ onClose, destination }: { onClose: () => void; destination: string | null }) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#1f2a37]/65 p-4 backdrop-blur-sm"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        className="coming-soon-modal relative max-h-[calc(100svh-2rem)] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-white px-4 pb-5 pt-5 text-[#18231e] shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:px-8 sm:pb-8 sm:pt-7"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-[#426857] transition-colors hover:bg-[#e3ece5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
          aria-label="Close coming soon message"
        >
          <span className="text-2xl leading-none" aria-hidden="true">&times;</span>
        </button>

        <div className="mx-auto flex max-w-[min(300px,76vw)] justify-center sm:max-w-[350px]">
          <ClimberAnimation />
        </div>
        <div className="mx-auto mt-1 max-w-[400px] text-center">
          <p className="font-urbanist text-sm font-semibold text-[#426857]">A little further up the trail</p>
          <h2 id="coming-soon-title" className="mt-2 font-urbanist text-2xl font-semibold leading-tight sm:text-4xl">
            Almost ready to explore.
          </h2>
          <p className="mt-3 font-urbanist text-base leading-6 text-[#526359]">
            We&apos;re getting {destination ?? "your next journey"} ready for you.
            Join the waitlist to hear when it&apos;s ready to explore.
          </p>
        </div>
        <button
          type="button"
          disabled
          className="mx-auto mt-6 flex h-11 items-center justify-center rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white disabled:cursor-not-allowed"
        >
          Join waitlist
        </button>
      </section>
    </div>
  );
}

export default function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [destination, setDestination] = useState<string | null>(null);
  const openComingSoon = useCallback((nextDestination?: string) => {
    setDestination(nextDestination ?? "your next journey");
  }, []);
  const closeComingSoon = useCallback(() => setDestination(null), []);

  useEffect(() => {
    if (!destination) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [destination]);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon }}>
      {children}
      {destination !== null && <ComingSoonModal destination={destination} onClose={closeComingSoon} />}
      <style jsx global>{`
        .coming-soon-modal { animation: coming-soon-modal-in 420ms cubic-bezier(0.22, 1, 0.36, 1) both; }
        @keyframes coming-soon-modal-in { from { opacity: 0; transform: translateY(16px) scale(.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @media (prefers-reduced-motion: reduce) { .coming-soon-modal { animation: none; } }
      `}</style>
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);
  if (!context) throw new Error("useComingSoon must be used within ComingSoonProvider");
  return context;
}
