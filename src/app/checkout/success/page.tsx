"use client";

import { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { CheckCircle, ShoppingBag, Package, Home } from "lucide-react";

export default function OrderSuccessPage() {
    const [orderId, setOrderId] = useState<string | null>(null);

    useEffect(() => {
        const id = sessionStorage.getItem('lastOrderId');
        setOrderId(id);
    }, []);

    return (
        <div className="min-h-screen bg-neutral-50/50">
            <Header />

            <main className="pt-40 pb-24 px-4 text-center">
                <div className="max-w-xl mx-auto">
                    <div className="mb-8 flex justify-center">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                            <CheckCircle className="w-12 h-12" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-black text-neutral-900 mb-4">Order Placed!</h1>
                    <p className="text-neutral-600 mb-8 text-lg">
                        Thank you for your purchase. We've received your order and will contact you shortly for confirmation.
                    </p>

                    {orderId && (
                        <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm mb-12">
                            <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">Your Order ID</p>
                            <p className="text-2xl font-mono font-black text-primary-600 tracking-tighter">{orderId}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link
                            href="/shop"
                            className="flex items-center justify-center space-x-2 py-4 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span>Continue Shopping</span>
                        </Link>
                        <Link
                            href="/"
                            className="flex items-center justify-center space-x-2 py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl font-bold hover:bg-neutral-50 transition-all"
                        >
                            <Home className="w-5 h-5" />
                            <span>Back to Home</span>
                        </Link>
                    </div>

                    <div className="mt-12 pt-12 border-t border-neutral-200/60">
                        <p className="text-sm text-neutral-500 flex items-center justify-center space-x-2">
                            <Package className="w-4 h-4" />
                            <span>We'll send order updates to your email & phone.</span>
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
