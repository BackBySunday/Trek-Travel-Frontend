// Server-side data for the operator (organizer) profile page, assembled from
// organizer-svc (profile, stats, gallery, socials), catalog/inventory (their
// treks) and engagement-svc (reviews + rating).

import type {
  Operator,
  OperatorReview,
  OperatorTrek,
  OperatorVideo,
} from "@/components/sections/operators/operator-profile/OperatorProfileSection";
import { ENGAGEMENT_URL, ORGANIZER_URL, getJson, mediaUrl } from "@/lib/trek";
import { getTrekSearchItems } from "@/lib/trekCards";

const FALLBACK_COVER = "/Hero/sahyadri-fort-sunrise.png";
const FALLBACK_MARK = "/Hero/card-1.png";

type ApiOrganizerProfile = {
  organizer: {
    id: string;
    slug: string;
    display_name: string;
    about?: string;
    logo_url?: string;
    cover_url?: string;
    base_city?: string;
    status: string;
    activated_at?: string;
    created_at: string;
  };
  safety_band: string;
  stats: {
    trips_published: number;
    departures_completed: number;
    travellers_served: number;
    followers_count: number;
    avg_rating?: number;
    response_rate?: number;
  };
  media: { id: string; kind: string; file_key: string; url?: string; thumb_key?: string; caption?: string; is_featured: boolean; sort_order: number }[];
  social_links: { platform: string; url: string }[];
  content_items?: { kind: string; heading: string; body?: string; sort_order: number }[];
};

export type OperatorPageData = {
  operator: Operator;
  treks: OperatorTrek[];
  moreTreks: OperatorTrek[];
  videos: OperatorVideo[];
  galleryImages: string[];
  reviews: OperatorReview[];
};

export async function getFirstOperatorSlug(): Promise<string | null> {
  const items = await getTrekSearchItems();
  const organizerId = items.find((i) => i.organizerId)?.organizerId;
  if (!organizerId) return null;
  const data = await getJson<ApiOrganizerProfile>(`${ORGANIZER_URL}/organizers/id/${organizerId}`, 15);
  return data?.organizer.slug ?? null;
}

function toOperatorTrek(item: Awaited<ReturnType<typeof getTrekSearchItems>>[number]): OperatorTrek {
  return {
    ...item,
    coverUrl: item.image,
    durationLabel: item.durationTag,
    priceFrom: item.price,
    upcomingDates: item.upcomingDates ?? [],
  };
}

export async function getOperator(slug: string): Promise<OperatorPageData | null> {
  const profile = await getJson<ApiOrganizerProfile>(`${ORGANIZER_URL}/organizers/${encodeURIComponent(slug)}`, 15);
  if (!profile?.organizer) return null;

  const o = profile.organizer;
  const [items, agg, reviewList] = await Promise.all([
    getTrekSearchItems(),
    getJson<{ review_count: number; avg_overall: number }>(`${ENGAGEMENT_URL}/aggregates/ORGANIZER/${o.id}`, 15),
    getJson<{ reviews: { trip_id: string; overall_rating: number; title?: string; body?: string; is_verified?: boolean; reviewer_name?: string; created_at: string }[] }>(
      `${ENGAGEMENT_URL}/public/reviews?organizer_id=${o.id}&limit=20`,
      15,
    ),
  ]);

  const media = [...profile.media].sort(
    (a, b) => Number(b.is_featured) - Number(a.is_featured) || a.sort_order - b.sort_order,
  );
  const photos = media.filter((m) => m.kind === "PHOTO");
  const galleryImages = photos.map((m) => m.url || mediaUrl(m.file_key)).filter((u): u is string => Boolean(u));

  const videos: OperatorVideo[] = media
    .filter((m) => m.kind === "VIDEO")
    .flatMap((m) => {
      const src = m.url || mediaUrl(m.file_key);
      if (!src) return [];
      const thumb = (m.thumb_key && mediaUrl(m.thumb_key)) || galleryImages[0] || o.cover_url || FALLBACK_COVER;
      return [{ id: m.id, title: m.caption || "Trail video", thumb, duration: "", views: "", posted: "", youtubeId: "", src }];
    });

  const own = items.filter((i) => i.organizerId === o.id).map(toOperatorTrek);
  const more = items.filter((i) => i.organizerId !== o.id).slice(0, 4).map(toOperatorTrek);
  const titleById = new Map(items.map((i) => [i.id, i.title]));

  const reviews: OperatorReview[] = (reviewList?.reviews ?? [])
    .filter((r) => r.body || r.title)
    .map((r) => ({
      name: r.reviewer_name || (r.is_verified ? "Verified traveller" : "Traveller"),
      verified: Boolean(r.is_verified),
      stars: r.overall_rating,
      daysAgo: Math.max(0, Math.floor((Date.now() - new Date(r.created_at).getTime()) / 86_400_000)),
      text: r.body ?? r.title ?? "",
      trek: titleById.get(r.trip_id) ?? "a trek",
    }));

  const now = Date.now();
  const rating = agg && agg.review_count > 0 ? agg.avg_overall : (profile.stats.avg_rating ?? 0);
  const rr = profile.stats.response_rate;

  const operator: Operator = {
    id: o.id,
    name: o.display_name,
    homeBase: o.base_city ?? "India",
    since: new Date(o.activated_at ?? o.created_at).getFullYear(),
    rating,
    reviewCount: agg?.review_count ?? 0,
    followerCount: profile.stats.followers_count,
    treksLed: profile.stats.departures_completed,
    travellersServed: profile.stats.travellers_served,
    upcomingDepartures: own.reduce(
      (n, t) => n + t.upcomingDates.filter((d) => new Date(d).getTime() <= now + 90 * 86_400_000).length,
      0,
    ),
    yearsOnPlatform: Math.max(0, new Date(now).getFullYear() - new Date(o.activated_at ?? o.created_at).getFullYear()),
    verified: o.status === "ACTIVE",
    bio: o.about ?? "",
    region: o.base_city ?? "",
    coverUrl: o.cover_url || galleryImages[0] || FALLBACK_COVER,
    markUrl: o.logo_url || FALLBACK_MARK,
    safetyBand: profile.safety_band,
    responseRate: rr == null ? null : Math.round(rr <= 1 ? rr * 100 : rr),
    social: profile.social_links,
    faqs: (profile.content_items ?? []).filter((c) => c.kind === "FAQ").map((c) => ({ question: c.heading, answer: c.body ?? "" })),
    policies: (profile.content_items ?? []).filter((c) => c.kind === "POLICY").map((c) => c.heading),
  };

  return { operator, treks: own, moreTreks: more, videos, galleryImages, reviews };
}
