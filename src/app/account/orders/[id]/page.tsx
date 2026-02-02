"use client";

import { useState, useEffect, use } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowLeft, Package, Truck, CreditCard, ChevronRight, MapPin, Phone, Mail, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderDetail {
    orderId: string;
    createdAt: string;
    totalPrice: number;
    status: string;
    paymentMethod: string;
    items: any[];
    shippingDetails: {
        fullName: string;
        email: string;
        address: string;
        city: string;
        phone: string;
    };
}

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch(`/api/account/orders/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.order) {
                    setOrder(data.order);
                } else {
                    setError(data.error || "Order not found");
                }
            })
            .catch(err => {
                console.error("Fetch error:", err);
                setError("Failed to load order details");
            })
            .finally(() => setIsLoading(false));
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-neutral-50/50 flex flex-col">
                <Header />
                <main className="flex-1 pt-32 pb-24 px-4 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary-100 border-t-primary-600 rounded-full animate-spin"></div>
                </main>
                <Footer />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="min-h-screen bg-neutral-50/50 flex flex-col">
                <Header />
                <main className="flex-1 pt-32 pb-24 px-4 flex flex-col items-center justify-center text-center">
                    <div className="bg-red-50 p-6 rounded-full mb-6">
                        <Package className="w-12 h-12 text-red-400" />
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Order Not Found</h1>
                    <p className="text-neutral-500 mb-8">{error || "The order you're looking for doesn't exist or you don't have access."}</p>
                    <Link href="/account/orders" className="text-primary-600 font-bold underline flex items-center">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to My Orders
                    </Link>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50/50 flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-24 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-4">
                            <Link href="/account/orders" className="text-sm text-neutral-500 hover:text-primary-600 flex items-center transition-colors">
                                <ArrowLeft className="w-4 h-4 mr-1" />
                                <span>Back to My Orders</span>
                            </Link>
                            <h1 className="text-4xl font-black text-neutral-900 tracking-tight">Order #{order.orderId}</h1>
                            <div className="flex flex-wrap gap-4 items-center">
                                <div className="flex items-center text-neutral-500 text-sm">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                        month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })}
                                </div>
                                <span className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border",
                                    order.status === 'pending' ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-green-50 text-green-600 border-green-100'
                                )}>
                                    {order.status}
                                </span>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-3xl border border-neutral-100 shadow-sm md:w-48 text-center md:text-right">
                            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Total Paid</p>
                            <p className="text-3xl font-black text-primary-600 leading-none">Rs. {order.totalPrice.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Summary Card */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Order Items */}
                            <section className="bg-white rounded-3xl border border-neutral-100 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-neutral-50 flex items-center space-x-3">
                                    <Package className="w-5 h-5 text-primary-600" />
                                    <h2 className="font-bold text-neutral-900">Items Ordered</h2>
                                </div>
                                <div className="divide-y divide-neutral-50">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="p-6 flex gap-6">
                                            <div className="w-20 h-24 rounded-xl bg-neutral-100 flex-shrink-0 overflow-hidden">
                                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h4 className="font-bold text-neutral-900">{item.name}</h4>
                                                <div className="flex items-center space-x-3 text-sm text-neutral-500 font-medium">
                                                    <span>Size: <span className="text-neutral-900">{item.size}</span></span>
                                                    <span className="w-1 h-1 bg-neutral-200 rounded-full" />
                                                    <span>Qty: <span className="text-neutral-900">{item.quantity}</span></span>
                                                </div>
                                                <p className="text-primary-600 font-bold pt-1">Rs. {item.price}</p>
                                            </div>
                                            <div className="text-right flex flex-col justify-end">
                                                <p className="text-sm font-black text-neutral-900">Rs. {(item.price * item.quantity).toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="bg-neutral-50/50 p-6 space-y-3">
                                    <div className="flex justify-between text-sm text-neutral-500 font-medium px-2">
                                        <span>Subtotal</span>
                                        <span className="text-neutral-900">Rs. {order.totalPrice.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm text-neutral-500 font-medium px-2">
                                        <span>Shipping Fee</span>
                                        <span className="text-primary-600 font-bold uppercase tracking-tight">Free</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-black text-neutral-900 px-2 pt-2 border-t border-neutral-100">
                                        <span>Total</span>
                                        <span>Rs. {order.totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Side Details */}
                        <div className="space-y-8">
                            {/* Shipping Info */}
                            <section className="bg-white rounded-3xl border border-neutral-100 shadow-sm p-8 space-y-6">
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2 text-primary-600 mb-2">
                                        <Truck className="w-4 h-4" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Shipping Info</h3>
                                    </div>
                                    <p className="font-bold text-neutral-900">{order.shippingDetails.fullName}</p>
                                    <div className="flex items-start space-x-3 text-sm text-neutral-500 py-2">
                                        <MapPin className="w-4 h-4 mt-1 shrink-0" />
                                        <p>{order.shippingDetails.address}, {order.shippingDetails.city}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-neutral-500">
                                        <Phone className="w-4 h-4 shrink-0" />
                                        <p>{order.shippingDetails.phone}</p>
                                    </div>
                                    <div className="flex items-center space-x-3 text-sm text-neutral-500">
                                        <Mail className="w-4 h-4 shrink-0" />
                                        <p className="truncate">{order.shippingDetails.email}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Payment Info */}
                            <section className="bg-neutral-900 rounded-3xl p-8 space-y-6 text-white overflow-hidden relative">
                                <div className="relative z-10">
                                    <div className="flex items-center space-x-2 text-primary-400 mb-4">
                                        <CreditCard className="w-4 h-4" />
                                        <h3 className="text-sm font-bold uppercase tracking-widest">Payment</h3>
                                    </div>
                                    <p className="text-2xl font-black mb-1">
                                        {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                                    </p>
                                    <p className="text-xs text-neutral-400 font-medium opacity-80">
                                        {order.status === 'pending' ? 'Pay upon delivery to our courier' : 'Paid securely online'}
                                    </p>
                                </div>
                                <div className="absolute -right-4 -bottom-4 opacity-10">
                                    <CreditCard className="w-24 h-24" />
                                </div>
                            </section>

                            {/* Help Box */}
                            <div className="bg-primary-50 rounded-3xl p-6 border border-primary-100">
                                <h4 className="font-bold text-primary-900 mb-2 text-sm italic">Need support?</h4>
                                <p className="text-xs text-primary-700 mb-4 leading-relaxed">If you have any questions about this order, please contact our support team with your Order ID.</p>
                                <a
                                    href={`https://wa.me/923212481412?text=Hello, I need support with my order ${order.orderId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full py-2.5 bg-white text-primary-600 rounded-xl text-xs font-bold shadow-sm hover:shadow-md transition-shadow flex items-center justify-center"
                                >
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
