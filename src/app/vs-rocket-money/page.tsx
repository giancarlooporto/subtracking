import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, DollarSign, Lock, Zap, Check, X, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Privacy-First Alternative to Rocket Money | SubTracking',
    description: 'Looking for a Rocket Money alternative that doesn\'t require bank login? SubTracking offers manual tracking, complete privacy, and one-time payment. Compare features and pricing.',
    keywords: [
        'rocket money alternative',
        'truebill alternative',
        'rocket money privacy alternative',
        'subscription tracker no bank login',
        'rocket money vs subtracking',
        'manual subscription tracker',
    ],
    alternates: {
        canonical: 'https://subtracking.app/vs-rocket-money',
    },
};

export default function VsRocketMoneyPage() {
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
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-xs font-black uppercase tracking-widest">
                        <Shield className="w-3.5 h-3.5" />
                        Privacy-First Alternative
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        Looking for a<br />
                        <span className="text-indigo-500">Privacy-First Alternative</span><br />
                        to Rocket Money?
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        If you're concerned about sharing bank credentials or prefer a one-time payment over monthly subscriptions, SubTracking might be the alternative you're looking for.
                    </p>
                </div>
            </section>

            {/* Side-by-Side Comparison */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Feature Comparison</h2>
                        <p className="text-slate-400">Rocket Money vs. SubTracking</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-white/10 rounded-2xl overflow-hidden">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 font-bold">Feature</th>
                                    <th className="text-center p-4 font-bold">Rocket Money</th>
                                    <th className="text-center p-4 font-bold text-indigo-400">SubTracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    {
                                        category: 'Privacy & Security',
                                        features: [
                                            { name: 'Requires Bank Login', rm: true, st: false },
                                            { name: 'Uses Plaid', rm: true, st: false },
                                            { name: 'Cloud Data Storage', rm: true, st: false },
                                            { name: 'Local Data Only', rm: false, st: true },
                                            { name: 'Zero Data Collection', rm: false, st: true },
                                        ],
                                    },
                                    {
                                        category: 'Pricing',
                                        features: [
                                            { name: 'Monthly Cost', rm: '$6-12/month', st: false },
                                            { name: 'One-Time Payment', rm: false, st: '$19 lifetime' },
                                            { name: 'Free Trial', rm: '7 days', st: 'Forever (basic)' },
                                            { name: 'Bill Negotiation Fee', rm: '35-60% of savings', st: false },
                                        ],
                                    },
                                    {
                                        category: 'Features',
                                        features: [
                                            { name: 'Subscription Tracking', rm: true, st: true },
                                            { name: 'Renewal Alerts', rm: true, st: true },
                                            { name: 'Spending Analytics', rm: true, st: true },
                                            { name: 'Calendar View', rm: 'Limited', st: true },
                                            { name: 'Multi-Profile Support', rm: false, st: true },
                                            { name: 'Ghost Cost Calculator', rm: false, st: true },
                                            { name: 'Automatic Bill Negotiation', rm: true, st: false },
                                            { name: 'Automatic Transaction Tracking', rm: true, st: false },
                                        ],
                                    },
                                ].flatMap((section) =>
                                    section.features.map((feature, i) => (
                                        <tr key={`${section.category}-${i}`}>
                                            <td className="p-4">{feature.name}</td>
                                            <td className="p-4 text-center">
                                                {typeof feature.rm === 'boolean' ? (
                                                    feature.rm ? (
                                                        <Check className="w-5 h-5 text-green-400 mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-slate-300">{feature.rm}</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof feature.st === 'boolean' ? (
                                                    feature.st ? (
                                                        <Check className="w-5 h-5 text-indigo-400 mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-indigo-300 font-bold">{feature.st}</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* When to Choose Each */}
            <section className="py-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Which is Right for You?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Choose Rocket Money */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                            <h3 className="text-2xl font-bold mb-6">Choose Rocket Money if...</h3>
                            <ul className="space-y-4">
                                {[
                                    'You want fully automatic tracking (despite bank login)',
                                    'You need bill negotiation services',
                                    'You prefer AI-powered insights',
                                    'You don\'t mind monthly subscription fees',
                                    'You\'re comfortable with cloud data storage',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <div className="w-5 h-5 rounded-full bg-slate-700 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Choose SubTracking */}
                        <div className="p-8 rounded-3xl border border-indigo-500/30 bg-indigo-500/5">
                            <h3 className="text-2xl font-bold mb-6 text-indigo-400">Choose SubTracking if...</h3>
                            <ul className="space-y-4">
                                {[
                                    'Privacy is your #1 priority',
                                    'You prefer NOT sharing bank credentials',
                                    'You want a one-time payment (no subscriptions)',
                                    'You value local data storage',
                                    'You prefer simple, manual control',
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300">
                                        <Check className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Take */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-4xl mx-auto">
                    <div className="p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5">
                        <h3 className="text-2xl font-bold mb-4">Our Honest Take</h3>
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            <p>
                                <strong>Rocket Money</strong> is a powerful tool if you want automated tracking and bill negotiation. Their AI-powered features can help you save money, and many users love the convenience of automatic transaction categorization.
                            </p>
                            <p>
                                However, it requires linking your bank account via Plaid, which means:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Your bank credentials are stored by a third party</li>
                                <li>Rocket Money can see ALL your transactions (not just subscriptions)</li>
                                <li>You\'re paying $6-12/month indefinitely ($72-144/year)</li>
                                <li>Your financial data is stored in the cloud</li>
                            </ul>
                            <p>
                                <strong>SubTracking</strong> takes a different approach. We believe your financial data should stay on your device. Yes, it requires manual entry, but in exchange you get:
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Complete privacy—no bank login ever</li>
                                <li>One-time $19 payment (own it forever)</li>
                                <li>Local storage only (works offline)</li>
                                <li>Simple, focused features without bloat</li>
                            </ul>
                            <p className="pt-4 font-bold">
                                Bottom line: If automation is worth trading privacy and paying monthly, Rocket Money is solid. If privacy matters more and you prefer ownership over subscription, try SubTracking.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Try the privacy-first alternative
                    </h2>
                    <p className="text-indigo-100/80 text-lg max-w-xl mx-auto">
                        Free to start. $19 for lifetime PRO access. No bank login required.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex bg-white text-indigo-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
                    >
                        Try SubTracking Free
                        <ArrowRight className="w-6 h-6 ml-2" />
                    </Link>
                </div>
            </section>
        </div>
    );
}
