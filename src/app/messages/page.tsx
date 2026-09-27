"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ChatPanel, { ENGAGEMENT_URL } from "@/components/chat/ChatPanel";
import { authFetch } from "@/lib/apiClient";
import { useAuth } from "@/lib/AuthContext";

type Conversation = {
  id: string;
  kind: "ORG_ENQUIRY" | "DEPARTURE_GROUP" | "SUPPORT" | string;
  title?: string;
  status: string;
  last_message?: string;
  last_message_at?: string;
};

export default function MessagesPage() {
  const { accessToken, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [active, setActive] = useState<Conversation | null>(null);
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
        const res = await authFetch(ENGAGEMENT_URL, "/conversations?limit=100", accessToken);
        if (!res.ok) throw new Error("Could not load your messages.");
        const data = (await res.json()) as { conversations?: Conversation[] };
        if (!cancelled) {
          setConversations(data.conversations ?? []);
          setLoaded(true);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load your messages.");
      }
    }
    void load();
    const timer = setInterval(load, 15000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [accessToken]);

  const dms = conversations.filter((c) => c.kind === "ORG_ENQUIRY");
  const groups = conversations.filter((c) => c.kind === "DEPARTURE_GROUP");

  function section(title: string, items: Conversation[], empty: string) {
    return (
      <div className="mb-5">
        <h2 className="mb-2 font-urbanist text-xs font-bold uppercase tracking-wider text-[#8E8E8E]">
          {title} ({items.length})
        </h2>
        {items.length === 0 ? <p className="font-urbanist text-sm text-[#8E8E8E]">{empty}</p> : null}
        <ul className="flex flex-col gap-2">
          {items.map((c) => (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setActive(c)}
                className={`w-full rounded-[14px] border px-4 py-3 text-left font-urbanist ${
                  active?.id === c.id ? "border-[#101010] bg-white" : "border-[#E5E5E5] bg-white hover:border-[#B5B5B5]"
                }`}
              >
                <p className="truncate text-sm font-semibold text-[#101010]">{c.title || (c.kind === "DEPARTURE_GROUP" ? "Trip group" : "Organizer chat")}</p>
                {c.last_message ? <p className="mt-0.5 truncate text-xs text-[#666]">{c.last_message}</p> : null}
                {c.status !== "ACTIVE" ? <p className="mt-0.5 text-[11px] text-[#8E8E8E]">Ended · read only</p> : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <main className="mx-auto min-h-[100svh] max-w-5xl px-4 py-8 text-[#101010]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-urbanist text-2xl font-bold">Messages</h1>
        <Link href="/" className="font-urbanist text-sm text-[#666] underline">
          Back to explore
        </Link>
      </div>
      {error ? <p className="mb-4 font-urbanist text-sm text-[#9B2C2C]">{error}</p> : null}
      <div className="grid gap-6 md:grid-cols-[320px_1fr]">
        <div>
          {section("Direct messages", dms, loaded ? "Message an organizer from their profile page." : "Loading…")}
          {section("Trip groups", groups, loaded ? "You're added to a group automatically once a booking is confirmed." : "Loading…")}
        </div>
        <div className="flex h-[min(640px,75svh)] flex-col overflow-hidden rounded-[20px] border border-[#E5E5E5] bg-white">
          {active && accessToken ? (
            <>
              <div className="border-b border-[#E5E5E5] px-5 py-3 font-urbanist text-sm font-semibold">
                {active.title || (active.kind === "DEPARTURE_GROUP" ? "Trip group" : "Organizer chat")}
              </div>
              <ChatPanel
                key={active.id}
                conversationId={active.id}
                accessToken={accessToken}
                otherLabel="The organizer"
                kind={active.kind === "DEPARTURE_GROUP" ? "group" : "dm"}
                readOnly={active.status !== "ACTIVE"}
                className="flex-1"
              />
            </>
          ) : (
            <p className="m-auto font-urbanist text-sm text-[#8E8E8E]">Select a conversation to see its history.</p>
          )}
        </div>
      </div>
    </main>
  );
}
