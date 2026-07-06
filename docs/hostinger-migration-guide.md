# Satori Organic Skin Care - Hostinger Migration Guide

## Recommended Architecture

Keep the website as a modular Next.js project, then publish it to Hostinger in
one of two ways:

1. **Static upload to `public_html`**
   - Best for speed and simplicity.
   - No Node.js server required.
   - Cart, add-to-cart, checkout simulation, thank-you flow, navigation, and
     tracking scripts remain client-side.
   - Future edits happen in the source code, then the static package is rebuilt.

2. **Hostinger Node.js/Web App**
   - Best if the site later needs SSR, APIs, backend integrations, or a real
     Shopify/custom checkout bridge.
   - Uses the full Next.js source code.
   - Requires a Hostinger plan that supports Node.js apps.

For the current Satori funnel, the static package is the safest upload path for
speed. The source package is included so the project stays maintainable.

## Package Commands

```bash
npm run lint
npm run build
npm run audit:hostinger
npm run verify:hostinger-package
npm run package:hostinger
```

The packaging command builds, audits, generates WebP fallbacks, and creates:

```text
exports/hostinger/satori-hostinger-static-upload.zip
exports/hostinger/satori-hostinger-source.zip
exports/hostinger/public_html_upload
```

## What To Upload

### Static Upload

Upload and extract this ZIP into Hostinger `public_html`:

```text
exports/hostinger/satori-hostinger-static-upload.zip
```

Alternative: upload the contents of this generated folder:

```text
exports/hostinger/public_html_upload
```

The root of `public_html` should contain files such as:

```text
index.html
products/satori-cream/index.html
checkout/index.html
_next/
images/
favicon.svg
sitemap.xml
robots.txt
```

The static upload package intentionally excludes internal `/ads/*` working
boards so the consumer-facing Hostinger site stays clean. Those internal pages
remain available in the source ZIP.

### Source Upload / Node.js Web App

Upload this ZIP if using Hostinger's Node.js/Web App flow:

```text
exports/hostinger/satori-hostinger-source.zip
```

Build command:

```bash
npm install && npm run build
```

Start command:

```bash
npm run start
```

Environment variable:

```text
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Section-Based Code Map

For the full file map, use:

```text
docs/section-map.md
```

The route files are intentionally thin. Edit the section files instead.

### Home

```text
src/app/page.tsx
src/sections/home/home-page.tsx
```

Sections inside `home-page.tsx`:

```text
HomeHeroSection
HomeProductStartSection
HomeConcernsSection
HomeBeforeAfterSection
HomeCreamRitualSection
HomeReviewsSection
HomeTrustIconsSection
HomeScienceStorySection
HomeBlogSection
```

### Product Page

```text
src/app/products/satori-cream/page.tsx
src/sections/product/satori-cream-page.tsx
```

Sections inside `satori-cream-page.tsx`:

```text
ProductHeroSection
ProductDetailsSection
ProductIngredientsSection
ProductFaqPreviewSection
ProductHowItWorksSection
ProductBeforeAfterSection
ProductRitualStoriesSection
ProductCommunitySection
ProductRitualNotesSection
ProductFinalCtaSection
ProductFeatureIconsSection
```

### Skin Concerns

```text
src/app/pages/skin-concerns/page.tsx
src/sections/content/skin-concerns-page.tsx
```

Sections:

```text
SkinConcernsHeroSection
SkinConcernsGridSection
```

### Other Pages

Every public route now follows the same pattern: `src/app/.../page.tsx` is a
thin route wrapper, while editable page implementation lives in:

```text
src/sections/ads/
src/sections/checkout/
src/sections/content/
src/sections/policies/
src/sections/store/
src/sections/support/
```

Use these folders for future page edits instead of editing route files.

### Shared Data

Change products, bundles, navigation, FAQs, reviews, blog posts, membership
plans, shipping/returns copy, and support page content here:

```text
src/lib/store.ts
```

Change image references and canonical image metadata here:

```text
src/lib/visual-assets.ts
```

Change global styling and responsive behavior here:

```text
src/app/globals.css
```

## Performance Notes

- Static Hostinger export uses regular static assets and avoids a Node runtime.
- The public upload ZIP includes `public/.htaccess` at the root for Apache
  compression, browser caching, content-type safety, and a static 404 page.
- The package command generates high-quality `.webp` siblings for public
  images and `.htaccess` serves them automatically to browsers that support
  WebP while keeping the original JPG/PNG files as fallback.
- Vercel/Next deployments still use AVIF/WebP image optimization.
- Hostinger static export uses `images.unoptimized` only during
  `NEXT_OUTPUT=export`, because a static host cannot run the Next image
  optimizer.
- CSS remains one global stylesheet for cache efficiency and consistency.
- Components are split by section to make future edits surgical.
- Cart and checkout use browser localStorage, so the static export preserves
  the current simulated checkout flow.

## QA Checklist After Upload

Open these URLs on desktop and mobile:

```text
/
/products/satori-cream/
/checkout/
/thank-you/
/pages/skin-concerns/
/pages/how-to-apply/
/pages/subscribe-and-save/
/pages/about-satori/
/blog/
/sitemap.xml
/robots.txt
```

Confirm:

```text
No horizontal scroll
Images load
Add to cart works
Cart drawer opens
Products can be removed from cart
Checkout form displays
Continue routes to thank-you
Mobile header/menu works
No prototype/preview/internal copy appears
```

## Manual Hostinger Notes

- Upload only the static ZIP contents into `public_html`, not the source ZIP.
- Do not upload `.env.local`, `.git`, `.next`, or `node_modules`.
- If using Node.js/Web App mode, upload the source ZIP or connect GitHub
  instead of uploading `out/`.
- After the final domain is attached, set `NEXT_PUBLIC_SITE_URL` and rebuild
  the source package so canonical URLs and sitemap use the final domain.
