'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    variant?: 'default' | 'footer' | 'cta';
}

export function ShareButton({ variant = 'default' }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const shareText = "I'm using SubTracking to track my subscriptions without connecting my bank account. Everything stays private and local. Worth checking out: https://subtracking.app";

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Variant styles
    const variants = {
        default: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-6 py-3 rounded-xl',
        footer: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white px-5 py-2.5 rounded-lg text-sm',
        cta: 'bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 hover:text-indigo-200 px-8 py-4 rounded-2xl',
    };

    return (
        <button
            onClick={handleShare}
            className={`${variants[variant]} font-bold transition-all flex items-center gap-2 group relative`}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-400">Link Copied!</span>
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span>Share SubTracking</span>
                </>
            )}
        </button>
    );
}
