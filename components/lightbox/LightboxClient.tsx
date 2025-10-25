"use client";

import { useCallback, useEffect, useMemo } from "react";
import FocusLock from "react-focus-lock";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import type { Slide } from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import type { ImageEntry } from "@/types";

interface LightboxClientProps {
  images: ImageEntry[];
  initialIndex: number;
}

type ExtendedSlide = Slide & {
  downloadUrl?: string;
  description?: string;
};

const overlayTransition = {
  type: "spring",
  stiffness: 220,
  damping: 28,
};

const formatSlides = (images: ImageEntry[]): ExtendedSlide[] =>
  images.map((image) => ({
    src: image.url,
    alt: image.caption,
    description: image.caption,
    downloadUrl: image.download,
  }));

export const LightboxClient: React.FC<LightboxClientProps> = ({ images, initialIndex }) => {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const handleClose = useCallback(() => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/gallery");
    }
  }, [router]);

  const slides = useMemo(() => formatSlides(images), [images]);

  useEffect(() => {
    const body = document.body;
    const scrollBarCompensation = window.innerWidth - document.documentElement.clientWidth;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;

    body.style.overflow = "hidden";
    if (scrollBarCompensation > 0) {
      body.style.paddingRight = `${scrollBarCompensation}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleClose]);

  const animationSettings = prefersReducedMotion
    ? {
        fade: 0,
        swipe: 0,
        zoom: 0,
      }
    : {
        fade: 300,
        swipe: 500,
        zoom: 300,
      };

  return (
    <FocusLock returnFocus autoFocus>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={prefersReducedMotion ? { duration: 0 } : overlayTransition}
        role="dialog"
        aria-modal="true"
        aria-label="Photo lightbox viewer"
      >
        <Lightbox
          open
          index={initialIndex}
          close={handleClose}
          slides={slides}
          render={{
            buttonClose: () => (
              <button
                type="button"
                onClick={handleClose}
                className="mr-4 mt-4 inline-flex h-11 items-center justify-center rounded-full border border-white/30 bg-black/50 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                aria-label="Close lightbox"
              >
                Close
              </button>
            ),
            slideFooter: ({ slide }) => {
              const currentSlide = slide as ExtendedSlide;
              return (
                <div className="flex w-full flex-col gap-3 px-6 pb-8 text-sm text-white">
                  <div className="flex flex-col gap-1">
                    <span className="font-semibold uppercase tracking-[0.3em] text-white/60">Caption</span>
                    <p className="font-display text-base text-balance leading-snug text-white/90">{currentSlide.description}</p>
                  </div>
                  {currentSlide.downloadUrl ? (
                    <a
                      href={currentSlide.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-11 items-center justify-center rounded-full bg-white/20 px-4 text-xs font-semibold uppercase tracking-[0.3em] text-white transition-colors duration-200 hover:bg-white/30"
                    >
                      Download image
                    </a>
                  ) : null}
                </div>
              );
            },
          }}
          plugins={[Zoom]}
          zoom={{
            maxZoomPixelRatio: 2.5,
            scrollToZoom: true,
            doubleTapDelay: 300,
          }}
          animation={animationSettings}
          carousel={{ finite: false, preload: 2 }}
          controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
          styles={{
            root: {
              backgroundColor: "transparent",
            },
          }}
        />
      </motion.div>
    </FocusLock>
  );
};
