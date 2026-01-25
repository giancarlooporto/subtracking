import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Dumbbell, MapPin, Mail, AlertTriangle } from 'lucide-react';
import { Footer } from "../../../components/Footer";
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Cancel Planet Fitness (Without Going in Person) | Guide',
    description: 'A comprehensive guide to canceling your Planet Fitness membership via certified mail and why gyms make it so hard to quit. Plus, track your fitness budget.',
    keywords: [
        'how to cancel planet fitness',
        'cancel planet fitness membership',
        'planet fitness cancellation letter',
        'avoid gym service fees',
        'track gym membership costs',
    ],
    alternates: {
        canonical: 'https://www.subtracking.app/guides/how-to-cancel-planet-fitness',
    },
};

export default function CancelPlanetFitnessGuide() {
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
                        How to Cancel Planet Fitness Without the In-Person Headache
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
                            Planet Fitness is famous for two things: $10 memberships and making it impossible to cancel. They usually require you to show up in person or send a physical letter. Here is how to handle both.
                        </p>

                        <h2 className="text-3xl font-black mt-16 mb-6">Option 1: The Certified Letter (Safe & Remote)</h2>
                        <p>
                            If you don't want to deal with the "sales pitch" at the front desk, send a certified letter. This creates a legal paper trail.
                        </p>
                        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 my-8 space-y-4">
                            <p className="font-mono text-sm uppercase tracking-widest text-slate-500">Cancellation Letter Template:</p>
                            <p className="italic text-slate-300">
                                "Dear Planet Fitness [Branch Name], I am writing to formally request the cancellation of my membership (Key Tag #XXXXX) effective immediately. Please stop all future billing and send a confirmation of this cancellation to my email."
                            </p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Option 2: The In-Person Method</h2>
                        <p>
                            If you go in person, ensure you get a <strong>signed cancellation document</strong>. Do not leave the building without a receipt. Gyms are notorious for "losing" cancellation requests.
                        </p>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 my-8 flex gap-4">
                            <AlertTriangle className="w-6 h-6 text-red-500 shrink-0" />
                            <div>
                                <p className="font-bold text-red-500 mb-1">Watch out for the 'Annual Fee'</p>
                                <p className="text-slate-300 text-sm mb-0">Planet Fitness charges a $39–$49 annual fee on top of your monthly dues. Check your bank statement for this hidden "Ghost Cost."</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Stop Chronic Gym Spending</h2>
                        <p>
                            Many people keep their $10 Planet Fitness membership "just in case." But $10/month is $120/year. Add the annual fee, and you're at $170/year for a service you might not be using.
                        </p>

                        <div className="bg-indigo-600 rounded-3xl p-8 my-12 text-center text-white">
                            <h3 className="text-2xl font-bold mb-4">Audit Your Physical & Digital Life</h3>
                            <p className="opacity-90 mb-6 font-medium">SubTracking handles more than just apps. Use it to track gym memberships, rent, and utility trends. Complete financial visibility.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Start Your Audit Free →
                            </Link>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Tracking "Invisible" Costs</h2>
                        <p>
                            Planet Fitness is a master of the "Invisible Cost." It's so cheap you forget it exists. SubTracking's <strong>Ghost Meter</strong> is designed specifically for these types of subscriptions—it shines a light on the small leaks that sink the ship.
                        </p>

                        <div className="mt-16 pt-12 border-t border-white/10 text-center">
                            <h3 className="text-2xl font-bold mb-4">Sharing is Caring</h3>
                            <p className="text-slate-400 mb-6">Help a friend quit their gym membership (finally).</p>
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
