import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, GlobeLock, CheckCircle2, Smartphone, ArrowRight, ShieldCheck, History, Layers } from 'lucide-react';

interface ProActivatedModalProps {
    isOpen: boolean;
    onClose: () => void;
    onOpenLogin: () => void;
    isLoggedIn: boolean;
    userEmail?: string | null;
}

export function ProActivatedModal({
    isOpen,
    onClose,
    onOpenLogin,
    isLoggedIn,
    userEmail
}: ProActivatedModalProps) {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
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
                    className="relative w-full max-w-[500px] bg-slate-900 border border-slate-800 rounded-[32px] shadow-2xl shadow-indigo-500/10 overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-300"
                >
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                            <span className="text-[10px] uppercase tracking-wider font-extrabold bg-gradient-to-r from-amber-500 to-indigo-500 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                                PRO ACTIVATED
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700 rounded-full transition-colors cursor-pointer"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Hero Section */}
                        <div className="text-center space-y-3">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-indigo-500/20 to-purple-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/30 shadow-lg shadow-amber-500/10">
                                <Zap className="w-8 h-8 fill-amber-400 text-amber-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white">
                                    Welcome to SubTracking Pro!
                                </h2>
                                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto leading-relaxed">
                                    All Pro features are now unlocked on this device.
                                </p>
                            </div>
                        </div>

                        {/* Feature Badges */}
                        <div className="grid grid-cols-2 gap-2 text-left">
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                <Layers className="w-4 h-4 text-indigo-400 shrink-0" />
                                <span className="text-[11px] font-bold text-slate-200">Unlimited Profiles</span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                <History className="w-4 h-4 text-indigo-400 shrink-0" />
                                <span className="text-[11px] font-bold text-slate-200">30-Day Time Machine</span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span className="text-[11px] font-bold text-slate-200">Offline JSON Backups</span>
                            </div>
                            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80">
                                <GlobeLock className="w-4 h-4 text-indigo-400 shrink-0" />
                                <span className="text-[11px] font-bold text-slate-200">Encrypted Cloud Sync</span>
                            </div>
                        </div>

                        {/* Smart Cloud Sync Section */}
                        {!isLoggedIn ? (
                            <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 space-y-3.5">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300 shrink-0 mt-0.5">
                                        <Smartphone className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                                            Sync with iPhone, Mac & Other Devices
                                        </h4>
                                        <p className="text-xs text-slate-300 leading-relaxed">
                                            To sync your subscriptions across multiple devices, sign in or create your free sync account with your email.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        onClose();
                                        onOpenLogin();
                                    }}
                                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <span>Sign In / Create Account to Sync</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                                <div className="text-xs text-slate-300 leading-relaxed">
                                    Connected as <strong className="text-white">{userEmail}</strong>. Real-time encrypted cloud sync is active!
                                </div>
                            </div>
                        )}

                        {/* Footer button */}
                        <button
                            onClick={onClose}
                            className="w-full py-3 bg-slate-800/60 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold transition-all border border-slate-700/60 cursor-pointer text-center"
                        >
                            {!isLoggedIn ? "I'll Sync Later (Continue to App)" : "Go to Dashboard"}
                        </button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
