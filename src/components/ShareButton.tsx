'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    variant?: 'default' | 'footer' | 'cta' | 'discount';
    onShare?: () => void;
}

export function ShareButton({ variant = 'default', onShare }: ShareButtonProps) {
    const [copied, setCopied] = useState(false);

    const shareText = "I'm using SubTracking to track my subscriptions without connecting my bank account. Everything stays private and local. Worth checking out: https://subtracking.app";

    const handleShare = async () => {
        try {
            await navigator.clipboard.writeText(shareText);
            setCopied(true);

            // Set persistence
            localStorage.setItem('subtracking-has-shared', 'true');

            if (onShare) onShare();

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
        discount: 'bg-emerald-500 text-white hover:bg-emerald-400 px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 scale-105 hover:scale-110 active:scale-95',
    };

    return (
        <button
            onClick={handleShare}
            className={`${variants[variant]} font-bold transition-all flex items-center gap-2 group relative`}
        >
            {copied ? (
                <>
                    <Check className="w-4 h-4 text-white" />
                    <span>70% OFF UNLOCKED!</span>
                </>
            ) : (
                <>
                    <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>{variant === 'discount' ? 'Share to Unlock 70% Off' : 'Share SubTracking'}</span>
                </>
            )}
        </button>
    );
}
