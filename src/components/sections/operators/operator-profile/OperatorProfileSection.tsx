"use client";

import { useState } from "react";
import type { TrekCardProps } from "@/components/layout/TrekCard";
import MoreTreksSection from "./MoreTreksSection";
import OperatorHeader from "./OperatorHeader";
import OperatorTabPanel from "./OperatorTabPanel";
import OperatorTabs, { type OperatorTab } from "./OperatorTabs";

export type Operator = {
  name: string;
  homeBase: string;
  since: number;
  rating: number;
  reviewCount: number;
  followerCount: number;
  treksLed: number;
  verified: boolean;
  bio: string;
  region: string;
  coverUrl: string;
  markUrl: string;
};

export type OperatorTrek = TrekCardProps & {
  id: string;
  slug: string;
  region: string;
  coverUrl: string;
  durationLabel: string;
  priceFrom: string;
  upcomingDates: string[];
};

export type OperatorReview = {
  name: string;
  stars: number;
  daysAgo: number;
  text: string;
  trek: string;
};

export type OperatorVideo = {
  id: string;
  title: string;
  thumb: string;
  duration: string;
  views: string;
  posted: string;
  youtubeId: string;
};

const operatorTabs: OperatorTab[] = [
  "Treks",
  "Videos",
  "Gallery",
  "About",
  "Reviews",
];

const operator: Operator = {
  name: "JKL Trek & Travel",
  homeBase: "Pune, Maharashtra",
  since: 2016,
  rating: 4.8,
  reviewCount: 1284,
  followerCount: 18600,
  treksLed: 620,
  verified: true,
  bio:
    "Local mountain operators running small-batch Sahyadri and Himalayan treks with trained leads, clean logistics, and clear pre-departure communication.",
  region: "Sahyadris",
  coverUrl: "/Hero/sahyadri-fort-sunrise.png",
  markUrl: "/Hero/card-1.png",
};

const treks: OperatorTrek[] = [
  {
    id: "vasota",
    slug: "vasota-fort-trek",
    title: "Vasota Fort Trek",
    description:
      "Forest trails, boat crossings, and wide backwater views around the Sahyadri range.",
    image: "/Hero/sahyadri-fort-sunrise.png",
    coverUrl: "/Hero/sahyadri-fort-sunrise.png",
    alt: "Trekkers climbing rocks near a lake",
    durationTag: "1N/2D",
    durationLabel: "1N/2D",
    rating: "4.7",
    ratingCount: "128",
    altitude: "3,842 ft",
    difficulty: "Moderate",
    duration: "5 Hours",
    spots: "18 left",
    nextDeparture: "Sun, 4 Oct",
    region: "Satara",
    operator: operator.name,
    price: "Rs 1,900",
    priceFrom: "Rs 1,900",
    upcomingDates: ["2026-10-04", "2026-10-18", "2026-11-01"],
  },
  {
    id: "rajmachi",
    slug: "rajmachi-night-trek",
    title: "Rajmachi Night Trek",
    description:
      "Village roads, forest patches, and fort-top sunrise views on a classic overnight trail.",
    image: "/Featured-Destination/featured-pune-upper.png",
    coverUrl: "/Featured-Destination/featured-pune-upper.png",
    alt: "Mountain trail near Pune",
    durationTag: "1N/1D",
    durationLabel: "1N/1D",
    rating: "4.6",
    ratingCount: "104",
    altitude: "2,710 ft",
    difficulty: "Easy",
    duration: "4 Hours",
    spots: "11 left",
    nextDeparture: "Sun, 27 Sep",
    region: "Lonavala",
    operator: operator.name,
    price: "Rs 1,650",
    priceFrom: "Rs 1,650",
    upcomingDates: ["2026-09-27", "2026-10-11", "2026-11-08"],
  },
  {
    id: "harishchandragad",
    slug: "harishchandragad-trek",
    title: "Harishchandragad Trek",
    description:
      "A demanding fort route with temple ruins, cliff views, and a well-managed campsite.",
    image: "/Featured-Destination/featured-himachal-pradesh-upper.png",
    coverUrl: "/Featured-Destination/featured-himachal-pradesh-upper.png",
    alt: "High mountain trail at sunrise",
    durationTag: "2D/1N",
    durationLabel: "2D/1N",
    rating: "4.9",
    ratingCount: "162",
    altitude: "4,671 ft",
    difficulty: "Hard",
    duration: "7 Hours",
    spots: "6 left",
    nextDeparture: "Fri, 2 Oct",
    region: "Ahmednagar",
    operator: operator.name,
    price: "Rs 2,850",
    priceFrom: "Rs 2,850",
    upcomingDates: ["2026-10-02", "2026-10-23"],
  },
  {
    id: "devkund",
    slug: "devkund-waterfall-trail",
    title: "Devkund Waterfall Trail",
    description:
      "A refreshing day trail ending at a blue plunge pool hidden inside dense forest.",
    image: "/Featured-Destination/featured-uttarakhand-lower.png",
    coverUrl: "/Featured-Destination/featured-uttarakhand-lower.png",
    alt: "Forest trek destination preview",
    durationTag: "1D",
    durationLabel: "1D",
    rating: "4.5",
    ratingCount: "87",
    altitude: "2,700 ft",
    difficulty: "Easy",
    duration: "4 Hours",
    spots: "20 left",
    nextDeparture: "Sun, 20 Sep",
    region: "Raigad",
    operator: operator.name,
    price: "Rs 1,550",
    priceFrom: "Rs 1,550",
    upcomingDates: ["2026-09-20", "2026-10-05", "2026-11-15"],
  },
];

const moreTreks: OperatorTrek[] = [
  {
    id: "kalsubai",
    slug: "kalsubai-peak-trek",
    title: "Kalsubai Peak Trek",
    description:
      "Climb Maharashtra's highest summit with open ridge views, ladders, and a sunrise finish.",
    image: "/Featured-Destination/featured-pune-lower.png",
    coverUrl: "/Featured-Destination/featured-pune-lower.png",
    alt: "Mountain trek route at sunrise",
    durationTag: "1N/1D",
    durationLabel: "1N/1D",
    rating: "4.7",
    ratingCount: "139",
    altitude: "5,400 ft",
    difficulty: "Moderate",
    duration: "6 Hours",
    spots: "14 left",
    nextDeparture: "Sat, 10 Oct",
    region: "Ahmednagar",
    operator: "Back by Sunday",
    price: "Rs 1,750",
    priceFrom: "Rs 1,750",
    upcomingDates: ["2026-10-10", "2026-10-24"],
  },
  {
    id: "andharban",
    slug: "andharban-forest-trek",
    title: "Andharban Forest Trek",
    description:
      "Descend through dense forest, misty valleys, and monsoon-fed stream crossings.",
    image: "/Featured-Destination/featured-uttarakhand-secondary.png",
    coverUrl: "/Featured-Destination/featured-uttarakhand-secondary.png",
    alt: "Dense forest trail destination",
    durationTag: "1D",
    durationLabel: "1D",
    rating: "4.6",
    ratingCount: "103",
    altitude: "2,160 ft",
    difficulty: "Moderate",
    duration: "5 Hours",
    spots: "8 left",
    nextDeparture: "Sat, 26 Sep",
    region: "Tamhini",
    operator: "Back by Sunday",
    price: "Rs 1,800",
    priceFrom: "Rs 1,800",
    upcomingDates: ["2026-09-26", "2026-10-17"],
  },
  {
    id: "sandhan",
    slug: "sandhan-valley-trek",
    title: "Sandhan Valley Trek",
    description:
      "A canyon-style route with rock patches, narrow passages, and overnight camping.",
    image: "/Featured-Destination/featured-himachal-pradesh-upper.png",
    coverUrl: "/Featured-Destination/featured-himachal-pradesh-upper.png",
    alt: "Rocky mountain valley route",
    durationTag: "2D/1N",
    durationLabel: "2D/1N",
    rating: "4.8",
    ratingCount: "121",
    altitude: "4,255 ft",
    difficulty: "Hard",
    duration: "8 Hours",
    spots: "5 left",
    nextDeparture: "Sat, 7 Nov",
    region: "Bhandardara",
    operator: "Back by Sunday",
    price: "Rs 3,200",
    priceFrom: "Rs 3,200",
    upcomingDates: ["2026-11-07", "2026-11-21"],
  },
  {
    id: "lohagad",
    slug: "lohagad-fort-trek",
    title: "Lohagad Fort Trek",
    description:
      "A beginner-friendly fort trail with stone steps, green valleys, and easy access from Pune.",
    image: "/Hero/sahyadri-fort-sunrise.png",
    coverUrl: "/Hero/sahyadri-fort-sunrise.png",
    alt: "Trekkers climbing near a lake",
    durationTag: "1D",
    durationLabel: "1D",
    rating: "4.5",
    ratingCount: "96",
    altitude: "3,389 ft",
    difficulty: "Easy",
    duration: "3 Hours",
    spots: "12 left",
    nextDeparture: "Sat, 19 Sep",
    region: "Lonavala",
    operator: "Back by Sunday",
    price: "Rs 1,250",
    priceFrom: "Rs 1,250",
    upcomingDates: ["2026-09-19", "2026-10-03"],
  },
];

const videos: OperatorVideo[] = [
  {
    id: "monsoon-packing",
    title: "Monsoon packing checklist",
    thumb: "/Featured-Destination/featured-pune-tall.png",
    duration: "8:42",
    views: "24k",
    posted: "2 weeks ago",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "vasota-route",
    title: "Vasota route preview",
    thumb: "/Featured-Destination/featured-pune-lower.png",
    duration: "12:08",
    views: "18k",
    posted: "1 month ago",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "campsite-walkthrough",
    title: "Campsite walkthrough",
    thumb: "/Featured-Destination/featured-uttarakhand-secondary.png",
    duration: "6:31",
    views: "9.8k",
    posted: "1 month ago",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "ridge-safety",
    title: "How we manage ridge safety",
    thumb: "/Featured-Destination/featured-himachal-pradesh-upper.png",
    duration: "5:19",
    views: "7.4k",
    posted: "2 months ago",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "food-on-trail",
    title: "What meals look like on trail",
    thumb: "/Hero/sahyadri-fort-sunrise.png",
    duration: "4:56",
    views: "11k",
    posted: "2 months ago",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: "first-time-trekkers",
    title: "First-time trekker briefing",
    thumb: "/CTA/Card-1.png",
    duration: "9:15",
    views: "15k",
    posted: "3 months ago",
    youtubeId: "dQw4w9WgXcQ",
  },
];

const galleryImages = [
  "/Featured-Destination/featured-pune-tall.png",
  "/Featured-Destination/featured-pune-lower.png",
  "/Featured-Destination/featured-uttarakhand-secondary.png",
  "/Featured-Destination/featured-himachal-pradesh-upper.png",
  "/Hero/sahyadri-fort-sunrise.png",
  "/CTA/Card-1.png",
];

const reviews: OperatorReview[] = [
  {
    name: "Ananya R.",
    stars: 5,
    daysAgo: 9,
    text:
      "Impeccably organised. The trek lead knew every turn and kept the pace honest without ever rushing us.",
    trek: "Vasota Fort Trek",
  },
  {
    name: "Rohan M.",
    stars: 5,
    daysAgo: 24,
    text:
      "Went solo, left with a group of friends. Food at the campsite was genuinely excellent.",
    trek: "Rajmachi Night Trek",
  },
  {
    name: "Priya K.",
    stars: 4,
    daysAgo: 41,
    text:
      "Beautiful route and safe handling of a tricky descent. Would have liked one more water break.",
    trek: "Harishchandragad Trek",
  },
  {
    name: "Karthik V.",
    stars: 5,
    daysAgo: 63,
    text:
      "Third trek with them. Consistent, careful, and they clearly love these mountains.",
    trek: "Devkund Waterfall Trail",
  },
];

export default function OperatorProfileSection() {
  const [tab, setTab] = useState<OperatorTab>("Treks");
  const counts: Partial<Record<OperatorTab, number>> = {
    Treks: treks.length,
    Videos: videos.length,
    Gallery: galleryImages.length,
    Reviews: operator.reviewCount,
  };

  return (
    <>
      <OperatorHeader operator={operator} />
      <OperatorTabs
        activeTab={tab}
        counts={counts}
        tabs={operatorTabs}
        onTabChange={setTab}
      />
      <section className="mx-auto max-w-[1500px] px-[30px] py-10 text-[#101010] sm:py-12">
        <OperatorTabPanel
          galleryImages={galleryImages}
          operator={operator}
          reviews={reviews}
          tab={tab}
          treks={treks}
          videos={videos}
        />
        <MoreTreksSection treks={moreTreks} />
      </section>
    </>
  );
}
