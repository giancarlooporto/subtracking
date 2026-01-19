import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Optimized title with primary keyword (60 chars max for Google) 
  title: "SubTracking - Privacy-First Subscription Tracker App",

  // SEO-optimized description (155 chars for ideal snippet length)
  description: "Track subscriptions without bank logins. Find unused subscriptions, save $450/year. Privacy-first expense tracker. $19 lifetime. No cloud storage.",

  // Enhanced keywords based on search volume research
  keywords: [
    // High-volume primary keywords (22k+ searches/month)
    "subscription tracker app",
    "expense tracker",
    "budget tracker",
    "spending tracker",

    // Medium-volume target keywords
    "subscription manager app",
    "bill tracker app",
    "recurring payment tracker",
    "money manager app",

    // Privacy-focused keywords (competitive advantage)
    "subscription tracker no bank login",
    "privacy subscription manager",
    "offline subscription tracker",
    "local storage expense tracker",
    "private subscription tracking",

    // Feature-based long-tail keywords
    "subscription tracker with calendar",
    "trial reminder app",
    "ghost cost calculator",
    "multi-profile subscription manager",

    // Competitor alternative keywords
    "automated tracker alternative",
    "subscription tracker alternative privacy",
    "subscription tracker without bank sync",

    // Value proposition keywords
    "lifetime subscription tracker",
    "one-time payment expense tracker",
    "affordable subscription manager",
    "cancel unused subscriptions app"
  ],

  authors: [{ name: "SubTracking", url: "https://subtracking.app" }],
  creator: "SubTracking",
  publisher: "SubTracking",

  // Add robots meta for SEO
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Add alternates for canonical URL
  alternates: {
    canonical: 'https://subtracking.app',
  },

  // Enhanced OpenGraph with more details
  openGraph: {
    title: "SubTracking - Privacy-First Subscription Tracker (Save $450/Year)",
    description: "Track subscriptions without giving up privacy. No bank logins, no cloud storage. Find unused subscriptions and stop wasting money. $19 lifetime access.",
    url: "https://subtracking.app",
    siteName: "SubTracking",
    images: [
      {
        url: "https://subtracking.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubTracking App - Privacy-First Subscription Tracker Dashboard",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  // Enhanced Twitter card
  twitter: {
    card: "summary_large_image",
    title: "SubTracking - Track Subscriptions Privately (No Bank Login)",
    description: "Privacy-first subscription tracker. Find unused subscriptions and save $450/year. $19 lifetime, no monthly fees.",
    images: ["https://subtracking.app/og-image.png"],
    creator: "@subtracking",
    site: "@subtracking",
  },

  // PWA and mobile optimization
  appleWebApp: {
    title: 'SubTracking',
    statusBarStyle: 'black-translucent',
    capable: true,
  },

  // Comprehensive icon set
  icons: {
    icon: [
      { url: '/icon.png?v=final', sizes: 'any', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=final', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/icon.png?v=final'],
  },

  // Additional mobile metadata
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': 'SubTracking',
  },

  // Verification tags (add your codes when you have them)
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Enhanced Structured Data for Google (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SubTracking",
    "operatingSystem": "Web",
    "applicationCategory": "FinanceApplication",
    "description": "A privacy-first subscription tracking and audit tool that helps users manage digital spending without linking bank accounts. Track subscriptions, find unused services, and save money with complete privacy.",
    "url": "https://subtracking.app",
    "offers": {
      "@type": "Offer",
      "price": "19.00",
      "priceCurrency": "USD",
      "priceValidUntil": "2026-12-31",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "SubTracking"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "featureList": [
      "Privacy-first (no bank login required)",
      "Ghost Cost 10-year projections",
      "Visual renewal timeline and calendar",
      "Subscription audit wizard",
      "Multi-profile support (Personal, Business, Family)",
      "Trial Shield - free trial reminders",
      "Local storage only - no cloud sync",
      "Export to CSV",
      "Calendar integration"
    ],
    "softwareVersion": "1.0",
    "screenshot": "https://subtracking.app/og-image.png",
    "author": {
      "@type": "Organization",
      "name": "SubTracking",
      "url": "https://subtracking.app"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
