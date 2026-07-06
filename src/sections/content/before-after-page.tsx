import Link from "next/link";
import { SatoriImageCard } from "@/components/product-visual";
import { pdpBeforeAfterAssets } from "@/lib/visual-assets";

export const metadata = {
  title: "Satori Before & After Visuals",
  description:
    "Explore Satori before-and-after visual references for smoother-looking, hydrated, calmer-looking skin with consistent cream use.",
  alternates: {
    canonical: "/pages/before-after",
  },
};

export default function BeforeAfterPage() {
  return (
    <section className="simple-page">
      <div className="section-heading">
        <span>Satori Before & After</span>
        <h1>Skin transformation visuals for a simple nightly ritual.</h1>
        <p>
          This page uses visual references and plain-language expectations. We
          only label images as customer results when photos and permissions are
          verified.
        </p>
      </div>
      <div className="visual-card-grid page-grid">
        {pdpBeforeAfterAssets.map((asset, index) => (
          <SatoriImageCard
            asset={asset}
            badge={`Visual reference ${index + 1}`}
            className="before-after-card"
            key={asset.key}
            priority={index === 0}
          />
        ))}
      </div>
      <div className="center-cta">
        <p>
          Results vary by skin type, age, lifestyle, consistency, and routine.
        </p>
        <Link className="button teal" href="/products/satori-cream">
          Shop Satori Cream
        </Link>
      </div>
    </section>
  );
}
