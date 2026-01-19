import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Adobe Creative Cloud (Without the Fee) | SubTracking Guide',
    description: 'A step-by-step guide to canceling your Adobe subscription, avoiding early termination fees, and tracking your creative tools manually.',
    keywords: [
        'how to cancel adobe creative cloud',
        'cancel adobe without fee',
        'adobe cancellation fee hack',
        'manual subscription tracking',
        'creative cloud alternatives',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-adobe',
    },
};

export default function CancelAdobeGuide() {
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
                        How to Cancel Adobe Creative Cloud Without the Early Termination Fee
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
                            Adobe is notorious for its "Annual Plan, Paid Monthly" trap. If you try to cancel mid-year, you're often hit with a bill for 50% of your remaining balance. Here is how to escape.
                        </p>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="font-bold text-amber-500 mb-1">The "Adobe Trap"</p>
                                <p className="text-slate-300 text-sm mb-0">Most users think they are on a monthly plan, but it's actually an annual contract. Canceling at month 6 could cost you over $100 in fees.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">The "Plan Change" Hack</h2>
                        <p>
                            There is a legendary (and still working) way to bypass the fee:
                        </p>
                        <ol className="space-y-4">
                            <li><strong>Log in</strong> to your Adobe account.</li>
                            <li>Navigate to <strong>"Manage Plan."</strong></li>
                            <li>Choose <strong>"Change Plan"</strong> instead of cancel.</li>
                            <li>Pick a completely different plan (e.g., the "Photography" plan if you're on "All Apps").</li>
                            <li>Confirm the change. This starts a <strong>new 14-day cooling-off period</strong>.</li>
                            <li>Wait 10 minutes, then <strong>Cancel the new plan</strong>. Since you're in the new 14-day window, you'll get a full refund and NO termination fee.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6">Transitioning to Manual Tracking</h2>
                        <p>
                            Once you've escaped the Adobe ecosystem, you might switch to one-time purchase tools like <strong>Affinity Photo</strong> or <strong>DaVinci Resolve</strong>.
                        </p>
                        <p>
                            Managing these "one-off" licenses alongside your remaining subscriptions is where most people lose track of their spending.
                        </p>

                        <div className="bg-indigo-600 rounded-3xl p-8 my-12 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Track Your Tools, Not Just Your Bills</h3>
                            <p className="opacity-90 mb-6 font-medium">Use SubTracking to audit your professional software. Know exactly what you own and what you owe.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Start Free Audit →
                            </Link>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Why Adobe belongs in your "Ghost Meter"</h2>
                        <p>
                            Adobe is a prime candidate for the "Ghost Cost" calculation. If you pay $54.99/month and only use it for occasional hobbies, that's <strong>$6,598 over 10 years</strong>.
                        </p>
                        <p>
                            In SubTracking, you can tag Adobe as "Professional" or "Hobby" and see exactly how it affects your long-term wealth.
                        </p>

                        <div className="mt-16 pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Did this help?</h3>
                            <p className="text-slate-400 mb-6">Share this guide with other creatives who are feeling trapped by subscription fees.</p>
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
