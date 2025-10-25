import "server-only";

import { cache } from "react";
import { z } from "zod";

import rawImages from "@/Image.json";
import type { ImageEntry } from "@/types";
import { slugify } from "@/utils/slug";

const imageSchema = z.object({
  url: z.string().url(),
  download: z.string().url().optional(),
  durl: z.string().url().optional(),
  caption: z.string().min(1, "Caption is required"),
});

const imagesSchema = z.array(imageSchema);

type RawImage = z.infer<typeof imageSchema>;

const shortHash = (input: string): string => {
  let hash = 2166136261;

  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  return (hash >>> 0).toString(36).slice(0, 8);
};

const normalizeImages = (items: RawImage[]): ImageEntry[] => {
  const seen = new Set<string>();

  return items.map((item) => {
    const downloadUrl = item.download ?? item.durl;

    if (!downloadUrl) {
      throw new Error(`Missing download URL for image with caption: ${item.caption}`);
    }

    const baseSlug = slugify(item.caption);
    const hash = shortHash(item.url);
    let slug = `${baseSlug}-${hash}`;
    let counter = 1;

    while (seen.has(slug)) {
      counter += 1;
      slug = `${baseSlug}-${hash}-${counter}`;
    }

    seen.add(slug);

    return {
      url: item.url,
      download: downloadUrl,
      caption: item.caption,
      slug,
    } satisfies ImageEntry;
  });
};

export const fetchImages = cache(async (): Promise<ImageEntry[]> => {
  const parsed = imagesSchema.safeParse(rawImages);

  if (!parsed.success) {
    console.error("Failed to parse Image.json", parsed.error);
    throw new Error("Image data is invalid");
  }

  return normalizeImages(parsed.data);
});

export const getImageBySlug = cache(async (slug: string): Promise<ImageEntry | undefined> => {
  const images = await fetchImages();
  return images.find((image) => image.slug === slug);
});
