import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

import JsonLd from "@/components/common/JsonLd";
import WhatsAppWidget from "@/components/common/WhatsAppWidget";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tooni Wear",
  "url": "https://tooniwear.com",
  "logo": "https://tooniwear.com/logo.jpg",
  "description": "Premium kids' fashion for ages 2-8.",
  "sameAs": [
    "https://instagram.com/tooniwear",
    "https://facebook.com/tooniwear"
  ]
};

export const metadata: Metadata = {
  title: "Tooni Wear | Kids' Fashion Store (Ages 2-8)",
  description: "Discover stylish, comfortable, and durable clothing for kids aged 2 to 8. Tooni Wear offers premium quality outfits for every occasion.",
  keywords: ["kids clothing", "childrens fashion", "2-8 years old", "tooni wear", "baby clothes"],
  authors: [{ name: "Tooni Wear Team" }],
  openGraph: {
    title: "Tooni Wear | Kids' Fashion Store",
    description: "Premium kids clothing for ages 2-8.",
    url: "https://tooniwear.com",
    siteName: "Tooni Wear",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>
        <JsonLd data={organizationSchema} />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
