import Link from 'next/link';
import { siteConfig } from '../../siteConfig';
import { Zap } from 'lucide-react';
import { ShareButton } from './ShareButton';

interface FooterProps {
    isPro?: boolean;
    onUnlockPro?: () => void;
}

export function Footer({ isPro, onUnlockPro }: FooterProps) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-24 border-t border-slate-900/50 relative z-10 text-center">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">

                {/* Pro Badge / Action */}
                <div className="mb-2">
                    {isPro ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-indigo-500/30 text-xs font-bold text-indigo-400">
                            <Zap className="w-3 h-3 fill-indigo-400" />
                            Pro Active
                        </div>
                    ) : (
                        <button
                            onClick={onUnlockPro}
                            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-lg shadow-indigo-500/25"
                        >
                            <Zap className="w-3.5 h-3.5 fill-white/20" />
                            Unlock Pro Features
                        </button>
                    )}
                </div>

                {/* Share Button */}
                <div className="mb-2">
                    <ShareButton variant="footer" />
                </div>

                {/* Copyright */}
                <p className="text-slate-600 text-sm">
                    &copy; {currentYear} {siteConfig.siteName}. All rights reserved.
                </p>

                {/* Liability Disclaimer */}
                <p className="text-[10px] text-slate-700 max-w-md mx-auto leading-relaxed">
                    <strong>Disclaimer:</strong> {siteConfig.siteName} is a tracking tool for informational purposes only.
                    We do not provide financial advice. Users are responsible for their own data backups and financial decisions.
                </p>

                {/* SEO Navigation Links */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-left w-full max-w-4xl pt-8 border-t border-slate-900/30">
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Product</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy-subscription-tracker" className="text-xs text-slate-400 hover:text-indigo-400">Privacy Features</Link></li>
                            <li><Link href="/no-bank-login" className="text-xs text-slate-400 hover:text-indigo-400">Why No Bank Login?</Link></li>
                            <li><Link href="/manual-vs-automated" className="text-xs text-slate-400 hover:text-indigo-400">Manual vs Automated</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Guides</h4>
                        <ul className="space-y-2">
                            <li><Link href="/blog/find-unused-subscriptions" className="text-xs text-slate-400 hover:text-indigo-400">Find Unused Subs</Link></li>
                            <li><Link href="/blog/subscription-tracker-template" className="text-xs text-slate-400 hover:text-indigo-400">Free Excel Template</Link></li>
                            <li><Link href="/guides/how-to-cancel-adobe" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Adobe</Link></li>
                            <li><Link href="/guides/how-to-cancel-netflix" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Netflix</Link></li>
                            <li><Link href="/guides/how-to-cancel-spotify" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Spotify</Link></li>
                            <li><Link href="/guides/how-to-cancel-hulu" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Hulu</Link></li>
                            <li><Link href="/guides/how-to-cancel-disney-plus" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Disney+</Link></li>
                            <li><Link href="/guides/how-to-cancel-amazon-prime" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Prime</Link></li>
                            <li><Link href="/guides/how-to-cancel-youtube-premium" className="text-xs text-slate-400 hover:text-indigo-400">Cancel YouTube</Link></li>
                            <li><Link href="/guides/how-to-cancel-planet-fitness" className="text-xs text-slate-400 hover:text-indigo-400">Cancel Planet Fitness</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Compare</h4>
                        <ul className="space-y-2">
                            <li><Link href="/compare/rocket-money" className="text-xs text-slate-400 hover:text-indigo-400">vs Rocket Money</Link></li>
                            <li><Link href="/compare/copilot" className="text-xs text-slate-400 hover:text-indigo-400">vs Copilot</Link></li>
                            <li><Link href="/compare/monarch-money" className="text-xs text-slate-400 hover:text-indigo-400">vs Monarch Money</Link></li>
                            <li><Link href="/compare/excel-vs-subtracking" className="text-xs text-slate-400 hover:text-indigo-400">vs Excel / Sheets</Link></li>
                        </ul>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-500">Company</h4>
                        <ul className="space-y-2">
                            <li><Link href="/privacy" className="text-xs text-slate-400 hover:text-indigo-400">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-xs text-slate-400 hover:text-indigo-400">Terms of Service</Link></li>
                            <li><a href="mailto:support@subtracking.app" className="text-xs text-slate-400 hover:text-indigo-400">Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}
