import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Lightbox } from "@/components/Lightbox";
import { fetchImages, getImageBySlug } from "@/lib/fetchImages";

interface PhotoPageProps {
  params: {
    slug: string;
  };
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  const images = await fetchImages();

  return images.map((image) => ({
    slug: image.slug,
  }));
}

export async function generateMetadata({ params }: PhotoPageProps): Promise<Metadata> {
  const image = await getImageBySlug(params.slug);

  if (!image) {
    return {
      title: "Photo not found",
    };
  }

  const ogImageUrl = `${baseUrl}/api/og?slug=${encodeURIComponent(image.slug)}`;

  return {
    title: image.caption,
    description: `View ${image.caption} in the Digital Showroom.`,
    openGraph: {
      title: `${image.caption} | Digital Showroom`,
      description: `Discover ${image.caption} inside the Digital Showroom gallery.`,
      url: `${baseUrl}/photo/${image.slug}`,
      type: "article",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: image.caption,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${image.caption} | Digital Showroom`,
      description: `Discover ${image.caption} inside the Digital Showroom gallery.`,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `${baseUrl}/photo/${image.slug}`,
    },
  };
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const images = await fetchImages();
  const initialIndex = images.findIndex((image) => image.slug === params.slug);

  if (initialIndex < 0) {
    notFound();
  }

  return <Lightbox images={images} initialIndex={initialIndex} />;
}
