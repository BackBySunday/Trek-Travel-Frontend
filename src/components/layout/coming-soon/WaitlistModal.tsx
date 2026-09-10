"use client";

import Image from "next/image";
import { useState, type FormEvent, type ReactNode } from "react";
import ModalFrame from "./ModalFrame";

type WaitlistRole = "traveler" | "organiser";
type WaitlistView = "role" | "form" | "success";
type DropdownOption = {
  value: string;
  label: string;
};

type WaitlistModalProps = {
  destination: string | null;
  onClose: () => void;
};

const inputClassName =
  "h-11 w-full rounded-xl border border-[#dce3df] bg-white px-3 font-urbanist text-sm text-[#18231e] outline-none transition-colors placeholder:text-[#8c9991] focus:border-[#426857] focus:ring-2 focus:ring-[#426857]/10";

const dropdownButtonClassName =
  "flex h-11 w-full cursor-pointer items-center justify-between rounded-xl border border-[#dce3df] bg-[#f8faf8] px-3 font-urbanist text-sm text-[#18231e] outline-none transition-colors focus:border-[#426857] focus:ring-2 focus:ring-[#426857]/10";

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="block font-urbanist text-sm font-semibold text-[#26352e]">
      {children}
    </label>
  );
}

function SelectChevron({ open = false }: { open?: boolean }) {
  return (
    <span className="pointer-events-none grid h-7 w-7 place-items-center text-[#426857]">
      <svg
        viewBox="0 0 20 20"
        aria-hidden="true"
        className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
        fill="none"
      >
        <path
          d="m5.5 7.5 4.5 4.5 4.5-4.5"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.8"
        />
      </svg>
    </span>
  );
}

function ModalDropdown({
  value,
  placeholder,
  options,
  onChange,
}: {
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <div
      className="relative mt-1.5"
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={dropdownButtonClassName}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setOpen(false);
          if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={selectedOption ? "" : "text-[#8c9991]"}>
          {selectedOption?.label ?? placeholder}
        </span>
        <SelectChevron open={open} />
      </button>
      {open && (
        <div
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-30 max-h-48 overflow-y-auto rounded-xl border border-[#dce3df] bg-white p-1.5 shadow-[0_16px_34px_rgba(31,42,55,0.16)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                className={`flex min-h-9 w-full items-center justify-between rounded-lg px-3 text-left font-urbanist text-sm transition-colors ${
                  isSelected
                    ? "bg-[#e8f3ed] text-[#18231e]"
                    : "text-[#526359] hover:bg-[#f2f6f3] hover:text-[#18231e]"
                }`}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <span>{option.label}</span>
                {isSelected && (
                  <span className="text-[#426857]" aria-hidden="true">
                    {"\u2713"}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

function TravelerIcon() {
  return (
    <Image
      src="/Animation/traveler-role-icon.png"
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 object-contain"
    />
  );
}

function OrganiserIcon() {
  return (
    <Image
      src="/Animation/organiser-role-icon.png"
      alt=""
      width={28}
      height={28}
      className="h-7 w-7 object-contain"
    />
  );
}

export default function WaitlistModal({ destination, onClose }: WaitlistModalProps) {
  const [view, setView] = useState<WaitlistView>("role");
  const [role, setRole] = useState<WaitlistRole | null>(null);
  const [travelerForm, setTravelerForm] = useState({
    name: "",
    email: "",
    phone: "",
    interest: "",
    otherInterest: "",
  });
  const [organiserForm, setOrganiserForm] = useState({
    company: "",
    email: "",
    registered: "",
    operates: "",
    tripsMonthly: "",
    website: "",
  });
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [alreadyJoined, setAlreadyJoined] = useState(false);

  const chooseRole = (nextRole: WaitlistRole) => {
    setRole(nextRole);
    setView("form");
  };

  const submitWaitlist = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!role) return;

    setSubmitError("");
    setAlreadyJoined(false);
    setSubmitting(true);

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          role,
          destination,
          ...(role === "traveler"
            ? travelerForm
            : {
                company: organiserForm.company,
                email: organiserForm.email,
                registered: organiserForm.registered,
                operates: organiserForm.operates,
                tripsMonthly: organiserForm.tripsMonthly,
                website: organiserForm.website,
              }),
        }),
      });

      const result = (await response.json().catch(() => null)) as {
        error?: string;
        alreadyJoined?: boolean;
      } | null;

      if (!response.ok) {
        setSubmitError(
          result?.error ?? "Could not join the waitlist. Please try again.",
        );
        return;
      }

      setAlreadyJoined(Boolean(result?.alreadyJoined));
      setView("success");
    } catch {
      setSubmitError(
        "Could not join the waitlist. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const isTravelerReady = Boolean(
    travelerForm.name && travelerForm.email && travelerForm.interest,
  );
  const isOrganiserReady = Boolean(
    organiserForm.company &&
      organiserForm.email &&
      organiserForm.registered &&
      organiserForm.operates &&
      organiserForm.tripsMonthly,
  );

  return (
    <ModalFrame
      labelledBy="waitlist-title"
      closeLabel="Close waitlist form"
      onClose={onClose}
    >
      {view === "role" && (
        <div className="mx-auto max-w-[400px] pt-8 text-center sm:pt-9">
          <p className="font-urbanist text-sm font-semibold text-[#426857]">
            Join the waitlist
          </p>
          <h2
            id="waitlist-title"
            className="mt-2 font-urbanist text-2xl font-semibold leading-tight sm:text-3xl"
          >
            Tell us who you are.
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => chooseRole("traveler")}
              className="rounded-2xl border border-[#dce3df] bg-white px-4 py-5 text-left transition-colors hover:border-[#426857] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
            >
              <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#e8f3ed] text-[#426857]">
                <TravelerIcon />
              </span>
              <span className="block font-urbanist text-base font-semibold text-[#18231e]">
                Traveler
              </span>
              <span className="mt-1 block font-urbanist text-sm leading-5 text-[#526359]">
                I want updates when this trip opens.
              </span>
            </button>
            <button
              type="button"
              onClick={() => chooseRole("organiser")}
              className="rounded-2xl border border-[#dce3df] bg-white px-4 py-5 text-left transition-colors hover:border-[#426857] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#426857]"
            >
              <span className="mb-3 grid h-10 w-10 place-items-center rounded-full bg-[#e8f3ed] text-[#426857]">
                <OrganiserIcon />
              </span>
              <span className="block font-urbanist text-base font-semibold text-[#18231e]">
                Organiser
              </span>
              <span className="mt-1 block font-urbanist text-sm leading-5 text-[#526359]">
                I run treks or travel experiences.
              </span>
            </button>
          </div>
        </div>
      )}

      {view === "form" && role === "traveler" && (
        <form className="mx-auto max-w-[400px] pt-8 sm:pt-9" onSubmit={submitWaitlist}>
          <p className="font-urbanist text-sm font-semibold text-[#426857]">
            Traveler waitlist
          </p>
          <h2
            id="waitlist-title"
            className="mt-2 font-urbanist text-2xl font-semibold leading-tight"
          >
            Get first access.
          </h2>
          <div className="mt-5 grid gap-3">
            <div>
              <FieldLabel>Full name</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                value={travelerForm.name}
                onChange={(event) =>
                  setTravelerForm({ ...travelerForm, name: event.target.value })
                }
                autoComplete="name"
                maxLength={120}
                required
              />
            </div>
            <div>
              <FieldLabel>Email address</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                type="email"
                value={travelerForm.email}
                onChange={(event) =>
                  setTravelerForm({ ...travelerForm, email: event.target.value })
                }
                autoComplete="email"
                inputMode="email"
                maxLength={180}
                required
              />
            </div>
            <div>
              <FieldLabel>Phone number (optional)</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                value={travelerForm.phone}
                onChange={(event) =>
                  setTravelerForm({ ...travelerForm, phone: event.target.value })
                }
                autoComplete="tel"
                inputMode="tel"
                maxLength={40}
              />
            </div>
            <div>
              <FieldLabel>Interested in</FieldLabel>
              <ModalDropdown
                value={travelerForm.interest}
                placeholder="Choose one"
                options={[
                  { value: "treks", label: "Treks" },
                  { value: "trips", label: "Trips" },
                  { value: "adventure", label: "Adventure" },
                  { value: "others", label: "Others" },
                ]}
                onChange={(interest) =>
                  setTravelerForm({ ...travelerForm, interest })
                }
              />
              {travelerForm.interest === "others" && (
                <input
                  className={`${inputClassName} mt-2`}
                  value={travelerForm.otherInterest}
                  onChange={(event) =>
                    setTravelerForm({
                      ...travelerForm,
                      otherInterest: event.target.value,
                    })
                  }
                  placeholder="Tell us what you are looking for"
                  maxLength={180}
                />
              )}
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setView("role")}
              className="h-11 rounded-full px-5 font-urbanist text-sm font-semibold text-[#426857]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isTravelerReady || submitting}
              className="h-11 rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting ? "Joining..." : "Join waitlist"}
            </button>
          </div>
          {submitError && (
            <p className="mt-3 font-urbanist text-sm text-[#b42318]">
              {submitError}
            </p>
          )}
        </form>
      )}

      {view === "form" && role === "organiser" && (
        <form className="mx-auto max-w-[400px] pt-8 sm:pt-9" onSubmit={submitWaitlist}>
          <p className="font-urbanist text-sm font-semibold text-[#426857]">
            Organiser waitlist
          </p>
          <h2
            id="waitlist-title"
            className="mt-2 font-urbanist text-2xl font-semibold leading-tight"
          >
            Partner access starts here.
          </h2>
          <div className="mt-5 grid gap-3">
            <div>
              <FieldLabel>Organiser / company name</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                value={organiserForm.company}
                onChange={(event) =>
                  setOrganiserForm({
                    ...organiserForm,
                    company: event.target.value,
                  })
                }
                maxLength={160}
                required
              />
            </div>
            <div>
              <FieldLabel>Email address</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                type="email"
                value={organiserForm.email}
                onChange={(event) =>
                  setOrganiserForm({ ...organiserForm, email: event.target.value })
                }
                autoComplete="email"
                inputMode="email"
                maxLength={180}
                required
              />
            </div>
            <div>
              <FieldLabel>Are you registered?</FieldLabel>
              <ModalDropdown
                value={organiserForm.registered}
                placeholder="Choose one"
                options={[
                  { value: "yes", label: "Yes" },
                  { value: "no", label: "No" },
                  { value: "in-progress", label: "In progress" },
                ]}
                onChange={(registered) =>
                  setOrganiserForm({ ...organiserForm, registered })
                }
              />
            </div>
            <div>
              <FieldLabel>Where do you operate?</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                value={organiserForm.operates}
                onChange={(event) =>
                  setOrganiserForm({
                    ...organiserForm,
                    operates: event.target.value,
                  })
                }
                placeholder="Uttarakhand, Himachal, Pune"
                maxLength={180}
                required
              />
            </div>
            <div>
              <FieldLabel>Trips per month</FieldLabel>
              <ModalDropdown
                value={organiserForm.tripsMonthly}
                placeholder="Choose one"
                options={[
                  { value: "1-5", label: "1-5" },
                  { value: "6-15", label: "6-15" },
                  { value: "16+", label: "16+" },
                  { value: "seasonal", label: "Seasonal only" },
                ]}
                onChange={(tripsMonthly) =>
                  setOrganiserForm({ ...organiserForm, tripsMonthly })
                }
              />
            </div>
            <div>
              <FieldLabel>Website or social link (optional)</FieldLabel>
              <input
                className={`${inputClassName} mt-1.5`}
                value={organiserForm.website}
                onChange={(event) =>
                  setOrganiserForm({ ...organiserForm, website: event.target.value })
                }
                placeholder="https://"
                inputMode="url"
                maxLength={220}
              />
            </div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-between">
            <button
              type="button"
              onClick={() => setView("role")}
              className="h-11 rounded-full px-5 font-urbanist text-sm font-semibold text-[#426857]"
            >
              Back
            </button>
            <button
              type="submit"
              disabled={!isOrganiserReady || submitting}
              className="h-11 rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-45"
            >
              {submitting ? "Joining..." : "Join waitlist"}
            </button>
          </div>
          {submitError && (
            <p className="mt-3 font-urbanist text-sm text-[#b42318]">
              {submitError}
            </p>
          )}
        </form>
      )}

      {view === "success" && (
        <div className="mx-auto max-w-[390px] py-10 text-center">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#e8f3ed] text-2xl text-[#426857]">
            <span aria-hidden="true">{"\u2713"}</span>
          </div>
          <h2
            id="waitlist-title"
            className="mt-5 font-urbanist text-2xl font-semibold leading-tight"
          >
            {alreadyJoined ? "You're already on the list." : "You're on the list."}
          </h2>
          <p className="mt-3 font-urbanist text-base leading-6 text-[#526359]">
            {alreadyJoined
              ? "We already have your email saved. We'll reach out when updates are ready."
              : `We'll reach out when ${destination ?? "this experience"} is ready.`}
          </p>
          <button
            type="button"
            onClick={onClose}
            className="mx-auto mt-6 flex h-11 items-center justify-center rounded-full bg-[#18231e] px-6 font-urbanist text-sm font-semibold text-white"
          >
            Done
          </button>
        </div>
      )}
    </ModalFrame>
  );
}
