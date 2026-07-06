export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://satoriorganicskincare.com";

export const siteName = "Satori Organic Skin Care";

export const defaultSeoDescription =
  "Shop Satori Cream, the science-led anti-aging skincare ritual for smoother-looking texture, hydration, redness support, and daily glow.";

export const defaultOgImage = "/images/satori/01_home_hero_desktop_2880x1400.jpg";

export const routes = [
  { path: "/", priority: 1 },
  { path: "/pages/satori-wrinkle-smoothing-ritual", priority: 0.98 },
  { path: "/products/satori-cream", priority: 0.95 },
  { path: "/collections/all", priority: 0.85 },
  { path: "/collections/bundles", priority: 0.82 },
  { path: "/collections/subscribe-and-save", priority: 0.8 },
  { path: "/collections/solutions", priority: 0.78 },
  { path: "/collections/memberships", priority: 0.74 },
  { path: "/pages/skin-concerns", priority: 0.78 },
  { path: "/pages/reviews", priority: 0.78 },
  { path: "/pages/before-after", priority: 0.75 },
  { path: "/pages/how-to-apply", priority: 0.72 },
  { path: "/pages/subscribe-and-save", priority: 0.68 },
  { path: "/pages/faq", priority: 0.66 },
  { path: "/pages/our-guarantee", priority: 0.64 },
  { path: "/pages/shipping", priority: 0.63 },
  { path: "/pages/returns-refunds", priority: 0.62 },
  { path: "/pages/golden-standard-membership-info", priority: 0.62 },
  { path: "/pages/about-satori", priority: 0.58 },
  { path: "/blog", priority: 0.55 },
  { path: "/policies/privacy-policy", priority: 0.25 },
  { path: "/policies/terms-of-service", priority: 0.25 },
  { path: "/policies/disclaimer", priority: 0.25 },
] as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}
