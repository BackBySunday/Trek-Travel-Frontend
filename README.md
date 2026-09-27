# BackBySunday Frontend

The traveller-facing web app for BackBySunday, a weekend-trek marketplace:
browsing and searching treks, an operator's public profile, trek detail
pages with a real booking flow (Cashfree checkout), a traveller's own
bookings and messages, and phone/Google sign-in.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next/font` for Urbanist, IBM Plex Sans, and Inter
- `next/image` (configured to also load images from a Cloudflare R2 bucket)

## Backend dependency

This app is the frontend for the BackBySunday backend — see
[backend-infra](https://github.com/BackBySunday/backend-infra) for how to
run the whole backend stack. In short, it talks directly to six backend
services over HTTP (each has its own repo, listed there): identity, catalog,
inventory, organizer, booking, engagement, and payments. Nothing here talks
to a database directly.

## Getting started

```bash
npm install
cp .env.example .env.local   # see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The backend stack
(see backend-infra) needs to already be running for any page beyond static
content to load real data.

### Environment variables (`.env.local`)

| Variable | Required? | What it's for |
|---|---|---|
| `NEXT_PUBLIC_AUTH_API_BASE_URL` | Yes | identity-svc — phone/Google OTP sign-in. Defaults to `http://localhost:8087`. |
| `NEXT_PUBLIC_CATALOG_API_BASE_URL` | Yes | catalog-svc — trek listings, search filters, pickup points. Defaults to `http://localhost:8089`. |
| `NEXT_PUBLIC_INVENTORY_API_BASE_URL` | Yes | inventory-svc — departures, availability, add-on pricing. Defaults to `http://localhost:8090`. |
| `NEXT_PUBLIC_ORGANIZER_API_BASE_URL` | Yes | organizer-svc — operator profiles, stats, media. Defaults to `http://localhost:8088`. |
| `NEXT_PUBLIC_BOOKING_API_BASE_URL` | Yes | booking-svc — creating and listing bookings. Defaults to `http://localhost:8091`. |
| `NEXT_PUBLIC_ENGAGEMENT_API_BASE_URL` | Yes | engagement-svc — reviews, follows, DM/group chat. Defaults to `http://localhost:8092`. |
| `NEXT_PUBLIC_PAYMENTS_API_BASE_URL` | Yes | payments-svc — gateway mode, Cashfree checkout session, payment sync. Defaults to `http://localhost:8093`. |
| `NEXT_PUBLIC_GOOGLE_CLIENT_ID` | Yes, for Google sign-in | Must match identity-svc's own `GOOGLE_CLIENT_ID` (see backend-infra's `docker-compose.yml`) — Google verifies the ID token's `aud` claim against this same client, so a mismatch silently breaks Google sign-in. |
| `NEXT_PUBLIC_MEDIA_BASE_URL` | No | Public base URL of the R2 bucket organizer/trip photos are served from (e.g. `https://pub-xxxx.r2.dev`). Without it, uploaded photos have no URL to render. |
| `NEXT_PUBLIC_SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Only for the waitlist form | Used by `src/app/api/waitlist/route.ts` to store waitlist sign-ups in Supabase. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | No | Google Analytics. |

All the `*_API_BASE_URL` values default to `localhost` + the port
backend-infra's `docker-compose.yml` exposes that service on, so a local
`.env.local` with just the Google/Supabase/GA values (or even none at all)
is enough for local dev against the default stack.

### Payments in local dev

Book Now creates a real booking against booking-svc, then either:

- opens Cashfree's real checkout popup (when payments-svc is running in
  `PAYMENT_GATEWAY_MODE=live`, using a genuine `payment_session_id`), or
- falls back to an internal sandbox-payment simulation (when payments-svc is
  in the default `mock` mode).

Either way, confirmation goes through payments-svc's `POST
/orders/:id/sync`, which pulls the real payment status from Cashfree
directly — no public webhook URL needed for local dev.

## Key pages

| Route | What it is |
|---|---|
| `/` | Home — hero search, featured destinations, partners |
| `/search` | Trek search with live catalog filters |
| `/trek-details/[slug]` | A trek's detail page: itinerary, pickups, reviews, and the booking card |
| `/operators/[slug]` | An operator's public profile: treks, gallery, videos, reviews, message button |
| `/auth` | Phone OTP and Google sign-in / sign-up |
| `/bookings` | The signed-in traveller's booking + payment history |
| `/messages` | The signed-in traveller's DMs with operators and trip group chats |

## Project structure

```txt
src/
├── app/                    # routes (Next.js App Router)
│   ├── auth/
│   ├── bookings/
│   ├── messages/
│   ├── operators/[slug]/
│   ├── search/
│   └── trek-details/[slug]/
├── components/
│   ├── chat/                # shared chat panel (DM + group threads)
│   ├── layout/               # Navbar, Footer, TrekCard
│   ├── providers/
│   └── sections/
│       ├── home/
│       ├── operators/operator-profile/
│       └── trek-details/
└── lib/                     # data-fetching + API clients per backend service
    ├── AuthContext.tsx       # session state, token refresh
    ├── apiClient.ts          # authenticated fetch helper
    ├── booking.ts            # booking-svc + payments-svc client, Cashfree checkout
    ├── operator.ts / operators.ts
    ├── trek.ts / trekCards.ts
    └── search.ts
```

## Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run a production build
npm run lint    # eslint
```
