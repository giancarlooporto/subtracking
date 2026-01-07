import Link from 'next/link';
import { siteConfig } from '../../siteConfig';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full py-8 mt-24 border-t border-slate-900/50 relative z-10 text-center">
            <div className="max-w-4xl mx-auto px-4 flex flex-col items-center gap-4">

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
