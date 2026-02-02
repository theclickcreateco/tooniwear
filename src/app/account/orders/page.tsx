"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { Package, ChevronRight, Clock, ShoppingBag, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
    orderId: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    items: any[];
    shippingDetails: {
        fullName: string;
    }
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Fetch user's orders
        fetch('/api/account/orders')
            .then(res => res.json())
            .then(data => {
                if (data.orders) {
                    setOrders(data.orders);
                }
            })
            .catch(err => console.error("Error fetching orders:", err))
            .finally(() => setIsLoading(false));
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending': return 'bg-yellow-50 text-yellow-600 border-yellow-100';
            case 'completed': return 'bg-green-50 text-green-600 border-green-100';
            case 'cancelled': return 'bg-red-50 text-red-600 border-red-100';
            default: return 'bg-neutral-50 text-neutral-600 border-neutral-100';
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50/50 flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center space-x-2 text-sm text-neutral-500 mb-8">
                        <Link href="/shop" className="hover:text-primary-600 flex items-center">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            <span>Back to Shop</span>
                        </Link>
                    </div>

                    <h1 className="text-4xl font-bold text-neutral-900 mb-12">My Orders</h1>

                    {isLoading ? (
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="h-40 bg-white rounded-3xl animate-pulse border border-neutral-100" />
                            ))}
                        </div>
                    ) : orders.length === 0 ? (
                        <div className="bg-white p-12 rounded-3xl border border-neutral-100 text-center">
                            <div className="p-6 bg-neutral-50 rounded-full inline-block mb-6">
                                <ShoppingBag className="w-12 h-12 text-neutral-300" />
                            </div>
                            <h2 className="text-2xl font-bold text-neutral-900 mb-4">No orders yet</h2>
                            <p className="text-neutral-500 mb-8 max-w-sm mx-auto">Looks like you haven't placed any orders yet. Start shopping to see your history here!</p>
                            <Link href="/shop" className="inline-flex items-center space-x-2 px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20">
                                <span>Go Shopping</span>
                                <ChevronRight className="w-5 h-5" />
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {orders.map((order) => (
                                <div key={order.orderId} className="bg-white rounded-3xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center space-x-3">
                                                    <span className="text-lg font-bold text-neutral-900">{order.orderId}</span>
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
                                                        getStatusColor(order.status)
                                                    )}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-neutral-400 flex items-center">
                                                    <Clock className="w-4 h-4 mr-1.5" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-left sm:text-right">
                                                <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1 leading-none">Total Amount</p>
                                                <p className="text-2xl font-black text-primary-600">Rs. {order.totalPrice.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-4 pt-6 border-t border-neutral-50">
                                            {order.items.slice(0, 3).map((item, idx) => (
                                                <div key={idx} className="w-16 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0 border border-neutral-100">
                                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                                </div>
                                            ))}
                                            {order.items.length > 3 && (
                                                <div className="w-16 h-20 rounded-xl bg-neutral-50 flex items-center justify-center border border-neutral-100 border-dashed">
                                                    <span className="text-xs font-bold text-neutral-400">+{order.items.length - 3}</span>
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-[200px] flex items-center justify-end">
                                                <Link
                                                    href={`/account/orders/${order.orderId}`}
                                                    className="inline-flex items-center text-sm font-bold text-neutral-900 hover:text-primary-600 transition-colors"
                                                >
                                                    <span>View Details</span>
                                                    <ChevronRight className="w-4 h-4 ml-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
}
