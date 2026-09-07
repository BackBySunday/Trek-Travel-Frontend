"use client";

import { useState } from "react";

export default function TripInfoOverview() {
  const includedItems = [
    "Japan Rail (JR) pass for 7 days",
    "Hiroshima Peace Park visit",
    "Kyoto Temple tour",
  ];
  const excludedItems = ["Daily Lunch", "Shopping Expenses", "Flight Tickets"];
  const itineraryDays = [
    {
      day: "Day 1",
      title: "Arrival in Marrakech",
      description:
        "Arrive and settle into your riad. As evening approaches, step into the medina where the citys movement, sound, and energy create your first impression.",
      isOpen: true,
    },
    {
      day: "Day 2",
      title: "Osaka to Hiroshima",
      description:
        "Arrive and settle into your riad. As evening approaches, step into the medina where the citys movement, sound, and energy create your first impression.",
    },
    {
      day: "Day 3",
      title: "Osaka to Hiroshima",
      description:
        "Arrive and settle into your riad. As evening approaches, step into the medina where the citys movement, sound, and energy create your first impression.",
    },
    {
      day: "Day 4",
      title: "Osaka to Hiroshima",
      description:
        "Arrive and settle into your riad. As evening approaches, step into the medina where the citys movement, sound, and energy create your first impression.",
    },
  ];
  const [openDays, setOpenDays] = useState(() =>
    new Set(
      itineraryDays
        .filter((day) => day.isOpen)
        .map((day) => day.day),
    ),
  );

  function toggleDay(day: string) {
    setOpenDays((current) => {
      const next = new Set(current);

      if (next.has(day)) {
        next.delete(day);
      } else {
        next.add(day);
      }

      return next;
    });
  }

  return (
    <div className="flex w-full flex-col items-start gap-7 text-[#101010] sm:gap-8">
      <div className="flex w-full flex-col items-start gap-4">
        <h1 className="w-fit font-urbanist text-[clamp(1.875rem,3vw,44px)] font-medium leading-tight">
          Japan Express: Osaka to Tokyo
        </h1>
        <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />
        <p className="w-full max-w-[860px] font-urbanist text-base leading-[1.45] tracking-[0.02em] sm:text-lg">
          Marrakech begins with movement. Streets feel dense, sounds overlap,
          and every corner brings something new into view. But as the journey
          continues, that intensity gradually falls away. Roads begin to
          stretch, the air feels wider, and the surroundings become quieter. By
          the time the desert appears, everything changes. Space replaces
          structure, and silence becomes part of the experience. This shift from
          city to open landscape defines the entire journey, creating a sense of
          progression that unfolds naturally over each day.
        </p>
      </div>

      <div className="flex w-full items-start gap-3 rounded-[10px] border border-[#2684FC] bg-[#E7EEFF] px-3 py-4 text-[#002888] sm:items-center">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0 overflow-hidden sm:h-6 sm:w-6"
          aria-hidden="true"
        >
          <path
            d="M17 14C17.5523 14 18 13.5523 18 13C18 12.4477 17.5523 12 17 12C16.4477 12 16 12.4477 16 13C16 13.5523 16.4477 14 17 14Z"
            fill="#002888"
          />
          <path
            d="M17 18C17.5523 18 18 17.5523 18 17C18 16.4477 17.5523 16 17 16C16.4477 16 16 16.4477 16 17C16 17.5523 16.4477 18 17 18Z"
            fill="#002888"
          />
          <path
            d="M13 13C13 13.5523 12.5523 14 12 14C11.4477 14 11 13.5523 11 13C11 12.4477 11.4477 12 12 12C12.5523 12 13 12.4477 13 13Z"
            fill="#002888"
          />
          <path
            d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z"
            fill="#002888"
          />
          <path
            d="M7 14C7.55229 14 8 13.5523 8 13C8 12.4477 7.55229 12 7 12C6.44772 12 6 12.4477 6 13C6 13.5523 6.44772 14 7 14Z"
            fill="#002888"
          />
          <path
            d="M7 18C7.55229 18 8 17.5523 8 17C8 16.4477 7.55229 16 7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18Z"
            fill="#002888"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7 1.75C7.41421 1.75 7.75 2.08579 7.75 2.5V3.26272C8.412 3.24999 9.14133 3.24999 9.94346 3.25H14.0564C14.8586 3.24999 15.588 3.24999 16.25 3.26272V2.5C16.25 2.08579 16.5858 1.75 17 1.75C17.4142 1.75 17.75 2.08579 17.75 2.5V3.32709C18.0099 3.34691 18.2561 3.37182 18.489 3.40313C19.6614 3.56076 20.6104 3.89288 21.3588 4.64124C22.1071 5.38961 22.4392 6.33855 22.5969 7.51098C22.75 8.65018 22.75 10.1058 22.75 11.9435V14.0564C22.75 15.8941 22.75 17.3498 22.5969 18.489C22.4392 19.6614 22.1071 20.6104 21.3588 21.3588C20.6104 22.1071 19.6614 22.4392 18.489 22.5969C17.3498 22.75 15.8942 22.75 14.0565 22.75H9.94359C8.10585 22.75 6.65018 22.75 5.51098 22.5969C4.33856 22.4392 3.38961 22.1071 2.64124 21.3588C1.89288 20.6104 1.56076 19.6614 1.40314 18.489C1.24997 17.3498 1.24998 15.8942 1.25 14.0564V11.9436C1.24998 10.1058 1.24997 8.65019 1.40314 7.51098C1.56076 6.33855 1.89288 5.38961 2.64124 4.64124C3.38961 3.89288 4.33856 3.56076 5.51098 3.40313C5.7439 3.37182 5.99006 3.34691 6.25 3.32709V2.5C6.25 2.08579 6.58579 1.75 7 1.75ZM5.71085 4.88976C4.70476 5.02502 4.12511 5.27869 3.7019 5.7019C3.27869 6.12511 3.02502 6.70476 2.88976 7.71085C2.86685 7.88123 2.8477 8.06061 2.83168 8.25H21.1683C21.1523 8.06061 21.1331 7.88124 21.1102 7.71085C20.975 6.70476 20.7213 6.12511 20.2981 5.7019C19.8749 5.27869 19.2952 5.02502 18.2892 4.88976C17.2615 4.75159 15.9068 4.75 14 4.75H10C8.09318 4.75 6.73851 4.75159 5.71085 4.88976ZM2.75 12C2.75 11.146 2.75032 10.4027 2.76309 9.75H21.2369C21.2497 10.4027 21.25 11.146 21.25 12V14C21.25 15.9068 21.2484 17.2615 21.1102 18.2892C20.975 19.2952 20.7213 19.8749 20.2981 20.2981C19.8749 20.7213 19.2952 20.975 18.2892 21.1102C17.2615 21.2484 15.9068 21.25 14 21.25H10C8.09318 21.25 6.73851 21.2484 5.71085 21.1102C4.70476 20.975 4.12511 20.7213 3.7019 20.2981C3.27869 19.8749 3.02502 19.2952 2.88976 18.2892C2.75159 17.2615 2.75 15.9068 2.75 14V12Z"
            fill="#002888"
          />
        </svg>
        <p className="font-urbanist text-sm leading-[1.32] tracking-[0.02em] sm:text-base">
          Next departure: Oct 4, 2026&nbsp;&nbsp; Limited to 20 travellers&nbsp;&nbsp;
          6 spots left&nbsp;&nbsp; Free cancellation
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="w-fit font-urbanist text-[clamp(1.875rem,3vw,44px)] font-medium leading-tight">
          Why this Trek
        </h2>
        <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />
        <p className="w-full max-w-[860px] font-urbanist text-base leading-[1.45] tracking-[0.02em] sm:text-lg">
          Japan is a land of contrasts, where ancient traditions blend
          seamlessly with futuristic technology, This 9-day journey is designed
          to give you a taste of the country&apos;s incredible diversity,
          travelling at a pace that allows you to take it all in.
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4">
        <h2 className="w-fit font-urbanist text-[clamp(1.875rem,3vw,44px)] font-medium leading-tight">
          Whats Included
        </h2>
        <div className="grid w-full gap-5 rounded-[20px] bg-[#F6F7F7] px-5 py-6 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)] xl:px-8 xl:py-7">
          <div className="flex flex-col items-start gap-3">
            {includedItems.map((item) => (
              <div key={item} className="flex w-full items-center gap-2">
                <CheckIcon />
                <p className="font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-black sm:text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-start gap-3">
            {excludedItems.map((item) => (
              <div key={item} className="flex w-full items-center gap-2">
                <CrossIcon />
                <p className="font-urbanist text-base font-medium leading-[1.32] tracking-[0.02em] text-[#101010] sm:text-lg">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-start gap-6">
        <div className="flex w-full flex-col items-start gap-3">
          <h2 className="w-fit font-urbanist text-[clamp(1.875rem,3vw,44px)] font-medium leading-tight">
            Full Itinerary
          </h2>
          <p className="w-full max-w-[860px] font-urbanist text-base leading-[1.45] tracking-[0.02em] sm:text-lg">
            Five days moving from dense city streets into open desert
            landscapes.
          </p>
        </div>
        <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />
      </div>

      <div className="flex w-full flex-col items-start gap-5">
        {itineraryDays.map((day, index) => {
          const isOpen = openDays.has(day.day);
          const panelId = `itinerary-${day.day.toLowerCase().replace(/\s+/g, "-")}`;

          return (
            <div
              key={day.day}
              className="grid w-full grid-cols-1 md:grid-cols-[21px_minmax(0,1fr)] md:gap-x-4"
            >
              <div className="relative hidden md:block">
                <span className="absolute left-0 top-[6px] h-5 w-5 rounded-full border border-[#1A1A17] bg-white" />
                {index < itineraryDays.length - 1 && (
                  <span className="absolute bottom-[-20px] left-[10px] top-[26px] border-l border-[#1A1A17]" />
                )}
              </div>

              <div className="flex w-full flex-col items-start gap-6">
                <div className="flex w-full flex-col items-start gap-3">
                  <div className="flex w-full items-center justify-between gap-4">
                    <p className="font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-[#393939] sm:text-lg">
                      {day.day}
                    </p>
                    <button
                      type="button"
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[57px] bg-[#FAFAFA] p-2.5"
                      aria-controls={panelId}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${day.day}`}
                      onClick={() => toggleDay(day.day)}
                    >
                      {isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
                    </button>
                  </div>
                  <div id={panelId} className="flex w-full flex-col items-start gap-1">
                    <p className="w-full font-urbanist text-base font-semibold leading-[1.32] tracking-[0.02em] text-black sm:text-lg">
                      {day.title}
                    </p>
                    <p className="w-full font-urbanist text-base leading-[1.45] tracking-[0.02em] text-[#101010] sm:text-lg">
                      {day.description}
                    </p>
                  </div>
                </div>

                {isOpen && (
                  <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">
                    {[1, 2, 3].map((imageIndex) => (
                      <div
                        key={imageIndex}
                        aria-label={`Itinerary ${day.day} preview ${imageIndex}`}
                        role="img"
                        className="h-[160px] rounded-[20px] bg-[url('/Hero/hero-background.png')] bg-cover bg-center bg-no-repeat sm:h-[175px] lg:h-[190px]"
                      />
                    ))}
                  </div>
                )}

                {index < itineraryDays.length - 1 && (
                  <div className="h-px w-full border-b border-dashed border-b-[rgba(26,26,23,0.50)]" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 26 26"
      fill="none"
      className="h-5 w-5 shrink-0 sm:h-[26px] sm:w-[26px]"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.0001 23.8333C7.8932 23.8333 5.33976 23.8333 3.75325 22.2468C2.16675 20.6603 2.16675 18.1069 2.16675 13C2.16675 7.89311 2.16675 5.33967 3.75325 3.75316C5.33976 2.16666 7.8932 2.16666 13.0001 2.16666C18.107 2.16666 20.6604 2.16666 22.2469 3.75316C23.8334 5.33967 23.8334 7.89311 23.8334 13C23.8334 18.1069 23.8334 20.6603 22.2469 22.2468C20.6604 23.8333 18.107 23.8333 13.0001 23.8333ZM17.3663 9.71713C17.6836 10.0344 17.6836 10.5489 17.3663 10.8662L11.9496 16.2828C11.6323 16.6001 11.1179 16.6001 10.8006 16.2828L8.63389 14.1162C8.31659 13.7989 8.31659 13.2844 8.63389 12.9671C8.95119 12.6498 9.46564 12.6498 9.78294 12.9671L11.3751 14.5593L16.2172 9.71713C16.5345 9.39983 17.049 9.39983 17.3663 9.71713Z"
        fill="#171A26"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <span
      className="relative h-5 w-5 shrink-0 sm:h-[26px] sm:w-[26px]"
      aria-hidden="true"
    >
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-full bg-[#171A26] sm:w-[18px]" />
      <span className="absolute left-1/2 top-1/2 h-[2px] w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-[#171A26] sm:w-[18px]" />
    </span>
  );
}

function ChevronDownIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.43057 8.5119C4.70014 8.19741 5.17361 8.16099 5.48811 8.43055L12 14.0122L18.5119 8.43056C18.8264 8.16099 19.2999 8.19741 19.5695 8.5119C19.839 8.8264 19.8026 9.29987 19.4881 9.56944L12.4881 15.5694C12.2072 15.8102 11.7928 15.8102 11.5119 15.5694L4.51192 9.56944C4.19743 9.29987 4.161 8.8264 4.43057 8.5119Z"
        fill="#909090"
      />
    </svg>
  );
}

function ChevronUpIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5694 15.4881C19.2999 15.8026 18.8264 15.839 18.5119 15.5694L12 9.98779L5.48808 15.5694C5.17359 15.839 4.70011 15.8026 4.43054 15.4881C4.16098 15.1736 4.1974 14.7001 4.51189 14.4305L11.5119 8.43054C11.7928 8.1898 12.2072 8.1898 12.4881 8.43054L19.4881 14.4305C19.8026 14.7001 19.839 15.1736 19.5694 15.4881Z"
        fill="#909090"
      />
    </svg>
  );
}
