import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";

import "@/styles/globals.css";

import { Header } from "@/components/Header";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Playfair_Display({ subsets: ["latin"], variable: "--font-display" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Digital Showroom",
    template: "%s | Digital Showroom",
  },
  description:
    "A mobile-first digital showroom featuring a curated photography collection rendered with Next.js, Tailwind CSS, and Framer Motion.",
  openGraph: {
    title: "Digital Showroom",
    description:
      "Explore a curated photography collection in a mobile-first digital showroom with immersive motion and deep linking.",
    url: siteUrl,
    siteName: "Digital Showroom",
    images: [
      {
        url: `${siteUrl}/api/og`,
        width: 1200,
        height: 630,
        alt: "Digital Showroom preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Showroom",
    description:
      "Explore a curated photography collection in a mobile-first digital showroom with immersive motion and deep linking.",
    images: [`${siteUrl}/api/og`],
  },
  icons: {
    icon: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <Script id="reduced-motion" strategy="beforeInteractive">
          {`
            try {
              const shouldReduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
              if (shouldReduce) {
                document.documentElement.dataset.reducedMotion = 'true';
              }
            } catch (error) {
              console.warn('Unable to detect prefers-reduced-motion', error);
            }
          `}
        </Script>
        <Header />
        <main className="relative flex min-h-[calc(100vh-3.5rem)] flex-col">{children}</main>
        <footer className="mx-auto w-full max-w-6xl px-4 pb-12 pt-10 text-sm text-foreground/55 md:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <span>&copy; {new Date().getFullYear()} Digital Showroom.</span>
            <a
              href="https://vercel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground/70"
            >
              Powered by Next.js on Vercel
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
