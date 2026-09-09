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
  title: "Trek & Travel",
  description: "Explore the world with Trek and Travel",
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
