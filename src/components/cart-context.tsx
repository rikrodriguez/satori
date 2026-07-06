"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/store";
import { trackSatoriEvent } from "@/lib/tracking";

type CartContextValue = {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (id: string, sellingPlan?: string) => void;
  updateQuantity: (id: string, quantity: number, sellingPlan?: string) => void;
  subtotal: number;
  itemCount: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const cartStorageKey = "satori-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hasLoadedCart, setHasLoadedCart] = useState(false);

  useEffect(() => {
    const loadCart = window.setTimeout(() => {
      try {
        const savedCart = window.localStorage.getItem(cartStorageKey);
        if (savedCart) {
          setItems(JSON.parse(savedCart) as CartItem[]);
        }
      } catch {
        window.localStorage.removeItem(cartStorageKey);
      } finally {
        setHasLoadedCart(true);
      }
    }, 0);

    return () => window.clearTimeout(loadCart);
  }, []);

  useEffect(() => {
    if (!hasLoadedCart) {
      return;
    }

    window.localStorage.setItem(cartStorageKey, JSON.stringify(items));
  }, [hasLoadedCart, items]);

  const addItem = useCallback(
    (item: Omit<CartItem, "quantity">, quantity = 1) => {
      trackSatoriEvent("AddToCart", {
        content_ids: [item.id],
        content_name: item.name,
        content_type: "product",
        contents: [{ id: item.id, name: item.name, price: item.price, quantity }],
        num_items: quantity,
        value: item.price * quantity,
      });

      setItems((current) => {
        const key = `${item.id}:${item.sellingPlan ?? "one-time"}`;
        const existing = current.find(
          (cartItem) =>
            `${cartItem.id}:${cartItem.sellingPlan ?? "one-time"}` === key,
        );

        if (existing) {
          return current.map((cartItem) =>
            cartItem === existing
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem,
          );
        }

        return [...current, { ...item, quantity }];
      });
      setIsOpen(true);
    },
    [],
  );

  const updateQuantity = useCallback(
    (id: string, quantity: number, sellingPlan?: string) => {
      setItems((current) =>
        current
          .map((item) =>
            item.id === id && item.sellingPlan === sellingPlan
              ? { ...item, quantity }
              : item,
          )
          .filter((item) => item.quantity > 0),
      );
    },
    [],
  );

  const removeItem = useCallback((id: string, sellingPlan?: string) => {
    setItems((current) =>
      current.filter(
        (item) => !(item.id === id && item.sellingPlan === sellingPlan),
      ),
    );
  }, []);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const value = useMemo(
    () => ({
      items,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      updateQuantity,
      subtotal,
      itemCount,
    }),
    [addItem, isOpen, itemCount, items, removeItem, subtotal, updateQuantity],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}
