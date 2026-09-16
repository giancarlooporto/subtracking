import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, ShieldAlert, Sparkles, Ghost, DatabaseZap } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';
import { pricing } from '../../../lib/pricing';

export const metadata: Metadata = {
    title: 'Best Mint Replacement Without Bank Logins | SubTracking',
    description: 'Tired of Credit Karma ads? Discover SubTracking: a private, bank-free Mint alternative. Track subscriptions offline. Free or $8.99/year Pro.',
    keywords: [
        'mint replacement no bank login',
        'best mint alternative for subscriptions',
        'private mint alternative',
        'what replaced mint app',
        'mint to credit karma alternative without ads',
        'offline expense tracker like mint',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/compare/mint-replacements',
    },
};

export default function MintReplacementsPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SubTracking" className="w-8 h-8 rounded-lg" />
                        <span className="font-black text-xl">SubTracking</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-500 transition-colors"
                    >
                        Try SubTracking
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6 text-center">
                <div className="max-w-4xl mx-auto space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        <ShieldAlert className="w-3.5 h-3.5" />
                        Mint Refugee Guide
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        The <span className="text-indigo-500">Mint Replacement</span> Without Bank Logins or Credit Karma Ads
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        When Mint shut down and forced users into Credit Karma, it traded budgeting for loan ads and fragile Plaid connections. SubTracking offers the clean, private antidote: 100% offline-first subscription tracking with zero bank credentials.
                    </p>
                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Open SubTracking Free
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Core Highlights */}
            <section className="py-12 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Zero Bank Logins</h3>
                        <p className="text-slate-400 text-sm">No Plaid, no MX, no 2FA disconnects. Your data stays in your browser's local storage with zero server-side telemetry.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Ghost className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">10-Year Ghost Cost</h3>
                        <p className="text-slate-400 text-sm">Mint only looked backward. SubTracking projects your recurring burn 5 and 10 years out so you see the true cost of subscription creep.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Zero Ads or Upsells</h3>
                        <p className="text-slate-400 text-sm">Unlike Credit Karma's endless credit card pitches, SubTracking is a pure utility: free for 1 local profile, or {pricing.annualPrice} for multi-device encrypted sync.</p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-black text-center">Mint vs. Credit Karma vs. SubTracking</h2>
                    <div className="border border-white/10 rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="p-6 font-bold">Feature</th>
                                    <th className="p-6 font-bold text-slate-400 text-center">Credit Karma</th>
                                    <th className="p-6 font-bold text-indigo-400 text-center">SubTracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {[
                                    { feature: 'Bank Login Required', ck: true, subtracking: false },
                                    { feature: 'Data Stored Locally', ck: false, subtracking: true },
                                    { feature: 'Credit Card & Loan Ads', ck: 'Heavy / Intrusive', subtracking: 'Zero Ads Ever' },
                                    { feature: 'Works Completely Offline', ck: false, subtracking: true },
                                    { feature: 'Subscription Audit Wizard', ck: false, subtracking: true },
                                    { feature: '10-Year Lost Wealth Projections', ck: false, subtracking: true },
                                    { feature: 'Multi-Profile Support', ck: false, subtracking: 'Personal, Business, Family' },
                                    { feature: 'Pricing', ck: 'Free (Ad-Supported)', subtracking: `Free / Pro for ${pricing.annualPrice}` },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-medium">{row.feature}</td>
                                        <td className="p-6 text-center">
                                            {typeof row.ck === 'boolean' ? (
                                                row.ck ? <Check className="w-5 h-5 text-indigo-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                                            ) : <span className="text-slate-400">{row.ck}</span>}
                                        </td>
                                        <td className="p-6 text-center font-bold text-indigo-400">
                                            {typeof row.subtracking === 'boolean' ? (
                                                row.subtracking ? <Check className="w-5 h-5 text-indigo-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                                            ) : <span>{row.subtracking}</span>}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 px-6 border-t border-white/5 bg-gradient-to-b from-transparent to-indigo-950/20">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-5xl font-black">Reclaim Control of Your Subscriptions</h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        No Plaid disconnects. No credit card solicitations. Just a clean, fast subscription tracker that works for you.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all"
                    >
                        Start Free in Your Browser
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                    <div className="pt-6 flex justify-center">
                        <ShareButton />
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
