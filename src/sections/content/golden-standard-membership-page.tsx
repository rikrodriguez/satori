import Link from "next/link";
import { CheckCircle2, Gift, Sparkles, Truck, WalletCards } from "lucide-react";
import { ProductVisual } from "@/components/product-visual";
import { satoriAssets } from "@/lib/visual-assets";

const membershipPlans = [
  {
    name: "Essential",
    price: "$0/year",
    eyebrow: "Starts free",
    body:
      "The default rewards tier for anyone buying Satori. No annual fee, no commitment.",
    perks: [
      "Earn 4% back in Satori Dollars",
      "Use rewards toward future Satori orders",
      "Best for trying the ritual once or twice",
    ],
  },
  {
    name: "Elevated",
    price: "$0/year",
    eyebrow: "Unlocks automatically",
    body:
      "A free loyalty upgrade once your annual Satori spend reaches $200.",
    perks: [
      "Unlocks after $200 annual spend",
      "Better reward status without paying a fee",
      "Built for consistent replenishment customers",
    ],
  },
  {
    name: "Golden",
    price: "$45/year",
    eyebrow: "Best value",
    body:
      "The paid annual membership for customers who want member pricing and VIP-style benefits.",
    perks: [
      "10%+ off Satori orders",
      "Seasonal gifts and early access",
      "Rewards plus Golden member savings",
    ],
  },
];

export const metadata = {
  title: "Satori Golden Skin Club",
  description:
    "Join the Satori Golden Skin Club for member pricing, gifts, early access, rewards, and routine support.",
  alternates: {
    canonical: "/pages/golden-standard-membership-info",
  },
};

export default function MembershipPage() {
  return (
    <section className="membership-page">
      <div className="membership-hero">
        <div className="membership-copy">
          <span className="eyebrow">The Golden Skin Standard</span>
          <h1>Satori rewards, explained clearly.</h1>
          <p>
            Essential is free, Elevated unlocks through annual spend, and
            Golden is the paid annual tier for people who want stronger savings,
            gifts, early access, and member status from day one.
          </p>
          <div className="membership-actions">
            <Link className="button teal" href="/products/satori-cream">
              Go Golden ($45/year)
            </Link>
            <Link className="button ghost" href="#pricing">
              Compare Plans
            </Link>
          </div>
          <small>Billed annually for Golden only. Essential and Elevated are free.</small>
        </div>
        <ProductVisual
          alt="Satori Golden Skin Club membership visual"
          badge="Member ritual"
          priority
          src={satoriAssets.homeBrandStoryGroup}
          variant="story"
        />
      </div>

      <div className="tier-grid" id="pricing">
        {membershipPlans.map((plan) => (
          <article key={plan.name} className={plan.name === "Golden" ? "is-featured" : ""}>
            <span>{plan.eyebrow}</span>
            <h2>{plan.name}</h2>
            <strong>{plan.price}</strong>
            <p>{plan.body}</p>
            <ul>
              {plan.perks.map((perk) => (
                <li key={perk}>
                  <CheckCircle2 size={17} />
                  {perk}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="benefit-grid" id="rewards">
        {[
          ["Free welcome jar", Gift],
          ["10%+ off always", Sparkles],
          ["Free shipping over $30", Truck],
          ["8% back in Satori Dollars", WalletCards],
        ].map(([label, Icon]) => (
          <div key={label as string}>
            <Icon size={30} />
            <h3>{label as string}</h3>
          </div>
        ))}
      </section>

      <div className="membership-cta">
        <h2>Become a Golden Member.</h2>
        <p>
          One tap adds your membership and your free welcome jar, and your
          savings start on this order.
        </p>
        <Link className="button rose" href="/products/satori-cream">
          Join the Golden Skin Club
        </Link>
      </div>
    </section>
  );
}
