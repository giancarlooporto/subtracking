'use client';

import React, { useState, useEffect } from 'react';
import { X, Share2, Plus, ArrowRight, Monitor, Smartphone, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallBannerProps {
    onOpenGuide?: () => void;
}

export function InstallBanner({ onOpenGuide }: InstallBannerProps) {
    const { isStandalone, isIOS, isMacSafari } = usePWAInstall();
    const [dismissed, setDismissed] = useState(true);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        // Never show if already running in standalone mode (Home screen / Dock)
        if (isStandalone) {
            setDismissed(true);
            return;
        }

        const isDismissed = localStorage.getItem('install-banner-dismissed') === 'true';
        // Only show floating banner on mobile iOS devices, not desktop or Mac
        if (!isDismissed && isIOS) {
            setDismissed(false);
        }
    }, [isStandalone, isIOS]);

    const handleDismiss = (e: React.MouseEvent) => {
        e.stopPropagation();
        localStorage.setItem('install-banner-dismissed', 'true');
        setDismissed(true);
    };

    if (isStandalone || dismissed) return null;

    const title = isIOS
        ? "Add to Home Screen"
        : isMacSafari
        ? "Add to Mac Dock"
        : "Install as Desktop/Mobile App";

    const subtitle = isIOS
        ? "Tap Share ➔ 'Add to Home Screen' for full-screen mode"
        : isMacSafari
        ? "Click File ➔ 'Add to Dock...' in Safari"
        : "Run full-screen with zero browser address bars";

    const Icon = isIOS ? Smartphone : isMacSafari ? Monitor : Download;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: 80, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 80, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                onClick={() => onOpenGuide && onOpenGuide()}
                className="fixed bottom-4 left-4 right-4 z-50 max-w-md mx-auto bg-slate-900/95 backdrop-blur-xl border border-indigo-500/40 text-white p-3.5 rounded-2xl shadow-2xl shadow-black/70 cursor-pointer pointer-events-auto hover:border-indigo-500 transition-colors"
            >
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                            <Icon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-xs text-white truncate flex items-center gap-1.5">
                                {title}
                                <span className="text-[9px] text-indigo-300 font-bold bg-indigo-500/20 px-1.5 py-0.5 rounded uppercase tracking-wider">
                                    No App Store
                                </span>
                            </p>
                            <p className="text-[11px] text-slate-400 truncate mt-0.5">
                                {subtitle}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                if (onOpenGuide) onOpenGuide();
                            }}
                            className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 p-1.5 flex items-center gap-0.5 bg-indigo-500/10 rounded-lg"
                        >
                            How <ArrowRight className="w-3 h-3" />
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="p-1.5 text-slate-500 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                            aria-label="Dismiss banner"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
