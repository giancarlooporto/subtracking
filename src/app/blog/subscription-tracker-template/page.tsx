import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, ShieldX, Ghost, BarChart3, BellRing, Sparkles } from 'lucide-react';
import { ShareButton } from '../../../components/ShareButton';

export const metadata: Metadata = {
    title: 'Free Subscription Tracker Template 2026 (Excel & Google Sheets) | SubTracking',
    description: 'Looking for a free subscription tracker template? Download our manual audit list but learn why a dedicated app is safer and more effective for managing your money.',
    keywords: [
        'free subscription tracker template',
        'google sheets subscription tracker',
        'excel subscription list',
        'manage subscriptions for free',
        'subscription audit checklist',
    ],
    alternates: {
        canonical: 'https://subtracking.app/blog/subscription-tracker-template',
    },
};

export default function TemplateGuide() {
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
                <div className="max-w-4xl mx-auto">
                    <Link href="/blog/find-unused-subscriptions" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Audit Guide
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                        Free <span className="text-emerald-500">Subscription Tracker</span> Template (2026)
                    </h1>
                    <p className="text-xl text-slate-300 leading-relaxed mb-12">
                        Most "free" templates are either too complex or too basic. We've built the ultimate manual audit list for you below—and we'll explain why you should eventually move past the spreadsheet.
                    </p>

                    {/* The "Template" - Structured as a checklist or visual list */}
                    <div className="bg-slate-900 border border-white/10 rounded-3xl p-8 mb-16 shadow-2xl">
                        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                            <FileText className="w-6 h-6 text-emerald-500" />
                            The Manual Audit Checklist
                        </h2>
                        <p className="text-slate-400 mb-8">If you're building your own sheet in Excel or Google Sheets, ensure you have these columns:</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Service Name", "Monthly Cost", "Renewal Date",
                                "Category (Essential vs Utility)", "Payment Method",
                                "Cancellation Link / Process", "Last Usage Date", "10-Year Total Cost"
                            ].map((item, i) => (
                                <div key={i} className="bg-slate-950/50 border border-white/5 p-4 rounded-xl flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                    <span className="font-medium text-slate-200">{item}</span>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="font-bold text-emerald-400 mb-1">Want to skip the spreadsheet setup?</p>
                                <p className="text-sm text-slate-400 mb-0">SubTracking comes with these fields (and more) ready to use out of the box.</p>
                            </div>
                            <Link href="/dashboard" className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap">
                                Try SubTracking Instead →
                            </Link>
                        </div>
                    </div>

                    {/* Why Templates Fail */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-4xl font-black mb-8">Why "Template-Based" tracking fails</h2>
                        <p>
                            A spreadsheet is a great place to start, but it's where financial discipline goes to die. Here is why most people abandon their free templates within 3 months:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
                            <div className="space-y-4">
                                <BellRing className="w-10 h-10 text-orange-400" />
                                <h3 className="text-xl font-bold mt-0">No Alerts</h3>
                                <p className="text-sm text-slate-400">A spreadsheet can't nudge you. You'll miss that $297 annual renewal because you didn't check the file today.</p>
                            </div>
                            <div className="space-y-4">
                                <BarChart3 className="w-10 h-10 text-indigo-400" />
                                <h3 className="text-xl font-bold mt-0">Manual Math</h3>
                                <p className="text-sm text-slate-400">Updating currencies and projecting long-term costs manually is tedious. If it's tedious, you won't do it.</p>
                            </div>
                            <div className="space-y-4">
                                <ShieldX className="w-10 h-10 text-red-400" />
                                <h3 className="text-xl font-bold mt-0">Data Exposure</h3>
                                <p className="text-sm text-slate-400">Storing your financial list in a Google Drive file puts your data in the cloud. We keep it locked to your device.</p>
                            </div>
                        </div>

                        <h2 className="text-4xl font-black mb-8">The "Ghost Cost" Realization</h2>
                        <p>
                            The biggest downside of a template is that it doesn't emphasize **impact**. Seeing a number in a cell is different from seeing an animated 10-year projection of wasted money.
                        </p>
                        <p>
                            We built SubTracking's <strong>Ghost Meter™</strong> specifically because spreadsheets didn't make us feel the "pain" of the subscription. When you see that a $20/month app is actually a **$2,400 bill** over a decade, you cancel it.
                        </p>

                        <div className="bg-indigo-600 rounded-3xl p-12 my-20 text-center text-white relative overflow-hidden">
                            <Ghost className="absolute -right-8 -bottom-8 w-48 h-48 opacity-10 rotate-12" />
                            <h2 className="text-4xl font-black mb-6 mt-0">Beyond the Template.</h2>
                            <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
                                Use our checklist to start your audit today. When you're ready for automatic alerts, privacy-first storage, and long-term projections, we'll be here.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl"
                            >
                                Start Auditing Now →
                            </Link>
                        </div>
                    </div>

                    <div className="mt-16 pt-12 border-t border-white/10">
                        <h3 className="text-2xl font-bold mb-4">Help a friend save money</h3>
                        <p className="text-slate-400 mb-6">Share this checklist with anyone struggling to manage their monthly recurring costs.</p>
                        <div className="flex flex-col sm:flex-row items-center gap-4">
                            <ShareButton variant="default" />
                        </div>
                    </div>

                </div>
            </article>
        </div>
    );
}
