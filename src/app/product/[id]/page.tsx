"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { PRODUCTS } from "@/lib/data";
import { ShoppingBag, Heart, Share2, ShieldCheck, Truck, RefreshCw, Star } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { cn } from "@/lib/utils";

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const product = PRODUCTS.find((p) => p.id === params.id);
    const addItem = useCartStore((state) => state.addItem);

    const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || "");
    const [selectedColor, setSelectedColor] = useState(product?.color[0] || "");
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
                    <button onClick={() => router.push("/shop")} className="text-primary-600 font-bold underline">Go back to shop</button>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: quantity,
            image: product.image,
            size: selectedSize,
        });
        // Optional: Redirect to cart or show drawer
    };

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <main className="pt-28 pb-24 px-4">
                <div className="max-w-7xl mx-auto">
                    <Breadcrumbs items={[
                        { label: "Shop", href: "/shop" },
                        { label: product.category === "boys" ? "Boys" : "Girls", href: `/shop?category=${product.category}` },
                        { label: product.name, href: `/product/${product.id}` }
                    ]} />

                    <div className="mt-8 flex flex-col lg:flex-row gap-16">
                        {/* Gallery */}
                        <div className="flex-1 space-y-6">
                            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-xl">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-neutral-100 cursor-pointer border-2 border-transparent hover:border-primary-500 transition-colors">
                                        <img src={product.image} alt="Gallery" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-2">
                                    <div className="flex text-accent-500">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                                    </div>
                                    <span className="text-sm text-neutral-500 font-medium">(48 Reviews)</span>
                                </div>
                                <h1 className="text-4xl font-bold text-neutral-900 tracking-tight">{product.name}</h1>
                                <div className="flex items-center space-x-4">
                                    <span className="text-3xl font-black text-primary-600">Rs. {product.price}</span>
                                    {product.originalPrice && (
                                        <span className="text-xl text-neutral-400 line-through">Rs. {product.originalPrice}</span>
                                    )}
                                </div>
                                <p className="text-neutral-600 leading-relaxed text-lg">{product.description}</p>
                            </div>

                            {/* Selection */}
                            <div className="space-y-8 py-8 border-y border-neutral-100">
                                {/* Colors */}
                                <div className="space-y-3">
                                    <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-widest">Select Color: <span className="text-neutral-400 font-medium ml-2">{selectedColor}</span></h4>
                                    <div className="flex items-center space-x-3">
                                        {product.color.map(color => (
                                            <button
                                                key={color}
                                                onClick={() => setSelectedColor(color)}
                                                className={cn(
                                                    "w-10 h-10 rounded-full border-2 transition-all p-0.5",
                                                    selectedColor === color ? "border-primary-500" : "border-transparent"
                                                )}
                                            >
                                                <div className="w-full h-full rounded-full border border-neutral-200" title={color} style={{ backgroundColor: color.toLowerCase() }} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Sizes */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <h4 className="font-bold text-neutral-900 text-sm uppercase tracking-widest">Select Size: <span className="text-neutral-400 font-medium ml-2">{selectedSize}</span></h4>
                                        <button className="text-xs font-bold text-primary-600 underline">Size Guide</button>
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        {product.sizes.map(size => (
                                            <button
                                                key={size}
                                                onClick={() => setSelectedSize(size)}
                                                className={cn(
                                                    "px-6 py-3 rounded-xl border-2 font-bold text-sm transition-all",
                                                    selectedSize === size
                                                        ? "border-primary-500 bg-primary-50 text-primary-600"
                                                        : "border-neutral-100 bg-transparent text-neutral-500 hover:border-neutral-200"
                                                )}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Quantity & Add to Cart */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <div className="flex items-center border-2 border-neutral-100 rounded-xl px-2 h-14">
                                        <button
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                            className="p-2 text-neutral-500 hover:text-primary-600"
                                        >
                                            -
                                        </button>
                                        <span className="w-12 text-center font-bold text-neutral-900">{quantity}</span>
                                        <button
                                            onClick={() => setQuantity(quantity + 1)}
                                            className="p-2 text-neutral-500 hover:text-primary-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-1 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center space-x-3 hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 h-14"
                                    >
                                        <ShoppingBag className="w-5 h-5" />
                                        <span>Add to Bag</span>
                                    </button>
                                    <button className="p-4 border-2 border-neutral-100 rounded-xl hover:border-secondary-500 hover:text-secondary-500 transition-all h-14">
                                        <Heart className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Guarantees */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
                                <div className="flex items-center space-x-3">
                                    <Truck className="w-5 h-5 text-neutral-400" />
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Fast Delivery</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <RefreshCw className="w-5 h-5 text-neutral-400" />
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">30-Day Return</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <ShieldCheck className="w-5 h-5 text-neutral-400" />
                                    <span className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Secure Payment</span>
                                </div>
                            </div>

                            <div className="pt-4 flex items-center space-x-4">
                                <button className="text-sm font-bold text-neutral-400 hover:text-primary-600 flex items-center space-x-2 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span>Share with Friends</span>
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
