import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tv, CheckCircle, Info, ShieldAlert, Sparkles } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Disney Plus | Easy Step-by-Step Guide | SubTracking',
    description: 'Learn how to cancel your Disney+ subscription, manage your billing through third-party apps, and audit your entertainment spending with SubTracking.',
    keywords: [
        'how to cancel disney plus',
        'cancel disney subscription',
        'stop disney plus billing',
        'disney plus bundle cancel',
        'streaming audit tool',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-disney-plus',
    },
};

export default function CancelDisneyGuide() {
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
                        How to Cancel Disney Plus Without the Headache
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
                            Whether you finished the latest season of *The Mandalorian* or you're just cutting down on "Entertainment Fluff," canceling Disney+ should be simple. But like most streaming services, the "Cancel" button is often hidden behind layers of confirmations.
                        </p>

                        <div className="bg-sky-500/10 border border-sky-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <Sparkles className="w-6 h-6 text-sky-400 shrink-0" />
                            <div>
                                <p className="font-bold text-sky-400 mb-1">Annual vs. Monthly</p>
                                <p className="text-slate-300 text-sm mb-0">If you paid for an annual plan, you won't get a partial refund. However, you can still cancel now to prevent the auto-renewal next year. SubTracking's 'Ghost Meter' can show you how much that annual bill actually costs you in the long run.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">How to Cancel Disney+ on Web</h2>
                        <ol className="space-y-4">
                            <li>Log in to your account at <strong>DisneyPlus.com</strong> on a computer or mobile browser.</li>
                            <li>Select your <strong>Profile Icon</strong> and tap <strong>Account</strong>.</li>
                            <li>Under the <strong>'Subscription'</strong> section, select your subscription (e.g., Disney+ Monthly).</li>
                            <li>Select <strong>'Cancel Subscription'</strong>.</li>
                            <li>Complete the survey and confirm your choice by clicking <strong>'Continue to Cancel'</strong>.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Third-Party Billing (The "Middleman" Problem)</h2>
                        <p>
                            Many users sign up for Disney+ through **Amazon**, **Roku**, or **Apple**. If your billing is handled by a third party, you cannot cancel on the Disney+ website. You must log in to that specific account (e.g., Apple ID settings) to stop the charges.
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white">
                                <Info className="w-6 h-6 text-sky-400" />
                                Audit Your Subscriptions
                            </h3>
                            <p className="text-slate-300 mb-6 transition-all">
                                Keeping track of "Middleman" subscriptions is exactly why we built SubTracking's <strong>Vault</strong>. Tag each service with its billing source (e.g., "via Apple") so you never waste time searching for that 'Cancel' button again.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Why SubTracking is the Better Way to Manage Streaming</h2>
                        <p>
                            Streaming costs are the #1 source of "Budget Creep." One month it's Disney, the next it's a bundle, then a Live TV upgrade. SubTracking gives you a <strong>high-level map</strong> of your recurring lifestyle, showing you the 10-year impact of that $158/year annual bill.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 my-12 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2 text-white">
                                <ShieldAlert className="w-6 h-6 text-white" />
                                Take Back Control
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
                            <p className="text-slate-400 mb-6">Help your friends recover their "Ghost Costs" today.</p>
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
