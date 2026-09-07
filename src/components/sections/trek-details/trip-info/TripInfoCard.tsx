"use client";

import { useEffect, useRef, useState } from "react";

type TripFact = {
  label: string;
  value: string;
  icon: "duration" | "departure" | "destination" | "trekDuration" | "rating" | "group";
};

const basePrice = 2110;
const maxTravelers = 10;
const pickupOptions = ["Toll Road - Dehradun", "City Center", "Railway Station"];
const genderOptions = ["Male", "Female", "Other"];
const foodPreferenceOptions = ["Non-Veg", "Veg", "Jain"];

const tripFacts: TripFact[] = [
  { label: "Duration", value: "5 D / 4 N", icon: "duration" },
  { label: "Departure", value: "October 14, 2026", icon: "departure" },
  { label: "Destination", value: "Vasota Fort", icon: "destination" },
  { label: "Trek Duration", value: "6 Hours", icon: "trekDuration" },
  { label: "Trek Rating", value: "Light", icon: "rating" },
  { label: "Group size", value: "Max 10 Travelers", icon: "group" },
];

function ClockIcon() {
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13 23.833C18.983 23.833 23.833 18.983 23.833 13C23.833 7.017 18.983 2.167 13 2.167C7.017 2.167 2.167 7.017 2.167 13C2.167 18.983 7.017 23.833 13 23.833ZM13.813 8.667C13.813 8.218 13.449 7.854 13 7.854C12.551 7.854 12.188 8.218 12.188 8.667V13C12.188 13.216 12.273 13.422 12.426 13.575L15.134 16.283C15.451 16.6 15.966 16.6 16.283 16.283C16.6 15.966 16.6 15.451 16.283 15.134L13.813 12.663V8.667Z" fill="#1A1A17" />
    </svg>
  );
}

function BusIcon() {
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13 2.167C8.914 2.167 6.872 2.167 5.602 3.436C4.451 4.588 4.344 6.376 4.334 9.75H3.25C2.652 9.75 2.167 10.235 2.167 10.833V11.917C2.167 12.258 2.327 12.579 2.6 12.783L4.333 14.083C4.343 17.457 4.451 19.246 5.602 20.397C5.865 20.66 6.16 20.868 6.5 21.033V22.75C6.5 23.348 6.985 23.833 7.583 23.833H9.208C9.807 23.833 10.292 23.348 10.292 22.75V21.647C11.079 21.667 11.975 21.667 13 21.667C14.025 21.667 14.921 21.667 15.708 21.647V22.75C15.708 23.348 16.193 23.833 16.792 23.833H18.417C19.015 23.833 19.5 23.348 19.5 22.75V21.033C19.84 20.868 20.135 20.66 20.397 20.397C21.549 19.246 21.657 17.457 21.667 14.083L23.4 12.783C23.673 12.579 23.833 12.258 23.833 11.917V10.833C23.833 10.235 23.348 9.75 22.75 9.75H21.666C21.656 6.376 21.549 4.588 20.397 3.436C19.128 2.167 17.086 2.167 13 2.167Z" fill="#1A1A17" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M5.417 11.083C5.417 6.895 8.812 3.5 13 3.5C17.188 3.5 20.583 6.895 20.583 11.083C20.583 15.237 17.867 20.081 14.021 21.939C13.372 22.252 12.628 22.252 11.979 21.939C8.133 20.081 5.417 15.237 5.417 11.083ZM13 14.083C14.497 14.083 15.708 12.872 15.708 11.375C15.708 9.878 14.497 8.667 13 8.667C11.503 8.667 10.292 9.878 10.292 11.375C10.292 12.872 11.503 14.083 13 14.083Z" fill="#1A1A17" />
    </svg>
  );
}

function TrekIcon() {
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M11.808 16.25L10.048 24.05C9.994 24.303 9.863 24.51 9.655 24.673C9.448 24.835 9.208 24.917 8.938 24.917C8.576 24.917 8.288 24.781 8.071 24.51C7.854 24.24 7.782 23.933 7.854 23.59L10.915 8.071C11.023 7.547 11.267 7.155 11.646 6.893C12.025 6.631 12.422 6.5 12.838 6.5C13.253 6.5 13.637 6.59 13.989 6.771C14.341 6.951 14.625 7.222 14.842 7.583L15.925 9.317C16.25 9.84 16.67 10.314 17.184 10.739C17.699 11.163 18.29 11.474 18.958 11.673V10.563C18.958 10.328 19.035 10.134 19.189 9.98C19.342 9.827 19.536 9.75 19.771 9.75C20.006 9.75 20.2 9.827 20.353 9.98C20.507 10.134 20.583 10.328 20.583 10.563V24.104C20.583 24.339 20.507 24.533 20.353 24.686C20.2 24.84 20.006 24.917 19.771 24.917C19.536 24.917 19.342 24.84 19.189 24.686C19.035 24.533 18.958 24.339 18.958 24.104V13.921C18.092 13.722 17.288 13.406 16.548 12.973C15.808 12.54 15.167 12.007 14.625 11.375L13.975 14.625L15.925 16.467C16.033 16.575 16.115 16.697 16.169 16.832C16.223 16.968 16.25 17.108 16.25 17.252V23.833C16.25 24.14 16.146 24.398 15.939 24.605C15.731 24.813 15.474 24.917 15.167 24.917C14.86 24.917 14.602 24.813 14.395 24.605C14.187 24.398 14.083 24.14 14.083 23.833V18.417L11.808 16.25Z" fill="#1A1A17" />
    </svg>
  );
}

function GroupIcon() {
  return (
    <svg viewBox="0 0 26 26" fill="none" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M13 12.458C15.094 12.458 16.792 10.761 16.792 8.667C16.792 6.573 15.094 4.875 13 4.875C10.906 4.875 9.208 6.573 9.208 8.667C9.208 10.761 10.906 12.458 13 12.458Z" fill="#1A1A17" />
      <path d="M20.583 20.042C20.583 22.136 17.187 23.833 13 23.833C8.813 23.833 5.417 22.136 5.417 20.042C5.417 17.948 8.813 16.25 13 16.25C17.187 16.25 20.583 17.948 20.583 20.042Z" fill="#1A1A17" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M16 29.333C9.714 29.333 6.572 29.333 4.619 27.381C2.667 25.428 2.667 22.285 2.667 16C2.667 9.715 2.667 6.572 4.619 4.619C6.572 2.667 9.714 2.667 16 2.667C22.285 2.667 25.428 2.667 27.381 4.619C29.333 6.572 29.333 9.715 29.333 16C29.333 22.285 29.333 25.428 27.381 27.381C25.428 29.333 22.285 29.333 16 29.333ZM16 11C16.552 11 17 11.448 17 12V15H20C20.552 15 21 15.448 21 16C21 16.552 20.552 17 20 17H17V20C17 20.552 16.552 21 16 21C15.448 21 15 20.552 15 20V17H12C11.448 17 11 16.552 11 16C11 15.448 11.448 15 12 15H15V12C15 11.448 15.448 11 16 11Z" fill="#393939" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg viewBox="0 0 30 30" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path d="M1.5 15C1.5 8.636 1.5 5.454 3.477 3.477C5.454 1.5 8.636 1.5 15 1.5C21.364 1.5 24.546 1.5 26.523 3.477C28.5 5.454 28.5 8.636 28.5 15C28.5 21.364 28.5 24.546 26.523 26.523C24.546 28.5 21.364 28.5 15 28.5C8.636 28.5 5.454 28.5 3.477 26.523C1.5 24.546 1.5 21.364 1.5 15Z" stroke="#D7D7D7" strokeWidth="1.5" />
      <path d="M19 15H11" stroke="#D7D7D7" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 36 36" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.481 12.451C6.875 11.991 7.568 11.938 8.028 12.332L17.553 20.497L27.079 12.332C27.539 11.938 28.232 11.991 28.626 12.451C29.02 12.911 28.967 13.604 28.507 13.998L18.267 22.775C17.857 23.127 17.25 23.127 16.84 22.775L6.6 13.998C6.14 13.604 6.087 12.911 6.481 12.451Z" fill="#909090" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 32 32" fill="none" className="h-6 w-6 shrink-0" aria-hidden="true">
      <path d="M8 24L24 8M24 20V8H12" stroke="#101010" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TripFactIcon({ icon }: { icon: TripFact["icon"] }) {
  if (icon === "duration") return <ClockIcon />;
  if (icon === "departure") return <BusIcon />;
  if (icon === "destination") return <PinIcon />;
  if (icon === "group") return <GroupIcon />;
  return <TrekIcon />;
}

function Divider() {
  return <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />;
}

function TripFactRow({ fact }: { fact: TripFact }) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-2">
        <TripFactIcon icon={fact.icon} />
        <p className="w-fit font-urbanist text-base leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
          {fact.label}
        </p>
      </div>
      <p className="max-w-[54%] text-right font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
        {fact.value}
      </p>
    </div>
  );
}

function DropdownPill({
  label,
  value,
  options,
  onChange,
  className = "w-full",
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  className?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.max(0, options.indexOf(value)),
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const listboxId = `${label.toLowerCase().replace(/\s+/g, "-")}-options`;
  const selectedIndex = Math.max(0, options.indexOf(value));

  useEffect(() => {
    if (!isOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      optionRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isOpen]);

  function selectOption(option: string) {
    onChange(option);
    setIsOpen(false);
  }

  function toggleDropdown() {
    setIsOpen((current) => {
      if (!current) {
        setActiveIndex(selectedIndex);
      }

      return !current;
    });
  }

  function handleButtonKeyDown(event: React.KeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      setActiveIndex(selectedIndex);
      setIsOpen(true);
    }
  }

  function handleOptionKeyDown(
    event: React.KeyboardEvent<HTMLButtonElement>,
    option: string,
  ) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(options.length - 1, current + 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(0, current - 1));
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      selectOption(option);
    }
  }

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-label={label}
        aria-controls={listboxId}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        onClick={toggleDropdown}
        onKeyDown={handleButtonKeyDown}
        className="flex min-h-10 w-full items-center justify-between gap-2 rounded-[10px] border border-[#CBCBCB] bg-[#F6F7F7] py-2 pl-3 pr-2 font-urbanist text-sm font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17] shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] outline-none transition-colors hover:border-[#AFAFAF] focus-visible:border-[#393939] focus-visible:ring-2 focus-visible:ring-[#1A1A17]/10"
      >
        <span className="truncate">{value}</span>
        <ChevronDownIcon />
      </button>

      {isOpen && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 top-[calc(100%+8px)] z-30 w-full min-w-[150px] overflow-hidden rounded-[14px] border border-[#D7D7D7] bg-white p-1 shadow-[0_14px_34px_rgba(16,16,16,0.14)]"
        >
          {options.map((option, index) => {
            const isSelected = option === value;
            const isActive = index === activeIndex;

            return (
              <button
                key={option}
                type="button"
                role="option"
                ref={(element) => {
                  optionRefs.current[index] = element;
                }}
                aria-selected={isSelected}
                tabIndex={isActive ? 0 : -1}
                onFocus={() => setActiveIndex(index)}
                onClick={() => {
                  selectOption(option);
                }}
                onKeyDown={(event) => handleOptionKeyDown(event, option)}
                className={`flex min-h-9 w-full items-center rounded-[10px] px-3 text-left font-urbanist text-sm font-medium leading-[1.32] tracking-[0.02em] transition-colors ${
                  isSelected
                    ? "bg-[#1A1A17] text-white"
                    : isActive
                      ? "bg-[#F6F7F7] text-[#1A1A17]"
                      : "text-[#1A1A17] hover:bg-[#F6F7F7]"
                }`}
              >
                <span className="truncate">{option}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function TripInfoCard() {
  const [pickupSpot, setPickupSpot] = useState("Toll Road - Dehradun");
  const [travelers, setTravelers] = useState(1);
  const [travelerName, setTravelerName] = useState("Rishabh");
  const [gender, setGender] = useState("Male");
  const [foodPreference, setFoodPreference] = useState("Non-Veg");
  const total = basePrice * travelers;

  function decreaseTravelers() {
    setTravelers((current) => Math.max(1, current - 1));
  }

  function increaseTravelers() {
    setTravelers((current) => Math.min(maxTravelers, current + 1));
  }

  return (
    <aside className="w-full max-w-[460px]">
      <form
        className="flex w-full flex-col items-center gap-4 rounded-[26px] bg-[#F6F7F7] pb-5 text-[#1A1A17] sm:gap-5 sm:rounded-[30px] sm:pb-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="flex w-full flex-col items-start gap-2.5 rounded-[26px] bg-[#1A1A17] px-7 py-5 sm:rounded-[30px] sm:px-8 sm:py-6">
          <p className="w-full font-urbanist text-sm font-semibold leading-[1.32em] tracking-[0.02em] text-[#FFF]">
            Starting From
          </p>
          <p className="flex w-fit items-end font-urbanist leading-none">
            <span className="text-[32px] font-semibold tracking-[0.01em] text-white sm:text-[34px]">
              $3,150
            </span>
            <span className="pb-1 text-sm font-normal tracking-[0.02em] text-[#D9D9D9]">
              /person
            </span>
          </p>
        </div>

        <Divider />

        <div className="flex w-full flex-col items-center gap-4 px-5 sm:gap-5 sm:px-6">
          <div className="flex w-full flex-col items-start gap-4 sm:gap-5">
            <div className="flex w-full flex-col items-start gap-3.5">
              {tripFacts.map((fact) => (
                <TripFactRow key={fact.label} fact={fact} />
              ))}
            </div>

            <Divider />

            <p className="w-full text-center font-urbanist text-xl font-semibold text-[#393939] sm:text-[22px]">
              Reserve Your Spot
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-4 sm:gap-5">
            <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
                Pickup Spot :
              </p>
              <DropdownPill
                label="Pickup spot"
                value={pickupSpot}
                options={pickupOptions}
                onChange={setPickupSpot}
                className="w-full sm:w-fit"
              />
            </div>

            <div className="flex w-full flex-col items-center gap-4">
              <div className="flex w-full items-center justify-between gap-4">
                <p className="font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-black">
                  No. of Travelers
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    aria-label="Decrease travelers"
                    disabled={travelers === 1}
                    onClick={decreaseTravelers}
                    className="transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <MinusIcon />
                  </button>
                  <p className="font-urbanist text-xl font-medium leading-[1.32] tracking-[0.02em] text-black">
                    {travelers}
                  </p>
                  <button
                    type="button"
                    aria-label="Increase travelers"
                    disabled={travelers === maxTravelers}
                    onClick={increaseTravelers}
                    className="transition-opacity disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    <PlusIcon />
                  </button>
                </div>
              </div>

              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-[1.15fr_0.85fr_1fr]">
                <div className="flex flex-col items-start gap-2">
                  <p className="w-full font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
                    Name
                  </p>
                  <input
                    aria-label="Traveler name"
                    value={travelerName}
                    onChange={(event) => setTravelerName(event.target.value)}
                    className="min-h-10 w-full truncate rounded-[10px] border border-[#CBCBCB] bg-[#F6F7F7] px-3 py-2 font-urbanist text-sm font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]"
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="w-full font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
                    Gender
                  </p>
                  <DropdownPill
                    label="Gender"
                    value={gender}
                    options={genderOptions}
                    onChange={setGender}
                  />
                </div>

                <div className="flex flex-col items-start gap-2">
                  <p className="w-full font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#1A1A17]">
                    Food Pref.
                  </p>
                  <DropdownPill
                    label="Food preference"
                    value={foodPreference}
                    options={foodPreferenceOptions}
                    onChange={setFoodPreference}
                  />
                </div>
              </div>

              <Divider />

              <div className="flex w-full items-center justify-between gap-4">
                <p className="font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-black">
                  Total (before taxes)
                </p>
                <p className="font-urbanist text-xl font-bold leading-[1.32] tracking-[0.02em] text-black">
                  Rs {total}
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="flex h-11 w-[calc(100%-40px)] items-center justify-between rounded-[113.1px] bg-[rgba(20,20,20,0.84)] py-[5px] pl-5 pr-[5px] font-urbanist text-lg font-semibold text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] sm:h-12 sm:w-[calc(100%-48px)] sm:pl-6 sm:text-xl"
        >
          <span>Book Now</span>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[63px] bg-white sm:h-10 sm:w-10">
            <ArrowIcon />
          </span>
        </button>
      </form>
    </aside>
  );
}
