import { siteConfig } from '../../../siteConfig';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: `Privacy Policy | ${siteConfig.siteName}`,
    description: 'Learn how we protect your financial data with our local-first, zero-knowledge architecture. Your privacy is our priority.',
    alternates: {
        canonical: 'https://www.subtracking.app/privacy',
    },
};

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-300 py-12 px-4 sm:px-6 lg:px-8 font-light">
            <div className="max-w-3xl mx-auto space-y-8">
                {/* Header */}
                <div className="border-b border-slate-800 pb-8">
                    <h1 className="text-3xl font-bold text-white tracking-tight mb-2">Privacy Policy</h1>
                    <p className="text-sm text-slate-500">Last Updated: January 6, 2026</p>
                </div>

                {/* Introduction */}
                <section className="space-y-4">
                    <p>
                        At <strong>{siteConfig.siteName}</strong> ("we", "us", or "our"), based in Alberta, Canada, we believe your financial data belongs to you—and only you.
                        This Privacy Policy explains how we handle your information when you use our web application (the "App") located at https://subtracking.app.
                    </p>
                    <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-indigo-300 text-sm font-medium">
                        <strong>TL;DR:</strong> We are a "Local-First" application. We do not store your subscription data, financial details, or personal preferences on our servers.
                        Everything lives directly on your device. We align our practices with Canada's strict privacy laws (PIPEDA/PIPA).
                    </div>
                </section>

                {/* 1. Data Collection */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">1. Information We Collect (and Don't Collect)</h2>

                    <div className="space-y-4 pl-4 border-l-2 border-slate-800">
                        <div>
                            <h3 className="text-white font-medium">A. Local Storage Data</h3>
                            <p className="mt-1">
                                The subscriptions, costs, categories, and renewal dates you enter into the App are stored in your browser's <strong>Local Storage</strong>.
                                This data never leaves your device and is not transmitted to our servers. If you clear your browser cache or switch devices, this data will be lost unless you manually back it up.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-medium">B. Payment Information</h3>
                            <p className="mt-1">
                                We do not process payments directly. All payments for Pro features are handled securely by our third-party merchant of record, <strong>Gumroad</strong>.
                                We never see or store your credit card information. Gumroad may share your email address with us so we can verify your Pro license status.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-white font-medium">C. Analytics</h3>
                            <p className="mt-1">
                                We may use privacy-preserving analytics (like Vercel Analytics) to collect anonymous usage data (e.g., page views, browser type, country).
                                This helps us improve the App's performance. This data is aggregated and cannot be used to identify you personally or see your financial entries.
                            </p>
                        </div>
                    </div>
                </section>

                {/* 2. How We Use Information */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">2. How We Use Your Information</h2>
                    <p>Since we do not collect your personal data, our use of it is extremely limited:</p>
                    <ul className="list-disc pl-5 space-y-2 text-slate-400">
                        <li><strong>Your Email (from Gumroad):</strong> To send you your license key, important product updates, or respond to support requests.</li>
                        <li><strong>Anonymous Analytics:</strong> To fix bugs and optimize App speed.</li>
                    </ul>
                </section>

                {/* 3. Data Retention */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">3. Data Retention</h2>
                    <p>
                        <strong>We cannot delete your data because we do not have it.</strong> Your subscription data resides solely on your device.
                        You can delete all your data at any time by clearing your browser's "Local Storage" or using the "Factory Reset" button within the App's settings.
                    </p>
                </section>

                {/* 4. Costs & Liability */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">4. Security</h2>
                    <p>
                        Because your data is stored locally, its security depends on the security of your device. We recommend keeping your device password-protected.
                        We use industry-standard SSL encryption (HTTPS) to ensure the App code is delivered securely to your browser.
                    </p>
                </section>

                {/* 5. Changes */}
                <section className="space-y-4">
                    <h2 className="text-xl font-semibold text-white">5. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy from time to time. If we make significant changes, we will notify you through the App or via email (if provided).
                        Continued use of the App after changes constitutes acceptance of the new policy.
                    </p>
                </section>

                {/* Contact */}
                <section className="pt-8 border-t border-slate-800">
                    <p className="text-sm">
                        Questions? Contact us at <a href="mailto:support@subtracking.app" className="text-indigo-400 hover:text-indigo-300">support@subtracking.app</a>
                    </p>
                </section>

                {/* Back Button */}
                <div className="pt-8">
                    <a href="/" className="text-sm text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-2">
                        ← Back to App
                    </a>
                </div>
            </div>
        </div>
    );
}
