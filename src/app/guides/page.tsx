import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Search, GraduationCap, Zap, Shield, Sparkles } from 'lucide-react';
import { Footer } from '../../components/Footer';

export const metadata: Metadata = {
    title: 'Subscription Cancellation Guides & Resources | SubTracking',
    description: 'Expert guides on how to cancel popular subscriptions, find unused costs, and take control of your financial privacy.',
    keywords: [
        'how to cancel subscriptions',
        'subscription audit guides',
        'cancel netflix guide',
        'cancel spotify guide',
        'stop unused subscriptions',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/guides',
    },
};

const guides = [
    { title: 'Amazon Prime', href: '/guides/how-to-cancel-amazon-prime', icon: '📦' },
    { title: 'Netflix', href: '/guides/how-to-cancel-netflix', icon: '🎬' },
    { title: 'Spotify', href: '/guides/how-to-cancel-spotify', icon: '🎵' },
    { title: 'Adobe Creative Cloud', href: '/guides/how-to-cancel-adobe', icon: '🎨' },
    { title: 'YouTube Premium', href: '/guides/how-to-cancel-youtube-premium', icon: '📺' },
    { title: 'Disney+', href: '/guides/how-to-cancel-disney-plus', icon: '🏰' },
    { title: 'Hulu', href: '/guides/how-to-cancel-hulu', icon: '🎥' },
    { title: 'Planet Fitness', href: '/guides/how-to-cancel-planet-fitness', icon: '💪' },
];

const comparisons = [
    { title: 'vs. Excel & Sheets', href: '/compare/excel-vs-subtracking', tag: 'Recommended' },
    { title: 'vs. Rocket Money', href: '/compare/rocket-money' },
    { title: 'vs. Copilot', href: '/compare/copilot' },
    { title: 'vs. Monarch Money', href: '/compare/monarch-money' },
];

export default function GuidesIndex() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Header */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SubTracking" className="w-8 h-8 rounded-lg" />
                        <span className="font-black text-xl">SubTracking</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="bg-indigo-600 text-white px-5 py-2 rounded-xl font-bold text-sm hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20"
                    >
                        Go to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-4">
                            <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                                Help <span className="text-indigo-500">Center</span> & Guides
                            </h1>
                            <p className="text-xl text-slate-400 max-w-2xl">
                                Step-by-step instructions to escape the subscription traps and take back your financial privacy.
                            </p>
                        </div>
                    </div>

                    {/* Featured Resource */}
                    <Link
                        href="/blog/find-unused-subscriptions"
                        className="group block relative overflow-hidden rounded-[32px] border border-white/10 bg-indigo-600/10 p-8 md:p-12 mb-16 hover:border-indigo-500/40 transition-all"
                    >
                        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1 space-y-4 text-center md:text-left">
                                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-black uppercase tracking-widest">
                                    <Zap className="w-3 h-3" />
                                    Ultimate Guide
                                </span>
                                <h2 className="text-3xl md:text-4xl font-black">How to Find Unused Subscriptions</h2>
                                <p className="text-slate-400 text-lg">Our master guide on auditing your spending without giving apps access to your bank login.</p>
                                <span className="inline-flex items-center gap-2 text-indigo-400 font-bold group-hover:translate-x-2 transition-transform">
                                    Read Step-by-Step →
                                </span>
                            </div>
                        </div>
                        <Sparkles className="absolute -right-8 -bottom-8 w-64 h-64 text-indigo-500 opacity-5 group-hover:opacity-10 transition-opacity" />
                    </Link>

                    {/* Grid Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cancellation Guides */}
                        <div className="lg:col-span-2 space-y-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <GraduationCap className="w-6 h-6 text-indigo-400" />
                                How to Cancel Guides
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {guides.map((guide) => (
                                    <Link
                                        key={guide.title}
                                        href={guide.href}
                                        className="p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.07] transition-all group"
                                    >
                                        <div className="text-3xl mb-4">{guide.icon}</div>
                                        <h4 className="text-lg font-bold mb-1 group-hover:text-indigo-400 transition-colors">How to cancel {guide.title}</h4>
                                        <p className="text-sm text-slate-500">Step-by-step escape plan.</p>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Side Section */}
                        <div className="space-y-12">
                            {/* Comparison Side Bar */}
                            <section className="space-y-6">
                                <h3 className="text-2xl font-bold flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-emerald-400" />
                                    Comparisons
                                </h3>
                                <div className="space-y-3">
                                    {comparisons.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            className="block p-4 rounded-xl bg-slate-900 border border-white/5 hover:border-emerald-500/30 transition-all relative overflow-hidden"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <span className="font-bold text-sm">SubTracking {item.title}</span>
                                                {item.tag && <span className="text-[10px] font-black uppercase text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded">{item.tag}</span>}
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>

                            <div className="p-8 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-center space-y-4">
                                <h4 className="text-xl font-bold">Stop the Leaks.</h4>
                                <p className="text-sm opacity-80">Track subscriptions without sharing bank credentials. Join hundreds of users taking control.</p>
                                <Link
                                    href="/dashboard"
                                    className="inline-block w-full bg-white text-indigo-600 py-3 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                                >
                                    Try SubTracking →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
