// Client-side booking + sandbox-payment flow for the "Book Now" card.
// booking-svc's POST /bookings does the saga's first two steps itself (hold
// seats, create a gateway order) — see bookingservice/internal/api/
// booking_handlers.go. What's left for the browser to drive is: create the
// booking, settle the payment, then wait for booking.confirmed to land.

export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_API_BASE_URL ?? "http://localhost:8091";
export const PAYMENTS_URL = process.env.NEXT_PUBLIC_PAYMENTS_API_BASE_URL ?? "http://localhost:8093";

export class BookingApiError extends Error {
  code: string;
  constructor(code: string, message: string) {
    super(message);
    this.code = code;
  }
}

async function readError(res: Response): Promise<never> {
  const data = (await res.json().catch(() => ({}))) as Record<string, unknown>;
  const code = typeof data.error === "string" ? data.error : "request_failed";
  const message = typeof data.message === "string" ? data.message : code;
  throw new BookingApiError(code, message);
}

// Wraps a fetch call so a raw network failure (service unreachable, blocked
// by an extension/VPN, CORS misconfigured) says which URL it was trying to
// reach instead of the browser's bare "Failed to fetch".
async function safeFetch(url: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init);
  } catch {
    throw new BookingApiError("network_error", `Could not reach ${url}. Check that the service is running and reachable from this browser.`);
  }
}

export function friendlyBookingError(err: unknown): string {
  if (err instanceof BookingApiError) {
    switch (err.code) {
      case "sold_out":
        return "Those spots were just taken. Please pick another departure or reduce travellers.";
      case "cutoff_passed":
        return "Booking has closed for this departure.";
      case "coupon_invalid":
        return "That coupon isn't valid for this order.";
      case "upstream_unavailable":
        return "A service we depend on is unavailable right now. Please try again shortly.";
      case "precondition_failed":
        return "This booking can no longer be paid for.";
      case "conflict":
        return "This request was already processed.";
      case "invalid_input":
        return "Please check the traveller details and try again.";
      case "payment_simulation_failed":
        return "The sandbox payment could not be confirmed.";
      default:
        return err.message || "Something went wrong. Please try again.";
    }
  }
  return err instanceof Error ? err.message : "Something went wrong. Please try again.";
}

export type BookingTravellerRequest = {
  full_name: string;
  age: number;
  gender: "MALE" | "FEMALE" | "OTHER";
};

export type BookingAddonRequest = { addon_option_id: string; qty: number };

export type Booking = {
  id: string;
  booking_code: string;
  departure_id: string;
  trip_id: string;
  organizer_id: string;
  traveller_count: number;
  status: string;
  gateway_order_id?: string | null;
  payment_session_id?: string | null;
  payable_paise: number;
  created_at: string;
};

/**
 * "live" means payment_session_id is a real Cashfree session — open the real
 * checkout widget. "mock" means it's a fake local id (payments-svc isn't
 * talking to Cashfree at all) — nothing but simulateSandboxPayment will work
 * against it. Not cached: this is a cheap GET, and caching it across a whole
 * browser tab session bit us once already when the server's mode changed
 * mid-session without a page reload.
 */
export async function getGatewayMode(): Promise<"mock" | "live"> {
  try {
    const res = await safeFetch(`${PAYMENTS_URL}/gateway-mode`, { cache: "no-store" });
    if (!res.ok) return "mock";
    const data = (await res.json()) as { mode?: string };
    return data.mode === "live" ? "live" : "mock";
  } catch {
    return "mock";
  }
}

export async function createBooking(
  accessToken: string,
  body: {
    departure_id: string;
    traveller_count: number;
    travellers: BookingTravellerRequest[];
    pickup_point_id?: string;
    addons?: BookingAddonRequest[];
  },
): Promise<Booking> {
  const res = await safeFetch(`${BOOKING_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Lets a retried click (e.g. a flaky connection) land on the same
      // booking instead of double-booking the traveller.
      "Idempotency-Key": crypto.randomUUID(),
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) return readError(res);
  return res.json();
}

/** A booking counts as "active" if it hasn't ended in cancellation/expiry — used to tell "you already booked this" apart from "sold out to other people". */
export function isActiveBooking(b: Pick<Booking, "status">): boolean {
  return b.status === "PENDING_PAYMENT" || b.status === "CONFIRMED" || b.status === "COMPLETED";
}

export async function listOwnBookings(accessToken: string, limit = 100): Promise<Booking[]> {
  const res = await safeFetch(`${BOOKING_URL}/bookings?limit=${limit}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return readError(res);
  const data = (await res.json()) as { bookings?: Booking[] };
  return data.bookings ?? [];
}

export async function getBookingByCode(accessToken: string, code: string): Promise<Booking> {
  const res = await safeFetch(`${BOOKING_URL}/bookings/${encodeURIComponent(code)}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
    cache: "no-store",
  });
  if (!res.ok) return readError(res);
  const data = (await res.json()) as { booking: Booking };
  return data.booking;
}

/**
 * Sandbox-only stand-in for a real Cashfree checkout. payments-svc's mock
 * gateway (internal/cashfree/mock.go) accepts any webhook signature, so this
 * posts the same "payment succeeded" shape Cashfree would send, which is what
 * lets a dummy sandbox booking move from PENDING_PAYMENT to CONFIRMED and the
 * traveller get added to the trip's group chat. This never touches real money
 * and only works while payments-svc runs in mock mode.
 */
export async function simulateSandboxPayment(gatewayOrderId: string): Promise<void> {
  // Only Content-Type is sent (no x-webhook-* headers): payments-svc's CORS
  // config doesn't allow-list those from a browser, and its mock gateway
  // ignores the signature/timestamp values anyway (see
  // internal/cashfree/mock.go's VerifyWebhookSignature) — they only matter
  // once this points at a real Cashfree webhook delivery, which never comes
  // from the browser itself.
  const res = await safeFetch(`${PAYMENTS_URL}/webhooks/cashfree`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      type: "PAYMENT_SUCCESS_WEBHOOK",
      data: {
        order: { order_id: gatewayOrderId },
        payment: { cf_payment_id: `sandbox_${crypto.randomUUID()}`, payment_status: "SUCCESS", payment_group: "upi" },
      },
    }),
  });
  if (!res.ok) throw new BookingApiError("payment_simulation_failed", "Could not confirm the sandbox payment.");
}

/** Polls until the booking is CONFIRMED (or a terminal failure state), or the attempts run out. */
export async function waitForConfirmation(accessToken: string, code: string, attempts = 10, delayMs = 1200): Promise<Booking> {
  let last: Booking | null = null;
  for (let i = 0; i < attempts; i++) {
    last = await getBookingByCode(accessToken, code);
    if (last.status === "CONFIRMED" || last.status === "CANCELLED" || last.status === "EXPIRED") return last;
    await new Promise((resolve) => setTimeout(resolve, delayMs));
  }
  return last as Booking;
}

/**
 * After a real Cashfree checkout closes, this is how the booking gets
 * confirmed without needing a public webhook URL: it asks payments-svc to
 * pull the payment's real status straight from Cashfree (GET
 * /orders/{id}/payments) and apply it — the same state change a webhook
 * would have caused. The checkout widget's own client-side "success" report
 * is never trusted on its own; this server-to-server check is what actually
 * moves the booking forward.
 */
export async function syncPaymentStatus(gatewayOrderId: string): Promise<void> {
  const res = await safeFetch(`${PAYMENTS_URL}/orders/${encodeURIComponent(gatewayOrderId)}/sync`, { method: "POST" });
  if (!res.ok) throw new BookingApiError("payment_sync_failed", "Could not confirm the payment with Cashfree.");
}

type CashfreeCheckoutResult = { error?: { message?: string }; paymentDetails?: unknown; redirect?: boolean };
type CashfreeInstance = { checkout: (options: { paymentSessionId: string; redirectTarget?: string }) => Promise<CashfreeCheckoutResult> };
declare global {
  interface Window {
    Cashfree?: (config: { mode: "sandbox" | "production" }) => CashfreeInstance;
  }
}

const CASHFREE_SDK_URL = "https://sdk.cashfree.com/js/v3/cashfree.js";
let cashfreeSdkPromise: Promise<void> | null = null;

function loadCashfreeSdk(): Promise<void> {
  if (typeof window !== "undefined" && window.Cashfree) return Promise.resolve();
  if (!cashfreeSdkPromise) {
    cashfreeSdkPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = CASHFREE_SDK_URL;
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Could not load the Cashfree checkout SDK."));
      document.head.appendChild(script);
    });
  }
  return cashfreeSdkPromise;
}

/**
 * Opens Cashfree's real hosted checkout as an in-page modal for a genuine
 * sandbox payment (test cards/UPI). Only meaningful when payment_session_id
 * came from a real Cashfree order (gateway mode "live") — see getGatewayMode.
 */
export async function openCashfreeCheckout(paymentSessionId: string): Promise<void> {
  await loadCashfreeSdk();
  if (!window.Cashfree) throw new BookingApiError("checkout_unavailable", "The Cashfree checkout SDK didn't load.");
  const cashfree = window.Cashfree({ mode: "sandbox" });
  const result = await cashfree.checkout({ paymentSessionId, redirectTarget: "_modal" });
  if (result.error) {
    throw new BookingApiError("checkout_failed", result.error.message || "The payment was not completed.");
  }
}
