"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, CreditCard, Lock, ShieldCheck } from "lucide-react";
import { ProductVisual, SatoriImageCard } from "@/components/product-visual";
import { formatPrice, testimonials } from "@/lib/store";
import { trackSatoriEvent } from "@/lib/tracking";
import { checkoutAssets } from "@/lib/visual-assets";
import { useCart } from "./cart-context";

const protectionPrice = 3;
const freeShippingThreshold = 70;
const standardShipping = 6.95;

export function CheckoutSummary() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { items, subtotal } = useCart();
  const withProtection = searchParams.get("protection") !== "0";

  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : standardShipping;
  const protection = withProtection && subtotal > 0 ? protectionPrice : 0;
  const total = subtotal + shipping + protection;

  const handleCheckoutRequest = () => {
    trackSatoriEvent("Lead", {
      content_ids: items.map((item) => item.id),
      content_name: "Satori checkout request",
      content_type: "product",
      contents: items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      num_items: items.reduce((sum, item) => sum + item.quantity, 0),
      source: "checkout",
      shipping_protection: withProtection,
      value: subtotal,
    });
    router.push("/thank-you");
  };

  if (items.length === 0) {
    return (
      <section className="checkout-page empty-checkout">
        <div>
          <span className="eyebrow">Secure Checkout</span>
          <h1>Your Satori cart is empty.</h1>
          <p>Add Satori Cream to begin your nightly skincare ritual.</p>
          <Link className="button teal" href="/products/satori-cream">
            Shop Satori Cream
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-heading">
        <SatoriImageCard
          asset={checkoutAssets.header}
          className="checkout-brand-image"
          fit="contain"
          priority
          sizes="(max-width: 860px) 100vw, 720px"
        />
        <span className="eyebrow">Secure Checkout</span>
        <h1>{withProtection ? "Protected Checkout" : "Checkout"}</h1>
        <p>
          Enter your shipping and payment details to complete your Satori Cream
          order.
        </p>
      </div>

      <div className="checkout-grid">
        <div className="checkout-form">
          <section className="checkout-card">
            <h2>Contact</h2>
            <label>
              Email
              <input autoComplete="email" placeholder="you@example.com" type="email" />
            </label>
          </section>

          <section className="checkout-card">
            <h2>Shipping</h2>
            <div className="field-grid">
              <label>
                First name
                <input autoComplete="given-name" placeholder="First name" type="text" />
              </label>
              <label>
                Last name
                <input autoComplete="family-name" placeholder="Last name" type="text" />
              </label>
            </div>
            <label>
              Address
              <input autoComplete="shipping street-address" placeholder="Street address" type="text" />
            </label>
            <div className="field-grid three">
              <label>
                City
                <input autoComplete="shipping address-level2" placeholder="City" type="text" />
              </label>
              <label>
                State
                <input autoComplete="shipping address-level1" placeholder="State" type="text" />
              </label>
              <label>
                ZIP
                <input autoComplete="shipping postal-code" inputMode="numeric" placeholder="ZIP" type="text" />
              </label>
            </div>
          </section>

          <section className="checkout-card payment-card">
            <div className="payment-card-heading">
              <h2>Payment</h2>
              <span className="secure-badge">
                <Lock size={14} />
                Secure
              </span>
            </div>
            <div className="payment-methods" aria-label="Accepted payment methods">
              <span>Visa</span>
              <span>Mastercard</span>
              <span>Amex</span>
              <span>Discover</span>
            </div>
            <label>
              Card number
              <span className="card-input-wrap">
                <CreditCard size={18} />
                <input
                  autoComplete="cc-number"
                  inputMode="numeric"
                  placeholder="1234 1234 1234 1234"
                  type="text"
                />
              </span>
            </label>
            <div className="field-grid three">
              <label>
                Expiration
                <input autoComplete="cc-exp" inputMode="numeric" placeholder="MM / YY" type="text" />
              </label>
              <label>
                CVC
                <input autoComplete="cc-csc" inputMode="numeric" placeholder="CVC" type="text" />
              </label>
              <label>
                ZIP
                <input autoComplete="billing postal-code" inputMode="numeric" placeholder="ZIP" type="text" />
              </label>
            </div>
            <p className="checkout-note">All payment details are protected by secure checkout standards.</p>
          </section>

          <button
            className="button teal full"
            onClick={handleCheckoutRequest}
            type="button"
          >
            <ArrowRight size={18} />
            Continue
          </button>
        </div>

        <aside
          aria-label="Order summary and ritual stories"
          className="checkout-sidebar"
        >
          <section className="checkout-summary">
            <h2>Order Summary</h2>
            {items.map((item) => (
              <div className="checkout-line" key={`${item.id}-${item.sellingPlan}`}>
                <ProductVisual
                  alt={item.name}
                  badge=""
                  src={item.image}
                  variant="mini"
                />
                <div>
                  <strong>{item.name}</strong>
                  <span>Qty {item.quantity}</span>
                  {item.sellingPlan ? <small>{item.sellingPlan}</small> : null}
                </div>
                <b>{formatPrice(item.price * item.quantity)}</b>
              </div>
            ))}

            <div className="checkout-totals">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div>
                <span>Shipping</span>
                <strong>{shipping === 0 ? "Free" : formatPrice(shipping)}</strong>
              </div>
              <div className={withProtection ? "is-active" : ""}>
                <span>
                  <ShieldCheck size={16} />
                  Shipping protection
                </span>
                <strong>{protection ? formatPrice(protection) : "Removed"}</strong>
              </div>
              <div className="grand-total">
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <Link
              className="text-button"
              href={`/checkout?protection=${withProtection ? "0" : "1"}`}
            >
              {withProtection ? "Remove shipping protection" : "Add shipping protection"}
            </Link>
          </section>

          <section className="checkout-testimonials">
            <span className="eyebrow">Ritual Stories</span>
            <h2>Trusted nightly rituals</h2>
            <div className="checkout-testimonial-list">
              {testimonials.slice(0, 3).map((review, index) => (
                <article className="checkout-testimonial" key={review.name + "-" + index}>
                  <span>Ritual story</span>
                  <p>&quot;{review.body}&quot;</p>
                  <strong>{review.name}</strong>
                  <small>{review.location}</small>
                </article>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </section>
  );
}
