"use client";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ProductCard from "@/components/product/ProductCard";
import FilterSystem from "@/components/product/FilterSystem";
import { PRODUCTS } from "@/lib/data";
import { ChevronDown, LayoutGrid, List } from "lucide-react";

export default function ShopPage() {
    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-28 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Breadcrumbs */}
                    <div className="mb-12">
                        <Breadcrumbs items={[{ label: "Shop All", href: "/shop" }]} />
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div className="space-y-2">
                                <h1 className="text-4xl font-bold text-neutral-900">Our <span className="text-brand-gradient">Collection</span></h1>
                                <p className="text-neutral-500">Discover {PRODUCTS.length} styles for your little ones</p>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-neutral-50 rounded-lg text-sm font-bold text-neutral-700 hover:bg-neutral-100 transition-colors">
                                        <span>Sort by: Newest</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="flex items-center p-1 bg-neutral-50 rounded-lg border border-neutral-100">
                                    <button className="p-1.5 bg-white text-primary-600 rounded-md shadow-sm">
                                        <LayoutGrid className="w-4 h-4" />
                                    </button>
                                    <button className="p-1.5 text-neutral-400 hover:text-neutral-600">
                                        <List className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* Sidebar */}
                        <FilterSystem />

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                                {PRODUCTS.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>

                            {/* Pagination Placeholder */}
                            <div className="mt-20 flex justify-center">
                                <button className="px-12 py-4 border-2 border-neutral-100 rounded-2xl font-bold text-neutral-900 hover:border-primary-500 hover:text-primary-600 transition-all">
                                    Load More Items
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
