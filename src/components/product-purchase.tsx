"use client";

import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Minus, Plus, ShoppingBag } from "lucide-react";
import { bundles, formatPrice, heroProduct } from "@/lib/store";
import { trackSatoriEvent } from "@/lib/tracking";
import { useCart } from "./cart-context";

const frequencies = ["Monthly", "Delivered every 2 months", "Delivered every 3 months"];
const ritualKit = bundles.find((product) => product.id === "satori-ritual");

export function ProductPurchase() {
  const { addItem } = useCart();
  const [plan, setPlan] = useState<"one-time" | "subscribe">("one-time");
  const [frequency, setFrequency] = useState(frequencies[0]);
  const [quantity, setQuantity] = useState(1);

  const price =
    plan === "subscribe" && heroProduct.subscriptionPrice
      ? heroProduct.subscriptionPrice
      : heroProduct.price;
  const sellingPlan = plan === "subscribe" ? `Subscribe and Save 15% - ${frequency}` : undefined;

  const total = useMemo(() => price * quantity, [price, quantity]);

  useEffect(() => {
    trackSatoriEvent("ViewContent", {
      content_ids: [heroProduct.id],
      content_name: heroProduct.name,
      content_type: "product",
      value: heroProduct.price,
    });
  }, []);

  return (
    <div className="purchase-card">
      <div className="rating-row">
        <span className="stars" aria-label="4.9 out of 5 stars">★★★★★</span>
        <a href="#reviews">2,000+ ritual reviews</a>
      </div>
      <h1>{heroProduct.name}</h1>
      <p className="product-subtitle">{heroProduct.subtitle}</p>
      <div className="price-row">
        <strong>{formatPrice(heroProduct.price)}</strong>
        {heroProduct.memberPrice &&
        heroProduct.memberPrice < heroProduct.price &&
        heroProduct.type !== "membership" ? (
          <span>Golden Member Price: {formatPrice(heroProduct.memberPrice)}</span>
        ) : null}
        {heroProduct.savingsLabel ? (
          <span className="savings-label">{heroProduct.savingsLabel}</span>
        ) : null}
      </div>

      <div className="purchase-options">
        <p>Purchase Options</p>
        <button
          aria-pressed={plan === "one-time"}
          className={plan === "one-time" ? "selected" : ""}
          onClick={() => setPlan("one-time")}
        >
          <span>
            <Check size={16} />
            One Time Purchase
          </span>
          <strong>{formatPrice(heroProduct.price)}</strong>
        </button>
        <button
          aria-pressed={plan === "subscribe"}
          className={plan === "subscribe" ? "selected" : ""}
          onClick={() => setPlan("subscribe")}
        >
          <span>
            <Check size={16} />
            Subscribe and Save 15%
          </span>
          <strong>
            {formatPrice(heroProduct.subscriptionPrice ?? heroProduct.price)}
          </strong>
        </button>
      </div>

      {plan === "subscribe" ? (
        <div className="frequency">
          <label htmlFor="frequency">Delivery Frequency</label>
          <div>
            <select
              id="frequency"
              value={frequency}
              onChange={(event) => setFrequency(event.target.value)}
            >
              {frequencies.map((option) => (
                <option key={option}>{option}</option>
              ))}
            </select>
            <ChevronDown size={18} />
          </div>
          <p>
            Subscription renews automatically. Skip, pause, or cancel from your
            account.
          </p>
        </div>
      ) : null}

      <div className="quantity-add">
        <div className="quantity-row large">
          <button
            aria-label="Decrease quantity for Satori Cream"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus size={15} />
          </button>
          <span>{quantity}</span>
          <button
            aria-label="Increase quantity for Satori Cream"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus size={15} />
          </button>
        </div>
        <button
          className="button teal full"
          onClick={() =>
            addItem(
              {
                id: heroProduct.id,
                name: heroProduct.name,
                price,
                image: heroProduct.cartImage.src,
                sellingPlan,
              },
              quantity,
            )
          }
        >
          <ShoppingBag size={18} />
          Add to Cart {formatPrice(total)}
        </button>
      </div>

      <div className="fbt">
        <h3>Frequently bought together</h3>
        <div>
          <span>{heroProduct.name}</span>
          <span>Satori Duo</span>
          <span>Golden Skin Club</span>
        </div>
        <button
          className="button rose full"
          onClick={() =>
            addItem({
              id: ritualKit?.id ?? "satori-ritual",
              name: ritualKit?.name ?? "Satori Ritual Kit",
              price: ritualKit?.price ?? 99.99,
              image: ritualKit?.cartImage.src ?? heroProduct.cartImage.src,
            })
          }
        >
          Add Selected to Cart
        </button>
      </div>
      <p className="support-note">
        For questions and personalized support, chat with us on Instagram and
        Facebook.
      </p>
    </div>
  );
}
