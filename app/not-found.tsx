import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col items-center justify-center gap-6 px-4 py-20 text-center md:px-6">
      <span className="text-xs uppercase tracking-[0.4em] text-foreground/40">404</span>
      <h1 className="font-display text-3xl sm:text-4xl">We couldn&apos;t find that page.</h1>
      <p className="max-w-lg text-sm text-foreground/60 sm:text-base">
        The gallery evolves often. The image you&apos;re looking for might have been archived or renamed.
      </p>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-foreground px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-background transition-colors duration-200 hover:bg-foreground/90"
        >
          Return home
        </Link>
        <Link
          href="/gallery"
          className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-foreground/40 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/80 transition-colors duration-200 hover:border-foreground/60 hover:text-foreground"
        >
          Open gallery
        </Link>
      </div>
    </div>
  );
}
