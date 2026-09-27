// Operator (organizer) summaries for listings: the home page partner strip and
// the /operators directory. One entry per organizer that has published treks.

import { ENGAGEMENT_URL, ORGANIZER_URL, getJson } from "@/lib/trek";
import { getTrekSearchItems } from "@/lib/trekCards";

export type OperatorSummary = {
  id: string;
  slug: string;
  name: string;
  city: string;
  about: string;
  logoUrl: string | null;
  coverUrl: string | null;
  rating: number;
  reviewCount: number;
  trekCount: number;
  followerCount: number;
  departuresCompleted: number;
  verified: boolean;
};

type ApiProfile = {
  organizer: { id: string; slug: string; display_name: string; about?: string; logo_url?: string; cover_url?: string; base_city?: string; status: string };
  stats: { followers_count: number; departures_completed: number; avg_rating?: number };
};

export async function getOperatorSummaries(): Promise<OperatorSummary[]> {
  const items = await getTrekSearchItems();
  const counts = new Map<string, number>();
  for (const item of items) {
    if (item.organizerId) counts.set(item.organizerId, (counts.get(item.organizerId) ?? 0) + 1);
  }

  const summaries = await Promise.all(
    Array.from(counts, async ([id, trekCount]): Promise<OperatorSummary | null> => {
      const [profile, agg] = await Promise.all([
        getJson<ApiProfile>(`${ORGANIZER_URL}/organizers/id/${id}`, 15),
        getJson<{ review_count: number; avg_overall: number }>(`${ENGAGEMENT_URL}/aggregates/ORGANIZER/${id}`, 15),
      ]);
      if (!profile?.organizer || profile.organizer.status === "SUSPENDED") return null;
      const o = profile.organizer;
      const hasReviews = Boolean(agg && agg.review_count > 0);
      return {
        id,
        slug: o.slug,
        name: o.display_name,
        city: o.base_city ?? "",
        about: o.about ?? "",
        logoUrl: o.logo_url ?? null,
        coverUrl: o.cover_url ?? null,
        rating: hasReviews ? agg!.avg_overall : (profile.stats.avg_rating ?? 0),
        reviewCount: agg?.review_count ?? 0,
        trekCount,
        followerCount: profile.stats.followers_count,
        departuresCompleted: profile.stats.departures_completed,
        verified: o.status === "ACTIVE",
      };
    }),
  );

  return summaries
    .filter((s): s is OperatorSummary => s !== null)
    .sort((a, b) => b.rating - a.rating || b.trekCount - a.trekCount || a.name.localeCompare(b.name));
}
