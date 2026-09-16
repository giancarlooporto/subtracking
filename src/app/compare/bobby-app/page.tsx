import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, Smartphone, Globe, Sparkles, Ghost, Layers } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';
import { pricing } from '../../../lib/pricing';

export const metadata: Metadata = {
    title: 'Best Bobby App Alternative (Web & Android) | SubTracking',
    description: 'Love Bobby app but need Web, Windows, or Android? Switch to SubTracking: cross-platform, 10-yr Ghost Costs, and private sync. Free or $8.99/yr.',
    keywords: [
        'bobby app alternative',
        'bobby app alternative android',
        'bobby subscription tracker web',
        'bobby app windows alternative',
        'cross platform subscription tracker',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/compare/bobby-app',
    },
};

export default function BobbyAppComparisonPage() {
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
                        <Globe className="w-3.5 h-3.5" />
                        Cross-Platform Evolution
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        The <span className="text-indigo-500">Bobby App Alternative</span> for Web, Android & PC
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Bobby proved that manual subscription tracking is cleaner and more private than linking bank accounts. SubTracking brings that same beloved privacy model to every screen—with 10-year Ghost Costs and encrypted cloud sync.
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
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Universal Access</h3>
                        <p className="text-slate-400 text-sm">Bobby is trapped inside the Apple iOS App Store. SubTracking is an installable PWA that runs seamlessly on Safari, Chrome, Android, Windows, Mac, and Linux.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Ghost className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Ghost Meter Analytics</h3>
                        <p className="text-slate-400 text-sm">Bobby only shows basic monthly sums. SubTracking projects your 5-year burn and 10-year compounding "Lost Wealth" to reveal the true cost of micro-subscriptions.</p>
                    </div>
                    <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                            <Lock className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Encrypted Multi-Device Sync</h3>
                        <p className="text-slate-400 text-sm">Enjoy 100% free local tracking on your primary device, or upgrade to Pro for {pricing.annualPrice} for zero-knowledge end-to-end encrypted sync across your phone and laptop.</p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-8">
                    <h2 className="text-3xl font-black text-center">Feature Breakdown</h2>
                    <div className="border border-white/10 rounded-3xl overflow-hidden bg-slate-900/40 backdrop-blur-md">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="p-6 font-bold">Feature</th>
                                    <th className="p-6 font-bold text-slate-400 text-center">Bobby App</th>
                                    <th className="p-6 font-bold text-indigo-400 text-center">SubTracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5 text-sm">
                                {[
                                    { feature: 'Bank Logins Required', bobby: false, subtracking: false },
                                    { feature: 'Web Browser Access', bobby: false, subtracking: true },
                                    { feature: 'Android Device Support', bobby: false, subtracking: true },
                                    { feature: 'Windows & Mac Desktop', bobby: 'Limited Mac', subtracking: 'Native Web PWA' },
                                    { feature: '10-Year Lost Wealth Projections', bobby: false, subtracking: true },
                                    { feature: 'Keep or Toss Audit Wizard', bobby: false, subtracking: true },
                                    { feature: 'Multi-Profile Support', bobby: false, subtracking: 'Personal, Business, Family' },
                                    { feature: 'Cross-Device Encrypted Sync', bobby: 'iCloud Only', subtracking: 'Zero-Knowledge E2EE' },
                                    { feature: 'Pricing', bobby: 'In-app purchases', subtracking: `Free / Pro for ${pricing.annualPrice}` },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-medium">{row.feature}</td>
                                        <td className="p-6 text-center">
                                            {typeof row.bobby === 'boolean' ? (
                                                row.bobby ? <Check className="w-5 h-5 text-indigo-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                                            ) : <span className="text-slate-400">{row.bobby}</span>}
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
                    <h2 className="text-3xl md:text-5xl font-black">Ready to Take Your Subscriptions Everywhere?</h2>
                    <p className="text-slate-400 text-lg max-w-xl mx-auto">
                        Keep the manual privacy you love about Bobby, but enjoy access on all your devices. Free to use locally, zero account setup required.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-600/20 transition-all"
                    >
                        Try SubTracking Free
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
