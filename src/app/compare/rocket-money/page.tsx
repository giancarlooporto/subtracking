import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, CreditCard, EyeOff, Sparkles } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'The Best Rocket Money Alternative (No Bank Login) | SubTracking',
    description: 'Looking for a Rocket Money alternative that doesn\'t require linking your bank account? Compare SubTracking vs Rocket Money on privacy, cost, and security.',
    keywords: [
        'rocket money alternative',
        'truebill alternative no bank login',
        'subscription tracker without plaid',
        'track subscriptions without linking bank',
        'private rocket money alternative',
    ],
    alternates: {
        canonical: 'https://subtracking.app/compare/rocket-money',
    },
};

export default function RocketMoneyComparisonPage() {
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
                        Honest Comparison
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        The Best <span className="text-indigo-500">Rocket Money Alternative</span> for Privacy
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Rocket Money (formerly Truebill) is great for automation, but it requires full access to your bank account. If you want to track subscriptions without the privacy risk, SubTracking is the answer.
                    </p>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Rocket Money Card */}
                        <div className="p-8 rounded-[32px] border border-white/5 bg-white/5 space-y-8">
                            <div className="space-y-2">
                                <h2 className="text-2xl font-bold">Rocket Money</h2>
                                <p className="text-slate-500 text-sm">Automated and Cloud-Based</p>
                            </div>

                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">Automatic transaction syncing</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-300">Bill negotiation services</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Requires bank login (Plaid)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">Data stored on company servers</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <X className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                    <span className="text-slate-300 font-bold">$5 - $15 monthly subscription</span>
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
                                <p className="text-indigo-300/60 text-sm">Privacy-First and Manual</p>
                            </div>

                            <ul className="space-y-4 relative z-10">
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Total privacy—No bank connection</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Local data storage (Stay in control)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Ghost Cost long-term projections</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-slate-200">Free trials & renewal alerts</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <span className="text-indigo-400 font-bold">$19 one-time payment</span>
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
                            <div className="bg-red-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-red-500">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-black">Why people are switching away from Rocket Money</h2>
                            <p className="text-slate-400 leading-relaxed text-lg">
                                Rocket Money uses Plaid to link your bank account. While Plaid is a standard industry tool, it means you are <strong>storing your bank credentials</strong> with a third-party and giving an app access to see every single coffee purchase and paycheck.
                            </p>
                            <p className="text-slate-400 leading-relaxed">
                                SubTracking takes a different approach. We believe tracking your finances shouldn't mean sacrificing your privacy. We offer a manual, sleek alternative that keeps your data where it belongs—on your device.
                            </p>
                        </div>
                        <div className="bg-slate-900/50 p-8 rounded-[40px] border border-white/5 space-y-6">
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <EyeOff className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">No Data Harvesting</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <CreditCard className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">No Monthly Fees</span>
                            </div>
                            <div className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl">
                                <Lock className="w-5 h-5 text-indigo-400" />
                                <span className="font-bold">100% Offline Compatible</span>
                            </div>
                        </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="text-center space-y-8 max-w-2xl mx-auto">
                        <h2 className="text-3xl font-black">Stop Paying a Subscription to Track Subscriptions</h2>
                        <p className="text-slate-400 text-lg">
                            The irony of Rocket Money is that it costs up to $15/month to help you find wasted subscriptions. SubTracking costs a simple, one-time fee of $19. It pays for itself the moment you find one unused service to cancel.
                        </p>
                        <Link
                            href="/dashboard"
                            className="inline-flex bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-indigo-600/20"
                        >
                            Get SubTracking Lifetime Access
                        </Link>
                    </div>

                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8 shadow-2xl">
                    <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                        Ready for a cleaner, safer tracker?
                    </h2>
                    <p className="text-indigo-100/80 text-xl max-w-xl mx-auto">
                        Switch from Rocket Money to SubTracking today. No bank login, no monthly fees.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/dashboard"
                            className="bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl"
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
