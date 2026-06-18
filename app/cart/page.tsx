"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import ServiceBanner from "@/components/ServiceBanner";

export default function CartPage() {
  const { items, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-32 text-center">
        <ShoppingBag size={64} className="text-gray-200 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some services to get started.</p>
        <Link href="/shop"
          className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors">
          Browse Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-extrabold text-gray-900">Your Cart ({items.length})</h1>
        <button onClick={clearCart} className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors">
          Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex gap-4 border border-gray-200 rounded-xl p-4 bg-white">
              <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0">
                <ServiceBanner name={item.name} icon={item.icon} category={item.category} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-semibold text-blue-600 uppercase tracking-wide">{item.category}</span>
                <h3 className="font-bold text-gray-900 text-sm mt-0.5 mb-1 truncate">{item.name}</h3>
                <p className="text-xs text-gray-500 truncate">{item.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors">
                      <Minus size={11} />
                    </button>
                    <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}
                      className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center hover:border-blue-400 transition-colors">
                      <Plus size={11} />
                    </button>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-extrabold text-blue-600 text-sm">
                      ₨ {(item.price * item.qty).toLocaleString()}
                    </span>
                    <button onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors">
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="border border-gray-200 rounded-xl p-6 bg-white sticky top-24">
            <h2 className="font-bold text-gray-900 text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600 truncate pr-2">{item.name} × {item.qty}</span>
                  <span className="font-medium shrink-0">₨ {(item.price * item.qty).toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between font-extrabold text-gray-900 text-lg">
                <span>Total</span>
                <span className="text-blue-600">₨ {totalPrice.toLocaleString()}</span>
              </div>
            </div>
            <Link href="/contact"
              className="w-full block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-center py-3.5 rounded-lg transition-colors">
              Proceed to Checkout
            </Link>
            <Link href="/shop"
              className="w-full block text-center text-sm text-blue-600 hover:underline mt-3">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
