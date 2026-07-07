import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Leaf,
  Moon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Newsletter } from "@/components/newsletter";
import { ProductCard } from "@/components/product-card";
import { HeroPicture, ProductVisual, SatoriImageCard } from "@/components/product-visual";
import { blogPosts, bundles, concerns, proofStats, testimonials } from "@/lib/store";
import {
  homeBeforeAfterAssets,
  homeEditorialAssets,
  homeHeroAssets,
} from "@/lib/visual-assets";

export function HomePage() {
  return (
    <>
      <HomeHeroSection />
      <HomeProductStartSection />
      <HomeConcernsSection />
      <HomeBeforeAfterSection />
      <HomeCreamRitualSection />
      <HomeReviewsSection />
      <HomeTrustIconsSection />
      <HomeScienceStorySection />
      <HomeBlogSection />
      <Newsletter />
    </>
  );
}

function HomeHeroSection() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">Skin ritual, simplified</span>
        <h1>Science-led skincare for smoother-looking skin.</h1>
        <p>
          Satori Cream is the nightly anti-aging ritual designed to support
          hydration, texture, redness, elasticity, and glow without injections
          or harsh routines.
        </p>
        <div className="hero-actions">
          <Link className="button teal" href="/products/satori-cream">
            Shop Now <ArrowRight size={18} />
          </Link>
          <Link className="button ghost" href="/pages/before-after">
            See Before & After
          </Link>
        </div>
        <div className="trust-row">
          <span>
            <BadgeCheck size={18} /> Science-Led Ritual
          </span>
          <span>
            <Leaf size={18} /> Organic & Clean
          </span>
          <span>
            <ShieldCheck size={18} /> 60-Day Guarantee
          </span>
        </div>
      </div>
      <div className="hero-media">
        <HeroPicture desktop={homeHeroAssets.desktop} mobile={homeHeroAssets.mobile} />
        <div className="hero-card">
          <span>Start Here</span>
          <strong>Satori Cream</strong>
          <p>The simple daily ritual your skin can stick with.</p>
        </div>
      </div>
    </section>
  );
}

function HomeProductStartSection() {
  return (
    <section className="product-start" id="start-here">
      <div className="section-heading">
        <span>Everything You Need To Start</span>
        <h2>Everything you need to start the Satori ritual.</h2>
      </div>
      <div className="product-grid">
        {bundles.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </section>
  );
}

function HomeConcernsSection() {
  return (
    <section className="concerns-section" id="concerns">
      <div className="section-heading">
        <span>Skin Concerns</span>
        <h2>If your skin looks like this, Satori was built for the ritual.</h2>
      </div>
      <div className="concern-grid">
        {concerns.map((concern) => (
          <div className="concern-card" key={concern.title}>
            <Image
              alt={concern.alt}
              height={1200}
              loading="lazy"
              quality={82}
              sizes="(max-width: 620px) 50vw, (max-width: 1260px) 33vw, 16vw"
              src={concern.image}
              width={1200}
            />
            <h3>{concern.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function HomeBeforeAfterSection() {
  return (
    <section className="before-after">
      <div className="section-heading">
        <span>Skin Transformation Visuals</span>
        <h2>Visual references for smoother, calmer-looking skin.</h2>
      </div>
      <div className="visual-card-grid">
        {homeBeforeAfterAssets.map((asset, index) => (
          <SatoriImageCard
            asset={asset}
            badge={`Visual ${index + 1}`}
            className={`before-after-card before-after-card--${index + 1}`}
            key={asset.key}
          />
        ))}
      </div>
    </section>
  );
}

function HomeCreamRitualSection() {
  return (
    <section className="og-section">
      <div>
        <span className="eyebrow">The Satori Cream</span>
        <h2>The low-lift, high-consistency anti-aging ritual.</h2>
        <p>
          Think of Satori as beauty sleep in a jar. Cleanse, apply, and let your
          skin wake up looking more hydrated, smoother, and calmer. The best
          ritual is the one you actually repeat.
        </p>
        <Link className="button teal" href="/products/satori-cream">
          Shop Satori Cream
        </Link>
      </div>
      <ProductVisual
        alt="Satori Cream vanity ritual image"
        badge="Daily ritual"
        src={homeEditorialAssets.gentle}
        variant="story"
      />
    </section>
  );
}

function HomeReviewsSection() {
  return (
    <section className="reviews-section" id="reviews">
      <div className="section-heading">
        <span>Ritual Stories</span>
        <h2>The tone and density of a beauty brand built to convert.</h2>
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
  );
}

function HomeTrustIconsSection() {
  const trustItems = [
    ["Trackable Shipments", ShieldCheck],
    ["Checkout Safe", BadgeCheck],
    ["Rewards Program", Sparkles],
    ["Plant Based Skincare", Leaf],
    ["60-Day Returns", ShieldCheck],
    ["Nightly Ritual", Moon],
  ] as const;

  return (
    <section className="trust-icons">
      {trustItems.map(([label, Icon]) => (
        <div key={label}>
          <Icon size={30} />
          <h3>{label}</h3>
        </div>
      ))}
    </section>
  );
}

function HomeScienceStorySection() {
  return (
    <section className="science-story">
      <ProductVisual
        alt="Satori Cream science visual"
        badge="Science-led"
        src={homeEditorialAssets.brandStory}
        variant="story"
      />
      <div>
        <span className="eyebrow">Science-Led Skincare</span>
        <h2>Where legacy beauty brands use heritage, Satori can use clarity.</h2>
        <p>
          The Satori story is built around a premium science-led edge: a cream
          ritual that keeps the mechanism simple, cosmetic, and easy to repeat.
        </p>
        <div className="stat-grid">
          {proofStats.map(([value, label]) => (
            <div key={value}>
              <strong>{value}</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HomeBlogSection() {
  return (
    <section className="blog-section">
      <div className="section-heading">
        <span>Satori Pro-Aging Skincare Blog</span>
        <h2>Education that sells the ritual before the product.</h2>
      </div>
      <div className="blog-grid">
        {blogPosts.map((post, index) => (
          <Link href={post.href} key={post.title}>
            <SatoriImageCard
              asset={post.image}
              badge="Learn More"
              priority={index === 0}
            />
            <span>Learn More</span>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
