import Link from 'next/link';
import { siteConfig } from '../../siteConfig';
import { ShareButton } from './ShareButton';
import { GUMROAD_CONFIG } from '../lib/gumroad';

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
                    <p className="text-slate-500 text-xs">
                        &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-6">
                        <a
                            href={GUMROAD_CONFIG.tipUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-amber-300 hover:text-amber-200 font-semibold flex items-center gap-1.5 transition-colors bg-amber-500/10 hover:bg-amber-500/20 px-3 py-1.5 rounded-xl border border-amber-500/25"
                        >
                            ☕ Buy me a coffee
                        </a>
                        <Link href="/privacy" className="text-xs text-slate-400 hover:text-white transition-colors duration-150">Privacy</Link>
                        <Link href="/terms" className="text-xs text-slate-400 hover:text-white transition-colors duration-150">Terms</Link>
                        <a href="mailto:support@subtracking.app" className="text-xs text-slate-400 hover:text-white transition-colors duration-150">Support</a>
                    </div>
                </div>

                {/* Legal Disclaimer */}
                <div className="max-w-4xl mx-auto px-6 mt-8 pt-6 border-t border-slate-900/50 text-center">
                    <p className="text-[11px] text-slate-500 leading-relaxed">
                        All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement or affiliation.
                    </p>
                </div>
            </footer>
        );
    }

    return (
        <footer className="w-full py-20 mt-24 border-t border-slate-900/50 relative z-10 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10 mb-16">
                    {/* Brand Column */}
                    <div className="col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-1 pb-6 lg:pb-0 border-b border-white/5 lg:border-0">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <img src="/logo.png" alt="SubTracking" className="w-7 h-7 rounded-lg" />
                            <span className="font-black text-lg tracking-tight">SubTracking</span>
                        </Link>
                        <p className="text-xs text-slate-400 leading-relaxed max-w-[220px] mb-5">
                            Stop bank harvesting and take back your financial privacy. 100% local, 100% yours.
                        </p>
                        <a
                            href={GUMROAD_CONFIG.tipUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-semibold text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 px-3.5 py-2 rounded-xl transition-all shadow-sm group w-fit"
                        >
                            <span className="group-hover:scale-110 transition-transform">☕</span>
                            <span>Buy me a coffee</span>
                        </a>
                    </div>

                    {/* Product */}
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Product</h4>
                        <ul className="space-y-3">
                            <li><Link href="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Interactive Dashboard</Link></li>
                            <li><Link href="/privacy-subscription-tracker" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Privacy Architecture</Link></li>
                            <li><Link href="/#features" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Feature Showcase</Link></li>
                            <li><Link href="/#pricing" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Pro Cloud Pass</Link></li>
                        </ul>
                    </div>

                    {/* Comparisons & Tools */}
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Comparisons &amp; Tools</h4>
                        <ul className="space-y-3">
                            <li><Link href="/compare/bank-sync-vs-manual" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Bank-Sync vs. Manual</Link></li>
                            <li><Link href="/compare/excel-vs-subtracking" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">vs. Spreadsheets (Excel)</Link></li>
                            <li><Link href="/no-bank-login" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Why No Bank Login?</Link></li>
                            <li><Link href="/blog/subscription-tracker-template" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Free Excel Template</Link></li>
                        </ul>
                    </div>

                    {/* Cancellation Guides */}
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Cancellation Guides</h4>
                        <ul className="space-y-3">
                            <li><Link href="/guides" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 font-bold block py-0.5">All Cancellation Guides</Link></li>
                            <li><Link href="/blog/find-unused-subscriptions" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Audit Masterclass</Link></li>
                            <li><Link href="/guides/how-to-cancel-netflix" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Cancel Netflix</Link></li>
                            <li><Link href="/guides/how-to-cancel-spotify" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Cancel Spotify</Link></li>
                            <li><Link href="/guides/how-to-cancel-amazon-prime" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Cancel Amazon Prime</Link></li>
                        </ul>
                    </div>

                    {/* Company & Legal */}
                    <div className="space-y-4">
                        <h4 className="text-[11px] font-black uppercase tracking-widest text-slate-400">Company &amp; Legal</h4>
                        <ul className="space-y-3">
                            <li><Link href="/privacy" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Terms of Service</Link></li>
                            <li><a href="mailto:support@subtracking.app" className="text-xs text-slate-400 hover:text-white transition-colors duration-150 block py-0.5">Contact Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-slate-500 text-center sm:text-left">
                        &copy; {currentYear} {siteConfig.siteName}. All rights reserved. 100% private &amp; local-first.
                    </p>

                    <div className="flex items-center gap-4">
                        <ShareButton variant="footer" />
                    </div>
                </div>

                {/* Legal Footnote */}
                <div className="mt-10 text-center">
                    <p className="text-[11px] text-slate-500 leading-relaxed max-w-3xl mx-auto">
                        All product names, logos, and brands are property of their respective owners. All company, product, and service names used in this website are for identification purposes only. Use of these names, logos, and brands does not imply endorsement or affiliation.
                    </p>
                </div>
            </div>
        </footer>
    );
}
