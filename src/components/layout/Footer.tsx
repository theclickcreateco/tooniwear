import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="space-y-6">
                    <Link href="/" className="flex items-center space-x-2">
                        <span className="text-3xl font-bold tracking-tight">
                            <span className="text-primary-500">TOONI</span>
                            <span className="text-brand-gradient">WEAR</span>
                        </span>
                    </Link>
                    <p className="text-neutral-400 text-sm leading-relaxed">
                        Premium quality clothing for kids aged 2-8. Stylished, durable, and comfortable outfits for every play-ready moment.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Link href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 transition-colors rounded-full">
                            <Instagram className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 transition-colors rounded-full">
                            <Facebook className="w-5 h-5" />
                        </Link>
                        <Link href="#" className="p-2 bg-neutral-800 hover:bg-primary-600 transition-colors rounded-full">
                            <Twitter className="w-5 h-5" />
                        </Link>
                    </div>
                </div>

                {/* Categories */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold">Categories</h3>
                    <ul className="space-y-3">
                        <li><Link href="/shop?category=boys" className="text-neutral-400 hover:text-white transition-colors">Boys Collection</Link></li>
                        <li><Link href="/shop?category=girls" className="text-neutral-400 hover:text-white transition-colors">Girls Collection</Link></li>
                        <li><Link href="/shop?age=2-4y" className="text-neutral-400 hover:text-white transition-colors">Toddlers (2-4Y)</Link></li>
                        <li><Link href="/shop?sort=newest" className="text-neutral-400 hover:text-white transition-colors">New Arrivals</Link></li>
                        <li><Link href="/shop?on_sale=true" className="text-neutral-400 hover:text-white transition-colors">Sale</Link></li>
                    </ul>
                </div>

                {/* Customer Service */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold">Customer Service</h3>
                    <ul className="space-y-3">
                        <li><Link href="/contact" className="text-neutral-400 hover:text-white transition-colors">Contact Us</Link></li>
                        <li><Link href="/shipping" className="text-neutral-400 hover:text-white transition-colors">Shipping & Returns</Link></li>
                        <li><Link href="/size-guide" className="text-neutral-400 hover:text-white transition-colors">Size Guide</Link></li>
                        <li><Link href="/faq" className="text-neutral-400 hover:text-white transition-colors">FAQs</Link></li>
                        <li><Link href="/privacy" className="text-neutral-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="space-y-6">
                    <h3 className="text-lg font-bold">Get In Touch</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start space-x-3 text-neutral-400 text-sm">
                            <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                            <span>123 Fashion Street, Kids Valley, TX 75001</span>
                        </li>
                        <li className="flex items-center space-x-3 text-neutral-400 text-sm">
                            <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                            <span>+1 (234) 567-890</span>
                        </li>
                        <li className="flex items-center space-x-3 text-neutral-400 text-sm">
                            <Mail className="w-5 h-5 text-primary-500 shrink-0" />
                            <span>support@tooniwear.com</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-neutral-800 text-center text-neutral-500 text-xs shadow-inner">
                <p>&copy; {new Date().getFullYear()} Tooni Wear. All rights reserved. Built for fast performance.</p>
            </div>
        </footer>
    );
}
