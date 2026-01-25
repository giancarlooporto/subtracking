import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, Users, RefreshCcw, Sparkles } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'The Best Private Monarch Money Alternative | SubTracking',
    description: 'Switch from Monarch Money to a private, manual tracker. Compare SubTracking vs Monarch Money on security, long-term costs, and data privacy.',
    keywords: [
        'monarch money alternative',
        'monarch money privacy',
        'monarch money alternative no bank login',
        'track subscriptions privately',
        'manual finance tracker vs monarch',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/compare/monarch-money',
    },
};

export default function MonarchComparisonPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
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
                        <Users className="w-3.5 h-3.5" />
                        Professional Alternative
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        Moving Beyond <span className="text-indigo-500">Monarch Money</span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Monarch Money is a powerful tool for complex household budgeting, but for many, it's more than they need—and its cloud-first approach to bank data isn't for everyone.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-900/50 rounded-[40px] border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/5">
                                <tr>
                                    <th className="p-8 font-bold text-lg">Focus Area</th>
                                    <th className="p-8 font-bold text-lg text-slate-500">Monarch Money</th>
                                    <th className="p-8 font-bold text-lg text-indigo-400">SubTracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                <tr>
                                    <td className="p-8">
                                        <div className="font-bold">Data Privacy</div>
                                        <div className="text-xs text-slate-500 mt-1">Where is your information?</div>
                                    </td>
                                    <td className="p-8 text-slate-400 italic">Cloud Storage & Company Servers</td>
                                    <td className="p-8 text-indigo-400 font-bold">100% Local (On your device)</td>
                                </tr>
                                <tr>
                                    <td className="p-8">
                                        <div className="font-bold">Bank Connection</div>
                                        <div className="text-xs text-slate-500 mt-1">Is it required?</div>
                                    </td>
                                    <td className="p-8 text-slate-400 italic">Yes, via Plaid/MX/Finicity</td>
                                    <td className="p-8 text-indigo-400 font-bold">No. Total manual control.</td>
                                </tr>
                                <tr>
                                    <td className="p-8">
                                        <div className="font-bold">Total Cost (10 Years)</div>
                                        <div className="text-xs text-slate-500 mt-1">Long-term value</div>
                                    </td>
                                    <td className="p-8 text-red-400 font-bold">~$1,000+</td>
                                    <td className="p-8 text-emerald-400 font-bold">$19 Lifetime</td>
                                </tr>
                                <tr>
                                    <td className="p-8">
                                        <div className="font-bold">Ghost Cost Projections</div>
                                        <div className="text-xs text-slate-500 mt-1">Find long-term waste</div>
                                    </td>
                                    <td className="p-8 text-slate-500"><X className="w-5 h-5" /></td>
                                    <td className="p-8 text-indigo-400"><Check className="w-5 h-5 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* The Privacy Advantage */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl font-black">Why Privacy Matters in Personal Finance</h2>
                        <p className="text-slate-400 leading-relaxed">
                            Apps like Monarch Money require you to trust them with your bank credentials. While they use encryption, the risk of a third-party breach still exists. More importantly, they have a record of every transaction you make.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
                            <Lock className="w-8 h-8 text-indigo-400" />
                            <h3 className="text-xl font-bold">Zero-Cloud Architecture</h3>
                            <p className="text-slate-400 text-sm">SubTracking doesn't have a database of your transactions. Your data is yours, encrypted and stored locally in your browser.</p>
                        </div>
                        <div className="p-8 rounded-3xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
                            <RefreshCcw className="w-8 h-8 text-indigo-400" />
                            <h3 className="text-xl font-bold">No "Data Fatigue"</h3>
                            <p className="text-slate-400 text-sm">Automated trackers often pull in thousands of transactions. SubTracking helps you focus on what matters—your recurring fixed costs.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-indigo-900/40 border border-indigo-500/20 p-12 md:p-20 text-center space-y-8 shadow-2xl backdrop-blur-xl">
                    <h2 className="text-4xl md:text-5xl font-black text-white leading-tight">
                        Experience Financial Freedom with Complete Privacy.
                    </h2>
                    <p className="text-indigo-200/60 text-lg max-w-xl mx-auto">
                        No monthly fees. No bank linking. Just simple, honest tracking.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Try SubTracking Free
                        </Link>
                        <ShareButton variant="footer" />
                    </div>
                </div>
            </section>
        </div>
    );
}
