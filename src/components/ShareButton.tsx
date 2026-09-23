'use client';

import { Share2, Check } from 'lucide-react';
import { useState } from 'react';

interface ShareButtonProps {
    variant?: 'default' | 'footer' | 'cta' | 'discount' | 'drawer';
    onShare?: () => void;
}

export function ShareButton({ variant = 'default', onShare }: ShareButtonProps) {
    const [status, setStatus] = useState<'idle' | 'copied' | 'shared'>('idle');

    const shareText = "I'm using SubTracking to track my subscriptions without connecting my bank account. Everything stays private and local. Worth checking out: https://www.subtracking.app";
    const shareUrl = "https://www.subtracking.app";

    const copyToClipboard = async (text: string): Promise<boolean> => {
        if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
            try {
                await navigator.clipboard.writeText(text);
                return true;
            } catch {
                // Clipboard API failed (e.g. permission or insecure context)
            }
        }
        // Fallback for older browsers or insecure contexts
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            textarea.style.pointerEvents = 'none';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            const success = document.execCommand('copy');
            document.body.removeChild(textarea);
            return success;
        } catch {
            return false;
        }
    };

    const handleShare = async () => {
        try {
            // 1. Try Native Web Share API if supported and available
            if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
                try {
                    await navigator.share({
                        title: 'SubTracking - Private Subscription Tracker',
                        text: shareText,
                        url: shareUrl,
                    });
                    try {
                        localStorage.setItem('subtracking-has-shared', 'true');
                    } catch {}
                    if (onShare) onShare();
                    setStatus('shared');
                    setTimeout(() => setStatus('idle'), 2000);
                    return;
                } catch (err) {
                    // If user canceled the native share sheet, do not fallback or error
                    if (err instanceof Error && err.name === 'AbortError') {
                        return;
                    }
                    // If native share failed for another reason, fallback to clipboard below
                }
            }

            // 2. Clipboard fallback (desktop non-Safari, insecure contexts, or unsupported environments)
            await copyToClipboard(shareUrl);
            try {
                localStorage.setItem('subtracking-has-shared', 'true');
            } catch {}
            if (onShare) onShare();
            setStatus('copied');
            setTimeout(() => setStatus('idle'), 2000);
        } catch (err) {
            console.warn('Share action encountered an error:', err);
        }
    };

    // Special layout for drawer variant inside SettingsModal to match other list items
    if (variant === 'drawer') {
        return (
            <button
                type="button"
                onClick={handleShare}
                className="w-full flex items-center justify-between p-4 bg-slate-900/40 border border-slate-900 rounded-xl hover:bg-slate-900 text-slate-300 hover:text-white transition-all group cursor-pointer"
                aria-label="Share SubTracking"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                        {status !== 'idle' ? (
                            <Check className="w-5 h-5 text-emerald-400" />
                        ) : (
                            <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        )}
                    </div>
                    <div className="text-left">
                        <span className="text-sm font-bold text-white block">
                            {status === 'copied' ? 'Link Copied to Clipboard!' : status === 'shared' ? 'Thanks for Sharing!' : 'Share SubTracking'}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                            {status !== 'idle' ? 'Tell your friends about private tracking' : 'Help friends take back their financial privacy'}
                        </span>
                    </div>
                </div>
                <span className="text-xs font-bold text-slate-500 group-hover:text-slate-300 group-hover:translate-x-0.5 transition-transform">
                    {status !== 'idle' ? '✓' : '→'}
                </span>
            </button>
        );
    }

    // Variant styles
    const variants = {
        default: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white px-6 py-3 rounded-xl',
        footer: 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white px-5 py-2.5 rounded-lg text-sm min-h-[38px]',
        cta: 'bg-indigo-600/10 hover:bg-indigo-600/20 border border-indigo-500/20 text-indigo-300 hover:text-indigo-200 px-8 py-4 rounded-2xl',
        discount: 'bg-emerald-500 text-white hover:bg-emerald-400 px-8 py-4 rounded-2xl shadow-xl shadow-emerald-500/20 scale-105 hover:scale-110 active:scale-95',
    };

    return (
        <button
            type="button"
            onClick={handleShare}
            className={`${variants[variant]} font-bold transition-all flex items-center gap-2 group relative cursor-pointer`}
            aria-label="Share SubTracking"
        >
            {status !== 'idle' ? (
                <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{status === 'copied' ? 'Link Copied!' : 'Shared!'}</span>
                </>
            ) : (
                <>
                    <Share2 className="w-4 h-4 text-inherit group-hover:rotate-12 transition-transform" />
                    <span>Share SubTracking</span>
                </>
            )}
        </button>
    );
}
