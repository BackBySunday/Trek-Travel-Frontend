import type { TrekCardProps } from "@/components/layout/TrekCard";

export type SearchSort = "relevance" | "rating" | "price-asc" | "departure";

export type TrekSearchItem = TrekCardProps & {
  id: string;
  slug: string;
  region: string;
  destination: string;
  tags: string[];
  priceValue: number;
  ratingValue: number;
  departureOrder: number;
  organizerId?: string;
  upcomingDates?: string[];
  attributes?: TrekAttributeValue[];
};

/** One registry filter value on a trek (from the admin-managed filter registry). */
export type TrekAttributeValue = {
  key: string;
  label: string;
  type: string;
  value?: string;
  valueLabel?: string;
  num?: number;
  bool?: boolean;
};

/** A filter definition from the registry, e.g. "Trek type" with its options. */
export type FilterDef = {
  key: string;
  label: string;
  dataType: string;
  unit?: string;
  options: { value: string; label: string }[];
};

export type SearchFilters = {
  q: string;
  region: string;
  difficulty: string;
  sort: SearchSort;
  /** Exact trek title or destination picked in the hero search. */
  destination: string;
  /** ISO date (YYYY-MM-DD): only treks with a departure on or after it. */
  date: string;
  /** Maximum price per person in rupees; "" = no limit. */
  maxPrice: string;
  /** Registry filters: attribute key -> chosen value (option value, "true", or a numeric maximum). */
  attrs: Record<string, string>;
};

export const EMPTY_FILTERS: SearchFilters = {
  q: "",
  region: "",
  difficulty: "",
  sort: "relevance",
  destination: "",
  date: "",
  maxPrice: "",
  attrs: {},
};

const ATTR_PARAM_PREFIX = "f.";

export type TrekSearchResult = TrekSearchItem & {
  score: number;
  matchedFields: string[];
};

export type DestinationSuggestion = {
  name: string;
  count: number;
};

export type SearchSuggestionGroups = {
  popular: string[];
  treks: TrekSearchItem[];
  destinations: DestinationSuggestion[];
  regions: string[];
};

export type SearchSuggestionAction =
  | {
      type: "query";
      value: string;
    }
  | {
      type: "trek";
      value: TrekSearchItem;
    }
  | {
      type: "region";
      value: string;
    };

export const POPULAR_SEARCH_TERMS = [
  "Lohagad Fort Trek",
  "Kalsubai Peak",
  "Devkund Waterfall",
  "Forest",
  "Easy",
];

const DEFAULT_SUGGESTION_LIMITS = {
  treks: 3,
  destinations: 3,
  regions: 2,
};

export function getSearchRegions(items: TrekSearchItem[]): string[] {
  return Array.from(new Set(items.map((trek) => trek.region).filter(Boolean)));
}

/** Destinations available for a region (or all), as trek titles. */
export function getSearchDestinations(items: TrekSearchItem[], region = ""): string[] {
  return Array.from(
    new Set(items.filter((t) => !region || t.region === region).map((t) => t.title)),
  );
}

/**
 * Registry filters that are actually usable for the current treks: ENUM
 * options carrying at least one trek, numeric filters as "up to" steps.
 */
export function getUsableFilterDefs(defs: FilterDef[], items: TrekSearchItem[]): FilterDef[] {
  return defs
    .map((def) => {
      if (def.dataType === "ENUM") {
        const used = new Set(
          items.flatMap((t) => (t.attributes ?? []).filter((a) => a.key === def.key && a.value).map((a) => a.value as string)),
        );
        return { ...def, options: def.options.filter((o) => used.has(o.value)) };
      }
      if (def.dataType === "INT" || def.dataType === "RANGE") {
        const nums = Array.from(
          new Set(items.flatMap((t) => (t.attributes ?? []).filter((a) => a.key === def.key && a.num !== undefined).map((a) => a.num as number))),
        ).sort((a, b) => a - b);
        return { ...def, options: nums.map((n) => ({ value: String(n), label: `Up to ${n.toLocaleString("en-IN")}${def.unit ? " " + def.unit : ""}` })) };
      }
      return def;
    })
    .filter((def) => def.dataType === "BOOL" || def.options.length > 0);
}

export function getSearchDifficulties(items: TrekSearchItem[]): string[] {
  return Array.from(new Set(items.map((trek) => trek.difficulty).filter(Boolean)));
}

export const SEARCH_SORT_OPTIONS: Array<{ value: SearchSort; label: string }> = [
  { value: "relevance", label: "Best match" },
  { value: "rating", label: "Highest rated" },
  { value: "price-asc", label: "Price low to high" },
  { value: "departure", label: "Starting soon" },
];

const DEFAULT_SORT: SearchSort = "relevance";

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function queryTokens(query: string) {
  return normalize(query)
    .split(" ")
    .map((token) => token.trim())
    .filter(Boolean);
}

function findExactTitleMatch(items: TrekSearchItem[], query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return null;

  return (
    items.find(
      (trek) => normalize(trek.title) === normalizedQuery,
    ) ?? null
  );
}

function fieldScore(field: string, token: string, weight: number) {
  const normalized = normalize(field);

  if (!normalized) return 0;
  if (normalized === token) return weight * 4;
  if (normalized.startsWith(token)) return weight * 2.5;
  if (normalized.includes(` ${token}`)) return weight * 2;
  if (normalized.includes(token)) return weight;

  return 0;
}

function scoreTrek(trek: TrekSearchItem, tokens: string[]) {
  if (!tokens.length) {
    return { score: trek.ratingValue * 10 + Math.max(0, 12 - trek.departureOrder), matchedFields: [] };
  }

  const matchedFields = new Set<string>();
  let score = 0;

  tokens.forEach((token) => {
    const fields: Array<[string, string, number]> = [
      ["title", trek.title, 12],
      ["destination", trek.destination, 8],
      ["region", trek.region, 6],
      ["operator", trek.operator, 5],
      ["difficulty", trek.difficulty, 4],
      ["duration", `${trek.durationTag} ${trek.duration}`, 3],
      ["description", trek.description, 2],
      ["tags", trek.tags.join(" "), 5],
    ];

    let tokenScore = 0;

    fields.forEach(([name, value, weight]) => {
      const nextScore = fieldScore(value, token, weight);

      if (nextScore > 0) {
        matchedFields.add(name);
        tokenScore += nextScore;
      }
    });

    if (tokenScore === 0) {
      score = 0;
      return;
    }

    score += tokenScore;
  });

  if (score > 0) {
    score += trek.ratingValue * 2;
    score += Math.max(0, 10 - trek.departureOrder);
  }

  return { score, matchedFields: Array.from(matchedFields) };
}

export function parseSearchFilters(params: URLSearchParams): SearchFilters {
  const sortParam = params.get("sort") as SearchSort | null;
  const sort = sortParam && SEARCH_SORT_OPTIONS.some((option) => option.value === sortParam)
    ? sortParam
    : DEFAULT_SORT;

  const attrs: Record<string, string> = {};
  params.forEach((value, key) => {
    if (key.startsWith(ATTR_PARAM_PREFIX) && value) attrs[key.slice(ATTR_PARAM_PREFIX.length)] = value;
  });

  return {
    q: params.get("q") ?? "",
    region: params.get("region") ?? "",
    difficulty: params.get("difficulty") ?? "",
    sort,
    destination: params.get("dest") ?? "",
    date: params.get("date") ?? "",
    maxPrice: params.get("maxPrice") ?? "",
    attrs,
  };
}

export function serializeSearchFilters(filters: SearchFilters) {
  const params = new URLSearchParams();
  const q = filters.q.trim();

  if (q) params.set("q", q);
  if (filters.region) params.set("region", filters.region);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.sort !== DEFAULT_SORT) params.set("sort", filters.sort);
  if (filters.destination) params.set("dest", filters.destination);
  if (filters.date) params.set("date", filters.date);
  if (filters.maxPrice) params.set("maxPrice", filters.maxPrice);
  Object.entries(filters.attrs).forEach(([key, value]) => {
    if (value) params.set(`${ATTR_PARAM_PREFIX}${key}`, value);
  });

  const query = params.toString();
  return query ? `?${query}` : "";
}

/** Every non-text filter, applied identically to plain and exact-title searches. */
function matchesFilters(trek: TrekSearchItem, filters: SearchFilters): boolean {
  if (filters.region && trek.region !== filters.region) return false;
  if (filters.difficulty && trek.difficulty !== filters.difficulty) return false;

  if (filters.destination) {
    const wanted = normalize(filters.destination);
    if (normalize(trek.title) !== wanted && normalize(trek.destination) !== wanted) return false;
  }

  if (filters.date && !(trek.upcomingDates ?? []).some((d) => d >= filters.date)) return false;

  if (filters.maxPrice) {
    const max = Number(filters.maxPrice);
    if (Number.isFinite(max) && trek.priceValue > max) return false;
  }

  for (const [key, wanted] of Object.entries(filters.attrs)) {
    const attr = (trek.attributes ?? []).find((a) => a.key === key);
    if (!attr) return false;
    if (attr.type === "BOOL") {
      if (String(attr.bool) !== wanted) return false;
    } else if (attr.type === "ENUM") {
      if (attr.value !== wanted) return false;
    } else {
      const max = Number(wanted);
      if (!Number.isFinite(max) || attr.num === undefined || attr.num > max) return false;
    }
  }

  return true;
}

export function searchTreks(items: TrekSearchItem[], filters: SearchFilters): TrekSearchResult[] {
  const tokens = queryTokens(filters.q);
  const exactTitleMatch = findExactTitleMatch(items, filters.q);

  if (
    exactTitleMatch &&
    matchesFilters(exactTitleMatch, filters)
  ) {
    return [
      {
        ...exactTitleMatch,
        score: Number.POSITIVE_INFINITY,
        matchedFields: ["title"],
      },
    ];
  }

  const results = items.reduce<TrekSearchResult[]>((matches, trek) => {
    if (!matchesFilters(trek, filters)) return matches;

    const scored = scoreTrek(trek, tokens);

    if (tokens.length && scored.score === 0) return matches;

    matches.push({
      ...trek,
      score: scored.score,
      matchedFields: scored.matchedFields,
    });

    return matches;
  }, []);

  return sortSearchResults(results, filters.sort);
}

export function getSearchSuggestions(items: TrekSearchItem[], query: string, limit = 6) {
  return searchTreks(items, { ...EMPTY_FILTERS, q: query }).slice(0, limit);
}

export function getSearchSuggestionGroups(
  items: TrekSearchItem[],
  query: string,
  limits = DEFAULT_SUGGESTION_LIMITS,
): SearchSuggestionGroups {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return {
      popular: POPULAR_SEARCH_TERMS,
      treks: [],
      destinations: [],
      regions: [],
    };
  }

  const normalizedQuery = trimmedQuery.toLowerCase();
  const destinationMap = new Map<string, number>();

  items.forEach((trek) => {
    if (trek.destination.toLowerCase().includes(normalizedQuery)) {
      destinationMap.set(
        trek.destination,
        (destinationMap.get(trek.destination) ?? 0) + 1,
      );
    }
  });

  return {
    popular: POPULAR_SEARCH_TERMS,
    treks: getSearchSuggestions(items, trimmedQuery, limits.treks),
    destinations: Array.from(destinationMap, ([name, count]) => ({
      name,
      count,
    })).slice(0, limits.destinations),
    regions: getSearchRegions(items).filter((region) =>
      region.toLowerCase().includes(normalizedQuery),
    ).slice(0, limits.regions),
  };
}

export function getSearchSuggestionActions(
  query: string,
  groups: SearchSuggestionGroups,
): SearchSuggestionAction[] {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return groups.popular.map((term) => ({
      type: "query",
      value: term,
    }));
  }

  const actions: SearchSuggestionAction[] = [
    ...groups.treks.map((trek) => ({
      type: "trek" as const,
      value: trek,
    })),
    ...groups.destinations.map((destination) => ({
      type: "query" as const,
      value: destination.name,
    })),
    ...groups.regions.map((region) => ({
      type: "region" as const,
      value: region,
    })),
  ];

  if (actions.length) return actions;

  return [
    {
      type: "query",
      value: trimmedQuery,
    },
  ];
}

function sortSearchResults(results: TrekSearchResult[], sort: SearchSort) {
  const next = [...results];

  if (sort === "rating") {
    return next.sort((a, b) => b.ratingValue - a.ratingValue || b.score - a.score);
  }

  if (sort === "price-asc") {
    return next.sort((a, b) => a.priceValue - b.priceValue || b.score - a.score);
  }

  if (sort === "departure") {
    return next.sort((a, b) => a.departureOrder - b.departureOrder || b.score - a.score);
  }

  return next.sort(
    (a, b) =>
      b.score - a.score ||
      b.ratingValue - a.ratingValue ||
      a.departureOrder - b.departureOrder,
  );
}
