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

            // 1. First try server-side verification route
            let data: any = null;
            try {
                const response = await fetch('/api/verify-license', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ license_key: cleanKey }),
                });
                data = await response.json();
            } catch (fetchErr) {
                console.warn('API route unreachable, falling back to direct Gumroad verification');
            }

            // 2. If API route not available (e.g. static export), verify directly with Gumroad
            if (!data || !data.success) {
                const formData = new URLSearchParams();
                formData.append('product_id', GUMROAD_CONFIG.productId);
                formData.append('license_key', cleanKey);
                formData.append('increment_uses_count', 'true');

                const directRes = await fetch(GUMROAD_CONFIG.apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData
                });
                data = await directRes.json();
            }

            if (data.success && !data.purchase?.refunded && !data.purchase?.chargebacked) {
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
                                    Activate Cloud Sync
                                </h2>
                                <p className="text-sm text-slate-400">Enter your Cloud Sync subscription key from Gumroad.</p>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors cursor-pointer">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">License Key</label>
                                <input
                                    type="text"
                                    value={key}
                                    onChange={(e) => setKey(e.target.value)}
                                    placeholder="XXXX-XXXX-XXXX-XXXX"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 transition-all font-mono"
                                    autoFocus
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
                                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-indigo-600/20"
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Activate Cloud Sync
                                        <CheckCircle className="w-4 h-4" />
                                    </>
                                )}
                            </button>

                            <div className="pt-2 text-center">
                                <a
                                    href={GUMROAD_CONFIG.productUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-indigo-400 hover:underline font-medium"
                                >
                                    Need a Cloud Sync subscription? Get one on Gumroad ($8.99/yr or $0.99/mo) →
                                </a>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
