import { motion, AnimatePresence } from 'framer-motion';
import { X, GlobeLock, Key, ShoppingBag } from 'lucide-react';
import { GUMROAD_CONFIG } from '../lib/gumroad';

interface PaywallModalProps {
    isOpen: boolean;
    onClose: () => void;
    onPurchaseSuccess?: () => void;
    onOpenLicense?: () => void;
}

export function PaywallModal({ isOpen, onClose, onOpenLicense }: PaywallModalProps) {
    const handlePurchase = () => {
        window.open(GUMROAD_CONFIG.productUrl, '_blank');
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
                                className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
                            <div className="text-center space-y-4 pt-4">
                                <div className="w-16 h-16 rounded-2xl bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center">
                                    <GlobeLock className="w-8 h-8" />
                                </div>
                                <h3 className="text-lg font-bold text-white">Encrypted Multi-Device Sync</h3>
                                <p className="text-sm text-slate-400">
                                    Sync your financial dashboard seamlessly between your phone, tablet, and laptop with end-to-end encrypted cloud storage.
                                </p>
                            </div>

                            <div className="pt-2 space-y-3">
                                {/* Annual Option */}
                                <button
                                    onClick={handlePurchase}
                                    className="w-full text-left bg-slate-950/50 hover:bg-slate-800 border-2 border-indigo-500/60 hover:border-indigo-500 rounded-2xl p-4.5 transition-all group relative overflow-hidden shadow-lg shadow-indigo-500/10 cursor-pointer"
                                >
                                    <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[9px] font-black px-2.5 py-0.5 rounded-bl-lg uppercase tracking-wider">
                                        Save 25% • Best Value
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <h4 className="font-bold text-white text-base flex items-center gap-2">
                                                <ShoppingBag className="w-4 h-4 text-indigo-400" />
                                                Annual Cloud Pass
                                            </h4>
                                            <p className="text-xs text-slate-400 mt-0.5">$8.99/year (just ~$0.75/month) • Real-time cloud sync</p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-lg font-black text-indigo-400">$8.99</span>
                                            <span className="text-[10px] text-slate-500 block">/year</span>
                                        </div>
                                    </div>
                                </button>

                                {/* Monthly Option */}
                                <button
                                    onClick={handlePurchase}
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
                                    className="w-full py-4 bg-slate-800/40 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/50 hover:border-indigo-500 rounded-2xl text-xs font-bold transition-all flex items-center justify-center gap-2 mt-2 shadow-lg"
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
