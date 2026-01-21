import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Music, CheckCircle, Info, ShieldAlert } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Spotify Premium | Step-by-Step Guide | SubTracking',
    description: 'Learn how to cancel your Spotify Premium subscription, switch to the free version, and track your music spending with SubTracking.',
    keywords: [
        'how to cancel spotify premium',
        'cancel spotify subscription',
        'spotify premium refund',
        'stop paying for spotify',
        'manual subscription tracking',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-spotify',
    },
};

export default function CancelSpotifyGuide() {
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
                        How to Cancel Spotify Premium and Save Hundreds
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
                            Spotify Premium is one of those "invisible" costs. Small enough to ignore, but significant over the long run. Whether you're switching to YouTube Music or just going back to the free (ad-supported) version, here's how to stop the recurring bill.
                        </p>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <Info className="w-6 h-6 text-indigo-400 shrink-0" />
                            <div>
                                <p className="font-bold text-indigo-400 mb-1">Important: App Store vs. Web</p>
                                <p className="text-slate-300 text-sm mb-0">If you signed up via Apple (iOS) or Google (Android), you might have to cancel through your phone's subscription settings instead of the Spotify website.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white">How to Cancel via Web</h2>
                        <ol className="space-y-4">
                            <li>Go to <strong>spotify.com/account</strong> and log in.</li>
                            <li>Under <strong>'Your plan'</strong>, click <strong>'Change plan'</strong>.</li>
                            <li>Scroll down to <strong>'Spotify Free'</strong> and click <strong>'Cancel Premium'</strong>.</li>
                            <li>Follow the prompts until you reach the confirmation screen.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white">How to Cancel on iPhone (Apple)</h2>
                        <ol className="space-y-4">
                            <li>Open <strong>Settings</strong> on your phone.</li>
                            <li>Tap your <strong>Name</strong> at the top.</li>
                            <li>Tap <strong>Subscriptions</strong>.</li>
                            <li>Select <strong>Spotify</strong> and tap <strong>Cancel Subscription</strong>.</li>
                        </ol>

                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Music className="w-6 h-6 text-indigo-400" />
                                The "Music Math"
                            </h3>
                            <p className="text-slate-300 mb-6">
                                A family plan at $16.99/month seems small. But over 10 years, that's <strong>$2,038.80</strong>. If you're shared among family, it's efficient. If you're paying solo and barely use it, it's a "Ghost Cost."
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white">Why Use SubTracking Instead?</h2>
                        <p>
                            Most people forget they even have Spotify Premium until the bill hits their statement. SubTracking's <strong>Renewal Alerts</strong> send you a nudge 3 days before the charge, giving you time to decide if you really want another month of music.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 my-12 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2">
                                <ShieldAlert className="w-6 h-6" />
                                Audit Your Audio
                            </h3>
                            <p className="opacity-90 mb-6 font-medium">Add Spotify to your SubTracking dashboard and visualize exactly when the trial ends.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Get Started Free →
                            </Link>
                        </div>

                        <div className="mt-16 pt-12 border-t border-white/10">
                            <h3 className="text-2xl font-bold mb-4 text-white">Share this guide</h3>
                            <p className="text-slate-400 mb-6">Help your friends recover their "Ghost Costs."</p>
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
