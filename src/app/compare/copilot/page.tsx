import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Lock, ArrowRight, Check, X, Smartphone, Globe, Sparkles } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'Copilot Money Alternative for Web & Privacy | SubTracking',
    description: 'Looking for a Copilot alternative that works on the web and doesn\'t require bank linking? Compare SubTracking vs Copilot on privacy, cross-platform support, and cost.',
    keywords: [
        'copilot money alternative',
        'copilot money for web',
        'copilot alternative no bank login',
        'track subscriptions on desktop',
        'private copilot alternative',
    ],
    alternates: {
        canonical: 'https://subtracking.app/compare/copilot',
    },
};

export default function CopilotComparisonPage() {
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
                        <Smartphone className="w-3.5 h-3.5" />
                        Premium Alternative
                    </div>
                    <h1 className="text-4xl md:text-7xl font-black tracking-tight leading-tight">
                        The <span className="text-indigo-500">Copilot Alternative</span> for Every Device
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                        Copilot is famous for its aesthetics and automation, but it's locked to iOS/Mac and requires bank access. SubTracking gives you that same premium feel on any browser, with 100% privacy.
                    </p>
                </div>
            </section>

            {/* Comparison Highlights */}
            <section className="py-20 px-6">
                <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
                        <div className="bg-indigo-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-indigo-400">
                            <Globe className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Works Everywhere</h3>
                        <p className="text-slate-400 text-sm">Unlike Copilot, which is limited to Apple devices, SubTracking is a web-first application that works on any phone, tablet, or desktop browser.</p>
                    </div>
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
                        <div className="bg-emerald-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-emerald-400">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Privacy First</h3>
                        <p className="text-slate-400 text-sm">We don't ask for your bank credentials. Your financial data stays in your browser's local storage, not on our servers or in the cloud.</p>
                    </div>
                    <div className="p-8 rounded-3xl border border-white/5 bg-white/5 space-y-4">
                        <div className="bg-purple-500/10 w-12 h-12 rounded-2xl flex items-center justify-center text-purple-400">
                            <Check className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold">Simple Pricing</h3>
                        <p className="text-slate-400 text-sm">Copilot costs $95/year or $13/month. SubTracking is free to start and just $19 for a lifetime license. Own your data, own your tool.</p>
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-20 px-6 bg-slate-900/30">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-black">SubTracking vs. Copilot</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full border border-white/10 rounded-2xl overflow-hidden">
                            <thead className="bg-white/5">
                                <tr>
                                    <th className="text-left p-6 font-bold">Feature</th>
                                    <th className="text-center p-6 font-bold text-slate-400">Copilot</th>
                                    <th className="text-center p-6 font-bold text-indigo-400">SubTracking</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {[
                                    { feature: 'Bank Linking Required', copilot: true, subtracking: false },
                                    { feature: 'Web Browser Support', copilot: 'Limited', subtracking: 'Native / Full' },
                                    { feature: 'Privacy Model', copilot: 'Cloud-Based', subtracking: 'Local (On-Device)' },
                                    { feature: 'Pricing', copilot: '$95/year', subtracking: '$19 Lifetime' },
                                    { feature: 'Android Support', copilot: false, subtracking: true },
                                    { feature: 'Ghost Cost Projection', copilot: false, subtracking: true },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-white/5 transition-colors">
                                        <td className="p-6 font-medium">{row.feature}</td>
                                        <td className="p-6 text-center">
                                            {typeof row.copilot === 'boolean' ? (
                                                row.copilot ? <Check className="w-5 h-5 text-indigo-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                                            ) : <span className="text-slate-400">{row.copilot}</span>}
                                        </td>
                                        <td className="p-6 text-center">
                                            {typeof row.subtracking === 'boolean' ? (
                                                row.subtracking ? <Check className="w-5 h-5 text-indigo-400 mx-auto" /> : <X className="w-5 h-5 text-slate-600 mx-auto" />
                                            ) : <span className="text-indigo-400 font-bold">{row.subtracking}</span>}
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
                <div className="max-w-4xl mx-auto rounded-[40px] bg-gradient-to-br from-indigo-600 to-purple-700 p-12 md:p-20 text-center space-y-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
                    <div className="relative z-10 space-y-8">
                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            The private Alternative to Copilot.
                        </h2>
                        <p className="text-indigo-100/80 text-xl max-w-xl mx-auto">
                            Get the same premium experience while keeping your financial data 100% private.
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
                </div>
            </section>
        </div>
    );
}
