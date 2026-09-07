export type OperatorStatIcon = "star" | "calendar" | "award" | "mountain";

export function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 shrink-0" aria-hidden="true">
      <path
        d="M5 12H19M13 6L19 12L13 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function ShareIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.18 15.02 5.35 15.05 5.52L8.91 9.1C8.38 8.42 7.55 8 6.62 8C4.96 8 3.62 9.34 3.62 11C3.62 12.66 4.96 14 6.62 14C7.55 14 8.38 13.58 8.91 12.9L15.05 16.48C15.02 16.65 15 16.82 15 17C15 18.66 16.34 20 18 20C19.66 20 21 18.66 21 17C21 15.34 19.66 14 18 14C17.07 14 16.24 14.42 15.71 15.1L9.57 11.52C9.6 11.35 9.62 11.18 9.62 11C9.62 10.82 9.6 10.65 9.57 10.48L15.71 6.9C16.24 7.58 17.07 8 18 8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function FollowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 20C5.65 16.95 8.24 15 12 15C13.2 15 14.28 15.2 15.22 15.58"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M18 14.5V19.5M15.5 17H20.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function FollowingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M5 20C5.7 16.95 8.25 15 12 15C13.24 15 14.34 15.21 15.29 15.62"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
      <path
        d="M16 18L17.45 19.45L20.5 16.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function MessageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 6.5C5 5.4 5.9 4.5 7 4.5H17C18.1 4.5 19 5.4 19 6.5V13.5C19 14.6 18.1 15.5 17 15.5H10L6 19V15.5H7C5.9 15.5 5 14.6 5 13.5V6.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function VerifiedTick({ size = 16 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      style={{ width: size, height: size }}
      className="shrink-0 text-[#FEB531]"
    >
      <path
        fill="currentColor"
        d="M8 1.6 9.7 3l2.2-.2.6 2.1L14 7.4l-1.5 1.6.6 2.1-2.2.6L8 13.4l-1.9-1.1-2.2-.6.6-2.1L2 7.4l1.9-1.5.6-2.1L6.7 3z"
      />
      <path fill="var(--bg)" d="M6.9 9.4 5.4 7.9l-.9.9 2.4 2.4 4-4-.9-.9z" />
    </svg>
  );
}

export function PinIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M10 18C10 18 15.5 12.8 15.5 8.6C15.5 5.56 13.04 3.1 10 3.1C6.96 3.1 4.5 5.56 4.5 8.6C4.5 12.8 10 18 10 18Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M10 10.6C11.1 10.6 12 9.7 12 8.6C12 7.5 11.1 6.6 10 6.6C8.9 6.6 8 7.5 8 8.6C8 9.7 8.9 10.6 10 10.6Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="ml-0.5 h-6 w-6" aria-hidden="true">
      <path d="M9 7.5V16.5L16.2 12L9 7.5Z" fill="currentColor" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M6 6L18 18M18 6L6 18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5" aria-hidden="true">
      <path
        d="M14 5H19V10M19 5L11 13"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
      <path
        d="M19 14V18C19 18.55 18.55 19 18 19H6C5.45 19 5 18.55 5 18V6C5 5.45 5.45 5 6 5H10"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

export function StatIcon({ icon }: { icon: OperatorStatIcon }) {
  if (icon === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M7 3V6M17 3V6" stroke="currentColor" strokeLinecap="round" strokeWidth="1.6" />
        <path
          d="M4.5 9.5H19.5M6 5H18C19.1 5 20 5.9 20 7V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V7C4 5.9 4.9 5 6 5Z"
          stroke="currentColor"
          strokeWidth="1.6"
        />
      </svg>
    );
  }

  if (icon === "award") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M12 14.5C15.04 14.5 17.5 12.04 17.5 9C17.5 5.96 15.04 3.5 12 3.5C8.96 3.5 6.5 5.96 6.5 9C6.5 12.04 8.96 14.5 12 14.5Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M8.8 13.45L7.8 20L12 17.6L16.2 20L15.2 13.45" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    );
  }

  if (icon === "mountain") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
        <path d="M3 19L9.5 7L13 13L15 10L21 19H3Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.6" />
        <path d="M8.5 9L10.2 10.7L11.3 9.4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M7.63 4.51C8.68 2.61 9.21 1.67 10 1.67C10.79 1.67 11.32 2.61 12.37 4.51L12.65 5C12.95 5.53 13.1 5.8 13.33 5.98C13.56 6.16 13.85 6.22 14.44 6.36L14.97 6.48C17.02 6.94 18.04 7.17 18.29 7.96C18.53 8.74 17.83 9.56 16.43 11.19L16.07 11.61C15.67 12.08 15.48 12.31 15.39 12.6C15.3 12.89 15.33 13.2 15.39 13.81L15.44 14.38C15.65 16.56 15.76 17.65 15.12 18.13C14.48 18.62 13.52 18.18 11.6 17.29L11.11 17.06C10.56 16.81 10.29 16.69 10 16.69C9.71 16.69 9.44 16.81 8.89 17.06L8.4 17.29C6.48 18.18 5.52 18.62 4.88 18.13C4.24 17.65 4.35 16.56 4.56 14.38L4.61 13.81C4.67 13.2 4.7 12.89 4.61 12.6C4.52 12.31 4.33 12.08 3.93 11.61L3.57 11.19C2.17 9.56 1.47 8.74 1.71 7.96C1.96 7.17 2.98 6.94 5.03 6.48L5.56 6.36C6.15 6.22 6.44 6.16 6.67 5.98C6.9 5.8 7.05 5.53 7.35 5L7.63 4.51Z"
        fill="currentColor"
      />
    </svg>
  );
}
