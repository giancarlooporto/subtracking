'use client';

import { useState, useEffect } from 'react';
import { Sparkles, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function LaunchBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_auto] animate-gradient-x text-white overflow-hidden z-[60]"
            >
                <div className="max-w-7xl mx-auto px-4 py-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
                    <div className="flex-1 flex items-center justify-center gap-2 text-sm font-bold">
                        <Sparkles className="w-4 h-4" />
                        <span>🚀 LAUNCH SPECIAL: Share SubTracking to unlock 70% OFF PRO Lifetime Access!</span>
                        <div className="hidden sm:block">
                            <ArrowRight className="w-4 h-4 inline ml-1 animate-pulse" />
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                        aria-label="Close banner"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* CSS for animated gradient */}
                <style jsx>{`
                    @keyframes gradient-x {
                        0% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                        100% { background-position: 0% 50%; }
                    }
                    .animate-gradient-x {
                        animation: gradient-x 6s ease infinite;
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
