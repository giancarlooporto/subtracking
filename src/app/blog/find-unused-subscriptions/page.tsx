import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'How to Find Unused Subscriptions Without Linking Your Bank Account',
    description: 'A step-by-step guide to finding and canceling unused subscriptions without giving apps access to your bank. Reduce wasted spending while keeping your financial data private.',
    keywords: [
        'find unused subscriptions',
        'cancel subscriptions without bank login',
        'subscription audit guide',
        'save money on subscriptions',
        'manual subscription tracking',
    ],
    alternates: {
        canonical: 'https://subtracking.app/blog/find-unused-subscriptions',
    },
    openGraph: {
        title: 'How to Find Unused Subscriptions Without Bank Login',
        description: 'Find unused subscriptions and reduce wasted spending—no bank login required.',
        type: 'article',
        publishedTime: '2026-01-19T00:00:00.000Z',
        authors: ['SubTracking'],
    },
};

export default function FindUnusedSubscriptionsPost() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="SubTracking" className="w-8 h-8 rounded-lg" />
                        <span className="font-black text-xl">SubTracking</span>
                    </Link>
                </div>
            </nav>

            {/* Article Header */}
            <article className="pt-32 pb-20 px-6">
                <div className="max-w-3xl mx-auto">
                    {/* Back Link */}
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-tight">
                        How to Find Unused Subscriptions Without Linking Your Bank Account
                    </h1>

                    {/* Meta */}
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

                    {/* Content */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <p className="text-xl text-slate-300 leading-relaxed mb-8">
                            Studies show the average person wastes <strong>up to $450 per year</strong> on subscriptions they don't use. Credit card statements show services you forgot existed, trial periods that auto-renewed, and "just $9.99/month" charges that add up fast.
                        </p>

                        <p>
                            You've probably heard about apps that "automatically find subscriptions" by connecting to your bank account. But there's a catch: <strong>you have to give them full access to your financial data</strong>.
                        </p>

                        <p>
                            This guide shows you how to find and cancel unused subscriptions <strong>without</strong> sharing bank credentials, using Plaid, or trusting third-party apps with your transaction history.
                        </p>

                        <h2 className="text-3xl font-black mt-16 mb-6">Why Skip the Bank Login?</h2>

                        <p>
                            Many popular subscription tracking apps use third-party connection services to link to your bank. While convenient, this approach has serious drawbacks:
                        </p>

                        <ul className="space-y-3">
                            <li><strong>Security Risk:</strong> Your bank credentials are stored by a third-party service. If the connection provider or the app is hacked, your entire financial history is exposed.</li>
                            <li><strong>Terms of Service Violations:</strong> Many banks explicitly forbid sharing login credentials. You could void fraud protection.</li>
                            <li><strong>Privacy Concerns:</strong> These apps see ALL transactions, not just subscriptions. Your grocery purchases, medical bills, everything.</li>
                            <li><strong>Data Sales:</strong> Some "free" apps make money by selling your financial data to advertisers.</li>
                        </ul>

                        <h2 className="text-3xl font-black mt-16 mb-6">The Manual Audit Method (Step-by-Step)</h2>

                        <p>
                            Here's how to find every subscription without connecting your bank:
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-4">Step 1: Check Your Credit Card Statements</h3>

                        <p>
                            Log into each credit card you use and review the last 3 months of statements. Look for:
                        </p>

                        <ul>
                            <li>Recurring charges (same amount, same day each month)</li>
                            <li>Company names you don't recognize</li>
                            <li>Small charges under $20 you've ignored</li>
                        </ul>

                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 my-8">
                            <p className="font-bold text-indigo-400 mb-2">💡 Pro Tip:</p>
                            <p className="text-slate-300 mb-0">Download PDFs of the last 6 months. Use Cmd+F (Mac) or Ctrl+F (Windows) to search for common subscription keywords: "Netflix", "Spotify", "Adobe", "Premium", etc.</p>
                        </div>

                        <h3 className="text-2xl font-bold mt-12 mb-4">Step 2: Check Your Email</h3>

                        <p>
                            Search your email for these terms:
                        </p>

                        <ul>
                            <li>"Receipt" or "invoice"</li>
                            <li>"Subscription renewed"</li>
                            <li>"Thank you for your payment"</li>
                            <li>"Trial ending soon"</li>
                        </ul>

                        <p>
                            You'll find subscriptions you completely forgot about—especially free trials that auto-converted to paid.
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-4">Step 3: Create a Subscription List</h3>

                        <p>
                            Open a spreadsheet or notes app and list every subscription you find:
                        </p>

                        <ul>
                            <li>Service name</li>
                            <li>Monthly cost</li>
                            <li>Renewal date</li>
                            <li>Payment method</li>
                            <li>Last time you actually used it</li>
                        </ul>

                        <h3 className="text-2xl font-bold mt-12 mb-4">Step 4: Calculate the "Ghost Cost"</h3>

                        <p>
                            This is where it gets interesting. For each subscription, calculate the <strong>10-year cost</strong>:
                        </p>

                        <div className="bg-slate-900 border border-white/10 rounded-xl p-6 my-8 font-mono text-sm">
                            <p className="text-slate-400 mb-2">Example: Netflix $15.99/month</p>
                            <p className="text-white">Monthly: $15.99</p>
                            <p className="text-white">Yearly: $191.88</p>
                            <p className="text-emerald-400 font-bold">10-Year "Ghost Cost": $1,918.80</p>
                        </div>

                        <p>
                            Suddenly, that"harmless $15/month service costs almost <strong>$2,000 over a decade</strong>. If you rarely use it, that's $2,000 you're throwing away.
                        </p>

                        <h3 className="text-2xl font-bold mt-12 mb-4">Step 5: Cancel Ruthlessly</h3>

                        <p>
                            Be honest: when did you last use each service? Apply the <strong>30-day rule</strong>:
                        </p>

                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 my-8">
                            <p className="font-bold text-red-400 mb-2">If you haven't used it in 30 days, cancel it.</p>
                            <p className="text-slate-300 mb-0">You can always resubscribe later. Most services let you cancel and restart anytime. Don't pay for "just in case."</p>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Common Subscriptions People Forget</h2>

                        <p>
                            Based on data, here are the most commonly forgotten subscriptions:
                        </p>

                        <ul>
                            <li><strong>Streaming services you shared with an ex</strong> - Still paying for Hulu? Who's watching it?</li>
                            <li><strong>Free trial auto-renewals</strong> - That 7-day HBO Max trial from 6 months ago.</li>
                            <li><strong>App Store subscriptions</strong> - iPhone users: Settings → Your Name → Subscriptions.</li>
                            <li><strong>Gym memberships</strong> - The classic. $50/month, haven't gone in a year.</li>
                            <li><strong>Cloud storage</strong> - Do you really need 2TB on Dropbox AND Google Drive?</li>
                            <li><strong>News/magazine subscriptions</strong> - When did you last read The Athletic?</li>
                            <li><strong>Productivity tools</strong> - That project management app you tried once.</li>
                        </ul>

                        <h2 className="text-3xl font-black mt-16 mb-6">Use a Privacy-First Tracker (Like SubTracking)</h2>

                        <p>
                            Once you've found your subscriptions, you need a way to track them without repeating this manual audit every month.
                        </p>

                        <p>
                            This is where tools like <strong>SubTracking</strong> come in. Unlike bank-connected apps, SubTracking:
                        </p>

                        <ul>
                            <li>Stores data locally on your device (no cloud)</li>
                            <li>Never asks for bank login credentials</li>
                            <li>Costs $19 one-time (no monthly subscription irony)</li>
                            <li>Shows you Ghost Cost projections</li>
                            <li>Sends renewal alerts so you never miss a cancellation window</li>
                        </ul>

                        <div className="bg-indigo-600 rounded-3xl p-8 my-12 text-center">
                            <h3 className="text-2xl font-bold mb-4">Try SubTracking Free</h3>
                            <p className="text-indigo-100 mb-6">Track subscriptions without giving up privacy. No bank login required.</p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-8 py-4 rounded-xl font-bold hover:scale-105 transition-all shadow-xl"
                            >
                                Start Free Now →
                            </Link>
                        </div>

                        <h2 className="text-3xl font-black mt-16 mb-6">Final Thoughts</h2>

                        <p>
                            Finding unused subscriptions doesn't require giving apps access to your bank account. A manual audit takes 30-60 minutes, but you'll likely find $200-500/year in savings.
                        </p>

                        <p>
                            The "Ghost Cost" of keeping unused subscriptions for 10 years can easily exceed $5,000. That's a vacation, a down payment, or serious savings.
                        </p>

                        <p className="text-xl font-bold">
                            Bottom line: Take an hour, audit your subscriptions, and keep your financial data private. Your wallet (and your privacy) will thank you.
                        </p>
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-16 pt-12 border-t border-white/10">
                        <div className="bg-slate-900 rounded-3xl p-8">
                            <h3 className="text-2xl font-bold mb-4">Ready to track your subscriptions?</h3>
                            <p className="text-slate-400 mb-6">
                                SubTracking helps you stay on top of recurring payments without connecting your bank.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <Link
                                    href="/dashboard"
                                    className="inline-flex bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors"
                                >
                                    Try Free →
                                </Link>
                                <ShareButton variant="default" />
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
}
