# Satori Hostinger Package

This project is a Next.js 16 storefront/funnel for Satori Organic Skin Care.

## Fastest Hostinger Upload

Use the generated static package:

```bash
npm run package:hostinger
```

Then upload:

```text
exports/hostinger/satori-hostinger-static-upload.zip
```

Extract that ZIP into Hostinger's `public_html/satori` folder.

The package command also creates an expanded upload folder:

```text
exports/hostinger/public_html_upload
```

If using that folder, upload the contents of the folder into
`public_html/satori`, not the folder itself.

This option is fastest for a marketing/ecommerce demo because it serves static
HTML, CSS, JavaScript, and images without a Node.js server.

The package command also runs a static audit and generates high-quality WebP
fallback images for Hostinger/Apache. The site keeps the canonical JPG/PNG
paths, while `.htaccess` serves WebP automatically when the browser supports it.
It also verifies the final upload ZIP before reporting success.

The consumer upload ZIP intentionally excludes internal `/ads/*` working
boards. Those files remain in the source ZIP for marketing/design work.

## Editable Hostinger Web App Upload

Use the source package:

```text
exports/hostinger/satori-hostinger-source.zip
```

There is also a same-content alias with a clearer handoff name:

```text
exports/hostinger/satori-hostinger-complete-code.zip
```

Upload it as a Hostinger Node.js/Web App or connect the repository through
GitHub. Use:

```bash
npm install
npm run build
npm run start
```

Set `NEXT_PUBLIC_SITE_URL` to the final production domain when the domain is
ready.

## Where To Edit

Full map:

```text
docs/section-map.md
```

Primary page sections live here:

```text
src/sections/ads/
src/sections/checkout/
src/sections/content/
src/sections/home/home-page.tsx
src/sections/policies/
src/sections/product/satori-cream-page.tsx
src/sections/store/
src/sections/support/
```

Shared data, products, navigation, reviews, FAQs, blog copy, and policy copy:

```text
src/lib/store.ts
src/lib/visual-assets.ts
```

Global design system and responsive CSS:

```text
src/app/globals.css
```

Header, cart, checkout, product cards, images, and shared UI:

```text
src/components/
```

Route files stay intentionally small:

```text
src/app/page.tsx
src/app/products/satori-cream/page.tsx
src/app/pages/*/page.tsx
src/app/collections/*/page.tsx
```

This keeps future edits section-based instead of requiring full-page rewrites.
