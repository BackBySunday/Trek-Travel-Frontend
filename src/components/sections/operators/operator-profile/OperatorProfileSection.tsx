"use client";

import { useState } from "react";
import type { TrekCardProps } from "@/components/layout/TrekCard";
import MoreTreksSection from "./MoreTreksSection";
import OperatorHeader from "./OperatorHeader";
import OperatorTabPanel from "./OperatorTabPanel";
import OperatorTabs, { type OperatorTab } from "./OperatorTabs";

export type Operator = {
  id: string;
  name: string;
  homeBase: string;
  since: number;
  rating: number;
  reviewCount: number;
  followerCount: number;
  treksLed: number;
  travellersServed: number;
  upcomingDepartures: number;
  yearsOnPlatform: number;
  safetyBand: string;
  responseRate: number | null;
  social: { platform: string; url: string }[];
  faqs: { question: string; answer: string }[];
  policies: string[];
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
  verified: boolean;
};

export type OperatorVideo = {
  id: string;
  title: string;
  thumb: string;
  duration: string;
  views: string;
  posted: string;
  youtubeId: string;
  /** Direct video file (organizer upload); when set the player uses it instead of YouTube. */
  src?: string;
};

const operatorTabs: OperatorTab[] = [
  "Treks",
  "Videos",
  "Gallery",
  "About",
  "Reviews",
];

export type OperatorPageProps = {
  operator: Operator;
  treks: OperatorTrek[];
  moreTreks: OperatorTrek[];
  videos: OperatorVideo[];
  galleryImages: string[];
  reviews: OperatorReview[];
};

export default function OperatorProfileSection({
  operator,
  treks,
  moreTreks,
  videos,
  galleryImages,
  reviews,
}: OperatorPageProps) {
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
        {moreTreks.length > 0 ? <MoreTreksSection treks={moreTreks} /> : null}
      </section>
    </>
  );
}
