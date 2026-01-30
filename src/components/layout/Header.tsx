"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const cartItemCount = useCartStore((state) => state.totalItems());

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const isActive = (href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-2 bg-white/80 backdrop-blur-md border-b border-neutral-100",
                isScrolled ? "shadow-sm" : ""
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden p-2 text-neutral-600"
                    onClick={() => setIsMenuOpen(true)}
                    aria-label="Open Menu"
                >
                    <Menu className="w-6 h-6" />
                </button>

                {/* Logo */}
                <Link href="/" className="flex items-center space-x-2 py-2">
                    <span className="text-2xl font-bold tracking-tight">
                        <span className="text-primary-600">TOONI</span>
                        <span className="text-brand-gradient">WEAR</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden lg:flex items-center space-x-8">
                    {NAVIGATION_ITEMS.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <div key={item.label} className="group relative">
                                <Link
                                    href={item.href}
                                    className={cn(
                                        "flex items-center py-4 text-sm font-bold transition-all relative",
                                        active ? "text-primary-600" : "text-neutral-700 hover:text-primary-600"
                                    )}
                                >
                                    {item.label}
                                    {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
                                    {active && (
                                        <span className="absolute bottom-3 left-0 right-0 h-0.5 bg-primary-500 rounded-full" />
                                    )}
                                </Link>

                                {item.children && (
                                    <div className="absolute top-full left-0 w-48 bg-white border border-neutral-100 shadow-xl rounded-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 -translate-y-2 group-hover:translate-y-0">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-primary-50 hover:text-primary-600"
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                {/* Actions */}
                <div className="flex items-center space-x-4">
                    <button className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-full transition-colors hidden sm:block" aria-label="Search">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link href="/account" className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-full transition-colors" aria-label="Account">
                        <User className="w-5 h-5" />
                    </Link>
                    <Link href="/cart" className="p-2 text-neutral-600 hover:bg-neutral-50 rounded-full transition-colors relative" aria-label="Cart">
                        <ShoppingBag className="w-5 h-5" />
                        {cartItemCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-secondary-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                                {cartItemCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={cn(
                    "fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300",
                    isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                )}
                onClick={() => setIsMenuOpen(false)}
            >
                <div
                    className={cn(
                        "fixed inset-y-0 left-0 w-3/4 max-w-xs bg-white p-6 transform transition-transform duration-300 flex flex-col",
                        isMenuOpen ? "translate-x-0" : "-translate-x-full"
                    )}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex items-center justify-between mb-8">
                        <span className="text-xl font-bold text-primary-600">TOONI WEAR</span>
                        <button onClick={() => setIsMenuOpen(false)} className="p-2">
                            <X className="w-6 h-6 text-neutral-600" />
                        </button>
                    </div>

                    <nav className="flex-1 overflow-y-auto">
                        {NAVIGATION_ITEMS.map((item) => (
                            <div key={item.label} className="mb-4">
                                <Link
                                    href={item.href}
                                    className="block py-2 text-lg font-semibold text-neutral-800"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </Link>
                                {item.children && (
                                    <div className="pl-4 mt-2 space-y-2 border-l-2 border-neutral-100">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.label}
                                                href={child.href}
                                                className="block py-1 text-sm text-neutral-600"
                                                onClick={() => setIsMenuOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t border-neutral-100">
                        <Link
                            href="/shop"
                            className="block w-full py-3 bg-primary-600 text-white text-center rounded-xl font-semibold shadow-lg shadow-primary-500/20"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop All Collection
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
