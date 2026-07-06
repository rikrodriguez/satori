import Link from "next/link";
import { ArrowRight, BadgeCheck, HelpCircle, ShieldCheck } from "lucide-react";
import { faqCategories } from "@/lib/store";

export const metadata = {
  title: "Satori FAQ | Product, Shipping, Results & Membership",
  description:
    "Answers about Satori Cream, how to apply it, visible-looking results, sensitive skin, shipping, guarantee, Subscribe & Save, and Golden Skin Club.",
  alternates: {
    canonical: "/pages/faq",
  },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqCategories.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      })),
    ),
  };

  return (
    <main className="faq-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="faq-hero">
        <div>
          <span className="eyebrow">Satori Help Center</span>
          <h1>Everything customers need to feel confident.</h1>
          <p>
            Product basics, application, expectations, sensitive skin, shipping,
            guarantees, subscriptions, and membership details in one clear FAQ.
          </p>
          <div className="faq-hero-actions">
            <Link className="button teal" href="/products/satori-cream">
              Shop Satori Cream <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" href="/pages/how-to-apply">
              How To Apply
            </Link>
          </div>
        </div>
        <aside className="faq-support-card">
          <HelpCircle size={34} />
          <h2>Quick support notes</h2>
          <p>
            Keep claims cosmetic, keep the ritual simple, and send shoppers to
            the product page when they are ready to buy.
          </p>
          <div>
            <span>
              <BadgeCheck size={18} /> Cosmetic positioning
            </span>
            <span>
              <ShieldCheck size={18} /> 60-day ritual window
            </span>
          </div>
        </aside>
      </section>

      <nav className="faq-category-nav" aria-label="FAQ categories">
        {faqCategories.map((category) => (
          <Link href={`#${category.id}`} key={category.id}>
            <span>{category.eyebrow}</span>
            {category.title}
          </Link>
        ))}
      </nav>

      <section className="faq-category-list">
        {faqCategories.map((category, categoryIndex) => (
          <article className="faq-category" id={category.id} key={category.id}>
            <div className="faq-category-heading">
              <span>{category.eyebrow}</span>
              <h2>{category.title}</h2>
              <p>
                {categoryIndex === 0
                  ? "The essential questions shoppers ask before they understand the product."
                  : "Use these answers to reduce friction and keep the buying journey moving."}
              </p>
            </div>
            <div className="faq-accordion-list">
              {category.items.map((item, index) => (
                <details key={item.q} open={categoryIndex === 0 && index === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </article>
        ))}
      </section>

      <section className="faq-final-cta">
        <div>
          <span className="eyebrow">Still deciding?</span>
          <h2>Start with one simple nightly ritual.</h2>
          <p>
            The strongest Satori story is not more complexity. It is one cream,
            one repeatable habit, and clear expectations.
          </p>
        </div>
        <div className="faq-final-actions">
          <Link className="button teal" href="/products/satori-cream">
            View Product
          </Link>
          <Link className="button ghost" href="/pages/how-to-apply">
            How To Apply
          </Link>
        </div>
      </section>
    </main>
  );
}
