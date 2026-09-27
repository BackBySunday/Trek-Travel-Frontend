import { notFound, redirect } from "next/navigation";
import { getFirstPublishedSlug } from "@/lib/trek";

export const dynamic = "force-dynamic";

// /trek-details has no slug of its own — send visitors to the first published
// trek so old links and the nav's generic "Treks" link still land somewhere real.
export default async function TrekDetailsIndexPage() {
  const slug = await getFirstPublishedSlug();
  if (!slug) notFound();
  redirect(`/trek-details/${slug}`);
}
