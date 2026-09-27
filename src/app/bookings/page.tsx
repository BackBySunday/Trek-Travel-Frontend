"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { formatRupees } from "@/lib/trek";
import { listOwnBookings, type Booking } from "@/lib/booking";
import { useAuth } from "@/lib/AuthContext";

const CATALOG_URL = process.env.NEXT_PUBLIC_CATALOG_API_BASE_URL ?? "http://localhost:8089";

const statusStyles: Record<string, string> = {
  CONFIRMED: "bg-[#EAF7EE] text-[#1A7A3C]",
  COMPLETED: "bg-[#EAF7EE] text-[#1A7A3C]",
  PENDING_PAYMENT: "bg-[#FFF6E5] text-[#8A6300]",
  CANCELLED: "bg-[#FDECEC] text-[#9B2C2C]",
  NO_SHOW: "bg-[#FDECEC] text-[#9B2C2C]",
  EXPIRED: "bg-[#F1F1F1] text-[#666]",
};

const statusLabels: Record<string, string> = {
  CONFIRMED: "Confirmed",
  COMPLETED: "Completed",
  PENDING_PAYMENT: "Payment pending",
  CANCELLED: "Cancelled",
  NO_SHOW: "No-show",
  EXPIRED: "Expired",
};

// Booking status doubles as payment status here: PENDING_PAYMENT means the
// gateway order hasn't captured yet, CONFIRMED+ means it has.
function paymentLabel(status: string): string {
  if (status === "PENDING_PAYMENT") return "Awaiting payment";
  if (status === "CANCELLED" || status === "EXPIRED" || status === "NO_SHOW") return "Not charged";
  return "Paid";
}

export default function BookingsPage() {
  const { accessToken, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) router.replace("/auth");
  }, [isLoading, isAuthenticated, router]);

  useEffect(() => {
    if (!accessToken) return;
    let cancelled = false;
    async function load() {
      try {
        const list = await listOwnBookings(accessToken!, 100);
        if (cancelled) return;
        setBookings([...list].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()));
        setLoaded(true);

        const tripIds = Array.from(new Set(list.map((b) => b.trip_id)));
        const entries = await Promise.all(
          tripIds.map(async (id) => {
            try {
              const res = await fetch(`${CATALOG_URL}/trips/id/${id}`, { cache: "no-store" });
              if (!res.ok) return [id, "This trek"] as const;
              const data = (await res.json()) as { title?: string };
              return [id, data.title || "This trek"] as const;
            } catch {
              return [id, "This trek"] as const;
            }
          }),
        );
        if (!cancelled) setTitles(Object.fromEntries(entries));
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load your bookings.");
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <main className="mx-auto min-h-[100svh] max-w-4xl px-4 py-8 text-[#101010]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-urbanist text-2xl font-bold">My bookings</h1>
        <Link href="/" className="font-urbanist text-sm text-[#666] underline">
          Back to explore
        </Link>
      </div>

      {error ? <p className="mb-4 font-urbanist text-sm text-[#9B2C2C]">{error}</p> : null}

      {loaded && bookings.length === 0 ? (
        <p className="font-urbanist text-sm text-[#8E8E8E]">No bookings yet. Once you book a trek, its history and payment status will show up here.</p>
      ) : null}

      <ul className="flex flex-col gap-3">
        {bookings.map((b) => (
          <li key={b.id} className="rounded-[18px] border border-[#E5E5E5] bg-white p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-urbanist text-base font-semibold">{titles[b.trip_id] ?? "Loading trek…"}</p>
                <p className="mt-0.5 font-urbanist text-xs text-[#8E8E8E]">
                  Booking {b.booking_code} · {b.traveller_count} traveller{b.traveller_count > 1 ? "s" : ""} · {new Date(b.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 font-urbanist text-xs font-semibold ${statusStyles[b.status] ?? "bg-[#F1F1F1] text-[#666]"}`}>
                {statusLabels[b.status] ?? b.status}
              </span>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-[#F0F0F0] pt-3">
              <p className="font-urbanist text-xs text-[#8E8E8E]">{paymentLabel(b.status)}</p>
              <p className="font-urbanist text-base font-bold">{formatRupees(b.payable_paise)}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
