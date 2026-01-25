import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, ShoppingCart, CheckCircle, Info, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Amazon Prime | Step-by-Step Membership Guide | SubTracking',
    description: 'Learn how to cancel your Amazon Prime membership, stop auto-renewals, and manage your recurring Amazon costs with SubTracking.',
    keywords: [
        'how to cancel amazon prime',
        'cancel prime membership',
        'stop prime auto-renewal',
        'amazon prime refund',
        'subscription auditor app',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/guides/how-to-cancel-amazon-prime',
    },
};

export default function CancelPrimeGuide() {
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
                        How to Cancel Amazon Prime (The Right Way)
                    </h1>

                    <div className="flex items-center gap-6 text-sm text-slate-500 mb-12 pb-8 border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            January 20, 2026
                        </div>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            SubTracking Team
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            Amazon Prime is a behemoth. But if you're not ordering daily or watching Prime Video, that $139/year (or $14.99/month) is a significant drain on your finances. Amazon's cancellation flow is notoriously long, designed to make you stay. Here's how to push through.
                        </p>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="font-bold text-amber-500 mb-1">The "End Benefits" Trick</p>
                                <p className="text-slate-300 text-sm mb-0">Amazon will often ask if you want to 'End Benefits' on a specific date. This can be confusing. To fully stop the bill, you must confirm you want to 'End Membership'.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">How to Cancel Amazon Prime</h2>
                        <ol className="space-y-4">
                            <li>Log in to your Amazon account and go to <strong>'Account & Lists'</strong>.</li>
                            <li>Select <strong>'Prime'</strong> (Your Membership).</li>
                            <li>On the top right, select <strong>'Update, cancel and more'</strong>.</li>
                            <li>Click the button that says <strong>'End Membership'</strong>.</li>
                            <li>Amazon will show you how much you've saved on shipping (ignore this) and click <strong>'I Do Not Want My Benefits'</strong>.</li>
                            <li>Click <strong>'Continue to Cancel'</strong> through the next two screens until you see the final confirmation.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Prime Video-Only Subs</h2>
                        <p>
                            Note that many users have <strong>individual channel subscriptions</strong> (like Paramount+, Max, or Discovery+) billed *through* Amazon Prime Video. Canceling your main Prime membership may not automatically cancel these channels. You need to go to <strong>'Memberships & Subscriptions'</strong> in your Amazon account to stop those specifically.
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white text-white">
                                <ShoppingCart className="w-6 h-6 text-amber-400" />
                                The Ghost Meter Projection
                            </h3>
                            <p className="text-slate-300 mb-6 font-medium">
                                Amazon Prime at $14.99/month is <strong>$1,798.80 over 10 years</strong>. In SubTracking, the Ghost Meter visualizes this cost alongside your shipping habits. If you save $10 in shipping but pay $15 in membership, you're losing money every single month.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Take Control with SubTracking</h2>
                        <p>
                            Amazon Prime is one of the hardest subscriptions to audit because it's so integrated into our lives. SubTracking lets you tag Prime as an <strong>"Essential"</strong> or <strong>"Discretionary"</strong> cost, allowing you to see your "True Spending" without the marketing fluff.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 my-12 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2 text-white">
                                <ShieldAlert className="w-6 h-6 text-white" />
                                Stop the Amazon Leak
                            </h3>
                            <p className="opacity-90 mb-6 font-medium">Use SubTracking to audit your professional software. Know exactly what you own and what you owe.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Start Auditing Now →
                            </Link>
                        </div>

                        <div className="mt-16 pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-4 text-white">Share this guide</h3>
                            <p className="text-slate-400 mb-6">Help your friends find their "Ghost Costs" today.</p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <ShareButton variant="default" />
                            </div>
                        </div>
                    </div>

                </div>
            </article>
        </div>
    );
}
