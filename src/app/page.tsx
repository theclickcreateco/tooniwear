import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Stars, Truck, RefreshCw, ShieldCheck } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary-50 px-4 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-8 z-10 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-gradient text-white text-sm font-bold shadow-lg shadow-secondary-500/20">
                <Stars className="w-4 h-4" />
                <span>Play-Ready Outfits for Ages 2-8</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-tight">
                Designed for <br />
                <span className="text-secondary-500">Little Adventures</span>
              </h1>
              <p className="text-lg text-neutral-600 max-w-xl mx-auto lg:mx-0">
                Premium quality clothing that keeps up with your child. Durable, comfortable, and stylish outfits delivered right to your door.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  href="/shop"
                  className="w-full sm:w-auto px-8 py-4 bg-primary-600 text-white rounded-2xl font-bold text-lg shadow-xl shadow-primary-500/30 hover:bg-primary-700 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Shop New Arrivals</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/shop?on_sale=true"
                  className="w-full sm:w-auto px-8 py-4 bg-white text-neutral-900 border-2 border-neutral-100 rounded-2xl font-bold text-lg hover:bg-neutral-50 transition-all flex items-center justify-center"
                >
                  View Offers
                </Link>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg lg:max-w-none">
              <div className="absolute inset-0 bg-accent-500/20 blur-3xl rounded-full" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-neutral-100 aspect-[4/5] flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1519452635265-7b1fbfd1e4e0?q=80&w=1000&auto=format&fit=crop"
                  alt="Happy Kid Wearing Tooni Wear"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <p className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Top Pick</p>
                    <p className="font-bold text-neutral-900 underline decoration-primary-500 underline-offset-4">Adventure Denim Dungarees</p>
                  </div>
                  <span className="text-primary-600 font-bold">Rs. 34.99</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Row */}
        <section className="py-12 border-b border-neutral-100">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-white rounded-xl shadow-sm text-primary-500">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">Free Shipping</h4>
                <p className="text-xs text-neutral-500">On all orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-white rounded-xl shadow-sm text-secondary-500">
                <RefreshCw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">Easy Returns</h4>
                <p className="text-xs text-neutral-500">30-day hassle free returns</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-neutral-50 border border-neutral-100 hover:shadow-md transition-shadow">
              <div className="p-3 bg-white rounded-xl shadow-sm text-accent-500">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-neutral-900">Secure Payment</h4>
                <p className="text-xs text-neutral-500">100% encrypted & safe</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-24 px-4">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-neutral-900 mb-4">Shop by Category</h2>
            <p className="text-neutral-500">Explore our curated collections for boys and girls</p>
          </div>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Link href="/shop?category=boys" className="group relative rounded-3xl overflow-hidden h-96">
              <img
                src="https://images.unsplash.com/photo-1540479859555-17af45c78602?q=80&w=1000&auto=format&fit=crop"
                alt="Boys Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Boys Collection</h3>
                <p className="text-white/80 mb-6">Cool & comfortable sets for everyday play</p>
                <div className="inline-flex items-center space-x-2 text-white font-bold">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
            <Link href="/shop?category=girls" className="group relative rounded-3xl overflow-hidden h-96">
              <img
                src="https://images.unsplash.com/photo-1518833278268-517eb99f7ac4?q=80&w=1000&auto=format&fit=crop"
                alt="Girls Collection"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-10">
                <h3 className="text-3xl font-bold text-white mb-2">Girls Collection</h3>
                <p className="text-white/80 mb-6">Stylish dresses & outfits for every star</p>
                <div className="inline-flex items-center space-x-2 text-white font-bold">
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
