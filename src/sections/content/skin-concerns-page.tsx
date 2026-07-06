import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { concerns } from "@/lib/store";

export const metadata = {
  title: "Skin Concerns | Satori Organic Skin Care",
  description:
    "Explore Satori skincare rituals for fine lines, dryness, uneven texture, redness, dullness, and tired-looking skin.",
  alternates: {
    canonical: "/pages/skin-concerns",
  },
};

export function SkinConcernsPage() {
  return (
    <main className="skin-concerns-page">
      <SkinConcernsHeroSection />
      <SkinConcernsGridSection />
    </main>
  );
}

function concernId(title: string) {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function SkinConcernsHeroSection() {
  return (
    <section className="support-hero">
      <div>
        <span className="eyebrow">Skin Concerns</span>
        <h1>If your skin looks like this, Satori was built for the ritual.</h1>
        <p>
          A simple nightly cream ritual for people focused on smoother-looking
          texture, lasting hydration, calmer-looking skin, and a healthier-looking
          glow over time.
        </p>
        <div className="support-actions">
          <Link className="button teal" href="/products/satori-cream">
            Shop Satori Cream <ArrowRight size={18} />
          </Link>
          <Link className="button ghost" href="/pages/before-after">
            View Visuals
          </Link>
        </div>
      </div>
      <aside>
        <h2>One cream, six common concerns.</h2>
        <p>
          Satori keeps the routine simple: cleanse, apply a small amount, and
          stay consistent long enough for the ritual to support visible-looking
          change.
        </p>
      </aside>
    </section>
  );
}

function SkinConcernsGridSection() {
  return (
    <section className="concerns-section">
      <div className="section-heading">
        <span>Concern Paths</span>
        <h2>Choose the concern that sounds most like your skin today.</h2>
      </div>
      <div className="concern-grid">
        {concerns.map((concern) => (
          <article className="concern-card" id={concernId(concern.title)} key={concern.title}>
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
          </article>
        ))}
      </div>
    </section>
  );
}
