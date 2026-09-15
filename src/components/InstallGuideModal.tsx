'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Share2, PlusSquare, Monitor, Smartphone, Download, CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

interface InstallGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function InstallGuideModal({ isOpen, onClose }: InstallGuideModalProps) {
    const { isIOS, isMacSafari, canPromptNativeInstall, promptNativeInstall } = usePWAInstall();

    // Default tab based on user's device
    const [activeTab, setActiveTab] = useState<'ios' | 'mac' | 'desktop'>('ios');

    useEffect(() => {
        if (isIOS) {
            setActiveTab('ios');
        } else if (isMacSafari) {
            setActiveTab('mac');
        } else {
            setActiveTab('desktop');
        }
    }, [isIOS, isMacSafari, isOpen]);

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md cursor-pointer"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-[28px] shadow-2xl overflow-hidden z-10 my-8"
                >
                    {/* Header */}
                    <div className="p-6 pb-4 border-b border-slate-800/80 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Run as a Standalone App</h3>
                                <p className="text-xs text-slate-400">Zero App Store download needed • 100% Private</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-white/5 transition-colors"
                            aria-label="Close"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Platform Selector Tabs */}
                    <div className="flex p-2 gap-1 bg-slate-950/60 border-b border-slate-800 text-xs font-bold">
                        <button
                            onClick={() => setActiveTab('ios')}
                            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                activeTab === 'ios'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Smartphone className="w-4 h-4" />
                            iPhone / iPad
                        </button>
                        <button
                            onClick={() => setActiveTab('mac')}
                            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                activeTab === 'mac'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Monitor className="w-4 h-4" />
                            Mac Dock
                        </button>
                        <button
                            onClick={() => setActiveTab('desktop')}
                            className={`flex-1 py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 transition-all ${
                                activeTab === 'desktop'
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/25'
                                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                            }`}
                        >
                            <Download className="w-4 h-4" />
                            Chrome / Android
                        </button>
                    </div>

                    {/* Content Body */}
                    <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                        {/* Tab 1: iOS iPhone/iPad */}
                        {activeTab === 'ios' && (
                            <div className="space-y-4">
                                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
                                    <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-indigo-200 leading-relaxed">
                                        On iOS Safari, you can place SubTracking on your <strong>Home Screen</strong> in 10 seconds. It will launch full-screen with its own app icon and work offline.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                            1
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Tap the Share button in Safari</p>
                                            <p className="text-slate-400 flex items-center gap-1.5">
                                                Located at the bottom of your iPhone screen:
                                                <span className="inline-flex items-center justify-center w-5 h-5 rounded bg-white/10 text-white">
                                                    <Share2 className="w-3 h-3" />
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                            2
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Tap "Add to Home Screen"</p>
                                            <p className="text-slate-400 flex items-center gap-1.5">
                                                Scroll down the menu list until you see:
                                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/10 text-white font-medium text-[11px]">
                                                    <PlusSquare className="w-3 h-3" /> Add to Home Screen
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                                            3
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Tap "Add" in the top-right</p>
                                            <p className="text-slate-400">
                                                SubTracking is now on your Home Screen! Tap it anytime to open in dedicated app mode.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 2: Mac Safari (Add to Dock) */}
                        {activeTab === 'mac' && (
                            <div className="space-y-4">
                                <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-start gap-3">
                                    <Monitor className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                                    <p className="text-xs text-indigo-200 leading-relaxed">
                                        macOS Sonoma & Sequoia allow you to turn SubTracking into a true macOS desktop app living in your Dock with its own window.
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {/* Step 1 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                            1
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Click "File" in your Mac's top menu bar</p>
                                            <p className="text-slate-400">
                                                While viewing this page in Safari on your Mac.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                            2
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Select "Add to Dock..."</p>
                                            <p className="text-slate-400">
                                                Click the <strong>Add</strong> confirmation button.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                        <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-black text-xs flex items-center justify-center shrink-0">
                                            3
                                        </div>
                                        <div className="text-xs space-y-1">
                                            <p className="font-bold text-white">Launch anytime from your Mac Dock</p>
                                            <p className="text-slate-400">
                                                It opens in a standalone Mac window without browser tabs or URL bars.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Tab 3: Desktop / Android */}
                        {activeTab === 'desktop' && (
                            <div className="space-y-4">
                                {canPromptNativeInstall ? (
                                    <div className="p-6 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl text-center space-y-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white mx-auto flex items-center justify-center shadow-lg shadow-indigo-600/30">
                                            <Download className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white text-base">One-Click Install Ready</h4>
                                            <p className="text-xs text-slate-400 mt-1">Your browser supports instant direct installation.</p>
                                        </div>
                                        <button
                                            onClick={async () => {
                                                const installed = await promptNativeInstall();
                                                if (installed) onClose();
                                            }}
                                            className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/20 transition-all text-xs flex items-center justify-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Install SubTracking App Now
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                                1
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <p className="font-bold text-white">Look for the Install Icon in your address bar</p>
                                                <p className="text-slate-400">
                                                    On Chrome, Edge, or Brave, click the small <Download className="inline w-3 h-3 mx-0.5 text-indigo-400" /> icon in the right side of the URL bar.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3 p-3.5 bg-slate-950/40 border border-slate-800/80 rounded-2xl">
                                            <div className="w-7 h-7 rounded-lg bg-white/10 text-white font-black text-xs flex items-center justify-center shrink-0">
                                                2
                                            </div>
                                            <div className="text-xs space-y-1">
                                                <p className="font-bold text-white">On Android Mobile</p>
                                                <p className="text-slate-400">
                                                    Tap the browser menu (⋮) in the top-right and select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Privacy Banner Footer */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center gap-3 text-slate-400">
                            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                            <p className="text-[11px] leading-relaxed">
                                <strong className="text-slate-300">Why no App Store download?</strong> Complete privacy. No Apple/Google ID tracking, instant updates, and zero storage bloat.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

export default InstallGuideModal;
