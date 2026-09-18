export type FilterDropdownOption = {
  value: string;
  label: string;
};

export default function FilterDropdown({
  label,
  value,
  options,
  open,
  className = "",
  onToggle,
  onChange,
}: {
  label: string;
  value: string;
  options: FilterDropdownOption[];
  open: boolean;
  className?: string;
  onToggle: () => void;
  onChange: (value: string) => void;
}) {
  const selectedLabel =
    options.find((option) => option.value === value)?.label ?? label;

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex min-h-12 w-full items-center justify-between gap-3 rounded-full border border-[#D7D7D7] bg-white py-1 pl-4 pr-2 font-urbanist text-sm font-semibold text-[#101010] outline-none transition-colors hover:border-[#101010] focus-visible:border-[#101010] focus-visible:ring-2 focus-visible:ring-[#101010]/10"
      >
        <span className="min-w-0 truncate">{selectedLabel}</span>
        <span
          className={`grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#F1F1F1] text-[#101010] transition-transform ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path
              d="m7 10 5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      {open && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-[20px] border border-[#D7D7D7] bg-white p-1.5 text-left shadow-[0_18px_46px_rgba(16,16,16,0.14)]">
          {options.map((option) => {
            const selected = option.value === value;

            return (
              <button
                key={option.value || option.label}
                type="button"
                onClick={() => onChange(option.value)}
                className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 font-urbanist text-sm font-semibold transition-colors ${
                  selected
                    ? "bg-[#101010] text-white"
                    : "text-[#101010] hover:bg-[#F4F4F4]"
                }`}
              >
                <span className="truncate">{option.label}</span>
                {selected && (
                  <span className="h-1.5 w-1.5 rounded-full bg-current" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
