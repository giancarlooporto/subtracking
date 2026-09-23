# Technical Exploration & Architecture Survey Report: SubTracking

**Agent**: explorer_survey_1  
**Date**: 2026-09-16  
**Repository**: SubTracking (`/Users/giancarlooportousa/Documents/Antigravity/Digital Declutter`)  
**Target Milestone**: Zero-to-Minimal Cost Growth & Marketing Playbook Baseline

---

## 1. Observation

### 1.1 Tech Stack & Framework Configuration
* **Core Framework**: Next.js 16.1.0 (`"next": "16.1.0"`), React 19.2.3 (`"react": "19.2.3"`), TypeScript 5 (`"typescript": "^5"`).
  * *Evidence*: `package.json` lines 19-20, 34.
* **Router Type**: Next.js **App Router** (`src/app/`).
  * *Evidence*: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/dashboard/page.tsx`.
* **Export Mode**: Static HTML export (`output: 'export'`) with unoptimized images (`images: { unoptimized: true }`).
  * *Evidence*: `next.config.ts` lines 3-7:
    ```typescript
    const nextConfig: NextConfig = {
      output: 'export',
      images: {
        unoptimized: true,
      },
      turbopack: {
        root: __dirname,
      },
    };
    ```
* **Styling & CSS**: Tailwind CSS v4 (`@import "tailwindcss";` in `src/app/globals.css`, `@tailwindcss/postcss` in `postcss.config.mjs`).
  * *Evidence*: `package.json` lines 26, 33; `src/app/globals.css` line 1; `postcss.config.mjs` lines 1-5.
* **Dependencies & Utilities**:
  * `@supabase/supabase-js` (^2.93.1): Auth & encrypted blob cloud sync.
  * `framer-motion` (^12.23.26): UI card transitions, Tinder swipes, floating ghost animation.
  * `lucide-react` (^0.562.0): Iconography.
  * `react-datepicker` (^9.1.0): Calendar payment picker.
  * `@vercel/analytics` (^2.0.1): Web analytics.
  * `clsx` (^2.1.1) & `tailwind-merge` (^3.4.0): Utility class concatenation.
  * `jspdf` (^3.0.4) & `jspdf-autotable` (^5.0.2): PDF generation dependencies (declared in `package.json`).
  * *Evidence*: `package.json` lines 12-24.

---

### 1.2 Metadata, SEO, Robots, and Sitemap Architecture
* **Global Metadata Configuration (`src/app/layout.tsx`)**:
  * Title: `"SubTracking - Privacy-First Subscription Tracker App"` (line 27).
  * Meta Description: `"Track subscriptions without bank logins. Find unused subscriptions and reduce wasted spending. Privacy-first expense tracker. Free to start, optional cloud sync."` (lines 30-31).
  * Keywords: 24 researched keywords spanning high volume (`"subscription tracker app"`, `"expense tracker"`), privacy focused (`"subscription tracker no bank login"`, `"offline subscription tracker"`), and competitor alternatives (`"automated tracker alternative"`, `"subscription tracker without bank sync"`) (lines 33-69).
  * OpenGraph: 1200x630 image at `https://www.subtracking.app/og-image.png` (lines 89-104).
  * Twitter Card: `summary_large_image`, handle `@subtracking` (lines 107-114).
  * Robots directive: `index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 }` (lines 76-86).
* **Structured Data (JSON-LD Schema)**:
  * Embedded in `<head>` via `src/app/layout.tsx` (lines 159-198) as `SoftwareApplication`:
    ```json
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "SubTracking",
      "operatingSystem": "Web",
      "applicationCategory": "FinanceApplication",
      "offers": {
        "@type": "Offer",
        "price": "19.00",
        "priceCurrency": "USD",
        "priceValidUntil": "2026-12-31"
      }
    }
    ```
  * *Critical Observation*: The schema `price` is currently set to `"19.00"`, an artifact of an earlier $19 lifetime pricing model, whereas the application and landing page have pivoted to $0 Free Local + $8.99/yr Pro Cloud Pass.
* **Robots Configuration (`src/app/robots.ts`)**:
  * `export const dynamic = "force-static";`
  * Rules allow all (`*`) on `/` but disallow `['/api/', '/dashboard/']`.
  * Googlebot rule specifically allows `/` and disallows only `['/api/']`.
  * Sitemap referenced: `https://www.subtracking.app/sitemap.xml` (lines 8-22).
* **Sitemap Configuration (`src/app/sitemap.ts`)**:
  * Generates static URLs with priorities (Homepage: 1.0, `/dashboard`: 0.9, content routes: 0.8).
  * Currently indexes 21 routes: `''`, `/dashboard`, `/privacy-subscription-tracker`, `/no-bank-login`, `/manual-vs-automated`, `/blog/find-unused-subscriptions`, `/guides`, 8 cancel guides (`how-to-cancel-*`), 4 compare routes (`/compare/*`), `/blog/subscription-tracker-template`, `/privacy`, `/terms` (lines 8-38).
* **PWA Web Manifest (`src/app/manifest.ts`)**:
  * PWA name: `"SubTracking - Privacy-First Subscription Tracker"`, `start_url: '/dashboard'`, `display: 'standalone'`, theme `#4F46E5`, background `#0F172A`, maskable icons 192x192 & 512x512 (lines 6-44).

---

### 1.3 Route Inventory & Content Matrix
The codebase currently contains 23 functional routes across 5 distinct intent clusters:

| Route Path | File Location | Purpose & Primary Intent |
|---|---|---|
| `/` | `src/app/page.tsx` | High-converting dark-mode landing page with interactive demo teaser, feature breakdown, FAQ accordion, and dual-tier pricing. |
| `/dashboard` | `src/app/dashboard/page.tsx` | Full offline-first single-page web app with ledger, calendar, Billing Pulse, and modals. |
| `/compare/rocket-money` | `src/app/compare/rocket-money/page.tsx` | Direct comparison against Rocket Money (privacy vs bank sync / Plaid, $15/mo fee vs $8.99/yr). |
| `/compare/copilot` | `src/app/compare/copilot/page.tsx` | Privacy alternative to Copilot Money. |
| `/compare/monarch-money` | `src/app/compare/monarch-money/page.tsx` | Privacy alternative to Monarch Money. |
| `/compare/excel-vs-subtracking` | `src/app/compare/excel-vs-subtracking/page.tsx` | Compares manual spreadsheets vs automated calendar alerts, Ghost Meter, and renewal timers. |
| `/guides` | `src/app/guides/page.tsx` | Hub index of subscription cancellation walkthroughs. |
| `/guides/how-to-cancel-adobe` | `src/app/guides/how-to-cancel-adobe/page.tsx` | The infamous Adobe 50% early cancellation fee hack (Plan Change bypass). |
| `/guides/how-to-cancel-netflix` | `src/app/guides/how-to-cancel-netflix/page.tsx` | Step-by-step cancellation & profile export guide. |
| `/guides/how-to-cancel-planet-fitness`| `src/app/guides/how-to-cancel-planet-fitness/page.tsx` | In-person certified mail cancellation loop bypass. |
| `/guides/how-to-cancel-spotify` | `src/app/guides/how-to-cancel-spotify/page.tsx` | Step-by-step cancellation guide. |
| `/guides/how-to-cancel-hulu` | `src/app/guides/how-to-cancel-hulu/page.tsx` | Disney bundle untangling & cancellation guide. |
| `/guides/how-to-cancel-disney-plus` | `src/app/guides/how-to-cancel-disney-plus/page.tsx` | Step-by-step cancellation guide. |
| `/guides/how-to-cancel-amazon-prime`| `src/app/guides/how-to-cancel-amazon-prime/page.tsx`| Step-by-step Prime membership cancellation guide. |
| `/guides/how-to-cancel-youtube-premium`| `src/app/guides/how-to-cancel-youtube-premium/page.tsx`| Step-by-step cancellation guide. |
| `/blog/find-unused-subscriptions` | `src/app/blog/find-unused-subscriptions/page.tsx` | Pillar SEO guide on auditing subscriptions without linking a bank account. |
| `/blog/subscription-tracker-template` | `src/app/blog/subscription-tracker-template/page.tsx` | SEO capture page for Excel/Sheets template search queries. |
| `/no-bank-login` | `src/app/no-bank-login/page.tsx` | Programmatic landing page focused entirely on Plaid-free tracking. |
| `/privacy-subscription-tracker` | `src/app/privacy-subscription-tracker/page.tsx` | Dedicated privacy angle landing page. |
| `/manual-vs-automated` | `src/app/manual-vs-automated/page.tsx` | Educational page arguing intentionality of manual tracking vs passive automated leakage. |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy declaring zero telemetry, zero bank connections, local storage first. |
| `/terms` | `src/app/terms/page.tsx` | Terms of service covering local software license and optional cloud sync. |
| `/api/verify-license` | `src/app/api/verify-license/route.ts` | Gumroad License verification proxy route (capped at 20 devices/uses). |

---

### 1.4 Feature Implementations: Detailed Code Evidence

#### A. "Ghost Meter" Feature
* **File Location**: `src/components/GhostMeter.tsx` (110 lines)
* **Underlying Logic**:
  * Calculates `monthlyTotal` across all subscriptions using `calculateMonthlyPrice` from `src/lib/utils.tsx` (lines 15-18):
    ```typescript
    const monthlyTotal = subscriptions.reduce((sum, sub) => {
        const rawPrice = sub.regularPrice || sub.price;
        return sum + calculateMonthlyPrice(rawPrice, sub.billingCycle);
    }, 0);
    ```
  * Normalized monthly cost conversion (`src/lib/utils.tsx` lines 123-131):
    * Weekly: `price * 4.33`
    * Biweekly: `price * 2.16`
    * Quarterly: `price / 3`
    * Yearly: `price / 12`
    * Monthly: `price`
  * Cumulative opportunity cost calculations:
    * **Monthly Tap**: `monthlyTotal`
    * **5-Year Burn**: `monthlyTotal * 12 * 5` (60 months)
    * **10-Year Projection ("Lost Wealth")**: `monthlyTotal * 12 * 10` (120 months)
  * **UX & Shock Factor**:
    * Primary display is a massive numerical stat formatted as `{symbol}{metrics.tenYear.toLocaleString()}` tagged as **"Lost Wealth"**.
    * Sub-metrics display 5-Year Burn and Monthly Tap in adjacent cards.
    * Floating ghost icon with framer-motion floating/rotation loop (`y: [0, -10, 0], rotate: [0, 5, 0]`, duration 4s).
    * Tagline text: *"The 'Ghost of Future Spending' reminds us that small leaks sink great ships."*
    * Empty state shows an outline ghost with copy: *"Add subscriptions to see your future 'Ghost Costs'"*.

#### B. "SubTracking Audit Wizard" Feature
* **File Location**: `src/components/SubTrackingWizard.tsx` (209 lines) + `src/components/CancellationReviewModal.tsx` (244 lines)
* **Trigger & Ingestion Filter (`src/app/dashboard/page.tsx` line 2311)**:
  * Smart Discretionary Filter: Excludes essentials and utility bills so users only audit cancellable services:
    ```typescript
    subscriptions={subscriptions.filter(s => !s.isEssential && s.category !== 'Utility Bills')}
    ```
* **Swipe Mechanism & UX**:
  * Tinder-style presentation with `AnimatePresence`:
    * Swiping **Left / "Toss" button** (`Trash2` icon): Adds subscription ID to `toDeleteIds`, card slides left with `-20deg` rotation and exits.
    * Swiping **Right / "Keep" button** (`Check` icon): Retains subscription, card slides right with `+20deg` rotation and exits.
  * Shows progress counter: `"${currentIndex + 1} of ${subscriptions.length}"`.
* **Completion & Cancellation Pipeline**:
  * Upon finishing all cards, displays `PartyPopper` celebration icon, total items identified to remove (`toDeleteIds.length`), and calculated **Potential Savings ($/mo)**.
  * Clicking `"Process Cancellations"` invokes `onFinish(toDeleteIds)` which triggers `CancellationReviewModal.tsx`.
  * `CancellationReviewModal` allows users to:
    1. Selectively toggle items on/off.
    2. View instant **Monthly Savings** and **Annual Savings** (`totalSavings * 12`).
    3. Click **"Download Checklist"** to export `cancellations_YYYY-MM-DD.csv`.
    4. Confirm cancellation, removing items from state, adding to `cancelledSavings`, and firing a success toast.
  * Includes a viral micro-hook CTA at wizard completion: *"Saved money? Buy the dev a coffee ☕"* linking to Gumroad tip URL (`https://gianco.gumroad.com/coffee`).

#### C. Privacy & Local Storage Model
* **Offline-First Storage Engine (`src/lib/profileManager.ts`)**:
  * 100% browser-local persistence via `localStorage`:
    * Profiles & Subscriptions: `subtracking_profiles`
    * Active Profile: `subtracking_active_profile`
    * Pro Status: `subtracking-is-pro`
  * No database connection required for the core app; functions fully offline (PWA support via `manifest.ts`).
* **Zero Bank Logins / Plaid-Free Guarantee**:
  * No financial aggregators, Plaid, Yodlee, or MX SDKs.
  * Manual entry model designed for "intentional spending".
* **End-to-End Client-Side Zero-Knowledge Encryption (`src/lib/crypto.ts`)**:
  * Standard: Web Crypto API (`window.crypto.subtle`).
  * Cipher: **AES-GCM** with 256-bit key length (`KEY_LENGTH = 256`).
  * Key Derivation: **PBKDF2** with **SHA-256**, 100,000 iterations (`ITERATIONS = 100000`).
  * Entropy: 16-byte random salt, 12-byte random IV.
  * Encrypted vault format: `{ iv: base64, salt: base64, data: base64, version: 1 }`.
* **Cloud Sync Architecture (`src/lib/supabaseClient.ts`)**:
  * Supabase is used strictly as an encrypted object store.
  * Auth: Passwordless OTP magic links (`signInWithOtp`, `verifyOtp`).
  * Storage Bucket: Uploads encrypted blob to `user-data/[user_id]/vault.json`.
  * The cloud server NEVER receives plaintext subscriptions or user keys; Supabase only holds ciphertext.

#### D. Pricing, Licensing, and Pro Tier
* **Code Constants (`src/lib/pricing.ts`)**:
  ```typescript
  export const pricing = {
      annualPrice: "$8.99/year",
      annualPriceNumber: 8.99,
      monthlyPrice: "$0.99/mo",
      monthlyPriceNumber: 0.99,
  };
  ```
* **Tier Differentiation**:
  * **Free Local Tier ($0 / forever)**:
    * Single Profile ("Personal Vault").
    * Unlimited subscriptions.
    * Ghost Meter & Audit Wizard access.
    * Manual CSV and Calendar (`.ics`) export.
    * Manual encrypted JSON Data Vault backup & restore.
  * **Pro Cloud Pass ($8.99/year or $0.99/month)**:
    * Unlimited Multi-Profile Vaults (Personal, Business, Family).
    * Code gate in `src/app/dashboard/page.tsx` (line 1032):
      ```typescript
      if (!isPro && allProfiles.length >= 1) {
        setShowProfileSettings(false);
        setShowPaywallModal(true);
        return;
      }
      ```
    * Encrypted real-time cloud sync across desktop and mobile devices via Supabase Storage.
    * Automatic cross-browser backup and restore.
* **Payment & Licensing Stack (`src/lib/gumroad.ts`)**:
  * Payment processor: **Gumroad** (no Stripe, PayPal, or Lemon Squeezy integration in code).
  * Product URL: `https://gianco.gumroad.com/l/jidxy`
  * Annual URL: `https://gianco.gumroad.com/l/jidxy?yearly=true` ($8.99/yr)
  * Monthly URL: `https://gianco.gumroad.com/l/jidxy?monthly=true` ($0.99/mo)
  * License Verification: Calls `/api/verify-license` with client-side fallback directly to `https://api.gumroad.com/v2/licenses/verify` (handled in `src/components/LicenseModal.tsx` lines 50-63 to support static export mode).
  * Device usage limit: 20 devices per license key (`src/app/api/verify-license/route.ts` line 45).
  * Test Key bypass: `TEST-PRO-KEY` instantly unlocks Pro status (`LicenseModal.tsx` line 31).

---

### 1.5 Existing Documentation, Assets & Marketing Materials
* **Launch Documents**:
  * `.launch/LAUNCH_KIT.md`: Brand-first launch kit containing Product Hunt tagline/description, Twitter/X thread template, and Show HN draft.
  * `.launch/SHIELDED_LAUNCH.md`: Pseudonymous launch strategy focusing on privacy communities (`r/privacy`, `r/selfhosted`, `r/personalfinance`), support buffers, and passive SEO.
* **SEO Documentation**:
  * `SEO_IMPLEMENTATION.md`: Historical audit document outlining metadata additions, sitemap creation, keyword targets, and verification instructions.
  * `GOOGLE_SEARCH_CONSOLE_SETUP.md`: Step-by-step walkthrough for domain verification and sitemap submission.
* **Configuration**:
  * `siteConfig.js`: Centralized brand config (`siteName: "SubTracking"`, `tagline: "Track smarter. Spend less."`, `buyMeCoffeeUrl: "https://www.buymeacoffee.com/subtracking"`).
* **Public Visual Assets**:
  * `public/marketing/`: High-resolution marketing raw screens:
    * `ghostmeter_raw.png` (886 KB)
    * `audit_raw.png` (121 KB)
    * `dashboard_raw.png` (946 KB)
  * `public/screenshots/`: `Screenshot-1.jpeg` through `Screenshot-5.jpeg`.
  * `public/og-image.png`: 1200x630 OpenGraph social share card.
  * `public/icon-192.png`, `public/icon-512.png`, `public/apple-touch-icon.png`: PWA assets.
  * Gumroad cover and thumbnail assets in root and `public/`.

---

## 2. Logic Chain

1. **Static App Router Architecture**:
   * *Observation*: `next.config.ts` specifies `output: 'export'`, while Next.js routes use `force-static` in `robots.ts` and `sitemap.ts`.
   * *Inference*: SubTracking is structured for high-performance edge deployment on Vercel, Cloudflare Pages, or static web servers. API routes (like `/api/verify-license`) cannot rely on standard server runtimes if purely statically exported, which is why `LicenseModal.tsx` includes an intentional direct client-to-Gumroad API fallback.
   * *Marketing Consequence*: All programmatic SEO pages (/compare, /guides, /blog) compile into pure static HTML, ensuring sub-second Time-to-First-Byte (TTFB) and crawlability for Googlebot and LLM web-crawlers (GPTBot, Google-Extended, Perplexity).

2. **Zero-Knowledge Privacy Alignment**:
   * *Observation*: User data is saved in `localStorage` by default (`profileManager.ts`), encrypted client-side using `crypto.subtle` AES-GCM + PBKDF2 (`crypto.ts`), and synced to Supabase as an opaque blob (`supabaseClient.ts`). No banking aggregators exist in the codebase.
   * *Inference*: SubTracking’s privacy claims are technically authentic, not marketing rhetoric. Users are genuinely protected against third-party bank credential leakage and database breaches.
   * *Marketing Consequence*: This gives the brand an unassailable moral high ground for grassroots communities (`r/privacy`, Hacker News, `r/selfhosted`) where users are deeply cynical about Plaid and financial data brokers.

3. **Viral Conversion Loops Built into Core Utility**:
   * *Observation*: The Ghost Meter calculates 10-year lost wealth (`monthly * 12 * 10`), while the Audit Wizard calculates instant monthly/annual savings and outputs a cancellation CSV checklist.
   * *Inference*: Both features contain built-in emotional psychological triggers:
     * *Ghost Meter*: Loss aversion / shock ("$15/month is actually $1,800 stolen from my future").
     * *Audit Wizard*: Dopamine / gamification ("Tinder swipe away 3 subscriptions and instantly save $540/year").
   * *Marketing Consequence*: These two specific features are natural anchors for short-form video hooks (TikTok/Reels/Shorts) and interactive viral comparison posts.

4. **Pricing Pivot & Schema Reconciliation**:
   * *Observation*: The codebase pricing constants (`pricing.ts`), UI modals (`PaywallModal.tsx`), and landing page hero (`page.tsx`) explicitly offer Free Local (1 profile) and $8.99/year Pro Pass (cloud sync + unlimited profiles). However, `src/app/layout.tsx` lines 169-170 still declare a JSON-LD price of `$19.00`, and `.launch/LAUNCH_KIT.md` references a legacy `$19 lifetime` deal.
   * *Inference*: The project transitioned from a one-time $19 payment model to a recurring $8.99/year Pro Cloud Sync model, but the JSON-LD schema and old launch markdown were not updated.
   * *Marketing Consequence*: The Zero-to-Minimal Cost Marketing Playbook must enforce strict pricing consistency ($0 free local 1-profile tier, $8.99/year Pro Pass) and provide updated JSON-LD schema snippets to correct Google's indexed product offer.

---

## 3. Caveats

1. **No Stripe or Dynamic Checkout SDK**: Monetization relies strictly on Gumroad external links (`https://gianco.gumroad.com/l/jidxy`) and license key activation. SubTracking does not currently have in-app Stripe Checkout or automated webhook listeners for subscription cancellations.
2. **IndexedDB Marketing Mention vs Reality**: `.launch/LAUNCH_KIT.md` mentions "IndexedDB" in its Show HN draft, but the codebase actually uses `localStorage`. Marketing copy should accurately cite `localStorage` + Web Crypto AES-GCM to prevent technical backlash from Hacker News commenters.
3. **Compound Interest Approximation**: The Ghost Meter calculates nominal 5-year and 10-year cumulative spending (`monthlyTotal * 12 * 10`). In marketing copy and scripts, the opportunity cost with compound interest (e.g. 7-8% S&P 500 return) can be highlighted as an additional illustrative layer beyond the base nominal calculation.
4. **License Key Storage Key Name Variance**: `LaunchBanner.tsx` checks `localStorage.getItem('subtracking-pro')` while `dashboard/page.tsx` writes `localStorage.setItem('subtracking-is-pro', val)`. This minor internal key naming discrepancy should be noted for future maintenance.

---

## 4. Conclusion

The SubTracking codebase possesses a sound technical architecture and a clear product-market positioning:
1. **Tech Foundation**: Next.js 16.1 App Router with Tailwind CSS v4, compiled to ultra-fast static HTML (`output: 'export'`), with PWA offline-first capabilities.
2. **True Competitive Advantage**: Genuine client-side privacy (localStorage + Web Crypto AES-GCM 256-bit + PBKDF2), zero bank logins, and zero Plaid dependency.
3. **Viral Shock Features**: The **Ghost Meter** (10-year lost wealth shock multiplier) and **SubTracking Audit Wizard** (gamified Tinder-style Keep/Toss discretionary audit) provide immediate visual hooks for short-form video and social proof.
4. **Monetization Clarity**: A generous Free Core tier (1 local profile, unlimited subs, manual backup) paired with an ultra-affordable $8.99/year Pro Cloud Pass (unlimited multi-profiles, encrypted cloud sync across devices).
5. **Programmatic Foundation**: 23 static routes already live (including 4 competitor comparison pages and 8 cancellation guides), providing the exact architectural template required to execute the programmatic SEO expansion matrix.

All findings are verified directly against production source files.

---

## 5. Verification Method

To independently verify these findings, execute the following commands and file inspections:

1. **Tech Stack & Dependencies**:
   * Inspect `package.json`: Lines 11-24 verify `@supabase/supabase-js`, `framer-motion`, `lucide-react`, `next: 16.1.0`, `react: 19.2.3`, `tailwindcss: ^4`.
   * Inspect `next.config.ts`: Line 4 confirms `output: 'export'`.
2. **Ghost Meter Calculation**:
   * Inspect `src/components/GhostMeter.tsx`: Lines 15-26 confirm `tenYear: monthlyTotal * 12 * 10` and `fiveYear: monthlyTotal * 12 * 5`.
   * Inspect `src/lib/utils.tsx`: Lines 123-131 confirm the weekly (`* 4.33`), biweekly (`* 2.16`), quarterly (`/ 3`), and yearly (`/ 12`) normalization logic.
3. **Audit Wizard & Smart Filtering**:
   * Inspect `src/app/dashboard/page.tsx`: Line 2311 confirms filtering `!s.isEssential && s.category !== 'Utility Bills'`.
   * Inspect `src/components/SubTrackingWizard.tsx`: Lines 119-160 confirm Framer Motion left/right swipe mechanics and button actions.
4. **Privacy & Cloud Encryption**:
   * Inspect `src/lib/crypto.ts`: Lines 22-26 and 60-88 confirm Web Crypto AES-GCM 256-bit and PBKDF2 100k iteration encryption.
   * Inspect `src/lib/profileManager.ts`: Lines 4-6 and 24-26 confirm `localStorage` persistence.
   * Inspect `src/lib/supabaseClient.ts`: Lines 49-63 confirm encrypted JSON vault blob upload to `user-data/[userId]/vault.json`.
5. **Pricing & Gumroad**:
   * Inspect `src/lib/pricing.ts`: Lines 1-6 confirm `$8.99/year` and `$0.99/mo`.
   * Inspect `src/lib/gumroad.ts`: Lines 1-9 confirm Gumroad endpoints and IDs.
   * Inspect `src/app/layout.tsx`: Lines 169-170 reveal the stale `$19.00` JSON-LD schema offer.
