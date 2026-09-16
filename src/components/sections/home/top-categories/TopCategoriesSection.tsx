"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SectionBadge from "@/components/layout/SectionBadge";
import TrekCard, { TrekCardGlassFilters } from "@/components/layout/TrekCard";
import FilterDropdown from "@/components/search/FilterDropdown";
import {
  searchTreks,
  SEARCH_DIFFICULTIES,
  SEARCH_REGIONS,
  SEARCH_SORT_OPTIONS,
  serializeSearchFilters,
  TREK_SEARCH_ITEMS,
  type SearchFilters,
} from "@/lib/search";
import TopCategoriesIntro from "./TopCategoriesIntro";
import ViewAllTreksButton from "./ViewAllTreksButton";

const HOME_TREK_LIMIT = 8;

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

export default function TopCategoriesSection() {
  const controlsRef = useRef<HTMLDivElement>(null);
  const [filters, setFilters] = useState<SearchFilters>({
    q: "",
    region: "",
    difficulty: "",
    sort: "relevance",
  });
  const [openFilter, setOpenFilter] = useState<"region" | "difficulty" | "sort" | null>(null);
  const hasActiveFilters =
    filters.region || filters.difficulty || filters.sort !== "relevance";
  const filteredTreks = useMemo(
    () =>
      hasActiveFilters
        ? searchTreks(filters)
        : TREK_SEARCH_ITEMS.map((trek) => ({
            ...trek,
            score: 0,
            matchedFields: [],
          })),
    [filters, hasActiveFilters],
  );
  const visibleTreks = filteredTreks.slice(0, HOME_TREK_LIMIT);
  const viewAllHref = `/search${serializeSearchFilters(filters)}`;
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
    if (!openFilter) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (
        controlsRef.current &&
        !controlsRef.current.contains(event.target as Node)
      ) {
        setOpenFilter(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenFilter(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [openFilter]);

  return (
    <section id="treks" className="w-full bg-[var(--bg)] px-4 pb-10 pt-16 text-[#101010] sm:pb-12 lg:px-[30px]">
      <TrekCardGlassFilters />
      <div className="mx-auto flex w-full max-w-[1500px] flex-col items-center gap-5 sm:gap-6">
        <SectionBadge>Tour Categories</SectionBadge>
        <TopCategoriesIntro />
        <div
          ref={controlsRef}
          className="mt-3 grid w-full gap-2.5 rounded-[28px] bg-white p-3 shadow-[0_18px_60px_rgba(16,16,16,0.07)] sm:mt-4 sm:grid-cols-3 sm:gap-3 sm:p-4 lg:max-w-3xl"
        >
          <FilterDropdown
            label="All regions"
            value={filters.region}
            options={regionOptions}
            open={openFilter === "region"}
            onToggle={() =>
              setOpenFilter((current) =>
                current === "region" ? null : "region",
              )
            }
            onChange={(value) => {
              setOpenFilter(null);
              setFilters((current) => updateFilter(current, "region", value));
            }}
          />
          <FilterDropdown
            label="All difficulties"
            value={filters.difficulty}
            options={difficultyOptions}
            open={openFilter === "difficulty"}
            onToggle={() =>
              setOpenFilter((current) =>
                current === "difficulty" ? null : "difficulty",
              )
            }
            onChange={(value) => {
              setOpenFilter(null);
              setFilters((current) =>
                updateFilter(current, "difficulty", value),
              );
            }}
          />
          <FilterDropdown
            label="Best match"
            value={filters.sort}
            options={SEARCH_SORT_OPTIONS}
            open={openFilter === "sort"}
            onToggle={() =>
              setOpenFilter((current) => (current === "sort" ? null : "sort"))
            }
            onChange={(value) => {
              setOpenFilter(null);
              setFilters((current) => updateFilter(current, "sort", value));
            }}
          />
        </div>

        {visibleTreks.length > 0 ? (
          <div className="mt-6 grid w-full grid-cols-2 gap-4 sm:gap-5 lg:mt-7 xl:grid-cols-4">
            {visibleTreks.map((card) => (
              <TrekCard key={card.id} {...card} />
            ))}
          </div>
        ) : (
          <div className="mt-8 flex w-full max-w-xl flex-col items-center rounded-[28px] bg-white px-6 py-10 text-center shadow-[0_18px_60px_rgba(16,16,16,0.07)]">
            <p className="font-urbanist text-lg font-semibold text-[#101010]">
              No treks match these filters
            </p>
            <button
              type="button"
              onClick={() =>
                setFilters({
                  q: "",
                  region: "",
                  difficulty: "",
                  sort: "relevance",
                })
              }
              className="mt-4 rounded-full bg-[#101010] px-5 py-2.5 font-urbanist text-sm font-semibold text-white"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-5 flex w-full justify-center sm:mt-8">
          <ViewAllTreksButton href={viewAllHref} />
        </div>
      </div>
    </section>
  );
}
