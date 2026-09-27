// Builds the listing-card data (home, search, related treks) from the live
// catalog, inventory, organizer and engagement services — one card per
// published trek. Server-only: called from server components.

import type { FilterDef, TrekAttributeValue, TrekSearchItem } from "@/lib/search";
import { CATALOG_URL, ENGAGEMENT_URL, INVENTORY_URL, ORGANIZER_URL, getJson, mediaUrl } from "@/lib/trek";

const REVALIDATE_SECONDS = 15;
const FALLBACK_IMAGE = "/Hero/card-1.png";

const DIFFICULTY_LABELS: Record<string, string> = { EASY: "Easy", MODERATE: "Moderate", DIFFICULT: "Difficult" };

type ApiListTrip = {
  id: string;
  organizer_id: string;
  slug: string;
  title: string;
  summary?: string;
  difficulty: string;
  duration_nights: number;
  duration_days: number;
  base_price_paise: number;
  base_city?: string;
  destination?: string;
  altitude_ft?: number;
  thumbnail_key?: string;
  thumbnail_url?: string;
  attributes?: { key: string; label: string; data_type: string; value?: string; value_label?: string; num_value?: number; bool_value?: boolean }[];
};

type ApiDeparture = { id: string; start_at: string; total_capacity: number; price_override_paise?: number };

function formatCardDate(iso: string): string {
  const d = new Date(iso);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    d.toLocaleDateString("en-GB", { ...opts, timeZone: "Asia/Kolkata" });
  return `${part({ weekday: "short" })}, ${part({ day: "numeric" })} ${part({ month: "short" })}`;
}

function formatRs(rupees: number): string {
  return `Rs. ${Math.round(rupees).toLocaleString("en-IN")}`;
}

export async function getTrekSearchItems(): Promise<TrekSearchItem[]> {
  const list = await getJson<{ trips: ApiListTrip[] }>(`${CATALOG_URL}/trips?limit=50`, REVALIDATE_SECONDS);
  const trips = list?.trips ?? [];
  if (trips.length === 0) return [];

  const organizerIds = Array.from(new Set(trips.map((t) => t.organizer_id)));
  const organizers = new Map<string, string>();
  await Promise.all(
    organizerIds.map(async (id) => {
      const data = await getJson<{ organizer: { display_name: string } }>(
        `${ORGANIZER_URL}/organizers/id/${id}`,
        REVALIDATE_SECONDS,
      );
      if (data?.organizer) organizers.set(id, data.organizer.display_name);
    }),
  );

  const now = Date.now();
  const items = await Promise.all(
    trips.map(async (t): Promise<TrekSearchItem> => {
      const [deps, agg] = await Promise.all([
        getJson<{ departures: ApiDeparture[] }>(`${INVENTORY_URL}/trips/${t.id}/departures`, REVALIDATE_SECONDS),
        getJson<{ review_count: number; avg_overall: number }>(`${ENGAGEMENT_URL}/aggregates/TRIP/${t.id}`, REVALIDATE_SECONDS),
      ]);

      const upcoming = (deps?.departures ?? [])
        .filter((d) => new Date(d.start_at).getTime() >= now)
        .sort((a, b) => new Date(a.start_at).getTime() - new Date(b.start_at).getTime());
      const next = upcoming[0];
      const avail = next
        ? await getJson<{ available: number }>(`${INVENTORY_URL}/departures/${next.id}/availability`, REVALIDATE_SECONDS)
        : null;
      const spotsLeft = next ? Math.max(0, avail?.available ?? next.total_capacity) : 0;

      const prices = [t.base_price_paise, ...upcoming.map((d) => d.price_override_paise ?? t.base_price_paise)];
      const fromRupees = Math.min(...prices) / 100;

      const rating = agg && agg.review_count > 0 ? agg.avg_overall : 0;
      const difficulty = DIFFICULTY_LABELS[t.difficulty] ?? t.difficulty;
      const region = t.base_city || t.destination || "";
      const image = t.thumbnail_url || (t.thumbnail_key && mediaUrl(t.thumbnail_key)) || FALLBACK_IMAGE;

      return {
        id: t.id,
        slug: t.slug,
        title: t.title,
        description: t.summary ?? "",
        image,
        alt: `${t.title} thumbnail`,
        durationTag: t.duration_days <= 1 ? "1D" : `${t.duration_nights}N/${t.duration_days}D`,
        rating: rating ? rating.toFixed(1) : "New",
        ratingCount: agg && agg.review_count > 0 ? String(agg.review_count) : undefined,
        altitude: t.altitude_ft ? `${t.altitude_ft.toLocaleString("en-IN")} ft` : "—",
        difficulty,
        duration: `${t.duration_days} ${t.duration_days === 1 ? "day" : "days"}`,
        spots: !next ? "No dates yet" : spotsLeft > 0 ? `${spotsLeft} left` : "Sold out",
        nextDeparture: next ? formatCardDate(next.start_at) : "To be announced",
        operator: organizers.get(t.organizer_id) ?? "Trek organizer",
        price: formatRs(fromRupees),
        href: `/trek-details/${t.slug}`,
        region,
        destination: t.destination ?? region,
        tags: [difficulty, t.base_city, t.destination, ...(t.destination?.split(/[\s,]+/) ?? []), ...(t.attributes ?? []).map((a) => a.value_label)]
          .filter((x): x is string => Boolean(x))
          .map((x) => x.toLowerCase()),
        priceValue: fromRupees,
        ratingValue: rating,
        departureOrder: next ? new Date(next.start_at).getTime() / 1000 : Number.MAX_SAFE_INTEGER,
        organizerId: t.organizer_id,
        attributes: (t.attributes ?? []).map(
          (a): TrekAttributeValue => ({ key: a.key, label: a.label, type: a.data_type, value: a.value, valueLabel: a.value_label, num: a.num_value, bool: a.bool_value }),
        ),
        upcomingDates: upcoming.map((d) => d.start_at.slice(0, 10)),
      };
    }),
  );

  return items;
}

/** The admin-managed filter registry (active filters + their options) from catalog-svc. */
export async function getFilterDefs(): Promise<FilterDef[]> {
  const data = await getJson<{
    filters: { key: string; label: string; data_type: string; unit?: string; options?: { value: string; label: string }[] }[];
  }>(`${CATALOG_URL}/filters`, REVALIDATE_SECONDS);
  return (data?.filters ?? []).map((f) => ({
    key: f.key,
    label: f.label,
    dataType: f.data_type,
    unit: f.unit,
    options: (f.options ?? []).map((o) => ({ value: o.value, label: o.label })),
  }));
}
