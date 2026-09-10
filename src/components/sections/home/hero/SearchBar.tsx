"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { useComingSoon } from "@/components/layout/ComingSoonProvider";

type SearchItem = {
  label: string;
  value: string;
  icon: "region" | "destination" | "date";
};

type SearchItemKey = SearchItem["icon"];
type DateMode = "quick" | "calendar";

const searchItems: Record<SearchItemKey, SearchItem> = {
  region: {
    label: "Regions",
    value: "Pune",
    icon: "region",
  },
  destination: {
    label: "Destinations",
    value: "Lohagad Trek",
    icon: "destination",
  },
  date: {
    label: "Date",
    value: "",
    icon: "date",
  },
};

const searchItemOrder: SearchItemKey[] = ["region", "destination", "date"];

const searchOptions: Record<SearchItemKey, string[]> = {
  region: ["Pune", "Mumbai", "Uttarakhand", "Himachal Pradesh", "Karnataka"],
  destination: [
    "Lohagad Trek",
    "Rajmachi Trek",
    "Kalsubai Trek",
    "Vasota Fort",
    "Harishchandragad",
  ],
  date: [],
};

function getToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function formatDateLabel(date: Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

function getRelativeDate(today: Date, offsetDays: number) {
  const next = new Date(today);
  next.setDate(next.getDate() + offsetDays);
  return next;
}

function getRelativeDateLabel(today: Date, offsetDays: number) {
  return formatDateLabel(getRelativeDate(today, offsetDays));
}

function getThisWeekendLabel(today: Date) {
  const nextSaturday = new Date(today);
  const day = nextSaturday.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  nextSaturday.setDate(nextSaturday.getDate() + daysUntilSaturday);
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);
  return `${formatDateLabel(nextSaturday)} - ${formatDateLabel(nextSunday)}`;
}

function getNextWeekendLabel(today: Date) {
  const nextSaturday = new Date(today);
  const day = nextSaturday.getDay();
  const daysUntilSaturday = (6 - day + 7) % 7 || 7;
  nextSaturday.setDate(nextSaturday.getDate() + daysUntilSaturday + 7);
  const nextSunday = new Date(nextSaturday);
  nextSunday.setDate(nextSaturday.getDate() + 1);
  return `${formatDateLabel(nextSaturday)} - ${formatDateLabel(nextSunday)}`;
}

function getCalendarMonth(today: Date, monthOffset = 0) {
  return new Date(today.getFullYear(), today.getMonth() + monthOffset, 1);
}

function getCalendarCells(today: Date, monthOffset = 0) {
  const monthStart = getCalendarMonth(today, monthOffset);
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const firstDay = monthStart.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<Date | null> = [];

  for (let index = 0; index < firstDay; index += 1) {
    cells.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(new Date(year, month, day));
  }

  return cells;
}

function getDateQuickOptions(today: Date) {
  return [
    { label: "Tomorrow", detail: getRelativeDateLabel(today, 1) },
    { label: "This weekend", detail: getThisWeekendLabel(today) },
    { label: "Next weekend", detail: getNextWeekendLabel(today) },
  ];
}

function getDefaultSelections(today: Date): Record<SearchItemKey, string> {
  return {
    region: searchItems.region.value,
    destination: searchItems.destination.value,
    date: formatDateLabel(today),
  };
}

function RegionIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 overflow-hidden lg:h-[22px] lg:w-[22px] 2xl:h-7 2xl:w-7"
      aria-hidden="true"
    >
      <path
        d="M19.035 25.8911C20.4348 23.2532 25.1009 23.2532 25.1009 23.2532C29.9628 23.2025 30.6196 20.2505 31.0587 18.7584C30.2729 25.107 25.2867 30.1537 18.9671 31.0315C18.5101 30.0697 17.9687 27.9007 19.035 25.8911Z"
        fill="white"
      />
      <path
        d="M7.09191 8.26473L6.50875 7.76598C6.4602 7.72445 6.41377 7.68096 6.36953 7.63566C4.16861 10.1322 2.83337 13.4102 2.83337 17C2.83337 24.7361 9.03423 31.0239 16.7368 31.1643C16.2362 29.67 15.9096 27.2482 17.1581 24.8954C18.3058 22.7326 20.6148 21.8812 22.0858 21.5197C22.8887 21.3223 23.6269 21.2261 24.1601 21.1782C24.4293 21.1541 24.6526 21.1417 24.8138 21.1353C24.8946 21.1321 24.9602 21.1304 25.0086 21.1295L25.0683 21.1287L25.0842 21.1286C27.0403 21.1071 27.7995 20.5298 28.1498 20.1354C28.5831 19.6476 28.753 19.069 28.9896 18.2633L29.0203 18.1589C29.3009 17.205 30.1971 16.5882 31.1621 16.636C31.0732 13.1092 29.6953 9.90259 27.4819 7.46964C27.4371 7.72139 27.3837 7.95543 27.3306 8.16263C27.0903 9.09985 26.6869 10.111 26.192 10.8622C25.7076 11.5973 24.8472 12.2541 24.2753 12.6651C23.8437 12.9752 23.4025 13.2328 23.039 13.4423L22.9086 13.5174C22.5803 13.7063 22.3193 13.8567 22.0709 14.0208C21.5666 14.354 21.264 14.6499 21.059 15.0509C21.1838 15.5074 21.2723 16.0321 21.2738 16.5809C21.2771 17.8863 20.6089 18.9178 19.8102 19.5615C19.0244 20.1948 18.0076 20.5528 16.9773 20.5416C12.7984 20.496 10.3473 17.0869 10.0317 13.574C9.93994 12.5526 9.48044 11.452 8.83833 10.4265C8.21387 9.42925 7.50802 8.64842 7.09191 8.26473Z"
        fill="white"
      />
      <path
        d="M12.1482 13.3838C11.8829 10.4312 9.60589 7.67987 8.50054 6.67329L7.88993 6.15106C10.3529 4.08056 13.5311 2.83337 17.0005 2.83337C20.1362 2.83337 23.0339 3.8521 25.3807 5.57664C25.7123 6.58322 25.0807 8.68644 24.4175 9.69302C24.1773 10.0576 23.6325 10.5103 23.0354 10.9393C21.6888 11.9068 19.9895 12.3853 19.1255 14.1667C18.8786 14.6759 18.8891 15.1737 19.0079 15.6064C19.0933 15.9175 19.1479 16.2556 19.1488 16.5863C19.1515 17.6558 18.07 18.4284 17.0005 18.4167C14.2178 18.3863 12.3962 16.1437 12.1482 13.3838Z"
        fill="white"
      />
    </svg>
  );
}

function DestinationIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 overflow-hidden lg:h-[22px] lg:w-[22px] 2xl:h-7 2xl:w-7"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.0001 2.83337C10.7409 2.83337 5.66675 7.99837 5.66675 14.3697C5.66675 20.6911 9.28396 28.0676 14.9276 30.7055C16.2432 31.3204 17.7569 31.3204 19.0726 30.7055C24.7162 28.0676 28.3334 20.6911 28.3334 14.3697C28.3334 7.99837 23.2593 2.83337 17.0001 2.83337ZM12.7501 12.4063C12.7501 13.8507 14.4003 15.3769 15.6441 16.3222C16.2388 16.7741 16.5361 17 17.0001 17C17.4641 17 17.7614 16.7741 18.356 16.3222C19.5999 15.377 21.2501 13.8507 21.2501 12.4063C21.2501 9.95118 18.9125 9.03457 17.0001 10.9311C15.0876 9.03457 12.7501 9.95118 12.7501 12.4063Z"
        fill="white"
      />
    </svg>
  );
}

function DateIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 overflow-hidden lg:h-[22px] lg:w-[22px] 2xl:h-7 2xl:w-7"
      aria-hidden="true"
    >
      <path
        d="M10.9791 3.54163C10.9791 2.95482 10.5034 2.47913 9.91659 2.47913C9.32978 2.47913 8.85409 2.95482 8.85409 3.54163V5.77891C6.81503 5.94219 5.47643 6.34291 4.49298 7.32635C3.50953 8.3098 3.10881 9.64841 2.94553 11.6875H31.0543C30.891 9.64841 30.4903 8.3098 29.5069 7.32635C28.5234 6.34291 27.1848 5.94219 25.1458 5.77891V3.54163C25.1458 2.95482 24.6701 2.47913 24.0833 2.47913C23.4965 2.47913 23.0208 2.95482 23.0208 3.54163V5.6849C22.0783 5.66663 21.0219 5.66663 19.8333 5.66663H14.1666C12.978 5.66663 11.9215 5.66663 10.9791 5.6849V3.54163Z"
        fill="white"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.83325 17C2.83325 15.8113 2.83325 14.7549 2.85153 13.8125H31.1483C31.1666 14.7549 31.1666 15.8113 31.1666 17V19.8333C31.1666 25.1759 31.1666 27.8472 29.5069 29.5069C27.8471 31.1666 25.1758 31.1666 19.8333 31.1666H14.1666C8.824 31.1666 6.15271 31.1666 4.49298 29.5069C2.83325 27.8472 2.83325 25.1759 2.83325 19.8333V17ZM24.0833 19.8333C24.8657 19.8333 25.4999 19.199 25.4999 18.4166C25.4999 17.6342 24.8657 17 24.0833 17C23.3008 17 22.6666 17.6342 22.6666 18.4166C22.6666 19.199 23.3008 19.8333 24.0833 19.8333ZM24.0833 25.5C24.8657 25.5 25.4999 24.8657 25.4999 24.0833C25.4999 23.3009 24.8657 22.6666 24.0833 22.6666C23.3008 22.6666 22.6666 23.3009 22.6666 24.0833C22.6666 24.8657 23.3008 25.5 24.0833 25.5ZM18.4166 18.4166C18.4166 19.199 17.7823 19.8333 16.9999 19.8333C16.2175 19.8333 15.5833 19.199 15.5833 18.4166C15.5833 17.6342 16.2175 17 16.9999 17C17.7823 17 18.4166 17.6342 18.4166 18.4166ZM18.4166 24.0833C18.4166 24.8657 17.7823 25.5 16.9999 25.5C16.2175 25.5 15.5833 24.8657 15.5833 24.0833C15.5833 23.3009 16.2175 22.6666 16.9999 22.6666C17.7823 22.6666 18.4166 23.3009 18.4166 24.0833ZM9.91659 19.8333C10.699 19.8333 11.3333 19.199 11.3333 18.4166C11.3333 17.6342 10.699 17 9.91659 17C9.13418 17 8.49992 17.6342 8.49992 18.4166C8.49992 19.199 9.13418 19.8333 9.91659 19.8333ZM9.91659 25.5C10.699 25.5 11.3333 24.8657 11.3333 24.0833C11.3333 23.3009 10.699 22.6666 9.91659 22.6666C9.13418 22.6666 8.49992 23.3009 8.49992 24.0833C8.49992 24.8657 9.13418 25.5 9.91659 25.5Z"
        fill="white"
      />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 shrink-0 overflow-hidden 2xl:h-6 2xl:w-6"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.48093 12.4511C6.87525 11.9911 7.56785 11.9378 8.02789 12.3321L17.5534 20.4969L27.079 12.3321C27.539 11.9378 28.2316 11.9911 28.626 12.4511C29.0203 12.9112 28.967 13.6038 28.507 13.9981L18.2674 22.7748C17.8566 23.127 17.2503 23.127 16.8395 22.7748L6.59993 13.9981C6.13989 13.6038 6.08662 12.9112 6.48093 12.4511Z"
        fill="white"
      />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 overflow-hidden 2xl:h-6 2xl:w-6"
      aria-hidden="true"
    >
      <path
        d="M7.29541 21.8859L21.8861 7.29529M21.8861 18.2383V7.29529H10.9431"
        stroke="#101010"
        strokeWidth="1.82383"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BackIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M8.75 3.25L5 7L8.75 10.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MonthNextIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M3.25 5.25L7 9L10.75 5.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MonthPrevIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M10.75 8.75L7 5L3.25 8.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CalendarMiniIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="h-3.5 w-3.5"
    >
      <path
        d="M4.5 1.75V3.25M9.5 1.75V3.25M2.25 5.25H11.75M3.125 2.75H10.875C11.4963 2.75 12 3.25368 12 3.875V10.875C12 11.4963 11.4963 12 10.875 12H3.125C2.50368 12 2 11.4963 2 10.875V3.875C2 3.25368 2.50368 2.75 3.125 2.75Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ItemIcon({ icon }: { icon: SearchItem["icon"] }) {
  if (icon === "region") return <RegionIcon />;
  if (icon === "destination") return <DestinationIcon />;
  return <DateIcon />;
}

function DateDropdownPanel({
  mode,
  selected,
  today,
  monthOffset,
  onModeChange,
  onPrevMonth,
  onNextMonth,
  onPick,
}: {
  mode: DateMode;
  selected: string;
  today: Date;
  monthOffset: number;
  onModeChange: (mode: DateMode) => void;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onPick: (value: string) => void;
}) {
  const monthStart = getCalendarMonth(today, monthOffset);
  const monthLabel = new Intl.DateTimeFormat("en-US", {
    month: "long",
    year: "numeric",
  }).format(monthStart);
  const weekdayLabels = ["S", "M", "T", "W", "T", "F", "S"];
  const calendarCells = getCalendarCells(today, monthOffset);
  const quickOptions = getDateQuickOptions(today);

  return (
    <div className="absolute left-0 top-[calc(100%+0.35rem)] z-50 h-[240px] w-full min-w-[220px] overflow-hidden rounded-[22px] border border-white/25 bg-[linear-gradient(0deg,rgba(35,35,35,0.52)_0%,rgba(35,35,35,0.52)_100%),rgba(243,243,243,0.50)] bg-blend-plus-lighter p-1.5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:left-1/2 sm:-translate-x-1/2">
      {mode === "quick" ? (
        <div className="relative flex h-full flex-col">
          <div className="flex flex-1 flex-col gap-0.5 overflow-hidden px-1.5 pb-1 pt-1">
            {quickOptions.map((option) => (
              <button
                key={option.label}
                type="button"
                onClick={() => onPick(option.label)}
                className={`flex w-full items-center justify-between rounded-[16px] px-3 py-2 font-urbanist text-sm transition-colors hover:bg-white/12 ${
                  selected === option.label ? "text-[#FFF]" : "text-[#E4E4E4]"
                }`}
              >
                <span className="flex min-w-0 flex-col items-start">
                  <span className="truncate">{option.label}</span>
                  <span className="text-[11px] text-[#D9D9D9]/85">
                    {option.detail}
                  </span>
                </span>
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                    selected === option.label ? "bg-[#FFF]" : "bg-transparent"
                  }`}
                />
              </button>
            ))}

            <button
              type="button"
              onClick={() => onModeChange("calendar")}
              className="flex w-full items-center justify-between rounded-[16px] px-3 py-2 font-urbanist text-sm transition-colors hover:bg-white/12 text-[#E4E4E4]"
            >
              <span className="flex min-w-0 items-center gap-2">
                <CalendarMiniIcon />
                <span className="truncate">Calendar</span>
              </span>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-transparent" />
            </button>
          </div>
        </div>
      ) : (
        <div className="relative flex h-full flex-col">
          <div className="flex items-center justify-between px-2.5 pt-1.5">
            <button
              type="button"
              onClick={() => onModeChange("quick")}
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#E4E4E4] transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Back to quick date options"
            >
              <BackIcon />
            </button>
            <div className="flex flex-1 items-center justify-center gap-2">
              <span className="font-urbanist text-[13px] text-[#FFF]">
                {monthLabel}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={onPrevMonth}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#E4E4E4] transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Previous month"
                >
                  <MonthPrevIcon />
                </button>
                <button
                  type="button"
                  onClick={onNextMonth}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[#E4E4E4] transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Next month"
                >
                  <MonthNextIcon />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-1 flex-col px-2 pb-1 pt-2">
            <div className="grid grid-cols-7 gap-1 px-1 text-center font-urbanist text-[11px] tracking-[0.02em] text-[#E4E4E4]">
              {weekdayLabels.map((label, index) => (
                <span key={`${label}-${index}`}>{label}</span>
              ))}
            </div>

            <div className="mt-1.5 grid grid-cols-7 gap-1">
              {calendarCells.map((cell, index) => {
                if (!cell) {
                  return <span key={`empty-${index}`} className="h-7" />;
                }

                const disabled = cell.getTime() < today.getTime();
                const value = formatDateLabel(cell);
                const isSelected = selected === value;

                return (
                  <button
                    key={value}
                    type="button"
                    disabled={disabled}
                    onClick={() => onPick(value)}
                    className={`h-7 rounded-full font-urbanist text-[12px] transition-colors ${
                      disabled
                        ? "cursor-not-allowed text-white/20"
                        : isSelected
                          ? "bg-white text-black"
                          : "text-[#E4E4E4] hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {cell.getDate()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SearchSelect({
  item,
  isOpen,
  options,
  selected,
  today,
  onPick,
  onToggle,
  monthOffset,
  onPrevMonth,
  onNextMonth,
  dateMode,
  onDateModeChange,
}: {
  item: SearchItem;
  isOpen: boolean;
  options: string[];
  selected: string;
  today: Date;
  onPick: (value: string) => void;
  onToggle: () => void;
  monthOffset: number;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  dateMode?: DateMode;
  onDateModeChange?: (mode: DateMode) => void;
}) {
  return (
    <div className="relative w-full min-w-0 sm:w-fit">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full min-w-0 items-center justify-between gap-2 rounded-[24px] px-1 py-0.5 text-left transition-colors hover:bg-white/10 sm:w-fit lg:min-w-[172px] lg:gap-3 2xl:min-w-[190px] 2xl:gap-4"
      >
        <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <span className="flex shrink-0 items-center rounded-[47.4px] border border-[#E4E4E4] p-1.5">
            <ItemIcon icon={item.icon} />
          </span>
          <span className="flex min-w-0 flex-col items-start">
            <span className="w-fit font-urbanist text-sm leading-tight text-[#E4E4E4] sm:text-[15px] lg:text-[15px] 2xl:text-lg">
              {item.label}
            </span>
            <span className="max-w-full truncate font-urbanist text-sm font-medium leading-tight text-[#FFF] sm:text-[15px] lg:text-[15px] 2xl:text-lg">
              {selected}
            </span>
          </span>
        </span>
        <span
          className={
            isOpen ? "rotate-180 transition-transform" : "transition-transform"
          }
        >
          <ChevronDown />
        </span>
      </button>

      {isOpen &&
        (item.icon === "date" ? (
          <DateDropdownPanel
            selected={selected}
            today={today}
            monthOffset={monthOffset}
            mode={dateMode ?? "quick"}
            onModeChange={onDateModeChange ?? (() => {})}
            onPrevMonth={onPrevMonth}
            onNextMonth={onNextMonth}
            onPick={onPick}
          />
      ) : (
          <div className="absolute left-0 top-[calc(100%+0.55rem)] z-50 w-full min-w-[220px] overflow-hidden rounded-[22px] border border-white/25 bg-[linear-gradient(0deg,rgba(35,35,35,0.52)_0%,rgba(35,35,35,0.52)_100%),rgba(243,243,243,0.50)] bg-blend-plus-lighter p-1.5 text-left shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl sm:left-1/2 sm:-translate-x-1/2">
            <div className="flex max-h-[240px] flex-col overflow-y-auto">
              {options.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onPick(option)}
                  className={`flex w-full items-center justify-between gap-3 rounded-[16px] px-3 py-2.5 font-urbanist text-sm transition-colors hover:bg-white/12 ${
                    selected === option ? "text-[#FFF]" : "text-[#E4E4E4]"
                  }`}
                >
                  <span className="truncate">{option}</span>
                  <span
                    className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                      selected === option ? "bg-[#FFF]" : "bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

function Divider() {
  return (
    <div
      className="hidden h-8 w-px shrink-0 bg-[rgba(255,255,255,0.32)] xl:mx-1 xl:block 2xl:h-10"
      aria-hidden="true"
    />
  );
}

export default function SearchBar() {
  const { openComingSoon } = useComingSoon();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [openItem, setOpenItem] = useState<SearchItemKey | null>(null);
  const [dateMode, setDateMode] = useState<DateMode>("quick");
  const [monthOffset, setMonthOffset] = useState(0);
  const [today, setToday] = useState(getToday);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchError, setSearchError] = useState("");
  const [selections, setSelections] =
    useState<Record<SearchItemKey, string>>(() => getDefaultSelections(getToday()));

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const destination = searchQuery.trim();

    if (!destination) {
      setSearchError("Please enter a trek or destination.");
      return;
    }

    setSearchError("");
    setOpenItem(null);
    setDateMode("quick");
    setMonthOffset(0);
    openComingSoon(destination);
  };

  useEffect(() => {
    const updateToday = () => {
      const nextToday = getToday();

      setToday((currentToday) => {
        if (currentToday.getTime() === nextToday.getTime()) {
          return currentToday;
        }

        setSelections((currentSelections) => {
          const previousDefaultDate = formatDateLabel(currentToday);

          if (currentSelections.date !== previousDefaultDate) {
            return currentSelections;
          }

          return {
            ...currentSelections,
            date: formatDateLabel(nextToday),
          };
        });

        return nextToday;
      });
    };

    updateToday();
    const intervalId = window.setInterval(updateToday, 60_000);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (!openItem) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpenItem(null);
        setDateMode("quick");
        setMonthOffset(0);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenItem(null);
        setDateMode("quick");
        setMonthOffset(0);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openItem]);

  return (
    <div
      ref={wrapperRef}
      className="relative mt-4 flex w-full max-w-[min(89vw,880px)] flex-col items-stretch gap-2 sm:mt-5 lg:mt-6"
    >
      <form
        className="flex w-full items-center gap-2 overflow-hidden rounded-[24px] bg-[linear-gradient(0deg,rgba(51,51,51,0.30)_0%,rgba(51,51,51,0.30)_100%),rgba(243,243,243,0.60)] bg-blend-plus-lighter p-2 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:rounded-[28px] xl:gap-3 xl:rounded-[98.605px] 2xl:gap-4 2xl:p-2.5"
        onSubmit={handleSearchSubmit}
      >
        <input
          type="search"
          placeholder="Search treks, destinations, or regions"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            if (searchError) setSearchError("");
          }}
          aria-invalid={Boolean(searchError)}
          aria-describedby={searchError ? "hero-search-error" : undefined}
          className="min-w-0 flex-1 bg-transparent px-3 font-urbanist text-sm font-medium leading-tight text-[#FFF] outline-none placeholder:text-[#E4E4E4] sm:text-[15px] lg:text-[15px] 2xl:px-4 2xl:text-lg"
        />

        <Divider />

        <button
          type="submit"
          className="flex h-10 shrink-0 items-center justify-center gap-2 rounded-[113.1px] bg-[rgba(20,20,20,0.84)] py-1 pl-4 pr-1 font-urbanist text-[15px] text-[#FFF] shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-10 lg:text-[15px] xl:w-fit 2xl:h-12 2xl:gap-2.5 2xl:text-lg"
        >
          <span className="w-fit text-nowrap">Find my trek</span>
          <span className="flex items-center rounded-[76.6px] bg-[#FFF] p-1.5 2xl:gap-2 2xl:p-2">
            <ArrowIcon />
          </span>
        </button>
      </form>
      {searchError && (
        <div
          id="hero-search-error"
          className="hero-search-callout absolute -top-14 left-2 right-2 z-30 w-fit max-w-[calc(100%-1rem)] rounded-[18px] border border-white/30 bg-white/75 px-3.5 py-2.5 font-urbanist text-sm font-semibold leading-snug text-[#18231e] shadow-[0_14px_34px_rgba(0,0,0,0.18)] backdrop-blur-[2px] after:absolute after:-bottom-2 after:left-7 after:h-0 after:w-0 after:border-l-[8px] after:border-r-[8px] after:border-t-[8px] after:border-l-transparent after:border-r-transparent after:border-t-white/75 sm:-top-12 sm:left-3 sm:right-auto sm:max-w-[min(86vw,360px)] sm:px-4 sm:leading-normal sm:after:left-8"
          role="alert"
        >
          <span>{searchError}</span>
        </div>
      )}

      <div className="grid min-w-0 grid-cols-1 gap-1.5 md:grid-cols-3 xl:flex xl:flex-none xl:items-center xl:justify-center xl:gap-4 2xl:gap-5">
        {searchItemOrder.map((key, index) => (
          <div
            key={key}
            className="contents xl:flex xl:items-center xl:gap-4 2xl:gap-5"
          >
            {index > 0 && <Divider />}
            <SearchSelect
              item={searchItems[key]}
              isOpen={openItem === key}
              options={searchOptions[key]}
              selected={selections[key]}
              today={today}
              monthOffset={monthOffset}
              onPrevMonth={() =>
                setMonthOffset((current) => Math.max(0, current - 1))
              }
              onNextMonth={() => setMonthOffset((current) => current + 1)}
              dateMode={dateMode}
              onDateModeChange={setDateMode}
              onToggle={() => {
                if (openItem === key) {
                  setOpenItem(null);
                  setDateMode("quick");
                  setMonthOffset(0);
                  return;
                }

                setOpenItem(key);
                if (key === "date") {
                  setDateMode("quick");
                  setMonthOffset(0);
                }
              }}
              onPick={(value) => {
                setSelections((current) => ({ ...current, [key]: value }));
                setOpenItem(null);
                setDateMode("quick");
                setMonthOffset(0);
              }}
            />
          </div>
        ))}
      </div>
      <style jsx global>{`
        .hero-search-callout {
          animation: hero-search-callout-in 220ms ease-out both;
        }

        @keyframes hero-search-callout-in {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-search-callout {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
