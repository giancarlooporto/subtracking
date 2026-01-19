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

                {/* Links */}
                <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2">
                    <Link href="/privacy" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                        Terms of Service
                    </Link>
                    <a href={`mailto:support@subtracking.app`} className="text-xs text-slate-500 hover:text-indigo-400 transition-colors">
                        Support
                    </a>
                </div>
            </div>
        </footer>
    );
}
