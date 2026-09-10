"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ModalFrameProps = {
  children: ReactNode;
  labelledBy: string;
  closeLabel: string;
  onClose: () => void;
};

export default function ModalFrame({
  children,
  labelledBy,
  closeLabel,
  onClose,
}: ModalFrameProps) {
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusableElements = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!firstElement || !lastElement) return;

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    closeButtonRef.current?.focus();
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
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="coming-soon-modal relative max-h-[calc(100svh-2rem)] w-full max-w-[520px] overflow-y-auto rounded-2xl bg-white px-4 pb-5 pt-5 text-[#18231e] shadow-[0_28px_90px_rgba(0,0,0,0.38)] sm:px-8 sm:pb-8 sm:pt-7"
      >
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full text-[#426857] transition-colors hover:bg-[#e3ece5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
          aria-label={closeLabel}
        >
          <span className="text-2xl leading-none" aria-hidden="true">
            &times;
          </span>
        </button>
        {children}
      </section>
    </div>
  );
}
