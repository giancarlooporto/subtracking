import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, HardDrive, Eye, ArrowRight, Check, X } from 'lucide-react';
import { ShareButton } from '../../components/ShareButton';

export const metadata: Metadata = {
    title: 'Privacy-First Subscription Tracker | No Cloud, No Tracking',
    description: 'Track your subscriptions without compromising privacy. All data stays on your device. No bank logins, no cloud storage, no tracking. $19 lifetime access.',
    keywords: [
        'privacy subscription tracker',
        'privacy-first expense tracker',
        'local storage subscription manager',
        'no cloud subscription tracker',
        'private subscription tracking',
        'subscription tracker without cloud',
    ],
    alternates: {
        canonical: 'https://subtracking.app/privacy-subscription-tracker',
    },
};

export default function PrivacySubscriptionTrackerPage() {
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-black uppercase tracking-widest">
                        <Shield className="w-3.5 h-3.5" />
                        Privacy by Design
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1]">
                        Track Subscriptions<br />
                        <span className="text-emerald-500">Without Compromising Privacy</span>
                    </h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Your financial data is yours. SubTracking keeps everything on your device—no cloud storage, no bank logins, no tracking cookies. Complete privacy by design.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link
                            href="/dashboard"
                            className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-bold text-lg flex items-center gap-2 shadow-2xl shadow-emerald-600/20 transition-all"
                        >
                            Start Tracking Privately
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <div className="text-sm text-slate-500">
                            $19 one-time • No subscription • Yours forever
                        </div>
                    </div>
                </div>
            </section>

            {/* Privacy Features */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Privacy-First Architecture</h2>
                        <p className="text-slate-400 text-lg">How SubTracking protects your data</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: <HardDrive className="w-6 h-6" />,
                                title: 'Local Storage Only',
                                description: 'All data stays on your device. Nothing is sent to the cloud or our servers.',
                            },
                            {
                                icon: <Lock className="w-6 h-6" />,
                                title: 'No Bank Login',
                                description: (
                                    <>
                                        Never connect your bank account. Manual tracking means complete control. {' '}
                                        <Link href="/no-bank-login" className="text-emerald-400 hover:underline">Learn why skipping the bank login is safer.</Link>
                                    </>
                                ),
                            },
                            {
                                icon: <Eye className="w-6 h-6" />,
                                title: 'Zero Tracking',
                                description: 'No analytics, no cookies, no fingerprinting. We don\'t know who uses our app.',
                            },
                            {
                                icon: <Shield className="w-6 h-6" />,
                                title: 'Client-Side Encryption',
                                description: 'Export your data in encrypted JSON format. Only you can decrypt it.',
                            },
                        ].map((feature, i) => (
                            <div
                                key={i}
                                className="p-6 rounded-3xl border border-white/5 bg-white/5 hover:border-emerald-500/20 transition-all"
                            >
                                <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400 mb-4">
                                    {feature.icon}
                                </div>
                                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black mb-4">Privacy Comparison</h2>
                        <p className="text-slate-400 text-lg">
                            SubTracking vs. Cloud-Based Trackers. {' '}
                            <Link href="/manual-vs-automated" className="text-emerald-400 hover:underline font-bold">See the full comparison.</Link>
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-white/10 rounded-2xl overflow-hidden">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-4 font-bold">Feature</th>
                                    <th className="text-center p-4 font-bold text-emerald-400">SubTracking</th>
                                    <th className="text-center p-4 font-bold text-slate-500">Cloud-Based Apps</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { feature: 'Data Storage', subtracking: 'Your Device Only', others: 'Company Servers' },
                                    { feature: 'Bank Login Required', subtracking: false, others: true },
                                    { feature: 'Tracking Cookies', subtracking: false, others: true },
                                    { feature: 'Data Sold to 3rd Parties', subtracking: false, others: 'Often' },
                                    { feature: 'Works Offline', subtracking: true, others: false },
                                    { feature: 'Pricing', subtracking: '$19 One-Time', others: '$6-12/month' },
                                ].map((row, i) => (
                                    <tr key={i}>
                                        <td className="p-4 font-medium">{row.feature}</td>
                                        <td className="p-4 text-center">
                                            {typeof row.subtracking === 'boolean' ? (
                                                row.subtracking ? (
                                                    <Check className="w-5 h-5 text-emerald-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-emerald-400 font-bold">{row.subtracking}</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-center">
                                            {typeof row.others === 'boolean' ? (
                                                row.others ? (
                                                    <Check className="w-5 h-5 text-red-400 mx-auto" />
                                                ) : (
                                                    <X className="w-5 h-5 text-slate-600 mx-auto" />
                                                )
                                            ) : (
                                                <span className="text-slate-400">{row.others}</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-b from-emerald-600 to-emerald-700 p-12 md:p-20 text-center space-y-8">
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Ready to take back your privacy?
                    </h2>
                    <p className="text-emerald-100/80 text-lg max-w-xl mx-auto">
                        Start tracking subscriptions without sacrificing privacy.
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex bg-white text-emerald-700 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
                    >
                        Start Free Now
                    </Link>
                    <div className="pt-4 flex justify-center">
                        <ShareButton variant="footer" />
                    </div>
                </div>
            </section>
        </div>
    );
}
