"use client";

import { ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/store";
import { useCart } from "./cart-context";

type LandingAddToCartProps = {
  id: string;
  image: string;
  label?: string;
  name: string;
  price: number;
};

export function LandingAddToCart({
  id,
  image,
  label = "Add to Cart",
  name,
  price,
}: LandingAddToCartProps) {
  const { addItem } = useCart();

  return (
    <button
      className="button teal full"
      onClick={() => addItem({ id, image, name, price })}
      type="button"
    >
      <ShoppingBag size={18} />
      {label} {formatPrice(price)}
    </button>
  );
}
