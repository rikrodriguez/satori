import Link from "next/link";
import { BadgeCheck, FlaskConical, Leaf, Moon, ShieldCheck } from "lucide-react";
import { Newsletter } from "@/components/newsletter";
import { ProductVisual, SatoriImageCard } from "@/components/product-visual";
import { ProductPurchase } from "@/components/product-purchase";
import { faq, testimonials } from "@/lib/store";
import { absoluteUrl } from "@/lib/seo";
import {
  pdpBeforeAfterAssets,
  pdpReviewAssets,
  pdpUgcAssets,
  productGalleryAssets,
  satoriAssets,
} from "@/lib/visual-assets";

const galleryBadges = ["Science-led", "Daily cream", "Texture", "In hand"];

export const metadata = {
  title: "Satori Cream | Science-Led Anti-Aging Skin Ritual",
  description:
    "Shop Satori Cream, the science-led skincare ritual for smoother-looking, calmer-looking, hydrated skin.",
  alternates: {
    canonical: "/products/satori-cream",
  },
  openGraph: {
    title: "Satori Cream | Science-Led Anti-Aging Skin Ritual",
    description:
      "Shop Satori Cream, the simple daily ritual for hydration, texture, redness support, and smoother-looking skin.",
    url: "/products/satori-cream",
    images: [satoriAssets.pdpMainProductFront.src],
  },
};

const howItWorksSteps = [
  {
    title: "Cleanse",
    text: "Start with clean, dry skin before your nightly ritual.",
    image: satoriAssets.pdpProductLifestyle,
    className: "step-visual--cleanse",
  },
  {
    title: "Apply",
    text: "Massage a small amount into face and neck.",
    image: satoriAssets.pdpUgcPhoto03,
    className: "step-visual--apply",
  },
  {
    title: "Leave Overnight",
    text: "Let the formula absorb while you rest, then repeat nightly.",
    image: satoriAssets.pdpApplication03,
    className: "step-visual--overnight",
  },
] as const;

export function SatoriCreamPage() {
  return (
    <>
      <ProductStructuredData />
      <ProductHeroSection />
      <ProductDetailsSection />
      <ProductIngredientsSection />
      <ProductFaqPreviewSection />
      <ProductHowItWorksSection />
      <ProductBeforeAfterSection />
      <ProductRitualStoriesSection />
      <ProductCommunitySection />
      <ProductRitualNotesSection />
      <ProductFinalCtaSection />
      <ProductFeatureIconsSection />
      <Newsletter />
    </>
  );
}

function ProductStructuredData() {
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Satori Cream",
    image: [
      absoluteUrl(satoriAssets.pdpMainProductFront.src),
      absoluteUrl(satoriAssets.pdpProductAngle.src),
      absoluteUrl(satoriAssets.pdpProductTexture.src),
    ],
    description:
      "Science-led skincare positioning in a daily anti-aging cream ritual for smoother-looking, calmer-looking, hydrated skin.",
    brand: {
      "@type": "Brand",
      name: "Satori Organic Skin Care",
    },
    offers: {
      "@type": "Offer",
      price: "39.99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/products/satori-cream"),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
    />
  );
}

function ProductHeroSection() {
  return (
    <section className="pdp" id="shop">
      <div className="pdp-gallery">
        {productGalleryAssets.map((asset, index) => (
          <div key={asset.key} className={index === 0 ? "featured" : ""}>
            <ProductVisual
              badge={galleryBadges[index]}
              priority={index === 0}
              src={asset}
              variant={index === 0 ? "gallery" : "card"}
            />
          </div>
        ))}
      </div>
      <ProductPurchase />
    </section>
  );
}

function ProductDetailsSection() {
  return (
    <section className="detail-intro" id="details">
      <div>
        <span className="eyebrow">Details</span>
        <h2>What is Satori Cream?</h2>
        <p>
          Satori Cream is the premium daily skin ritual designed to visibly
          support smoother texture, fine lines, hydration, redness, and glow. It
          is built around science-led skincare positioning and made for people
          who want a serious routine without needles, downtime, or a crowded
          shelf.
        </p>
      </div>
      <ProductVisual
        badge="Satori Cream"
        src={satoriAssets.pdpProductLifestyle}
        variant="story"
      />
    </section>
  );
}

function ProductIngredientsSection() {
  return (
    <section className="detail-intro ingredient-story" id="ingredients">
      <SatoriImageCard
        asset={satoriAssets.pdpIngredientsFlatlay}
        badge="Ingredients"
        sizes="(max-width: 860px) 100vw, 50vw"
      />
      <div>
        <span className="eyebrow">Ingredients</span>
        <h2>Plant-powered hydration in a clean cream ritual.</h2>
        <p>
          Satori is positioned as a cosmetic cream for the appearance of fine
          lines, dullness, dryness, texture, and redness. Consistency matters
          more than intensity.
        </p>
      </div>
    </section>
  );
}

function ProductFaqPreviewSection() {
  return (
    <section className="accordion-section" id="faq">
      <div className="section-heading">
        <span>You ask and we answer</span>
        <h2>FAQ&apos;s</h2>
      </div>
      <div className="accordion-grid">
        <details open>
          <summary>How to apply for best results</summary>
          <p>
            Cleanse, pat dry, apply a pea-sized amount, and massage until
            absorbed. Use morning and night, with the nightly ritual treated as
            the non-negotiable step.
          </p>
        </details>
        <details>
          <summary>Understand the details</summary>
          <p>
            Satori is positioned as a cosmetic cream for the appearance of fine
            lines, dullness, dryness, texture, and redness. Consistency matters
            more than intensity.
          </p>
        </details>
        <details>
          <summary>Ingredients</summary>
          <p>
            Plant-powered hydration, barrier-supporting oils, and a clean cream
            base designed for a simple daily ritual.
          </p>
        </details>
        {faq.map((item) => (
          <details key={item.q}>
            <summary>{item.q}</summary>
            <p>{item.a}</p>
          </details>
        ))}
        <details>
          <summary>Our Promise</summary>
          <p>
            Great skin takes time, so Satori gives customers a 60-day risk-free
            routine window and clear support for getting started.
          </p>
        </details>
      </div>
      <div className="accordion-cta">
        <Link className="button ghost" href="/pages/faq">
          View Complete FAQ
        </Link>
      </div>
    </section>
  );
}

function ProductHowItWorksSection() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div>
        <span className="eyebrow">How Do Satori Results Work?</span>
        <h2>Your nightly ritual for calmer, smoother-looking skin.</h2>
        <p>
          Cleanse, apply a small amount, and let the formula absorb overnight. A
          simple routine designed to support softer, calmer-looking skin over
          time.
        </p>
      </div>
      <div className="steps-grid application-grid">
        {howItWorksSteps.map((step, index) => (
          <article key={step.title}>
            <ProductVisual
              badge={`STEP ${index + 1}`}
              className={`step-visual ${step.className}`}
              src={step.image}
              variant="card"
            />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductBeforeAfterSection() {
  return (
    <section className="real-results">
      <div className="section-heading">
        <span>Skin Transformation Visuals</span>
        <h2>A closer look at visible-looking change.</h2>
      </div>
      <div className="visual-card-grid">
        {pdpBeforeAfterAssets.map((asset, index) => (
          <SatoriImageCard
            asset={asset}
            badge={`Visual reference ${index + 1}`}
            className="before-after-card"
            key={asset.key}
          />
        ))}
      </div>
      <Link className="button teal" href="/pages/before-after">
        View More
      </Link>
    </section>
  );
}

function ProductRitualStoriesSection() {
  return (
    <section className="testimonial-slider">
      <div>
        <span className="eyebrow">Ritual Stories</span>
        <h2>Simple ritual notes for a routine customers can repeat.</h2>
      </div>
      <div className="review-grid horizontal">
        {testimonials.map((review, index) => (
          <article key={review.name}>
            <SatoriImageCard
              asset={pdpReviewAssets[index % pdpReviewAssets.length]}
              className="review-avatar-card"
              sizes="(max-width: 860px) 82vw, 280px"
            />
            <span>Ritual note</span>
            <h3>&quot;{review.title}&quot;</h3>
            <p>{review.body}</p>
            <strong>{review.name}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductCommunitySection() {
  return (
    <section className="ugc-section">
      <div className="section-heading">
        <span>Satori Community</span>
        <h2>A daily ritual that feels easy to repeat.</h2>
      </div>
      <div className="visual-card-grid ugc-grid">
        {pdpUgcAssets.map((asset, index) => (
          <SatoriImageCard
            asset={asset}
            badge={`Satori ${index + 1}`}
            className="ugc-card"
            key={asset.key}
          />
        ))}
      </div>
    </section>
  );
}

function ProductRitualNotesSection() {
  return (
    <section className="judgeme-style" id="reviews">
      <h2>Ritual Notes</h2>
      <div className="ratings-snapshot">
        <strong>4</strong>
        <span>skin ritual notes</span>
        <p>
          Read simple ritual notes around hydration, texture, glow, and
          consistency from the Satori skincare experience.
        </p>
        <Link className="button ghost" href="/pages/reviews">
          Read Ritual Notes
        </Link>
      </div>
      <div className="review-grid">
        {testimonials.map((review, index) => (
          <article key={review.name}>
            <SatoriImageCard
              asset={pdpReviewAssets[index % pdpReviewAssets.length]}
              className="review-avatar-card"
            />
            <span>Ritual note</span>
            <h3>{review.title}</h3>
            <p>{review.body}</p>
            <strong>{review.name}</strong>
            <small>{review.location}</small>
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductFinalCtaSection() {
  return (
    <section className="final-cta-section">
      <div>
        <span className="eyebrow">Start Your Satori Ritual</span>
        <h2>One cream, one repeatable habit.</h2>
        <p>
          Keep the routine simple: cleanse, apply a small amount, and stay
          consistent. A gentle nightly ritual designed to support softer,
          calmer-looking skin over time.
        </p>
        <Link className="button teal final-cta-button" href="#shop">
          Start Your Ritual
        </Link>
      </div>
      <div className="final-cta-visuals">
        <SatoriImageCard
          asset={satoriAssets.pdpFinalCtaModel}
          className="final-cta-lifestyle"
          sizes="(max-width: 860px) 100vw, 52vw"
        />
      </div>
    </section>
  );
}

function ProductFeatureIconsSection() {
  const featureItems = [
    ["Science-Led", FlaskConical],
    ["Plant-Powered", Leaf],
    ["Night Ritual", Moon],
    ["Checkout Safe", ShieldCheck],
    ["Member Pricing", BadgeCheck],
  ] as const;

  return (
    <section className="feature-icons">
      {featureItems.map(([label, Icon]) => (
        <div key={label}>
          <Icon size={28} />
          <span>{label}</span>
        </div>
      ))}
    </section>
  );
}
