import type { Metadata } from "next";

import { GalleryGrid } from "@/components/GalleryGrid";
import { fetchImages } from "@/lib/fetchImages";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Responsive masonry gallery sourced from Image.json with deep links for every photograph.",
};

export default async function GalleryPage() {
  const images = await fetchImages();

  return (
    <div className="flex-1">
      <div className="mx-auto w-full max-w-4xl px-4 pt-16 text-center md:px-6">
        <h1 className="font-display text-4xl text-balance sm:text-5xl">Gallery</h1>
        <p className="mt-4 text-base text-foreground/65 sm:text-lg">
          A responsive, lazy-loaded masonry wall optimised for mobile-first viewing. Tap any image to open the immersive lightbox.
        </p>
      </div>
      <GalleryGrid images={images} />
    </div>
  );
}
