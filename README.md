# Trek & Travel Frontend

A responsive frontend for a trek and travel landing page. The current implementation includes a hero section, glass-style navigation, search bar, rotating trek carousel, and a simple follow-up white section.

## Tech Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS 4
- `next/font` for Urbanist
- `next/image` for optimized local images

## Project Structure

```txt
public/
|-- Hero/
|   |-- card-1.png
|   |-- card-2.png
|   |-- card-3.png
|   `-- hero-background.png
`-- Top-Categories/
    `-- Trek-Card.png
src/
|-- app/
|   |-- favicon.ico
|   |-- globals.css
|   |-- layout.tsx
|   `-- page.tsx
`-- components/
    |-- layout/
    |   |-- Navbar.tsx
    |   |-- SectionBadge.tsx
    |   `-- TrekCard.tsx
    `-- sections/
        |-- hero/
        `-- top-categories/
```

## Main Files

- `src/app/page.tsx`: Composes the landing page sections.
- `src/app/layout.tsx`: Defines metadata, viewport settings, and font loading.
- `src/app/globals.css`: Global Tailwind import, theme variables, glass styles, and base styles.
- `src/components/layout/Navbar.tsx`: Responsive navigation and mobile menu.
- `src/components/layout/SectionBadge.tsx`: Reusable section badge.
- `src/components/layout/TrekCard.tsx`: Reusable trek/trip card.
- `src/components/sections/hero/`: Hero section components.
- `src/components/sections/top-categories/`: Top Categories section components.

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
npx tsc --noEmit
npm run build
```

## Assets

All public assets are stored in `public/`.

Current assets:

- `public/Hero/hero-background.png`: Hero section background.
- `public/Hero/card-1.png`, `public/Hero/card-2.png`, `public/Hero/card-3.png`: Hero carousel cards.
- `public/Top-Categories/Trek-Card.png`: Top Categories card image.

Only add assets that are used by the application.

## Development Guidelines

- Keep UI blocks as focused components under `src/components/`.
- Keep responsive behavior explicit across mobile, tablet, laptop, and large screens.
- Prefer `next/image` for local images used in components.
- Keep global styles limited to shared theme, base styles, and reusable visual utilities.
- Do not keep unused starter assets or generated files in the repository.

## Build Notes

This project uses `next/font/google` to load Urbanist. Production builds require access to Google Fonts unless the font is already cached by the build environment.
