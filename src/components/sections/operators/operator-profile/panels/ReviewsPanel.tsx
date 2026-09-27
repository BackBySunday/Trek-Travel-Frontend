"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/apiClient";
import { useAuth } from "@/lib/AuthContext";
import { StatIcon } from "../OperatorIcons";
import type { Operator, OperatorReview, OperatorTrek } from "../OperatorProfileSection";

const ENGAGEMENT_URL = process.env.NEXT_PUBLIC_ENGAGEMENT_API_BASE_URL ?? "http://localhost:8092";

const distribution = [78, 15, 4, 2, 1];

function WriteReview({ operator, treks, onSubmitted }: { operator: Operator; treks: OperatorTrek[]; onSubmitted: () => void }) {
  const router = useRouter();
  const { accessToken } = useAuth();
  const [open, setOpen] = useState(false);
  const [tripId, setTripId] = useState(treks[0]?.id ?? "");
  const [stars, setStars] = useState(5);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ tone: "ok" | "error"; text: string } | null>(null);

  if (treks.length === 0) return null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!accessToken) {
      router.push("/auth");
      return;
    }
    if (text.trim().length < 10) {
      setNotice({ tone: "error", text: "Please write at least a sentence or two about your experience." });
      return;
    }
    setBusy(true);
    setNotice(null);
    try {
      const res = await authFetch(ENGAGEMENT_URL, "/reviews", accessToken, {
        method: "POST",
        body: JSON.stringify({ trip_id: tripId, organizer_id: operator.id, overall_rating: stars, title: title.trim() || undefined, body: text.trim() }),
      });
      if (res.status === 409) {
        setNotice({ tone: "error", text: "You've already reviewed this trek. Pick another trek." });
      } else if (!res.ok) {
        setNotice({ tone: "error", text: "Could not submit your review. Please try again." });
      } else {
        setNotice({ tone: "ok", text: "Thanks! Your review is now live." });
        onSubmitted();
        setTitle("");
        setText("");
        setOpen(false);
      }
    } catch {
      setNotice({ tone: "error", text: "Could not reach the server. Please try again." });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="lg:col-span-3">
      {notice ? (
        <p className={`mb-3 rounded-[14px] px-4 py-2.5 font-urbanist text-sm ${notice.tone === "ok" ? "bg-[#EAF7EE] text-[#1A7A3C]" : "bg-[#FDECEC] text-[#9B2C2C]"}`}>
          {notice.text}
        </p>
      ) : null}
      {!open ? (
        <button
          type="button"
          onClick={() => (accessToken ? setOpen(true) : router.push("/auth"))}
          className="inline-flex h-11 items-center rounded-full bg-[rgba(20,20,20,0.84)] px-5 font-urbanist text-sm font-semibold text-white shadow-[0_2px_4px_0_rgba(0,0,0,0.15)] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Write a review
        </button>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-white p-6">
          <p className="font-urbanist text-lg font-medium text-[#101010]">Review {operator.name}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5 font-urbanist text-sm text-[#666]">
              Trek
              <select
                value={tripId}
                onChange={(event) => setTripId(event.target.value)}
                className="h-11 rounded-[12px] border border-[#D7D7D7] bg-white px-3 text-[#101010] outline-none focus:border-[#101010]"
              >
                {treks.map((trek) => (
                  <option key={trek.id} value={trek.id}>
                    {trek.title}
                  </option>
                ))}
              </select>
            </label>
            <div className="flex flex-col gap-1.5 font-urbanist text-sm text-[#666]">
              Your rating
              <div className="flex h-11 items-center gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={stars === n}
                    aria-label={`${n} star${n === 1 ? "" : "s"}`}
                    onClick={() => setStars(n)}
                    className={n <= stars ? "text-[#FEB531]" : "text-[#D7D7D7]"}
                  >
                    <span className="block scale-125">
                      <StatIcon icon="star" />
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Title (optional)"
            maxLength={120}
            className="h-11 rounded-[12px] border border-[#D7D7D7] bg-white px-3 font-urbanist text-sm outline-none focus:border-[#101010]"
          />
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Share what the trek and the organizer were like"
            rows={4}
            maxLength={2000}
            className="rounded-[12px] border border-[#D7D7D7] bg-white p-3 font-urbanist text-sm outline-none focus:border-[#101010]"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="h-11 rounded-full bg-[rgba(20,20,20,0.84)] px-6 font-urbanist text-sm font-semibold text-white disabled:opacity-50"
            >
              {busy ? "Submitting…" : "Submit review"}
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="h-11 rounded-full border border-[#D7D7D7] bg-white px-5 font-urbanist text-sm font-medium text-[#101010]"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

type ApiReview = { trip_id: string; overall_rating: number; title?: string; body?: string; is_verified?: boolean; reviewer_name?: string; created_at: string };
type ReviewPage = { reviews?: ApiReview[]; next_cursor?: string };

const PAGE_SIZE = 6;

export default function ReviewsPanel({
  operator,
  reviews: initialReviews,
  treks,
}: {
  operator: Operator;
  reviews: OperatorReview[];
  treks: OperatorTrek[];
}) {
  const [reviews, setReviews] = useState<OperatorReview[]>(initialReviews);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadError, setLoadError] = useState("");

  const toReview = useCallback(
    (r: ApiReview): OperatorReview => ({
      name: r.reviewer_name || (r.is_verified ? "Verified traveller" : "Traveller"),
      verified: Boolean(r.is_verified),
      stars: r.overall_rating,
      daysAgo: Math.max(0, Math.floor((Date.now() - new Date(r.created_at).getTime()) / 86_400_000)),
      text: r.body ?? r.title ?? "",
      trek: treks.find((t) => t.id === r.trip_id)?.title ?? "a trek",
    }),
    [treks],
  );

  // Cursor pagination: page 1 without a cursor, then each next_cursor for older reviews.
  const fetchPage = useCallback(
    async (after: string | null): Promise<{ items: OperatorReview[]; next: string | null }> => {
      const qs = `organizer_id=${operator.id}&limit=${PAGE_SIZE}${after ? `&cursor=${encodeURIComponent(after)}` : ""}`;
      const res = await fetch(`${ENGAGEMENT_URL}/public/reviews?${qs}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Could not load reviews.");
      const data = (await res.json()) as ReviewPage;
      return { items: (data.reviews ?? []).filter((r) => r.body || r.title).map(toReview), next: data.next_cursor ?? null };
    },
    [operator.id, toReview],
  );

  const reloadFirstPage = useCallback(async () => {
    try {
      const page = await fetchPage(null);
      setReviews(page.items);
      setCursor(page.next);
      setLoadError("");
    } catch {
      /* keep the server-rendered reviews */
    }
  }, [fetchPage]);

  useEffect(() => {
    void reloadFirstPage();
  }, [reloadFirstPage]);

  async function loadMore() {
    if (!cursor || loadingMore) return;
    setLoadingMore(true);
    setLoadError("");
    try {
      const page = await fetchPage(cursor);
      setReviews((prev) => [...prev, ...page.items]);
      setCursor(page.next);
    } catch {
      setLoadError("Could not load more reviews. Please try again.");
    } finally {
      setLoadingMore(false);
    }
  }

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <WriteReview operator={operator} treks={treks} onSubmitted={reloadFirstPage} />
      <div>
        <div className="flex h-full flex-col gap-4 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-7">
          <div className="flex items-end gap-3">
            <span className="font-urbanist text-5xl font-medium leading-none text-[#101010]">
              {operator.rating.toFixed(1)}
            </span>
            <span className="pb-1 font-urbanist text-sm text-[#666]">
              {operator.reviewCount} reviews
            </span>
          </div>
          <div className="flex flex-col gap-1.5">
            {distribution.map((pct, index) => (
              <div key={pct} className="flex items-center gap-2">
                <span className="w-3 font-urbanist text-xs text-[#8E8E8E]">
                  {5 - index}
                </span>
                <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#E5E5E5]">
                  <span
                    className="block h-full rounded-full bg-[#FEB531]"
                    style={{ width: `${pct}%` }}
                  />
                </span>
                <span className="w-8 text-right font-urbanist text-xs text-[#8E8E8E]">
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {reviews.map((review, reviewIndex) => (
        <div key={`${reviewIndex}-${review.text.slice(0, 12)}`}>
          <figure className="flex h-full flex-col gap-3 rounded-[20px] border border-[#E5E5E5] bg-[#F6F7F7] p-6">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-[#1A1A17] font-urbanist text-sm text-white">
                {review.name[0]}
              </span>
              <div>
                <p className="font-urbanist text-sm font-medium text-[#101010]">
                  {review.name}
                </p>
                <p className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < review.stars ? "text-[#FEB531]" : "text-[#D7D7D7]"
                      }
                    >
                      <StatIcon icon="star" />
                    </span>
                  ))}
                </p>
              </div>
              <span className="ml-auto font-urbanist text-xs text-[#8E8E8E]">
                {review.daysAgo}d ago
              </span>
            </div>
            <blockquote className="font-urbanist text-sm leading-relaxed text-[#666]">
              {review.text}
            </blockquote>
            <figcaption className="mt-auto font-urbanist text-xs text-[#8E8E8E]">
              on {review.trek}
            </figcaption>
          </figure>
        </div>
      ))}

      {reviews.length === 0 ? (
        <p className="font-urbanist text-sm text-[#8E8E8E] lg:col-span-2">No reviews yet. Be the first to review this organizer.</p>
      ) : null}

      {cursor || loadError ? (
        <div className="flex flex-col items-center gap-2 lg:col-span-3">
          {loadError ? <p className="font-urbanist text-sm text-[#9B2C2C]">{loadError}</p> : null}
          <button
            type="button"
            onClick={loadMore}
            disabled={loadingMore}
            className="h-11 rounded-full border border-[#D7D7D7] bg-white px-6 font-urbanist text-sm font-medium text-[#101010] disabled:opacity-50"
          >
            {loadingMore ? "Loading…" : "Load more reviews"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
