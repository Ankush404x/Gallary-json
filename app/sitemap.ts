import type { MetadataRoute } from "next";

import { fetchImages } from "@/lib/fetchImages";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const images = await fetchImages();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: now,
    },
  ];

  const photoRoutes: MetadataRoute.Sitemap = images.map((image) => ({
    url: `${baseUrl}/photo/${image.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...photoRoutes];
}
