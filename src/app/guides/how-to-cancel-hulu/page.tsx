import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tv, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Hulu | Step-by-Step Cancellation Guide | SubTracking',
    description: 'A complete guide on how to cancel your Hulu subscription, manage bundles, and track your streaming costs with SubTracking.',
    keywords: [
        'how to cancel hulu',
        'cancel hulu subscription',
        'hulu pause vs cancel',
        'stop paying for hulu',
        'how to cancel hulu bundle',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-hulu',
    },
};

export default function CancelHuluGuide() {
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
                        How to Cancel Hulu (and Escape the Bundle Trap)
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
                            Hulu is one of the pillars of the streaming wars. But with price hikes and confusing bundles, it might be time to cut the cord again. Whether you're on a student plan or the full Live TV package, here is how to cancel.
                        </p>

                        <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <Info className="w-6 h-6 text-amber-500 shrink-0" />
                            <div>
                                <p className="font-bold text-amber-500 mb-1">Pause vs. Cancel</p>
                                <p className="text-slate-300 text-sm mb-0">Hulu often offers to "Pause" your subscription for up to 12 weeks. Don't fall for it if you genuinely want to save money—it will auto-resume and bill you later. Choose full cancellation instead.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">How to Cancel Hulu on Web</h2>
                        <ol className="space-y-4">
                            <li>Log in to your <strong>Account</strong> page on Hulu.com.</li>
                            <li>Navigate to the <strong>'Your Subscription'</strong> section.</li>
                            <li>Click <strong>'Cancel'</strong> next to 'Cancel Your Subscription'.</li>
                            <li>Hulu will try to offer you a discount or a "Pause"—click <strong>'Continue to Cancel'</strong>.</li>
                            <li>Provide a reason (or skip) and click <strong>'Cancel Subscription'</strong> one last time.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white text-white">The "Bundle" Complication</h2>
                        <p>
                            If you have the <strong>Disney Bundle</strong> (Hulu, Disney+, and ESPN+), canceling Hulu individually might not stop the bill. You usually need to go to your Disney+ account settings to manage or cancel the entire bundle together.
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Tv className="w-6 h-6 text-sky-400" />
                                The Streaming Rotation
                            </h3>
                            <p className="text-slate-300 mb-6 font-medium">
                                Why pay for Hulu all year? Many SubTracking users practice "Monthly Rotations"—canceling Hulu to watch Netflix, then canceling Netflix to come back for a month of Hulu. This strategy saves the average user <strong>over $120 a year</strong>.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white text-white">Track the Restart with SubTracking</h2>
                        <p>
                            When you cancel Hulu, you usually have access until the end of your billing cycle. Add the <strong>Cancellation Date</strong> to your SubTracking dashboard so you know exactly when the screen will go dark—and more importantly, ensure no surprise "resume" charge hits your bank.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 my-12 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2 text-white">
                                <ShieldAlert className="w-6 h-6 text-white" />
                                Stop the Leaks
                            </h3>
                            <p className="opacity-90 mb-6 font-medium">Use SubTracking to audit all your streaming bundles in one place. Privacy-first, no bank logins.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Start Auditing Now →
                            </Link>
                        </div>

                        <div className="mt-16 pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-4 text-white">Share this guide</h3>
                            <p className="text-slate-400 mb-6">Help others simplify their streaming setup.</p>
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
