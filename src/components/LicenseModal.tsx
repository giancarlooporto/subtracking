import React, { useState } from 'react';
import { X, Key, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface LicenseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function LicenseModal({ isOpen, onClose, onSuccess }: LicenseModalProps) {
    const [key, setKey] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Simulator for now - real Gumroad API integration will go here
            // In a real app, you would POST to https://api.gumroad.com/v2/licenses/verify

            // Simulating API delay
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Basic validation for testing (allows any key with 'PRO' in it or exact test key)
            if (key.trim().length > 0 && (key.includes('-') || key.toUpperCase().includes('PRO'))) {
                onSuccess();
            } else {
                throw new Error("Invalid license key. Please check your email.");
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
                    className="bg-slate-900 border border-slate-700/50 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl"
                >
                    <div className="p-6 space-y-6">
                        <div className="flex justify-between items-start">
                            <div className="space-y-1">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Key className="w-5 h-5 text-indigo-400" />
                                    Unlock Pro
                                </h2>
                                <p className="text-sm text-slate-400">Enter your license key to unlock all features.</p>
                            </div>
                            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
                                <X className="w-5 h-5" />
                            </button>
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
                                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold py-3.5 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
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
