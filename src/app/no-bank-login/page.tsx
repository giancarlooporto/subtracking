import { Metadata } from 'next';
import Link from 'next/link';
import {
    ShieldOff, Lock, AlertCircle, CheckCircle, ArrowRight, X, Check
} from 'lucide-react';
import { ShareButton } from '../../components/ShareButton';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
    title: 'Track Subscriptions Without Bank Login | No Plaid Required',
    description: 'Manage subscriptions without connecting your bank account. No Plaid, no financial risk. Manual tracking keeps you in control. $19 lifetime access.',
    keywords: [
        'subscription tracker no bank login',
        'subscription tracker without plaid',
        'track subscriptions manually',
        'no bank connection subscription tracker',
        'subscription manager without bank access',
        'manual subscription tracking',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/no-bank-login',
    },
};

export default function NoBankLoginPage() {
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
                        Try Free
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-black uppercase tracking-widest">
                        <ShieldOff className="w-3.5 h-3.5" />
                        No Bank Login Required
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                        Track Subscriptions<br />
                        <span className="text-blue-500">Without Connecting Your Bank</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Stop giving apps access to your bank account. SubTracking uses manual tracking—you enter what you want, when you want. No Plaid, no financial risk, complete control.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/dashboard"
                            className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-2xl shadow-blue-600/20 transition-all"
                        >
                            Start Tracking Now
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="text-sm text-slate-500">
                            Free to try • $19 for lifetime PRO
                        </div>
                    </div>
                </div>
            </section>

            {/* Why No Bank Login */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Why Skip the Bank Login?</h2>
                        <p className="text-slate-400 text-lg">The hidden risks of connecting your bank account</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: <AlertCircle className="w-6 h-6" />,
                                title: 'Security Risk',
                                description: 'Services like Plaid store your bank credentials. If they\'re hacked, your entire financial history is exposed.',
                                color: 'red',
                            },
                            {
                                icon: <Lock className="w-6 h-6" />,
                                title: 'Terms of Service Violations',
                                description: 'Many banks explicitly forbid sharing login credentials. You could void fraud protection.',
                                color: 'orange',
                            },
                            {
                                icon: <ShieldOff className="w-6 h-6" />,
                                title: 'Privacy Concerns',
                                description: (
                                    <>
                                        Connected apps can see ALL transactions, not just subscriptions. {' '}
                                        <Link href="/privacy-subscription-tracker" className="text-yellow-400 hover:underline">Read about our privacy-first approach.</Link>
                                    </>
                                ),
                                color: 'yellow',
                            },
                        ].map((risk, i) => (
                            <div
                                key={i}
                                className={`p-8 rounded-3xl border border-${risk.color}-500/20 bg-${risk.color}-500/5`}
                            >
                                <div className={`bg-${risk.color}-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-${risk.color}-400 mb-4`}>
                                    {risk.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{risk.title}</h3>
                                <p className="text-slate-400 leading-relaxed">{risk.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How Manual Tracking Works */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Manual Tracking Made Easy</h2>
                        <p className="text-slate-400 text-lg">
                            3 simple steps to complete control. {' '}
                            <Link href="/blog/find-unused-subscriptions" className="text-blue-400 hover:underline font-bold">Read our full audit guide.</Link>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                step: '1',
                                title: 'Add Subscriptions',
                                description: 'Enter your subscription name, price, and renewal date. Takes 30 seconds per subscription.',
                            },
                            {
                                step: '2',
                                title: 'Set Reminders',
                                description: 'Get alerts before renewals. Cancel before you\'re charged if you don\'t use it anymore.',
                            },
                            {
                                step: '3',
                                title: 'Track Spending',
                                description: 'See monthly costs, Ghost Cost projections, and find unused subscriptions to cancel.',
                            },
                        ].map((item, i) => (
                            <div key={i} className="relative">
                                <div className="text-6xl font-black text-blue-500/20 absolute -top-4 -left-2">
                                    {item.step}
                                </div>
                                <div className="relative pt-8">
                                    <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Bank Login vs. Manual Tracking</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Bank Login Apps */}
                        <div className="p-8 rounded-3xl border border-red-500/20 bg-red-500/5">
                            <h3 className="text-2xl font-bold mb-6 text-red-400">Apps with Bank Login</h3>
                            <ul className="space-y-4">
                                {[
                                    'Requires bank credentials',
                                    'Third-party access to ALL transactions',
                                    'Potential ToS violations',
                                    'Security breach risk',
                                    'Data sold to advertisers',
                                    'Monthly subscription fees',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <X className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* SubTracking */}
                        <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5">
                            <h3 className="text-2xl font-bold mb-6 text-blue-400">SubTracking (Manual)</h3>
                            <ul className="space-y-4">
                                {[
                                    'Zero bank access needed',
                                    'Only tracks what you enter',
                                    'Complete privacy',
                                    'No security risk',
                                    'No data collection',
                                    '$19 one-time payment',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <Check className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-blue-600 to-blue-700 p-12 md:p-20 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Take control without the risk
                    </h2>
                    <p className="text-blue-100/80 text-lg max-w-xl mx-auto">
                        Join users who track subscriptions safely—no bank login required.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex bg-white text-blue-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
                    >
                        Start Free Today
                    </Link>
                </div>
            </section>
            <Footer />
        </div>
    );
}
