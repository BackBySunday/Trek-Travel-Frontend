import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOperator } from "@/lib/operator";
import OperatorsPageContent from "../OperatorsPageContent";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getOperator(slug);
  if (!data) return { title: "Operator not found" };

  const { operator } = data;
  const title = operator.verified ? `${operator.name} - Verified Trek Operator` : `${operator.name} - Trek Operator`;
  const description =
    operator.bio || `Treks, reviews and photos from ${operator.name} on BackBySunday.`;
  return {
    title,
    description,
    alternates: { canonical: `/operators/${slug}` },
    openGraph: { title: `${title} | BackBySunday`, description, url: `/operators/${slug}`, images: [{ url: operator.coverUrl, width: 1200, height: 630, alt: operator.name }] },
    twitter: { card: "summary_large_image", title: `${title} | BackBySunday`, description, images: [operator.coverUrl] },
  };
}

export default async function OperatorPage({ params }: Params) {
  const { slug } = await params;
  const data = await getOperator(slug);
  if (!data) notFound();
  return <OperatorsPageContent slug={slug} data={data} />;
}
