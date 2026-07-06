import Link from "next/link";
import { ArrowRight, BadgeCheck, PackageCheck, RotateCcw, ShieldCheck } from "lucide-react";
import type { supportPages } from "@/lib/store";

type SupportPageContent = (typeof supportPages)[keyof typeof supportPages];

const iconMap = {
  guarantee: ShieldCheck,
  shipping: PackageCheck,
  returns: RotateCcw,
} as const;

type SupportPageProps = {
  content: SupportPageContent;
  variant: keyof typeof iconMap;
};

export function SupportPage({ content, variant }: SupportPageProps) {
  const Icon = iconMap[variant];

  return (
    <main className="support-page">
      <section className="support-hero">
        <div>
          <span className="eyebrow">{content.eyebrow}</span>
          <h1>{content.title}</h1>
          <p>{content.summary}</p>
          <div className="support-actions">
            <Link className="button teal" href="/products/satori-cream">
              Shop Satori Cream <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" href="/pages/faq">
              Visit FAQ
            </Link>
          </div>
        </div>
        <aside className="support-trust-card">
          <Icon size={38} />
          <h2>{content.badge}</h2>
          <div>
            {content.highlights.map((highlight) => (
              <span key={highlight}>
                <BadgeCheck size={18} /> {highlight}
              </span>
            ))}
          </div>
        </aside>
      </section>

      <section className="support-steps">
        {content.steps.map((step, index) => (
          <article key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h2>{step.title}</h2>
            <p>{step.body}</p>
          </article>
        ))}
      </section>

      <section className="support-details">
        <div className="section-heading">
          <span>Support Details</span>
          <h2>What shoppers should understand.</h2>
        </div>
        <div className="support-detail-grid">
          {content.details.map((detail) => (
            <article key={detail.title}>
              <h3>{detail.title}</h3>
              <p>{detail.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="support-final-cta">
        <div>
          <span className="eyebrow">Satori Support</span>
          <h2>{content.finalTitle}</h2>
          <p>{content.finalBody}</p>
        </div>
        <div className="support-final-links">
          <Link className="button teal" href="/pages/faq">
            Read FAQ
          </Link>
          <Link className="button ghost" href="/checkout?protection=1">
            View Checkout
          </Link>
        </div>
      </section>
    </main>
  );
}
