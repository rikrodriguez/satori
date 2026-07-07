import Link from "next/link";
import { BadgeCheck, MessageSquareText, ShieldCheck, ShoppingBag } from "lucide-react";
import { SatoriImageCard } from "@/components/product-visual";
import {
  reviewFilters,
  reviewProofChecklist,
  reviewQuestions,
  reviewRegistryItems,
  reviewRegistryStats,
  testimonials,
} from "@/lib/store";
import { pdpBeforeAfterAssets, pdpReviewAssets } from "@/lib/visual-assets";

export const metadata = {
  title: "Satori Reviews & Ritual Notes",
  description:
    "Satori ritual notes, skin concern filters, visual references, and customer Q&A for smoother-looking, hydrated skin.",
  alternates: {
    canonical: "/pages/reviews",
  },
};

export default function ReviewsPage() {
  return (
    <main className="reviews-page">
      <section className="reviews-hero">
        <div>
          <span className="eyebrow">Reviews & Ritual Notes</span>
          <h1>Simple skin ritual notes for smarter expectations.</h1>
          <p>
            Explore Satori ritual notes by concern, visual references, and the
            standards we use before calling any story a verified customer
            result.
          </p>
          <div className="reviews-hero-actions">
            <Link className="button teal" href="/products/satori-cream">
              Shop Satori Cream
            </Link>
            <Link className="button ghost" href="#review-questions">
              Review Q&A
            </Link>
          </div>
        </div>
        <aside className="reviews-integrity-card">
          <ShieldCheck size={36} />
          <h2>Trust-first by design.</h2>
          <p>
            Verified badges, star averages, and before/after claims are only
            used when the source, permission, and routine context are clear.
          </p>
        </aside>
      </section>

      <section className="review-snapshot">
        {reviewRegistryStats.map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="review-filter-section">
        <div className="section-heading">
          <span>Skin Concern Filters</span>
          <h2>Browse notes by what shoppers care about.</h2>
          <p>
            Use the ritual notes to understand how Satori supports hydration,
            texture, glow, and a calmer-looking daily routine.
          </p>
        </div>
        <div className="review-filter-row">
          {reviewFilters.map((filter) => (
            <span key={filter}>{filter}</span>
          ))}
        </div>
      </section>

      <section className="review-registry-grid">
        {reviewRegistryItems.map((review, index) => (
          <article key={review.title}>
            <SatoriImageCard
              asset={pdpReviewAssets[index % pdpReviewAssets.length]}
              badge={review.concern}
              className="review-registry-image"
              sizes="(max-width: 860px) 100vw, 25vw"
            />
            <div>
              <span>{review.rating}</span>
              <h2>{review.title}</h2>
              <p>{review.body}</p>
              <small>{review.meta}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="review-story-section">
        <div className="section-heading">
          <span>Ritual Notes</span>
          <h2>Simple notes for a repeatable nightly routine.</h2>
          <p>
            These notes explain the Satori routine in clear, responsible
            language before you start.
          </p>
        </div>
        <div className="review-grid">
          {testimonials.map((review, index) => (
            <article key={review.name + "-" + index}>
              <span>Ritual note</span>
              <h3>&quot;{review.title}&quot;</h3>
              <p>{review.body}</p>
              <strong>{review.name}</strong>
              <small>{review.location}</small>
            </article>
          ))}
        </div>
      </section>

      <section className="visual-proof-section">
        <div>
          <span className="eyebrow">Visual References</span>
          <h2>Visual references are labeled with care.</h2>
          <p>
            Satori uses visual references for expectation-setting. Customer
            result claims require permission, dates, lighting context, and
            routine notes.
          </p>
          <Link className="button teal" href="/pages/before-after">
            View Visuals
          </Link>
        </div>
        <div className="visual-proof-grid">
          {pdpBeforeAfterAssets.slice(0, 2).map((asset, index) => (
            <SatoriImageCard
              asset={asset}
              badge={index === 0 ? "Visual context" : "Permission required"}
              className="visual-proof-card"
              key={asset.key}
            />
          ))}
        </div>
      </section>

      <section className="proof-checklist-section">
        <div className="section-heading">
          <span>Trust Standards</span>
          <h2>What Satori verifies before making review claims.</h2>
        </div>
        <div className="proof-checklist-grid">
          {reviewProofChecklist.map((item) => (
            <article key={item}>
              <BadgeCheck size={20} />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="review-question-section" id="review-questions">
        <div className="section-heading">
          <span>Review Q&A</span>
          <h2>Answers that protect trust.</h2>
        </div>
        <div className="faq-accordion-list">
          {reviewQuestions.map((item, index) => (
            <details key={item.q} open={index === 0}>
              <summary>
                <MessageSquareText size={18} /> {item.q}
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="reviews-final-cta">
        <div>
          <span className="eyebrow">Start Your Ritual</span>
          <h2>Ready to keep skincare simple?</h2>
          <p>
            Start with one nightly cream step designed to support softer,
            calmer-looking skin over time.
          </p>
        </div>
        <Link className="button teal" href="/products/satori-cream">
          Shop Satori Cream <ShoppingBag size={18} />
        </Link>
      </section>
    </main>
  );
}
