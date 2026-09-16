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
};

export type SearchFilters = {
  q: string;
  region: string;
  difficulty: string;
  sort: SearchSort;
};

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

export const TREK_SEARCH_ITEMS: TrekSearchItem[] = [
  {
    id: "vasota-fort-trek",
    slug: "vasota-fort-trek",
    title: "Vasota Fort Trek",
    description:
      "A boat ride from Bamnoli leads into Koyna forest trails, Shivsagar backwater views, and remote fort ruins.",
    image: "/Top-Categories/vasota-fort-trek.png",
    alt: "Trekkers climbing rocks near a lake",
    durationTag: "1D",
    rating: "4.4",
    ratingCount: "92",
    altitude: "3,842 ft",
    difficulty: "Moderate",
    duration: "4-7 Hours",
    spots: "18 left",
    nextDeparture: "Sat, 19 Sep",
    operator: "JKL Trek",
    price: "Rs. 1,900",
    region: "Pune",
    destination: "Koyna, Satara",
    tags: ["fort", "forest", "backwaters", "sahyadri", "weekend"],
    priceValue: 1900,
    ratingValue: 4.4,
    departureOrder: 1,
  },
  {
    id: "lohagad-fort-trek",
    slug: "lohagad-fort-trek",
    title: "Lohagad Fort Trek",
    description:
      "An easy Lonavala fort route known for stone gates, Vinchu Kata ramparts, and Pawna Lake views.",
    image: "/Top-Categories/lohagad-fort-trek.png",
    alt: "Vertical trek destination preview",
    durationTag: "1D",
    rating: "4.7",
    ratingCount: "128",
    altitude: "3,389 ft",
    difficulty: "Easy",
    duration: "1-2 Hours",
    spots: "12 left",
    nextDeparture: "Sun, 20 Sep",
    operator: "Travel Trek",
    price: "Rs. 1,250",
    region: "Pune",
    destination: "Lonavala",
    tags: ["fort", "lonavala", "pawna", "beginner", "weekend"],
    priceValue: 1250,
    ratingValue: 4.7,
    departureOrder: 2,
  },
  {
    id: "rajmachi-trail",
    slug: "rajmachi-trail",
    title: "Rajmachi Trail",
    description:
      "A Lonavala-Karjat trail to Udhewadi and the twin forts of Shrivardhan and Manaranjan.",
    image: "/Top-Categories/rajmachi-trail.png",
    alt: "Adventure destination preview",
    durationTag: "1N/2D",
    rating: "4.6",
    ratingCount: "116",
    altitude: "2,710 ft",
    difficulty: "Easy-Moderate",
    duration: "5-6 Hours",
    spots: "9 left",
    nextDeparture: "Sat, 26 Sep",
    operator: "JKL Trek",
    price: "Rs. 2,100",
    region: "Pune",
    destination: "Lonavala, Karjat",
    tags: ["fort", "night trek", "village trail", "sunrise", "weekend"],
    priceValue: 2100,
    ratingValue: 4.6,
    departureOrder: 3,
  },
  {
    id: "harishchandragad",
    slug: "harishchandragad",
    title: "Harishchandragad",
    description:
      "A route-dependent Sahyadri fort trek with Konkan Kada, cave temples, and Taramati Peak views.",
    image: "/Top-Categories/harishchandragad-trek.png",
    alt: "Trekkers climbing a rocky trail",
    durationTag: "2D/1N",
    rating: "4.8",
    ratingCount: "154",
    altitude: "4,671 ft",
    difficulty: "Moderate-Hard",
    duration: "7 Hours",
    spots: "6 left",
    nextDeparture: "Fri, 2 Oct",
    operator: "Wild Trails",
    price: "Rs. 2,850",
    region: "Pune",
    destination: "Ahmednagar",
    tags: ["fort", "konkan kada", "caves", "sahyadri", "views"],
    priceValue: 2850,
    ratingValue: 4.8,
    departureOrder: 4,
  },
  {
    id: "kalsubai-peak",
    slug: "kalsubai-peak",
    title: "Kalsubai Peak",
    description:
      "Climb Maharashtra's highest peak from Bari village, with iron ladders, ridges, and summit views.",
    image: "/Top-Categories/kalsubai-peak.png",
    alt: "Mountain trek destination preview",
    durationTag: "1N/1D",
    rating: "4.7",
    ratingCount: "139",
    altitude: "5,400 ft",
    difficulty: "Moderate",
    duration: "3-4 Hours",
    spots: "14 left",
    nextDeparture: "Sat, 10 Oct",
    operator: "Peak Route",
    price: "Rs. 1,750",
    region: "Pune",
    destination: "Bari village",
    tags: ["peak", "summit", "highest peak", "night trek", "sahyadri"],
    priceValue: 1750,
    ratingValue: 4.7,
    departureOrder: 6,
  },
  {
    id: "devkund-waterfall",
    slug: "devkund-waterfall",
    title: "Devkund Waterfall",
    description:
      "A Bhira forest trail with rocky patches and stream crossings leading to a blue plunge waterfall.",
    image: "/Top-Categories/devkund-waterfall.png",
    alt: "Forest adventure destination preview",
    durationTag: "1D",
    rating: "4.5",
    ratingCount: "87",
    altitude: "1,545 ft",
    difficulty: "Easy-Moderate",
    duration: "5-6 Hours",
    spots: "20 left",
    nextDeparture: "Sun, 5 Oct",
    operator: "Travel Trek",
    price: "Rs. 1,550",
    region: "Pune",
    destination: "Bhira",
    tags: ["waterfall", "forest", "stream crossing", "monsoon", "weekend"],
    priceValue: 1550,
    ratingValue: 4.5,
    departureOrder: 5,
  },
  {
    id: "andharban-forest",
    slug: "andharban-forest",
    title: "Andharban Forest",
    description:
      "A descending Tamhini Ghat forest trail from Pimpri toward Bhira backwaters through dense canopy.",
    image: "/Top-Categories/andharban-forest.png",
    alt: "Trekkers on a scenic trail",
    durationTag: "1D",
    rating: "4.6",
    ratingCount: "103",
    altitude: "2,160 ft",
    difficulty: "Moderate",
    duration: "5-6 Hours",
    spots: "8 left",
    nextDeparture: "Sat, 26 Sep",
    operator: "Wild Trails",
    price: "Rs. 1,800",
    region: "Pune",
    destination: "Tamhini Ghat",
    tags: ["forest", "descending trail", "canopy", "monsoon", "backwaters"],
    priceValue: 1800,
    ratingValue: 4.6,
    departureOrder: 3,
  },
  {
    id: "sandhan-valley",
    slug: "sandhan-valley",
    title: "Sandhan Valley",
    description:
      "A Samrad village canyon route through narrow basalt walls, boulder sections, and rappelling patches.",
    image: "/Top-Categories/sandhan-valley.png",
    alt: "Vertical mountain route preview",
    durationTag: "2D/1N",
    rating: "4.8",
    ratingCount: "121",
    altitude: "1,200 ft",
    difficulty: "Moderate-Hard",
    duration: "2D",
    spots: "5 left",
    nextDeparture: "Sat, 7 Nov",
    operator: "Peak Route",
    price: "Rs. 3,200",
    region: "Pune",
    destination: "Samrad village",
    tags: ["valley", "canyon", "rappelling", "boulders", "adventure"],
    priceValue: 3200,
    ratingValue: 4.8,
    departureOrder: 7,
  },
];

export const SEARCH_REGIONS = Array.from(
  new Set(TREK_SEARCH_ITEMS.map((trek) => trek.region)),
);

export const SEARCH_DIFFICULTIES = Array.from(
  new Set(TREK_SEARCH_ITEMS.map((trek) => trek.difficulty)),
);

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

function findExactTitleMatch(query: string) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) return null;

  return (
    TREK_SEARCH_ITEMS.find(
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

  return {
    q: params.get("q") ?? "",
    region: params.get("region") ?? "",
    difficulty: params.get("difficulty") ?? "",
    sort,
  };
}

export function serializeSearchFilters(filters: SearchFilters) {
  const params = new URLSearchParams();
  const q = filters.q.trim();

  if (q) params.set("q", q);
  if (filters.region) params.set("region", filters.region);
  if (filters.difficulty) params.set("difficulty", filters.difficulty);
  if (filters.sort !== DEFAULT_SORT) params.set("sort", filters.sort);

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function searchTreks(filters: SearchFilters): TrekSearchResult[] {
  const tokens = queryTokens(filters.q);
  const exactTitleMatch = findExactTitleMatch(filters.q);

  if (
    exactTitleMatch &&
    (!filters.region || exactTitleMatch.region === filters.region) &&
    (!filters.difficulty || exactTitleMatch.difficulty === filters.difficulty)
  ) {
    return [
      {
        ...exactTitleMatch,
        score: Number.POSITIVE_INFINITY,
        matchedFields: ["title"],
      },
    ];
  }

  const results = TREK_SEARCH_ITEMS.reduce<TrekSearchResult[]>((matches, trek) => {
    if (filters.region && trek.region !== filters.region) return matches;
    if (filters.difficulty && trek.difficulty !== filters.difficulty) return matches;

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

export function getSearchSuggestions(query: string, limit = 6) {
  return searchTreks({
    q: query,
    region: "",
    difficulty: "",
    sort: "relevance",
  }).slice(0, limit);
}

export function getSearchSuggestionGroups(
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

  TREK_SEARCH_ITEMS.forEach((trek) => {
    if (trek.destination.toLowerCase().includes(normalizedQuery)) {
      destinationMap.set(
        trek.destination,
        (destinationMap.get(trek.destination) ?? 0) + 1,
      );
    }
  });

  return {
    popular: POPULAR_SEARCH_TERMS,
    treks: getSearchSuggestions(trimmedQuery, limits.treks),
    destinations: Array.from(destinationMap, ([name, count]) => ({
      name,
      count,
    })).slice(0, limits.destinations),
    regions: SEARCH_REGIONS.filter((region) =>
      region.toLowerCase().includes(normalizedQuery),
    ).slice(0, limits.regions),
  };
}

export function getSearchSuggestionActions(
  query: string,
  groups = getSearchSuggestionGroups(query),
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
