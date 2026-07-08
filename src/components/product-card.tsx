"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ProductVisual } from "@/components/product-visual";
import type { Product } from "@/lib/store";
import { formatPrice } from "@/lib/store";
import { useCart } from "./cart-context";

export function ProductCard({
  priority = false,
  product,
}: {
  priority?: boolean;
  product: Product;
}) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <Link href={product.handle} className="product-image">
        <ProductVisual
          alt={product.name}
          badge={product.badge}
          priority={priority}
          src={product.image}
          variant="card"
        />
      </Link>
      <div className="product-card-body">
        <Link href={product.handle}>
          <h3>{product.name}</h3>
        </Link>
        <p>{product.subtitle}</p>
        <div className="card-price">
          <strong>{formatPrice(product.price)}</strong>
          {product.memberPrice &&
          product.memberPrice < product.price &&
          product.type !== "membership" ? (
            <span>Member {formatPrice(product.memberPrice)}</span>
          ) : null}
          {product.savingsLabel ? (
            <span className="savings-label">{product.savingsLabel}</span>
          ) : null}
        </div>
        <button
          className="button teal full"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.cartImage.src,
            })
          }
        >
          <ShoppingBag size={16} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}
