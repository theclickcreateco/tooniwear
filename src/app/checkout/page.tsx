"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/useCartStore";
import { ShieldCheck, ArrowLeft, Lock, UserPlus, Fingerprint, Truck, CreditCard, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
    const { items, totalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [isGuest, setIsGuest] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');

    // Form State
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        phone: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.fullName) newErrors.fullName = "Required";
        if (!formData.email) newErrors.email = "Required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email";
        if (!formData.address) newErrors.address = "Required";
        if (!formData.city) newErrors.city = "Required";
        if (!formData.phone) newErrors.phone = "Required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    shippingDetails: formData,
                    items,
                    totalPrice: totalPrice(),
                    paymentMethod
                }),
            });

            const data = await response.json();

            if (data.success) {
                // Store order ID in session storage for success page
                sessionStorage.setItem('lastOrderId', data.orderId);
                clearCart();
                router.push('/checkout/success');
            } else {
                alert(data.error || 'Failed to place order');
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-white pt-32 text-center">
                <h2 className="text-2xl font-bold">Your cart is empty</h2>
                <Link href="/shop" className="text-primary-600 underline">Back to shop</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-neutral-50/50">
            <Header />

            <main className="pt-32 pb-24 px-4">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="flex-1">
                        <Link href="/cart" className="flex items-center text-sm text-neutral-500 mb-8 hover:text-primary-600 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-1" />
                            <span>Back to Cart</span>
                        </Link>

                        <h1 className="text-3xl font-bold text-neutral-900 mb-12">Secure Checkout</h1>

                        {/* Guest vs Account Selection */}
                        <div className="grid grid-cols-2 gap-4 mb-12">
                            <button
                                type="button"
                                onClick={() => setIsGuest(true)}
                                className={cn(
                                    "p-6 rounded-2xl border-2 transition-all text-left flex flex-col items-center justify-center space-y-2",
                                    isGuest ? "border-primary-500 bg-primary-50 ring-4 ring-primary-500/10" : "border-neutral-100 bg-white hover:border-neutral-200"
                                )}
                            >
                                <Fingerprint className={cn("w-8 h-8", isGuest ? "text-primary-600" : "text-neutral-400")} />
                                <span className={cn("font-bold text-sm uppercase tracking-widest", isGuest ? "text-primary-700" : "text-neutral-500")}>Guest Checkout</span>
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsGuest(false)}
                                className={cn(
                                    "p-6 rounded-2xl border-2 transition-all text-left flex flex-col items-center justify-center space-y-2",
                                    !isGuest ? "border-primary-500 bg-primary-50 ring-4 ring-primary-500/10" : "border-neutral-100 bg-white hover:border-neutral-200"
                                )}
                            >
                                <UserPlus className={cn("w-8 h-8", !isGuest ? "text-primary-600" : "text-neutral-400")} />
                                <span className={cn("font-bold text-sm uppercase tracking-widest", !isGuest ? "text-primary-700" : "text-neutral-500")}>Sign In / Join</span>
                            </button>
                        </div>

                        <div className="space-y-12">
                            {/* Shipping Section */}
                            <section className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                                    <h2 className="text-xl font-bold text-neutral-900">Shipping Details</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Full Name</label>
                                        <input
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Johnny Appleseed"
                                            className={cn("w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors", errors.fullName ? "border-red-500" : "border-neutral-100")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Email Address</label>
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            type="email"
                                            placeholder="john@example.com"
                                            className={cn("w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors", errors.email ? "border-red-500" : "border-neutral-100")}
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Street Address</label>
                                        <input
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="123 Play Lane"
                                            className={cn("w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors", errors.address ? "border-red-500" : "border-neutral-100")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">City</label>
                                        <input
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            type="text"
                                            placeholder="Toytown"
                                            className={cn("w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors", errors.city ? "border-red-500" : "border-neutral-100")}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Phone Number</label>
                                        <input
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            type="tel"
                                            placeholder="+1 (234) 567-890"
                                            className={cn("w-full bg-neutral-50 border rounded-xl px-4 py-3 focus:outline-none focus:border-primary-500 transition-colors", errors.phone ? "border-red-500" : "border-neutral-100")}
                                        />
                                    </div>
                                </div>
                            </section>

                            {/* Payment Method Section */}
                            <section className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm">
                                <div className="flex items-center space-x-3 mb-8">
                                    <div className="w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                                    <h2 className="text-xl font-bold text-neutral-900">Payment Method</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod('cod')}
                                        className={cn(
                                            "p-6 rounded-2xl border-2 transition-all text-left flex items-start space-x-4",
                                            paymentMethod === 'cod' ? "border-primary-500 bg-primary-50 ring-4 ring-primary-500/10" : "border-neutral-100 bg-white hover:border-neutral-200"
                                        )}
                                    >
                                        <div className={cn("p-2 rounded-lg", paymentMethod === 'cod' ? "bg-primary-600 text-white" : "bg-neutral-100 text-neutral-400")}>
                                            <Truck className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className={cn("font-bold text-sm", paymentMethod === 'cod' ? "text-primary-900" : "text-neutral-500")}>Cash on Delivery</p>
                                            <p className="text-xs text-neutral-400 mt-1">Pay when your order arrives</p>
                                        </div>
                                    </button>

                                    <button
                                        disabled
                                        type="button"
                                        className="p-6 rounded-2xl border-2 border-neutral-50 bg-neutral-50/50 cursor-not-allowed text-left flex items-start space-x-4 opacity-60"
                                    >
                                        <div className="p-2 rounded-lg bg-neutral-200 text-neutral-400">
                                            <CreditCard className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="flex items-center space-x-2">
                                                <p className="font-bold text-sm text-neutral-400">Online Payment</p>
                                                <span className="text-[10px] bg-neutral-200 text-neutral-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-tighter">Soon</span>
                                            </div>
                                            <p className="text-xs text-neutral-400 mt-1">Card, Wallet, or Bank Transfer</p>
                                        </div>
                                    </button>
                                </div>
                            </section>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-5 bg-neutral-900 text-white rounded-2xl font-bold text-lg hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10 flex items-center justify-center space-x-2 disabled:opacity-70"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <span>Review & Place Order</span>
                                )}
                            </button>
                        </div>
                    </form>

                    {/* Order Brief */}
                    <div className="w-full lg:w-96">
                        <div className="bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl sticky top-32">
                            <h3 className="text-lg font-bold text-neutral-900 mb-6 border-b border-neutral-100 pb-4">In your bag</h3>

                            <div className="space-y-4 max-h-96 overflow-y-auto pr-2 mb-8">
                                {items.map(item => (
                                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                        <div className="w-16 h-20 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-bold text-neutral-900 truncate">{item.name}</p>
                                            <p className="text-neutral-500">Qty: {item.quantity} | Size: {item.size}</p>
                                            <p className="font-bold text-primary-600 mt-1">Rs. {item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-neutral-100">
                                <div className="flex justify-between text-sm font-medium text-neutral-600">
                                    <span>Subtotal</span>
                                    <span>Rs. {totalPrice().toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-sm font-medium text-neutral-600">
                                    <span>Shipping</span>
                                    <span className="text-primary-600">FREE</span>
                                </div>
                                <div className="flex justify-between text-xl font-black text-neutral-900 pt-3">
                                    <span>Total</span>
                                    <span>Rs. {totalPrice().toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-center space-x-2 text-neutral-400 text-[10px] font-bold uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" />
                                <span>Encrypted & Protected</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
