"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Lock, Mail, User, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
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
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                // Redirect to login after successful registration
                router.push('/account/login?registered=true');
            } else {
                setError(data.error || "Registration failed");
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
                        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-widest mb-4">
                            <ShieldCheck className="w-3 h-3" />
                            <span>Safe & Secure Registry</span>
                        </div>
                        <h1 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h1>
                        <p className="text-neutral-500">Join the Tooni Wear family today</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm mb-6 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                                <input
                                    required
                                    name="fullName"
                                    type="text"
                                    placeholder="John Doe"
                                    value={formData.fullName}
                                    onChange={handleInputChange}
                                    className="w-full bg-neutral-50 border border-neutral-100 rounded-2xl pl-12 pr-4 py-4 focus:outline-none focus:border-primary-500 transition-colors"
                                />
                            </div>
                        </div>

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
                            <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest ml-1">Password</label>
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

                        <p className="text-[10px] text-neutral-400 px-1">
                            By creating an account, you agree to our <Link href="#" className="underline">Terms and Conditions</Link> & <Link href="#" className="underline">Privacy Policy</Link>.
                        </p>

                        <button
                            disabled={isSubmitting}
                            className="w-full py-4 bg-primary-600 text-white rounded-2xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-neutral-100 text-center">
                        <p className="text-neutral-500 text-sm">
                            Already a member?{" "}
                            <Link href="/account/login" className="text-primary-600 font-bold hover:underline">Sign In</Link>
                        </p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
