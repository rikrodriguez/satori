# Satori Section Map

Use this map when editing the site after the Hostinger migration.

## Route Wrappers

All visible routes live in `src/app/**/page.tsx`, but those files should stay
small. They re-export the editable page implementation from `src/sections`.

## Main Editing Folders

| Area | Edit Here | Purpose |
| --- | --- | --- |
| Home | `src/sections/home/home-page.tsx` | Homepage sections and conversion flow |
| Product | `src/sections/product/satori-cream-page.tsx` | Satori Cream PDP sections |
| Content | `src/sections/content/` | Blog, FAQ, About, Reviews, Before/After, How To Apply, membership content |
| Store | `src/sections/store/` | Collections and shopping path pages |
| Checkout | `src/sections/checkout/` | Checkout page and thank-you page |
| Support | `src/sections/support/` | Shipping, returns, guarantee |
| Policies | `src/sections/policies/` | Legal/policy pages |
| Ads/Internal | `src/sections/ads/` | Internal marketing boards, excluded from the public Hostinger static ZIP |

## Shared Files

| File | Use |
| --- | --- |
| `src/lib/store.ts` | Products, bundles, navigation, reviews, FAQ, blog copy, support copy |
| `src/lib/visual-assets.ts` | Image manifest and canonical asset references |
| `src/app/globals.css` | Global layout, responsive CSS, design system |
| `src/components/header.tsx` | Desktop/mobile navigation |
| `src/components/cart-drawer.tsx` | Cart drawer and cart item controls |
| `src/components/checkout-summary.tsx` | Checkout simulation form and order summary |
| `src/components/product-card.tsx` | Product cards used in collections |
| `src/components/product-visual.tsx` | Product/lifestyle image rendering |

## Hostinger Output

| Package | Use |
| --- | --- |
| `exports/hostinger/satori-hostinger-static-upload.zip` | Upload/extract into `public_html` |
| `exports/hostinger/public_html_upload` | Expanded folder whose contents can be uploaded to `public_html` |
| `exports/hostinger/satori-hostinger-source.zip` | Keep as full editable project source |

Regenerate both packages with:

```bash
npm run package:hostinger
```

During packaging, `scripts/build-hostinger-webp-assets.mjs` and
`scripts/build-hostinger-webp-assets.py` create high-quality WebP siblings for
public images inside `out/images` when WebP is smaller than the original. The
site still references the original canonical JPG/PNG paths, and Hostinger serves
WebP through `.htaccess` when supported.

Audit the static export before upload with:

```bash
npm run audit:hostinger
```

Verify the final ZIP with:

```bash
npm run verify:hostinger-package
```
