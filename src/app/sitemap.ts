import type { MetadataRoute } from "next";

const siteUrl = "https://backbysunday.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/operators",
    "/trek-details",
    "/privacy-policy",
    "/terms-and-conditions",
    "/cancellation-and-refund-policy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));
}
