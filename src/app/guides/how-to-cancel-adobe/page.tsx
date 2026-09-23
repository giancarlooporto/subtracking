import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, AlertTriangle, Info } from 'lucide-react';
import { Footer } from "../../../components/Footer";
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
        canonical: 'https://www.subtracking.app/guides/how-to-cancel-adobe',
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
                    <Link
                        href="/dashboard"
                        className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-500 transition-colors"
                    >
                        Try SubTracking
                    </Link>
                </div>
            </nav>

            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    <Link href="/guides" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cancellation Guides
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
                            Adobe offers "Annual Plan, Paid Monthly" subscriptions. If you attempt to cancel mid-contract, an early termination fee amounting to 50% of the remaining contract obligation is typically assessed under their standard terms. Here is how users navigate cancellation options.
                        </p>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="font-bold text-amber-500 mb-1">Annual Commitment Terms</p>
                                <p className="text-slate-300 text-sm mb-0">Many subscribers choose the monthly billing option without realizing it commits to a full 12-month agreement. Canceling mid-contract may incur early termination fees.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Understanding Adobe's 14-Day Plan Modification Window</h2>
                        <p>
                            Under Adobe's subscription policy, switching to a different plan resets the standard 14-day cancellation window:
                        </p>
                        <ol className="space-y-4">
                            <li><strong>Log in</strong> to your Adobe account.</li>
                            <li>Navigate to <strong>"Manage Plan."</strong></li>
                            <li>Choose <strong>"Change Plan"</strong> instead of cancel.</li>
                            <li>Select an alternative plan option (e.g., the "Photography" plan if you're on "All Apps").</li>
                            <li>Confirm the change. This initiates a <strong>new 14-day modification window</strong>.</li>
                            <li>Within that 14-day window, you can <strong>cancel the modified plan</strong> for a full refund of the new plan charge with no early termination fee assessed.</li>
                        </ol>

                        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 my-8 flex gap-4 text-xs text-slate-400">
                            <Info className="w-5 h-5 text-slate-400 shrink-0" />
                            <p className="mb-0">
                                <strong>Safe-Harbor Notice:</strong> SubTracking is an independent, local-first budgeting tool and is not affiliated, associated, authorized, endorsed by, or in any way officially connected with Adobe Inc. Cancellation policies, refund eligibility periods, fee structures, and account workflows are subject to change by the respective provider. Always verify current terms on the official Adobe website.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Transitioning to Manual Tracking</h2>
                        <p>
                            Once you've adjusted or canceled your Adobe subscription, you might switch to one-time purchase tools like <strong>Affinity Photo</strong> or <strong>DaVinci Resolve</strong>.
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
                            <p className="text-slate-400 mb-6">Share this guide with other creatives who are auditing their subscription fees.</p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <ShareButton variant="default" />
                            </div>
                        </div>
                    </div>

                </div>
            </article>
            <Footer />
        </div>
    );
}
