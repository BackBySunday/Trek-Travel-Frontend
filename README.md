# BackBySunday Frontend

Responsive web application frontend for BackBySunday, a trekking and travel experience platform. The app is built as a polished landing page with reusable layout components, section-based page composition, local visual assets, and responsive Tailwind styling.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next/font` for Urbanist, IBM Plex Sans, and Inter
- `next/image` for optimized local images

## Current Page Sections

- Hero with glass navigation, headline, search bar, and rotating trek cards
- Top Categories
- Our Partners
- Featured Destinations
- Why Trek With Us
- Snapshots
- Our Testimonials
- CTA section
- Reusable site footer

## Project Structure

```txt
public/
|-- Animation/
|-- Banner/
|-- CTA/
|-- Featured-Destination/
|-- Footer/
|-- Hero/
|-- Our-Partners/
|-- Top-Categories/
`-- Why-Trek-With-Us/

src/
|-- app/
|   |-- api/
|   |-- cancellation-and-refund-policy/
|   |-- globals.css
|   |-- layout.tsx
|   |-- privacy-policy/
|   |-- terms-and-conditions/
|   `-- page.tsx
`-- components/
    |-- layout/
    |   |-- coming-soon/
    |   |-- ComingSoonProvider.tsx
    |   |-- Footer.tsx
    |   |-- Navbar.tsx
    |   |-- SectionBadge.tsx
    |   |-- SectionIntro.tsx
    |   `-- TrekCard.tsx
    `-- sections/
        |-- cta/
        |-- featured-destinations/
        |-- hero/
        |-- our-partners/
        |-- our-testimonials/
        |-- snapshots/
        |-- top-categories/
        `-- why-trek-with-us/
```

## Key Files

- `src/app/page.tsx`: Composes the full landing page.
- `src/app/layout.tsx`: Metadata, viewport settings, and font loading.
- `src/app/api/waitlist/route.ts`: Waitlist API route backed by Supabase REST.
- `src/app/globals.css`: Tailwind import, theme variables, glass effects, animation utilities, and base styles.
- `src/components/layout/ComingSoonProvider.tsx`: Shared modal provider for coming soon and waitlist flows.
- `src/components/layout/Navbar.tsx`: Responsive navigation and mobile menu.
- `src/components/layout/Footer.tsx`: Reusable footer with a logo placeholder, quick links, contact info, newsletter form, mountain image, and copyright.
- `src/components/layout/TrekCard.tsx`: Reusable trek package card.
- `src/components/layout/SectionBadge.tsx` and `SectionIntro.tsx`: Shared section UI primitives.
- `src/components/sections/*`: Page-specific sections and their local subcomponents.

## Requirements

- Node.js compatible with Next.js 16
- npm

## Setup

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app at:

```txt
http://localhost:3000
```

Create `.env` from `.env.example` and set the required Supabase values before testing the waitlist API.

## Available Scripts

```bash
npm run dev
```

Runs the local development server.

```bash
npm run build
```

Creates an optimized production build.

```bash
npm run start
```

Starts the production server after building.

```bash
npm run lint
```

Runs ESLint.

## Quality Checks

Run these before committing or pushing changes:

```bash
npm run lint
npm run build
```

## Vercel Deployment

Use the default Vercel settings for a Next.js app.

Required environment variables:

```txt
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. Do not expose it with a `NEXT_PUBLIC_` prefix.

## Assets

All application assets live in `public/` and are referenced by route-relative paths such as `/Hero/hero-background.png`.

Current asset groups:

- `public/Animation/`: Coming soon video and waitlist role icons.
- `public/Banner/`: Social preview image.
- `public/Hero/`: Hero background and carousel cards.
- `public/Top-Categories/`: Trek category card imagery.
- `public/Our-Partners/`: Partner logo/card imagery.
- `public/Featured-Destination/`: Featured destination cards.
- `public/Why-Trek-With-Us/`: Why Trek section image.
- `public/CTA/`: CTA background image.
- `public/Footer/`: Footer mountain strip image.

Only keep assets that are used by the application.

## Development Guidelines

- Treat pasted Figma-to-React code as reference, then adapt it for real responsive layouts.
- Keep reusable site chrome and shared UI in `src/components/layout`.
- Keep section-specific components in `src/components/sections/<section-name>`.
- Avoid raw Figma absolute positioning, `min-w-screen`, `min-h-screen`, and large fixed offsets.
- Prefer responsive grids/flex layouts, `max-w-*`, breakpoint classes, and practical typography scales.
- Use `next/image` for local images rendered in components.
- Keep global CSS limited to theme variables, base styles, shared effects, and reusable animation utilities.
- Remove unused generated files, starter assets, and temporary helper components before pushing.

## Build Notes

This project uses `next/font/google`. Production builds require access to Google Fonts unless the fonts are already cached by the build environment.
