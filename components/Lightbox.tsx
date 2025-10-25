import dynamic from "next/dynamic";

import type { ImageEntry } from "@/types";

const LightboxClient = dynamic(
  () => import("@/components/lightbox/LightboxClient").then((mod) => mod.LightboxClient),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 text-sm uppercase tracking-[0.3em] text-white/60">
        Loading photo…
      </div>
    ),
  }
);

interface LightboxProps {
  images: ImageEntry[];
  initialIndex: number;
}

export const Lightbox: React.FC<LightboxProps> = ({ images, initialIndex }) => {
  return <LightboxClient images={images} initialIndex={initialIndex} />;
};
