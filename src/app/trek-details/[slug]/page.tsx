import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrek } from "@/lib/trek";
import TrekDetailsPageContent from "../TrekDetailsPageContent";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) return { title: "Trek not found" };

  const title = `${trek.title} Details`;
  const description = trek.headline || `View ${trek.title} on BackBySunday, including itinerary, inclusions, pricing and pickup points.`;
  const image = trek.photos[0] ?? "/Hero/card-1.png";
  return {
    title,
    description,
    alternates: { canonical: `/trek-details/${trek.slug}` },
    openGraph: { title: `${title} | BackBySunday`, description, url: `/trek-details/${trek.slug}`, images: [{ url: image, width: 1200, height: 630, alt: trek.title }] },
    twitter: { card: "summary_large_image", title: `${title} | BackBySunday`, description, images: [image] },
  };
}

export default async function TrekDetailsPage({ params }: Params) {
  const { slug } = await params;
  const trek = await getTrek(slug);
  if (!trek) notFound();
  return <TrekDetailsPageContent trek={trek} />;
}
