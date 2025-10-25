# Digital Showroom

A mobile-first digital showroom powered by **Next.js 13 App Router**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **yet-another-react-lightbox**. The entire experience is driven by the singular `Image.json` dataset at the repository root.

## Highlights

- 📱 **Mobile-first** design optimised for touch with 60fps motion and reduced-motion fallbacks.
- 🖼️ **Masonry gallery** with lazy-loaded, blur-up previews sourced directly from `Image.json`.
- 🔗 **Per-image deep links** (`/photo/[slug]`) backed by Zod-validated data and stable slug generation.
- 💡 **Swipeable lightbox** overlay with touch gestures, pinch/zoom, keyboard navigation, and focus trapping for accessibility.
- 🔁 **Dynamic OG/Twitter cards** powered by `next/og` for share-ready previews.
- 🧭 **SEO ready** with metadata, sitemap, and robots configuration.
- ▲ **Vercel-ready** &mdash; deploy to the free tier in a single click. Every commit triggers a fresh build, and changes to `Image.json` revalidate the site.

## Tech Stack

- [Next.js 13 App Router](https://nextjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [yet-another-react-lightbox](https://yet-another-react-lightbox.com/)
- [Zod](https://zod.dev/)

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

3. **Run lint checks**

   ```bash
   npm run lint
   ```

4. **Build for production**

   ```bash
   npm run build
   ```

## Environment variables

The site derives absolute URLs for metadata, the sitemap, and dynamic Open Graph images from `NEXT_PUBLIC_SITE_URL`. Create an `.env.local` file (ignored from version control) and set:

```
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

When running locally, the app falls back to `http://localhost:3000`.

## Data source

All gallery content lives in [`Image.json`](./Image.json). Each entry should contain:

```jsonc
{
  "url": "https://...",        // required - original image URL
  "download": "https://...",   // required - download/share URL ("durl" is accepted and normalised)
  "caption": "Caption text"     // required - short descriptive caption
}
```

Entries are validated with Zod during build/runtime. Slugs are generated deterministically from the caption and image URL hash to ensure stability across redeployments.

To update the gallery, edit `Image.json`, commit, and redeploy. No additional code changes are required.

## Accessibility & performance

- Alt text derives from each caption.
- Focus is trapped inside the lightbox, with ESC/arrow-key support.
- Animations honour the `prefers-reduced-motion` media query.
- Images use `<Image />` with blur placeholders, responsive sizing, and are marked `unoptimized` for now (configure remote patterns before switching to the Next.js image optimiser).

## Deployment on Vercel

1. [Import the repository](https://vercel.com/import) into Vercel.
2. Set the build command to `npm run build` and the output directory to `.next`.
3. Ensure `NEXT_PUBLIC_SITE_URL` is configured in Vercel Project Settings.
4. Every push to `main` (and PR) will trigger the accompanying GitHub Action (`.github/workflows/ci.yml`) and the Vercel build pipeline.

## Project scripts

| Command         | Description                           |
|-----------------|---------------------------------------|
| `npm run dev`   | Start the development server.         |
| `npm run build` | Create an optimised production build. |
| `npm run start` | Run the production server.            |
| `npm run lint`  | Execute ESLint using `next lint`.     |

## Directory structure

```
├── app
│   ├── api/og/route.ts    # Dynamic Open Graph image renderer
│   ├── gallery/page.tsx   # Masonry gallery view
│   ├── photo/[slug]/      # Deep-linked lightbox route
│   ├── layout.tsx         # Root layout & metadata
│   ├── page.tsx           # Landing page hero & story
│   ├── robots.ts          # Robots configuration
│   └── sitemap.ts         # Sitemap/feed generation
├── components             # Reusable UI components
├── lib/fetchImages.ts     # Zod validation + data loader
├── styles/globals.css     # Tailwind base styles
├── utils/slug.ts          # Stable slug generation helper
├── Image.json             # Source-of-truth image data
└── README.md
```

## Contributing

1. Fork and clone the repository.
2. Create a feature branch from `main`.
3. Install dependencies with `npm install`.
4. Implement changes, ensuring lint/build succeed.
5. Open a pull request. The CI workflow runs `npm run lint` and `npm run build` on every PR.

---

Built with ❤️ for the small screen.
