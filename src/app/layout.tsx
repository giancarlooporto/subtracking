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
  title: "SubTracking | The Private Subscription Tracker & Audit Tool",
  description: "Stop wasting money on unused subscriptions. SubTracking is a privacy-first tool to track, manage, and audit your digital spending. No bank logins required. Calculate 10-year 'Ghost Costs' and save instantly.",
  keywords: [
    "subscription tracker no bank login",
    "private subscription manager",
    "track subscriptions manually",
    "subscription audit tool",
    "ghost costs calculator",
    "digital declutter finances",
    "SaaS spend management for individuals",
    "best way to track subscriptions 2026",
    "privacy first financial app"
  ],
  authors: [{ name: "SubTracking" }],
  openGraph: {
    title: "SubTracking: Track Smarter. Spend Less. (100% Private)",
    description: "The cleanest way to visualize your digital spending. See your renewal timeline and identify 'Ghost Costs' before they hit your bank.",
    url: "https://subtracking.app",
    siteName: "SubTracking",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SubTracking Dashboard - Private Subscription Management",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SubTracking | Stop the Ghost of Future Spending",
    description: "Audit your subscriptions in seconds. Privacy-first, manual tracking, zero bank logins.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    title: 'SubTracking',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: [
      { url: '/icon.png?v=final', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png?v=final', sizes: '180x180' },
    ],
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'SubTracking',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for Google (SEO)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SubTracking",
    "operatingSystem": "Web",
    "applicationCategory": "FinanceApplication",
    "description": "A privacy-first subscription tracking and audit tool that helps users manage digital spending without linking bank accounts.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Privacy-first (no bank login)",
      "Ghost Cost projections",
      "Renewal timeline",
      "Subscription audit wizard"
    ]
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
