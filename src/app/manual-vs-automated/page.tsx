import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, DollarSign, Lock, Zap, Check, X, ArrowRight } from 'lucide-react';
import { ShareButton } from '../../components/ShareButton';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
    title: 'Manual vs Automated Subscription Trackers | Privacy Comparison',
    description: 'Compare manual subscription tracking vs automated bank-connected apps. See which approach offers better privacy, security, and cost savings.',
    keywords: [
        'manual vs automated subscription tracker',
        'subscription tracker privacy comparison',
        'bank connected tracker risks',
        'manual subscription manager benefits',
        'automated subscription tracker pros cons',
    ],
    alternates: {
        canonical: 'https://subtracking.app/manual-vs-automated',
    },
};

export default function ManualVsAutomatedPage() {
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
                        Privacy-First Comparison
                    </div>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.1]">
                        Manual Tracking vs.<br />
                        <span className="text-indigo-500">Automated Apps</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Should you connect your bank account to an app or track subscriptions manually? Here's an honest comparison of privacy, security, and features.
                    </p>
                </div>
            </section>

            {/* Side-by-Side Comparison */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Feature Comparison</h2>
                        <p className="text-slate-400">Automated Trackers vs. SubTracking (Manual)</p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-white/10 rounded-2xl overflow-hidden">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 font-bold">Feature</th>
                                    <th className="text-center p-4 font-bold text-slate-400">Automated Apps</th>
                                    <th className="text-center p-4 font-bold text-indigo-400">SubTracking (Manual)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    {
                                        category: 'Privacy & Security',
                                        features: [
                                            { name: 'Requires Bank Login', auto: true, manual: false },
                                            { name: 'Uses 3rd Party Connectors', auto: true, manual: false },
                                            { name: 'Cloud Data Storage', auto: true, manual: false },
                                            { name: 'Local Data Only', auto: false, manual: true },
                                            { name: 'Zero Data Collection', auto: false, manual: true },
                                        ],
                                    },
                                    {
                                        category: 'Pricing',
                                        features: [
                                            { name: 'Monthly Cost', auto: '$5-15/month', manual: false },
                                            { name: 'One-Time Payment', auto: false, manual: '$19 lifetime' },
                                            { name: 'Free Trial', auto: 'Often limited', manual: 'Forever (basic)' },
                                            { name: 'Bill Negotiation Fee', auto: '30-60% of savings', manual: false },
                                        ],
                                    },
                                    {
                                        category: 'Features',
                                        features: [
                                            { name: 'Subscription Tracking', auto: true, manual: true },
                                            { name: 'Renewal Alerts', auto: true, manual: true },
                                            { name: 'Spending Analytics', auto: true, manual: true },
                                            { name: 'Ghost Cost Calculator', auto: false, manual: true },
                                            { name: 'Automatic Bill Negotiation', auto: true, manual: false },
                                            { name: 'Automatic Transaction Import', auto: true, manual: false },
                                        ],
                                    },
                                ].flatMap((section) =>
                                    section.features.map((feature, i) => (
                                        <tr key={`${section.category}-${i}`}>
                                            <td className="p-4">{feature.name}</td>
                                            <td className="p-4 text-center">
                                                {typeof feature.auto === 'boolean' ? (
                                                    feature.auto ? (
                                                        <Check className="w-5 h-5 text-green-400/50 mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-slate-300">{feature.auto}</span>
                                                )}
                                            </td>
                                            <td className="p-4 text-center">
                                                {typeof feature.manual === 'boolean' ? (
                                                    feature.manual ? (
                                                        <Check className="w-5 h-5 text-indigo-400 mx-auto" />
                                                    ) : (
                                                        <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                    )
                                                ) : (
                                                    <span className="text-indigo-300 font-bold">{feature.manual}</span>
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
                        <h2 className="text-4xl font-black mb-4">Which approach is right for you?</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Choose Automated */}
                        <div className="p-8 rounded-3xl border border-white/10 bg-white/5">
                            <h3 className="text-2xl font-bold mb-6">Choose Automated Apps if...</h3>
                            <ul className="space-y-4">
                                {[
                                    'You want automatic tracking (despite bank login)',
                                    'You specifically need bill negotiation services',
                                    'You prefer AI-powered insights over privacy',
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
                                        {i === 0 ? 'Privacy is your #1 priority' : item}
                                        {i === 1 && <Link href="/no-bank-login" className="text-indigo-400 hover:underline ml-1">(See Why)</Link>}
                                        {i === 3 && <Link href="/privacy-subscription-tracker" className="text-indigo-400 hover:underline ml-1">(Read More)</Link>}
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
                        <h3 className="text-2xl font-bold mb-4">The Verdict</h3>
                        <div className="space-y-4 text-slate-300 leading-relaxed">
                            <p>
                                <strong>Automated trackers</strong> are powerful tools if you prioritize convenience over privacy. Their automatic features can save time, and many users enjoy the hands-off approach to transaction categorization.
                            </p>
                            <p>
                                However, this convenience comes at a cost: connecting your bank account means storing credentials with third parties, sharing transaction data, and usually paying a monthly recurring fee.
                            </p>
                            <p>
                                <strong>SubTracking</strong> offers a privacy-first alternative. By focusing on manual tracking, we ensure your financial data stays on your device.
                            </p>
                            <ul className="list-disc list-inside space-y-2 ml-4">
                                <li>Complete privacy—no bank login ever</li>
                                <li>One-time payment (own it forever)</li>
                                <li>Local storage only (works offline)</li>
                            </ul>
                            <p className="pt-4 font-bold">
                                Bottom line: If you prefer automation and don't mind data sharing, automated apps are a good choice. If privacy, security, and ownership matter more to you, SubTracking is the safer option.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-indigo-600 to-indigo-700 p-12 md:p-20 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Try the privacy-first tracker
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
                    <div className="pt-4 flex justify-center">
                        <ShareButton variant="footer" />
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}
