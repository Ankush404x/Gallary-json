import { ImageCard } from "@/components/ImageCard";
import type { ImageEntry } from "@/types";

interface GalleryGridProps {
  images: ImageEntry[];
}

export const GalleryGrid = ({ images }: GalleryGridProps) => {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-16 pt-8 md:px-6">
      <div className="mb-6 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-display text-2xl text-foreground sm:text-3xl">Gallery</h2>
          <p className="text-sm text-foreground/65">Swipe through the collection, optimised for every device.</p>
        </div>
        <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
          {images.length} photographs
        </p>
      </div>
      <div className="columns-1 gap-4 xs:columns-2 lg:columns-3 xl:columns-4">
        {images.map((image) => (
          <ImageCard key={image.slug} image={image} />
        ))}
      </div>
    </section>
  );
};
