"use client";

import ModalFrame from "./ModalFrame";

type ComingSoonModalProps = {
  destination: string | null;
  onClose: () => void;
  onJoinWaitlist: () => void;
};

function ClimberAnimation() {
  return (
    <video
      src="/Animation/Coming%20soon.mp4"
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

export default function ComingSoonModal({
  destination,
  onClose,
  onJoinWaitlist,
}: ComingSoonModalProps) {
  return (
    <ModalFrame
      labelledBy="coming-soon-title"
      closeLabel="Close coming soon message"
      onClose={onClose}
    >
      <div className="mx-auto flex max-w-[min(300px,76vw)] justify-center sm:max-w-[350px]">
        <ClimberAnimation />
      </div>
      <div className="mx-auto mt-1 max-w-[400px] text-center">
        <p className="font-urbanist text-sm font-semibold text-[#426857]">
          A little further up the trail
        </p>
        <h2
          id="coming-soon-title"
          className="mt-2 font-urbanist text-2xl font-semibold leading-tight sm:text-4xl"
        >
          Almost ready to explore.
        </h2>
        <p className="mt-3 font-urbanist text-base leading-6 text-[#526359]">
          We&apos;re getting {destination ?? "your next journey"} ready for you.
          Join the waitlist to hear when it&apos;s ready to explore.
        </p>
      </div>
      <button
        type="button"
        onClick={onJoinWaitlist}
        className="mx-auto mt-6 flex h-11 items-center justify-center rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
      >
        Join waitlist
      </button>
    </ModalFrame>
  );
}
