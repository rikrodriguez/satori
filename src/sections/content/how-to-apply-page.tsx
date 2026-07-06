import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import { pdpApplicationAssets, satoriAssets } from "@/lib/visual-assets";

export const metadata = {
  title: "How To Apply Satori Cream",
  description:
    "Learn how to apply Satori Cream morning and night for a simple, repeatable anti-aging skincare ritual.",
  alternates: {
    canonical: "/pages/how-to-apply",
  },
};

const applicationSteps = [
  {
    body: "Wash gently and pat skin dry.",
    fit: "cover",
    image: satoriAssets.homeBlogThumb02,
    title: "Cleanse",
  },
  {
    body: "Massage a pea-sized amount of Satori Cream onto face and neck.",
    fit: "cover",
    image: pdpApplicationAssets[1],
    title: "Apply",
  },
  {
    body: "Make it the final step of your evening routine.",
    fit: "cover",
    image: satoriAssets.pdpUgcPhoto03,
    title: "Use nightly",
  },
  {
    body: "Use daily for 30 nights before judging the ritual.",
    fit: "cover",
    image: satoriAssets.homeProductSecondary03,
    title: "Stay consistent",
  },
  {
    body: "Keep using as needed for hydration, texture, and glow.",
    fit: "contain",
    image: satoriAssets.pdpMainProductFront,
    title: "Maintain",
  },
] as const;

export default function HowToApplyPage() {
  return (
    <section className="simple-page">
      <div className="section-heading">
        <span>How To Apply</span>
        <h1>Your path to smoother-looking skin.</h1>
        <p>
          A simple instruction page built around a repeatable cream
          ritual people can repeat.
        </p>
      </div>
      <div className="steps-grid large-steps">
        {applicationSteps.map((step, index) => (
          <article key={step.title}>
            <div className="how-to-step-visual">
              <ProductVisual
                alt={`Satori how-to step: ${step.title}`}
                badge=""
                fit={step.fit}
                priority={index === 0}
                src={step.image}
                variant="card"
              />
              <span>Step {index + 1}</span>
            </div>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </div>
      <div className="center-cta">
        <Link className="button teal" href="/products/satori-cream">
          Start My Satori Ritual
        </Link>
      </div>
    </section>
  );
}
