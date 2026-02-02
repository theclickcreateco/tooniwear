"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LoginPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/');
                // Refresh to update header state
                router.refresh();
            } else {
                setError(data.error || "Login failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50/50 flex flex-col">
            <Header />
            <main className="flex-1 pt-32 pb-24 px-4 flex items-center justify-center">
                <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-neutral-100 shadow-xl">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Welcome Back</h1>
                        <p className="text-neutral-500">Sign in to your Tooni Wear account</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    required
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary-500 transition-colors"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Password</label>
                                <Link href="#" className="text-xs font-bold text-primary-600 hover:underline">Forgot?</Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary-500 transition-colors"
                                />
                            </div>
                        </div>

                        <button
                            disabled={isSubmitting}
                            className="w-full py-4 bg-neutral-900 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/10 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                        <p className="text-neutral-500 text-sm">
                            Don't have an account?{" "}
                            <Link href="/account/register" className="text-primary-600 font-bold hover:underline">Join Now</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
