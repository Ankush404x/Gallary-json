"use client";

import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

import type { ImageEntry } from "@/types";

const BLUR_PLACEHOLDER =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScxMDAwJyBoZWlnaHQ9JzEwMDAnPjxyZWN0IHdpZHRoPScxMDAlJyBoZWlnaHQ9JzEwMCUnIGZpbGw9JyMxYzFlMjQnLz48L3N2Zz4=";

type ImageCardProps = {
  image: ImageEntry;
};

export const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const [loaded, setLoaded] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(0.75);
  const prefersReducedMotion = useReducedMotion();

  const handleLoad = useCallback(
    (img: HTMLImageElement) => {
      if (!img) return;
      const { naturalWidth, naturalHeight } = img;
      if (naturalWidth && naturalHeight) {
        setAspectRatio(naturalWidth / naturalHeight);
      }
      setLoaded(true);
    },
    []
  );

  const motionProps = useMemo(
    () => ({
      initial: prefersReducedMotion
        ? { opacity: 0 }
        : { opacity: 0, y: 24, scale: 0.96 },
      whileInView: prefersReducedMotion
        ? { opacity: 1 }
        : {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          },
      viewport: { once: true, margin: "0px 0px -20%" },
    }),
    [prefersReducedMotion]
  );

  return (
    <motion.article
      {...motionProps}
      className="mb-4 break-inside-avoid"
      style={{ aspectRatio: aspectRatio.toString() }}
    >
      <Link
        href={`/photo/${image.slug}`}
        className="group relative block h-full overflow-hidden rounded-3xl border border-white/5 bg-muted/40 shadow-floating"
      >
        <div className="relative h-full w-full">
          <Image
            src={image.url}
            alt={image.caption}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
            fill
            sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 768px) 45vw, 90vw"
            className={clsx(
              "h-full w-full object-cover transition-transform duration-700 ease-out",
              "group-hover:scale-[1.02]",
              loaded ? "opacity-100" : "opacity-80 blur-sm"
            )}
            onLoadingComplete={handleLoad}
            onError={({ currentTarget }) => {
              currentTarget.style.objectFit = "contain";
              setLoaded(true);
            }}
            priority={false}
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2 text-xs uppercase tracking-[0.3em] text-white/80">
          <span className="truncate">{image.caption}</span>
          <span className="rounded-full bg-white/10 px-2 py-1 text-[0.6rem] font-semibold">View</span>
        </div>
      </Link>
    </motion.article>
  );
};
