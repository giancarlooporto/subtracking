import Link from 'next/link';
import { siteConfig } from '../../siteConfig';
import { Zap } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface FooterProps {
    isPro?: boolean;
    onUnlockPro?: () => void;
    minimal?: boolean;
}

export function Footer({ isPro, onUnlockPro, minimal = false }: FooterProps) {
    const currentYear = new Date().getFullYear();

    if (minimal) {
        return (
            <footer className="w-full py-12 mt-24 border-t border-slate-900/50 relative z-10">
                <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <p className="text-slate-600 text-sm">
                            &copy; {currentYear} {siteConfig.siteName}
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/privacy" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Privacy</Link>
                        <Link href="/terms" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Terms</Link>
                        <a href="mailto:support@subtracking.app" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">Support</a>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer className="w-full py-20 mt-24 border-t border-slate-900/50 relative z-10 overflow-hidden">
            <div className="max-w-6xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1 border-b border-white/5 md:border-0 pb-8 md:pb-0">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <img src="/logo.png" alt="SubTracking" className="w-7 h-7 rounded-lg" />
                            <span className="font-black text-lg tracking-tight">SubTracking</span>
                        </Link>
                        <p className="text-xs text-slate-500 leading-relaxed max-w-[200px]">
                            Stop bank harvesting and take back your financial privacy. 100% local, 100% yours.
                        </p>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy-subscription-tracker" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Privacy Features</Link></li>
                            <li><Link href="/no-bank-login" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Why No Bank Login?</Link></li>
                            <li><Link href="/manual-vs-automated" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Manual vs Automated</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Resources</h4>
                        <ul className="space-y-3">
                            <li><Link href="/guides" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors font-bold">Cancellation Guides</Link></li>
                            <li><Link href="/blog/find-unused-subscriptions" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Audit Masterclass</Link></li>
                            <li><Link href="/blog/subscription-tracker-template" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">Excel Template</Link></li>
                            <li><Link href="/compare/excel-vs-subtracking" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">vs. Spreadsheets</Link></li>
                        </ul>
                    </div>

                    {/* Compare & Company (Combined for balance if needed, or separate) */}
                    <div className="space-y-4">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Compare</h4>
                        <ul className="space-y-3">
                            <li><Link href="/compare/rocket-money" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">vs Rocket Money</Link></li>
                            <li><Link href="/compare/copilot" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">vs Copilot</Link></li>
                            <li><Link href="/compare/monarch-money" className="text-xs text-slate-400 hover:text-indigo-400 transition-colors">vs Monarch Money</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        <span>&copy; {currentYear} SubTracking</span>
                        <span className="hidden md:block opacity-20">•</span>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <span className="hidden md:block opacity-20">•</span>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <span className="hidden md:block opacity-20">•</span>
                        <a href="mailto:support@subtracking.app" className="hover:text-white transition-colors">Support</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <ShareButton variant="footer" />
                        {!isPro && (
                            <button
                                onClick={onUnlockPro}
                                className="px-4 py-2 rounded-lg bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all"
                            >
                                Get Pro Access
                            </button>
                        )}
                    </div>
                </div>

                {/* Subtle Legal Footnote */}
                {!minimal && (
                    <div className="mt-12 text-center">
                        <p className="text-[9px] text-slate-800 leading-relaxed max-w-2xl mx-auto lowercase opacity-50">
                            Disclaimer: subtracking is an independent tool for informational purposes. all product names, logos, and brands are property of their respective owners. use of these names does not imply affiliation or endorsement. we are not a financial advisor.
                        </p>
                    </div>
                )}
            </div>
        </footer>
    );
}
