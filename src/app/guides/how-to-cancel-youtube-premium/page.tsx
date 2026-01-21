import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Play, CheckCircle, Info, ShieldAlert, Youtube } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel YouTube Premium | Step-by-Step Guide | SubTracking',
    description: 'Learn how to cancel your YouTube Premium subscription, revert to ad-supported YouTube, and track your Google service costs with SubTracking.',
    keywords: [
        'how to cancel youtube premium',
        'cancel youtube music sub',
        'stop youtube premium billing',
        'youtube family plan cancel',
        'google subscription tracker',
    ],
    alternates: {
        canonical: 'https://subtracking.app/guides/how-to-cancel-youtube-premium',
    },
};

export default function CancelYoutubeGuide() {
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
                        How to Cancel YouTube Premium and YouTube Music
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
                            YouTube Premium is great for removing ads, but at $13.99/month, it's one of the more expensive streaming services. If you find yourself using other music apps more often, or you don't mind the odd commercial, here is how to stop the recurring charge.
                        </p>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <Info className="w-6 h-6 text-red-500 shrink-0" />
                            <div>
                                <p className="font-bold text-red-500 mb-1">Pause is Permanent-ish</p>
                                <p className="text-slate-300 text-sm mb-0">Google will strongly suggest "Pausing" for 6 months. Like Hulu, this is a trap to get you to forget about the subscription until it resumes. Go for full cancellation to be safe.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">How to Cancel YouTube Premium on Web</h2>
                        <ol className="space-y-4">
                            <li>Visit <strong>youtube.com/paid_memberships</strong> in your browser.</li>
                            <li>Find your <strong>Premium</strong> membership.</li>
                            <li>Click <strong>'Manage membership'</strong>.</li>
                            <li>Click <strong>'Deactivate'</strong>.</li>
                            <li>YouTube will offer to Pause—click <strong>'Continue to cancel'</strong> instead.</li>
                            <li>Select your reason and confirm by clicking <strong>'Yes, cancel'</strong>.</li>
                        </ol>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Family and Student Plans</h2>
                        <p>
                            If you are the "manager" of a <strong>Family Plan</strong>, canceling your subscription will also end the benefits for everyone else in your household. If you are a member of someone else's family plan, you don't need to cancel—but you should still track the cost in SubTracking if you're the one paying the bill.
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 my-12">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-white text-white">
                                <Youtube className="w-6 h-6 text-red-600" />
                                The "No-Ad" Ghost Cost
                            </h3>
                            <p className="text-slate-300 mb-6 font-medium">
                                At $13.99/month, YouTube Premium costs <strong>$1,678.80 over 10 years</strong>. Is that worth 35,000 skipped ads? SubTracking's Ghost Meter helps you put a real price on convenience so you can make an informed decision.
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6 text-white text-white">Stop Trial Traps with SubTracking</h2>
                        <p>
                            YouTube is famous for 3-month free trials that turn into expensive bills the second you forget about them. When you start a trial, add it to your SubTracking <strong>Vault</strong> immediately. Set a <strong>Trial Shield</strong> alert for 2.5 months from now, so you never pay for a service you didn't intend to keep.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 my-12 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <h3 className="text-2xl font-black mb-4 flex items-center justify-center gap-2 text-white">
                                <ShieldAlert className="w-6 h-6 text-white text-white" />
                                Audit Your Subscriptions
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
                            <p className="text-slate-400 mb-6">Help others find their "Ghost Costs" today.</p>
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
