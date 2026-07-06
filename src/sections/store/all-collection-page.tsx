import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CollectionControls } from "@/components/collection-controls";
import { ProductCard } from "@/components/product-card";
import { bundles, collectionTaxonomy } from "@/lib/store";

export const metadata = {
  title: "Shop All Satori Products",
  description:
    "Shop Satori Cream, bundles, and Golden Skin Club offers for a simple anti-aging skincare ritual.",
  alternates: {
    canonical: "/collections/all",
  },
};

export default function CollectionPage() {
  return (
    <section className="collection-page" id="start-here">
      <div className="section-heading">
        <span>Collection: Products</span>
        <h1>Shop All</h1>
        <p>
          Everything in the Satori ritual: Satori Cream, stock-up bundles,
          Subscribe & Save, Golden Skin Club, and concern-led shopping paths.
        </p>
      </div>

      <nav className="collection-taxonomy" aria-label="Satori shopping paths">
        {collectionTaxonomy.map((item) => (
          <Link className="collection-taxonomy-card" href={item.href} id={item.id} key={item.id}>
            <span>{item.eyebrow}</span>
            <h2>{item.label}</h2>
            <p>{item.body}</p>
            <small>
              Open path <ArrowRight size={15} />
            </small>
          </Link>
        ))}
      </nav>

      <CollectionControls
        categories={collectionTaxonomy.map((item) => ({
          href: item.href,
          label: item.label,
        }))}
        productCount={bundles.length}
      />

      <div className="product-grid" id="bundles">
        {bundles.map((product, index) => (
          <ProductCard product={product} key={product.id} priority={index < 2} />
        ))}
      </div>

      <div className="collection-route-summary" id="bulk">
        <h2>A simple store built around one nightly ritual.</h2>
        <p>
          Start with one jar, stock up for consistency, subscribe before the
          routine runs out, or join Golden Skin Club for member benefits.
        </p>
        <div>
          <Link className="button teal" href="/collections/bundles">
            Shop Bundles
          </Link>
          <Link className="button ghost" href="/collections/solutions">
            Shop By Concern
          </Link>
        </div>
      </div>
    </section>
  );
}
