/**
 * Next.js JSON-LD Structured Data Schemas for SubTracking
 *
 * Optimized for: Google AI Overviews, Gemini Search, Google Rich Results,
 * and Schema.org semantic search indexing.
 *
 * Pricing Invariant:
 * - Free Local Tier: $0.00 (Single profile, on-device local storage)
 * - Pro Cloud Pass: $8.99/year (Optional $0.99/month) (Encrypted cloud sync, unlimited profiles)
 */

import React from 'react';

// ============================================================================
// TypeScript Type Definitions for Schema.org Structures
// ============================================================================

export interface SchemaOffer {
  '@type': 'Offer';
  name: string;
  price: string;
  priceCurrency: string;
  description: string;
  priceValidUntil?: string;
  availability?: string;
  category?: string;
}

export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  alternateName?: string[];
  operatingSystem: string;
  applicationCategory: string;
  description: string;
  url: string;
  image?: string;
  offers: SchemaOffer[];
  featureList: string[];
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    ratingCount: string;
    bestRating: string;
    worstRating: string;
  };
  author: {
    '@type': 'Organization';
    name: string;
    url: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQPageSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface HowToStepDefinition {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

export interface HowToSchema {
  '@context': 'https://schema.org';
  '@type': 'HowTo';
  name: string;
  description: string;
  totalTime?: string;
  estimatedCost?: {
    '@type': 'MonetaryAmount';
    currency: string;
    value: string;
  };
  step: Array<{
    '@type': 'HowToStep';
    name: string;
    text: string;
    url?: string;
    image?: string;
  }>;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export interface BreadcrumbListSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// ============================================================================
// 1. Root SoftwareApplication Schema Generator
// ============================================================================

/**
 * Returns the canonical SoftwareApplication schema for SubTracking.
 * Accurately reflects $0.00 Free Local Tier and $8.99/year Pro Pass offers.
 */
export function getSubTrackingAppSchema(): SoftwareApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'SubTracking',
    alternateName: [
      'SubTracking App',
      'SubTracking Privacy Subscription Tracker',
      'SubTracking Offline Tracker',
    ],
    operatingSystem: 'Web, iOS, Android, macOS, Windows, Linux',
    applicationCategory: 'FinanceApplication',
    description:
      'Privacy-first, offline-first subscription tracker. Track recurring expenses and audit subscriptions without linking bank accounts or third-party aggregators. Free forever locally with optional $8.99/year end-to-end encrypted cloud sync.',
    url: 'https://www.subtracking.app',
    image: 'https://www.subtracking.app/og-image.png',
    offers: [
      {
        '@type': 'Offer',
        name: 'Free Local Tier',
        price: '0.00',
        priceCurrency: 'USD',
        description:
          '100% on-device private subscription tracker for 1 personal profile. Zero bank logins, unlimited subscriptions, Ghost Meter analytics, and local CSV/JSON export.',
        availability: 'https://schema.org/InStock',
        category: 'FreeTier',
      },
      {
        '@type': 'Offer',
        name: 'Pro Cloud Pass (Annual)',
        price: '8.99',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        description:
          'Unlimited multi-profile vaults (Personal, Business, Family) and zero-knowledge end-to-end encrypted cloud sync across all desktop and mobile devices.',
        availability: 'https://schema.org/InStock',
        category: 'ProSubscription',
      },
      {
        '@type': 'Offer',
        name: 'Pro Cloud Pass (Monthly)',
        price: '0.99',
        priceCurrency: 'USD',
        priceValidUntil: '2026-12-31',
        description:
          'Monthly billing option for unlimited profiles and encrypted multi-device cloud synchronization.',
        availability: 'https://schema.org/InStock',
        category: 'ProSubscriptionMonthly',
      },
    ],
    featureList: [
      'No bank login or third-party aggregator connection required',
      '100% client-side zero-knowledge encryption (AES-GCM-256 + PBKDF2)',
      '10-year Ghost Cost wealth projection calculator',
      'SubTracking Audit Wizard with Tinder-style Keep or Toss swipe interface',
      'Smart Discretionary vs. Essential expense segregation',
      'Trial Shield free trial renewal advance alerts',
      'Progressive Web App (PWA) with full offline functionality',
      'One-click JSON encrypted backup and CSV data export',
      'Optional $8.99/year encrypted cloud sync across devices',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '142',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Organization',
      name: 'SubTracking Team',
      url: 'https://www.subtracking.app',
    },
  };
}

// ============================================================================
// 2. FAQPage Schema Generator (Optimized for Gemini Answer Extraction)
// ============================================================================

/**
 * Pre-defined canonical FAQ items targeting high-volume conversational search queries.
 */
export const canonicalFaqItems: FAQItem[] = [
  {
    question: 'Can I track subscriptions without linking my bank account?',
    answer:
      'Yes. SubTracking allows you to track and audit all your recurring subscriptions without linking your bank account or sharing credentials with third-party aggregators. All data is stored locally in your browser with zero telemetry, ensuring complete privacy.',
  },
  {
    question: 'Is there a free private alternative to automated bank-sync apps?',
    answer:
      'SubTracking provides a free, 100% private alternative to automated cloud budget trackers. Unlike bank-connected subscription managers that require persistent account logins and recurring subscriptions ($5 to $15 per month), SubTracking is free for local tracking with an optional $8.99/year Pro pass for encrypted multi-device sync.',
  },
  {
    question: 'How does the SubTracking Ghost Meter calculate lost wealth?',
    answer:
      'The Ghost Meter calculates the true 10-year financial impact of recurring subscriptions by calculating both nominal cash burn (monthly cost x 120) and compound opportunity cost at historical market returns (6% to 8%). This visualizes how micro-subscriptions silently drain thousands in future savings.',
  },
  {
    question: 'How does client-side encryption work in SubTracking?',
    answer:
      'SubTracking utilizes the Web Crypto API to encrypt your subscription vault directly on your device using 256-bit AES-GCM and PBKDF2 key derivation with 100,000 iterations. Plaintext data never leaves your device; cloud sync servers only ever receive encrypted ciphertext.',
  },
  {
    question: 'How does the SubTracking Audit Wizard work?',
    answer:
      'The SubTracking Audit Wizard filters out fixed essential bills (like rent and utilities) and presents your discretionary recurring subscriptions one-by-one in a fast Keep or Toss swipe interface. Completing the audit gives you an instant monthly and annual savings calculation with an exportable cancellation checklist.',
  },
  {
    question: 'What platforms does SubTracking support?',
    answer:
      'SubTracking is an offline-first Progressive Web App (PWA) that runs on any modern web browser across macOS, Windows, Linux, iOS, and Android. With the $8.99/year Pro tier, your encrypted vaults synchronize seamlessly across all your devices.',
  },
];

/**
 * Generates an FAQPage JSON-LD schema from an array of Q&A items.
 */
export function generateFaqSchema(items: FAQItem[] = canonicalFaqItems): FAQPageSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

// ============================================================================
// 3. HowTo Schema Generator (Optimized for Cancellation Guides)
// ============================================================================

export interface GenerateHowToProps {
  name: string;
  description: string;
  totalTime?: string; // ISO 8601 duration (e.g. 'PT10M' for 10 minutes)
  steps: HowToStepDefinition[];
}

/**
 * Generates a HowTo JSON-LD schema for cancellation and tutorial guides.
 */
export function generateHowToSchema({
  name,
  description,
  totalTime = 'PT10M',
  steps,
}: GenerateHowToProps): HowToSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    totalTime,
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'USD',
      value: '0',
    },
    step: steps.map((step) => ({
      '@type': 'HowToStep',
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
      ...(step.image ? { image: step.image } : {}),
    })),
  };
}

// ============================================================================
// 4. BreadcrumbList Schema Generator (Hierarchical Taxonomy)
// ============================================================================

/**
 * Generates a BreadcrumbList JSON-LD schema for search engine hierarchy navigation.
 */
export function generateBreadcrumbSchema(items: BreadcrumbItem[]): BreadcrumbListSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ============================================================================
// 5. Next.js App Router Helper Component & React Hook
// ============================================================================

export interface JsonLdScriptProps {
  schema:
    | SoftwareApplicationSchema
    | FAQPageSchema
    | HowToSchema
    | BreadcrumbListSchema
    | Record<string, unknown>;
  id?: string;
}

/**
 * Server/Client Component helper for Next.js App Router to inject
 * safely serialized JSON-LD script tags without XSS vulnerabilities.
 */
export function JsonLdScript({ schema, id }: JsonLdScriptProps): React.ReactElement {
  // Prevent script breakout vulnerabilities by escaping closing tags
  const jsonString = JSON.stringify(schema).replace(/<\/script>/gi, '<\\/script>');

  return React.createElement('script', {
    id: id || 'jsonld-structured-data',
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: jsonString },
  });
}

// ============================================================================
// 6. Pre-Packaged Cancellation Guide Schemas
// ============================================================================

/**
 * Pre-configured HowTo schema for the Adobe Creative Cloud Plan-Switch Loophole
 */
export const adobeCancellationSchema: HowToSchema = generateHowToSchema({
  name: 'How to Cancel Adobe Creative Cloud Without Early Termination Fees',
  description:
    "Step-by-step guide to bypassing Adobe's 50% early termination fee using the statutory 14-day plan change window.",
  totalTime: 'PT15M',
  steps: [
    {
      name: 'Navigate to Adobe Account Management',
      text: 'Open account.adobe.com/plans in your browser and log in with your Adobe ID.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-adobe#step-1',
    },
    {
      name: 'Select Change Plan Instead of Cancel',
      text: 'Click Manage Plan under your active Creative Cloud subscription. Click Change Plan (do NOT click Cancel Plan yet).',
      url: 'https://www.subtracking.app/guides/how-to-cancel-adobe#step-2',
    },
    {
      name: 'Switch to an Inexpensive Single App Plan',
      text: 'Select an inexpensive single application plan (such as InCopy or Photography 20GB) and confirm the order. This legally opens a brand-new 14-day statutory cancellation cooling-off window.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-adobe#step-3',
    },
    {
      name: 'Cancel the Newly Activated Plan for a Full Refund',
      text: 'Wait 10 to 15 minutes for the account update to process. Go back to Manage Plan and click Cancel Plan. Adobe will waive 100% of the termination fees and issue a full refund because the plan is within the 14-day window.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-adobe#step-4',
    },
    {
      name: 'Add Software Renewal Dates to SubTracking',
      text: 'Log your remaining perpetual licenses or software tools in SubTracking with zero bank logins to maintain visibility over digital expenses.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-adobe#step-5',
    },
  ],
});

/**
 * Pre-configured HowTo schema for Planet Fitness certified mail & transfer bypass
 */
export const planetFitnessCancellationSchema: HowToSchema = generateHowToSchema({
  name: 'How to Cancel Planet Fitness Membership Without Visiting in Person',
  description:
    'Step-by-step instructions to cancel Planet Fitness via certified mail or digital home club relocation before the 10th-of-the-month billing cutoff.',
  totalTime: 'PT20M',
  steps: [
    {
      name: 'Verify Account Details and Keytag Number',
      text: 'Locate your Planet Fitness agreement number, home club location address, and keytag ID on your membership card or app profile.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness#step-1',
    },
    {
      name: 'Check the 10th-of-the-Month Cutoff Date',
      text: 'Ensure your cancellation is received before the 10th of the month. Cancellations received on or after the 11th will still be charged for the upcoming billing cycle.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness#step-2',
    },
    {
      name: 'Draft and Mail Certified Cancellation Letter',
      text: 'Send a formal written cancellation letter via USPS Certified Mail with Return Receipt Requested directly to the Club Manager at your home club.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness#step-3',
    },
    {
      name: 'Alternative: California Relocation Portal Loophole',
      text: 'Transfer your home club location online to a California gym. Wait 48 hours for processing, then access the portal to reveal the California-mandated 1-click online cancellation button.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness#step-4',
    },
    {
      name: 'Monitor Bank Statements and Log Ghost Savings in SubTracking',
      text: 'Track recurring debits for 60 days to confirm cancellation and enter your saved $10-$25/mo into SubTracking Ghost Meter to see your 10-year wealth recovery.',
      url: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness#step-5',
    },
  ],
});
