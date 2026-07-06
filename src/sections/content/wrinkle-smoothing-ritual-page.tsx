import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  Moon,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { LandingAddToCart } from "@/components/landing-add-to-cart";
import { ProductVisual, SatoriImageCard } from "@/components/product-visual";
import { TrackingEvent } from "@/components/tracking-event";
import {
  bundles,
  formatPrice,
  heroProduct,
  paidLandingModules,
  paidTrafficOffer,
  proofGuardrails,
} from "@/lib/store";
import {
  homeEditorialAssets,
  pdpApplicationAssets,
  pdpUgcAssets,
  satoriAssets,
} from "@/lib/visual-assets";

const paidLandingRoute = "/pages/satori-wrinkle-smoothing-ritual";

export const metadata = {
  title: "Satori Wrinkle-Smoothing Ritual",
  description:
    "Start the Satori wrinkle-smoothing ritual for hydration, smoother-looking texture, and a calmer-looking glow without needles or downtime.",
  alternates: {
    canonical: paidLandingRoute,
  },
  openGraph: {
    title: "Satori Wrinkle-Smoothing Ritual",
    description:
      "A simple nightly skin ritual for hydration, texture support, and a calmer-looking glow.",
    url: paidLandingRoute,
    images: [satoriAssets.pdpFinalCtaModel.src],
  },
};

const proofSteps = [
  "Permission",
  "Timeline",
  "Lighting context",
  "Routine notes",
];

const ritualMoments = [
  {
    id: "no-needle-ritual",
    badge: "Night routine",
    title: "A no-needle ritual that feels easy to start.",
    body:
      "One cream step helps keep the routine calm, premium, and repeatable.",
  },
  {
    id: "nightly-consistency",
    badge: "Consistency",
    title: "The ritual gets stronger when it becomes automatic.",
    body:
      "Cleanse, apply a small amount, and let consistency carry the visible-looking change.",
  },
  {
    id: "starter-kit-value",
    badge: "Starter value",
    title: "Choose the path that matches your routine.",
    body:
      "Start with one jar, stock up with the Duo, or commit to the Ritual Kit.",
  },
];

export default function PaidRitualLandingPage() {
  const featuredBundles = bundles.slice(0, 3);

  return (
    <>
      <TrackingEvent
        eventName="ViewContent"
        payload={{
          content_ids: [heroProduct.id],
          content_name: "Satori wrinkle-smoothing ritual landing",
          content_type: "landing_page",
          value: heroProduct.price,
        }}
      />

      <section className="paid-ritual-hero">
        <div className="paid-ritual-copy">
          <span className="eyebrow">{paidTrafficOffer.eyebrow}</span>
          <h1>{paidTrafficOffer.title}</h1>
          <p>{paidTrafficOffer.subtitle}</p>
          <div className="paid-ritual-actions">
            <Link className="button teal" href="#offer">
              {paidTrafficOffer.primaryCta}
              <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" href="#mechanism">
              {paidTrafficOffer.secondaryCta}
            </Link>
          </div>
          <div className="paid-ritual-pills">
            <span>No needles</span>
            <span>2-minute ritual</span>
            <span>60-day window</span>
          </div>
        </div>
        <ProductVisual
          alt="Satori Cream wrinkle-smoothing nightly ritual"
          badge="Start tonight"
          className="paid-ritual-visual"
          priority
          src={satoriAssets.pdpFinalCtaModel}
          variant="hero"
        />
      </section>

      <section className="paid-ritual-proofbar">
        {[
          ["15%", "Subscribe & Save"],
          ["$69.99", "Duo value"],
          ["$99.99", "Ritual Kit"],
          ["60 days", "Ritual window"],
        ].map(([value, label]) => (
          <div key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section className="paid-ritual-mechanism" id="mechanism">
        <div>
          <span className="eyebrow">The Mechanism</span>
          <h2>Less friction. More consistency. Better-looking mornings.</h2>
          <p>
            Satori turns anti-aging into one repeatable cream step: hydrate,
            support smoother-looking texture, and keep the routine calm enough
            to repeat for 30 nights.
          </p>
        </div>
        <div className="paid-ritual-module-grid">
          {paidLandingModules.map((module, index) => {
            const icons = [Moon, Sparkles, ShieldCheck];
            const Icon = icons[index] ?? BadgeCheck;
            return (
              <article key={module.label}>
                <Icon size={26} />
                <span>{module.label}</span>
                <h3>{module.title}</h3>
                <p>{module.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="paid-ritual-demo">
        <div className="section-heading">
          <span>Nightly Application</span>
          <h2>Cleanse. Apply. Let the ritual work quietly.</h2>
        </div>
        <div className="paid-ritual-demo-grid">
          {pdpApplicationAssets.map((asset, index) => (
            <article key={asset.key}>
              <SatoriImageCard
                asset={asset}
                badge={`Step ${index + 1}`}
                className="paid-ritual-image"
              />
              <h3>{["Clean skin", "Small amount", "Repeat nightly"][index]}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="paid-ritual-offer" id="offer">
        <div className="section-heading">
          <span>Start Here</span>
          <h2>Choose the Satori ritual path.</h2>
          <p>
            The offer mirrors what proven anti-aging brands do well: starter
            product, bundle value, subscription savings, and a clear path for
            repeat use.
          </p>
        </div>
        <div className="paid-ritual-bundle-grid">
          {featuredBundles.map((product) => (
            <article key={product.id}>
              <ProductVisual
                badge={product.badge}
                src={product.image}
                variant="card"
              />
              <div>
                <span>{product.badge}</span>
                <h3>{product.name}</h3>
                <p>{product.subtitle}</p>
                <strong>{formatPrice(product.price)}</strong>
                <LandingAddToCart
                  id={product.id}
                  image={product.cartImage.src}
                  label="Add"
                  name={product.name}
                  price={product.price}
                />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="paid-ritual-proof">
        <div>
          <span className="eyebrow">Responsible Results</span>
          <h2>Before-and-after visuals should stay clear and trustworthy.</h2>
          <p>
            Satori keeps visual results responsible with clear routine context,
            realistic cosmetic language, and respectful expectations.
          </p>
          <div className="proof-step-row">
            {proofSteps.map((step) => (
              <span key={step}>{step}</span>
            ))}
          </div>
        </div>
        <div className="paid-ritual-proof-visuals">
          {pdpUgcAssets.slice(0, 2).map((asset, index) => (
            <SatoriImageCard
              asset={asset}
              badge={index === 0 ? "Routine visual" : "Texture visual"}
              className="paid-ritual-proof-card"
              key={asset.key}
            />
          ))}
        </div>
      </section>

      <section className="paid-ritual-ugc">
        <div className="section-heading">
          <span>Ritual Moments</span>
          <h2>Three reasons the Satori ritual feels easy to repeat.</h2>
          <p>
            The routine is intentionally simple: one cream step, a calm nightly
            rhythm, and product paths that make consistency easier.
          </p>
        </div>
        <div className="paid-ritual-angle-grid">
          {ritualMoments.map((moment, index) => (
            <article key={moment.id}>
              <SatoriImageCard
                asset={pdpUgcAssets[index % pdpUgcAssets.length]}
                badge={moment.badge}
                className="paid-ritual-image"
              />
              <span>{moment.badge}</span>
              <h3>{moment.title}</h3>
              <p>{moment.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="paid-ritual-compliance">
        <div>
          <FlaskConical size={32} />
          <h2>Strong skincare positioning, responsible claims.</h2>
          <p>
            Satori can feel confident and premium while keeping every promise
            cosmetic, respectful, and grounded in what a cream ritual can
            responsibly support.
          </p>
        </div>
        <ul>
          {proofGuardrails.map((rule) => (
            <li key={rule}>
              <ShieldCheck size={18} />
              {rule}
            </li>
          ))}
        </ul>
      </section>

      <section className="paid-ritual-final">
        <SatoriImageCard
          asset={homeEditorialAssets.gentle}
          className="paid-ritual-final-image"
          sizes="(max-width: 860px) 100vw, 48vw"
        />
        <div>
          <span className="eyebrow">Satori Cream</span>
          <h2>Make the first night easy.</h2>
          <p>
            Start with the cream, upgrade to the Duo or Ritual Kit when the
            routine makes sense, and keep the ritual simple enough to repeat.
          </p>
          <Link className="button teal" href="#offer">
            Choose your ritual
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
