"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Trash2, ShoppingBag, ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

export default function CartPage() {
    const { items, removeItem, updateQuantity, totalPrice, totalItems } = useCartStore();

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white">
                <Header />
                <main className="pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
                    <div className="p-8 bg-neutral-50 rounded-full mb-8">
                        <ShoppingBag className="w-16 h-16 text-neutral-300" />
                    </div>
                    <h1 className="text-3xl font-bold text-neutral-900 mb-4">Your bag is empty</h1>
                    <p className="text-neutral-500 mb-8 max-w-sm">Looks like you haven't added any play-ready outfits to your bag yet.</p>
                    <Link
                        href="/shop"
                        className="px-10 py-4 bg-primary-600 text-white rounded-2xl font-bold shadow-xl shadow-primary-500/20 hover:bg-primary-700 transition-all"
                    >
                        Start Shopping
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50/50">
            <Header />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
                        <Link href="/shop" className="hover:text-primary-600 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold text-neutral-900 mb-12">Shopping Bag <span className="text-neutral-300 ml-2">({totalItems()})</span></h1>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Items List */}
                        <div className="flex-1 space-y-6">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="bg-white p-6 rounded-3xl border border-neutral-100 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
                                    <div className="w-24 h-32 sm:w-32 sm:h-40 shrink-0 rounded-2xl overflow-hidden bg-neutral-100">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                    </div>

                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-bold text-neutral-900 mb-1">{item.name}</h3>
                                                <p className="text-sm text-neutral-500 font-medium">Size: <span className="text-neutral-900">{item.size}</span></p>
                                            </div>
                                            <p className="text-xl font-black text-primary-600">Rs. {item.price}</p>
                                        </div>

                                        <div className="flex items-center justify-between mt-4">
                                            <div className="flex items-center border border-neutral-100 rounded-xl px-2 h-10">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))}
                                                    className="p-1 text-neutral-400 hover:text-primary-600"
                                                >
                                                    -
                                                </button>
                                                <span className="w-8 text-center text-sm font-bold text-neutral-900">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                                                    className="p-1 text-neutral-400 hover:text-primary-600"
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id, item.size)}
                                                className="text-neutral-400 hover:text-secondary-500 flex items-center space-x-1 text-xs font-bold uppercase tracking-widest transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                <span>Remove</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="w-full lg:w-96">
                            <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl sticky top-32">
                                <h3 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h3>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between text-neutral-600 font-medium">
                                        <span>Subtotal</span>
                                        <span>Rs. {totalPrice().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-600 font-medium">
                                        <span>Estimated Shipping</span>
                                        <span className="text-primary-600">FREE</span>
                                    </div>
                                    <div className="flex justify-between text-neutral-600 font-medium border-b border-neutral-100 pb-4">
                                        <span>Tax</span>
                                        <span>Rs. 0.00</span>
                                    </div>
                                    <div className="flex justify-between text-2xl font-black text-neutral-900 pt-2">
                                        <span>Total</span>
                                        <span>Rs. {totalPrice().toFixed(2)}</span>
                                    </div>
                                </div>

                                <Link
                                    href="/checkout"
                                    className="w-full h-14 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-3 hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/30 mb-6"
                                >
                                    <span>Go to Checkout</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>

                                <div className="flex items-center justify-center space-x-2 text-neutral-400 text-xs font-bold uppercase tracking-widest">
                                    <ShieldCheck className="w-4 h-4" />
                                    <span>Secure Checkout</span>
                                </div>
                            </div>

                            <div className="mt-8 p-6 rounded-3xl border-2 border-dashed border-neutral-200">
                                <p className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-widest">Promotion Code?</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter code"
                                        className="flex-1 bg-white border border-neutral-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-primary-500"
                                    />
                                    <button className="px-4 py-2 bg-neutral-900 text-white rounded-xl text-sm font-bold hover:bg-neutral-800 transition-colors">Apply</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
