type SearchItem = {
  label: string;
  value: string;
  icon: "region" | "destination" | "date";
};

const searchItems: SearchItem[] = [
  {
    label: "Regions",
    value: "Pune",
    icon: "region",
  },
  {
    label: "Destinations",
    value: "Lohagad Trek",
    icon: "destination",
  },
  {
    label: "Date",
    value: "Aug 17, 2026",
    icon: "date",
  },
];

function RegionIcon() {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5 overflow-hidden lg:h-6 lg:w-6 2xl:h-[32px] 2xl:w-[32px]"
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
      className="h-5 w-5 overflow-hidden lg:h-6 lg:w-6 2xl:h-[32px] 2xl:w-[32px]"
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
      className="h-5 w-5 overflow-hidden lg:h-6 lg:w-6 2xl:h-[32px] 2xl:w-[32px]"
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
      className="h-5 w-5 shrink-0 overflow-hidden 2xl:h-8 2xl:w-8"
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
      className="h-5 w-5 overflow-hidden 2xl:h-7 2xl:w-7"
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

function ItemIcon({ icon }: { icon: SearchItem["icon"] }) {
  if (icon === "region") return <RegionIcon />;
  if (icon === "destination") return <DestinationIcon />;
  return <DateIcon />;
}

function SearchSelect({ item }: { item: SearchItem }) {
  return (
    <button
      type="button"
      className="flex w-full min-w-0 items-center justify-between gap-2 rounded-[28px] px-1 py-0.5 text-left transition-colors hover:bg-white/10 sm:w-fit lg:min-w-[190px] lg:gap-4 2xl:min-w-[220px] 2xl:gap-5"
    >
      <span className="flex min-w-0 items-center gap-2.5 sm:gap-3">
        <span className="flex shrink-0 items-center rounded-[47.4px] border border-[#E4E4E4] p-1.5">
          <ItemIcon icon={item.icon} />
        </span>
        <span className="flex min-w-0 flex-col items-start">
          <span className="w-fit font-urbanist text-sm leading-tight text-[#E4E4E4] sm:text-[15px] lg:text-base 2xl:text-[22px]">
            {item.label}
          </span>
          <span className="max-w-full truncate font-urbanist text-sm font-medium leading-tight text-[#FFF] sm:text-[15px] lg:text-base 2xl:text-[22px]">
            {item.value}
          </span>
        </span>
      </span>
      <ChevronDown />
    </button>
  );
}

function Divider() {
  return (
    <div
      className="hidden h-9 w-px shrink-0 bg-[rgba(255,255,255,0.32)] xl:mx-1 xl:block 2xl:mx-2 2xl:h-11"
      aria-hidden="true"
    />
  );
}

export default function SearchBar() {
  return (
    <div className="mt-5 flex w-full max-w-[min(94vw,1040px)] flex-col items-stretch gap-2 overflow-hidden rounded-[26px] bg-[linear-gradient(0deg,rgba(51,51,51,0.30)_0%,rgba(51,51,51,0.30)_100%),rgba(243,243,243,0.60)] bg-blend-plus-lighter p-2 shadow-[0_18px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:mt-6 sm:rounded-[32px] sm:p-2.5 lg:mt-7 xl:w-fit xl:max-w-[calc(100vw-2rem)] xl:flex-row xl:items-center xl:gap-4 xl:rounded-[98.605px] 2xl:gap-6 2xl:p-3">
      <div className="grid min-w-0 flex-1 grid-cols-1 gap-1.5 md:grid-cols-3 xl:flex xl:flex-none xl:items-center xl:gap-6 2xl:gap-8">
        {searchItems.map((item, index) => (
          <div
            key={item.label}
            className="contents xl:flex xl:items-center xl:gap-6 2xl:gap-8"
          >
            {index > 0 && <Divider />}
            <SearchSelect item={item} />
          </div>
        ))}
      </div>

      <Divider />

      <button
        type="button"
        className="flex h-10 shrink-0 items-center justify-center gap-2.5 rounded-[113.1px] bg-[rgba(20,20,20,0.84)] py-1 pl-4 pr-1 font-urbanist text-[15px] text-[#FFF] shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98] sm:h-11 lg:text-base xl:w-fit 2xl:h-14 2xl:gap-3 2xl:text-xl"
      >
        <span className="w-fit text-nowrap">Find my trek</span>
        <span className="flex items-center rounded-[76.6px] bg-[#FFF] p-1.5 2xl:gap-3 2xl:p-2.5">
          <ArrowIcon />
        </span>
      </button>
    </div>
  );
}
