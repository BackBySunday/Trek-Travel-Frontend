// Server-side data layer for the trek details page. Everything here talks to
// the public (unauthenticated) endpoints of catalog-svc, inventory-svc and
// engagement-svc and folds the responses into one view model, so the page
// components never see raw API shapes.

export const CATALOG_URL = process.env.NEXT_PUBLIC_CATALOG_API_BASE_URL ?? "http://localhost:8089";
export const INVENTORY_URL = process.env.NEXT_PUBLIC_INVENTORY_API_BASE_URL ?? "http://localhost:8090";
export const ENGAGEMENT_URL = process.env.NEXT_PUBLIC_ENGAGEMENT_API_BASE_URL ?? "http://localhost:8092";
export const ORGANIZER_URL = process.env.NEXT_PUBLIC_ORGANIZER_API_BASE_URL ?? "http://localhost:8088";
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_API_BASE_URL ?? "http://localhost:8091";
export const PAYMENTS_URL = process.env.NEXT_PUBLIC_PAYMENTS_API_BASE_URL ?? "http://localhost:8093";
const MEDIA_BASE_URL = process.env.NEXT_PUBLIC_MEDIA_BASE_URL ?? "";

export type Fact = [label: string, value: string];

export type TrekPickup = {
  /** departure_pickup_points row id — what booking-svc's pickup_point_id field actually expects. */
  id: string;
  label: string;
  reportingTime: string;
  surchargePaise: number;
};

export type TrekDeparture = {
  id: string;
  startAt: string;
  endAt: string;
  capacity: number;
  spotsLeft: number;
  pricePaise: number;
  pickups: TrekPickup[];
  /** Optional paid extras, per traveller; null when the organizer doesn't offer it. Veg food and pickups are always free. */
  nonVegPaise: number | null;
  waterSpotsPaise: number | null;
  nonVegOptionId: string | null;
  waterSpotsOptionId: string | null;
};

export type TrekReview = {
  stars: number;
  title?: string;
  text: string;
  daysAgo: number;
};

export type TrekView = {
  id: string;
  slug: string;
  title: string;
  headline: string;
  description: string[];
  destination: string;
  baseCity: string;
  difficulty: string;
  durationDays: number;
  durationNights: number;
  basePricePaise: number;
  photos: string[];
  facts: Fact[];
  routeFacts: Fact[];
  pickupFacts: Fact[];
  intro: Record<string, string>;
  itinerary: { day: string; title: string; description: string }[];
  included: string[];
  excluded: string[];
  carry: string[];
  safety: string[];
  policies: string[];
  faqs: { question: string; answer: string }[];
  departures: TrekDeparture[];
  rating: { avg: number; count: number; distribution: number[] } | null;
  reviews: TrekReview[];
  organizer: { name: string; slug: string } | null;
};

type ApiTrip = {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  difficulty: string;
  duration_nights: number;
  duration_days: number;
  base_price_paise: number;
  base_city?: string;
  destination?: string;
  organizer_id: string;
  cancellation_policy_id?: string;
};

type ApiContentItem = { kind: string; heading: string; body?: string; sort_order: number };

type ApiTripView = {
  trip: ApiTrip;
  itinerary_days: {
    day_number: number;
    title?: string;
    items?: { sort_order: number; time_label?: string; title: string; description?: string }[];
  }[];
  media: { kind: string; file_key: string; url?: string; is_cover: boolean; sort_order: number }[];
  content_items: ApiContentItem[];
};

export async function getJson<T>(url: string, revalidateSeconds?: number): Promise<T | null> {
  try {
    const res = await fetch(
      url,
      revalidateSeconds === undefined
        ? { cache: "no-store" }
        : { next: { revalidate: revalidateSeconds }, signal: AbortSignal.timeout(4000) },
    );
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

// mediaUrl: a media file_key is either an absolute URL (organizer pasted a
// hosted image) or an object key inside the R2 bucket, which resolves against
// NEXT_PUBLIC_MEDIA_BASE_URL (the bucket's public r2.dev / custom domain).
export function mediaUrl(key: string): string | null {
  if (/^https?:\/\//i.test(key)) return key;
  if (MEDIA_BASE_URL) return `${MEDIA_BASE_URL.replace(/\/$/, "")}/${key}`;
  return null;
}

const DIFFICULTY_LABELS: Record<string, string> = {
  EASY: "Easy",
  MODERATE: "Moderate",
  DIFFICULT: "Difficult",
};

export function formatRupees(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString("en-IN")}`;
}

export function formatDepartureDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Kolkata" });
}

function bySort<T extends { sort_order: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.sort_order - b.sort_order);
}

function factsOf(items: ApiContentItem[], kind: string): Fact[] {
  return bySort(items.filter((i) => i.kind === kind)).map((i) => [i.heading, i.body ?? ""] as Fact);
}

function listOf(items: ApiContentItem[], kind: string): string[] {
  return bySort(items.filter((i) => i.kind === kind)).map((i) => i.heading);
}

async function loadDepartures(tripId: string, basePricePaise: number): Promise<TrekDeparture[]> {
  const data = await getJson<{
    departures: {
      id: string;
      start_at: string;
      end_at: string;
      total_capacity: number;
      price_override_paise?: number;
    }[];
  }>(`${INVENTORY_URL}/trips/${tripId}/departures`);
  const list = [...(data?.departures ?? [])].sort(
    (a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime(),
  );

  // Which add-on option is "Non-Veg" / "Water spots" for this trek (organizer-defined).
  const tripAddons = await getJson<{ addons: { kind: string; options?: { id: string; label: string }[] }[] }>(
    `${CATALOG_URL}/trips/id/${tripId}/addons`,
  );
  const optionId = (kind: string, label: string) =>
    tripAddons?.addons?.find((a) => a.kind === kind)?.options?.find((o) => o.label === label)?.id;
  const nonVegOption = optionId("MEAL", "Non-Veg");
  const waterOption = optionId("ACTIVITY", "Water spots");

  return Promise.all(
    list.map(async (d) => {
      const depAddons = await getJson<{ addons: { addon_option_id: string; price_paise: number }[] }>(
        `${INVENTORY_URL}/departures/${d.id}/addons`,
      );
      const priceOf = (id?: string) => (id ? depAddons?.addons?.find((a) => a.addon_option_id === id)?.price_paise ?? null : null);
      const [avail, pp] = await Promise.all([
        getJson<{ available: number }>(`${INVENTORY_URL}/departures/${d.id}/availability`),
        getJson<{
          pickup_points: { id: string; pickup_point_id: string; reporting_time: string; surcharge_paise: number }[];
        }>(`${INVENTORY_URL}/departures/${d.id}/pickup-points`),
      ]);
      const pickups: TrekPickup[] = await Promise.all(
        (pp?.pickup_points ?? []).map(async (p) => {
          const place = await getJson<{ name: string; city: string }>(`${CATALOG_URL}/pickup-points/${p.pickup_point_id}`);
          return {
            id: p.id,
            label: place ? `${place.name}, ${place.city}` : "Pickup point",
            reportingTime: (p.reporting_time ?? "").slice(0, 5),
            surchargePaise: p.surcharge_paise ?? 0,
          };
        }),
      );
      return {
        id: d.id,
        startAt: d.start_at,
        endAt: d.end_at,
        capacity: d.total_capacity,
        spotsLeft: Math.max(0, avail?.available ?? d.total_capacity),
        pricePaise: d.price_override_paise ?? basePricePaise,
        pickups,
        nonVegPaise: priceOf(nonVegOption),
        waterSpotsPaise: priceOf(waterOption),
        nonVegOptionId: priceOf(nonVegOption) !== null ? nonVegOption ?? null : null,
        waterSpotsOptionId: priceOf(waterOption) !== null ? waterOption ?? null : null,
      };
    }),
  );
}

type ApiCancellationPolicy = { rules: { hours_before: number; refund_bps: number }[] };

// Turns a refund schedule like [{48h, 100%}, {24h, 50%}, {0h, 0%}] into
// plain sentences for the Policies section.
export function describeCancellation(policy: ApiCancellationPolicy | null): string[] {
  if (!policy?.rules?.length) return [];
  const rules = [...policy.rules].sort((a, b) => b.hours_before - a.hours_before);
  const refund = (bps: number) => (bps <= 0 ? "no refund" : `${Math.round(bps / 100)}% refund`);
  return rules.map((rule, i) => {
    if (rule.hours_before > 0) {
      return `Cancel ${rule.hours_before} or more hours before departure: ${refund(rule.refund_bps)}.`;
    }
    const prev = rules[i - 1];
    return prev
      ? `Cancel less than ${prev.hours_before} hours before departure: ${refund(rule.refund_bps)}.`
      : `On cancellation: ${refund(rule.refund_bps)}.`;
  });
}

type ApiOrganizerContent = {
  organizer: { display_name: string; slug: string };
  content_items: { kind: string; heading: string; body?: string; sort_order: number }[];
};

async function loadReviews(tripId: string): Promise<Pick<TrekView, "rating" | "reviews">> {
  const [agg, list] = await Promise.all([
    getJson<{ review_count: number; avg_overall: number; star_histogram?: Record<string, number> }>(
      `${ENGAGEMENT_URL}/aggregates/TRIP/${tripId}`,
    ),
    getJson<{
      reviews: { overall_rating: number; title?: string; body?: string; created_at: string }[];
    }>(`${ENGAGEMENT_URL}/public/reviews?trip_id=${tripId}&limit=12`),
  ]);

  const reviews: TrekReview[] = (list?.reviews ?? [])
    .filter((r) => r.body || r.title)
    .map((r) => ({
      stars: r.overall_rating,
      title: r.title,
      text: r.body ?? r.title ?? "",
      daysAgo: Math.max(0, Math.floor((Date.now() - new Date(r.created_at).getTime()) / 86_400_000)),
    }));

  if (!agg || agg.review_count === 0) return { rating: null, reviews };

  const hist = agg.star_histogram ?? {};
  const counts = [5, 4, 3, 2, 1].map((s) => Number(hist[String(s)] ?? 0));
  const total = counts.reduce((a, b) => a + b, 0) || agg.review_count;
  return {
    rating: {
      avg: agg.avg_overall,
      count: agg.review_count,
      distribution: counts.map((c) => Math.round((c / total) * 100)),
    },
    reviews,
  };
}

export async function getFirstPublishedSlug(): Promise<string | null> {
  const data = await getJson<{ trips: { slug: string }[] }>(`${CATALOG_URL}/trips`);
  return data?.trips?.[0]?.slug ?? null;
}

export async function getTrek(slug: string): Promise<TrekView | null> {
  const view = await getJson<ApiTripView>(`${CATALOG_URL}/trips/${encodeURIComponent(slug)}`);
  if (!view?.trip) return null;

  const t = view.trip;
  const content = view.content_items ?? [];

  const [departures, reviewData, provider, policy] = await Promise.all([
    loadDepartures(t.id, t.base_price_paise),
    loadReviews(t.id),
    getJson<ApiOrganizerContent>(`${ORGANIZER_URL}/organizers/id/${t.organizer_id}`, 15),
    getJson<ApiCancellationPolicy>(
      t.cancellation_policy_id
        ? `${CATALOG_URL}/cancellation-policies/${t.cancellation_policy_id}`
        : `${CATALOG_URL}/cancellation-policies/platform-default`,
      15,
    ),
  ]);
  const providerItems = bySort((provider?.content_items ?? []).map((c) => ({ ...c })));

  const media = [...(view.media ?? [])].sort(
    (a, b) => Number(b.is_cover) - Number(a.is_cover) || a.sort_order - b.sort_order,
  );
  const photos = media
    .filter((m) => m.kind === "PHOTO")
    .map((m) => m.url || mediaUrl(m.file_key))
    .filter((u): u is string => Boolean(u));

  const intro: Record<string, string> = {};
  for (const i of content.filter((c) => c.kind === "SECTION_INTRO")) {
    if (i.body) intro[i.heading] = i.body;
  }

  const facts = factsOf(content, "FACT");
  if (facts.length === 0) {
    facts.push(["Difficulty", DIFFICULTY_LABELS[t.difficulty] ?? t.difficulty]);
    if (t.destination) facts.push(["Destination", t.destination]);
    if (t.base_city) facts.push(["Starts from", t.base_city]);
  }

  const pickupFacts = factsOf(content, "PICKUP_FACT");
  const meetingPoints = Array.from(new Set(departures.flatMap((d) => d.pickups.map((p) => p.label))));
  if (t.base_city && !pickupFacts.some(([l]) => /city/i.test(l))) pickupFacts.unshift(["Pickup city", t.base_city]);
  if (meetingPoints.length && !pickupFacts.some(([l]) => /meeting/i.test(l))) {
    pickupFacts.splice(1, 0, ["Meeting point", meetingPoints.join(" / ")]);
  }

  const itinerary = [...(view.itinerary_days ?? [])]
    .sort((a, b) => a.day_number - b.day_number)
    .map((d) => {
      const items = [...(d.items ?? [])].sort((a, b) => a.sort_order - b.sort_order);
      const description = items
        .map((it) => `${it.time_label ? `${it.time_label} – ` : ""}${it.description || it.title}`)
        .join(" ");
      return { day: `Day ${d.day_number}`, title: d.title ?? items[0]?.title ?? "", description };
    });

  const faqs = [...bySort(content.filter((c) => c.kind === "FAQ")), ...providerItems.filter((c) => c.kind === "FAQ")].map((c) => ({
    question: c.heading,
    answer: c.body ?? "",
  }));

  return {
    id: t.id,
    slug: t.slug,
    title: t.title,
    headline: t.summary ?? "",
    description: bySort(content.filter((c) => c.kind === "OVERVIEW")).map((c) => c.body || c.heading),
    destination: t.destination ?? "",
    baseCity: t.base_city ?? "",
    difficulty: DIFFICULTY_LABELS[t.difficulty] ?? t.difficulty,
    durationDays: t.duration_days,
    durationNights: t.duration_nights,
    basePricePaise: t.base_price_paise,
    photos,
    facts,
    routeFacts: factsOf(content, "ROUTE_FACT"),
    pickupFacts,
    intro,
    itinerary,
    included: listOf(content, "INCLUSION"),
    excluded: listOf(content, "EXCLUSION"),
    carry: listOf(content, "THINGS_TO_CARRY"),
    safety: listOf(content, "SAFETY"),
    policies: [
      ...describeCancellation(policy),
      ...listOf(content, "POLICY"),
      ...providerItems.filter((c) => c.kind === "POLICY").map((c) => c.heading),
    ],
    faqs,
    departures,
    rating: reviewData.rating,
    reviews: reviewData.reviews,
    organizer: provider ? { name: provider.organizer.display_name, slug: provider.organizer.slug } : null,
  };
}

// Which page sections have content, in display order — drives the sticky nav.
export function visibleSections(trek: TrekView): { id: string; label: string }[] {
  const all: [string, string, boolean][] = [
    ["overview", "Overview", true],
    ["route-details", "Route", trek.routeFacts.length > 0],
    ["itinerary", "Itinerary", trek.itinerary.length > 0],
    ["pickup-drop", "Pickup", trek.pickupFacts.length > 0],
    ["included", "Included", trek.included.length + trek.excluded.length > 0],
    ["things-to-carry", "Carry", trek.carry.length > 0],
    ["safety", "Safety", trek.safety.length > 0],
    ["policies", "Policies", trek.policies.length > 0],
    ["photos", "Photos", trek.photos.length > 0],
    ["reviews", "Reviews", true],
    ["faq", "FAQ", trek.faqs.length > 0],
  ];
  return all.filter(([, , show]) => show).map(([id, label]) => ({ id, label }));
}
