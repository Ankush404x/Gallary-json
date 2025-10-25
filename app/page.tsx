import Link from "next/link";

import { Hero } from "@/components/Hero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <section id="about" className="mx-auto w-full max-w-5xl px-4 pb-24 md:px-6">
        <div className="space-y-6 rounded-3xl border border-white/5 bg-white/5 p-8 shadow-floating backdrop-blur-sm md:p-12">
          <h2 className="font-display text-2xl sm:text-3xl">Curated for the small screen first</h2>
          <p className="text-base text-foreground/70 sm:text-lg">
            The Digital Showroom translates editorial storytelling into a fast, touch-friendly experience. Crafted with Next.js App Router, Tailwind CSS, and immersive motion, it stays true to a single source of truth&mdash;the <code className="rounded bg-black/40 px-1 py-0.5">Image.json</code> dataset at the root of this repo.
          </p>
          <p className="text-base text-foreground/70 sm:text-lg">
            Each photograph is validated, animated, and delivered with accessibility and performance in mind. Deep links power sharing moments, while swipeable lightboxes provide gallery-level immersion anywhere you are.
          </p>
          <div className="flex flex-col gap-3 text-sm sm:flex-row sm:items-center">
            <Link
              href="/gallery"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-foreground/30 px-6 py-3 font-semibold uppercase tracking-[0.3em] text-foreground/80 transition-colors duration-200 hover:border-foreground/60 hover:text-foreground"
            >
              View the collection
            </Link>
            <a
              href="https://nextjs.org/learn?utm_source=digital-showroom"
              className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-foreground px-6 py-3 font-semibold uppercase tracking-[0.3em] text-background transition-colors duration-200 hover:bg-foreground/90"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn about the build
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
