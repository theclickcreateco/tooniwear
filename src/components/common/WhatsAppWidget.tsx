"use client";

import { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function WhatsAppWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        // Show the widget after a short delay
        const timer = setTimeout(() => setIsVisible(true), 1500);
        return () => clearTimeout(timer);
    }, []);

    const whatsappNumber = "923212481412";

    // Auto-detect order ID from URL if on order page
    useEffect(() => {
        if (pathname.includes('/account/orders/')) {
            const orderId = pathname.split('/').pop();
            // Ensure we have a real ID and not just the 'orders' path
            if (orderId && orderId !== 'orders' && orderId.length > 5) {
                setUserMessage(`Hi, I need help with my order #${orderId}: `);
            }
        }
    }, [pathname, isOpen]);

    const handleSend = () => {
        if (!userMessage.trim()) return;
        const encodedMsg = encodeURIComponent(userMessage);
        window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
        setIsOpen(false);
    };

    return (
        <div className={cn(
            "fixed bottom-6 right-6 z-[9999] transition-all duration-500 flex flex-col items-end",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        )}>
            {/* Chat Popup */}
            <div className={cn(
                "mb-4 w-80 bg-white rounded-3xl shadow-2xl border border-neutral-100 overflow-hidden transition-all duration-300 transform origin-bottom-right",
                isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none"
            )}>
                {/* Header */}
                <div className="bg-primary-600 p-5 text-white flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                            <MessageCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="font-bold text-sm">Tooni Support</p>
                            <div className="flex items-center space-x-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <p className="text-[10px] opacity-80">Online & Ready to Help</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-lg transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-5 bg-neutral-50 space-y-4 max-h-[400px] overflow-y-auto">
                    <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-sm text-neutral-600 border border-neutral-100 italic">
                        Hi there! 👋 How can we help you today with your Play-Ready outfit?
                    </div>

                    <div className="space-y-2">
                        <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest ml-1">Your Message</p>
                        <textarea
                            value={userMessage}
                            onChange={(e) => setUserMessage(e.target.value)}
                            placeholder="Type your inquiry here..."
                            className="w-full bg-white border border-neutral-200 rounded-2xl p-4 text-sm focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none resize-none h-24"
                        />
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 bg-white border-t border-neutral-50">
                    <button
                        onClick={handleSend}
                        disabled={!userMessage.trim()}
                        className="w-full py-3.5 bg-primary-600 text-white rounded-xl font-bold flex items-center justify-center space-x-2 hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-500/20 active:scale-[0.98]"
                    >
                        <Send className="w-4 h-4" />
                        <span>Send to WhatsApp</span>
                    </button>
                    <p className="text-[9px] text-neutral-400 text-center mt-3 font-medium">Opening WhatsApp Business...</p>
                </div>
            </div>

            {/* Bubble Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-95 group relative",
                    isOpen ? "bg-neutral-900 text-white rotate-90" : "bg-primary-600 text-white"
                )}
                aria-label="WhatsApp Support"
            >
                {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-7 h-7" />}

                {!isOpen && (
                    <>
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-500 border-2 border-white rounded-full flex items-center justify-center text-[8px] font-bold text-white z-10">1</span>
                        <span className="absolute -top-1 -right-1 w-4 h-4 bg-secondary-500 border-2 border-white rounded-full animate-ping" />
                    </>
                )}
            </button>
        </div>
    );
}
