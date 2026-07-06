import Link from "next/link";
import { CalendarClock, PackageCheck, RefreshCcw } from "lucide-react";
import { ProductVisual } from "@/components/product-visual";
import { satoriAssets } from "@/lib/visual-assets";

export const metadata = {
  title: "Satori Subscribe & Save",
  description:
    "Subscribe and save 15% on Satori Cream with flexible delivery frequencies for your anti-aging skincare ritual.",
  alternates: {
    canonical: "/pages/subscribe-and-save",
  },
};

export default function SubscriptionsPage() {
  return (
    <section className="simple-page subscription-page">
      <div className="section-heading">
        <span>Subscribe & Save</span>
        <h1>Save 15% on the Satori ritual.</h1>
        <p>
          Auto-ship Satori Cream on your schedule and keep the habit alive
          without thinking about your next jar.
        </p>
      </div>
      <div className="benefit-grid subscription-benefits">
        {[
          ["15% off all recurring orders", PackageCheck],
          ["Adjust frequency anytime", CalendarClock],
          ["Skip, pause, or cancel", RefreshCcw],
        ].map(([label, Icon]) => (
          <div key={label as string}>
            <Icon size={30} />
            <h3>{label as string}</h3>
          </div>
        ))}
      </div>
      <div className="subscription-box subscription-how">
        <ProductVisual
          alt="Satori Subscribe and Save product image"
          badge="Subscribe & Save"
          src={satoriAssets.homeProductMain02}
          variant="story"
        />
        <div className="subscription-copy">
          <span className="eyebrow">Flexible Delivery</span>
          <h2>How to start</h2>
          <p>
            Choose Subscribe & Save on the Satori Cream product page, pick monthly,
            every 2 months, or every 3 months, then checkout as usual.
          </p>
          <div className="subscription-frequency-row" aria-label="Delivery frequencies">
            <span>Monthly</span>
            <span>Every 2 months</span>
            <span>Every 3 months</span>
          </div>
          <Link className="button teal" href="/products/satori-cream">
            Set Up Subscription
          </Link>
        </div>
      </div>
    </section>
  );
}
