import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, Inter, Urbanist } from "next/font/google";
import ComingSoonProvider from "@/components/layout/ComingSoonProvider";
import "./globals.css";

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-urbanist",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-ibm-plex-sans",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://backbysunday.in"),
  title: {
    default: "BackBySunday | Weekend Treks, Trips & Travel Experiences",
    template: "%s | BackBySunday",
  },
  description:
    "Discover weekend treks, short trips, and refreshing travel experiences across India with BackBySunday.",
  applicationName: "BackBySunday",
  keywords: [
    "BackBySunday",
    "weekend trips India",
    "weekend treks",
    "trekking trips",
    "Pune treks",
    "Sahyadri treks",
    "short travel experiences",
    "travel marketplace India",
    "travel company India",
    "travel booking platform",
    "travel experience marketplace",
    "tour marketplace India",
    "adventure travel company",
    "trek booking platform",
    "weekend travel marketplace",
    "short trips from Pune",
    "adventure trips India",
    "group travel experiences",
    "verified travel operators",
    "local trek operators",
    "curated weekend getaways",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BackBySunday | Weekend Treks, Trips & Travel Experiences",
    description:
      "Discover weekend treks, short trips, and refreshing travel experiences across India with BackBySunday.",
    url: "/",
    siteName: "BackBySunday",
    images: [
      {
        url: "/Banner/Banner.png",
        width: 1200,
        height: 630,
        alt: "BackBySunday",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BackBySunday | Weekend Treks, Trips & Travel Experiences",
    description:
      "Discover weekend treks, short trips, and refreshing travel experiences across India with BackBySunday.",
    images: ["/Banner/Banner.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${ibmPlexSans.variable} ${inter.variable}`}
    >
      <body><ComingSoonProvider>{children}</ComingSoonProvider></body>
    </html>
  );
}
