"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TrekCard, { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import FilterDropdown from "@/components/search/FilterDropdown";
import {
  getSearchSuggestionActions,
  getSearchSuggestionGroups,
  parseSearchFilters,
  searchTreks,
  SEARCH_DIFFICULTIES,
  SEARCH_REGIONS,
  SEARCH_SORT_OPTIONS,
  serializeSearchFilters,
  type DestinationSuggestion,
  type SearchFilters,
  type TrekSearchItem,
} from "@/lib/search";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="m20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuggestionArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4" aria-hidden="true">
      <path
        d="M5 12h14m-5-5 5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SuggestionGroup({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-1 py-1">
      <p className="px-3 pb-1 font-urbanist text-[11px] font-semibold text-[#777]">
        {label}
      </p>
      {children}
    </div>
  );
}

function FeedSearchSuggestions({
  query,
  popularSuggestions,
  trekSuggestions,
  destinationSuggestions,
  regionSuggestions,
  activeIndex,
  onActiveIndexChange,
  onPickQuery,
  onPickTrek,
  onPickRegion,
}: {
  query: string;
  popularSuggestions: string[];
  trekSuggestions: TrekSearchItem[];
  destinationSuggestions: DestinationSuggestion[];
  regionSuggestions: string[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onPickQuery: (value: string) => void;
  onPickTrek: (trek: TrekSearchItem) => void;
  onPickRegion: (region: string) => void;
}) {
  const hasQuery = Boolean(query.trim());
  const hasMatches =
    trekSuggestions.length > 0 ||
    destinationSuggestions.length > 0 ||
    regionSuggestions.length > 0;

  return (
    <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-40 overflow-hidden rounded-[20px] border border-[#D7D7D7] bg-white p-2 text-left shadow-[0_18px_46px_rgba(16,16,16,0.14)]">
      {!hasQuery ? (
        <SuggestionGroup label="Popular searches">
          <div className="flex flex-wrap gap-2 px-2 pb-1">
            {popularSuggestions.map((term, currentIndex) => {
              const active = activeIndex === currentIndex;

              return (
                <button
                  key={term}
                  type="button"
                  onMouseEnter={() => onActiveIndexChange(currentIndex)}
                  onClick={() => onPickQuery(term)}
                  className={`rounded-full border px-3 py-1.5 font-urbanist text-xs font-semibold transition-colors ${
                    active
                      ? "border-[#101010] bg-[#101010] text-white"
                      : "border-[#D7D7D7] text-[#101010] hover:border-[#101010]"
                  }`}
                >
                  {term}
                </button>
              );
            })}
          </div>
        </SuggestionGroup>
      ) : hasMatches ? (
        <>
          {trekSuggestions.length > 0 && (
            <SuggestionGroup label="Treks">
              {trekSuggestions.map((trek, currentIndex) => {
                const active = activeIndex === currentIndex;

                return (
                  <button
                    key={trek.id}
                    type="button"
                    onMouseEnter={() => onActiveIndexChange(currentIndex)}
                    onClick={() => onPickTrek(trek)}
                    className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors ${
                      active ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"
                    }`}
                  >
                    <span className="relative h-11 w-14 shrink-0 overflow-hidden rounded-xl bg-[#E9E9E9]">
                      <Image
                        src={trek.image}
                        alt=""
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-urbanist text-sm font-semibold text-[#101010]">
                        {trek.title}
                      </span>
                      <span className="mt-0.5 block truncate font-urbanist text-xs font-medium text-[#6B6B6B]">
                        {trek.destination} - {trek.difficulty}
                      </span>
                    </span>
                    <span className="shrink-0 text-[#5E5E5E]">
                      <SuggestionArrowIcon />
                    </span>
                  </button>
                );
              })}
            </SuggestionGroup>
          )}

          {destinationSuggestions.length > 0 && (
            <SuggestionGroup label="Destinations">
              {destinationSuggestions.map((destination, index) => {
                const currentIndex = trekSuggestions.length + index;
                const active = activeIndex === currentIndex;

                return (
                  <button
                    key={destination.name}
                    type="button"
                    onMouseEnter={() => onActiveIndexChange(currentIndex)}
                    onClick={() => onPickQuery(destination.name)}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left font-urbanist text-sm font-semibold text-[#101010] transition-colors ${
                      active ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate">{destination.name}</span>
                      <span className="mt-0.5 block text-xs font-medium text-[#6B6B6B]">
                        {destination.count} trek{destination.count === 1 ? "" : "s"} available
                      </span>
                    </span>
                    <span className="shrink-0 text-[#5E5E5E]">
                      <SuggestionArrowIcon />
                    </span>
                  </button>
                );
              })}
            </SuggestionGroup>
          )}

          {regionSuggestions.length > 0 && (
            <SuggestionGroup label="Regions">
              {regionSuggestions.map((region, index) => {
                const currentIndex =
                  trekSuggestions.length + destinationSuggestions.length + index;
                const active = activeIndex === currentIndex;

                return (
                  <button
                    key={region}
                    type="button"
                    onMouseEnter={() => onActiveIndexChange(currentIndex)}
                    onClick={() => onPickRegion(region)}
                    className={`flex w-full items-center justify-between rounded-2xl px-3 py-2.5 text-left font-urbanist text-sm font-semibold text-[#101010] transition-colors ${
                      active ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"
                    }`}
                  >
                    <span>{region}</span>
                    <span className="text-[#5E5E5E]">
                      <SuggestionArrowIcon />
                    </span>
                  </button>
                );
              })}
            </SuggestionGroup>
          )}
        </>
      ) : (
        <button
          type="button"
          onMouseEnter={() => onActiveIndexChange(0)}
          onClick={() => onPickQuery(query)}
          className={`flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left font-urbanist text-sm font-semibold text-[#101010] transition-colors ${
            activeIndex === 0 ? "bg-[#F4F4F4]" : "hover:bg-[#F4F4F4]"
          }`}
        >
          <span className="min-w-0 truncate">Search all treks for &quot;{query}&quot;</span>
          <span className="shrink-0 text-[#5E5E5E]">
            <SuggestionArrowIcon />
          </span>
        </button>
      )}
    </div>
  );
}

function updateFilter(
  filters: SearchFilters,
  key: keyof SearchFilters,
  value: string,
) {
  return {
    ...filters,
    [key]: value,
  };
}

export default function SearchFeedPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const controlsRef = useRef<HTMLDivElement>(null);

  const filters = useMemo(
    () => parseSearchFilters(searchParams),
    [searchParams],
  );
  const results = useMemo(() => searchTreks(filters), [filters]);
  const [queryDraft, setQueryDraft] = useState(filters.q);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [openFilter, setOpenFilter] = useState<"region" | "difficulty" | "sort" | null>(null);
  const trimmedQueryDraft = queryDraft.trim();
  const suggestionGroups = useMemo(
    () => getSearchSuggestionGroups(trimmedQueryDraft),
    [trimmedQueryDraft],
  );
  const suggestionActions = useMemo(
    () => getSearchSuggestionActions(trimmedQueryDraft, suggestionGroups),
    [suggestionGroups, trimmedQueryDraft],
  );

  const setFilters = (nextFilters: SearchFilters) => {
    router.replace(`${pathname}${serializeSearchFilters(nextFilters)}`, {
      scroll: false,
    });
  };

  const applyFilters = (nextFilters: SearchFilters) => {
    setQueryDraft(nextFilters.q);
    setSuggestionsOpen(false);
    setActiveSuggestionIndex(-1);
    setFilters(nextFilters);
  };

  const runSuggestionAction = (index: number) => {
    const action = suggestionActions[index];

    if (!action) return;

    if (action.type === "trek") {
      applyFilters({
        ...filters,
        q: action.value.title,
        region: action.value.region,
      });
      return;
    }

    if (action.type === "region") {
      applyFilters({
        ...filters,
        q: "",
        region: action.value,
      });
      return;
    }

    applyFilters({
      ...filters,
      q: action.value,
      region: "",
    });
  };

  const handleQuerySubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    applyFilters(updateFilter(filters, "q", trimmedQueryDraft));
  };

  const hasActiveFilters =
    filters.q.trim() || filters.region || filters.difficulty || filters.sort !== "relevance";
  const regionOptions = [
    { value: "", label: "All regions" },
    ...SEARCH_REGIONS.map((region) => ({ value: region, label: region })),
  ];
  const difficultyOptions = [
    { value: "", label: "All difficulties" },
    ...SEARCH_DIFFICULTIES.map((difficulty) => ({
      value: difficulty,
      label: difficulty,
    })),
  ];

  useEffect(() => {
    if (!suggestionsOpen && !openFilter) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setSuggestionsOpen(false);
        setActiveSuggestionIndex(-1);
        setOpenFilter(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSuggestionsOpen(false);
        setActiveSuggestionIndex(-1);
        setOpenFilter(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [suggestionsOpen, openFilter]);

  return (
    <section className="w-full bg-[var(--bg)] px-4 pb-12 pt-8 text-[#101010] [--bg:#eef1f6] sm:px-6 sm:pb-16 sm:pt-10 lg:px-[30px]">
      <TrekCardGlassFilters />
      <div className="mx-auto flex w-full max-w-[1500px] flex-col gap-6">
        <div className="rounded-[28px] bg-white px-4 py-4 shadow-[0_18px_60px_rgba(16,16,16,0.08)] sm:px-6 sm:py-6">
          <p className="font-urbanist text-xs font-semibold uppercase tracking-[0.12em] text-[#6B6B6B]">
            Search
          </p>
          <div className="mt-2 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <h1 className="font-urbanist text-2xl font-semibold leading-tight text-[#101010] sm:text-4xl">
                {filters.q.trim()
                  ? `Results for "${filters.q.trim()}"`
                  : "Search every trek"}
              </h1>
              <p className="mt-2 font-urbanist text-sm font-medium leading-6 text-[#5E5E5E] sm:text-base">
                {results.length} trek{results.length === 1 ? "" : "s"} match your search.
              </p>
            </div>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() =>
                  applyFilters({
                    q: "",
                    region: "",
                    difficulty: "",
                    sort: "relevance",
                  })
                }
                className="w-fit rounded-full border border-[#D7D7D7] px-3.5 py-1.5 font-urbanist text-sm font-semibold text-[#101010] transition-colors hover:border-[#101010] sm:px-4 sm:py-2"
              >
                Clear search
              </button>
            )}
          </div>

          <div
            ref={controlsRef}
            className="mt-4 grid gap-2.5 sm:mt-5 sm:gap-3 lg:grid-cols-[minmax(260px,1fr)_180px_190px_190px]"
          >
            <div className="relative">
              <form
                onSubmit={handleQuerySubmit}
                className="flex min-h-12 items-center gap-2 rounded-full bg-[#E9E9E9] py-1 pl-4 pr-1"
              >
                <SearchIcon />
                <label htmlFor="search-page-query" className="sr-only">
                  Search treks
                </label>
                <input
                  id="search-page-query"
                  name="bbs-search-query"
                  type="search"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck={false}
                  value={queryDraft}
                  onFocus={() => {
                    setSuggestionsOpen(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onChange={(event) => {
                    setQueryDraft(event.target.value);
                    setSuggestionsOpen(true);
                    setActiveSuggestionIndex(-1);
                  }}
                  onKeyDown={(event) => {
                    if (!suggestionsOpen) return;

                    if (event.key === "ArrowDown") {
                      event.preventDefault();
                      setActiveSuggestionIndex((current) =>
                        current < suggestionActions.length - 1 ? current + 1 : 0,
                      );
                    }

                    if (event.key === "ArrowUp") {
                      event.preventDefault();
                      setActiveSuggestionIndex((current) =>
                        current > 0 ? current - 1 : suggestionActions.length - 1,
                      );
                    }

                    if (event.key === "Enter" && activeSuggestionIndex >= 0) {
                      event.preventDefault();
                      runSuggestionAction(activeSuggestionIndex);
                    }
                  }}
                  placeholder="Search treks, destinations, regions"
                  className="min-w-0 flex-1 bg-transparent font-urbanist text-sm font-medium text-[#101010] outline-none placeholder:text-[#777] sm:text-base"
                />
                <button
                  type="submit"
                  className="h-10 rounded-full bg-[#101010] px-4 font-urbanist text-sm font-semibold text-white sm:px-5"
                >
                  Search
                </button>
              </form>

              {suggestionsOpen && (
                <FeedSearchSuggestions
                  query={trimmedQueryDraft}
                  popularSuggestions={suggestionGroups.popular}
                  trekSuggestions={suggestionGroups.treks}
                  destinationSuggestions={suggestionGroups.destinations}
                  regionSuggestions={suggestionGroups.regions}
                  activeIndex={activeSuggestionIndex}
                  onActiveIndexChange={setActiveSuggestionIndex}
                  onPickQuery={(value) =>
                    applyFilters({
                      ...filters,
                      q: value,
                      region: "",
                    })
                  }
                  onPickTrek={(trek) =>
                    applyFilters({
                      ...filters,
                      q: trek.title,
                      region: trek.region,
                    })
                  }
                  onPickRegion={(region) =>
                    applyFilters({
                      ...filters,
                      q: "",
                      region,
                    })
                  }
                />
              )}
            </div>

            <FilterDropdown
              label="All regions"
              value={filters.region}
              options={regionOptions}
              open={openFilter === "region"}
              onToggle={() => {
                setSuggestionsOpen(false);
                setOpenFilter((current) =>
                  current === "region" ? null : "region",
                );
              }}
              onChange={(value) => {
                setOpenFilter(null);
                setFilters(updateFilter(filters, "region", value));
              }}
            />

            <FilterDropdown
              label="All difficulties"
              value={filters.difficulty}
              options={difficultyOptions}
              open={openFilter === "difficulty"}
              onToggle={() => {
                setSuggestionsOpen(false);
                setOpenFilter((current) =>
                  current === "difficulty" ? null : "difficulty",
                );
              }}
              onChange={(value) => {
                setOpenFilter(null);
                setFilters(updateFilter(filters, "difficulty", value));
              }}
            />

            <FilterDropdown
              label="Best match"
              value={filters.sort}
              options={SEARCH_SORT_OPTIONS}
              open={openFilter === "sort"}
              onToggle={() => {
                setSuggestionsOpen(false);
                setOpenFilter((current) =>
                  current === "sort" ? null : "sort",
                );
              }}
              onChange={(value) => {
                setOpenFilter(null);
                setFilters(updateFilter(filters, "sort", value));
              }}
            />
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid w-full grid-cols-2 gap-4 sm:gap-5 xl:grid-cols-4">
            {results.map((trek) => (
              <TrekCard key={trek.id} {...trek} />
            ))}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-xl flex-col items-center rounded-[28px] bg-white px-6 py-14 text-center shadow-[0_18px_60px_rgba(16,16,16,0.08)]">
            <p className="font-urbanist text-xl font-semibold text-[#101010]">
              No treks match your search
            </p>
            <p className="mt-2 font-urbanist text-sm font-medium leading-6 text-[#5E5E5E]">
              Try a destination, operator, region, or a simpler term like forest,
              waterfall, fort, or easy.
            </p>
            <button
              type="button"
              onClick={() =>
                applyFilters({
                  q: "",
                  region: "",
                  difficulty: "",
                  sort: "relevance",
                })
              }
              className="mt-5 rounded-full bg-[#101010] px-5 py-2.5 font-urbanist text-sm font-semibold text-white"
            >
              Clear search
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
