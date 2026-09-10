"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import ComingSoonModal from "./coming-soon/ComingSoonModal";
import WaitlistModal from "./coming-soon/WaitlistModal";

type ComingSoonContextValue = {
  openComingSoon: (destination?: string) => void;
  openWaitlist: (destination?: string) => void;
};

type ActiveModal = "coming-soon" | "waitlist" | null;

const ComingSoonContext = createContext<ComingSoonContextValue | null>(null);

export default function ComingSoonProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ActiveModal>(null);
  const [destination, setDestination] = useState<string | null>(null);

  const openComingSoon = useCallback((nextDestination?: string) => {
    setDestination(nextDestination ?? null);
    setActiveModal("coming-soon");
  }, []);

  const openWaitlist = useCallback((nextDestination?: string) => {
    setDestination(nextDestination ?? null);
    setActiveModal("waitlist");
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    setDestination(null);
  }, []);

  const showWaitlist = useCallback(() => {
    setActiveModal("waitlist");
  }, []);

  useEffect(() => {
    if (!activeModal) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeModal]);

  return (
    <ComingSoonContext.Provider value={{ openComingSoon, openWaitlist }}>
      {children}
      {activeModal === "coming-soon" && (
        <ComingSoonModal
          destination={destination}
          onClose={closeModal}
          onJoinWaitlist={showWaitlist}
        />
      )}
      {activeModal === "waitlist" && (
        <WaitlistModal destination={destination} onClose={closeModal} />
      )}
      <style jsx global>{`
        .coming-soon-modal {
          animation: coming-soon-modal-in 420ms cubic-bezier(0.22, 1, 0.36, 1)
            both;
        }

        @keyframes coming-soon-modal-in {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .coming-soon-modal {
            animation: none;
          }
        }
      `}</style>
    </ComingSoonContext.Provider>
  );
}

export function useComingSoon() {
  const context = useContext(ComingSoonContext);

  if (!context) {
    throw new Error("useComingSoon must be used within ComingSoonProvider");
  }

  return context;
}
