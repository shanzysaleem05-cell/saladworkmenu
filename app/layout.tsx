import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://saladworksmenu.us"),
  title: {
    template: "%s | SaladWorks Menu and Prices",
    default: "SaladWorks Menu Prices 2026 - Full Menu, Calories and Nutrition Guide",
  },
  description: "Experience the finest salads, wraps, melts and more - crafted fresh every day. View the complete SaladWorks menu, prices, calories, and nutritional info.",
  keywords: ["SaladWorks", "menu", "prices", "salads", "healthy food", "catering", "wraps", "soups"],
  authors: [{ name: "SaladWorksMenu.us Editorial Team" }],
  openGraph: {
    title: "SaladWorks Menu Prices 2026 - Full Menu, Calories and Nutrition Guide",
    description: "Experience the finest salads, wraps, melts and more - crafted fresh every day.",
    url: "https://saladworksmenu.us",
    siteName: "SaladWorks Menu",
    locale: "en_US",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "SaladWorks Menu Prices 2026 - Full Menu, Calories and Nutrition Guide",
    description: "Experience the finest salads, wraps, melts and more - crafted fresh every day.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // TODO: Replace with real Google Search Console 
  // verification code from search.google.com/search-console
  // Steps: Add property → HTML tag method → copy code → paste here
  verification: {
    google: "PASTE_YOUR_GOOGLE_VERIFICATION_CODE_HERE",
    other: {
      "msvalidate.01": "A6EAEA509CA4179CD677F37188E42FD1",
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/web-app-manifest-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/web-app-manifest-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SaladWorks Menu & Prices",
    "url": "https://saladworksmenu.us",
    "logo": "https://saladworksmenu.us/logo.png",
    "description": "Independent fan guide for SaladWorks menu prices, calories and nutrition information.",
    "sameAs": []
  };

  return (
    <html lang="en">
      <head>
        <meta name="msvalidate.01" content="A6EAEA509CA4179CD677F37188E42FD1" />
      </head>
      <body className={`${inter.variable} font-sans antialiased min-h-screen flex flex-col bg-site-bg text-site-black`}>
        <JsonLd data={orgSchema} />

        <Navbar />
        <main className="flex-1 pt-[140px] md:pt-[160px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
