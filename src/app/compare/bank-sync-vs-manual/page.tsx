import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, CreditCard, EyeOff, Sparkles, Database, WifiOff, RefreshCw } from 'lucide-react';
import { Footer } from '../../../components/Footer';
import { pricing } from '../../../lib/pricing';

export const metadata: Metadata = {
    title: 'Bank-Sync vs Manual Subscription Tracking | SubTracking',
    description: 'Compare automated bank-sync subscription apps with local-first, private manual tracking. Discover the security, privacy, and cost advantages of SubTracking.',
    keywords: [
        'bank sync vs manual tracking',
        'automated subscription tracker comparison',
        'local-first finance tracker',
        'subscription tracker without bank login',
        'private budget tracker',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/compare/bank-sync-vs-manual',
    },
};

export default function BankSyncVsManualPage() {
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
                        <Sparkles className="w-3.5 h-3.5" />
                        Architecture & Privacy Comparison
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        Bank-Sync Apps <span className="text-indigo-500">vs. Local-First</span> Tracking
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Automated bank-sync tools offer convenience, but require granting continuous access to your primary financial accounts. Here is how local-first manual auditing delivers real control and peace of mind.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bank-Sync Apps Card */}
                        <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Automated Bank-Sync Apps</h2>
                                <p className="text-slate-500 text-sm">Cloud-Based & Aggregator-Dependent</p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">Automated transaction scraping</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">Automatic recurring charge detection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Requires bank login & third-party aggregators</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Financial history stored on remote cloud servers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Recurring monthly subscription costs ($5–$15/mo)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Frequent 2FA disconnects & broken sync links</span>
                                </li>
                            </ul>
                        </div>

                        {/* SubTracking Card */}
                        <div className="p-8 rounded-[32px] border border-indigo-500/30 bg-indigo-500/10 space-y-8 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4">
                                <Shield className="w-12 h-12 text-indigo-500/20" />
                            </div>
                            <div className="space-y-2 relative z-10">
                                <h2 className="text-2xl font-bold text-indigo-400">SubTracking</h2>
                                <p className="text-indigo-300/60 text-sm">Local-First, Intentional & Private</p>
                            </div>

                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">100% Private—Zero bank credentials required</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Local-first on-device data storage by default</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Ghost Meter 10-year compound wealth projection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Renewal reminders & Trial Shield alerts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-indigo-400 font-bold">Free forever locally (1 profile & core tracking), Pro for {pricing.annualPrice} (End-to-End Encrypted Cloud Sync)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Works 100% offline with zero server dependencies</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Deep Dive Sections */}
            <section className="py-20 px-6 border-t border-white/5">
                <div className="max-w-4xl mx-auto space-y-24">

                    {/* Security Deep Dive */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-400">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black">Why Intentional Spending Beats Passive Automation</h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                When financial apps automatically sync transactions in the background, users often develop "passive blindness"—glancing at dashboards without taking action. 
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                SubTracking pairs intentional logging with automated intelligence: you quickly log your recurring expenses, and our built-in Ghost Meter and Audit Wizard immediately surface long-term cost projections, renewal risks, and hidden fee traps.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 p-8 rounded-[40px] border border-white/5 space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <EyeOff className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">No Data Monetization or Ads</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <CreditCard className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">No High Monthly Tracker Subscriptions</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <WifiOff className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">100% Offline Accessible (PWA)</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="text-center space-y-8 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black">Stop Paying a Monthly Fee to Track Your Fees</h2>
                        <p className="text-slate-400 text-lg">
                            Many cloud-based trackers charge $60 to $120+ each year to monitor your subscriptions. SubTracking is free locally with full features, and just {pricing.annualPrice} for optional multi-profile vaults and end-to-end encrypted cloud sync.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Start Auditing for Free
                        </Link>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8 shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Ready for a cleaner, private way to track?
                    </h2>
                    <p className="text-indigo-100/80 text-xl max-w-xl mx-auto">
                        Start auditing your subscriptions today with zero bank logins and complete privacy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
                        >
                            Try SubTracking Free
                        </Link>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
