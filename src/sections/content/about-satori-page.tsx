import { ProductVisual } from "@/components/product-visual";
import { satoriAssets } from "@/lib/visual-assets";

export const metadata = {
  title: "About Satori",
  description:
    "Learn how Satori turns science-led skincare positioning into one simple daily anti-aging cream ritual.",
  alternates: {
    canonical: "/pages/about-satori",
  },
};

export default function AboutSatoriPage() {
  return (
    <section className="about-page">
      <div>
        <span className="eyebrow">About Satori</span>
        <h1>Science-led skincare, simplified into one daily cream.</h1>
        <p>
          Legacy beauty brands use heritage as authority. Satori uses a
          sharper approach: science-led skincare positioning translated into a
          clean, repeatable anti-aging ritual.
        </p>
        <p>
          The brand is built for people who want smoother-looking, calmer,
          hydrated skin without aggressive routines, needles, or complicated
          product stacks.
        </p>
      </div>
      <ProductVisual
        alt="Satori brand story image"
        badge="Science-led cream"
        priority
        src={satoriAssets.homeBrandStoryGroup}
        variant="story"
      />
    </section>
  );
}
