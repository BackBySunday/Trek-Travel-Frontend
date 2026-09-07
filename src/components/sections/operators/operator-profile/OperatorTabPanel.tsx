"use client";

import AboutPanel from "./panels/AboutPanel";
import GalleryPanel from "./panels/GalleryPanel";
import type {
  Operator,
  OperatorReview,
  OperatorTrek,
  OperatorVideo,
} from "./OperatorProfileSection";
import type { OperatorTab } from "./OperatorTabs";
import ReviewsPanel from "./panels/ReviewsPanel";
import TreksPanel from "./panels/TreksPanel";
import VideosPanel from "./panels/VideosPanel";

type OperatorTabPanelProps = {
  galleryImages: string[];
  operator: Operator;
  reviews: OperatorReview[];
  tab: OperatorTab;
  treks: OperatorTrek[];
  videos: OperatorVideo[];
};

export default function OperatorTabPanel({
  galleryImages,
  operator,
  reviews,
  tab,
  treks,
  videos,
}: OperatorTabPanelProps) {
  if (tab === "Videos") {
    return <VideosPanel operatorName={operator.name} videos={videos} />;
  }

  if (tab === "Gallery") {
    return <GalleryPanel galleryImages={galleryImages} operatorName={operator.name} />;
  }

  if (tab === "About") {
    return <AboutPanel operator={operator} treks={treks} />;
  }

  if (tab === "Reviews") {
    return <ReviewsPanel operator={operator} reviews={reviews} />;
  }

  return (
    <TreksPanel
      galleryImages={galleryImages}
      operator={operator}
      reviews={reviews}
      treks={treks}
    />
  );
}
