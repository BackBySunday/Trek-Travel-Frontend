import type { Metadata } from "next";
import OperatorsPageContent from "./OperatorsPageContent";

export const metadata: Metadata = {
  title: "Verified Trek Operators",
  description:
    "Explore verified trek operators on BackBySunday with operator profiles, upcoming treks, reviews, gallery highlights, and trail videos.",
  alternates: {
    canonical: "/operators",
  },
  openGraph: {
    title: "Verified Trek Operators | BackBySunday",
    description:
      "Explore verified trek operators on BackBySunday with operator profiles, upcoming treks, reviews, gallery highlights, and trail videos.",
    url: "/operators",
    images: [
      {
        url: "/Hero/sahyadri-fort-sunrise.png",
        width: 1200,
        height: 630,
        alt: "Verified trek operator profile on BackBySunday",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Verified Trek Operators | BackBySunday",
    description:
      "Explore verified trek operators on BackBySunday with operator profiles, upcoming treks, reviews, gallery highlights, and trail videos.",
    images: ["/Hero/sahyadri-fort-sunrise.png"],
  },
};

export default function OperatorsPage() {
  return <OperatorsPageContent />;
}
