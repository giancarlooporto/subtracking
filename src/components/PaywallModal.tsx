import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, GlobeLock, Key, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { GUMROAD_CONFIG } from '../lib/gumroad';
import { ShareButton } from './ShareButton';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchaseSuccess?: () => void;
    onOpenLicense?: () => void;
}

export function PaywallModal({ isOpen, onClose, onOpenLicense }: PaywallModalProps) {
    const [hasShared, setHasShared] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const shared = localStorage.getItem('subtracking-has-shared') === 'true';
            setHasShared(shared);
        }
    }, [isOpen]);

    const handlePurchase = (plan: 'annual' | 'monthly') => {
        let url: string;
        if (hasShared) {
            url = plan === 'annual' ? GUMROAD_CONFIG.annualDiscountUrl : GUMROAD_CONFIG.monthlyDiscountUrl;
        } else {
            url = plan === 'annual' ? GUMROAD_CONFIG.annualUrl : GUMROAD_CONFIG.monthlyUrl;
        }
        window.open(url, '_blank');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl cursor-pointer"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-[500px] bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl shadow-indigo-500/10 overflow-hidden max-h-[85vh] flex flex-col z-10 animate-in zoom-in-95 duration-300"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-slate-800 sm:p-8 bg-slate-900/50 backdrop-blur-md">
                            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                                Unlock <span className="text-indigo-400">Cloud Sync</span>
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                            <div className="text-center space-y-3 pt-2">
                                <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                                    <GlobeLock className="w-7 h-7" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Encrypted Multi-Device Sync</h3>
                                <p className="text-xs text-slate-400 leading-relaxed">
                                    Sync your financial dashboard seamlessly between your phone, tablet, and laptop with end-to-end encrypted cloud storage.
                                </p>
                            </div>

                            {/* Share to Unlock 30% OFF Banner */}
                            {!hasShared ? (
                                <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 rounded-2xl p-4 text-center space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-emerald-400 font-bold text-xs">
                                        <Sparkles className="w-4 h-4 animate-pulse" />
                                        <span>Share SubTracking & Get 30% OFF Annual Pass</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400">
                                        Help support independent privacy tools by sharing on X or social media!
                                    </p>
                                    <div className="flex justify-center">
                                        <ShareButton
                                            variant="discount"
                                            onShare={() => setHasShared(true)}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-2xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs">
                                        <Check className="w-4 h-4 text-emerald-400" />
                                        <span>30% OFF Annual Pass Unlocked (Code: SHARE30)</span>
                                    </div>
                                    <span className="text-[10px] bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded-full uppercase">
                                        Applied
                                    </span>
                                </div>
                            )}

                            <div className="space-y-3">
                                {/* Annual Option */}
                                <button
                                    onClick={() => handlePurchase('annual')}
                                    className="w-full text-left bg-slate-950/50 hover:bg-slate-800 border-2 border-indigo-500/60 hover:border-indigo-500 rounded-2xl p-4.5 transition-all group relative overflow-hidden shadow-lg shadow-indigo-500/10 cursor-pointer"
                                >
                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                        {hasShared ? '30% OFF • Best Deal' : 'Save 25% • Best Value'}
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-white text-base flex items-center gap-2">
                                                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                                                Annual Cloud Pass
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-0.5">
                                                {hasShared ? '$6.29/year (just ~$0.52/month) • Real-time sync' : '$8.99/year (~$0.75/month) • Real-time sync'}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            {hasShared ? (
                                                <>
                                                    <span className="text-xs text-slate-500 line-through mr-1.5">$8.99</span>
                                                    <span className="text-lg font-black text-emerald-400">$6.29</span>
                                                </>
                                            ) : (
                                                <span className="text-lg font-black text-indigo-400">$8.99</span>
                                            )}
                                            <span className="text-[10px] text-slate-500 block">/year</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Monthly Option */}
                                <button
                                    onClick={() => handlePurchase('monthly')}
                                    className="w-full text-left bg-slate-950/30 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 rounded-2xl p-4.5 transition-all group cursor-pointer"
                                >
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-white text-base flex items-center gap-2">
                                                <ShoppingBag className="w-4 h-4 text-slate-400" />
                                                Monthly Cloud Pass
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-0.5">$0.99/month • Cancel anytime</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-black text-white">$0.99</span>
                                            <span className="text-[10px] text-slate-500 block">/month</span>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        if (onOpenLicense) onOpenLicense();
                                    }}
                                    className="w-full py-4 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 mt-2 shadow-lg cursor-pointer"
                                >
                                    <Key className="w-4.5 h-4.5 text-indigo-400 shrink-0" />
                                    Already purchased? Enter License Serial Key
                                </button>

                                <div className="pt-2 text-center text-[10px] text-slate-500 space-y-2">
                                    <div className="flex items-center justify-center gap-4">
                                        <a href="/terms" target="_blank" className="hover:text-white underline transition-colors">Terms of Use</a>
                                        <a href="/privacy" target="_blank" className="hover:text-white underline transition-colors">Privacy Policy</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
