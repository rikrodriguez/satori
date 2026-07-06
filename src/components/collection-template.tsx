import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/store";

export type CollectionTemplateContent = {
  description: string;
  eyebrow: string;
  highlights: readonly string[];
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  title: string;
};

export function CollectionTemplate({
  content,
  products,
}: {
  content: CollectionTemplateContent;
  products: Product[];
}) {
  return (
    <main className="collection-detail-page">
      <section className="collection-detail-hero">
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.description}</p>
          <div className="collection-detail-actions">
            <Link className="button teal" href={content.primaryHref}>
              {content.primaryCta} <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" href={content.secondaryHref}>
              {content.secondaryCta}
            </Link>
          </div>
        </div>
        <aside className="collection-detail-card">
          <span>Shopping Path</span>
          <h2>Built around the ritual.</h2>
          <p>
            Every path keeps the choice simple: start with Satori Cream, then
            choose the rhythm, bundle, or membership that fits your routine.
          </p>
        </aside>
      </section>

      <section className="collection-highlight-row" aria-label="Collection highlights">
        {content.highlights.map((highlight) => (
          <article key={highlight}>
            <CheckCircle2 size={20} />
            <span>{highlight}</span>
          </article>
        ))}
      </section>

      <section className="collection-products-section">
        <div className="section-heading">
          <span>Products In This Path</span>
          <h2>Choose your Satori ritual.</h2>
        </div>
        <div className="product-grid">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} priority={index < 2} />
          ))}
        </div>
      </section>
    </main>
  );
}
