import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Table, Zap, ShieldCheck, Clock, AlertCircle, CheckCircle, XCircle, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Excel vs. SubTracking: Why Spreadsheets Fail for Subscription Tracking',
    description: 'Stop wasting time with manual spreadsheets. Compare Excel/Google Sheets to SubTracking and learn why a dedicated, privacy-first tool is the better way to manage your expenses.',
    keywords: [
        'excel subscription tracker',
        'google sheets subscription template',
        'manage subscriptions spreadsheet',
        'automated subscription tracking',
        'privacy-first finance tool',
    ],
    alternates: {
        canonical: 'https://subtracking.app/compare/excel-vs-subtracking',
    },
};

export default function ExcelComparison() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">
            {/* Nav */}
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
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Home
                    </Link>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-tight">
                        The <span className="text-indigo-500">Spreadsheet</span> is Dead.
                    </h1>
                    <p className="text-2xl text-slate-400 mb-12 leading-relaxed max-w-2xl">
                        You're trying to save money, so you built a spreadsheet. But manual tracking is the #1 reason people stop auditing their spending.
                    </p>

                    {/* Comparison Table */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
                        {/* Excel Column */}
                        <div className="bg-slate-900/50 border border-white/5 rounded-3xl p-8 space-y-6">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-emerald-500/10 p-3 rounded-2xl">
                                    <Table className="w-6 h-6 text-emerald-500" />
                                </div>
                                <h2 className="text-2xl font-bold">Excel / Sheets</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-slate-400">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                    <span><strong>Zero Alerts:</strong> You have to remember to open the file to see what's due.</span>
                                </li>
                                <li className="flex gap-3 text-slate-400">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                    <span><strong>High Friction:</strong> Every time you add a sub, you have to fix formulas and formatting.</span>
                                </li>
                                <li className="flex gap-3 text-slate-400">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                    <span><strong>No Projections:</strong> Calculating the 10-year "Ghost Cost" requires complex math.</span>
                                </li>
                                <li className="flex gap-3 text-slate-400">
                                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                                    <span><strong>Mobile Friction:</strong> Editing a spreadsheet on your phone is a nightmare.</span>
                                </li>
                            </ul>
                        </div>

                        {/* SubTracking Column */}
                        <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-8 space-y-6 ring-2 ring-indigo-500/50">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="bg-indigo-500/20 p-3 rounded-2xl">
                                    <Zap className="w-6 h-6 text-indigo-400" />
                                </div>
                                <h2 className="text-2xl font-bold">SubTracking</h2>
                            </div>
                            <ul className="space-y-4">
                                <li className="flex gap-3 text-slate-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                                    <span><strong>Smart Alerts:</strong> Automatic browser notifications 3 days before any renewal.</span>
                                </li>
                                <li className="flex gap-3 text-slate-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                                    <span><strong>Zero Math:</strong> Ghost Meter™ does all the long-term cost projections for you.</span>
                                </li>
                                <li className="flex gap-3 text-slate-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                                    <span><strong>Privacy First:</strong> No cloud, no bank login. Your data never leaves your device.</span>
                                </li>
                                <li className="flex gap-3 text-slate-200">
                                    <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                                    <span><strong>Works Anywhere:</strong> Progressive Web App (PWA) feels like a native app on mobile.</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Content Sections */}
                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-4xl font-black mb-8">Why "Manual" shouldn't mean "Hard"</h2>
                        <p>
                            We advocates for manual tracking because it forces **Intentionality**. When you connect a bank account, you become passive. When you manually log a cost, you feel the weight of it.
                        </p>
                        <p>
                            However, Excel is the wrong tool for the job. It was built for static data, not dynamic lifestyle management.
                        </p>

                        <div className="bg-slate-900 border border-white/5 rounded-3xl p-8 my-12 flex flex-col md:flex-row gap-8 items-center">
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-indigo-400">
                                    <ShieldCheck className="w-6 h-6" />
                                    Privacy Over Everything
                                </h3>
                                <p className="text-slate-400 mb-0">
                                    Google Sheets and Excel Online store your financial data on their servers. SubTracking stores everything in your browser's local storage. Not even we can see what you spend.
                                </p>
                            </div>
                            <div className="bg-indigo-500/20 px-6 py-4 rounded-2xl font-mono text-indigo-300 text-sm">
                                Zero Cloud Footprint.
                            </div>
                        </div>

                        <h2 className="text-4xl font-black mb-8">The Cost of "Free"</h2>
                        <p>
                            A "Free" Excel template isn't free. It costs you the time it takes to maintain it, and more importantly, it costs you the money you forget to save because those $15/month charges aren't being projected over 10 years.
                        </p>
                        <p>
                            SubTracking is a **one-time purchase**. No subscription to track your subscriptions. Just a tool that works forever.
                        </p>

                        <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-12 my-20 text-center text-white shadow-2xl shadow-indigo-500/20">
                            <Sparkles className="w-12 h-12 mb-6 mx-auto text-yellow-400 animate-pulse" />
                            <h2 className="text-4xl font-black mb-6 mt-0">Ready to kill the spreadsheet?</h2>
                            <p className="text-xl opacity-90 mb-10 max-w-xl mx-auto">
                                Join hundreds of users who switched from Excel to SubTracking for a cleaner, faster, and more private audit experience.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex bg-white text-indigo-700 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-xl"
                            >
                                Start Your Audit Free →
                            </Link>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-20 pt-8 border-t border-white/5 text-center">
                        <p className="text-[10px] text-slate-700 leading-relaxed uppercase tracking-widest">
                            Disclaimer: Excel is a trademark of Microsoft Corporation. Google Sheets is a trademark of Google LLC. SubTracking is an independent tool designed for manual expense tracking and is not affiliated with or endorsed by Microsoft or Google.
                        </p>
                    </div>
                </div>
            </article>
        </div>
    );
}
