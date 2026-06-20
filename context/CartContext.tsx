"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Service } from "@/lib/services";

type CartItem = Service & { qty: number };

type CartContextType = {
  items: CartItem[];
  addToCart: (service: Service) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const STORAGE_KEY = "pixora_cart";

function load(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(load);

  /* Persist to localStorage whenever items change */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addToCart = (service: Service) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === service.id);
      if (existing) return prev.map((i) => i.id === service.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { ...service, qty: 1 }];
    });
  };

  const removeFromCart = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setItems((prev) => prev.map((i) => i.id === id ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((s, i) => s + i.qty, 0);
  const totalPrice = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
