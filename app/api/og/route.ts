import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";

import { fetchImages } from "@/lib/fetchImages";

export const runtime = "edge";

const WIDTH = 1200;
const HEIGHT = 630;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  const images = await fetchImages();
  const image = slug ? images.find((item) => item.slug === slug) : images[0];

  if (!image) {
    return new Response("Image not found", { status: 404 });
  }

  const caption = image.caption;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "stretch",
          justifyContent: "space-between",
          backgroundColor: "#0f1115",
          color: "#f5f5f0",
          position: "relative",
          fontFamily: "'Inter', system-ui, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "0",
            background: "radial-gradient(circle at 15% 20%, rgba(158, 198, 255, 0.25), transparent 55%)",
          }}
        />
        <div
          style={{
            flex: 1,
            padding: "72px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "32px",
            zIndex: 1,
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <span style={{ fontSize: "16px", letterSpacing: "0.4em", textTransform: "uppercase", color: "rgba(245,245,240,0.45)" }}>
              Digital Showroom
            </span>
            <h1
              style={{
                fontSize: "60px",
                lineHeight: 1.05,
                margin: 0,
              }}
            >
              {caption}
            </h1>
          </div>
          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "9999px",
                background: "rgba(245, 245, 240, 0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "22px",
                fontWeight: 700,
              }}
            >
              DS
            </div>
            <p style={{ fontSize: "20px", color: "rgba(245,245,240,0.6)", margin: 0 }}>
              Swipeable, shareable, mobile-first storytelling
            </p>
          </div>
        </div>
        <div
          style={{
            width: "480px",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            borderRadius: "40px 0 0 40px",
            zIndex: 1,
          }}
        >
          <img
            src={image.url}
            alt={caption}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    {
      width: WIDTH,
      height: HEIGHT,
    }
  );
}
