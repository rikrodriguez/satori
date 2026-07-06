"use client";

import { Minus, Plus, ShieldCheck, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductVisual, SatoriImageCard } from "@/components/product-visual";
import { bundles, formatPrice, heroProduct } from "@/lib/store";
import { trackSatoriEvent } from "@/lib/tracking";
import { cartAssets } from "@/lib/visual-assets";
import { useCart } from "./cart-context";

const freeShippingThreshold = 70;

export function CartDrawer() {
  const router = useRouter();
  const {
    items,
    isOpen,
    closeCart,
    addItem,
    removeItem,
    updateQuantity,
    subtotal,
    itemCount,
  } = useCart();

  const remaining = Math.max(freeShippingThreshold - subtotal, 0);
  const progress = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const upsells = bundles.filter((bundle) => bundle.id !== heroProduct.id);

  const goToCheckout = (withProtection: boolean) => {
    const checkoutItems =
      items.length > 0
        ? items
        : [
            {
              id: heroProduct.id,
              name: heroProduct.name,
              price: heroProduct.price,
              image: heroProduct.cartImage.src,
              quantity: 1,
            },
          ];
    const checkoutSubtotal =
      subtotal > 0
        ? subtotal
        : heroProduct.price;

    if (items.length === 0) {
      addItem({
        id: heroProduct.id,
        name: heroProduct.name,
        price: heroProduct.price,
        image: heroProduct.cartImage.src,
      });
    }

    trackSatoriEvent("InitiateCheckout", {
      content_ids: checkoutItems.map((item) => item.id),
      content_type: "product",
      contents: checkoutItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      num_items: checkoutItems.reduce((sum, item) => sum + item.quantity, 0),
      shipping_protection: withProtection,
      value: checkoutSubtotal,
    });

    closeCart();
    router.push(`/checkout?protection=${withProtection ? "1" : "0"}`);
  };

  return (
    <>
      <button
        aria-label="Close cart overlay"
        aria-hidden={!isOpen}
        className={`drawer-overlay ${isOpen ? "is-open" : ""}`}
        onClick={closeCart}
        tabIndex={isOpen ? 0 : -1}
      />
      <aside
        aria-hidden={!isOpen}
        aria-label="Shopping cart"
        className={`cart-drawer ${isOpen ? "is-open" : ""}`}
        inert={!isOpen ? true : undefined}
        role="dialog"
      >
        {isOpen ? (
          <>
            <div className="drawer-header">
              <h2>Your cart ({itemCount} Items)</h2>
              <button className="icon-button" onClick={closeCart} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            <div className="shipping-progress">
              <p>
                {remaining > 0
                  ? `ADD ${formatPrice(remaining)} TO GET FREE SHIPPING.`
                  : "YOU UNLOCKED FREE SHIPPING."}
              </p>
              <div className="progress-track">
                <span style={{ width: `${progress}%` }} />
              </div>
            </div>

            <div className="drawer-scroll">
              <div className="cart-items">
                {items.length === 0 ? (
                  <div className="empty-cart">
                    <SatoriImageCard
                      asset={cartAssets.support}
                      badge="Satori Cream"
                      className="cart-support-image"
                    />
                    <p>Your cart is empty.</p>
                    <button
                      className="button teal"
                      onClick={() =>
                        addItem({
                          id: heroProduct.id,
                          name: heroProduct.name,
                          price: heroProduct.price,
                          image: heroProduct.cartImage.src,
                        })
                      }
                    >
                      Start with Satori Cream
                    </button>
                  </div>
                ) : (
                  items.map((item) => (
                    <div className="cart-line" key={`${item.id}-${item.sellingPlan}`}>
                      <ProductVisual
                        alt={item.name}
                        badge=""
                        src={item.image}
                        variant="mini"
                      />
                      <div>
                        <h3>{item.name}</h3>
                        {item.sellingPlan ? <p>{item.sellingPlan}</p> : null}
                        <div className="cart-line-actions">
                          <div className="quantity-row">
                            <button
                              aria-label={`Decrease quantity for ${item.name}`}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1, item.sellingPlan)
                              }
                            >
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              aria-label={`Increase quantity for ${item.name}`}
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1, item.sellingPlan)
                              }
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <button
                            aria-label={`Remove ${item.name} from cart`}
                            className="cart-remove"
                            onClick={() => removeItem(item.id, item.sellingPlan)}
                            title={`Remove ${item.name}`}
                            type="button"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </div>
                  ))
                )}
              </div>

              <div className="cart-upsells">
                <h3>You May Also Like</h3>
                {upsells.map((upsell) => (
                  <div className="upsell" key={upsell.id}>
                    <ProductVisual
                      alt={upsell.name}
                      badge=""
                      src={upsell.image}
                      variant="mini"
                    />
                    <div>
                      <p>{upsell.name}</p>
                      <span>{formatPrice(upsell.price)}</span>
                    </div>
                    <button
                      aria-label={`Add ${upsell.name} to cart`}
                      onClick={() =>
                        addItem({
                          id: upsell.id,
                          name: upsell.name,
                          price: upsell.price,
                          image: upsell.cartImage.src,
                        })
                      }
                    >
                      ADD
                    </button>
                  </div>
                ))}
              </div>

              <div className="drawer-footer">
                <div className="subtotal">
                  <span>Estimated Total</span>
                  <strong>{formatPrice(subtotal)}</strong>
                </div>
                <p>Shipping calculated at checkout</p>
                <div className="protection-row">
                  <ShieldCheck size={18} />
                  <span>Shipping protection</span>
                  <strong>+ $3.00</strong>
                </div>
                <button className="button teal full" onClick={() => goToCheckout(true)}>
                  Protected Checkout
                </button>
                <button className="text-button" onClick={() => goToCheckout(false)}>
                  Checkout without protection
                </button>
              </div>
            </div>
          </>
        ) : null}
      </aside>
    </>
  );
}
