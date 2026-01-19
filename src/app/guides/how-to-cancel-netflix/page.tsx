import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tv, CheckCircle, Smartphone, Info } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Netflix & Manage Your Streaming Budget | SubTracking',
    description: 'A quick guide to canceling your Netflix subscription and how to track your rotating streaming services manually to save money.',
    keywords: [
        'how to cancel netflix',
        'cancel netflix account',
        'stop paying for netflix',
        'streaming service rotation strategy',
        'track streaming subscriptions',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-netflix',
    },
};

export default function CancelNetflixGuide() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SubTracking" className="w-8 h-8 rounded-lg" />
                        <span className="font-black text-xl">SubTracking</span>
                    </Link>
                </div>
            </nav>

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <Link href="/blog/find-unused-subscriptions" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Audit Guide
                    </Link>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                        How to Cancel Netflix and Master "Streaming Rotation"
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-12 pb-8 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            January 19, 2026
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            SubTracking Team
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            With Netflix prices rising and password sharing ending, many users are looking for the exit. Here is the fastest way to cancel and a strategy to never overpay for streaming again.
                        </p>

                        <h2 className="text-3xl font-black mt-16 mb-6">How to Cancel Netflix (Web & App)</h2>
                        <ul className="space-y-4">
                            <li><strong>On Web:</strong> Log in, click your profile icon → <strong>Account</strong> → <strong>Cancel Membership</strong>.</li>
                            <li><strong>On iPhone:</strong> Settings → Your Name → <strong>Subscriptions</strong> → Netflix → Cancel.</li>
                            <li><strong>On Android:</strong> Play Store → Menu → <strong>Payments & Subscriptions</strong> → Netflix → Cancel.</li>
                        </ul>

                        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <Info className="w-6 h-6 text-blue-400 shrink-0" />
                            <div>
                                <p className="font-bold text-blue-400 mb-1">Stay until the end</p>
                                <p className="text-slate-300 text-sm mb-0">Netflix doesn't offer pro-rated refunds, but you keep access until your current billing cycle ends. Cancel the day after you pay to ensure you don't forget next month.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">The "Streaming Rotation" Strategy</h2>
                        <p>
                            The most efficient way to enjoy streaming is <strong>Rotation</strong>. Never pay for Netflix, Hulu, and Disney+ at the same time.
                        </p>
                        <p>
                            1. Pick one service for the month.<br />
                            2. Set a <strong>Renewal Alert</strong> in SubTracking.<br />
                            3. Cancel it before it renews and switch to the next service.
                        </p>

                        <div className="bg-indigo-600 rounded-3xl p-8 my-12 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Master Your Streaming Budget</h3>
                            <p className="opacity-90 mb-6 font-medium">Use SubTracking to set renewal alerts for your rotation. Never pay for a service you aren't currently watching.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Try SubTracking Free →
                            </Link>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Tracking the "Price Hike" Risk</h2>
                        <p>
                            Netflix has a history of quietly raising prices. If you use an automated tracker, you might miss the extra $2–3 charge.
                        </p>
                        <p>
                            When you track manually with SubTracking, you stay conscious of every dollar. You decide if the new price is worth the value.
                        </p>

                        <div className="mt-16 pt-12 border-t border-white/10 text-center">
                            <h3 className="text-2xl font-bold mb-4">Found this useful?</h3>
                            <div className="flex justify-center">
                                <ShareButton variant="default" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
