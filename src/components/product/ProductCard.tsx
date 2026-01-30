"use client";

import Link from "next/link";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Product } from "@/lib/data";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/store/useCartStore";

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
            size: product.sizes[0], // Default to first size
        });
    };

    return (
        <div className="group bg-white rounded-3xl overflow-hidden border border-neutral-100 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/10 hover:-translate-y-1">
            <Link href={`/product/${product.id}`} className="block relative aspect-[4/5] overflow-hidden bg-neutral-100">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                        <span className="px-3 py-1 bg-primary-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-primary-500/20">
                            New
                        </span>
                    )}
                    {product.isOnSale && (
                        <span className="px-3 py-1 bg-brand-gradient text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-lg shadow-secondary-500/20">
                            Sale
                        </span>
                    )}
                </div>

                {/* Quick Actions */}
                <div className="absolute inset-x-4 bottom-4 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center space-x-2">
                    <button className="p-3 bg-white text-neutral-900 rounded-xl hover:bg-primary-600 hover:text-white transition-colors shadow-lg" aria-label="Quick View">
                        <Eye className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleAddToCart}
                        className="p-3 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20"
                        aria-label="Add to Cart"
                    >
                        <ShoppingCart className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white text-neutral-900 rounded-xl hover:bg-secondary-500 hover:text-white transition-colors shadow-lg" aria-label="Add to Wishlist">
                        <Heart className="w-5 h-5" />
                    </button>
                </div>
            </Link>

            <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-[0.2em]">{product.type}</span>
                    <div className="flex items-center space-x-1">
                        {product.color.map(c => (
                            <div key={c} className="w-2.5 h-2.5 rounded-full border border-neutral-200" title={c} />
                        ))}
                    </div>
                </div>

                <Link href={`/product/${product.id}`} className="block">
                    <h3 className="text-lg font-bold text-neutral-900 mb-2 truncate group-hover:text-primary-600 transition-colors">
                        {product.name}
                    </h3>
                </Link>

                <div className="flex items-center space-x-2">
                    <span className="text-xl font-black text-primary-600">Rs. {product.price}</span>
                    {product.originalPrice && (
                        <span className="text-sm text-neutral-400 line-through">Rs. {product.originalPrice}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
