"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

export const Hero: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  } as const;

  return (
    <section className="relative mx-auto flex w-full max-w-5xl flex-col items-start gap-8 px-4 pb-20 pt-24 md:px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="flex flex-col gap-6 text-left"
      >
        <span className="text-xs uppercase tracking-[0.4em] text-foreground/60">
          A curated digital runway
        </span>
        <h1 className="font-display text-4xl text-balance sm:text-5xl md:text-6xl">
          Discover the photographs that define the moment.
        </h1>
        <p className="max-w-xl text-base text-foreground/75 sm:text-lg">
          A mobile-first showroom that brings every image to life with cinematic motion, responsive layouts, and instant sharing moments—powered entirely by a single source of truth.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            href="/gallery"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-colors duration-200 ease-out hover:bg-foreground/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Explore the gallery
          </Link>
          <Link
            href="#about"
            className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-foreground/30 px-6 py-3 text-sm font-semibold text-foreground/80 transition-colors duration-200 ease-out hover:border-foreground/60 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Read the story
          </Link>
        </div>
      </motion.div>
    </section>
  );
};
