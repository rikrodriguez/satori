import { Suspense } from "react";
import { CheckoutSummary } from "@/components/checkout-summary";

export const metadata = {
  title: "Satori Checkout",
  description: "Secure checkout flow for Satori Cream orders.",
  alternates: {
    canonical: "/checkout",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="checkout-page" />}>
      <CheckoutSummary />
    </Suspense>
  );
}
