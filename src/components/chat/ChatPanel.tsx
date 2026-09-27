"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { authFetch } from "@/lib/apiClient";

export const ENGAGEMENT_URL = process.env.NEXT_PUBLIC_ENGAGEMENT_API_BASE_URL ?? "http://localhost:8092";

type Message = {
  id: number;
  sender_user_id?: string;
  kind: string;
  body?: string;
  created_at: string;
};

export function tokenSubject(accessToken: string): string | null {
  try {
    const payload = accessToken.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return (JSON.parse(atob(payload)) as { sub?: string }).sub ?? null;
  } catch {
    return null;
  }
}

/**
 * One conversation: history, live refresh, and sending.
 *  - "dm": a direct message thread with an organizer; a traveller can send at
 *    most `message_limit` messages before the organizer replies.
 *  - "group": the trip group everyone who booked a departure is added to.
 */
export default function ChatPanel({
  conversationId,
  accessToken,
  otherLabel,
  kind,
  readOnly = false,
  className = "",
}: {
  conversationId: string;
  accessToken: string;
  otherLabel: string;
  kind: "dm" | "group";
  readOnly?: boolean;
  className?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [limit, setLimit] = useState<number | null>(null);
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const me = tokenSubject(accessToken);

  const load = useCallback(async () => {
    const res = await authFetch(ENGAGEMENT_URL, `/conversations/${conversationId}/messages?limit=200`, accessToken);
    if (!res.ok) throw new Error("Could not load messages.");
    const data = (await res.json()) as { messages?: Message[]; remaining_messages?: number; message_limit?: number };
    setMessages([...(data.messages ?? [])].sort((a, b) => a.id - b.id));
    setRemaining(typeof data.remaining_messages === "number" ? data.remaining_messages : null);
    setLimit(typeof data.message_limit === "number" ? data.message_limit : null);
  }, [conversationId, accessToken]);

  useEffect(() => {
    let cancelled = false;
    async function first() {
      try {
        await load();
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Could not load messages.");
      }
    }
    void first();
    const timer = setInterval(() => {
      load().catch(() => {});
    }, 5000);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, [load]);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages.length, conversationId]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || sending) return;
    setSending(true);
    setError("");
    try {
      const res = await authFetch(ENGAGEMENT_URL, `/conversations/${conversationId}/messages`, accessToken, {
        method: "POST",
        body: JSON.stringify({ kind: "TEXT", body: text }),
      });
      if (res.status === 429) {
        setError(`You've sent ${limit ?? 3} messages. ${otherLabel} needs to reply before you can send more.`);
        await load();
        return;
      }
      if (res.status === 412) {
        setError("This chat has ended, so no new messages can be sent.");
        return;
      }
      if (!res.ok) throw new Error("Message not sent. Please try again.");
      setDraft("");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Message not sent.");
    } finally {
      setSending(false);
    }
  }

  const blocked = kind === "dm" && remaining === 0;
  const disabled = readOnly || blocked;

  return (
    <div className={`flex min-h-0 flex-col ${className}`}>
      <div ref={listRef} className="flex flex-1 flex-col gap-2.5 overflow-y-auto bg-[#F6F7F7] px-4 py-4">
        {messages.length === 0 && !error ? (
          <p className="m-auto max-w-[260px] text-center font-urbanist text-sm text-[#8E8E8E]">
            {kind === "group" ? "No messages yet. Say hello to your trip group." : "No messages yet. Say hello to start the conversation."}
          </p>
        ) : null}
        {messages.map((message) => {
          if (message.kind === "SYSTEM" || message.kind === "ANNOUNCEMENT") {
            return (
              <p key={message.id} className="mx-auto max-w-[85%] rounded-full bg-[#E9ECEF] px-3 py-1 text-center font-urbanist text-xs text-[#666]">
                {message.kind === "ANNOUNCEMENT" ? "Announcement: " : ""}
                {message.body}
              </p>
            );
          }
          const mine = Boolean(me) && message.sender_user_id === me;
          return (
            <div key={message.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-[18px] px-3.5 py-2 font-urbanist text-sm leading-snug ${
                  mine ? "bg-[#1A1A17] text-white" : "border border-[#E5E5E5] bg-white text-[#101010]"
                }`}
              >
                <p className="whitespace-pre-wrap break-words">{message.body}</p>
                <p className={`mt-1 text-[10px] ${mine ? "text-white/60" : "text-[#8E8E8E]"}`}>
                  {mine ? "You" : kind === "group" ? "Trip member" : otherLabel} ·{" "}
                  {new Date(message.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {kind === "dm" && remaining !== null && limit !== null ? (
        <p className={`px-4 pt-2 font-urbanist text-xs ${blocked ? "text-[#9B2C2C]" : "text-[#8E8E8E]"}`}>
          {blocked
            ? `You've used all ${limit} messages. ${otherLabel} needs to reply before you can send more.`
            : `${remaining} of ${limit} messages left until ${otherLabel} replies.`}
        </p>
      ) : null}
      {readOnly ? <p className="px-4 pt-2 font-urbanist text-xs text-[#8E8E8E]">This chat has ended and is now read-only.</p> : null}
      {error ? <p className="px-4 pt-2 font-urbanist text-sm text-[#9B2C2C]">{error}</p> : null}
      <form onSubmit={send} className="flex items-center gap-2 border-t border-[#E5E5E5] p-3">
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder={disabled ? "Messaging unavailable right now" : "Type your message"}
          disabled={disabled}
          maxLength={2000}
          className="h-11 min-w-0 flex-1 rounded-full border border-[#D7D7D7] bg-white px-4 font-urbanist text-sm outline-none focus:border-[#101010] disabled:bg-[#F6F7F7]"
        />
        <button
          type="submit"
          disabled={!draft.trim() || disabled || sending}
          className="h-11 shrink-0 rounded-full bg-[rgba(20,20,20,0.84)] px-5 font-urbanist text-sm font-semibold text-white disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </div>
  );
}
