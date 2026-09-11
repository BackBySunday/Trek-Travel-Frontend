import type { Metadata } from "next";
import TrekDetailsPageContent from "./TrekDetailsPageContent";

export const metadata: Metadata = {
  title: "Vasota Fort Trek Details",
  description:
    "View Vasota Fort Trek details on BackBySunday, including trip overview, itinerary highlights, inclusions, pricing, and related weekend treks.",
  alternates: {
    canonical: "/trek-details",
  },
  openGraph: {
    title: "Vasota Fort Trek Details | BackBySunday",
    description:
      "View Vasota Fort Trek details on BackBySunday, including trip overview, itinerary highlights, inclusions, pricing, and related weekend treks.",
    url: "/trek-details",
    images: [
      {
        url: "/Hero/card-1.png",
        width: 1200,
        height: 630,
        alt: "Vasota Fort Trek details on BackBySunday",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasota Fort Trek Details | BackBySunday",
    description:
      "View Vasota Fort Trek details on BackBySunday, including trip overview, itinerary highlights, inclusions, pricing, and related weekend treks.",
    images: ["/Hero/card-1.png"],
  },
};

export default function TrekDetailsPage() {
  return <TrekDetailsPageContent />;
}
