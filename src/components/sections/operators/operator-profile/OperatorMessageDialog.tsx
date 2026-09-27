"use client";

import { useEffect, useState } from "react";
import ChatPanel, { ENGAGEMENT_URL } from "@/components/chat/ChatPanel";
import { authFetch } from "@/lib/apiClient";
import { CloseIcon } from "./OperatorIcons";
import type { Operator } from "./OperatorProfileSection";

export default function OperatorMessageDialog({
  operator,
  accessToken,
  onClose,
}: {
  operator: Operator;
  accessToken: string;
  onClose: () => void;
}) {
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Open (or reuse) this traveller's direct-message thread with the organizer.
  // The thread and its history live in the backend, so reopening shows everything.
  useEffect(() => {
    let cancelled = false;
    async function start() {
      try {
        const res = await authFetch(ENGAGEMENT_URL, `/organizers/${operator.id}/enquiry`, accessToken, {
          method: "POST",
          body: JSON.stringify({}),
        });
        if (!res.ok) throw new Error("Could not open a conversation. Please try again.");
        const conv = (await res.json()) as { id: string };
        if (!cancelled) setConversationId(conv.id);
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    }
    void start();
    return () => {
      cancelled = true;
    };
  }, [operator.id, accessToken]);

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Message ${operator.name}`}
    >
      <div
        className="flex h-[min(640px,88svh)] w-full max-w-lg flex-col overflow-hidden rounded-t-[24px] bg-white text-[#101010] shadow-[0_18px_60px_rgba(0,0,0,0.28)] sm:rounded-[24px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-[#E5E5E5] px-5 py-4">
          <div className="min-w-0">
            <p className="truncate font-urbanist text-base font-semibold">{operator.name}</p>
            <p className="font-urbanist text-xs text-[#8E8E8E]">Direct message · your history is saved under Messages</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[#D7D7D7] text-[#666] hover:text-[#101010]"
          >
            <CloseIcon />
          </button>
        </div>

        {conversationId ? (
          <ChatPanel conversationId={conversationId} accessToken={accessToken} otherLabel={operator.name} kind="dm" className="flex-1" />
        ) : (
          <p className="m-auto px-6 text-center font-urbanist text-sm text-[#8E8E8E]">{error || "Opening conversation…"}</p>
        )}
      </div>
    </div>
  );
}
