import Link from "next/link";
import { ArrowRight, MailCheck, PackageX, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Order Update",
  description: "Important update about your Satori Cream order.",
  alternates: { canonical: "/thank-you" },
  robots: { index: false, follow: false },
};

const orderUpdates = [
  {
    icon: PackageX,
    label: "Stock status",
    value: "Currently unavailable",
  },
  {
    icon: ShieldCheck,
    label: "Payment status",
    value: "No payment collected",
  },
  {
    icon: MailCheck,
    label: "Verification",
    value: "Restock notice queued",
  },
];

export default function ThankYouPage() {
  return (
    <section className="thank-you-page">
      <div className="thank-you-shell">
        <div className="thank-you-card">
          <span className="status-pill">
            <PackageX size={16} />
            Inventory Update
          </span>

          <div className="thank-you-copy">
            <span className="eyebrow">Thank You</span>
            <h1>Your Satori order request has been received.</h1>
            <p>
              Due to unusually high demand, Satori Cream is currently out of
              stock. No payment has been collected, and you can confirm this
              with your card issuer or bank.
            </p>
          </div>

          <div className="thank-you-grid">
            {orderUpdates.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label}>
                  <Icon size={20} />
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              );
            })}
          </div>

          <div className="thank-you-note">
            <strong>What happens next</strong>
            <p>
              We will email you as soon as Satori Cream is restocked so you can
              complete your order when inventory is available again.
            </p>
          </div>

          <div className="thank-you-actions">
            <Link className="button teal" href="/products/satori-cream">
              Return to Satori Cream
              <ArrowRight size={18} />
            </Link>
            <Link className="button ghost" href="/">
              Back to Satori
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
