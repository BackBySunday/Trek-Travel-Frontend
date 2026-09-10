import { NextResponse, type NextRequest } from "next/server";

type WaitlistPayload = {
  role?: "traveler" | "organiser";
  destination?: string | null;
  name?: string;
  email?: string;
  phone?: string;
  interest?: string;
  otherInterest?: string;
  company?: string;
  registered?: string;
  operates?: string;
  tripsMonthly?: string;
  website?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 8;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();
const travelerInterests = new Set(["treks", "trips", "adventure", "others"]);
const registrationStatuses = new Set(["yes", "no", "in-progress"]);
const tripsMonthlyOptions = new Set(["1-5", "6-15", "16+", "seasonal"]);

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function limit(value: string, maxLength: number) {
  return value.slice(0, maxLength);
}

function getClientId(request: NextRequest, email: string) {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = request.headers.get("x-real-ip")?.trim();
  return `${forwardedFor || realIp || "unknown"}:${email || "no-email"}`;
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json({ error: "Waitlist storage is not configured." }, { status: 500 });
  }

  const payload = (await request.json().catch(() => null)) as WaitlistPayload | null;

  if (!payload) {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const role = payload.role;
  const email = clean(payload.email).toLowerCase();

  if (role !== "traveler" && role !== "organiser") {
    return NextResponse.json({ error: "Choose traveler or organiser." }, { status: 400 });
  }

  if (!email) {
    return NextResponse.json({ error: "Email address is required." }, { status: 400 });
  }

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  if (isRateLimited(getClientId(request, email))) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  const interest = clean(payload.interest);
  const registered = clean(payload.registered);
  const tripsMonthly = clean(payload.tripsMonthly);

  if (role === "traveler" && (!clean(payload.name) || !interest || !travelerInterests.has(interest))) {
    return NextResponse.json({ error: "Name and interest are required." }, { status: 400 });
  }

  if (
    role === "organiser" &&
    (!clean(payload.company) ||
      !registered ||
      !registrationStatuses.has(registered) ||
      !clean(payload.operates) ||
      !tripsMonthly ||
      !tripsMonthlyOptions.has(tripsMonthly))
  ) {
    return NextResponse.json({ error: "Please complete the required organiser details." }, { status: 400 });
  }

  const row = {
    role,
    destination: limit(clean(payload.destination), 120) || null,
    name: limit(clean(payload.name), 120),
    email,
    phone: limit(clean(payload.phone), 40),
    interest: limit(interest, 40),
    other_interest: limit(clean(payload.otherInterest), 180),
    company: limit(clean(payload.company), 160),
    registered_status: limit(registered, 40),
    operates_in: limit(clean(payload.operates), 180),
    trips_monthly: limit(tripsMonthly, 40),
    website: limit(clean(payload.website), 220),
  };
  const supabaseRestUrl = supabaseUrl.replace(/\/rest\/v1\/?$/, "").replace(/\/$/, "");
  const existingResponse = await fetch(
    `${supabaseRestUrl}/rest/v1/waitlist_entries?email=eq.${encodeURIComponent(email)}&select=id&limit=1`,
    {
      method: "GET",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
      },
    },
  );

  if (!existingResponse.ok) {
    return NextResponse.json({ error: "Could not check the waitlist. Please try again." }, { status: 500 });
  }

  const existingEntries = (await existingResponse.json()) as Array<{ id: string }>;

  if (existingEntries.length > 0) {
    return NextResponse.json({ ok: true, alreadyJoined: true });
  }

  const response = await fetch(`${supabaseRestUrl}/rest/v1/waitlist_entries`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const error = (await response.json().catch(() => null)) as { code?: string } | null;

    if (response.status === 409 || error?.code === "23505") {
      return NextResponse.json({ ok: true, alreadyJoined: true });
    }

    return NextResponse.json({ error: "Could not join the waitlist. Please try again." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
