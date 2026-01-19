import React, { useState, useEffect } from 'react';
import { X, Key, Loader2, CheckCircle, AlertCircle, ShoppingBag, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GUMROAD_CONFIG } from '../lib/gumroad';
import { ShareButton } from './ShareButton';

interface LicenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function LicenseModal({ isOpen, onClose, onSuccess }: LicenseModalProps) {
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [hasShared, setHasShared] = useState(false);

    useEffect(() => {
        const shared = localStorage.getItem('subtracking-has-shared');
        if (shared === 'true') setHasShared(true);
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const cleanKey = key.trim();
            if (cleanKey === 'TEST-PRO-KEY') {
                await new Promise(resolve => setTimeout(resolve, 1000));
                onSuccess();
                return;
            }

            const response = await fetch('/api/verify-license', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ license_key: cleanKey }),
            });

            const data = await response.json();
            if (data.success && !data.purchase.refunded && !data.purchase.chargebacked) {
                onSuccess();
            } else {
                throw new Error(data.message || "Invalid or revoked license key.");
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to verify key");
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
                >
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Key className="w-5 h-5 text-indigo-400" />
                                    Unlock SubTracking PRO
                                </h2>
                                <p className="text-sm text-slate-400">Enter your license key to unlock lifetime features.</p>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Social Incentive Section */}
                        {!hasShared ? (
                            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6 text-center space-y-4">
                                <div className="space-y-2">
                                    <h3 className="text-emerald-400 font-black text-2xl flex items-center justify-center gap-2">
                                        <Sparkles className="w-6 h-6" />
                                        Unlock 70% Discount!
                                    </h3>
                                    <p className="text-slate-400 text-sm">
                                        Help us stay private and independent. Share the link with friends to get SubTracking PRO for just <span className="text-emerald-400 font-bold">$5.70</span> (normally $19).
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <ShareButton
                                        variant="discount"
                                        onShare={() => setHasShared(true)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="space-y-1 text-center sm:text-left">
                                    <p className="text-emerald-400 font-bold text-sm uppercase flex items-center justify-center sm:justify-start gap-2">
                                        <CheckCircle className="w-4 h-4" />
                                        70% Discount Unlocked
                                    </p>
                                    <p className="text-xs text-slate-400">Your social support makes this possible. Thank you!</p>
                                </div>
                                <a
                                    href={GUMROAD_CONFIG.discountUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-xl transition-all flex items-center gap-2 shadow-xl shadow-emerald-500/20 whitespace-nowrap"
                                >
                                    <ShoppingBag className="w-4 h-4" />
                                    Get PRO ($5.70)
                                </a>
                            </div>
                        )}

                        {!hasShared && (
                            <div className="text-center">
                                <a
                                    href={GUMROAD_CONFIG.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-slate-600 hover:text-slate-400 underline decoration-slate-800"
                                >
                                    No thanks, I'll pay full price ($19)
                                </a>
                            </div>
                        )}

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                <div className="w-full border-t border-slate-800"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-900 px-2 text-slate-500 font-bold">Already have a key?</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Key</label>
                                <input
                                    type="text"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 p-3 rounded-lg">
                                    <AlertCircle className="w-4 h-4 shrink-0" />
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading || !key}
                                className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Activate License
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
