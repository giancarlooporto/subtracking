'use client';

import { useState, useEffect } from 'react';
import { X, Share, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function InstallBanner() {
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        // Check if already dismissed
        const dismissed = localStorage.getItem('install-banner-dismissed');
        if (dismissed) return;

        // Check if already installed (standalone mode)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isStandalone) return;

        // Detect iOS Safari
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isSafari = /Safari/.test(navigator.userAgent) && !/CriOS|FxiOS|OPiOS|mercury/.test(navigator.userAgent);

        if (isIOS && isSafari) {
            setShowBanner(true);
        }
    }, []);

    const handleDismiss = () => {
        localStorage.setItem('install-banner-dismissed', 'true');
        setShowBanner(false);
    };

    return (
        <AnimatePresence>
            {showBanner && (
                <motion.div
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ type: 'spring', damping: 20 }}
                    className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 shadow-lg"
                >
                    <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 flex-1">
                            <div className="p-2 bg-white/20 rounded-lg">
                                <Plus className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <p className="font-bold text-sm">Install SubTracking</p>
                                <p className="text-xs text-white/90">
                                    Tap <Share className="inline w-3 h-3 mx-1" /> then "Add to Home Screen"
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleDismiss}
                            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                            aria-label="Dismiss"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
